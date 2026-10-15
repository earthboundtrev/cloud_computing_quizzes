#!/usr/bin/env node
/**
 * CISSP Question Bank Validation
 * 
 * Checks for:
 * - Duplicate normalized question stems
 * - Conflicting definitions (e.g., due care vs due diligence)
 * - Structural validity
 * - Total question count stability
 */

// Load the question bank
global.window = global;
require('../data/cissp-questions.js');
const questionBank = window.QUESTION_BANK_CISSP;

// Expected count (should remain at 223 after fixes)
const EXPECTED_COUNT = 223;

// Normalize a string for comparison
function normalize(str) {
  return str
    .toLowerCase()
    .replace(/[^\w\s]/g, '') // Remove punctuation
    .replace(/\s+/g, ' ')    // Collapse whitespace
    .trim();
}

// Validation results
const errors = [];
const warnings = [];

// 1. Check total count
console.log(`\n✓ Checking question count...`);
if (questionBank.length !== EXPECTED_COUNT) {
  errors.push(`Question count mismatch: expected ${EXPECTED_COUNT}, got ${questionBank.length}`);
} else {
  console.log(`  ✓ Count is correct: ${questionBank.length} questions`);
}

// 2. Check for duplicate normalized stems
console.log(`\n✓ Checking for duplicate question stems...`);
const stemMap = new Map();
const duplicates = [];

questionBank.forEach((q, idx) => {
  if (!q.q) {
    errors.push(`Question at index ${idx} has no stem (q field)`);
    return;
  }
  
  const normalized = normalize(q.q);
  if (stemMap.has(normalized)) {
    duplicates.push({
      normalized,
      indices: [stemMap.get(normalized), idx],
      questions: [questionBank[stemMap.get(normalized)].q, q.q]
    });
  } else {
    stemMap.set(normalized, idx);
  }
});

if (duplicates.length > 0) {
  errors.push(`Found ${duplicates.length} duplicate question stem(s):`);
  duplicates.forEach(dup => {
    errors.push(`  - Indices ${dup.indices.join(', ')}: "${dup.questions[0]}"`);
  });
} else {
  console.log(`  ✓ No duplicate stems found`);
}

// 3. Check structural validity
console.log(`\n✓ Checking structural validity...`);
let structuralErrors = 0;
questionBank.forEach((q, idx) => {
  // Required fields
  if (!q.mode) {
    errors.push(`Question ${idx}: missing mode`);
    structuralErrors++;
  }
  if (!q.topic) {
    errors.push(`Question ${idx}: missing topic`);
    structuralErrors++;
  }
  if (!q.q) {
    errors.push(`Question ${idx}: missing question stem (q)`);
    structuralErrors++;
  }
  if (!q.options || !Array.isArray(q.options) || q.options.length < 2) {
    errors.push(`Question ${idx}: invalid or missing options array`);
    structuralErrors++;
  }
  if (typeof q.correct !== 'number' || q.correct < 0) {
    errors.push(`Question ${idx}: invalid correct answer index`);
    structuralErrors++;
  }
  if (!q.explain) {
    warnings.push(`Question ${idx}: missing explanation`);
  }
  
  // Validate correct index is within options range
  if (q.options && q.correct >= q.options.length) {
    errors.push(`Question ${idx}: correct index ${q.correct} out of range (options: ${q.options.length})`);
    structuralErrors++;
  }
});

if (structuralErrors === 0) {
  console.log(`  ✓ All questions have valid structure`);
} else {
  console.log(`  ✗ Found ${structuralErrors} structural errors`);
}

// 4. Check for conflicting definitions of key terms
console.log(`\n✓ Checking for conflicting definitions...`);
const dueDiligenceQuestions = [];
const dueCareQuestions = [];

questionBank.forEach((q, idx) => {
  const qLower = q.q.toLowerCase();
  const explanationLower = (q.explain || '').toLowerCase();
  
  if (qLower.includes('due diligence')) {
    dueDiligenceQuestions.push({ idx, q: q.q, options: q.options, correct: q.correct, explain: q.explain });
  }
  if (qLower.includes('due care')) {
    dueCareQuestions.push({ idx, q: q.q, options: q.options, correct: q.correct, explain: q.explain });
  }
});

console.log(`  Found ${dueDiligenceQuestions.length} due diligence question(s)`);
console.log(`  Found ${dueCareQuestions.length} due care question(s)`);

// Check that due diligence is correctly defined as planning/establishing
dueDiligenceQuestions.forEach(q => {
  const correctAnswer = q.options[q.correct].toLowerCase();
  const explanation = q.explain.toLowerCase();
  
  // Red flags for inverted definitions
  if ((correctAnswer.includes('ongoing') || correctAnswer.includes('maintain')) && 
      !correctAnswer.includes('plan') && !correctAnswer.includes('establish')) {
    warnings.push(`Question ${q.idx} may have inverted due diligence definition (describes due care instead)`);
  }
  
  // Check explanation mentions correct OSG definition
  if (explanation.includes('due diligence') && 
      !(explanation.includes('plan') || explanation.includes('policy') || explanation.includes('establish'))) {
    warnings.push(`Question ${q.idx} explanation may not reflect OSG definition of due diligence`);
  }
});

// 5. Summary
console.log(`\n${'='.repeat(60)}`);
console.log(`Validation Summary`);
console.log(`${'='.repeat(60)}`);
console.log(`Total questions: ${questionBank.length}`);
console.log(`Errors: ${errors.length}`);
console.log(`Warnings: ${warnings.length}`);

if (errors.length > 0) {
  console.log(`\n❌ ERRORS:`);
  errors.forEach(err => console.log(`  ${err}`));
}

if (warnings.length > 0) {
  console.log(`\n⚠️  WARNINGS:`);
  warnings.forEach(warn => console.log(`  ${warn}`));
}

if (errors.length === 0 && warnings.length === 0) {
  console.log(`\n✅ All validations passed!`);
  process.exit(0);
} else if (errors.length === 0) {
  console.log(`\n✅ No errors found (only warnings)`);
  process.exit(0);
} else {
  console.log(`\n❌ Validation failed with ${errors.length} error(s)`);
  process.exit(1);
}
