#!/usr/bin/env node
'use strict';

/**
 * Unit tests for rich-text helper (#37).
 */

const assert = require('assert');
const RichText = require('../rich-text.js');
const { execFileSync } = require('child_process');
const path = require('path');

function makeDoc() {
  function makeEl(tag) {
    var el = {
      tagName: tag.toUpperCase(),
      children: [],
      _text: '',
      appendChild(child) {
        this.children.push(child);
        return child;
      },
      removeChild(child) {
        var idx = this.children.indexOf(child);
        if (idx !== -1) this.children.splice(idx, 1);
      },
      get firstChild() {
        return this.children[0] || null;
      },
    };
    if (tag === 'code' || tag === 'pre') {
      Object.defineProperty(el, 'textContent', {
        get() {
          return el._text;
        },
        set(v) {
          el._text = v == null ? '' : String(v);
        },
      });
    }
    return el;
  }

  return {
    createTextNode(text) {
      return { nodeType: 3, text: text, textContent: text };
    },
    createElement(tag) {
      return makeEl(tag);
    },
  };
}

function renderTree(raw) {
  var doc = makeDoc();
  var root = { children: [], appendChild(c) { this.children.push(c); }, firstChild: null };
  Object.defineProperty(root, 'firstChild', {
    get() {
      return root.children[0] || null;
    },
  });
  root.removeChild = function (child) {
    var idx = root.children.indexOf(child);
    if (idx !== -1) root.children.splice(idx, 1);
  };
  RichText.renderRichText(root, raw, doc);
  return root;
}

function findFirst(root, tag) {
  var stack = root.children ? root.children.slice() : [];
  while (stack.length) {
    var node = stack.shift();
    if (node.tagName === tag.toUpperCase()) return node;
    if (node.children) stack = stack.concat(node.children);
  }
  return null;
}

function textContent(root) {
  function walk(n) {
    if (n.nodeType === 3) return n.text || '';
    if (n._text != null && n._text !== '' && (!n.children || !n.children.length)) return n._text;
    return (n.children || []).map(walk).join('');
  }
  return walk(root);
}

// AC: pre block with special chars
{
  var tree = renderTree('<pre>cmd <file 2>&1 && echo "a<b"</pre>');
  var pre = findFirst(tree, 'pre');
  assert(pre, 'expected pre');
  var code = findFirst(pre, 'code');
  assert(code, 'expected pre > code');
  assert.strictEqual(code.textContent, 'cmd <file 2>&1 && echo "a<b"');
}

// AC: disallowed tags literal
{
  var tree = renderTree('<b>x</b>');
  assert(!findFirst(tree, 'b'), 'no b element');
  assert.strictEqual(textContent(tree), '<b>x</b>');
}

// AC: entities outside code literal
{
  var tree = renderTree('&amp; & &lt;');
  assert.strictEqual(textContent(tree), '&amp; & &lt;');
}

// AC: backticks literal
{
  var tree = renderTree('`whoami`');
  assert.strictEqual(textContent(tree), '`whoami`');
}

// AC: pre containing code tags as inner text
{
  var tree = renderTree('<pre><code>x</code></pre>');
  var pre = findFirst(tree, 'pre');
  var code = findFirst(pre, 'code');
  assert(code, 'single code inside pre');
  assert.strictEqual(code.textContent, '<code>x</code>');
  assert.strictEqual(findFirst(tree, 'code') , code);
}

// AC: invalid pre variants literal
['<pre class=a>x</pre>', '<pre>x', 'x</pre>'].forEach(function (sample) {
  var tree = renderTree(sample);
  assert(!findFirst(tree, 'pre'), 'no pre for ' + sample);
  assert.strictEqual(textContent(tree), sample);
});

// AC: newline inside pre
{
  var tree = renderTree('<pre>line1\\nline2</pre>');
  var code = findFirst(tree, 'code');
  assert.strictEqual(code.textContent, 'line1\nline2');
}

// inline code
{
  var tree = renderTree('run <code>ls</code> here');
  var code = findFirst(tree, 'code');
  assert(code, 'inline code');
  assert.strictEqual(code.textContent, 'ls');
}

// grep: no innerHTML = text|optText in quiz-engine
{
  var enginePath = path.join(__dirname, '..', 'quiz-engine.js');
  try {
    var grepOut = execFileSync('grep', ['-nE', 'innerHTML *= *(text|optText)', enginePath], {
      encoding: 'utf8',
    });
    assert.fail('grep should be empty but got: ' + grepOut);
  } catch (e) {
    if (e.status !== 1) throw e;
  }
}

console.log('✓ rich-text unit tests passed');