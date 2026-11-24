#!/usr/bin/env node
'use strict';

var assert = require('assert');
var copy = require('../reminder-copy.js');
var schedule = require('../reminder-schedule.js');

var tests = 0;
var passed = 0;

function test(name, fn) {
  tests++;
  try {
    fn();
    passed++;
    console.log('OK', name);
  } catch (e) {
    console.error('FAIL', name, e.message);
    process.exitCode = 1;
  }
}

test('evening skipped when freeze inventory is held', function () {
  var ctx = {
    today: '2026-11-23',
    dailyEnabled: true,
    eveningEnabled: true,
    dailyTimeMinutes: 19 * 60,
    goalMetToday: false,
    streak: 8,
    freezesHeld: 1,
    inVacation: false,
    repairActive: false,
    freezeHeld: false
  };
  assert.strictEqual(schedule.shouldScheduleEveningTonight(ctx), false);
});

test('evening requires streak 7+ and 90m gap from daily time', function () {
  var ctx = {
    today: '2026-11-23',
    dailyEnabled: true,
    eveningEnabled: true,
    dailyTimeMinutes: 19 * 60,
    goalMetToday: false,
    streak: 7,
    inVacation: false,
    repairActive: false,
    freezeHeld: false
  };
  assert.strictEqual(schedule.shouldScheduleEveningTonight(ctx), true);
  ctx.dailyTimeMinutes = 19 * 60 + 31;
  assert.strictEqual(schedule.shouldScheduleEveningTonight(ctx), false);
  ctx.streak = 6;
  ctx.dailyTimeMinutes = 19 * 60;
  assert.strictEqual(schedule.shouldScheduleEveningTonight(ctx), false);
});

test('skip daily when goal met today and day after exam', function () {
  var ctx = {
    today: '2026-11-23',
    examDate: '2026-11-22',
    goalMetByDate: {},
    goalMetToday: false
  };
  assert.strictEqual(schedule.shouldSkipDailyForDate(ctx, '2026-11-23'), true);
  ctx.goalMetToday = true;
  assert.strictEqual(schedule.shouldSkipDailyForDate(ctx, '2026-11-24'), false);
  assert.strictEqual(schedule.shouldSkipDailyForDate(ctx, '2026-11-23'), true);
});

test('plan caps at seven daily ids plus optional evening', function () {
  var ctx = {
    today: '2026-11-23',
    dailyEnabled: true,
    eveningEnabled: true,
    dailyTimeMinutes: 19 * 60,
    goalMetToday: false,
    streak: 10,
    goal: 3,
    inVacation: false,
    repairActive: false,
    freezeHeld: false
  };
  var plan = schedule.buildNotificationPlan(ctx);
  var dailies = plan.filter(function (p) {
    return p.kind === 'daily';
  });
  assert.strictEqual(dailies.length, 7);
  var evening = plan.filter(function (p) {
    return p.kind === 'evening';
  });
  assert.strictEqual(evening.length, 1);
  evening.forEach(function (p) {
    assert.ok(p.body.length <= 60, 'evening body length');
  });
});

test('generic lock-screen copy uses launcher app name', function () {
  assert.strictEqual(copy.LOCK_SCREEN_GENERIC, 'Cloud Cram: study reminder');
  assert.ok(copy.LOCK_SCREEN_GENERIC.indexOf('Cloud Quizzes') < 0);
});

test('daily plan is private (secret) for today and future slots', function () {
  var ctx = {
    today: '2026-11-24',
    dailyEnabled: true,
    eveningEnabled: false,
    dailyTimeMinutes: 19 * 60,
    goalMetToday: false,
    streak: 12,
    goal: 3,
    inVacation: false,
    repairActive: false,
    freezeHeld: false
  };
  var plan = schedule.buildNotificationPlan(ctx);
  var todayDaily = plan.filter(function (p) {
    return p.kind === 'daily' && p.date === ctx.today;
  });
  assert.strictEqual(todayDaily.length, 1);
  assert.strictEqual(todayDaily[0].visibility, 'secret');
  assert.strictEqual(todayDaily[0].title, copy.LOCK_SCREEN_GENERIC);
  assert.strictEqual(todayDaily[0].lockScreenBody, copy.LOCK_SCREEN_GENERIC);
  plan.forEach(function (p) {
    assert.strictEqual(p.visibility, 'secret', 'all planned notifications must be secret');
    assert.strictEqual(p.title, copy.LOCK_SCREEN_GENERIC, 'lock-screen title must stay generic');
    assert.strictEqual(p.lockScreenBody, copy.LOCK_SCREEN_GENERIC, 'lock-screen body must stay generic');
  });
});

test('pluginNotificationFromPlanItem passes visibility and lockScreenBody', function () {
  var at = new Date('2026-11-25T19:00:00');
  var item = {
    id: 10001,
    kind: 'daily',
    title: copy.LOCK_SCREEN_GENERIC,
    body: "Time for today's 3 questions.",
    channelId: schedule.CHANNEL_DAILY,
    visibility: 'secret',
    lockScreenBody: copy.LOCK_SCREEN_GENERIC,
    at: at
  };
  var payload = schedule.pluginNotificationFromPlanItem(item);
  assert.strictEqual(payload.title, 'Cloud Cram: study reminder');
  assert.strictEqual(payload.visibility, 'secret');
  assert.strictEqual(payload.lockScreenBody, 'Cloud Cram: study reminder');
  assert.strictEqual(payload.summaryText, 'Cloud Cram: study reminder');
  assert.strictEqual(payload.body, item.body);
  assert.strictEqual(payload.schedule.at, at);
});

test('test-notification payload shape matches reschedule mapper', function () {
  var body = copy.selectDailyBody({
    goal: 3,
    streakDay: 5,
    due: 0,
    hadRecentMiss: false,
    examDay: false,
    isToday: true,
    date: '2026-11-24'
  });
  var item = {
    id: 91001,
    kind: 'daily',
    title: copy.LOCK_SCREEN_GENERIC,
    body: body,
    channelId: schedule.CHANNEL_DAILY,
    visibility: 'secret',
    lockScreenBody: copy.LOCK_SCREEN_GENERIC,
    at: new Date('2026-11-24T19:00:01')
  };
  var payload = schedule.pluginNotificationFromPlanItem(item);
  assert.strictEqual(payload.visibility, 'secret');
  assert.strictEqual(payload.lockScreenBody, 'Cloud Cram: study reminder');
  assert.strictEqual(payload.title, 'Cloud Cram: study reminder');
  assert.notStrictEqual(payload.body, payload.lockScreenBody, 'expanded body stays off the lock screen fields');
});

test('copy strings respect 60 char limit and ban guilt phrases', function () {
  var banned = copy.BANNED_FRAGMENTS;
  copy.allBundledStrings().forEach(function (s) {
    assert.ok(s.length <= 60, 'too long: ' + s);
    var lower = s.toLowerCase();
    banned.forEach(function (frag) {
      assert.ok(lower.indexOf(frag) < 0, 'banned phrase in: ' + s);
    });
  });
});

console.log('\n' + passed + '/' + tests + ' reminder schedule tests passed');
if (passed !== tests) process.exit(1);