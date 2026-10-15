/**
 * Red Hat Certified System Administrator (RHCSA) EX200
 * RHEL 10 (current exam version as of 2026-10-14)
 * 
 * Source: https://www.redhat.com/en/services/training/ex200-red-hat-certified-system-administrator-rhcsa-exam
 * Verified: 2026-10-14
 * 
 * Performance-based exam (hands-on tasks). All configurations must persist after reboot.
 */
window.OBJECTIVES = [
  // Domain 1: Understand and use essential tools (20%)
  { id: '1.1', domain: 1, title: 'Shell commands and syntax', weight: 0.20 },
  { id: '1.2', domain: 1, title: 'I/O redirection', weight: 0.20 },
  { id: '1.3', domain: 1, title: 'grep and regular expressions', weight: 0.20 },
  { id: '1.4', domain: 1, title: 'SSH to remote systems', weight: 0.20 },
  { id: '1.5', domain: 1, title: 'Log in and switch users in multi-user targets', weight: 0.20 },
  { id: '1.6', domain: 1, title: 'tar/gzip/bzip2', weight: 0.20 },
  { id: '1.7', domain: 1, title: 'Create and edit text files', weight: 0.20 },
  { id: '1.8', domain: 1, title: 'Create, delete, copy and move files and directories', weight: 0.20 },
  { id: '1.9', domain: 1, title: 'Hard and soft links', weight: 0.20 },
  { id: '1.10', domain: 1, title: 'ugo/rwx permissions', weight: 0.20 },
  { id: '1.11', domain: 1, title: 'man, info and /usr/share/doc', weight: 0.20 },

  // Domain 2: Manage software (weight not specified, estimated 10%)
  { id: '2.1', domain: 2, title: 'Configure RPM repositories', weight: 0.10 },
  { id: '2.2', domain: 2, title: 'Install and remove RPM packages', weight: 0.10 },
  { id: '2.3', domain: 2, title: 'Configure Flatpak repositories', weight: 0.10 },
  { id: '2.4', domain: 2, title: 'Install and remove Flatpak packages', weight: 0.10 },

  // Domain 3: Create simple shell scripts (estimated 10%)
  { id: '3.1', domain: 3, title: 'Conditionals (if, test, [])', weight: 0.10 },
  { id: '3.2', domain: 3, title: 'Loops', weight: 0.10 },
  { id: '3.3', domain: 3, title: 'Script inputs ($1, $2…)', weight: 0.10 },
  { id: '3.4', domain: 3, title: 'Process command output in a script', weight: 0.10 },

  // Domain 4: Operate running systems (15%)
  { id: '4.1', domain: 4, title: 'Boot, reboot and shut down', weight: 0.15 },
  { id: '4.2', domain: 4, title: 'Boot into targets manually', weight: 0.15 },
  { id: '4.3', domain: 4, title: 'Interrupt the boot to gain access', weight: 0.15 },
  { id: '4.4', domain: 4, title: 'Find and kill CPU/memory-intensive processes', weight: 0.15 },
  { id: '4.5', domain: 4, title: 'Adjust process scheduling (nice/renice)', weight: 0.15 },
  { id: '4.6', domain: 4, title: 'Manage tuning profiles (tuned)', weight: 0.15 },
  { id: '4.7', domain: 4, title: 'Locate and interpret logs and journals', weight: 0.15 },
  { id: '4.8', domain: 4, title: 'Preserve system journals', weight: 0.15 },
  { id: '4.9', domain: 4, title: 'Start, stop and check network services', weight: 0.15 },
  { id: '4.10', domain: 4, title: 'Securely transfer files (scp/sftp)', weight: 0.15 },

  // Domain 5: Configure local storage (15%)
  { id: '5.1', domain: 5, title: 'List, create and delete partitions on GPT disks', weight: 0.15 },
  { id: '5.2', domain: 5, title: 'Create and remove PVs', weight: 0.15 },
  { id: '5.3', domain: 5, title: 'Assign PVs to VGs', weight: 0.15 },
  { id: '5.4', domain: 5, title: 'Create and delete LVs', weight: 0.15 },
  { id: '5.5', domain: 5, title: 'Mount at boot by UUID or label', weight: 0.15 },
  { id: '5.6', domain: 5, title: 'Add partitions, LVs and swap non-destructively', weight: 0.15 },

  // Domain 6: Create and configure file systems (15%)
  { id: '6.1', domain: 6, title: 'VFAT/ext4/XFS: create, mount, unmount', weight: 0.15 },
  { id: '6.2', domain: 6, title: 'Mount NFS', weight: 0.15 },
  { id: '6.3', domain: 6, title: 'autofs', weight: 0.15 },
  { id: '6.4', domain: 6, title: 'Extend LVs', weight: 0.15 },
  { id: '6.5', domain: 6, title: 'Diagnose and correct file permission problems', weight: 0.15 },

  // Domain 7: Deploy, configure and maintain systems (15%)
  { id: '7.1', domain: 7, title: 'Schedule tasks with at, cron and systemd timer units', weight: 0.15 },
  { id: '7.2', domain: 7, title: 'Enable services at boot', weight: 0.15 },
  { id: '7.3', domain: 7, title: 'Set the default boot target', weight: 0.15 },
  { id: '7.4', domain: 7, title: 'Time service clients (chrony)', weight: 0.15 },
  { id: '7.5', domain: 7, title: 'Install and update packages from CDN, remote repo or local filesystem', weight: 0.15 },
  { id: '7.6', domain: 7, title: 'Modify the system bootloader (grubby)', weight: 0.15 },

  // Domain 8: Manage basic networking (10%)
  { id: '8.1', domain: 8, title: 'IPv4/IPv6 addresses', weight: 0.10 },
  { id: '8.2', domain: 8, title: 'Hostname resolution', weight: 0.10 },
  { id: '8.3', domain: 8, title: 'Network services at boot', weight: 0.10 },
  { id: '8.4', domain: 8, title: 'Restrict access with firewalld/firewall-cmd', weight: 0.10 },

  // Domain 9: Manage users and groups (10%)
  { id: '9.1', domain: 9, title: 'Create, delete and modify local users', weight: 0.10 },
  { id: '9.2', domain: 9, title: 'Passwords and password aging', weight: 0.10 },
  { id: '9.3', domain: 9, title: 'Local groups and membership', weight: 0.10 },
  { id: '9.4', domain: 9, title: 'Privileged access (sudo)', weight: 0.10 },

  // Domain 10: Manage security (10%)
  { id: '10.1', domain: 10, title: 'firewall-cmd/firewalld', weight: 0.10 },
  { id: '10.2', domain: 10, title: 'Default file permissions (umask)', weight: 0.10 },
  { id: '10.3', domain: 10, title: 'SSH key-based authentication', weight: 0.10 },
  { id: '10.4', domain: 10, title: 'SELinux enforcing/permissive', weight: 0.10 },
  { id: '10.5', domain: 10, title: 'List SELinux file and process contexts', weight: 0.10 },
  { id: '10.6', domain: 10, title: 'Restore default file contexts', weight: 0.10 },
  { id: '10.7', domain: 10, title: 'SELinux port labels', weight: 0.10 },
  { id: '10.8', domain: 10, title: 'SELinux booleans', weight: 0.10 }
];
