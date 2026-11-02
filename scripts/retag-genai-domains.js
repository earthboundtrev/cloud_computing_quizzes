#!/usr/bin/env node
/**
 * Rebalance AIP-C01 domain tags (obj) toward exam weights (#13).
 */
'use strict';

const fs = require('fs');
const path = require('path');

const FILES = [
  { file: 'data/aws-genai-questions.js', key: 'QUESTION_BANK_AWS_GENAI' },
  { file: 'data/aws-genai-ramp-questions.js', key: 'QUESTION_BANK_AWS_GENAI_RAMP' },
  { file: 'data/aws-genai-scenario-questions.js', key: 'QUESTION_BANK_AWS_GENAI_SCENARIOS' }
];

function retag(q) {
  if (q.obj !== '5') {
    return false;
  }
  const blob = ((q.topic || '') + ' ' + (q.q || '') + ' ' + (q.explain || '')).toLowerCase();
  if (/guardrail|governance|pii|safety|denied topic|toxic|security policy/.test(blob)) {
    q.obj = '3';
    return true;
  }
  if (/provisioned|throughput|cost|token|cache|latency|cloudwatch|metric|observ|x-ray|stream|batch infer|optim|pricing|max_tokens/.test(blob)) {
    q.obj = '4';
    return true;
  }
  if (/api gateway|lambda|agent action|integration|converse|invoke|cross-account|implementation|flow|prompt management/.test(blob)) {
    q.obj = '2';
    return true;
  }
  if (/knowledge base|embedding|rag|vector|s3 data|compliance|encryption|residen|data source|chunk/.test(blob)) {
    q.obj = '1';
    return true;
  }
  return false;
}

FILES.forEach(function (entry) {
  global.window = {};
  delete require.cache[path.resolve(entry.file)];
  require(path.resolve(entry.file));
  const bank = global.window[entry.key];
  let n = 0;
  bank.forEach(function (q) {
    if (retag(q)) {
      n++;
    }
  });
  const header = fs.readFileSync(entry.file, 'utf8').split('window.' + entry.key + ' = [')[0];
  const body = bank
    .map(function (q, i) {
      return '  ' + JSON.stringify(q, null, 2).split('\n').join('\n  ') + (i < bank.length - 1 ? ',' : '');
    })
    .join('\n');
  fs.writeFileSync(entry.file, header + 'window.' + entry.key + ' = [\n' + body + '\n];\n');
  console.log(entry.file, 'retagged from obj5:', n);
});
