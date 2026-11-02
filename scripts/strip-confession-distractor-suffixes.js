#!/usr/bin/env node
/**
 * Remove giveaway distractor suffixes from question banks (retro #14/#15/#13).
 * Does not change correct indices. Run once after removing padDistractors from taggers.
 */
'use strict';

const fs = require('fs');
const vm = require('vm');

const FILES = [
  { path: 'data/cissp-questions.js', key: 'QUESTION_BANK_CISSP' },
  { path: 'data/cissp-ramp-questions.js', key: 'QUESTION_BANK_CISSP_RAMP' },
  { path: 'data/cissp-scenario-questions.js', key: 'QUESTION_BANK_CISSP_SCENARIOS' },
  { path: 'data/terraform-questions.js', key: 'QUESTION_BANK_TERRAFORM' },
  { path: 'data/terraform-extra-questions.js', key: 'QUESTION_BANK_TERRAFORM_EXTRA' },
  { path: 'data/terraform-ramp-questions.js', key: 'QUESTION_BANK_TERRAFORM_RAMP' }
];

const TAIL = /\s* — (less appropriate in this CISSP context|not the best managerial choice here|unlikely best practice|not correct for Terraform 1\.12[^"]*|not the primary Terraform workflow here|this misstates how Terraform core and providers interact|incorrect for Terraform 1\.12 Associate scope|a common misconception on the exam|not the recommended Bedrock approach here|increases risk or cost for this GenAI workload|a common distractor on AIP-C01 scenarios|does not meet the stated professional requirement|does not fix retrieval or orchestration for this case|increases risk, cost, or violates the stated requirement|a distractor; Bedrock docs recommend a different primary action|incomplete or wrong for AIP-C01 professional scenarios)( — .*)?$/i;

function stripOpt(o) {
  let out = String(o);
  while (TAIL.test(out)) {
    out = out.replace(TAIL, '');
  }
  return out;
}

FILES.forEach(function (file) {
  if (!fs.existsSync(file.path)) {
    return;
  }
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(file.path, 'utf8'), sandbox);
  const bank = sandbox.window[file.key];
  if (!Array.isArray(bank)) {
    console.warn('skip', file.path);
    return;
  }
  let n = 0;
  bank.forEach(function (q) {
    if (!q.options) {
      return;
    }
    q.options = q.options.map(function (opt) {
      const s = stripOpt(opt);
      if (s !== opt) {
        n++;
      }
      return s;
    });
  });
  const header = fs.readFileSync(file.path, 'utf8').split('window.' + file.key + ' = [')[0];
  const body = bank.map(function (q, i) {
    return '  ' + JSON.stringify(q, null, 2).split('\n').join('\n  ') + (i < bank.length - 1 ? ',' : '');
  }).join('\n');
  fs.writeFileSync(file.path, header + 'window.' + file.key + ' = [\n' + body + '\n];\n');
  console.log(file.path + ': stripped ' + n + ' option suffixes');
});
