/**
 * Blocks localStorage/IDB writes while Delete all my data runs (all tabs).
 */
(function () {
  'use strict';

  var BROADCAST_CHANNEL = 'cloudcram-data-lifecycle';

  function writesBlocked() {
    return window.__cloudcramDeleteInProgress === true;
  }

  window.cloudCramStorageWritesBlocked = writesBlocked;

  if (typeof BroadcastChannel !== 'undefined') {
    try {
      var ch = new BroadcastChannel(BROADCAST_CHANNEL);
      ch.onmessage = function (ev) {
        if (ev.data && ev.data.type === 'DELETE_ALL_DATA') {
          window.__cloudcramDeleteInProgress = true;
        }
      };
    } catch (e) {}
  }
})();
