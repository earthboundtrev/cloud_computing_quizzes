/**
 * Topic to Objective mapping for RHCSA10
 * Maps question topics to official EX200 RHEL 10 objectives
 */
const TOPIC_TO_OBJECTIVE = {
  'Shell': '1.1',
  'I/O': '1.2',
  'grep': '1.3',
  'SSH': '1.4',
  'Users/Groups': '9.1',  // or 9.2, 9.3, 9.4 depending on context
  'Storage': '5.1',  // or other 5.x depending on LVM/partition context
  'LVM': '5.2',  // or 5.3, 5.4
  'Filesystems': '6.1',  // or 6.2-6.5
  'NFS': '6.2',
  'autofs': '6.3',
  'Boot': '4.1',  // or 4.2, 4.3, 7.3, 7.6
  'systemd': '4.9',  // or 7.2 depending on context
  'Scheduling': '7.1',
  'Networking': '8.1',  // or 8.2-8.4
  'Firewall': '10.1',
  'SELinux': '10.4',  // or 10.5-10.8
  'Permissions': '1.10',  // or 6.5, 10.2
  'Packages': '2.1',  // or 2.2, 7.5
};

/**
 * Difficulty levels guide:
 * 1 = Recall (definition, basic concept)
 * 2 = Understanding (explain why, compare)
 * 3 = Application (apply in scenario, choose correct command)
 * 4 = Analysis (read output/config, find error, troubleshoot)
 * 5 = Synthesis (design solution, multiple steps)
 */

module.exports = { TOPIC_TO_OBJECTIVE };
