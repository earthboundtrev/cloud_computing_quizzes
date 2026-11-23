/**
 * Android WebView UX: version line, hide PWA update controls, import card, system Back.
 */
(function () {
  'use strict';

  var IMPORT_DISMISS_KEY = 'cloudcram_native_import_card_dismissed';
  var NATIVE_APP_VERSION = '1.0.0';

  function isNative() {
    return window.CloudCramCapacitor && window.CloudCramCapacitor.isNativePlatform();
  }

  function webCacheLabel() {
    if (typeof window.CLOUDCRAM_WEB_CACHE_NAME === 'string' && window.CLOUDCRAM_WEB_CACHE_NAME) {
      return window.CLOUDCRAM_WEB_CACHE_NAME;
    }
    return 'web';
  }

  function hidePwaUpdateControls() {
    var ids = ['update-app-btn', 'settings-update-help'];
    ids.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.style.display = 'none';
    });
    var block = document.querySelector('.settings-block-update');
    if (block) block.style.display = 'none';
    document.querySelectorAll('.nav-update-btn').forEach(function (btn) {
      btn.style.display = 'none';
    });
  }

  function addSettingsVersionLine() {
    var panel = document.getElementById('settings-panel');
    if (!panel) return;
    var existing = document.getElementById('native-app-version-line');
    if (existing) return;
    var p = document.createElement('p');
    p.id = 'native-app-version-line';
    p.className = 'settings-help';
    p.textContent = 'App ' + NATIVE_APP_VERSION + ' · ' + webCacheLabel();
    var status = document.getElementById('settings-status');
    if (status && status.parentNode) {
      status.parentNode.insertBefore(p, status);
    } else {
      panel.appendChild(p);
    }
  }

  function isLauncherPage() {
    var path = (window.location.pathname || '').split('/').pop() || '';
    return path === '' || path === 'index.html';
  }

  function quizSessionActive() {
    return !!(
      window.QuizEngine &&
      typeof window.QuizEngine.isQuizActive === 'function' &&
      window.QuizEngine.isQuizActive()
    );
  }

  function setupBackButton() {
    var App = window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.App;
    if (!App || typeof App.addListener !== 'function') return;
    App.addListener('backButton', function () {
      if (quizSessionActive()) {
        return;
      }
      if (isLauncherPage()) {
        App.exitApp();
        return;
      }
      if (window.history.length > 1) {
        window.history.back();
        return;
      }
      window.location.href = 'index.html';
    });
  }

  function showImportProgressCard() {
    if (!isLauncherPage()) return;
    try {
      if (localStorage.getItem(IMPORT_DISMISS_KEY) === '1') return;
    } catch (e) {
      return;
    }
    var launcher = document.getElementById('game-launcher');
    if (!launcher) return;

    var card = document.createElement('div');
    card.id = 'native-import-progress-card';
    card.className = 'app-update-banner';
    card.setAttribute('role', 'status');

    var text = document.createElement('span');
    text.className = 'app-update-banner-text';
    text.textContent =
      'Coming from the browser app? Import a progress file from Settings > Your data.';

    var actions = document.createElement('div');
    actions.className = 'app-update-banner-actions';

    var importBtn = document.createElement('button');
    importBtn.type = 'button';
    importBtn.className = 'app-update-banner-reload';
    importBtn.textContent = 'Import progress…';
    importBtn.addEventListener('click', function () {
      var trigger = document.getElementById('import-progress-btn');
      if (trigger) trigger.click();
    });

    var dismissBtn = document.createElement('button');
    dismissBtn.type = 'button';
    dismissBtn.className = 'app-update-banner-dismiss';
    dismissBtn.textContent = 'Dismiss';
    dismissBtn.addEventListener('click', function () {
      try {
        localStorage.setItem(IMPORT_DISMISS_KEY, '1');
      } catch (e) {}
      card.remove();
    });

    actions.appendChild(importBtn);
    actions.appendChild(dismissBtn);
    card.appendChild(text);
    card.appendChild(actions);
    launcher.parentNode.insertBefore(card, launcher);
  }

  function onReady() {
    hidePwaUpdateControls();
    addSettingsVersionLine();
    setupBackButton();
    showImportProgressCard();
  }

  function init() {
    if (!isNative()) return;
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', onReady);
    } else {
      onReady();
    }
  }

  init();
})();