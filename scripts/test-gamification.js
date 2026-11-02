#!/usr/bin/env node
'use strict';

/**
 * Unit tests for gamification.js (#68).
 */

const path = require('path');
const fs = require('fs');

const ROOT = path.join(__dirname, '..');
const gamePath = path.join(ROOT, 'gamification.js');

class LocalStorageMock {
  constructor(initial) {
    this.store = Object.assign(Object.create(null), initial || {});
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

function loadGame() {
  delete require.cache[require.resolve(gamePath)];
  return require(gamePath);
}

const tests = [];

function test(name, fn) {
  tests.push({ name: name, fn: fn });
}

function makeEnv(atMs) {
  const ls = new LocalStorageMock();
  let nowMs = atMs;
  const game = loadGame();
  game.setDeps({
    localStorage: ls,
    now: function () {
      return nowMs;
    },
    locks: null,
    storageEventTarget: null
  });
  return { game, ls, setNow: function (ms) { nowMs = ms; }, now: function () { return nowMs; } };
}

test('corrupt JSON → defaults and corrupt copy once', function () {
  const ls = new LocalStorageMock({ cloudcram_game_v1: '{not json' });
  const game = loadGame();
  game.setDeps({ localStorage: ls, locks: null, storageEventTarget: null });
  const s = game.loadState();
  assert(s.streak === 0, 'default streak');
  assert(ls.getItem('cloudcram_game_v1_corrupt') === '{not json', 'corrupt kept');
  game.loadState();
  assert(ls.getItem('cloudcram_game_v1_corrupt') === '{not json', 'corrupt once');
});

test('migration imports streak only once', function () {
  const ls = new LocalStorageMock({
    cloudcram_study_streak: '12',
    cloudcram_study_last_date: '2026-11-02'
  });
  const game = loadGame();
  game.setDeps({
    localStorage: ls,
    locks: null,
    storageEventTarget: null,
    now: function () { return Date.parse('2026-11-02T12:00:00'); }
  });
  const a = game.loadState();
  game.persistState(a);
  const b = game.loadState();
  assert(b.streak === 12 && b.best === 12, 'streak 12');
  assert(b.migratedFrom === 'study_streak_v0', 'migrated flag');
  assert(ls.getItem('cloudcram_study_streak') === '12', 'old key untouched');
  game.persistState(b);
  const c = game.loadState();
  assert(c.streak === 12, 'stable on reload');
});

test('goal met twice same day → streak +1 only', async function () {
  const env = makeEnv(Date.parse('2026-11-02T10:00:00'));
  await env.game.recordAnswer('s1', 'q1');
  await env.game.recordAnswer('s1', 'q2');
  await env.game.recordAnswer('s1', 'q3');
  let snap = env.game.getSnapshot();
  assert(snap.streak === 1, 'streak 1 after goal');
  await env.game.recordAnswer('s2', 'q4');
  snap = env.game.getSnapshot();
  assert(snap.streak === 1, 'still streak 1');
});

test('freezes: 7 days → 1, 14 → 2, 21 → still 2', function () {
  const env = makeEnv(Date.parse('2026-01-01T12:00:00'));
  for (let d = 0; d < 7; d++) {
    env.setNow(Date.parse('2026-01-' + String(1 + d).padStart(2, '0') + 'T12:00:00'));
    env.game.syncWrite(function (st) {
      env.game.processCalendar(st, env.now());
      env.game.onGoalMet(st, env.game.todayStr(new Date(env.now())));
      return st;
    });
  }
  let s = env.game.loadState();
  assert(s.freezes === 1, '7 days → 1 freeze');
  for (let d = 7; d < 14; d++) {
    env.setNow(Date.parse('2026-01-' + String(1 + d).padStart(2, '0') + 'T12:00:00'));
    env.game.syncWrite(function (st) {
      env.game.processCalendar(st, env.now());
      env.game.onGoalMet(st, env.game.todayStr(new Date(env.now())));
      return st;
    });
  }
  s = env.game.loadState();
  assert(s.freezes === 2, '14 days → 2 freezes');
  for (let d = 14; d < 21; d++) {
    env.setNow(Date.parse('2026-01-' + String(1 + d).padStart(2, '0') + 'T12:00:00'));
    env.game.syncWrite(function (st) {
      env.game.processCalendar(st, env.now());
      env.game.onGoalMet(st, env.game.todayStr(new Date(env.now())));
      return st;
    });
  }
  s = env.game.loadState();
  assert(s.freezes === 2, '21 days still 2');
});

test('repair offered within 48h not after', function () {
  const opened = Date.parse('2026-06-01T12:00:00');
  const env = makeEnv(opened);
  env.game.syncWrite(function (st) {
    st.repair = { openedAt: opened, streakAtBreak: 5, metDays: [], maxNow: opened };
    return st;
  });
  assert(env.game.repairOfferActive(env.game.loadState(), opened + 47 * 3600000 + 59 * 60000), '47:59 active');
  assert(!env.game.repairOfferActive(env.game.loadState(), opened + 48 * 3600000 + 60000), '48:01 inactive');
});

test('best never decreases', function () {
  const env = makeEnv(Date.parse('2026-03-01T12:00:00'));
  env.game.syncWrite(function (st) {
    st.best = 10;
    st.streak = 0;
    return st;
  });
  const s = env.game.loadState();
  assert(s.best === 10, 'best preserved');
});

test('vacation rejects 15 days and third use in 365 days', async function () {
  const env = makeEnv(Date.parse('2026-01-01T12:00:00'));
  let r = await env.game.startVacation(15);
  assert(!r.ok, '15 rejected');
  env.game.syncWrite(function (st) {
    st.vacationUses = [
      { at: Date.parse('2025-06-01'), days: 3 },
      { at: Date.parse('2025-09-01'), days: 3 }
    ];
    return st;
  });
  r = await env.game.startVacation(3);
  assert(!r.ok && r.error === 'limit', 'third use rejected');
});

test('clock back: no extra streak award', function () {
  const env = makeEnv(Date.parse('2026-04-09T12:00:00'));
  env.game.syncWrite(function (st) {
    st.lastSeenDate = '2026-04-12';
    st.streak = 3;
    st.best = 3;
    st.lastProcessedDate = '2026-04-12';
    st.firstRunDone = true;
    return st;
  });
  const snap = env.game.getSnapshot();
  assert(snap.streak === 3, 'streak unchanged');
});

test('mergeStates union dedup prevents double count', function () {
  const game = loadGame();
  const a = game.defaultState();
  const b = game.defaultState();
  a.answerDedup['s:q1'] = true;
  b.answerDedup['s:q2'] = true;
  a.dayRecords['2026-05-01'] = { answers: 1, met: false, celebrated: false, streakAwarded: false, kind: 'normal' };
  b.dayRecords['2026-05-01'] = { answers: 2, met: false, celebrated: false, streakAwarded: false, kind: 'normal' };
  const m = game.mergeStates(a, b);
  assert(m.dayRecords['2026-05-01'].answers === 2, 'max answers');
  assert(m.answerDedup['s:q1'] && m.answerDedup['s:q2'], 'union dedup');
});

test('changing goal when today met schedules pending', async function () {
  const env = makeEnv(Date.parse('2026-07-01T12:00:00'));
  env.game.syncWrite(function (st) {
    st.firstRunDone = true;
    st.lastProcessedDate = '2026-07-01';
    st.lastSeenDate = '2026-07-01';
    st.dayRecords['2026-07-01'] = { answers: 3, met: true, celebrated: true, streakAwarded: true, kind: 'normal' };
    return st;
  });
  const res = await env.game.setDailyGoal(10);
  assert(res.ok && res.message === 'Your new goal starts tomorrow', 'tomorrow message');
  const s = env.game.loadState();
  assert(s.pendingGoal && s.pendingGoal.goal === 10, 'pending goal');
});

test('two-tab merge: concurrent answers sum without duplicate dedup keys', async function () {
  const ls = new LocalStorageMock();
  const gameA = loadGame();
  const gameB = loadGame();
  const now = Date.parse('2026-08-01T12:00:00');
  const deps = {
    localStorage: ls,
    now: function () { return now; },
    locks: null,
    storageEventTarget: null
  };
  gameA.setDeps(deps);
  gameB.setDeps(deps);
  gameA.syncWrite(function (st) {
    st.firstRunDone = true;
    st.lastProcessedDate = '2026-08-01';
    st.lastSeenDate = '2026-08-01';
    return st;
  });
  await Promise.all([
    gameA.recordAnswer('tab-a', 'q1'),
    gameB.recordAnswer('tab-b', 'q1')
  ]);
  const snap = gameA.getSnapshot();
  assert(snap.answers === 2, 'both tabs counted');
});

test('Monday meet then Wednesday open marks Tuesday missed', function () {
  const env = makeEnv(Date.parse('2026-10-05T20:00:00'));
  env.game.syncWrite(function (st) {
    st.firstRunDone = true;
    st.streak = 1;
    st.lastSeenDate = '2026-10-05';
    st.lastProcessedDate = '2026-10-05';
    st.lastProcessWallMs = Date.parse('2026-10-05T20:00:00');
    st.dayRecords['2026-10-05'] = { answers: 3, met: true, celebrated: true, streakAwarded: true, kind: 'normal' };
    return st;
  });
  env.setNow(Date.parse('2026-10-07T08:00:00'));
  env.game.syncWrite(function (st) {
    env.game.processCalendar(st, env.now());
    return st;
  });
  const s = env.game.loadState();
  assert(s.dayRecords['2026-10-06'] && s.dayRecords['2026-10-06'].kind === 'missed', 'Tuesday missed');
});

test('unmet prior day finalized on next calendar day', function () {
  const env = makeEnv(Date.parse('2026-09-03T12:00:00'));
  env.game.syncWrite(function (st) {
    st.firstRunDone = true;
    st.streak = 1;
    st.lastSeenDate = '2026-09-01';
    st.lastProcessedDate = '2026-09-01';
    st.dayRecords['2026-09-01'] = { answers: 3, met: true, celebrated: true, streakAwarded: true, kind: 'normal' };
    return st;
  });
  env.setNow(Date.parse('2026-09-03T12:00:00'));
  env.game.syncWrite(function (st) {
    env.game.processCalendar(st, env.now());
    return st;
  });
  const s = env.game.loadState();
  assert(s.dayRecords['2026-09-02'] && s.dayRecords['2026-09-02'].kind === 'missed', 'Sep 2 missed');
});

test('clock back does not extend repair success window', function () {
  const opened = Date.parse('2026-06-01T12:00:00');
  const env = makeEnv(opened + 80 * 3600000);
  env.game.syncWrite(function (st) {
    st.repair = { openedAt: opened, streakAtBreak: 4, metDays: ['2026-06-02'], missedDay: '2026-06-01', maxNow: opened + 80 * 3600000 };
    st.maxTimestampSeen = opened + 80 * 3600000;
    return st;
  });
  env.setNow(opened + 10 * 3600000);
  env.game.syncWrite(function (st) {
    env.game.onGoalMet(st, '2026-06-03');
    return st;
  });
  assert(env.game.loadState().repair, 'repair still open after clock back');
});

test('unknown version keeps corrupt blob once', function () {
  const ls = new LocalStorageMock({ cloudcram_game_v1: JSON.stringify({ v: 99, streak: 99 }) });
  const game = loadGame();
  game.setDeps({ localStorage: ls, locks: null, storageEventTarget: null });
  const s = game.loadState();
  assert(s.streak === 0, 'defaults');
  assert(ls.getItem('cloudcram_game_v1_corrupt'), 'corrupt stored');
});

test('mergeStates does not double repairUses when merging identical state', function () {
  const game = loadGame();
  const s = game.defaultState();
  s.repairUses = [1000];
  const m = game.mergeStates(s, s);
  assert(m.repairUses.length === 1, 'repairUses length 1');
});

test('lint scans gamification.js', function () {
  const lintSrc = fs.readFileSync(path.join(ROOT, 'scripts/lint-storage-keys.js'), 'utf8');
  assert(lintSrc.indexOf('gamification.js') >= 0, 'lint scans gamification.js');
});

async function runAll() {
  let passed = 0;
  let failed = 0;
  for (const t of tests) {
    try {
      await t.fn();
      console.log('✓ ' + t.name);
      passed++;
    } catch (e) {
      console.error('✗ ' + t.name);
      console.error('  ' + e.message);
      failed++;
    }
  }
  if (failed > 0) {
    console.error('\n' + failed + ' failed, ' + passed + ' passed');
    process.exit(1);
  }
  console.log('\nAll ' + passed + ' gamification tests passed.');
}

runAll();
