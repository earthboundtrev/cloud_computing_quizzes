/**
 * Android local reminders via @capacitor/local-notifications (#112). No-op in browser/PWA.
 */
(function () {
  'use strict';

  var QUICK_URL = '/index.html?quick=1';
  var rescheduleInFlight = null;
  var BANNER_DISMISS_MS = 7 * 24 * 60 * 60 * 1000;
  var OPT_IN_COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000;
  var PERMISSION_BANNER_COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000;

  function native() {
    return window.CloudCramCapacitor && window.CloudCramCapacitor.isNativePlatform();
  }

  function getPlugin() {
    return window.Capacitor &&
      window.Capacitor.Plugins &&
      window.Capacitor.Plugins.LocalNotifications
      ? window.Capacitor.Plugins.LocalNotifications
      : null;
  }

  function pushApi() {
    return window.CloudCramPushLocal || null;
  }

  function scheduleApi() {
    return window.CloudCramReminderSchedule || null;
  }

  function copyApi() {
    return window.CloudCramReminderCopy || null;
  }

  function readSettings() {
    var api = pushApi();
    return api ? api.readSettings(localStorage) : { enabled: false };
  }

  function writeSettings(next) {
    var api = pushApi();
    if (!api) return;
    api.writeSettings(localStorage, next);
    rescheduleAll('settings');
  }

  function gameSnapshot() {
    return window.CloudCramGame && window.CloudCramGame.getSnapshot
      ? window.CloudCramGame.getSnapshot()
      : null;
  }

  function todayStr() {
    return window.CloudCramGame && window.CloudCramGame.todayStr
      ? window.CloudCramGame.todayStr()
      : new Date().toISOString().slice(0, 10);
  }

  function hasFreezeHeld() {
    var snap = gameSnapshot();
    if (!snap) return false;
    if ((snap.freezes || 0) > 0) return true;
    if (snap.notices && snap.notices.freezeSavedYesterday) return true;
    return false;
  }

  function buildScheduleContext() {
    var snap = gameSnapshot();
    var settings = readSettings();
    var push = pushApi();
    var mins = push ? push.parseHourMinute(settings.time) : 19 * 60;
    if (mins == null) mins = 19 * 60;
    mins = push ? push.clampReminderMinutes(mins) : mins;
    return {
      today: snap ? snap.today : todayStr(),
      dailyEnabled: settings.enabled === true,
      eveningEnabled: settings.streakNudgeEnabled === true,
      dailyTimeMinutes: mins,
      goalMetToday: !!(snap && snap.met),
      goal: snap ? snap.goal : 3,
      streak: snap ? snap.streak : 0,
      inVacation: !!(snap && snap.vacation),
      freezesHeld: snap ? snap.freezes || 0 : 0,
      repairActive:
        window.CloudCramGame && window.CloudCramGame.repairOfferActive
          ? window.CloudCramGame.repairOfferActive(
              window.CloudCramGame.loadState ? window.CloudCramGame.loadState() : null
            )
          : false,
      freezeHeld: hasFreezeHeld(),
      freezeSavedYesterday: !!(snap && snap.notices && snap.notices.freezeSavedYesterday),
      examDate: settings.examDate || null,
      dueReviews: 0,
      hadRecentMiss:
        snap &&
        snap.streak === 0 &&
        !snap.met &&
        (snap.notices || {}).hadStreakBreak !== undefined
    };
  }

  function formatTimeLabel(mins) {
    var h = Math.floor(mins / 60);
    var m = mins % 60;
    var h12 = ((h + 11) % 12) + 1;
    var ampm = h < 12 ? 'AM' : 'PM';
    return h12 + ':' + String(m).padStart(2, '0') + ' ' + ampm;
  }

  function permissionState() {
    return permPromise || Promise.resolve('unknown');
  }

  var permPromise = null;
  function refreshPermission() {
    var LN = getPlugin();
    if (!LN || typeof LN.checkPermissions !== 'function') {
      permPromise = Promise.resolve('unknown');
      return permPromise;
    }
    permPromise = LN.checkPermissions()
      .then(function (res) {
        var display = (res && res.display) || (res && res.notifications);
        if (display === 'granted') return 'granted';
        if (display === 'denied') return 'denied';
        return 'prompt';
      })
      .catch(function () {
        return 'unknown';
      });
    return permPromise;
  }

  function exactAlarmGranted() {
    var LN = getPlugin();
    if (!LN || typeof LN.checkExactNotificationSetting !== 'function') {
      return Promise.resolve(false);
    }
    return LN.checkExactNotificationSetting()
      .then(function (res) {
        return !!(res && res.exact_alarm === 'granted');
      })
      .catch(function () {
        return false;
      });
  }

  function openAppNotificationSettings() {
    if (!native()) return;
    try {
      window.location.href =
        'intent:#Intent;action=android.settings.APP_NOTIFICATION_SETTINGS;' +
        'package=com.earthboundtrev.cloudcram;' +
        'S.android.provider.extra.APP_PACKAGE=com.earthboundtrev.cloudcram;end';
    } catch (e) {}
  }

  function ensureChannels() {
    var LN = getPlugin();
    if (!LN || typeof LN.createChannel !== 'function' || !scheduleApi()) return Promise.resolve();
    var sch = scheduleApi();
    return Promise.all([
      LN.createChannel({
        id: sch.CHANNEL_DAILY,
        name: 'Daily reminder',
        importance: 3,
        visibility: 0,
        vibration: true
      }),
      LN.createChannel({
        id: sch.CHANNEL_EVENING,
        name: 'Streak nudge',
        importance: 3,
        visibility: 0,
        vibration: true
      })
    ]).catch(function () {});
  }

  function planToNotifications(plan, exact) {
    return plan.map(function (item) {
      var at = item.at;
      if (!at || !(at instanceof Date) || at.getTime() <= Date.now()) {
        if (item.kind === 'daily' && item.date !== todayStr()) return null;
        if (item.kind === 'evening' && at && at.getTime() <= Date.now()) return null;
      }
      return {
        id: item.id,
        title: item.title,
        body: item.body,
        largeBody: item.body,
        summaryText: copyApi() ? copyApi().LOCK_SCREEN_GENERIC : 'Cloud Quizzes',
        channelId: item.channelId,
        schedule: {
          at: at,
          allowWhileIdle: true
        },
        sound: 'default',
        actionTypeId: 'OPEN_QUICK',
        extra: {
          reminderKind: item.kind
        }
      };
    }).filter(Boolean);
  }

  function rescheduleAll(reason) {
    if (!native()) return Promise.resolve();
    if (rescheduleInFlight) return rescheduleInFlight;
    var LN = getPlugin();
    var sch = scheduleApi();
    if (!LN || !sch) return Promise.resolve();
    rescheduleInFlight = refreshPermission()
      .then(function (perm) {
        if (perm !== 'granted') return null;
        var settings = readSettings();
        if (!settings.enabled) {
          return LN.cancel({ notifications: sch.allScheduledIds().map(function (id) { return { id: id }; }) });
        }
        return ensureChannels()
          .then(function () {
            return LN.cancel({ notifications: sch.allScheduledIds().map(function (id) { return { id: id }; }) });
          })
          .then(function () {
            var ctx = buildScheduleContext();
            var plan = sch.buildNotificationPlan(ctx);
            return exactAlarmGranted().then(function (exact) {
              var notifications = planToNotifications(plan, exact);
              if (!notifications.length) return null;
              return LN.schedule({ notifications: notifications });
            });
          });
      })
      .then(function () {
        refreshStatusLine();
      })
      .catch(function () {})
      .finally(function () {
        rescheduleInFlight = null;
      });
    return rescheduleInFlight;
  }

  function cancelAllPending() {
    if (!native()) return Promise.resolve();
    var LN = getPlugin();
    var sch = scheduleApi();
    if (!LN || !sch) return Promise.resolve();
    return LN.cancel({ notifications: sch.allScheduledIds().map(function (id) { return { id: id }; }) }).catch(
      function () {}
    );
  }

  function refreshStatusLine() {
    var el = document.getElementById('reminder-status-line');
    if (!el) return;
    Promise.all([refreshPermission(), exactAlarmGranted()]).then(function (parts) {
      var perm = parts[0];
      var exact = parts[1];
      var ctx = buildScheduleContext();
      var settings = readSettings();
      var push = pushApi();
      var mins = push ? push.parseHourMinute(settings.time) : 19 * 60;
      ctx.nextDailyAt = settings.enabled && mins != null ? formatTimeLabel(mins) : '';
      var sch = scheduleApi();
      var status = sch ? sch.describeStatus(ctx, perm, exact) : { text: '' };
      el.textContent = status.text;
      el.dataset.state = status.key;
    });
  }

  function requestPermissionFromGesture() {
    var LN = getPlugin();
    if (!LN || typeof LN.requestPermissions !== 'function') {
      return Promise.resolve('denied');
    }
    return LN.requestPermissions()
      .then(function (res) {
        var display = (res && res.display) || (res && res.notifications);
        return display === 'granted' ? 'granted' : 'denied';
      })
      .catch(function () {
        return 'denied';
      });
  }

  function wireSettingsReminders() {
    if (!native()) return;
    var panel = document.getElementById('settings-panel');
    if (!panel || document.getElementById('reminder-settings-block')) return;

    var block = document.createElement('div');
    block.className = 'settings-block';
    block.id = 'reminder-settings-block';
    var h = document.createElement('h3');
    h.className = 'settings-subheading';
    h.textContent = 'Reminders';
    block.appendChild(h);

    var help = document.createElement('p');
    help.className = 'settings-help';
    help.textContent =
      'Local reminders only on this device. Meeting today\'s goal in the browser app does not cancel a reminder already scheduled here until you import progress or meet the goal in this app.';
    block.appendChild(help);

    var settings = readSettings();

    var dailyRow = document.createElement('div');
    dailyRow.className = 'game-sound-toggle';
    var dailyLbl = document.createElement('label');
    var dailyCb = document.createElement('input');
    dailyCb.type = 'checkbox';
    dailyCb.checked = settings.enabled;
    dailyLbl.appendChild(dailyCb);
    dailyLbl.appendChild(document.createTextNode(' Daily reminder'));
    dailyRow.appendChild(dailyLbl);
    block.appendChild(dailyRow);

    var timeLbl = document.createElement('label');
    timeLbl.className = 'settings-help';
    timeLbl.appendChild(document.createTextNode('Time '));
    var timeInput = document.createElement('input');
    timeInput.type = 'time';
    timeInput.value = settings.time || '19:00';
    timeInput.disabled = !settings.enabled;
    timeLbl.appendChild(timeInput);
    block.appendChild(timeLbl);

    var clampNote = document.createElement('p');
    clampNote.className = 'settings-help';
    clampNote.textContent = 'Reminders run 8 AM\u20139:30 PM';
    block.appendChild(clampNote);

    var eveRow = document.createElement('div');
    eveRow.className = 'game-sound-toggle';
    var eveLbl = document.createElement('label');
    var eveCb = document.createElement('input');
    eveCb.type = 'checkbox';
    eveCb.checked = settings.streakNudgeEnabled;
    eveLbl.appendChild(eveCb);
    eveLbl.appendChild(document.createTextNode(' Evening reminder if today\'s goal is open'));
    eveRow.appendChild(eveLbl);
    block.appendChild(eveRow);

    var eveHelp = document.createElement('p');
    eveHelp.className = 'settings-help';
    eveHelp.textContent = 'Only when your streak is 7+ days.';
    block.appendChild(eveHelp);

    var status = document.createElement('p');
    status.className = 'settings-status';
    status.id = 'reminder-status-line';
    status.setAttribute('role', 'status');
    block.appendChild(status);

    var testBtn = document.createElement('button');
    testBtn.type = 'button';
    testBtn.className = 'settings-data-btn settings-data-btn-secondary';
    testBtn.textContent = 'Send test notification';
    testBtn.style.display = 'none';
    block.appendChild(testBtn);

    var openSettingsBtn = document.createElement('button');
    openSettingsBtn.type = 'button';
    openSettingsBtn.className = 'settings-data-btn settings-data-btn-secondary';
    openSettingsBtn.textContent = 'Open settings';
    openSettingsBtn.style.display = 'none';

    var exactLink = document.createElement('button');
    exactLink.type = 'button';
    exactLink.className = 'settings-data-btn settings-data-btn-secondary';
    exactLink.textContent = 'Allow exact time';
    exactLink.style.display = 'none';

    block.appendChild(openSettingsBtn);
    block.appendChild(exactLink);

    var dataBlock = panel.querySelector('.settings-block-data');
    panel.insertBefore(block, dataBlock || panel.firstChild);

    function syncEnabledFromToggle() {
      var next = readSettings();
      next.enabled = dailyCb.checked;
      next.streakNudgeEnabled = eveCb.checked;
      if (dailyCb.checked && !next.explicitTime) next.explicitTime = timeInput.value || next.time;
      writeSettings(next);
      timeInput.disabled = !dailyCb.checked;
    }

    dailyCb.addEventListener('change', function () {
      if (dailyCb.checked) {
        requestPermissionFromGesture().then(function (perm) {
          if (perm !== 'granted') {
            dailyCb.checked = false;
            refreshStatusLine();
            updateAuxButtons();
            return;
          }
          syncEnabledFromToggle();
          updateAuxButtons();
        });
      } else {
        syncEnabledFromToggle();
        updateAuxButtons();
      }
    });

    eveCb.addEventListener('change', function () {
      var next = readSettings();
      next.streakNudgeEnabled = eveCb.checked;
      writeSettings(next);
    });

    timeInput.addEventListener('change', function () {
      var push = pushApi();
      var next = readSettings();
      var parsed = push ? push.parseHourMinute(timeInput.value) : null;
      if (parsed == null) return;
      var clamped = push.clampReminderMinutes(parsed);
      if (clamped !== parsed) {
        timeInput.value = push.minutesToTime(clamped);
      }
      next.time = timeInput.value;
      next.explicitTime = next.time;
      writeSettings(next);
    });

    function updateAuxButtons() {
      refreshPermission().then(function (perm) {
        testBtn.style.display = perm === 'granted' && dailyCb.checked ? '' : 'none';
        openSettingsBtn.style.display = perm === 'denied' ? '' : 'none';
        exactAlarmGranted().then(function (exact) {
          exactLink.style.display = dailyCb.checked && !exact ? '' : 'none';
        });
      });
    }

    testBtn.addEventListener('click', function () {
      var LN = getPlugin();
      var sch = scheduleApi();
      var cpy = copyApi();
      if (!LN || !sch || !cpy) return;
      ensureChannels().then(function () {
        var ctx = buildScheduleContext();
        var body = cpy.selectDailyBody(
          Object.assign({ isToday: true, date: ctx.today }, ctx, { goal: ctx.goal, streakDay: ctx.streak })
        );
        LN.schedule({
          notifications: [
            {
              id: 91001,
              title: cpy.LOCK_SCREEN_GENERIC,
              body: body,
              channelId: sch.CHANNEL_DAILY,
              schedule: { at: new Date(Date.now() + 1500), allowWhileIdle: true },
              actionTypeId: 'OPEN_QUICK'
            }
          ]
        }).then(refreshStatusLine);
      });
    });

    openSettingsBtn.addEventListener('click', function () {
      openAppNotificationSettings();
    });

    exactLink.addEventListener('click', function () {
      var LN = getPlugin();
      if (LN && typeof LN.changeExactNotificationSetting === 'function') {
        LN.changeExactNotificationSetting().then(refreshStatusLine);
        return;
      }
      openAppNotificationSettings();
    });

    updateAuxButtons();
    refreshStatusLine();
  }

  function maybePermissionBanner() {
    if (!native() || !isLauncher()) return;
    refreshPermission().then(function (perm) {
      if (perm !== 'denied') return;
      var settings = readSettings();
      var now = Date.now();
      if (now - settings.permissionBannerAt < PERMISSION_BANNER_COOLDOWN_MS) return;
      if (document.getElementById('reminder-permission-banner')) return;
      var banner = document.createElement('div');
      banner.id = 'reminder-permission-banner';
      banner.className = 'app-update-banner';
      banner.setAttribute('role', 'status');
      var text = document.createElement('span');
      text.className = 'app-update-banner-text';
      text.textContent = 'Reminders are blocked. Turn on in Settings';
      var dismiss = document.createElement('button');
      dismiss.type = 'button';
      dismiss.className = 'app-update-banner-dismiss';
      dismiss.textContent = 'Dismiss';
      dismiss.addEventListener('click', function () {
        var next = readSettings();
        next.permissionBannerAt = Date.now();
        writeSettings(next);
        banner.remove();
      });
      banner.appendChild(text);
      banner.appendChild(dismiss);
      var launcher = document.getElementById('game-launcher');
      if (launcher && launcher.parentNode) {
        launcher.parentNode.insertBefore(banner, launcher);
      }
    });
  }

  function isLauncher() {
    var path = (window.location.pathname || '').split('/').pop() || '';
    return path === '' || path === 'index.html';
  }

  function shouldAskOptIn() {
    var settings = readSettings();
    if (settings.enabled) return false;
    if (settings.optInDismissCount >= 2) return false;
    var now = Date.now();
    if (settings.lastOptInAskAt && now - settings.lastOptInAskAt < OPT_IN_COOLDOWN_MS) return false;
    return true;
  }

  function showResultsOptInCard() {
    if (!native()) return;
    var snap = gameSnapshot();
    if (!snap || !snap.met) return;
    if (!shouldAskOptIn()) return;
    var existing = document.getElementById('reminder-opt-in-card');
    if (existing) return;
    var host = document.getElementById('results-screen');
    if (!host || host.classList.contains('hidden')) return;

    var card = document.createElement('div');
    card.id = 'reminder-opt-in-card';
    card.className = 'game-neutral-banner';
    card.setAttribute('role', 'region');
    card.appendChild(document.createTextNode('Want a daily nudge at 7:00 PM? '));
    var turnOn = document.createElement('button');
    turnOn.type = 'button';
    turnOn.className = 'game-start-btn';
    turnOn.textContent = 'Turn on';
    var notNow = document.createElement('button');
    notNow.type = 'button';
    notNow.className = 'game-start-btn';
    notNow.style.marginLeft = '0.5rem';
    notNow.textContent = 'Not now';
    card.appendChild(turnOn);
    card.appendChild(notNow);
    host.insertBefore(card, host.firstChild);

    function dismissOptIn(countBump) {
      var next = readSettings();
      next.lastOptInAskAt = Date.now();
      if (countBump) next.optInDismissCount += 1;
      writeSettings(next);
      card.remove();
    }

    notNow.addEventListener('click', function () {
      dismissOptIn(true);
    });

    turnOn.addEventListener('click', function () {
      requestPermissionFromGesture().then(function (perm) {
        if (perm !== 'granted') {
          dismissOptIn(false);
          return;
        }
        var next = readSettings();
        next.enabled = true;
        next.time = '19:00';
        next.explicitTime = '19:00';
        writeSettings(next);
        card.remove();
      });
    });
  }

  function handleQuickOpen() {
    var href = window.location.pathname || '';
    var search = window.location.search || '';
    if (href.indexOf('index.html') < 0 && !/\/$/.test(href)) return;
    if (search !== '?quick=1') return;
    window.history.replaceState({}, '', '/index.html');
    var focus = document.getElementById('game-launcher');
    if (focus) focus.scrollIntoView({ block: 'start' });
    var start = document.querySelector('#game-launcher .game-start-btn');
    if (start) start.focus();
  }

  function registerNotificationListeners() {
    var LN = getPlugin();
    if (!LN) return;
    if (typeof LN.addListener === 'function') {
      LN.addListener('localNotificationActionPerformed', function () {
        window.location.href = QUICK_URL;
      });
    }
    if (typeof LN.registerActionTypes === 'function') {
      LN.registerActionTypes({
        types: [
          {
            id: 'OPEN_QUICK',
            actions: [{ id: 'start-5', title: 'Start 5 min' }]
          }
        ]
      });
    }
  }

  function onGameGoalMet() {
    rescheduleAll('goal-met');
  }

  function init() {
    if (!native()) return;
    registerNotificationListeners();
    if (window.CloudCramGame && window.CloudCramGame.onUiRefresh) {
      window.CloudCramGame.onUiRefresh(function () {
        rescheduleAll('ui');
        refreshStatusLine();
      });
    }
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () {
        wireSettingsReminders();
        maybePermissionBanner();
        handleQuickOpen();
        rescheduleAll('open');
      });
    } else {
      wireSettingsReminders();
      maybePermissionBanner();
      handleQuickOpen();
      rescheduleAll('open');
    }
    if (typeof window.addEventListener === 'function') {
      window.addEventListener('storage', function (ev) {
        var key = pushApi() ? pushApi().STORAGE_KEY : 'cloudcram_push_local_v1';
        if (ev.key === key) rescheduleAll('storage');
      });
    }
  }

  window.CloudCramReminders = {
    rescheduleAll: rescheduleAll,
    cancelAllPending: cancelAllPending,
    onGoalMet: onGameGoalMet,
    onQuizResults: showResultsOptInCard,
    refreshStatusLine: refreshStatusLine
  };

  init();
})();