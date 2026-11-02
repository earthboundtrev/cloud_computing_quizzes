/**
 * Register the Cloud Cram service worker and prompt when a new version is waiting.
 */
(function () {
  'use strict';

  if (!('serviceWorker' in navigator)) return;

  var registration = null;
  var updatePending = false;
  var bannerDismissed = false;
  var reloadGuard = false;
  var deferCheckTimer = null;
  var pendingWaitingWorker = null;
  var UPDATE_INTERVAL_MS = 60 * 60 * 1000;
  var DEFER_POLL_MS = 5000;
  var UPDATE_WAIT_TIMEOUT_MS = 15000;

  function isQuizActive() {
    return !!(window.QuizEngine && typeof window.QuizEngine.isQuizActive === 'function' && window.QuizEngine.isQuizActive());
  }

  function getWaitingWorker() {
    if (registration && registration.waiting) return registration.waiting;
    return null;
  }

  function hasControllingWorker() {
    return !!navigator.serviceWorker.controller;
  }

  function markUpdatePending(waitingWorker) {
    if (!hasControllingWorker()) return;
    var waiting = waitingWorker || getWaitingWorker();
    if (!waiting) return;
    pendingWaitingWorker = waiting;
    updatePending = true;
    maybeShowBanner();
  }

  function syncBodyBannerOffset() {
    var banner = document.getElementById('app-update-banner');
    if (banner) {
      document.body.classList.add('app-update-banner-visible');
      document.body.style.setProperty('--app-update-banner-height', banner.offsetHeight + 'px');
    } else {
      document.body.classList.remove('app-update-banner-visible');
      document.body.style.removeProperty('--app-update-banner-height');
    }
  }

  function hideBannerElement() {
    var el = document.getElementById('app-update-banner');
    if (el) el.remove();
    syncBodyBannerOffset();
  }

  function onQuizActivityChange() {
    if (isQuizActive()) {
      hideBannerElement();
      maybeShowBanner();
      return;
    }
    maybeShowBanner();
  }

  function maybeShowBanner() {
    if (!updatePending || bannerDismissed) return;
    if (isQuizActive()) {
      if (deferCheckTimer) return;
      deferCheckTimer = setInterval(function () {
        if (!updatePending || bannerDismissed) {
          clearInterval(deferCheckTimer);
          deferCheckTimer = null;
          return;
        }
        if (!isQuizActive()) {
          clearInterval(deferCheckTimer);
          deferCheckTimer = null;
          showBanner();
        }
      }, DEFER_POLL_MS);
      return;
    }
    showBanner();
  }

  function showBanner() {
    if (!updatePending || bannerDismissed) return;
    if (isQuizActive()) {
      maybeShowBanner();
      return;
    }
    var existing = document.getElementById('app-update-banner');
    if (existing) return;

    var banner = document.createElement('div');
    banner.id = 'app-update-banner';
    banner.className = 'app-update-banner';
    banner.setAttribute('role', 'status');

    var text = document.createElement('span');
    text.className = 'app-update-banner-text';
    text.textContent = 'A new version is ready.';

    var actions = document.createElement('div');
    actions.className = 'app-update-banner-actions';

    var reloadBtn = document.createElement('button');
    reloadBtn.type = 'button';
    reloadBtn.className = 'app-update-banner-reload';
    reloadBtn.textContent = 'Reload';
    reloadBtn.addEventListener('click', applyUpdate);

    var dismissBtn = document.createElement('button');
    dismissBtn.type = 'button';
    dismissBtn.className = 'app-update-banner-dismiss';
    dismissBtn.setAttribute('aria-label', 'Dismiss update notice');
    dismissBtn.textContent = 'Dismiss';
    dismissBtn.addEventListener('click', function () {
      bannerDismissed = true;
      banner.remove();
      syncBodyBannerOffset();
    });

    actions.appendChild(reloadBtn);
    actions.appendChild(dismissBtn);
    banner.appendChild(text);
    banner.appendChild(actions);
    document.body.appendChild(banner);
    syncBodyBannerOffset();
  }

  function applyUpdate() {
    if (isQuizActive()) {
      maybeShowBanner();
      return false;
    }
    var waiting = getWaitingWorker() || pendingWaitingWorker;
    if (!waiting) {
      updatePending = false;
      pendingWaitingWorker = null;
      hideBannerElement();
      return false;
    }
    reloadGuard = true;
    waiting.postMessage({ type: 'SKIP_WAITING' });
    return true;
  }

  function checkForUpdate() {
    if (!registration) return Promise.resolve();
    return registration.update().catch(function (err) {
      console.warn('Cloud Cram SW update check failed:', err);
    });
  }

  /**
   * After registration.update(), wait until a worker is waiting (install finished)
   * or until timeoutMs. Resolves with the waiting ServiceWorker or null.
   */
  function waitForWaitingWorker(timeoutMs) {
    timeoutMs = timeoutMs || UPDATE_WAIT_TIMEOUT_MS;
    return new Promise(function (resolve) {
      if (!registration) {
        resolve(null);
        return;
      }

      var settled = false;
      var timer = null;

      function cleanup() {
        if (timer) clearTimeout(timer);
        registration.removeEventListener('updatefound', onUpdateFoundWhileWaiting);
      }

      function finish(worker) {
        if (settled) return;
        settled = true;
        cleanup();
        resolve(worker);
      }

      function tryResolveWaiting() {
        if (registration.waiting && hasControllingWorker()) {
          finish(registration.waiting);
          return true;
        }
        return false;
      }

      function watchInstalling(worker) {
        if (!worker) return;
        worker.addEventListener('statechange', function () {
          if (worker.state === 'installed' && hasControllingWorker()) {
            finish(registration.waiting || worker);
          }
        });
      }

      function onUpdateFoundWhileWaiting() {
        watchInstalling(registration.installing);
        tryResolveWaiting();
      }

      if (tryResolveWaiting()) return;

      watchInstalling(registration.installing);
      registration.addEventListener('updatefound', onUpdateFoundWhileWaiting);

      timer = setTimeout(function () {
        finish(null);
      }, timeoutMs);
    });
  }

  function waitAndApplyUpdate(options) {
    options = options || {};
    var timeoutMs = options.timeoutMs || UPDATE_WAIT_TIMEOUT_MS;
    return waitForWaitingWorker(timeoutMs).then(function (waiting) {
      if (!waiting) {
        return { applied: false, reason: 'no_update' };
      }
      pendingWaitingWorker = waiting;
      updatePending = true;
      var applied = applyUpdate();
      return { applied: applied, reason: applied ? 'skip_waiting' : 'blocked' };
    });
  }

  function trackInstallingWorker(worker) {
    if (!worker) return;
    worker.addEventListener('statechange', function () {
      if (worker.state === 'installed' && hasControllingWorker()) {
        markUpdatePending(registration.waiting || worker);
      }
    });
  }

  function onUpdateFound() {
    trackInstallingWorker(registration.installing);
  }

  function setupControllerChangeReload() {
    navigator.serviceWorker.addEventListener('controllerchange', function () {
      if (!reloadGuard) return;
      reloadGuard = false;
      window.location.reload();
    });
  }

  function initRegistration(reg) {
    registration = reg;
    registration.addEventListener('updatefound', onUpdateFound);
    if (registration.waiting && hasControllingWorker()) {
      markUpdatePending();
    }
    if (registration.installing) {
      trackInstallingWorker(registration.installing);
    }
  }

  setupControllerChangeReload();

  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/sw.js', { scope: '/' })
      .then(function (reg) {
        initRegistration(reg);
        return checkForUpdate();
      })
      .catch(function (err) {
        console.warn('Cloud Cram SW registration failed:', err);
      });

    setInterval(function () {
      checkForUpdate();
    }, UPDATE_INTERVAL_MS);
  });

  window.CloudCramUpdate = {
    checkForUpdate: checkForUpdate,
    applyUpdate: applyUpdate,
    waitForWaitingWorker: waitForWaitingWorker,
    waitAndApplyUpdate: waitAndApplyUpdate,
    onQuizActivityChange: onQuizActivityChange
  };
})();
