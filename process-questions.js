#!/usr/bin/env node

// Read the source files
const fs = require('fs');
const path = require('path');

// Load source data
const rhcsa9 = fs.readFileSync('/workspace/data/rhcsa9-questions.js', 'utf8');
const rhcsa9Extra = fs.readFileSync('/workspace/data/rhcsa9-extra-questions.js', 'utf8');

// Create mock window object for Node.js
const window = {};

// Extract question arrays using eval (since they're JS window assignments)
eval(rhcsa9);
eval(rhcsa9Extra);

const allQuestions = [
  ...window.QUESTION_BANK_RHCSA9,
  ...window.QUESTION_BANK_RHCSA9_EXTRA
];

console.log(`Total input questions: ${allQuestions.length}`);

// Filter out unwanted questions
const filtered = allQuestions.filter(q => {
  // Filter out RHEL 9 vs 7 comparisons
  if (q.topic && q.topic.includes('RHEL 9 vs 7')) return false;
  
  // Filter out Containers/Podman
  if (q.topic === 'Containers') return false;
  if (q.q && /podman|container/i.test(q.q)) return false;
  
  // Filter out Stratis
  if (q.q && /stratis/i.test(q.q)) return false;
  if (q.explain && /stratis/i.test(q.explain)) return false;
  
  // Filter out VDO
  if (q.q && /\bvdo\b/i.test(q.q)) return false;
  if (q.explain && /\bvdo\b/i.test(q.explain)) return false;
  
  // Filter out ACL questions
  if (q.q && /(setfacl|getfacl|acl)/i.test(q.q)) return false;
  if (q.explain && /(setfacl|getfacl)/i.test(q.explain)) return false;
  
  return true;
});

console.log(`After filtering: ${filtered.length}`);

