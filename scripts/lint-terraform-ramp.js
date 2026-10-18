#!/usr/bin/env node
/**
 * Terraform Associate (004) ramp checks for issue #14.
 * Strict metadata (obj, level, ref) on ramp-tier bank files; coverage report for full track.
 *
 * Usage: node scripts/lint-terraform-ramp.js [--ci]
 */
'use strict';

const fs = require('fs');
const path = require('path');

const CI = process.argv.includes('--ci');
const STRICT_FILES = [
  'data/terraform-extra-questions.js',
  'data/terraform-ramp-questions.js'
];
const ALL_TERRAFORM_FILES = [
  'data/terraform-questions.js',
  ...STRICT_FILES
];
const THIN_OBJECTIVES = ['4a', '4f', '4g', '4h', '5d', '6d', '7a', '7c', '8c', '8d'];
const MIN_PER_THIN = 3; // first PR floor; issue #14 target is ≥8 per sub-objective

const errors = [];
const warnings = [];

function fail(msg) {
  errors.push(msg);
}

function warn(msg) {
  warnings.push(msg);
}

function loadBank(file) {
  global.window = {};
  delete require.cache[path.resolve(file)];
  require(path.resolve(file));
  const keys = Object.keys(global.window).filter(function (k) {
    return k.indexOf('QUESTION_BANK') === 0;
  });
  if (!keys.length) {
    fail(file + ': no QUESTION_BANK_* export found');
    return [];
  }
  return global.window[keys[0]];
}

function loadObjectives() {
  global.window = {};
  require(path.resolve('data/terraform-objectives.js'));
  return global.window.OBJECTIVES || [];
}

function validateQuestion(q, file, idx) {
  const label = file + '[' + idx + ']';
  if (!q.obj) {
    fail(label + ": missing 'obj'");
  }
  if (q.level == null) {
    fail(label + ": missing 'level'");
  } else if (typeof q.level !== 'number' || q.level < 1 || q.level > 5) {
    fail(label + ": 'level' must be 1–5");
  }
  if (!q.ref || !String(q.ref).match(/^https:\/\//)) {
    fail(label + ": missing or invalid 'ref' (https://…)");
  }
  if (!q.explain || String(q.explain).length < 40) {
    warn(label + ': explanation is very short for exam-ready bar');
  }
}

function longestOptionLeak(questions) {
  let total = 0;
  let leak = 0;
  questions.forEach(function (q) {
    const t = q.type || 'single';
    if (t !== 'single' || !q.options || typeof q.correct !== 'number') {
      return;
    }
    total++;
    let longest = 0;
    let longestIdx = 0;
    q.options.forEach(function (opt, i) {
      if (opt.length > longest) {
        longest = opt.length;
        longestIdx = i;
      }
    });
    if (longestIdx === q.correct) {
      leak++;
    }
  });
  return { total: total, leak: leak, pct: total ? (leak / total * 100) : 0 };
}

function main() {
  const objectives = loadObjectives();
  const validObj = new Set(objectives.map(function (o) {
    return o.id;
  }));

  console.log('Terraform 004 ramp lint');
  console.log('Objectives loaded:', objectives.length);

  let all = [];
  STRICT_FILES.forEach(function (file) {
    if (!fs.existsSync(file)) {
      fail('Missing strict ramp file: ' + file);
      return;
    }
    const bank = loadBank(file);
    bank.forEach(function (q, idx) {
      validateQuestion(q, file, idx);
      if (q.obj && !validObj.has(q.obj)) {
        fail(file + '[' + idx + "]: unknown obj '" + q.obj + "'");
      }
    });
    all = all.concat(bank);
    const lo = longestOptionLeak(bank);
    console.log(file + ': ' + bank.length + ' questions, longest-key ' + lo.leak + '/' + lo.total +
      ' (' + lo.pct.toFixed(1) + '%)');
  });

  ALL_TERRAFORM_FILES.forEach(function (file) {
    if (!fs.existsSync(file)) {
      return;
    }
    const bank = loadBank(file);
    if (file === 'data/terraform-questions.js') {
      all = all.concat(bank);
    }
  });

  const byObj = {};
  let withMeta = 0;
  let d3plus = 0;
  let snippetStems = 0;
  all.forEach(function (q) {
    if (q.obj && q.level) {
      withMeta++;
      byObj[q.obj] = (byObj[q.obj] || 0) + 1;
      if (q.level >= 3) {
        d3plus++;
      }
    }
    const stem = (q.q || '') + (q.options || []).join(' ');
    if (/<pre>|<code>|resource "|data "|terraform plan|TF_LOG|\.terraform\.lock/.test(stem)) {
      snippetStems++;
    }
  });

  console.log('Full track (main + strict files):', all.length, 'questions');
  console.log('With obj+level:', withMeta, '(' + (withMeta / all.length * 100).toFixed(1) + '%)');
  console.log('Level ≥3:', d3plus, '(' + (d3plus / all.length * 100).toFixed(1) + '%)');
  console.log('Snippet-style stems (heuristic):', snippetStems, '(' + (snippetStems / all.length * 100).toFixed(1) + '%)');

  THIN_OBJECTIVES.forEach(function (id) {
    const n = byObj[id] || 0;
    if (n < MIN_PER_THIN) {
      warn('Thin objective ' + id + ': only ' + n + ' tagged questions (ramp target ≥8)');
    }
  });

  const strictLo = longestOptionLeak(all.filter(function (q) {
    return STRICT_FILES.some(function (f) {
      return q._file === f;
    });
  }));

  if (warnings.length) {
    console.log('\nWarnings:');
    warnings.forEach(function (w) {
      console.log('  ⚠ ' + w);
    });
  }

  if (errors.length) {
    console.log('\nErrors:');
    errors.forEach(function (e) {
      console.log('  ✗ ' + e);
    });
    process.exit(1);
  }

  if (CI && warnings.length) {
    console.log('\n(CI: warnings only — full #14 gates apply in follow-up PRs)');
  }
  console.log('\n✅ Terraform ramp lint passed strict metadata checks');
}

main();
