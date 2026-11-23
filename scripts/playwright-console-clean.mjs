#!/usr/bin/env node
/**
 * Load every entry HTML in headless Chromium; fail on console errors or page errors.
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
  console.error('FAIL: playwright is not installed');
  process.exit(1);
}

const { chromium } = playwrightMod;

function listen(handler) {
  const server = http.createServer(handler);
  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => {
      resolve({ server, port: server.address().port });
    });
  });
}

function staticHandler(req, res) {
  const url = new URL(req.url, 'http://127.0.0.1');
  let filePath = url.pathname === '/' ? '/index.html' : url.pathname;
  const abs = path.normalize(path.join(ROOT, filePath.replace(/^\//, '')));
  if (!abs.startsWith(ROOT) || !fs.existsSync(abs) || fs.statSync(abs).isDirectory()) {
    res.writeHead(404);
    res.end('Not found');
    return;
  }
  const ext = path.extname(abs);
  const types = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.ico': 'image/x-icon'
  };
  res.writeHead(200, { 'Content-Type': types[ext] || 'application/octet-stream' });
  res.end(fs.readFileSync(abs));
}

const quizConfig = fs.readFileSync(path.join(ROOT, 'quiz-config.js'), 'utf8');
const pages = ['/index.html'];
const hrefRe = /href:\s*['"]([^'"]+)['"]/g;
let hm;
while ((hm = hrefRe.exec(quizConfig)) !== null) pages.push('/' + hm[1]);

const { port, server } = await listen(staticHandler);
const browser = await chromium.launch();

const failures = [];

for (const pagePath of pages) {
  const context = await browser.newContext();
  const page = await context.newPage();
  const issues = [];

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      issues.push('console.error: ' + msg.text());
    }
  });
  page.on('pageerror', (err) => {
    issues.push('pageerror: ' + (err && err.message ? err.message : String(err)));
  });

  try {
    await page.goto(`http://127.0.0.1:${port}${pagePath}`, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(800);
  } catch (e) {
    issues.push('navigation: ' + e.message);
  }

  await context.close();

  if (issues.length) {
    failures.push({ page: pagePath, issues });
    console.error('FAIL', pagePath);
    issues.forEach((i) => console.error('  ', i));
  } else {
    console.log('OK', pagePath);
  }
}

await browser.close();
server.close();

if (failures.length) {
  console.error('\n' + failures.length + ' page(s) had console errors');
  process.exit(1);
}
console.log('\nConsole clean: ' + pages.length + ' entry pages, zero errors');