/**
 * Authenticated reminder-server DELETE hook (#70 / #72).
 * No-op until push reminders ship; CloudCramPush.deleteServerRecord wires the real call.
 */
(function () {
  'use strict';

  var OFFLINE_PURGE_MESSAGE =
    "You're offline. Your reminder record on the server will be removed automatically within 30 days.";

  /**
   * DELETE the user's reminder record on the server (token-authenticated when #72 lands).
   * @returns {Promise<{ok: boolean, offline?: boolean, skipped?: boolean}>}
   */
  function deleteReminderServerRecord() {
    if (typeof navigator !== 'undefined' && navigator.onLine === false) {
      return Promise.resolve({ ok: false, offline: true });
    }
    if (typeof window.CloudCramPush === 'object' &&
        window.CloudCramPush !== null &&
        typeof window.CloudCramPush.deleteServerRecord === 'function') {
      return Promise.resolve(window.CloudCramPush.deleteServerRecord());
    }
    return Promise.resolve({ ok: true, skipped: true });
  }

  window.CloudCramReminderServer = {
    deleteReminderServerRecord: deleteReminderServerRecord,
    OFFLINE_PURGE_MESSAGE: OFFLINE_PURGE_MESSAGE
  };
})();
