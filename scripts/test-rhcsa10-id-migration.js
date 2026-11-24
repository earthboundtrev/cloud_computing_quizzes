#!/usr/bin/env node
/**
 * Regression: rhcsa10 question id gamification remap (#31).
 */
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

class LocalStorageMock {
  constructor() {
    this.store = {};
  }
  getItem(k) {
    return this.store[k] || null;
  }
  setItem(k, v) {
    this.store[k] = String(v);
  }
}

function loadMap() {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync('data/rhcsa10-question-id-map.js', 'utf8'), sandbox);
  return sandbox.window.RHCSA10_QUESTION_ID_MAP;
}

function runMigration(ls) {
  const migJs = fs.readFileSync('rhcsa10-question-id-migration.js', 'utf8');
  const win = { RHCSA10_QUESTION_ID_MAP: loadMap() };
  const fn = new Function('localStorage', 'window', 'console', migJs);
  fn(ls, win, { log: () => {}, warn: () => {}, error: () => {} });
}

function testRemapNumericAndStringIds() {
  const ls = new LocalStorageMock();
  const map = loadMap();
  const oldNum = '129';
  const oldStr = 'rhcsa10-gap-001';
  if (!map.forward[oldNum] || !map.forward[oldStr]) {
    throw new Error('fixture ids missing from map');
  }
  var dedup = {};
  dedup['2026-11-24:sess1:' + oldNum] = true;
  dedup['2026-11-24:sess2:' + oldStr] = true;
  dedup['2026-11-24:sess3:other-quiz-1'] = true;
  ls.setItem('cloudcram_game_v1', JSON.stringify({ v: 1, answerDedup: dedup }));
  runMigration(ls);
  const game = JSON.parse(ls.getItem('cloudcram_game_v1'));
  const d = game.answerDedup;
  if (!d['2026-11-24:sess1:' + map.forward[oldNum]]) {
    throw new Error('numeric id not remapped');
  }
  if (!d['2026-11-24:sess2:' + map.forward[oldStr]]) {
    throw new Error('string id not remapped');
  }
  if (!d['2026-11-24:sess3:other-quiz-1']) {
    throw new Error('unrelated id should stay');
  }
  if (d['2026-11-24:sess1:' + oldNum]) {
    throw new Error('old numeric key should be removed');
  }
  if (ls.getItem('rhcsa10_question_ids_v1') !== 'true') {
    throw new Error('migration flag not set');
  }
}

function testIdempotent() {
  const ls = new LocalStorageMock();
  ls.setItem(
    'cloudcram_game_v1',
    JSON.stringify({ v: 1, answerDedup: { '2026-11-24:sess1:rhcsa10-0001': true } })
  );
  runMigration(ls);
  const first = ls.getItem('cloudcram_game_v1');
  runMigration(ls);
  if (ls.getItem('cloudcram_game_v1') !== first) {
    throw new Error('second run should not change state');
  }
}

let ok = 0;
let fail = 0;
[{ name: 'remap numeric and string ids', fn: testRemapNumericAndStringIds }, { name: 'idempotent', fn: testIdempotent }].forEach(
  function (t) {
    try {
      t.fn();
      console.log('✓ ' + t.name);
      ok++;
    } catch (e) {
      console.error('✗ ' + t.name);
      console.error('  ' + e.message);
      fail++;
    }
  }
);
process.exit(fail ? 1 : 0);