/**
 * AZ-305 case-study questions (mode: scenario). Fictitious design scenarios.
 */
window.QUESTION_BANK_AZ305_SCENARIOS = [
  { mode: 'scenario', caseStudyId: 'litware-digital', topic: 'Data',
    q: 'DB1 and DB2 need SQL Agent, VNet isolation, minimal refactor, 15-minute RPO. How should they run in Azure?',
    options: ['SQL Database Basic tier', 'Azure SQL Managed Instance (Business Critical if zone HA required)', 'Cosmos DB', 'PostgreSQL Flexible Server only'],
    correct: 1,
    explain: 'SQL MI supports near-SQL Server features and VNet placement; Business Critical tier for HA/RPO needs.'
  },
  { mode: 'scenario', caseStudyId: 'litware-digital', topic: 'Compute',
    q: 'App1 web tier needs 99.95% SLA and seasonal scale. Recommended compute design?',
    options: ['Single VM', 'App Service (or VMSS) across zones behind Azure Load Balancer / App Gateway with autoscale', 'Batch account', 'Functions only'],
    correct: 1,
    explain: 'Multi-instance across zones with autoscale and LB health probes supports SLA and traffic spikes.'
  },
  { mode: 'scenario', caseStudyId: 'litware-digital', topic: 'Storage',
    q: 'App2 requires SMB-compatible shares in Azure with backup. Design?',
    options: ['Blob Hot containers only', 'Azure Files (premium if IOPS needed) + Azure Backup', 'Queue storage', 'Table API'],
    correct: 1,
    explain: 'Azure Files provides SMB; Backup policies protect share snapshots/restores.'
  },
  { mode: 'scenario', caseStudyId: 'litware-digital', topic: 'Identity',
    q: 'Partners sign in with their own corporate Entra tenants. Which capability?',
    options: ['B2C consumer pool only', 'Entra ID B2B collaboration with guest users', 'Local SQL logins only', 'Shared admin account'],
    correct: 1,
    explain: 'B2B allows external identities from partner tenants with consent and RBAC.'
  },
  { mode: 'scenario', caseStudyId: 'litware-digital', topic: 'Networking',
    q: 'PaaS traffic must avoid public internet from application VNet. Primary control?',
    options: ['Service tags only', 'Private endpoints for PaaS + Private DNS zones', 'Public endpoints with SAS', 'Open NSG 0.0.0.0'],
    correct: 1,
    explain: 'Private Link keeps traffic on Microsoft backbone between VNet and PaaS.'
  },
  { mode: 'scenario', caseStudyId: 'litware-digital', topic: 'Security',
    q: 'Auditors require customer-managed keys for data at rest next year. What do you plan now?',
    options: ['Disable encryption', 'Key Vault CMK for storage/SQL with rotation procedures', 'SAS in code', 'Cool tier only'],
    correct: 1,
    explain: 'CMK in Key Vault satisfies regulatory control over encryption keys.'
  },
  { mode: 'scenario', caseStudyId: 'litware-digital', topic: 'Cost',
    q: 'Baseline App1 compute is steady 3 years; analytics burst jobs tolerate eviction. Cost strategy?',
    options: ['Spot for App1 web tier', 'Reservations for baseline App1; Spot for burst analytics compute', 'Delete backups', 'Single region only'],
    correct: 1,
    explain: 'Reservations cover predictable cores; Spot for interruptible analytics.'
  },
  { mode: 'scenario', caseStudyId: 'litware-digital', topic: 'Monitoring',
    q: 'SecOps needs centralized posture and workload logs. Suite?',
    options: ['CSV export', 'Microsoft Defender for Cloud + Azure Monitor / Log Analytics', 'Only Advisor', 'Traffic Manager'],
    correct: 1,
    explain: 'Defender for Cloud = posture; Monitor/Log Analytics centralizes logs and alerts.'
  },

  { mode: 'scenario', caseStudyId: 'adventure-works-global', topic: 'Architecture',
    q: 'API must be active-active in two regions with externalized session state. Design?',
    options: ['Single VM with local disk sessions', 'Regional App Service/AKS behind Front Door + Azure Cache for Redis (geo-replicated tier as needed)', 'Batch only', 'Cool Blob sessions'],
    correct: 1,
    explain: 'Global load balancer + multi-region compute + shared Redis/SQL for session state.'
  },
  { mode: 'scenario', caseStudyId: 'adventure-works-global', topic: 'Data',
    q: 'Catalog needs global low-latency reads and strong consistency for inventory writes. Service?',
    options: ['Table Storage', 'Azure Cosmos DB with appropriate consistency level and multi-region writes where supported', 'Single SQL Basic', 'Queue'],
    correct: 1,
    explain: 'Cosmos DB supports global distribution; tune consistency (e.g., session/strong) per operation.'
  },
  { mode: 'scenario', caseStudyId: 'adventure-works-global', topic: 'Data',
    q: 'Clickstream at millions events/minute into a data lake. Ingestion design?',
    options: ['FTP to VM', 'Event Hubs (or IoT Hub) + Stream Analytics / Synapse pipeline to ADLS Gen2', 'Manual CSV', 'DNS only'],
    correct: 1,
    explain: 'Event Hubs scales for high throughput; process to ADLS for analytics.'
  },
  { mode: 'scenario', caseStudyId: 'adventure-works-global', topic: 'Security',
    q: 'Edge needs WAF and DDoS for public ecommerce. Combine:',
    options: ['NSG on subnet only', 'Azure Front Door (WAF policy) + DDoS Network Protection on VNets', 'Public RDP', 'Archive tier'],
    correct: 1,
    explain: 'Front Door WAF filters L7; DDoS Protection mitigates volumetric attacks.'
  },
  { mode: 'scenario', caseStudyId: 'adventure-works-global', topic: 'Governance',
    q: 'Dev subscriptions lack tags and location discipline. Enterprise fix?',
    options: ['Email reminders', 'Management groups with Policy initiatives (allowed locations, required tags)', 'Delete all dev subs', 'One Owner account'],
    correct: 1,
    explain: 'Landing zone governance via management group policies enforces guardrails at scale.'
  },
  { mode: 'scenario', caseStudyId: 'adventure-works-global', topic: 'BCDR',
    q: 'Automated regional failover for API and data within RTO targets. Foundation?',
    options: ['LRS only', 'ASR recovery plans + multi-region deployment + geo-redundant data services', 'Weekly manual backup tape', 'Stop all regions'],
    correct: 1,
    explain: 'ASR orchestrates failover; architecture must already replicate data/compute across regions.'
  },
  { mode: 'scenario', caseStudyId: 'adventure-works-global', topic: 'Security',
    q: 'Developers must pull secrets without Git credentials. Pattern?',
    options: ['Commit secrets to repo', 'Managed identity to Key Vault references in App Service/AKS', 'Public SAS forever', 'Local admin password'],
    correct: 1,
    explain: 'Managed identity + Key Vault integration removes long-lived secrets from code.'
  },
  { mode: 'scenario', caseStudyId: 'adventure-works-global', topic: 'Networking',
    q: 'Egress from spoke VNets must be inspected. Hub design?',
    options: ['Flat peering mesh', 'Hub VNet with Azure Firewall; UDR default route to firewall', 'Public IPs on all VMs', 'Disable routing'],
    correct: 1,
    explain: 'Hub-spoke with forced tunneling through Azure Firewall is standard inspection pattern.'
  }
];
