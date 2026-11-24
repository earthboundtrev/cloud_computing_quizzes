/**
 * Idempotent persist of normalized cloudcram_game_v1.answerDedup (#31).
 * Runs after map + utils on hub/quiz entry. In-memory paths also normalize on every read/merge.
 */
(function persistRhcsa10GameDedup() {
  'use strict';

  if (typeof window !== 'undefined' &&
    window.cloudCramStorageWritesBlocked &&
    window.cloudCramStorageWritesBlocked()) {
    return;
  }

  var GAME_KEY = 'cloudcram_game_v1';
  var utils = typeof window !== 'undefined' ? window.CloudCramRhcsa10Ids : null;

  if (!utils || typeof utils.normalizeAnswerDedup !== 'function') {
    return;
  }

  try {
    var gameStr = localStorage.getItem(GAME_KEY);
    if (!gameStr) {
      return;
    }
    var game = JSON.parse(gameStr);
    if (!game || !game.answerDedup || typeof game.answerDedup !== 'object') {
      return;
    }
    var nextDedup = utils.normalizeAnswerDedup(game.answerDedup);
    var before = JSON.stringify(game.answerDedup);
    var after = JSON.stringify(nextDedup);
    if (before === after) {
      return;
    }
    game.answerDedup = nextDedup;
    localStorage.setItem(GAME_KEY, JSON.stringify(game));
  } catch (e) {
    console.error('[Migration] Failed rhcsa10 answerDedup normalize:', e);
  }
})();