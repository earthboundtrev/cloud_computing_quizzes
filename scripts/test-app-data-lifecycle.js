#!/usr/bin/env node
/**
 * Update app vs Delete all my data — registry and static checks (#70).
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const registry = require(path.join(ROOT, 'storage-keys.js'));

function assert(cond, msg) {
  if (!cond) throw new Error(msg || 'Assertion failed');
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

let passed = 0;
let failed = 0;

function test(name, fn) {
  if (runTest(name, fn)) passed++;
  else failed++;
}

class LocalStorageMock {
  constructor() {
    this.store = Object.create(null);
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
  clear() {
    this.store = Object.create(null);
  }
}

test('registry keeps progress keys on Update app', function () {
  const keep = [
    'quizCompleted',
    'quizOrder',
    'study_sessions_profile_cissp',
    'cloudcram_game_v1',
    'cloudcram_study_streak',
    'rhcsa_migrated_to_v10_3',
    'study_sessions_brain_dumps'
  ];
  keep.forEach(function (k) {
    assert(registry.shouldKeepOnUpdate(k), 'should keep on update: ' + k);
  });
});

test('registry clears transient quiz UI keys on Update app', function () {
  assert(!registry.shouldKeepOnUpdate('cloudcram_quiz_ui_session_1'), 'quiz UI key cleared on update');
});

test('pruneLocalStorageForUpdate removes unregistered keys only', function () {
  const ls = new LocalStorageMock();
  ls.setItem('quizCompleted', '[]');
  ls.setItem('cloudcram_quiz_ui_foo', '1');
  ls.setItem('random_app_key', 'x');
  registry.pruneLocalStorageForUpdate(ls);
  assert(ls.getItem('quizCompleted') === '[]', 'kept quizCompleted');
  assert(ls.getItem('cloudcram_quiz_ui_foo') === null, 'removed quiz ui');
  assert(ls.getItem('random_app_key') === null, 'removed unknown');
});

test('clearLocalStorageForDelete removes all keys', function () {
  const ls = new LocalStorageMock();
  ls.setItem('quizCompleted', '[]');
  ls.setItem('cloudcram_game_v1', '{}');
  ls.setItem('rhcsa_migrated_to_v10_3', 'true');
  ls.setItem('straggler', '1');
  registry.clearLocalStorageForDelete(ls);
  assert(ls.length === 0, 'localStorage empty after delete');
});

test('export omits push auth token', function () {
  const ls = new LocalStorageMock();
  ls.setItem('cloudcram_push_auth_token', 'secret');
  ls.setItem('quizCompleted', '[]');
  const payload = registry.collectExportableLocalStorage(ls);
  assert(!Object.prototype.hasOwnProperty.call(payload, 'cloudcram_push_auth_token'), 'token redacted');
  assert(payload.quizCompleted === '[]', 'other keys exported');
});

test('data-export.js buildExportPayload omits push auth token', function () {
  const vm = require('vm');
  const ls = new LocalStorageMock();
  ls.setItem('cloudcram_push_auth_token', 'secret-token');
  ls.setItem('quizCompleted', '["cissp"]');
  const sandbox = {
    window: {},
    localStorage: ls,
    indexedDB: undefined,
    console: console,
    setTimeout: setTimeout,
    Blob: function () {},
    URL: { createObjectURL: function () { return ''; }, revokeObjectURL: function () {} },
    document: { body: { appendChild: function () {} }, createElement: function () { return {}; } }
  };
  sandbox.window = sandbox;
  sandbox.window.CloudCramStorageKeys = registry;
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'data-export.js'), 'utf8'), sandbox);
  const payload = sandbox.window.CloudCramDataExport.buildExportPayload([]);
  assert(
    !Object.prototype.hasOwnProperty.call(payload.localStorage, 'cloudcram_push_auth_token'),
    'data-export must not include push auth token'
  );
  assert(payload.localStorage.quizCompleted === '["cissp"]', 'data-export keeps other keys');
});

test('app-reset.js update path does not unregister SW or clear all localStorage', function () {
  const src = fs.readFileSync(path.join(ROOT, 'app-reset.js'), 'utf8');
  const flowBlock = src.match(/function runUpdateAppFlow\(\)[\s\S]*?^  \}/m);
  assert(flowBlock, 'runUpdateAppFlow not found');
  assert(!/localStorage\.clear/.test(flowBlock[0]), 'update flow must not localStorage.clear');
  assert(!/unregister/.test(flowBlock[0]), 'update flow must not unregister SW');
  assert(/CloudCramUpdate/.test(flowBlock[0]), 'update flow uses CloudCramUpdate');
  assert(/waitAndApplyUpdate\(\{\s*userInitiated:\s*true\s*\}\)/.test(flowBlock[0]), 'update flow waits for SW install before apply');
  assert(!/clearAllCaches/.test(flowBlock[0]), 'update flow must not clear caches before SW activates');
});

test('app-reset.js active quiz update confirm cancel and proceed paths', function () {
  const src = fs.readFileSync(path.join(ROOT, 'app-reset.js'), 'utf8');
  const updateBlock = src.match(/function updateApp\([^)]*\)[\s\S]*?^  \}/m);
  assert(updateBlock, 'updateApp not found');
  assert(/isQuizSessionActive/.test(src), 'quiz session guard missing');
  assert(/QuizEngine\.isQuizActive/.test(src), 'QuizEngine.isQuizActive check missing');
  assert(/confirmUpdateDuringActiveQuiz/.test(src), 'quiz update confirm dialog missing');
  assert(/Your current quiz will be lost/.test(src), 'quiz loss warning missing');
  assert(!/sessionStorage\.clear/.test(updateBlock[0]), 'updateApp must not clear storage before confirm');
  assert(/confirmUpdateDuringActiveQuiz\(runUpdateAppFlow,\s*triggerEl\)/.test(updateBlock[0]), 'confirm then run flow');
  assert(/closeDialog\(false\)/.test(src), 'cancel path must not proceed');
  assert(/closeDialog\(true\)/.test(src), 'confirm path must proceed');
  assert(/cancelBtn\.focus\(\)/.test(src), 'cancel focused by default on quiz update confirm');
  assert(/trapFocusInDialog/.test(src), 'quiz update confirm must trap focus');
  assert(/triggerEl\.focus/.test(src), 'quiz update confirm must restore trigger focus');
  assert(/settled/.test(src), 'quiz update confirm must guard against double close');
});

test('app-reset.js delete uses BroadcastChannel and server hook', function () {
  const src = fs.readFileSync(path.join(ROOT, 'app-reset.js'), 'utf8');
  assert(/BroadcastChannel/.test(src), 'BroadcastChannel required');
  assert(/deleteReminderServerRecord/.test(src), 'server DELETE hook required');
  assert(/unregisterAllServiceWorkers/.test(src), 'SW unregister on delete');
  assert(/SERVER_DELETE_FAILED/.test(src), 'fail closed on server delete failure');
  assert(/app storage registry did not load/.test(src), 'fail closed when storage-keys missing');
  assert(/notifyTabsDeleteStarting\(\)\.then/.test(src), 'delete waits for cross-tab notify');
  assert(!/localStorage\.clear\(\)/.test(src), 'must not localStorage.clear fallback');
  assert(/showDeleteCompletePage/.test(src), 'delete completion page without rewriting storage');
});

test('storage-write-guard and writers respect delete flag', function () {
  const guard = fs.readFileSync(path.join(ROOT, 'storage-write-guard.js'), 'utf8');
  assert(/cloudCramStorageWritesBlocked/.test(guard), 'guard export missing');
  const engine = fs.readFileSync(path.join(ROOT, 'quiz-engine.js'), 'utf8');
  assert(/cloudCramStorageWritesBlocked/.test(engine), 'quiz-engine guard missing');
});

test('registry lists every IndexedDB database', function () {
  assert(registry.IDB_DATABASES.length >= 1, 'IDB list empty');
  assert(
    registry.IDB_DATABASES.some(function (d) { return d.name === 'StudySessionsBrainDumps'; }),
    'brain dump DB missing from registry'
  );
});

test('reminder-server.js exposes deleteReminderServerRecord hook', function () {
  const src = fs.readFileSync(path.join(ROOT, 'reminder-server.js'), 'utf8');
  assert(/deleteReminderServerRecord/.test(src), 'hook missing');
  assert(/navigator\.onLine/.test(src), 'offline detection');
});

test('index-init delete dialog uses accessible dialog pattern', function () {
  const src = fs.readFileSync(path.join(ROOT, 'index-init.js'), 'utf8');
  assert(/role',\s*'dialog'/.test(src) || /setAttribute\('role',\s*'dialog'\)/.test(src), 'dialog role');
  assert(/Export first/.test(src), 'export first offered');
  assert(/cancelBtn\.focus\(\)/.test(src), 'cancel focused by default');
});

test('index-init delete dialog traps focus and restores trigger', function () {
  const src = fs.readFileSync(path.join(ROOT, 'index-init.js'), 'utf8');
  assert(/trapFocusInDialog/.test(src), 'focus trap helper missing');
  assert(/'Tab'/.test(src) && /trapFocusInDialog/.test(src), 'Tab focus trap missing');
  assert(/shiftKey/.test(src), 'Shift+Tab handling missing');
  assert(/triggerEl\.focus/.test(src), 'focus must return to trigger on close');
  assert(/Escape/.test(src), 'Escape closes dialog');
});

console.log('\n' + passed + ' passed, ' + failed + ' failed');
process.exit(failed > 0 ? 1 : 0);
