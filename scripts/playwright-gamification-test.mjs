#!/usr/bin/env node
/**
 * Playwright gamification scenarios (#68). Skips if playwright is not installed.
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
const browser = await chromium.launch();

async function withPage(seedFn, fn) {
  const context = await browser.newContext({ timezoneId: 'America/New_York' });
  await context.addInitScript(seedFn);
  const page = await context.newPage();
  try {
    await fn(page);
  } finally {
    await context.close();
  }
}

await withPage(
  () => {
    localStorage.setItem(
      'cloudcram_game_v1',
      JSON.stringify({
        v: 1,
        dailyGoal: 3,
        pendingGoal: null,
        soundOn: true,
        firstRunDone: true,
        streak: 5,
        best: 5,
        freezes: 1,
        lastSeenDate: '2026-11-01',
        freezeEarnProgress: 0,
        dayRecords: { '2026-11-01': { answers: 3, met: true, celebrated: true, streakAwarded: true, kind: 'normal' } },
        answerDedup: {},
        repair: null,
        vacation: null,
        notices: {},
        migratedFrom: 'study_streak_v0',
        migratedAt: 1,
        lastProcessedDate: '2026-11-01',
        maxTimestampSeen: 0,
        repairUses: [],
        vacationUses: [],
        hadStreakBreak: false,
        lastProcessWallMs: 0
      })
    );
  },
  async (page) => {
    await page.goto(`http://127.0.0.1:${port}/index.html`);
    await page.waitForSelector('#game-launcher .game-goal-ring');
    const label = await page.locator('.game-goal-ring').getAttribute('aria-label');
    if (!label || label.indexOf('Daily goal') < 0) throw new Error('goal ring aria-label');
    const chip = await page.locator('.game-streak-chip').textContent();
    if (!chip || chip.indexOf('5') < 0) throw new Error('streak chip');
    console.log('✓ migration + launcher');
  }
);

await withPage(
  () => {
    localStorage.setItem(
      'cloudcram_study_streak',
      '12'
    );
    localStorage.setItem('cloudcram_study_last_date', '2026-11-02');
  },
  async (page) => {
    await page.goto(`http://127.0.0.1:${port}/index.html`);
    await page.waitForSelector('.game-streak-chip');
    const chip = await page.locator('.game-streak-chip').textContent();
    if (!chip || chip.indexOf('12') < 0) throw new Error('expected migrated streak 12');
    console.log('✓ legacy migration on load');
  }
);

await withPage(
  () => {
    if (sessionStorage.getItem('cloudcram_first_run_a11y_seeded')) return;
    sessionStorage.setItem('cloudcram_first_run_a11y_seeded', '1');
    localStorage.removeItem('cloudcram_game_v1');
    localStorage.removeItem('cloudcram_game_v1_corrupt');
    localStorage.removeItem('cloudcram_study_streak');
    localStorage.removeItem('cloudcram_study_last_date');
  },
  async (page) => {
    await page.goto(`http://127.0.0.1:${port}/index.html`);
    await page.waitForSelector('.game-first-run-dialog');
    const dialogRole = await page.locator('.game-first-run-dialog').getAttribute('role');
    if (dialogRole !== 'dialog') throw new Error('dialog role on panel');
    const initialFocus = await page.evaluate(() => {
      const el = document.activeElement;
      return el && el.getAttribute('role') === 'radio' ? el.textContent : '';
    });
    if (initialFocus !== '3') throw new Error('expected focus on first goal, got ' + initialFocus);
    const checked = await page.locator('.game-goal-choices [role="radio"][aria-checked="true"]').textContent();
    if (checked !== '3') throw new Error('default selected goal');
    await page.locator('.game-first-run-actions button:last-child').focus();
    await page.keyboard.press('Tab');
    const afterTab = await page.evaluate(() => document.activeElement && document.activeElement.textContent);
    if (afterTab !== '3') throw new Error('Tab should wrap to first goal, got ' + afterTab);
    await page.locator('.game-goal-choices [role="radio"]').first().focus();
    await page.keyboard.press('Shift+Tab');
    const afterShiftTab = await page.evaluate(() => document.activeElement && document.activeElement.textContent);
    if (afterShiftTab !== 'Skip') throw new Error('Shift+Tab should wrap to Skip, got ' + afterShiftTab);
    await page.keyboard.press('Escape');
    await page.waitForSelector('.game-first-run-overlay', { state: 'detached' });
    const stored = await page.evaluate(() => JSON.parse(localStorage.getItem('cloudcram_game_v1') || '{}'));
    if (!stored.firstRunDone) throw new Error('Esc should complete first run');
    if (stored.dailyGoal !== 3) throw new Error('Esc should save default goal 3');
    const focusTarget = await page.evaluate(() => {
      const el = document.activeElement;
      return el ? el.className || el.tagName : '';
    });
    if (focusTarget.indexOf('game-start-btn') < 0) throw new Error('focus should return to launcher Start');
    await page.reload();
    await page.waitForSelector('#game-launcher .game-start-btn');
    if (await page.locator('.game-first-run-overlay').count()) throw new Error('picker should not reappear');
    console.log('✓ first-run picker a11y (#86)');
  }
);

await browser.close();
server.close();
console.log('Playwright gamification checks passed.');
process.exit(0);
