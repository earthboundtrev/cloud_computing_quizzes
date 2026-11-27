#!/usr/bin/env node
/**
 * Launcher reorder under Netlify-style CSP (#1): Sortable self-hosted, drag + keyboard + reset.
 */
import fs from 'fs';
import path from 'path';
import http from 'http';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

const NETLIFY_CSP =
  "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'";

let playwrightMod;
try {
  playwrightMod = await import('playwright');
} catch (e) {
  console.log('Skip: playwright is not installed.');
  process.exit(0);
}

const { chromium } = playwrightMod;

async function dismissFirstRunIfShown(page) {
  const overlay = page.locator('.game-first-run-overlay');
  if (await overlay.count()) {
    await page.locator('.game-first-run-actions button:last-child').click();
    await overlay.waitFor({ state: 'detached', timeout: 10000 });
  }
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
  };
  const headers = { 'Content-Type': types[ext] || 'application/octet-stream' };
  if (ext === '.html' || filePath.endsWith('.html')) {
    headers['Content-Security-Policy'] = NETLIFY_CSP;
  }
  res.writeHead(200, headers);
  res.end(fs.readFileSync(abs));
}

const { port, server } = await listen(staticHandler);
const browser = await chromium.launch();

function itemIds(page) {
  return page.$$eval('.quiz-card-item', (nodes) => nodes.map((n) => n.getAttribute('data-id')));
}

async function withCspPage(seedFn, bodyFn) {
  const context = await browser.newContext({ viewport: { width: 375, height: 800 } });
  await context.addInitScript(() => {
    window.__cspViolations = [];
    document.addEventListener('securitypolicyviolation', (e) => {
      window.__cspViolations.push(e.violatedDirective || e.effectiveDirective);
    });
  });
  await context.addInitScript(() => {
    const fmt = (dt) => dt.toLocaleDateString('en-CA', { timeZone: 'America/New_York' });
    const today = fmt(new Date());
    localStorage.setItem(
      'cloudcram_game_v1',
      JSON.stringify({
        v: 1,
        dailyGoal: 3,
        pendingGoal: null,
        soundOn: true,
        firstRunDone: true,
        streak: 0,
        best: 0,
        freezes: 0,
        lastSeenDate: today,
        freezeEarnProgress: 0,
        dayRecords: {},
        answerDedup: {},
        repair: null,
        vacation: null,
        notices: {},
        lastProcessedDate: today,
        maxTimestampSeen: 0,
        repairUses: [],
        vacationUses: [],
        hadStreakBreak: false,
        lastProcessWallMs: Date.now(),
        migratedFrom: 'study_streak_v0',
        migratedAt: 1,
      })
    );
  });
  if (seedFn) await context.addInitScript(seedFn);
  const page = await context.newPage();
  await page.route('**/*', async (route) => {
    const req = route.request();
    if (req.resourceType() === 'document') {
      const response = await route.fetch();
      const headers = { ...response.headers(), 'content-security-policy': NETLIFY_CSP };
      await route.fulfill({ response, headers });
    } else {
      await route.continue();
    }
  });
  try {
    await bodyFn(page);
  } finally {
    await context.close();
  }
}

await withCspPage(
  () => {
    localStorage.setItem('quiz_reorder_hint_dismissed', 'true');
    if (sessionStorage.getItem('launcher_reorder_drag_seeded') !== '1') {
      localStorage.removeItem('quizOrder');
      sessionStorage.setItem('launcher_reorder_drag_seeded', '1');
    }
  },
  async (page) => {
    await page.goto(`http://127.0.0.1:${port}/index.html`, { waitUntil: 'networkidle' });
    await dismissFirstRunIfShown(page);
    await page.waitForSelector('#quiz-sortable-list .quiz-card-item');
    const violations = await page.evaluate(() => window.__cspViolations || []);
    if (violations.length) {
      throw new Error('CSP violations: ' + violations.join(', '));
    }
    const sortableType = await page.evaluate(() => typeof Sortable);
    if (sortableType !== 'function') {
      throw new Error('Sortable not loaded, got ' + sortableType);
    }
    const before = await itemIds(page);
    if (before.length < 2) throw new Error('need at least 2 quizzes');
    const firstId = before[0];
    const secondId = before[1];
    const handle = page.locator('.quiz-card-item').first().locator('.drag-handle');
    const target = page.locator('.quiz-card-item').nth(1);
    await handle.dragTo(target);
    await page.waitForTimeout(400);
    const afterDrag = await itemIds(page);
    if (afterDrag[0] !== secondId || afterDrag[1] !== firstId) {
      throw new Error('drag did not swap first two tiles: ' + afterDrag.join(','));
    }
    const stored = await page.evaluate(() => localStorage.getItem('quizOrder'));
    const order = stored ? JSON.parse(stored) : [];
    if (order[0] !== secondId || order[1] !== firstId) {
      throw new Error('quizOrder not persisted after drag: ' + order.slice(0, 3).join(','));
    }
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForSelector('#quiz-sortable-list .quiz-card-item');
    const afterReload = await itemIds(page);
    if (afterReload[0] !== secondId || afterReload[1] !== firstId) {
      throw new Error('order not kept after reload');
    }
    console.log('✓ CSP clean, Sortable loaded, drag persists');
  }
);

