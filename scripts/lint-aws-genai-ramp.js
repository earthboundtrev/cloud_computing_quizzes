#!/usr/bin/env node
/**
 * AWS GenAI Developer (AIP-C01) ramp metadata and quality gates (#13).
 */
'use strict';

const fs = require('fs');
const path = require('path');

const CI = process.argv.includes('--ci');
const TRACK_FILES = [
  'data/aws-genai-questions.js',
  'data/aws-genai-scenario-questions.js',
  'data/aws-genai-ramp-questions.js'
];
const DOMAIN_TARGET = { '1': 93, '2': 78, '3': 60, '4': 36, '5': 33 };

const STRICT_FILES = [
  'data/aws-genai-ramp-questions.js',
  'data/aws-genai-scenario-questions.js'
];
const errors = [];
const warnings = [];
function warn(msg) {
  warnings.push(msg);
}

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

const CONFESSION = / — (not the recommended|increases risk|a distractor|incomplete or wrong|does not fix retrieval)/;

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
  (q.options || []).forEach(function (opt, oi) {
    if (CONFESSION.test(opt)) {
      fail(label + ': option ' + oi + ' uses confession-style distractor padding (rewrite plausibly)');
    }
  });
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

function wordCount(s) {
  return String(s || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

function loadTrack() {
  const all = [];
  TRACK_FILES.forEach(function (file) {
    if (!fs.existsSync(file)) {
      return;
    }
    const bank = loadBank(file);
    all.push.apply(all, bank);
  });
  return all;
}

function validateFullTrack(all) {
  const total = all.length;
  if (total < 285 || total > 315) {
    fail('#13 pool size ' + total + ' (target ~300 ±5%)');
  }
  let missingMeta = 0;
  let d3plus = 0;
  let multi = 0;
  let scen100 = 0;
  let evalTrouble = 0;
  const by = { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 };
  all.forEach(function (q) {
    if (!q.obj || q.level == null) {
      missingMeta++;
    }
    if (q.level >= 3) {
      d3plus++;
    }
    if ((q.type || 'single') === 'multi') {
      multi++;
    }
    if (wordCount(q.q) >= 100) {
      scen100++;
    }
    if (q.obj === '5' || /troubleshoot|evaluat|validation|debug|diagnos/i.test((q.topic || '') + (q.q || ''))) {
      evalTrouble++;
    }
    if (q.obj) {
      by[q.obj] = (by[q.obj] || 0) + 1;
    }
  });
  if (missingMeta) {
    fail('#13 missing obj/level on ' + missingMeta + ' questions');
  }
  const multiPct = (multi / total) * 100;
  if (multiPct < 20) {
    fail('#13 multi-response ' + multiPct.toFixed(1) + '% (need ≥20%)');
  }
  const lo = longestLeak(all);
  if (lo > 40) {
    fail('#13 longest-key ' + lo.toFixed(1) + '% on singles (need ≤40%)');
  }
  if (d3plus / total < 0.5) {
    fail('#13 level≥3 ' + ((d3plus / total) * 100).toFixed(1) + '% (need ≥50%)');
  }
  if (scen100 / total < 0.6) {
    fail('#13 scenario stems (100+ words) ' + ((scen100 / total) * 100).toFixed(1) + '% (need ≥60%)');
  }
  if (evalTrouble < 25) {
    fail('#13 eval/troubleshooting items ' + evalTrouble + ' (need ≥25)');
  }
  Object.keys(DOMAIN_TARGET).forEach(function (k) {
    const t = DOMAIN_TARGET[k];
    const n = by[k] || 0;
    if (n < t * 0.95 || n > t * 1.05) {
      fail('#13 domain ' + k + ' count ' + n + ' (target ' + t + ' ±5%)');
    }
  });
  console.log(
    'Full track #13: ' +
      total +
      ' Q; multi ' +
      multiPct.toFixed(1) +
      '%; longest-key ' +
      lo.toFixed(1) +
      '%; 100+ word stems ' +
      ((scen100 / total) * 100).toFixed(1) +
      '%; eval/trouble ' +
      evalTrouble
  );
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
      warn(file + ': ramp single-choice longest-key ' + pct.toFixed(1) + '% (#13 target ≤40% after distractor rewrite)');
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

  if (warnings.length) {
    warnings.forEach(function (w) {
      console.warn('⚠ ' + w);
    });
  }
  if (CI) {
    const track = loadTrack();
    track.forEach(function (q, idx) {
      validateQ(q, 'track', idx, validObj);
    });
    validateFullTrack(track);
  }

  if (errors.length) {
    errors.forEach(function (e) {
      console.error('✗ ' + e);
    });
    process.exit(1);
  }
  console.log('✅ AWS GenAI ramp lint passed' + (CI ? ' (#13 full track)' : ''));
}

main();
