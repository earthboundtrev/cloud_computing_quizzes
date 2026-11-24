#!/usr/bin/env node

/**
 * Test rhcsa-migration.js (GitHub #41)
 *
 * Verifies sum-merge, mergedFrom / v10_2 skip, retired topics, quizCompleted, idempotency.
 */

const fs = require('fs');
const path = require('path');

const MIGRATION_FLAG = 'rhcsa_migrated_to_v10_3';
const LEGACY_FLAG_V2 = 'rhcsa_migrated_to_v10_2';

class LocalStorageMock {
  constructor() {
    this.store = {};
    this.throwOnKey = null;
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    if (this.throwOnKey === key) {
      throw new Error('QuotaExceededError');
    }
    this.store[key] = String(value);
  }

  clear() {
    this.store = {};
  }

  removeItem(key) {
    delete this.store[key];
  }
}

function runTest(testName, testFn) {
  try {
    testFn();
    console.log(`✓ ${testName}`);
    return true;
  } catch (e) {
    console.error(`✗ ${testName}`);
    console.error(`  ${e.message}`);
    return false;
  }
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(`${message || 'Expected equality'}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }
}

function assertDeepEqual(actual, expected, message) {
  const actualStr = JSON.stringify(actual);
  const expectedStr = JSON.stringify(expected);
  if (actualStr !== expectedStr) {
    throw new Error(`${message || 'Expected deep equality'}:\nExpected: ${expectedStr}\nGot: ${actualStr}`);
  }
}

function loadMigrationScript() {
  const scriptPath = path.join(__dirname, '..', 'rhcsa-migration.js');
  return fs.readFileSync(scriptPath, 'utf8');
}

function loadReservedKeyNamesScript() {
  return fs.readFileSync(path.join(__dirname, '..', 'reserved-key-names.js'), 'utf8');
}

function executeMigrationWithLocalStorage(localStorage) {
  const reservedKeys = loadReservedKeyNamesScript();
  const scriptContent = loadMigrationScript();
  const wrappedScript =
    reservedKeys +
    '\n' +
    scriptContent;
  const func = new Function('localStorage', 'console', 'globalThis', 'require', 'module', wrappedScript);
  const mockConsole = {
    log: () => {},
    error: () => {}
  };
  func(localStorage, mockConsole, globalThis, require, { exports: {} });
}

function testBasicMigration() {
  const localStorage = new LocalStorageMock();

  const rhcsa9Profile = {
    quizId: 'rhcsa9',
    topicStats: {
      Storage: { correct: 10, total: 15 },
      Networking: { correct: 8, total: 10 },
      'RHEL 9 vs 7': { correct: 5, total: 8 },
      Containers: { correct: 3, total: 5 }
    },
    topicMissesFromImports: {
      Storage: ['q1', 'q2'],
      'RHEL 9 vs 7': ['q3'],
      Containers: ['q4']
    }
  };

  localStorage.setItem('study_sessions_profile_rhcsa9', JSON.stringify(rhcsa9Profile));
  localStorage.setItem('quizCompleted', JSON.stringify(['rhcsa9', 'az900']));
  localStorage.setItem('quizOrder', JSON.stringify(['rhcsa9', 'cissp', 'az900']));

  executeMigrationWithLocalStorage(localStorage);

  const rhcsa10Profile = JSON.parse(localStorage.getItem('study_sessions_profile_rhcsa10'));
  assert(rhcsa10Profile.quizId === 'rhcsa10', 'Profile should have rhcsa10 id');
  assertDeepEqual(rhcsa10Profile.topicStats.Storage, { correct: 10, total: 15 }, 'Storage stats');
  assert(rhcsa10Profile.topicStats['RHEL 9 vs 7'] === undefined, 'RHEL 9 vs 7 removed');
  assert(rhcsa10Profile.mergedFrom.indexOf('rhcsa9') !== -1, 'mergedFrom rhcsa9');

  const completed = JSON.parse(localStorage.getItem('quizCompleted'));
  assert(completed.indexOf('rhcsa10') !== -1 && completed.indexOf('rhcsa9') === -1, 'quizCompleted');

  assert(localStorage.getItem(MIGRATION_FLAG) === 'true', 'v10_3 flag');
  assert(localStorage.getItem('study_sessions_profile_rhcsa9') !== null, 'Old profile preserved');
}

function testMergeExistingDataSums() {
  const localStorage = new LocalStorageMock();

  localStorage.setItem(
    'study_sessions_profile_rhcsa9',
    JSON.stringify({
      quizId: 'rhcsa9',
      topicStats: {
        Storage: { correct: 10, total: 15 },
        Networking: { correct: 8, total: 10 },
        'RHEL 9 vs 7': { correct: 5, total: 8 }
      },
      topicMissesFromImports: {}
    })
  );
  localStorage.setItem(
    'study_sessions_profile_rhcsa10',
    JSON.stringify({
      quizId: 'rhcsa10',
      topicStats: {
        Networking: { correct: 20, total: 25 },
        SELinux: { correct: 5, total: 8 }
      },
      topicMissesFromImports: { SELinux: ['q5'] }
    })
  );

  executeMigrationWithLocalStorage(localStorage);

  const rhcsa10Profile = JSON.parse(localStorage.getItem('study_sessions_profile_rhcsa10'));
  assertDeepEqual(rhcsa10Profile.topicStats.Networking, { correct: 28, total: 35 }, 'Networking summed');
  assertDeepEqual(rhcsa10Profile.topicStats.SELinux, { correct: 5, total: 8 }, 'SELinux preserved');
  assertDeepEqual(rhcsa10Profile.topicStats.Storage, { correct: 10, total: 15 }, 'Storage added');
}

function testScenarioC2() {
  const localStorage = new LocalStorageMock();

  localStorage.setItem(
    'study_sessions_profile_rhcsa9',
    JSON.stringify({
      quizId: 'rhcsa9',
      topicStats: {
        Storage: { correct: 14, total: 20 },
        SELinux: { correct: 1, total: 2 },
        Boot: { correct: 3, total: 5 },
        Containers: { correct: 9, total: 9 }
      },
      topicMissesFromImports: {
        Networking: 3
      }
    })
  );
  localStorage.setItem(
    'study_sessions_profile_rhcsa10',
    JSON.stringify({
      quizId: 'rhcsa10',
      topicStats: {
        Storage: { correct: 2, total: 3 },
        Flatpak: { correct: 1, total: 4 }
      },
      topicMissesFromImports: {
        Networking: 1
      }
    })
  );

  executeMigrationWithLocalStorage(localStorage);

  const p = JSON.parse(localStorage.getItem('study_sessions_profile_rhcsa10'));
  assertDeepEqual(p.topicStats.Storage, { correct: 16, total: 23 }, 'C2 Storage sum');
  assertDeepEqual(p.topicStats.Flatpak, { correct: 1, total: 4 }, 'Flatpak kept');
  assertDeepEqual(p.topicStats.SELinux, { correct: 1, total: 2 }, 'SELinux from rhcsa9');
  assertDeepEqual(p.topicStats.Boot, { correct: 3, total: 5 }, 'Boot from rhcsa9');
  assert(p.topicStats.Containers === undefined, 'Containers excluded');
  assertEqual(p.topicMissesFromImports.Networking, 4, 'Networking misses sum');
  assert(localStorage.getItem(MIGRATION_FLAG) === 'true', 'flag set');
}

function testScenarioC2WithV10_2OverlapSum() {
  const localStorage = new LocalStorageMock();
  localStorage.setItem(LEGACY_FLAG_V2, 'true');

  localStorage.setItem(
    'study_sessions_profile_rhcsa9',
    JSON.stringify({
      quizId: 'rhcsa9',
      topicStats: {
        Storage: { correct: 14, total: 20 },
        SELinux: { correct: 1, total: 2 },
        Boot: { correct: 3, total: 5 }
      },
      topicMissesFromImports: { Networking: 3 }
    })
  );
  localStorage.setItem(
    'study_sessions_profile_rhcsa10',
    JSON.stringify({
      quizId: 'rhcsa10',
      topicStats: { Storage: { correct: 2, total: 3 }, Flatpak: { correct: 1, total: 4 } },
      topicMissesFromImports: { Networking: 1 }
    })
  );

  executeMigrationWithLocalStorage(localStorage);

  const p = JSON.parse(localStorage.getItem('study_sessions_profile_rhcsa10'));
  assertDeepEqual(p.topicStats.Storage, { correct: 16, total: 23 }, 'v10_2 overlap sum');
  assertDeepEqual(p.topicStats.Flatpak, { correct: 1, total: 4 }, 'Flatpak kept');
  assertDeepEqual(p.topicStats.SELinux, { correct: 1, total: 2 }, 'SELinux from rhcsa9 after v10_2');
  assertDeepEqual(p.topicStats.Boot, { correct: 3, total: 5 }, 'Boot from rhcsa9 after v10_2');
  assertEqual(p.topicMissesFromImports.Networking, 4, 'miss counts summed');
  assert(p.mergedFrom.indexOf('rhcsa9') !== -1, 'mergedFrom set');
}

function testV10_2IdenticalCopyNotDoubled() {
  const localStorage = new LocalStorageMock();
  localStorage.setItem(LEGACY_FLAG_V2, 'true');
  localStorage.setItem(
    'study_sessions_profile_rhcsa9',
    JSON.stringify({
      quizId: 'rhcsa9',
      topicStats: { Storage: { correct: 14, total: 20 } },
      topicMissesFromImports: {}
    })
  );
  localStorage.setItem(
    'study_sessions_profile_rhcsa10',
    JSON.stringify({
      quizId: 'rhcsa10',
      topicStats: { Storage: { correct: 14, total: 20 } },
      topicMissesFromImports: {}
    })
  );
  executeMigrationWithLocalStorage(localStorage);
  const p = JSON.parse(localStorage.getItem('study_sessions_profile_rhcsa10'));
  assertDeepEqual(p.topicStats.Storage, { correct: 14, total: 20 }, 'identical copy not doubled');
}

function testMergedFromSkips() {
  const localStorage = new LocalStorageMock();
  localStorage.setItem(
    'study_sessions_profile_rhcsa9',
    JSON.stringify({
      quizId: 'rhcsa9',
      topicStats: { Storage: { correct: 99, total: 99 } },
      topicMissesFromImports: {}
    })
  );
  localStorage.setItem(
    'study_sessions_profile_rhcsa10',
    JSON.stringify({
      quizId: 'rhcsa10',
      topicStats: { Storage: { correct: 5, total: 10 } },
      topicMissesFromImports: {},
      mergedFrom: ['rhcsa9']
    })
  );
  executeMigrationWithLocalStorage(localStorage);
  const p = JSON.parse(localStorage.getItem('study_sessions_profile_rhcsa10'));
  assertDeepEqual(p.topicStats.Storage, { correct: 5, total: 10 }, 'mergedFrom skips merge');
}

function testAlreadyMergedWithV10_2Flag() {
  const localStorage = new LocalStorageMock();
  localStorage.setItem(LEGACY_FLAG_V2, 'true');

  localStorage.setItem(
    'study_sessions_profile_rhcsa9',
    JSON.stringify({
      quizId: 'rhcsa9',
      topicStats: { Storage: { correct: 14, total: 20 } },
      topicMissesFromImports: {}
    })
  );
  localStorage.setItem(
    'study_sessions_profile_rhcsa10',
    JSON.stringify({
      quizId: 'rhcsa10',
      topicStats: { Storage: { correct: 20, total: 30 } },
      topicMissesFromImports: {}
    })
  );

  executeMigrationWithLocalStorage(localStorage);

  const p = JSON.parse(localStorage.getItem('study_sessions_profile_rhcsa10'));
  assertDeepEqual(p.topicStats.Storage, { correct: 20, total: 30 }, 'P: no double-count without mergedFrom');
  assert(localStorage.getItem(MIGRATION_FLAG) === 'true', 'v10_3 set');
}

function testIdempotent() {
  const localStorage = new LocalStorageMock();
  localStorage.setItem(
    'study_sessions_profile_rhcsa9',
    JSON.stringify({
      quizId: 'rhcsa9',
      topicStats: { Storage: { correct: 10, total: 15 } },
      topicMissesFromImports: {}
    })
  );
  localStorage.setItem('quizCompleted', JSON.stringify(['rhcsa9']));

  executeMigrationWithLocalStorage(localStorage);
  const afterFirst = localStorage.getItem('study_sessions_profile_rhcsa10');

  executeMigrationWithLocalStorage(localStorage);
  const afterSecond = localStorage.getItem('study_sessions_profile_rhcsa10');

  assertEqual(afterFirst, afterSecond, 'Profile unchanged on second run');
}

function testBothInCompleted() {
  const localStorage = new LocalStorageMock();
  localStorage.setItem('quizCompleted', JSON.stringify(['rhcsa9', 'rhcsa10', 'az900']));
  localStorage.setItem(
    'study_sessions_profile_rhcsa9',
    JSON.stringify({ quizId: 'rhcsa9', topicStats: {}, topicMissesFromImports: {} })
  );

  executeMigrationWithLocalStorage(localStorage);

  const completed = JSON.parse(localStorage.getItem('quizCompleted'));
  assert(completed.indexOf('rhcsa9') === -1 && completed.indexOf('rhcsa10') !== -1, 'dedupe completed');
}

function testMissingFieldsOnRhcsa10() {
  const localStorage = new LocalStorageMock();
  localStorage.setItem('study_sessions_profile_rhcsa10', JSON.stringify({ quizId: 'rhcsa10' }));
  localStorage.setItem(
    'study_sessions_profile_rhcsa9',
    JSON.stringify({
      quizId: 'rhcsa9',
      topicStats: { Storage: { correct: 5, total: 10 } }
    })
  );

  executeMigrationWithLocalStorage(localStorage);

  const p = JSON.parse(localStorage.getItem('study_sessions_profile_rhcsa10'));
  assertDeepEqual(p.topicStats.Storage, { correct: 5, total: 10 }, 'missing fields migrated');
  assert(localStorage.getItem(MIGRATION_FLAG) === 'true', 'flag set');
}

function testInvalidRhcsa9Json() {
  const localStorage = new LocalStorageMock();
  localStorage.setItem('study_sessions_profile_rhcsa9', '{not json');
  executeMigrationWithLocalStorage(localStorage);
  assert(localStorage.getItem(MIGRATION_FLAG) === null, 'no flag on invalid JSON');
}

function testInvalidRhcsa9NormalizesRhcsa10() {
  const localStorage = new LocalStorageMock();
  localStorage.setItem('study_sessions_profile_rhcsa9', '{not json');
  localStorage.setItem('study_sessions_profile_rhcsa10', '{}');
  executeMigrationWithLocalStorage(localStorage);
  const p = JSON.parse(localStorage.getItem('study_sessions_profile_rhcsa10'));
  assertDeepEqual(p.topicStats, {}, 'topicStats object after invalid rhcsa9');
  assertDeepEqual(p.topicMissesFromImports, {}, 'topicMissesFromImports object');
  assert(p.quizId === 'rhcsa10', 'quizId on normalized profile');
  assert(localStorage.getItem(MIGRATION_FLAG) === 'true', 'flag after normalize');
}

function testMissingTopicMissesOnlyOnRhcsa10() {
  const localStorage = new LocalStorageMock();
  localStorage.setItem(
    'study_sessions_profile_rhcsa10',
    JSON.stringify({
      quizId: 'rhcsa10',
      topicStats: { Storage: { correct: 1, total: 2 } }
    })
  );
  localStorage.setItem(
    'study_sessions_profile_rhcsa9',
    JSON.stringify({
      quizId: 'rhcsa9',
      topicStats: { Networking: { correct: 3, total: 4 } }
    })
  );
  executeMigrationWithLocalStorage(localStorage);
  const p = JSON.parse(localStorage.getItem('study_sessions_profile_rhcsa10'));
  assertDeepEqual(p.topicMissesFromImports, {}, 'defaults topicMissesFromImports');
  assertDeepEqual(p.topicStats.Storage, { correct: 1, total: 2 }, 'keeps rhcsa10 stats');
  assertDeepEqual(p.topicStats.Networking, { correct: 3, total: 4 }, 'adds rhcsa9-only topic');
  assert(localStorage.getItem(MIGRATION_FLAG) === 'true', 'flag set');
}

function testRhcsa9WithoutImportMisses() {
  const localStorage = new LocalStorageMock();
  localStorage.setItem('quizCompleted', JSON.stringify(['az900', 'rhcsa9']));
  localStorage.setItem(
    'study_sessions_profile_rhcsa9',
    JSON.stringify({
      quizId: 'rhcsa9',
      topicStats: { Storage: { correct: 14, total: 20 } }
    })
  );
  executeMigrationWithLocalStorage(localStorage);
  const p = JSON.parse(localStorage.getItem('study_sessions_profile_rhcsa10'));
  assertDeepEqual(p.topicStats.Storage, { correct: 14, total: 20 }, 'R: Storage 14/20');
  assertDeepEqual(p.topicMissesFromImports, {}, 'empty misses default');
  executeMigrationWithLocalStorage(localStorage);
  executeMigrationWithLocalStorage(localStorage);
  const p2 = JSON.parse(localStorage.getItem('study_sessions_profile_rhcsa10'));
  assertDeepEqual(p2.topicStats.Storage, { correct: 14, total: 20 }, 'R: still 14/20 after reloads');
  const completed = JSON.parse(localStorage.getItem('quizCompleted'));
  assertDeepEqual(completed, ['az900', 'rhcsa10'], 'quizCompleted no duplicates');
}

function testConcurrentFirstRunNoDoubleCount() {
  const localStorage = new LocalStorageMock();
  localStorage.setItem(
    'study_sessions_profile_rhcsa9',
    JSON.stringify({
      quizId: 'rhcsa9',
      topicStats: { Storage: { correct: 14, total: 20 } },
      topicMissesFromImports: {}
    })
  );
  executeMigrationWithLocalStorage(localStorage);
  const afterFirst = JSON.parse(localStorage.getItem('study_sessions_profile_rhcsa10'));
  assertDeepEqual(afterFirst.topicStats.Storage, { correct: 14, total: 20 }, 'T: first run 14/20');
  localStorage.removeItem(MIGRATION_FLAG);
  executeMigrationWithLocalStorage(localStorage);
  const afterSecond = JSON.parse(localStorage.getItem('study_sessions_profile_rhcsa10'));
  assertDeepEqual(afterSecond.topicStats.Storage, { correct: 14, total: 20 }, 'T: mergedFrom prevents 28/40');
  assert(afterSecond.mergedFrom.indexOf('rhcsa9') !== -1, 'mergedFrom set');
}

function testNoRhcsa9Data() {
  const localStorage = new LocalStorageMock();
  executeMigrationWithLocalStorage(localStorage);
  assert(localStorage.getItem(MIGRATION_FLAG) === 'true', 'flag for fresh user');
  assert(localStorage.getItem('study_sessions_profile_rhcsa10') === null, 'no empty profile');
}

function testOldV10FlagStillMigrates() {
  const localStorage = new LocalStorageMock();
  localStorage.setItem('rhcsa_migrated_to_v10', 'true');
  localStorage.setItem(
    'study_sessions_profile_rhcsa9',
    JSON.stringify({
      quizId: 'rhcsa9',
      topicStats: { Storage: { correct: 5, total: 10 } },
      topicMissesFromImports: {}
    })
  );

  executeMigrationWithLocalStorage(localStorage);
  assert(localStorage.getItem('study_sessions_profile_rhcsa10') !== null, 'migrates despite v1 flag');
  assert(localStorage.getItem(MIGRATION_FLAG) === 'true', 'v10_3 set');
}

function assertNoPrototypePollution() {
  assertEqual(({}).polluted, undefined, 'Object.prototype not polluted');
}

function testReservedKeysSkippedInTopicMaps() {
  const localStorage = new LocalStorageMock();
  localStorage.setItem(
    'study_sessions_profile_rhcsa10',
    JSON.stringify({
      quizId: 'rhcsa10',
      topicStats: { Storage: { correct: 10, total: 15 } },
      topicMissesFromImports: { Storage: 2 },
      mergedFrom: []
    })
  );
  localStorage.setItem(
    'study_sessions_profile_rhcsa9',
    '{"quizId":"rhcsa9","topicStats":{"Storage":{"correct":3,"total":5},"__proto__":{"correct":99,"total":99},"constructor":{"correct":88,"total":88},"prototype":{"correct":77,"total":77}},"topicMissesFromImports":{"Networking":4,"__proto__":50,"constructor":60,"prototype":70}}'
  );
  executeMigrationWithLocalStorage(localStorage);
  const p = JSON.parse(localStorage.getItem('study_sessions_profile_rhcsa10'));
  assertDeepEqual(p.topicStats.Storage, { correct: 13, total: 20 }, 'Storage summed; reserved skipped');
  assert(!Object.prototype.hasOwnProperty.call(p.topicStats, '__proto__'), 'no __proto__ topic stat');
  assert(!Object.prototype.hasOwnProperty.call(p.topicStats, 'constructor'), 'no constructor topic stat');
  assert(!Object.prototype.hasOwnProperty.call(p.topicStats, 'prototype'), 'no prototype topic stat');
  assertEqual(p.topicStats.Networking, undefined, 'Networking only from misses path not stats');
  assertDeepEqual(p.topicMissesFromImports.Storage, 2, 'rhcsa10 miss unchanged');
  assertEqual(p.topicMissesFromImports.Networking, 4, 'valid miss merged');
  assert(!Object.prototype.hasOwnProperty.call(p.topicMissesFromImports, '__proto__'), 'no reserved miss keys');
  assert(!Object.prototype.hasOwnProperty.call(p.topicMissesFromImports, 'constructor'), 'no constructor miss');
  assert(!Object.prototype.hasOwnProperty.call(p.topicMissesFromImports, 'prototype'), 'no prototype miss');
  assertNoPrototypePollution();
}

function testReservedKeysInExistingRhcsa10NotApplied() {
  const localStorage = new LocalStorageMock();
  const pollutionMarker = { polluted: true };
  localStorage.setItem(
    'study_sessions_profile_rhcsa10',
    '{"quizId":"rhcsa10","topicStats":{"Storage":{"correct":5,"total":8},"__proto__":{"correct":100,"total":100},"Containers":{"correct":2,"total":3}},"topicMissesFromImports":{"__proto__":9},"mergedFrom":["rhcsa9"]}'
  );
  localStorage.setItem(
    'study_sessions_profile_rhcsa9',
    JSON.stringify({
      quizId: 'rhcsa9',
      topicStats: { Storage: { correct: 1, total: 2 } }
    })
  );
  executeMigrationWithLocalStorage(localStorage);
  const p = JSON.parse(localStorage.getItem('study_sessions_profile_rhcsa10'));
  assertDeepEqual(p.topicStats.Storage, { correct: 5, total: 8 }, 'already-merged rhcsa10 Storage unchanged');
  assertDeepEqual(p.topicStats.Containers, { correct: 2, total: 3 }, 'retired topic on rhcsa10 preserved');
  assert(!Object.prototype.hasOwnProperty.call(p.topicStats, '__proto__'), 'reserved stripped from stored profile');
  assert(!Object.prototype.hasOwnProperty.call(p.topicStats, 'constructor'), 'no constructor on rhcsa10 stats');
  assert(!Object.prototype.hasOwnProperty.call(p.topicStats, 'prototype'), 'no prototype on rhcsa10 stats');
  assert(!Object.prototype.hasOwnProperty.call(p.topicMissesFromImports, '__proto__'), 'reserved miss stripped');
  assertEqual(({}).polluted, undefined, 'prototype clean');
  assert(pollutionMarker.polluted === true, 'local marker unchanged');
}

function testWriteFailureNoFlag() {
  const localStorage = new LocalStorageMock();
  localStorage.setItem(
    'study_sessions_profile_rhcsa9',
    JSON.stringify({
      quizId: 'rhcsa9',
      topicStats: { Storage: { correct: 1, total: 2 } },
      topicMissesFromImports: {}
    })
  );
  localStorage.throwOnKey = 'study_sessions_profile_rhcsa10';

  executeMigrationWithLocalStorage(localStorage);
  assert(localStorage.getItem(MIGRATION_FLAG) === null, 'no flag when write fails');
}

console.log('\n=== Testing rhcsa-migration.js ===\n');

let passed = 0;
let total = 0;

const tests = [
  ['Basic migration of profile data', testBasicMigration],
  ['Merge sums overlapping topic stats (#41)', testMergeExistingDataSums],
  ['Scenario C2 overlap sums', testScenarioC2],
  ['Scenario C2 with v10_2 — overlap sum only', testScenarioC2WithV10_2OverlapSum],
  ['Scenario P: v10_2 studied profile — no double count', testAlreadyMergedWithV10_2Flag],
  ['v10_2 identical copy not doubled', testV10_2IdenticalCopyNotDoubled],
  ['mergedFrom marker skips re-merge', testMergedFromSkips],
  ['Idempotent second run', testIdempotent],
  ['Both rhcsa9 and rhcsa10 in quizCompleted', testBothInCompleted],
  ['Missing topicStats on rhcsa10', testMissingFieldsOnRhcsa10],
  ['Invalid rhcsa9 JSON — no flag', testInvalidRhcsa9Json],
  ['Invalid rhcsa9 JSON normalizes rhcsa10 {}', testInvalidRhcsa9NormalizesRhcsa10],
  ['Missing topicMissesFromImports on rhcsa10 (M)', testMissingTopicMissesOnlyOnRhcsa10],
  ['Rerun keeps Storage 14/20 (R)', testRhcsa9WithoutImportMisses],
  ['Second run with mergedFrom — no double count (T)', testConcurrentFirstRunNoDoubleCount],
  ['No rhcsa9 data (fresh user)', testNoRhcsa9Data],
  ['Old v10 flag does not block migration', testOldV10FlagStillMigrates],
  ['Profile write failure — no flag (F)', testWriteFailureNoFlag],
  ['Reserved keys skipped in topic maps (#127)', testReservedKeysSkippedInTopicMaps],
  ['Reserved keys — rhcsa10 totals unchanged when mergedFrom set', testReservedKeysInExistingRhcsa10NotApplied]
];

tests.forEach(([name, fn]) => {
  total++;
  if (runTest(name, fn)) {
    passed++;
  }
});

console.log(`\n${passed}/${total} tests passed`);

if (passed === total) {
  console.log('\n✓ All tests passed!\n');
  process.exit(0);
} else {
  console.error(`\n✗ ${total - passed} test(s) failed\n`);
  process.exit(1);
}
