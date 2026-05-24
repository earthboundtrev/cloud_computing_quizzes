window.QUESTION_BANK_CISSP_SCENARIOS = [
  { mode: 'scenario', caseStudyId: 'regional-hospital', topic: 'Security Operations',
    q: 'What should the incident response team do FIRST?',
    options: ['Pay the ransom to restore operations immediately', 'Contain spread (isolate affected segments) and preserve evidence', 'Publish full patient data list to the media', 'Reformat all workstations without logging'],
    correct: 1,
    explain: 'First = stop bleeding: containment and evidence preservation before eradication/recovery.'
  },
  { mode: 'scenario', caseStudyId: 'regional-hospital', topic: 'Security Operations',
    q: 'After containment, what is the BEST next step for clinical continuity while investigations continue?',
    options: ['Shut down the patient portal indefinitely', 'Restore critical systems from verified backups following IR playbooks', 'Disable all backups', 'Allow unrestricted admin access for speed'],
    correct: 1,
    explain: 'Next = recover critical services using trusted backups while maintaining chain of custody.'
  },
  { mode: 'scenario', caseStudyId: 'regional-hospital', topic: 'Risk Management',
    q: 'Which role is MOST LIKELY responsible for determining whether breach notification is required?',
    options: ['Network technician', 'Privacy officer / legal with data owner input', 'Help desk intern', 'Facilities manager'],
    correct: 1,
    explain: 'Breach notification ties to legal/privacy obligations; data owners classify impact.'
  },
  { mode: 'scenario', caseStudyId: 'regional-hospital', topic: 'Asset Security',
    q: 'Backup tapes from last week might hold malware-free data. What control BEST supports integrity of restore data?',
    options: ['Restore without verification', 'Test restores and verify checksums / isolated validation before production cutover', 'Delete all backups', 'Email backups to vendors'],
    correct: 1,
    explain: 'Validate backup integrity offline before trusting for production restore.'
  },
  { mode: 'scenario', caseStudyId: 'regional-hospital', topic: 'Communications',
    q: 'Media inquiries arrive. What is the BEST action for the security team?',
    options: ['Answer technical details on live TV', 'Route statements through designated communications/legal per IR plan', 'Share raw disk images', 'Ignore all external contact'],
    correct: 1,
    explain: 'Centralized communications prevents inconsistent disclosures during incidents.'
  },
  { mode: 'scenario', caseStudyId: 'regional-hospital', topic: 'Identity',
    q: 'The compromised service account had broad domain admin rights. What LONG-TERM fix is BEST?',
    options: ['Share one password for all admins', 'Least privilege, MFA, and privileged access management for service accounts', 'Disable logging', 'Remove all service accounts'],
    correct: 1,
    explain: 'Least privilege + MFA/PAM reduces blast radius of credential compromise.'
  },

  { mode: 'scenario', caseStudyId: 'northwind-acquisition', topic: 'Risk Management',
    q: 'A gap cannot be remediated before close. What is the BEST risk treatment?',
    options: ['Ignore the gap', 'Document risk acceptance with owner sign-off and compensating controls', 'Delete audit logs', 'Grant startup admins domain admin in production bank network'],
    correct: 1,
    explain: 'Residual risk requires explicit acceptance and compensating controls when mitigation is infeasible.'
  },
  { mode: 'scenario', caseStudyId: 'northwind-acquisition', topic: 'Software Development',
    q: 'What should be required BEFORE the startup’s code deploys to integrated production?',
    options: ['No testing for speed', 'Secure SDLC gates: SAST/DAST, peer review, and change approval', 'Deploy only on Fridays', 'Public GitHub for secrets'],
    correct: 1,
    explain: 'Secure SDLC enforces security checkpoints prior to production release.'
  },
  { mode: 'scenario', caseStudyId: 'northwind-acquisition', topic: 'Third Party',
    q: 'The startup’s chat SaaS stores conversation logs indefinitely. What is the BEST due-diligence outcome?',
    options: ['No contract changes', 'Contractual retention limits, DPA, and right-to-audit aligned to Northwind policy', 'Disable encryption', 'Merge all customer data into one bucket'],
    correct: 1,
    explain: 'Third-party risk requires contractual data protection and audit rights.'
  },
  { mode: 'scenario', caseStudyId: 'northwind-acquisition', topic: 'Identity',
    q: 'Missing MFA on admin consoles is discovered. What is the FIRST remediation priority?',
    options: ['Enable MFA for all privileged and admin access before integration cutover', 'Disable all admin accounts permanently', 'Publish passwords in wiki', 'Remove PCI compliance'],
    correct: 0,
    explain: 'First close critical auth gaps on privileged access before go-live.'
  },
  { mode: 'scenario', caseStudyId: 'northwind-acquisition', topic: 'Governance',
    q: 'Which document BEST captures mandatory security requirements the startup must meet post-acquisition?',
    options: ['Informal chat message', 'Security standards derived from policy, mapped to PCI and privacy obligations', 'Marketing brochure', 'Employee vacation policy'],
    correct: 1,
    explain: 'Standards translate policy into enforceable requirements for acquired entities.'
  },
  { mode: 'scenario', caseStudyId: 'northwind-acquisition', topic: 'Assessment',
    q: 'Leadership wants ongoing assurance after integration. What is the BEST approach?',
    options: ['One-time pen test only', 'Continuous monitoring, periodic assessments, and metrics to the risk committee', 'No assessments to save cost', 'Trust vendor marketing PDFs'],
    correct: 1,
    explain: 'Ongoing assessment and reporting sustains governance after M&A.'
  }
];
