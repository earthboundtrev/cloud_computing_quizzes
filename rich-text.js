/**
 * Escape-then-format rich text for quiz stems, options, and explanations.
 * Only exact <pre>...</pre> and <code>...</code> pairs (no attributes, no nesting) become DOM.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.RichText = factory();
  }
})(typeof self !== 'undefined' ? self : typeof global !== 'undefined' ? global : this, function () {
  'use strict';

  var PRE_OPEN = '<pre>';
  var PRE_CLOSE = '</pre>';
  var CODE_OPEN = '<code>';
  var CODE_CLOSE = '</code>';

  function normalizeNewlines(raw) {
    return (raw == null ? '' : String(raw)).replace(/\\n/g, '\n');
  }

  /**
   * @returns {{type: 'text'|'pre'|'code', value: string}[]}
   */
  function parseSegments(text) {
    var segments = [];
    var i = 0;
    while (i < text.length) {
      if (text.slice(i, i + PRE_OPEN.length) === PRE_OPEN) {
        var preEnd = text.indexOf(PRE_CLOSE, i + PRE_OPEN.length);
        if (preEnd !== -1) {
          segments.push({ type: 'pre', value: text.slice(i + PRE_OPEN.length, preEnd) });
          i = preEnd + PRE_CLOSE.length;
          continue;
        }
      }
      if (text.slice(i, i + CODE_OPEN.length) === CODE_OPEN) {
        var codeEnd = text.indexOf(CODE_CLOSE, i + CODE_OPEN.length);
        if (codeEnd !== -1) {
          segments.push({ type: 'code', value: text.slice(i + CODE_OPEN.length, codeEnd) });
          i = codeEnd + CODE_CLOSE.length;
          continue;
        }
      }
      var nextLt = text.indexOf('<', i);
      if (nextLt === -1) {
        segments.push({ type: 'text', value: text.slice(i) });
        break;
      }
      if (nextLt > i) {
        segments.push({ type: 'text', value: text.slice(i, nextLt) });
        i = nextLt;
        continue;
      }
      segments.push({ type: 'text', value: '<' });
      i = nextLt + 1;
    }
    return mergeTextSegments(segments);
  }

  function mergeTextSegments(segments) {
    var out = [];
    segments.forEach(function (seg) {
      if (seg.type === 'text' && seg.value === '') {
        return;
      }
      if (out.length && seg.type === 'text' && out[out.length - 1].type === 'text') {
        out[out.length - 1].value += seg.value;
      } else {
        out.push({ type: seg.type, value: seg.value });
      }
    });
    return out;
  }

  function fieldHasCodeBlocks(text) {
    var segs = parseSegments(normalizeNewlines(text));
    return segs.some(function (s) {
      return s.type === 'pre' || s.type === 'code';
    });
  }

  var PLACEHOLDER_TAG_RE = /^<\/?[a-zA-Z][a-zA-Z0-9_-]*>$/;
  var DISALLOWED_HTML = {
    b: true,
    i: true,
    em: true,
    strong: true,
    u: true,
    div: true,
    span: true,
    p: true,
    br: true,
    a: true,
    script: true,
    style: true,
    img: true,
    ul: true,
    ol: true,
    li: true,
    table: true,
    tr: true,
    td: true,
  };
  var ANY_TAG_RE = /<[^>]+>/g;

  function tagNameFromBracket(tag) {
    var m = tag.match(/^<\/?([a-zA-Z][a-zA-Z0-9_-]*)\s*>$/);
    return m ? m[1].toLowerCase() : null;
  }

  /**
   * Lint bank fields: only balanced <pre>/<code> or <word> placeholders (no code blocks).
   */
  function validateFieldMarkup(text, label) {
    if (text == null || text === '') {
      return [];
    }
    var normalized = normalizeNewlines(text);
    var issues = [];
    var hasCode = fieldHasCodeBlocks(normalized);
    var match;
    ANY_TAG_RE.lastIndex = 0;
    while ((match = ANY_TAG_RE.exec(normalized))) {
      var tag = match[0];
      if (tag === PRE_OPEN || tag === PRE_CLOSE || tag === CODE_OPEN || tag === CODE_CLOSE) {
        continue;
      }
      if (/^<pre[\s/]/.test(tag) && tag !== PRE_OPEN) {
        issues.push(label + ': disallowed markup ' + JSON.stringify(tag));
        continue;
      }
      if (/^<code[\s/]/.test(tag) && tag !== CODE_OPEN) {
        issues.push(label + ': disallowed markup ' + JSON.stringify(tag));
        continue;
      }
      if (!PLACEHOLDER_TAG_RE.test(tag)) {
        continue;
      }
      var name = tagNameFromBracket(tag);
      if (!name) {
        continue;
      }
      if (name === 'pre' || name === 'code') {
        continue;
      }
      if (DISALLOWED_HTML[name]) {
        issues.push(label + ': disallowed markup ' + JSON.stringify(tag));
        continue;
      }
      if (hasCode) {
        issues.push(label + ': placeholder ' + JSON.stringify(tag) + ' not allowed with code blocks in the same field');
        continue;
      }
    }
    return issues;
  }

  function validateQuestionMarkup(q, qId) {
    var issues = [];
    issues = issues.concat(validateFieldMarkup(q.q, qId + " field 'q'"));
    issues = issues.concat(validateFieldMarkup(q.explain, qId + " field 'explain'"));
    if (Array.isArray(q.options)) {
      q.options.forEach(function (opt, idx) {
        if (typeof opt === 'string') {
          issues = issues.concat(validateFieldMarkup(opt, qId + ' option[' + idx + ']'));
        }
      });
    }
    return issues;
  }

  function clearElement(el) {
    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }
  }

  function renderRichText(el, raw, doc) {
    doc = doc || (typeof document !== 'undefined' ? document : null);
    if (!doc) {
      throw new Error('renderRichText requires a document');
    }
    var text = normalizeNewlines(raw);
    clearElement(el);
    parseSegments(text).forEach(function (seg) {
      if (seg.type === 'text') {
        if (seg.value) {
          el.appendChild(doc.createTextNode(seg.value));
        }
      } else if (seg.type === 'pre') {
        var pre = doc.createElement('pre');
        var code = doc.createElement('code');
        code.textContent = seg.value;
        pre.appendChild(code);
        el.appendChild(pre);
      } else if (seg.type === 'code') {
        var inlineCode = doc.createElement('code');
        inlineCode.textContent = seg.value;
        el.appendChild(inlineCode);
      }
    });
  }

  return {
    normalizeNewlines: normalizeNewlines,
    parseSegments: parseSegments,
    renderRichText: renderRichText,
    validateFieldMarkup: validateFieldMarkup,
    validateQuestionMarkup: validateQuestionMarkup,
    fieldHasCodeBlocks: fieldHasCodeBlocks,
  };
});