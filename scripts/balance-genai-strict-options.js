#!/usr/bin/env node
/**
 * Lengthen wrong options (not the key) so longest-option is not always correct.
 * Uses neutral plausible clauses — no confession suffixes (#13).
 */
'use strict';

const fs = require('fs');
const path = require('path');

const FILES = [
  { path: 'data/aws-genai-ramp-questions.js', key: 'QUESTION_BANK_AWS_GENAI_RAMP' },
  { path: 'data/aws-genai-scenario-questions.js', key: 'QUESTION_BANK_AWS_GENAI_SCENARIOS' }
];

const CLAUSES = [
  ' while leaving retrieval and chunking unchanged',
  ' without updating IAM roles or model access in the target Region',
  ' by disabling Guardrails instead of tuning retrieval parameters',
  ' using only client-side JavaScript to hold long-lived credentials',
  ' and relying on a single synchronous InvokeModel call for all traffic',
  ' with no incremental knowledge base sync on the data source'
];

function load(file) {
  global.window = {};
  require(path.resolve(file.path));
  return global.window[file.key];
}

function balance(q) {
  if ((q.type || 'single') !== 'single' || !q.options || typeof q.correct !== 'number') {
    return;
  }
  const c = q.correct;
  const keyLen = q.options[c].length;
  let maxWrong = 0;
  q.options.forEach(function (opt, i) {
    if (i !== c && opt.length > maxWrong) {
      maxWrong = opt.length;
    }
  });
  if (maxWrong > keyLen) {
    return;
  }
  q.options = q.options.map(function (opt, i) {
    if (i === c) {
      return opt;
    }
    let out = opt;
    let ci = i;
    while (out.length <= keyLen && ci < c + CLAUSES.length + 3) {
      out += CLAUSES[ci % CLAUSES.length];
      ci++;
    }
    return out;
  });
}

FILES.forEach(function (file) {
  const bank = load(file);
  bank.forEach(balance);
  const header = fs.readFileSync(file.path, 'utf8').split('window.' + file.key + ' = [')[0];
  const body = bank.map(function (q, i) {
    return '  ' + JSON.stringify(q, null, 2).split('\n').join('\n  ') + (i < bank.length - 1 ? ',' : '');
  }).join('\n');
  fs.writeFileSync(file.path, header + 'window.' + file.key + ' = [\n' + body + '\n];\n');
  console.log('Balanced', file.path, bank.length);
});
