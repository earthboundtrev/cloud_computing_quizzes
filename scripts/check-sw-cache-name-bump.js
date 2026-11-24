#!/usr/bin/env node
/**
 * Fail when PRECACHE_PATHS changes without a CACHE_NAME bump in sw.js.
 *
 * Compares HEAD sw.js to a git base ref (GITHUB_BASE_SHA, argv[2], or origin/main).
 * In GitHub Actions, a missing base is a failure (not a skip).
 *
 * Issue #30 acceptance: CI requires CACHE_NAME to change when PRECACHE_PATHS changes.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const SW_PATH = path.join(ROOT, 'sw.js');
const META_PATH = path.join(ROOT, 'build-meta.js');

function readSwAtRef(ref) {
  if (!ref || /^0+$/.test(ref)) {
    return null;
  }
  try {
    return execFileSync('git', ['show', ref + ':sw.js'], {
      cwd: ROOT,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    });
  } catch (e) {
    return null;
  }
}

function extractBlock(source, constName) {
  if (constName === 'PRECACHE_PATHS') {
    const m = source.match(/const PRECACHE_PATHS = \[([\s\S]*?)\];/);
    if (!m) {
      throw new Error('PRECACHE_PATHS not found in sw.js');
    }
    const paths = m[1]
      .split('\n')
      .map(function (line) {
        return line.trim();
      })
      .filter(function (line) {
        return line.startsWith("'") || line.startsWith('"');
      })
      .map(function (line) {
        const pm = line.match(/['"]([^'"]+)['"]/);
        return pm ? pm[1] : null;
      })
      .filter(Boolean);
    return paths.sort().join('\n');
  }
  const re = new RegExp('const ' + constName + " = '([^']+)'");
  const m = source.match(re);
  if (!m) {
    throw new Error(constName + ' not found in sw.js');
  }
  return m[1];
}

function readMetaCacheName() {
  if (!fs.existsSync(META_PATH)) {
    return null;
  }
  const m = fs.readFileSync(META_PATH, 'utf8').match(/CLOUDCRAM_WEB_CACHE_NAME = '([^']+)'/);
  return m ? m[1] : null;
}

function resolveBaseRef() {
  const fromEnv = process.env.GITHUB_BASE_SHA;
  const fromArgv = process.argv[2];
  const candidates = [fromEnv, fromArgv, 'origin/main', 'main'].filter(Boolean);
  for (let i = 0; i < candidates.length; i++) {
    const ref = candidates[i];
    if (readSwAtRef(ref)) {
      return ref;
    }
  }
  return null;
}

function main() {
  if (!fs.existsSync(SW_PATH)) {
    console.error('ERROR: sw.js missing');
    process.exit(1);
  }

  const head = fs.readFileSync(SW_PATH, 'utf8');
  const baseRef = resolveBaseRef();
  const onCi = process.env.GITHUB_ACTIONS === 'true';

  if (!baseRef) {
    if (onCi) {
      console.error('ERROR: cannot read base sw.js on CI (fetch base ref or use fetch-depth: 0)');
      process.exit(1);
    }
    console.log('check-sw-cache-name-bump: skip (no base sw.js locally)');
    process.exit(0);
  }

  const base = readSwAtRef(baseRef);
  const headPrecache = extractBlock(head, 'PRECACHE_PATHS');
  const basePrecache = extractBlock(base, 'PRECACHE_PATHS');
  const headCache = extractBlock(head, 'CACHE_NAME');
  const baseCache = extractBlock(base, 'CACHE_NAME');

  if (headPrecache === basePrecache) {
    console.log('✓ PRECACHE_PATHS unchanged vs ' + baseRef + ' (CACHE_NAME ' + headCache + ')');
    process.exit(0);
  }

  if (headCache === baseCache) {
    console.error('SERVICE WORKER CACHE_NAME CHECK FAILED:\n');
    console.error('  PRECACHE_PATHS changed vs ' + baseRef + ' but CACHE_NAME is still ' + headCache);
    console.error('  Bump const CACHE_NAME in sw.js and build-meta.js when editing PRECACHE_PATHS.');
    process.exit(1);
  }

  const metaCache = readMetaCacheName();
  if (metaCache && metaCache !== headCache) {
    console.error('SERVICE WORKER CACHE_NAME CHECK FAILED:\n');
    console.error('  sw.js CACHE_NAME is ' + headCache + ' but build-meta.js has ' + metaCache);
    process.exit(1);
  }

  console.log('✓ PRECACHE_PATHS changed and CACHE_NAME bumped (' + baseCache + ' → ' + headCache + ')');
}

main();