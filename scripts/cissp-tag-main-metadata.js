#!/usr/bin/env node
/**
 * Heuristic obj/level/ref/id for legacy CISSP main bank (#15).
 */
'use strict';

const fs = require('fs');
const vm = require('vm');

const REF = {
  '1': 'https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline',
  '2': 'https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline',
  '3': 'https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline',
  '4': 'https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline',
  '5': 'https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline',
  '6': 'https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline',
  '7': 'https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline',
  '8': 'https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline'
};

function domainFromTopic(topic) {
  const t = (topic || '').toLowerCase();
  if (/risk|governance|legal|privacy|policy/.test(t)) {
    return '1';
  }
  if (/asset|data owner|retention|classification/.test(t)) {
    return '2';
  }
  if (/architecture|crypto|model|engineering/.test(t)) {
    return '3';
  }
  if (/network|communication|802\.1|vpn|firewall/.test(t)) {
    return '4';
  }
  if (/iam|identity|access|kerberos|oauth|federation/.test(t)) {
    return '5';
  }
  if (/assessment|audit|test|penetration/.test(t)) {
    return '6';
  }
  if (/operations|incident|ir |bcp|dr |soc/.test(t)) {
    return '7';
  }
  if (/software|sdlc|devsec|development/.test(t)) {
    return '8';
  }
  return '1';
}

function guessLevel(q) {
  if (q.level) {
    return q.level;
  }
  if (q.type === 'multi' || q.type === 'order') {
    return 4;
  }
  if (/\b(BEST|FIRST|MOST|PRIMARY|should you)\b/i.test(q.q || '')) {
    return 4;
  }
  if ((q.q || '').length > 100) {
    return 3;
  }
  if (q.mode === 'comparison') {
    return 2;
  }
  return 2;
}

function padDistractors(q) {
  const t = q.type || 'single';
  if (t !== 'single' || !q.options || typeof q.correct !== 'number') {
    return;
  }
  let longestIdx = 0;
  let longestLen = 0;
  q.options.forEach(function (opt, i) {
    if (opt.length > longestLen) {
      longestLen = opt.length;
      longestIdx = i;
    }
  });
  if (longestIdx !== q.correct) {
    return;
  }
  const target = Math.max(longestLen, 42);
  q.options = q.options.map(function (opt, i) {
    if (i === q.correct) {
      return opt;
    }
    if (opt.length >= target - 4) {
      return opt;
    }
    return opt + ' — less appropriate in this CISSP context';
  });
}

const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync('data/cissp-questions.js', 'utf8'), sandbox);
const bank = sandbox.window.QUESTION_BANK_CISSP;

bank.forEach(function (q, idx) {
  q.obj = q.obj || domainFromTopic(q.topic);
  q.level = guessLevel(q);
  q.ref = q.ref || REF[q.obj];
  q.id = q.id || ('cissp-legacy-' + String(idx + 1).padStart(4, '0'));
});


const header = fs.readFileSync('data/cissp-questions.js', 'utf8').split('window.QUESTION_BANK_CISSP = [')[0];
const body = bank.map(function (q) {
  return '      ' + JSON.stringify(q, null, 2).split('\n').join('\n      ');
}).join(',\n');
const out = header + 'window.QUESTION_BANK_CISSP = [\n' + body + '\n];\n';
fs.writeFileSync('data/cissp-questions.js', out);
console.log('Tagged', bank.length, 'CISSP main-bank questions');
