#!/usr/bin/env node
/**
 * CISSP ramp metadata and quality gates (#15).
 */
'use strict';

const fs = require('fs');
const vm = require('vm');

const STRICT_FILES = [
  'data/cissp-ramp-questions.js',
  'data/cissp-scenario-questions.js'
];
const errors = [];

function fail(msg) {
  errors.push(msg);
}

function loadFile(file) {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(file, 'utf8'), sandbox);
  const key = Object.keys(sandbox.window).find(function (k) {
    return k.indexOf('QUESTION_BANK') === 0 || k.indexOf('CISSP') >= 0;
  });
  return { key: key, bank: sandbox.window[key] || [] };
}

function loadObjectives() {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync('data/cissp-objectives.js', 'utf8'), sandbox);
  if (!sandbox.window.OBJECTIVES_CISSP && !sandbox.window.OBJECTIVES) {
    fail('cissp-objectives.js must export OBJECTIVES_CISSP');
    return [];
  }
  return sandbox.window.OBJECTIVES_CISSP || sandbox.window.OBJECTIVES;
}

function validateQ(q, file, idx, validObj) {
  const label = file + '[' + idx + '] id=' + (q.id || idx);
  if (!q.obj) {
    fail(label + ": missing obj");
  } else if (!validObj.has(String(q.obj))) {
    fail(label + ": invalid obj " + q.obj);
  }
  if (q.level == null) {
    fail(label + ": missing level");
  }
  if (!q.ref || !String(q.ref).match(/^https:\/\//)) {
    fail(label + ": missing ref URL");
  }
  if (/ — (less appropriate|not the best managerial|unlikely best practice)/i.test((q.options || []).join(' '))) {
    fail(label + ': confession-style distractor suffix detected');
  }
}

function longestLeak(questions) {
  let total = 0;
  let leak = 0;
  questions.forEach(function (q) {
    if ((q.type || 'single') !== 'single' || !q.options) {
      return;
    }
    total++;
    let li = 0;
    let ll = 0;
    q.options.forEach(function (o, i) {
      if (o.length > ll) {
        ll = o.length;
        li = i;
      }
    });
    if (li === q.correct) {
      leak++;
    }
  });
  return total ? (leak / total) * 100 : 0;
}

function main() {
  const objectives = loadObjectives();
  const validObj = new Set(objectives.map(function (o) {
    return String(o.id);
  }));
  let strictAll = [];

  STRICT_FILES.forEach(function (file) {
    if (!fs.existsSync(file)) {
      fail('Missing ' + file);
      return;
    }
    const loaded = loadFile(file);
    const bank = Array.isArray(loaded.bank) ? loaded.bank : [];
    bank.forEach(function (q, idx) {
      validateQ(q, file, idx, validObj);
    });
    strictAll = strictAll.concat(bank);
    const pct = longestLeak(bank);
    console.log(file + ': ' + bank.length + ' Q, longest-key ' + pct.toFixed(1) + '%');
  });

  const judgment = strictAll.filter(function (q) {
    return /\b(BEST|FIRST|MOST|PRIMARY|As the|As a|What should|What is the BEST|LONG-TERM fix is BEST)\b/i.test(q.q || '');
  }).length;
  const jPct = strictAll.length ? (judgment / strictAll.length * 100) : 0;
  console.log('Strict bank judgment stems: ' + judgment + '/' + strictAll.length + ' (' + jPct.toFixed(1) + '%)');
  if (jPct < 55 && strictAll.length >= 10) {
    fail('Strict CISSP ramp/scenario bank should be >=55% judgment stems for ramp phase 1 (got ' + jPct.toFixed(1) + '%)');
  }

  if (errors.length) {
    errors.forEach(function (e) {
      console.error('✗ ' + e);
    });
    process.exit(1);
  }
  console.log('✅ CISSP ramp lint passed');
}

main();
