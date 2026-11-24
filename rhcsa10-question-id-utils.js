/**
 * Canonical rhcsa10 question ids and answerDedup normalization (#31).
 * Requires window.RHCSA10_QUESTION_ID_MAP from data/rhcsa10-question-id-map.js.
 */
(function (root) {
  'use strict';

  function getForward() {
    var payload = root.RHCSA10_QUESTION_ID_MAP;
    if (!payload || !payload.forward || typeof payload.forward !== 'object') {
      return null;
    }
    return payload.forward;
  }

  function canonicalQuestionId(raw) {
    var key = String(raw);
    if (/^rhcsa10-\d{4}$/.test(key)) {
      return key;
    }
    var forward = getForward();
    if (forward && forward[key] != null) {
      return forward[key];
    }
    return key;
  }

  /** Collapse legacy + new dedup keys that refer to the same rhcsa10 question. */
  function normalizeAnswerDedup(dedup) {
    if (!dedup || typeof dedup !== 'object') {
      return dedup || {};
    }
    if (!getForward()) {
      return dedup;
    }
    var next = Object.create(null);
    Object.keys(dedup).forEach(function (dedupKey) {
      if (!dedup[dedupKey]) {
        return;
      }
      var m = dedupKey.match(/^([^:]+):([^:]+):(.+)$/);
      if (!m) {
        next[dedupKey] = true;
        return;
      }
      var newKey = m[1] + ':' + m[2] + ':' + canonicalQuestionId(m[3]);
      next[newKey] = true;
    });
    return next;
  }

  function normalizePendingGameAnswer(msg) {
    if (!msg || !msg.questionId) {
      return msg;
    }
    var canon = canonicalQuestionId(msg.questionId);
    if (canon === String(msg.questionId)) {
      return msg;
    }
    var out = {};
    Object.keys(msg).forEach(function (k) {
      out[k] = msg[k];
    });
    out.questionId = canon;
    return out;
  }

  root.CloudCramRhcsa10Ids = {
    canonicalQuestionId: canonicalQuestionId,
    normalizeAnswerDedup: normalizeAnswerDedup,
    normalizePendingGameAnswer: normalizePendingGameAnswer
  };
})(typeof window !== 'undefined' ? window : globalThis);