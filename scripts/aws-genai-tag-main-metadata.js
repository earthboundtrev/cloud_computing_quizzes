#!/usr/bin/env node
/**
 * Heuristic obj/level/ref/id and distractor padding for legacy AWS GenAI banks (#13).
 * Run: node scripts/aws-genai-tag-main-metadata.js
 */
'use strict';

const fs = require('fs');
const vm = require('vm');

const REF = {
  '1': 'https://docs.aws.amazon.com/aws-certification/latest/examguides/gen-ai-developer-professional-01.html',
  '2': 'https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html',
  '3': 'https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html',
  '4': 'https://docs.aws.amazon.com/bedrock/latest/userguide/provisioned-throughput.html',
  '5': 'https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation.html'
};

const FILES = [
  { path: 'data/aws-genai-questions.js', varName: 'QUESTION_BANK_AWS_GENAI', idPrefix: 'genai-main' },
  { path: 'data/aws-genai-extra-questions.js', varName: 'QUESTION_BANK_AWS_GENAI_EXTRA', idPrefix: 'genai-extra' },
  { path: 'data/aws-genai-scenario-questions.js', varName: 'QUESTION_BANK_AWS_GENAI_SCENARIOS', idPrefix: 'genai-scenario' }
];

function domainFromTopic(topic, q) {
  const t = (topic || '').toLowerCase();
  const blob = [t, q.q || '', q.explain || ''].join(' ').toLowerCase();
  if (/troubleshoot|evaluat|test|validat|observ|monitor|debug|throttl|latency/.test(t + blob)) {
    return '5';
  }
  if (/cost|optim|token|cach|provision|efficien|monitoring/.test(t + blob)) {
    return '4';
  }
  if (/guardrail|governance|safety|\bsecurity\b|pii|audit|\bauth\b|encrypt/.test(t + blob)) {
    return '3';
  }
  if (/agent|flow|prompt|integr|deploy|implement|alias|action group|orchestr/.test(t + blob)) {
    return '2';
  }
  if (/bedrock|rag|model|fine|data|vector|kb|knowledge|ingest|chunk|embed|compliance/.test(t + blob)) {
    return '1';
  }
  return '2';
}

function guessLevel(q) {
  if (q.level) {
    return q.level;
  }
  if (q.type === 'multi') {
    return 4;
  }
  if (q.mode === 'scenario' || /\b(BEST|FIRST|MOST|PRIMARY|should you|What is the)\b/i.test(q.q || '')) {
    return 4;
  }
  if (q.mode === 'comparison') {
    return 3;
  }
  if ((q.q || '').length > 90) {
    return 3;
  }
  return 2;
}

/** Strip legacy confession-style padding (Bugbot blocker); do not re-pad. */
function stripConfessionPadding(q) {
  if (!q.options) {
    return;
  }
  const tail = / — (not the recommended Bedrock approach here|increases risk or cost for this GenAI workload|a common distractor on AIP-C01 scenarios|does not meet the stated professional requirement|does not fix retrieval or orchestration for this case|increases risk, cost, or violates the stated requirement|a distractor; Bedrock docs recommend a different primary action|incomplete or wrong for AIP-C01 professional scenarios)( — .*)?$/;
  q.options = q.options.map(function (opt) {
    let out = opt;
    while (tail.test(out)) {
      out = out.replace(tail, '');
    }
    return out;
  });
}

function loadBank(filePath, varName) {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(filePath, 'utf8'), sandbox);
  return sandbox.window[varName];
}

function writeBank(filePath, varName, bank) {
  const header = fs.readFileSync(filePath, 'utf8').split('window.' + varName + ' = [')[0];
  const body = bank.map(function (q) {
    return '  ' + JSON.stringify(q, null, 2).split('\n').join('\n  ');
  }).join(',\n');
  fs.writeFileSync(filePath, header + 'window.' + varName + ' = [\n' + body + '\n];\n');
}

FILES.forEach(function (file) {
  const bank = loadBank(file.path, file.varName);
  bank.forEach(function (q, idx) {
    if (!q.obj) {
      q.obj = domainFromTopic(q.topic, q);
    }
    q.level = q.level || guessLevel(q);
    if (!q.ref) {
      q.ref = REF[q.obj];
    }
    q.id = q.id || (file.idPrefix + '-' + String(idx + 1).padStart(4, '0'));
    stripConfessionPadding(q);
  });
  writeBank(file.path, file.varName, bank);
  console.log('Tagged', bank.length, 'questions in', file.path);
});
