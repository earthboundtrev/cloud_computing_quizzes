#!/usr/bin/env node
/**
 * Remove (alternative method) / (limited scope) padding from RHCSA10 banks (#31).
 * Run: node scripts/fix-rhcsa10-padded-distractors.js
 */
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const FILES = [
  'data/rhcsa10-questions.js',
  'data/rhcsa10-extra-questions.js'
];

function loadBank(file) {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(file, 'utf8'), sandbox);
  const key = Object.keys(sandbox.window).find(function (k) {
    return k.indexOf('QUESTION_BANK_RHCSA10') === 0;
  });
  return { key: key, bank: sandbox.window[key], header: fs.readFileSync(file, 'utf8').split(key + ' = [')[0] };
}

function cleanOption(opt) {
  let o = opt.replace(/\s*\((alternative method|limited scope)\)/gi, '').trim();
  o = o.replace(/\s+only\s*$/i, '').trim();
  o = o.replace(/\s*\(incorrect for this task\)\s*$/i, '').trim();
  return o;
}

function serializeQuestion(q, indent) {
  const lines = [];
  lines.push(indent + '{');
  Object.keys(q).forEach(function (k) {
    const v = q[k];
    if (k === 'options' && Array.isArray(v)) {
      lines.push(indent + '  "options": [');
      v.forEach(function (opt, i) {
        const comma = i < v.length - 1 ? ',' : '';
        lines.push(indent + '    ' + JSON.stringify(opt) + comma);
      });
      lines.push(indent + '  ],');
    } else if (typeof v === 'string') {
      lines.push(indent + '  "' + k + '": ' + JSON.stringify(v) + ',');
    } else {
      lines.push(indent + '  "' + k + '": ' + JSON.stringify(v) + ',');
    }
  });
  const last = lines[lines.length - 1];
  lines[lines.length - 1] = last.replace(/,$/, '');
  lines.push(indent + '}');
  return lines.join('\n');
}

function serializePrettyJs(bank, header, varName) {
  const body = bank.map(function (q, i) {
    const inner = '  ' + JSON.stringify(q, null, 2).split('\n').join('\n  ');
    return inner + (i < bank.length - 1 ? ',' : '');
  }).join('\n');
  return header + varName + ' = [\n' + body + '\n];\n';
}

FILES.forEach(function (file) {
  const loaded = loadBank(file);
  let changed = 0;
  loaded.bank.forEach(function (q) {
    if (!q.options) {
      return;
    }
    q.options = q.options.map(function (opt) {
      const cleaned = cleanOption(opt);
      if (cleaned !== opt) {
        changed++;
      }
      return cleaned;
    });
  });
  const out = serializePrettyJs(loaded.bank, loaded.header, loaded.key);
  fs.writeFileSync(file, out);
  console.log(file + ': cleaned ' + changed + ' option strings');
});
