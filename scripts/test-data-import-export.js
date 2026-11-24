#!/usr/bin/env node
/**
 * Export / import progress — validation and merge (#109).
 */
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const registry = require(path.join(ROOT, 'storage-keys.js'));
const dataImport = require(path.join(ROOT, 'data-import.js'));
const mergeApi = require(path.join(ROOT, 'storage-tab-merge.js'));
const game = require(path.join(ROOT, 'gamification.js'));

class LocalStorageMock {
  constructor(initial) {
    this.store = Object.assign(Object.create(null), initial || {});
  }
  get length() {
    return Object.keys(this.store).length;
  }
  key(i) {
    return Object.keys(this.store)[i] || null;
  }
  getItem(k) {
    return Object.prototype.hasOwnProperty.call(this.store, k) ? this.store[k] : null;
  }
  setItem(k, v) {
    this.store[k] = String(v);
  }
  removeItem(k) {
    delete this.store[k];
  }
}

function assert(cond, msg) {
  if (!cond) throw new Error(msg || 'Assertion failed');
}

let passed = 0;
let failed = 0;

function test(name, fn) {
  return Promise.resolve()
    .then(fn)
    .then(function () {
      console.log('✓ ' + name);
      passed++;
    })
    .catch(function (e) {
      console.error('✗ ' + name);
      console.error('  ' + e.message);
      failed++;
    });
}

function minimalPayload(overrides) {
  return Object.assign(
    {
      exportedAt: '2026-11-22T12:00:00.000Z',
      schema: 'cloudcram-export-v1',
      localStorage: { quizCompleted: '[]' },
      brainDumpsIndexedDB: []
    },
    overrides || {}
  );
}

function snapshot(ls) {
  return dataImport.snapshotLocalStorage(ls);
}

const BRAIN_DB = 'StudySessionsBrainDumps';
const BRAIN_STORE = 'dumps';

function createBrainDumpIdbHarness(seedRecords) {
  const state = {
    records: (seedRecords || []).map(function (r) {
      return Object.assign({}, r);
    }),
    nextId: 9000
  };

  const idb = {
    open: function (_name, _version) {
      const req = {};
      setImmediate(function () {
        const db = {
          objectStoreNames: {
            contains: function (sn) {
              return sn === BRAIN_STORE;
            }
          },
          close: function () {},
          transaction: function (_storeName, _mode) {
            const tx = {
              objectStore: function () {
                return {
                  getAll: function () {
                    const g = { result: null, onsuccess: null, onerror: null };
                    g.result = state.records.map(function (r) {
                      return Object.assign({}, r);
                    });
                    setImmediate(function () {
                      if (g.onsuccess) g.onsuccess({ target: g });
                    });
                    return g;
                  },
                  add: function (rec) {
                    const copy = Object.assign({}, rec);
                    if (copy.id == null) copy.id = ++state.nextId;
                    state.records.push(copy);
                  },
                  put: function (rec) {
                    const copy = Object.assign({}, rec);
                    const idx = state.records.findIndex(function (x) {
                      return x.id === copy.id;
                    });
                    if (idx >= 0) state.records[idx] = copy;
                    else state.records.push(copy);
                  },
                  clear: function () {
                    state.records.length = 0;
                  }
                };
              },
              oncomplete: null,
              onerror: null,
              onabort: null
            };
            setImmediate(function () {
              if (tx.oncomplete) tx.oncomplete();
            });
            return tx;
          }
        };
        req.result = db;
        if (req.onsuccess) req.onsuccess({ target: req });
      });
      req.onerror = null;
      req.onblocked = null;
      req.onupgradeneeded = null;
      return req;
    }
  };

  return {
    idb: idb,
    idbSnapshot: function () {
      return JSON.stringify(state.records);
    }
  };
}

