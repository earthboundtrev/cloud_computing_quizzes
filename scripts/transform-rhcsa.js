#!/usr/bin/env node
/**
 * Transform RHCSA9 questions to RHCSA10 format
 */

const fs = require('fs');
const path = require('path');

// Mock window object for browser-based question files
global.window = {};

// Load existing questions
require('../data/rhcsa9-questions.js');
require('../data/rhcsa9-extra-questions.js');

const allQuestions = [
  ...(window.QUESTION_BANK_RHCSA9 || []),
  ...(window.QUESTION_BANK_RHCSA9_EXTRA || [])
];

console.log(`Total questions loaded: ${allQuestions.length}`);

// Statistics
let removedRHEL9vs7 = 0;
let removedContainers = 0;
let removedStratis = 0;
let removedVDO = 0;
let removedACL = 0;

// Filter out unwanted questions
const filteredQuestions = allQuestions.filter(q => {
  const questionText = (q.q + ' ' + q.options.join(' ') + ' ' + (q.explain || '')).toLowerCase();
  const topic = (q.topic || '').toLowerCase();
  
  // Remove RHEL 9 vs 7 comparison questions
  if (topic.includes('rhel 9 vs 7')) {
    removedRHEL9vs7++;
    return false;
  }
  
  // Remove Podman/container questions
  if (questionText.includes('podman') || (questionText.includes('container') && topic.includes('container'))) {
    removedContainers++;
    return false;
  }
  
  // Remove Stratis questions
  if (questionText.includes('stratis')) {
    removedStratis++;
    return false;
  }
  
  // Remove VDO questions
  if (questionText.includes('vdo')) {
    removedVDO++;
    return false;
  }
  
  // Remove ACL questions (not in RHEL 10 objectives)
  if (questionText.includes('setfacl') || questionText.includes('getfacl') || 
      (questionText.includes('default acl') || questionText.includes('access acl'))) {
    removedACL++;
    return false;
  }
  
  return true;
});

console.log(`\nQuestions after filtering: ${filteredQuestions.length}`);
console.log(`Questions removed: ${allQuestions.length - filteredQuestions.length}`);
console.log(`  - RHEL 9 vs 7: ${removedRHEL9vs7}`);
console.log(`  - Containers/Podman: ${removedContainers}`);
console.log(`  - Stratis: ${removedStratis}`);
console.log(`  - VDO: ${removedVDO}`);
console.log(`  - ACL: ${removedACL}`);

// Write count to file for later reference
fs.writeFileSync('/tmp/rhcsa-transform-stats.txt', 
  `Original: ${allQuestions.length}\nFiltered: ${filteredQuestions.length}\nRemoved: ${allQuestions.length - filteredQuestions.length}`
);

console.log(`\nFiltered questions saved. Ready for manual metadata addition.`);
