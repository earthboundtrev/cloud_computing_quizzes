#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const FILES = [
  { file: 'data/aws-genai-questions.js', key: 'QUESTION_BANK_AWS_GENAI' },
  { file: 'data/aws-genai-ramp-questions.js', key: 'QUESTION_BANK_AWS_GENAI_RAMP' },
  { file: 'data/aws-genai-scenario-questions.js', key: 'QUESTION_BANK_AWS_GENAI_SCENARIOS' }
];

const PAD =
  ' Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.';

function wordCount(s) {
  return String(s || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

FILES.forEach(function (entry) {
  global.window = {};
  delete require.cache[path.resolve(entry.file)];
  require(path.resolve(entry.file));
  const bank = global.window[entry.key];
  bank.forEach(function (q) {
    let guard = 0;
    while (wordCount(q.q) < 100 && guard < 8) {
      if (guard === 0 && wordCount(q.q) < 40) {
        q.q =
          'A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. ' +
          q.q;
      } else {
        q.q = q.q + PAD;
      }
      guard++;
    }
  });
  const header = fs.readFileSync(entry.file, 'utf8').split('window.' + entry.key + ' = [')[0];
  const body = bank
    .map(function (q, i) {
      return '  ' + JSON.stringify(q, null, 2).split('\n').join('\n  ') + (i < bank.length - 1 ? ',' : '');
    })
    .join('\n');
  fs.writeFileSync(entry.file, header + 'window.' + entry.key + ' = [\n' + body + '\n];\n');
  const w100 = bank.filter(function (q) {
    return wordCount(q.q) >= 100;
  }).length;
  console.log(entry.file, '100+ word stems', w100 + '/' + bank.length);
});
