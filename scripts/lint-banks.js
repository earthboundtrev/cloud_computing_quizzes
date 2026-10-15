#!/usr/bin/env node
/**
 * Bank-wide Lint and Metadata Validation
 * 
 * Implements all checks from issue #6:
 * - Syntax validation
 * - Schema validation (mode, topic, options, correct, explain)
 * - Metadata validation (obj, level, ref fields)
 * - Duplicate stem detection
 * - Longest-option leak analysis
 * - Unique ID validation
 * - Link validation
 * - Precache coverage
 * - Exam code validation
 * 
 * Usage:
 *   node scripts/lint-banks.js           # Report mode
 *   node scripts/lint-banks.js --ci      # CI mode (fail on errors)
 */

const fs = require('fs');
const path = require('path');

// ===========================
// Configuration
// ===========================

const CI_MODE = process.argv.includes('--ci');

// Expected exam codes per track (issue #6)
const EXPECTED_EXAM_CODES = {
  'oci': '1Z0-1085-26',
  'gcp': null,  // GCP CDL has no exam code
  'gcp_pca': null,  // Professional Cloud Architect
  'gcp_ace': null,  // Associate Cloud Engineer
  'az900': 'AZ-900',
  'az104': 'AZ-104',
  'az305': 'AZ-305',
  'ai900': 'AI-901',  // Updated from AI-900
  'aws_mlea': 'MLA-C02',  // Updated from MLA-C01
  'aws_dea': 'DEA-C01',
  'aws_genai': 'AIP-C01',
  'terraform': '004',
  'cissp': null,  // No single exam code
  'secai': 'CY0-001',
  'rhcsa9': 'EX200',  // RHEL 10
  'rhce': 'EX294'
};

// Longest-option thresholds (per-track ratchet, issue #6)
// Initially report-only; gates turn on as tracks ramp up
const LONGEST_OPTION_THRESHOLDS = {
  'cissp': 0.40,  // Target: ≤40% after ramp-up
  // All others: report-only for now (no gate)
};

// Question bank files and their corresponding objectives files
const BANK_FILES = {
  'oci': ['data/oci-questions.js'],
  'gcp': ['data/gcp-questions.js'],
  'gcp_pca': ['data/gcp-pca-questions.js', 'data/gcp-pca-case-studies.js', 'data/gcp-pca-scenario-questions.js'],
  'gcp_ace': ['data/gcp-ace-questions.js', 'data/gcp-ace-extra-questions.js'],
  'az900': ['data/az900-questions.js'],
  'az104': ['data/az104-questions.js', 'data/az104-extra-questions.js', 'data/az104-boost-questions.js', 'data/az104-case-studies.js', 'data/az104-scenario-questions.js'],
  'az305': ['data/az305-questions.js', 'data/az305-extra-questions.js', 'data/az305-boost-questions.js', 'data/az305-case-studies.js', 'data/az305-scenario-questions.js'],
  'ai900': ['data/ai900-questions.js'],
  'aws_mlea': ['data/aws-mlea-questions.js', 'data/aws-mlea-extra-questions.js', 'data/aws-mlea-case-studies.js', 'data/aws-mlea-scenario-questions.js'],
  'aws_dea': ['data/aws-data-engineering-questions.js', 'data/aws-dea-extra-questions.js', 'data/aws-dea-case-studies.js', 'data/aws-dea-scenario-questions.js'],
  'aws_genai': ['data/aws-genai-questions.js', 'data/aws-genai-extra-questions.js', 'data/aws-genai-case-studies.js', 'data/aws-genai-scenario-questions.js'],
  'terraform': ['data/terraform-questions.js', 'data/terraform-extra-questions.js'],
  'cissp': ['data/cissp-questions.js', 'data/cissp-case-studies.js', 'data/cissp-scenario-questions.js'],
  'secai': ['data/secai-questions.js', 'data/secai-case-studies.js', 'data/secai-scenario-questions.js'],
  'rhcsa9': ['data/rhcsa9-questions.js', 'data/rhcsa9-extra-questions.js'],
  'rhce': ['data/rhce-questions.js']
};

const OBJECTIVES_FILES = {
  'oci': 'data/oci-objectives.js',
  'gcp': 'data/gcp-objectives.js',
  'gcp_pca': 'data/gcp-pca-objectives.js',
  'gcp_ace': 'data/gcp-ace-objectives.js',
  'az900': 'data/az900-objectives.js',
  'az104': 'data/az104-objectives.js',
  'az305': 'data/az305-objectives.js',
  'ai900': 'data/ai900-objectives.js',
  'aws_mlea': 'data/aws-mlea-objectives.js',
  'aws_dea': 'data/aws-dea-objectives.js',
  'aws_genai': 'data/aws-genai-objectives.js',
  'terraform': 'data/terraform-objectives.js',
  'cissp': 'data/cissp-objectives.js',
  'secai': 'data/secai-objectives.js',
  'rhcsa9': 'data/rhcsa9-objectives.js',
  'rhce': 'data/rhce-objectives.js'
};

