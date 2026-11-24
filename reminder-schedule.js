/**
 * Pure scheduling rules for local notifications (#112). Node-testable.
 */
(function (root, factory) {
  var api = factory();
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
  root.CloudCramReminderSchedule = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  var copyApi = null;
  if (typeof module !== 'undefined' && module.exports) {
    try {
      copyApi = require('./reminder-copy.js');
    } catch (e) {}
  }
  if (!copyApi && typeof CloudCramReminderCopy !== 'undefined') {
    copyApi = CloudCramReminderCopy;
  }

  var SCHEDULE_DAYS = 7;
  var EVENING_MINUTES = 21 * 60;
  var MIN_GAP_EVENING = 90;
  var CHANNEL_DAILY = 'cloudcram-daily-reminder';
  var CHANNEL_EVENING = 'cloudcram-streak-nudge';
  var ID_DAILY_BASE = 10000;
  var ID_EVENING = 20000;
  var GENERIC_LOCK_FALLBACK = 'Cloud Cram: study reminder';

  function parseYmd(s) {
    var p = String(s || '').split('-');
    if (p.length !== 3) return null;
    return new Date(parseInt(p[0], 10), parseInt(p[1], 10) - 1, parseInt(p[2], 10));
  }

  function formatYmd(d) {
    return (
      d.getFullYear() +
      '-' +
      String(d.getMonth() + 1).padStart(2, '0') +
      '-' +
      String(d.getDate()).padStart(2, '0')
    );
  }

  function addDays(ymd, n) {
    var d = parseYmd(ymd);
    if (!d) return ymd;
    d.setDate(d.getDate() + n);
    return formatYmd(d);
  }

  function compareYmd(a, b) {
    if (a === b) return 0;
    return a < b ? -1 : 1;
  }

  function isExamDay(ctx, dateStr) {
    if (!ctx.examDate) return false;
    return dateStr === ctx.examDate;
  }

  function isDayAfterExam(ctx, dateStr) {
    if (!ctx.examDate) return false;
    return dateStr === addDays(ctx.examDate, 1);
  }

  function shouldSkipDailyForDate(ctx, dateStr) {
    if (ctx.goalMetByDate && ctx.goalMetByDate[dateStr]) return true;
    if (isDayAfterExam(ctx, dateStr)) return true;
    if (dateStr === ctx.today && ctx.goalMetToday) return true;
    return false;
  }

  function freezeHeld(ctx) {
    if ((ctx.freezesHeld || 0) > 0) return true;
    return !!(ctx.freezeHeld || ctx.freezeSavedYesterday);
  }

  function shouldScheduleEveningTonight(ctx) {
    if (!ctx.eveningEnabled || !ctx.dailyEnabled) return false;
    if (ctx.goalMetToday) return false;
    if ((ctx.streak || 0) < 7) return false;
    if (freezeHeld(ctx)) return false;
    if (ctx.inVacation) return false;
    if (ctx.repairActive) return false;
    if (isExamDay(ctx, ctx.today) || isDayAfterExam(ctx, ctx.today)) return false;
    var gap = EVENING_MINUTES - ctx.dailyTimeMinutes;
    if (gap < MIN_GAP_EVENING) return false;
    return true;
  }

  function atLocalTime(dateStr, minutesFromMidnight) {
    var d = parseYmd(dateStr);
    if (!d) return null;
    d.setHours(0, 0, 0, 0);
    d.setMinutes(minutesFromMidnight % 60);
    d.setHours(Math.floor(minutesFromMidnight / 60));
    return d;
  }

  function buildNotificationPlan(ctx) {
    ctx = ctx || {};
    var copy = copyApi;
    var plan = [];
    var today = ctx.today;
    if (!today) return plan;
    if (!ctx.dailyEnabled) return plan;

    for (var offset = 0; offset < SCHEDULE_DAYS; offset++) {
      var dateStr = addDays(today, offset);
      if (shouldSkipDailyForDate(ctx, dateStr)) continue;
      var isToday = dateStr === today;
      var copyCtx = {
        goal: ctx.goal || 3,
        streakDay: ctx.streak || 0,
        due: ctx.dueReviews || 0,
        hadRecentMiss: isToday && !!ctx.hadRecentMiss,
        examDay: isExamDay(ctx, dateStr),
        isToday: isToday,
        date: dateStr
      };
      var body = copy ? copy.selectDailyBody(copyCtx) : '';
      var title = copy ? copy.LOCK_SCREEN_GENERIC : GENERIC_LOCK_FALLBACK;
      if (isExamDay(ctx, dateStr)) body = copy ? copy.EXAM_DAY : 'Good luck today.';
      plan.push({
        id: ID_DAILY_BASE + offset,
        kind: 'daily',
        date: dateStr,
        at: atLocalTime(dateStr, ctx.dailyTimeMinutes),
        channelId: CHANNEL_DAILY,
        title: title,
        body: body,
        visibility: 'secret',
        lockScreenBody: copy ? copy.LOCK_SCREEN_GENERIC : GENERIC_LOCK_FALLBACK
      });
    }

    if (shouldScheduleEveningTonight(ctx)) {
      var eveBody = copy ? copy.selectEveningBody({ goal: ctx.goal || 3, date: today }) : '';
      plan.push({
        id: ID_EVENING,
        kind: 'evening',
        date: today,
        at: atLocalTime(today, EVENING_MINUTES),
        channelId: CHANNEL_EVENING,
        title: copy ? copy.LOCK_SCREEN_GENERIC : GENERIC_LOCK_FALLBACK,
        body: eveBody,
        visibility: 'secret',
        lockScreenBody: copy ? copy.LOCK_SCREEN_GENERIC : GENERIC_LOCK_FALLBACK
      });
    }

    return plan;
  }

  function idsForToday() {
    return [ID_DAILY_BASE, ID_EVENING];
  }

  function allScheduledIds() {
    var ids = [];
    for (var i = 0; i < SCHEDULE_DAYS; i++) ids.push(ID_DAILY_BASE + i);
    ids.push(ID_EVENING);
    return ids;
  }

  function pluginNotificationFromPlanItem(item) {
    item = item || {};
    var generic = copyApi ? copyApi.LOCK_SCREEN_GENERIC : GENERIC_LOCK_FALLBACK;
    return {
      id: item.id,
      title: item.title || generic,
      body: item.body,
      largeBody: item.body,
      summaryText: item.lockScreenBody || generic,
      channelId: item.channelId,
      visibility: item.visibility || 'secret',
      lockScreenBody: item.lockScreenBody || generic,
      schedule: {
        at: item.at,
        allowWhileIdle: true
      },
      sound: 'default',
      actionTypeId: 'OPEN_QUICK',
      extra: {
        reminderKind: item.kind
      }
    };
  }

  function describeStatus(ctx, permission, exactAlarms) {
    if (permission === 'denied') {
      return { key: 'blocked', text: 'Blocked in Android settings' };
    }
    if (!ctx.dailyEnabled) {
      return { key: 'off', text: 'Off' };
    }
    if (ctx.goalMetToday) {
      return { key: 'skipped', text: 'Skipped today: goal met \u2713' };
    }
    var parts = ['On'];
    if (ctx.nextDailyAt) {
      parts.push('\u00b7 next reminder today ' + ctx.nextDailyAt);
    }
    var text = parts.join(' ');
    if (exactAlarms === false) {
      text += ' \u00b7 May arrive within ~10 min (exact alarms off)';
    }
    return { key: 'on', text: text };
  }

  return {
    SCHEDULE_DAYS: SCHEDULE_DAYS,
    EVENING_MINUTES: EVENING_MINUTES,
    CHANNEL_DAILY: CHANNEL_DAILY,
    CHANNEL_EVENING: CHANNEL_EVENING,
    ID_DAILY_BASE: ID_DAILY_BASE,
    ID_EVENING: ID_EVENING,
    addDays: addDays,
    compareYmd: compareYmd,
    shouldScheduleEveningTonight: shouldScheduleEveningTonight,
    shouldSkipDailyForDate: shouldSkipDailyForDate,
    buildNotificationPlan: buildNotificationPlan,
    pluginNotificationFromPlanItem: pluginNotificationFromPlanItem,
    GENERIC_LOCK_FALLBACK: GENERIC_LOCK_FALLBACK,
    idsForToday: idsForToday,
    allScheduledIds: allScheduledIds,
    describeStatus: describeStatus,
    isExamDay: isExamDay,
    isDayAfterExam: isDayAfterExam
  };
});