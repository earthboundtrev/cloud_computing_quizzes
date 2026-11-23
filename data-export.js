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

  function isNativeExport() {
    return window.CloudCramCapacitor && window.CloudCramCapacitor.isNativePlatform();
  }

  function getCapPlugin(name) {
    return window.Capacitor &&
      window.Capacitor.Plugins &&
      window.Capacitor.Plugins[name]
      ? window.Capacitor.Plugins[name]
      : null;
  }

  function isShareCanceled(err) {
    var msg = err && (err.message || String(err));
    return /cancel/i.test(msg || '');
  }

  var NATIVE_EXPORT_SUBDIR = 'exports/';

  function nativeSaveJson(filename, jsonText) {
    var Share = getCapPlugin('Share');
    var Filesystem = getCapPlugin('Filesystem');
    if (!Share || !Filesystem) {
      return Promise.reject(new Error('no_native_plugins'));
    }
    var cachePath = NATIVE_EXPORT_SUBDIR + filename;
    return Filesystem.writeFile({
      path: cachePath,
      data: jsonText,
      directory: 'CACHE',
      encoding: 'utf8',
      recursive: true
    })
      .then(function () {
        return Filesystem.getUri({ path: cachePath, directory: 'CACHE' });
      })
      .then(function (uriResult) {
        return Share.share({
          title: 'Cloud Cram progress',
          text: 'Cloud Cram progress export',
          files: [uriResult.uri],
          dialogTitle: 'Save or share progress'
        });
      })
      .catch(function (err) {
        if (isShareCanceled(err)) return Promise.resolve();
        return Promise.reject(err);
      });
  }

  function downloadJson(filename, obj) {
    var jsonText = JSON.stringify(obj, null, 2);
    if (isNativeExport()) {
      return nativeSaveJson(filename, jsonText);
    }
    var blob = new Blob([jsonText], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.rel = 'noopener';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 5000);
    return Promise.resolve();
  }

  function exportAllUserData() {
    return readBrainDumpsFromIdb().then(function (dumps) {
      var payload = buildExportPayload(dumps);
      var date = new Date().toISOString().slice(0, 10);
      var filename = progressFilenameForDate(date);
      return downloadJson(filename, payload).then(function () {
        return payload;
      });
    });
  }

  function progressFilenameForDate(isoDate) {
    return 'cloudcram-progress-' + (isoDate || new Date().toISOString().slice(0, 10)) + '.json';
  }

  window.CloudCramDataExport = {
    exportAllUserData: exportAllUserData,
    buildExportPayload: buildExportPayload,
    progressFilenameForDate: progressFilenameForDate
  };
})();
