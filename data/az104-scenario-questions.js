/**
 * AZ-104 case-study questions (mode: scenario). Fictitious scenarios aligned to exam case-study format.
 */
window.QUESTION_BANK_AZ104_SCENARIOS = [
  { mode: 'scenario', caseStudyId: 'northwind-operations', topic: 'Identity',
    q: 'Only Pilot group members may join devices to Entra ID, and users must verify join with a mobile phone. Which Device settings apply?',
    options: ['All users may join; MFA optional', 'Selected users may join; Require MFA to join devices', 'All users may join; Require MFA', 'Selected users may join; MFA optional'],
    correct: 1,
    explain: 'Selected limits join to assigned groups (Pilot). Require MFA to join enforces phone verification at registration.'
  },
  { mode: 'scenario', caseStudyId: 'northwind-operations', topic: 'Networking',
    q: 'Before redesigning VM3 connectivity, you must confirm whether NSGs are blocking traffic. What should you use first?',
    options: ['Azure Advisor', 'IP flow verify in NSG (or Network Watcher connectivity check)', 'Delete and recreate VM3', 'ExpressRoute circuit reset'],
    correct: 1,
    explain: 'IP flow verify tests if NSG rules allow/deny specific flows—fastest way to validate NSG-related issues.'
  },
  { mode: 'scenario', caseStudyId: 'northwind-operations', topic: 'Networking',
    q: 'VM1 must communicate with VM4 with minimal administrative effort. What should you do?',
    options: ['Assign public IPs to both VMs', 'Ensure NSGs allow required ports on subnets/NICs (or peer/route if separate VNets)', 'Move both VMs to different regions', 'Disable all NSG rules'],
    correct: 1,
    explain: 'Usually adjust NSG allow rules or VNet peering—minimal change vs rebuilding network architecture.'
  },
  { mode: 'scenario', caseStudyId: 'northwind-operations', topic: 'Identity',
    q: 'You need a custom Role1: read monitoring and restart VMs in RG-Ops only. What do you create first?',
    options: ['Owner assignment at subscription', 'Custom role definition with actions Microsoft.Insights/*/Read and Microsoft.Compute/virtualMachines/restart/action at RG-Ops scope', 'Global Administrator for all users', 'Storage Blob Data Owner'],
    correct: 1,
    explain: 'Custom role definition lists allowed actions; assign at RG-Ops scope. Use Get-AzProviderOperation to find exact actions.'
  },
  { mode: 'scenario', caseStudyId: 'northwind-operations', topic: 'Governance',
    q: 'Finance department VM tagging and shutdown schedules must be automated per technical requirements. What should you recommend?',
    options: ['Manual spreadsheet tracking', 'Azure Policy (modify/append tags) plus Automation runbook or Start/Stop VM schedules', 'Delete finance VMs nightly', 'Disable Policy'],
    correct: 1,
    explain: 'Policy enforces tags; Automation/Start-Stop VMs handles scheduled deallocate for cost control.'
  },
  { mode: 'scenario', caseStudyId: 'northwind-operations', topic: 'Networking',
    q: 'New York office needs resilient hybrid connectivity in addition to existing Chicago VPN. What combination meets typical compliance designs?',
    options: ['P2S only', 'Second site-to-site VPN or ExpressRoute with redundant paths / dual VPN gateways where required', 'Public RDP to VMs', 'Blob storage firewall only'],
    correct: 1,
    explain: 'Redundant hybrid paths (dual VPN, ExpressRoute + VPN backup) improve availability for branch offices.'
  },
  { mode: 'scenario', caseStudyId: 'northwind-operations', topic: 'Backup',
    q: 'You enable Azure Backup for VMs in production. The Recovery Services vault must be placed:',
    options: ['In any region worldwide', 'In the same region as protected VMs (best practice for performance/compliance)', 'Only in a management group', 'Inside a Blob container'],
    correct: 1,
    explain: 'Vault in same region as primary workloads avoids cross-region backup traffic issues unless by design.'
  },
  { mode: 'scenario', caseStudyId: 'northwind-operations', topic: 'Monitoring',
    q: 'Central SecOps needs VM performance and dependency maps in Log Analytics. What enables VM insights?',
    options: ['Advisor only', 'Azure Monitor Agent (or legacy MMA) + data collection rule to workspace', 'Disable diagnostics', 'Resource lock ReadOnly only'],
    correct: 1,
    explain: 'AMA/DCR sends metrics/logs to workspace; VM insights solution visualizes performance and dependencies.'
  },

  { mode: 'scenario', caseStudyId: 'fabrikam-research', topic: 'Governance',
    q: 'User1 must create initiative definitions; User4 assigns initiatives only to RG2. Which roles?',
    options: ['Both Owner', 'User1: Resource Policy Contributor (or custom); User4: Resource Policy Contributor at RG2 scope', 'Both Reader', 'User4: Global Administrator'],
    correct: 1,
    explain: 'Initiative authoring vs assignment at scope—Resource Policy Contributor can define/assign per Microsoft guidance.'
  },
  { mode: 'scenario', caseStudyId: 'fabrikam-research', topic: 'Storage',
    q: 'container1 (blob containers) and share1 (SMB file share) need appropriate storage accounts. Which pairing?',
    options: ['Files account for both', 'GPv2 storage account for blob containers; Azure Files storage account for share1', 'Queue storage for both', 'Premium block blob for SMB'],
    correct: 1,
    explain: 'Blob containers live in general-purpose v2; Azure Files provides SMB shares.'
  },
  { mode: 'scenario', caseStudyId: 'fabrikam-research', topic: 'Storage',
    q: 'storage5 must support planned geo-redundant replication and large file shares. What do you configure?',
    options: ['LRS Blob only', 'Storage account with GRS/GZRS and Azure Files large file share feature (quota tier as required)', 'Table storage', 'Queue only'],
    correct: 1,
    explain: 'GRS/GZRS for DR; Files premium/standard supports large shares depending on performance needs.'
  },
  { mode: 'scenario', caseStudyId: 'fabrikam-research', topic: 'Backup',
    q: 'Lab VMs need daily backup with 30-day retention and protection against accidental vault deletion. Configure:',
    options: ['Snapshot manual only', 'Backup policy on RSV + enable soft delete on the vault', 'Cool tier lifecycle', 'Delete VMs weekly'],
    correct: 1,
    explain: 'Backup policy defines schedule/retention; soft delete protects backup data from immediate permanent loss.'
  },
  { mode: 'scenario', caseStudyId: 'fabrikam-research', topic: 'Monitoring',
    q: 'Alert when lab VM CPU exceeds 85% for 15 minutes. What do you create?',
    options: ['Advisor recommendation only', 'Metric alert on Percentage CPU with 15-minute aggregation + action group', 'Activity log alert only', 'Resource lock'],
    correct: 1,
    explain: 'Platform metric alert on VM CPU with average duration condition; action group notifies team.'
  },
  { mode: 'scenario', caseStudyId: 'fabrikam-research', topic: 'Governance',
    q: 'Deny resource creation outside approved regions at management group level. Policy effect?',
    options: ['Audit', 'Deny on Microsoft.Resources/subscriptions/resourceGroups/resources with allowed locations', 'Append tag only', 'DeployIfNotExists for VMs only'],
    correct: 1,
    explain: 'Deny effect blocks non-compliant deployments in disallowed regions.'
  },
  { mode: 'scenario', caseStudyId: 'fabrikam-research', topic: 'Monitoring',
    q: 'VMs in North Europe must send diagnostics to workspace in West Europe. What do you configure on each VM?',
    options: ['Only Activity Log', 'Diagnostic settings (or DCR) forwarding metrics/logs to the Log Analytics workspace', 'Advisor', 'ExpressRoute'],
    correct: 1,
    explain: 'Diagnostic settings/DCR route platform and guest data to workspace across regions if allowed.'
  },
  { mode: 'scenario', caseStudyId: 'fabrikam-research', topic: 'Backup',
    q: 'App1 moving to Azure needs daily backups of VM and file data. Minimum implementation?',
    options: ['AzCopy nightly', 'Azure Backup policies for VM and Azure Files share to RSV', 'Snapshot public share', 'Archive tier only'],
    correct: 1,
    explain: 'RSV policies protect IaaS VM and Azure Files workloads with scheduled retention.'
  }
];
