#!/usr/bin/env node
/**
 * Offline first visit (#30): fresh context, index only online, then each quiz page offline.
 * Skips if playwright is not installed (same pattern as other Playwright scripts in CI).
 */

import fs from 'fs';
import path from 'path';
import http from 'http';
import vm from 'vm';
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

function loadQuizConfig() {
  const sandbox = { window: {}, console };
  sandbox.window = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'quiz-config.js'), 'utf8'), sandbox, {
    filename: 'quiz-config.js',
  });
  const entries = sandbox.window.QUIZ_CONFIG || [];
  if (!entries.length) {
    throw new Error('Could not parse QUIZ_CONFIG');
  }
  return entries;
}

function expectedPoolFromDesc(desc) {
  const exact = desc.match(/(\d+)\s*Q/);
  if (exact) return parseInt(exact[1], 10);
  return null;
}

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
    '.ico': 'image/x-icon',
  };
  res.writeHead(200, { 'Content-Type': types[ext] || 'application/octet-stream' });
  res.end(fs.readFileSync(abs));
}

const quizzes = loadQuizConfig();
const { port, server } = await listen(staticHandler);
const baseUrl = 'http://127.0.0.1:' + port;
const browser = await chromium.launch({ headless: true });

let failed = 0;

for (const quiz of quizzes) {
  const context = await browser.newContext();
  const page = await context.newPage();
  const failedReqs = [];
  page.on('requestfailed', (req) => {
    const u = req.url();
    if (u.startsWith(baseUrl)) failedReqs.push(u);
  });

  try {
    await page.goto(baseUrl + '/index.html', { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForFunction(
      () => navigator.serviceWorker && navigator.serviceWorker.controller != null,
      null,
      { timeout: 45000 }
    );
    await page.waitForFunction(async () => {
      const keys = await caches.keys();
      return keys.some((k) => k.startsWith('cloudcram-v'));
    }, null, { timeout: 45000 });

    await context.setOffline(true);
    failedReqs.length = 0;

    await page.goto(baseUrl + '/' + quiz.href, { waitUntil: 'networkidle', timeout: 60000 });

    if (failedReqs.length) {
      throw new Error('failed requests offline: ' + failedReqs.slice(0, 5).join(', '));
    }

    const h1 = await page.locator('h1').first().innerText();
    if (!h1 || h1.trim() === 'Study Sessions') {
      throw new Error('got index fallback instead of quiz (h1=' + JSON.stringify(h1) + ')');
    }
    const titleOk = quiz.name
      .replace(/&amp;/g, '&')
      .split(/[\s(,]+/)
      .filter((w) => w.length > 3)
      .some((w) => h1.includes(w));
    if (!titleOk) {
      throw new Error('h1 does not look like quiz page: ' + h1 + ' (id=' + quiz.id + ')');
    }

    const startVisible = await page.locator('#start-btn').isVisible();
    if (!startVisible) {
      throw new Error('#start-btn not visible');
    }

    const engineOk = await page.evaluate(() => typeof window.QuizEngine !== 'undefined');
    if (!engineOk) {
      throw new Error('QuizEngine missing after offline load');
    }

    if (quiz.id === 'rhcsa10') {
      const pool = await page.evaluate(() => {
        const bank = (window.QUESTION_BANK_RHCSA10 || [])
          .concat(window.QUESTION_BANK_RHCSA10_EXTRA || [])
          .concat(window.QUESTION_BANK_RHCSA10_GAP || []);
        const ids = bank.map((q) => String(q.id));
        return { size: ids.length, unique: new Set(ids).size };
      });
      const expected = expectedPoolFromDesc(quiz.desc) || 293;
      if (pool.unique !== expected || pool.unique !== pool.size) {
        throw new Error(
          'rhcsa10 bank expected ' + expected + ' unique ids, got ' + pool.unique + '/' + pool.size
        );
      }
    }

    console.log('OK offline first visit: ' + quiz.id + ' (' + quiz.href + ')');
  } catch (err) {
    failed++;
    console.error('FAIL offline first visit: ' + quiz.id + ': ' + err.message);
  } finally {
    await context.close();
  }
}

await browser.close();
server.close();

if (failed) {
  console.error('\n' + failed + ' offline first-visit test(s) failed.');
  process.exit(1);
}
console.log('\nAll offline first-visit tests passed (' + quizzes.length + ' quizzes).');