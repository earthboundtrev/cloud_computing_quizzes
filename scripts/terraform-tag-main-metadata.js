#!/usr/bin/env node
/**
 * One-shot heuristic obj/level/ref tagging for legacy terraform-questions.js (#14).
 * Run: node scripts/terraform-tag-main-metadata.js
 * Rewrites data/terraform-questions.js in place (idempotent when fields already set).
 */
'use strict';

const fs = require('fs');

const REF = {
  '1a': 'https://developer.hashicorp.com/terraform/intro',
  '1b': 'https://developer.hashicorp.com/terraform/intro',
  '1c': 'https://developer.hashicorp.com/terraform/tutorials/certification-004/associate-review-004',
  '2a': 'https://developer.hashicorp.com/terraform/language/providers/requirements',
  '2b': 'https://developer.hashicorp.com/terraform/language/providers',
  '2c': 'https://developer.hashicorp.com/terraform/language/providers/configuration',
  '2d': 'https://developer.hashicorp.com/terraform/language/state',
  '3a': 'https://developer.hashicorp.com/terraform/intro/core-workflow',
  '3b': 'https://developer.hashicorp.com/terraform/cli/commands/init',
  '3c': 'https://developer.hashicorp.com/terraform/cli/commands/validate',
  '3d': 'https://developer.hashicorp.com/terraform/cli/commands/plan',
  '3e': 'https://developer.hashicorp.com/terraform/cli/commands/apply',
  '3f': 'https://developer.hashicorp.com/terraform/cli/commands/destroy',
  '3g': 'https://developer.hashicorp.com/terraform/cli/commands/fmt',
  '4a': 'https://developer.hashicorp.com/terraform/language/data-sources',
  '4b': 'https://developer.hashicorp.com/terraform/language/expressions/references',
  '4c': 'https://developer.hashicorp.com/terraform/language/values/variables',
  '4d': 'https://developer.hashicorp.com/terraform/language/expressions/types',
  '4e': 'https://developer.hashicorp.com/terraform/language/expressions',
  '4f': 'https://developer.hashicorp.com/terraform/language/meta-arguments/depends_on',
  '4g': 'https://developer.hashicorp.com/terraform/language/checks',
  '4h': 'https://developer.hashicorp.com/terraform/tutorials/configuration-language/sensitive-variables',
  '5a': 'https://developer.hashicorp.com/terraform/language/modules/sources',
  '5b': 'https://developer.hashicorp.com/terraform/language/modules/develop',
  '5c': 'https://developer.hashicorp.com/terraform/language/modules',
  '5d': 'https://developer.hashicorp.com/terraform/language/modules/sources',
  '6a': 'https://developer.hashicorp.com/terraform/language/settings/backends/local',
  '6b': 'https://developer.hashicorp.com/terraform/language/state/locking',
  '6c': 'https://developer.hashicorp.com/terraform/language/settings/backends/configuration',
  '6d': 'https://developer.hashicorp.com/terraform/language/state/refactor',
  '7a': 'https://developer.hashicorp.com/terraform/cli/import',
  '7b': 'https://developer.hashicorp.com/terraform/cli/commands/state',
  '7c': 'https://developer.hashicorp.com/terraform/internals/debugging',
  '8a': 'https://developer.hashicorp.com/terraform/cloud-docs/workspaces',
  '8b': 'https://developer.hashicorp.com/terraform/cloud-docs',
  '8c': 'https://developer.hashicorp.com/terraform/cloud-docs/workspaces/projects',
  '8d': 'https://developer.hashicorp.com/terraform/cli/commands/login'
};

