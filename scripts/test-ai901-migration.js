#!/usr/bin/env node

/**
 * Regression tests for ai901-migration.js and import remap (#22, #33).
 */

const fs = require('fs');
const path = require('path');

const MIGRATION_FLAG = 'ai901_migrated_from_ai900';
const DATA_MOVED_FLAG = 'ai901_migration_data_moved';
const ROOT = path.join(__dirname, '..');

class LocalStorageMock {
  constructor() {
    this.store = {};
    this.throwOnKey = null;
  }

  get length() {
    return Object.keys(this.store).length;
  }

  key(i) {
    return Object.keys(this.store)[i] || null;
  }

  getItem(key) {
    return Object.prototype.hasOwnProperty.call(this.store, key) ? this.store[key] : null;
  }

  setItem(key, value) {
    if (this.throwOnKey === key) {
      throw new Error('QuotaExceededError');
    }
    this.store[key] = String(value);
  }

  removeItem(key) {
    delete this.store[key];
  }

  clear() {
    this.store = {};
  }
}

function runTest(name, fn) {
  try {
    fn();
    console.log('✓ ' + name);
    return true;
  } catch (e) {
    console.error('✗ ' + name);
    console.error('  ' + e.message);
    return false;
  }
}

function assert(cond, msg) {
  if (!cond) throw new Error(msg || 'Assertion failed');
}

function assertEqual(a, b, msg) {
  if (a !== b) throw new Error((msg || 'Not equal') + ': expected ' + JSON.stringify(b) + ', got ' + JSON.stringify(a));
}

function loadMigrationScript() {
  return fs.readFileSync(path.join(ROOT, 'ai901-migration.js'), 'utf8');
}

function loadReservedKeyNamesScript() {
  return fs.readFileSync(path.join(ROOT, 'reserved-key-names.js'), 'utf8');
}

function executeMigration(localStorage) {
  const wrapped = loadReservedKeyNamesScript() + '\n' + loadMigrationScript();
  const func = new Function('localStorage', 'console', 'globalThis', 'require', 'module', wrapped);
  func(localStorage, { log: () => {}, error: () => {} }, globalThis, require, { exports: {} });
}

function testMovesProfileAndLauncherKeys() {
  const ls = new LocalStorageMock();
  const profile = {
    quizId: 'ai900',
    topicStats: { AI: { correct: 5, total: 10 } },
    topicMissesFromImports: { AI: 2 }
  };
  ls.setItem('study_sessions_profile_ai900', JSON.stringify(profile));
  ls.setItem('quizCompleted', JSON.stringify(['ai900', 'az900']));
  ls.setItem('quizOrder', JSON.stringify(['oci', 'ai900', 'cissp']));

  executeMigration(ls);

  const moved = JSON.parse(ls.getItem('study_sessions_profile_ai901'));
  assertEqual(moved.quizId, 'ai901', 'profile quizId');
  assertEqual(moved.topicStats.AI.correct, 5, 'stats preserved');
  assert(ls.getItem('study_sessions_profile_ai900') === null, 'old profile removed');

  const completed = JSON.parse(ls.getItem('quizCompleted'));
  assert(completed.indexOf('ai901') !== -1 && completed.indexOf('ai900') === -1, 'quizCompleted');
  const order = JSON.parse(ls.getItem('quizOrder'));
  assertEqual(order[1], 'ai901', 'quizOrder position kept');
  assertEqual(ls.getItem(MIGRATION_FLAG), 'true', 'migration flag');
  assertEqual(ls.getItem(DATA_MOVED_FLAG), 'true', 'data moved flag');
}

function testRerunNoOp() {
  const ls = new LocalStorageMock();
  ls.setItem('study_sessions_profile_ai900', JSON.stringify({ quizId: 'ai900', topicStats: { AI: { correct: 1, total: 2 } } }));
  executeMigration(ls);
  const afterFirst = ls.getItem('study_sessions_profile_ai901');
  executeMigration(ls);
  const afterSecond = ls.getItem('study_sessions_profile_ai901');
  assertEqual(afterFirst, afterSecond, 'profile unchanged on second run');
}

