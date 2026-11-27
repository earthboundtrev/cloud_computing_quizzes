#!/usr/bin/env node
/**
 * Browser checks for rich-text rendering at 375px (#37).
 */

import fs from 'fs';
import path from 'path';
import http from 'http';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

let playwrightMod;
try {
  playwrightMod = await import('playwright');
} catch (e) {
  console.log('Skip: playwright is not installed.');
  process.exit(0);
}

const { chromium } = playwrightMod;

function staticHandler(req, res) {
  const url = new URL(req.url, 'http://127.0.0.1');
  let filePath = url.pathname === '/' ? '/index.html' : url.pathname;
  const abs = path.normalize(path.join(ROOT, filePath.replace(/^\//, '')));
  const fixture = path.join(__dirname, 'fixtures', 'rich-text-browser.html');
  if (url.pathname === '/scripts/fixtures/rich-text-browser.html') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(fs.readFileSync(fixture));
    return;
  }
  if (!abs.startsWith(ROOT) || !fs.existsSync(abs) || fs.statSync(abs).isDirectory()) {
    res.writeHead(404);
    res.end('Not found');
    return;
  }
  const ext = path.extname(abs);
  const types = { '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css' };
  res.writeHead(200, { 'Content-Type': types[ext] || 'application/octet-stream' });
  res.end(fs.readFileSync(abs));
}

const server = http.createServer(staticHandler);
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const port = server.address().port;

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 375, height: 812 } });
const page = await context.newPage();

await page.goto(`http://127.0.0.1:${port}/scripts/fixtures/rich-text-browser.html`, {
  waitUntil: 'networkidle',
});

async function assertPreCode(selector) {
  const code = page.locator(selector + ' pre > code');
  await code.waitFor({ state: 'attached' });
  const text = await code.innerText();
  if (text.includes('&lt;')) {
    throw new Error(selector + ' code text contains literal &lt;');
  }
  if (!text.includes('Persistent=true') && selector === '#question-text') {
    throw new Error('stem code missing Persistent=true');
  }
}

await assertPreCode('#question-text');
await assertPreCode('#option-fixture');
await assertPreCode('#explain-fixture');

const overflow = await page.evaluate(() => ({
  sw: document.body.scrollWidth,
  cw: document.body.clientWidth,
}));
if (overflow.sw > overflow.cw) {
  throw new Error(`body overflow at 375px: scrollWidth=${overflow.sw} clientWidth=${overflow.cw}`);
}

const disallowedHtml = await page.locator('#disallowed-fixture').innerHTML();
if (disallowedHtml.toLowerCase().includes('<b>')) {
  throw new Error('disallowed fixture should not create <b> element');
}
const disallowedText = await page.locator('#disallowed-fixture').innerText();
if (!disallowedText.includes('<b>')) {
  throw new Error('disallowed fixture should show <b> as text');
}

await context.close();
await browser.close();
server.close();

console.log('✓ playwright rich-text browser checks passed');