#!/usr/bin/env node
/**
 * Regression: rhcsa10 question id gamification remap (#31).
 */
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const gamePath = path.join(ROOT, 'gamification.js');

class LocalStorageMock {
  constructor() {
    this.store = {};
  }
  getItem(k) {
    return this.store[k] || null;
  }
  setItem(k, v) {
    this.store[k] = String(v);
  }
}

function loadMap() {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'data/rhcsa10-question-id-map.js'), 'utf8'), sandbox);
  return sandbox.window.RHCSA10_QUESTION_ID_MAP;
}

function bootReservedKeys(target) {
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'reserved-key-names.js'), 'utf8'), target);
}

function bootRhcsa10Ids(target) {
  target.RHCSA10_QUESTION_ID_MAP = loadMap();
  target.window = target;
  target.globalThis = target;
  target.console = console;
  vm.createContext(target);
  bootReservedKeys(target);
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'rhcsa10-question-id-utils.js'), 'utf8'), target);
}

function loadUtils() {
  const g = {};
  bootRhcsa10Ids(g);
  return g.CloudCramRhcsa10Ids;
}

function runPersistMigration(ls) {
  const win = {};
  bootRhcsa10Ids(win);
  win.localStorage = ls;
  const migJs = fs.readFileSync(path.join(ROOT, 'rhcsa10-question-id-migration.js'), 'utf8');
  const fn = new Function('localStorage', 'window', 'console', migJs);
  fn(ls, win, console);
}

function loadGame() {
  delete require.cache[require.resolve(gamePath)];
  return require(gamePath);
}

function dedupCountForDay(ls, day) {
  const raw = ls.getItem('cloudcram_game_v1');
  if (!raw) return 0;
  const parsed = JSON.parse(raw);
  const dedup = parsed.answerDedup || {};
  return Object.keys(dedup).filter(function (k) {
    return k.indexOf(day + ':') === 0;
  }).length;
}

function testRemapNumericAndStringIds() {
  const ls = new LocalStorageMock();
  const map = loadMap();
  const oldNum = '129';
  const oldStr = 'rhcsa10-gap-001';
  if (!map.forward[oldNum] || !map.forward[oldStr]) {
    throw new Error('fixture ids missing from map');
  }
  const dedup = {};
  dedup['2026-11-24:sess1:' + oldNum] = true;
  dedup['2026-11-24:sess2:' + oldStr] = true;
  dedup['2026-11-24:sess3:other-quiz-1'] = true;
  ls.setItem('cloudcram_game_v1', JSON.stringify({ v: 1, answerDedup: dedup }));
  runPersistMigration(ls);
  const game = JSON.parse(ls.getItem('cloudcram_game_v1'));
  const d = game.answerDedup;
  if (!d['2026-11-24:sess1:' + map.forward[oldNum]]) {
    throw new Error('numeric id not remapped');
  }
  if (!d['2026-11-24:sess2:' + map.forward[oldStr]]) {
    throw new Error('string id not remapped');
  }
  if (!d['2026-11-24:sess3:other-quiz-1']) {
    throw new Error('unrelated id should stay');
  }
  if (d['2026-11-24:sess1:' + oldNum]) {
    throw new Error('old numeric key should be removed');
  }
}

function testTabMergeDedupesOldAndNew() {
  const map = loadMap();
  const canon = map.forward['129'];
  const day = '2026-11-24';
  bootRhcsa10Ids(globalThis);
  const game = loadGame();
  game.setDeps({ localStorage: new LocalStorageMock(), locks: null, storageEventTarget: null });
  const hub = game.normalizeState({
    v: 1,
    answerDedup: { [day + ':hub-tab:129']: true }
  });
  const quiz = game.normalizeState({
    v: 1,
    answerDedup: { [day + ':quiz-tab:' + canon]: true }
  });
  const merged = game.mergeStates(hub, quiz);
  const d = merged.answerDedup || {};
  if (!d[day + ':hub-tab:' + canon] || !d[day + ':quiz-tab:' + canon]) {
    throw new Error('mergeStates should collapse legacy and canonical ids across tabs');
  }
  if (d[day + ':hub-tab:129'] || d[day + ':quiz-tab:129']) {
    throw new Error('legacy id keys must not remain after merge');
  }
}

function testImportThenReanswerNoExtraXp() {
  const map = loadMap();
  const canon = map.forward['129'];
  const day = '2026-11-24';
  const ls = new LocalStorageMock();
  bootRhcsa10Ids(globalThis);
  const game = loadGame();
  const now = Date.parse(day + 'T12:00:00Z');
  game.setDeps({
    localStorage: ls,
    now: function () {
      return now;
    },
    locks: null,
    storageEventTarget: null
  });
  const imported = JSON.stringify({
    v: 1,
    answerDedup: { [day + ':import:129']: true }
  });
  return game.importState(imported).then(function () {
    const afterImport = dedupCountForDay(ls, day);
    if (afterImport !== 1) {
      throw new Error('imported legacy id should count once, got ' + afterImport);
    }
    return game.recordAnswer('live', '129').then(function () {
      if (dedupCountForDay(ls, day) !== 2) {
        throw new Error('new session with legacy id should add one dedup entry');
      }
      return game.recordAnswer('live', canon).then(function () {
        if (dedupCountForDay(ls, day) !== 2) {
          throw new Error('canonical re-answer must not double-count XP dedup');
        }
      });
    });
  });
}

