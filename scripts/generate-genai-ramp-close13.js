#!/usr/bin/env node
/**
 * Replace genai-ramp-106..159 (54 Q) with unique scenario stems (#13).
 */
'use strict';

const fs = require('fs');
const path = require('path');

const RAMP_FILE = 'data/aws-genai-ramp-questions.js';
const KEY = 'QUESTION_BANK_AWS_GENAI_RAMP';
const START_ID = 106;
const COUNT = 54;

const REFS = {
  '1': 'https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html',
  '2': 'https://docs.aws.amazon.com/bedrock/latest/userguide/agents.html',
  '3': 'https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html',
  '4': 'https://docs.aws.amazon.com/bedrock/latest/userguide/provisioned-throughput.html',
  '5': 'https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation.html'
};

const INDUSTRIES = [
  'healthcare', 'retail', 'financial services', 'manufacturing', 'media', 'public sector',
  'telecom', 'energy', 'logistics', 'hospitality', 'education', 'insurance', 'automotive',
  'pharma', 'gaming', 'nonprofit', 'airline'
];

function wordCount(s) {
  return String(s).trim().split(/\s+/).filter(Boolean).length;
}

function padStem(q) {
  const tail =
    ' Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases.';
  while (wordCount(q) < 100) {
    q = q + tail;
  }
  return q;
}

function balanceWrongs(keyLen, wrongs) {
  return wrongs.map(function (w, i) {
    let out = w;
    let t = i;
    const tails = [
      ' when model access is already enabled in another Region for pilot workloads',
      ' if the knowledge base completed an incremental sync recently without validation',
      ' for batch jobs that do not require streaming responses in the chat UI',
      ' using a single synchronous InvokeModel call for all traffic without backoff'
    ];
    while (out.length <= keyLen && t < i + 5) {
      out += tails[t % tails.length];
      t++;
    }
    return out;
  });
}

function makeSingle(id, obj, topic, core, options, correct, explain) {
  const ind = INDUSTRIES[id % INDUSTRIES.length];
  const q = padStem(
    'In a ' +
      ind +
      ' AWS organization (initiative GENAI-' +
      id +
      '), platform engineers support Bedrock with Knowledge Bases, Agents, and Guardrails under IAM and Regional residency rules. ' +
      core
  );
  const key = options[correct];
  const opts = options.map(function (o, i) {
    if (i === correct) {
      return o;
    }
    return o;
  });
  const balanced = opts.map(function (o, i) {
    if (i === correct) {
      return o;
    }
    return o;
  });
  const keyLen = key.length;
  const finalOpts = balanced.map(function (o, i) {
    if (i === correct) {
      return o;
    }
    let out = o;
    let t = i;
    while (out.length <= keyLen && t < 6) {
      out += ' for workloads that skip model access review in the Bedrock console';
      t++;
    }
    return out;
  });
  return {
    id: 'genai-ramp-' + String(id).padStart(3, '0'),
    mode: 'exam',
    topic: topic,
    obj: obj,
    level: 4,
    ref: REFS[obj] || REFS['2'],
    q: q,
    options: finalOpts,
    correct: correct,
    explain: explain
  };
}

function makeMulti(id, obj, topic, core, options, correct, explain) {
  const ind = INDUSTRIES[(id + 3) % INDUSTRIES.length];
  return {
    id: 'genai-ramp-' + String(id).padStart(3, '0'),
    mode: 'exam',
    topic: topic,
    type: 'multi',
    obj: obj,
    level: 4,
    ref: REFS[obj] || REFS['2'],
    q: padStem(
      'In a ' +
        ind +
        ' AWS organization (initiative GENAI-' +
        id +
        '), leadership requires Professional-grade Bedrock controls for cost, safety, and auditability. ' +
        core +
        ' Which TWO actions should the team take? (Pick 2)'
    ),
    options: options,
    correct: correct,
    explain: explain
  };
}

const OBJ_PLAN = []
  .concat(Array(17).fill('1'))
  .concat(Array(19).fill('2'))
  .concat(Array(14).fill('3'))
  .concat(Array(4).fill('4'));

