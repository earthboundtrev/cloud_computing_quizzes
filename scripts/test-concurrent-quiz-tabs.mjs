#!/usr/bin/env node
/**
 * Playwright stress: concurrent tabs must hit exact totals (#68, #79).
 * Requires playwright (CI installs). CHROME_PATH overrides browser binary.
 * STRESS_RUNS (default 20) iterations per scenario.
 */

import fs from 'fs';
import path from 'path';
import http from 'http';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const STRESS_RUNS = Math.max(20, parseInt(process.env.STRESS_RUNS || '20', 10) || 20);
const SETTLE_MS = parseInt(process.env.SETTLE_MS || '2000', 10) || 2000;

let playwrightMod;
try {
  playwrightMod = await import('playwright');
} catch (e) {
  console.error('FAIL: playwright is not installed. Run: npx --yes playwright install chromium');
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
  filePath = filePath.split('?')[0];
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

const launchOptions = {
  args: ['--disable-dev-shm-usage', '--no-sandbox']
};
if (process.env.CHROME_PATH) {
  launchOptions.executablePath = process.env.CHROME_PATH;
}

const { port, server } = await listen(staticHandler);
const base = `http://127.0.0.1:${port}`;

let browser;
try {
  browser = await chromium.launch(launchOptions);
} catch (e) {
  server.close();
  console.error('FAIL: could not launch Chromium:', e.message || e);
  process.exit(1);
}

const GAME_SEED = {
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
};

async function startQuiz(page) {
  await page.goto(`${base}/rhce_quiz.html`, { waitUntil: 'domcontentloaded' });
  const mixed = page.locator('.mode-btn[data-mode="mixed"]');
  if (await mixed.count()) await mixed.click({ timeout: 5000 });
  await page.click('#start-btn', { timeout: 10000 });
  await page.waitForSelector('#quiz-area:not(.hidden)', { timeout: 15000 });
}

async function answerOneQuestion(page) {
  const opt = page.locator('#options .option').first();
  await opt.waitFor({ state: 'visible', timeout: 15000 });
  await opt.click({ timeout: 15000 });
  const next = page.locator('#next-btn');
  if (await next.isVisible()) await next.click({ timeout: 5000 });
}

async function answerFullQuiz(page) {
  await startQuiz(page);
  for (let i = 0; i < 40; i++) {
    await answerOneQuestion(page);
  }
  await page.waitForSelector('#results-screen:not(.hidden)', { timeout: 60000 });
}

/** Two pages open: interleaved answers stress localStorage like concurrent tabs. */
async function answerTwoQuizzesInterleaved(pageA, pageB) {
  await Promise.all([startQuiz(pageA), startQuiz(pageB)]);
  for (let i = 0; i < 40; i++) {
    await Promise.all([answerOneQuestion(pageA), answerOneQuestion(pageB)]);
  }
  await Promise.all([
    pageA.waitForSelector('#results-screen:not(.hidden)', { timeout: 60000 }),
    pageB.waitForSelector('#results-screen:not(.hidden)', { timeout: 60000 })
  ]);
}

async function answerThreeQuizzesInterleaved(pages) {
  await Promise.all(pages.map((p) => startQuiz(p)));
  for (let i = 0; i < 40; i++) {
    await Promise.all(pages.map((p) => answerOneQuestion(p)));
  }
  await Promise.all(
    pages.map((p) => p.waitForSelector('#results-screen:not(.hidden)', { timeout: 60000 }))
  );
}

async function readCountsFromFreshPage(context) {
  const verifyPage = await context.newPage();
  await verifyPage.goto(`${base}/rhce_quiz.html`, { waitUntil: 'domcontentloaded' });
  const counts = await verifyPage.evaluate(() => {
    const raw = localStorage.getItem('cloudcram_game_v1');
    const game = raw ? JSON.parse(raw) : {};
    const dedup = Object.keys(game.answerDedup || {}).length;
    const profileRaw = localStorage.getItem('study_sessions_profile_rhce');
    const profile = profileRaw ? JSON.parse(profileRaw) : {};
    let topicTotal = 0;
    if (profile.sessionAttempts) {
      Object.keys(profile.sessionAttempts).forEach((id) => {
        Object.keys(profile.sessionAttempts[id] || {}).forEach((t) => {
          topicTotal += profile.sessionAttempts[id][t].total || 0;
        });
      });
    } else {
      Object.keys(profile.topicStats || {}).forEach((t) => {
        topicTotal += profile.topicStats[t].total || 0;
      });
    }
    return { dedup, topicTotal };
  });
  await verifyPage.close();
  return counts;
}

function makeContext(browser) {
  return browser.newContext().then(async (context) => {
    await context.addInitScript((seed) => {
      try {
        const raw = localStorage.getItem('cloudcram_game_v1');
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed && parsed.firstRunDone) return;
        }
      } catch (e) {}
      localStorage.setItem('cloudcram_game_v1', JSON.stringify(seed));
    }, GAME_SEED);
    return context;
  });
}

