window.QUESTION_BANK_AWS_GENAI_SCENARIOS = [
  { mode: 'scenario', caseStudyId: 'multi-tenant-rag', topic: 'Architecture',
    q: 'Which architecture BEST meets strict tenant isolation for thousands of customers?',
    options: ['One shared OpenSearch index with no ACLs', 'Separate Bedrock Knowledge Bases (or collections) per tenant with IAM-scoped access and KMS encryption', 'Public S3 bucket for all manuals', 'Run models only on laptops'],
    correct: 1,
    explain: 'Per-tenant KB/index boundaries + IAM/KMS enforce isolation at scale.'
  },
  { mode: 'scenario', caseStudyId: 'multi-tenant-rag', topic: 'Ingestion',
    q: 'When customers upload revised PDFs, embeddings should update:',
    options: ['Rebuild entire platform nightly only', 'Incremental sync jobs into the Knowledge Base / vector store for changed objects', 'Delete all tenants', 'Disable versioning'],
    correct: 1,
    explain: 'Incremental ingestion keeps embeddings current without full rebuilds.'
  },
  { mode: 'scenario', caseStudyId: 'multi-tenant-rag', topic: 'Safety',
    q: 'Unsafe or off-topic model outputs should be reduced with:',
    options: ['No controls', 'Amazon Bedrock Guardrails (content filters, denied topics, PII filters)', 'Hard-coded API keys in JS', 'Public endpoints without auth'],
    correct: 1,
    explain: 'Guardrails filter harmful or non-compliant generations at inference.'
  },
  { mode: 'scenario', caseStudyId: 'multi-tenant-rag', topic: 'Auth',
    q: 'Internal and external users need centralized auth to the app:',
    options: ['Shared admin password', 'Amazon Cognito (or federated IdP) with tenant claims mapped to IAM/KB access', 'API keys in mobile app binary', 'Disable TLS'],
    correct: 1,
    explain: 'Cognito/federation provides tenant-aware identity for the assistant.'
  },
  { mode: 'scenario', caseStudyId: 'multi-tenant-rag', topic: 'Operations',
    q: 'Latency and token cost spikes should be tracked via:',
    options: ['CloudWatch metrics on Bedrock invocations + application tracing', 'Paper logs only', 'S3 Glacier', 'WAF only'],
    correct: 0,
    explain: 'Observability on model calls supports SLOs and cost control.'
  },
  { mode: 'scenario', caseStudyId: 'multi-tenant-rag', topic: 'Models',
    q: 'Choosing models per tenant tier (fast vs capable) is done with:',
    options: ['Single largest model for everyone always', 'Bedrock model IDs / inference profiles selected by tenant SLA and routing logic', 'Host weights on EC2 manually', 'Email PDFs to users'],
    correct: 1,
    explain: 'Route requests to appropriate FMs/inference profiles per tier.'
  },

  { mode: 'scenario', caseStudyId: 'apex-financial-rag', topic: 'Retrieval',
    q: 'Summaries miss nuance despite relevant chunks. What improves quality FIRST?',
    options: ['Lower temperature only', 'Tune chunking, metadata filters, and hybrid retrieval; refine system prompts with domain instructions', 'Remove guardrails', 'Use smaller context window'],
    correct: 1,
    explain: 'Retrieval quality and prompt design drive financial nuance more than temperature alone.'
  },
  { mode: 'scenario', caseStudyId: 'apex-financial-rag', topic: 'Security',
    q: 'PII must be blocked in prompts and responses. Which combination applies?',
    options: ['Macie/Comprehend PII detection on ingest + Bedrock Guardrails at inference', 'Store all filings public', 'Disable logging for privacy', 'Share root credentials'],
    correct: 0,
    explain: 'Detect PII in data pipeline; guardrails block sensitive content at generation.'
  },
  { mode: 'scenario', caseStudyId: 'apex-financial-rag', topic: 'Ingestion',
    q: 'Complex PDF diagrams fail ingestion. Resilient processing uses:',
    options: ['Ignore failures', 'Bedrock Knowledge Bases with OCR/layout parsing, DLQ/retry on failed documents', 'Delete S3 bucket', 'Only plain text uploads'],
    correct: 1,
    explain: 'Managed KB ingestion with retries handles difficult PDFs; monitor failures.'
  },
  { mode: 'scenario', caseStudyId: 'apex-financial-rag', topic: 'Audit',
    q: 'All queries must be auditable. What should you enable?',
    options: ['No logs', 'CloudTrail for API calls + application logs of prompts/responses stored securely with retention policy', 'Public CloudWatch dashboard', 'Disable KMS'],
    correct: 1,
    explain: 'API audit trails plus app-level query logs satisfy financial audit needs.'
  },
  { mode: 'scenario', caseStudyId: 'apex-financial-rag', topic: 'Access',
    q: 'Bedrock and S3 access from the app should use:',
    options: ['Long-lived IAM user keys in code', 'IAM roles with least privilege; no keys in repositories', 'Bucket public read', 'Root account for Lambda'],
    correct: 1,
    explain: 'Roles and short-lived credentials reduce secret sprawl.'
  },
  { mode: 'scenario', caseStudyId: 'apex-financial-rag', topic: 'Evaluation',
    q: 'Before promoting prompt changes, measure quality with:',
    options: ['Guesswork', 'Human review sets + RAG evaluation metrics (faithfulness/relevance) on sample filings', 'Disable testing', 'Only latency tests'],
    correct: 1,
    explain: 'Structured eval on representative 10-K samples validates prompt/retrieval changes.'
  }
];
