#!/usr/bin/env node

/**
 * Manual Playwright two-version service worker test (not run in CI).
 *
 * Usage: node scripts/playwright-sw-two-version-test.mjs
 * Requires: playwright (optional — skips if not installed)
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
  console.log('Skip: playwright is not installed. Install with: npm i -D playwright');
  process.exit(0);
}

const { chromium } = playwrightMod;

function makeHandler(getSwText) {
  return function (req, res) {
    const url = new URL(req.url, 'http://127.0.0.1');
    let filePath = url.pathname === '/' ? '/index.html' : url.pathname;
    if (filePath === '/sw.js') {
      res.writeHead(200, { 'Content-Type': 'application/javascript', 'Cache-Control': 'no-store' });
      res.end(getSwText());
      return;
    }
    const rel = filePath.replace(/^\//, '');
    const abs = path.normalize(path.join(ROOT, rel));
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
  };
}

function listen(handler) {
  const server = http.createServer(handler);
  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => {
      const port = server.address().port;
      resolve({ server, baseUrl: 'http://127.0.0.1:' + port });
    });
  });
}

const baseSw = fs.readFileSync(path.join(ROOT, 'sw.js'), 'utf8');
const swA = baseSw.replace(/const CACHE_NAME = '[^']+'/, "const CACHE_NAME = 'cloudcram-playwright-a'");
const swB = baseSw.replace(/const CACHE_NAME = '[^']+'/, "const CACHE_NAME = 'cloudcram-playwright-b'");

let swVersion = 'A';
const { server, baseUrl } = await listen(makeHandler(function () {
  return swVersion === 'A' ? swA : swB;
}));

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext();
const page = await context.newPage();

try {
  await page.goto(baseUrl + '/index.html', { waitUntil: 'networkidle' });
  await page.evaluate(() => {
    localStorage.setItem('study_sessions_profile_test_sw', JSON.stringify({ quizId: 'test_sw', topicStats: { Demo: { correct: 1, total: 2 } } }));
  });
  const profileBefore = await page.evaluate(() => localStorage.getItem('study_sessions_profile_test_sw'));
  await page.waitForFunction(() => navigator.serviceWorker.controller != null, null, { timeout: 20000 });

  swVersion = 'B';
  await page.evaluate(async () => {
    const reg = await navigator.serviceWorker.getRegistration('/');
    if (reg) await reg.update();
  });
  await page.waitForSelector('#app-update-banner', { timeout: 25000 });

  const reloadPromise = page.waitForNavigation({ waitUntil: 'networkidle' });
  await page.click('.app-update-banner-reload');
  await reloadPromise;

  await page.waitForFunction(() => navigator.serviceWorker.controller != null, null, { timeout: 20000 });
  const cacheNames = await page.evaluate(async () => {
    return (await caches.keys()).sort();
  });
  if (!cacheNames.some((n) => n.includes('playwright-b'))) {
    throw new Error('Expected playwright-b cache after reload, got: ' + cacheNames.join(', '));
  }

  const profileAfter = await page.evaluate(() => localStorage.getItem('study_sessions_profile_test_sw'));
  if (profileAfter !== profileBefore) {
    throw new Error('localStorage profile changed after SW update reload');
  }

  console.log('OK: banner → Reload → new cache; localStorage unchanged');
} catch (err) {
  console.error('Playwright SW two-version test failed:', err.message);
  process.exitCode = 1;
} finally {
  await browser.close();
  server.close();
}
