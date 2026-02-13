/**
 * Register the Cloud Cram service worker for offline support.
 */
(function () {
  if (!('serviceWorker' in navigator)) return;
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/sw.js', { scope: '/' })
      .then(function (reg) {
        if (reg.installing) {
          console.log('Cloud Cram SW installing');
        } else if (reg.waiting) {
          console.log('Cloud Cram SW waiting');
        } else if (reg.active) {
          console.log('Cloud Cram SW active (offline ready)');
        }
      })
      .catch(function (err) {
        console.warn('Cloud Cram SW registration failed:', err);
      });
  });
})();
