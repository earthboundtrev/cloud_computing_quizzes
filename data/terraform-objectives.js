/**
 * HashiCorp Certified: Terraform Associate (004) — exam content list
 * Terraform 1.12 • Verified: developer.hashicorp.com (2026-10-18)
 * https://developer.hashicorp.com/terraform/tutorials/certification-004/associate-review-004
 */
window.OBJECTIVES = [
  // Domain 1 — Infrastructure as Code (IaC) with Terraform
  { id: '1a', domain: 1, title: 'Explain what IaC is', weight: null },
  { id: '1b', domain: 1, title: 'Describe advantages of IaC patterns', weight: null },
  { id: '1c', domain: 1, title: 'Multi-cloud, hybrid cloud, and service-agnostic workflows', weight: null },

  // Domain 2 — Terraform fundamentals
  { id: '2a', domain: 2, title: 'Install and version Terraform providers', weight: null },
  { id: '2b', domain: 2, title: 'How Terraform uses providers', weight: null },
  { id: '2c', domain: 2, title: 'Configuration using multiple providers', weight: null },
  { id: '2d', domain: 2, title: 'How Terraform uses and manages state', weight: null },

  // Domain 3 — Core Terraform workflow
  { id: '3a', domain: 3, title: 'Describe the Terraform workflow', weight: null },
  { id: '3b', domain: 3, title: 'Initialize a working directory (init)', weight: null },
  { id: '3c', domain: 3, title: 'Validate configuration', weight: null },
  { id: '3d', domain: 3, title: 'Generate and review an execution plan', weight: null },
  { id: '3e', domain: 3, title: 'Apply changes to infrastructure', weight: null },
  { id: '3f', domain: 3, title: 'Destroy Terraform-managed infrastructure', weight: null },
  { id: '3g', domain: 3, title: 'Formatting and style (fmt)', weight: null },

  // Domain 4 — Terraform configuration
  { id: '4a', domain: 4, title: 'resource vs data blocks', weight: null },
  { id: '4b', domain: 4, title: 'Resource attributes and cross-resource references', weight: null },
  { id: '4c', domain: 4, title: 'Variables and outputs', weight: null },
  { id: '4d', domain: 4, title: 'Complex types', weight: null },
  { id: '4e', domain: 4, title: 'Dynamic configuration (expressions and functions)', weight: null },
  { id: '4f', domain: 4, title: 'Resource dependencies (depends_on, lifecycle)', weight: null },
  { id: '4g', domain: 4, title: 'Custom conditions (validation, checks)', weight: null },
  { id: '4h', domain: 4, title: 'Sensitive data, ephemeral values, write-only arguments', weight: null },

  // Domain 5 — Terraform modules
  { id: '5a', domain: 5, title: 'How Terraform sources modules', weight: null },
  { id: '5b', domain: 5, title: 'Variable scope within modules', weight: null },
  { id: '5c', domain: 5, title: 'Use modules in configuration', weight: null },
  { id: '5d', domain: 5, title: 'Manage module versions', weight: null },

  // Domain 6 — Terraform state management
  { id: '6a', domain: 6, title: 'Local backend', weight: null },
  { id: '6b', domain: 6, title: 'State locking', weight: null },
  { id: '6c', domain: 6, title: 'Remote state (backend block)', weight: null },
  { id: '6d', domain: 6, title: 'Drift, refresh-only, moved and removed blocks', weight: null },

  // Domain 7 — Maintain infrastructure with Terraform
  { id: '7a', domain: 7, title: 'Import existing infrastructure', weight: null },
  { id: '7b', domain: 7, title: 'CLI state inspection', weight: null },
  { id: '7c', domain: 7, title: 'Verbose logging (TF_LOG)', weight: null },

  // Domain 8 — HCP Terraform
  { id: '8a', domain: 8, title: 'Use HCP Terraform to create infrastructure', weight: null },
  { id: '8b', domain: 8, title: 'Collaboration and governance on HCP', weight: null },
  { id: '8c', domain: 8, title: 'Organize workspaces and projects', weight: null },
  { id: '8d', domain: 8, title: 'Configure HCP Terraform integration (CLI, login, migrate)', weight: null }
];