(async function main() {
  await test('export allowlist omits unregistered and UI keys', function () {
    const ls = new LocalStorageMock({
      quizCompleted: '[]',
      cloudcram_quiz_ui_foo: '1',
      random_key: 'x',
      cloudcram_push_auth_token: 'secret'
    });
    const payload = registry.collectExportableLocalStorage(ls);
    assert(payload.quizCompleted === '[]', 'keeps registered key');
    assert(!Object.prototype.hasOwnProperty.call(payload, 'cloudcram_quiz_ui_foo'), 'drops UI');
    assert(!Object.prototype.hasOwnProperty.call(payload, 'random_key'), 'drops unknown');
    assert(!Object.prototype.hasOwnProperty.call(payload, 'cloudcram_push_auth_token'), 'redacts auth');
  });

  await test('rejects oversize file before parse', function () {
    const res = dataImport.validateImportText('{}', dataImport.MAX_FILE_BYTES + 1);
    assert(!res.ok, 'oversize rejected');
  });

  await test('rejects wrong schema and invalid JSON', function () {
    assert(!dataImport.validateImportText('{').ok, 'bad json');
    const bad = dataImport.validatePayloadRoot({ schema: 'nope', localStorage: {} });
    assert(!bad.ok, 'wrong schema');
  });

  await test('rejects redacted key in file', function () {
    const payload = minimalPayload({
      localStorage: {
        quizCompleted: '[]',
        cloudcram_push_auth_token: 'leak'
      }
    });
    const res = dataImport.validatePayloadRoot(payload);
    assert(!res.ok, 'redacted in file');
  });

  await test('rejects reserved prototype keys', function () {
    const raw =
      '{"schema":"cloudcram-export-v1","localStorage":{},"__proto__":{"polluted":true}}';
    const res = dataImport.validateImportText(raw);
    assert(!res.ok, 'reserved key');
  });

  await test('rejects empty import file', function () {
    const res = dataImport.validateImportText('');
    assert(!res.ok, 'empty file');
  });

  await test('rejects game state over streak cap', function () {
    const bad = minimalPayload({
      localStorage: {
        cloudcram_game_v1: JSON.stringify({ v: 1, streak: 50000, best: 0 })
      }
    });
    const res = dataImport.validatePayloadRoot(bad);
    assert(!res.ok, 'streak cap');
  });

  await test('rejects string streak or best in game state', function () {
    const badStreak = minimalPayload({
      localStorage: {
        cloudcram_game_v1: JSON.stringify({ v: 1, streak: '7', best: 3 })
      }
    });
    assert(!dataImport.validatePayloadRoot(badStreak).ok, 'string streak');
    const badBest = minimalPayload({
      localStorage: {
        cloudcram_game_v1: JSON.stringify({ v: 1, streak: 3, best: '12' })
      }
    });
    assert(!dataImport.validatePayloadRoot(badBest).ok, 'string best');
  });

  await test('rejects null or non-finite streak or best in game state', function () {
    const nullStreak = minimalPayload({
      localStorage: {
        cloudcram_game_v1: JSON.stringify({ v: 1, streak: null, best: 0 })
      }
    });
    assert(!dataImport.validatePayloadRoot(nullStreak).ok, 'null streak');
    const nanBest = minimalPayload({
      localStorage: {
        cloudcram_game_v1: JSON.stringify({ v: 1, streak: 1, best: NaN })
      }
    });
    assert(!dataImport.validatePayloadRoot(nanBest).ok, 'nan best');
  });

  await test('import keeps dailyGoal after implicit first-run complete', async function () {
    game.shutdownForTests && game.shutdownForTests();
    const ls = new LocalStorageMock();
    game.setDeps({
      localStorage: ls,
      locks: null,
      storageEventTarget: null,
      now: function () { return Date.parse('2026-11-22T12:00:00Z'); }
    });
    await game.completeFirstRun({ goal: 3, soundOn: true, implicitDefaultGoal: true });
    assert(game.loadState().dailyGoal === 3, 'picker default');
    assert(game.loadState().settingsRevision.goal === 0, 'no picker revision bump');

    const exported = game.defaultState();
    exported.v = 1;
    exported.dailyGoal = 10;
    exported.firstRunDone = true;
    exported.settingsRevision = { soundOn: 0, goal: 50 };
    exported.streak = 5;
    exported.best = 5;
    const validated = dataImport.validatePayloadRoot(
      minimalPayload({
        localStorage: { cloudcram_game_v1: JSON.stringify(exported) }
      })
    );
    assert(validated.ok, 'payload ok');
    await dataImport.applyImportMerge({
      payload: validated.payload,
      localStorage: ls,
      mergeApi: mergeApi,
      gameApi: game,
      existingBrainDumps: [],
      writeBrainDumps: function () { return Promise.resolve(0); }
    });
    assert(game.loadState().dailyGoal === 10, 'imported dailyGoal kept');
  });

  await test('rejects push endpoint keys in import file', function () {
    const bad = minimalPayload({
      localStorage: {
        quizCompleted: '[]',
        cloudcram_push_endpoint: 'https://example.test'
      }
    });
    const res = dataImport.validatePayloadRoot(bad);
    assert(!res.ok, 'push endpoint rejected');
  });

  await test('rejects reserved keys nested in localStorage JSON values', function () {
    const bad = minimalPayload({
      localStorage: {
        cloudcram_settings_v1: '{"theme":"dark","sessionAttempts":{"__proto__":{"x":1}}}'
      }
    });
    const res = dataImport.validatePayloadRoot(bad);
    assert(!res.ok, 'nested reserved');
  });

  await test('validate-then-fail leaves storage unchanged', function () {
    const ls = new LocalStorageMock({ quizCompleted: '["cissp"]' });
    const before = snapshot(ls);
    const res = dataImport.validatePayloadRoot({
      schema: 'cloudcram-export-v1',
      localStorage: { cloudcram_push_auth_token: 'x' }
    });
    assert(!res.ok, 'invalid');
    assert(JSON.stringify(snapshot(ls)) === JSON.stringify(before), 'unchanged storage');
  });

  await test('mergeQuizCompleted unions without duplicates', function () {
    const merged = dataImport.mergeQuizCompleted('["a","b"]', '["b","c"]');
    assert(merged === '["a","b","c"]', 'union');
  });

  await test('mergeQuizOrder keeps local when set', function () {
    const local = '["cissp","oci"]';
    const file = '["oci","cissp"]';
    assert(dataImport.mergeQuizOrder(local, file) === local, 'local order wins');
    assert(dataImport.mergeQuizOrder(null, file) === file, 'take file when local empty');
  });

  await test('brain dump merge is idempotent by content identity', function () {
    const existing = [
      {
        id: 1,
        timestamp: '2026-01-01',
        quizId: 'cissp',
        questionText: 'Q1',
        dumpText: 'note'
      }
    ];
    const incoming = [
      {
        id: 99,
        timestamp: '2026-01-01',
        quizId: 'cissp',
        questionText: 'Q1',
        dumpText: 'note'
      },
      {
        id: 2,
        timestamp: '2026-01-02T00:00:00.000Z',
        quizId: 'cissp',
        questionText: 'Q2',
        dumpText: 'other'
      }
    ];
    const first = dataImport.mergeBrainDumpsForImport(existing, incoming);
    assert(first.added === 1, 'only new content');
    const second = dataImport.mergeBrainDumpsForImport(existing.concat(first.toAdd), incoming);
    assert(second.added === 0, 're-import noop');
  });

  await test('profile merge idempotent via sessionAttempts union', async function () {
    const ls = new LocalStorageMock();
    const key = 'study_sessions_profile_cissp';
    const attemptA = {
      id: 'attempt-a',
      quizId: 'cissp',
      answered: 5,
      correct: 4,
      topicHits: {},
      topicMisses: {}
    };
    const base = mergeApi.parseProfile(null, 'cissp');
    base.sessionAttempts[attemptA.id] = attemptA;
    base.appliedSessionAttempts[attemptA.id] = true;
    ls.setItem(key, JSON.stringify(base));

    const importProf = mergeApi.parseProfile(null, 'cissp');
    const attemptB = {
      id: 'attempt-b',
      quizId: 'cissp',
      answered: 3,
      correct: 2,
      topicHits: {},
      topicMisses: {}
    };
    importProf.sessionAttempts[attemptB.id] = attemptB;
    importProf.appliedSessionAttempts[attemptB.id] = true;

    const validated = dataImport.validatePayloadRoot(
      minimalPayload({ localStorage: { [key]: JSON.stringify(importProf) } })
    );
    assert(validated.ok, 'payload ok');
    const beforeSnap = snapshot(ls);
    const res1 = await dataImport.applyImportMerge({
      payload: validated.payload,
      localStorage: ls,
      mergeApi: mergeApi,
      existingBrainDumps: [],
      writeBrainDumps: function () { return Promise.resolve(0); }
    });
    assert(res1.ok && !res1.noop, 'first import changes data');
    const afterFirst = snapshot(ls);
    const res2 = await dataImport.applyImportMerge({
      payload: validated.payload,
      localStorage: ls,
      mergeApi: mergeApi,
      existingBrainDumps: [],
      writeBrainDumps: function () { return Promise.resolve(0); }
    });
    assert(res2.noop, 'second import noop');
    assert(JSON.stringify(snapshot(ls)) === JSON.stringify(afterFirst), 'stable re-import');
    assert(JSON.stringify(snapshot(ls)) !== JSON.stringify(beforeSnap), 'first import differed');
  });

  await test('importState merges game without raw replace', async function () {
    game.shutdownForTests && game.shutdownForTests();
    const ls = new LocalStorageMock();
    game.setDeps({
      localStorage: ls,
      locks: null,
      storageEventTarget: null,
      now: function () { return Date.parse('2026-11-22T12:00:00Z'); }
    });
    const localState = game.defaultState();
    localState.streak = 5;
    localState.answers = 10;
    localState.v = 1;
    ls.setItem('cloudcram_game_v1', JSON.stringify(localState));

    const incoming = game.defaultState();
    incoming.streak = 14;
    incoming.answers = 12;
    incoming.v = 1;
    incoming.answerDedup = Object.assign({}, localState.answerDedup || {});
    incoming.answerDedup['2026-11-21:s1:q1'] = true;
    incoming.answerDedup['2026-11-21:s1:q2'] = true;

    const merged = await game.importState(JSON.stringify(incoming));
    assert(merged && merged.streak === 14, 'streak merged up');
    const dedupCount = Object.keys(merged.answerDedup || {}).length;
    assert(dedupCount >= 2, 'answer dedup merged');
    const again = await game.importState(JSON.stringify(incoming));
    const dedupAgain = Object.keys(again.answerDedup || {}).length;
    assert(dedupAgain === dedupCount, 'idempotent game re-import');
    assert(again.streak === merged.streak, 'streak stable');
  });

  await test('mid-apply failure rolls back localStorage and brain dumps', async function () {
    game.shutdownForTests && game.shutdownForTests();
    const ls = new LocalStorageMock({
      quizCompleted: '["local-only"]'
    });
    game.setDeps({
      localStorage: ls,
      locks: null,
      storageEventTarget: null,
      now: function () { return Date.parse('2026-11-22T12:00:00Z'); }
    });
    const localGame = game.defaultState();
    localGame.v = 1;
    localGame.streak = 2;
    localGame.answers = 5;
    ls.setItem('cloudcram_game_v1', JSON.stringify(localGame));

    const key = 'study_sessions_profile_cissp';
    const prof = mergeApi.parseProfile(null, 'cissp');
    ls.setItem(key, JSON.stringify(prof));

    const brainRecords = [
      {
        id: 1,
        timestamp: '2026-01-01T00:00:00.000Z',
        quizId: 'cissp',
        questionText: 'Keep me',
        dumpText: 'unchanged'
      }
    ];
    const lsBefore = JSON.stringify(snapshot(ls));
    const brainBefore = JSON.stringify(brainRecords);

    const importedGame = game.defaultState();
    importedGame.v = 1;
    importedGame.streak = 99;
    importedGame.answers = 50;

    const importProf = mergeApi.parseProfile(null, 'cissp');
    importProf.sessionAttempts.attempt_x = {
      id: 'attempt_x',
      quizId: 'cissp',
      answered: 1,
      correct: 1,
      topicHits: {},
      topicMisses: {}
    };
    importProf.appliedSessionAttempts.attempt_x = true;

    const validated = dataImport.validatePayloadRoot(
      minimalPayload({
        localStorage: {
          quizCompleted: '["cissp","oci"]',
          cloudcram_game_v1: JSON.stringify(importedGame),
          [key]: JSON.stringify(importProf)
        },
        brainDumpsIndexedDB: [
          {
            id: 77,
            timestamp: '2026-06-01T00:00:00.000Z',
            quizId: 'cissp',
            questionText: 'New dump',
            dumpText: 'should not stick'
          }
        ]
      })
    );
    assert(validated.ok, 'payload ok');

    const idbHarness = createBrainDumpIdbHarness(brainRecords);
    const idbBefore = idbHarness.idbSnapshot();
    const res = await dataImport.applyImportMerge({
      payload: validated.payload,
      localStorage: ls,
      mergeApi: mergeApi,
      gameApi: game,
      idb: idbHarness.idb,
      brainIdbReadOk: true,
      existingBrainDumps: brainRecords,
      writeBrainDumps: function () {
        return Promise.reject(new Error('simulated IndexedDB write failure'));
      }
    });
    assert(!res.ok, 'apply fails closed');
    assert(res.code !== 'rollback_failed', 'rollback succeeds');
    assert(JSON.stringify(snapshot(ls)) === lsBefore, 'localStorage byte-identical');
    assert(JSON.stringify(brainRecords) === brainBefore, 'brain dumps byte-identical');
    assert(idbHarness.idbSnapshot() === idbBefore, 'idb store byte-identical');
  });

  await test('idb read fail blocks import before any brain write', async function () {
    const ls = new LocalStorageMock({ quizCompleted: '["keep"]' });
    const lsBefore = JSON.stringify(snapshot(ls));
    const idbHarness = createBrainDumpIdbHarness([
      {
        id: 3,
        timestamp: '2026-03-01T00:00:00.000Z',
        quizId: 'oci',
        questionText: 'Stored',
        dumpText: 'note'
      }
    ]);
    const idbBefore = idbHarness.idbSnapshot();
    let writeCalls = 0;

    const validated = dataImport.validatePayloadRoot(
      minimalPayload({
        localStorage: {
          quizCompleted: '["keep","cissp"]'
        },
        brainDumpsIndexedDB: [
          {
            id: 44,
            timestamp: '2026-08-01T00:00:00.000Z',
            quizId: 'cissp',
            questionText: 'Incoming',
            dumpText: 'blocked'
          }
        ]
      })
    );
    assert(validated.ok, 'payload ok');

    const res = await dataImport.applyImportMerge({
      payload: validated.payload,
      localStorage: ls,
      mergeApi: mergeApi,
      existingBrainDumps: [],
      brainIdbReadOk: false,
      idb: idbHarness.idb,
      writeBrainDumps: function () {
        writeCalls++;
        return Promise.resolve(1);
      }
    });
    assert(!res.ok, 'fails closed');
    assert(res.code === 'brain_read', 'brain read code');
    assert(/brain dumps/i.test(res.message || ''), 'user-visible brain read message');
    assert(writeCalls === 0, 'writeBrainDumps never called');
    assert(JSON.stringify(snapshot(ls)) === lsBefore, 'localStorage unchanged');
    assert(idbHarness.idbSnapshot() === idbBefore, 'idb unchanged');
  });

  await test('idb restore after committed brain write failure', async function () {
    const seed = [
      {
        id: 10,
        timestamp: '2026-04-01T00:00:00.000Z',
        quizId: 'cissp',
        questionText: 'Pre',
        dumpText: 'import'
      }
    ];
    const idbHarness = createBrainDumpIdbHarness(seed);
    const brainSnap = await dataImport.readBrainDumpsFromIdb(idbHarness.idb);
    assert(brainSnap.readOk, 'idb pre-read ok');
    const idbBefore = JSON.stringify(brainSnap.records);
    const ls = new LocalStorageMock({ quizCompleted: '["a"]' });
    const lsBefore = JSON.stringify(snapshot(ls));

    const validated = dataImport.validatePayloadRoot(
      minimalPayload({
        localStorage: {
          quizCompleted: '["a","b"]'
        },
        brainDumpsIndexedDB: [
          {
            id: 55,
            timestamp: '2026-09-01T00:00:00.000Z',
            quizId: 'cissp',
            questionText: 'New',
            dumpText: 'rollback me'
          }
        ]
      })
    );
    assert(validated.ok, 'payload ok');

    const res = await dataImport.applyImportMerge({
      payload: validated.payload,
      localStorage: ls,
      mergeApi: mergeApi,
      idb: idbHarness.idb,
      brainIdbReadOk: true,
      existingBrainDumps: brainSnap.records,
      writeBrainDumps: function (recs) {
        return dataImport.writeBrainDumpsToIdb(idbHarness.idb, recs).then(function (n) {
          if (!n) return Promise.reject(new Error('idb write failed'));
          return Promise.reject(new Error('simulated post-write failure'));
        });
      }
    });
    assert(!res.ok, 'import fails closed');
    assert(JSON.stringify(snapshot(ls)) === lsBefore, 'localStorage restored');
    const afterIdb = await dataImport.readBrainDumpsFromIdb(idbHarness.idb);
    assert(afterIdb.readOk, 'idb read after rollback');
    assert(JSON.stringify(afterIdb.records) === idbBefore, 'idb restored to pre-import snapshot');
  });

  await test('applyImportMerge noop when re-importing same export', async function () {
    game.shutdownForTests && game.shutdownForTests();
    const ls = new LocalStorageMock();
    game.setDeps({
      localStorage: ls,
      locks: null,
      storageEventTarget: null,
      now: function () { return Date.parse('2026-11-22T12:00:00Z'); }
    });
    const gameState = game.defaultState();
    gameState.streak = 14;
    gameState.v = 1;
    gameState.answerDedup = { '2026-11-21:s1:q1': true };
    ls.setItem('cloudcram_game_v1', JSON.stringify(gameState));
    const validated = dataImport.validatePayloadRoot(
      minimalPayload({
        localStorage: {
          quizCompleted: '["cissp"]',
          cloudcram_game_v1: JSON.stringify(gameState)
        }
      })
    );
    const first = await dataImport.applyImportMerge({
      payload: validated.payload,
      localStorage: ls,
      mergeApi: mergeApi,
      gameApi: game,
      existingBrainDumps: [],
      writeBrainDumps: function () { return Promise.resolve(0); }
    });
    assert(first.ok, 'first ok');
    const second = await dataImport.applyImportMerge({
      payload: validated.payload,
      localStorage: ls,
      mergeApi: mergeApi,
      gameApi: game,
      existingBrainDumps: [],
      writeBrainDumps: function () { return Promise.resolve(0); }
    });
    assert(second.ok && second.noop, 're-import noop');
  });

  function makeKeyedPlainObject(count, keyFn, valueFn) {
    const o = {};
    for (let i = 0; i < count; i++) {
      o[keyFn(i)] = valueFn(i);
    }
    return o;
  }

  function minimalGameState(overrides) {
    return Object.assign({ v: 1, streak: 0, best: 0 }, overrides || {});
  }

  function gamePayload(gameState) {
    return minimalPayload({
      localStorage: { cloudcram_game_v1: JSON.stringify(gameState) }
    });
  }

  async function assertOverCapRejected(mapField, buildMap, cap, lsOptional) {
    const game = minimalGameState();
    game[mapField] = buildMap(cap + 1);
    const res = dataImport.validatePayloadRoot(gamePayload(game));
    assert(!res.ok, mapField + ' over cap rejected');
    if (lsOptional) {
      const before = JSON.stringify(snapshot(lsOptional));
      assert(JSON.stringify(snapshot(lsOptional)) === before, mapField + ' storage unchanged');
    }
  }

  function assertAtCapAccepted(mapField, buildMap, cap) {
    const game = minimalGameState();
    game[mapField] = buildMap(cap);
    const res = dataImport.validatePayloadRoot(gamePayload(game));
    assert(res.ok, mapField + ' at cap accepted');
  }

  function assertUnderCapAccepted(mapField, buildMap) {
    const game = minimalGameState();
    game[mapField] = buildMap(3);
    const res = dataImport.validatePayloadRoot(gamePayload(game));
    assert(res.ok, mapField + ' under cap accepted');
  }

  const dayEntry = function () {
    return { answers: 0, met: false, celebrated: false, streakAwarded: false, kind: 'normal' };
  };

  await test('rejects over-cap dayRecords and leaves storage unchanged', async function () {
    const ls = new LocalStorageMock({ quizCompleted: '["keep"]' });
    await assertOverCapRejected(
      'dayRecords',
      function (n) {
        return makeKeyedPlainObject(n, function (i) {
          return '2020-01-' + String((i % 28) + 1).padStart(2, '0') + ':' + i;
        }, function () {
          return dayEntry();
        });
      },
      dataImport.MAX_DAY_RECORD_KEYS,
      ls
    );
  });

  await test('accepts at-cap and under-cap dayRecords', function () {
    const build = function (n, compact) {
      return makeKeyedPlainObject(n, function (i) {
        return '2021-06-' + String((i % 28) + 1).padStart(2, '0') + ':' + i;
      }, function () {
        return compact ? {} : dayEntry();
      });
    };
    assertAtCapAccepted('dayRecords', function (n) {
      return build(n, true);
    }, dataImport.MAX_DAY_RECORD_KEYS);
    assertUnderCapAccepted('dayRecords', function (n) {
      return build(n, false);
    });
  });

  await test('rejects invalid dayRecords entry shape', function () {
    const game = minimalGameState({ dayRecords: { '2026-01-01': 'not-an-object' } });
    assert(!dataImport.validatePayloadRoot(gamePayload(game)).ok, 'bad day record value');
  });

  await test('rejects over-cap notices and accepts at or under cap', function () {
    const build = function (n) {
      return makeKeyedPlainObject(n, function (i) {
        return 'notice_' + i;
      }, function () {
        return true;
      });
    };
    const over = minimalGameState({ notices: build(dataImport.MAX_NOTICE_KEYS + 1) });
    assert(!dataImport.validatePayloadRoot(gamePayload(over)).ok, 'notices over cap');
    assertAtCapAccepted('notices', build, dataImport.MAX_NOTICE_KEYS);
    assertUnderCapAccepted('notices', build);
  });

  await test('rejects over-cap settingsRevision and accepts at or under cap', function () {
    const build = function (n) {
      return makeKeyedPlainObject(n, function (i) {
        return i === 0 ? 'soundOn' : i === 1 ? 'goal' : 'extra_' + i;
      }, function (i) {
        return i;
      });
    };
    const over = minimalGameState({ settingsRevision: build(dataImport.MAX_SETTINGS_REVISION_KEYS + 1) });
    assert(!dataImport.validatePayloadRoot(gamePayload(over)).ok, 'settingsRevision over cap');
    assertAtCapAccepted('settingsRevision', build, dataImport.MAX_SETTINGS_REVISION_KEYS);
    assertUnderCapAccepted('settingsRevision', build);
  });

  await test('rejects invalid settingsRevision value type', function () {
    const game = minimalGameState({ settingsRevision: { soundOn: 'nope', goal: 0 } });
    assert(!dataImport.validatePayloadRoot(gamePayload(game)).ok, 'settingsRevision bad value');
  });

  await test('rejects over-cap answerDedup', function () {
    const game = minimalGameState({
      answerDedup: makeKeyedPlainObject(dataImport.MAX_DEDUP_KEYS + 1, function (i) {
        return 'k:' + i;
      }, function () {
        return true;
      })
    });
    assert(!dataImport.validatePayloadRoot(gamePayload(game)).ok, 'answerDedup over cap');
  });

  await test('accepts under-cap answerDedup', function () {
    const build = function (n) {
      return makeKeyedPlainObject(n, function (i) {
        return 'k:' + i;
      }, function () {
        return true;
      });
    };
    assertUnderCapAccepted('answerDedup', build);
  });

  await test('data-export filename uses cloudcram-progress prefix', function () {
    const sandbox = { window: {}, console: console };
    sandbox.window = sandbox;
    vm.createContext(sandbox);
    vm.runInContext(fs.readFileSync(path.join(ROOT, 'data-export.js'), 'utf8'), sandbox);
    assert(
      sandbox.window.CloudCramDataExport.progressFilenameForDate('2026-11-22') ===
        'cloudcram-progress-2026-11-22.json',
      'progress filename'
    );
  });

  console.log('\n' + passed + ' passed, ' + failed + ' failed');
  process.exit(failed > 0 ? 1 : 0);
})().catch(function (e) {
  console.error(e);
  process.exit(1);
});