#!/usr/bin/env node
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const CSP =
  "  <meta http-equiv=\"Content-Security-Policy\" content=\"default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; base-uri 'self'; form-action 'self'\">\n";

const files = fs.readdirSync(ROOT).filter(function (f) {
  return f.endsWith('.html') && fs.statSync(path.join(ROOT, f)).isFile();
});

files.forEach(function (f) {
  let s = fs.readFileSync(path.join(ROOT, f), 'utf8');
  if (!s.includes("Content-Security-Policy")) {
    s = s.replace(/(<meta name="viewport"[^>]+>\n)/, '$1' + CSP);
  }
  if (f === 'index.html') {
    s = s.replace(
      /<script src="https:\/\/cdn\.jsdelivr\.net\/npm\/sortablejs[^"]+"><\/script>\n/,
      '<script src="vendor/sortablejs/Sortable.min.js"></script>\n'
    );
    if (!s.includes('capacitor-env.js')) {
      s = s.replace(
        /(<script src="storage-write-guard\.js)/,
        '<script src="capacitor-env.js?v=1"></script>\n  $1'
      );
    }
    if (!s.includes('build-meta.js')) {
      s = s.replace(
        /(<script src="index-init\.js)/,
        '<script src="build-meta.js?v=1"></script>\n  <script src="native-app.js?v=1"></script>\n  $1'
      );
    }
  } else {
    if (!s.includes('capacitor-env.js')) {
      s = s.replace(
        /(<script src="storage-write-guard\.js)/,
        '<script src="capacitor-env.js?v=1"></script>\n  $1'
      );
    }
    if (!s.includes('native-app.js')) {
      const anchor = s.match(/<script src="app-reset\.js[^"]*"><\/script>/);
      if (anchor) {
        s = s.replace(anchor[0], '<script src="native-app.js?v=1"></script>\n  ' + anchor[0]);
      }
    }
  }
  fs.writeFileSync(path.join(ROOT, f), s);
});
console.log('Patched', files.length, 'HTML files');