function testAnswerDedupSkipsReservedKeys() {
  const utils = loadUtils();
  const raw = Object.create(null);
  raw['2026-11-24:s1:rhcsa10-0001'] = true;
  raw.__proto__ = true;
  raw.constructor = true;
  raw.prototype = true;
  const next = utils.normalizeAnswerDedup(raw);
  assert(Object.keys(next).length === 1, 'only allowed dedup key kept');
  assert(next['2026-11-24:s1:rhcsa10-0001'], 'valid key kept');
  assert(next.polluted === undefined, 'no pollution via reserved dedup key');
  assert({}.polluted === undefined, 'Object.prototype clean');
}

function testPendingGameAnswerSkipsReservedKeys() {
  const utils = loadUtils();
  const msg = {
    questionId: '129',
    sessionId: 's1',
    __proto__: { polluted: true },
    constructor: 'x',
    prototype: 'y'
  };
  const out = utils.normalizePendingGameAnswer(msg);
  assert(out.questionId && out.questionId.indexOf('rhcsa10-') === 0, 'canon question id');
  assert(out.__proto__ === undefined, 'reserved __proto__ dropped');
  assert(out.constructor === undefined, 'reserved constructor dropped');
  assert(out.prototype === undefined, 'reserved prototype dropped');
  assert(out.sessionId === 's1', 'allowed field kept');
  assert({}.polluted === undefined, 'Object.prototype clean');
}

function testPendingGameAnswerCanonicalStillStripsReserved() {
  const utils = loadUtils();
  const map = loadMap();
  const canon = map.forward['129'];
  if (!canon) {
    throw new Error('fixture canonical id missing');
  }
  const msg = {
    questionId: canon,
    sessionId: 's1',
    constructor: 'x',
    prototype: 'y'
  };
  const out = utils.normalizePendingGameAnswer(msg);
  assert(out !== msg, 'returns fresh object even when id already canonical');
  assert(out.questionId === canon, 'canonical id unchanged');
  assert(out.constructor === undefined, 'reserved constructor dropped on noop remap');
  assert(out.prototype === undefined, 'reserved prototype dropped on noop remap');
}

function testAnswerDedupSkipsReservedWithoutIdMap() {
  const g = { console: console, globalThis: null, window: null };
  g.globalThis = g;
  g.window = g;
  vm.createContext(g);
  bootReservedKeys(g);
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'rhcsa10-question-id-utils.js'), 'utf8'), g);
  const utils = g.CloudCramRhcsa10Ids;
  const raw = Object.create(null);
  raw['2026-11-24:s1:q1'] = true;
  raw.constructor = true;
  raw.prototype = true;
  const next = utils.normalizeAnswerDedup(raw);
  assert(Object.keys(next).length === 1, 'only allowed key when map missing');
  assert(next['2026-11-24:s1:q1'], 'valid key kept');
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'assertion failed');
  }
}

function testIdempotentPersist() {
  const ls = new LocalStorageMock();
  ls.setItem(
    'cloudcram_game_v1',
    JSON.stringify({ v: 1, answerDedup: { '2026-11-24:sess1:rhcsa10-0001': true } })
  );
  runPersistMigration(ls);
  const first = ls.getItem('cloudcram_game_v1');
  runPersistMigration(ls);
  if (ls.getItem('cloudcram_game_v1') !== first) {
    throw new Error('second persist run should not change state');
  }
}

const syncTests = [
  { name: 'remap numeric and string ids', fn: testRemapNumericAndStringIds },
  { name: 'tab merge dedupes old and new ids', fn: testTabMergeDedupesOldAndNew },
  { name: 'answerDedup skips reserved keys (#127)', fn: testAnswerDedupSkipsReservedKeys },
  { name: 'pending game answer skips reserved keys (#127)', fn: testPendingGameAnswerSkipsReservedKeys },
  { name: 'pending game answer strips reserved when id already canonical', fn: testPendingGameAnswerCanonicalStillStripsReserved },
  { name: 'answerDedup strips reserved when id map missing', fn: testAnswerDedupSkipsReservedWithoutIdMap },
  { name: 'idempotent persist migration', fn: testIdempotentPersist }
];

let ok = 0;
let fail = 0;

syncTests.forEach(function (t) {
  try {
    t.fn();
    console.log('✓ ' + t.name);
    ok++;
  } catch (e) {
    console.error('✗ ' + t.name);
    console.error('  ' + e.message);
    fail++;
  }
});

testImportThenReanswerNoExtraXp()
  .then(function () {
    console.log('✓ import then re-answer does not double XP dedup');
    ok++;
    process.exit(fail ? 1 : 0);
  })
  .catch(function (e) {
    console.error('✗ import then re-answer does not double XP dedup');
    console.error('  ' + (e && e.message ? e.message : e));
    fail++;
    process.exit(1);
  });