// Objective mapping function
function mapObjective(topic, q, explain) {
  const text = `${topic} ${q} ${explain}`.toLowerCase();
  
  // Storage/LVM/partitions: 5.1-5.6
  if (/lvm|physical volume|volume group|logical volume|pvcreate|vgcreate|lvcreate|lvextend|pvmove|vgextend/i.test(text)) {
    if (/snapshot/i.test(text)) return '5.4';
    if (/extend|grow|reduce|resize/i.test(text)) return '5.5';
    if (/pvs|vgs|lvs|lvdisplay|vgdisplay|pvdisplay/i.test(text)) return '5.3';
    return '5.3';
  }
  if (/partition|parted|fdisk|gdisk/i.test(text)) return '5.1';
  if (/swap|mkswap|swapon/i.test(text)) return '5.2';
  if (/luks|encrypt|cryptsetup/i.test(text)) return '5.6';
  if (/disk|storage|lsblk|blkid/i.test(text) && !/network/i.test(text) && !/autofs/i.test(text)) return '5.6';
  
  // Filesystems/mount/NFS/autofs: 6.1-6.5
  if (/mkfs|xfs|ext4|filesystem|xfs_growfs|resize2fs|e2fsck|fsck/i.test(text)) return '6.1';
  if (/mount|fstab|uuid/i.test(text) && !/autofs/i.test(text) && !/nfs/i.test(text)) return '6.2';
  if (/nfs/i.test(text) && !/autofs/i.test(text)) return '6.3';
  if (/autofs/i.test(text)) return '6.4';
  if (/bind mount|tmpfs|noexec|nosuid/i.test(text)) return '6.5';
  
  // Networking/nmcli: 8.1-8.4 (check before systemd to catch hostname)
  if (/hostname|hostnamectl/i.test(text)) return '8.3';
  if (/nmcli|networkmanager|connection/i.test(text)) {
    if (/ipv4|static.*ip|dns|gateway|route/i.test(text)) return '8.2';
    if (/bond|team|bridge/i.test(text)) return '8.4';
    return '8.1';
  }
  if (/\bss\b|netstat|listening.*port|route|ip.*route/i.test(text)) return '8.1';
  if (/network|interface|ip addr/i.test(text) && !/firewall/i.test(text)) return '8.1';
  
  // systemd services: 4.9, 7.2
  if (/systemctl.*enable|systemctl.*disable|systemctl.*mask|wantedby|systemd.*unit|\.service|\.target/i.test(text)) return '7.2';
  if (/systemctl|systemd|journalctl|daemon-reload/i.test(text)) return '4.9';
  
  // Scheduling: 7.1
  if (/cron|at\b|anacron|timer|schedule|crontab/i.test(text)) return '7.1';
  
  // Boot/targets/grub: 4.1-4.3, 7.3, 7.6
  if (/grub|boot.*loader|grub2-mkconfig|grub2-install|grub2-editenv/i.test(text)) return '4.2';
  if (/rescue|emergency|single.*user|boot.*recovery/i.test(text)) return '4.3';
  if (/boot|initramfs|dracut|kernel.*parameter/i.test(text) && !/network/i.test(text)) return '4.1';
  if (/default.*target|multi-user\.target|graphical\.target|set-default/i.test(text)) return '7.3';
  
  // Firewall: 8.4, 10.1
  if (/firewall|firewall-cmd|zone|rich.*rule/i.test(text)) return '10.1';
  
  // SELinux: 10.4-10.8
  if (/semanage.*fcontext/i.test(text)) return '10.6';
  if (/chcon\b/i.test(text) && !/restorecon/i.test(text)) return '10.6';
  if (/restorecon/i.test(text)) return '10.5';
  if (/setsebool|getsebool|boolean/i.test(text)) return '10.7';
  if (/audit2allow|semodule|policy.*module/i.test(text)) return '10.8';
  if (/selinux|getenforce|setenforce|sestatus|seinfo|sesearch|context/i.test(text)) return '10.4';
  
  // Users/groups/sudo: 9.1-9.4
  if (/password.*polic|chage|passwd.*aging|password.*expir|passwd -[eE]/i.test(text)) return '9.4';
  if (/useradd|userdel|usermod|user.*account|lock.*user|create.*user/i.test(text) && !/password/i.test(text)) return '9.1';
  if (/groupadd|groupmod|groupdel|group|wheel/i.test(text) && !/sudo/i.test(text) && !/password/i.test(text)) return '9.2';
  if (/sudo|visudo/i.test(text)) return '9.3';
  
  // Permissions: 1.10, 6.5, 10.2
  if (/setuid|setgid|sticky.*bit|chmod.*[0-7]{4}/i.test(text)) return '10.2';
  if (/chmod|chown|permission|umask/i.test(text)) return '1.10';
  
  // Packages/dnf: 2.1-2.2, 7.5
  if (/dnf.*install|rpm.*install|package.*install|dnf.*group/i.test(text)) return '2.1';
  if (/dnf.*remove|dnf.*update|dnf.*history|repository|repolist|dnf.*module/i.test(text)) return '2.2';
  if (/subscription-manager|register|rhsm/i.test(text)) return '7.5';
  
  // Find/locate: 1.1
  if (/\bfind\b|locate|search.*file/i.test(text)) return '1.1';
  
  // Process management: 7.6
  if (/\bkill\b|process|lsof|fuser/i.test(text)) return '7.6';
  
  // Default
  return '1.1';
}

// Difficulty assessment function
function assessDifficulty(q, options, explain, mode) {
  const text = `${q} ${explain}`.toLowerCase();
  
  // Level 5: Synthesize - multi-step complex scenarios requiring planning
  // Must be truly complex with multiple steps, not just "after...then"
  if (/(shrink|reduce).*filesystem/i.test(text) && /unmount|e2fsck/i.test(text)) return 5;
  if (/pvmove.*vg/i.test(text) || /migrate.*data.*lvm/i.test(text)) return 5;
  if (/multiple.*step|sequence.*order|first.*then.*finally/i.test(text)) return 5;
  
  // Level 4: Analyze - understanding relationships, troubleshooting, comparisons
  if (/why|troubleshoot|diagnose|issue|problem|failed|error/i.test(text)) return 4;
  if (/difference between|compared to|vs\.|versus/i.test(text)) return 4;
  if (/which process|lsof.*deleted|identify/i.test(text)) return 4;
  if (/analyze|investigate|determine/i.test(text)) return 4;
  
  // Level 3: Apply - practical command execution with options/flags
  if (/to (create|configure|set|add|remove|modify|change|install|extend|grow|reload)/i.test(q)) {
    if (/persistently|boot|permanent|fstab|grub/i.test(text)) return 3;
    if (/\-[a-zA-Z]|flag|option|parameter/i.test(text)) return 3;
    return 3;
  }
  if (/command|which tool|how to (create|configure|set)/i.test(q)) return 3;
  
  // Level 2: Understand - knowing purpose, function, what tool does
  if (/used to|purpose|function|what does/i.test(q)) {
    if (/tool|command|utility/i.test(text)) return 2;
  }
  if (/shows?:|displays?:|lists?:/i.test(explain)) return 2;
  
  // Level 1: Recall - simple facts, definitions, basic recognition
  if (/^(what|which) (is|are|does)/i.test(q) && q.length < 60) return 1;
  if (options.every(o => o.length < 30)) return 1;
  if (/default|typical|standard/i.test(q) && !/configure|set/i.test(q)) return 1;
  
  return 3; // Default to Apply
}

