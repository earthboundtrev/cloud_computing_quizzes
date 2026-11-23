/**
 * Detect Capacitor Android/iOS WebView (bundled assets, not hosted PWA).
 */
(function () {
  'use strict';

  function isNativePlatform() {
    return !!(
      window.Capacitor &&
      typeof window.Capacitor.isNativePlatform === 'function' &&
      window.Capacitor.isNativePlatform()
    );
  }

  window.CloudCramCapacitor = {
    isNativePlatform: isNativePlatform
  };
})();