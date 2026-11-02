#!/usr/bin/env node
/**
 * Regression #36: per-track bank load must not bleed via shared window globals.
 */
const path = require('path');
const { loadQuestionBank } = require('./lint-banks.js');

function countFor(file, varName) {
  const qs = loadQuestionBank(file, varName);
  return qs.length;
}

const ociN = countFor('data/oci-questions.js', 'QUESTION_BANK_OCI');
const genaiN = countFor('data/aws-genai-questions.js', 'QUESTION_BANK_AWS_GENAI');

if (ociN !== 200) {
  console.error('Expected OCI bank 200 questions, got', ociN);
  process.exit(1);
}
if (genaiN < 120 || genaiN > 220) {
  console.error('Expected aws_genai bank ~206 questions, got', genaiN);
  process.exit(1);
}
if (ociN === genaiN) {
  console.error('OCI and GenAI counts must differ (window isolation leak)');
  process.exit(1);
}

console.log('✓ lint-banks window isolation OK (oci=' + ociN + ', genai=' + genaiN + ')');