// Fix longest-option leaks by rebalancing
function rebalanceOptions(q) {
  const lengths = q.options.map(o => o.length);
  const correctLen = lengths[q.correct];
  const maxLen = Math.max(...lengths);
  const avgLen = lengths.reduce((a, b) => a + b, 0) / lengths.length;
  
  // If correct answer is significantly longer than average, we have a potential leak
  if (correctLen === maxLen && correctLen > avgLen * 1.3) {
    // Strategy: Pad shorter options with clarifying details in parentheses
    const targetMinLen = Math.floor(avgLen * 0.9);
    
    q.options = q.options.map((opt, idx) => {
      if (idx === q.correct) return opt; // Keep correct answer as-is
      if (opt.length < targetMinLen) {
        // Add contextual padding that makes sense
        if (opt.includes('only') && !opt.includes('(')) {
          return opt + ' (limited scope)';
        } else if (!opt.includes('(')) {
          return opt + ' (alternative method)';
        }
      }
      return opt;
    });
  }
  
  return q;
}

// Process questions
let processed = filtered.map((q, idx) => {
  const obj = mapObjective(q.topic || '', q.q, q.explain || '');
  const level = assessDifficulty(q.q, q.options, q.explain || '', q.mode);
  
  // Create new question object
  const newQ = {
    id: idx + 1,
    mode: q.mode,
    topic: q.topic,
    q: q.q,
    options: [...q.options],
    correct: q.correct,
    explain: q.explain,
    obj: obj,
    level: level
  };
  
  // Rebalance if needed
  return rebalanceOptions(newQ);
});

console.log(`Processed: ${processed.length}`);

// Split into main and extra (roughly 2:1 ratio)
const mainCount = Math.ceil(processed.length * 0.65);
const main = processed.slice(0, mainCount);
const extra = processed.slice(mainCount);

console.log(`Main: ${main.length}, Extra: ${extra.length}`);

// Generate output files
function generateOutput(questions, varName) {
  let output = `window.${varName} = [\n`;
  questions.forEach((q, idx) => {
    output += `  {\n`;
    output += `    id: ${q.id},\n`;
    output += `    mode: "${q.mode}",\n`;
    output += `    topic: "${q.topic}",\n`;
    output += `    q: "${q.q.replace(/"/g, '\\"')}",\n`;
    output += `    options: [\n`;
    q.options.forEach(opt => {
      output += `      "${opt.replace(/"/g, '\\"')}",\n`;
    });
    output += `    ],\n`;
    output += `    correct: ${q.correct},\n`;
    output += `    explain: "${q.explain.replace(/"/g, '\\"')}",\n`;
    output += `    obj: "${q.obj}",\n`;
    output += `    level: ${q.level}\n`;
    output += `  }${idx < questions.length - 1 ? ',' : ''}\n`;
  });
  output += `];\n`;
  return output;
}

// Write output files
fs.writeFileSync('/workspace/data/rhcsa10-questions.js', generateOutput(main, 'QUESTION_BANK_RHCSA10'));
fs.writeFileSync('/workspace/data/rhcsa10-extra-questions.js', generateOutput(extra, 'QUESTION_BANK_RHCSA10_EXTRA'));

console.log('Done! Files written to /workspace/data/');
console.log(`Total RHEL 10 questions: ${processed.length}`);

// Statistics
const objCounts = {};
const levelCounts = {};
processed.forEach(q => {
  objCounts[q.obj] = (objCounts[q.obj] || 0) + 1;
  levelCounts[q.level] = (levelCounts[q.level] || 0) + 1;
});

console.log('\nObjective distribution:');
Object.keys(objCounts).sort().forEach(obj => {
  console.log(`  ${obj}: ${objCounts[obj]}`);
});

console.log('\nDifficulty distribution:');
Object.keys(levelCounts).sort().forEach(level => {
  console.log(`  Level ${level}: ${levelCounts[level]}`);
});
