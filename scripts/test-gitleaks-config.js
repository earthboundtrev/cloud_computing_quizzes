#!/usr/bin/env node
/**
 * Gitleaks config guardrails (#119): no path/glob allowlists; scan passes; probes catch leaks.
 */
'use strict';

var fs = require('fs');
var path = require('path');
var os = require('os');
var childProcess = require('child_process');

var ROOT = path.join(__dirname, '..');
var CONFIG = path.join(ROOT, '.gitleaks.toml');
var GITLEAKS_WORKFLOW = path.join(ROOT, '.github', 'workflows', 'gitleaks.yml');
var failures = [];

function fail(msg) {
  failures.push(msg);
  console.error('FAIL', msg);
}

function ok(msg) {
  console.log('OK', msg);
}

function assertNoPathAllowlist(toml) {
  if (/\bpaths\s*=/.test(toml) && /allowlist/i.test(toml)) {
    fail('allowlist must not define paths (whole-file skips forbidden)');
    return;
  }
  if (/\bglobs\s*=/.test(toml) && /allowlist/i.test(toml)) {
    fail('allowlist must not define globs');
    return;
  }
  ok('no path or glob allowlist entries');
}

function assertRegexComments(toml) {
  if (!toml.includes('[allowlist]') || !toml.includes('regexes = [')) {
    fail('missing [allowlist].regexes');
    return;
  }
  var lines = toml.split('\n');
  var inRegexes = false;
  var regexLineCount = 0;
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    if (/^\s*regexes\s*=\s*\[/.test(line)) {
      inRegexes = true;
      continue;
    }
    if (inRegexes && /^\s*\]/.test(line)) break;
    if (inRegexes && /'''.+''',?/.test(line)) {
      regexLineCount++;
      var prev = i > 0 ? lines[i - 1].trim() : '';
      if (!prev.startsWith('#')) {
        fail('allowlist regex line missing comment above: ' + line.trim());
      }
      var body = line.match(/'''(.+)'''/);
      if (body && /[.^$*+?[\]\\|()]/.test(body[1])) {
        fail('allowlist regex must be a literal string, not a pattern: ' + body[1]);
      }
    }
  }
  if (regexLineCount < 1) {
    fail('expected at least one allowlist regex');
    return;
  }
  ok('each allowlist regex has a documenting comment');
}

function assertWorkflowPolicy() {
  if (!fs.existsSync(GITLEAKS_WORKFLOW)) {
    fail('missing .github/workflows/gitleaks.yml');
    return;
  }
  var wf = fs.readFileSync(GITLEAKS_WORKFLOW, 'utf8');
  if (/continue-on-error\s*:\s*true/.test(wf)) {
    fail('gitleaks workflow must not use continue-on-error');
  }
  if (!/pull_request\s*:/.test(wf)) {
    fail('gitleaks workflow must run on pull_request');
  }
  if (!/push\s*:[\s\S]*branches:\s*\[\s*main\s*\]/.test(wf)) {
    fail('gitleaks workflow must run on push to main');
  }
  ok('gitleaks workflow fails closed on pull_request and push to main');
}

function runGitleaks(args, label) {
  try {
    childProcess.execFileSync('gitleaks', args, { stdio: 'pipe', encoding: 'utf8' });
    ok(label);
    return 0;
  } catch (e) {
    var out = (e.stdout || '') + (e.stderr || '');
    fail(label + (out ? ': ' + out.trim().slice(0, 400) : ': exit ' + e.status));
    return e.status || 1;
  }
}

function gitleaksAvailable() {
  try {
    childProcess.execFileSync('gitleaks', ['version'], { stdio: 'pipe' });
    return true;
  } catch (e1) {
    return false;
  }
}

function expectLeakInDir(dir, label) {
  try {
    childProcess.execFileSync(
      'gitleaks',
      ['detect', '--source', dir, '--config', CONFIG, '--no-git'],
      { stdio: 'pipe' }
    );
    fail('expected gitleaks to report a leak: ' + label);
  } catch (probeErr) {
    if (probeErr.status === 1) {
      ok(label);
    } else {
      fail(label + ' unexpected exit: ' + probeErr.status);
    }
  }
}

var toml = fs.readFileSync(CONFIG, 'utf8');
assertNoPathAllowlist(toml);
assertRegexComments(toml);
assertWorkflowPolicy();

if (!gitleaksAvailable()) {
  if (process.env.GITHUB_ACTIONS) {
    fail('gitleaks binary required in CI (install step missing?)');
  } else {
    console.log('SKIP gitleaks binary not installed locally');
    if (failures.length) process.exit(1);
    process.exit(0);
  }
}

runGitleaks(['detect', '--source', ROOT, '--config', CONFIG], 'gitleaks detect full tree + history');

var probeBase = fs.mkdtempSync(path.join(os.tmpdir(), 'cloudcram-gitleaks-probe-'));
try {
  fs.writeFileSync(
    path.join(probeBase, 'aws-key.txt'),
    'aws_access_key_id = AKIA4ENK7MQMVKFP3Z7X\n',
    'utf8'
  );
  expectLeakInDir(probeBase, 'scratch fake AWS access key is detected');

  var fakeGeneric =
    'api_key = \'' +
    String.fromCharCode(89, 87, 74, 122, 90, 87, 90, 109, 90, 109, 108, 113, 98, 87, 53, 118, 99, 72, 70, 122, 100, 118, 100, 52, 101, 88, 111, 49, 77, 106, 77, 48) +
    '\'\n';
  fs.writeFileSync(path.join(probeBase, 'generic-key.txt'), fakeGeneric, 'utf8');
  expectLeakInDir(probeBase, 'scratch generic api_key shape is detected');
} finally {
  try {
    fs.rmSync(probeBase, { recursive: true, force: true });
  } catch (e2) { /* ignore */ }
}

if (failures.length) {
  process.exit(1);
}