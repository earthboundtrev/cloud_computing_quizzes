window.QUESTION_BANK_AWS_GENAI_SCENARIOS = [
  {
    "mode": "scenario",
    "caseStudyId": "multi-tenant-rag",
    "topic": "Architecture",
    "q": "Case genai-scenario-0001: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. Which architecture BEST meets strict tenant isolation for thousands of customers? Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "One shared OpenSearch index with no ACLs while leaving retrieval and chunking unchanged without updating IAM roles or model access in the target Region",
      "Separate Bedrock Knowledge Bases (or collections) per tenant with IAM-scoped access and KMS encryption",
      "Public S3 bucket for all manuals by disabling Guardrails instead of tuning retrieval parameters using only client-side JavaScript to hold long-lived credentials",
      "Run models only on laptops using only client-side JavaScript to hold long-lived credentials and relying on a single synchronous InvokeModel call for all traffic"
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
    "q": "Case genai-scenario-0002: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. When customers upload revised PDFs, embeddings should update: Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Rebuild entire platform nightly only while leaving retrieval and chunking unchanged",
      "Incremental sync jobs into the Knowledge Base / vector store for changed objects",
      "Delete all tenants by disabling Guardrails instead of tuning retrieval parameters",
      "Disable versioning using only client-side JavaScript to hold long-lived credentials"
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
    "q": "Case genai-scenario-0003: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. Unsafe or off-topic model outputs should be reduced with: Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "No controls while leaving retrieval and chunking unchanged without updating IAM roles or model access in the target Region",
      "Amazon Bedrock Guardrails (content filters, denied topics, PII filters)",
      "Hard-coded API keys in JS by disabling Guardrails instead of tuning retrieval parameters",
      "Public endpoints without auth using only client-side JavaScript to hold long-lived credentials"
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
    "q": "Case genai-scenario-0004: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. Internal and external users need centralized auth to the app: Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Shared admin password while leaving retrieval and chunking unchanged without updating IAM roles or model access in the target Region",
      "Amazon Cognito (or federated IdP) with tenant claims mapped to IAM/KB access",
      "API keys in mobile app binary by disabling Guardrails instead of tuning retrieval parameters",
      "Disable TLS using only client-side JavaScript to hold long-lived credentials and relying on a single synchronous InvokeModel call for all traffic"
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
    "q": "Case genai-scenario-0005: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. Latency and token cost spikes should be tracked via: Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "CloudWatch metrics on Bedrock invocations + application tracing",
      "Paper logs only without updating IAM roles or model access in the target Region",
      "S3 Glacier by disabling Guardrails instead of tuning retrieval parameters",
      "WAF only using only client-side JavaScript to hold long-lived credentials"
    ],
    "correct": 0,
    "explain": "Observability on model calls supports SLOs and cost control.",
    "obj": "4",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation.html",
    "id": "genai-scenario-0005"
  },
  {
    "mode": "scenario",
    "caseStudyId": "multi-tenant-rag",
    "topic": "Models",
    "q": "Case genai-scenario-0006: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. Choosing models per tenant tier (fast vs capable) is done with: Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Single largest model for everyone always while leaving retrieval and chunking unchanged",
      "Bedrock model IDs / inference profiles selected by tenant SLA and routing logic",
      "Host weights on EC2 manually by disabling Guardrails instead of tuning retrieval parameters",
      "Email PDFs to users using only client-side JavaScript to hold long-lived credentials"
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
    "q": "Case genai-scenario-0007: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. Summaries miss nuance despite relevant chunks. What improves quality FIRST? Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Lower temperature only while leaving retrieval and chunking unchanged without updating IAM roles or model access in the target Region",
      "Tune chunking, metadata filters, and hybrid retrieval; refine system prompts with domain instructions",
      "Remove guardrails by disabling Guardrails instead of tuning retrieval parameters using only client-side JavaScript to hold long-lived credentials",
      "Use smaller context window using only client-side JavaScript to hold long-lived credentials and relying on a single synchronous InvokeModel call for all traffic"
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
    "q": "Case genai-scenario-0008: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. PII must be blocked in prompts and responses. Which combination applies? Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Macie/Comprehend PII detection on ingest + Bedrock Guardrails at inference",
      "Store all filings public without updating IAM roles or model access in the target Region",
      "Disable logging for privacy by disabling Guardrails instead of tuning retrieval parameters",
      "Share root credentials using only client-side JavaScript to hold long-lived credentials"
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
    "q": "Case genai-scenario-0009: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. Complex PDF diagrams fail ingestion. Resilient processing uses: Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Ignore failures while leaving retrieval and chunking unchanged without updating IAM roles or model access in the target Region",
      "Bedrock Knowledge Bases with OCR/layout parsing, DLQ/retry on failed documents",
      "Delete S3 bucket by disabling Guardrails instead of tuning retrieval parameters",
      "Only plain text uploads using only client-side JavaScript to hold long-lived credentials"
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
    "q": "Case genai-scenario-0010: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. All queries must be auditable. What should you enable? Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "No logs while leaving retrieval and chunking unchanged without updating IAM roles or model access in the target Region",
      "CloudTrail for API calls + application logs of prompts/responses stored securely with retention policy",
      "Public CloudWatch dashboard by disabling Guardrails instead of tuning retrieval parameters using only client-side JavaScript to hold long-lived credentials",
      "Disable KMS using only client-side JavaScript to hold long-lived credentials and relying on a single synchronous InvokeModel call for all traffic"
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
    "q": "Case genai-scenario-0011: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. Bedrock and S3 access from the app should use: Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Long-lived IAM user keys in code while leaving retrieval and chunking unchanged",
      "IAM roles with least privilege; no keys in repositories",
      "Bucket public read by disabling Guardrails instead of tuning retrieval parameters",
      "Root account for Lambda using only client-side JavaScript to hold long-lived credentials"
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
    "q": "Case genai-scenario-0012: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. Before promoting prompt changes, measure quality with: Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Guesswork while leaving retrieval and chunking unchanged without updating IAM roles or model access in the target Region",
      "Human review sets + RAG evaluation metrics (faithfulness/relevance) on sample filings",
      "Disable testing by disabling Guardrails instead of tuning retrieval parameters using only client-side JavaScript to hold long-lived credentials",
      "Only latency tests using only client-side JavaScript to hold long-lived credentials and relying on a single synchronous InvokeModel call for all traffic"
    ],
    "correct": 1,
    "explain": "Structured eval on representative 10-K samples validates prompt/retrieval changes.",
    "obj": "5",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation.html",
    "id": "genai-scenario-0012"
  }
];
