#!/usr/bin/env node

/**
 * Structural checks for service worker update flow (GitHub #71).
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SW_PATH = path.join(ROOT, 'sw.js');
const REG_PATH = path.join(ROOT, 'sw-register.js');
const ENGINE_PATH = path.join(ROOT, 'quiz-engine.js');
const RESET_PATH = path.join(ROOT, 'app-reset.js');

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

function read(file) {
  return fs.readFileSync(file, 'utf8');
}

let passed = 0;
let failed = 0;

function test(name, fn) {
  if (runTest(name, fn)) passed++;
  else failed++;
}

const sw = read(SW_PATH);
const reg = read(REG_PATH);
const engine = read(ENGINE_PATH);
const reset = read(RESET_PATH);

test('sw.js uses cloudcram-v43 cache name', function () {
  assert(/const CACHE_NAME = 'cloudcram-v43'/.test(sw), 'Expected CACHE_NAME cloudcram-v43');
});

test('sw.js install handler does not call skipWaiting', function () {
  const installBlock = sw.match(/addEventListener\('install'[\s\S]*?\n\}\);/);
  assert(installBlock, 'install handler not found');
  assert(!/skipWaiting/.test(installBlock[0]), 'install handler must not call skipWaiting');
});

test('sw.js message handler listens for SKIP_WAITING', function () {
  assert(/addEventListener\('message'/.test(sw), 'message listener missing');
  assert(/SKIP_WAITING/.test(sw), 'SKIP_WAITING not handled in sw.js');
  assert(/event\.waitUntil\(self\.skipWaiting\(\)\)/.test(sw), 'skipWaiting must use event.waitUntil');
  assert(/event\.origin/.test(sw), 'message handler should check origin');
});

test('sw.js activate still claims clients', function () {
  assert(/clients\.claim\(\)/.test(sw), 'clients.claim missing in activate');
});

test('sw-register.js exposes CloudCramUpdate API', function () {
  assert(/window\.CloudCramUpdate\s*=/.test(reg), 'CloudCramUpdate not exposed');
  assert(/checkForUpdate/.test(reg), 'checkForUpdate missing');
  assert(/applyUpdate/.test(reg), 'applyUpdate missing');
});

test('sw-register.js posts SKIP_WAITING to waiting worker', function () {
  assert(/postMessage\(\{\s*type:\s*'SKIP_WAITING'\s*\}\)/.test(reg), 'SKIP_WAITING postMessage missing');
});

test('sw-register.js waits for installing worker before apply', function () {
  assert(/waitForWaitingWorker/.test(reg), 'waitForWaitingWorker missing');
  assert(/waitAndApplyUpdate/.test(reg), 'waitAndApplyUpdate missing');
  assert(/state === 'installed'/.test(reg), 'installed state wait missing');
  assert(/UPDATE_WAIT_TIMEOUT_MS/.test(reg), 'update wait timeout missing');
  assert(/userInitiated/.test(reg), 'user-initiated update path missing');
  assert(/force:\s*userInitiated/.test(reg), 'Update app must force apply during quiz');
});

test('sw-register.js uses controllerchange reload guard', function () {
  assert(/controllerchange/.test(reg), 'controllerchange listener missing');
  assert(/reloadGuard/.test(reg), 'reloadGuard missing');
  assert(/location\.reload\(\)/.test(reg), 'reload missing');
});

test('sw-register.js defers banner while quiz active', function () {
  assert(/QuizEngine\.isQuizActive/.test(reg), 'QuizEngine.isQuizActive check missing');
  assert(/onQuizActivityChange/.test(reg), 'onQuizActivityChange hook missing');
  assert(/updatePending/.test(reg), 'updatePending flag missing');
  assert(/registration\.update\(\)/.test(reg), 'registration.update missing');
  assert(/app-update-banner-visible/.test(reg) || /syncBodyBannerOffset/.test(reg), 'body offset for banner missing');
});

test('sw-register.js update banner has role=status', function () {
  assert(/role',\s*'status'/.test(reg) || /setAttribute\('role',\s*'status'\)/.test(reg), 'role=status missing');
  assert(/app-update-banner/.test(reg), 'app-update-banner class missing');
});

test('quiz-engine.js exposes isQuizActive and session flag', function () {
  assert(/quizSessionActive/.test(engine), 'quizSessionActive flag missing');
  assert(/isQuizActive:\s*isQuizActive/.test(engine), 'QuizEngine.isQuizActive export missing');
  assert(/setQuizSessionActive/.test(engine), 'setQuizSessionActive helper missing');
  assert(/CloudCramUpdate\.onQuizActivityChange/.test(engine), 'quiz activity notifies SW update module');
});

test('app-reset.js defers storage clear until quiz update confirm', function () {
  assert(/runUpdateAppFlow/.test(reset), 'runUpdateAppFlow missing');
  assert(/confirmUpdateDuringActiveQuiz/.test(reset), 'quiz update confirm missing');
  var updateAppBlock = reset.match(/function updateApp\([^)]*\)[\s\S]*?^  \}/m);
  assert(updateAppBlock, 'updateApp not found');
  assert(!/sessionStorage\.clear/.test(updateAppBlock[0]), 'updateApp must not clear before confirm');
  assert(/closeDialog\(false\)/.test(reset), 'cancel must not call onProceed');
  assert(/closeDialog\(true\)/.test(reset), 'confirm must call onProceed');
  assert(/sessionStorage\.clear/.test(reset), 'sessionStorage cleared only in runUpdateAppFlow');
  assert(/trapFocusInDialog/.test(reset), 'quiz update confirm focus trap');
  assert(/triggerEl\.focus/.test(reset), 'quiz update confirm restores Update app button focus');
});

console.log('\n' + passed + ' passed, ' + failed + ' failed');
process.exit(failed > 0 ? 1 : 0);
