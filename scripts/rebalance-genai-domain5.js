#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const FILES = [
  { file: 'data/aws-genai-questions.js', key: 'QUESTION_BANK_AWS_GENAI' },
  { file: 'data/aws-genai-ramp-questions.js', key: 'QUESTION_BANK_AWS_GENAI_RAMP' },
  { file: 'data/aws-genai-scenario-questions.js', key: 'QUESTION_BANK_AWS_GENAI_SCENARIOS' }
];

const TARGET5 = 33;

function count5(all) {
  return all.filter(function (q) {
    return q.obj === '5';
  }).length;
}

function loadAll() {
  const out = [];
  FILES.forEach(function (entry) {
    global.window = {};
    delete require.cache[path.resolve(entry.file)];
    require(path.resolve(entry.file));
    const bank = global.window[entry.key];
    bank.forEach(function (q) {
      q._file = entry.file;
      q._key = entry.key;
    });
    out.push({ entry: entry, bank: bank });
  });
  return out;
}

function saveAll(packs) {
  packs.forEach(function (pack) {
    const bank = pack.bank.map(function (q) {
      const c = Object.assign({}, q);
      delete c._file;
      delete c._key;
      return c;
    });
    const header = fs.readFileSync(pack.entry.file, 'utf8').split('window.' + pack.entry.key + ' = [')[0];
    const body = bank
      .map(function (q, i) {
        return '  ' + JSON.stringify(q, null, 2).split('\n').join('\n  ') + (i < bank.length - 1 ? ',' : '');
      })
      .join('\n');
    fs.writeFileSync(pack.entry.file, header + 'window.' + pack.entry.key + ' = [\n' + body + '\n];\n');
  });
}

const packs = loadAll();
const all = packs.reduce(function (a, p) {
  return a.concat(p.bank);
}, []);
let n5 = count5(all);
let moved = 0;

if (n5 < TARGET5) {
  all.forEach(function (q) {
    if (n5 >= TARGET5 || q.obj === '5') {
      return;
    }
    if (q.obj !== '3' && q.obj !== '4') {
      return;
    }
    const blob = ((q.topic || '') + ' ' + (q.q || '') + ' ' + (q.explain || '')).toLowerCase();
    if (/troubleshoot|evaluat|throttl|error|latency|debug|diagnos|validate|test|scorecard|golden|regression|fix|root cause|metric|alarm|trace/.test(blob)) {
      q.obj = '5';
      n5++;
      moved++;
    }
  });
}

saveAll(packs);
console.log('Moved to obj5:', moved, 'total obj5:', n5);
