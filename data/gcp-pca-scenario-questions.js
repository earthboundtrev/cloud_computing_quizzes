/**
 * PCA case-study scenario questions (mode: scenario, caseStudyId required).
 * Prefix in UI matches exam wording: "For this question, refer to the … case study."
 */
window.QUESTION_BANK_GCP_PCA_SCENARIOS = [
  // === EHR HEALTHCARE CASE STUDY ===
  { mode: 'scenario', caseStudyId: 'ehr-healthcare', topic: 'Hybrid connectivity',
    q: 'EHR must connect hospital on-premises systems to Google Cloud with high bandwidth and strong security. Which approach best meets the requirement?',
    options: ['Public IP on every VM', 'Cloud Interconnect (or Partner Interconnect) with Cloud Router BGP', 'Cloud CDN only', 'Cloud DNS public zones only'],
    correct: 1,
    explain: 'Dedicated interconnect (or partner) plus Cloud Router is the standard high-throughput private hybrid path; VPN is an alternative when bandwidth is lower.'
  },
  { mode: 'scenario', caseStudyId: 'ehr-healthcare', topic: 'Availability',
    q: 'Clinician-facing services need 99.9% availability across regions. What architecture should EHR prioritize?',
    options: ['Single zonal VM', 'Multi-region deployment behind a global external HTTPS load balancer with health checks', 'Cloud NAT only', 'One preemptible VM per region'],
    correct: 1,
    explain: 'Global HTTPS LB plus multi-region backends and health checks supports HA and failover patterns for customer-facing tiers.'
  },
  { mode: 'scenario', caseStudyId: 'ehr-healthcare', topic: 'Databases',
    q: 'EHR wants managed MySQL and SQL Server with automated backups and patching. Which service?',
    options: ['Self-managed VMs only', 'Cloud SQL', 'Bigtable', 'Firestore'],
    correct: 1,
    explain: 'Cloud SQL provides managed relational databases (MySQL, PostgreSQL, SQL Server) with HA options.'
  },
  { mode: 'scenario', caseStudyId: 'ehr-healthcare', topic: 'Analytics',
    q: 'Population health reporting on large de-identified datasets should use which analytics store?',
    options: ['Cloud Storage Standard only', 'BigQuery', 'Memorystore', 'Cloud DNS'],
    correct: 1,
    explain: 'BigQuery is the serverless warehouse for large-scale SQL analytics on structured and semi-structured data.'
  },
  { mode: 'scenario', caseStudyId: 'ehr-healthcare', topic: 'Operations',
    q: 'EHR needs centralized metrics, logs, and alerting across cloud and hybrid workloads. Which suite?',
    options: ['Cloud Storage lifecycle rules', 'Google Cloud Observability (Cloud Monitoring and Cloud Logging)', 'Cloud Armor only', 'Secret Manager only'],
    correct: 1,
    explain: 'Cloud Monitoring and Cloud Logging (Ops Agent on VMs) provide unified observability and alerting.'
  },
  { mode: 'scenario', caseStudyId: 'ehr-healthcare', topic: 'DevOps',
    q: 'Container CI/CD with private image storage for microservices should use:',
    options: ['Public Docker Hub only', 'Cloud Build and Artifact Registry', 'Cloud SQL export', 'VPC peering delete'],
    correct: 1,
    explain: 'Cloud Build runs pipelines; Artifact Registry stores OCI images with IAM—standard CI/CD for GKE/Cloud Run.'
  },
  { mode: 'scenario', caseStudyId: 'ehr-healthcare', topic: 'Security',
    q: 'Engineers must SSH to Linux VMs without distributing shared keys; access tied to corporate identity.',
    options: ['OS Login with IAM', 'Store SSH keys in Cloud Storage', 'Disable firewall rules', 'Grant roles/owner to allUsers'],
    correct: 0,
    explain: 'OS Login maps IAM identities to Linux accounts and reduces long-lived SSH key sprawl.'
  },
  { mode: 'scenario', caseStudyId: 'ehr-healthcare', topic: 'Compliance',
    q: 'PHI workloads must remain in US regions and limit exfiltration to unauthorized services. Which controls help?',
    options: ['Only default encryption', 'Resource location org constraints plus VPC Service Controls perimeters', 'Public buckets with ACLs', 'Disable audit logs'],
    correct: 1,
    explain: 'Org policies can restrict regions; VPC SC limits which Google APIs/resources data can reach outside the perimeter.'
  },

  // === MOUNTKIRK GAMES CASE STUDY ===
  { mode: 'scenario', caseStudyId: 'mountkirk-games', topic: 'Analytics platform',
    q: 'The Game Analytics Platform must ingest millions of events per minute and scale with player activity. Which pairing is most appropriate?',
    options: ['Batch FTP to NAS nightly', 'Pub/Sub for ingestion plus Dataflow or BigQuery streaming for processing', 'Single MySQL instance', 'Cloud DNS only'],
    correct: 1,
    explain: 'Pub/Sub decouples producers; Dataflow/BigQuery handle high-volume stream processing and analytics scale.'
  },
  { mode: 'scenario', caseStudyId: 'mountkirk-games', topic: 'Compute',
    q: 'New player services should run on managed Kubernetes with minimal node operations. What should Mountkirk use?',
    options: ['GKE Autopilot or GKE Standard with node auto-provisioning', 'One large bare-metal server', 'App Engine only for all game UDP traffic', 'Cloud Storage buckets as compute'],
    correct: 0,
    explain: 'GKE (Autopilot especially) delivers managed Kubernetes; autoscaling node pools handle launch spikes.'
  },
  { mode: 'scenario', caseStudyId: 'mountkirk-games', topic: 'Testing',
    q: 'Mountkirk wants a new testing strategy for GCP backends that improves on prior platforms. Which principle aligns with the case requirements?',
    options: ['Unit tests are no longer required', 'Tests should scale well beyond prior approaches (load, integration, and environment parity)', 'Test only in production after release', 'Avoid any infrastructure-level validation'],
    correct: 1,
    explain: 'The case calls for scaled-up testing vs legacy platforms—broader automation and pre-prod validation, not production-only testing.'
  },
  { mode: 'scenario', caseStudyId: 'mountkirk-games', topic: 'Availability',
    q: 'Top titles need multi-region active serving with automatic failover. Which component is central?',
    options: ['Zonal persistent disk only', 'Global external HTTPS load balancer with backends in multiple regions', 'Cloud NAT', 'Serial port logging'],
    correct: 1,
    explain: 'Global HTTP(S) LB distributes traffic and health-checks regional backend services for failover.'
  },
  { mode: 'scenario', caseStudyId: 'mountkirk-games', topic: 'Databases',
    q: 'Player profile MySQL must survive zone failure within a region with managed failover.',
    options: ['Single-zone Cloud SQL', 'Regional HA Cloud SQL instance', 'Export CSV hourly only', 'Local SSD on one VM'],
    correct: 1,
    explain: 'Regional HA Cloud SQL maintains a standby in another zone for automatic failover.'
  },
  { mode: 'scenario', caseStudyId: 'mountkirk-games', topic: 'Cost',
    q: 'Between game launches, analytics and batch clusters sit mostly idle. How should Mountkirk minimize cost?',
    options: ['Always-on maximum-size clusters', 'Ephemeral Dataproc or GKE workloads with autoscaling and teardown after jobs', 'Purchase 5-year commits for peak size only', 'Disable all monitoring'],
    correct: 1,
    explain: 'Ephemeral analytics clusters and scale-to-zero/serverless patterns match spiky game traffic and idle periods.'
  },
  { mode: 'scenario', caseStudyId: 'mountkirk-games', topic: 'Operations',
    q: 'Live ops needs near-real-time dashboards during launches plus historical warehouse analysis.',
    options: ['Spreadsheets only', 'Cloud Monitoring dashboards for live metrics; BigQuery for historical analytics', 'Cloud DNS traffic policies', 'Disable logging to save cost'],
    correct: 1,
    explain: 'Monitoring for real-time ops; BigQuery (fed by the analytics pipeline) for historical queries and reporting.'
  },
  { mode: 'scenario', caseStudyId: 'mountkirk-games', topic: 'Security',
    q: 'Internal engineers should access production GKE without shared kubeconfig keys on laptops.',
    options: ['Embed admin credentials in game client', 'Identity-Aware Proxy for GKE or authorized networks plus IAM/GKE RBAC', 'Open kube-apiserver to 0.0.0.0/0', 'Store keys in a public bucket'],
    correct: 1,
    explain: 'IAP and RBAC provide identity-based access; avoid exposing the API server broadly or embedding secrets in clients.'
  }
];
