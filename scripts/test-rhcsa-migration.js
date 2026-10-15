#!/usr/bin/env node

/**
 * Test rhcsa-migration.js
 * 
 * Verifies that the migration script correctly:
 * - Copies study_sessions_profile_rhcsa9 to study_sessions_profile_rhcsa10
 * - Merges data if rhcsa10 already exists (doesn't overwrite)
 * - Removes retired topics ("RHEL 9 vs 7" and "Containers")
 * - Replaces rhcsa9 with rhcsa10 in quizCompleted
 * - Is idempotent (safe to run multiple times)
 */

const fs = require('fs');
const path = require('path');

// Simple localStorage mock for Node.js
class LocalStorageMock {
  constructor() {
    this.store = {};
  }
  
  getItem(key) {
    return this.store[key] || null;
  }
  
  setItem(key, value) {
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

// Load and execute migration script
function loadMigrationScript() {
  const scriptPath = path.join(__dirname, '..', 'rhcsa-migration.js');
  const scriptContent = fs.readFileSync(scriptPath, 'utf8');
  return scriptContent;
}

function executeMigrationWithLocalStorage(localStorage) {
  const scriptContent = loadMigrationScript();
  const wrappedScript = `
    (function() {
      ${scriptContent}
    })();
  `;
  const func = new Function('localStorage', 'console', wrappedScript);
  const mockConsole = {
    log: () => {},
    error: () => {}
  };
  func(localStorage, mockConsole);
}

// Test 1: Basic migration of profile data
function testBasicMigration() {
  const localStorage = new LocalStorageMock();
  
  // Seed rhcsa9 data with realistic topic stats
  const rhcsa9Profile = {
    quizId: 'rhcsa9',
    topicStats: {
      'Storage': { correct: 10, total: 15 },
      'Networking': { correct: 8, total: 10 },
      'RHEL 9 vs 7': { correct: 5, total: 8 },
      'Containers': { correct: 3, total: 5 }
    },
    topicMissesFromImports: {
      'Storage': ['q1', 'q2'],
      'RHEL 9 vs 7': ['q3'],
      'Containers': ['q4']
    }
  };
  
  localStorage.setItem('study_sessions_profile_rhcsa9', JSON.stringify(rhcsa9Profile));
  localStorage.setItem('quizCompleted', JSON.stringify(['rhcsa9', 'az900']));
  localStorage.setItem('quizOrder', JSON.stringify(['rhcsa9', 'cissp', 'az900']));
  
  // Run migration
  executeMigrationWithLocalStorage(localStorage);
  
  // Verify profile was migrated
  const rhcsa10ProfileStr = localStorage.getItem('study_sessions_profile_rhcsa10');
  assert(rhcsa10ProfileStr !== null, 'rhcsa10 profile should exist');
  
  const rhcsa10Profile = JSON.parse(rhcsa10ProfileStr);
  assert(rhcsa10Profile.quizId === 'rhcsa10', 'Profile should have rhcsa10 id');
  
  // Verify non-retired topics were copied
  assert(rhcsa10Profile.topicStats['Storage'] !== undefined, 'Storage stats should be copied');
  assertDeepEqual(rhcsa10Profile.topicStats['Storage'], { correct: 10, total: 15 }, 'Storage stats should match');
  assert(rhcsa10Profile.topicStats['Networking'] !== undefined, 'Networking stats should be copied');
  
  // Verify retired topics were NOT copied
  assert(rhcsa10Profile.topicStats['RHEL 9 vs 7'] === undefined, 'RHEL 9 vs 7 should be removed');
  assert(rhcsa10Profile.topicStats['Containers'] === undefined, 'Containers should be removed');
  
  // Verify misses were migrated (excluding retired)
  assert(rhcsa10Profile.topicMissesFromImports['Storage'] !== undefined, 'Storage misses should be copied');
  assert(rhcsa10Profile.topicMissesFromImports['RHEL 9 vs 7'] === undefined, 'RHEL 9 vs 7 misses should be removed');
  assert(rhcsa10Profile.topicMissesFromImports['Containers'] === undefined, 'Containers misses should be removed');
  
  // Verify quizCompleted was updated
  const completed = JSON.parse(localStorage.getItem('quizCompleted'));
  assert(completed.indexOf('rhcsa10') !== -1, 'quizCompleted should contain rhcsa10');
  assert(completed.indexOf('rhcsa9') === -1, 'quizCompleted should not contain rhcsa9');
  assert(completed.indexOf('az900') !== -1, 'quizCompleted should still contain az900');
  
  // Verify quizOrder was updated
  const order = JSON.parse(localStorage.getItem('quizOrder'));
  assert(order.indexOf('rhcsa10') !== -1, 'quizOrder should contain rhcsa10');
  assert(order.indexOf('rhcsa9') === -1, 'quizOrder should not contain rhcsa9');
  
  // Verify migration flag was set
  assert(localStorage.getItem('rhcsa_migrated_to_v10_2') === 'true', 'Migration flag should be set');
  
  // Verify old data is preserved
  assert(localStorage.getItem('study_sessions_profile_rhcsa9') !== null, 'Old profile should be preserved');
}

// Test 2: Merge when rhcsa10 data already exists
function testMergeExistingData() {
  const localStorage = new LocalStorageMock();
  
  // Seed rhcsa9 data
  const rhcsa9Profile = {
    quizId: 'rhcsa9',
    topicStats: {
      'Storage': { correct: 10, total: 15 },
      'Networking': { correct: 8, total: 10 },
      'RHEL 9 vs 7': { correct: 5, total: 8 }
    },
    topicMissesFromImports: {}
  };
  
  // Seed existing rhcsa10 data (should NOT be overwritten)
  const existingRhcsa10Profile = {
    quizId: 'rhcsa10',
    topicStats: {
      'Networking': { correct: 20, total: 25 },  // Better stats than rhcsa9
      'SELinux': { correct: 5, total: 8 }  // New topic
    },
    topicMissesFromImports: {
      'SELinux': ['q5']
    }
  };
  
  localStorage.setItem('study_sessions_profile_rhcsa9', JSON.stringify(rhcsa9Profile));
  localStorage.setItem('study_sessions_profile_rhcsa10', JSON.stringify(existingRhcsa10Profile));
  
  // Run migration
  executeMigrationWithLocalStorage(localStorage);
  
  // Verify existing data was preserved
  const rhcsa10Profile = JSON.parse(localStorage.getItem('study_sessions_profile_rhcsa10'));
  
  // Existing Networking stats should be preserved (not overwritten)
  assertDeepEqual(rhcsa10Profile.topicStats['Networking'], { correct: 20, total: 25 }, 'Existing Networking stats should be preserved');
  
  // Existing SELinux stats should be preserved
  assertDeepEqual(rhcsa10Profile.topicStats['SELinux'], { correct: 5, total: 8 }, 'Existing SELinux stats should be preserved');
  
  // New Storage stats from rhcsa9 should be added
  assertDeepEqual(rhcsa10Profile.topicStats['Storage'], { correct: 10, total: 15 }, 'New Storage stats should be added');
  
  // Retired topics should not be added
  assert(rhcsa10Profile.topicStats['RHEL 9 vs 7'] === undefined, 'RHEL 9 vs 7 should not be added');
}

// Test 3: Idempotent - running twice should not change anything
function testIdempotent() {
  const localStorage = new LocalStorageMock();
  
  const rhcsa9Profile = {
    quizId: 'rhcsa9',
    topicStats: {
      'Storage': { correct: 10, total: 15 }
    },
    topicMissesFromImports: {}
  };
  
  localStorage.setItem('study_sessions_profile_rhcsa9', JSON.stringify(rhcsa9Profile));
  localStorage.setItem('quizCompleted', JSON.stringify(['rhcsa9']));
  
  // Run migration first time
  executeMigrationWithLocalStorage(localStorage);
  
  const afterFirst = localStorage.getItem('study_sessions_profile_rhcsa10');
  const completedAfterFirst = localStorage.getItem('quizCompleted');
  
  // Run migration second time
  executeMigrationWithLocalStorage(localStorage);
  
  const afterSecond = localStorage.getItem('study_sessions_profile_rhcsa10');
  const completedAfterSecond = localStorage.getItem('quizCompleted');
  
  // Should be identical
  assertEqual(afterFirst, afterSecond, 'Profile should be identical after second run');
  assertEqual(completedAfterFirst, completedAfterSecond, 'Completed should be identical after second run');
}

// Test 4: Handle both rhcsa9 and rhcsa10 in quizCompleted
function testBothInCompleted() {
  const localStorage = new LocalStorageMock();
  
  localStorage.setItem('quizCompleted', JSON.stringify(['rhcsa9', 'rhcsa10', 'az900']));
  
  // Run migration
  executeMigrationWithLocalStorage(localStorage);
  
  const completed = JSON.parse(localStorage.getItem('quizCompleted'));
  
  // Should remove rhcsa9, keep rhcsa10
  assert(completed.indexOf('rhcsa9') === -1, 'rhcsa9 should be removed');
  assert(completed.indexOf('rhcsa10') !== -1, 'rhcsa10 should be kept');
  assert(completed.indexOf('az900') !== -1, 'az900 should be kept');
}

// Test 5: Handle invalid quizOrder gracefully
function testInvalidQuizOrder() {
  const localStorage = new LocalStorageMock();
  
  // Set invalid quizOrder (not an array)
  localStorage.setItem('quizOrder', '"invalid"');
  
  const rhcsa9Profile = {
    quizId: 'rhcsa9',
    topicStats: { 'Storage': { correct: 5, total: 10 } },
    topicMissesFromImports: {}
  };
  localStorage.setItem('study_sessions_profile_rhcsa9', JSON.stringify(rhcsa9Profile));
  
  // Should not throw error
  executeMigrationWithLocalStorage(localStorage);
  
  // Profile migration should still succeed
  assert(localStorage.getItem('study_sessions_profile_rhcsa10') !== null, 'Profile should be migrated despite invalid quizOrder');
  
  // Invalid quizOrder should be unchanged
  assertEqual(localStorage.getItem('quizOrder'), '"invalid"', 'Invalid quizOrder should be unchanged');
}

// Test 6: No rhcsa9 data (fresh user)
function testNoRhcsa9Data() {
  const localStorage = new LocalStorageMock();
  
  // No rhcsa9 data at all
  
  // Run migration
  executeMigrationWithLocalStorage(localStorage);
  
  // Should set migration flag but not create rhcsa10 profile
  assert(localStorage.getItem('rhcsa_migrated_to_v10_2') === 'true', 'Migration flag should be set');
  assert(localStorage.getItem('study_sessions_profile_rhcsa10') === null, 'Should not create empty rhcsa10 profile');
}

// Test 7: Old migration flag should not prevent new migration
function testOldFlagIgnored() {
  const localStorage = new LocalStorageMock();
  
  // Set old migration flag
  localStorage.setItem('rhcsa_migrated_to_v10', 'true');
  
  const rhcsa9Profile = {
    quizId: 'rhcsa9',
    topicStats: { 'Storage': { correct: 5, total: 10 } },
    topicMissesFromImports: {}
  };
  localStorage.setItem('study_sessions_profile_rhcsa9', JSON.stringify(rhcsa9Profile));
  
  // Run migration
  executeMigrationWithLocalStorage(localStorage);
  
  // Should still migrate despite old flag
  assert(localStorage.getItem('study_sessions_profile_rhcsa10') !== null, 'Should migrate despite old flag');
  assert(localStorage.getItem('rhcsa_migrated_to_v10_2') === 'true', 'New flag should be set');
}

// Run all tests
console.log('\n=== Testing rhcsa-migration.js ===\n');

let passed = 0;
let total = 0;

const tests = [
  ['Basic migration of profile data', testBasicMigration],
  ['Merge when rhcsa10 data already exists', testMergeExistingData],
  ['Idempotent - running twice should not change anything', testIdempotent],
  ['Handle both rhcsa9 and rhcsa10 in quizCompleted', testBothInCompleted],
  ['Handle invalid quizOrder gracefully', testInvalidQuizOrder],
  ['No rhcsa9 data (fresh user)', testNoRhcsa9Data],
  ['Old migration flag should not prevent new migration', testOldFlagIgnored]
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
