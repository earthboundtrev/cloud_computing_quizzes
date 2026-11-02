/**
 * Goal-based study streak, daily goal, freezes, repair, vacation — local-only (#68).
 * window.CloudCramGame
 */
(function (root, factory) {
  var api = factory();
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
  root.CloudCramGame = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  var STORAGE_KEY = 'cloudcram_game_v1';
  var STORAGE_CORRUPT = 'cloudcram_game_v1_corrupt';
  var LOCK_NAME = 'cloudcram_game_v1';
  var OLD_STREAK_KEY = 'cloudcram_study_streak';
  var OLD_LAST_DATE_KEY = 'cloudcram_study_last_date';
  var STATE_VERSION = 1;
  var REPAIR_OFFER_MS = 48 * 60 * 60 * 1000;
  var REPAIR_WINDOW_MS = 72 * 60 * 60 * 1000;
  var REPAIR_COOLDOWN_MS = 30 * 24 * 60 * 60 * 1000;
  var VACATION_MAX_DAYS = 14;
  var VACATION_MAX_USES_PER_YEAR = 2;
  var GOAL_CHOICES = [3, 10, 20, 40];
  var MS_DAY = 24 * 60 * 60 * 1000;

  var deps = {
    _localStorage: null,
    getLocalStorage: function () {
      if (deps._localStorage) return deps._localStorage;
      return typeof localStorage !== 'undefined' ? localStorage : null;
    },
    now: function () {
      return Date.now();
    },
    locks: typeof navigator !== 'undefined' ? navigator.locks : null,
    storageEventTarget: typeof window !== 'undefined' ? window : null
  };

  var uiListeners = [];
  var midnightTimer = null;

  function todayStr(d) {
    d = d || new Date(deps.now());
    return (
      d.getFullYear() +
      '-' +
      String(d.getMonth() + 1).padStart(2, '0') +
      '-' +
      String(d.getDate()).padStart(2, '0')
    );
  }

  function parseDateStr(s) {
    var p = s.split('-');
    return new Date(parseInt(p[0], 10), parseInt(p[1], 10) - 1, parseInt(p[2], 10));
  }

  function addDaysStr(dateStr, n) {
    var d = parseDateStr(dateStr);
    d.setDate(d.getDate() + n);
    return todayStr(d);
  }

  function compareDateStr(a, b) {
    if (a === b) return 0;
    return a < b ? -1 : 1;
  }

  function daysBetween(a, b) {
    var da = parseDateStr(a).getTime();
    var db = parseDateStr(b).getTime();
    return Math.round((db - da) / MS_DAY);
  }

  function defaultState() {
    return {
      v: STATE_VERSION,
      dailyGoal: 3,
      pendingGoal: null,
      soundOn: true,
      firstRunDone: false,
      streak: 0,
      best: 0,
      freezes: 0,
      lastSeenDate: null,
      freezeEarnProgress: 0,
      dayRecords: {},
      answerDedup: {},
      repair: null,
      vacation: null,
      notices: {},
      migratedFrom: null,
      migratedAt: null,
      lastProcessedDate: null,
      maxTimestampSeen: 0,
      repairUses: [],
      vacationUses: [],
      hadStreakBreak: false,
      lastProcessWallMs: 0
    };
  }

  function normalizeDayRecord(rec) {
    if (!rec || typeof rec !== 'object') rec = {};
    return {
      answers: Math.max(0, parseInt(rec.answers, 10) || 0),
      met: !!rec.met,
      celebrated: !!rec.celebrated,
      streakAwarded: !!rec.streakAwarded,
      kind: rec.kind || 'normal'
    };
  }

  function normalizeState(raw) {
    if (!raw || typeof raw !== 'object') return defaultState();
    var s = defaultState();
    if (raw.v !== STATE_VERSION) return s;
    s.dailyGoal = GOAL_CHOICES.indexOf(raw.dailyGoal) >= 0 ? raw.dailyGoal : 3;
    s.pendingGoal =
      raw.pendingGoal && GOAL_CHOICES.indexOf(raw.pendingGoal.goal) >= 0
        ? { goal: raw.pendingGoal.goal, fromDate: String(raw.pendingGoal.fromDate || '') }
        : null;
    s.soundOn = raw.soundOn !== false;
    s.firstRunDone = !!raw.firstRunDone;
    s.streak = Math.max(0, parseInt(raw.streak, 10) || 0);
    s.best = Math.max(s.streak, Math.max(0, parseInt(raw.best, 10) || 0));
    s.freezes = Math.min(2, Math.max(0, parseInt(raw.freezes, 10) || 0));
    s.lastSeenDate = raw.lastSeenDate ? String(raw.lastSeenDate) : null;
    s.freezeEarnProgress = Math.max(0, Math.min(6, parseInt(raw.freezeEarnProgress, 10) || 0));
    s.dayRecords = {};
    if (raw.dayRecords && typeof raw.dayRecords === 'object') {
      Object.keys(raw.dayRecords).forEach(function (k) {
        s.dayRecords[k] = normalizeDayRecord(raw.dayRecords[k]);
      });
    }
    s.answerDedup = raw.answerDedup && typeof raw.answerDedup === 'object' ? Object.assign({}, raw.answerDedup) : {};
    s.repair = raw.repair && typeof raw.repair === 'object' ? Object.assign({}, raw.repair) : null;
    s.vacation = raw.vacation && typeof raw.vacation === 'object' ? Object.assign({}, raw.vacation) : null;
    s.notices = raw.notices && typeof raw.notices === 'object' ? Object.assign({}, raw.notices) : {};
    s.migratedFrom = raw.migratedFrom || null;
    s.migratedAt = raw.migratedAt || null;
    s.lastProcessedDate = raw.lastProcessedDate ? String(raw.lastProcessedDate) : null;
    s.maxTimestampSeen = Math.max(0, parseInt(raw.maxTimestampSeen, 10) || 0);
    s.repairUses = Array.isArray(raw.repairUses) ? raw.repairUses.slice() : [];
    s.vacationUses = Array.isArray(raw.vacationUses) ? raw.vacationUses.slice() : [];
    s.hadStreakBreak = !!raw.hadStreakBreak;
    s.lastProcessWallMs = parseInt(raw.lastProcessWallMs, 10) || 0;
    return s;
  }

  function readRaw() {
    var ls = deps.getLocalStorage();
    if (!ls) return null;
    try {
      return ls.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function loadState() {
    var raw = readRaw();
    if (!raw) {
      var s = defaultState();
      migrateFromLegacy(s);
      return s;
    }
    try {
      var parsed = JSON.parse(raw);
      if (!parsed || parsed.v !== STATE_VERSION) {
        storeCorruptOnce(raw);
        return defaultState();
      }
      var s = normalizeState(parsed);
      if (!s.migratedFrom && !deps.getLocalStorage().getItem(STORAGE_CORRUPT)) {
        migrateFromLegacy(s);
      }
      return s;
    } catch (e) {
      storeCorruptOnce(raw);
      return defaultState();
    }
  }

  function storeCorruptOnce(raw) {
    var ls = deps.getLocalStorage();
    if (!ls) return;
    try {
      if (!ls.getItem(STORAGE_CORRUPT)) ls.setItem(STORAGE_CORRUPT, raw);
    } catch (err) {}
  }

  function writesBlocked() {
    return typeof window !== 'undefined' && window.cloudCramStorageWritesBlocked && window.cloudCramStorageWritesBlocked();
  }

  function persistState(state) {
    if (writesBlocked()) return;
    var ls = deps.getLocalStorage();
    if (!ls) return;
    try {
      ls.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {}
  }

  function dedupeNumericList(list) {
    var seen = Object.create(null);
    var out = [];
    (list || []).forEach(function (item) {
      var key =
        typeof item === 'object' && item !== null
          ? String(item.at) + ':' + String(item.days || '')
          : String(item);
      if (seen[key]) return;
      seen[key] = true;
      out.push(item);
    });
    return out;
  }

  function mergeStates(a, b) {
    var base = normalizeState(a);
    var other = normalizeState(b);
    var out = normalizeState(base);
    out.streak = Math.max(base.streak, other.streak);
    out.best = Math.max(base.best, other.best, out.streak);
    out.freezes = Math.min(base.freezes, other.freezes);
    out.freezeEarnProgress = Math.max(base.freezeEarnProgress, other.freezeEarnProgress);
    if (other.dailyGoal) out.dailyGoal = other.dailyGoal;
    if (other.pendingGoal) out.pendingGoal = other.pendingGoal;
    out.maxTimestampSeen = Math.max(base.maxTimestampSeen, other.maxTimestampSeen);
    if (other.lastSeenDate && (!out.lastSeenDate || compareDateStr(other.lastSeenDate, out.lastSeenDate) > 0)) {
      out.lastSeenDate = other.lastSeenDate;
    }
    Object.keys(other.dayRecords).forEach(function (day) {
      var da = normalizeDayRecord(out.dayRecords[day]);
      var db = normalizeDayRecord(other.dayRecords[day]);
      out.dayRecords[day] = {
        answers: Math.max(da.answers, db.answers),
        met: da.met || db.met,
        celebrated: da.celebrated || db.celebrated,
        streakAwarded: da.streakAwarded || db.streakAwarded,
        kind: da.kind !== 'normal' ? da.kind : db.kind
      };
    });
    out.answerDedup = Object.assign({}, base.answerDedup, other.answerDedup);
    out.firstRunDone = base.firstRunDone || other.firstRunDone;
    out.soundOn = base.soundOn && other.soundOn;
    if (other.pendingGoal) out.pendingGoal = other.pendingGoal;
    if (base.repair && other.repair) {
      out.repair =
        (other.repair.openedAt || 0) >= (base.repair.openedAt || 0) ? other.repair : base.repair;
    } else {
      out.repair = base.repair || other.repair || null;
    }
    if (other.vacation) out.vacation = other.vacation;
    out.notices = Object.assign({}, base.notices, other.notices);
    if (other.migratedFrom && !out.migratedFrom) {
      out.migratedFrom = other.migratedFrom;
      out.migratedAt = other.migratedAt;
    }
    if (other.lastProcessedDate && out.lastProcessedDate) {
      out.lastProcessedDate =
        compareDateStr(other.lastProcessedDate, out.lastProcessedDate) > 0
          ? other.lastProcessedDate
          : out.lastProcessedDate;
    } else if (other.lastProcessedDate) {
      out.lastProcessedDate = other.lastProcessedDate;
    }
    out.repairUses = dedupeNumericList((base.repairUses || []).concat(other.repairUses || []));
    out.vacationUses = dedupeNumericList((base.vacationUses || []).concat(other.vacationUses || []));
    out.hadStreakBreak = base.hadStreakBreak || other.hadStreakBreak;
    return out;
  }

  var writeQueue = Promise.resolve();

  function runWrite(mutator) {
    var current = loadState();
    var fresh = readRaw();
    if (fresh) {
      try {
        var parsed = JSON.parse(fresh);
        if (parsed && parsed.v === STATE_VERSION) {
          current = mergeStates(current, normalizeState(parsed));
        }
      } catch (e) {}
    }
    var next = mutator(current);
    if (next) persistState(next);
    return next;
  }

  function withLockedWrite(mutator) {
    function enqueue() {
      writeQueue = writeQueue.then(function () {
        return Promise.resolve(runWrite(mutator));
      });
      return writeQueue;
    }
    if (deps.locks && deps.locks.request) {
      return deps.locks.request(LOCK_NAME, function () {
        return enqueue();
      });
    }
    return enqueue();
  }

  function syncWrite(mutator) {
    return runWrite(mutator);
  }

  function effectiveToday(state, now) {
    var actual = todayStr(new Date(now || deps.now()));
    if (state.lastSeenDate && compareDateStr(actual, state.lastSeenDate) < 0) {
      return state.lastSeenDate;
    }
    return actual;
  }

  function observeDate(state, now) {
    var actual = todayStr(new Date(now || deps.now()));
    if (!state.lastSeenDate || compareDateStr(actual, state.lastSeenDate) > 0) {
      state.lastSeenDate = actual;
    }
    var ts = now || deps.now();
    if (ts > state.maxTimestampSeen) state.maxTimestampSeen = ts;
    return effectiveToday(state, now);
  }

  function goalForDate(state, dateStr) {
    if (state.pendingGoal && compareDateStr(dateStr, state.pendingGoal.fromDate) >= 0) {
      return state.pendingGoal.goal;
    }
    return state.dailyGoal;
  }

  function isVacationDay(state, dateStr) {
    if (!state.vacation || !state.vacation.start || !state.vacation.end) return false;
    return compareDateStr(dateStr, state.vacation.start) >= 0 && compareDateStr(dateStr, state.vacation.end) <= 0;
  }

  function ensureDay(state, dateStr) {
    if (!state.dayRecords[dateStr]) {
      state.dayRecords[dateStr] = normalizeDayRecord(null);
    }
    return state.dayRecords[dateStr];
  }

  function markDayKind(state, dateStr, kind) {
    var rec = ensureDay(state, dateStr);
    if (rec.kind === 'normal' || kind === 'frozen' || kind === 'repaired' || kind === 'vacation') {
      rec.kind = kind;
    }
  }

  function repairAllowedNow(state, now) {
    var ts = now || deps.now();
    var cutoff = ts - REPAIR_COOLDOWN_MS;
    var uses = state.repairUses || [];
    for (var i = 0; i < uses.length; i++) {
      if (uses[i] > cutoff) return false;
    }
    return true;
  }

  function effectiveNow(state, now) {
    now = now || deps.now();
    var maxTs = state.maxTimestampSeen || 0;
    if (state.repair && state.repair.maxNow) maxTs = Math.max(maxTs, state.repair.maxNow);
    return Math.max(now, maxTs);
  }

  function expireRepairIfNeeded(state, now) {
    if (!state.repair || !state.repair.openedAt) return;
    var opened = state.repair.openedAt;
    var elapsed = effectiveNow(state, now) - opened;
    if (elapsed > REPAIR_OFFER_MS + REPAIR_WINDOW_MS) {
      state.repair = null;
    }
  }

  function processMissedDay(state, dateStr, now) {
    if (isVacationDay(state, dateStr)) {
      markDayKind(state, dateStr, 'vacation');
      return;
    }
    var rec = ensureDay(state, dateStr);
    if (rec.met || rec.kind === 'frozen' || rec.kind === 'repaired' || rec.kind === 'vacation') {
      return;
    }
    if (state.freezes > 0) {
      state.freezes -= 1;
      rec.kind = 'frozen';
      state.notices.freezeSavedYesterday = true;
      return;
    }
    if (!state.repair && repairAllowedNow(state, now)) {
      state.repair = {
        openedAt: now || deps.now(),
        streakAtBreak: state.streak,
        metDays: [],
        missedDay: dateStr,
        maxNow: state.maxTimestampSeen
      };
      state.repairUses.push(now || deps.now());
    }
    state.streak = 0;
    state.freezeEarnProgress = 0;
    state.hadStreakBreak = true;
    rec.kind = 'missed';
  }

  function yesterdayStrFrom(now) {
    var d = new Date(now || deps.now());
    d.setDate(d.getDate() - 1);
    return todayStr(d);
  }

  function processCalendar(state, now) {
    now = now || deps.now();
    expireRepairIfNeeded(state, now);
    var today = observeDate(state, now);
    if (state.lastProcessedDate == null) {
      state.lastProcessedDate = today;
      state.lastProcessWallMs = now;
      return today;
    }
    if (compareDateStr(today, state.lastProcessedDate) > 0) {
      var d = state.lastProcessedDate;
      while (compareDateStr(d, today) < 0) {
        processMissedDay(state, d, now);
        d = addDaysStr(d, 1);
      }
    }
    state.lastProcessedDate = today;
    state.lastProcessWallMs = now;
    return today;
  }

  function awardFreezeIfEarned(state) {
    if (state.freezeEarnProgress >= 7) {
      if (state.freezes < 2) state.freezes += 1;
      state.freezeEarnProgress = 0;
    }
  }

  function onGoalMet(state, dateStr) {
    var rec = ensureDay(state, dateStr);
    if (rec.met) return;
    rec.met = true;
    if (isVacationDay(state, dateStr)) {
      markDayKind(state, dateStr, 'vacation');
      return;
    }
    if (!rec.streakAwarded) {
      rec.streakAwarded = true;
      state.streak += 1;
      if (state.streak > state.best) state.best = state.streak;
      if (rec.kind === 'normal' || rec.kind === 'repaired' || rec.kind === 'missed') {
        state.freezeEarnProgress += 1;
        awardFreezeIfEarned(state);
      }
    }
    if (state.repair && state.repair.openedAt) {
      var opened = state.repair.openedAt;
      var elapsed = effectiveNow(state, deps.now()) - opened;
      if (elapsed <= REPAIR_WINDOW_MS) {
        if (state.repair.metDays.indexOf(dateStr) < 0) {
          state.repair.metDays.push(dateStr);
        }
        if (state.repair.metDays.length >= 2) {
          var restore = state.repair.streakAtBreak || 0;
          state.streak = restore;
          if (state.streak > state.best) state.best = state.streak;
          if (state.repair.missedDay) {
            markDayKind(state, state.repair.missedDay, 'repaired');
          }
          state.repairUses.push(effectiveNow(state, deps.now()));
          state.repair = null;
        }
      }
    }
  }

  function migrateFromLegacy(state) {
    if (state.migratedFrom) return state;
    var ls = deps.getLocalStorage();
    if (!ls) return state;
    try {
      var streakRaw = ls.getItem(OLD_STREAK_KEY);
      var lastRaw = ls.getItem(OLD_LAST_DATE_KEY);
      if (streakRaw == null && lastRaw == null) return state;
      var streak = Math.max(0, parseInt(streakRaw || '0', 10) || 0);
      state.streak = streak;
      state.best = Math.max(state.best, streak);
      if (lastRaw) {
        state.lastSeenDate = String(lastRaw);
        var y = yesterdayStrFrom(deps.now());
        if (compareDateStr(String(lastRaw), y) >= 0) {
          state.lastProcessedDate = todayStr(new Date(deps.now()));
        } else {
          state.lastProcessedDate = String(lastRaw);
        }
      }
      state.firstRunDone = true;
      state.migratedFrom = 'study_streak_v0';
      state.migratedAt = deps.now();
      return state;
    } catch (e) {
      return state;
    }
  }

  function getTodayProgress(state, now) {
    var today = observeDate(state, now);
    processCalendar(state, now);
    var rec = ensureDay(state, today);
    var goal = goalForDate(state, today);
    return {
      today: today,
      answers: rec.answers,
      goal: goal,
      met: rec.met,
      celebrated: rec.celebrated
    };
  }

  function recordAnswer(sessionId, questionId) {
    if (!sessionId || !questionId) return Promise.resolve(null);
    return withLockedWrite(function (state) {
      var now = deps.now();
      var today = processCalendar(state, now);
      var key = today + ':' + String(sessionId) + ':' + String(questionId);
      if (state.answerDedup[key]) return state;
      state.answerDedup[key] = true;
      var rec = ensureDay(state, today);
      rec.answers = Object.keys(state.answerDedup).filter(function (k) {
        return k.indexOf(today + ':') === 0;
      }).length;
      var goal = goalForDate(state, today);
      if (rec.answers >= goal) {
        onGoalMet(state, today);
      }
      return state;
    }).then(function (state) {
      if (state) {
        var snap = getSnapshot();
        if (snap.met && !snap.celebrated) {
          maybeCelebrate(snap);
        }
      }
      notifyUi();
      return state;
    });
  }

  function maybeCelebrate(snap) {
    if (typeof document === 'undefined') return;
    if (prefersReducedMotion()) {
      markCelebrated();
      return;
    }
    var existing = document.getElementById('game-celebrate-banner');
    if (existing) return;
    var banner = document.createElement('div');
    banner.id = 'game-celebrate-banner';
    banner.className = 'game-neutral-banner';
    banner.setAttribute('role', 'status');
    banner.textContent = 'Daily goal complete. Keep going?';
    var keep = document.createElement('button');
    keep.type = 'button';
    keep.className = 'game-start-btn';
    keep.style.marginLeft = '0.75rem';
    keep.textContent = 'Keep going';
    keep.addEventListener('click', function () {
      banner.remove();
    });
    banner.appendChild(keep);
    var host = document.getElementById('game-launcher') || document.body;
    host.insertBefore(banner, host.firstChild);
    markCelebrated();
  }

  function markCelebrated() {
    return withLockedWrite(function (state) {
      var today = processCalendar(state, deps.now());
      var rec = ensureDay(state, today);
      rec.celebrated = true;
      return state;
    }).then(notifyUi);
  }

  function setDailyGoal(goal, opts) {
    goal = parseInt(goal, 10);
    if (GOAL_CHOICES.indexOf(goal) < 0) return Promise.resolve({ ok: false });
    opts = opts || {};
    return withLockedWrite(function (state) {
      var today = processCalendar(state, deps.now());
      var rec = ensureDay(state, today);
      var currentGoal = goalForDate(state, today);
      if (rec.met && goal !== currentGoal) {
        state.pendingGoal = { goal: goal, fromDate: addDaysStr(today, 1) };
        return state;
      }
      state.dailyGoal = goal;
      state.pendingGoal = null;
      if (rec.answers >= goal) onGoalMet(state, today);
      return state;
    }).then(function () {
      notifyUi();
      var pending = loadState().pendingGoal;
      return {
        ok: true,
        message: pending ? 'Your new goal starts tomorrow' : null
      };
    });
  }

  function completeFirstRun(options) {
    options = options || {};
    return withLockedWrite(function (state) {
      state.firstRunDone = true;
      if (options.goal) state.dailyGoal = options.goal;
      if (options.soundOn === false) state.soundOn = false;
      return state;
    }).then(notifyUi);
  }

  function startVacation(days) {
    days = parseInt(days, 10);
    if (days < 1 || days > VACATION_MAX_DAYS) return Promise.resolve({ ok: false, error: 'invalid_days' });
    return withLockedWrite(function (state) {
      var now = deps.now();
      var yearAgo = now - 365 * MS_DAY;
      var uses = (state.vacationUses || []).filter(function (u) {
        return u.at > yearAgo;
      });
      if (uses.length >= VACATION_MAX_USES_PER_YEAR) return null;
      var today = processCalendar(state, now);
      if (state.vacation && state.vacation.end && compareDateStr(today, state.vacation.end) <= 0) {
        return null;
      }
      var end = addDaysStr(today, days - 1);
      state.vacation = { start: today, end: end, days: days };
      state.vacationUses = uses.concat([{ at: now, days: days }]);
      return state;
    }).then(function (state) {
      if (!state) return { ok: false, error: 'limit' };
      notifyUi();
      return { ok: true };
    });
  }

  function endVacationEarly() {
    return withLockedWrite(function (state) {
      if (!state.vacation) return state;
      var today = observeDate(state, deps.now());
      state.vacation.end = addDaysStr(today, -1);
      if (compareDateStr(state.vacation.end, state.vacation.start) < 0) {
        state.vacation = null;
      }
      return state;
    }).then(notifyUi);
  }

  function getSnapshot() {
    var state = loadState();
    processCalendar(state, deps.now());
    var prog = getTodayProgress(state, deps.now());
    return {
      streak: state.streak,
      best: state.best,
      freezes: state.freezes,
      dailyGoal: state.dailyGoal,
      pendingGoal: state.pendingGoal,
      soundOn: state.soundOn,
      firstRunDone: state.firstRunDone,
      today: prog.today,
      answers: prog.answers,
      goal: prog.goal,
      met: prog.met,
      celebrated: prog.celebrated,
      repair: state.repair,
      vacation: state.vacation,
      notices: Object.assign({}, state.notices),
      migratedFrom: state.migratedFrom
    };
  }

  function consumeNotice(name) {
    return withLockedWrite(function (state) {
      if (state.notices[name]) {
        delete state.notices[name];
      }
      return state;
    });
  }

  function repairOfferActive(state, now) {
    if (!state || !state.repair || !state.repair.openedAt) return false;
    now = now || deps.now();
    var opened = state.repair.openedAt;
    var effectiveNow = Math.max(now, state.maxTimestampSeen, state.repair.maxNow || 0);
    return effectiveNow - opened <= REPAIR_OFFER_MS;
  }

  function notifyUi() {
    uiListeners.forEach(function (fn) {
      try {
        fn();
      } catch (e) {}
    });
  }

  function onUiRefresh(fn) {
    if (typeof fn === 'function') uiListeners.push(fn);
  }

  function scheduleMidnightRefresh() {
    if (midnightTimer) clearTimeout(midnightTimer);
    var now = new Date(deps.now());
    var next = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 1);
    var ms = next.getTime() - now.getTime();
    midnightTimer = setTimeout(function () {
      withLockedWrite(function (state) {
        processCalendar(state, deps.now());
        return state;
      }).then(function () {
        notifyUi();
        scheduleMidnightRefresh();
      });
    }, ms);
  }

  function initStorageListener() {
    if (!deps.storageEventTarget) return;
    deps.storageEventTarget.addEventListener('storage', function (ev) {
      if (ev.key === STORAGE_KEY) notifyUi();
    });
  }

  /* --- DOM UI (text nodes only) --- */

  function prefersReducedMotion() {
    return (
      typeof matchMedia === 'function' &&
      matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }

  function injectStyles() {
    if (typeof document === 'undefined') return;
    if (document.getElementById('gamification-styles')) return;
    var style = document.createElement('style');
    style.id = 'gamification-styles';
    style.textContent = [
      '.game-launcher { display: flex; flex-wrap: wrap; align-items: center; gap: 1rem; margin: 1.25rem 0; }',
      '.game-goal-ring { position: relative; width: 88px; height: 88px; min-width: 88px; min-height: 88px; }',
      '.game-goal-ring svg { width: 100%; height: 100%; transform: rotate(-90deg); }',
      '.game-goal-ring .ring-track { fill: none; stroke: rgba(148,163,184,0.25); stroke-width: 8; }',
      '.game-goal-ring .ring-fill { fill: none; stroke: var(--accent, #64748b); stroke-width: 8; stroke-linecap: round; transition: stroke-dashoffset 0.4s ease; }',
      '.game-goal-ring.no-motion .ring-fill { transition: none; }',
      '.game-goal-center { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; font-size: 0.75rem; color: var(--text-muted); text-align: center; padding: 0.25rem; }',
      '.game-goal-center strong { font-size: 1.1rem; color: var(--text); }',
      '.game-start-btn { min-height: 44px; min-width: 44px; padding: 0.65rem 1.1rem; border-radius: 8px; border: none; background: var(--accent); color: #fff; font-family: inherit; cursor: pointer; font-size: 0.95rem; }',
      '.game-streak-chip { display: inline-flex; align-items: center; gap: 0.35rem; min-height: 44px; padding: 0.35rem 0.75rem; border-radius: 999px; background: var(--surface); border: 1px solid rgba(148,163,184,0.25); cursor: pointer; font-size: 0.9rem; }',
      '.game-streak-expand { width: 100%; margin-top: 0.5rem; }',
      '.game-week-dots { display: flex; gap: 0.35rem; list-style: none; padding: 0; flex-wrap: wrap; }',
      '.game-week-dots li { width: 12px; height: 12px; border-radius: 50%; background: rgba(148,163,184,0.35); }',
      '.game-week-dots li.met { background: var(--accent); }',
      '.game-week-dots li.ice { background: #7dd3fc; }',
      '.game-neutral-banner { margin: 0.75rem 0; padding: 0.75rem 1rem; background: var(--surface); border-radius: 8px; color: var(--text-muted); font-size: 0.9rem; }',
      '.game-first-run-overlay { position: fixed; inset: 0; z-index: 10050; background: rgba(15,20,25,0.85); display: flex; align-items: center; justify-content: center; padding: 1rem; }',
      '.game-first-run-dialog { background: var(--surface); border-radius: 12px; padding: 1.25rem; max-width: 360px; width: 100%; }',
      '.game-goal-choices { display: flex; flex-wrap: wrap; gap: 0.5rem; margin: 1rem 0; }',
      '.game-goal-choices button { min-height: 44px; min-width: 44px; padding: 0.5rem 0.75rem; border-radius: 8px; border: 1px solid rgba(148,163,184,0.35); background: transparent; color: var(--text); cursor: pointer; }',
      '.game-goal-choices button.selected { border-color: var(--accent); background: rgba(100,116,139,0.2); }',
      '.game-first-run-actions { display: flex; gap: 0.75rem; flex-wrap: wrap; }',
      '.game-first-run-actions button { min-height: 44px; min-width: 44px; padding: 0.5rem 1rem; border-radius: 8px; cursor: pointer; font-family: inherit; }',
      '.game-quiz-goal { font-variant-numeric: tabular-nums; }',
      '.settings-block-game { margin-top: 1rem; }',
      '.game-sound-toggle, .game-vacation-row { margin-top: 0.75rem; }',
      '.game-sound-toggle label, .game-vacation-row label { display: flex; align-items: center; gap: 0.5rem; min-height: 44px; cursor: pointer; }',
      '.visually-hidden { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); border: 0; }'
    ].join('\n');
    document.head.appendChild(style);
  }

  function renderGoalRing(container, snap) {
    container.textContent = '';
    var wrap = document.createElement('div');
    wrap.className = 'game-goal-ring' + (prefersReducedMotion() ? ' no-motion' : '');
    wrap.setAttribute('role', 'img');
    wrap.setAttribute(
      'aria-label',
      'Daily goal ' + snap.answers + ' of ' + snap.goal + ' questions'
    );
    var pct = snap.goal > 0 ? Math.min(1, snap.answers / snap.goal) : 0;
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 100 100');
    var track = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    track.setAttribute('class', 'ring-track');
    track.setAttribute('cx', '50');
    track.setAttribute('cy', '50');
    track.setAttribute('r', '42');
    var fill = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    fill.setAttribute('class', 'ring-fill');
    fill.setAttribute('cx', '50');
    fill.setAttribute('cy', '50');
    fill.setAttribute('r', '42');
    var circ = 2 * Math.PI * 42;
    fill.setAttribute('stroke-dasharray', String(circ));
    fill.setAttribute('stroke-dashoffset', String(circ * (1 - pct)));
    svg.appendChild(track);
    svg.appendChild(fill);
    var center = document.createElement('div');
    center.className = 'game-goal-center';
    var strong = document.createElement('strong');
    strong.textContent = String(snap.answers) + '/' + String(snap.goal);
    center.appendChild(strong);
    center.appendChild(document.createTextNode('today'));
    wrap.appendChild(svg);
    wrap.appendChild(center);
    container.appendChild(wrap);
  }

  function renderLauncher() {
    if (typeof document === 'undefined') return;
    var host = document.getElementById('game-launcher');
    if (!host) return;
    var snap = getSnapshot();
    host.textContent = '';
    var row = document.createElement('div');
    row.className = 'game-launcher';
    var ringHost = document.createElement('div');
    renderGoalRing(ringHost, snap);
    var startBtn = document.createElement('button');
    startBtn.type = 'button';
    startBtn.className = 'game-start-btn';
    var remaining = Math.max(0, snap.goal - snap.answers);
    startBtn.textContent =
      remaining > 0 ? 'Start ' + remaining + ' question' + (remaining === 1 ? '' : 's') : 'Keep going';
    startBtn.addEventListener('click', function () {
      var link = document.querySelector('#quiz-sortable-list .quiz-card');
      if (link) link.focus();
      if (link && link.href) window.location.href = link.getAttribute('href') || link.href;
    });
    var chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'game-streak-chip';
    chip.setAttribute(
      'aria-label',
      snap.streak + '-day streak' + (snap.freezes ? ', ' + snap.freezes + ' freeze' + (snap.freezes === 1 ? '' : 's') : '')
    );
    chip.appendChild(document.createTextNode('\uD83D\uDD25 ' + String(snap.streak)));
    var expand = document.createElement('div');
    expand.className = 'game-streak-expand hidden';
    expand.id = 'game-streak-expand';
    chip.addEventListener('click', function () {
      expand.classList.toggle('hidden');
    });
    row.appendChild(ringHost);
    row.appendChild(startBtn);
    row.appendChild(chip);
    host.appendChild(row);
    host.appendChild(expand);
    renderWeekDots(expand, snap);
    renderBanners(host, snap);
  }

  function renderWeekDots(container, snap) {
    container.textContent = '';
    var list = document.createElement('ul');
    list.className = 'game-week-dots';
    list.setAttribute('aria-label', 'Last 7 days');
    var today = snap.today;
    for (var i = 6; i >= 0; i--) {
      var d = addDaysStr(today, -i);
      var li = document.createElement('li');
      var state = loadState();
      var rec = state.dayRecords[d] || {};
      if (rec.kind === 'frozen' || rec.kind === 'repaired' || rec.kind === 'vacation') li.className = 'ice';
      else if (rec.met) li.className = 'met';
      list.appendChild(li);
    }
    container.appendChild(list);
  }

  function renderBanners(host, snap) {
    if (snap.notices && snap.notices.freezeSavedYesterday) {
      var n = document.createElement('p');
      n.className = 'game-neutral-banner';
      n.textContent = 'A freeze saved your streak yesterday.';
      host.appendChild(n);
      consumeNotice('freezeSavedYesterday');
    }
    if (repairOfferActive(loadState())) {
      var r = document.createElement('p');
      r.className = 'game-neutral-banner';
      var atBreak = (loadState().repair && loadState().repair.streakAtBreak) || snap.streak;
      r.textContent = 'Repair your ' + atBreak + '-day streak';
      host.appendChild(r);
    }
    var st = loadState();
    if (
      snap.streak === 0 &&
      !snap.met &&
      !repairOfferActive(st) &&
      (st.hadStreakBreak || Object.keys(st.dayRecords).some(function (k) {
        return st.dayRecords[k].kind === 'missed';
      }))
    ) {
      var w = document.createElement('p');
      w.className = 'game-neutral-banner';
      w.textContent = 'Welcome back. ' + snap.goal + ' questions gets you going again.';
      host.appendChild(w);
    }
  }

  function renderQuizBar() {
    if (typeof document === 'undefined') return;
    var el = document.getElementById('session-streak');
    if (!el) return;
    var snap = getSnapshot();
    el.textContent = '';
    var goalSpan = document.createElement('span');
    goalSpan.className = 'game-quiz-goal';
    goalSpan.textContent = snap.answers + '/' + snap.goal;
    goalSpan.setAttribute('aria-label', 'Daily goal ' + snap.answers + ' of ' + snap.goal + ' questions');
    el.appendChild(goalSpan);
    if (snap.streak > 0) {
      el.appendChild(document.createTextNode(' \u2022 '));
      var st = document.createElement('span');
      st.textContent = String(snap.streak) + '-day streak';
      el.appendChild(st);
    }
  }

  function showFirstRunIfNeeded() {
    if (typeof document === 'undefined') return;
    var snap = getSnapshot();
    if (snap.firstRunDone || snap.migratedFrom) return;
    injectStyles();
    var overlay = document.createElement('div');
    overlay.className = 'game-first-run-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'game-first-run-title');
    var dialog = document.createElement('div');
    dialog.className = 'game-first-run-dialog';
    var title = document.createElement('h2');
    title.id = 'game-first-run-title';
    title.textContent = 'Daily goal';
    var hint = document.createElement('p');
    hint.textContent = 'Pick how many questions count as a study day.';
    var choices = document.createElement('div');
    choices.className = 'game-goal-choices';
    var selected = 3;
    GOAL_CHOICES.forEach(function (g) {
      var b = document.createElement('button');
      b.type = 'button';
      b.textContent = String(g);
      if (g === 3) b.className = 'selected';
      b.addEventListener('click', function () {
        selected = g;
        choices.querySelectorAll('button').forEach(function (btn) {
          btn.classList.toggle('selected', parseInt(btn.textContent, 10) === g);
        });
      });
      choices.appendChild(b);
    });
    var actions = document.createElement('div');
    actions.className = 'game-first-run-actions';
    var start = document.createElement('button');
    start.type = 'button';
    start.textContent = 'Start';
    start.addEventListener('click', function () {
      completeFirstRun({ goal: selected, soundOn: true }).then(function () {
        overlay.remove();
      });
    });
    var skip = document.createElement('button');
    skip.type = 'button';
    skip.textContent = 'Skip';
    skip.addEventListener('click', function () {
      completeFirstRun({ goal: 3, soundOn: true }).then(function () {
        overlay.remove();
      });
    });
    actions.appendChild(start);
    actions.appendChild(skip);
    dialog.appendChild(title);
    dialog.appendChild(hint);
    dialog.appendChild(choices);
    dialog.appendChild(actions);
    overlay.appendChild(dialog);
    document.body.appendChild(overlay);
    start.focus();
  }

  function wireSettingsPanel() {
    if (typeof document === 'undefined') return;
    var panel = document.getElementById('settings-panel');
    if (!panel || document.getElementById('game-settings-block')) return;
    injectStyles();
    var block = document.createElement('div');
    block.className = 'settings-block settings-block-game';
    block.id = 'game-settings-block';
    var h = document.createElement('h3');
    h.className = 'settings-subheading';
    h.textContent = 'Daily goal';
    block.appendChild(h);
    var goalRow = document.createElement('div');
    goalRow.className = 'game-goal-choices';
    GOAL_CHOICES.forEach(function (g) {
      var b = document.createElement('button');
      b.type = 'button';
      b.textContent = String(g);
      b.addEventListener('click', function () {
        setDailyGoal(g).then(function (res) {
          var status = document.getElementById('settings-status');
          if (status && res && res.message) status.textContent = res.message;
          if (status && res && res.ok && loadState().pendingGoal) {
            status.textContent = 'Your new goal starts tomorrow';
          }
          renderLauncher();
        });
      });
      goalRow.appendChild(b);
    });
    block.appendChild(goalRow);
    var sound = document.createElement('div');
    sound.className = 'game-sound-toggle';
    var soundLabel = document.createElement('label');
    var soundCb = document.createElement('input');
    soundCb.type = 'checkbox';
    soundCb.checked = getSnapshot().soundOn;
    soundCb.addEventListener('change', function () {
      withLockedWrite(function (state) {
        state.soundOn = soundCb.checked;
        return state;
      });
    });
    soundLabel.appendChild(soundCb);
    soundLabel.appendChild(document.createTextNode(' Sound effects'));
    sound.appendChild(soundLabel);
    block.appendChild(sound);
    var vac = document.createElement('div');
    vac.className = 'game-vacation-row';
    var vacLabel = document.createElement('label');
    vacLabel.appendChild(document.createTextNode('Vacation days (1–14) '));
    var vacInput = document.createElement('input');
    vacInput.type = 'number';
    vacInput.min = '1';
    vacInput.max = '14';
    vacInput.value = '7';
    vacInput.style.width = '4em';
    vacLabel.appendChild(vacInput);
    var vacBtn = document.createElement('button');
    vacBtn.type = 'button';
    vacBtn.textContent = 'Start vacation';
    vacBtn.style.marginLeft = '0.5rem';
    vacBtn.addEventListener('click', function () {
      startVacation(parseInt(vacInput.value, 10)).then(function (res) {
        var status = document.getElementById('settings-status');
        if (status) {
          status.textContent = res.ok ? 'Vacation started' : 'Could not start vacation';
        }
      });
    });
    vac.appendChild(vacLabel);
    vac.appendChild(vacBtn);
    block.appendChild(vac);
    panel.insertBefore(block, panel.firstChild.nextSibling);
  }

  function initDom() {
    if (typeof document === 'undefined') return;
    injectStyles();
    syncWrite(function (state) {
      processCalendar(state, deps.now());
      return state;
    });
    onUiRefresh(function () {
      renderLauncher();
      renderQuizBar();
    });
    renderLauncher();
    renderQuizBar();
    showFirstRunIfNeeded();
    wireSettingsPanel();
    scheduleMidnightRefresh();
    initStorageListener();
  }

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initDom);
    } else {
      initDom();
    }
  }

  return {
    todayStr: todayStr,
    addDaysStr: addDaysStr,
    compareDateStr: compareDateStr,
    defaultState: defaultState,
    normalizeState: normalizeState,
    mergeStates: mergeStates,
    loadState: loadState,
    persistState: persistState,
    processCalendar: processCalendar,
    recordAnswer: recordAnswer,
    markCelebrated: markCelebrated,
    setDailyGoal: setDailyGoal,
    completeFirstRun: completeFirstRun,
    startVacation: startVacation,
    endVacationEarly: endVacationEarly,
    getSnapshot: getSnapshot,
    migrateFromLegacy: migrateFromLegacy,
    repairOfferActive: repairOfferActive,
    effectiveToday: effectiveToday,
    onGoalMet: onGoalMet,
    goalForDate: goalForDate,
    REPAIR_OFFER_MS: REPAIR_OFFER_MS,
    setDeps: function (overrides) {
      if (overrides.localStorage) deps._localStorage = overrides.localStorage;
      if (overrides.now) deps.now = overrides.now;
      if (overrides.locks !== undefined) deps.locks = overrides.locks;
      if (overrides.storageEventTarget !== undefined) {
        deps.storageEventTarget = overrides.storageEventTarget;
      }
    },
    getDeps: function () {
      return deps;
    },
    syncWrite: syncWrite,
    initDom: initDom,
    renderLauncher: renderLauncher,
    renderQuizBar: renderQuizBar
  };
});
