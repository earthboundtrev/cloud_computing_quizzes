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
  const env = makeEnv(opened + 50 * 3600000);
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
  const s = env.game.loadState();
  assert(s.repair, 'repair still open after clock back');
  assert(s.streak !== 4 || s.repair, 'repair not completed via max timestamp after clock back');
});

test('unknown version keeps corrupt blob once', function () {
  const ls = new LocalStorageMock({ cloudcram_game_v1: JSON.stringify({ v: 99, streak: 99 }) });
  const game = loadGame();
  game.setDeps({ localStorage: ls, locks: null, storageEventTarget: null });
  const s = game.loadState();
  assert(s.streak === 0, 'defaults');
  assert(ls.getItem('cloudcram_game_v1_corrupt'), 'corrupt stored');
});

test('mergeStates drops stale open repair when other tab restored streak', function () {
  const game = loadGame();
  const completed = game.defaultState();
  completed.streak = 5;
  completed.repair = null;
  completed.hadStreakBreak = false;
  completed.lastRepairCompletedAt = 200;
  const stale = game.defaultState();
  stale.streak = 0;
  stale.repair = { openedAt: 50, streakAtBreak: 5, metDays: [], missedDay: '2026-01-01', maxNow: 50 };
  stale.hadStreakBreak = true;
  stale.dayRecords['2026-01-01'] = { answers: 0, met: false, celebrated: false, streakAwarded: false, kind: 'missed' };
  completed.dayRecords['2026-01-01'] = { answers: 3, met: true, celebrated: true, streakAwarded: true, kind: 'repaired' };
  const m = game.mergeStates(completed, stale);
  const m2 = game.mergeStates(stale, completed);
  assert(m.repair === null, 'repair cleared');
  assert(m.streak === 5, 'streak restored, was ' + m.streak);
  assert(m2.streak === 5, 'streak restored either order, was ' + m2.streak);
});

test('mergeStates reconciles answer counts from dedup keys', function () {
  const game = loadGame();
  const a = game.defaultState();
  const b = game.defaultState();
  a.dayRecords['2026-05-02'] = { answers: 1, met: false, celebrated: false, streakAwarded: false, kind: 'normal' };
  b.answerDedup['2026-05-02:s1:q1'] = true;
  b.answerDedup['2026-05-02:s2:q2'] = true;
  const m = game.mergeStates(a, b);
  assert(m.dayRecords['2026-05-02'].answers === 2, 'answers from dedup');
});

test('rebuilt streak not minned by historic missed day', function () {
  const game = loadGame();
  const live = game.defaultState();
  live.streak = 5;
  live.dayRecords['2026-01-01'] = { answers: 0, met: false, celebrated: false, streakAwarded: false, kind: 'missed' };
  const stale = game.defaultState();
  stale.streak = 4;
  const m = game.mergeStates(live, stale);
  assert(m.streak === 5, 'max streak when both nonzero, got ' + m.streak);
});

test('unmet missed day keeps min streak vs stale high tab', function () {
  const game = loadGame();
  const live = game.defaultState();
  live.streak = 1;
  live.hadStreakBreak = false;
  live.dayRecords['2026-03-01'] = { answers: 0, met: false, celebrated: false, streakAwarded: false, kind: 'missed' };
  const stale = game.defaultState();
  stale.streak = 12;
  const m = game.mergeStates(live, stale);
  assert(m.streak === 1, 'unmet miss keeps lower live streak, got ' + m.streak);
});

test('new miss beats stale resolved repair merge', function () {
  const game = loadGame();
  const live = game.defaultState();
  live.streak = 0;
  live.hadStreakBreak = true;
  live.lastRepairCompletedAt = 5000;
  live.dayRecords['2026-03-01'] = { answers: 0, met: false, celebrated: false, streakAwarded: false, kind: 'missed' };
  const stale = game.defaultState();
  stale.streak = 12;
  stale.repair = { openedAt: 6000, streakAtBreak: 12, metDays: [], missedDay: '2026-02-01', maxNow: 6000 };
  stale.lastRepairCompletedAt = 5000;
  const m = game.mergeStates(live, stale);
  assert(m.streak === 0, 'new miss keeps streak 0, got ' + m.streak);
});

