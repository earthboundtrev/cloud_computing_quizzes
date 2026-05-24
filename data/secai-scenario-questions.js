window.QUESTION_BANK_SECAI_SCENARIOS = [
  { mode: 'scenario', caseStudyId: 'customer-chatbot', topic: 'Securing AI Systems',
    q: 'What should be implemented FIRST to reduce prompt injection impact?',
    options: ['Publish system prompt on website', 'Hardened system prompts, input/output filtering, and tool/API allowlists with least privilege', 'Disable all logging', 'Give model full admin API access'],
    correct: 1,
    explain: 'Layered prompt defenses + constrained tools limit injection blast radius (OWASP LLM01).'
  },
  { mode: 'scenario', caseStudyId: 'customer-chatbot', topic: 'Securing AI Systems',
    q: 'Attackers attempt high-volume injection probes. What control helps MOST?',
    options: ['Per-user/session rate limits and anomaly detection on prompt patterns', 'Remove HTTPS', 'Email transcripts to attackers', 'Disable MFA for admins'],
    correct: 0,
    explain: 'Rate limiting and behavioral detection throttle automated abuse.'
  },
  { mode: 'scenario', caseStudyId: 'customer-chatbot', topic: 'Securing AI Systems',
    q: 'Logs currently store raw prompts with customer PII. What is the BEST fix?',
    options: ['Log everything publicly', 'Redact/mask sensitive fields; restrict log access; define retention', 'Delete application', 'Turn off encryption'],
    correct: 1,
    explain: 'Logging hygiene reduces disclosure if logs are accessed.'
  },
  { mode: 'scenario', caseStudyId: 'customer-chatbot', topic: 'AI-Assisted Security',
    q: 'SOC wants summarized alerts tied to chatbot abuse. Which approach fits SecAI+ practice?',
    options: ['AI-assisted alert triage with human analyst review of high-risk sessions', 'Fully automated blocking with no review', 'Ignore SIEM', 'Share admin passwords with model'],
    correct: 0,
    explain: 'Human-in-the-loop AI assists triage; critical actions stay reviewed.'
  },
  { mode: 'scenario', caseStudyId: 'customer-chatbot', topic: 'AI Governance',
    q: 'Which policy element is MOST appropriate for this deployment?',
    options: ['Allow any employee to paste customer data into public LLMs', 'Sanctioned model list, prohibited data classes in prompts, and incident playbooks for LLM abuse', 'No acceptable use policy', 'Disable vendor contracts'],
    correct: 1,
    explain: 'Governance defines allowed models, data handling, and response procedures.'
  },
  { mode: 'scenario', caseStudyId: 'customer-chatbot', topic: 'Securing AI Systems',
    q: 'Jailbreak strings bypass simple keyword filters. What additional layer helps?',
    options: ['Output-only TLS', 'Semantic/classifier-based guardrails plus periodic red-teaming', 'Remove authentication', 'Store API keys in prompts'],
    correct: 1,
    explain: 'Modern guardrails and red-team exercises address evasive jailbreaks.'
  },

  { mode: 'scenario', caseStudyId: 'rag-poisoning', topic: 'Securing AI Systems',
    q: 'Hidden instructions were found in vendor PDFs. What ingestion control is BEST?',
    options: ['Trust all third-party content', 'Content sanitization, provenance tracking, and allowlisted sources before embedding', 'Index hourly without review', 'Disable antivirus'],
    correct: 1,
    explain: 'Validate and track corpus sources to mitigate data poisoning (LLM04).'
  },
  { mode: 'scenario', caseStudyId: 'rag-poisoning', topic: 'Securing AI Systems',
    q: 'After discovery, what should happen to affected embeddings?',
    options: ['Leave index unchanged', 'Quarantine/remove poisoned chunks and rebuild from verified corpus snapshots', 'Email vectors to users', 'Publish index publicly'],
    correct: 1,
    explain: 'Remove poisoned vectors and re-embed from known-good sources.'
  },
  { mode: 'scenario', caseStudyId: 'rag-poisoning', topic: 'AI Governance',
    q: 'Third-party AI training/retrieval data should be governed by:',
    options: ['Verbal agreement only', 'Vendor risk assessment, data processing agreements, and integrity checksums on bundles', 'No contracts', 'Shared root passwords'],
    correct: 1,
    explain: 'Supply-chain governance covers vendor AI data risks.'
  },
  { mode: 'scenario', caseStudyId: 'rag-poisoning', topic: 'Securing AI Systems',
    q: 'Analysts still need the assistant. What availability-focused control applies?',
    options: ['Shut down forever', 'Rollback to last known-good index version while investigating', 'Delete all analysts', 'Disable backups'],
    correct: 1,
    explain: 'Rollback restores service from trusted snapshot during incident handling.'
  },
  { mode: 'scenario', caseStudyId: 'rag-poisoning', topic: 'Basic AI Concepts',
    q: 'This attack primarily targets which weakness?',
    options: ['Physical data center cooling', 'Training/retrieval data integrity (poisoning)', 'DNS TTL', 'Printer drivers'],
    correct: 1,
    explain: 'Poisoned documents manipulate RAG context—data integrity issue.'
  },
  { mode: 'scenario', caseStudyId: 'rag-poisoning', topic: 'AI-Assisted Security',
    q: 'Ongoing assurance should include:',
    options: ['No testing', 'Scheduled corpus diff reviews and automated scans for suspicious instruction patterns', 'Only annual pen test of printers', 'Disable monitoring to save cost'],
    correct: 1,
    explain: 'Continuous corpus monitoring catches poisoning attempts earlier.'
  }
];
