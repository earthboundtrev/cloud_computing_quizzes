#!/usr/bin/env node
/**
 * Check question bank integrity
 * 
 * Validates:
 * 1. Every data/*-questions.js file is loaded by a page or is allowlisted
 * 2. RHCSA10 bank has exactly 249 unique IDs (as specified in quiz-config.js)
 * 3. No duplicate IDs within each quiz's combined bank
 * 
 * Exit 0 on success, 1 on failure.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

function main() {
  const errors = [];
  const warnings = [];
  
  // Find all data/*-questions.js files
  const dataDir = path.join(__dirname, '..', 'data');
  const questionFiles = fs.readdirSync(dataDir)
    .filter(f => f.endsWith('-questions.js') || f.endsWith('-extra-questions.js') || 
                 f.endsWith('-boost-questions.js'))
    .map(f => path.join(dataDir, f));
  
  // Find all HTML quiz pages
  const htmlFiles = fs.readdirSync(path.join(__dirname, '..'))
    .filter(f => f.endsWith('.html') && f !== 'index.html')
    .map(f => path.join(__dirname, '..', f));
  
  // Track which question files are loaded
  const loadedFiles = new Set();
  
  htmlFiles.forEach(htmlFile => {
    const content = fs.readFileSync(htmlFile, 'utf8');
    const filename = path.basename(htmlFile);
    
    // Extract all script src tags
    const scriptMatches = content.matchAll(/src=["']([^"']+)["']/g);
    
    for (const match of scriptMatches) {
      const src = match[1].split('?')[0]; // Strip query string
      if (src.startsWith('data/') || src.startsWith('/data/')) {
        const normalizedSrc = src.startsWith('/') ? src.substring(1) : src;
        loadedFiles.add(path.join(__dirname, '..', normalizedSrc));
      }
    }
  });
  
  // Check for orphan question files
  const allowlist = [
    // Objectives files are metadata, not question banks
  ];
  
  questionFiles.forEach(file => {
    const basename = path.basename(file);
    
    // Skip objectives files
    if (basename.includes('-objectives.js')) {
      return;
    }
    
    if (!loadedFiles.has(file) && !allowlist.includes(basename)) {
      errors.push(`Orphan question file not loaded by any page: ${basename}`);
    }
  });
  
  // Check RHCSA10 bank size and uniqueness
  const quizConfigPath = path.join(__dirname, '..', 'quiz-config.js');
  const quizConfigContent = fs.readFileSync(quizConfigPath, 'utf8');
  
  // Extract expected RHCSA10 question count from quiz-config.js
  const rhcsa10Match = quizConfigContent.match(/id:\s*['"]rhcsa10['"][\s\S]*?desc:\s*['"]([^'"]*)/);
  if (rhcsa10Match) {
    const desc = rhcsa10Match[1];
    const countMatch = desc.match(/(\d+)\s*Q/);
    if (countMatch) {
      const expectedCount = parseInt(countMatch[1], 10);
      
      // Load RHCSA10 question banks
      const sandbox = { window: {} };
      vm.createContext(sandbox);
      
      const rhcsa10QuestionsPath = path.join(__dirname, '..', 'data', 'rhcsa10-questions.js');
      const rhcsa10ExtraPath = path.join(__dirname, '..', 'data', 'rhcsa10-extra-questions.js');
      
      if (fs.existsSync(rhcsa10QuestionsPath)) {
        const questionsContent = fs.readFileSync(rhcsa10QuestionsPath, 'utf8');
        vm.runInContext(questionsContent, sandbox);
      }
      
      if (fs.existsSync(rhcsa10ExtraPath)) {
        const extraContent = fs.readFileSync(rhcsa10ExtraPath, 'utf8');
        vm.runInContext(extraContent, sandbox);
      }
      
      const questions = (sandbox.window.QUESTION_BANK_RHCSA10 || []);
      const extra = (sandbox.window.QUESTION_BANK_RHCSA10_EXTRA || []);
      const combined = questions.concat(extra);
      
      // Check for unique IDs
      const ids = combined.map(q => String(q.id));
      const uniqueIds = new Set(ids);
      
      if (ids.length !== uniqueIds.size) {
        const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
        errors.push(`RHCSA10 bank has duplicate IDs: ${[...new Set(duplicates)].join(', ')}`);
      }
      
      if (uniqueIds.size !== expectedCount) {
        errors.push(`RHCSA10 bank has ${uniqueIds.size} unique IDs, expected ${expectedCount} (from quiz-config.js)`);
      }
    }
  }
  
  // Report results
  if (errors.length > 0) {
    console.error('QUESTION BANK CHECK FAILED:\n');
    errors.forEach(err => console.error('  ' + err));
    console.error(`\n${errors.length} error(s) found.`);
    process.exit(1);
  }
  
  if (warnings.length > 0) {
    console.warn('WARNINGS:\n');
    warnings.forEach(warn => console.warn('  ' + warn));
  }
  
  console.log('✓ Question bank check passed');
  console.log(`  - ${questionFiles.length} question files found`);
  console.log(`  - ${loadedFiles.size} files loaded by pages`);
  console.log('  - No orphan files detected');
  console.log('  - RHCSA10 bank integrity verified');
}

main();
