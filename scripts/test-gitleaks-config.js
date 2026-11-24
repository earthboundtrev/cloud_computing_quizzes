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
var GITLEAKS_PINNED_VERSION = '8.24.3';
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
  if (!/^name:\s*gitleaks\s*$/m.test(wf)) {
    fail('gitleaks workflow name must be exactly gitleaks');
  }
  if (/continue-on-error\s*:\s*true/.test(wf)) {
    fail('gitleaks workflow must not use continue-on-error');
  }
  if (!/pull_request\s*:/.test(wf)) {
    fail('gitleaks workflow must run on pull_request');
  }
  if (!/push\s*:[\s\S]*branches:\s*\[\s*main\s*\]/.test(wf)) {
    fail('gitleaks workflow must run on push to main');
  }
  if (!new RegExp('GITLEAKS_VERSION:\\s*["\']' + GITLEAKS_PINNED_VERSION + '["\']').test(wf)) {
    fail('gitleaks workflow must pin GITLEAKS_VERSION ' + GITLEAKS_PINNED_VERSION);
  }
  ok('gitleaks workflow fails closed on pull_request and push to main');
}

function assertNoSecretLiteralsInSource() {
  var self = fs.readFileSync(__filename, 'utf8');
  if (/\bAKIA[A-Z0-9]{16}\b/.test(self)) {
    fail('test source must not contain AWS access-key-shaped literals');
  }
  if (/\bsk_live_/.test(self)) {
    fail('test source must not contain Stripe sk_live literals');
  }
  ok('probe strings are not committed as secret-shaped literals');
}

function assertGitleaksVersion() {
  var out = childProcess.execFileSync('gitleaks', ['version'], { encoding: 'utf8' }).trim();
  if (out.indexOf(GITLEAKS_PINNED_VERSION) < 0) {
    fail('gitleaks version must be ' + GITLEAKS_PINNED_VERSION + ' (got ' + out + ')');
    return;
  }
  ok('gitleaks binary pinned at ' + GITLEAKS_PINNED_VERSION);
}

function buildFakeAwsProbeLine() {
  var prefix = String.fromCharCode(65, 75, 73, 65);
  var suffix = String.fromCharCode(
    52, 69, 78, 75, 55, 77, 81, 77, 86, 75, 70, 80, 51, 90, 55, 88
  );
  return 'aws_access_key_id = ' + prefix + suffix + '\n';
}

function buildFakeGenericProbeLine() {
  return (
    'api_key = \'' +
    String.fromCharCode(
      89, 87, 74, 122, 90, 87, 90, 109, 90, 109, 108, 113, 98, 87, 53, 118, 99, 72, 70,
      122, 100, 118, 100, 52, 101, 88, 111, 49, 77, 106, 77, 48
    ) +
    '\'\n'
  );
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
assertNoSecretLiteralsInSource();

if (!gitleaksAvailable()) {
  if (process.env.GITHUB_ACTIONS) {
    fail('gitleaks binary required in CI (install step missing?)');
  } else {
    console.log('SKIP gitleaks binary not installed locally');
    if (failures.length) process.exit(1);
    process.exit(0);
  }
}

assertGitleaksVersion();
runGitleaks(
  ['detect', '--source', ROOT, '--config', CONFIG, '--log-opts', 'HEAD'],
  'gitleaks detect branch history (HEAD ancestry)'
);

var awsProbeDir = fs.mkdtempSync(path.join(os.tmpdir(), 'cloudcram-gitleaks-aws-'));
var genericProbeDir = fs.mkdtempSync(path.join(os.tmpdir(), 'cloudcram-gitleaks-generic-'));
try {
  fs.writeFileSync(path.join(awsProbeDir, 'aws-key.txt'), buildFakeAwsProbeLine(), 'utf8');
  expectLeakInDir(awsProbeDir, 'runtime-built fake AWS access key is detected');

  fs.writeFileSync(path.join(genericProbeDir, 'generic-key.txt'), buildFakeGenericProbeLine(), 'utf8');
  expectLeakInDir(genericProbeDir, 'runtime-built generic api_key shape is detected');
} finally {
  try {
    fs.rmSync(awsProbeDir, { recursive: true, force: true });
    fs.rmSync(genericProbeDir, { recursive: true, force: true });
  } catch (e2) { /* ignore */ }
}

if (failures.length) {
  process.exit(1);
}