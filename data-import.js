/**
 * Settings import for cloudcram-export-v1 — validate fully, then merge (never replace).
 */
(function (root, factory) {
  var api = factory();
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
  root.CloudCramDataImport = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  var SCHEMA_V1 = 'cloudcram-export-v1';
  var MAX_FILE_BYTES = 5 * 1024 * 1024;
  var MAX_LS_KEYS = 600;
  var MAX_LS_VALUE_CHARS = 512 * 1024;
  var MAX_BRAIN_DUMP_RECORDS = 12000;
  var MAX_BRAIN_TEXT_CHARS = 100000;
  var IMPORT_LOCK = 'cloudcram_progress_import_v1';
  var BRAIN_DB = 'StudySessionsBrainDumps';
  var BRAIN_STORE = 'dumps';
  var BRAIN_DB_VER = 1;
  var IDB_OPEN_TIMEOUT_MS = 8000;
  var LS_BRAIN_KEY = 'study_sessions_brain_dumps';

  function getReservedKeyApi() {
    try {
      return require('./reserved-key-names.js');
    } catch (e1) {
      if (typeof CloudCramReservedKeyNames !== 'undefined') {
        return CloudCramReservedKeyNames;
      }
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
  var PROFILE_PREFIX = 'study_sessions_profile_';
  var GAME_KEY = 'cloudcram_game_v1';
  var PUSH_LOCAL_KEY = 'cloudcram_push_local_v1';
  var BRAIN_DUMP_ALLOWED_FIELDS = { id: true, questionText: true, dumpText: true, timestamp: true, quizId: true };

  function getPushLocalApi() {
    if (typeof CloudCramPushLocal !== 'undefined') return CloudCramPushLocal;
    try {
      return require('./push-local-settings.js');
    } catch (e1) {
      return null;
    }
  }

  function normalizePushLocalImportString(raw) {
    var api = getPushLocalApi();
    if (!api) return raw;
    try {
      return JSON.stringify(api.normalizeSettings(JSON.parse(raw)));
    } catch (e2) {
      return JSON.stringify(api.defaultSettings());
    }
  }

  function validatePushLocalImportString(raw) {
    var api = getPushLocalApi();
    if (!api || typeof raw !== 'string') return null;
    try {
      var parsed = JSON.parse(raw);
      if (api.hasForbiddenKey(parsed)) {
        return reject('push_local', 'This isn\'t a Cloud Cram progress file. Nothing was changed.');
      }
    } catch (e3) {
      return reject('push_local', 'This isn\'t a Cloud Cram progress file. Nothing was changed.');
    }
    return null;
  }
  var BRAIN_DUMP_TYPES = {
    id: ['number', 'string'],
    questionText: ['string'],
    dumpText: ['string'],
    timestamp: ['string'],
    quizId: ['string']
  };

  function isPlainObject(val) {
    if (!val || typeof val !== 'object' || Array.isArray(val)) return false;
    var proto = Object.getPrototypeOf(val);
    return proto === Object.prototype || proto === null;
  }

  function containsReservedKey(val, depth) {
    if (depth > 64) return true;
    if (!val || typeof val !== 'object') return false;
    if (Array.isArray(val)) {
      for (var i = 0; i < val.length; i++) {
        if (containsReservedKey(val[i], depth + 1)) return true;
      }
      return false;
    }
    var keys = Object.keys(val);
    for (var k = 0; k < keys.length; k++) {
      if (isReservedKeyName(keys[k])) return true;
      if (containsReservedKey(val[keys[k]], depth + 1)) return true;
    }
    return false;
  }

  function parseJsonValueHasReserved(raw) {
    if (typeof raw !== 'string' || !raw) return false;
    var trimmed = raw.trim();
    if (trimmed.charAt(0) !== '{' && trimmed.charAt(0) !== '[') return false;
    var parsed = parseJsonSafe(raw);
    if (parsed === null) return false;
    return containsReservedKey(parsed, 0);
  }

  function sanitizePlainObject(val, depth) {
    if (depth > 64) return null;
    if (!isPlainObject(val)) return null;
    var out = Object.create(null);
    var keys = Object.keys(val);
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (isReservedKeyName(key)) continue;
      var child = val[key];
      if (child !== null && typeof child === 'object') {
        if (Array.isArray(child)) {
          var arr = [];
          for (var j = 0; j < child.length; j++) {
            var item = child[j];
            if (item !== null && typeof item === 'object') {
              var nested = sanitizePlainObject(item, depth + 1);
              if (nested !== null) arr.push(nested);
            } else if (typeof item === 'string' || typeof item === 'number' || typeof item === 'boolean') {
              arr.push(item);
            }
          }
          out[key] = arr;
        } else if (isPlainObject(child)) {
          var obj = sanitizePlainObject(child, depth + 1);
          if (obj !== null) out[key] = obj;
        }
      } else if (typeof child === 'string' || typeof child === 'number' || typeof child === 'boolean') {
        out[key] = child;
      }
    }
    return out;
  }

  function getKeysApi() {
    if (typeof window !== 'undefined' && window.CloudCramStorageKeys) {
      return window.CloudCramStorageKeys;
    }
    if (typeof module !== 'undefined') {
      try {
        return require('./storage-keys.js');
      } catch (e) {}
    }
    return null;
  }

  function getMergeApi() {
    if (typeof window !== 'undefined' && window.CloudCramStorageMerge) {
      return window.CloudCramStorageMerge;
    }
    if (typeof module !== 'undefined') {
      try {
        return require('./storage-tab-merge.js');
      } catch (e) {}
    }
    return null;
  }

  function parseJsonSafe(text) {
    try {
      return JSON.parse(text);
    } catch (e) {
      return null;
    }
  }

  function reject(code, message) {
    return { ok: false, code: code || 'invalid', message: message || 'Invalid import file.' };
  }

  function validateBrainDumpRecord(rec, index) {
    if (!isPlainObject(rec)) return reject('brain_dump_type', 'Invalid brain dump record at ' + index);
    var keys = Object.keys(rec);
    for (var i = 0; i < keys.length; i++) {
      if (!BRAIN_DUMP_ALLOWED_FIELDS[keys[i]]) {
        return reject('brain_dump_field', 'Unexpected brain dump field: ' + keys[i]);
      }
    }
    var types = BRAIN_DUMP_TYPES;
    for (var field in types) {
      if (!Object.prototype.hasOwnProperty.call(rec, field)) continue;
      var val = rec[field];
      var allowed = types[field];
      var ok = false;
      for (var t = 0; t < allowed.length; t++) {
        if (allowed[t] === 'number' && typeof val === 'number' && isFinite(val)) ok = true;
        if (allowed[t] === 'string' && typeof val === 'string') ok = true;
      }
      if (!ok) return reject('brain_dump_type', 'Invalid brain dump ' + field);
      if (typeof val === 'string' && val.length > MAX_BRAIN_TEXT_CHARS) {
        return reject('brain_dump_size', 'Brain dump text too large');
      }
    }
    if (typeof rec.questionText !== 'string' || typeof rec.dumpText !== 'string') {
      return reject('brain_dump_type', 'Brain dump missing text fields');
    }
    if (typeof rec.timestamp !== 'string' || !rec.timestamp.length) {
      return reject('brain_dump_time', 'Brain dump missing timestamp');
    }
    return null;
  }

  var LEGACY_AI_QUIZ_ID = 'ai900';
  var CANONICAL_AI_QUIZ_ID = 'ai901';

  function remapAi900QuizIdInJsonArray(raw) {
    if (typeof raw !== 'string' || !raw) return raw;
    try {
      var arr = JSON.parse(raw);
      if (!Array.isArray(arr)) return raw;
      var changed = false;
      arr = arr.map(function (id) {
        if (id === LEGACY_AI_QUIZ_ID) {
          changed = true;
          return CANONICAL_AI_QUIZ_ID;
        }
        return id;
      });
      if (!changed) return raw;
      var seen = Object.create(null);
      arr = arr.filter(function (id) {
        if (seen[id]) return false;
        seen[id] = true;
        return true;
      });
      return JSON.stringify(arr);
    } catch (e) {
      return raw;
    }
  }

  function touchImportedProfileQuizId(raw) {
    if (typeof raw !== 'string' || !raw) return raw;
    try {
      var profile = JSON.parse(raw);
      if (!profile || typeof profile !== 'object') return raw;
      if (profile.quizId === LEGACY_AI_QUIZ_ID) {
        profile.quizId = CANONICAL_AI_QUIZ_ID;
        return JSON.stringify(profile);
      }
    } catch (e2) {}
    return raw;
  }

  function remapBrainDumpsQuizIdsInJson(raw) {
    if (typeof raw !== 'string' || !raw) return raw;
    try {
      var list = JSON.parse(raw);
      if (!Array.isArray(list)) return raw;
      var changed = false;
      list.forEach(function (rec) {
        if (rec && rec.quizId === LEGACY_AI_QUIZ_ID) {
          rec.quizId = CANONICAL_AI_QUIZ_ID;
          changed = true;
        }
      });
      return changed ? JSON.stringify(list) : raw;
    } catch (e3) {
      return raw;
    }
  }

  function remapLegacyAi900LocalStorage(ls) {
    if (!ls || typeof ls !== 'object' || Array.isArray(ls)) return ls;
    var out = Object.create(null);
    Object.keys(ls).forEach(function (key) {
      var newKey = key.indexOf(LEGACY_AI_QUIZ_ID) !== -1
        ? key.split(LEGACY_AI_QUIZ_ID).join(CANONICAL_AI_QUIZ_ID)
        : key;
      var val = ls[key];
      if (newKey === 'quizCompleted' || newKey === 'quizOrder') {
        val = remapAi900QuizIdInJsonArray(val);
      } else if (newKey === 'study_sessions_brain_dumps') {
        val = remapBrainDumpsQuizIdsInJson(val);
      } else if (newKey.indexOf(PROFILE_PREFIX) === 0) {
        val = touchImportedProfileQuizId(val);
      }
      if (out[newKey] === undefined) {
        out[newKey] = val;
      } else if (newKey.indexOf(PROFILE_PREFIX) === 0 && typeof val === 'string' && typeof out[newKey] === 'string') {
        out[newKey] = val;
      } else if (newKey !== key) {
        out[newKey] = val;
      }
    });
    return out;
  }

  function remapLegacyAi900BrainRecords(list) {
    if (!Array.isArray(list)) return list;
    list.forEach(function (rec) {
      if (rec && rec.quizId === LEGACY_AI_QUIZ_ID) {
        rec.quizId = CANONICAL_AI_QUIZ_ID;
      }
    });
    return list;
  }

  function validatePayloadRoot(parsed) {
    if (!isPlainObject(parsed)) return reject('schema', 'Not a Cloud Cram progress file.');
    if (containsReservedKey(parsed, 0)) {
      return reject('reserved', 'This isn\'t a Cloud Cram progress file. Nothing was changed.');
    }
    if (parsed.schema !== SCHEMA_V1) {
      return reject('schema', 'This isn\'t a Cloud Cram progress file. Nothing was changed.');
    }
    if (parsed.localStorage !== undefined && !isPlainObject(parsed.localStorage)) {
      return reject('localStorage', 'Invalid localStorage section.');
    }
    var ls = remapLegacyAi900LocalStorage(parsed.localStorage || {});
    if (parsed.brainDumpsIndexedDB) {
      remapLegacyAi900BrainRecords(parsed.brainDumpsIndexedDB);
    }
    var lsKeys = Object.keys(ls);
    if (lsKeys.length > MAX_LS_KEYS) {
      return reject('localStorage_count', 'Too many localStorage keys.');
    }
    var keysApi = getKeysApi();
    if (!keysApi) return reject('registry', 'Storage registry unavailable.');
    for (var i = 0; i < lsKeys.length; i++) {
      var key = lsKeys[i];
      if (isReservedKeyName(key)) {
        return reject('reserved', 'This isn\'t a Cloud Cram progress file. Nothing was changed.');
      }
      if (keysApi.isExportRedactedKey && keysApi.isExportRedactedKey(key)) {
        return reject('redacted', 'This isn\'t a Cloud Cram progress file. Nothing was changed.');
      }
      if (!keysApi.isRegisteredKey(key)) continue;
      if (!keysApi.shouldKeepOnUpdate(key)) continue;
      var val = ls[key];
      if (val !== null && typeof val !== 'string') {
        return reject('localStorage_type', 'localStorage values must be strings.');
      }
      if (typeof val === 'string' && val.length > MAX_LS_VALUE_CHARS) {
        return reject('localStorage_size', 'localStorage value too large.');
      }
      if (keysApi.isImportableKey(key) && parseJsonValueHasReserved(val)) {
        return reject('reserved', 'This isn\'t a Cloud Cram progress file. Nothing was changed.');
      }
      if (key === GAME_KEY && typeof val === 'string') {
        var gameErr = validateGameImportString(val);
        if (gameErr) return gameErr;
      }
      if (key === PUSH_LOCAL_KEY && typeof val === 'string') {
        var pushErr = validatePushLocalImportString(val);
        if (pushErr) return pushErr;
      }
    }
    if (parsed.brainDumpsIndexedDB !== undefined) {
      if (!Array.isArray(parsed.brainDumpsIndexedDB)) {
        return reject('brain_dumps', 'brainDumpsIndexedDB must be an array.');
      }
      if (parsed.brainDumpsIndexedDB.length > MAX_BRAIN_DUMP_RECORDS) {
        return reject('brain_dumps', 'Too many brain dumps.');
      }
      for (var b = 0; b < parsed.brainDumpsIndexedDB.length; b++) {
        var err = validateBrainDumpRecord(parsed.brainDumpsIndexedDB[b], b);
        if (err) return err;
      }
    }
    if (ls[PUSH_LOCAL_KEY]) {
      ls[PUSH_LOCAL_KEY] = normalizePushLocalImportString(String(ls[PUSH_LOCAL_KEY]));
    }
    var sanitized = {
      schema: SCHEMA_V1,
      exportedAt: typeof parsed.exportedAt === 'string' ? parsed.exportedAt : '',
      localStorage: sanitizePlainObject(ls, 0) || Object.create(null),
      brainDumpsIndexedDB: Array.isArray(parsed.brainDumpsIndexedDB)
        ? parsed.brainDumpsIndexedDB.map(function (rec) {
            return sanitizePlainObject(rec, 0);
          }).filter(Boolean)
        : []
    };
    return { ok: true, payload: sanitized };
  }

  function validateImportText(text, byteLength) {
    if (byteLength !== undefined && byteLength > MAX_FILE_BYTES) {
      return reject('size', 'This isn\'t a Cloud Cram progress file. Nothing was changed.');
    }
    if (typeof text !== 'string') return reject('schema', 'This isn\'t a Cloud Cram progress file. Nothing was changed.');
    var parsed = parseJsonSafe(text);
    if (!parsed) return reject('json', 'This isn\'t a Cloud Cram progress file. Nothing was changed.');
    return validatePayloadRoot(parsed);
  }

  function importableLocalStorageEntries(payload) {
    var keysApi = getKeysApi();
    if (!keysApi || !payload || !payload.localStorage) return {};
    var out = Object.create(null);
    var keys = Object.keys(payload.localStorage);
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (keysApi.isImportableKey ? keysApi.isImportableKey(key) : keysApi.isRegisteredKey(key)) {
        if (keysApi.shouldKeepOnUpdate(key)) {
          out[key] = payload.localStorage[key];
        }
      }
    }
    return out;
  }

  function mergeQuizCompleted(localRaw, importRaw) {
    function readArr(raw) {
      if (!raw) return [];
      try {
        var arr = JSON.parse(raw);
        return Array.isArray(arr) ? arr.slice() : [];
      } catch (e) {
        return [];
      }
    }
    var local = readArr(localRaw);
    var other = readArr(importRaw);
    var seen = Object.create(null);
    var out = [];
    local.concat(other).forEach(function (id) {
      var s = String(id);
      if (!seen[s]) {
        seen[s] = true;
        out.push(s);
      }
    });
    return JSON.stringify(out);
  }

  function mergeQuizOrder(localRaw, importRaw) {
    function readOrder(raw) {
      if (!raw) return null;
      try {
        var arr = JSON.parse(raw);
        return Array.isArray(arr) && arr.length ? arr : null;
      } catch (e) {
        return null;
      }
    }
    var local = readOrder(localRaw);
    if (local && local.length) return localRaw;
    var other = readOrder(importRaw);
    if (other && other.length) return importRaw;
    return localRaw || importRaw || null;
  }

  function mergePushLocal(localRaw, importRaw) {
    if (!importRaw) return localRaw;
    if (!localRaw) return importRaw;
    try {
      var local = JSON.parse(localRaw);
      var other = JSON.parse(importRaw);
      if (!isPlainObject(local)) return importRaw;
      if (!isPlainObject(other)) return localRaw;
      if (local.explicitTime != null && local.explicitTime !== '') return localRaw;
      if (other.explicitTime != null && other.explicitTime !== '') return importRaw;
      return localRaw;
    } catch (e) {
      return localRaw || importRaw;
    }
  }

  function mergeMigrationFlag(localRaw, importRaw) {
    if (localRaw === 'true') return 'true';
    if (importRaw === 'true') return 'true';
    return localRaw != null ? localRaw : importRaw;
  }

  function mergeJsonObjects(localRaw, importRaw) {
    if (!importRaw) return localRaw;
    if (!localRaw) return importRaw;
    try {
      var a = sanitizePlainObject(JSON.parse(localRaw), 0);
      var b = sanitizePlainObject(JSON.parse(importRaw), 0);
      if (a && b) {
        return JSON.stringify(Object.assign({}, b, a));
      }
    } catch (e) {}
    return localRaw;
  }

  function mergeExactStorageValue(key, localRaw, importRaw) {
    if (importRaw == null) return localRaw;
    if (key === 'quizCompleted') return mergeQuizCompleted(localRaw, importRaw);
    if (key === 'quizOrder') return mergeQuizOrder(localRaw, importRaw);
    if (key === 'cloudcram_push_local_v1') return mergePushLocal(localRaw, importRaw);
    if (key.indexOf('rhcsa_migrated') === 0) {
      return mergeMigrationFlag(localRaw, importRaw);
    }
    if (key.indexOf('ai901_migrated') === 0 || key === 'ai901_migration_data_moved' || key === 'ai901_notice_seen') {
      return mergeMigrationFlag(localRaw, importRaw);
    }
    if (key === 'study_sessions_brain_dumps') return localRaw;
    if (key === GAME_KEY || key === 'cloudcram_game_v1_corrupt') return localRaw;
    if (key.indexOf(PROFILE_PREFIX) === 0) return localRaw;
    return mergeJsonObjects(localRaw, importRaw);
  }

  function brainDumpIdentity(rec) {
    if (!rec) return '';
    return [
      String(rec.timestamp || ''),
      String(rec.quizId || ''),
      String(rec.questionText || ''),
      String(rec.dumpText || '')
    ].join('\u0001');
  }

  function normalizeBrainDumpRecord(rec) {
    return {
      questionText: String(rec.questionText || ''),
      dumpText: String(rec.dumpText || ''),
      timestamp: String(rec.timestamp || ''),
      quizId: String(rec.quizId || '')
    };
  }

  var MAX_GAME_STREAK = 10000;
  var MAX_GAME_BEST = 10000;
  var MAX_DEDUP_KEYS = 200000;
  /** One ISO date key per calendar day; ~41 years at 15000 — above realistic history and streak cap. */
  var MAX_DAY_RECORD_KEYS = 15000;
  /** Sparse UI flags on game state; legitimate exports stay in single digits. */
  var MAX_NOTICE_KEYS = 500;
  /** settingsRevision only reads soundOn and goal; cap blocks junk-key maps. */
  var MAX_SETTINGS_REVISION_KEYS = 10;

  function countPlainObjectKeysBounded(obj, limit) {
    if (!isPlainObject(obj)) return { invalid: true, over: false };
    var n = 0;
    for (var key in obj) {
      if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;
      n++;
      if (n > limit) return { invalid: false, over: true };
    }
    return { invalid: false, over: false };
  }

  function isValidDayRecordValue(val) {
    if (val === null || val === undefined) return true;
    return isPlainObject(val);
  }

  function isValidNoticeValue(val) {
    if (val === null || val === undefined) return true;
    var t = typeof val;
    return t === 'boolean' || t === 'number' || t === 'string';
  }

  function isValidSettingsRevisionValue(val) {
    return typeof val === 'number' && isFinite(val) && val >= 0;
  }

  function validateImportedPlainObjectMap(obj, max, capMessage, validateValue) {
    if (obj === undefined || obj === null) return null;
    if (!isPlainObject(obj)) {
      return reject('game_type', 'Invalid game state in file.');
    }
    if (countPlainObjectKeysBounded(obj, max).over) {
      return reject('game_cap', capMessage);
    }
    if (validateValue) {
      for (var k in obj) {
        if (!Object.prototype.hasOwnProperty.call(obj, k)) continue;
        if (!validateValue(obj[k])) {
          return reject('game_type', 'Invalid game state in file.');
        }
      }
    }
    return null;
  }

  function validateFiniteGameCount(val, field, max) {
    if (val === undefined) return null;
    if (typeof val !== 'number' || !isFinite(val) || val < 0) {
      return reject('game_type', 'Invalid game state in file.');
    }
    if (val > max) {
      return reject('game_cap', field === 'streak' ? 'Game streak out of range.' : 'Game best out of range.');
    }
    return null;
  }

  function validateGameImportString(raw) {
    if (typeof raw !== 'string' || !raw) return null;
    var parsed = parseJsonSafe(raw);
    if (!parsed || !isPlainObject(parsed)) {
      return reject('game_type', 'Invalid game state in file.');
    }
    if (containsReservedKey(parsed, 0)) {
      return reject('reserved', 'This isn\'t a Cloud Cram progress file. Nothing was changed.');
    }
    if (Object.prototype.hasOwnProperty.call(parsed, 'streak')) {
      var streakErr = validateFiniteGameCount(parsed.streak, 'streak', MAX_GAME_STREAK);
      if (streakErr) return streakErr;
    }
    if (Object.prototype.hasOwnProperty.call(parsed, 'best')) {
      var bestErr = validateFiniteGameCount(parsed.best, 'best', MAX_GAME_BEST);
      if (bestErr) return bestErr;
    }
    if (parsed.answerDedup && isPlainObject(parsed.answerDedup)) {
      if (countPlainObjectKeysBounded(parsed.answerDedup, MAX_DEDUP_KEYS).over) {
        return reject('game_cap', 'Too many answer records.');
      }
    }
    var dayErr = validateImportedPlainObjectMap(
      parsed.dayRecords,
      MAX_DAY_RECORD_KEYS,
      'Too many day records.',
      isValidDayRecordValue
    );
    if (dayErr) return dayErr;
    var noticeErr = validateImportedPlainObjectMap(
      parsed.notices,
      MAX_NOTICE_KEYS,
      'Too many notice flags.',
      isValidNoticeValue
    );
    if (noticeErr) return noticeErr;
    var revErr = validateImportedPlainObjectMap(
      parsed.settingsRevision,
      MAX_SETTINGS_REVISION_KEYS,
      'Too many settings revision fields.',
      isValidSettingsRevisionValue
    );
    if (revErr) return revErr;
    return null;
  }

  function mergeBrainDumpsForImport(existing, imported) {
    var existingList = Array.isArray(existing) ? existing : [];
    var importList = Array.isArray(imported) ? imported : [];
    var seen = Object.create(null);
    existingList.forEach(function (rec) {
      seen[brainDumpIdentity(rec)] = true;
    });
    var toAdd = [];
    importList.forEach(function (rec) {
      var norm = normalizeBrainDumpRecord(rec);
      var id = brainDumpIdentity(norm);
      if (!seen[id]) {
        seen[id] = true;
        toAdd.push(norm);
      }
    });
    return { toAdd: toAdd, totalAfter: existingList.length + toAdd.length, added: toAdd.length };
  }

  function countProfilesWithTopicStats(localStorage, entries) {
    var count = 0;
    Object.keys(entries).forEach(function (key) {
      if (key.indexOf(PROFILE_PREFIX) !== 0) return;
      count++;
    });
    return count;
  }

  function countAnswersFromGameRaw(raw) {
    if (!raw) return 0;
    try {
      var parsed = JSON.parse(raw);
      if (parsed && typeof parsed.answers === 'number' && isFinite(parsed.answers)) {
        return Math.max(0, Math.floor(parsed.answers));
      }
      if (parsed && parsed.answerDedup && isPlainObject(parsed.answerDedup)) {
        return Object.keys(parsed.answerDedup).length;
      }
    } catch (e) {}
    return 0;
  }

  function streakFromGameRaw(raw) {
    if (!raw) return 0;
    try {
      var parsed = JSON.parse(raw);
      if (parsed && typeof parsed.streak === 'number' && isFinite(parsed.streak)) {
        return Math.max(0, Math.floor(parsed.streak));
      }
    } catch (e) {}
    return 0;
  }

  function buildImportSummary(payload) {
    var entries = importableLocalStorageEntries(payload);
    var tracks = countProfilesWithTopicStats(null, entries);
    var gameRaw = entries[GAME_KEY] || null;
    var streak = streakFromGameRaw(gameRaw);
    var answers = countAnswersFromGameRaw(gameRaw);
    var dumps = Array.isArray(payload.brainDumpsIndexedDB) ? payload.brainDumpsIndexedDB.length : 0;
    if (!dumps && entries.study_sessions_brain_dumps) {
      try {
        var lsDumps = JSON.parse(entries.study_sessions_brain_dumps);
        if (Array.isArray(lsDumps)) dumps = lsDumps.length;
      } catch (e) {}
    }
    var dateLabel = '';
    if (payload.exportedAt) {
      try {
        dateLabel = new Date(payload.exportedAt).toLocaleDateString(undefined, {
          month: 'short',
          day: 'numeric'
        });
      } catch (e2) {
        dateLabel = String(payload.exportedAt).slice(0, 10);
      }
    }
    return {
      tracks: tracks,
      streak: streak,
      answers: answers,
      dumps: dumps,
      dateLabel: dateLabel
    };
  }

  function confirmSummaryText(summary) {
    var parts = [];
    if (summary.tracks) parts.push(summary.tracks + ' track' + (summary.tracks === 1 ? '' : 's'));
    if (summary.streak) parts.push(summary.streak + '-day streak');
    if (summary.answers) parts.push(summary.answers + ' answer' + (summary.answers === 1 ? '' : 's'));
    var filePart = summary.dateLabel ? 'Import from ' + summary.dateLabel + ' file?' : 'Import this file?';
    var detail = parts.length ? ' It has ' + parts.join(', ') + '.' : '';
    return (
      filePart + detail +
      ' Your current progress is kept and combined, nothing is deleted.'
    );
  }

  function snapshotLocalStorage(storage) {
    var keysApi = getKeysApi();
    var out = Object.create(null);
    if (!storage || !keysApi) return out;
    var keys = keysApi.listLocalStorageKeys(storage);
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (keysApi.isImportableKey(key)) {
        try {
          out[key] = storage.getItem(key);
        } catch (e) {}
      }
    }
    return out;
  }

  function snapshotsEqual(a, b) {
    var keys = Object.keys(a).concat(Object.keys(b));
    var seen = Object.create(null);
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (seen[key]) continue;
      seen[key] = true;
      if (a[key] !== b[key]) return false;
    }
    return true;
  }

  function importApplyError(code, message) {
    var err = new Error(message || 'Import failed.');
    err.importCode = code || 'apply_failed';
    return err;
  }

  function cloneBrainDumpRecords(list) {
    if (!list || !list.length) return [];
    return JSON.parse(JSON.stringify(list));
  }

  function restoreLocalStorageFromSnapshot(storage, snap) {
    var keysApi = getKeysApi();
    if (!storage || !keysApi || !snap) return false;
    try {
      var currentKeys = keysApi.listLocalStorageKeys(storage).filter(function (key) {
        return keysApi.isImportableKey(key);
      });
      for (var i = 0; i < currentKeys.length; i++) {
        var key = currentKeys[i];
        if (!Object.prototype.hasOwnProperty.call(snap, key)) {
          storage.removeItem(key);
        }
      }
      var snapKeys = Object.keys(snap);
      for (var j = 0; j < snapKeys.length; j++) {
        var k = snapKeys[j];
        storage.setItem(k, snap[k]);
      }
      return true;
    } catch (e) {
      return false;
    }
  }

  function restoreBrainDumpRecordsInPlace(target, snapshot) {
    if (!target || !Array.isArray(target) || !snapshot) return;
    target.length = 0;
    for (var i = 0; i < snapshot.length; i++) {
      target.push(snapshot[i]);
    }
  }

  function rollbackImportApply(opts, beforeSnap, beforeBrainClone, err, rollbackMeta) {
    rollbackMeta = rollbackMeta || {};
    var brainApplyAttempted = !!rollbackMeta.brainApplyAttempted;
    var brainIdbReadOk = !!rollbackMeta.brainIdbReadOk;
    var lsOk = restoreLocalStorageFromSnapshot(opts.localStorage, beforeSnap);
    var brainPromise;
    if (brainApplyAttempted && opts.idb && brainIdbReadOk) {
      brainPromise = replaceAllBrainDumpsInIdb(opts.idb, beforeBrainClone)
        .then(function (n) {
          return typeof n === 'number' && n >= 0;
        })
        .catch(function () {
          return false;
        });
    } else if (brainApplyAttempted && Array.isArray(opts.existingBrainDumps)) {
      restoreBrainDumpRecordsInPlace(opts.existingBrainDumps, beforeBrainClone);
      brainPromise = Promise.resolve(true);
    } else {
      brainPromise = Promise.resolve(true);
    }
    return brainPromise.then(function (brainOk) {
      if (!lsOk || !brainOk) {
        return {
          ok: false,
          code: 'rollback_failed',
          message:
            'Import failed and your saved progress could not be fully restored. Try refreshing this page.'
        };
      }
      var code = err && err.importCode ? err.importCode : 'apply_failed';
      var msg =
        err && err.message ? err.message : 'Import failed. Nothing was changed.';
      return { ok: false, code: code, message: msg };
    });
  }

  function mergeOneProfile(localStorage, entries, mergeApi, locks, key) {
    var importRaw = entries[key];
    if (importRaw == null) return Promise.resolve(false);
    var quizId = key.slice(PROFILE_PREFIX.length) || 'quiz';
    var maxAttempts = mergeApi.MAX_RMW_ATTEMPTS || 24;

    function mergeOnce() {
      var before = null;
      try {
        before = localStorage.getItem(key);
      } catch (e0) {}
      for (var i = 0; i < maxAttempts; i++) {
        var mergedRaw = mergeApi.readRawMerged
          ? mergeApi.readRawMerged(localStorage, key, quizId)
          : before;
        var localProf = mergeApi.parseProfile(mergedRaw, quizId);
        var importProf = mergeApi.parseProfile(importRaw, quizId);
        var nextProf = mergeApi.mergeProfiles(localProf, importProf);
        var serialized = JSON.stringify(nextProf);
        if (serialized === before) return false;
        try {
          localStorage.setItem(key, serialized);
        } catch (e1) {
          return false;
        }
        if (localStorage.getItem(key) === serialized) return true;
      }
      return false;
    }

    if (locks && mergeApi.runLocked) {
      return mergeApi.runLocked(locks, key, mergeOnce);
    }
    return Promise.resolve(mergeOnce());
  }

  function applyProfileMerges(localStorage, entries, mergeApi, locks) {
    if (!mergeApi) return Promise.resolve(false);
    var keys = Object.keys(entries).filter(function (key) {
      return key.indexOf(PROFILE_PREFIX) === 0;
    });
  if (!keys.length) return Promise.resolve(false);
    var chain = Promise.resolve(false);
    keys.forEach(function (key) {
      chain = chain.then(function (changed) {
        return mergeOneProfile(localStorage, entries, mergeApi, locks, key).then(function (one) {
          return changed || one;
        });
      });
    });
    return chain;
  }

  function writeBrainDumpsToLocalStorage(localStorage, toAdd, existing) {
    if (!localStorage || !toAdd || !toAdd.length) return 0;
    var list = Array.isArray(existing) ? existing.slice() : [];
    var merged = mergeBrainDumpsForImport(list, toAdd);
    if (!merged.added) return 0;
    var withIds = merged.toAdd.map(function (rec, idx) {
      return Object.assign({}, rec, {
        id: 'imp_' + Date.now() + '_' + idx
      });
    });
    try {
      localStorage.setItem(LS_BRAIN_KEY, JSON.stringify(list.concat(withIds)));
      return withIds.length;
    } catch (e) {
      return 0;
    }
  }

  function importBrainMergeFromPayload(payload, existingBrainDumps) {
    existingBrainDumps = existingBrainDumps || [];
    var entries = importableLocalStorageEntries(payload);
    var importDumpSource =
      payload.brainDumpsIndexedDB && payload.brainDumpsIndexedDB.length
        ? payload.brainDumpsIndexedDB
        : parseJsonSafe(entries.study_sessions_brain_dumps || '[]');
    if (!Array.isArray(importDumpSource)) importDumpSource = [];
    return mergeBrainDumpsForImport(existingBrainDumps, importDumpSource);
  }

  function brainImportNeedsTrustedIdbRead(brainMerge, writeBrainDumps) {
    return !!(brainMerge && brainMerge.added > 0 && typeof writeBrainDumps === 'function');
  }

  function applyExactMerges(localStorage, entries, skipKeys) {
    skipKeys = skipKeys || Object.create(null);
    var changed = false;
    var keys = Object.keys(entries);
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (skipKeys[key]) continue;
      var importVal = entries[key];
      if (importVal == null) continue;
      var localVal = null;
      try {
        localVal = localStorage.getItem(key);
      } catch (e) {}
      var merged = mergeExactStorageValue(key, localVal, importVal);
      if (merged != null && merged !== localVal) {
        try {
          localStorage.setItem(key, merged);
        } catch (eSet) {
          throw importApplyError('storage', 'Import failed. Nothing was changed.');
        }
        changed = true;
      }
    }
    return changed;
  }

  function applyImportMerge(opts) {
    opts = opts || {};
    var payload = opts.payload;
    var localStorage = opts.localStorage;
    var mergeApi = opts.mergeApi || getMergeApi();
    var gameApi = opts.gameApi || (typeof window !== 'undefined' ? window.CloudCramGame : null);
    var locks = opts.locks;
    var existingBrainDumps = opts.existingBrainDumps || [];
    var writeBrainDumps = opts.writeBrainDumps;
    var idb = opts.idb || null;
    var brainIdbReadOk = !!opts.brainIdbReadOk;

    if (!payload || !localStorage) {
      return { ok: false, code: 'internal', message: 'Import unavailable.' };
    }

    var entries = importableLocalStorageEntries(payload);
    var beforeSnap = snapshotLocalStorage(localStorage);
    var beforeBrainClone = cloneBrainDumpRecords(existingBrainDumps);

    var skipKeys = Object.create(null);
    skipKeys[GAME_KEY] = true;
    Object.keys(entries).forEach(function (key) {
      if (key.indexOf(PROFILE_PREFIX) === 0) skipKeys[key] = true;
    });

    var upfrontBrainMerge = importBrainMergeFromPayload(payload, existingBrainDumps);
    if (brainImportNeedsTrustedIdbRead(upfrontBrainMerge, writeBrainDumps) && !brainIdbReadOk) {
      return Promise.resolve({
        ok: false,
        code: 'brain_read',
        message: 'Couldn\'t read your existing brain dumps. Nothing was imported.'
      });
    }

    function doMerge() {
      var brainApplyAttempted = false;
      var gameRaw = entries[GAME_KEY];
      var gameDiskBefore = null;
      try {
        gameDiskBefore = localStorage.getItem(GAME_KEY);
      } catch (eGame) {}
      var gamePromise = Promise.resolve(false);
      if (gameRaw && gameApi && typeof gameApi.importState === 'function') {
        gamePromise = Promise.resolve(gameApi.importState(gameRaw))
          .then(function () {
            try {
              return localStorage.getItem(GAME_KEY) !== gameDiskBefore;
            } catch (e2) {
              return false;
            }
          })
          .catch(function () {
            throw importApplyError('game', 'Import failed. Nothing was changed.');
          });
      }
      return gamePromise
        .then(function (gameChanged) {
          return applyProfileMerges(localStorage, entries, mergeApi, locks).then(function (profileChanged) {
            var storageChanged;
            try {
              storageChanged = applyExactMerges(localStorage, entries, skipKeys);
            } catch (eExact) {
              return Promise.reject(eExact);
            }

            var importDumpSource =
              payload.brainDumpsIndexedDB && payload.brainDumpsIndexedDB.length
                ? payload.brainDumpsIndexedDB
                : parseJsonSafe(entries.study_sessions_brain_dumps || '[]');
            var brainMerge = mergeBrainDumpsForImport(existingBrainDumps, importDumpSource);

            if (brainMerge.added > 0 && typeof writeBrainDumps === 'function') {
              brainApplyAttempted = true;
            }
            return Promise.resolve(
              brainApplyAttempted ? writeBrainDumps(brainMerge.toAdd) : 0
            )
              .then(function (written) {
                if (!written && brainMerge.added > 0) {
                  var idbWritePath = idb && typeof writeBrainDumps === 'function';
                  if (!idbWritePath) {
                    written = writeBrainDumpsToLocalStorage(
                      localStorage,
                      brainMerge.toAdd,
                      existingBrainDumps
                    );
                  }
                }
                if (brainMerge.added > 0 && !written) {
                  throw importApplyError('brain_dump', 'Import failed. Nothing was changed.');
                }
                var brainChanged = written > 0;
                var afterSnap = snapshotLocalStorage(localStorage);
                var noop =
                  !gameChanged &&
                  !profileChanged &&
                  !storageChanged &&
                  !brainChanged &&
                  snapshotsEqual(beforeSnap, afterSnap);

                return {
                  ok: true,
                  noop: noop,
                  addedDumps: brainMerge.added,
                  summary: buildImportSummary(payload)
                };
              })
          });
        })
        .catch(function (err) {
          return rollbackImportApply(
            {
              localStorage: localStorage,
              idb: idb,
              existingBrainDumps: existingBrainDumps
            },
            beforeSnap,
            beforeBrainClone,
            err,
            {
              brainApplyAttempted: brainApplyAttempted,
              brainIdbReadOk: brainIdbReadOk
            }
          );
        });
    }

    if (locks && locks.request) {
      return locks.request(IMPORT_LOCK, function () {
        return doMerge();
      });
    }
    return doMerge();
  }

  function openBrainDumpDatabase(idb) {
    return new Promise(function (resolve) {
      if (!idb) {
        resolve(null);
        return;
      }
      var settled = false;
      function finish(db) {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        resolve(db || null);
      }
      var timer = setTimeout(function () {
        finish(null);
      }, IDB_OPEN_TIMEOUT_MS);
      var req;
      try {
        req = idb.open(BRAIN_DB, BRAIN_DB_VER);
      } catch (e) {
        finish(null);
        return;
      }
      req.onerror = function () { finish(null); };
      req.onblocked = function () { finish(null); };
      req.onupgradeneeded = function (ev) {
        var db = ev.target.result;
        if (!db.objectStoreNames.contains(BRAIN_STORE)) {
          db.createObjectStore(BRAIN_STORE, { keyPath: 'id', autoIncrement: true });
        }
      };
      req.onsuccess = function () {
        finish(req.result);
      };
    });
  }

  function readBrainDumpsFromIdb(idb) {
    if (!idb) {
      return Promise.resolve({ readOk: false, records: [] });
    }
    return openBrainDumpDatabase(idb).then(function (db) {
      if (!db || !db.objectStoreNames.contains(BRAIN_STORE)) {
        if (db) db.close();
        return { readOk: false, records: [] };
      }
      return new Promise(function (resolve) {
        var tx = db.transaction(BRAIN_STORE, 'readonly');
        var all = tx.objectStore(BRAIN_STORE).getAll();
        all.onsuccess = function () {
          db.close();
          resolve({ readOk: true, records: all.result || [] });
        };
        all.onerror = function () {
          db.close();
          resolve({ readOk: false, records: [] });
        };
      });
    });
  }

  function replaceAllBrainDumpsInIdb(idb, records) {
    records = records || [];
    if (!idb) return Promise.resolve(-1);
    return openBrainDumpDatabase(idb).then(function (db) {
      if (!db || !db.objectStoreNames.contains(BRAIN_STORE)) {
        if (db) db.close();
        return -1;
      }
      return new Promise(function (resolve) {
        var tx = db.transaction(BRAIN_STORE, 'readwrite');
        var store = tx.objectStore(BRAIN_STORE);
        store.clear();
        for (var i = 0; i < records.length; i++) {
          store.put(records[i]);
        }
        tx.oncomplete = function () {
          db.close();
          resolve(records.length);
        };
        tx.onabort = function () {
          db.close();
          resolve(-1);
        };
        tx.onerror = function () {
          db.close();
          resolve(-1);
        };
      });
    });
  }

  function writeBrainDumpsToIdb(idb, records) {
    if (!records || !records.length) return Promise.resolve(0);
    return openBrainDumpDatabase(idb).then(function (db) {
      if (!db || !db.objectStoreNames.contains(BRAIN_STORE)) {
        if (db) db.close();
        return 0;
      }
      return new Promise(function (resolve) {
        var tx = db.transaction(BRAIN_STORE, 'readwrite');
        var store = tx.objectStore(BRAIN_STORE);
        var added = 0;
        records.forEach(function (rec) {
          store.add(rec);
          added++;
        });
        tx.oncomplete = function () {
          db.close();
          resolve(added);
        };
        tx.onabort = function () {
          db.close();
          resolve(0);
        };
        tx.onerror = function () {
          db.close();
          resolve(0);
        };
      });
    });
  }

  function applyImportFromFile(file) {
    if (!file || typeof file.size === 'number' && file.size > MAX_FILE_BYTES) {
      return Promise.resolve(reject('size', 'This isn\'t a Cloud Cram progress file. Nothing was changed.'));
    }
    return new Promise(function (resolve) {
      var reader = new FileReader();
      reader.onload = function () {
        var text = reader.result;
        var validated = validateImportText(text, file.size);
        if (!validated.ok) {
          resolve(validated);
          return;
        }
        resolve({ ok: true, payload: validated.payload, fileName: file.name || '' });
      };
      reader.onerror = function () {
        resolve(reject('read', 'This isn\'t a Cloud Cram progress file. Nothing was changed.'));
      };
      reader.readAsText(file);
    });
  }

  function runValidatedImport(payload) {
    var idb = typeof indexedDB !== 'undefined' ? indexedDB : null;
    var locks = typeof navigator !== 'undefined' ? navigator.locks : null;
    return readBrainDumpsFromIdb(idb).then(function (brainSnap) {
      brainSnap = brainSnap || { readOk: false, records: [] };
      return applyImportMerge({
        payload: payload,
        localStorage: localStorage,
        locks: locks,
        idb: idb,
        brainIdbReadOk: brainSnap.readOk,
        existingBrainDumps: brainSnap.records || [],
        writeBrainDumps: function (recs) {
          return writeBrainDumpsToIdb(idb, recs);
        }
      });
    });
  }

  return {
    SCHEMA_V1: SCHEMA_V1,
    MAX_FILE_BYTES: MAX_FILE_BYTES,
    isReservedKeyName: isReservedKeyName,
    MAX_DEDUP_KEYS: MAX_DEDUP_KEYS,
    MAX_DAY_RECORD_KEYS: MAX_DAY_RECORD_KEYS,
    MAX_NOTICE_KEYS: MAX_NOTICE_KEYS,
    MAX_SETTINGS_REVISION_KEYS: MAX_SETTINGS_REVISION_KEYS,
    IMPORT_LOCK: IMPORT_LOCK,
    containsReservedKey: containsReservedKey,
    sanitizePlainObject: sanitizePlainObject,
    validateImportText: validateImportText,
    validateGameImportString: validateGameImportString,
    validatePayloadRoot: validatePayloadRoot,
    importableLocalStorageEntries: importableLocalStorageEntries,
    mergeQuizCompleted: mergeQuizCompleted,
    mergeQuizOrder: mergeQuizOrder,
    mergePushLocal: mergePushLocal,
    mergeExactStorageValue: mergeExactStorageValue,
    mergeBrainDumpsForImport: mergeBrainDumpsForImport,
    brainDumpIdentity: brainDumpIdentity,
    buildImportSummary: buildImportSummary,
    confirmSummaryText: confirmSummaryText,
    snapshotLocalStorage: snapshotLocalStorage,
    applyImportMerge: applyImportMerge,
    applyImportFromFile: applyImportFromFile,
    runValidatedImport: runValidatedImport,
    readBrainDumpsFromIdb: readBrainDumpsFromIdb,
    writeBrainDumpsToIdb: writeBrainDumpsToIdb,
    replaceAllBrainDumpsInIdb: replaceAllBrainDumpsInIdb,
    remapLegacyAi900LocalStorage: remapLegacyAi900LocalStorage,
    remapAi900QuizIdInJsonArray: remapAi900QuizIdInJsonArray,
    touchImportedProfileQuizId: touchImportedProfileQuizId
  };
});