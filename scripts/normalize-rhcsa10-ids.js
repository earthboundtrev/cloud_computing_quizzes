#!/usr/bin/env node
/**
 * One-shot: assign rhcsa10-NNNN ids in bank load order (base → extra → gap).
 * Writes data/rhcsa10-question-id-map.json for client migration.
 * Run from repo root: node scripts/normalize-rhcsa10-ids.js
 */
'use strict';

const fs = require('fs');
const vm = require('vm');

const BANKS = [
  { path: 'data/rhcsa10-questions.js', key: 'QUESTION_BANK_RHCSA10', varName: 'QUESTION_BANK_RHCSA10' },
  { path: 'data/rhcsa10-extra-questions.js', key: 'QUESTION_BANK_RHCSA10_EXTRA', varName: 'QUESTION_BANK_RHCSA10_EXTRA' },
  { path: 'data/rhcsa10-gap-questions.js', key: 'QUESTION_BANK_RHCSA10_GAP', varName: 'QUESTION_BANK_RHCSA10_GAP' }
];

function loadBank(filePath) {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(filePath, 'utf8'), sandbox);
  return sandbox.window;
}

function formatBankFile(varName, questions) {
  return (
    'window.' +
    varName +
    ' = ' +
    JSON.stringify(questions, null, 2) +
    ';\n'
  );
}

function main() {
  const allOld = [];
  const banksData = [];

  BANKS.forEach(function (b) {
    const w = loadBank(b.path);
    const qs = w[b.key] || [];
    banksData.push({ meta: b, questions: qs });
    qs.forEach(function (q) {
      allOld.push({ oldId: q.id, bank: b.path });
    });
  });

  const forward = {};
  const n = allOld.length;
  for (let i = 0; i < n; i++) {
    const newId = 'rhcsa10-' + String(i + 1).padStart(4, '0');
    const oldKey = String(allOld[i].oldId);
    if (!forward[oldKey]) {
      forward[oldKey] = newId;
    }
  }

  let seq = 0;
  banksData.forEach(function (entry) {
    entry.questions.forEach(function (q) {
      seq++;
      q.id = 'rhcsa10-' + String(seq).padStart(4, '0');
    });
    fs.writeFileSync(entry.meta.path, formatBankFile(entry.meta.varName, entry.questions));
  });

  const mapPath = 'data/rhcsa10-question-id-map.json';
  const mapPayload = { version: 1, generated: new Date().toISOString().slice(0, 10), forward };
  fs.writeFileSync(mapPath, JSON.stringify(mapPayload, null, 2) + '\n');

  const jsPath = 'data/rhcsa10-question-id-map.js';
  fs.writeFileSync(
    jsPath,
    '/**\n * Legacy rhcsa10 question id → rhcsa10-NNNN (issue #31). Loaded before id migration.\n */\n' +
      'window.RHCSA10_QUESTION_ID_MAP = ' +
      JSON.stringify(mapPayload, null, 2) +
      ';\n'
  );

  console.log('Normalized ' + n + ' question ids; map → ' + mapPath + ', ' + jsPath);
}

main();