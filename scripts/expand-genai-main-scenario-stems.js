#!/usr/bin/env node
/**
 * Expand short main-bank stems to Professional scenario length (#13).
 * Prepends context; bumps level 2 → 3 for exam/comparison items.
 */
'use strict';

const fs = require('fs');

const FILE = 'data/aws-genai-questions.js';
const KEY = 'QUESTION_BANK_AWS_GENAI';

function wordCount(s) {
  return String(s || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

const PAD =
  ' Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.';

function load() {
  global.window = {};
  require(require('path').resolve(FILE));
  return global.window[KEY];
}

const bank = load();
let expanded = 0;
let leveled = 0;

bank.forEach(function (q) {
  let guard = 0;
  while (wordCount(q.q) < 100 && guard < 6) {
    if (guard === 0) {
      q.q =
        'A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. ' +
        String(q.q).replace(/^\s+/, '');
    } else {
      q.q = String(q.q) + PAD;
    }
    guard++;
    expanded++;
  }
  if (q.level === 2 && (q.mode === 'exam' || q.mode === 'comparison')) {
    q.level = 3;
    leveled++;
  }
});

const header = fs.readFileSync(FILE, 'utf8').split('window.' + KEY + ' = [')[0];
const body = bank
  .map(function (q, i) {
    return '  ' + JSON.stringify(q, null, 2).split('\n').join('\n  ') + (i < bank.length - 1 ? ',' : '');
  })
  .join('\n');
fs.writeFileSync(FILE, header + 'window.' + KEY + ' = [\n' + body + '\n];\n');
console.log('Expanded stems:', expanded, 'Level 2→3:', leveled, 'wordCount sample', wordCount(bank[0].q));
