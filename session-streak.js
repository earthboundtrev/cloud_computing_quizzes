/**
 * Session timer for Cloud Cram quizzes. Goal/streak UI comes from gamification.js (#68).
 */
(function () {
  'use strict';

  var BAR_HEIGHT_PX = 40;
  var BODY_TOP_OFFSET_PX = BAR_HEIGHT_PX + 32;

  var timerStart = null;
  var timeLimitMinutes = 0;
  var timeUp = false;

  function todayStr() {
    if (window.CloudCramGame && window.CloudCramGame.todayStr) {
      return window.CloudCramGame.todayStr();
    }
    var d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }

  function isQuizAreaVisible() {
    var el = document.getElementById('quiz-area');
    return el && !el.classList.contains('hidden');
  }

  function formatTime(seconds) {
    var m = Math.floor(seconds / 60);
    var s = seconds % 60;
    return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
  }

  function injectStyles() {
    if (document.getElementById('session-streak-styles')) return;
    var style = document.createElement('style');
    style.id = 'session-streak-styles';
    style.textContent = [
      '.session-streak-bar { position: fixed; top: 0; left: 0; right: 0; z-index: 10002; height: ' + BAR_HEIGHT_PX + 'px; max-height: ' + BAR_HEIGHT_PX + 'px; overflow: hidden; background: var(--surface, #1a2332); border-bottom: 1px solid rgba(148,163,184,0.2); display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 0.75rem 1.25rem; padding: 0 1rem; font-family: var(--font, monospace); font-size: 0.85rem; color: var(--text-muted, #94a3b8); }',
      '.session-streak-bar .session-timer { font-variant-numeric: tabular-nums; }',
      '.session-streak-bar .streak-count { font-variant-numeric: tabular-nums; }',
      'body.session-streak-bar-visible { padding-top: ' + BODY_TOP_OFFSET_PX + 'px !important; }'
    ].join('\n');
    document.head.appendChild(style);
  }

  function ensureBar() {
    if (document.getElementById('session-streak-bar')) return;
    injectStyles();
    var bar = document.createElement('div');
    bar.id = 'session-streak-bar';
    bar.className = 'session-streak-bar';
    bar.setAttribute('aria-live', 'polite');
    var timer = document.createElement('span');
    timer.className = 'session-timer';
    timer.id = 'session-timer';
    timer.textContent = 'Session: 00:00';
    var streak = document.createElement('span');
    streak.className = 'streak-count';
    streak.id = 'session-streak';
    bar.appendChild(timer);
    bar.appendChild(streak);
    document.body.insertBefore(bar, document.body.firstChild);
    document.body.classList.add('session-streak-bar-visible');
  }

  function renderGoalBar() {
    if (window.CloudCramGame && window.CloudCramGame.renderQuizBar) {
      window.CloudCramGame.renderQuizBar();
      return;
    }
    var el = document.getElementById('session-streak');
    if (el) el.textContent = '';
  }

  function tick() {
    var timerEl = document.getElementById('session-timer');
    var showTimer = isQuizAreaVisible() && timeLimitMinutes > 0;
    if (timerEl) {
      timerEl.style.display = showTimer ? '' : 'none';
    }
    if (isQuizAreaVisible()) {
      if (timerStart === null) {
        timerStart = Date.now();
        timeUp = false;
        renderGoalBar();
      }
      if (timerEl && timerStart !== null && timeLimitMinutes > 0) {
        if (timeUp) {
          timerEl.textContent = 'Time\'s up!';
          return;
        }
        var secs = Math.floor((Date.now() - timerStart) / 1000);
        var totalLimitSecs = timeLimitMinutes * 60;
        var remaining = totalLimitSecs - secs;
        if (remaining <= 0) {
          timeUp = true;
          timerEl.textContent = 'Time\'s up!';
          return;
        }
        timerEl.textContent = 'Time left: ' + formatTime(remaining);
      }
    } else {
      timerStart = null;
      timeUp = false;
      if (timerEl && timeLimitMinutes > 0) timerEl.textContent = 'Session: 00:00';
      renderGoalBar();
    }
  }

  function setTimeLimit(minutes) {
    timeLimitMinutes = Math.max(0, parseInt(minutes, 10) || 0);
    timeUp = false;
  }

  function init() {
    ensureBar();
    if (window.CloudCramGame && window.CloudCramGame.onUiRefresh) {
      window.CloudCramGame.onUiRefresh(renderGoalBar);
    }
    tick();
    setInterval(tick, 1000);
  }

  window.SessionStreak = {
    setTimeLimit: setTimeLimit,
    getTimeLimit: function () { return timeLimitMinutes; },
    todayStr: todayStr
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
