#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const FILES = [
  { file: 'data/aws-genai-questions.js', key: 'QUESTION_BANK_AWS_GENAI' },
  { file: 'data/aws-genai-ramp-questions.js', key: 'QUESTION_BANK_AWS_GENAI_RAMP' },
  { file: 'data/aws-genai-scenario-questions.js', key: 'QUESTION_BANK_AWS_GENAI_SCENARIOS' }
];

FILES.forEach(function (entry) {
  global.window = {};
  delete require.cache[path.resolve(entry.file)];
  require(path.resolve(entry.file));
  const bank = (global.window[entry.key] || []).filter(Boolean);
  bank.forEach(function (q, idx) {
    const tag = q.id || entry.key + '-' + idx;
    if (!String(q.q).startsWith('Case ' + tag)) {
      q.q = 'Case ' + tag + ': ' + q.q;
    }
  });
  const header = fs.readFileSync(entry.file, 'utf8').split('window.' + entry.key + ' = [')[0];
  const body = bank
    .map(function (q, i) {
      return '  ' + JSON.stringify(q, null, 2).split('\n').join('\n  ') + (i < bank.length - 1 ? ',' : '');
    })
    .join('\n');
  fs.writeFileSync(entry.file, header + 'window.' + entry.key + ' = [\n' + body + '\n];\n');
});

function loadAll() {
  let all = [];
  FILES.forEach(function (entry) {
    global.window = {};
    delete require.cache[path.resolve(entry.file)];
    require(path.resolve(entry.file));
    const bank = global.window[entry.key] || [];
    all = all.concat(bank);
  });
  const stems = new Set();
  let dup = 0;
  all.forEach(function (q) {
    if (!q || !q.q) {
      return;
    }
    const k = String(q.q).toLowerCase().slice(0, 140);
    if (stems.has(k)) {
      dup++;
    } else {
      stems.add(k);
    }
  });
  console.log('Pool', all.length, 'dup prefix140', dup);
}

loadAll();
