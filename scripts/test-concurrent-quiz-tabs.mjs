#!/usr/bin/env node
/**
 * Playwright: two tabs answer concurrently; counts must reach 80 (#68, #79).
 * Skips when playwright is not installed.
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
  const types = { '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css' };
  res.writeHead(200, { 'Content-Type': types[ext] || 'application/octet-stream' });
  res.end(fs.readFileSync(abs));
}

const { port, server } = await listen(staticHandler);
const base = `http://127.0.0.1:${port}`;

const browser = await chromium.launch();

async function answerFullQuiz(page) {
  await page.goto(`${base}/rhce_quiz.html`, { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => {
    localStorage.setItem(
      'cloudcram_game_v1',
      JSON.stringify({
        v: 1,
        dailyGoal: 3,
        pendingGoal: null,
        soundOn: false,
        firstRunDone: true,
        streak: 0,
        best: 0,
        freezes: 0,
        lastSeenDate: '2026-11-02',
        lastProcessedDate: '2026-11-02',
        freezeEarnProgress: 0,
        dayRecords: {},
        answerDedup: {},
        repair: null,
        vacation: null,
        notices: {},
        settingsRevision: { soundOn: 0, goal: 0 },
        maxTimestampSeen: 0
      })
    );
  });
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.click('#start-btn');
  const total = await page.evaluate(() => {
    return document.querySelectorAll('#options .option-btn, #options .multi-check-wrap input').length > 0
      ? 40
      : 40;
  });
  void total;
  for (let i = 0; i < 40; i++) {
    const opt = page.locator('#options .option-btn').first();
    await opt.waitFor({ state: 'visible', timeout: 15000 });
    await opt.click();
    const next = page.locator('#next-btn');
    if (await next.isVisible()) await next.click();
  }
  await page.waitForSelector('#results-screen:not(.hidden)', { timeout: 60000 });
}

const context = await browser.newContext();
const pageA = await context.newPage();
const pageB = await context.newPage();

await Promise.all([answerFullQuiz(pageA), answerFullQuiz(pageB)]);

await new Promise((r) => setTimeout(r, 2000));

const verifyPage = await context.newPage();
await verifyPage.goto(`${base}/rhce_quiz.html`, { waitUntil: 'domcontentloaded' });
const counts = await verifyPage.evaluate(() => {
  const raw = localStorage.getItem('cloudcram_game_v1');
  const game = raw ? JSON.parse(raw) : {};
  const dedup = Object.keys(game.answerDedup || {}).length;
  const profileRaw = localStorage.getItem('study_sessions_profile_rhce');
  const profile = profileRaw ? JSON.parse(profileRaw) : {};
  let topicTotal = 0;
  Object.keys(profile.topicStats || {}).forEach((t) => {
    topicTotal += profile.topicStats[t].total || 0;
  });
  if (profile.sessionAttempts) {
    topicTotal = 0;
    Object.keys(profile.sessionAttempts).forEach((id) => {
      Object.keys(profile.sessionAttempts[id] || {}).forEach((t) => {
        topicTotal += profile.sessionAttempts[id][t].total || 0;
      });
    });
  }
  return { dedup, topicTotal };
});

await browser.close();
server.close();

if (counts.dedup < 80) {
  console.error('FAIL: answer dedup', counts.dedup, 'expected >= 80');
  process.exit(1);
}
if (counts.topicTotal < 80) {
  console.error('FAIL: profile question total', counts.topicTotal, 'expected >= 80');
  process.exit(1);
}
console.log('OK concurrent quiz tabs: dedup', counts.dedup, 'profile totals', counts.topicTotal);
