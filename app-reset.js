/**
 * Update app (keeps progress) vs Delete all my data (full wipe + server hook).
 */
(function () {
  'use strict';

  var IDB_NAME = 'StudySessionsBrainDumps';
  var BROADCAST_CHANNEL = 'cloudcram-data-lifecycle';

  function getKeysApi() {
    return window.CloudCramStorageKeys;
  }

  function clearAllCaches() {
    if (typeof caches === 'undefined') return Promise.resolve();
    return caches.keys().then(function (names) {
      return Promise.all(names.map(function (name) { return caches.delete(name); }));
    });
  }

  function unregisterAllServiceWorkers() {
    if (!('serviceWorker' in navigator)) return Promise.resolve();
    return navigator.serviceWorker.getRegistrations().then(function (regs) {
      return Promise.all(regs.map(function (r) { return r.unregister(); }));
    });
  }

  function deleteIndexedDatabases() {
    var dbs = [{ name: IDB_NAME }];
    if (getKeysApi() && getKeysApi().IDB_DATABASES) {
      dbs = getKeysApi().IDB_DATABASES.map(function (d) { return { name: d.name }; });
    }
    return Promise.all(dbs.map(function (dbInfo) {
      return new Promise(function (resolve) {
        if (typeof indexedDB === 'undefined') {
          resolve();
          return;
        }
        var req = indexedDB.deleteDatabase(dbInfo.name);
        req.onsuccess = function () { resolve(); };
        req.onerror = function () { resolve(); };
        req.onblocked = function () { resolve(); };
      });
    }));
  }

  function unsubscribePushIfPresent() {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      return Promise.resolve();
    }
    return navigator.serviceWorker.ready
      .then(function (reg) {
        if (!reg.pushManager) return null;
        return reg.pushManager.getSubscription();
      })
      .then(function (sub) {
        if (sub && typeof sub.unsubscribe === 'function') {
          return sub.unsubscribe();
        }
        return null;
      })
      .catch(function () { return null; });
  }

  function notifyTabsDeleteStarting() {
    if (typeof BroadcastChannel === 'undefined') return;
    try {
      var ch = new BroadcastChannel(BROADCAST_CHANNEL);
      ch.postMessage({ type: 'DELETE_ALL_DATA' });
      ch.close();
    } catch (e) {}
  }

  function setupDeleteBroadcastListener() {
    if (typeof BroadcastChannel === 'undefined') return;
    try {
      var ch = new BroadcastChannel(BROADCAST_CHANNEL);
      ch.onmessage = function (ev) {
        if (!ev.data || ev.data.type !== 'DELETE_ALL_DATA') return;
        window.__cloudcramDeleteInProgress = true;
      };
    } catch (e) {}
  }

  function updateApp() {
    sessionStorage.clear();
    var keysApi = getKeysApi();
    if (keysApi) {
      keysApi.pruneLocalStorageForUpdate(localStorage);
    }

    clearAllCaches()
      .then(function () {
        if (window.CloudCramUpdate && typeof window.CloudCramUpdate.checkForUpdate === 'function') {
          return window.CloudCramUpdate.checkForUpdate();
        }
        return null;
      })
      .then(function () {
        var applied = false;
        if (window.CloudCramUpdate && typeof window.CloudCramUpdate.applyUpdate === 'function') {
          applied = window.CloudCramUpdate.applyUpdate();
        }
        if (!applied) {
          window.location.reload();
        }
      })
      .catch(function () {
        window.location.reload();
      });
  }

  function deleteAllMyData(options) {
    options = options || {};
    notifyTabsDeleteStarting();
    window.__cloudcramDeleteInProgress = true;

    var reminderApi = window.CloudCramReminderServer;
    var serverPromise = reminderApi && typeof reminderApi.deleteReminderServerRecord === 'function'
      ? reminderApi.deleteReminderServerRecord()
      : Promise.resolve({ ok: true, skipped: true });

    return serverPromise
      .then(function (serverResult) {
        var offlineNote = null;
        if (serverResult && serverResult.offline && reminderApi) {
          offlineNote = reminderApi.OFFLINE_PURGE_MESSAGE;
        }
        return unsubscribePushIfPresent().then(function () {
          return offlineNote;
        });
      })
      .then(function (offlineNote) {
        sessionStorage.clear();
        var keysApi = getKeysApi();
        if (keysApi) {
          keysApi.clearLocalStorageForDelete(localStorage);
        } else {
          localStorage.clear();
        }
        return deleteIndexedDatabases().then(function () {
          return offlineNote;
        });
      })
      .then(function (offlineNote) {
        return clearAllCaches().then(function () {
          return offlineNote;
        });
      })
      .then(function (offlineNote) {
        return unregisterAllServiceWorkers().then(function () {
          return offlineNote;
        });
      })
      .then(function (offlineNote) {
        if (offlineNote && !options.suppressOfflineMessage) {
          try {
            sessionStorage.setItem('cloudcram_delete_offline_note', offlineNote);
          } catch (e) {}
        }
        window.location.href = 'index.html?deleted=1';
      });
  }

  window.updateApp = updateApp;
  window.deleteAllMyData = deleteAllMyData;
  window.cloudCramDeleteBroadcastChannel = BROADCAST_CHANNEL;

  function initUpdateButton() {
    var btn = document.getElementById('update-app-btn') || document.getElementById('reset-app-btn');
    if (btn) {
      btn.addEventListener('click', updateApp);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initUpdateButton);
  } else {
    initUpdateButton();
  }

  setupDeleteBroadcastListener();
})();
