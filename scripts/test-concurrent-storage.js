#!/usr/bin/env node
'use strict';

/**
 * Multi-tab localStorage RMW: peer storage merge + locked verify (#68, #79).
 */

const path = require('path');

const ROOT = path.join(__dirname, '..');
const mergePath = path.join(ROOT, 'storage-tab-merge.js');
const gamePath = path.join(ROOT, 'gamification.js');

const STRESS_RUNS = Math.max(20, parseInt(process.env.STRESS_RUNS || '20', 10) || 20);

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

/** Simulates Chrome cross-renderer localStorage lag + storage events. */
class SplitBrainLocalStorage {
  constructor() {
    this.truth = Object.create(null);
    this.tabs = [];
  }

  createTab() {
    const self = this;
    const tab = {
      view: Object.assign(Object.create(null), self.truth),
      storageListeners: []
    };
    self.tabs.push(tab);
    const ls = {
      getItem(k) {
        return Object.prototype.hasOwnProperty.call(tab.view, k) ? tab.view[k] : null;
      },
      setItem(k, v) {
        const s = String(v);
        self.truth[k] = s;
        tab.view[k] = s;
        self.tabs.forEach(function (other) {
          if (other === tab) return;
          const oldValue = Object.prototype.hasOwnProperty.call(other.view, k) ? other.view[k] : null;
          setImmediate(function () {
            other.view[k] = s;
            const ev = { key: k, newValue: s, oldValue: oldValue };
            if (other.merge && other.merge.handleStorageEvent) {
              try {
                other.merge.handleStorageEvent(ev, other.localStorage, other.locks || null);
              } catch (e) {}
            }
            other.storageListeners.forEach(function (fn) {
              try {
                fn(ev);
              } catch (e) {}
            });
          });
        });
      }
    };
    const storageEventTarget = {
      addEventListener: function (name, fn) {
        if (name === 'storage') tab.storageListeners.push(fn);
      },
      removeEventListener: function () {}
    };
    return { localStorage: ls, storageEventTarget: storageEventTarget, merge: null, locks: null };
  }

  truthGet(k) {
    return this.truth[k] || null;
  }
}

function wirePeerStorage(tab, merge, locks) {
  tab.merge = merge;
  tab.locks = locks;
}