test('union repair metDays completes repair', function () {
  const game = loadGame();
  const a = game.defaultState();
  const b = game.defaultState();
  const rep = { openedAt: 100, streakAtBreak: 4, metDays: ['2026-04-01'], missedDay: '2026-03-31', maxNow: 100 };
  a.repair = rep;
  a.streak = 0;
  a.lastRepairCompletedAt = 0;
  b.repair = Object.assign({}, rep, { metDays: ['2026-04-02'] });
  b.streak = 0;
  b.lastRepairCompletedAt = 0;
  const m = game.mergeStates(a, b);
  assert(m.repair === null, 'repair completed');
  assert(m.streak === 4, 'streak restored');
});

test('merge met day clears open repair and keeps higher streak', function () {
  const game = loadGame();
  const missedSide = game.defaultState();
  missedSide.streak = 0;
  missedSide.repair = { openedAt: 1, streakAtBreak: 5, metDays: [], missedDay: '2026-10-05', maxNow: 1 };
  missedSide.dayRecords['2026-10-05'] = { answers: 0, met: false, celebrated: false, streakAwarded: false, kind: 'missed' };
  const metSide = game.defaultState();
  metSide.streak = 5;
  metSide.dayRecords['2026-10-05'] = { answers: 3, met: true, celebrated: true, streakAwarded: true, kind: 'normal' };
  const m = game.mergeStates(missedSide, metSide);
  assert(m.repair === null, 'repair cleared when day met');
  assert(m.streak === 5, 'streak max when day met, got ' + m.streak);
});

test('repair metDays defaults when missing', function () {
  const game = loadGame();
  const ls = new LocalStorageMock({
    cloudcram_game_v1: JSON.stringify({
      v: 1,
      dailyGoal: 3,
      streak: 0,
      best: 0,
      freezes: 0,
      firstRunDone: true,
      lastProcessedDate: '2026-11-02',
      lastSeenDate: '2026-11-02',
      repair: { openedAt: 1, streakAtBreak: 3, missedDay: '2026-11-01' },
      dayRecords: {},
      answerDedup: {}
    })
  });
  game.setDeps({ localStorage: ls, locks: null, storageEventTarget: null, now: function () { return Date.parse('2026-11-02T12:00:00'); } });
  return game.recordAnswer('s1', 'q1').then(function () {
    return game.recordAnswer('s1', 'q2');
  }).then(function () {
    return game.recordAnswer('s1', 'q3');
  }).then(function () {
    assert(true, 'no throw');
  });
});

test('vacation days are not finalized as missed after vacation ends', function () {
  const env = makeEnv(Date.parse('2026-01-08T12:00:00'));
  env.game.syncWrite(function (st) {
    st.firstRunDone = true;
    st.streak = 5;
    st.lastProcessedDate = '2026-01-01';
    st.lastSeenDate = '2026-01-01';
    st.vacation = { start: '2026-01-01', end: '2026-01-07', days: 7 };
    st.vacationStartedAt = Date.parse('2026-01-01T12:00:00');
    return st;
  });
  env.game.syncWrite(function (st) {
    env.game.processCalendar(st, env.now());
    return st;
  });
  const s = env.game.loadState();
  assert(s.streak === 5, 'streak unchanged after vacation, got ' + s.streak);
  assert(!s.dayRecords['2026-01-03'] || s.dayRecords['2026-01-03'].kind !== 'missed', 'vacation day not missed');
});

test('new break after past repair uses min streak not stale max', function () {
  const game = loadGame();
  const live = game.defaultState();
  live.streak = 0;
  live.hadStreakBreak = true;
  live.lastRepairCompletedAt = 1000;
  live.dayRecords['2026-02-01'] = { answers: 0, met: false, celebrated: false, streakAwarded: false, kind: 'missed' };
  const stale = game.defaultState();
  stale.streak = 12;
  stale.lastRepairCompletedAt = 1000;
  const m = game.mergeStates(live, stale);
  assert(m.streak === 0, 'new break keeps streak 0, got ' + m.streak);
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
