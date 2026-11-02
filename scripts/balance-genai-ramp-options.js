#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const FILE = { path: 'data/aws-genai-ramp-questions.js', key: 'QUESTION_BANK_AWS_GENAI_RAMP' };
const TAILS = [
  ' when model access is already enabled in another Region for pilot workloads',
  ' if incremental sync completed without labeled evaluation on golden prompts',
  ' for workloads that skip Guardrails on production traffic to save tokens',
  ' using synchronous InvokeModel only without exponential backoff on throttling'
];

global.window = {};
require(path.resolve(FILE.path));
const bank = global.window[FILE.key];

bank.forEach(function (q) {
  if ((q.type || 'single') !== 'single' || typeof q.correct !== 'number') {
    return;
  }
  const c = q.correct;
  const keyLen = q.options[c].length;
  q.options = q.options.map(function (opt, i) {
    if (i === c) {
      return opt;
    }
    let out = opt;
    let t = i;
    while (out.length <= keyLen && t < i + 6) {
      out += TAILS[t % TAILS.length];
      t++;
    }
    return out;
  });
});

const header = fs.readFileSync(FILE.path, 'utf8').split('window.' + FILE.key + ' = [')[0];
const body = bank
  .map(function (q, i) {
    return '  ' + JSON.stringify(q, null, 2).split('\n').join('\n  ') + (i < bank.length - 1 ? ',' : '');
  })
  .join('\n');
fs.writeFileSync(FILE.path, header + 'window.' + FILE.key + ' = [\n' + body + '\n];\n');
console.log('Balanced ramp singles', bank.length);