function testFailedCopyKeepsOld() {
  const ls = new LocalStorageMock();
  ls.setItem('study_sessions_profile_ai900', JSON.stringify({ quizId: 'ai900', topicStats: {} }));
  ls.throwOnKey = 'study_sessions_profile_ai901';
  executeMigration(ls);
  assert(ls.getItem('study_sessions_profile_ai900') !== null, 'old profile intact');
  assert(ls.getItem('study_sessions_profile_ai901') === null, 'no partial new profile');
  assert(ls.getItem(MIGRATION_FLAG) !== 'true', 'no flag on failure');
}

function testImportRemap() {
  delete require.cache[require.resolve(path.join(ROOT, 'storage-keys.js'))];
  delete require.cache[require.resolve(path.join(ROOT, 'data-import.js'))];
  delete require.cache[require.resolve(path.join(ROOT, 'storage-tab-merge.js'))];
  const dataImport = require(path.join(ROOT, 'data-import.js'));
  const remapped = dataImport.remapLegacyAi900LocalStorage({
    study_sessions_profile_ai900: JSON.stringify({
      quizId: 'ai900',
      topicStats: { AI: { correct: 2, total: 4 } }
    }),
    quizCompleted: JSON.stringify(['ai900'])
  });
  assert(remapped.study_sessions_profile_ai901, 'profile key remapped');
  const profile = JSON.parse(remapped.study_sessions_profile_ai901);
  assertEqual(profile.quizId, 'ai901', 'import profile quizId');
  const completed = JSON.parse(remapped.quizCompleted);
  assertEqual(completed[0], 'ai901', 'import quizCompleted');
}

function testNoStaleAi900References() {
  const allow = [
    path.join(ROOT, '_redirects'),
    path.join(ROOT, 'ai901-migration.js'),
    path.join(ROOT, 'scripts', 'test-ai901-migration.js'),
    path.join(ROOT, 'data-import.js'),
    path.join(ROOT, 'quiz-engine.js')
  ];
  const allowRel = allow.map((p) => path.relative(ROOT, p));
  const offenders = [];

  function scanFile(rel) {
    if (allowRel.indexOf(rel) !== -1) return;
    if (rel.indexOf('.cursor/') === 0) return;
    if (rel.indexOf('node_modules/') === 0) return;
    const full = path.join(ROOT, rel);
    if (!fs.existsSync(full) || fs.statSync(full).isDirectory()) return;
    if (!/\.(js|html|md|json|mjs|yml|yaml)$/i.test(rel)) return;
    const text = fs.readFileSync(full, 'utf8');
    if (/\bai900\b/.test(text) || /ai900_azure/.test(text) || /ai900-/.test(text)) {
      offenders.push(rel);
    }
  }

  function walk(dir, base) {
    fs.readdirSync(dir).forEach((name) => {
      const rel = base ? base + '/' + name : name;
      const full = path.join(dir, name);
      if (fs.statSync(full).isDirectory()) {
        if (name === 'node_modules' || name === '.git') return;
        walk(full, rel);
      } else {
        scanFile(rel);
      }
    });
  }

  walk(ROOT, '');
  assert(offenders.length === 0, 'Unexpected ai900 references: ' + offenders.join(', '));
}

function testFreshUserNoFlag() {
  const ls = new LocalStorageMock();
  executeMigration(ls);
  assertEqual(ls.getItem(MIGRATION_FLAG), 'true', 'flag set for fresh user');
  assert(ls.getItem(DATA_MOVED_FLAG) !== 'true', 'no data moved flag');
}

console.log('\n=== Testing ai901-migration.js ===\n');

const tests = [
  ['Moves profile, quizCompleted, quizOrder', testMovesProfileAndLauncherKeys],
  ['Re-run is no-op', testRerunNoOp],
  ['Failed copy keeps old data', testFailedCopyKeepsOld],
  ['Import remap ai900 → ai901', testImportRemap],
  ['Fresh user: migrated flag, no data-moved flag', testFreshUserNoFlag],
  ['No stale ai900 references (except redirects/migration)', testNoStaleAi900References]
];

let passed = 0;
tests.forEach(([name, fn]) => {
  if (runTest(name, fn)) passed++;
});

console.log('\n' + passed + '/' + tests.length + ' passed\n');
process.exit(passed === tests.length ? 0 : 1);