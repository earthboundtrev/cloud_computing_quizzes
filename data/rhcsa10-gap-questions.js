/**
 * RHCSA10 gap-fill questions for objective coverage (#31).
 */
window.QUESTION_BANK_RHCSA10_GAP = [
  {
    "id": "rhcsa10-gap-001",
    "mode": "exam",
    "topic": "RHCSA gap fill",
    "q": "Send stdout of rpm -qa to a file on RHEL (concept: redirection):",
    "options": [
      "cmd 2>&1 | tee log",
      "cmd > outfile.txt",
      "cmd < infile",
      "cmd & background only"
    ],
    "correct": 1,
    "explain": "Single > redirects stdout. 2>&1 merges stderr; tee writes and displays.",
    "obj": "1.2",
    "level": 2
  },
  {
    "id": "rhcsa10-gap-002",
    "mode": "exam",
    "topic": "RHCSA gap fill",
    "q": "Append errors from a script to /var/log/my.log:",
    "options": [
      "script >> /var/log/my.log 2>&1",
      "script > /var/log/my.log only",
      "script 2> /dev/null always",
      "script | less"
    ],
    "correct": 0,
    "explain": ">> appends; 2>&1 includes stderr in the redirect target.",
    "obj": "1.2",
    "level": 2
  },
  {
    "id": "rhcsa10-gap-003",
    "mode": "exam",
    "topic": "RHCSA gap fill",
    "q": "Find lines containing \"Failed password\" in /var/log/secure:",
    "options": [
      "grep \"Failed password\" /var/log/secure",
      "ls -l /var/log/secure",
      "chmod +x /var/log/secure",
      "man grep only"
    ],
    "correct": 0,
    "explain": "grep filters text; -i for case; regex for patterns.",
    "obj": "1.3",
    "level": 2
  },
  {
    "id": "rhcsa10-gap-004",
    "mode": "exam",
    "topic": "RHCSA gap fill",
    "q": "Match lines starting with ERROR in app.log (regex):",
    "options": [
      "grep \"^ERROR\" app.log",
      "grep ERROR$ app.log",
      "cat app.log | wc",
      "touch app.log"
    ],
    "correct": 0,
    "explain": "^ anchors start of line in basic regex.",
    "obj": "1.3",
    "level": 2
  },
  {
    "id": "rhcsa10-gap-005",
    "mode": "exam",
    "topic": "RHCSA gap fill",
    "q": "Copy file backup.tar.gz to admin@host:/backups/ securely:",
    "options": [
      "scp backup.tar.gz admin@host:/backups/",
      "cp backup.tar.gz /backups on remote without ssh",
      "ftp backup.tar.gz",
      "mail -s file backup.tar.gz"
    ],
    "correct": 0,
    "explain": "scp/sftp over SSH; rsync -e ssh also works.",
    "obj": "1.4",
    "level": 2
  },
  {
    "id": "rhcsa10-gap-006",
    "mode": "exam",
    "topic": "RHCSA gap fill",
    "q": "SSH to server1 as user ops on port 2222:",
    "options": [
      "ssh -p 2222 ops@server1",
      "ssh ops@server1 -port 2222",
      "telnet server1 2222",
      "nc ops@server1"
    ],
    "correct": 0,
    "explain": "ssh -p specifies port; config in ~/.ssh/config optional.",
    "obj": "1.4",
    "level": 2
  },
  {
    "id": "rhcsa10-gap-007",
    "mode": "exam",
    "topic": "RHCSA gap fill",
    "q": "Switch to multi-user.target (no GUI) for current boot:",
    "options": [
      "systemctl isolate multi-user.target",
      "init 5",
      "systemctl start graphical.target only",
      "logout only"
    ],
    "correct": 0,
    "explain": "isolate changes runtime target; set-default makes it persistent.",
    "obj": "1.5",
    "level": 2
  },
  {
    "id": "rhcsa10-gap-008",
    "mode": "exam",
    "topic": "RHCSA gap fill",
    "q": "Allow user bob to log in locally but block SSH (high level):",
    "options": [
      "Match User bob in sshd_config with DenyUsers or AllowGroups policy",
      "chmod 000 /home/bob only",
      "userdel bob",
      "setenforce 0"
    ],
    "correct": 0,
    "explain": "sshd_config controls remote login; local console separate.",
    "obj": "1.5",
    "level": 2
  },
  {
    "id": "rhcsa10-gap-009",
    "mode": "exam",
    "topic": "RHCSA gap fill",
    "q": "Create compressed tarball of /etc preserving permissions:",
    "options": [
      "tar czvf etc-backup.tar.gz /etc",
      "zip -r etc.zip /etc only on RHEL default",
      "cp -a /etc /tmp without archive",
      "gzip /etc"
    ],
    "correct": 0,
    "explain": "tar c=create z=gzip f=file v=verbose.",
    "obj": "1.6",
    "level": 2
  },
  {
    "id": "rhcsa10-gap-010",
    "mode": "exam",
    "topic": "RHCSA gap fill",
    "q": "Extract archive app.tar.bz2 in current directory:",
    "options": [
      "tar xjvf app.tar.bz2",
      "tar czvf app.tar.bz2",
      "bzip2 app.tar only",
      "rpm -ivh app.tar.bz2"
    ],
    "correct": 0,
    "explain": "x=extract j=bzip2.",
    "obj": "1.6",
    "level": 2
  },
  {
    "id": "rhcsa10-gap-011",
    "mode": "exam",
    "topic": "RHCSA gap fill",
    "q": "Open existing file notes.txt for editing in vi:",
    "options": [
      "vi notes.txt",
      "vi -new notes.txt only creates",
      "man notes.txt",
      "grep notes.txt"
    ],
    "correct": 0,
    "explain": "vi/vim edit files; i insert, :wq save quit.",
    "obj": "1.7",
    "level": 2
  },
  {
    "id": "rhcsa10-gap-012",
    "mode": "exam",
    "topic": "RHCSA gap fill",
    "q": "Replace all \"old\" with \"new\" in file.cfg in place with sed:",
    "options": [
      "sed -i \"s/old/new/g\" file.cfg",
      "sed file.cfg > /dev/null only",
      "cp file.cfg /dev/null",
      "vi without write"
    ],
    "correct": 0,
    "explain": "sed -i edits in place; s///g global replace.",
    "obj": "1.7",
    "level": 2
  },
  {
    "id": "rhcsa10-gap-013",
    "mode": "exam",
    "topic": "RHCSA gap fill",
    "q": "Move directory /data to /archive/data atomically on same filesystem:",
    "options": [
      "mv /data /archive/data",
      "cp -r /data /archive && rm -rf /data only way",
      "ln -s /data /archive/data",
      "find /data -delete"
    ],
    "correct": 0,
    "explain": "mv renames/moves; cp -a for copy preserving attrs.",
    "obj": "1.8",
    "level": 2
  },
  {
    "id": "rhcsa10-gap-014",
    "mode": "exam",
    "topic": "RHCSA gap fill",
    "q": "Create parent path /opt/apps/myapp in one mkdir command:",
    "options": [
      "mkdir -p /opt/apps/myapp",
      "mkdir /opt/apps/myapp without -p if missing parents",
      "touch /opt/apps/myapp",
      "rmdir -p /opt/apps/myapp"
    ],
    "correct": 0,
    "explain": "mkdir -p creates parents as needed.",
    "obj": "1.8",
    "level": 2
  },
  {
    "id": "rhcsa10-gap-015",
    "mode": "exam",
    "topic": "RHCSA gap fill",
    "q": "Create symbolic link /usr/bin/myvi pointing to /usr/bin/vim:",
    "options": [
      "ln -s /usr/bin/vim /usr/bin/myvi",
      "ln /usr/bin/vim /usr/bin/myvi hard link across dirs",
      "cp /usr/bin/vim /usr/bin/myvi always",
      "chmod +x /usr/bin/myvi only"
    ],
    "correct": 0,
    "explain": "ln -s symlink; hard link same filesystem same inode.",
    "obj": "1.9",
    "level": 2
  },
  {
    "id": "rhcsa10-gap-016",
    "mode": "exam",
    "topic": "RHCSA gap fill",
    "q": "Show inode number for file report.pdf:",
    "options": [
      "ls -i report.pdf",
      "ln -l report.pdf",
      "stat report.pdf also works",
      "file report.pdf only type"
    ],
    "correct": 0,
    "explain": "ls -i shows inode; stat gives detail.",
    "obj": "1.9",
    "level": 2
  },
  {
    "id": "rhcsa10-gap-017",
    "mode": "exam",
    "topic": "RHCSA gap fill",
    "q": "Search man pages for keyword chrony:",
    "options": [
      "man -k chrony",
      "info chrony only if exists",
      "rpm -q chrony",
      "systemctl status chrony only"
    ],
    "correct": 0,
    "explain": "man -k searches short descriptions (apropos).",
    "obj": "1.11",
    "level": 2
  },
  {
    "id": "rhcsa10-gap-018",
    "mode": "exam",
    "topic": "RHCSA gap fill",
    "q": "Read documentation for passwd command:",
    "options": [
      "man passwd",
      "passwd --docs only",
      "info --version",
      "whatis passwd shows one line only"
    ],
    "correct": 0,
    "explain": "man primary; info for texinfo; /usr/share/doc packages.",
    "obj": "1.11",
    "level": 2
  },
  {
    "id": "rhcsa10-gap-019",
    "mode": "exam",
    "topic": "RHCSA gap fill",
    "q": "Test if file /etc/hosts exists in bash script:",
    "options": [
      "if [ -f /etc/hosts ]; then ... fi",
      "if exists /etc/hosts",
      "test -d /etc/hosts for file",
      "[[ -x /etc/hosts ]] for regular file"
    ],
    "correct": 0,
    "explain": "[ -f ] file; [ -d ] directory; [[ ]] bash builtin.",
    "obj": "3.1",
    "level": 2
  },
  {
    "id": "rhcsa10-gap-020",
    "mode": "exam",
    "topic": "RHCSA gap fill",
    "q": "Run command only if previous succeeded ($?):",
    "options": [
      "cmd1 && cmd2",
      "cmd1 || cmd2 always runs cmd2",
      "cmd1 ; cmd2 ignores status",
      "cmd1 | cmd2"
    ],
    "correct": 0,
    "explain": "&& runs cmd2 if cmd1 exit 0.",
    "obj": "3.1",
    "level": 2
  },
  {
    "id": "rhcsa10-gap-021",
    "mode": "exam",
    "topic": "RHCSA gap fill",
    "q": "Loop over files *.log in /var/log in bash:",
    "options": [
      "for f in /var/log/*.log; do ...; done",
      "for f in $(ls) without glob",
      "while *.log",
      "loop /var/log"
    ],
    "correct": 0,
    "explain": "for f in glob; do ...; done standard loop.",
    "obj": "3.2",
    "level": 2
  },
  {
    "id": "rhcsa10-gap-022",
    "mode": "exam",
    "topic": "RHCSA gap fill",
    "q": "Read file line by line in bash script:",
    "options": [
      "while IFS= read -r line; do ...; done < file",
      "cat file | break",
      "for line in file without read",
      "grep only first line always"
    ],
    "correct": 0,
    "explain": "while read -r handles lines with spaces.",
    "obj": "3.2",
    "level": 2
  },
  {
    "id": "rhcsa10-gap-023",
    "mode": "exam",
    "topic": "RHCSA gap fill",
    "q": "First positional argument in script is referenced as:",
    "options": [
      "$1",
      "$0",
      "$#",
      "$@ only all args"
    ],
    "correct": 0,
    "explain": "$0 script name; $1 first arg; $# count.",
    "obj": "3.3",
    "level": 2
  },
  {
    "id": "rhcsa10-gap-024",
    "mode": "exam",
    "topic": "RHCSA gap fill",
    "q": "Pass all arguments to backup.sh from wrapper script:",
    "options": [
      "backup.sh \"$@\"",
      "backup.sh $* without quotes breaks spaces",
      "backup.sh args",
      "exec backup.sh only replaces shell"
    ],
    "correct": 0,
    "explain": "\"$@\" preserves separate quoted args.",
    "obj": "3.3",
    "level": 2
  },
  {
    "id": "rhcsa10-gap-025",
    "mode": "exam",
    "topic": "RHCSA gap fill",
    "q": "Capture output of hostname into variable h:",
    "options": [
      "h=$(hostname)",
      "h=`hostname` also valid",
      "hostname > h without command sub",
      "read h hostname wrong order"
    ],
    "correct": 0,
    "explain": "$(cmd) command substitution.",
    "obj": "3.4",
    "level": 2
  },
  {
    "id": "rhcsa10-gap-026",
    "mode": "exam",
    "topic": "RHCSA gap fill",
    "q": "Check exit status of last command:",
    "options": [
      "echo $?",
      "echo $!",
      "echo $$",
      "echo $#"
    ],
    "correct": 0,
    "explain": "$? exit code; 0 success.",
    "obj": "3.4",
    "level": 2
  },
  {
    "id": "rhcsa10-gap-027",
    "mode": "exam",
    "topic": "RHCSA gap fill",
    "q": "Break into root shell at boot for password reset (dracut):",
    "options": [
      "Add rd.break to kernel cmdline from GRUB edit",
      "systemctl reboot --force only",
      "init 0",
      "ssh root@localhost"
    ],
    "correct": 0,
    "explain": "rd.break or rescue.target; chroot /sysroot; relabel if needed.",
    "obj": "4.3",
    "level": 2
  },
  {
    "id": "rhcsa10-gap-028",
    "mode": "exam",
    "topic": "RHCSA gap fill",
    "q": "Find process using most CPU sorted:",
    "options": [
      "ps aux --sort=-%cpu | head",
      "free -h only",
      "df -h",
      "lsof without filter"
    ],
    "correct": 0,
    "explain": "ps/top sort by CPU; kill sends signal.",
    "obj": "4.4",
    "level": 2
  },
  {
    "id": "rhcsa10-gap-029",
    "mode": "exam",
    "topic": "RHCSA gap fill",
    "q": "Send SIGKILL to PID 1234:",
    "options": [
      "kill -9 1234",
      "kill 1234 sends TERM by default",
      "pkill without name",
      "systemctl kill sends to units not arbitrary PIDs only"
    ],
    "correct": 0,
    "explain": "kill -9 SIGKILL; try TERM first.",
    "obj": "4.4",
    "level": 2
  },
  {
    "id": "rhcsa10-gap-030",
    "mode": "exam",
    "topic": "RHCSA gap fill",
    "q": "Show journal logs for current boot only:",
    "options": [
      "journalctl -b",
      "journalctl --since yesterday only",
      "cat /var/log/messages only legacy",
      "dmesg only kernel ring"
    ],
    "correct": 0,
    "explain": "journalctl -b current boot; -u unit filter.",
    "obj": "4.7",
    "level": 2
  },
  {
    "id": "rhcsa10-gap-031",
    "mode": "exam",
    "topic": "RHCSA gap fill",
    "q": "Follow sshd logs live from journal:",
    "options": [
      "journalctl -u sshd -f",
      "tail /var/log/sshd.log may not exist",
      "rpm -q sshd",
      "ss -tlnp"
    ],
    "correct": 0,
    "explain": "journalctl -f follow; -u filter unit.",
    "obj": "4.7",
    "level": 2
  },
  {
    "id": "rhcsa10-gap-032",
    "mode": "exam",
    "topic": "RHCSA gap fill",
    "q": "Remove logical volume lv0 from vg0 without deleting PVs:",
    "options": [
      "lvremove /dev/vg0/lv0",
      "vgremove vg0",
      "pvremove /dev/sdb",
      "fdisk -d"
    ],
    "correct": 0,
    "explain": "lvremove deletes LV; vgremove needs LVs gone.",
    "obj": "5.4",
    "level": 2
  },
  {
    "id": "rhcsa10-gap-033",
    "mode": "exam",
    "topic": "RHCSA gap fill",
    "q": "Extend LV and grow ext4 filesystem online:",
    "options": [
      "lvextend -L +2G /dev/vg/lv; resize2fs /dev/vg/lv",
      "xfs_growfs for ext4",
      "lvreduce to extend",
      "mkfs.ext4 without lvextend"
    ],
    "correct": 0,
    "explain": "ext4: lvextend then resize2fs; XFS uses xfs_growfs mountpoint.",
    "obj": "6.4",
    "level": 2
  },
  {
    "id": "rhcsa10-gap-034",
    "mode": "exam",
    "topic": "RHCSA gap fill",
    "q": "Grant user dana read/write on file shared.txt without changing ugo:",
    "options": [
      "setfacl -m u:dana:rw shared.txt",
      "chmod 777 shared.txt only",
      "chown dana shared.txt only",
      "getfacl -c only omits header comments"
    ],
    "correct": 0,
    "explain": "setfacl -m modifies ACL entries; remove all ACLs with setfacl -b path (getfacl -c is not clear-all).",
    "obj": "6.5",
    "level": 2
  },
  {
    "id": "rhcsa10-gap-035",
    "mode": "exam",
    "topic": "RHCSA gap fill",
    "q": "Default ACL so new files in /projects inherit group dev rw:",
    "options": [
      "setfacl -m d:g:dev:rw /projects",
      "chmod g+s only without ACL",
      "chattr +i /projects",
      "umask 077 only"
    ],
    "correct": 0,
    "explain": "Default ACL d: applies to new children.",
    "obj": "6.5",
    "level": 2
  },
  {
    "id": "rhcsa10-gap-036",
    "mode": "exam",
    "topic": "RHCSA gap fill",
    "q": "Make graphical.target the default boot target:",
    "options": [
      "systemctl set-default graphical.target",
      "systemctl isolate graphical.target only current boot",
      "init 3",
      "grub2-set-default 0 only kernel"
    ],
    "correct": 0,
    "explain": "set-default writes default.target symlink.",
    "obj": "7.3",
    "level": 2
  },
  {
    "id": "rhcsa10-gap-037",
    "mode": "exam",
    "topic": "RHCSA gap fill",
    "q": "Install updates from enabled repos on registered system:",
    "options": [
      "dnf upgrade",
      "rpm -Uvh *.rpm without deps check only",
      "subscription-manager unregister",
      "flatpak only"
    ],
    "correct": 0,
    "explain": "dnf upgrade/update from repos; local RPM with dnf install ./pkg.rpm.",
    "obj": "7.5",
    "level": 2
  },
  {
    "id": "rhcsa10-gap-038",
    "mode": "exam",
    "topic": "RHCSA gap fill",
    "q": "Add user alice to supplementary group dev:",
    "options": [
      "usermod -aG dev alice",
      "groupmod -a alice dev invalid",
      "gpasswd -d alice dev removes",
      "useradd -G without -a on existing user replaces groups"
    ],
    "correct": 0,
    "explain": "usermod -aG append groups; id alice verify.",
    "obj": "9.3",
    "level": 2
  },
  {
    "id": "rhcsa10-gap-039",
    "mode": "exam",
    "topic": "RHCSA gap fill",
    "q": "Install SSH public key for user bob login:",
    "options": [
      "Place key in ~bob/.ssh/authorized_keys with correct perms",
      "Put key in /etc/ssh/ssh_host_rsa_key",
      "chmod 777 ~bob/.ssh",
      "Disable sshd"
    ],
    "correct": 0,
    "explain": "~/.ssh authorized_keys; dir 700; file 600.",
    "obj": "10.3",
    "level": 2
  },
  {
    "id": "rhcsa10-gap-040",
    "mode": "exam",
    "topic": "RHCSA gap fill",
    "q": "Generate ed25519 key pair for user mike:",
    "options": [
      "ssh-keygen -t ed25519",
      "ssh-keygen -t rsa1",
      "openssl genrsa only without ssh format",
      "scp generates keys automatically"
    ],
    "correct": 0,
    "explain": "ssh-keygen creates key pair; ssh-copy-id installs pubkey.",
    "obj": "10.3",
    "level": 2
  },
  {
    "id": "rhcsa10-gap-041",
    "mode": "exam",
    "topic": "RHCSA gap fill",
    "q": "Allow httpd to connect to network (SELinux boolean):",
    "options": [
      "setsebool -P httpd_can_network_connect on",
      "setenforce 0 permanently",
      "chmod 777 /var/www",
      "audit2allow without need"
    ],
    "correct": 0,
    "explain": "setsebool -P persistent; getsebool -a | grep httpd.",
    "obj": "10.8",
    "level": 2
  },
  {
    "id": "rhcsa10-gap-042",
    "mode": "exam",
    "topic": "RHCSA gap fill",
    "q": "Give group dev write permission on file report.txt without world write:",
    "options": [
      "chmod g+w report.txt",
      "chmod 777 report.txt",
      "chown dev report.txt only changes owner",
      "setfacl only way (incorrect)"
    ],
    "correct": 0,
    "explain": "chmod g+w adds group write; or chmod 664 if group already assigned.",
    "obj": "1.10",
    "level": 2
  },
  {
    "id": "rhcsa10-gap-043",
    "mode": "exam",
    "topic": "RHCSA gap fill",
    "q": "RHEL 10 UEFI systems typically boot with:",
    "options": [
      "GRUB2 and shim for Secure Boot",
      "LILO bootloader",
      "SysV init only",
      "No bootloader on UEFI"
    ],
    "correct": 0,
    "explain": "GRUB2 + shim; mokutil for MOK enrollment.",
    "obj": "7.6",
    "level": 2
  },
  {
    "id": "rhcsa10-gap-044",
    "mode": "exam",
    "topic": "RHCSA gap fill",
    "q": "Preferred tools instead of legacy ifconfig/route on RHEL 10:",
    "options": [
      "ip and nmcli",
      "ifconfig from net-tools is default",
      "route only",
      "brctl only"
    ],
    "correct": 0,
    "explain": "ip/ss/nmcli replace net-tools; DNF provides packages.",
    "obj": "8.1",
    "level": 2
  }
];
