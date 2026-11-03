/**
 * Cross-tab localStorage read-modify-write: re-read inside navigator.locks,
 * merge BroadcastChannel deltas when disk view is stale across renderer processes.
 * window.CloudCramStorageMerge
 */
(function (root, factory) {
  var api = factory();
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
  root.CloudCramStorageMerge = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  var CHANNEL_NAME = 'cloudcram-storage-merge';
  var pendingGameAnswers = [];
  var pendingProfileAttempts = Object.create(null);
  var broadcastChannel = null;
  var testBroadcastFn = null;

  function initChannel() {
    if (broadcastChannel || testBroadcastFn) return;
    if (typeof BroadcastChannel === 'undefined') return;
    try {
      broadcastChannel = new BroadcastChannel(CHANNEL_NAME);
      broadcastChannel.onmessage = function (ev) {
        ingestMessage(ev.data);
      };
    } catch (e) {}
  }

  function ingestMessage(msg) {
    if (!msg || !msg.type) return;
    if (msg.type === 'game-answer') {
      pendingGameAnswers.push(msg);
      return;
    }
    if (msg.type === 'profile-attempt' && msg.storageKey && msg.attempt) {
      if (!pendingProfileAttempts[msg.storageKey]) pendingProfileAttempts[msg.storageKey] = [];
      pendingProfileAttempts[msg.storageKey].push(msg.attempt);
    }
  }

  function emitMessage(msg) {
    if (testBroadcastFn) {
      testBroadcastFn(msg);
      return;
    }
    initChannel();
    if (broadcastChannel) broadcastChannel.postMessage(msg);
  }

  function publishGameAnswer(today, sessionId, questionId) {
    if (!sessionId || !questionId) return;
    emitMessage({
      type: 'game-answer',
      today: String(today),
      sessionId: String(sessionId),
      questionId: String(questionId)
    });
  }

  function publishProfileAttempt(storageKey, attempt) {
    if (!storageKey || !attempt || !attempt.id) return;
    emitMessage({
      type: 'profile-attempt',
      storageKey: storageKey,
      attempt: attempt
    });
  }

  function drainGameAnswers() {
    var out = pendingGameAnswers.slice();
    pendingGameAnswers.length = 0;
    return out;
  }

  function drainProfileAttempts(storageKey) {
    var arr = pendingProfileAttempts[storageKey] || [];
    delete pendingProfileAttempts[storageKey];
    return arr.slice();
  }

  function mergeTopicStats(into, delta) {
    if (!delta) return into;
    Object.keys(delta).forEach(function (topic) {
      var d = delta[topic];
      if (!d) return;
      if (!into[topic]) into[topic] = { correct: 0, total: 0 };
      into[topic].total += d.total || 0;
      into[topic].correct += d.correct || 0;
    });
    return into;
  }

  function defaultProfile(quizId) {
    return {
      quizId: quizId || 'quiz',
      topicStats: {},
      topicMissesFromImports: {},
      sessionAttempts: {},
      appliedSessionAttempts: {}
    };
  }

  function ensureLegacySnapshot(profile) {
    if (!profile) return profile;
    profile.sessionAttempts = profile.sessionAttempts || {};
    profile.appliedSessionAttempts = profile.appliedSessionAttempts || {};
    if (Object.keys(profile.sessionAttempts).length > 0) return profile;
    if (!profile.topicStats || !Object.keys(profile.topicStats).length) return profile;
    profile.sessionAttempts.__legacy_snapshot__ = JSON.parse(JSON.stringify(profile.topicStats));
    profile.appliedSessionAttempts.__legacy_snapshot__ = true;
    return profile;
  }

  function parseProfile(raw, quizId) {
    if (!raw) return defaultProfile(quizId);
    try {
      var p = JSON.parse(raw);
      var profile = defaultProfile(p.quizId || quizId);
      profile.topicStats = p.topicStats || {};
      profile.topicMissesFromImports = p.topicMissesFromImports || {};
      profile.sessionAttempts = p.sessionAttempts || {};
      profile.appliedSessionAttempts = p.appliedSessionAttempts || {};
      profile.appliedImportBatches = p.appliedImportBatches || {};
      if (Array.isArray(p.mergedFrom)) profile.mergedFrom = p.mergedFrom.slice();
      return ensureLegacySnapshot(profile);
    } catch (e) {
      return defaultProfile(quizId);
    }
  }

  function rebuildTopicStatsFromAttempts(profile) {
    profile.topicStats = {};
    Object.keys(profile.sessionAttempts || {}).forEach(function (id) {
      mergeTopicStats(profile.topicStats, profile.sessionAttempts[id]);
    });
  }

  function applyProfileAttempt(profile, attempt) {
    if (!attempt || !attempt.id) return profile;
    profile = profile || defaultProfile();
    profile.sessionAttempts = profile.sessionAttempts || {};
    profile.appliedSessionAttempts = profile.appliedSessionAttempts || {};
    if (profile.appliedSessionAttempts[attempt.id]) return profile;
    profile.appliedSessionAttempts[attempt.id] = true;
    profile.sessionAttempts[attempt.id] = attempt.topicStats || {};
    rebuildTopicStatsFromAttempts(profile);
    return profile;
  }

  function mergeProfiles(a, b) {
    var out = defaultProfile((a && a.quizId) || (b && b.quizId));
    out.mergedFrom = [];
    if (a && Array.isArray(a.mergedFrom)) out.mergedFrom = out.mergedFrom.concat(a.mergedFrom);
    if (b && Array.isArray(b.mergedFrom)) {
      b.mergedFrom.forEach(function (m) {
        if (out.mergedFrom.indexOf(m) === -1) out.mergedFrom.push(m);
      });
    }
    out.appliedImportBatches = Object.assign(
      {},
      (a && a.appliedImportBatches) || {},
      (b && b.appliedImportBatches) || {}
    );
    out.sessionAttempts = Object.assign(
      {},
      (a && a.sessionAttempts) || {},
      (b && b.sessionAttempts) || {}
    );
    out.appliedSessionAttempts = Object.assign(
      {},
      (a && a.appliedSessionAttempts) || {},
      (b && b.appliedSessionAttempts) || {}
    );
    rebuildTopicStatsFromAttempts(out);
    var missTopics = Object.create(null);
    [a, b].forEach(function (side) {
      Object.keys((side && side.topicMissesFromImports) || {}).forEach(function (topic) {
        missTopics[topic] = true;
      });
    });
    Object.keys(missTopics).forEach(function (topic) {
      var av = (a && a.topicMissesFromImports && a.topicMissesFromImports[topic]) || 0;
      var bv = (b && b.topicMissesFromImports && b.topicMissesFromImports[topic]) || 0;
      out.topicMissesFromImports[topic] = Math.max(av, bv);
    });
    return out;
  }

  function writesBlocked() {
    return typeof window !== 'undefined' && window.cloudCramStorageWritesBlocked && window.cloudCramStorageWritesBlocked();
  }

  function runLocked(locks, lockName, fn) {
    if (locks && locks.request) {
      return locks.request(lockName, function () {
        return Promise.resolve(fn());
      });
    }
    return Promise.resolve(fn());
  }

  function persistProfile(localStorage, storageKey, profile) {
    if (writesBlocked()) return false;
    try {
      localStorage.setItem(storageKey, JSON.stringify(profile));
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * Idempotent session stats write (quiz-engine profile).
   */
  function writeProfileAttempt(opts) {
    opts = opts || {};
    var storageKey = opts.storageKey;
    var attempt = opts.attempt;
    var quizId = opts.quizId;
    var localStorage = opts.localStorage;
    if (!storageKey || !attempt || !localStorage) return null;

    if (!opts.skipPublish) publishProfileAttempt(storageKey, attempt);

    function readRaw() {
      try {
        return localStorage.getItem(storageKey);
      } catch (e) {
        return null;
      }
    }

    function doWrite() {
      var lastProfile = null;
      for (var i = 0; i < 8; i++) {
        var diskBefore = readRaw();
        var current = parseProfile(diskBefore, quizId);
        drainProfileAttempts(storageKey).forEach(function (a) {
          current = applyProfileAttempt(current, a);
        });
        current = applyProfileAttempt(current, attempt);
        lastProfile = current;
        var serialized = JSON.stringify(current);
        var diskMid = readRaw();
        if (diskMid !== diskBefore) {
          var midProfile = parseProfile(diskMid, quizId);
          current = mergeProfiles(midProfile, current);
          drainProfileAttempts(storageKey).forEach(function (a) {
            current = applyProfileAttempt(current, a);
          });
          serialized = JSON.stringify(current);
          lastProfile = current;
        }
        persistProfile(localStorage, storageKey, current);
        if (readRaw() === serialized) return current;
      }
      if (lastProfile) persistProfile(localStorage, storageKey, lastProfile);
      return lastProfile;
    }

    return doWrite();
  }

  function saveProfileAttempt(opts) {
    opts = opts || {};
    var lockName = opts.lockName || opts.storageKey;
    if (!opts.storageKey || !opts.attempt || !opts.localStorage) return Promise.resolve(null);
    if (opts.skipLock) return Promise.resolve(writeProfileAttempt(opts));
    return runLocked(opts.locks, lockName, function () {
      return writeProfileAttempt(opts);
    });
  }

  function mergeImportMisses(profile, topicMisses, importId) {
    profile = profile || defaultProfile();
    profile.appliedImportBatches = profile.appliedImportBatches || {};
    if (importId && profile.appliedImportBatches[importId]) return profile;
    if (importId) profile.appliedImportBatches[importId] = true;
    profile.topicMissesFromImports = profile.topicMissesFromImports || {};
    Object.keys(topicMisses || {}).forEach(function (topic) {
      var n = topicMisses[topic];
      profile.topicMissesFromImports[topic] = (profile.topicMissesFromImports[topic] || 0) + n;
    });
    return profile;
  }

  function saveImportMisses(opts) {
    opts = opts || {};
    var storageKey = opts.storageKey;
    var lockName = opts.lockName || storageKey;
    var topicMisses = opts.topicMisses;
    var importId = opts.importId;
    var quizId = opts.quizId;
    var localStorage = opts.localStorage;
    if (!storageKey || !localStorage || !topicMisses) return Promise.resolve(null);

    function readRaw() {
      try {
        return localStorage.getItem(storageKey);
      } catch (e) {
        return null;
      }
    }

    function doWrite() {
      for (var i = 0; i < 8; i++) {
        var diskBefore = readRaw();
        var current = parseProfile(diskBefore, quizId);
        drainProfileAttempts(storageKey).forEach(function (a) {
          current = applyProfileAttempt(current, a);
        });
        current = mergeImportMisses(current, topicMisses, importId);
        var serialized = JSON.stringify(current);
        var diskMid = readRaw();
        if (diskMid !== diskBefore) {
          var midProfile = parseProfile(diskMid, quizId);
          current = mergeProfiles(midProfile, current);
          drainProfileAttempts(storageKey).forEach(function (a) {
            current = applyProfileAttempt(current, a);
          });
          current = mergeImportMisses(current, topicMisses, importId);
          serialized = JSON.stringify(current);
        }
        persistProfile(localStorage, storageKey, current);
        if (readRaw() === serialized) return current;
      }
      return null;
    }

    return runLocked(opts.locks, lockName, doWrite);
  }

  function newAttemptId() {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
    return 'at-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 10);
  }

  function setTestBroadcast(fn) {
    testBroadcastFn = fn;
  }

  function resetPendingForTests() {
    pendingGameAnswers.length = 0;
    pendingProfileAttempts = Object.create(null);
  }

  if (typeof window !== 'undefined') initChannel();

  return {
    publishGameAnswer: publishGameAnswer,
    publishProfileAttempt: publishProfileAttempt,
    drainGameAnswers: drainGameAnswers,
    drainProfileAttempts: drainProfileAttempts,
    mergeTopicStats: mergeTopicStats,
    parseProfile: parseProfile,
    applyProfileAttempt: applyProfileAttempt,
    mergeProfiles: mergeProfiles,
    writeProfileAttempt: writeProfileAttempt,
    saveProfileAttempt: saveProfileAttempt,
    saveImportMisses: saveImportMisses,
    mergeImportMisses: mergeImportMisses,
    newAttemptId: newAttemptId,
    runLocked: runLocked,
    setTestBroadcast: setTestBroadcast,
    resetPendingForTests: resetPendingForTests,
    ingestMessage: ingestMessage
  };
});
