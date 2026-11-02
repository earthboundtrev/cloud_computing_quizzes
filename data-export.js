/**
 * Full local progress export before Delete all my data (no push endpoints or auth tokens).
 */
(function () {
  'use strict';

  var IDB_NAME = 'StudySessionsBrainDumps';

  function readBrainDumpsFromIdb() {
    return new Promise(function (resolve) {
      if (typeof indexedDB === 'undefined') {
        resolve(null);
        return;
      }
      var req;
      try {
        req = indexedDB.open(IDB_NAME);
      } catch (e) {
        resolve(null);
        return;
      }
      req.onerror = function () { resolve(null); };
      req.onsuccess = function () {
        var db = req.result;
        if (!db.objectStoreNames.contains('dumps')) {
          db.close();
          resolve([]);
          return;
        }
        var tx = db.transaction('dumps', 'readonly');
        var store = tx.objectStore('dumps');
        var all = store.getAll();
        all.onsuccess = function () {
          db.close();
          resolve(all.result || []);
        };
        all.onerror = function () {
          db.close();
          resolve(null);
        };
      };
    });
  }

  function buildExportPayload(brainDumpsIdb) {
    var keysApi = window.CloudCramStorageKeys;
    var local = keysApi
      ? keysApi.collectExportableLocalStorage(localStorage)
      : {};
    return {
      exportedAt: new Date().toISOString(),
      schema: 'cloudcram-export-v1',
      localStorage: local,
      brainDumpsIndexedDB: brainDumpsIdb,
      note: 'Push subscription endpoints and auth tokens are never included in this file.'
    };
  }

  function downloadJson(filename, obj) {
    var blob = new Blob([JSON.stringify(obj, null, 2)], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.rel = 'noopener';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 5000);
  }

  function exportAllUserData() {
    return readBrainDumpsFromIdb().then(function (dumps) {
      var payload = buildExportPayload(dumps);
      var date = new Date().toISOString().slice(0, 10);
      downloadJson('cloudcram_export_' + date + '.json', payload);
      return payload;
    });
  }

  window.CloudCramDataExport = {
    exportAllUserData: exportAllUserData,
    buildExportPayload: buildExportPayload
  };
})();
