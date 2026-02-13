/**
 * Session timer and streak counter for Cloud Cram.
 * Timer starts when first card loads (quiz-area visible); streak from localStorage.
 */
(function () {
  'use strict';

  var STORAGE_KEY_LAST = 'cloudcram_study_last_date';
  var STORAGE_KEY_STREAK = 'cloudcram_study_streak';
  var BAR_HEIGHT_PX = 40;
  /* Body default padding is 2rem; .site-nav has margin-top: -2rem. Reserve bar height + 2rem so nav starts below the bar. */
  var BODY_TOP_OFFSET_PX = BAR_HEIGHT_PX + 32;

  var timerStart = null;
  var streakUpdatedThisPage = false;
  var timeLimitMinutes = 0;  // 0 = no limit
  var timeUp = false;

  function todayStr() {
    var d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }

  function yesterdayStr() {
    var d = new Date();
    d.setDate(d.getDate() - 1);
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }

  function getStreakFromStorage() {
    try {
      var last = localStorage.getItem(STORAGE_KEY_LAST);
      var streak = parseInt(localStorage.getItem(STORAGE_KEY_STREAK) || '0', 10);
      return { last: last || null, streak: isNaN(streak) ? 0 : Math.max(0, streak) };
    } catch (e) {
      return { last: null, streak: 0 };
    }
  }

  function updateStreakForToday() {
    if (streakUpdatedThisPage) return;
    var today = todayStr();
    var yesterday = yesterdayStr();
    var data = getStreakFromStorage();
    var last = data.last;
    var streak = data.streak;

    if (!last) {
      streak = 1;
    } else if (last === today) {
      /* already studied today, keep streak */
    } else if (last === yesterday) {
      streak += 1;
    } else {
      streak = 1;
    }

    try {
      localStorage.setItem(STORAGE_KEY_LAST, today);
      localStorage.setItem(STORAGE_KEY_STREAK, String(streak));
    } catch (e) {}
    streakUpdatedThisPage = true;
    return streak;
  }

  function getCurrentStreak() {
    var data = getStreakFromStorage();
    var today = todayStr();
    var yesterday = yesterdayStr();
    var last = data.last;
    var streak = data.streak;
    /* display streak: if last is today, show current streak; if last was yesterday, show streak (we haven't updated yet); else show 0 */
    if (!last) return 0;
    if (last === today) return streak;
    if (last === yesterday) return streak;
    return 0;
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
      '.session-streak-bar { position: fixed; top: 0; left: 0; right: 0; z-index: 10002; height: ' + BAR_HEIGHT_PX + 'px; background: var(--surface, #1a2332); border-bottom: 1px solid rgba(148,163,184,0.2); display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 0.75rem 1.25rem; padding: 0 1rem; font-family: var(--font, monospace); font-size: 0.85rem; color: var(--text-muted, #94a3b8); }',
      '.session-streak-bar .session-timer { font-variant-numeric: tabular-nums; }',
      '.session-streak-bar .streak-count { font-variant-numeric: tabular-nums; }',
      '.session-streak-bar .streak-msg { width: 100%; text-align: center; font-size: 0.8rem; color: var(--accent, #64748b); }',
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
    bar.innerHTML =
      '<span class="session-timer" id="session-timer">Session: 00:00</span>' +
      '<span class="streak-count" id="session-streak">Streak: 0 days</span>' +
      '<span class="streak-msg hidden" id="session-streak-msg"></span>';
    document.body.insertBefore(bar, document.body.firstChild);
    document.body.classList.add('session-streak-bar-visible');
  }

  function renderStreak(streak) {
    var el = document.getElementById('session-streak');
    var msgEl = document.getElementById('session-streak-msg');
    if (!el) return;
    el.textContent = 'Streak: ' + streak + ' day' + (streak === 1 ? '' : 's');
    if (msgEl) {
      if (streak > 3) {
        msgEl.textContent = 'Drone is proud—keep zapping!';
        msgEl.classList.remove('hidden');
      } else {
        msgEl.classList.add('hidden');
      }
    }
  }

  function tick() {
    var timerEl = document.getElementById('session-timer');
    if (isQuizAreaVisible()) {
      if (timerStart === null) {
        timerStart = Date.now();
        timeUp = false;
        var s = updateStreakForToday();
        renderStreak(s);
      }
      if (timerEl && timerStart !== null) {
        if (timeUp) {
          timerEl.textContent = 'Time\'s up!';
          return;
        }
        var secs = Math.floor((Date.now() - timerStart) / 1000);
        if (timeLimitMinutes > 0) {
          var totalLimitSecs = timeLimitMinutes * 60;
          var remaining = totalLimitSecs - secs;
          if (remaining <= 0) {
            timeUp = true;
            timerEl.textContent = 'Time\'s up!';
            return;
          }
          timerEl.textContent = 'Time left: ' + formatTime(remaining);
        } else {
          timerEl.textContent = 'Session: ' + formatTime(secs);
        }
      }
    } else {
      timerStart = null;
      timeUp = false;
      if (timerEl) timerEl.textContent = 'Session: 00:00';
      var streak = getCurrentStreak();
      renderStreak(streak);
    }
  }

  function setTimeLimit(minutes) {
    timeLimitMinutes = Math.max(0, parseInt(minutes, 10) || 0);
    timeUp = false;
  }

  function init() {
    ensureBar();
    tick();
    setInterval(tick, 1000);
  }

  window.SessionStreak = {
    setTimeLimit: setTimeLimit,
    getTimeLimit: function () { return timeLimitMinutes; }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