const stats = {
  twoTab: { pass: 0, runs: STRESS_RUNS },
  threeTab: { pass: 0, runs: STRESS_RUNS },
  legacyTwoTab: { pass: 0, runs: STRESS_RUNS }
};

try {
  for (let run = 0; run < STRESS_RUNS; run++) {
    const context = await makeContext(browser);
    const pageA = await context.newPage();
    const pageB = await context.newPage();
    await answerTwoQuizzesInterleaved(pageA, pageB);
    await new Promise((r) => setTimeout(r, SETTLE_MS));
    await pageA.evaluate(() => {
      if (window.CloudCramGame && window.CloudCramGame.flushPendingGameWrites) {
        return window.CloudCramGame.flushPendingGameWrites();
      }
      return null;
    });
    await pageA.waitForFunction(
      () => {
        try {
          const raw = localStorage.getItem('study_sessions_profile_rhce');
          if (!raw) return false;
          const p = JSON.parse(raw);
          if (p.sessionAttempts && Object.keys(p.sessionAttempts).length >= 1) return true;
          let total = 0;
          Object.keys(p.topicStats || {}).forEach((t) => {
            total += p.topicStats[t].total || 0;
          });
          return total >= 40;
        } catch (e) {
          return false;
        }
      },
      { timeout: 60000 }
    );
    const counts = await readCountsFromFreshPage(context);
    await context.close();
    if (counts.dedup !== 80 || counts.topicTotal !== 80) {
      console.error('FAIL 2-tab run', run, 'dedup', counts.dedup, 'profile', counts.topicTotal);
      process.exit(1);
    }
    stats.twoTab.pass++;
  }

  for (let run = 0; run < STRESS_RUNS; run++) {
    const context = await makeContext(browser);
    const seedPage = await context.newPage();
    await seedPage.goto(`${base}/rhce_quiz.html`, { waitUntil: 'domcontentloaded' });
    await seedPage.evaluate(() => {
      localStorage.setItem(
        'study_sessions_profile_rhce',
        JSON.stringify({
          quizId: 'rhce',
          topicStats: { Linux: { correct: 14, total: 14 } },
          topicMissesFromImports: { Net: 2 }
        })
      );
    });
    await seedPage.close();
    const pageA = await context.newPage();
    const pageB = await context.newPage();
    await answerTwoQuizzesInterleaved(pageA, pageB);
    await new Promise((r) => setTimeout(r, SETTLE_MS));
    await pageA.evaluate(() => {
      if (window.CloudCramGame && window.CloudCramGame.flushPendingGameWrites) {
        return window.CloudCramGame.flushPendingGameWrites();
      }
      return null;
    });
    await pageA.waitForFunction(
      () => {
        try {
          const raw = localStorage.getItem('study_sessions_profile_rhce');
          if (!raw) return false;
          const p = JSON.parse(raw);
          if (p.sessionAttempts && Object.keys(p.sessionAttempts).length >= 1) return true;
          let total = 0;
          Object.keys(p.topicStats || {}).forEach((t) => {
            total += p.topicStats[t].total || 0;
          });
          return total >= 40;
        } catch (e) {
          return false;
        }
      },
      { timeout: 60000 }
    );
    const counts = await readCountsFromFreshPage(context);
    await context.close();
    if (counts.dedup !== 80 || counts.topicTotal !== 94) {
      console.error('FAIL legacy 2-tab run', run, 'dedup', counts.dedup, 'profile', counts.topicTotal);
      process.exit(1);
    }
    stats.legacyTwoTab.pass++;
  }

  for (let run = 0; run < STRESS_RUNS; run++) {
    const context = await makeContext(browser);
    const pages = [await context.newPage(), await context.newPage(), await context.newPage()];
    await answerThreeQuizzesInterleaved(pages);
    await new Promise((r) => setTimeout(r, SETTLE_MS * 2));
    await pages[0].evaluate(() => {
      if (window.CloudCramGame && window.CloudCramGame.flushPendingGameWrites) {
        return window.CloudCramGame.flushPendingGameWrites();
      }
      return null;
    });
    await new Promise((r) => setTimeout(r, 500));
    const counts = await readCountsFromFreshPage(context);
    await context.close();
    if (counts.dedup !== 120 || counts.topicTotal !== 120) {
      console.error('FAIL 3-tab run', run, 'dedup', counts.dedup, 'profile', counts.topicTotal);
      process.exit(1);
    }
    stats.threeTab.pass++;
  }

  await browser.close();
  server.close();
  console.log(
    'OK playwright stress:',
    '2-tab',
    stats.twoTab.pass + '/' + stats.twoTab.runs,
    'legacy',
    stats.legacyTwoTab.pass + '/' + stats.legacyTwoTab.runs,
    '3-tab',
    stats.threeTab.pass + '/' + stats.threeTab.runs
  );
  process.exit(0);
} catch (err) {
  try {
    await browser.close();
  } catch (e) {}
  server.close();
  console.error('FAIL:', err.message || err);
  process.exit(1);
}