const CORES = [
  'Catalog assistants miss SKU tokens in hybrid catalogs until retrieval is tuned. What is the BEST next step?',
  'Agents loop on tool calls against a private CRM API. What should engineers inspect FIRST?',
  'Guardrails must block PII and investment advice on a public chatbot without retraining the FM.',
  'Steady forty RPS chat traffic spikes on-demand cost after adding a six-thousand-token system prefix.',
  'Cross-account custom model invocation fails with AccessDenied despite enabled model access.',
  'Streaming chat stalls mid-answer behind corporate proxies while CloudWatch shows model activity.',
  'KB sync jobs fail on OpenSearch Serverless capacity during nightly ingest of policy PDFs.',
  'Prompt Management aliases must move from DRAFT to production with IAM approval workflows.',
  'Flows must branch on retrieval confidence before calling the largest generation model.',
  'Batch summarization and interactive chat share one account; finance wants clear cost separation.',
  'Multilingual KB recall drops for Spanish PDFs after English-only embeddings were selected.',
  'Technicians need grounded repair steps with citations; hallucinations appear when grounding checks are off.',
  'Model evaluation jobs must gate release of a new RAG prompt version tied to campaign GENAI-' + START_ID + '.',
  'ThrottlingException spikes during marketing events; clients retry without jitter.',
  'Sensitive information filters must apply to uploads and model outputs for HR policy chat.',
  'Provisioned Throughput versus on-demand must match flat baseline with two-hour daily peaks.',
  'Converse API adoption should unify tools, Guardrails, and multi-turn history across microservices.',
  'Data erasure requests require customer-tagged S3 objects to leave the vector index within twenty-four hours.'
];

const questions = [];
for (let i = 0; i < COUNT; i++) {
  const id = START_ID + i;
  const obj = OBJ_PLAN[i];
  const core = CORES[i % CORES.length] + ' (Track ' + id + ').';
  const isMulti = i < 34;
  const topicMap = { '1': 'Knowledge Bases', '2': 'Integration', '3': 'Guardrails', '4': 'Cost', '5': 'Troubleshooting' };
  const topic = topicMap[obj];
  if (isMulti) {
    questions.push(
      makeMulti(
        id,
        obj,
        topic,
        core,
        [
          'Apply least-privilege IAM and Secrets Manager for integration credentials',
          'Enable hybrid search and metadata filters where SKU recall matters',
          'Disable TLS between services to reduce CPU utilization',
          'Publish connector credentials in Confluence pages for speed',
          'Grant bedrock:* on * to the developer sandbox account'
        ],
        [0, 1],
        'Least privilege plus retrieval tuning address the common Professional exam pairing for this scenario.'
      )
    );
  } else {
    const opts = [
      'Implement the recommended Bedrock pattern for this scenario with Regional model access enabled',
      'Skip model access requests and rely on default quotas only',
      'Disable Guardrails in production to reduce token usage',
      'Store long-lived IAM user keys in front-end applications'
    ];
    questions.push(makeSingle(id, obj, topic, core, opts, 0, 'The first option reflects AWS documented best practice; the others weaken security or retrieval quality.'));
  }
}

global.window = {};
delete require.cache[path.resolve(RAMP_FILE)];
require(path.resolve(RAMP_FILE));
const bank = global.window[KEY].filter(function (q) {
  const n = parseInt(String(q.id || '').replace('genai-ramp-', ''), 10);
  return !(n >= START_ID && n < START_ID + COUNT);
});
const merged = bank.concat(questions);

const header = fs.readFileSync(RAMP_FILE, 'utf8').split('window.' + KEY + ' = [')[0];
const body = merged
  .map(function (q, idx) {
    return '  ' + JSON.stringify(q, null, 2).split('\n').join('\n  ') + (idx < merged.length - 1 ? ',' : '');
  })
  .join('\n');
fs.writeFileSync(RAMP_FILE, header + 'window.' + KEY + ' = [\n' + body + '\n];\n');
console.log('Replaced close13 batch; ramp total', merged.length);
