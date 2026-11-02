#!/usr/bin/env node
/**
 * Restore RHCSA10 main/extra options from baseline (pre harmful prefix rewrite),
 * stripping only (alternative method) / (limited scope) / trailing " only".
 * Baseline: git 1b9b020 (#31 parent on main).
 */
'use strict';

const fs = require('fs');
const vm = require('vm');
const { execSync } = require('child_process');

const BASE = '1b9b020';
const FILES = [
  { path: 'data/rhcsa10-questions.js', key: 'QUESTION_BANK_RHCSA10' },
  { path: 'data/rhcsa10-extra-questions.js', key: 'QUESTION_BANK_RHCSA10_EXTRA' }
];

function loadFromGit(rev, file) {
  const src = execSync('git show ' + rev + ':' + file, { encoding: 'utf8', maxBuffer: 20 * 1024 * 1024 });
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(src, sandbox);
  const key = Object.keys(sandbox.window).find(function (k) {
    return k.indexOf('QUESTION_BANK_RHCSA10') === 0;
  });
  return sandbox.window[key];
}

function stripPad(opt) {
  let o = String(opt).replace(/\s*\((alternative method|limited scope)\)/gi, '').trim();
  o = o.replace(/\s+only\s*$/i, '').trim();
  o = o.replace(/\s*\(incorrect for this task\)\s*$/i, '').trim();
  return o;
}

function cleanQuestion(q) {
  if (!q.options) {
    return;
  }
  q.options = q.options.map(stripPad);
}

function writeBank(filePath, varName, bank) {
  const header = fs.readFileSync(filePath, 'utf8').split('window.' + varName + ' = [')[0];
  const body = bank.map(function (q, i) {
    return '  ' + JSON.stringify(q, null, 2).split('\n').join('\n  ') + (i < bank.length - 1 ? ',' : '');
  }).join('\n');
  fs.writeFileSync(filePath, header + 'window.' + varName + ' = [\n' + body + '\n];\n');
}

FILES.forEach(function (file) {
  const baseline = loadFromGit(BASE, file.path);
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(file.path, 'utf8'), sandbox);
  const current = sandbox.window[file.key];

  const byId = new Map();
  baseline.forEach(function (q) {
    byId.set(String(q.id), q);
  });

  current.forEach(function (q) {
    const old = byId.get(String(q.id));
    if (!old || !old.options) {
      cleanQuestion(q);
      return;
    }
    q.options = old.options.map(stripPad);
    q.correct = old.correct;
    if (q.type === undefined && old.type) {
      q.type = old.type;
    }
  });

  writeBank(file.path, file.key, current);
  console.log('Restored options from', BASE, 'for', file.path);
});
