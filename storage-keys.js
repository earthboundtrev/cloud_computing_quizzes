/**
 * Registry of every localStorage key the app uses.
 * keepOnUpdate: preserved when the user chooses Update app.
 * deleteOnDelete: removed when the user chooses Delete all my data.
 */
(function (root, factory) {
  var api = factory();
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
  root.CloudCramStorageKeys = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  /** @typedef {{ id: string, match: 'exact'|'prefix'|'pattern', key?: string, prefix?: string, pattern?: RegExp, keepOnUpdate: boolean, deleteOnDelete: boolean, note?: string }} RegistryEntry */

  /** @type {RegistryEntry[]} */
  var ENTRIES = [
    { id: 'quizCompleted', match: 'exact', key: 'quizCompleted', keepOnUpdate: true, deleteOnDelete: true },
    { id: 'quizOrder', match: 'exact', key: 'quizOrder', keepOnUpdate: true, deleteOnDelete: true },
    { id: 'study_sessions_brain_dumps', match: 'exact', key: 'study_sessions_brain_dumps', keepOnUpdate: true, deleteOnDelete: true },
    { id: 'study_sessions_profile', match: 'prefix', prefix: 'study_sessions_profile_', keepOnUpdate: true, deleteOnDelete: true },
    { id: 'cloudcram_study_last_date', match: 'exact', key: 'cloudcram_study_last_date', keepOnUpdate: true, deleteOnDelete: true },
    { id: 'cloudcram_study_streak', match: 'exact', key: 'cloudcram_study_streak', keepOnUpdate: true, deleteOnDelete: true },
    { id: 'cloudcram_game_v1', match: 'exact', key: 'cloudcram_game_v1', keepOnUpdate: true, deleteOnDelete: true },
    { id: 'cloudcram_game_v1_corrupt', match: 'exact', key: 'cloudcram_game_v1_corrupt', keepOnUpdate: true, deleteOnDelete: true },
    { id: 'cloudcram_srs_v1', match: 'exact', key: 'cloudcram_srs_v1', keepOnUpdate: true, deleteOnDelete: true },
    { id: 'cloudcram_settings_v1', match: 'exact', key: 'cloudcram_settings_v1', keepOnUpdate: true, deleteOnDelete: true },
    { id: 'cloudcram_push_local_v1', match: 'exact', key: 'cloudcram_push_local_v1', keepOnUpdate: true, deleteOnDelete: true, note: 'Push #72 local settings; no endpoint/token fields' },
    { id: 'cloudcram_push_auth_token', match: 'exact', key: 'cloudcram_push_auth_token', keepOnUpdate: true, deleteOnDelete: true, note: 'Per-subscription client token for authenticated API calls (#72)' },
    { id: 'rhcsa_migrated_to_v10', match: 'exact', key: 'rhcsa_migrated_to_v10', keepOnUpdate: true, deleteOnDelete: true },
    { id: 'rhcsa_migrated_to_v10_2', match: 'exact', key: 'rhcsa_migrated_to_v10_2', keepOnUpdate: true, deleteOnDelete: true },
    { id: 'rhcsa_migrated_to_v10_3', match: 'exact', key: 'rhcsa_migrated_to_v10_3', keepOnUpdate: true, deleteOnDelete: true },
    { id: 'rhcsa_migrated_flags', match: 'pattern', pattern: /^rhcsa_migrated_/, keepOnUpdate: true, deleteOnDelete: true },
    { id: 'cloudcram_quiz_ui', match: 'prefix', prefix: 'cloudcram_quiz_ui_', keepOnUpdate: false, deleteOnDelete: true, note: 'Transient in-quiz UI state; cleared on Update app' }
  ];

  var IDB_DATABASES = [
    { name: 'StudySessionsBrainDumps', deleteOnDelete: true, keepOnUpdate: true }
  ];

  /** Keys that must never appear in user export downloads. */
  var EXPORT_REDACT_EXACT = {
    cloudcram_push_auth_token: true
  };

  function entryMatches(entry, storageKey) {
    if (entry.match === 'exact') return storageKey === entry.key;
    if (entry.match === 'prefix') return storageKey.indexOf(entry.prefix) === 0;
    if (entry.match === 'pattern') return entry.pattern.test(storageKey);
    return false;
  }

  function findEntry(storageKey) {
    for (var i = 0; i < ENTRIES.length; i++) {
      if (entryMatches(ENTRIES[i], storageKey)) return ENTRIES[i];
    }
    return null;
  }

  function isRegisteredKey(storageKey) {
    return !!findEntry(storageKey);
  }

  function shouldKeepOnUpdate(storageKey) {
    var entry = findEntry(storageKey);
    return entry ? entry.keepOnUpdate : false;
  }

  function shouldDeleteOnDelete(storageKey) {
    var entry = findEntry(storageKey);
    return entry ? entry.deleteOnDelete : true;
  }

  function listLocalStorageKeys(storage) {
    var keys = [];
    for (var i = 0; i < storage.length; i++) {
      keys.push(storage.key(i));
    }
    return keys;
  }

  function pruneLocalStorageForUpdate(storage) {
    var keys = listLocalStorageKeys(storage);
    keys.forEach(function (key) {
      if (!shouldKeepOnUpdate(key)) {
        try { storage.removeItem(key); } catch (e) {}
      }
    });
  }

  function clearLocalStorageForDelete(storage) {
    var keys = listLocalStorageKeys(storage);
    keys.forEach(function (key) {
      if (shouldDeleteOnDelete(key)) {
        try { storage.removeItem(key); } catch (e) {}
      }
    });
    /* Remove any remaining keys (unregistered stragglers). */
    keys = listLocalStorageKeys(storage);
    keys.forEach(function (key) {
      try { storage.removeItem(key); } catch (e) {}
    });
  }

  function collectExportableLocalStorage(storage) {
    var out = {};
    listLocalStorageKeys(storage).forEach(function (key) {
      if (EXPORT_REDACT_EXACT[key]) return;
      if (key.indexOf('push') !== -1 && key.indexOf('cloudcram_push_local') === -1) return;
      try {
        out[key] = storage.getItem(key);
      } catch (e) {}
    });
    return out;
  }

  return {
    ENTRIES: ENTRIES,
    IDB_DATABASES: IDB_DATABASES,
    EXPORT_REDACT_EXACT: EXPORT_REDACT_EXACT,
    entryMatches: entryMatches,
    findEntry: findEntry,
    isRegisteredKey: isRegisteredKey,
    shouldKeepOnUpdate: shouldKeepOnUpdate,
    shouldDeleteOnDelete: shouldDeleteOnDelete,
    listLocalStorageKeys: listLocalStorageKeys,
    pruneLocalStorageForUpdate: pruneLocalStorageForUpdate,
    clearLocalStorageForDelete: clearLocalStorageForDelete,
    collectExportableLocalStorage: collectExportableLocalStorage
  };
});
