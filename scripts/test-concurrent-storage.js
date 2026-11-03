#!/usr/bin/env node
'use strict';

/**
 * Multi-tab localStorage RMW: BroadcastChannel deltas + locked merge (#68, #79).
 */

const path = require('path');

const ROOT = path.join(__dirname, '..');
const mergePath = path.join(ROOT, 'storage-tab-merge.js');
const gamePath = path.join(ROOT, 'gamification.js');

/** @type {Array<{ shutdownForTests?: () => void }>} */
const loadedGames = [];
/** @type {Array<{ closeForTests?: () => void }>} */
const loadedMerges = [];

function assert(cond, msg) {
  if (!cond) throw new Error(msg || 'Assertion failed');
}

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
}

function loadMerge() {
  delete require.cache[require.resolve(mergePath)];
  const merge = require(mergePath);
  loadedMerges.push(merge);
  return merge;
}

function loadGame() {
  delete require.cache[require.resolve(gamePath)];
  const game = require(gamePath);
  loadedGames.push(game);
  return game;
}

function makeSharedLocksMock() {
  let chain = Promise.resolve();
  return {
    request: function (_name, fn) {
      const run = chain.then(function () {
        return Promise.resolve(fn());
      });
      chain = run.catch(function () {
        return undefined;
      });
      return run;
    }
  };
}

function linkTabs() {
  const mergeA = loadMerge();
  const mergeB = loadMerge();
  mergeA.resetPendingForTests();
  mergeB.resetPendingForTests();
  mergeA.setTestBroadcast(function (msg) {
    mergeB.ingestMessage(msg);
  });
  mergeB.setTestBroadcast(function (msg) {
    mergeA.ingestMessage(msg);
  });
  return { mergeA, mergeB };
}

function teardownHarness() {
  loadedGames.forEach(function (game) {
    if (game.shutdownForTests) game.shutdownForTests();
  });
  loadedMerges.forEach(function (merge) {
    if (merge.closeForTests) merge.closeForTests();
  });
  loadedGames.length = 0;
  loadedMerges.length = 0;
  delete require.cache[require.resolve(mergePath)];
  delete require.cache[require.resolve(gamePath)];
}

async function testProfileConcurrentAttempts() {
  const ls = new LocalStorageMock();
  const locks = makeSharedLocksMock();
  const { mergeA, mergeB } = linkTabs();
  const key = 'study_sessions_profile_rhce';

  function attempt(id, total) {
    return {
      id: id,
      topicStats: { Linux: { correct: total, total: total } }
    };
  }

  await Promise.all([
    mergeA.saveProfileAttempt({
      storageKey: key,
      lockName: key,
      quizId: 'rhce',
      attempt: attempt('a1', 40),
      localStorage: ls,
      locks: locks
    }),
    mergeB.saveProfileAttempt({
      storageKey: key,
      lockName: key,
      quizId: 'rhce',
      attempt: attempt('b1', 40),
      localStorage: ls,
      locks: locks
    })
  ]);

  const profile = mergeA.parseProfile(ls.getItem(key), 'rhce');
  assert(profile.topicStats.Linux && profile.topicStats.Linux.total === 80, 'profile totals 80, got ' + (profile.topicStats.Linux && profile.topicStats.Linux.total));
}

async function testGamificationBroadcastConcurrent() {
  const ls = new LocalStorageMock();
  const locks = makeSharedLocksMock();
  const now = Date.parse('2026-09-01T12:00:00');
  const { mergeA, mergeB } = linkTabs();
  const gameA = loadGame();
  const gameB = loadGame();
  gameA.setDeps({
    localStorage: ls,
    now: function () {
      return now;
    },
    locks: locks,
    storageEventTarget: null,
    storageMerge: mergeA
  });
  gameB.setDeps({
    localStorage: ls,
    now: function () {
      return now;
    },
    locks: locks,
    storageEventTarget: null,
    storageMerge: mergeB
  });
  gameA.syncWrite(function (st) {
    st.firstRunDone = true;
    st.lastProcessedDate = '2026-09-01';
    st.lastSeenDate = '2026-09-01';
    return st;
  });

  const ops = [];
  for (let q = 1; q <= 40; q++) {
    ops.push(gameA.recordAnswer('tab-a', 'q' + q));
    ops.push(gameB.recordAnswer('tab-b', 'q' + q));
  }
  await Promise.all(ops);

  const snap = gameA.getSnapshot();
  assert(snap.answers === 80, 'game answers 80, got ' + snap.answers);
  const raw = JSON.parse(ls.getItem('cloudcram_game_v1'));
  assert(Object.keys(raw.answerDedup).length === 80, 'dedup keys 80, got ' + Object.keys(raw.answerDedup).length);
}

