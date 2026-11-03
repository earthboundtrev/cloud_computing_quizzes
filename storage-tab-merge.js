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
  var pendingImportBatches = Object.create(null);
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
      return;
    }
    if (msg.type === 'import-batch' && msg.storageKey && msg.batch) {
      if (!pendingImportBatches[msg.storageKey]) pendingImportBatches[msg.storageKey] = [];
      pendingImportBatches[msg.storageKey].push(msg.batch);
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

  function publishImportBatch(storageKey, batch) {
    if (!storageKey || !batch || !batch.id) return;
    emitMessage({
      type: 'import-batch',
      storageKey: storageKey,
      batch: batch
    });
  }

  function drainImportBatches(storageKey) {
    var arr = pendingImportBatches[storageKey] || [];
    delete pendingImportBatches[storageKey];
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
      appliedSessionAttempts: {},
      importBatches: {},
      appliedImportBatches: {}
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

  function ensureLegacyImportSnapshot(profile) {
    if (!profile) return profile;
    profile.importBatches = profile.importBatches || {};
    profile.appliedImportBatches = profile.appliedImportBatches || {};
    if (Object.keys(profile.importBatches).length > 0) return profile;
    if (!profile.topicMissesFromImports || !Object.keys(profile.topicMissesFromImports).length) return profile;
    profile.importBatches.__legacy_import__ = JSON.parse(JSON.stringify(profile.topicMissesFromImports));
    profile.appliedImportBatches.__legacy_import__ = true;
    return profile;
  }

  function rebuildTopicMissesFromImports(profile) {
    profile.topicMissesFromImports = {};
    Object.keys(profile.importBatches || {}).forEach(function (id) {
      var batch = profile.importBatches[id];
      Object.keys(batch || {}).forEach(function (topic) {
        var n = batch[topic];
        profile.topicMissesFromImports[topic] = (profile.topicMissesFromImports[topic] || 0) + n;
      });
    });
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
      profile.importBatches = p.importBatches || {};
      if (Array.isArray(p.mergedFrom)) profile.mergedFrom = p.mergedFrom.slice();
      profile = ensureLegacySnapshot(profile);
      profile = ensureLegacyImportSnapshot(profile);
      rebuildTopicMissesFromImports(profile);
      return profile;
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

  function applyImportBatch(profile, batch) {
    if (!batch || !batch.id || !batch.topicMisses) return profile;
    profile = profile || defaultProfile();
    profile.importBatches = profile.importBatches || {};
    profile.appliedImportBatches = profile.appliedImportBatches || {};
    if (profile.appliedImportBatches[batch.id]) return profile;
    profile.appliedImportBatches[batch.id] = true;
    profile.importBatches[batch.id] = Object.assign({}, batch.topicMisses);
    rebuildTopicMissesFromImports(profile);
    return profile;
  }

  function applyPendingImportBatches(profile, storageKey) {
    drainImportBatches(storageKey).forEach(function (batch) {
      profile = applyImportBatch(profile, batch);
    });
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
    out.importBatches = Object.assign({}, (a && a.importBatches) || {}, (b && b.importBatches) || {});
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
    rebuildTopicMissesFromImports(out);
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
        current = applyPendingImportBatches(current, storageKey);
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
          current = applyPendingImportBatches(current, storageKey);
          drainProfileAttempts(storageKey).forEach(function (a) {
            current = applyProfileAttempt(current, a);
          });
          current = applyProfileAttempt(current, attempt);
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
    if (!importId) return profile;
    return applyImportBatch(profile, { id: importId, topicMisses: topicMisses });
  }

  function writeImportMisses(opts) {
    opts = opts || {};
    var storageKey = opts.storageKey;
    var topicMisses = opts.topicMisses;
    var importId = opts.importId;
    var quizId = opts.quizId;
    var localStorage = opts.localStorage;
    if (!storageKey || !localStorage || !topicMisses || !importId) return null;

    var batch = { id: importId, topicMisses: topicMisses };
    if (!opts.skipPublish) publishImportBatch(storageKey, batch);

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
        current = applyPendingImportBatches(current, storageKey);
        drainProfileAttempts(storageKey).forEach(function (a) {
          current = applyProfileAttempt(current, a);
        });
        current = applyImportBatch(current, batch);
        var serialized = JSON.stringify(current);
        var diskMid = readRaw();
        if (diskMid !== diskBefore) {
          var midProfile = parseProfile(diskMid, quizId);
          current = mergeProfiles(midProfile, current);
          current = applyPendingImportBatches(current, storageKey);
          drainProfileAttempts(storageKey).forEach(function (a) {
            current = applyProfileAttempt(current, a);
          });
          current = applyImportBatch(current, batch);
          serialized = JSON.stringify(current);
        }
        persistProfile(localStorage, storageKey, current);
        if (readRaw() === serialized) return current;
      }
      return null;
    }

    return doWrite();
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

    if (opts.skipLock) return Promise.resolve(writeImportMisses(opts));
    return runLocked(opts.locks, lockName, function () {
      return writeImportMisses(opts);
    });
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
    pendingImportBatches = Object.create(null);
  }

  function closeForTests() {
    testBroadcastFn = null;
    if (broadcastChannel) {
      try {
        broadcastChannel.close();
      } catch (e) {}
      broadcastChannel = null;
    }
    resetPendingForTests();
  }

  if (typeof window !== 'undefined') initChannel();

  return {
    publishGameAnswer: publishGameAnswer,
    publishProfileAttempt: publishProfileAttempt,
    publishImportBatch: publishImportBatch,
    drainGameAnswers: drainGameAnswers,
    drainProfileAttempts: drainProfileAttempts,
    drainImportBatches: drainImportBatches,
    mergeTopicStats: mergeTopicStats,
    parseProfile: parseProfile,
    applyProfileAttempt: applyProfileAttempt,
    applyImportBatch: applyImportBatch,
    mergeProfiles: mergeProfiles,
    writeProfileAttempt: writeProfileAttempt,
    saveProfileAttempt: saveProfileAttempt,
    writeImportMisses: writeImportMisses,
    saveImportMisses: saveImportMisses,
    mergeImportMisses: mergeImportMisses,
    newAttemptId: newAttemptId,
    runLocked: runLocked,
    setTestBroadcast: setTestBroadcast,
    resetPendingForTests: resetPendingForTests,
    closeForTests: closeForTests,
    ingestMessage: ingestMessage
  };
});
