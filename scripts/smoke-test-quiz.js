#!/usr/bin/env node
'use strict';

/**
 * Generic quiz page smoke test: load bank + quiz-engine for a quizId,
 * run quiz (mixed) and exam modes, answer through to results markdown.
 *
 * Usage:
 *   node scripts/smoke-test-quiz.js <quizId> [quizId...]
 *   node scripts/smoke-test-quiz.js --all
 *
 * Exports harness helpers for future gamification tests (stub localStorage via createQuizSmokeContext).
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');

class LocalStorageMock {
  constructor(initial) {
    this.store = initial ? Object.assign({}, initial) : {};
  }

  getItem(key) {
    return Object.prototype.hasOwnProperty.call(this.store, key) ? this.store[key] : null;
  }

  setItem(key, value) {
    this.store[key] = String(value);
  }

  removeItem(key) {
    delete this.store[key];
  }

  clear() {
    this.store = {};
  }
}

function classListFactory(el) {
  const set = new Set(
    (el.className || '')
      .split(/\s+/)
      .filter(Boolean)
  );
  return {
    add(c) {
      set.add(c);
      el.className = Array.from(set).join(' ');
    },
    remove(c) {
      set.delete(c);
      el.className = Array.from(set).join(' ');
    },
    toggle(c) {
      if (set.has(c)) set.delete(c);
      else set.add(c);
      el.className = Array.from(set).join(' ');
    },
    contains(c) {
      return set.has(c);
    },
  };
}

function makeElement(doc, tag, opts) {
  opts = opts || {};
  const el = {
    tagName: tag.toUpperCase(),
    nodeType: 1,
    id: opts.id || '',
    className: opts.className || '',
    children: [],
    parentNode: null,
    style: {},
    dataset: {},
    attributes: {},
    _innerHTML: '',
    _textContent: '',
    disabled: false,
    type: opts.type || '',
    href: '',
    download: '',
    rel: '',
    onclick: null,
    _listeners: {},
    setAttribute(name, value) {
      this.attributes[name] = value;
      if (name === 'data-mode') this.dataset.mode = value;
      if (name === 'data-case-study') this.dataset.caseStudy = value;
      if (name === 'data-original-index') this.dataset.originalIndex = value;
      if (name === 'data-heading') this.dataset.heading = value;
      if (name === 'data-intro') this.dataset.intro = value;
    },
    getAttribute(name) {
      return this.attributes[name] != null ? this.attributes[name] : null;
    },
    removeAttribute(name) {
      delete this.attributes[name];
    },
    addEventListener(type, fn) {
      if (!this._listeners[type]) this._listeners[type] = [];
      this._listeners[type].push(fn);
    },
    removeEventListener() {},
    click() {
      if (typeof this.onclick === 'function') this.onclick();
      (this._listeners.click || []).forEach(function (fn) {
        fn({ target: el, preventDefault: function () {} });
      });
    },
    appendChild(child) {
      if (child.nodeType === 3) {
        this._textContent = (this._textContent || '') + child.data;
        if (!this._textChild) {
          this.children.push(child);
          this._textChild = child;
        } else {
          this._textChild.data = this._textContent;
        }
        return child;
      }
      child.parentNode = this;
      this.children.push(child);
      if (child.tagName === 'SPAN' && !child.className && this.children.length === 1) {
        this._textChild = child;
      }
      return child;
    },
    insertBefore(newNode, ref) {
      const idx = ref ? this.children.indexOf(ref) : -1;
      if (idx === -1) return this.appendChild(newNode);
      newNode.parentNode = this;
      this.children.splice(idx, 0, newNode);
      return newNode;
    },
    removeChild(child) {
      const idx = this.children.indexOf(child);
      if (idx !== -1) this.children.splice(idx, 1);
      child.parentNode = null;
      return child;
    },
    remove() {
      if (this.parentNode) this.parentNode.removeChild(this);
    },
    querySelector(sel) {
      return doc.querySelectorFrom(el, sel);
    },
    querySelectorAll(sel) {
      return doc.querySelectorAllFrom(el, sel);
    },
    get nextSibling() {
      if (!this.parentNode) return null;
      const idx = this.parentNode.children.indexOf(this);
      return this.parentNode.children[idx + 1] || null;
    },
    getBoundingClientRect() {
      return { left: 10, top: 10, width: 200, height: 40, right: 210, bottom: 50 };
    },
  };
  el.classList = classListFactory(el);
  Object.defineProperty(el, 'className', {
    get() {
      return el._className || '';
    },
    set(v) {
      el._className = v;
      el.classList = classListFactory(el);
    },
  });
  Object.defineProperty(el, 'innerHTML', {
    get() {
      return el._innerHTML;
    },
    set(v) {
      el._innerHTML = v == null ? '' : String(v);
      el.children.length = 0;
      el._textChild = null;
      if (el._innerHTML !== '') {
        el.children.push(makeTextNode(el._innerHTML));
      }
    },
  });
  Object.defineProperty(el, 'textContent', {
    get() {
      return el._textContent;
    },
    set(v) {
      el._textContent = v == null ? '' : String(v);
      el.children.length = 0;
      el._textChild = null;
      if (el._textContent !== '') {
        const tn = makeTextNode(el._textContent);
        el._textChild = tn;
        el.children.push(tn);
      }
    },
  });
  if (opts.id) doc.registerId(opts.id, el);
  return el;
}

function makeTextNode(data) {
  return { nodeType: 3, data: data, textContent: data };
}

function matches(el, sel) {
  if (!el || el.nodeType !== 1) return false;
  if (sel.startsWith('#')) {
    const id = sel.slice(1).split(/\s/)[0];
    return el.id === id;
  }
  if (sel.startsWith('.')) {
    const classes = sel.split('.').filter(Boolean);
    return classes.every(function (c) {
      return el.classList.contains(c);
    });
  }
  if (sel.startsWith('[')) {
    const m = sel.match(/^\[([^=]+)(?:="([^"]*)")?\]$/);
    if (!m) return false;
    const attr = m[1];
    const val = m[2];
    if (attr === 'data-mode') return el.dataset.mode === val;
    if (attr === 'data-case-study') return el.getAttribute('data-case-study') === val;
    return el.getAttribute(attr) === val;
  }
  return el.tagName === sel.toUpperCase();
}

function splitSelector(sel) {
  return sel
    .split(/\s+/)
    .map(function (part) {
      part = part.trim();
      if (!part) return null;
      return part;
    })
    .filter(Boolean);
}

function querySelectorAllFrom(root, sel, doc) {
  const parts = splitSelector(sel);
  if (!parts.length) return [];

  function walk(node, partIdx, acc) {
    if (!node) return;
    if (node.nodeType === 1) {
      if (matches(node, parts[partIdx])) {
        if (partIdx === parts.length - 1) acc.push(node);
        else {
          for (let i = 0; i < node.children.length; i++) {
            walk(node.children[i], partIdx + 1, acc);
          }
        }
      }
      if (partIdx === 0 || !parts[0].startsWith('#')) {
        for (let j = 0; j < node.children.length; j++) {
          walk(node.children[j], partIdx, acc);
        }
      }
    }
  }

  const acc = [];
  if (parts[0].startsWith('#')) {
    const id = parts[0].slice(1);
    const start = doc.getElementById(id);
    if (start) {
      if (parts.length === 1) acc.push(start);
      else {
        for (let i = 0; i < start.children.length; i++) {
          walk(start.children[i], 1, acc);
        }
      }
    }
  } else {
    walk(root, 0, acc);
  }
  return acc;
}

function createMinimalDocument() {
  const byId = {};
  const doc = {
    readyState: 'complete',
    body: null,
    registerId(id, el) {
      byId[id] = el;
    },
    getElementById(id) {
      return byId[id] || null;
    },
    createElement(tag) {
      return makeElement(doc, tag, {});
    },
    createTextNode(text) {
      return makeTextNode(text);
    },
    querySelector(sel) {
      const all = this.querySelectorAll(sel);
      return all[0] || null;
    },
    querySelectorAll(sel) {
      return querySelectorAllFrom(this.body, sel, this);
    },
    querySelectorFrom(root, sel) {
      const all = querySelectorAllFrom(root, sel, this);
      return all[0] || null;
    },
    querySelectorAllFrom(root, sel) {
      return querySelectorAllFrom(root, sel, this);
    },
    addEventListener() {},
    elementsFromPoint() {
      return [];
    },
  };

  doc.body = makeElement(doc, 'body', {});

  const container = makeElement(doc, 'div', { id: 'container', className: 'container' });
  doc.body.appendChild(container);

  function reg(id, tag, className) {
    return makeElement(doc, tag || 'div', { id: id, className: className || '' });
  }

  const startScreen = reg('start-screen', 'div', 'start-screen');
  const modeSelector = makeElement(doc, 'div', { className: 'mode-selector' });
  ['comparison', 'exam', 'scenario', 'mixed'].forEach(function (mode) {
    const btn = makeElement(doc, 'button', { className: 'mode-btn' });
    btn.setAttribute('data-mode', mode);
    modeSelector.appendChild(btn);
  });
  startScreen.appendChild(modeSelector);
  startScreen.appendChild(reg('start-btn', 'button', ''));
  startScreen.appendChild(reg('focus-hint', 'div', 'profile-hint hidden'));
  startScreen.appendChild(reg('case-study-exams', 'div', 'case-study-exams'));
  const timeLimit = reg('session-time-limit', 'select', '');
  const timeOpt = makeElement(doc, 'option', {});
  timeOpt.value = '0';
  timeLimit.appendChild(timeOpt);
  timeLimit.value = '0';
  startScreen.appendChild(timeLimit);

  const quizArea = reg('quiz-area', 'div', 'hidden');
  const stats = makeElement(doc, 'div', { className: 'stats' });
  stats.appendChild(reg('q-num', 'span', ''));
  stats.appendChild(reg('q-total', 'span', ''));
  stats.appendChild(reg('score-display', 'span', ''));
  quizArea.appendChild(stats);
  const card = makeElement(doc, 'div', { className: 'question-card' });
  card.appendChild(reg('question-text', 'div', 'question-text'));
  card.appendChild(reg('options', 'div', 'options'));
  card.appendChild(reg('feedback', 'div', 'feedback hidden'));
  quizArea.appendChild(card);
  const navRow = makeElement(doc, 'div', { className: 'nav-row' });
  navRow.appendChild(reg('prev-btn', 'button', 'secondary'));
  navRow.appendChild(reg('next-btn', 'button', ''));
  quizArea.appendChild(navRow);

  const resultsScreen = reg('results-screen', 'div', 'results hidden');
  resultsScreen.appendChild(reg('final-score', 'div', 'score'));
  resultsScreen.appendChild(reg('result-msg', 'div', ''));
  resultsScreen.appendChild(reg('copy-toast', 'div', 'copy-toast hidden'));

  container.appendChild(startScreen);
  container.appendChild(quizArea);
  container.appendChild(resultsScreen);

  return doc;
}

function loadQuizConfig() {
  const sandbox = { window: {}, console: console };
  sandbox.window = sandbox;
  sandbox.localStorage = new LocalStorageMock();
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'quiz-config.js'), 'utf8'), sandbox, {
    filename: 'quiz-config.js',
  });
  return sandbox.window.QUIZ_CONFIG || [];
}

function scriptsForQuizHtml(htmlPath) {
  const html = fs.readFileSync(htmlPath, 'utf8');
  const scripts = [];
  const re = /<script[^>]+src=["']([^"']+)["']/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    const src = m[1].split('?')[0];
    if (src === 'quiz-engine.js' || src.startsWith('data/') || src.startsWith('quiz-init-')) {
      scripts.push(src);
    }
  }
  return scripts;
}

function createQuizSmokeContext(quizId, options) {
  options = options || {};
  const configList = loadQuizConfig();
  const entry = configList.find(function (q) {
    return q.id === quizId;
  });
  if (!entry) {
    throw new Error('Unknown quizId: ' + quizId);
  }

  const htmlPath = path.join(ROOT, entry.href);
  if (!fs.existsSync(htmlPath)) {
    throw new Error('Quiz HTML missing for ' + quizId + ': ' + entry.href);
  }

  const doc = createMinimalDocument();
  const localStorage = options.localStorage || new LocalStorageMock();
  let capturedMarkdown = null;

  const quietConsole = {
    log: function () {},
    warn: console.warn.bind(console),
    error: console.error.bind(console),
  };

  const sandbox = {
    window: {},
    document: doc,
    console: quietConsole,
    localStorage: localStorage,
    Math: Math,
    Date: Date,
    setTimeout: setTimeout,
    clearTimeout: clearTimeout,
    Array: Array,
    Object: Object,
    JSON: JSON,
    parseInt: parseInt,
    String: String,
    Error: Error,
    Blob: function Blob(parts) {
      capturedMarkdown = parts && parts[0] != null ? String(parts[0]) : '';
      this.parts = parts;
    },
    URL: {
      createObjectURL: function () {
        return 'blob:smoke';
      },
      revokeObjectURL: function () {},
    },
    navigator: { clipboard: null },
  };
  sandbox.window = sandbox;

  sandbox.SessionStreak = { setTimeLimit: function () {} };
  sandbox.BrainDump = { init: function () {} };
  sandbox.cloudCramStorageWritesBlocked = function () {
    return false;
  };
  sandbox.alert = function () {};

  vm.createContext(sandbox);

  const scriptPaths = options._testScriptOverride || scriptsForQuizHtml(htmlPath);
  if (!scriptPaths.length) {
    throw new Error('No quiz scripts found in HTML for quizId ' + quizId);
  }

  scriptPaths.forEach(function (rel) {
    const full = path.join(ROOT, rel);
    if (!fs.existsSync(full)) {
      throw new Error('Script not found for ' + quizId + ': ' + rel);
    }
    try {
      vm.runInContext(fs.readFileSync(full, 'utf8'), sandbox, { filename: full });
    } catch (e) {
      throw new Error('Failed to load bank/engine for quizId ' + quizId + ' (' + rel + '): ' + e.message);
    }
  });

  if (!sandbox.QuizEngine || typeof sandbox.startQuiz !== 'function') {
    throw new Error('QuizEngine did not initialize for quizId ' + quizId);
  }

  return {
    sandbox: sandbox,
    quizId: quizId,
    getCapturedMarkdown: function () {
      return capturedMarkdown;
    },
    resetCapture: function () {
      capturedMarkdown = null;
    },
  };
}

function answerCurrentQuestion(doc) {
  const opts = doc.getElementById('options');
  if (!opts) return;

  const multiOpts = opts.querySelectorAll('.option.multi-opt');
  if (multiOpts.length) {
    multiOpts.forEach(function (node) {
      node.classList.add('selected');
    });
    const check = opts.querySelector('.multi-check-btn');
    if (check) check.click();
    return;
  }

  const orderItems = opts.querySelectorAll('.order-item');
  if (orderItems.length) {
    const check = opts.querySelector('.order-check-btn');
    if (check) check.click();
    return;
  }

  const choices = opts.querySelectorAll('.option');
  if (choices.length) {
    choices[0].click();
  }
}

function runSession(sandbox, mode) {
  const doc = sandbox.document;
  if (typeof sandbox.selectMode === 'function') {
    sandbox.selectMode(mode);
  }
  sandbox.startQuiz();

  const quizArea = doc.getElementById('quiz-area');
  if (quizArea.classList.contains('hidden')) {
    throw new Error('quiz-area still hidden after startQuiz (mode=' + mode + ')');
  }

  const total = parseInt(doc.getElementById('q-total').textContent, 10);
  if (!total || total < 1) {
    throw new Error('No session questions (mode=' + mode + ')');
  }

  for (let i = 0; i < total; i++) {
    answerCurrentQuestion(doc);
    sandbox.nextQuestion();
  }

  const results = doc.getElementById('results-screen');
  if (results.classList.contains('hidden')) {
    throw new Error('results-screen not shown after session (mode=' + mode + ')');
  }

  sandbox.downloadResults();
}

function assertResultsMarkdown(md, quizId, modeLabel) {
  if (!md || md.indexOf('# ') !== 0 || md.indexOf('**Score:**') === -1) {
    throw new Error('quizId ' + quizId + ': missing results markdown after ' + modeLabel);
  }
  const m = md.match(/\*\*Score:\*\* (\d+)\/(\d+)/);
  if (!m) {
    throw new Error('quizId ' + quizId + ': could not parse score in markdown (' + modeLabel + ')');
  }
  const scored = parseInt(m[1], 10);
  const total = parseInt(m[2], 10);
  if (total < 1) {
    throw new Error('quizId ' + quizId + ': empty session (' + modeLabel + ')');
  }
  if (scored < 1) {
    throw new Error(
      'quizId ' + quizId + ': no scored answers in ' + modeLabel + ' (0/' + total + ') — engine may not have received clicks'
    );
  }
}

function smokeQuiz(quizId, options) {
  const ctx = createQuizSmokeContext(quizId, options);
  const { sandbox } = ctx;

  runSession(sandbox, 'mixed');
  assertResultsMarkdown(ctx.getCapturedMarkdown(), quizId, 'quiz mode');

  ctx.resetCapture();
  if (typeof sandbox.exitQuiz === 'function') {
    sandbox.exitQuiz();
  }
  runSession(sandbox, 'exam');
  assertResultsMarkdown(ctx.getCapturedMarkdown(), quizId, 'exam mode');

  return true;
}

function parseArgs(argv) {
  const args = argv.slice(2);
  if (!args.length) {
    return { all: false, ids: [], help: true };
  }
  if (args.indexOf('--all') !== -1) {
    return { all: true, ids: [], help: false };
  }
  return { all: false, ids: args.filter(function (a) {
    return a.charAt(0) !== '-';
  }), help: false };
}

function main() {
  const parsed = parseArgs(process.argv);
  if (parsed.help) {
    console.error('Usage: node scripts/smoke-test-quiz.js <quizId> [quizId...] | --all');
    process.exit(2);
  }

  const config = loadQuizConfig();
  const ids = parsed.all
    ? config.map(function (q) {
      return q.id;
    })
    : parsed.ids;

  if (!ids.length) {
    console.error('No quiz ids specified.');
    process.exit(2);
  }

  let failed = 0;
  ids.forEach(function (id) {
    process.stdout.write('Smoke ' + id + '... ');
    try {
      smokeQuiz(id);
      console.log('ok');
    } catch (e) {
      failed++;
      console.log('FAIL');
      console.error('  quizId ' + id + ': ' + e.message);
    }
  });

  if (failed) {
    console.error('\n' + failed + ' quiz smoke test(s) failed.');
    process.exit(1);
  }
  console.log('\nAll quiz smoke tests passed (' + ids.length + ').');
}

if (require.main === module) {
  main();
}

module.exports = {
  LocalStorageMock: LocalStorageMock,
  createQuizSmokeContext: createQuizSmokeContext,
  smokeQuiz: smokeQuiz,
  createMinimalDocument: createMinimalDocument,
};
