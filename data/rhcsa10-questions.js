window.QUESTION_BANK_RHCSA10 = [
  {
    "id": 1,
    "mode": "exam",
    "topic": "Storage",
    "q": "To create an XFS file system on /dev/sdb1, which command?",
    "options": [
      "mkswap on the block device",
      "mkfs.xfs /dev/sdb1",
      "mkswap /dev/sdb1",
      "parted /dev/sdb print only"
    ],
    "correct": 1,
    "explain": "mkfs.xfs /dev/sdb1 creates XFS. mkfs.ext4 for ext4.",
    "obj": "5.6",
    "level": 3
  },
  {
    "id": 2,
    "mode": "exam",
    "topic": "Storage",
    "q": "To extend an XFS file system after expanding the underlying partition, you:",
    "options": [
      "Cannot extend XFS",
      "Use xfs_growfs (XFS grows online)",
      "Must umount first",
      "Recreate the filesystem"
    ],
    "correct": 1,
    "explain": "xfs_growfs mounts /path - XFS grows online. Cannot shrink. ext4: resize2fs.",
    "obj": "5.1",
    "level": 3
  },
  {
    "id": 3,
    "mode": "exam",
    "topic": "systemd",
    "q": "To enable a service to start at boot, which command?",
    "options": [
      "chkconfig service on",
      "systemctl enable service",
      "service service enable",
      "initctl enable service"
    ],
    "correct": 1,
    "explain": "systemctl enable <unit> - start at boot. systemctl start - start now.",
    "obj": "7.2",
    "level": 3
  },
  {
    "id": 4,
    "mode": "exam",
    "topic": "systemd",
    "q": "To view logs for a specific systemd service:",
    "options": [
      "tail /var/log/messages",
      "journalctl -u service",
      "cat /var/log/service",
      "dmesg (incorrect for this task)"
    ],
    "correct": 1,
    "explain": "journalctl -u <unit> - logs for that unit. journalctl -xe for recent.",
    "obj": "7.2",
    "level": 1
  },
  {
    "id": 5,
    "mode": "exam",
    "topic": "Firewall",
    "q": "To allow HTTP through firewalld persistently:",
    "options": [
      "iptables -A INPUT -p tcp --dport 80",
      "firewall-cmd --permanent --add-service=http && firewall-cmd --reload",
      "ufw allow 80",
      "setenforce 0"
    ],
    "correct": 1,
    "explain": "firewall-cmd --permanent --add-service=http; --reload to apply.",
    "obj": "10.1",
    "level": 3
  },
  {
    "id": 6,
    "mode": "exam",
    "topic": "Users/Groups",
    "q": "To create a user with a specific UID and primary group:",
    "options": [
      "adduser -u 1001 -g mygroup myuser",
      "useradd -u 1001 -g mygroup myuser",
      "usercreate myuser",
      "newuser myuser"
    ],
    "correct": 1,
    "explain": "useradd -u UID -g GID username. -G for supplementary groups.",
    "obj": "9.1",
    "level": 3
  },
  {
    "id": 7,
    "mode": "exam",
    "topic": "SELinux",
    "q": "To check SELinux status:",
    "options": [
      "cat /etc/selinux/config",
      "sestatus -b only",
      "selinux --status",
      "chcon (incorrect for this task)"
    ],
    "correct": 1,
    "explain": "getenforce shows Enforcing/Permissive/Disabled. sestatus for details.",
    "obj": "10.4",
    "level": 1
  },
  {
    "id": 8,
    "mode": "exam",
    "topic": "SELinux",
    "q": "To temporarily set SELinux to permissive mode:",
    "options": [
      "edit /etc/selinux/config",
      "setenforce 0",
      "chcon -t",
      "chcon -t unlabeled_t on the path"
    ],
    "correct": 1,
    "explain": "setenforce 0 = permissive. setenforce 1 = enforcing. Does not persist across reboot.",
    "obj": "4.1",
    "level": 1
  },
  {
    "id": 9,
    "mode": "exam",
    "topic": "Storage",
    "q": "LVM physical volumes are created with:",
    "options": [
      "pvcreate",
      "vgcreate",
      "lvcreate",
      "parted /dev/sdb print only"
    ],
    "correct": 1,
    "explain": "pvcreate /dev/sdX - create PV. vgcreate - VG. lvcreate - LV.",
    "obj": "5.3",
    "level": 1
  },
  {
    "id": 10,
    "mode": "exam",
    "topic": "Storage",
    "q": "To add a new disk to an existing LVM volume group:",
    "options": [
      "vgextend VGname /dev/sdX (after pvcreate)",
      "lvextend",
      "Cannot add",
      "vgcreate again"
    ],
    "correct": 1,
    "explain": "pvcreate /dev/sdX; vgextend VGname /dev/sdX. Then lvextend to grow LV.",
    "obj": "5.5",
    "level": 3
  },
  {
    "id": 11,
    "mode": "exam",
    "topic": "Scheduling",
    "q": "To schedule a recurring job for a user, which is used?",
    "options": [
      "at (incorrect for this task)",
      "cron (crontab -e)",
      "systemd timer",
      "anacron (incorrect for this task)"
    ],
    "correct": 1,
    "explain": "crontab -e for user cron. /etc/crontab for system. at for one-time.",
    "obj": "7.1",
    "level": 1
  },
  {
    "id": 12,
    "mode": "exam",
    "topic": "Networking",
    "q": "To configure a static IP using nmcli:",
    "options": [
      "ifconfig eth0 192.168.1.10",
      "ip link set dev eth0 down",
      "route add",
      "netstat (incorrect for this task)"
    ],
    "correct": 1,
    "explain": "nmcli con mod \"conn\" ipv4.addresses 192.168.1.10/24 ipv4.method manual",
    "obj": "8.2",
    "level": 3
  },
  {
    "id": 13,
    "mode": "exam",
    "topic": "Networking",
    "q": "To see active NetworkManager connections:",
    "options": [
      "ifconfig",
      "ip link set dev eth0 down",
      "netstat -i",
      "ip link (incorrect for this task)"
    ],
    "correct": 1,
    "explain": "nmcli con show - connections. nmcli con show --active for active.",
    "obj": "8.1",
    "level": 1
  },
  {
    "id": 14,
    "mode": "exam",
    "topic": "Users/Groups",
    "q": "To set a password policy (e.g., max days) for users:",
    "options": [
      "passwd -n 90",
      "chage -M 90 user",
      "usermod -e",
      "edit /etc/passwd"
    ],
    "correct": 1,
    "explain": "chage -M 90 = max days between password changes. chage -l to list.",
    "obj": "9.4",
    "level": 3
  },
  {
    "id": 15,
    "mode": "exam",
    "topic": "Filesystems",
    "q": "To persistently mount a filesystem by UUID, you add an entry to:",
    "options": [
      "/etc/fstab",
      "/etc/mtab",
      "/proc/mounts",
      "parted /dev/sdb print only"
    ],
    "correct": 1,
    "explain": "/etc/fstab = persistent mounts. Use UUID=... for stability (UUID=xxx /mount xfs defaults 0 0).",
    "obj": "6.1",
    "level": 1
  },
  {
    "id": 16,
    "mode": "exam",
    "topic": "Filesystems",
    "q": "To find files by name:",
    "options": [
      "grep (incorrect for this task)",
      "find / -name filename",
      "locate (if updatedb run)",
      "Both B and C"
    ],
    "correct": 3,
    "explain": "find / -name 'file' - searches. locate uses database (faster, run updatedb).",
    "obj": "6.1",
    "level": 1
  },
  {
    "id": 17,
    "mode": "exam",
    "topic": "Permissions",
    "q": "To set setuid on a binary so it runs as owner:",
    "options": [
      "chmod 4777 file",
      "chmod u+s file",
      "chown root file",
      "Both A and B"
    ],
    "correct": 3,
    "explain": "chmod u+s or chmod 4755 - setuid. Runs with owner's privileges.",
    "obj": "10.2",
    "level": 3
  },
  {
    "id": 18,
    "mode": "exam",
    "topic": "systemd",
    "q": "To mask a service so it cannot be started:",
    "options": [
      "systemctl disable service",
      "systemctl mask service",
      "systemctl stop service",
      "rm /usr/lib/systemd/system/service"
    ],
    "correct": 1,
    "explain": "systemctl mask - prevents start (symlink to /dev/null). disable only stops auto-start.",
    "obj": "7.2",
    "level": 3
  },
  {
    "id": 19,
    "mode": "exam",
    "topic": "Storage",
    "q": "Swap space can be created with:",
    "options": [
      "mkswap /dev/sdX; swapon /dev/sdX",
      "mkfs.swap",
      "lvextend",
      "xfs_growfs"
    ],
    "correct": 1,
    "explain": "mkswap /dev/sdX; swapon /dev/sdX. Add to fstab for persistence.",
    "obj": "5.2",
    "level": 3
  },
  {
    "id": 20,
    "mode": "exam",
    "topic": "SELinux",
    "q": "restorecon is used to:",
    "options": [
      "Disable SELinux",
      "Restore default SELinux context on files",
      "Change mode",
      "Reload policy"
    ],
    "correct": 1,
    "explain": "restorecon -Rv /path - restore default context. Fixes labeling issues.",
    "obj": "10.5",
    "level": 4
  },
  {
    "id": 21,
    "mode": "exam",
    "topic": "Packages",
    "q": "To install a package from a repository in RHEL 9:",
    "options": [
      "rpm -i package.rpm",
      "dnf install package",
      "yum install package (symlink to dnf)",
      "Both B and C"
    ],
    "correct": 3,
    "explain": "dnf install package. yum is symlink to dnf in RHEL 8/9.",
    "obj": "2.1",
    "level": 3
  },
  {
    "id": 22,
    "mode": "exam",
    "topic": "Packages",
    "q": "To list installed packages:",
    "options": [
      "rpm -qa (incorrect for this task)",
      "dnf list installed",
      "Both (incorrect for this task)",
      "apt list"
    ],
    "correct": 2,
    "explain": "rpm -qa or dnf list installed. dnf repolist for repositories.",
    "obj": "2.1",
    "level": 1
  },
  {
    "id": 23,
    "mode": "exam",
    "topic": "Boot",
    "q": "To set default boot target (e.g., multi-user):",
    "options": [
      "edit /etc/inittab",
      "systemctl set-default multi-user.target",
      "chkconfig 3",
      "init 3 (incorrect for this task)"
    ],
    "correct": 1,
    "explain": "systemctl set-default multi-user.target. graphical.target for GUI.",
    "obj": "7.2",
    "level": 3
  },
  {
    "id": 24,
    "mode": "exam",
    "topic": "SELinux",
    "q": "chcon is used to:",
    "options": [
      "Disable SELinux",
      "Temporarily change SELinux context",
      "Reload policy",
      "Set enforcing"
    ],
    "correct": 1,
    "explain": "chcon -t type file - change context. Temporary; restorecon can revert. semanage for persistent.",
    "obj": "10.5",
    "level": 3
  },
  {
    "id": 25,
    "mode": "exam",
    "topic": "Storage",
    "q": "To create a swap file (not partition):",
    "options": [
      "Cannot use file for swap",
      "dd + mkswap + chmod 600 + swapon",
      "mkfs.swap file",
      "swapoff (incorrect for this task)"
    ],
    "correct": 1,
    "explain": "dd if=/dev/zero of=swapfile bs=1M count=1024; mkswap swapfile; chmod 600; swapon swapfile.",
    "obj": "5.1",
    "level": 3
  },
  {
    "id": 26,
    "mode": "exam",
    "topic": "Users/Groups",
    "q": "To give a user sudo access without password:",
    "options": [
      "Add to wheel group (may need NOPASSWD in sudoers)",
      "chmod 4755 /usr/bin/sudo",
      "Remove password",
      "usermod -aG root"
    ],
    "correct": 1,
    "explain": "Add to wheel; or sudoers: user ALL=(ALL) NOPASSWD: ALL. visudo to edit safely.",
    "obj": "9.3",
    "level": 3
  },
  {
    "id": 27,
    "mode": "exam",
    "topic": "Firewall",
    "q": "To list all firewalld zones:",
    "options": [
      "iptables -L",
      "firewall-cmd --get-zones",
      "ufw status",
      "nft list ruleset"
    ],
    "correct": 1,
    "explain": "firewall-cmd --get-zones. --get-default-zone, --list-all for zone details.",
    "obj": "10.1",
    "level": 1
  },
  {
    "id": 28,
    "mode": "exam",
    "topic": "Storage",
    "q": "To display disk usage by directory:",
    "options": [
      "ls -la (incorrect for this task)",
      "du -sh /path",
      "df -h (incorrect for this task)",
      "parted /dev/sdb print only"
    ],
    "correct": 1,
    "explain": "du -sh /path - disk usage. df -h - filesystem usage.",
    "obj": "5.6",
    "level": 1
  },
  {
    "id": 29,
    "mode": "exam",
    "topic": "Networking",
    "q": "To add a host entry for name resolution:",
    "options": [
      "edit /etc/hosts",
      "edit /etc/resolv.conf",
      "ip link set dev eth0 down",
      "systemd-resolve"
    ],
    "correct": 1,
    "explain": "/etc/hosts - static entries. /etc/resolv.conf - DNS servers.",
    "obj": "8.1",
    "level": 3
  },
  {
    "id": 30,
    "mode": "exam",
    "topic": "systemd",
    "q": "To reload a service's configuration without full restart:",
    "options": [
      "systemctl reload service (if supported)",
      "Always restart",
      "kill -HUP",
      "initctl reload"
    ],
    "correct": 1,
    "explain": "systemctl reload - reload config (e.g., sshd). Not all services support it.",
    "obj": "4.9",
    "level": 3
  },
  {
    "id": 31,
    "mode": "exam",
    "topic": "Filesystems",
    "q": "To create an ext4 filesystem:",
    "options": [
      "mkswap on the block device",
      "mkfs.xfs /dev/sdX",
      "mke2fs -t ext4",
      "Both A and C"
    ],
    "correct": 3,
    "explain": "mkfs.ext4 or mke2fs -t ext4. XFS for mkfs.xfs.",
    "obj": "6.1",
    "level": 3
  },
  {
    "id": 32,
    "mode": "exam",
    "topic": "Storage",
    "q": "To list LVM volume groups:",
    "options": [
      "lvdisplay",
      "vgdisplay or vgs",
      "pvdisplay",
      "parted /dev/sdb print only"
    ],
    "correct": 1,
    "explain": "vgdisplay, vgs - volume groups. pvdisplay, pvs - physical. lvdisplay, lvs - logical.",
    "obj": "5.3",
    "level": 1
  },
  {
    "id": 33,
    "mode": "exam",
    "topic": "systemd",
    "q": "To see why a unit failed:",
    "options": [
      "Only status",
      "systemctl status unit; journalctl -u unit -b",
      "Only journalctl",
      "Only log"
    ],
    "correct": 1,
    "explain": "systemctl status shows state and recent log. journalctl -u unit -b for this boot.",
    "obj": "7.2",
    "level": 4
  },
  {
    "id": 34,
    "mode": "exam",
    "topic": "Firewall",
    "q": "To set default zone in firewalld:",
    "options": [
      "iptables -P",
      "firewall-cmd --set-default-zone=public",
      "ufw default",
      "nft add rule"
    ],
    "correct": 1,
    "explain": "firewall-cmd --set-default-zone=zone. --get-default-zone to check.",
    "obj": "7.3",
    "level": 3
  },
  {
    "id": 35,
    "mode": "exam",
    "topic": "Users/Groups",
    "q": "To change a user's primary group:",
    "options": [
      "chgrp (incorrect for this task)",
      "usermod -g group user",
      "groupmod",
      "chown (incorrect for this task)"
    ],
    "correct": 1,
    "explain": "usermod -g = primary group. -G = supplementary (replace list).",
    "obj": "9.1",
    "level": 3
  },
  {
    "id": 36,
    "mode": "exam",
    "topic": "SELinux",
    "q": "getsebool shows:",
    "options": [
      "Only context",
      "SELinux boolean settings (on/off)",
      "Only mode",
      "Only policy"
    ],
    "correct": 1,
    "explain": "getsebool -a or getsebool name. setsebool to change (often -P for persistent).",
    "obj": "10.7",
    "level": 3
  },
  {
    "id": 37,
    "mode": "exam",
    "topic": "Storage",
    "q": "To reduce an LVM logical volume size (shrink):",
    "options": [
      "Only lvextend",
      "Resize fs first (e.g., resize2fs), then lvreduce",
      "Only lvreduce",
      "XFS cannot shrink"
    ],
    "correct": 1,
    "explain": "Shrink: resize fs smaller, then lvreduce. XFS cannot shrink; only grow.",
    "obj": "5.5",
    "level": 3
  },
  {
    "id": 38,
    "mode": "exam",
    "topic": "Networking",
    "q": "To set DNS via nmcli:",
    "options": [
      "Only /etc/resolv.conf",
      "ip link set dev eth0 down",
      "route add",
      "timedatectl set-timezone UTC"
    ],
    "correct": 1,
    "explain": "nmcli con mod \"conn\" ipv4.dns \"8.8.8.8 8.8.4.4\" ipv4.ignore-auto-dns yes",
    "obj": "8.2",
    "level": 3
  },
  {
    "id": 39,
    "mode": "exam",
    "topic": "Scheduling",
    "q": "To run a job at a specific time once:",
    "options": [
      "Only cron",
      "at 10:00 tomorrow",
      "Only anacron",
      "Only systemd timer"
    ],
    "correct": 1,
    "explain": "at = one-time. cron = recurring. atq to list, atrm to remove.",
    "obj": "7.1",
    "level": 1
  },
  {
    "id": 40,
    "mode": "exam",
    "topic": "Filesystems",
    "q": "To check filesystem (ext4):",
    "options": [
      "fsck (incorrect for this task)",
      "Unmount first; e2fsck /dev/sdX or fsck.ext4",
      "Only when mounted",
      "Only xfs_repair"
    ],
    "correct": 1,
    "explain": "Unmount; e2fsck or fsck.ext4. xfs_repair for XFS (often mount -o repair).",
    "obj": "6.1",
    "level": 3
  },
  {
    "id": 41,
    "mode": "exam",
    "topic": "Permissions",
    "q": "Sticky bit on directory:",
    "options": [
      "Only setuid",
      "Only owner can delete own files (e.g., /tmp)",
      "Only setgid",
      "Only read"
    ],
    "correct": 1,
    "explain": "Sticky bit (chmod +t or 1xxx) = only owner can delete their files in that dir.",
    "obj": "7.1",
    "level": 3
  },
  {
    "id": 42,
    "mode": "exam",
    "topic": "systemd",
    "q": "To list all units (including inactive):",
    "options": [
      "systemctl list-units",
      "systemctl list-unit-files",
      "Only status",
      "Only list-units --all"
    ],
    "correct": 1,
    "explain": "list-unit-files = all. list-units = loaded. list-units --all = include inactive.",
    "obj": "7.2",
    "level": 1
  },
  {
    "id": 43,
    "mode": "exam",
    "topic": "Packages",
    "q": "To remove a package and its unused dependencies:",
    "options": [
      "rpm -e (incorrect for this task)",
      "dnf remove package or dnf autoremove",
      "Only autoremove",
      "yum (incorrect for this task)"
    ],
    "correct": 1,
    "explain": "dnf remove pkg. dnf autoremove = remove orphaned deps.",
    "obj": "2.2",
    "level": 3
  },
  {
    "id": 44,
    "mode": "exam",
    "topic": "Boot",
    "q": "To boot into single-user (rescue) from grub:",
    "options": [
      "Only edit /etc/default/grub",
      "Edit kernel line; add single or systemd.unit=rescue.target",
      "Only reboot",
      "Only init 1"
    ],
    "correct": 1,
    "explain": "At GRUB: e to edit, add single or systemd.unit=rescue.target to kernel line, Ctrl+X.",
    "obj": "7.2",
    "level": 3
  },
  {
    "id": 45,
    "mode": "exam",
    "topic": "Users/Groups",
    "q": "To lock a user account:",
    "options": [
      "passwd -d user",
      "usermod -L user (or passwd -l)",
      "chage -M 0",
      "Only delete"
    ],
    "correct": 1,
    "explain": "usermod -L or passwd -l = lock. usermod -U or passwd -u = unlock.",
    "obj": "9.1",
    "level": 3
  },
  {
    "id": 46,
    "mode": "exam",
    "topic": "SELinux",
    "q": "semanage fcontext is used to:",
    "options": [
      "Only getenforce",
      "Set default file context (persistent)",
      "Only chcon",
      "Only restorecon"
    ],
    "correct": 1,
    "explain": "semanage fcontext -a -t type_t \"/path(/.*)?\" then restorecon. Persistent.",
    "obj": "10.6",
    "level": 3
  },
  {
    "id": 47,
    "mode": "exam",
    "topic": "Networking",
    "q": "To add a static route persistently (RHEL 9):",
    "options": [
      "Only route add",
      "ip link set dev eth0 down",
      "Only ip route",
      "Only /etc/sysconfig/network"
    ],
    "correct": 1,
    "explain": "nmcli con mod \"conn\" ipv4.routes \"dest/mask gateway\". Or ip route + persist in connection.",
    "obj": "8.2",
    "level": 3
  },
  {
    "id": 48,
    "mode": "exam",
    "topic": "systemd",
    "q": "To run a command when a unit starts:",
    "options": [
      "Only ExecStart",
      "ExecStart= or ExecStartPre= in unit file",
      "Only script",
      "Only cron"
    ],
    "correct": 1,
    "explain": "ExecStartPre, ExecStart, ExecStartPost in [Service]. Or oneshot with RemainAfterExit.",
    "obj": "7.2",
    "level": 3
  },
  {
    "id": 49,
    "mode": "exam",
    "topic": "Storage",
    "q": "To see which process is using a file:",
    "options": [
      "Only ls (incorrect for this task)",
      "lsof /path or fuser -v /path",
      "Only fuser",
      "Only ps (incorrect for this task)"
    ],
    "correct": 1,
    "explain": "lsof /path or fuser -v /path. fuser -k to kill processes using file.",
    "obj": "5.6",
    "level": 4
  },
  {
    "id": 50,
    "mode": "exam",
    "topic": "Firewall",
    "q": "To add a port to a zone in firewalld:",
    "options": [
      "iptables -A",
      "firewall-cmd --permanent --add-port=8080/tcp",
      "ufw allow",
      "nft add rule"
    ],
    "correct": 1,
    "explain": "firewall-cmd --add-port=8080/tcp --permanent then --reload.",
    "obj": "10.1",
    "level": 3
  },
  {
    "id": 51,
    "mode": "exam",
    "topic": "Packages",
    "q": "To install a package from a specific repo:",
    "options": [
      "dnf install",
      "dnf install --enablerepo=repo name",
      "Only --disablerepo",
      "rpm (incorrect for this task)"
    ],
    "correct": 1,
    "explain": "dnf install --enablerepo=epel package. repolist to see repos.",
    "obj": "2.1",
    "level": 3
  },
  {
    "id": 52,
    "mode": "exam",
    "topic": "Filesystems",
    "q": "To mount an NFS share at boot:",
    "options": [
      "Only mount",
      "Add to /etc/fstab: server:/export /mount nfs defaults 0 0",
      "Only autofs",
      "Only systemd"
    ],
    "correct": 1,
    "explain": "/etc/fstab: server:/path /local nfs defaults 0 0. Or autofs for on-demand.",
    "obj": "6.1",
    "level": 3
  },
  {
    "id": 53,
    "mode": "exam",
    "topic": "Permissions",
    "q": "setgid on directory:",
    "options": [
      "Only setuid",
      "New files inherit group of directory",
      "Only sticky",
      "Only owner"
    ],
    "correct": 1,
    "explain": "setgid on dir (chmod g+s) = new files get dir's group. Useful for shared dirs.",
    "obj": "9.2",
    "level": 3
  },
  {
    "id": 54,
    "mode": "exam",
    "topic": "Users/Groups",
    "q": "To expire a user account on a date:",
    "options": [
      "Only usermod -L",
      "passwd -l on the account",
      "Only passwd",
      "Only delete"
    ],
    "correct": 1,
    "explain": "chage -E 2025-12-31 user. chage -l to list all aging info.",
    "obj": "9.4",
    "level": 1
  },
  {
    "id": 55,
    "mode": "exam",
    "topic": "SELinux",
    "q": "To allow a service to bind to a non-default port (SELinux):",
    "options": [
      "Only setenforce 0",
      "semanage port -a -t type_t -p tcp 8080",
      "Only chcon",
      "Only disable SELinux"
    ],
    "correct": 1,
    "explain": "semanage port -a -t http_port_t -p tcp 8080. Then restorecon if needed.",
    "obj": "10.5",
    "level": 1
  },
  {
    "id": 56,
    "mode": "exam",
    "topic": "Storage",
    "q": "To create an LVM snapshot:",
    "options": [
      "Only lvcreate",
      "lvcreate -s -L size -n snapname vg/lv",
      "Only lvextend",
      "Only vgcreate"
    ],
    "correct": 1,
    "explain": "lvcreate -s -L 1G -n snap vg/lv. Snapshot is COW; original LV.",
    "obj": "5.4",
    "level": 3
  },
  {
    "id": 57,
    "mode": "exam",
    "topic": "systemd",
    "q": "To run a service after network is up:",
    "options": [
      "Only ExecStart",
      "After=network-online.target; WantedBy=multi-user.target",
      "Only WantedBy",
      "Only network.target"
    ],
    "correct": 1,
    "explain": "After=network-online.target (and possibly Requires=). network-online.target = wait for network.",
    "obj": "8.1",
    "level": 3
  },
  {
    "id": 58,
    "mode": "exam",
    "topic": "Networking",
    "q": "To see listening TCP ports:",
    "options": [
      "Only netstat",
      "ss -tlnp or netstat -tlnp",
      "Only ip addr",
      "Only nmcli"
    ],
    "correct": 1,
    "explain": "ss -tlnp = listen TCP, numeric, process. -u for UDP.",
    "obj": "8.1",
    "level": 1
  },
  {
    "id": 59,
    "mode": "exam",
    "topic": "Packages",
    "q": "To show what provides a file:",
    "options": [
      "Only rpm -qf",
      "dnf provides /path/to/file or repoquery",
      "Only which",
      "Only find"
    ],
    "correct": 1,
    "explain": "dnf provides /usr/bin/vim. rpm -qf file = which package has file (if installed).",
    "obj": "7.1",
    "level": 3
  },
  {
    "id": 60,
    "mode": "exam",
    "topic": "Boot",
    "q": "To set kernel parameter persistently (e.g., selinux=0 for one boot, not recommended):",
    "options": [
      "Only at grub prompt",
      "Edit /etc/default/grub GRUB_CMDLINE_LINUX, then grub2-mkconfig",
      "Only grub2-mkconfig",
      "Only kernel line"
    ],
    "correct": 1,
    "explain": "GRUB_CMDLINE_LINUX in /etc/default/grub. grub2-mkconfig -o /boot/grub2/grub.cfg.",
    "obj": "4.2",
    "level": 3
  },
  {
    "id": 61,
    "mode": "exam",
    "topic": "Firewall",
    "q": "To block an IP in firewalld (rich rule):",
    "options": [
      "Only iptables",
      "firewall-cmd --add-rich-rule='rule family=ipv4 source address=1.2.3.4 reject'",
      "Only ufw",
      "Only nft"
    ],
    "correct": 1,
    "explain": "Rich rule = source/dest/port. --permanent then --reload.",
    "obj": "10.1",
    "level": 3
  },
  {
    "id": 62,
    "mode": "exam",
    "topic": "Users/Groups",
    "q": "To create a group with GID 2000:",
    "options": [
      "groupadd",
      "groupadd -g 2000 mygroup",
      "Only usermod",
      "Only chgrp"
    ],
    "correct": 1,
    "explain": "groupadd -g GID name. groupmod -g to change. groupdel to remove.",
    "obj": "9.2",
    "level": 3
  },
  {
    "id": 63,
    "mode": "exam",
    "topic": "SELinux",
    "q": "audit2allow generates:",
    "options": [
      "Only log",
      "Policy module from audit log (allow denied actions)",
      "Only report",
      "Only setenforce"
    ],
    "correct": 1,
    "explain": "audit2allow - create policy from denials. Use carefully; don't allow too much.",
    "obj": "10.8",
    "level": 3
  },
  {
    "id": 64,
    "mode": "exam",
    "topic": "Scheduling",
    "q": "System-wide cron (all users) is in:",
    "options": [
      "Only crontab -e",
      "/etc/crontab or /etc/cron.d/",
      "Only user crontab",
      "Only anacron"
    ],
    "correct": 1,
    "explain": "/etc/crontab has user field. /etc/cron.d/ drop-in. User = crontab -e.",
    "obj": "7.1",
    "level": 1
  },
  {
    "id": 65,
    "mode": "exam",
    "topic": "Filesystems",
    "q": "To set noexec on a mount:",
    "options": [
      "Only in fstab",
      "mount -o noexec /dev/sdX /path or in fstab",
      "Only exec",
      "Only nosuid"
    ],
    "correct": 1,
    "explain": "noexec = cannot execute binaries. nosuid = ignore setuid. noatime = no access time.",
    "obj": "6.1",
    "level": 3
  },
  {
    "id": 66,
    "mode": "exam",
    "topic": "systemd",
    "q": "To list dependencies of a unit:",
    "options": [
      "Only status",
      "systemctl list-dependencies unit",
      "Only list-units",
      "Only cat unit"
    ],
    "correct": 1,
    "explain": "systemctl list-dependencies unit. --reverse for what depends on it.",
    "obj": "7.2",
    "level": 3
  },
  {
    "id": 67,
    "mode": "exam",
    "topic": "Networking",
    "q": "To configure a bond (network bonding):",
    "options": [
      "Only ip link",
      "Create bond connection in nmcli; add slaves",
      "Only /etc/modprobe.d",
      "Only ifconfig"
    ],
    "correct": 1,
    "explain": "nmcli: create bond, then add slave connections. Or use connection files.",
    "obj": "8.4",
    "level": 3
  },
  {
    "id": 68,
    "mode": "exam",
    "topic": "Storage",
    "q": "To see LVM physical volume details:",
    "options": [
      "Only lvs",
      "pvdisplay or pvs",
      "Only vgdisplay",
      "Only lvdisplay"
    ],
    "correct": 1,
    "explain": "pvs, pvdisplay = PV. vgs, vgdisplay = VG. lvs, lvdisplay = LV.",
    "obj": "5.3",
    "level": 1
  },
  {
    "id": 69,
    "mode": "exam",
    "topic": "Packages",
    "q": "To update only security-related packages:",
    "options": [
      "dnf update",
      "dnf update --security or dnf upgrade --security",
      "Only upgrade",
      "Only install"
    ],
    "correct": 1,
    "explain": "dnf update --security. Or dnf upgrade --security. Restricts to security errata.",
    "obj": "2.2",
    "level": 3
  },
  {
    "id": 70,
    "mode": "exam",
    "topic": "Boot",
    "q": "Default GRUB config file location (x86 UEFI):",
    "options": [
      "/boot/grub/grub.cfg",
      "/boot/efi/EFI/redhat/grub.cfg (or /boot/grub2/grub.cfg)",
      "/etc/grub.cfg",
      "Only MBR"
    ],
    "correct": 1,
    "explain": "UEFI = /boot/efi/EFI/redhat/grub.cfg. BIOS = /boot/grub2/grub.cfg. Don't edit directly; use grub2-mkconfig.",
    "obj": "7.1",
    "level": 1
  },
  {
    "id": 71,
    "mode": "exam",
    "topic": "Users/Groups",
    "q": "To force password change at next login:",
    "options": [
      "Only chage -M 0",
      "chage -d 0 user (or passwd -e)",
      "Only passwd",
      "Only usermod"
    ],
    "correct": 1,
    "explain": "chage -d 0 user = last change now; forces change at next login.",
    "obj": "7.1",
    "level": 3
  },
  {
    "id": 72,
    "mode": "exam",
    "topic": "SELinux",
    "q": "To check SELinux context of a process:",
    "options": [
      "Only getenforce",
      "ps -Z or ps auxZ",
      "Only ls -Z",
      "Only seinfo"
    ],
    "correct": 1,
    "explain": "ps -Z = context of process. ls -Z = file context.",
    "obj": "10.4",
    "level": 1
  },
  {
    "id": 73,
    "mode": "exam",
    "topic": "Storage",
    "q": "To add a new partition with parted (non-interactive):",
    "options": [
      "Only fdisk",
      "parted /dev/sdX mkpart primary ext4 1MiB 100MiB",
      "Only gdisk",
      "Only cfdisk"
    ],
    "correct": 1,
    "explain": "parted mkpart [primary|logical] [fs-type] start end. Then mkfs.",
    "obj": "5.1",
    "level": 3
  },
  {
    "id": 74,
    "mode": "exam",
    "topic": "systemd",
    "q": "To create a user systemd service (run as user):",
    "options": [
      "Only /etc/systemd/system",
      "~/.config/systemd/user/; systemctl --user",
      "Only root",
      "Only /usr/lib/systemd/system"
    ],
    "correct": 1,
    "explain": "User units: ~/.config/systemd/user/. systemctl --user start unit.",
    "obj": "7.2",
    "level": 3
  },
  {
    "id": 75,
    "mode": "exam",
    "topic": "Firewall",
    "q": "To remove a service from a zone:",
    "options": [
      "iptables -D",
      "firewall-cmd --permanent --remove-service=http",
      "Only ufw",
      "Only reload"
    ],
    "correct": 1,
    "explain": "firewall-cmd --remove-service=http --permanent then --reload.",
    "obj": "10.1",
    "level": 3
  },
  {
    "id": 76,
    "mode": "exam",
    "topic": "Networking",
    "q": "To test connectivity to a host and port:",
    "options": [
      "Only ping",
      "nc -vz host port or telnet host port",
      "Only curl",
      "Only nmap"
    ],
    "correct": 1,
    "explain": "nc -vz host port. telnet host port. curl for HTTP.",
    "obj": "8.1",
    "level": 3
  },
  {
    "id": 77,
    "mode": "exam",
    "topic": "Filesystems",
    "q": "To create a bind mount:",
    "options": [
      "Only mount -t nfs",
      "mount --bind /src /dest (or in fstab)",
      "Only tmpfs",
      "Only overlay"
    ],
    "correct": 1,
    "explain": "mount --bind /src /dest. In fstab: /src /dest none bind 0 0.",
    "obj": "6.1",
    "level": 3
  },
  {
    "id": 78,
    "mode": "exam",
    "topic": "Permissions",
    "q": "Default umask 022 means new file permission:",
    "options": [
      "022 (incorrect for this task)",
      "File 644, dir 755 (777 - 022)",
      "777 (incorrect for this task)",
      "600 (incorrect for this task)"
    ],
    "correct": 1,
    "explain": "umask = bits to remove. 022 = file 644, dir 755. 077 = 600/700.",
    "obj": "1.10",
    "level": 1
  },
  {
    "id": 79,
    "mode": "exam",
    "topic": "Packages",
    "q": "To rollback a dnf transaction:",
    "options": [
      "Only reinstall",
      "dnf history undo last (or transaction id)",
      "Only history list",
      "Only upgrade"
    ],
    "correct": 1,
    "explain": "dnf history list. dnf history undo 3 (or last). Rollback that transaction.",
    "obj": "7.1",
    "level": 3
  },
  {
    "id": 80,
    "mode": "exam",
    "topic": "Storage",
    "q": "To encrypt a block device with LUKS:",
    "options": [
      "Only LVM",
      "cryptsetup luksFormat /dev/sdX then luksOpen",
      "Only dm-crypt",
      "Only openssl"
    ],
    "correct": 1,
    "explain": "cryptsetup luksFormat /dev/sdX. cryptsetup luksOpen /dev/sdX name. Then mkfs, mount.",
    "obj": "5.6",
    "level": 3
  },
  {
    "id": 81,
    "mode": "exam",
    "topic": "Boot",
    "q": "To reinstall GRUB to a disk (e.g., after repair):",
    "options": [
      "Only grub2-mkconfig",
      "grub2-install /dev/sdX (then grub2-mkconfig)",
      "Only grub2-install",
      "Only edit grub.cfg"
    ],
    "correct": 1,
    "explain": "grub2-install /dev/sdX writes to MBR/ESP. grub2-mkconfig generates config.",
    "obj": "5.6",
    "level": 3
  },
  {
    "id": 82,
    "mode": "exam",
    "topic": "Scheduling",
    "q": "anacron is used for:",
    "options": [
      "Only hourly",
      "Jobs that must run daily/weekly even if machine was off",
      "Only cron",
      "Only at (incorrect for this task)"
    ],
    "correct": 1,
    "explain": "anacron = run jobs by day; if machine was off, run when it boots. Cron = fixed time.",
    "obj": "7.1",
    "level": 3
  },
  {
    "id": 83,
    "mode": "exam",
    "topic": "Users/Groups",
    "q": "To list members of a group:",
    "options": [
      "Only /etc/group",
      "getent group groupname or grep group /etc/group",
      "Only id (incorrect for this task)",
      "Only groups"
    ],
    "correct": 1,
    "explain": "getent group mygroup. Or grep mygroup /etc/group. id user shows groups.",
    "obj": "9.2",
    "level": 3
  },
  {
    "id": 84,
    "mode": "exam",
    "topic": "SELinux",
    "q": "To temporarily allow a domain to do something (permissive domain):",
    "options": [
      "Only setenforce 0",
      "semanage permissive -a type_t (whole type permissive)",
      "Only audit2allow",
      "Only chcon"
    ],
    "correct": 1,
    "explain": "semanage permissive -a type_t = that type doesn't enforce (audit only).",
    "obj": "7.1",
    "level": 3
  },
  {
    "id": 85,
    "mode": "exam",
    "topic": "Networking",
    "q": "To configure a bridge (br0) with nmcli:",
    "options": [
      "Only ip link",
      "ip link set dev eth0 down",
      "Only brctl",
      "Only /etc/sysconfig"
    ],
    "correct": 1,
    "explain": "Create bridge connection; add slave connections (e.g., ethernet) to bridge.",
    "obj": "8.4",
    "level": 3
  },
  {
    "id": 86,
    "mode": "exam",
    "topic": "systemd",
    "q": "To run a one-shot service that exits:",
    "options": [
      "Only Type=simple",
      "Type=oneshot; RemainAfterExit=yes if \"active\" after run",
      "Only Type=oneshot",
      "Only ExecStart"
    ],
    "correct": 1,
    "explain": "Type=oneshot = run ExecStart, then inactive. RemainAfterExit=yes = stay active.",
    "obj": "4.9",
    "level": 3
  },
  {
    "id": 87,
    "mode": "exam",
    "topic": "Storage",
    "q": "To see disk and partition layout:",
    "options": [
      "Only df (incorrect for this task)",
      "lsblk or fdisk -l",
      "Only mount",
      "Only /proc/partitions"
    ],
    "correct": 1,
    "explain": "lsblk = tree. fdisk -l, parted -l = layout. df = mounted usage.",
    "obj": "5.1",
    "level": 1
  },
  {
    "id": 88,
    "mode": "exam",
    "topic": "Firewall",
    "q": "To make a zone active for an interface:",
    "options": [
      "Only --set-default",
      "firewall-cmd --zone=zone --change-interface=eth0",
      "Only --add-interface",
      "Only iptables"
    ],
    "correct": 1,
    "explain": "firewall-cmd --zone=public --change-interface=eth0. Or in connection.",
    "obj": "8.1",
    "level": 3
  },
  {
    "id": 89,
    "mode": "exam",
    "topic": "Filesystems",
    "q": "To create a tmpfs mount:",
    "options": [
      "Only mkfs",
      "mount -t tmpfs -o size=1G tmpfs /path",
      "Only ramfs",
      "Only /dev/shm"
    ],
    "correct": 1,
    "explain": "mount -t tmpfs -o size=1G tmpfs /mnt/tmp. Or in fstab. tmpfs = RAM, configurable size.",
    "obj": "6.1",
    "level": 3
  },
  {
    "id": 90,
    "mode": "exam",
    "topic": "Packages",
    "q": "To exclude a package from updates:",
    "options": [
      "Only remove",
      "dnf versionlock add package or exclude in dnf.conf",
      "Only install",
      "Only downgrade"
    ],
    "correct": 1,
    "explain": "dnf versionlock add kernel. Or exclude=kernel* in /etc/dnf/dnf.conf.",
    "obj": "1.1",
    "level": 3
  },
  {
    "id": 91,
    "mode": "exam",
    "topic": "Boot",
    "q": "To set default kernel (by index) in GRUB:",
    "options": [
      "Only edit grub.cfg",
      "GRUB_DEFAULT=saved; grub2-set-default N",
      "Only grub2-mkconfig",
      "Only kernel line"
    ],
    "correct": 1,
    "explain": "GRUB_DEFAULT=saved in /etc/default/grub. grub2-set-default 0 (index). grub2-mkconfig.",
    "obj": "4.2",
    "level": 3
  },
  {
    "id": 92,
    "mode": "exam",
    "topic": "Users/Groups",
    "q": "To set default umask for new users:",
    "options": [
      "Only chmod",
      "Add UMASK to /etc/login.defs",
      "Only /etc/profile",
      "Only bashrc"
    ],
    "correct": 1,
    "explain": "UMASK in /etc/login.defs = default for useradd. Or in /etc/profile.",
    "obj": "9.1",
    "level": 3
  },
  {
    "id": 93,
    "mode": "exam",
    "topic": "systemd",
    "q": "To limit CPU for a service:",
    "options": [
      "Only nice",
      "CPUQuota=50% in [Service] or slice",
      "Only cgroups v1",
      "Only systemd-run"
    ],
    "correct": 1,
    "explain": "CPUQuota=50% in unit [Service]. Or use slice. cgroup v2 in RHEL 9.",
    "obj": "7.2",
    "level": 3
  },
  {
    "id": 94,
    "mode": "exam",
    "topic": "Networking",
    "q": "To set hostname persistently:",
    "options": [
      "Only hostname cmd",
      "timedatectl set-timezone UTC",
      "Only /etc/hostname",
      "Only nmcli"
    ],
    "correct": 1,
    "explain": "hostnamectl set-hostname myhost. Writes /etc/hostname and updates kernel.",
    "obj": "8.3",
    "level": 3
  },
  {
    "id": 95,
    "mode": "exam",
    "topic": "SELinux",
    "q": "To list all SELinux booleans:",
    "options": [
      "Only getsebool one",
      "getsebool -a",
      "Only semanage",
      "Only sestatus"
    ],
    "correct": 1,
    "explain": "getsebool -a. getsebool httpd_can_network_connect for one.",
    "obj": "8.1",
    "level": 1
  },
  {
    "id": 96,
    "mode": "exam",
    "topic": "Storage",
    "q": "To remove an LVM physical volume from a VG:",
    "options": [
      "Only vgremove",
      "vgreduce VG /dev/sdX (after moving data off with pvmove)",
      "Only pvremove",
      "Only lvreduce"
    ],
    "correct": 1,
    "explain": "pvmove /dev/sdX (move data off). vgreduce vg /dev/sdX. pvremove /dev/sdX.",
    "obj": "5.5",
    "level": 5
  },
  {
    "id": 97,
    "mode": "exam",
    "topic": "Firewall",
    "q": "To list all rules in firewalld (current):",
    "options": [
      "iptables -L",
      "firewall-cmd --list-all (for zone) or --list-all-zones",
      "Only --list-services",
      "Only nft list"
    ],
    "correct": 1,
    "explain": "firewall-cmd --list-all. --list-all-zones for every zone.",
    "obj": "10.1",
    "level": 3
  },
  {
    "id": 98,
    "mode": "exam",
    "topic": "Packages",
    "q": "To install debuginfo for a package:",
    "options": [
      "Only dnf install",
      "dnf debuginfo-install package (need debuginfo repo)",
      "Only repoquery",
      "Only rpm"
    ],
    "correct": 1,
    "explain": "Enable debuginfo repo. dnf debuginfo-install package. For gdb, crash.",
    "obj": "2.1",
    "level": 3
  },
  {
    "id": 99,
    "mode": "exam",
    "topic": "Boot",
    "q": "rescue.target vs emergency.target:",
    "options": [
      "Same (incorrect for this task)",
      "rescue = single-user with mounts; emergency = minimal, no mounts",
      "Only emergency",
      "Only rescue"
    ],
    "correct": 1,
    "explain": "rescue = single-user, root fs mounted. emergency = minimal, only root fs mounted read-only.",
    "obj": "6.2",
    "level": 3
  },
  {
    "id": 100,
    "mode": "exam",
    "topic": "Scheduling",
    "q": "To run a cron job every 2 hours:",
    "options": [
      "Only 0 * * * *",
      "0 */2 * * * (at minute 0, every 2 hours)",
      "Only */2 * * * *",
      "Only 2 * * * *"
    ],
    "correct": 1,
    "explain": "0 */2 * * * = minute 0, every 2 hours. */2 * * * * = every 2 minutes.",
    "obj": "7.1",
    "level": 3
  },
  {
    "id": 101,
    "mode": "exam",
    "topic": "Users/Groups",
    "q": "To add a user to supplementary group:",
    "options": [
      "Only usermod -g",
      "usermod -aG group user (-a append)",
      "Only groupadd",
      "Only chgrp"
    ],
    "correct": 1,
    "explain": "usermod -aG group user. -a = append (don't replace). -G = supplementary list.",
    "obj": "9.1",
    "level": 3
  },
  {
    "id": 102,
    "mode": "exam",
    "topic": "systemd",
    "q": "To see boot time and uptime:",
    "options": [
      "Only uptime",
      "uptime or systemctl show -p TimestampMonotonic",
      "Only who -b",
      "Only date"
    ],
    "correct": 1,
    "explain": "uptime. Or who -b. systemctl for manager start.",
    "obj": "4.9",
    "level": 3
  },
  {
    "id": 103,
    "mode": "exam",
    "topic": "Networking",
    "q": "To bring down an interface with nmcli:",
    "options": [
      "Only ifconfig down",
      "ip link set dev eth0 down",
      "Only ip link down",
      "Only reboot"
    ],
    "correct": 1,
    "explain": "nmcli con down \"conn\". Or nmcli device disconnect eth0.",
    "obj": "8.1",
    "level": 3
  },
  {
    "id": 104,
    "mode": "exam",
    "topic": "Storage",
    "q": "To check LUKS header backup:",
    "options": [
      "Only luksOpen",
      "cryptsetup luksHeaderBackup /dev/sdX --header-backup-file file",
      "Only backup",
      "Only luksDump"
    ],
    "correct": 1,
    "explain": "luksHeaderBackup = backup header (repair if damaged). luksDump = view header.",
    "obj": "5.6",
    "level": 3
  },
  {
    "id": 105,
    "mode": "exam",
    "topic": "SELinux",
    "q": "To get help on an SELinux type:",
    "options": [
      "Only man type",
      "seinfo -t type_t or sesearch",
      "Only getenforce",
      "Only ausearch"
    ],
    "correct": 1,
    "explain": "seinfo -t httpd_t. sesearch for allow rules. man -k selinux.",
    "obj": "10.4",
    "level": 1
  },
  {
    "id": 106,
    "mode": "exam",
    "topic": "Packages",
    "q": "To see changelog of an installed package:",
    "options": [
      "Only dnf info",
      "rpm -q --changelog package",
      "Only repoquery",
      "Only dnf list"
    ],
    "correct": 1,
    "explain": "rpm -q --changelog kernel. Shows changelog from package.",
    "obj": "2.1",
    "level": 1
  },
  {
    "id": 107,
    "mode": "exam",
    "topic": "Boot",
    "q": "To boot to specific kernel once:",
    "options": [
      "Only set-default",
      "At GRUB: pick kernel (don't set default)",
      "Only grub2-editenv",
      "Only edit grub"
    ],
    "correct": 1,
    "explain": "At GRUB menu, select older kernel. Or grub2-reboot N for next boot only.",
    "obj": "7.1",
    "level": 3
  },
  {
    "id": 108,
    "mode": "exam",
    "topic": "Storage",
    "q": "Grow an XFS filesystem after LVM logical volume extension:",
    "options": [
      "resize2fs",
      "lvextend then xfs_growfs mountpoint",
      "vgreduce",
      "tune2fs -j"
    ],
    "correct": 1,
    "explain": "XFS grows online with xfs_growfs; ext4 uses resize2fs.",
    "obj": "5.5",
    "level": 3
  },
  {
    "id": 109,
    "mode": "exam",
    "topic": "Storage",
    "q": "Reduce size of an ext4 filesystem (offline) after shrinking LV:",
    "options": [
      "xfs_growfs",
      "umount; e2fsck -f; resize2fs; lvreduce",
      "podman run",
      "firewall-cmd"
    ],
    "correct": 1,
    "explain": "ext4 shrink requires unmount and e2fsck; XFS cannot shrink.",
    "obj": "5.6",
    "level": 5
  },
  {
    "id": 110,
    "mode": "exam",
    "topic": "Storage",
    "q": "Set default permissions on new files in /shared with setgid:",
    "options": [
      "chmod 1777",
      "chmod g+s /shared; ensure group ownership on directory",
      "setenforce permissive",
      "ip link set dev eth0 down"
    ],
    "correct": 1,
    "explain": "setgid directory forces new files to inherit directory group.",
    "obj": "5.6",
    "level": 3
  },
  {
    "id": 111,
    "mode": "exam",
    "topic": "Storage",
    "q": "Configure autofs to mount NFS export /data on access at /mnt/data:",
    "options": [
      "Only fstab",
      "/etc/auto.master + /etc/auto.data map entry for NFS",
      "Only cron",
      "Only podman"
    ],
    "correct": 1,
    "explain": "autofs uses indirect maps; systemctl enable --now autofs.",
    "obj": "6.4",
    "level": 3
  },
  {
    "id": 112,
    "mode": "exam",
    "topic": "systemd",
    "q": "Make a custom service start at multi-user.target:",
    "options": [
      "WantedBy=multi-user.target in [Install]",
      "DefaultDependencies=no",
      "systemctl isolate rescue",
      "grub2-editenv"
    ],
    "correct": 0,
    "explain": "[Install] WantedBy=multi-user.target; systemctl enable service.",
    "obj": "7.2",
    "level": 3
  }
];
