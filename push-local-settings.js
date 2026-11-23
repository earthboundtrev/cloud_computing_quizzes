/**
 * Schema for cloudcram_push_local_v1 — shared with #72, validated on read/import (#90).
 * Never stores push endpoints, auth tokens, or subscription identifiers.
 */
(function (root, factory) {
  var api = factory();
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
  root.CloudCramPushLocal = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  var STORAGE_KEY = 'cloudcram_push_local_v1';
  var DEFAULT_TIME = '19:00';
  var FORBIDDEN_KEYS = {
    endpoint: true,
    subscription: true,
    auth: true,
    token: true,
    keys: true,
    p256dh: true,
    vapid: true
  };

  function isPlainObject(v) {
    return !!v && typeof v === 'object' && !Array.isArray(v);
  }

  function hasForbiddenKey(obj) {
    if (!isPlainObject(obj)) return false;
    return Object.keys(obj).some(function (k) {
      var lower = k.toLowerCase();
      if (FORBIDDEN_KEYS[lower]) return true;
      if (lower.indexOf('endpoint') >= 0) return true;
      if (lower.indexOf('subscription') >= 0) return true;
      if (lower.indexOf('token') >= 0 && lower !== 'explicittime') return true;
      return false;
    });
  }

  function parseHourMinute(s) {
    if (typeof s !== 'string') return null;
    var m = /^(\d{1,2}):(\d{2})$/.exec(s.trim());
    if (!m) return null;
    var h = parseInt(m[1], 10);
    var min = parseInt(m[2], 10);
    if (!isFinite(h) || !isFinite(min) || h < 0 || h > 23 || min < 0 || min > 59) return null;
    return h * 60 + min;
  }

  function minutesToTime(mins) {
    var h = Math.floor(mins / 60);
    var m = mins % 60;
    return String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0');
  }

  function clampReminderMinutes(mins) {
    var lo = 8 * 60;
    var hi = 21 * 60 + 30;
    return Math.min(hi, Math.max(lo, mins));
  }

  function defaultSettings() {
    return {
      enabled: false,
      time: DEFAULT_TIME,
      streakNudgeEnabled: false,
      explicitTime: null,
      optInDismissCount: 0,
      lastOptInAskAt: 0,
      examDate: null,
      firstGoalMetAt: 0,
      permissionBannerAt: 0
    };
  }

  function normalizeSettings(raw) {
    var d = defaultSettings();
    if (!isPlainObject(raw) || hasForbiddenKey(raw)) return d;
    d.enabled = raw.enabled === true;
    d.streakNudgeEnabled = raw.streakNudgeEnabled === true;
    var parsed = parseHourMinute(raw.time);
    if (parsed == null) parsed = parseHourMinute(DEFAULT_TIME);
    parsed = clampReminderMinutes(parsed);
    d.time = minutesToTime(parsed);
    if (raw.explicitTime != null && raw.explicitTime !== '') {
      d.explicitTime = String(raw.explicitTime);
    }
    d.optInDismissCount = Math.max(0, Math.min(2, parseInt(raw.optInDismissCount, 10) || 0));
    d.lastOptInAskAt = Math.max(0, parseInt(raw.lastOptInAskAt, 10) || 0);
    d.firstGoalMetAt = Math.max(0, parseInt(raw.firstGoalMetAt, 10) || 0);
    d.permissionBannerAt = Math.max(0, parseInt(raw.permissionBannerAt, 10) || 0);
    if (raw.examDate && /^\d{4}-\d{2}-\d{2}$/.test(String(raw.examDate))) {
      d.examDate = String(raw.examDate);
    }
    return d;
  }

  function readSettings(localStorage) {
    var ls = localStorage;
    if (!ls && typeof localStorage !== 'undefined') ls = localStorage;
    if (!ls) return defaultSettings();
    try {
      var raw = ls.getItem(STORAGE_KEY);
      if (!raw) return defaultSettings();
      return normalizeSettings(JSON.parse(raw));
    } catch (e) {
      return defaultSettings();
    }
  }

  function writeSettings(localStorage, settings) {
    if (!localStorage) return false;
    try {
      var norm = normalizeSettings(settings);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(norm));
      return true;
    } catch (e2) {
      return false;
    }
  }

  function validateBroadcastPayload(obj) {
    if (!isPlainObject(obj) || hasForbiddenKey(obj)) return null;
    return normalizeSettings(obj);
  }

  return {
    STORAGE_KEY: STORAGE_KEY,
    DEFAULT_TIME: DEFAULT_TIME,
    defaultSettings: defaultSettings,
    normalizeSettings: normalizeSettings,
    readSettings: readSettings,
    writeSettings: writeSettings,
    validateBroadcastPayload: validateBroadcastPayload,
    parseHourMinute: parseHourMinute,
    minutesToTime: minutesToTime,
    clampReminderMinutes: clampReminderMinutes,
    hasForbiddenKey: hasForbiddenKey
  };
});