function guessObj(q) {
  if (q.obj) {
    return q.obj;
  }
  const topic = q.topic || '';
  const blob = ((q.q || '') + ' ' + (q.explain || '')).toLowerCase();

  if (topic === 'IaC Concepts') {
    if (/multi-cloud|hybrid|multiple cloud|service-agnostic/.test(blob)) {
      return '1c';
    }
    if (/benefit|advantage|repeatable|auditable|version/.test(blob)) {
      return '1b';
    }
    return '1a';
  }
  if (topic === 'Terraform fundamentals') {
    return /state/.test(blob) ? '2d' : /lock|required_providers|init -upgrade|~>/.test(blob) ? '2a' : '2b';
  }
  if (topic === 'Terraform Workflow') {
    return '3a';
  }
  if (topic === 'Terraform CLI') {
    if (/fmt/.test(blob)) {
      return '3g';
    }
    if (/validate/.test(blob)) {
      return '3c';
    }
    if (/destroy/.test(blob)) {
      return '3f';
    }
    if (/plan/.test(blob) && !/apply/.test(blob)) {
      return '3d';
    }
    if (/apply/.test(blob)) {
      return '3e';
    }
    if (/init/.test(blob)) {
      return '3b';
    }
    if (/tf_log|verbose log|trace/.test(blob)) {
      return '7c';
    }
    return '3b';
  }
  if (topic === 'Modules') {
    return /version|registry/.test(blob) ? '5d' : /scope|input|output|child/.test(blob) ? '5b' : '5a';
  }
  if (topic === 'HCP Terraform') {
    return /project|run trigger|variable set/.test(blob) ? '8c' : /login|cloud \{/.test(blob) ? '8d' : /policy|sentinel|governance|team/.test(blob) ? '8b' : '8a';
  }
  if (topic === 'Backend') {
    return /local|terraform\.tfstate/.test(blob) ? '6a' : '6c';
  }
  if (topic === 'Workspaces') {
    return '8c';
  }
  if (topic === 'Maintain infrastructure') {
    return /state (list|show|rm|mv)/.test(blob) ? '7b' : '7a';
  }
  if (topic === 'Providers') {
    return /alias|providers =/.test(blob) ? '2c' : '2b';
  }
  if (topic === 'Security & Best Practices') {
    return '4h';
  }
  if (topic === 'State') {
    return /lock|force-unlock/.test(blob) ? '6b' : /local backend|terraform\.tfstate in the current directory|default location/.test(blob) ? '6a' : '6d';
  }
  if (topic === 'Configuration') {
    if (/ephemeral|write-only|password_wo/.test(blob)) {
      return '4h';
    }
    if (/precondition|postcondition|check block|validation \{/.test(blob)) {
      return '4g';
    }
    if (/depends_on|create_before_destroy|prevent_destroy|ignore_changes/.test(q.q || '')) {
      return '4f';
    }
    if (/dynamic block|for_each|count\.index|toset\(/.test(blob)) {
      return '4e';
    }
    if (/data "/.test(q.q || '') || /data source/.test(blob)) {
      return '4a';
    }
    if (/complex|object\(|map\(/.test(blob)) {
      return '4d';
    }
    if (/output |variable |tfvars/.test(blob)) {
      return '4c';
    }
    return '4b';
  }

  if (/ephemeral|write-only|password_wo|sensitive.*state|vault/.test(blob)) {
    return '4h';
  }
  if (/precondition|postcondition|check block|validation \{/.test(blob)) {
    return '4g';
  }
  if (/depends_on|create_before_destroy|prevent_destroy|ignore_changes|lifecycle/.test(blob)) {
    return '4f';
  }
  if (/dynamic block|for_each|count\.index|toset\(/.test(blob)) {
    return '4e';
  }
  if (/data "|<pre>.*data |data source/.test(blob)) {
    return '4a';
  }
  if (/output |variable |tfvars|complex type|object\(|map\(/.test(blob)) {
    return /output/.test(blob) ? '4c' : /complex|object|tuple|map\(string/.test(blob) ? '4d' : '4c';
  }
  if (/module.*version|registry|source =/.test(blob) && q.topic === 'Modules') {
    return /version/.test(blob) ? '5d' : '5c';
  }
  if (q.topic === 'Modules') {
    return /scope|input|output/.test(blob) ? '5b' : '5a';
  }
  if (/moved \{|removed \{|refresh-only|-refresh-only|drift/.test(blob)) {
    return '6d';
  }
  if (/force-unlock|state lock|locking/.test(blob)) {
    return '6b';
  }
  if (/remote backend|backend "s3"|backend "azurerm"|cloud \{/.test(blob)) {
    return '6c';
  }
  if (/local backend|terraform\.tfstate/.test(blob) && q.topic === 'Backend') {
    return '6a';
  }
  if (q.topic === 'State') {
    return /local|default state/.test(blob) ? '6a' : '6d';
  }
  if (/import |import\{|-generate-config/.test(blob)) {
    return '7a';
  }
  if (/state list|state show|state rm|state mv/.test(blob)) {
    return '7b';
  }
  if (/tf_log|tf_log_path|verbose log|trace log/.test(blob)) {
    return '7c';
  }
  if (/run trigger|variable set|project|speculative plan|sentinel|opa|dynamic credential/.test(blob)) {
    return /project|run trigger|variable set/.test(blob) ? '8c' : '8b';
  }
  if (/terraform login|cloud \{|remote operations|hcp terraform/.test(blob)) {
    return '8d';
  }
  if (q.topic === 'HCP Terraform') {
    return /governance|team|policy/.test(blob) ? '8b' : '8a';
  }
  if (/\.terraform\.lock|init -upgrade|required_providers|provider alias|providers =/.test(blob)) {
    return /lock|upgrade|version constraint|~>/.test(blob) ? '2a' : '2c';
  }
  if (q.topic === 'Providers') {
    return '2b';
  }
  if (/multi-cloud|hybrid|service-agnostic|multiple cloud/.test(blob)) {
    return '1c';
  }
  if (q.topic === 'IaC Concepts') {
    return /benefit|advantage|repeatable|auditable|version/.test(blob) ? '1b' : '1a';
  }
  if (q.topic === 'Terraform fundamentals') {
    return /state/.test(blob) ? '2d' : '2b';
  }
  if (q.topic === 'Terraform CLI') {
    if (/fmt/.test(blob)) {
      return '3g';
    }
    if (/validate/.test(blob)) {
      return '3c';
    }
    if (/destroy/.test(blob)) {
      return '3f';
    }
    if (/plan/.test(blob)) {
      return '3d';
    }
    if (/apply/.test(blob)) {
      return '3e';
    }
    if (/init/.test(blob)) {
      return '3b';
    }
    return '3a';
  }
  if (q.topic === 'Terraform Workflow') {
    return '3a';
  }
  if (q.topic === 'Configuration') {
    return '4b';
  }
  if (q.topic === 'Maintain infrastructure') {
    return '7a';
  }
  if (q.topic === 'Workspaces') {
    return '8c';
  }
  if (q.topic === 'Backend') {
    return '6c';
  }
  if (q.topic === 'Security & Best Practices') {
    return '4h';
  }
  return '3a';
}

function guessLevel(q) {
  if (q.level) {
    return q.level;
  }
  const t = q.type || 'single';
  if (t === 'multi' || t === 'order') {
    return 4;
  }
  if (/<pre>|<code>/.test(q.q || '')) {
    return 4;
  }
  if (q.mode === 'comparison') {
    return 3;
  }
  if ((q.q || '').length > 120) {
    return 3;
  }
  return 2;
}

function padDistractors(q) {
  const t = q.type || 'single';
  if (t !== 'single' || !q.options || typeof q.correct !== 'number') {
    return;
  }
  let longest = 0;
  let longestIdx = 0;
  q.options.forEach(function (opt, i) {
    if (opt.length > longest) {
      longest = opt.length;
      longestIdx = i;
    }
  });
  if (longestIdx !== q.correct) {
    return;
  }
  const target = Math.max(longest, 48);
  q.options = q.options.map(function (opt, i) {
    if (i === q.correct) {
      return opt;
    }
    if (opt.length >= target - 5) {
      return opt;
    }
    const fillers = [
      ' (not the primary Terraform workflow here)',
      ' — this misstates how Terraform core and providers interact',
      ' — incorrect for Terraform 1.12 Associate scope',
      ' — a common misconception on the exam'
    ];
    let out = opt;
    let f = 0;
    while (out.length < target - 8 && f < fillers.length) {
      out += fillers[f++];
    }
    return out;
  });
}

global.window = {};
require('../data/terraform-questions.js');
const bank = window.QUESTION_BANK_TERRAFORM;

bank.forEach(function (q, idx) {
  q.obj = guessObj(q);
  q.level = guessLevel(q);
  if (!q.ref) {
    q.ref = REF[q.obj] || REF['3a'];
  }
  if (!q.id) {
    q.id = 'tf-legacy-' + String(idx + 1).padStart(4, '0');
  }
  padDistractors(q);
});

const header = fs.readFileSync('data/terraform-questions.js', 'utf8').split('window.QUESTION_BANK_TERRAFORM = [')[0];
const body = 'window.QUESTION_BANK_TERRAFORM = ' + JSON.stringify(bank, null, 2)
  .replace(/"([^"]+)":/g, '$1:')
  .replace(/"/g, '"')
  + ';\n';

// Preserve original file header comment block
const orig = fs.readFileSync('data/terraform-questions.js', 'utf8');
const commentEnd = orig.indexOf('window.QUESTION_BANK_TERRAFORM');
const comment = orig.slice(0, commentEnd);

const serialized = bank.map(function (q) {
  return '  ' + JSON.stringify(q, null, 0).replace(/\n/g, '\n  ');
}).join(',\n');

const out = comment + 'window.QUESTION_BANK_TERRAFORM = [\n' + serialized + '\n];\n';
fs.writeFileSync('data/terraform-questions.js', out);
console.log('Tagged', bank.length, 'main-bank questions with obj/level/ref/id');