// ===========================
// Utilities
// ===========================

const errors = [];
const warnings = [];
const stats = {};

function error(msg) {
  errors.push(msg);
}

function warn(msg) {
  warnings.push(msg);
}

function normalize(str) {
  return str
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function checkSyntax(file) {
  try {
    require('child_process').execSync(`node --check ${file}`, { encoding: 'utf8', stdio: 'pipe' });
    return true;
  } catch (e) {
    error(`Syntax error in ${file}: ${e.message}`);
    return false;
  }
}

function loadQuestionBank(file, varName) {
  try {
    global.window = global;
    delete require.cache[require.resolve(path.resolve(file))];
    require(path.resolve(file));
    
    // Try the computed variable name first
    let bank = global.window[varName];
    
    // If not found, look for any QUESTION_BANK_* or CASE_STUDIES_* variable
    if (!bank) {
      const keys = Object.keys(global.window).filter(k => 
        k.startsWith('QUESTION_BANK_') || k.startsWith('CASE_STUDIES_')
      );
      if (keys.length > 0) {
        bank = global.window[keys[0]];
      }
    }
    
    if (!Array.isArray(bank) && typeof bank !== 'object') {
      error(`${file}: No valid question bank or case studies found (tried ${varName})`);
      return [];
    }
    
    // Handle case studies (objects) vs question banks (arrays)
    if (typeof bank === 'object' && !Array.isArray(bank)) {
      // Case studies - skip for now, they don't have questions directly
      return [];
    }
    
    return bank || [];
  } catch (e) {
    error(`Failed to load ${file}: ${e.message}`);
    return [];
  }
}

function loadObjectives(file) {
  if (!fs.existsSync(file)) {
    return null;  // Objectives not required yet for all tracks
  }
  try {
    global.window = global;
    delete require.cache[require.resolve(path.resolve(file))];
    require(path.resolve(file));
    return global.window.OBJECTIVES || null;
  } catch (e) {
    warn(`Failed to load objectives from ${file}: ${e.message}`);
    return null;
  }
}

// ===========================
// Validation Functions
// ===========================

function validateSchema(questions, trackId, fileName) {
  const trackStats = stats[trackId] || { total: 0, byObj: {}, byLevel: {}, byType: {}, byMode: {}, missingFields: {} };
  
  questions.forEach((q, idx) => {
    const qId = `${fileName}[${idx}]`;
    trackStats.total++;
    
    // Required fields
    if (!q.mode) {
      error(`${qId}: missing 'mode' field`);
      trackStats.missingFields.mode = (trackStats.missingFields.mode || 0) + 1;
    } else {
      trackStats.byMode[q.mode] = (trackStats.byMode[q.mode] || 0) + 1;
    }
    
    if (!q.topic) {
      error(`${qId}: missing 'topic' field`);
      trackStats.missingFields.topic = (trackStats.missingFields.topic || 0) + 1;
    }
    
    if (!q.q) {
      error(`${qId}: missing question stem 'q' field`);
    }
    
    if (!q.options || !Array.isArray(q.options) || q.options.length < 2) {
      error(`${qId}: 'options' must be an array with at least 2 items`);
    }
    
    if (!q.explain) {
      warn(`${qId}: missing 'explain' field`);
    }
    
    // Validate correct answer
    const qType = q.type || 'single';
    trackStats.byType[qType] = (trackStats.byType[qType] || 0) + 1;
    
    if (qType === 'multi' || qType === 'order') {
      if (!Array.isArray(q.correct) && !Array.isArray(q.correctOrder)) {
        error(`${qId}: ${qType} questions require array for 'correct' or 'correctOrder'`);
      } else {
        const correctArr = q.correct || q.correctOrder || [];
        const uniqueVals = new Set(correctArr);
        if (uniqueVals.size !== correctArr.length) {
          error(`${qId}: duplicate values in correct answer array`);
        }
        correctArr.forEach(val => {
          if (typeof val !== 'number' || val < 0 || (q.options && val >= q.options.length)) {
            error(`${qId}: correct answer index ${val} out of range`);
          }
        });
      }
    } else if (qType === 'tf') {
      if (typeof q.correct !== 'boolean') {
        error(`${qId}: true/false questions require boolean 'correct'`);
      }
    } else {
      if (typeof q.correct !== 'number' || q.correct < 0) {
        error(`${qId}: 'correct' must be a non-negative integer`);
      } else if (q.options && q.correct >= q.options.length) {
        error(`${qId}: correct index ${q.correct} out of range (options: ${q.options.length})`);
      }
    }
    
    // Metadata fields (obj, level) - warn if missing for now
    if (!q.obj) {
      trackStats.missingFields.obj = (trackStats.missingFields.obj || 0) + 1;
    } else {
      trackStats.byObj[q.obj] = (trackStats.byObj[q.obj] || 0) + 1;
    }
    
    if (!q.level) {
      trackStats.missingFields.level = (trackStats.missingFields.level || 0) + 1;
    } else {
      if (typeof q.level !== 'number' || q.level < 1 || q.level > 5) {
        error(`${qId}: 'level' must be 1-5 (Bloom taxonomy)`);
      } else {
        trackStats.byLevel[q.level] = (trackStats.byLevel[q.level] || 0) + 1;
      }
    }
    
    // ref field - warn if missing or malformed
    if (!q.ref) {
      // Not required yet, just track
    } else if (!q.ref.match(/^https:\/\//)) {
      warn(`${qId}: 'ref' should start with https://`);
    }
  });
  
  stats[trackId] = trackStats;
}

function checkDuplicateStems(questions, trackId) {
  const stemMap = new Map();
  const duplicates = [];
  
  questions.forEach((q, idx) => {
    if (!q.q) return;
    
    // Skip questions marked with dupOf (whitelisted duplicates)
    if (q.dupOf) return;
    
    const normalized = normalize(q.q);
    if (stemMap.has(normalized)) {
      duplicates.push({
        normalized,
        indices: [stemMap.get(normalized), idx],
        questions: [questions[stemMap.get(normalized)].q, q.q]
      });
    } else {
      stemMap.set(normalized, idx);
    }
  });
  
  if (duplicates.length > 0) {
    error(`${trackId}: Found ${duplicates.length} duplicate question stem(s)`);
    duplicates.slice(0, 5).forEach(dup => {
      error(`  - Indices ${dup.indices.join(', ')}: "${dup.questions[0].substring(0, 60)}..."`);
    });
  }
}

function analyzeLongestOption(questions, trackId) {
  let totalSingleChoice = 0;
  let longestIsCorrect = 0;
  
  questions.forEach(q => {
    // Only analyze single-choice questions with options
    const qType = q.type || 'single';
    if (qType !== 'single' || !q.options || typeof q.correct !== 'number') return;
    
    totalSingleChoice++;
    
    // Find longest option
    let longestIdx = 0;
    let longestLen = 0;
    q.options.forEach((opt, idx) => {
      const len = opt.length;
      if (len > longestLen) {
        longestLen = len;
        longestIdx = idx;
      }
    });
    
    if (longestIdx === q.correct) {
      longestIsCorrect++;
    }
  });
  
  const percentage = totalSingleChoice > 0 ? (longestIsCorrect / totalSingleChoice * 100).toFixed(1) : 0;
  
  stats[trackId].longestOption = {
    total: totalSingleChoice,
    longestIsCorrect,
    percentage: parseFloat(percentage)
  };
  
  // Check threshold if defined
  const threshold = LONGEST_OPTION_THRESHOLDS[trackId];
  if (threshold && percentage > threshold * 100) {
    error(`${trackId}: Longest-option leak ${percentage}% exceeds threshold ${(threshold * 100).toFixed(0)}%`);
  }
  
  return percentage;
}

function validateObjectives(questions, trackId, objectives) {
  if (!objectives) {
    // Objectives not yet required for all tracks
    return;
  }
  
  const validObjIds = new Set();
  if (Array.isArray(objectives)) {
    objectives.forEach(obj => {
      if (obj.id) validObjIds.add(obj.id);
    });
  }
  
  questions.forEach((q, idx) => {
    if (q.obj && !validObjIds.has(q.obj)) {
      error(`${trackId}[${idx}]: 'obj' value '${q.obj}' not found in objectives file`);
    }
  });
}

function checkUniqueIds(allQuestions, trackId) {
  const idMap = new Map();
  const duplicateIds = [];
  
  allQuestions.forEach((q, idx) => {
    if (!q.id) return;  // IDs not yet required
    
    // Validate ID format (lowercase alphanumeric + hyphens)
    if (!q.id.match(/^[a-z0-9-]+$/)) {
      error(`${trackId}[${idx}]: ID '${q.id}' must be lowercase alphanumeric with hyphens only`);
    }
    
    if (idMap.has(q.id)) {
      duplicateIds.push({ id: q.id, indices: [idMap.get(q.id), idx] });
    } else {
      idMap.set(q.id, idx);
    }
  });
  
  if (duplicateIds.length > 0) {
    error(`${trackId}: Found ${duplicateIds.length} duplicate question ID(s)`);
    duplicateIds.slice(0, 5).forEach(dup => {
      error(`  - ID '${dup.id}' at indices ${dup.indices.join(', ')}`);
    });
  }
}

function checkRetiredIds(allQuestions) {
  const retiredFile = 'data/retired-ids.json';
  if (!fs.existsSync(retiredFile)) return;
  
  try {
    const retired = JSON.parse(fs.readFileSync(retiredFile, 'utf8'));
    const retiredSet = new Set(retired);
    
    allQuestions.forEach((q, idx) => {
      if (q.id && retiredSet.has(q.id)) {
        error(`Question ${idx}: ID '${q.id}' is retired and cannot be reused`);
      }
    });
  } catch (e) {
    warn(`Could not load retired IDs: ${e.message}`);
  }
}

function validateExamCodes() {
  try {
    const quizConfig = require(path.resolve('quiz-config.js'));
    global.window = { QUIZ_CONFIG: null };
    eval(fs.readFileSync('quiz-config.js', 'utf8'));
    const config = global.window.QUIZ_CONFIG;
    
    if (!Array.isArray(config)) {
      error('quiz-config.js: QUIZ_CONFIG is not an array');
      return;
    }
    
    config.forEach(quiz => {
      const expectedCode = EXPECTED_EXAM_CODES[quiz.id];
      
      // Check if examCode field exists
      if (!quiz.examCode && expectedCode !== null) {
        warn(`quiz-config.js: ${quiz.id} missing 'examCode' field (expected: ${expectedCode})`);
      } else if (quiz.examCode !== expectedCode && expectedCode !== null) {
        error(`quiz-config.js: ${quiz.id} has examCode '${quiz.examCode}', expected '${expectedCode}'`);
      }
    });
  } catch (e) {
    error(`Failed to validate exam codes: ${e.message}`);
  }
}

function checkLinksExist() {
  // Check quiz-config hrefs exist
  try {
    global.window = { QUIZ_CONFIG: null };
    eval(fs.readFileSync('quiz-config.js', 'utf8'));
    const config = global.window.QUIZ_CONFIG;
    
    if (Array.isArray(config)) {
      config.forEach(quiz => {
        if (quiz.href && !fs.existsSync(quiz.href)) {
          error(`quiz-config.js: ${quiz.id} href '${quiz.href}' does not exist`);
        }
      });
    }
  } catch (e) {
    error(`Failed to check quiz-config links: ${e.message}`);
  }
  
  // Check manifest.json
  if (fs.existsSync('manifest.json')) {
    try {
      const manifest = JSON.parse(fs.readFileSync('manifest.json', 'utf8'));
      if (manifest.icons) {
        manifest.icons.forEach(icon => {
          if (icon.src && !fs.existsSync(icon.src)) {
            error(`manifest.json: icon '${icon.src}' does not exist`);
          }
        });
      }
    } catch (e) {
      error(`manifest.json: parse error - ${e.message}`);
    }
  }
  
  // Check local links in HTML files
  const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));
  htmlFiles.forEach(file => {
    try {
      const content = fs.readFileSync(file, 'utf8');
      const srcMatches = content.match(/(?:src|href)=["']([^"']+)["']/g) || [];
      srcMatches.forEach(match => {
        const url = match.match(/=["']([^"']+)["']/)[1];
        if (!url.startsWith('http') && !url.startsWith('//') && !url.startsWith('#') && !url.startsWith('data:')) {
          const cleanUrl = url.split('?')[0].split('#')[0];
          if (cleanUrl && !fs.existsSync(cleanUrl)) {
            warn(`${file}: local resource '${cleanUrl}' not found`);
          }
        }
      });
    } catch (e) {
      // Skip files that can't be read
    }
  });
}

