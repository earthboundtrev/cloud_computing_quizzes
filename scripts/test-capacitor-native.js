#!/usr/bin/env node
/**
 * Capacitor Android guardrails (#111): no remote scripts, SW skip on native, sortable vendored.
 */
'use strict';

var fs = require('fs');
var path = require('path');

var ROOT = path.join(__dirname, '..');
var failures = [];

function test(name, fn) {
  try {
    fn();
    console.log('OK', name);
  } catch (e) {
    failures.push(name + ': ' + e.message);
    console.error('FAIL', name, e.message);
  }
}

function assert(cond, msg) {
  if (!cond) throw new Error(msg || 'assertion failed');
}

var CSP_SNIPPET =
  "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'";

var htmlFiles = fs
  .readdirSync(ROOT)
  .filter(function (f) {
    return f.endsWith('.html') && fs.statSync(path.join(ROOT, f)).isFile();
  });

test('no remote script src in HTML entry pages', function () {
  htmlFiles.forEach(function (f) {
    var src = fs.readFileSync(path.join(ROOT, f), 'utf8');
    assert(
      !/script[^>]+src\s*=\s*["']https?:\/\//i.test(src),
      f + ' still references a remote script URL'
    );
  });
});

test('index.html uses vendored SortableJS', function () {
  var index = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  assert(/vendor\/sortablejs\/Sortable\.min\.js/.test(index), 'index missing local Sortable');
});

test('sw-register.js skips registration on Capacitor native', function () {
  var reg = fs.readFileSync(path.join(ROOT, 'sw-register.js'), 'utf8');
  assert(/isNativePlatform/.test(reg), 'missing isNativePlatform check');
  assert(/CloudCramUpdate/.test(reg), 'missing native CloudCramUpdate stub');
});

test('sortable and native helpers in PRECACHE_PATHS', function () {
  var sw = fs.readFileSync(path.join(ROOT, 'sw.js'), 'utf8');
  assert(sw.indexOf("'/vendor/sortablejs/Sortable.min.js'") >= 0, 'sortable not precached');
  assert(sw.indexOf("'/capacitor-env.js'") >= 0, 'capacitor-env not precached');
});

test('meta CSP omits frame-ancestors', function () {
  htmlFiles.forEach(function (f) {
    var html = fs.readFileSync(path.join(ROOT, f), 'utf8');
    if (!html.includes('Content-Security-Policy')) return;
    assert(html.indexOf('frame-ancestors') < 0, f + ' meta CSP must not include frame-ancestors');
  });
});

test('active quiz HTML has CSP meta', function () {
  var quizConfig = fs.readFileSync(path.join(ROOT, 'quiz-config.js'), 'utf8');
  var hrefs = ['index.html'];
  var re = /href:\s*['"]([^'"]+)['"]/g;
  var m;
  while ((m = re.exec(quizConfig)) !== null) hrefs.push(m[1]);
  hrefs.forEach(function (href) {
    var file = path.join(ROOT, href);
    assert(fs.existsSync(file), href + ' missing');
    var html = fs.readFileSync(file, 'utf8');
    assert(html.indexOf(CSP_SNIPPET) >= 0, href + ' missing CSP meta');
  });
});

test('native-app.js waits for DOMContentLoaded before hiding Update app', function () {
  var src = fs.readFileSync(path.join(ROOT, 'native-app.js'), 'utf8');
  assert(/DOMContentLoaded/.test(src), 'native-app must defer DOM mutations');
});

test('lint-storage-keys.js scans native-app.js (#116)', function () {
  var lintSrc = fs.readFileSync(path.join(ROOT, 'scripts/lint-storage-keys.js'), 'utf8');
  assert(lintSrc.indexOf('native-app.js') >= 0, 'native-app.js must be in SCAN_FILES');
});

test('reminder modules are present and browser-safe', function () {
  ['push-local-settings.js', 'reminder-copy.js', 'reminder-schedule.js', 'reminder-native.js'].forEach(function (f) {
    var src = fs.readFileSync(path.join(ROOT, f), 'utf8');
    assert(fs.existsSync(path.join(ROOT, f)), f + ' missing');
    if (f === 'reminder-native.js') {
      assert(/isNativePlatform/.test(src), 'reminder-native must gate on native');
      assert(!/USE_EXACT_ALARM/.test(src), 'must not request USE_EXACT_ALARM');
    }
  });
  var quiz = fs.readFileSync(path.join(ROOT, 'az900_azure_fundamentals_quiz.html'), 'utf8');
  assert(quiz.indexOf('reminder-native.js') >= 0, 'quiz pages must load reminder-native for goal-met cancel');
});

test('native capacitor config has no server.url', function () {
  var cfgPath = path.join(ROOT, 'native', 'capacitor.config.json');
  assert(fs.existsSync(cfgPath), 'native/capacitor.config.json missing');
  var cfg = JSON.parse(fs.readFileSync(cfgPath, 'utf8'));
  assert(!cfg.server || !cfg.server.url, 'server.url must not be set (Option A)');
});

test('google-services.json is gitignored at root and native/android (#117)', function () {
  var rootGi = fs.readFileSync(path.join(ROOT, '.gitignore'), 'utf8');
  assert(
    /^\s*google-services\.json\s*$/m.test(rootGi) && !/^\s*#\s*google-services\.json/m.test(rootGi),
    'root .gitignore must list google-services.json'
  );
  var androidGi = fs.readFileSync(path.join(ROOT, 'native', 'android', '.gitignore'), 'utf8');
  assert(
    /^\s*google-services\.json\s*$/m.test(androidGi),
    'native/android/.gitignore must list google-services.json (not commented)'
  );
  var execFileSync = require('child_process').execFileSync;
  var outRoot = execFileSync('git', ['check-ignore', '-v', 'google-services.json'], {
    cwd: ROOT,
    encoding: 'utf8',
  }).trim();
  assert(outRoot.indexOf('google-services.json') >= 0, 'git check-ignore root: ' + outRoot);
  var outNative = execFileSync(
    'git',
    ['check-ignore', '-v', 'native/android/google-services.json'],
    { cwd: ROOT, encoding: 'utf8' }
  ).trim();
  assert(outNative.indexOf('google-services.json') >= 0, 'git check-ignore android: ' + outNative);
});

if (failures.length) {
  console.error('\n' + failures.length + ' failure(s)');
  process.exit(1);
}
console.log('\nAll Capacitor native checks passed.');