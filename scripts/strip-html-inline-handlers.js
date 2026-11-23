#!/usr/bin/env node
/**
 * Remove inline event handler attributes from entry HTML (CSP script-src 'self').
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const META_CSP =
  "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; base-uri 'self'; form-action 'self'";

const files = fs.readdirSync(ROOT).filter((f) => f.endsWith('.html') && fs.statSync(path.join(ROOT, f)).isFile());

files.forEach((f) => {
  let s = fs.readFileSync(path.join(ROOT, f), 'utf8');
  s = s.replace(/\s+on[a-zA-Z]+\s*=\s*"[^"]*"/g, '');
  s = s.replace(/\s+on[a-zA-Z]+\s*=\s*'[^']*'/g, '');
  if (s.includes('Content-Security-Policy')) {
    s = s.replace(
      /<meta http-equiv="Content-Security-Policy" content="[^"]*">/,
      '<meta http-equiv="Content-Security-Policy" content="' + META_CSP + '">'
    );
  }
  fs.writeFileSync(path.join(ROOT, f), s);
});

console.log('Stripped inline handlers + normalized meta CSP on', files.length, 'HTML files');