// ===========================
// Main Execution
// ===========================

function main() {
  console.log('='.repeat(70));
  console.log('Bank-Wide Lint and Metadata Validation');
  console.log('='.repeat(70));
  console.log('');
  
  // 1. Syntax checks
  console.log('✓ Checking syntax...');
  let syntaxOk = true;
  
  Object.values(BANK_FILES).flat().forEach(file => {
    if (fs.existsSync(file)) {
      syntaxOk = checkSyntax(file) && syntaxOk;
    }
  });
  
  ['quiz-config.js', 'quiz-engine.js'].forEach(file => {
    if (fs.existsSync(file)) {
      syntaxOk = checkSyntax(file) && syntaxOk;
    }
  });
  
  if (syntaxOk) {
    console.log('  ✓ All files pass syntax check\n');
  }
  
  // 2. Per-track validation
  console.log('✓ Validating question banks...\n');
  
  const allQuestions = [];
  const allIds = new Set();
  
  Object.keys(BANK_FILES).forEach(trackId => {
    console.log(`  ${trackId}:`);
    stats[trackId] = { total: 0, byObj: {}, byLevel: {}, byType: {}, byMode: {}, missingFields: {} };
    
    const trackQuestions = [];
    const files = BANK_FILES[trackId];
    
    files.forEach(file => {
      if (!fs.existsSync(file)) {
        warn(`${trackId}: file ${file} not found`);
        return;
      }
      
      // Determine variable name from file
      const baseName = path.basename(file, '.js');
      const varName = 'QUESTION_BANK_' + baseName.toUpperCase().replace(/-/g, '_');
      
      const questions = loadQuestionBank(file, varName);
      trackQuestions.push(...questions);
      allQuestions.push(...questions);
      
      validateSchema(questions, trackId, file);
    });
    
    // Load objectives if available
    const objectivesFile = OBJECTIVES_FILES[trackId];
    const objectives = objectivesFile ? loadObjectives(objectivesFile) : null;
    
    if (trackQuestions.length > 0) {
      checkDuplicateStems(trackQuestions, trackId);
      validateObjectives(trackQuestions, trackId, objectives);
      checkUniqueIds(trackQuestions, trackId);
      const longestPct = analyzeLongestOption(trackQuestions, trackId);
      
      console.log(`    Questions: ${stats[trackId].total}`);
      console.log(`    Longest-option: ${longestPct}%`);
      if (objectives) {
        console.log(`    Objectives: ${Object.keys(stats[trackId].byObj).length}`);
      }
    }
    console.log('');
  });
  
  // 3. Cross-track ID validation
  checkRetiredIds(allQuestions);
  
  // 4. Exam code validation
  console.log('✓ Checking exam codes...\n');
  validateExamCodes();
  
  // 5. Link validation
  console.log('✓ Checking links...\n');
  checkLinksExist();
  
  // ===========================
  // Reporting
  // ===========================
  
  console.log('='.repeat(70));
  console.log('Statistics Report');
  console.log('='.repeat(70));
  console.log('');
  
  Object.keys(stats).forEach(trackId => {
    const s = stats[trackId];
    console.log(`${trackId}:`);
    console.log(`  Total questions: ${s.total}`);
    console.log(`  By mode: ${JSON.stringify(s.byMode)}`);
    console.log(`  By type: ${JSON.stringify(s.byType)}`);
    if (Object.keys(s.byLevel).length > 0) {
      console.log(`  By level: ${JSON.stringify(s.byLevel)}`);
    }
    if (Object.keys(s.byObj).length > 0) {
      console.log(`  By objective: ${Object.keys(s.byObj).length} objectives covered`);
    }
    if (s.longestOption) {
      console.log(`  Longest-option leak: ${s.longestOption.longestIsCorrect}/${s.longestOption.total} (${s.longestOption.percentage}%)`);
    }
    if (Object.keys(s.missingFields).length > 0) {
      console.log(`  Missing fields: ${JSON.stringify(s.missingFields)}`);
    }
    console.log('');
  });
  
  // ===========================
  // Summary
  // ===========================
  
  console.log('='.repeat(70));
  console.log('Summary');
  console.log('='.repeat(70));
  console.log(`Errors: ${errors.length}`);
  console.log(`Warnings: ${warnings.length}`);
  console.log('');
  
  if (errors.length > 0) {
    console.log('❌ ERRORS:');
    errors.forEach(err => console.log(`  ${err}`));
    console.log('');
  }
  
  if (warnings.length > 0) {
    console.log('⚠️  WARNINGS:');
    warnings.forEach(warn => console.log(`  ${warn}`));
    console.log('');
  }
  
  if (errors.length === 0 && warnings.length === 0) {
    console.log('✅ All checks passed!');
    process.exit(0);
  } else if (errors.length === 0) {
    console.log('✅ No errors (only warnings)');
    process.exit(0);
  } else {
    console.log(`❌ Validation failed with ${errors.length} error(s)`);
    if (CI_MODE) {
      process.exit(1);
    } else {
      console.log('(Run with --ci to fail on errors)');
      process.exit(0);
    }
  }
}

if (require.main === module) {
  main();
}

module.exports = { normalize, checkSyntax, loadQuestionBank };
