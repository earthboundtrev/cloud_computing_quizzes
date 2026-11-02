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

test('sw.js uses cloudcram-v37 cache name', function () {
  assert(/const CACHE_NAME = 'cloudcram-v37'/.test(sw), 'Expected CACHE_NAME cloudcram-v37');
});

test('sw.js install handler does not call skipWaiting', function () {
  const installBlock = sw.match(/addEventListener\('install'[\s\S]*?\n\}\);/);
  assert(installBlock, 'install handler not found');
  assert(!/skipWaiting/.test(installBlock[0]), 'install handler must not call skipWaiting');
});

test('sw.js message handler listens for SKIP_WAITING', function () {
  assert(/addEventListener\('message'/.test(sw), 'message listener missing');
  assert(/SKIP_WAITING/.test(sw), 'SKIP_WAITING not handled in sw.js');
  assert(/self\.skipWaiting\(\)/.test(sw), 'skipWaiting should remain for message path');
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

test('sw-register.js uses controllerchange reload guard', function () {
  assert(/controllerchange/.test(reg), 'controllerchange listener missing');
  assert(/reloadGuard/.test(reg), 'reloadGuard missing');
  assert(/location\.reload\(\)/.test(reg), 'reload missing');
});

test('sw-register.js defers banner while quiz active', function () {
  assert(/QuizEngine\.isQuizActive/.test(reg), 'QuizEngine.isQuizActive check missing');
  assert(/updatePending/.test(reg), 'updatePending flag missing');
  assert(/registration\.update\(\)/.test(reg), 'registration.update missing');
});

test('sw-register.js update banner has role=status', function () {
  assert(/role',\s*'status'/.test(reg) || /setAttribute\('role',\s*'status'\)/.test(reg), 'role=status missing');
  assert(/app-update-banner/.test(reg), 'app-update-banner class missing');
});

test('quiz-engine.js exposes isQuizActive and session flag', function () {
  assert(/quizSessionActive/.test(engine), 'quizSessionActive flag missing');
  assert(/isQuizActive:\s*isQuizActive/.test(engine), 'QuizEngine.isQuizActive export missing');
  assert(/quizSessionActive = true/.test(engine), 'quizSessionActive not set on start');
  assert(/quizSessionActive = false/.test(engine), 'quizSessionActive not cleared');
});

console.log('\n' + passed + ' passed, ' + failed + ' failed');
process.exit(failed > 0 ? 1 : 0);
