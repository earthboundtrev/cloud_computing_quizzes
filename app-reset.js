/**
 * Reset app to default state: clear all localStorage, IndexedDB brain dumps,
 * unregister service worker (so next load can fetch fresh assets), then reload.
 */
(function () {
  'use strict';

  var IDB_NAME = 'StudySessionsBrainDumps';

  function resetAppToDefault() {
    if (!confirm('Reset app to default? This will clear all saved data (progress, brain dumps, quiz order, streak) and reload the page. You may get the latest code after reload. This cannot be undone.')) {
      return;
    }
    localStorage.clear();
    sessionStorage.clear();

    function unregisterServiceWorker() {
      if (!('serviceWorker' in navigator)) return Promise.resolve();
      return navigator.serviceWorker.getRegistrations().then(function (regs) {
        return Promise.all(regs.map(function (r) { return r.unregister(); }));
      });
    }

    function deleteIndexedDB() {
      return new Promise(function (resolve) {
        if (typeof indexedDB === 'undefined') {
          resolve();
          return;
        }
        var req = indexedDB.deleteDatabase(IDB_NAME);
        req.onsuccess = function () { resolve(); };
        req.onerror = function () { resolve(); };
        req.onblocked = function () { resolve(); };
      });
    }

    deleteIndexedDB()
      .then(unregisterServiceWorker)
      .then(function () {
        location.reload(true);
      });
  }

  window.resetAppToDefault = resetAppToDefault;

  function initButton() {
    var btn = document.getElementById('reset-app-btn');
    if (btn) {
      btn.addEventListener('click', resetAppToDefault);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initButton);
  } else {
    initButton();
  }
})();
