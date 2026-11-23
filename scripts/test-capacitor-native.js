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

test('native capacitor config has no server.url', function () {
  var cfgPath = path.join(ROOT, 'native', 'capacitor.config.json');
  assert(fs.existsSync(cfgPath), 'native/capacitor.config.json missing');
  var cfg = JSON.parse(fs.readFileSync(cfgPath, 'utf8'));
  assert(!cfg.server || !cfg.server.url, 'server.url must not be set (Option A)');
});

if (failures.length) {
  console.error('\n' + failures.length + ' failure(s)');
  process.exit(1);
}
console.log('\nAll Capacitor native checks passed.');