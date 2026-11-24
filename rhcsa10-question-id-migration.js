/**
 * Remap gamification answerDedup keys after rhcsa10 bank ids became rhcsa10-NNNN (#31).
 * Requires window.RHCSA10_QUESTION_ID_MAP (data/rhcsa10-question-id-map.js).
 */
(function migrateRHCSA10QuestionIds() {
  'use strict';

  if (typeof window !== 'undefined' &&
    window.cloudCramStorageWritesBlocked &&
    window.cloudCramStorageWritesBlocked()) {
    return;
  }

  var FLAG = 'rhcsa10_question_ids_v1';
  var GAME_KEY = 'cloudcram_game_v1';

  if (localStorage.getItem(FLAG)) {
    return;
  }

  var mapPayload = window.RHCSA10_QUESTION_ID_MAP;
  if (!mapPayload || !mapPayload.forward || typeof mapPayload.forward !== 'object') {
    console.warn('[Migration] RHCSA10 question id map missing; will retry on next load');
    return;
  }

  var forward = mapPayload.forward;

  function remapQuestionId(raw) {
    var key = String(raw);
    if (/^rhcsa10-\d{4}$/.test(key)) {
      return key;
    }
    if (forward[key] != null) {
      return forward[key];
    }
    return null;
  }

  var migrated = false;

  try {
    var gameStr = localStorage.getItem(GAME_KEY);
    if (gameStr) {
      var game = JSON.parse(gameStr);
      if (game && game.answerDedup && typeof game.answerDedup === 'object') {
        var nextDedup = {};
        var changed = false;
        Object.keys(game.answerDedup).forEach(function (dedupKey) {
          var m = dedupKey.match(/^([^:]+):([^:]+):(.+)$/);
          if (!m) {
            nextDedup[dedupKey] = game.answerDedup[dedupKey];
            return;
          }
          var newQid = remapQuestionId(m[3]);
          if (newQid && newQid !== m[3]) {
            var newKey = m[1] + ':' + m[2] + ':' + newQid;
            if (!nextDedup[newKey]) {
              nextDedup[newKey] = true;
            }
            changed = true;
          } else {
            nextDedup[dedupKey] = game.answerDedup[dedupKey];
          }
        });
        if (changed) {
          game.answerDedup = nextDedup;
          localStorage.setItem(GAME_KEY, JSON.stringify(game));
          migrated = true;
          console.log('[Migration] Remapped rhcsa10 gamification answerDedup question ids');
        }
      }
    }
  } catch (e) {
    console.error('[Migration] Failed rhcsa10 question id gamification remap:', e);
    return;
  }

  localStorage.setItem(FLAG, 'true');
  if (migrated) {
    console.log('[Migration] rhcsa10 question id migration complete');
  }
})();