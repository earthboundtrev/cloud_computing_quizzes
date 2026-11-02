#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const TARGET = { '1': 93, '2': 78, '3': 60, '4': 36, '5': 33 };
const TOL = 0.05;

const FILES = [
  { file: 'data/aws-genai-questions.js', key: 'QUESTION_BANK_AWS_GENAI' },
  { file: 'data/aws-genai-ramp-questions.js', key: 'QUESTION_BANK_AWS_GENAI_RAMP' },
  { file: 'data/aws-genai-scenario-questions.js', key: 'QUESTION_BANK_AWS_GENAI_SCENARIOS' }
];

function loadPacks() {
  return FILES.map(function (entry) {
    global.window = {};
    delete require.cache[path.resolve(entry.file)];
    require(path.resolve(entry.file));
    return { entry: entry, bank: global.window[entry.key] };
  });
}

function savePacks(packs) {
  packs.forEach(function (pack) {
    const header = fs.readFileSync(pack.entry.file, 'utf8').split('window.' + pack.entry.key + ' = [')[0];
    const body = pack.bank
      .map(function (q, i) {
        return '  ' + JSON.stringify(q, null, 2).split('\n').join('\n  ') + (i < pack.bank.length - 1 ? ',' : '');
      })
      .join('\n');
    fs.writeFileSync(pack.entry.file, header + 'window.' + pack.entry.key + ' = [\n' + body + '\n];\n');
  });
}

function counts(all) {
  const by = { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 };
  all.forEach(function (q) {
    by[q.obj]++;
  });
  return by;
}

function inRange(n, t) {
  return n >= Math.floor(t * (1 - TOL)) && n <= Math.ceil(t * (1 + TOL));
}

const packs = loadPacks();
const all = packs.reduce(function (a, p) {
  return a.concat(p.bank);
}, []);

function move(from, to, pred) {
  let by = counts(all);
  while (!inRange(by[to], TARGET[to]) && by[from] > TARGET[from] * (1 + TOL)) {
    const q = all.find(function (x) {
      return x.obj === from && (!pred || pred(x));
    });
    if (!q) {
      break;
    }
    q.obj = to;
    by = counts(all);
  }
}

move('2', '3', function (q) {
  return /guard|govern|safety|pii|responsible/i.test(q.topic + q.q);
});
move('2', '4', function (q) {
  return /cost|optim|through|latency|token|cache|observ|metric/i.test(q.topic + q.q);
});
move('1', '3', function (q) {
  return /compliance|encrypt|residen|audit/i.test(q.topic + q.q);
});
move('2', '4', function (q) {
  return /cost|optim|through|latency|token|cache|observ|metric|provisioned/i.test(q.topic + q.q);
});
move('1', '4', function (q) {
  return /cost|optim|through|latency|token|cache|observ|metric|provisioned/i.test(q.topic + q.q);
});

savePacks(packs);
console.log('Final domain counts', counts(all));
