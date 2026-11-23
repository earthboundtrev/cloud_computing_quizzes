#!/usr/bin/env node
/**
 * Entry HTML lint: no inline on* handlers; meta CSP without frame-ancestors.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const INLINE_ON = /\s(on[a-zA-Z]+)\s*=\s*["'][^"']*["']/i;
const META_CSP =
  "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; base-uri 'self'; form-action 'self'";

const quizConfig = fs.readFileSync(path.join(ROOT, 'quiz-config.js'), 'utf8');
const entryPages = ['index.html'];
const re = /href:\s*['"]([^'"]+)['"]/g;
let m;
while ((m = re.exec(quizConfig)) !== null) entryPages.push(m[1]);

let errors = [];

entryPages.forEach((href) => {
  const file = path.join(ROOT, href);
  if (!fs.existsSync(file)) {
    errors.push(href + ': missing file');
    return;
  }
  const html = fs.readFileSync(file, 'utf8');
  const inline = html.match(INLINE_ON);
  if (inline) {
    errors.push(href + ': inline handler ' + inline[1]);
  }
  if (html.includes('frame-ancestors') && html.includes('Content-Security-Policy')) {
    errors.push(href + ': meta CSP must not include frame-ancestors');
  }
  const cspMeta = html.match(/<meta http-equiv="Content-Security-Policy" content="([^"]*)">/);
  if (cspMeta && cspMeta[1] !== META_CSP) {
    errors.push(href + ': meta CSP does not match expected policy');
  }
  if (!cspMeta) {
    errors.push(href + ': missing CSP meta tag');
  }
});

if (errors.length) {
  console.error('lint-html-entry failed:\n' + errors.map((e) => '  ' + e).join('\n'));
  process.exit(1);
}
console.log('lint-html-entry OK (' + entryPages.length + ' pages)');