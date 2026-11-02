#!/usr/bin/env node
'use strict';
const fs = require('fs');

const gap = [
  { id: 'rhcsa10-gap-001', obj: '1.2', q: 'Send stdout of dpkg-query to a file on RHEL (concept: redirection):', opts: ['cmd 2>&1 | tee log', 'cmd > outfile.txt', 'cmd < infile', 'cmd & background only'], c: 1, e: 'Single > redirects stdout. 2>&1 merges stderr; tee writes and displays.' },
  { id: 'rhcsa10-gap-002', obj: '1.2', q: 'Append errors from a script to /var/log/my.log:', opts: ['script >> /var/log/my.log 2>&1', 'script > /var/log/my.log only', 'script 2> /dev/null always', 'script | less'], c: 0, e: '>> appends; 2>&1 includes stderr in the redirect target.' },
  { id: 'rhcsa10-gap-003', obj: '1.3', q: 'Find lines containing "Failed password" in /var/log/secure:', opts: ['grep "Failed password" /var/log/secure', 'ls -l /var/log/secure', 'chmod +x /var/log/secure', 'man grep only'], c: 0, e: 'grep filters text; -i for case; regex for patterns.' },
  { id: 'rhcsa10-gap-004', obj: '1.3', q: 'Match lines starting with ERROR in app.log (regex):', opts: ['grep "^ERROR" app.log', 'grep ERROR$ app.log', 'cat app.log | wc', 'touch app.log'], c: 0, e: '^ anchors start of line in basic regex.' },
  { id: 'rhcsa10-gap-005', obj: '1.4', q: 'Copy file backup.tar.gz to admin@host:/backups/ securely:', opts: ['scp backup.tar.gz admin@host:/backups/', 'cp backup.tar.gz /backups on remote without ssh', 'ftp backup.tar.gz', 'mail -s file backup.tar.gz'], c: 0, e: 'scp/sftp over SSH; rsync -e ssh also works.' },
  { id: 'rhcsa10-gap-006', obj: '1.4', q: 'SSH to server1 as user ops on port 2222:', opts: ['ssh -p 2222 ops@server1', 'ssh ops@server1 -port 2222', 'telnet server1 2222', 'nc ops@server1'], c: 0, e: 'ssh -p specifies port; config in ~/.ssh/config optional.' },
  { id: 'rhcsa10-gap-007', obj: '1.5', q: 'Switch to multi-user.target (no GUI) for current boot:', opts: ['systemctl isolate multi-user.target', 'init 5', 'systemctl start graphical.target only', 'logout only'], c: 0, e: 'isolate changes runtime target; set-default makes it persistent.' },
  { id: 'rhcsa10-gap-008', obj: '1.5', q: 'Allow user bob to log in locally but block SSH (high level):', opts: ['Match User bob in sshd_config with DenyUsers or AllowGroups policy', 'chmod 000 /home/bob only', 'userdel bob', 'setenforce 0'], c: 0, e: 'sshd_config controls remote login; local console separate.' },
  { id: 'rhcsa10-gap-009', obj: '1.6', q: 'Create compressed tarball of /etc preserving permissions:', opts: ['tar czvf etc-backup.tar.gz /etc', 'zip -r etc.zip /etc only on RHEL default', 'cp -a /etc /tmp without archive', 'gzip /etc'], c: 0, e: 'tar c=create z=gzip f=file v=verbose.' },
  { id: 'rhcsa10-gap-010', obj: '1.6', q: 'Extract archive app.tar.bz2 in current directory:', opts: ['tar xjvf app.tar.bz2', 'tar czvf app.tar.bz2', 'bzip2 app.tar only', 'rpm -ivh app.tar.bz2'], c: 0, e: 'x=extract j=bzip2.' },
  { id: 'rhcsa10-gap-011', obj: '1.7', q: 'Open existing file notes.txt for editing in vi:', opts: ['vi notes.txt', 'vi -new notes.txt only creates', 'man notes.txt', 'grep notes.txt'], c: 0, e: 'vi/vim edit files; i insert, :wq save quit.' },
  { id: 'rhcsa10-gap-012', obj: '1.7', q: 'Replace all "old" with "new" in file.cfg in place with sed:', opts: ['sed -i "s/old/new/g" file.cfg', 'sed file.cfg > /dev/null only', 'cp file.cfg /dev/null', 'vi without write'], c: 0, e: 'sed -i edits in place; s///g global replace.' },
  { id: 'rhcsa10-gap-013', obj: '1.8', q: 'Move directory /data to /archive/data atomically on same filesystem:', opts: ['mv /data /archive/data', 'cp -r /data /archive && rm -rf /data only way', 'ln -s /data /archive/data', 'find /data -delete'], c: 0, e: 'mv renames/moves; cp -a for copy preserving attrs.' },
  { id: 'rhcsa10-gap-014', obj: '1.8', q: 'Create parent path /opt/apps/myapp in one mkdir command:', opts: ['mkdir -p /opt/apps/myapp', 'mkdir /opt/apps/myapp without -p if missing parents', 'touch /opt/apps/myapp', 'rmdir -p /opt/apps/myapp'], c: 0, e: 'mkdir -p creates parents as needed.' },
  { id: 'rhcsa10-gap-015', obj: '1.9', q: 'Create symbolic link /usr/bin/myvi pointing to /usr/bin/vim:', opts: ['ln -s /usr/bin/vim /usr/bin/myvi', 'ln /usr/bin/vim /usr/bin/myvi hard link across dirs', 'cp /usr/bin/vim /usr/bin/myvi always', 'chmod +x /usr/bin/myvi only'], c: 0, e: 'ln -s symlink; hard link same filesystem same inode.' },
  { id: 'rhcsa10-gap-016', obj: '1.9', q: 'Show inode number for file report.pdf:', opts: ['ls -i report.pdf', 'ln -l report.pdf', 'stat report.pdf also works', 'file report.pdf only type'], c: 0, e: 'ls -i shows inode; stat gives detail.' },
  { id: 'rhcsa10-gap-017', obj: '1.11', q: 'Search man pages for keyword chrony:', opts: ['man -k chrony', 'info chrony only if exists', 'rpm -q chrony', 'systemctl status chrony only'], c: 0, e: 'man -k searches short descriptions (apropos).' },
  { id: 'rhcsa10-gap-018', obj: '1.11', q: 'Read documentation for passwd command:', opts: ['man passwd', 'passwd --docs only', 'info --version', 'whatis passwd shows one line only'], c: 0, e: 'man primary; info for texinfo; /usr/share/doc packages.' },
  { id: 'rhcsa10-gap-019', obj: '3.1', q: 'Test if file /etc/hosts exists in bash script:', opts: ['if [ -f /etc/hosts ]; then ... fi', 'if exists /etc/hosts', 'test -d /etc/hosts for file', '[[ -x /etc/hosts ]] for regular file'], c: 0, e: '[ -f ] file; [ -d ] directory; [[ ]] bash builtin.' },
  { id: 'rhcsa10-gap-020', obj: '3.1', q: 'Run command only if previous succeeded ($?):', opts: ['cmd1 && cmd2', 'cmd1 || cmd2 always runs cmd2', 'cmd1 ; cmd2 ignores status', 'cmd1 | cmd2'], c: 0, e: '&& runs cmd2 if cmd1 exit 0.' },
  { id: 'rhcsa10-gap-021', obj: '3.2', q: 'Loop over files *.log in /var/log in bash:', opts: ['for f in /var/log/*.log; do ...; done', 'for f in $(ls) without glob', 'while *.log', 'loop /var/log'], c: 0, e: 'for f in glob; do ...; done standard loop.' },
  { id: 'rhcsa10-gap-022', obj: '3.2', q: 'Read file line by line in bash script:', opts: ['while IFS= read -r line; do ...; done < file', 'cat file | break', 'for line in file without read', 'grep only first line always'], c: 0, e: 'while read -r handles lines with spaces.' },
  { id: 'rhcsa10-gap-023', obj: '3.3', q: 'First positional argument in script is referenced as:', opts: ['$1', '$0', '$#', '$@ only all args'], c: 0, e: '$0 script name; $1 first arg; $# count.' },
  { id: 'rhcsa10-gap-024', obj: '3.3', q: 'Pass all arguments to backup.sh from wrapper script:', opts: ['backup.sh "$@"', 'backup.sh $* without quotes breaks spaces', 'backup.sh args', 'exec backup.sh only replaces shell'], c: 0, e: '"$@" preserves separate quoted args.' },
  { id: 'rhcsa10-gap-025', obj: '3.4', q: 'Capture output of hostname into variable h:', opts: ['h=$(hostname)', 'h=`hostname` also valid', 'hostname > h without command sub', 'read h hostname wrong order'], c: 0, e: '$(cmd) command substitution.' },
  { id: 'rhcsa10-gap-026', obj: '3.4', q: 'Check exit status of last command:', opts: ['echo $?', 'echo $!', 'echo $$', 'echo $#'], c: 0, e: '$? exit code; 0 success.' },
  { id: 'rhcsa10-gap-027', obj: '4.3', q: 'Break into root shell at boot for password reset (dracut):', opts: ['Add rd.break to kernel cmdline from GRUB edit', 'systemctl reboot --force only', 'init 0', 'ssh root@localhost'], c: 0, e: 'rd.break or rescue.target; chroot /sysroot; relabel if needed.' },
  { id: 'rhcsa10-gap-028', obj: '4.4', q: 'Find process using most CPU sorted:', opts: ['ps aux --sort=-%cpu | head', 'free -h only', 'df -h', 'lsof without filter'], c: 0, e: 'ps/top sort by CPU; kill sends signal.' },
  { id: 'rhcsa10-gap-029', obj: '4.4', q: 'Send SIGKILL to PID 1234:', opts: ['kill -9 1234', 'kill 1234 sends TERM by default', 'pkill without name', 'systemctl kill sends to units not arbitrary PIDs only'], c: 0, e: 'kill -9 SIGKILL; try TERM first.' },
  { id: 'rhcsa10-gap-030', obj: '4.7', q: 'Show journal logs for current boot only:', opts: ['journalctl -b', 'journalctl --since yesterday only', 'cat /var/log/messages only legacy', 'dmesg only kernel ring'], c: 0, e: 'journalctl -b current boot; -u unit filter.' },
  { id: 'rhcsa10-gap-031', obj: '4.7', q: 'Follow sshd logs live from journal:', opts: ['journalctl -u sshd -f', 'tail /var/log/sshd.log may not exist', 'rpm -q sshd', 'ss -tlnp'], c: 0, e: 'journalctl -f follow; -u filter unit.' },
  { id: 'rhcsa10-gap-032', obj: '5.4', q: 'Remove logical volume lv0 from vg0 without deleting PVs:', opts: ['lvremove /dev/vg0/lv0', 'vgremove vg0', 'pvremove /dev/sdb', 'fdisk -d'], c: 0, e: 'lvremove deletes LV; vgremove needs LVs gone.' },
  { id: 'rhcsa10-gap-033', obj: '6.4', q: 'Extend LV and grow ext4 filesystem online:', opts: ['lvextend -L +2G /dev/vg/lv; resize2fs /dev/vg/lv', 'xfs_growfs for ext4', 'lvreduce to extend', 'mkfs.ext4 without lvextend'], c: 0, e: 'ext4: lvextend then resize2fs; XFS uses xfs_growfs mountpoint.' },
  { id: 'rhcsa10-gap-034', obj: '6.5', q: 'Grant user dana read/write on file shared.txt without changing ugo:', opts: ['setfacl -m u:dana:rw shared.txt', 'chmod 777 shared.txt only', 'chown dana shared.txt only', 'getfacl removes ACLs'], c: 0, e: 'setfacl -m modifies ACL; getfacl -c clears.' },
  { id: 'rhcsa10-gap-035', obj: '6.5', q: 'Default ACL so new files in /projects inherit group dev rw:', opts: ['setfacl -m d:g:dev:rw /projects', 'chmod g+s only without ACL', 'chattr +i /projects', 'umask 077 only'], c: 0, e: 'Default ACL d: applies to new children.' },
  { id: 'rhcsa10-gap-036', obj: '7.3', q: 'Make graphical.target the default boot target:', opts: ['systemctl set-default graphical.target', 'systemctl isolate graphical.target only current boot', 'init 3', 'grub2-set-default 0 only kernel'], c: 0, e: 'set-default writes default.target symlink.' },
  { id: 'rhcsa10-gap-037', obj: '7.5', q: 'Install updates from enabled repos on registered system:', opts: ['dnf upgrade', 'rpm -Uvh *.rpm without deps check only', 'subscription-manager unregister', 'flatpak only'], c: 0, e: 'dnf upgrade/update from repos; local RPM with dnf install ./pkg.rpm.' },
  { id: 'rhcsa10-gap-038', obj: '9.3', q: 'Add user alice to supplementary group dev:', opts: ['usermod -aG dev alice', 'groupmod -a alice dev invalid', 'gpasswd -d alice dev removes', 'useradd -G without -a on existing user replaces groups'], c: 0, e: 'usermod -aG append groups; id alice verify.' },
  { id: 'rhcsa10-gap-039', obj: '10.3', q: 'Install SSH public key for user bob login:', opts: ['Place key in ~bob/.ssh/authorized_keys with correct perms', 'Put key in /etc/ssh/ssh_host_rsa_key', 'chmod 777 ~bob/.ssh', 'Disable sshd'], c: 0, e: '~/.ssh authorized_keys; dir 700; file 600.' },
  { id: 'rhcsa10-gap-040', obj: '10.3', q: 'Generate ed25519 key pair for user mike:', opts: ['ssh-keygen -t ed25519', 'ssh-keygen -t rsa1', 'openssl genrsa only without ssh format', 'scp generates keys automatically'], c: 0, e: 'ssh-keygen creates key pair; ssh-copy-id installs pubkey.' },
  { id: 'rhcsa10-gap-041', obj: '10.8', q: 'Allow httpd to connect to network (SELinux boolean):', opts: ['setsebool -P httpd_can_network_connect on', 'setenforce 0 permanently', 'chmod 777 /var/www', 'audit2allow without need'], c: 0, e: 'setsebool -P persistent; getsebool -a | grep httpd.' },
  { id: 'rhcsa10-gap-042', obj: '1.10', q: 'Give group dev write permission on file report.txt without world write:', opts: ['chmod g+w report.txt', 'chmod 777 report.txt', 'chown dev report.txt only changes owner', 'setfacl only way (incorrect)'], c: 0, e: 'chmod g+w adds group write; or chmod 664 if group already assigned.' },
  { id: 'rhcsa10-gap-043', obj: '2.3', q: 'RHEL 10 UEFI systems typically boot with:', opts: ['GRUB2 and shim for Secure Boot', 'LILO bootloader', 'SysV init only', 'No bootloader on UEFI'], c: 0, e: 'GRUB2 + shim; mokutil for MOK enrollment.' },
  { id: 'rhcsa10-gap-044', obj: '8.1', q: 'Preferred tools instead of legacy ifconfig/route on RHEL 10:', opts: ['ip and nmcli', 'ifconfig from net-tools is default', 'route only', 'brctl only'], c: 0, e: 'ip/ss/nmcli replace net-tools; DNF provides packages.' }
];

const bank = gap.map(function (item) {
  return {
    id: item.id,
    mode: 'exam',
    topic: 'RHCSA gap fill',
    q: item.q,
    options: item.opts,
    correct: item.c,
    explain: item.e,
    obj: item.obj,
    level: 2
  };
});

const out = '/**\n * RHCSA10 gap-fill questions for objective coverage (#31).\n */\nwindow.QUESTION_BANK_RHCSA10_GAP = ' +
  JSON.stringify(bank, null, 2) + ';\n';
fs.writeFileSync('data/rhcsa10-gap-questions.js', out);
console.log('Wrote', bank.length, 'gap questions');