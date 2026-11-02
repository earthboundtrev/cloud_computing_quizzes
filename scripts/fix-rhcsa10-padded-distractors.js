#!/usr/bin/env node
/**
 * Remove (alternative method) / (limited scope) padding from RHCSA10 banks (#31).
 * Run: node scripts/fix-rhcsa10-padded-distractors.js
 */
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const FILES = [
  'data/rhcsa10-questions.js',
  'data/rhcsa10-extra-questions.js'
];

const WRONG_REPLACEMENTS = {
  'lvconvert': 'vgimportclone to import a cloned VG',
  'podman build': 'buildah bud using a Containerfile',
  'podman pod': 'podman kube play on a manifest',
  'setfacl': 'chmod 777 on the path',
  'nmcli': 'ip link set dev eth0 down',
  'restorecon': 'chcon -t unlabeled_t on the path',
  'mkfs.ext4': 'mkswap on the block device',
  'fdisk': 'parted /dev/sdb print only',
  'getenforce': 'sestatus -b only',
  'useradd -D': 'groupadd without options',
  'hostname': 'timedatectl set-timezone UTC',
  'chage -E': 'passwd -l on the account',
  'lvremove vg0': 'vgremove vg0 without backup',
  'audit2allow only': 'setenforce 0 permanently',
  'lvrename': 'lvchange -an on the LV',
  'ifdown -a only': 'nmcli networking off',
  'subscription-manager': 'rpm -Uvh from local path only',
  'rpm -ivh random.rpm only': 'dnf reinstall without repo metadata'
};

function loadBank(file) {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(file, 'utf8'), sandbox);
  const key = Object.keys(sandbox.window).find(function (k) {
    return k.indexOf('QUESTION_BANK_RHCSA10') === 0;
  });
  return { key: key, bank: sandbox.window[key], header: fs.readFileSync(file, 'utf8').split(key + ' = [')[0] };
}

function cleanOption(opt) {
  let o = opt.replace(/\s*\((alternative method|limited scope)\)/gi, '').trim();
  o = o.replace(/\s+only\s*$/i, '').trim();
  const lower = o.toLowerCase();
  Object.keys(WRONG_REPLACEMENTS).forEach(function (k) {
    if (lower === k.toLowerCase() || lower.indexOf(k.toLowerCase()) === 0) {
      o = WRONG_REPLACEMENTS[k];
    }
  });
  if (o.length < 8) {
    o = o + ' (incorrect for this task)';
  }
  return o;
}

function serializeQuestion(q, indent) {
  const lines = [];
  lines.push(indent + '{');
  Object.keys(q).forEach(function (k) {
    const v = q[k];
    if (k === 'options' && Array.isArray(v)) {
      lines.push(indent + '  "options": [');
      v.forEach(function (opt, i) {
        const comma = i < v.length - 1 ? ',' : '';
        lines.push(indent + '    ' + JSON.stringify(opt) + comma);
      });
      lines.push(indent + '  ],');
    } else if (typeof v === 'string') {
      lines.push(indent + '  "' + k + '": ' + JSON.stringify(v) + ',');
    } else {
      lines.push(indent + '  "' + k + '": ' + JSON.stringify(v) + ',');
    }
  });
  const last = lines[lines.length - 1];
  lines[lines.length - 1] = last.replace(/,$/, '');
  lines.push(indent + '}');
  return lines.join('\n');
}

function serializePrettyJs(bank, header, varName) {
  const body = bank.map(function (q, i) {
    const inner = '  ' + JSON.stringify(q, null, 2).split('\n').join('\n  ');
    return inner + (i < bank.length - 1 ? ',' : '');
  }).join('\n');
  return header + varName + ' = [\n' + body + '\n];\n';
}

FILES.forEach(function (file) {
  const loaded = loadBank(file);
  let changed = 0;
  loaded.bank.forEach(function (q) {
    if (!q.options) {
      return;
    }
    q.options = q.options.map(function (opt) {
      const cleaned = cleanOption(opt);
      if (cleaned !== opt) {
        changed++;
      }
      return cleaned;
    });
  });
  const out = serializePrettyJs(loaded.bank, loaded.header, loaded.key);
  fs.writeFileSync(file, out);
  console.log(file + ': cleaned ' + changed + ' option strings');
});
