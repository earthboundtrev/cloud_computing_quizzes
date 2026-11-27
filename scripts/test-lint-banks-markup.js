#!/usr/bin/env node
'use strict';

/**
 * Bank markup lint fixtures (#37).
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { spawnSync } = require('child_process');

const root = path.join(__dirname, '..');
const RichText = require(path.join(root, 'rich-text.js'));

function loadFixtureBank(file) {
  const sandbox = { window: {} };
  vm.runInNewContext(fs.readFileSync(file, 'utf8'), sandbox);
  return sandbox.window.QUESTION_BANK_MARKUP_BAD || [];
}

function assertMarkupFails(file) {
  const questions = loadFixtureBank(file);
  const issues = [];
  questions.forEach(function (q, idx) {
    issues.push.apply(issues, RichText.validateQuestionMarkup(q, 'fixture[' + idx + ']'));
  });
  if (!issues.length) {
    console.error('Expected markup errors for ' + file);
    process.exit(1);
  }
}

assertMarkupFails(path.join(__dirname, 'fixtures', 'bank-markup-bad-bold.js'));
assertMarkupFails(path.join(__dirname, 'fixtures', 'bank-markup-bad-pre-attr.js'));

const ci = spawnSync(process.execPath, [path.join(__dirname, 'lint-banks.js'), '--ci'], {
  cwd: root,
  encoding: 'utf8',
});

if (ci.status !== 0) {
  console.error('Expected real banks to pass lint-banks --ci');
  console.error(ci.stdout);
  console.error(ci.stderr);
  process.exit(1);
}

console.log('✓ bank markup lint fixtures passed');