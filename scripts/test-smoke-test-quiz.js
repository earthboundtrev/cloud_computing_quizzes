#!/usr/bin/env node
'use strict';

/**
 * Regression tests for scripts/smoke-test-quiz.js (#67)
 */

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const SMOKE = path.join(__dirname, 'smoke-test-quiz.js');
const BROKEN_FIXTURE = path.join(__dirname, 'fixtures', 'smoke-broken-bank.js');

function assert(cond, msg) {
  if (!cond) throw new Error(msg || 'Assertion failed');
}

function runSmoke(args) {
  return spawnSync(process.execPath, [SMOKE].concat(args), {
    cwd: ROOT,
    encoding: 'utf8',
    env: process.env,
  });
}

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log('✓ ' + name);
    passed++;
  } catch (e) {
    console.error('✗ ' + name);
    console.error('  ' + e.message);
    failed++;
  }
}

test('unknown quizId exits non-zero with quiz id in output', function () {
  const r = runSmoke(['not_a_real_quiz_id']);
  assert(r.status !== 0, 'expected non-zero exit, got ' + r.status);
  const out = (r.stdout || '') + (r.stderr || '');
  assert(out.indexOf('not_a_real_quiz_id') !== -1, 'output should name quiz id');
});

test('syntax error in bank fixture fails vm load', function () {
  const vm = require('vm');
  const code = fs.readFileSync(BROKEN_FIXTURE, 'utf8');
  let err = null;
  try {
    vm.runInContext(code, { window: {} });
  } catch (e) {
    err = e;
  }
  assert(err, 'expected syntax error from fixture bank');
});

test('createQuizSmokeContext wraps bank load errors with quiz id', function () {
  const mod = require('./smoke-test-quiz.js');
  let err = null;
  try {
    mod.createQuizSmokeContext('oci', {
      localStorage: new mod.LocalStorageMock(),
      _testScriptOverride: ['quiz-engine.js', 'scripts/fixtures/smoke-broken-bank.js'],
    });
  } catch (e) {
    err = e;
  }
  assert(err && String(err.message).indexOf('oci') !== -1, 'error should name quiz id');
});

test('exports createQuizSmokeContext with localStorage stub', function () {
  const mod = require('./smoke-test-quiz.js');
  assert(typeof mod.createQuizSmokeContext === 'function', 'createQuizSmokeContext export');
  assert(typeof mod.LocalStorageMock === 'function', 'LocalStorageMock export');
  const ls = new mod.LocalStorageMock({ quizCompleted: '[]' });
  const ctx = mod.createQuizSmokeContext('oci', { localStorage: ls });
  assert(ctx.sandbox && ctx.sandbox.localStorage === ls, 'uses provided localStorage');
});

console.log('');
console.log('Passed: ' + passed + ', Failed: ' + failed);
process.exit(failed ? 1 : 0);