function linkMergeBroadcast(mergeA, mergeB) {
  mergeA.setTestBroadcast(function (msg) {
    mergeB.ingestMessage(msg);
  });
  mergeB.setTestBroadcast(function (msg) {
    mergeA.ingestMessage(msg);
  });
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

function wireSplitTab(split, merge, locks, nowMs) {
  const game = loadGame();
  game.setDeps({
    localStorage: split.localStorage,
    now: function () {
      return nowMs;
    },
    locks: locks,
    storageEventTarget: split.storageEventTarget,
    storageMerge: merge
  });
  split.merge = merge;
  return game;
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

async function stressProfileTwoTabsSplitBrain() {
  let pass = 0;
  for (let run = 0; run < STRESS_RUNS; run++) {
    teardownHarness();
    const brain = new SplitBrainLocalStorage();
    const tabA = brain.createTab();
    const tabB = brain.createTab();
    const locks = makeSharedLocksMock();
    const mergeA = loadMerge();
    const mergeB = loadMerge();
    mergeA.resetPendingForTests();
    mergeB.resetPendingForTests();
    linkMergeBroadcast(mergeA, mergeB);
    wirePeerStorage(tabA, mergeA, locks);
    wirePeerStorage(tabB, mergeB, locks);
    const key = 'study_sessions_profile_rhce';
    const idA = 'stress-a-' + run;
    const idB = 'stress-b-' + run;
    await Promise.all([
      mergeA.saveProfileAttempt({
        storageKey: key,
        lockName: key,
        quizId: 'rhce',
        attempt: { id: idA, topicStats: { Linux: { correct: 40, total: 40 } } },
        localStorage: tabA.localStorage,
        locks: locks
      }),
      mergeB.saveProfileAttempt({
        storageKey: key,
        lockName: key,
        quizId: 'rhce',
        attempt: { id: idB, topicStats: { Linux: { correct: 40, total: 40 } } },
        localStorage: tabB.localStorage,
        locks: locks
      })
    ]);
    await delayMs(25);
    const profile = mergeA.parseProfile(brain.truthGet(key), 'rhce');
    assert(profile.topicStats.Linux && profile.topicStats.Linux.total === 80, 'run ' + run + ' profile 80 got ' + (profile.topicStats.Linux && profile.topicStats.Linux.total));
    pass++;
  }
  return pass;
}

async function stressLegacyProfileTwoTabs() {
  let pass = 0;
  for (let run = 0; run < STRESS_RUNS; run++) {
    teardownHarness();
    const brain = new SplitBrainLocalStorage();
    const tabA = brain.createTab();
    const tabB = brain.createTab();
    const locks = makeSharedLocksMock();
    const mergeA = loadMerge();
    const mergeB = loadMerge();
    linkMergeBroadcast(mergeA, mergeB);
    wirePeerStorage(tabA, mergeA, locks);
    wirePeerStorage(tabB, mergeB, locks);
    const key = 'study_sessions_profile_rhce';
    const legacy = {
      quizId: 'rhce',
      topicStats: { Linux: { correct: 14, total: 14 } },
      topicMissesFromImports: { Net: 2 }
    };
    tabA.localStorage.setItem(key, JSON.stringify(legacy));
    tabB.localStorage.setItem(key, JSON.stringify(legacy));
    await Promise.all([
      mergeA.saveProfileAttempt({
        storageKey: key,
        lockName: key,
        quizId: 'rhce',
        attempt: { id: 'leg-a-' + run, topicStats: { Linux: { correct: 40, total: 40 } } },
        localStorage: tabA.localStorage,
        locks: locks
      }),
      mergeB.saveProfileAttempt({
        storageKey: key,
        lockName: key,
        quizId: 'rhce',
        attempt: { id: 'leg-b-' + run, topicStats: { Linux: { correct: 40, total: 40 } } },
        localStorage: tabB.localStorage,
        locks: locks
      })
    ]);
    await delayMs(25);
    const profile = mergeA.parseProfile(brain.truthGet(key), 'rhce');
    const total = profile.topicStats.Linux ? profile.topicStats.Linux.total : 0;
    assert(total === 94, 'legacy run ' + run + ' expected 94 topic total got ' + total);
    pass++;
  }
  return pass;
}

async function stressGameTwoTabsSplitBrain() {
  let pass = 0;
  const now = Date.parse('2026-09-01T12:00:00');
  for (let run = 0; run < STRESS_RUNS; run++) {
    teardownHarness();
    const brain = new SplitBrainLocalStorage();
    const tabA = brain.createTab();
    const tabB = brain.createTab();
    const locks = makeSharedLocksMock();
    const mergeA = loadMerge();
    const mergeB = loadMerge();
    linkMergeBroadcast(mergeA, mergeB);
    wirePeerStorage(tabA, mergeA, locks);
    wirePeerStorage(tabB, mergeB, locks);
    const gameA = wireSplitTab(tabA, mergeA, locks, now);
    const gameB = wireSplitTab(tabB, mergeB, locks, now);
    gameA.syncWrite(function (st) {
      st.firstRunDone = true;
      st.lastProcessedDate = '2026-09-01';
      st.lastSeenDate = '2026-09-01';
      return st;
    });
    const ops = [];
    for (let q = 1; q <= 40; q++) {
      ops.push(gameA.recordAnswer('tab-a-' + run, 'q' + q));
      ops.push(gameB.recordAnswer('tab-b-' + run, 'q' + q));
    }
    await Promise.all(ops);
    await delayMs(20);
    gameA.syncWrite(function (st) {
      return st;
    });
    const raw = JSON.parse(brain.truthGet('cloudcram_game_v1'));
    const n = Object.keys(raw.answerDedup).length;
    assert(n === 80, 'game 2-tab run ' + run + ' expected 80 dedup got ' + n);
    pass++;
  }
  return pass;
}

async function stressGameThreeTabsSplitBrain() {
  let pass = 0;
  const now = Date.parse('2026-10-01T12:00:00');
  for (let run = 0; run < STRESS_RUNS; run++) {
    teardownHarness();
    const brain = new SplitBrainLocalStorage();
    const tabA = brain.createTab();
    const tabB = brain.createTab();
    const tabC = brain.createTab();
    const locks = makeSharedLocksMock();
    const mergeA = loadMerge();
    const mergeB = loadMerge();
    const mergeC = loadMerge();
    mergeA.setTestBroadcast(function (msg) {
      mergeB.ingestMessage(msg);
      mergeC.ingestMessage(msg);
    });
    mergeB.setTestBroadcast(function (msg) {
      mergeA.ingestMessage(msg);
      mergeC.ingestMessage(msg);
    });
    mergeC.setTestBroadcast(function (msg) {
      mergeA.ingestMessage(msg);
      mergeB.ingestMessage(msg);
    });
    wirePeerStorage(tabA, mergeA, locks);
    wirePeerStorage(tabB, mergeB, locks);
    wirePeerStorage(tabC, mergeC, locks);
    const gameA = wireSplitTab(tabA, mergeA, locks, now);
    const gameB = wireSplitTab(tabB, mergeB, locks, now);
    const gameC = wireSplitTab(tabC, mergeC, locks, now);
    gameA.syncWrite(function (st) {
      st.firstRunDone = true;
      st.lastProcessedDate = '2026-10-01';
      st.lastSeenDate = '2026-10-01';
      return st;
    });
    const ops = [];
    for (let q = 1; q <= 40; q++) {
      ops.push(gameA.recordAnswer('a-' + run, 'q' + q));
      ops.push(gameB.recordAnswer('b-' + run, 'q' + q));
      ops.push(gameC.recordAnswer('c-' + run, 'q' + q));
    }
    await Promise.all(ops);
    await delayMs(30);
    gameA.syncWrite(function (st) {
      return st;
    });
    const raw = JSON.parse(brain.truthGet('cloudcram_game_v1'));
    const n = Object.keys(raw.answerDedup).length;
    assert(n === 120, 'game 3-tab run ' + run + ' expected 120 dedup got ' + n);
    pass++;
  }
  return pass;
}

function delayMs(ms) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms);
  });
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

    const p2 = await stressProfileTwoTabsSplitBrain();
    console.log('OK stress 2-tab profile split-brain ' + p2 + '/' + STRESS_RUNS);
    const leg = await stressLegacyProfileTwoTabs();
    console.log('OK stress legacy profile 2-tab ' + leg + '/' + STRESS_RUNS);
    const g2 = await stressGameTwoTabsSplitBrain();
    console.log('OK stress 2-tab game split-brain ' + g2 + '/' + STRESS_RUNS);
    const g3 = await stressGameThreeTabsSplitBrain();
    console.log('OK stress 3-tab game split-brain ' + g3 + '/' + STRESS_RUNS);
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
