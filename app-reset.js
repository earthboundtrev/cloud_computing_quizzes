/**
 * Update app (keeps progress) vs Delete all my data (full wipe + server hook).
 */
(function () {
  'use strict';

  var IDB_NAME = 'StudySessionsBrainDumps';
  var BROADCAST_CHANNEL = 'cloudcram-data-lifecycle';
  var PUSH_UNSUBSCRIBE_TIMEOUT_MS = 4000;

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

  function closeBrainDumpConnections() {
    if (window.BrainDump && typeof window.BrainDump.closeConnection === 'function') {
      window.BrainDump.closeConnection();
    }
  }

  function deleteIndexedDatabase(name) {
    return new Promise(function (resolve) {
      if (typeof indexedDB === 'undefined') {
        resolve(false);
        return;
      }
      var settled = false;
      function done(ok) {
        if (settled) return;
        settled = true;
        resolve(ok);
      }
      var req = indexedDB.deleteDatabase(name);
      req.onsuccess = function () { done(true); };
      req.onerror = function () { done(false); };
      req.onblocked = function () {
        /* Retry once after closing app connections. */
        setTimeout(function () {
          var retry = indexedDB.deleteDatabase(name);
          retry.onsuccess = function () { done(true); };
          retry.onerror = function () { done(false); };
          retry.onblocked = function () { done(false); };
        }, 250);
      };
    });
  }

  function deleteIndexedDatabases() {
    closeBrainDumpConnections();
    var dbs = [{ name: IDB_NAME }];
    if (getKeysApi() && getKeysApi().IDB_DATABASES) {
      dbs = getKeysApi().IDB_DATABASES.map(function (d) { return { name: d.name }; });
    }
    return Promise.all(dbs.map(function (dbInfo) {
      return deleteIndexedDatabase(dbInfo.name);
    })).then(function (results) {
      return results.every(function (r) { return r; });
    });
  }

  function unsubscribePushIfPresent() {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      return Promise.resolve();
    }
    var unsub = navigator.serviceWorker.getRegistration('/')
      .then(function (reg) {
        if (!reg || !reg.pushManager) return null;
        return reg.pushManager.getSubscription();
      })
      .then(function (sub) {
        if (sub && typeof sub.unsubscribe === 'function') {
          return sub.unsubscribe();
        }
        return null;
      })
      .catch(function () { return null; });
    return Promise.race([
      unsub,
      new Promise(function (resolve) {
        setTimeout(resolve, PUSH_UNSUBSCRIBE_TIMEOUT_MS);
      })
    ]);
  }

  function notifyTabsDeleteStarting() {
    if (typeof BroadcastChannel === 'undefined') return Promise.resolve();
    try {
      var ch = new BroadcastChannel(BROADCAST_CHANNEL);
      ch.postMessage({ type: 'DELETE_ALL_DATA' });
      ch.close();
    } catch (e) {}
    return new Promise(function (resolve) {
      setTimeout(resolve, 300);
    });
  }

  function showDeleteCompletePage(offlineNote) {
    var title = document.createElement('title');
    title.textContent = 'Data removed';
    document.head.appendChild(title);
    document.body.innerHTML = '';
    document.body.style.cssText = 'font-family: system-ui, sans-serif; max-width: 22rem; margin: 2rem auto; padding: 1rem; line-height: 1.5;';
    var heading = document.createElement('h1');
    heading.textContent = 'Data removed';
    heading.style.fontSize = '1.25rem';
    var para = document.createElement('p');
    para.textContent = offlineNote ||
      'Your progress and settings were removed from this device.';
    var link = document.createElement('a');
    link.href = 'index.html';
    link.textContent = 'Return to Study Sessions';
    document.body.appendChild(heading);
    document.body.appendChild(para);
    document.body.appendChild(link);
  }

  function isQuizSessionActive() {
    return !!(
      window.QuizEngine &&
      typeof window.QuizEngine.isQuizActive === 'function' &&
      window.QuizEngine.isQuizActive()
    );
  }

  function confirmUpdateDuringActiveQuiz(onProceed) {
    var overlay = document.createElement('div');
    overlay.className = 'delete-data-dialog-overlay';
    overlay.setAttribute('role', 'presentation');

    var dialog = document.createElement('div');
    dialog.className = 'delete-data-dialog';
    dialog.setAttribute('role', 'dialog');
    dialog.setAttribute('aria-modal', 'true');
    dialog.setAttribute('aria-labelledby', 'update-app-quiz-dialog-title');

    var title = document.createElement('h3');
    title.id = 'update-app-quiz-dialog-title';
    title.textContent = 'Update app?';

    var body = document.createElement('p');
    body.textContent =
      'You have a quiz in progress. Update anyway? Your current quiz will be lost.';

    var actions = document.createElement('div');
    actions.className = 'delete-data-dialog-actions';

    var cancelBtn = document.createElement('button');
    cancelBtn.type = 'button';
    cancelBtn.className = 'delete-data-dialog-cancel';
    cancelBtn.textContent = 'Cancel';

    var confirmBtn = document.createElement('button');
    confirmBtn.type = 'button';
    confirmBtn.className = 'delete-data-dialog-confirm';
    confirmBtn.textContent = 'Update anyway';

    actions.appendChild(cancelBtn);
    actions.appendChild(confirmBtn);
    dialog.appendChild(title);
    dialog.appendChild(body);
    dialog.appendChild(actions);
    overlay.appendChild(dialog);
    document.body.appendChild(overlay);

    function closeDialog(confirmed) {
      overlay.remove();
      document.removeEventListener('keydown', onKeyDown);
      if (confirmed && typeof onProceed === 'function') {
        onProceed();
      }
    }

    function onKeyDown(ev) {
      if (ev.key === 'Escape') {
        ev.preventDefault();
        closeDialog(false);
      }
    }

    document.addEventListener('keydown', onKeyDown);
    cancelBtn.addEventListener('click', function () {
      closeDialog(false);
    });
    overlay.addEventListener('click', function (ev) {
      if (ev.target === overlay) closeDialog(false);
    });
    confirmBtn.addEventListener('click', function () {
      closeDialog(true);
    });

    cancelBtn.focus();
  }

  function runUpdateAppFlow() {
    sessionStorage.clear();
    var keysApi = getKeysApi();
    if (keysApi) {
      keysApi.pruneLocalStorageForUpdate(localStorage);
    }

    var check = Promise.resolve();
    if (window.CloudCramUpdate && typeof window.CloudCramUpdate.checkForUpdate === 'function') {
      check = window.CloudCramUpdate.checkForUpdate();
    }

    check
      .then(function () {
        if (window.CloudCramUpdate && typeof window.CloudCramUpdate.waitAndApplyUpdate === 'function') {
          return window.CloudCramUpdate.waitAndApplyUpdate({ userInitiated: true });
        }
        var applied = false;
        if (window.CloudCramUpdate && typeof window.CloudCramUpdate.applyUpdate === 'function') {
          applied = window.CloudCramUpdate.applyUpdate();
        }
        return { applied: applied };
      })
      .then(function (result) {
        if (result && result.applied) {
          return;
        }
        window.location.reload();
      })
      .catch(function () {
        window.location.reload();
      });
  }

  function updateApp() {
    if (isQuizSessionActive()) {
      confirmUpdateDuringActiveQuiz(runUpdateAppFlow);
      return;
    }
    runUpdateAppFlow();
  }

  function deleteAllMyData(options) {
    options = options || {};
    if (!getKeysApi()) {
      window.alert(
        'Could not clear stored data safely because the app storage registry did not load. Reload Study Sessions and try Delete all my data again.'
      );
      return Promise.resolve();
    }

    return notifyTabsDeleteStarting().then(function () {
      window.__cloudcramDeleteInProgress = true;
      return runDeleteAllMyDataAfterNotify(options);
    });
  }

  function runDeleteAllMyDataAfterNotify(options) {
    var reminderApi = window.CloudCramReminderServer;
    var serverPromise = reminderApi && typeof reminderApi.deleteReminderServerRecord === 'function'
      ? reminderApi.deleteReminderServerRecord()
      : Promise.resolve({ ok: true, skipped: true });

    return serverPromise
      .then(function (serverResult) {
        if (serverResult && serverResult.ok === false && !serverResult.offline) {
          window.__cloudcramDeleteInProgress = false;
          throw new Error('SERVER_DELETE_FAILED');
        }
        var offlineNote = null;
        if (serverResult && serverResult.offline && reminderApi) {
          offlineNote = reminderApi.OFFLINE_PURGE_MESSAGE;
        }
        return unsubscribePushIfPresent().then(function () {
          return offlineNote;
        });
      })
      .then(function (offlineNote) {
        return deleteIndexedDatabases().then(function (idbOk) {
          if (!idbOk) {
            window.__cloudcramDeleteInProgress = false;
            throw new Error('IDB_DELETE_BLOCKED');
          }
          sessionStorage.clear();
          getKeysApi().clearLocalStorageForDelete(localStorage);
          return { offlineNote: offlineNote, idbOk: idbOk };
        });
      })
      .then(function (state) {
        return clearAllCaches().then(function () {
          return state;
        });
      })
      .then(function (state) {
        return unregisterAllServiceWorkers().then(function () {
          return state;
        });
      })
      .then(function (state) {
        showDeleteCompletePage(
          !options.suppressOfflineMessage ? state.offlineNote : null
        );
      })
      .catch(function (err) {
        window.__cloudcramDeleteInProgress = false;
        if (err && err.message === 'SERVER_DELETE_FAILED') {
          window.alert(
            'Could not remove your reminder record on the server. Your data was not deleted. Try again when you are online.'
          );
          return;
        }
        if (err && err.message === 'IDB_DELETE_BLOCKED') {
          window.alert(
            'Could not fully clear stored notes. Close other Study Sessions tabs and try Delete all my data again.'
          );
          return;
        }
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

  window.cloudCramStorageWritesBlocked = function () {
    return window.__cloudcramDeleteInProgress === true;
  };
})();
