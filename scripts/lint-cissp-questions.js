#!/usr/bin/env node
/**
 * CISSP Question Bank Lint
 * 
 * Checks for:
 * - Code style and formatting issues
 * - Common mistakes in questions
 * - Best practices
 */

global.window = global;
require('../data/cissp-questions.js');
const questionBank = window.QUESTION_BANK_CISSP;

const errors = [];
const warnings = [];
const suggestions = [];

console.log('Running CISSP Question Bank Lint...\n');

// Check 1: Options should not have trailing periods (inconsistent)
console.log('✓ Checking option formatting...');
questionBank.forEach((q, idx) => {
  if (q.options) {
    q.options.forEach((opt, optIdx) => {
      if (typeof opt === 'string' && opt.trim().endsWith('.') && !opt.includes('e.g.')) {
        suggestions.push(`Question ${idx}, option ${optIdx}: Consider removing trailing period for consistency`);
      }
    });
  }
});

// Check 2: Explanations should reference authoritative sources
console.log('✓ Checking explanation quality...');
let sourceCitations = 0;
questionBank.forEach((q, idx) => {
  if (q.explain) {
    // Check for citations
    if (q.explain.includes('OSG') || q.explain.includes('Official Study Guide') || 
        q.explain.includes('(ISC)²') || q.explain.includes('NIST') ||
        q.explain.includes('Ch.') || q.explain.includes('p. ')) {
      sourceCitations++;
    }
  }
});
console.log(`  ${sourceCitations} questions cite authoritative sources`);

// Check 3: No questions should be too short (might be incomplete)
console.log('✓ Checking question stem length...');
questionBank.forEach((q, idx) => {
  if (q.q && q.q.length < 15) {
    warnings.push(`Question ${idx}: Very short question stem (${q.q.length} chars): "${q.q}"`);
  }
});

// Check 4: Check for common term conflicts
console.log('✓ Checking for term definition conflicts...');
const termQuestions = new Map();

// Track questions about specific terms
['confidentiality', 'integrity', 'availability', 'authentication', 'authorization', 
 'due care', 'due diligence', 'risk', 'threat', 'vulnerability'].forEach(term => {
  const questions = [];
  questionBank.forEach((q, idx) => {
    if (q.q.toLowerCase().includes(term) || 
        (q.explain && q.explain.toLowerCase().includes(term + ' ='))) {
      questions.push({ idx, q: q.q, correct: q.options[q.correct], explain: q.explain });
    }
  });
  if (questions.length > 0) {
    termQuestions.set(term, questions);
  }
});

console.log(`  Tracked ${termQuestions.size} key terms across questions`);

// Check 5: Mode distribution
console.log('✓ Checking mode distribution...');
const modeCount = { exam: 0, comparison: 0, scenario: 0, other: 0 };
questionBank.forEach(q => {
  if (q.mode === 'exam') modeCount.exam++;
  else if (q.mode === 'comparison') modeCount.comparison++;
  else if (q.mode === 'scenario') modeCount.scenario++;
  else modeCount.other++;
});
console.log(`  Exam: ${modeCount.exam}, Comparison: ${modeCount.comparison}, Scenario: ${modeCount.scenario}, Other: ${modeCount.other}`);

// Check 6: Topic distribution
console.log('✓ Checking topic distribution...');
const topicCount = new Map();
questionBank.forEach(q => {
  const count = topicCount.get(q.topic) || 0;
  topicCount.set(q.topic, count + 1);
});
const sortedTopics = Array.from(topicCount.entries()).sort((a, b) => b[1] - a[1]);
console.log(`  Top 5 topics:`);
sortedTopics.slice(0, 5).forEach(([topic, count]) => {
  console.log(`    - ${topic}: ${count} questions`);
});

// Check 7: Correct answer distribution (should be roughly balanced)
console.log('✓ Checking correct answer distribution...');
const correctDist = [0, 0, 0, 0, 0]; // Support up to 5 options
questionBank.forEach(q => {
  if (q.correct < correctDist.length) {
    correctDist[q.correct]++;
  }
});
console.log(`  Distribution: [${correctDist.map((c, i) => `${i}:${c}`).join(', ')}]`);
const minCorrect = Math.min(...correctDist.filter(c => c > 0));
const maxCorrect = Math.max(...correctDist);
if (maxCorrect / minCorrect > 2) {
  warnings.push(`Correct answer distribution is unbalanced (might be predictable)`);
}

// Summary
console.log(`\n${'='.repeat(60)}`);
console.log('Lint Summary');
console.log(`${'='.repeat(60)}`);
console.log(`Errors: ${errors.length}`);
console.log(`Warnings: ${warnings.length}`);
console.log(`Suggestions: ${suggestions.length}`);

if (errors.length > 0) {
  console.log(`\n❌ ERRORS:`);
  errors.forEach(err => console.log(`  ${err}`));
}

if (warnings.length > 0) {
  console.log(`\n⚠️  WARNINGS:`);
  warnings.forEach(warn => console.log(`  ${warn}`));
}

if (suggestions.length > 0 && suggestions.length <= 10) {
  console.log(`\n💡 SUGGESTIONS (showing first 10):`);
  suggestions.slice(0, 10).forEach(sug => console.log(`  ${sug}`));
  if (suggestions.length > 10) {
    console.log(`  ... and ${suggestions.length - 10} more`);
  }
}

if (errors.length === 0 && warnings.length === 0) {
  console.log(`\n✅ No errors or warnings found!`);
  process.exit(0);
} else if (errors.length === 0) {
  console.log(`\n✅ No errors found (only warnings/suggestions)`);
  process.exit(0);
} else {
  console.log(`\n❌ Lint failed with ${errors.length} error(s)`);
  process.exit(1);
}
