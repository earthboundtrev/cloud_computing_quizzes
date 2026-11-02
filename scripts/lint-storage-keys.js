#!/usr/bin/env node
/**
 * CI: every localStorage key the app uses must appear in storage-keys.js.
 * GitHub #70.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const REGISTRY_PATH = path.join(ROOT, 'storage-keys.js');

const SCAN_FILES = [
  'quiz-engine.js',
  'brain-dump.js',
  'rhcsa-migration.js',
  'quiz-config.js',
  'session-streak.js',
  'index-init.js',
  'app-reset.js',
  'data-export.js',
  'reminder-server.js',
  'sw-register.js',
  'motivation.js',
  'quiz-nav.js',
  'storage-write-guard.js'
];

const IGNORE_KEY_LITERALS = new Set([
  'cloudcram_delete_offline_note'
]);

function loadRegistry() {
  delete require.cache[require.resolve(REGISTRY_PATH)];
  return require(REGISTRY_PATH);
}

function collectConstKeys(source) {
  const map = new Map();
  const re = /(?:const|var)\s+([A-Z_][A-Z0-9_]*)\s*=\s*['"]([^'"]+)['"]/g;
  let m;
  while ((m = re.exec(source)) !== null) {
    map.set(m[1], m[2]);
  }
  return map;
}

function collectKeysFromSource(source) {
  const keys = new Set();
  const literalRe = /localStorage\.(?:setItem|getItem|removeItem)\(\s*['"]([^'"]+)['"]/g;
  let m;
  while ((m = literalRe.exec(source)) !== null) {
    keys.add(m[1]);
  }

  const constMap = collectConstKeys(source);
  const identRe = /localStorage\.(?:setItem|getItem|removeItem)\(\s*([A-Z_][A-Z0-9_]*)/g;
  while ((m = identRe.exec(source)) !== null) {
    const resolved = constMap.get(m[1]);
    if (resolved) keys.add(resolved);
  }

  /* Dynamic profile keys: PROFILE_KEY = 'study_sessions_profile_' + QUIZ_ID */
  if (/study_sessions_profile_/.test(source) && /PROFILE_KEY/.test(source)) {
    keys.add('__dynamic_study_sessions_profile__');
  }

  return keys;
}

function main() {
  const registry = loadRegistry();
  const errors = [];
  const seen = new Set();

  for (const rel of SCAN_FILES) {
    const filePath = path.join(ROOT, rel);
    if (!fs.existsSync(filePath)) continue;
    const source = fs.readFileSync(filePath, 'utf8');
    const keys = collectKeysFromSource(source);
    for (const key of keys) {
      if (key === '__dynamic_study_sessions_profile__') {
        const probe = 'study_sessions_profile_cissp';
        if (!registry.isRegisteredKey(probe)) {
          errors.push(`Missing study_sessions_profile_* prefix (referenced in ${rel})`);
        }
        continue;
      }
      if (IGNORE_KEY_LITERALS.has(key)) continue;
      seen.add(key);
      if (!registry.isRegisteredKey(key)) {
        errors.push(`Unregistered localStorage key "${key}" in ${rel}`);
      }
    }
  }

  if (errors.length) {
    console.error('storage-keys lint failed:\n' + errors.map((e) => '  - ' + e).join('\n'));
    process.exit(1);
  }

  console.log(
    'storage-keys lint OK (' +
      seen.size +
      ' keys checked, registry has ' +
      registry.ENTRIES.length +
      ' entries)'
  );
}

main();
