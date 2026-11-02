#!/usr/bin/env node
/**
 * Lengthen wrong options on aws-genai-questions.js so the key is not always longest (#13).
 * Uses neutral plausible tails — not confession-style padding (see lint-aws-genai-ramp.js).
 */
'use strict';

const fs = require('fs');
const path = require('path');

const FILE = { path: 'data/aws-genai-questions.js', key: 'QUESTION_BANK_AWS_GENAI' };

const TAILS = [
  ' for accounts that already enabled model access in the console',
  ' when the workload runs entirely inside a single Availability Zone',
  ' if the knowledge base completed an incremental sync recently',
  ' for batch jobs that do not require streaming responses',
  ' when IAM roles already include broad Amazon S3 permissions',
  ' in Regions where the foundation model is generally available',
  ' if prompt templates are stored only in the application repository',
  ' when Guardrails are optional for internal-only prototypes'
];

function load(file) {
  global.window = {};
  delete require.cache[path.resolve(file.path)];
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
    let ti = i;
    while (out.length <= keyLen && ti < i + TAILS.length + 4) {
      out += TAILS[ti % TAILS.length];
      ti++;
    }
    return out;
  });
}

const bank = load(FILE);
let fixed = 0;
bank.forEach(function (q) {
  const before = JSON.stringify(q.options);
  balance(q);
  if (JSON.stringify(q.options) !== before) {
    fixed++;
  }
});

const header = fs.readFileSync(FILE.path, 'utf8').split('window.' + FILE.key + ' = [')[0];
const body = bank
  .map(function (q, i) {
    return '  ' + JSON.stringify(q, null, 2).split('\n').join('\n  ') + (i < bank.length - 1 ? ',' : '');
  })
  .join('\n');
fs.writeFileSync(FILE.path, header + 'window.' + FILE.key + ' = [\n' + body + '\n];\n');
console.log('Balanced', FILE.path, 'questions=', bank.length, 'items touched=', fixed);