await withCspPage(
  () => {
    localStorage.removeItem('quizOrder');
    localStorage.setItem('quiz_reorder_hint_dismissed', 'true');
  },
  async (page) => {
    await page.goto(`http://127.0.0.1:${port}/index.html`, { waitUntil: 'networkidle' });
    await dismissFirstRunIfShown(page);
    await page.waitForSelector('#quiz-sortable-list .quiz-card-item');
    const before = await itemIds(page);
    const handle = page.locator('.quiz-card-item').first().locator('.drag-handle');
    await handle.focus();
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(200);
    const after = await itemIds(page);
    if (after[0] === before[0] || after[1] !== before[0]) {
      throw new Error('keyboard move down failed');
    }
    const live = await page.locator('#quiz-reorder-live').textContent();
    if (!live || live.indexOf('moved to position') < 0) {
      throw new Error('aria-live announcement missing after keyboard move');
    }
    const focused = await page.evaluate(() =>
      document.activeElement && document.activeElement.classList.contains('drag-handle')
    );
    if (!focused) throw new Error('focus not on handle after keyboard move');
    console.log('✓ keyboard reorder + live region');
  }
);

await withCspPage(
  () => {
    localStorage.setItem('quiz_reorder_hint_dismissed', 'true');
  },
  async (page) => {
    await page.goto(`http://127.0.0.1:${port}/index.html`, { waitUntil: 'networkidle' });
    await dismissFirstRunIfShown(page);
    await page.evaluate(() => {
      localStorage.setItem('quizOrder', JSON.stringify(['cissp', 'oci']));
    });
    await page.reload({ waitUntil: 'networkidle' });
    await dismissFirstRunIfShown(page);
    await page.waitForSelector('#quiz-reset-order-btn');
    let ids = await itemIds(page);
    if (ids[0] !== 'cissp' || ids[1] !== 'oci') throw new Error('saved order not honored');
    await page.click('#quiz-reset-order-btn');
    await page.waitForTimeout(200);
    ids = await itemIds(page);
    const defaultFirst = await page.evaluate(() => window.QUIZ_CONFIG[0].id);
    if (ids[0] !== defaultFirst) throw new Error('reset did not restore default order');
    const stored = await page.evaluate(() => localStorage.getItem('quizOrder'));
    if (stored !== null) throw new Error('quizOrder should be cleared after reset');
    console.log('✓ reset order and saved order honored');
  }
);

await withCspPage(
  () => {
    localStorage.removeItem('quizOrder');
    localStorage.removeItem('quiz_reorder_hint_dismissed');
  },
  async (page) => {
    await page.setViewportSize({ width: 320, height: 700 });
    await page.goto(`http://127.0.0.1:${port}/index.html`, { waitUntil: 'networkidle' });
    await dismissFirstRunIfShown(page);
    const hint = page.locator('.quiz-reorder-hint');
    if (!(await hint.count())) throw new Error('reorder hint missing on first visit');
    await page.click('.quiz-reorder-hint-dismiss');
    await page.waitForTimeout(100);
    if (await page.locator('.quiz-reorder-hint').count()) throw new Error('hint not dismissed');
    const dismissed = await page.evaluate(() => localStorage.getItem('quiz_reorder_hint_dismissed'));
    if (dismissed !== 'true') throw new Error('hint dismiss flag not saved');
    await page.waitForSelector('#quiz-sortable-list .quiz-card-item');
    const overflow = await page.evaluate(() => {
      const w = document.documentElement.scrollWidth;
      const c = document.documentElement.clientWidth;
      return w > c + 1;
    });
    if (overflow) throw new Error('horizontal overflow at 320px width');
    console.log('✓ one-time hint dismiss, no overflow at 320px');
  }
);

await browser.close();
server.close();
console.log('Launcher reorder Playwright: all checks passed');