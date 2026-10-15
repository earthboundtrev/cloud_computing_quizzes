#!/usr/bin/env node
/**
 * CISSP Test Suite
 * 
 * Runs all validation, smoke tests, and lint checks for the CISSP question bank.
 */

const { execSync } = require('child_process');
const path = require('path');

const tests = [
  { name: 'Validation', script: 'validate-cissp-questions.js' },
  { name: 'Smoke Test', script: 'smoke-test-cissp.js' },
  { name: 'Lint', script: 'lint-cissp-questions.js' }
];

console.log('CISSP Question Bank Test Suite');
console.log('='.repeat(60));
console.log('');

let allPassed = true;

tests.forEach(test => {
  console.log(`Running ${test.name}...`);
  console.log('-'.repeat(60));
  
  try {
    execSync(`node ${path.join(__dirname, test.script)}`, {
      stdio: 'inherit',
      cwd: path.join(__dirname, '..')
    });
    console.log(`✅ ${test.name} PASSED\n`);
  } catch (err) {
    console.log(`❌ ${test.name} FAILED\n`);
    allPassed = false;
  }
});

console.log('='.repeat(60));
if (allPassed) {
  console.log('✅ ALL TESTS PASSED');
  process.exit(0);
} else {
  console.log('❌ SOME TESTS FAILED');
  process.exit(1);
}
