/**
 * One-time migration: ai900 → ai901 (track id rename).
 * Copies localStorage keys, verifies writes, then removes old keys.
 * Idempotent: ai901_migrated_from_ai900. GitHub #22 / #33.
 */
(function migrateAI900toAI901() {
  'use strict';

  if (typeof window !== 'undefined' &&
    window.cloudCramStorageWritesBlocked &&
    window.cloudCramStorageWritesBlocked()) {
    return;
  }

  var MIGRATION_FLAG = 'ai901_migrated_from_ai900';
  var DATA_MOVED_FLAG = 'ai901_migration_data_moved';
  var OLD_QUIZ_ID = 'ai900';
  var NEW_QUIZ_ID = 'ai901';
  var QUIZ_COMPLETED_KEY = 'quizCompleted';
  var QUIZ_ORDER_KEY = 'quizOrder';
  var BRAIN_LS_KEY = 'study_sessions_brain_dumps';
  var SKIP_KEY_FRAGMENTS = [
    MIGRATION_FLAG,
    'ai901_notice_seen',
    DATA_MOVED_FLAG
  ];

  if (localStorage.getItem(MIGRATION_FLAG) === 'true') {
    return;
  }

  function getReservedKeyApi() {
    if (typeof CloudCramReservedKeyNames !== 'undefined') {
      return CloudCramReservedKeyNames;
    }
    if (typeof CloudCramDataImport !== 'undefined' && CloudCramDataImport.isReservedKeyName) {
      return { isReservedKeyName: CloudCramDataImport.isReservedKeyName };
    }
    try {
      return require('./reserved-key-names.js');
    } catch (e0) {
      return null;
    }
  }

  var reservedKeyApi = getReservedKeyApi();

  function isReservedKeyName(key) {
    if (reservedKeyApi && typeof reservedKeyApi.isReservedKeyName === 'function') {
      return reservedKeyApi.isReservedKeyName(key);
    }
    return key === '__proto__' || key === 'constructor' || key === 'prototype';
  }

  function shouldSkipRemapKey(key) {
    if (!key || typeof key !== 'string') return true;
    for (var i = 0; i < SKIP_KEY_FRAGMENTS.length; i++) {
      if (key === SKIP_KEY_FRAGMENTS[i]) return true;
    }
    return false;
  }

  function listStorageKeys(storage) {
    var keys = [];
    for (var i = 0; i < storage.length; i++) {
      keys.push(storage.key(i));
    }
    return keys;
  }

  function remapKeyName(key) {
    if (key.indexOf(OLD_QUIZ_ID) === -1) return null;
    return key.split(OLD_QUIZ_ID).join(NEW_QUIZ_ID);
  }

  function profileAnswerTotal(stats) {
    if (!stats || typeof stats !== 'object') return 0;
    var total = 0;
    Object.keys(stats).forEach(function (topic) {
      if (isReservedKeyName(topic)) return;
      var stat = stats[topic];
      if (stat && typeof stat.total === 'number') total += stat.total;
    });
    return total;
  }

  function mergeRenameProfiles(oldRaw, newRaw) {
    var oldP = JSON.parse(oldRaw);
    var newP = JSON.parse(newRaw);
    if (!newP || typeof newP !== 'object') {
      newP = { quizId: NEW_QUIZ_ID, topicStats: {}, topicMissesFromImports: {} };
    }
    if (!oldP || typeof oldP !== 'object') return JSON.stringify(newP);
    if (!newP.topicStats || typeof newP.topicStats !== 'object') newP.topicStats = {};
    if (!oldP.topicStats || typeof oldP.topicStats !== 'object') oldP.topicStats = {};
    if (!newP.topicMissesFromImports || typeof newP.topicMissesFromImports !== 'object') {
      newP.topicMissesFromImports = {};
    }
    if (!oldP.topicMissesFromImports || typeof oldP.topicMissesFromImports !== 'object') {
      oldP.topicMissesFromImports = {};
    }
    if (profileAnswerTotal(oldP.topicStats) > profileAnswerTotal(newP.topicStats)) {
      newP.topicStats = oldP.topicStats;
      newP.topicMissesFromImports = oldP.topicMissesFromImports;
    } else {
      Object.keys(oldP.topicStats).forEach(function (topic) {
        if (isReservedKeyName(topic)) return;
        if (!newP.topicStats[topic]) newP.topicStats[topic] = oldP.topicStats[topic];
      });
      Object.keys(oldP.topicMissesFromImports).forEach(function (topic) {
        if (isReservedKeyName(topic)) return;
        if (newP.topicMissesFromImports[topic] == null) {
          newP.topicMissesFromImports[topic] = oldP.topicMissesFromImports[topic];
        }
      });
    }
    newP.quizId = NEW_QUIZ_ID;
    return JSON.stringify(newP);
  }

  function migrateProfileRename() {
    var oldRaw = localStorage.getItem(profileOld);
    if (oldRaw == null) return { ok: true, moved: false };
    var newRaw = localStorage.getItem(profileNew);
    var nextRaw;
    if (newRaw == null) {
      nextRaw = touchProfileQuizId(oldRaw);
    } else {
      try {
        nextRaw = mergeRenameProfiles(oldRaw, newRaw);
      } catch (eMerge) {
        console.error('[Migration] Profile merge failed:', eMerge);
        return { ok: false, moved: false };
      }
    }
    try {
      localStorage.setItem(profileNew, nextRaw);
    } catch (eWrite) {
      console.error('[Migration] Failed to write merged profile:', eWrite);
      return { ok: false, moved: false };
    }
    if (localStorage.getItem(profileNew) !== nextRaw) {
      return { ok: false, moved: false };
    }
    try {
      localStorage.removeItem(profileOld);
    } catch (eRm) {
      return { ok: false, moved: true };
    }
    if (localStorage.getItem(profileOld) !== null) {
      return { ok: false, moved: true };
    }
    return { ok: true, moved: true };
  }

  function copyVerifyRemove(oldKey, newKey) {
    var oldVal = localStorage.getItem(oldKey);
    if (oldVal == null) return { ok: true, moved: false };
    if (oldKey === profileOld && newKey === profileNew) {
      return migrateProfileRename();
    }
    if (localStorage.getItem(newKey) != null) {
      return { ok: true, moved: false };
    }
    try {
    localStorage.setItem(newKey, oldVal);
    } catch (writeErr) {
      console.error('[Migration] Failed to write', newKey, writeErr);
      return { ok: false, moved: false };
    }
    if (localStorage.getItem(newKey) !== oldVal) {
      console.error('[Migration] Verify failed for', newKey);
      try { localStorage.removeItem(newKey); } catch (e2) {}
      return { ok: false, moved: false };
    }
    try {
      localStorage.removeItem(oldKey);
    } catch (e3) {
      console.error('[Migration] Failed to remove old key', oldKey, e3);
      return { ok: false, moved: true };
    }
    if (localStorage.getItem(oldKey) !== null) {
      console.error('[Migration] Old key still present:', oldKey);
      return { ok: false, moved: true };
    }
    return { ok: true, moved: true };
  }

  function touchProfileQuizId(raw) {
    if (!raw) return raw;
    try {
      var profile = JSON.parse(raw);
      if (!profile || typeof profile !== 'object') return raw;
      if (profile.quizId === OLD_QUIZ_ID) {
        profile.quizId = NEW_QUIZ_ID;
        return JSON.stringify(profile);
      }
    } catch (e) {}
    return raw;
  }

  function replaceQuizIdInArray(arr) {
    if (!Array.isArray(arr)) return { arr: arr, changed: false };
    var changed = false;
    var out = arr.map(function (id) {
      if (id === OLD_QUIZ_ID) {
        changed = true;
        return NEW_QUIZ_ID;
      }
      return id;
    });
    if (changed) {
      var seen = Object.create(null);
      out = out.filter(function (id) {
        if (seen[id]) return false;
        seen[id] = true;
        return true;
      });
    }
    return { arr: out, changed: changed };
  }

  function migrateBrainDumpsLs() {
    var raw = localStorage.getItem(BRAIN_LS_KEY);
    if (!raw) return { ok: true, moved: false };
    var list;
    try {
      list = JSON.parse(raw);
    } catch (e) {
      return { ok: true, moved: false };
    }
    if (!Array.isArray(list)) return { ok: true, moved: false };
    var changed = false;
    list.forEach(function (rec) {
      if (rec && rec.quizId === OLD_QUIZ_ID) {
        rec.quizId = NEW_QUIZ_ID;
        changed = true;
      }
    });
    if (!changed) return { ok: true, moved: false };
    var next = JSON.stringify(list);
    try {
      localStorage.setItem(BRAIN_LS_KEY, next);
    } catch (eW) {
      return { ok: false, moved: false };
    }
    if (localStorage.getItem(BRAIN_LS_KEY) !== next) {
      return { ok: false, moved: false };
    }
    return { ok: true, moved: true };
  }

  console.log('[Migration] Starting ai900 → ai901 rename...');

  var dataMoved = false;
  var allOk = true;

  var snapshotKeys = listStorageKeys(localStorage);
  var profileOld = 'study_sessions_profile_' + OLD_QUIZ_ID;
  var profileNew = 'study_sessions_profile_' + NEW_QUIZ_ID;

  if (snapshotKeys.indexOf(profileOld) !== -1 || snapshotKeys.indexOf(profileNew) !== -1) {
    var profResult = migrateProfileRename();
    if (!profResult.ok) allOk = false;
    if (profResult.moved) dataMoved = true;
  }

  snapshotKeys.forEach(function (key) {
    if (!key || shouldSkipRemapKey(key) || isReservedKeyName(key)) return;
    if (key === profileOld || key === profileNew) return;
    var newKey = remapKeyName(key);
    if (!newKey || newKey === key) return;
    if (key === QUIZ_COMPLETED_KEY || key === QUIZ_ORDER_KEY || key === BRAIN_LS_KEY) return;
    var result = copyVerifyRemove(key, newKey);
    if (!result.ok) allOk = false;
    if (result.moved) dataMoved = true;
  });

  function migrateJsonArrayKey(storageKey) {
    var raw = localStorage.getItem(storageKey);
    if (!raw) return { ok: true, moved: false };
    var parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (e) {
      return { ok: true, moved: false };
    }
    var replaced = replaceQuizIdInArray(parsed);
    if (!replaced.changed) return { ok: true, moved: false };
    var next = JSON.stringify(replaced.arr);
    try {
      localStorage.setItem(storageKey, next);
    } catch (eW) {
      return { ok: false, moved: false };
    }
    if (localStorage.getItem(storageKey) !== next) {
      return { ok: false, moved: false };
    }
    return { ok: true, moved: true };
  }

  var completedRes = migrateJsonArrayKey(QUIZ_COMPLETED_KEY);
  if (!completedRes.ok) allOk = false;
  if (completedRes.moved) dataMoved = true;

  var orderRes = migrateJsonArrayKey(QUIZ_ORDER_KEY);
  if (!orderRes.ok) allOk = false;
  if (orderRes.moved) dataMoved = true;

  var brainRes = migrateBrainDumpsLs();
  if (!brainRes.ok) allOk = false;
  if (brainRes.moved) dataMoved = true;

  if (allOk) {
    try {
      localStorage.setItem(MIGRATION_FLAG, 'true');
      if (dataMoved) {
        localStorage.setItem(DATA_MOVED_FLAG, 'true');
      }
    } catch (eFlag) {
      console.error('[Migration] Failed to set migration flag', eFlag);
    }
  }

  if (typeof indexedDB !== 'undefined') {
    try {
      var idbReq = indexedDB.open('StudySessionsBrainDumps', 1);
      idbReq.onsuccess = function () {
        var db = idbReq.result;
        if (!db.objectStoreNames.contains('dumps')) {
          db.close();
          return;
        }
        var tx = db.transaction('dumps', 'readwrite');
        var store = tx.objectStore('dumps');
        store.openCursor().onsuccess = function (ev) {
          var cursor = ev.target.result;
          if (!cursor) return;
          var rec = cursor.value;
          if (rec && rec.quizId === OLD_QUIZ_ID) {
            rec.quizId = NEW_QUIZ_ID;
            cursor.update(rec);
          }
          cursor.continue();
        };
        tx.oncomplete = function () {
          db.close();
        };
      };
    } catch (eIdb) {
      console.error('[Migration] IndexedDB brain dump quizId remap skipped:', eIdb);
    }
  }

  console.log('[Migration] ai901 rename complete. ok:', allOk, 'dataMoved:', dataMoved);
})();