async function testConcurrentImportMisses() {
  const ls = new LocalStorageMock();
  const locks = makeSharedLocksMock();
  const { mergeA, mergeB } = linkTabs();
  const key = 'study_sessions_profile_cissp';

  await Promise.all([
    mergeA.saveImportMisses({
      storageKey: key,
      lockName: key,
      quizId: 'cissp',
      importId: 'import-tab-a',
      topicMisses: { IAM: 4, Network: 2 },
      localStorage: ls,
      locks: locks
    }),
    mergeB.saveImportMisses({
      storageKey: key,
      lockName: key,
      quizId: 'cissp',
      importId: 'import-tab-b',
      topicMisses: { IAM: 3, Crypto: 5 },
      localStorage: ls,
      locks: locks
    })
  ]);

  const profile = mergeA.parseProfile(ls.getItem(key), 'cissp');
  assert(profile.topicMissesFromImports.IAM === 7, 'IAM misses sum 7, got ' + profile.topicMissesFromImports.IAM);
  assert(profile.topicMissesFromImports.Network === 2, 'Network misses 2');
  assert(profile.topicMissesFromImports.Crypto === 5, 'Crypto misses 5');
  assert(profile.appliedImportBatches['import-tab-a'] && profile.appliedImportBatches['import-tab-b'], 'both batches applied');

  await mergeA.saveImportMisses({
    storageKey: key,
    lockName: key,
    quizId: 'cissp',
    importId: 'import-tab-a',
    topicMisses: { IAM: 99 },
    localStorage: ls,
    locks: locks
  });
  const again = mergeA.parseProfile(ls.getItem(key), 'cissp');
  assert(again.topicMissesFromImports.IAM === 7, 'replay import-tab-a is idempotent, got ' + again.topicMissesFromImports.IAM);
}

async function testInterleavedProfileWriters() {
  const ls = new LocalStorageMock();
  const merge = loadMerge();
  const key = 'study_sessions_profile_test';
  const writers = [];
  for (let w = 0; w < 2; w++) {
    writers.push(
      (async function (tab) {
        for (let i = 0; i < 5; i++) {
          await merge.saveProfileAttempt({
            storageKey: key,
            lockName: key,
            quizId: 'test',
            attempt: {
              id: tab + '-a' + i,
              topicStats: { T: { correct: 1, total: 1 } }
            },
            localStorage: ls,
            locks: null
          });
        }
      })(w === 0 ? 'A' : 'B')
    );
  }
  await Promise.all(writers);
  const profile = merge.parseProfile(ls.getItem(key), 'test');
  assert(profile.topicStats.T.total === 10, 'ten attempt deltas merged, got ' + profile.topicStats.T.total);
}

async function main() {
  try {
    await testProfileConcurrentAttempts();
    console.log('OK profile concurrent attempts');
    await testGamificationBroadcastConcurrent();
    console.log('OK gamification broadcast concurrent 80 answers');
    await testConcurrentImportMisses();
    console.log('OK concurrent import misses via broadcast');
    await testInterleavedProfileWriters();
    console.log('OK interleaved profile writers');
  } finally {
    teardownHarness();
  }
}

main()
  .then(function () {
    process.exit(0);
  })
  .catch(function (err) {
    teardownHarness();
    console.error(err);
    process.exit(1);
  });
