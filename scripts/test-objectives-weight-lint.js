#!/usr/bin/env node
/**
 * Regression: objectives weight sum 0.9 fails lint (#33).
 */
const path = require('path');
const { spawnSync } = require('child_process');

const root = path.join(__dirname, '..');
const fixture = path.join(__dirname, 'fixtures', 'objectives-weight-invalid.js');

const bad = spawnSync(
  process.execPath,
  [path.join(__dirname, 'lint-banks.js'), '--objectives-file', fixture, 'fixture'],
  { cwd: root, encoding: 'utf8' }
);

if (bad.status === 0) {
  console.error('Expected lint-banks --objectives-file to exit 1 for 0.9 weight sum');
  if (bad.stdout) console.error(bad.stdout);
  if (bad.stderr) console.error(bad.stderr);
  process.exit(1);
}

const goodFixture = path.join(__dirname, 'fixtures', 'objectives-weight-valid.js');
const good = spawnSync(
  process.execPath,
  [path.join(__dirname, 'lint-banks.js'), '--objectives-file', goodFixture, 'fixture'],
  { cwd: root, encoding: 'utf8' }
);

if (good.status !== 0) {
  console.error('Expected valid fixture to pass');
  process.exit(1);
}

console.log('✓ objectives weight lint fixture tests passed');
