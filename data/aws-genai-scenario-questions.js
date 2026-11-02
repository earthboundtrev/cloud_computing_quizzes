window.QUESTION_BANK_AWS_GENAI_SCENARIOS = [
  {
    "mode": "scenario",
    "caseStudyId": "multi-tenant-rag",
    "topic": "Architecture",
    "q": "Which architecture BEST meets strict tenant isolation for thousands of customers?",
    "options": [
      "One shared OpenSearch index with no ACLs — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Separate Bedrock Knowledge Bases (or collections) per tenant with IAM-scoped access and KMS encryption",
      "Public S3 bucket for all manuals — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Run models only on laptops — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload"
    ],
    "correct": 1,
    "explain": "Per-tenant KB/index boundaries + IAM/KMS enforce isolation at scale.",
    "obj": "1",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/aws-certification/latest/examguides/gen-ai-developer-professional-01.html",
    "id": "genai-scenario-0001"
  },
  {
    "mode": "scenario",
    "caseStudyId": "multi-tenant-rag",
    "topic": "Ingestion",
    "q": "When customers upload revised PDFs, embeddings should update:",
    "options": [
      "Rebuild entire platform nightly only — not the recommended Bedrock approach here",
      "Incremental sync jobs into the Knowledge Base / vector store for changed objects",
      "Delete all tenants — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Disable versioning — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload"
    ],
    "correct": 1,
    "explain": "Incremental ingestion keeps embeddings current without full rebuilds.",
    "obj": "1",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/aws-certification/latest/examguides/gen-ai-developer-professional-01.html",
    "id": "genai-scenario-0002"
  },
  {
    "mode": "scenario",
    "caseStudyId": "multi-tenant-rag",
    "topic": "Safety",
    "q": "Unsafe or off-topic model outputs should be reduced with:",
    "options": [
      "No controls — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Amazon Bedrock Guardrails (content filters, denied topics, PII filters)",
      "Hard-coded API keys in JS — not the recommended Bedrock approach here",
      "Public endpoints without auth — not the recommended Bedrock approach here"
    ],
    "correct": 1,
    "explain": "Guardrails filter harmful or non-compliant generations at inference.",
    "obj": "3",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html",
    "id": "genai-scenario-0003"
  },
  {
    "mode": "scenario",
    "caseStudyId": "multi-tenant-rag",
    "topic": "Auth",
    "q": "Internal and external users need centralized auth to the app:",
    "options": [
      "Shared admin password — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Amazon Cognito (or federated IdP) with tenant claims mapped to IAM/KB access",
      "API keys in mobile app binary — not the recommended Bedrock approach here",
      "Disable TLS — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload"
    ],
    "correct": 1,
    "explain": "Cognito/federation provides tenant-aware identity for the assistant.",
    "obj": "3",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html",
    "id": "genai-scenario-0004"
  },
  {
    "mode": "scenario",
    "caseStudyId": "multi-tenant-rag",
    "topic": "Operations",
    "q": "Latency and token cost spikes should be tracked via:",
    "options": [
      "CloudWatch metrics on Bedrock invocations + application tracing",
      "Paper logs only — not the recommended Bedrock approach here",
      "S3 Glacier — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "WAF only — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload"
    ],
    "correct": 0,
    "explain": "Observability on model calls supports SLOs and cost control.",
    "obj": "5",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation.html",
    "id": "genai-scenario-0005"
  },
  {
    "mode": "scenario",
    "caseStudyId": "multi-tenant-rag",
    "topic": "Models",
    "q": "Choosing models per tenant tier (fast vs capable) is done with:",
    "options": [
      "Single largest model for everyone always — not the recommended Bedrock approach here",
      "Bedrock model IDs / inference profiles selected by tenant SLA and routing logic",
      "Host weights on EC2 manually — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Email PDFs to users — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload"
    ],
    "correct": 1,
    "explain": "Route requests to appropriate FMs/inference profiles per tier.",
    "obj": "1",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/aws-certification/latest/examguides/gen-ai-developer-professional-01.html",
    "id": "genai-scenario-0006"
  },
  {
    "mode": "scenario",
    "caseStudyId": "apex-financial-rag",
    "topic": "Retrieval",
    "q": "Summaries miss nuance despite relevant chunks. What improves quality FIRST?",
    "options": [
      "Lower temperature only — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Tune chunking, metadata filters, and hybrid retrieval; refine system prompts with domain instructions",
      "Remove guardrails — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Use smaller context window — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload"
    ],
    "correct": 1,
    "explain": "Retrieval quality and prompt design drive financial nuance more than temperature alone.",
    "obj": "2",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html",
    "id": "genai-scenario-0007"
  },
  {
    "mode": "scenario",
    "caseStudyId": "apex-financial-rag",
    "topic": "Security",
    "q": "PII must be blocked in prompts and responses. Which combination applies?",
    "options": [
      "Macie/Comprehend PII detection on ingest + Bedrock Guardrails at inference",
      "Store all filings public — not the recommended Bedrock approach here",
      "Disable logging for privacy — not the recommended Bedrock approach here",
      "Share root credentials — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload"
    ],
    "correct": 0,
    "explain": "Detect PII in data pipeline; guardrails block sensitive content at generation.",
    "obj": "3",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html",
    "id": "genai-scenario-0008"
  },
  {
    "mode": "scenario",
    "caseStudyId": "apex-financial-rag",
    "topic": "Ingestion",
    "q": "Complex PDF diagrams fail ingestion. Resilient processing uses:",
    "options": [
      "Ignore failures — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Bedrock Knowledge Bases with OCR/layout parsing, DLQ/retry on failed documents",
      "Delete S3 bucket — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Only plain text uploads — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload"
    ],
    "correct": 1,
    "explain": "Managed KB ingestion with retries handles difficult PDFs; monitor failures.",
    "obj": "5",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation.html",
    "id": "genai-scenario-0009"
  },
  {
    "mode": "scenario",
    "caseStudyId": "apex-financial-rag",
    "topic": "Audit",
    "q": "All queries must be auditable. What should you enable?",
    "options": [
      "No logs — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "CloudTrail for API calls + application logs of prompts/responses stored securely with retention policy",
      "Public CloudWatch dashboard — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Disable KMS — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload"
    ],
    "correct": 1,
    "explain": "API audit trails plus app-level query logs satisfy financial audit needs.",
    "obj": "3",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html",
    "id": "genai-scenario-0010"
  },
  {
    "mode": "scenario",
    "caseStudyId": "apex-financial-rag",
    "topic": "Access",
    "q": "Bedrock and S3 access from the app should use:",
    "options": [
      "Long-lived IAM user keys in code — not the recommended Bedrock approach here",
      "IAM roles with least privilege; no keys in repositories",
      "Bucket public read — not the recommended Bedrock approach here",
      "Root account for Lambda — not the recommended Bedrock approach here"
    ],
    "correct": 1,
    "explain": "Roles and short-lived credentials reduce secret sprawl.",
    "obj": "1",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html",
    "id": "genai-scenario-0011"
  },
  {
    "mode": "scenario",
    "caseStudyId": "apex-financial-rag",
    "topic": "Evaluation",
    "q": "Before promoting prompt changes, measure quality with:",
    "options": [
      "Guesswork — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Human review sets + RAG evaluation metrics (faithfulness/relevance) on sample filings",
      "Disable testing — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Only latency tests — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload"
    ],
    "correct": 1,
    "explain": "Structured eval on representative 10-K samples validates prompt/retrieval changes.",
    "obj": "5",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation.html",
    "id": "genai-scenario-0012"
  }
];
