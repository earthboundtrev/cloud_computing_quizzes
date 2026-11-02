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
const OCI_BANK = path.join(ROOT, 'data', 'oci-questions.js');

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

test('syntax error in bank exits non-zero with quiz id (oci)', function () {
  const backup = fs.readFileSync(OCI_BANK, 'utf8');
  fs.writeFileSync(OCI_BANK, 'window.QUESTION_BANK_OCI = [', 'utf8');
  try {
    const r = runSmoke(['oci']);
    assert(r.status !== 0, 'expected non-zero exit for broken bank');
    const out = (r.stdout || '') + (r.stderr || '');
    assert(out.indexOf('oci') !== -1, 'output should name quiz id oci');
  } finally {
    fs.writeFileSync(OCI_BANK, backup, 'utf8');
  }
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
