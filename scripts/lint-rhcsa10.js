#!/usr/bin/env node
/**
 * RHCSA10 content-quality gates (GitHub issue #31).
 * Usage: node scripts/lint-rhcsa10.js [--ci]
 */
'use strict';

const fs = require('fs');
const vm = require('vm');

const CI = process.argv.includes('--ci');
const MIN_PER_OBJECTIVE = 2;
const errors = [];

function fail(msg) {
  errors.push(msg);
}

function loadBanks() {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  ['data/rhcsa10-questions.js', 'data/rhcsa10-extra-questions.js', 'data/rhcsa10-gap-questions.js'].forEach(function (f) {
    vm.runInContext(fs.readFileSync(f, 'utf8'), sandbox);
  });
  return (sandbox.window.QUESTION_BANK_RHCSA10 || [])
    .concat(sandbox.window.QUESTION_BANK_RHCSA10_EXTRA || [])
    .concat(sandbox.window.QUESTION_BANK_RHCSA10_GAP || []);
}

function loadObjectives() {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync('data/rhcsa10-objectives.js', 'utf8'), sandbox);
  if (!sandbox.window.OBJECTIVES_RHCSA10) {
    fail('data/rhcsa10-objectives.js must export window.OBJECTIVES_RHCSA10');
    return [];
  }
  if (sandbox.window.OBJECTIVES) {
    fail('data/rhcsa10-objectives.js must not export window.OBJECTIVES (global collision)');
  }
  return sandbox.window.OBJECTIVES_RHCSA10;
}

function main() {
  const objectives = loadObjectives();
  const objIds = new Set(objectives.map(function (o) {
    return o.id;
  }));
  const questions = loadBanks();

  const padRe = /\((alternative method|limited scope|incorrect for this task)\)/i;
  const rhel9Re = /\bmodule (install|stream)|type team\b|teamd\b/i;

  questions.forEach(function (q, idx) {
    const label = 'q id ' + q.id;
    (q.options || []).forEach(function (opt, oi) {
      if (padRe.test(opt)) {
        fail(label + ' option[' + oi + '] still has padded distractor text');
      }
    });
    const blob = (q.q || '') + ' ' + (q.explain || '') + ' ' + (q.options || []).join(' ');
    if (rhel9Re.test(blob)) {
      fail(label + ' stem/explain references removed RHEL 9-only content (modularity/teamd)');
    }
    if (q.obj && !objIds.has(q.obj)) {
      fail(label + " unknown obj '" + q.obj + "'");
    }
  });

  const byObj = {};
  questions.forEach(function (q) {
    if (!q.obj) {
      return;
    }
    byObj[q.obj] = (byObj[q.obj] || 0) + 1;
  });

  objectives.forEach(function (o) {
    const n = byObj[o.id] || 0;
    if (n < MIN_PER_OBJECTIVE) {
      fail('Objective ' + o.id + ' has ' + n + ' questions (need >= ' + MIN_PER_OBJECTIVE + ')');
    }
  });

  objectives.forEach(function (o) {
    if (o.weight != null) {
      fail('Objective ' + o.id + ' weight should be null (Red Hat publishes no per-objective weights)');
    }
  });

  const requiredStems = [
    { re: /group write|chmod g\+w|chmod 664/i, label: 'restored group-write chmod item' },
    { re: /tuned-adm list/i, label: 'tuned-adm profiles item' },
    { re: /GRUB2 with shim|Secure Boot|UEFI.*GRUB/i, label: 'UEFI boot loader item' },
    { re: /setfacl|getfacl|default ACL|ACL/i, label: 'ACL coverage (6.5)' }
  ];
  const allText = questions.map(function (q) {
    return (q.q || '') + ' ' + (q.explain || '');
  }).join('\n');
  requiredStems.forEach(function (req) {
    if (!req.re.test(allText)) {
      fail('Missing ' + req.label);
    }
  });

  if (errors.length) {
    console.error('RHCSA10 lint failed:\n');
    errors.forEach(function (e) {
      console.error('  ✗ ' + e);
    });
    process.exit(1);
  }
  console.log('✅ RHCSA10 lint passed (' + questions.length + ' questions, ' + objectives.length + ' objectives)');
}

main();
