#!/usr/bin/env node
/**
 * CISSP Quiz Smoke Test
 * 
 * Validates that:
 * - Question bank loads without JavaScript errors
 * - All referenced dependencies are present
 * - Question counts match across files
 * - No syntax errors in data files
 */

const fs = require('fs');
const path = require('path');

console.log('Running CISSP Quiz Smoke Test...\n');

let testsFailed = 0;
let testsPassed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`✓ ${name}`);
    testsPassed++;
    return true;
  } catch (err) {
    console.error(`✗ ${name}`);
    console.error(`  Error: ${err.message}`);
    testsFailed++;
    return false;
  }
}

// Test 1: Question bank loads
test('Question bank loads without errors', () => {
  global.window = global;
  delete require.cache[require.resolve('../data/cissp-questions.js')];
  require('../data/cissp-questions.js');
  if (!window.QUESTION_BANK_CISSP) {
    throw new Error('QUESTION_BANK_CISSP not defined');
  }
  if (!Array.isArray(window.QUESTION_BANK_CISSP)) {
    throw new Error('QUESTION_BANK_CISSP is not an array');
  }
});

// Test 2: Case studies load
test('Case studies load without errors', () => {
  global.window = global;
  if (fs.existsSync(path.join(__dirname, '../data/cissp-case-studies.js'))) {
    delete require.cache[require.resolve('../data/cissp-case-studies.js')];
    require('../data/cissp-case-studies.js');
  }
});

// Test 3: Scenario questions load
test('Scenario questions load without errors', () => {
  global.window = global;
  if (fs.existsSync(path.join(__dirname, '../data/cissp-scenario-questions.js'))) {
    delete require.cache[require.resolve('../data/cissp-scenario-questions.js')];
    require('../data/cissp-scenario-questions.js');
  }
});

// Test 4: HTML file exists and contains required scripts
test('CISSP quiz HTML file exists and references question bank', () => {
  const htmlPath = path.join(__dirname, '../cissp_quiz.html');
  if (!fs.existsSync(htmlPath)) {
    throw new Error('cissp_quiz.html not found');
  }
  const html = fs.readFileSync(htmlPath, 'utf-8');
  if (!html.includes('cissp-questions.js')) {
    throw new Error('HTML does not reference cissp-questions.js');
  }
  if (!html.includes('quiz-engine.js')) {
    throw new Error('HTML does not reference quiz-engine.js');
  }
});

// Test 5: Question count consistency
test('Question count matches expected value (223)', () => {
  global.window = global;
  const bank = window.QUESTION_BANK_CISSP;
  if (bank.length !== 223) {
    throw new Error(`Expected 223 questions, got ${bank.length}`);
  }
});

// Test 6: All questions have required fields
test('All questions have required fields', () => {
  global.window = global;
  const bank = window.QUESTION_BANK_CISSP;
  bank.forEach((q, idx) => {
    if (!q.mode) throw new Error(`Question ${idx} missing mode`);
    if (!q.topic) throw new Error(`Question ${idx} missing topic`);
    if (!q.q) throw new Error(`Question ${idx} missing question stem`);
    if (!Array.isArray(q.options) || q.options.length < 2) {
      throw new Error(`Question ${idx} has invalid options`);
    }
    if (typeof q.correct !== 'number' || q.correct < 0 || q.correct >= q.options.length) {
      throw new Error(`Question ${idx} has invalid correct index`);
    }
  });
});

// Test 7: No duplicate questions
test('No duplicate normalized question stems', () => {
  global.window = global;
  const bank = window.QUESTION_BANK_CISSP;
  const stems = new Set();
  const normalize = str => str.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, ' ').trim();
  
  bank.forEach((q, idx) => {
    const normalized = normalize(q.q);
    if (stems.has(normalized)) {
      throw new Error(`Duplicate question at index ${idx}: "${q.q}"`);
    }
    stems.add(normalized);
  });
});

// Test 8: Check for known fixed issues
test('Issue #4 fixes: no 802.1X or due diligence duplicates', () => {
  global.window = global;
  const bank = window.QUESTION_BANK_CISSP;
  
  // Check index 30 and 76 are different
  if (bank[30].q === bank[76].q) {
    throw new Error('Index 30 and 76 still have duplicate 802.1X questions');
  }
  
  // Check index 27 and 80 are different
  const normalize = str => str.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, ' ').trim();
  if (normalize(bank[27].q) === normalize(bank[80].q)) {
    throw new Error('Index 27 and 80 still have duplicate due diligence questions');
  }
  
  // Verify due diligence question uses correct OSG definition
  const q27 = bank[27];
  if (!q27.q.toLowerCase().includes('due diligence')) {
    throw new Error('Index 27 is not a due diligence question');
  }
  if (!q27.explain.toLowerCase().includes('plan') && !q27.explain.toLowerCase().includes('establish')) {
    throw new Error('Index 27 explanation does not reflect OSG definition');
  }
});

// Test 9: Quiz engine loads
test('Quiz engine loads without errors', () => {
  const enginePath = path.join(__dirname, '../quiz-engine.js');
  if (!fs.existsSync(enginePath)) {
    throw new Error('quiz-engine.js not found');
  }
  const content = fs.readFileSync(enginePath, 'utf-8');
  // Basic syntax check - look for function declarations
  if (!content.includes('function') && !content.includes('=>')) {
    throw new Error('quiz-engine.js appears to be empty or malformed');
  }
});

// Summary
console.log(`\n${'='.repeat(60)}`);
console.log('Smoke Test Summary');
console.log(`${'='.repeat(60)}`);
console.log(`Passed: ${testsPassed}`);
console.log(`Failed: ${testsFailed}`);

if (testsFailed === 0) {
  console.log('\n✅ All smoke tests passed!');
  process.exit(0);
} else {
  console.log(`\n❌ ${testsFailed} test(s) failed`);
  process.exit(1);
}
