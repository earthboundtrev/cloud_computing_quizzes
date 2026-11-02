#!/usr/bin/env node
/**
 * AWS GenAI Developer (AIP-C01) ramp metadata and quality gates (#13).
 */
'use strict';

const fs = require('fs');
const path = require('path');

const STRICT_FILES = [
  'data/aws-genai-ramp-questions.js',
  'data/aws-genai-scenario-questions.js'
];
const errors = [];

function fail(msg) {
  errors.push(msg);
}

function loadBank(file) {
  global.window = {};
  delete require.cache[path.resolve(file)];
  require(path.resolve(file));
  const keys = Object.keys(global.window).filter(function (k) {
    return k.indexOf('QUESTION_BANK') === 0;
  });
  if (!keys.length) {
    fail(file + ': no QUESTION_BANK_* export');
    return [];
  }
  return global.window[keys[0]];
}

function loadObjectives() {
  global.window = {};
  require(path.resolve('data/aws-genai-objectives.js'));
  if (!global.window.OBJECTIVES_AWS_GENAI) {
    fail('aws-genai-objectives.js must export OBJECTIVES_AWS_GENAI');
    return [];
  }
  return global.window.OBJECTIVES_AWS_GENAI;
}

function validateQ(q, file, idx, validObj) {
  const label = file + '[' + idx + '] id=' + (q.id || idx);
  if (!q.obj) {
    fail(label + ': missing obj');
  } else if (!validObj.has(String(q.obj))) {
    fail(label + ': invalid obj ' + q.obj);
  }
  if (q.level == null) {
    fail(label + ': missing level');
  }
  if (!q.ref || !String(q.ref).match(/^https:\/\//)) {
    fail(label + ': missing ref URL');
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
    const bank = loadBank(file);
    bank.forEach(function (q, idx) {
      validateQ(q, file, idx, validObj);
    });
    strictAll = strictAll.concat(bank);
    const pct = longestLeak(bank);
    console.log(file + ': ' + bank.length + ' Q, longest-key ' + pct.toFixed(1) + '%');
    if (file.indexOf('ramp') >= 0 && pct > 40 && bank.length >= 10) {
      fail(file + ': ramp single-choice longest-key should be ≤40% (got ' + pct.toFixed(1) + '%)');
    }
  });

  const multi = strictAll.filter(function (q) {
    return (q.type || 'single') === 'multi';
  }).length;
  const multiPct = strictAll.length ? (multi / strictAll.length * 100) : 0;
  console.log('Strict bank multi-response: ' + multi + '/' + strictAll.length + ' (' + multiPct.toFixed(1) + '%)');

  const scenario = strictAll.filter(function (q) {
    return /\b(MOST|MUST|should you|What is the|A .* team|Leadership|You must|queries with|chatbot|Bedrock)\b/i.test(q.q || '');
  }).length;
  const sPct = strictAll.length ? (scenario / strictAll.length * 100) : 0;
  console.log('Strict bank scenario-style stems: ' + scenario + '/' + strictAll.length + ' (' + sPct.toFixed(1) + '%)');

  if (errors.length) {
    errors.forEach(function (e) {
      console.error('✗ ' + e);
    });
    process.exit(1);
  }
  console.log('✅ AWS GenAI ramp lint passed');
}

main();
