/**
 * Additional RHCSA 10 (EX200 RHEL 10) practice questions
 * Includes storage, systemd, SELinux, networking, and gap-filling questions
 */
window.QUESTION_BANK_RHCSA10_EXTRA = [
  {
    "id": 113,
    "mode": "exam",
    "topic": "systemd",
    "q": "Override only ExecStart for an existing unit without editing vendor file:",
    "options": [
      "Edit /usr/lib/systemd directly",
      "systemctl edit service (drop-in under /etc/systemd/system)",
      "kill -9 (alternative method)",
      "rpm -e (alternative method)"
    ],
    "correct": 1,
    "explain": "systemctl edit creates .d/override.conf drop-in.",
    "obj": "7.2",
    "level": 3
  },
  {
    "id": 114,
    "mode": "exam",
    "topic": "systemd",
    "q": "View logs for sshd service since today:",
    "options": [
      "cat /var/log/messages only",
      "journalctl -u sshd --since today",
      "dmesg only (limited scope)",
      "last (alternative method)"
    ],
    "correct": 1,
    "explain": "journalctl filters by unit, time, priority.",
    "obj": "7.2",
    "level": 3
  },
  {
    "id": 115,
    "mode": "exam",
    "topic": "systemd",
    "q": "Set persistent system hostname to server1.example.com:",
    "options": [
      "hostname only (non-persistent)",
      "hostnamectl set-hostname server1.example.com",
      "nmcli delete (alternative method)",
      "lvremove (alternative method)"
    ],
    "correct": 1,
    "explain": "hostnamectl sets static hostname in systemd/RHEL 9.",
    "obj": "8.3",
    "level": 3
  },
  {
    "id": 116,
    "mode": "exam",
    "topic": "Firewall",
    "q": "Open TCP port 443 permanently in default zone:",
    "options": [
      "iptables -F (alternative method)",
      "firewall-cmd --permanent --add-service=https; firewall-cmd --reload",
      "setsebool -P (alternative method)",
      "userdel (alternative method)"
    ],
    "correct": 1,
    "explain": "--permanent survives reboot; --reload applies.",
    "obj": "4.1",
    "level": 1
  },
  {
    "id": 117,
    "mode": "exam",
    "topic": "Firewall",
    "q": "Assign interface eth0 to internal zone:",
    "options": [
      "firewall-cmd --zone=internal --change-interface=eth0 --permanent",
      "nmcli con mod only (limited scope)",
      "fdisk (alternative method)",
      "chcon -t (alternative method)"
    ],
    "correct": 0,
    "explain": "Zones bind to interfaces; --reload after permanent change.",
    "obj": "10.1",
    "level": 3
  },
  {
    "id": 118,
    "mode": "exam",
    "topic": "SELinux",
    "q": "List SELinux booleans related to httpd:",
    "options": [
      "getsebool -a | grep httpd",
      "semanage fcontext only",
      "aa-status (alternative method)",
      "dnf remove (alternative method)"
    ],
    "correct": 0,
    "explain": "getsebool -a; setsebool -P httpd_can_network_connect on for persistent.",
    "obj": "8.1",
    "level": 1
  },
  {
    "id": 119,
    "mode": "exam",
    "topic": "SELinux",
    "q": "Restore default SELinux contexts on /web recursively:",
    "options": [
      "chmod -R 777",
      "restorecon -Rv /web",
      "pvcreate (alternative method)",
      "timedatectl"
    ],
    "correct": 1,
    "explain": "restorecon applies policy contexts; semanage fcontext for custom paths.",
    "obj": "10.6",
    "level": 1
  },
  {
    "id": 120,
    "mode": "exam",
    "topic": "SELinux",
    "q": "Troubleshoot AVC denials from today:",
    "options": [
      "journalctl -t setroubleshoot or ausearch -m avc -ts today",
      "podman logs only (limited scope)",
      "vgdisplay (alternative method)",
      "useradd (alternative method)"
    ],
    "correct": 0,
    "explain": "ausearch/journal show AVC; sealert may suggest fixes.",
    "obj": "10.4",
    "level": 4
  },
  {
    "id": 121,
    "mode": "exam",
    "topic": "Networking",
    "q": "Configure static IP 192.168.1.10/24 on connection eth0 with nmcli:",
    "options": [
      "ifconfig only (limited scope)",
      "nmcli con mod eth0 ipv4.addresses 192.168.1.10/24 ipv4.method manual",
      "route add default (alternative method)",
      "lvchange (alternative method)"
    ],
    "correct": 1,
    "explain": "nmcli con mod; nmcli con up eth0 to activate.",
    "obj": "8.2",
    "level": 3
  },
  {
    "id": 122,
    "mode": "exam",
    "topic": "Networking",
    "q": "Set default gateway 192.168.1.1 via nmcli on eth0:",
    "options": [
      "nmcli con mod eth0 ipv4.gateway 192.168.1.1",
      "echo only to /etc/hosts",
      "mkfs.xfs (alternative method)",
      "systemctl mask firewalld"
    ],
    "correct": 0,
    "explain": "ipv4.gateway on connection; restart connection after changes.",
    "obj": "8.2",
    "level": 3
  },
  {
    "id": 123,
    "mode": "exam",
    "topic": "Networking",
    "q": "Configure system to use DNS 10.0.0.53 via nmcli:",
    "options": [
      "nmcli con mod eth0 ipv4.dns 10.0.0.53",
      "modprobe bridge (alternative method)",
      "lvcreate (alternative method)",
      "semanage port (alternative method)"
    ],
    "correct": 0,
    "explain": "ipv4.dns on connection or in /etc/resolv.conf via NetworkManager.",
    "obj": "8.2",
    "level": 3
  },
  {
    "id": 124,
    "mode": "exam",
    "topic": "Networking",
    "q": "Synchronize time with chrony pool.ntp.org:",
    "options": [
      "ntpdate only once (limited scope)",
      "Edit /etc/chrony.conf server line; systemctl enable --now chronyd",
      "hwclock --systohc only (limited scope)",
      "grub2-install (alternative method)"
    ],
    "correct": 1,
    "explain": "chronyd is default NTP client in RHEL 9; chronyc sources to verify.",
    "obj": "8.1",
    "level": 3
  },
  {
    "id": 125,
    "mode": "exam",
    "topic": "Users/Groups",
    "q": "Create user bob with UID 1010 and home /home/bob:",
    "options": [
      "useradd -u 1010 -m bob",
      "groupadd only (limited scope)",
      "lvremove (alternative method)",
      "firewall-offline-cmd"
    ],
    "correct": 0,
    "explain": "useradd -u -m -d; usermod for changes; id bob to verify.",
    "obj": "9.1",
    "level": 1
  },
  {
    "id": 126,
    "mode": "exam",
    "topic": "Users/Groups",
    "q": "Lock user account alice (prevent password login):",
    "options": [
      "usermod -L alice or passwd -l alice",
      "userdel -r (alternative method)",
      "pvresize (alternative method)",
      "setenforce 0 (alternative method)"
    ],
    "correct": 0,
    "explain": "-L locks password; -U unlocks; still may have keys.",
    "obj": "1.1",
    "level": 3
  },
  {
    "id": 127,
    "mode": "exam",
    "topic": "Users/Groups",
    "q": "Allow user dev to run /usr/bin/systemctl restart httpd as root via sudo:",
    "options": [
      "visudo: dev ALL=(root) NOPASSWD: /usr/bin/systemctl restart httpd",
      "chmod 777 sudo (alternative method)",
      "chage -M (alternative method)",
      "nmcli (alternative method)"
    ],
    "correct": 0,
    "explain": "/etc/sudoers.d/ fragments; visudo validates syntax.",
    "obj": "4.9",
    "level": 3
  },
  {
    "id": 128,
    "mode": "exam",
    "topic": "Permissions",
    "q": "Make file immutable (even root cannot modify until flag removed):",
    "options": [
      "chattr +i file",
      "chown root only",
      "setfacl -x",
      "swapoff -a"
    ],
    "correct": 0,
    "explain": "chattr +i immutable; lsattr to view; chattr -i removes.",
    "obj": "1.10",
    "level": 1
  },
  {
    "id": 129,
    "mode": "exam",
    "topic": "Packages",
    "q": "Install module stream Node.js 18 from AppStream:",
    "options": [
      "dnf module install nodejs:18/common",
      "rpm -ivh random.rpm only",
      "subscription-manager",
      "lvconvert (alternative method)"
    ],
    "correct": 0,
    "explain": "dnf module list; reset/install stream; RHEL 9 modularity.",
    "obj": "2.1",
    "level": 3
  },
  {
    "id": 130,
    "mode": "exam",
    "topic": "Packages",
    "q": "Exclude kernel package from updates in dnf:",
    "options": [
      "dnf versionlock add kernel*",
      "rpm -e kernel",
      "mkfs.ext4 (alternative method)",
      "restorecon (alternative method)"
    ],
    "correct": 0,
    "explain": "versionlock plugin pins versions; or exclude= in repo config.",
    "obj": "1.1",
    "level": 1
  },
  {
    "id": 131,
    "mode": "exam",
    "topic": "Boot",
    "q": "Boot into single-user/rescue.target for maintenance:",
    "options": [
      "systemctl rescue or systemd.unit=rescue.target on kernel line",
      "poweroff (alternative method)",
      "lvremove -f (alternative method)",
      "useradd -D (alternative method)"
    ],
    "correct": 0,
    "explain": "rescue.target = single-user; emergency.target stricter.",
    "obj": "7.2",
    "level": 3
  },
  {
    "id": 132,
    "mode": "exam",
    "topic": "Boot",
    "q": "Regenerate initramfs after fixing LVM in dracut:",
    "options": [
      "dracut -f --regenerate-all",
      "grub2-mkconfig only",
      "nmcli (alternative method)",
      "podman build (alternative method)"
    ],
    "correct": 0,
    "explain": "dracut -f rebuilds initrd; needed if root FS modules missing.",
    "obj": "5.3",
    "level": 1
  },
  {
    "id": 133,
    "mode": "exam",
    "topic": "Scheduling",
    "q": "Schedule daily script /usr/local/bin/backup at 02:30 for root:",
    "options": [
      "crontab -e for root: 30 2 * * * /usr/local/bin/backup",
      "at now (alternative method)",
      "lvcreate (alternative method)",
      "firewall-cmd --panic"
    ],
    "correct": 0,
    "explain": "crontab -e; /etc/cron.d/ for system jobs; systemctl list-timers for systemd timers.",
    "obj": "4.9",
    "level": 3
  },
  {
    "id": 134,
    "mode": "exam",
    "topic": "Scheduling",
    "q": "List active systemd timers:",
    "options": [
      "systemctl list-timers --all",
      "crontab -l only",
      "fdisk (alternative method)",
      "getenforce (alternative method)"
    ],
    "correct": 0,
    "explain": "Timers replace some cron use cases; systemctl status timer.",
    "obj": "4.9",
    "level": 1
  },
  {
    "id": 135,
    "mode": "exam",
    "topic": "Storage",
    "q": "Add physical volume and extend volume group vg0:",
    "options": [
      "pvcreate /dev/sdd; vgextend vg0 /dev/sdd",
      "lvremove vg0 (alternative method)",
      "chage -E (alternative method)",
      "hostname (alternative method)"
    ],
    "correct": 0,
    "explain": "pvcreate → vgextend → lvextend → growfs.",
    "obj": "5.5",
    "level": 3
  },
  {
    "id": 136,
    "mode": "exam",
    "topic": "Storage",
    "q": "Move LV mylv from vg0 to vg1 (pvmove):",
    "options": [
      "pvmove /dev/sdX vg1 after vgextend; or lvconvert move",
      "mkfs only (limited scope)",
      "setfacl (alternative method)",
      "podman pod (alternative method)"
    ],
    "correct": 0,
    "explain": "pvmove migrates extents; can take time; watch pvs/vgs/lvs.",
    "obj": "5.3",
    "level": 5
  },
  {
    "id": 137,
    "mode": "exam",
    "topic": "Networking",
    "q": "Configure link aggregation team0 with activebackup runners:",
    "options": [
      "nmcli con add type team ...; add slaves",
      "ifdown -a only (limited scope)",
      "lvrename (alternative method)",
      "audit2allow only (limited scope)"
    ],
    "correct": 0,
    "explain": "NetworkManager team/bond; nmcli con add type ethernet master team0.",
    "obj": "8.4",
    "level": 3
  },
  {
    "id": 138,
    "mode": "exam",
    "topic": "Networking",
    "q": "Disable IPv6 on connection eth0 via nmcli:",
    "options": [
      "nmcli con mod eth0 ipv6.method disabled",
      "echo 1 > /proc/sys/net/ipv4/ip_forward",
      "vgcfgrestore (alternative method)",
      "chpasswd (alternative method)"
    ],
    "correct": 0,
    "explain": "ipv6.method ignore/disabled on connection profile.",
    "obj": "8.1",
    "level": 3
  },
  {
    "id": 139,
    "mode": "exam",
    "topic": "Firewall",
    "q": "Masquerade (NAT) for subnet in internal zone:",
    "options": [
      "firewall-cmd --permanent --zone=internal --add-masquerade",
      "iptables-save only (limited scope)",
      "lvdisplay (alternative method)",
      "userdel -r (alternative method)"
    ],
    "correct": 0,
    "explain": "Masquerade enables NAT for zone sources leaving that zone.",
    "obj": "7.1",
    "level": 3
  },
  {
    "id": 140,
    "mode": "exam",
    "topic": "SELinux",
    "q": "Change type of /custom/html to httpd_sys_content_t persistently:",
    "options": [
      "chcon only (limited scope)",
      "semanage fcontext -a -t httpd_sys_content_t '/custom/html(/.*)?'; restorecon -Rv",
      "pvcreate (alternative method)",
      "timedatectl set-time (alternative method)"
    ],
    "correct": 1,
    "explain": "semanage fcontext survives relabel; restorecon applies.",
    "obj": "10.6",
    "level": 3
  },
  {
    "id": 141,
    "mode": "exam",
    "topic": "systemd",
    "q": "Mask service httpd (prevent start even manually):",
    "options": [
      "systemctl mask httpd",
      "systemctl disable only",
      "rpm -q",
      "fdisk -l"
    ],
    "correct": 0,
    "explain": "mask links to /dev/null; unmask before enable.",
    "obj": "4.9",
    "level": 1
  },
  {
    "id": 142,
    "mode": "exam",
    "topic": "systemd",
    "q": "Change default target to multi-user (no GUI):",
    "options": [
      "systemctl set-default multi-user.target",
      "init 5 (alternative method)",
      "lvchange -a n (alternative method)",
      "podman stop -a (alternative method)"
    ],
    "correct": 0,
    "explain": "set-default writes default.target symlink; graphical.target for GUI.",
    "obj": "7.2",
    "level": 1
  },
  {
    "id": 143,
    "mode": "exam",
    "topic": "Packages",
    "q": "Register system with subscription-manager and attach pool:",
    "options": [
      "subscription-manager register; subscription-manager attach --auto",
      "dnf groupinstall only (limited scope)",
      "mkfs.vfat (alternative method)",
      "restorecon (alternative method)"
    ],
    "correct": 0,
    "explain": "RHSM for repos; subscription-manager repos --list-enabled.",
    "obj": "7.5",
    "level": 3
  },
  {
    "id": 144,
    "mode": "exam",
    "topic": "Boot",
    "q": "Set root password in GRUB (break-in protection) on RHEL 9:",
    "options": [
      "grub2-setpassword",
      "passwd grub",
      "nmcli (alternative method)",
      "stratis (alternative method)"
    ],
    "correct": 0,
    "explain": "grub2-setpassword encrypts grub.cfg user; BIOS/UEFI password also recommended.",
    "obj": "5.6",
    "level": 1
  },
  {
    "id": 145,
    "mode": "exam",
    "topic": "Storage",
    "q": "Find which process is using deleted file (disk full):",
    "options": [
      "lsof | grep deleted or lsof +L1",
      "df -h only (limited scope)",
      "useradd (alternative method)",
      "firewall-cmd --list-all"
    ],
    "correct": 0,
    "explain": "Deleted but open files hold space until process stops.",
    "obj": "5.6",
    "level": 4
  },
  {
    "id": 146,
    "mode": "exam",
    "topic": "Storage",
    "q": "Swap on newly created 2G LV swaplv in vg0:",
    "options": [
      "mkswap /dev/vg0/swaplv; swapon; add to fstab",
      "mkfs.xfs (alternative method)",
      "podman volume (alternative method)",
      "chcon (alternative method)"
    ],
    "correct": 0,
    "explain": "mkswap + swapon -a; /etc/fstab type swap pri.",
    "obj": "5.2",
    "level": 3
  },
  {
    "id": 147,
    "mode": "exam",
    "topic": "Networking",
    "q": "Test DNS resolution for host.example.com:",
    "options": [
      "getent hosts host.example.com or dig host.example.com",
      "ip link set down (alternative method)",
      "lvremove (alternative method)",
      "semanage port (alternative method)"
    ],
    "correct": 0,
    "explain": "getent uses nsswitch; dig/nslookup query DNS directly.",
    "obj": "8.1",
    "level": 3
  },
  {
    "id": 148,
    "mode": "exam",
    "topic": "Users/Groups",
    "q": "Set password aging: max 90 days, warn 7 days for user sam:",
    "options": [
      "chage -M 90 -W 7 sam",
      "usermod -s (alternative method)",
      "pvcreate (alternative method)",
      "nmcli radio"
    ],
    "correct": 0,
    "explain": "chage -M max days; -W warn; -m min days between changes.",
    "obj": "9.4",
    "level": 1
  },
  {
    "id": 149,
    "mode": "exam",
    "topic": "Permissions",
    "q": "Sticky bit on /tmp prevents:",
    "options": [
      "Users deleting others' files in world-writable dir",
      "All writes (alternative method)",
      "Root access (alternative method)",
      "SELinux (alternative method)"
    ],
    "correct": 0,
    "explain": "chmod +t /tmp (1777); sticky = only owner deletes own files.",
    "obj": "10.2",
    "level": 3
  },
  {
    "id": 150,
    "mode": "exam",
    "topic": "systemd",
    "q": "Analyze boot time per unit:",
    "options": [
      "systemd-analyze blame",
      "journalctl -k only",
      "fdisk (alternative method)",
      "dnf history (alternative method)"
    ],
    "correct": 0,
    "explain": "systemd-analyze critical-chain shows slow path.",
    "obj": "7.2",
    "level": 4
  },
  {
    "id": 151,
    "mode": "exam",
    "topic": "Firewall",
    "q": "Forward port 8080 to 80 on host 192.168.1.50 in firewalld:",
    "options": [
      "firewall-cmd --add-forward-port=port=8080:proto=tcp:toport=80:toaddr=192.168.1.50 --permanent",
      "rich rule only (limited scope)",
      "lvchange (alternative method)",
      "chage (alternative method)"
    ],
    "correct": 0,
    "explain": "Forward port for DNAT; enable ip_forward if needed.",
    "obj": "7.1",
    "level": 3
  },
  {
    "id": 152,
    "mode": "exam",
    "topic": "Packages",
    "q": "Create local repo from DVD mount /mnt/dvd:",
    "options": [
      "createrepo /mnt/dvd/AppStream; .repo file baseurl=file:///mnt/dvd/...",
      "podman run (alternative method)",
      "lvmdiskscan (alternative method)",
      "restorecon (alternative method)"
    ],
    "correct": 0,
    "explain": "BaseOS + AppStream repos; gpgcheck per org policy.",
    "obj": "6.2",
    "level": 3
  },
  {
    "id": 153,
    "mode": "exam",
    "topic": "Storage",
    "q": "Force fsck on ext4 root at next reboot:",
    "options": [
      "tune2fs -C 0 /dev/mapper/vg-root or touch /forcefsck",
      "xfs_repair -n only",
      "nmcli (alternative method)",
      "setsebool (alternative method)"
    ],
    "correct": 0,
    "explain": "tune2fs -C max mount count 0; systemd-fsck unit runs at boot.",
    "obj": "5.6",
    "level": 3
  },
  {
    "id": 154,
    "mode": "exam",
    "topic": "Networking",
    "q": "Bring connection eth0 down with nmcli:",
    "options": [
      "nmcli con down eth0",
      "ip addr flush only",
      "vgreduce (alternative method)",
      "userdel (alternative method)"
    ],
    "correct": 0,
    "explain": "nmcli con down/up; device disconnect vs connection.",
    "obj": "8.1",
    "level": 1
  },
  {
    "id": 155,
    "mode": "exam",
    "topic": "SELinux",
    "q": "Put SELinux in permissive mode until reboot (troubleshooting):",
    "options": [
      "setenforce 0",
      "sed -i permanent only without reboot",
      "lvremove",
      "dnf erase"
    ],
    "correct": 0,
    "explain": "setenforce 0 permissive; 1 enforcing; /etc/selinux/config persistent.",
    "obj": "4.1",
    "level": 4
  },
  {
    "id": 156,
    "mode": "exam",
    "topic": "systemd",
    "q": "Reload systemd after unit file change:",
    "options": [
      "systemctl daemon-reload",
      "reboot only",
      "lvcreate",
      "firewall-cmd --complete-reload"
    ],
    "correct": 0,
    "explain": "daemon-reload after editing units; then restart service.",
    "obj": "7.2",
    "level": 3
  },
  {
    "id": 157,
    "mode": "exam",
    "topic": "Storage",
    "q": "Mount by UUID in /etc/fstab for reliability:",
    "options": [
      "UUID=xxx /mount xfs defaults 0 0",
      "LABEL= only required",
      "nmcli (alternative method)",
      "podman (alternative method)"
    ],
    "correct": 0,
    "explain": "blkid shows UUID; UUID= in fstab survives device rename.",
    "obj": "5.6",
    "level": 3
  },
  {
    "id": 158,
    "mode": "exam",
    "topic": "Users/Groups",
    "q": "Add user to supplementary group wheel:",
    "options": [
      "usermod -aG wheel user",
      "groupdel wheel",
      "pvresize (alternative method)",
      "chattr (alternative method)"
    ],
    "correct": 0,
    "explain": "-aG append groups; -G replaces all supplementary groups.",
    "obj": "9.2",
    "level": 1
  },
  {
    "id": 159,
    "mode": "exam",
    "topic": "Packages",
    "q": "Remove package httpd and dependencies no longer needed:",
    "options": [
      "dnf remove httpd",
      "rpm -ivh",
      "mkfs (alternative method)",
      "restorecon"
    ],
    "correct": 0,
    "explain": "dnf remove; autoremove cleans orphans.",
    "obj": "2.2",
    "level": 1
  },
  {
    "id": 160,
    "mode": "exam",
    "topic": "Boot",
    "q": "Reset root password from rescue mode (high level):",
    "options": [
      "Boot rescue; mount sysroot; chroot /sysroot; passwd root; touch /.autorelabel",
      "nmcli con add (alternative method)",
      "lvcreate (alternative method)",
      "podman (alternative method)"
    ],
    "correct": 0,
    "explain": "rd.break or rescue image; relabel if SELinux contexts broken.",
    "obj": "4.3",
    "level": 3
  },
  {
    "id": 161,
    "mode": "exam",
    "topic": "Networking",
    "q": "Show routing table:",
    "options": [
      "ip route show or route -n",
      "ss -tlnp only",
      "lvs (alternative method)",
      "getfacl (alternative method)"
    ],
    "correct": 0,
    "explain": "ip route; nmcli shows profiles not full table.",
    "obj": "8.2",
    "level": 1
  },
  {
    "id": 162,
    "mode": "exam",
    "topic": "Firewall",
    "q": "Default zone for interfaces not explicitly assigned:",
    "options": [
      "Defined in /etc/firewalld/firewalld.conf (often public)",
      "No zone (alternative method)",
      "block only (limited scope)",
      "trusted always (alternative method)"
    ],
    "correct": 0,
    "explain": "DefaultZone=public typical; --get-default-zone to read.",
    "obj": "10.1",
    "level": 1
  },
  {
    "id": 163,
    "mode": "exam",
    "topic": "Storage",
    "q": "Activate all logical volumes in volume group vg0:",
    "options": [
      "vgchange -ay vg0",
      "vgremove",
      "useradd",
      "firewall-offline-cmd"
    ],
    "correct": 0,
    "explain": "vgchange -ay activates LVs; -an deactivates.",
    "obj": "5.3",
    "level": 1
  },
  {
    "id": 164,
    "mode": "exam",
    "topic": "systemd",
    "q": "Limit httpd service to 512M memory:",
    "options": [
      "MemoryMax=512M in [Service] unit",
      "ulimit only in shell",
      "lvextend (alternative method)",
      "semanage fcontext"
    ],
    "correct": 0,
    "explain": "systemd cgroups v2 resource limits in unit file.",
    "obj": "7.2",
    "level": 3
  },
  {
    "id": 165,
    "mode": "exam",
    "topic": "Packages",
    "q": "Download package nginx without installing:",
    "options": [
      "dnf download nginx",
      "rpm -e nginx",
      "mkfs.xfs (alternative method)",
      "restorecon -R"
    ],
    "correct": 0,
    "explain": "dnf download gets RPMs; install with dnf install ./package.rpm.",
    "obj": "2.1",
    "level": 1
  },
  {
    "id": 166,
    "mode": "exam",
    "topic": "Networking",
    "q": "Permanently set hostname in /etc/hostname is:",
    "options": [
      "Possible but hostnamectl preferred on systemd systems",
      "Required for nmcli (alternative method)",
      "Replaces /etc/hosts always",
      "Disables chrony (alternative method)"
    ],
    "correct": 0,
    "explain": "hostnamectl syncs with static hostname; also in /etc/hostname.",
    "obj": "8.3",
    "level": 3
  },
  {
    "id": 167,
    "mode": "exam",
    "topic": "SELinux",
    "q": "Generate custom module from audit denial (last resort):",
    "options": [
      "audit2allow -M mymod -i log; semodule -i mymod.pp",
      "setenforce 0 forever",
      "fdisk (alternative method)",
      "useradd -o (alternative method)"
    ],
    "correct": 0,
    "explain": "audit2allow creates policy module; prefer booleans/fcontext first.",
    "obj": "10.7",
    "level": 3
  },
  {
    "id": 168,
    "mode": "exam",
    "topic": "Storage",
    "q": "Display block device hierarchy:",
    "options": [
      "lsblk",
      "only df",
      "journalctl",
      "firewall-cmd"
    ],
    "correct": 0,
    "explain": "lsblk shows tree; blkid UUIDs; pvs/vgs/lvs for LVM.",
    "obj": "5.3",
    "level": 1
  },
  {
    "id": 169,
    "mode": "exam",
    "topic": "Scheduling",
    "q": "Allow user mike to use at jobs:",
    "options": [
      "Ensure mike in /etc/at.allow or not in at.deny",
      "crontab only (limited scope)",
      "lvremove (alternative method)",
      "nmcli (alternative method)"
    ],
    "correct": 0,
    "explain": "at.allow whitelist; atq lists queue; atrm removes job.",
    "obj": "7.1",
    "level": 3
  },
  {
    "id": 170,
    "mode": "exam",
    "topic": "systemd",
    "q": "Kill all processes in cgroup of service httpd:",
    "options": [
      "systemctl kill httpd",
      "killall -9 only",
      "vgexport (alternative method)",
      "chage -I (alternative method)"
    ],
    "correct": 0,
    "explain": "systemctl kill sends signal; stop is graceful shutdown.",
    "obj": "4.9",
    "level": 1
  },
  {
    "id": 171,
    "mode": "exam",
    "topic": "Packages",
    "q": "Group install Development Tools:",
    "options": [
      "dnf groupinstall 'Development Tools'",
      "rpm -Uvh only (limited scope)",
      "mkfs (alternative method)",
      "restorecon (alternative method)"
    ],
    "correct": 0,
    "explain": "dnf group list; groupinstall installs package set.",
    "obj": "9.2",
    "level": 3
  },
  {
    "id": 172,
    "mode": "exam",
    "topic": "Boot",
    "q": "Verify boot loader config after editing /etc/default/grub:",
    "options": [
      "grub2-mkconfig -o /boot/grub2/grub.cfg (BIOS) or grub.cfg under EFI",
      "dracut only (limited scope)",
      "nmcli (alternative method)",
      "podman (alternative method)"
    ],
    "correct": 0,
    "explain": "UEFI path under /boot/efi/EFI/redhat/; BIOS /boot/grub2/.",
    "obj": "7.1",
    "level": 1
  },
  {
    "id": "rhcsa10-f001",
    "mode": "exam",
    "topic": "Flatpak",
    "q": "To add the Flathub repository as a system-wide source:",
    "options": [
      "flatpak remote-add flathub https://flathub.org/repo/flathub.flatpakrepo",
      "flatpak remote-add --system flathub https://flathub.org/repo/flathub.flatpakrepo",
      "dnf config-manager --add-repo flathub",
      "yum-config-manager --enable flathub"
    ],
    "correct": 1,
    "explain": "--system flag adds the remote for all users. Without it, the remote is user-specific. flatpak remotes lists configured remotes.",
    "obj": "2.3",
    "level": 3
  },
  {
    "id": "rhcsa10-f002",
    "mode": "exam",
    "topic": "Flatpak",
    "q": "To install a Flatpak application from Flathub:",
    "options": [
      "dnf install flatpak:app",
      "flatpak install app-name",
      "flatpak install flathub org.app.AppName",
      "rpm -i app.flatpak"
    ],
    "correct": 2,
    "explain": "flatpak install remote app-id. Use full reverse-DNS ID. flatpak search to find IDs.",
    "obj": "2.4",
    "level": 3
  },
  {
    "id": "rhcsa10-f003",
    "mode": "exam",
    "topic": "Flatpak",
    "q": "To list all installed Flatpak applications:",
    "options": [
      "flatpak list --app",
      "rpm -qa | grep flatpak",
      "dnf list flatpak",
      "flatpak query"
    ],
    "correct": 0,
    "explain": "flatpak list --app shows applications. flatpak list shows all (including runtimes).",
    "obj": "2.4",
    "level": 2
  },
  {
    "id": "rhcsa10-f004",
    "mode": "exam",
    "topic": "Flatpak",
    "q": "To remove a Flatpak application:",
    "options": [
      "dnf remove app",
      "flatpak remove org.app.AppName",
      "rpm -e app",
      "flatpak delete app"
    ],
    "correct": 1,
    "explain": "flatpak remove app-id. flatpak uninstall also works. Use --unused to clean orphaned runtimes.",
    "obj": "2.4",
    "level": 3
  },
  {
    "id": "rhcsa10-f005",
    "mode": "exam",
    "topic": "Flatpak",
    "q": "To update all installed Flatpak applications:",
    "options": [
      "flatpak upgrade",
      "flatpak update",
      "dnf update flatpak",
      "Both A and B"
    ],
    "correct": 3,
    "explain": "flatpak update or flatpak upgrade updates all apps. Add app ID to update one app.",
    "obj": "2.4",
    "level": 2
  },
  {
    "id": "rhcsa10-f006",
    "mode": "exam",
    "topic": "Flatpak",
    "q": "To run a Flatpak application from the command line:",
    "options": [
      "./app-name",
      "flatpak run org.app.AppName",
      "dnf run app",
      "systemctl start app"
    ],
    "correct": 1,
    "explain": "flatpak run app-id. Desktop environments launch via .desktop files automatically.",
    "obj": "2.4",
    "level": 3
  },
  {
    "id": "rhcsa10-f007",
    "mode": "exam",
    "topic": "Flatpak",
    "q": "Flatpak applications run in:",
    "options": [
      "The host system without isolation",
      "Sandboxed containers with limited host access",
      "Virtual machines only",
      "Chroot environments"
    ],
    "correct": 1,
    "explain": "Flatpak uses Bubblewrap for sandboxing. Apps have limited filesystem/device access. flatpak info shows permissions.",
    "obj": "2.3",
    "level": 2
  },
  {
    "id": "rhcsa10-f008",
    "mode": "exam",
    "topic": "Flatpak",
    "q": "To list available remotes:",
    "options": [
      "flatpak list-remotes",
      "flatpak remotes",
      "dnf repolist",
      "Both A and B"
    ],
    "correct": 3,
    "explain": "flatpak remotes or flatpak remote-list shows configured remotes. Add --show-details for URLs.",
    "obj": "2.3",
    "level": 2
  },
  {
    "id": "rhcsa10-t001",
    "mode": "exam",
    "topic": "tuned",
    "q": "To list all available tuned profiles:",
    "options": [
      "tuned list",
      "tuned-adm list",
      "systemctl list-timers tuned",
      "tuned --show-profiles"
    ],
    "correct": 1,
    "explain": "tuned-adm list shows available profiles. tuned-adm active shows current profile.",
    "obj": "4.6",
    "level": 2
  },
  {
    "id": "rhcsa10-t002",
    "mode": "exam",
    "topic": "tuned",
    "q": "To set the throughput-performance profile:",
    "options": [
      "tuned-adm profile throughput-performance",
      "systemctl set-profile throughput-performance",
      "tuned --activate throughput-performance",
      "echo throughput-performance > /etc/tuned/active"
    ],
    "correct": 0,
    "explain": "tuned-adm profile name activates a profile. Changes persist across reboots.",
    "obj": "4.6",
    "level": 3
  },
  {
    "id": "rhcsa10-t003",
    "mode": "exam",
    "topic": "tuned",
    "q": "To check the currently active tuned profile:",
    "options": [
      "tuned-adm status",
      "tuned-adm active",
      "systemctl status tuned",
      "Both A and B"
    ],
    "correct": 3,
    "explain": "tuned-adm active shows active profile. tuned-adm status shows profile and tuned daemon status.",
    "obj": "4.6",
    "level": 2
  },
  {
    "id": "rhcsa10-t004",
    "mode": "exam",
    "topic": "tuned",
    "q": "Which tuned profile is recommended for virtual machines?",
    "options": [
      "balanced",
      "virtual-guest",
      "throughput-performance",
      "desktop"
    ],
    "correct": 1,
    "explain": "virtual-guest optimizes for VMs. virtual-host for hypervisors. tuned-adm recommend suggests a profile.",
    "obj": "4.6",
    "level": 2
  },
  {
    "id": "rhcsa10-t005",
    "mode": "exam",
    "topic": "tuned",
    "q": "To get tuned's recommended profile for the system:",
    "options": [
      "tuned-adm auto",
      "tuned-adm recommend",
      "tuned-adm suggest",
      "tuned-adm detect"
    ],
    "correct": 1,
    "explain": "tuned-adm recommend analyzes hardware and suggests optimal profile. Doesn't activate it.",
    "obj": "4.6",
    "level": 3
  },
  {
    "id": "rhcsa10-t006",
    "mode": "exam",
    "topic": "tuned",
    "q": "To disable all tuning (turn off tuned):",
    "options": [
      "systemctl stop tuned",
      "tuned-adm off",
      "tuned-adm profile none",
      "Both B and C"
    ],
    "correct": 1,
    "explain": "tuned-adm off deactivates tuning and stops daemon. Reverts system to default kernel settings.",
    "obj": "4.6",
    "level": 3
  },
  {
    "id": "rhcsa10-t007",
    "mode": "exam",
    "topic": "tuned",
    "q": "tuned profiles are stored in:",
    "options": [
      "/etc/tuned/ and /usr/lib/tuned/",
      "/var/lib/tuned/ only",
      "/etc/sysconfig/tuned/",
      "/proc/tuned/"
    ],
    "correct": 0,
    "explain": "/usr/lib/tuned/ has system profiles. /etc/tuned/ for custom profiles. tuned.conf per profile.",
    "obj": "4.6",
    "level": 2
  },
  {
    "id": "rhcsa10-t008",
    "mode": "exam",
    "topic": "tuned",
    "q": "Which profile optimizes for low power consumption?",
    "options": [
      "throughput-performance",
      "powersave",
      "balanced",
      "latency-performance"
    ],
    "correct": 1,
    "explain": "powersave reduces power consumption. throughput-performance and latency-performance maximize performance.",
    "obj": "4.6",
    "level": 2
  },
  {
    "id": "rhcsa10-st001",
    "mode": "exam",
    "topic": "Scheduling",
    "q": "To list all active systemd timers:",
    "options": [
      "systemctl list-timers",
      "crontab -l",
      "at -l",
      "timedatectl list"
    ],
    "correct": 0,
    "explain": "systemctl list-timers shows active timers. --all includes inactive. More reliable than cron for system tasks.",
    "obj": "7.1",
    "level": 2
  },
  {
    "id": "rhcsa10-st002",
    "mode": "exam",
    "topic": "Scheduling",
    "q": "<pre>cat /etc/systemd/system/backup.timer\n[Timer]\nOnCalendar=daily\nPersistent=true</pre>What does Persistent=true do?",
    "options": [
      "Timer runs even if system is in rescue mode",
      "Missed runs execute at next boot (catch-up)",
      "Timer never stops",
      "Logs are kept permanently"
    ],
    "correct": 1,
    "explain": "Persistent=true triggers missed runs at boot. Without it, missed scheduled runs are skipped.",
    "obj": "7.1",
    "level": 4
  },
  {
    "id": "rhcsa10-st003",
    "mode": "exam",
    "topic": "Scheduling",
    "q": "To create a timer that runs a service 5 minutes after boot:",
    "options": [
      "OnBootSec=5m in [Timer] section",
      "OnStartupSec=5m in [Timer]",
      "After=5min in [Unit]",
      "Delay=5m in [Timer]"
    ],
    "correct": 0,
    "explain": "OnBootSec= runs after system boot. OnStartupSec= after systemd starts. OnUnitActiveSec= for recurring.",
    "obj": "7.1",
    "level": 3
  },
  {
    "id": "rhcsa10-st004",
    "mode": "exam",
    "topic": "Scheduling",
    "q": "A timer unit must have a corresponding:",
    "options": [
      "Service unit with matching name",
      "Socket unit",
      "Target unit",
      "Path unit"
    ],
    "correct": 0,
    "explain": "backup.timer activates backup.service. Or specify Unit= to use different name.",
    "obj": "7.1",
    "level": 2
  },
  {
    "id": "rhcsa10-st005",
    "mode": "exam",
    "topic": "Scheduling",
    "q": "<pre>OnCalendar=Mon,Wed,Fri 14:00</pre>This timer runs:",
    "options": [
      "Every day at 14:00",
      "Monday, Wednesday, Friday at 14:00 (2 PM)",
      "First Monday of month at 14:00",
      "Weekly on Friday at 14:00"
    ],
    "correct": 1,
    "explain": "OnCalendar= supports day names, times, ranges. *-*-* HH:MM for daily. systemd.time(7) for syntax.",
    "obj": "7.1",
    "level": 4
  },
  {
    "id": "rhcsa10-st006",
    "mode": "exam",
    "topic": "Scheduling",
    "q": "To manually trigger a timer's service without waiting:",
    "options": [
      "systemctl trigger timer",
      "systemctl start service",
      "systemctl force timer",
      "systemctl run-now timer"
    ],
    "correct": 1,
    "explain": "systemctl start service runs the service immediately. Timers are schedulers, not execution units.",
    "obj": "7.1",
    "level": 3
  },
  {
    "id": "rhcsa10-st007",
    "mode": "exam",
    "topic": "Scheduling",
    "q": "To see when a timer will next trigger:",
    "options": [
      "systemctl list-timers shows next trigger time",
      "journalctl -u timer",
      "systemctl status timer only",
      "timedatectl"
    ],
    "correct": 0,
    "explain": "systemctl list-timers displays NEXT and LAST columns. systemctl status timer also shows next trigger.",
    "obj": "7.1",
    "level": 2
  },
  {
    "id": "rhcsa10-st008",
    "mode": "exam",
    "topic": "Scheduling",
    "q": "systemd timers are installed in which directories?",
    "options": [
      "/etc/systemd/system/ or /usr/lib/systemd/system/",
      "/etc/cron.d/ only",
      "/var/spool/systemd/",
      "/etc/timers/"
    ],
    "correct": 0,
    "explain": "/etc/systemd/system/ for admin units, /usr/lib/systemd/system/ for package units. systemctl enable --now timer to activate.",
    "obj": "7.1",
    "level": 2
  },
  {
    "id": "rhcsa10-a001",
    "mode": "exam",
    "topic": "autofs",
    "q": "<pre>cat /etc/auto.master\n/mnt /etc/auto.misc</pre>This configures autofs to:",
    "options": [
      "Mount /etc/auto.misc at /mnt",
      "Use /etc/auto.misc as indirect map for mountpoint /mnt",
      "Backup /mnt to /etc/auto.misc",
      "Create symlink from /mnt to /etc/auto.misc"
    ],
    "correct": 1,
    "explain": "auto.master maps mount base dirs to map files. Indirect map: /mnt/key mounts when accessed.",
    "obj": "6.3",
    "level": 4
  },
  {
    "id": "rhcsa10-a002",
    "mode": "exam",
    "topic": "autofs",
    "q": "<pre>cat /etc/auto.nfs\ndata -rw,soft server1:/exports/data</pre>If /etc/auto.master has '/net /etc/auto.nfs', accessing /net/data will:",
    "options": [
      "Fail (wrong syntax)",
      "Mount server1:/exports/data at /net/data read-write, soft mount",
      "Create local directory /net/data",
      "Mount /exports/data from localhost"
    ],
    "correct": 1,
    "explain": "Format: key mount-options location. autofs mounts on access, unmounts after timeout.",
    "obj": "6.3",
    "level": 4
  },
  {
    "id": "rhcsa10-a003",
    "mode": "exam",
    "topic": "NFS",
    "q": "To persistently mount NFS share server:/export at /mnt/nfs:",
    "options": [
      "mount server:/export /mnt/nfs then reboot",
      "echo 'server:/export /mnt/nfs nfs defaults 0 0' >> /etc/fstab",
      "nmcli con add nfs server:/export",
      "systemctl enable nfs-mount"
    ],
    "correct": 1,
    "explain": "NFS in /etc/fstab: server:/path /local nfs defaults 0 0. Mount with mount -a or at boot.",
    "obj": "6.2",
    "level": 3
  },
  {
    "id": "rhcsa10-a004",
    "mode": "exam",
    "topic": "NFS",
    "q": "To show currently mounted NFS shares:",
    "options": [
      "nfsstat",
      "mount | grep nfs",
      "showmount -e",
      "Both A and B"
    ],
    "correct": 1,
    "explain": "mount | grep nfs or mount -t nfs. showmount -e server lists server's exports.",
    "obj": "6.2",
    "level": 2
  },
  {
    "id": "rhcsa10-a005",
    "mode": "exam",
    "topic": "autofs",
    "q": "After editing /etc/auto.master, which command reloads autofs configuration?",
    "options": [
      "mount -a",
      "systemctl reload autofs",
      "autofs --reload",
      "automount -r"
    ],
    "correct": 1,
    "explain": "systemctl reload autofs rereads config. systemctl restart also works but disrupts active mounts.",
    "obj": "6.3",
    "level": 3
  },
  {
    "id": "rhcsa10-a006",
    "mode": "exam",
    "topic": "NFS",
    "q": "Which NFS mount option allows continued operation if server is unreachable?",
    "options": [
      "hard (default, retries indefinitely)",
      "soft (returns error after timeout)",
      "async",
      "nolock"
    ],
    "correct": 1,
    "explain": "soft returns I/O error after timeout. hard (default) hangs until server responds. Use soft with caution.",
    "obj": "6.2",
    "level": 3
  },
  {
    "id": "rhcsa10-c001",
    "mode": "exam",
    "topic": "Networking",
    "q": "To configure chrony to use internal NTP server 10.0.0.1:",
    "options": [
      "echo 'server 10.0.0.1 iburst' >> /etc/chrony.conf && systemctl restart chronyd",
      "timedatectl set-ntp 10.0.0.1",
      "ntpdate 10.0.0.1",
      "systemctl enable ntp@10.0.0.1"
    ],
    "correct": 0,
    "explain": "Edit /etc/chrony.conf, add server lines. iburst speeds initial sync. Restart chronyd to apply.",
    "obj": "7.4",
    "level": 3
  },
  {
    "id": "rhcsa10-c002",
    "mode": "exam",
    "topic": "Networking",
    "q": "To check chrony synchronization status and sources:",
    "options": [
      "chronyc tracking",
      "chronyc sources -v",
      "timedatectl",
      "All of the above"
    ],
    "correct": 3,
    "explain": "chronyc tracking shows sync status. chronyc sources lists NTP servers. timedatectl shows NTP state.",
    "obj": "7.4",
    "level": 2
  },
  {
    "id": "rhcsa10-c003",
    "mode": "exam",
    "topic": "Networking",
    "q": "chrony is preferred over ntpd in RHEL 10 because:",
    "options": [
      "Faster sync, better for laptops/VMs, handles intermittent network",
      "ntpd is deprecated",
      "chrony uses less memory",
      "Both A and B"
    ],
    "correct": 3,
    "explain": "chrony adapts to changing conditions, syncs faster. ntpd removed in RHEL 8+.",
    "obj": "7.4",
    "level": 2
  },
  {
    "id": "rhcsa10-c004",
    "mode": "exam",
    "topic": "Networking",
    "q": "<pre>chronyc sources\nMS Name/IP address         Stratum Poll</pre>^* means:",
    "options": [
      "Server is offline",
      "Currently selected sync source (best server)",
      "Server refused connection",
      "Clock is unsynchronized"
    ],
    "correct": 1,
    "explain": "* = selected source. + = acceptable. - = too many errors. ? = unreachable.",
    "obj": "7.4",
    "level": 4
  },
  {
    "id": "rhcsa10-c005",
    "mode": "exam",
    "topic": "Networking",
    "q": "To allow chrony to step (large-jump) the clock on first sync:",
    "options": [
      "makestep 1 3 in /etc/chrony.conf",
      "chronyc makestep",
      "timedatectl set-ntp --step",
      "systemctl restart chronyd --step"
    ],
    "correct": 0,
    "explain": "makestep threshold limit allows stepping if offset > threshold in first N updates. Prevents slow slew of large offsets.",
    "obj": "7.4",
    "level": 3
  },
  {
    "id": "rhcsa10-c006",
    "mode": "exam",
    "topic": "Networking",
    "q": "To manually force chrony to sync immediately:",
    "options": [
      "chronyc burst 4/4",
      "chronyc makestep",
      "systemctl restart chronyd",
      "Both A and B"
    ],
    "correct": 0,
    "explain": "chronyc burst 4/4 forces 4 measurements. chronyc makestep manually steps (if allowed). Normally automatic.",
    "obj": "7.4",
    "level": 3
  },
  {
    "id": "rhcsa10-c007",
    "mode": "exam",
    "topic": "Networking",
    "q": "chrony drift file location (stores clock rate adjustment):",
    "options": [
      "/var/lib/chrony/drift",
      "/etc/chrony/drift",
      "/var/log/chrony.drift",
      "/run/chrony/drift"
    ],
    "correct": 0,
    "explain": "driftfile /var/lib/chrony/drift in chrony.conf. Helps maintain accuracy across reboots.",
    "obj": "7.4",
    "level": 2
  },
  {
    "id": "rhcsa10-g001",
    "mode": "exam",
    "topic": "Boot",
    "q": "To add a kernel parameter (e.g., quiet) permanently using grubby:",
    "options": [
      "grubby --args='quiet' --update-kernel=ALL",
      "echo 'quiet' >> /boot/grub2/grub.cfg",
      "grub2-mkconfig --add-args quiet",
      "systemctl set-kernel-param quiet"
    ],
    "correct": 0,
    "explain": "grubby --update-kernel=ALL --args=... adds parameter to all kernels. Or specify kernel path.",
    "obj": "7.6",
    "level": 3
  },
  {
    "id": "rhcsa10-g002",
    "mode": "exam",
    "topic": "Boot",
    "q": "To remove a kernel parameter (e.g., rhgb) from all kernels:",
    "options": [
      "grubby --remove-args='rhgb' --update-kernel=ALL",
      "sed -i '/rhgb/d' /etc/default/grub",
      "grub2-mkconfig --remove rhgb",
      "systemctl mask rhgb"
    ],
    "correct": 0,
    "explain": "grubby --remove-args= --update-kernel=ALL. Check with grubby --info=ALL.",
    "obj": "7.6",
    "level": 3
  },
  {
    "id": "rhcsa10-g003",
    "mode": "exam",
    "topic": "Boot",
    "q": "To set the default boot kernel to a specific version:",
    "options": [
      "grubby --set-default=/boot/vmlinuz-5.14.0-1.el10.x86_64",
      "grub2-set-default 0",
      "echo 'default=kernel-5.14' > /etc/default/grub",
      "systemctl set-default kernel-5.14"
    ],
    "correct": 0,
    "explain": "grubby --set-default=/path/to/vmlinuz. Or grubby --set-default-index=N.",
    "obj": "7.6",
    "level": 3
  },
  {
    "id": "rhcsa10-g004",
    "mode": "exam",
    "topic": "Boot",
    "q": "To view information about the default boot kernel:",
    "options": [
      "grubby --info=DEFAULT",
      "grub2-editenv list",
      "cat /boot/grub2/grubenv",
      "Both A and B"
    ],
    "correct": 3,
    "explain": "grubby --info=DEFAULT shows kernel path, args, etc. grub2-editenv list shows saved variables.",
    "obj": "7.6",
    "level": 2
  },
  {
    "id": "rhcsa10-g005",
    "mode": "exam",
    "topic": "Boot",
    "q": "grubby modifies which file on UEFI systems?",
    "options": [
      "/boot/efi/EFI/redhat/grub.cfg",
      "/boot/loader/entries/*.conf (BLS entries)",
      "/etc/default/grub",
      "/boot/grub2/grub.cfg"
    ],
    "correct": 1,
    "explain": "RHEL 10 uses Boot Loader Specification (BLS). grubby edits /boot/loader/entries/*.conf entries.",
    "obj": "7.6",
    "level": 2
  },
  {
    "id": "rhcsa10-g006",
    "mode": "exam",
    "topic": "Boot",
    "q": "To list all installed kernels managed by grubby:",
    "options": [
      "grubby --info=ALL | grep ^kernel",
      "rpm -qa kernel",
      "ls /boot/vmlinuz-*",
      "All of the above"
    ],
    "correct": 3,
    "explain": "grubby --info=ALL shows all boot entries. rpm -qa kernel* lists installed kernel packages.",
    "obj": "7.6",
    "level": 2
  },
  {
    "id": "rhcsa10-g007",
    "mode": "exam",
    "topic": "Boot",
    "q": "To add a kernel parameter for one boot only (not persistent):",
    "options": [
      "At GRUB menu: press 'e', edit kernel line, Ctrl+X to boot",
      "grubby --args='param' --make-once",
      "grub2-reboot with parameter",
      "systemctl reboot --param"
    ],
    "correct": 0,
    "explain": "At GRUB: 'e' to edit, add param to linux line, Ctrl+X. Not persistent. grubby is for persistent changes.",
    "obj": "7.6",
    "level": 3
  },
  {
    "id": "rhcsa10-g008",
    "mode": "exam",
    "topic": "Boot",
    "q": "After kernel update, how to set the new kernel as default?",
    "options": [
      "grubby --set-default=/boot/vmlinuz-new-version",
      "dnf does this automatically (newest kernel is default)",
      "grub2-mkconfig",
      "Both A and B"
    ],
    "correct": 3,
    "explain": "RHEL defaults to newest kernel. Or manually set with grubby --set-default.",
    "obj": "7.6",
    "level": 2
  },
  {
    "id": "rhcsa10-scp001",
    "mode": "exam",
    "topic": "Networking",
    "q": "To copy local file /etc/hosts to remote server1 /tmp/ as user bob:",
    "options": [
      "scp /etc/hosts bob@server1:/tmp/",
      "sftp bob@server1 put /etc/hosts /tmp/",
      "rsync /etc/hosts server1:/tmp/",
      "ssh bob@server1 'cat > /tmp/hosts' < /etc/hosts"
    ],
    "correct": 0,
    "explain": "scp source destination. Use -r for directories. -P for non-standard SSH port.",
    "obj": "4.10",
    "level": 3
  },
  {
    "id": "rhcsa10-scp002",
    "mode": "exam",
    "topic": "Networking",
    "q": "To copy a directory /data from remote server2 to local /backup/:",
    "options": [
      "scp -r user@server2:/data /backup/",
      "scp user@server2:/data /backup/",
      "rsync -a user@server2:/data /backup/",
      "Both A and C"
    ],
    "correct": 3,
    "explain": "scp -r for recursive. rsync -a preserves permissions/timestamps and is resumable.",
    "obj": "4.10",
    "level": 3
  },
  {
    "id": "rhcsa10-scp003",
    "mode": "exam",
    "topic": "Networking",
    "q": "To start an interactive sftp session to server3 as user alice:",
    "options": [
      "sftp alice@server3",
      "ssh -sftp alice@server3",
      "scp -i alice@server3",
      "ftp alice@server3"
    ],
    "correct": 0,
    "explain": "sftp user@host opens interactive session. Commands: get, put, ls, cd, pwd, quit.",
    "obj": "4.10",
    "level": 2
  },
  {
    "id": "rhcsa10-scp004",
    "mode": "exam",
    "topic": "Networking",
    "q": "<pre>sftp> get /remote/file.txt</pre>This command:",
    "options": [
      "Downloads /remote/file.txt to current local directory",
      "Uploads file.txt to /remote/",
      "Lists /remote/file.txt",
      "Deletes /remote/file.txt"
    ],
    "correct": 0,
    "explain": "get downloads from remote. put uploads to remote. mget/mput for wildcards.",
    "obj": "4.10",
    "level": 3
  },
  {
    "id": "rhcsa10-scp005",
    "mode": "exam",
    "topic": "Networking",
    "q": "To preserve file permissions and timestamps when using scp:",
    "options": [
      "scp -p source destination",
      "scp -P source destination",
      "scp --preserve source destination",
      "scp -a source destination"
    ],
    "correct": 0,
    "explain": "-p preserves modification time, access time, and modes. -P specifies port.",
    "obj": "4.10",
    "level": 3
  },
  {
    "id": "rhcsa10-scp006",
    "mode": "exam",
    "topic": "Networking",
    "q": "To use scp with a non-standard SSH port 2222:",
    "options": [
      "scp -P 2222 file user@host:/path",
      "scp -p 2222 file user@host:/path",
      "scp --port 2222 file user@host:/path",
      "scp file user@host:2222:/path"
    ],
    "correct": 0,
    "explain": "scp -P port (uppercase P). ssh/sftp use -p (lowercase) for port.",
    "obj": "4.10",
    "level": 3
  },
  {
    "id": "rhcsa10-scp007",
    "mode": "exam",
    "topic": "Networking",
    "q": "<pre>sftp> put /local/file.txt /remote/backup/</pre>This:",
    "options": [
      "Uploads /local/file.txt to remote directory /remote/backup/",
      "Downloads file.txt from remote",
      "Copies local file to another local path",
      "Fails (wrong syntax)"
    ],
    "correct": 0,
    "explain": "put local-path [remote-path] uploads. lpwd/pwd to check local/remote working directories.",
    "obj": "4.10",
    "level": 3
  },
  {
    "id": "rhcsa10-scp008",
    "mode": "exam",
    "topic": "Networking",
    "q": "scp and sftp authenticate using:",
    "options": [
      "FTP protocols",
      "SSH keys or passwords (SSH protocol)",
      "Telnet",
      "HTTP Basic Auth"
    ],
    "correct": 1,
    "explain": "scp/sftp use SSH. Secure, encrypted. Configure SSH keys for passwordless transfers.",
    "obj": "4.10",
    "level": 2
  },
  {
    "id": "rhcsa10-nice001",
    "mode": "exam",
    "topic": "Processes",
    "q": "To start a command with lower priority (nice value +10):",
    "options": [
      "nice -n 10 command",
      "renice +10 command",
      "command --nice=10",
      "taskset -n 10 command"
    ],
    "correct": 0,
    "explain": "nice -n value command. Positive = lower priority. Range: -20 (highest) to +19 (lowest). Default is 0.",
    "obj": "4.5",
    "level": 3
  },
  {
    "id": "rhcsa10-nice002",
    "mode": "exam",
    "topic": "Processes",
    "q": "To change the nice value of running process PID 1234 to -5:",
    "options": [
      "nice -n -5 1234",
      "renice -n -5 1234",
      "renice -5 1234 (same as above)",
      "Both B and C"
    ],
    "correct": 3,
    "explain": "renice -n value -p PID. Or renice value PID. Negative nice values require root.",
    "obj": "4.5",
    "level": 3
  },
  {
    "id": "rhcsa10-nice003",
    "mode": "exam",
    "topic": "Processes",
    "q": "A process with nice value -20:",
    "options": [
      "Has lowest CPU priority",
      "Has highest CPU priority",
      "Is suspended",
      "Uses less memory"
    ],
    "correct": 1,
    "explain": "-20 = highest priority (most CPU). +19 = lowest priority. Counter-intuitive: lower number = higher priority.",
    "obj": "4.5",
    "level": 2
  },
  {
    "id": "rhcsa10-nice004",
    "mode": "exam",
    "topic": "Processes",
    "q": "To view the nice value of processes:",
    "options": [
      "ps -el (NI column)",
      "ps aux (NI column)",
      "top (NI column)",
      "All of the above"
    ],
    "correct": 3,
    "explain": "ps -l, ps -el, or top show NI (nice) and PRI (priority) columns.",
    "obj": "4.5",
    "level": 2
  },
  {
    "id": "rhcsa10-nice005",
    "mode": "exam",
    "topic": "Processes",
    "q": "Non-root users can:",
    "options": [
      "Only increase nice value (lower priority) of their processes",
      "Set any nice value",
      "Only decrease nice value (higher priority)",
      "Cannot change nice values"
    ],
    "correct": 0,
    "explain": "Users can only make processes nicer (increase nice value). Root can set any value, including negative.",
    "obj": "4.5",
    "level": 2
  },
  {
    "id": "rhcsa10-nice006",
    "mode": "exam",
    "topic": "Processes",
    "q": "To renice all processes owned by user bob:",
    "options": [
      "renice +5 -u bob",
      "renice bob +5",
      "nice -u bob +5",
      "pgrep bob | renice +5"
    ],
    "correct": 0,
    "explain": "renice value -u username. -g for process group. -p for specific PID.",
    "obj": "4.5",
    "level": 3
  },
  {
    "id": "rhcsa10-nice007",
    "mode": "exam",
    "topic": "Processes",
    "q": "<pre>$ nice -n 15 /usr/bin/backup.sh</pre>This command:",
    "options": [
      "Runs backup.sh with higher priority",
      "Runs backup.sh with lower priority (less CPU)",
      "Fails (requires root for +15)",
      "Runs backup.sh 15 times"
    ],
    "correct": 1,
    "explain": "nice +15 = lower priority. CPU scheduler gives less time to high-nice processes.",
    "obj": "4.5",
    "level": 4
  },
  {
    "id": "rhcsa10-nice008",
    "mode": "exam",
    "topic": "Processes",
    "q": "nice values affect:",
    "options": [
      "CPU scheduling priority",
      "Memory allocation",
      "Disk I/O priority",
      "Network bandwidth"
    ],
    "correct": 0,
    "explain": "nice affects CPU scheduler. Use ionice for I/O priority. cgroups for comprehensive resource control.",
    "obj": "4.5",
    "level": 2
  },
  {
    "id": "rhcsa10-jp001",
    "mode": "exam",
    "topic": "systemd",
    "q": "To make systemd journal persistent across reboots:",
    "options": [
      "mkdir -p /var/log/journal && systemctl restart systemd-journald",
      "journalctl --persistent",
      "systemctl enable systemd-journal-persistent",
      "echo 'Storage=persistent' > /etc/systemd/journald.conf"
    ],
    "correct": 0,
    "explain": "Creating /var/log/journal/ enables persistent storage. Or set Storage=persistent in /etc/systemd/journald.conf.",
    "obj": "4.8",
    "level": 3
  },
  {
    "id": "rhcsa10-jp002",
    "mode": "exam",
    "topic": "systemd",
    "q": "<pre>cat /etc/systemd/journald.conf\nStorage=volatile</pre>This means:",
    "options": [
      "Journals are stored only in RAM (/run/log/journal/)",
      "Journals are encrypted",
      "Journals are compressed",
      "Journals are deleted immediately"
    ],
    "correct": 0,
    "explain": "volatile = RAM only (lost at reboot). persistent = disk. auto = disk if /var/log/journal exists.",
    "obj": "4.8",
    "level": 4
  },
  {
    "id": "rhcsa10-jp003",
    "mode": "exam",
    "topic": "systemd",
    "q": "To view journal disk usage:",
    "options": [
      "journalctl --disk-usage",
      "du -sh /var/log/journal/",
      "journalctl --vacuum-size",
      "Both A and B"
    ],
    "correct": 3,
    "explain": "journalctl --disk-usage shows total. du -sh /var/log/journal checks actual disk space.",
    "obj": "4.8",
    "level": 2
  },
  {
    "id": "rhcsa10-jp004",
    "mode": "exam",
    "topic": "systemd",
    "q": "To limit journal size to 500M:",
    "options": [
      "SystemMaxUse=500M in /etc/systemd/journald.conf",
      "journalctl --vacuum-size=500M",
      "truncate -s 500M /var/log/journal/*",
      "Both A and B"
    ],
    "correct": 3,
    "explain": "SystemMaxUse= in journald.conf sets limit. journalctl --vacuum-size= cleans old logs to reach target.",
    "obj": "4.8",
    "level": 3
  },
  {
    "id": "rhcsa10-jp005",
    "mode": "exam",
    "topic": "systemd",
    "q": "To delete journal entries older than 2 weeks:",
    "options": [
      "journalctl --vacuum-time=2weeks",
      "find /var/log/journal -mtime +14 -delete",
      "journalctl --rotate && journalctl --vacuum-time=2w",
      "Both A and C"
    ],
    "correct": 3,
    "explain": "--vacuum-time=Xd/weeks/months. --rotate forces log rotation before vacuum.",
    "obj": "4.8",
    "level": 3
  },
  {
    "id": "rhcsa10-jp006",
    "mode": "exam",
    "topic": "systemd",
    "q": "Persistent journal files are stored in:",
    "options": [
      "/var/log/journal/<machine-id>/",
      "/run/log/journal/",
      "/var/log/messages",
      "/etc/systemd/journal/"
    ],
    "correct": 0,
    "explain": "/var/log/journal/<machine-id>/ for persistent. /run/log/journal/ for volatile. machine-id from /etc/machine-id.",
    "obj": "4.8",
    "level": 2
  },
  {
    "id": "rhcsa10-jp007",
    "mode": "exam",
    "topic": "systemd",
    "q": "After changing /etc/systemd/journald.conf, apply changes with:",
    "options": [
      "systemctl restart systemd-journald",
      "systemctl daemon-reload",
      "journalctl --reload",
      "reboot"
    ],
    "correct": 0,
    "explain": "systemctl restart systemd-journald applies journald.conf changes. Existing logs preserved.",
    "obj": "4.8",
    "level": 3
  },
  {
    "id": "rhcsa10-jp008",
    "mode": "exam",
    "topic": "systemd",
    "q": "To verify persistent journal is enabled:",
    "options": [
      "journalctl --verify",
      "Check if /var/log/journal/ exists and has files",
      "journalctl | grep -i persistent",
      "systemctl status systemd-journal-persistent"
    ],
    "correct": 1,
    "explain": "If /var/log/journal/<machine-id>/ has *.journal files, it's persistent. journalctl --verify checks integrity.",
    "obj": "4.8",
    "level": 2
  },
  {
    "id": "rhcsa10-gpt001",
    "mode": "exam",
    "topic": "Storage",
    "q": "To create a new GPT partition table on /dev/sdc:",
    "options": [
      "parted /dev/sdc mklabel gpt",
      "gdisk /dev/sdc (then 'o' for new GPT)",
      "fdisk /dev/sdc (then 'g' for GPT)",
      "All of the above"
    ],
    "correct": 3,
    "explain": "parted mklabel gpt, or gdisk 'o', or fdisk 'g'. WARNING: destroys existing partitions.",
    "obj": "5.1",
    "level": 3
  },
  {
    "id": "rhcsa10-gpt002",
    "mode": "exam",
    "topic": "Storage",
    "q": "<pre>parted /dev/sdd mkpart primary 1MiB 1GiB</pre>This creates:",
    "options": [
      "1GB ext4 filesystem",
      "1GB partition from 1MiB to 1GiB",
      "Fails (GPT doesn't use 'primary' type)",
      "1MiB partition"
    ],
    "correct": 1,
    "explain": "mkpart name start end. 'primary' is label (GPT ignores MBR type). Then mkfs to create filesystem.",
    "obj": "5.1",
    "level": 4
  },
  {
    "id": "rhcsa10-gpt003",
    "mode": "exam",
    "topic": "Storage",
    "q": "GPT supports up to how many partitions without extended partitions?",
    "options": [
      "4 (like MBR)",
      "16",
      "128 (default)",
      "Unlimited"
    ],
    "correct": 2,
    "explain": "GPT default is 128 partitions. No extended/logical like MBR. Can be increased.",
    "obj": "5.1",
    "level": 2
  },
  {
    "id": "rhcsa10-gpt004",
    "mode": "exam",
    "topic": "Storage",
    "q": "To list partitions on GPT disk /dev/sdd:",
    "options": [
      "parted /dev/sdd print",
      "fdisk -l /dev/sdd",
      "lsblk /dev/sdd",
      "All of the above"
    ],
    "correct": 3,
    "explain": "parted print, fdisk -l, lsblk all show partition tables. gdisk -l also works.",
    "obj": "5.1",
    "level": 2
  },
  {
    "id": "rhcsa10-gpt005",
    "mode": "exam",
    "topic": "Storage",
    "q": "To delete partition 3 on /dev/sde using parted:",
    "options": [
      "parted /dev/sde rm 3",
      "parted /dev/sde delete 3",
      "parted /dev/sde rmpart 3",
      "Both A and B"
    ],
    "correct": 0,
    "explain": "parted rm N deletes partition N. Changes written immediately (no 'w' needed like fdisk).",
    "obj": "5.1",
    "level": 3
  },
  {
    "id": "rhcsa10-gpt006",
    "mode": "exam",
    "topic": "Storage",
    "q": "GPT advantage over MBR includes:",
    "options": [
      "Supports disks > 2TB",
      "More partitions without extended scheme",
      "Partition labels/names",
      "All of the above"
    ],
    "correct": 3,
    "explain": "GPT: >2TB disks, 128 partitions, labels, redundant partition table. UEFI firmware requires GPT.",
    "obj": "5.1",
    "level": 2
  },
  {
    "id": "rhcsa10-gpt007",
    "mode": "exam",
    "topic": "Storage",
    "q": "To set a partition name 'database' on GPT partition /dev/sdf2:",
    "options": [
      "parted /dev/sdf name 2 database",
      "tune2fs -L database /dev/sdf2",
      "gdisk /dev/sdf (then 'c' command)",
      "Both A and C"
    ],
    "correct": 3,
    "explain": "parted name N label sets partition name (GPT metadata). tune2fs -L sets filesystem label (different).",
    "obj": "5.1",
    "level": 3
  },
  {
    "id": "rhcsa10-gpt008",
    "mode": "exam",
    "topic": "Storage",
    "q": "After creating a GPT partition, next step before mounting is:",
    "options": [
      "mkfs to create filesystem",
      "partprobe to update kernel",
      "mount immediately",
      "Both A and B (mkfs, then mount)"
    ],
    "correct": 3,
    "explain": "partprobe updates kernel partition table. Then mkfs.xfs or mkfs.ext4. Then mount.",
    "obj": "5.1",
    "level": 3
  }
];
