/**
 * Approved on-device reminder copy (issue #112). No banned guilt phrases.
 */
(function (root, factory) {
  var api = factory();
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
  root.CloudCramReminderCopy = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  var LOCK_SCREEN_GENERIC = 'Cloud Quizzes: study reminder';
  var EXAM_DAY = 'Good luck today.';
  var BANNED_FRAGMENTS = [
    "don't break",
    "don't lose",
    'lose your',
    'last chance',
    'before it is too late',
    'before it\'s too late',
    'ends tonight',
    'you missed',
    'streak ends tonight'
  ];

  var GENERIC_DAILY = [
    "Time for today's {goal} questions.",
    '{goal} quick questions? About a minute.',
    'Ready when you are. {goal} questions today.'
  ];

  var LIVE_DAILY = [
    'Day {n} \uD83D\uDD25 {goal} questions keeps it going.',
    '{due} reviews due. Start with those?'
  ];

  var AFTER_MISS_DAILY = ['Ready when you are. {goal} questions to start.'];

  var EVENING = [
    "Today's goal is still open. {goal} questions?",
    "Still time for today's {goal} questions."
  ];

  function fill(template, ctx) {
    return template
      .replace(/\{goal\}/g, String(ctx.goal))
      .replace(/\{n\}/g, String(ctx.streakDay))
      .replace(/\{due\}/g, String(ctx.due));
  }

  function pickIndex(seed, len) {
    if (len <= 1) return 0;
    var n = 0;
    for (var i = 0; i < String(seed).length; i++) {
      n = (n + String(seed).charCodeAt(i)) % len;
    }
    return n;
  }

  function selectDailyBody(ctx) {
    if (ctx.examDay) return EXAM_DAY;
    var pool;
    if (ctx.isToday && ctx.due > 0) {
      pool = [LIVE_DAILY[1]];
    } else if (ctx.isToday && ctx.streakDay > 0) {
      pool = [LIVE_DAILY[0]];
    } else if (ctx.hadRecentMiss) {
      pool = AFTER_MISS_DAILY;
    } else {
      pool = GENERIC_DAILY;
    }
    var idx = pickIndex(ctx.date + '-daily', pool.length);
    return fill(pool[idx], ctx);
  }

  function selectEveningBody(ctx) {
    var idx = pickIndex(ctx.date + '-eve', EVENING.length);
    return fill(EVENING[idx], ctx);
  }

  function allBundledStrings() {
    var list = [LOCK_SCREEN_GENERIC, EXAM_DAY];
    GENERIC_DAILY.concat(LIVE_DAILY, AFTER_MISS_DAILY, EVENING).forEach(function (t) {
      list.push(fill(t, { goal: 9, n: 9, due: 9 }));
    });
    return list;
  }

  return {
    LOCK_SCREEN_GENERIC: LOCK_SCREEN_GENERIC,
    EXAM_DAY: EXAM_DAY,
    BANNED_FRAGMENTS: BANNED_FRAGMENTS,
    selectDailyBody: selectDailyBody,
    selectEveningBody: selectEveningBody,
    allBundledStrings: allBundledStrings,
    fill: fill
  };
});