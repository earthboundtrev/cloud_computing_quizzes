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