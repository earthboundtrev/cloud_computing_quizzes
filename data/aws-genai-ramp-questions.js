/**
 * AWS GenAI Developer (AIP-C01) ramp — scenarios, multi-response, thin concepts (#13).
 */
window.QUESTION_BANK_AWS_GENAI_RAMP = [
  {
    "id": "genai-ramp-001",
    "mode": "exam",
    "topic": "Troubleshooting",
    "obj": "1",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html",
    "q": "Case genai-ramp-001: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. A Bedrock Knowledge Base chatbot answers policy FAQs well, but queries with internal part numbers (PN-44817-B) return irrelevant passages. Embeddings use a general model. What is the MOST effective fix? Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Raise temperature to 1.0 while leaving retrieval and chunking unchanged",
      "Enable hybrid search (semantic + keyword) on the knowledge base",
      "Switch to the largest generation model only by disabling Guardrails instead of tuning retrieval parameters",
      "Set retrieval results to 1 using only client-side JavaScript to hold long-lived credentials"
    ],
    "correct": 1,
    "explain": "Exact IDs are lexical; hybrid search adds keyword recall. Temperature and generation model do not fix retrieval; fewer results hurts recall."
  },
  {
    "id": "genai-ramp-002",
    "mode": "exam",
    "topic": "Cost",
    "type": "multi",
    "obj": "4",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-caching.html",
    "q": "Case genai-ramp-002: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. An app sends the same 6,000-token system prompt and tool schema on every Bedrock request at ~40 RPS steady. Leadership wants lower cost and latency without changing answer quality. Which TWO help MOST? (Pick 2) Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Enable prompt caching for the static prefix",
      "Purchase Provisioned Throughput for baseline volume",
      "Move all traffic to asynchronous batch inference",
      "Increase max_tokens to 8192",
      "Disable Guardrails entirely"
    ],
    "correct": [
      0,
      1
    ],
    "explain": "Caching reduces billed input tokens and latency on repeated prefixes. Steady RPS suits provisioned capacity. Batch is async; max_tokens and removing Guardrails change behavior or safety."
  },
  {
    "id": "genai-ramp-003",
    "mode": "exam",
    "topic": "Prompt Management",
    "obj": "2",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-management.html",
    "q": "Case genai-ramp-003: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. Teams need versioned prompts shared across dev/stage/prod with IAM-controlled updates. What should you use? Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Hard-code prompts in Lambda only while leaving retrieval and chunking unchanged",
      "Amazon Bedrock Prompt Management with versions and aliases",
      "Store prompts in public S3 buckets by disabling Guardrails instead of tuning retrieval parameters",
      "Embed prompts only in client mobile apps using only client-side JavaScript to hold long-lived credentials"
    ],
    "correct": 1,
    "explain": "Prompt Management centralizes versioning, testing, and IAM for prompt assets used by applications and flows."
  },
  {
    "id": "genai-ramp-004",
    "mode": "exam",
    "topic": "Optimization",
    "obj": "4",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/flows.html",
    "q": "Case genai-ramp-004: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. You must orchestrate prompt → knowledge base retrieval → model invocation with branching on confidence. Which Bedrock feature fits? Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "A single InvokeModel call only while leaving retrieval and chunking unchanged",
      "Bedrock Flows visual workflow with nodes and conditions",
      "S3 lifecycle rules by disabling Guardrails instead of tuning retrieval parameters",
      "EC2 Auto Scaling groups using only client-side JavaScript to hold long-lived credentials"
    ],
    "correct": 1,
    "explain": "Flows compose multi-step generative workflows (prompts, KB, agents, conditions) without custom orchestration code for every path."
  },
  {
    "id": "genai-ramp-005",
    "mode": "exam",
    "topic": "Evaluation",
    "obj": "3",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation.html",
    "q": "Case genai-ramp-005: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. Before promoting a new RAG prompt to production, you need automated quality scores against a golden Q&A set. What should you use? Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Manual spot checks only while leaving retrieval and chunking unchanged",
      "Bedrock model evaluation jobs (built-in or custom metrics)",
      "CloudWatch alarm on CPU by disabling Guardrails instead of tuning retrieval parameters",
      "Disable retrieval to simplify testing using only client-side JavaScript to hold long-lived credentials"
    ],
    "correct": 1,
    "explain": "Model evaluation runs batch comparisons with metrics (accuracy, toxicity, etc.) on curated datasets."
  },
  {
    "id": "genai-ramp-006",
    "mode": "exam",
    "topic": "Fine-Tuning",
    "obj": "1",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/custom-models.html",
    "q": "Case genai-ramp-006: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. A legal team needs consistent tone and domain terminology on a supported FM; few-shot prompts are insufficient. BEST approach? Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Increase temperature while leaving retrieval and chunking unchanged without updating IAM roles or model access in the target Region",
      "Fine-tune a supported model with labeled examples in S3 (Custom Model)",
      "Delete the knowledge base by disabling Guardrails instead of tuning retrieval parameters",
      "Use Guardrails word filter only using only client-side JavaScript to hold long-lived credentials"
    ],
    "correct": 1,
    "explain": "Customization/fine-tuning adapts model weights for domain style when prompting alone plateaus."
  },
  {
    "id": "genai-ramp-007",
    "mode": "exam",
    "topic": "Optimization",
    "obj": "4",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/agents.html",
    "q": "Case genai-ramp-007: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. An agent must call an internal REST API to create tickets, then summarize results to the user. Which component defines the OpenAPI tool schema? Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Knowledge Base only while leaving retrieval and chunking unchanged",
      "Action group with API schema attached to the Bedrock Agent",
      "S3 bucket policy by disabling Guardrails instead of tuning retrieval parameters",
      "IAM user access keys in the prompt using only client-side JavaScript to hold long-lived credentials"
    ],
    "correct": 1,
    "explain": "Agents use action groups (OpenAPI) for tool calling; KB supplies retrieval, not arbitrary API execution."
  },
  {
    "id": "genai-ramp-008",
    "mode": "exam",
    "topic": "Troubleshooting",
    "obj": "4",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_InvokeModelWithResponseStream.html",
    "q": "Case genai-ramp-008: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. Users report timeouts on long answers though the model keeps generating. Client uses synchronous InvokeModel. FIRST change to try? Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Disable Guardrails while leaving retrieval and chunking unchanged without updating IAM roles or model access in the target Region",
      "Switch to InvokeModelWithResponseStream and increase client read timeout",
      "Reduce max_tokens to 10 by disabling Guardrails instead of tuning retrieval parameters",
      "Move KB to another region randomly using only client-side JavaScript to hold long-lived credentials"
    ],
    "correct": 1,
    "explain": "Streaming improves time-to-first-token and avoids single large blocking response; tune timeouts accordingly."
  },
  {
    "id": "genai-ramp-009",
    "mode": "exam",
    "topic": "Governance",
    "obj": "3",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html",
    "q": "Case genai-ramp-009: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. Compliance requires blocking SSN patterns and denying off-topic medical advice in a HR chatbot. What should you configure? Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Only S3 encryption while leaving retrieval and chunking unchanged without updating IAM roles or model access in the target Region",
      "Bedrock Guardrails with PII filters and topic policies on input/output",
      "Public API Gateway without auth by disabling Guardrails instead of tuning retrieval parameters",
      "Raise temperature using only client-side JavaScript to hold long-lived credentials"
    ],
    "correct": 1,
    "explain": "Guardrails apply content, PII, and topic controls at inference time for both prompts and responses."
  },
  {
    "id": "genai-ramp-010",
    "mode": "exam",
    "topic": "Data",
    "obj": "1",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-data-source-sync.html",
    "q": "Case genai-ramp-010: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. New PDFs land in S3 hourly for a Knowledge Base. How do you keep vectors fresh with minimal ops? Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Manual re-create KB daily while leaving retrieval and chunking unchanged",
      "Scheduled or event-driven ingestion sync on the data source",
      "Copy PDFs to EBS volumes by disabling Guardrails instead of tuning retrieval parameters",
      "Store PDFs in CloudFront only using only client-side JavaScript to hold long-lived credentials"
    ],
    "correct": 1,
    "explain": "Data source sync re-chunks and re-embeds when source documents change."
  },
  {
    "id": "genai-ramp-011",
    "mode": "exam",
    "topic": "Security",
    "type": "multi",
    "obj": "3",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/vpc-interface-endpoints.html",
    "q": "Case genai-ramp-011: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. A regulated workload must keep Bedrock traffic off the public internet and restrict who can invoke models. Which TWO controls apply? (Pick 2) Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Interface VPC endpoint for Bedrock with private subnets",
      "IAM least-privilege policies on InvokeModel",
      "Disable all logging",
      "Store API keys in git",
      "Use root account access keys"
    ],
    "correct": [
      0,
      1
    ],
    "explain": "VPC endpoints keep traffic private; IAM enforces caller authorization. Logging aids audit; never embed long-lived keys in code."
  },
  {
    "id": "genai-ramp-012",
    "mode": "exam",
    "topic": "RAG",
    "obj": "1",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-chunking.html",
    "q": "Case genai-ramp-012: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. Retrieved chunks are too large and answers miss details buried mid-document. FIRST tuning step? Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Increase temperature while leaving retrieval and chunking unchanged",
      "Adjust chunk size/overlap or hierarchical chunking strategy",
      "Remove Guardrails by disabling Guardrails instead of tuning retrieval parameters",
      "Use only one embedding dimension using only client-side JavaScript to hold long-lived credentials"
    ],
    "correct": 1,
    "explain": "Chunking strategy directly affects retrieval precision; smaller targeted chunks improve detail recall."
  },
  {
    "id": "genai-ramp-013",
    "mode": "exam",
    "topic": "Optimization",
    "obj": "4",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/provisioned-throughput.html",
    "q": "Case genai-ramp-013: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. Traffic is steady 24/7 at high TPS and throttling occurs on on-demand inference. BEST cost/latency tradeoff? Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Randomly retry without backoff while leaving retrieval and chunking unchanged",
      "Provisioned Throughput units sized to baseline demand",
      "Delete the model access by disabling Guardrails instead of tuning retrieval parameters",
      "Use only batch inference for chat using only client-side JavaScript to hold long-lived credentials"
    ],
    "correct": 1,
    "explain": "Provisioned Throughput reserves capacity for predictable high-volume workloads."
  },
  {
    "id": "genai-ramp-014",
    "mode": "exam",
    "topic": "Troubleshooting",
    "obj": "2",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/troubleshooting.html",
    "q": "Case genai-ramp-014: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. Agent action calls fail with 403 from API Gateway though the agent plan looks correct. MOST likely cause? Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Wrong embedding model while leaving retrieval and chunking unchanged without updating IAM roles or model access in the target Region",
      "Agent execution role lacks invoke permission on the API or authorizer misconfigured",
      "KB ingestion incomplete by disabling Guardrails instead of tuning retrieval parameters",
      "Temperature too low using only client-side JavaScript to hold long-lived credentials"
    ],
    "correct": 1,
    "explain": "Agents assume an execution role; API Gateway resource policies/IAM and auth must allow the role."
  },
  {
    "id": "genai-ramp-015",
    "mode": "exam",
    "topic": "Compliance",
    "obj": "1",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/data-protection.html",
    "q": "Case genai-ramp-015: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. Customer contracts require encryption of prompts/responses at rest in your logging pipeline. What should you implement? Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Plaintext logs in open S3 while leaving retrieval and chunking unchanged",
      "KMS-encrypted CloudWatch Logs/S3 and minimize sensitive fields in logs",
      "Disable audit trails by disabling Guardrails instead of tuning retrieval parameters",
      "Email transcripts externally using only client-side JavaScript to hold long-lived credentials"
    ],
    "correct": 1,
    "explain": "Use KMS for log/storage encryption; apply data minimization and retention policies for compliance."
  },
  {
    "id": "genai-ramp-016",
    "mode": "exam",
    "topic": "Evaluation",
    "obj": "4",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base-evaluation.html",
    "q": "Case genai-ramp-016: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. You need to measure retrieval precision/recall for a new KB configuration before launch. What should you run? Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Only load test EC2 while leaving retrieval and chunking unchanged without updating IAM roles or model access in the target Region",
      "Evaluation job comparing retrieved passages to labeled relevant documents",
      "Change region by disabling Guardrails instead of tuning retrieval parameters",
      "Turn off embeddings using only client-side JavaScript to hold long-lived credentials"
    ],
    "correct": 1,
    "explain": "KB evaluation metrics quantify retrieval quality separate from generation quality."
  },
  {
    "id": "genai-ramp-017",
    "mode": "exam",
    "topic": "Optimization",
    "obj": "4",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/agents-alias.html",
    "q": "Case genai-ramp-017: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. Blue/green deployment for a Bedrock Agent serving production traffic requires: Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Deleting the agent each release while leaving retrieval and chunking unchanged",
      "Agent aliases pointing to tested agent versions with weighted routing",
      "Hard-coded version in mobile app only by disabling Guardrails instead of tuning retrieval parameters",
      "Single shared root credential using only client-side JavaScript to hold long-lived credentials"
    ],
    "correct": 1,
    "explain": "Aliases and versions support staged rollout and rollback for agents."
  },
  {
    "id": "genai-ramp-018",
    "mode": "exam",
    "topic": "Models",
    "obj": "1",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/models-regions.html",
    "q": "Case genai-ramp-018: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. You must invoke a model in us-east-1 but it is only enabled in us-west-2. FIRST step? Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Enable model access in the target Region and ensure inference profile/region match",
      "Copy IAM user password without updating IAM roles or model access in the target Region",
      "Use Guardrails instead of a model by disabling Guardrails instead of tuning retrieval parameters",
      "Disable CloudTrail using only client-side JavaScript to hold long-lived credentials"
    ],
    "correct": 0,
    "explain": "Model access is per-Region; clients must call the Region where access and model IDs are valid."
  },
  {
    "id": "genai-ramp-019",
    "mode": "exam",
    "topic": "Cost",
    "obj": "4",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/batch-inference.html",
    "q": "Case genai-ramp-019: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. Nightly job generates summaries for 2M archived tickets; latency can be hours. MOST cost-effective pattern? Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Real-time InvokeModel at max TPS while leaving retrieval and chunking unchanged",
      "Batch inference job with input/output in S3",
      "Provisioned Throughput for chat UI by disabling Guardrails instead of tuning retrieval parameters",
      "Manual copy/paste using only client-side JavaScript to hold long-lived credentials"
    ],
    "correct": 1,
    "explain": "Batch inference optimizes cost for large offline workloads without interactive latency needs."
  },
  {
    "id": "genai-ramp-020",
    "mode": "exam",
    "topic": "Guardrails",
    "type": "multi",
    "obj": "3",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-components.html",
    "q": "Case genai-ramp-020: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. Reduce hallucinated financial advice in outputs while keeping helpful answers. Which TWO Guardrails features help? (Pick 2) Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Topic policy denying unauthorized financial advice category",
      "Contextual grounding check against KB sources",
      "Disable all logging",
      "Set temperature to 2.0",
      "Remove KB retrieval"
    ],
    "correct": [
      0,
      1
    ],
    "explain": "Topic policies constrain categories; grounding checks compare responses to retrieved context. Extreme temperature increases randomness."
  },
  {
    "id": "genai-ramp-021",
    "mode": "exam",
    "topic": "Observability",
    "obj": "4",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/monitoring.html",
    "q": "Case genai-ramp-021: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. Ops needs dashboards for model latency, token usage, and throttling. PRIMARY service? Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Amazon CloudWatch metrics and logs for Bedrock",
      "Route 53 health checks only without updating IAM roles or model access in the target Region",
      "S3 access logs only by disabling Guardrails instead of tuning retrieval parameters",
      "AWS Budgets only using only client-side JavaScript to hold long-lived credentials"
    ],
    "correct": 0,
    "explain": "CloudWatch captures Bedrock invocation metrics; combine with X-Ray for traces."
  },
  {
    "id": "genai-ramp-022",
    "mode": "exam",
    "topic": "RAG",
    "obj": "1",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-metadata.html",
    "q": "Case genai-ramp-022: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. Multi-tenant SaaS must filter KB retrieval per customer_id metadata. How should you implement? Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "One giant shared index without filters while leaving retrieval and chunking unchanged",
      "Attach metadata filters on retrieve API calls per tenant",
      "Disable embeddings by disabling Guardrails instead of tuning retrieval parameters",
      "Store all tenants in one prompt using only client-side JavaScript to hold long-lived credentials"
    ],
    "correct": 1,
    "explain": "Metadata filtering scopes vector search to authorized tenant documents."
  },
  {
    "id": "genai-ramp-023",
    "mode": "exam",
    "topic": "Troubleshooting",
    "obj": "4",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/service-quotas.html",
    "q": "Case genai-ramp-023: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. Sudden ThrottlingException spikes during marketing launch. FIRST mitigation while keeping quality? Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Remove Guardrails while leaving retrieval and chunking unchanged without updating IAM roles or model access in the target Region",
      "Request quota increase and add exponential backoff/retry; consider provisioned capacity",
      "Delete KB by disabling Guardrails instead of tuning retrieval parameters using only client-side JavaScript to hold long-lived credentials",
      "Switch to smallest model regardless of task using only client-side JavaScript to hold long-lived credentials"
    ],
    "correct": 1,
    "explain": "Throttling indicates quota/capacity limits; backoff plus quota or provisioned throughput addresses sustained spikes."
  },
  {
    "id": "genai-ramp-024",
    "mode": "exam",
    "topic": "Implementation",
    "obj": "2",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/inference-profiles.html",
    "q": "Case genai-ramp-024: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. You need cross-Region resilience for Claude model invocation with a single model ID in code. Use: Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Hard-code one Region endpoint while leaving retrieval and chunking unchanged",
      "Inference profile that routes across Regions per AWS configuration",
      "Local laptop model by disabling Guardrails instead of tuning retrieval parameters",
      "DynamoDB streams using only client-side JavaScript to hold long-lived credentials"
    ],
    "correct": 1,
    "explain": "Inference profiles abstract Region routing for supported models."
  },
  {
    "id": "genai-ramp-025",
    "mode": "exam",
    "topic": "Safety",
    "obj": "3",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/responsible-use.html",
    "q": "Case genai-ramp-025: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. Product policy bans generating instructions for weapons. Besides Guardrails, what governance practice is REQUIRED? Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Ignore abuse reports while leaving retrieval and chunking unchanged without updating IAM roles or model access in the target Region",
      "Human review process, abuse monitoring, and documented acceptable use policies",
      "Publish admin keys by disabling Guardrails instead of tuning retrieval parameters",
      "Disable encryption using only client-side JavaScript to hold long-lived credentials"
    ],
    "correct": 1,
    "explain": "Responsible AI combines technical controls with policy, monitoring, and human oversight."
  },
  {
    "id": "genai-ramp-026",
    "mode": "exam",
    "topic": "Prompt Engineering",
    "obj": "2",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-engineering.html",
    "q": "Case genai-ramp-026: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. Model returns JSON but often adds markdown fences. MOST reliable fix? Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Ask politely in one word while leaving retrieval and chunking unchanged without updating IAM roles or model access in the target Region",
      "Use tool/structured output or response schema features where supported; validate with post-processing",
      "Set temperature to maximum by disabling Guardrails instead of tuning retrieval parameters using only client-side JavaScript to hold long-lived credentials",
      "Remove system prompt using only client-side JavaScript to hold long-lived credentials and relying on a single synchronous InvokeModel call for all traffic"
    ],
    "correct": 1,
    "explain": "Structured output constraints and validation reduce format drift versus hope-based prompting."
  },
  {
    "id": "genai-ramp-027",
    "mode": "exam",
    "topic": "Testing",
    "type": "multi",
    "obj": "3",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation.html",
    "q": "Case genai-ramp-027: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. Regression testing before prompt change should include which TWO? (Pick 2) Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Golden dataset automated evaluation",
      "Chaos deletion of KB in production",
      "Safety/toxicity metrics on sample prompts",
      "Disabling IAM",
      "Turning off CloudWatch"
    ],
    "correct": [
      0,
      2
    ],
    "explain": "Golden sets with automated metrics catch quality/safety regressions; destructive chaos belongs in controlled tests only."
  },
  {
    "id": "genai-ramp-028",
    "mode": "exam",
    "topic": "Vectors",
    "obj": "1",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base-setup.html",
    "q": "Case genai-ramp-028: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. You change embedding model for an existing Knowledge Base. Required action? Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Nothing; embeddings auto-migrate silently while leaving retrieval and chunking unchanged",
      "Re-run ingestion to re-embed all documents with the new model",
      "Only change Guardrails by disabling Guardrails instead of tuning retrieval parameters",
      "Delete IAM roles using only client-side JavaScript to hold long-lived credentials"
    ],
    "correct": 1,
    "explain": "Vectors are model-specific; changing embedding model requires re-ingestion."
  },
  {
    "id": "genai-ramp-029",
    "mode": "exam",
    "topic": "Optimization",
    "obj": "4",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/agents-prepare.html",
    "q": "Case genai-ramp-029: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. After updating agent instructions and action schemas, what must you do before testing in console? Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Prepare the agent to rebuild internal orchestration state",
      "Delete the AWS account without updating IAM roles or model access in the target Region",
      "Disable CloudTrail by disabling Guardrails instead of tuning retrieval parameters",
      "Remove KB using only client-side JavaScript to hold long-lived credentials"
    ],
    "correct": 0,
    "explain": "Prepare compiles agent configuration after instruction/tool changes."
  },
  {
    "id": "genai-ramp-030",
    "mode": "exam",
    "topic": "Optimization",
    "obj": "4",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base-retrieval.html",
    "q": "Case genai-ramp-030: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. Answers cite too many irrelevant passages increasing cost. FIRST knob to turn? Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Increase numberOfResults and max tokens always while leaving retrieval and chunking unchanged",
      "Tune retrieval count, score threshold, and reranking if enabled",
      "Disable streaming by disabling Guardrails instead of tuning retrieval parameters",
      "Remove encryption using only client-side JavaScript to hold long-lived credentials"
    ],
    "correct": 1,
    "explain": "Retrieval parameters control context size and relevance, directly affecting token cost."
  },
  {
    "id": "genai-ramp-031",
    "mode": "exam",
    "topic": "Compliance",
    "obj": "1",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/logging.html",
    "q": "Case genai-ramp-031: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. Audit requires retaining model invocation logs with sensitive fields redacted. BEST pattern? Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "No logging for privacy while leaving retrieval and chunking unchanged without updating IAM roles or model access in the target Region",
      "Model invocation logging to encrypted S3/CloudWatch with Guardrails + log filtering",
      "Tweet request IDs by disabling Guardrails instead of tuning retrieval parameters using only client-side JavaScript to hold long-lived credentials",
      "Log full prompts to public repo using only client-side JavaScript to hold long-lived credentials"
    ],
    "correct": 1,
    "explain": "Enable invocation logging with encryption and redaction/minimization aligned to policy."
  },
  {
    "id": "genai-ramp-032",
    "mode": "exam",
    "topic": "Troubleshooting",
    "obj": "1",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base-troubleshooting.html",
    "q": "Case genai-ramp-032: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. KB answers 'I don't know' despite document containing answer. Retrieval shows low scores. NEXT step? Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Increase temperature only while leaving retrieval and chunking unchanged without updating IAM roles or model access in the target Region",
      "Inspect chunking, metadata filters, and query reformulation; verify ingestion succeeded",
      "Delete S3 bucket by disabling Guardrails instead of tuning retrieval parameters using only client-side JavaScript to hold long-lived credentials",
      "Disable hybrid search always using only client-side JavaScript to hold long-lived credentials"
    ],
    "correct": 1,
    "explain": "Low retrieval scores indicate ingestion, chunking, filtering, or query mismatch—not generation temperature."
  },
  {
    "id": "genai-ramp-033",
    "mode": "exam",
    "topic": "Integration",
    "obj": "2",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/agents-kb.html",
    "q": "Case genai-ramp-033: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. Agent should answer from private docs AND call tools. Combine: Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Knowledge base association plus action groups on the same agent",
      "Only Guardrails without updating IAM roles or model access in the target Region",
      "Only S3 static website by disabling Guardrails instead of tuning retrieval parameters",
      "EC2 user data scripts only using only client-side JavaScript to hold long-lived credentials"
    ],
    "correct": 0,
    "explain": "Agents can attach KB for RAG and action groups for API tools concurrently."
  },
  {
    "id": "genai-ramp-034",
    "mode": "exam",
    "topic": "Models",
    "obj": "1",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-parameters.html",
    "q": "Case genai-ramp-034: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. Creative marketing copy needs variety; compliance summaries need determinism. How should you configure? Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Same temperature for all use cases while leaving retrieval and chunking unchanged without updating IAM roles or model access in the target Region",
      "Lower temperature/top-p for factual tasks; higher for creative tasks with evaluation gates",
      "Max tokens = 1 for everything by disabling Guardrails instead of tuning retrieval parameters",
      "Disable all Guardrails globally using only client-side JavaScript to hold long-lived credentials"
    ],
    "correct": 1,
    "explain": "Tune inference parameters per use case; validate factual workloads with eval and grounding."
  },
  {
    "id": "genai-ramp-035",
    "mode": "exam",
    "topic": "Security",
    "obj": "3",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html",
    "q": "Case genai-ramp-035: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. Lambda calls Bedrock and retrieves from KB in VPC. Credentials should come from: Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Long-lived IAM user keys in environment variables while leaving retrieval and chunking unchanged",
      "Execution role with least privilege for bedrock:InvokeModel and KB retrieve",
      "Root access key by disabling Guardrails instead of tuning retrieval parameters",
      "Hard-coded in frontend JavaScript using only client-side JavaScript to hold long-lived credentials"
    ],
    "correct": 1,
    "explain": "Use IAM roles for AWS compute; scope policies to required Bedrock actions and resources."
  },
  {
    "id": "genai-ramp-036",
    "mode": "exam",
    "topic": "Data residency",
    "obj": "1",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/bedrock-regions.html",
    "q": "Case genai-ramp-036: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. EU customer data must stay in eu-central-1 for Bedrock and KB storage. What must you verify FIRST? Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Model access and KB/data sources exist in eu-central-1",
      "Use us-east-1 for cheaper tokens without updating IAM roles or model access in the target Region",
      "Disable KMS by disabling Guardrails instead of tuning retrieval parameters",
      "Run inference from on-prem only using only client-side JavaScript to hold long-lived credentials"
    ],
    "correct": 0,
    "explain": "Bedrock model availability and KB resources are Region-specific; residency requires aligned Region deployment."
  },
  {
    "id": "genai-ramp-037",
    "mode": "exam",
    "topic": "Custom models",
    "obj": "1",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/custom-models.html",
    "q": "Case genai-ramp-037: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. After custom model training completes, how do you invoke it in applications? Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Use the custom model ARN with InvokeModel in the training Region",
      "Copy weights to EBS manually without updating IAM roles or model access in the target Region",
      "Only via SageMaker exclusively by disabling Guardrails instead of tuning retrieval parameters",
      "Publish to public S3 using only client-side JavaScript to hold long-lived credentials"
    ],
    "correct": 0,
    "explain": "Custom models appear as Bedrock model IDs/ARNs in the Region where training was provisioned."
  },
  {
    "id": "genai-ramp-038",
    "mode": "exam",
    "topic": "RAG",
    "obj": "1",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-how-data.html",
    "q": "Case genai-ramp-038: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. Structured product specs live in DynamoDB; manuals are PDFs in S3. BEST retrieval design? Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Ignore structured data while leaving retrieval and chunking unchanged without updating IAM roles or model access in the target Region",
      "Combine KB over S3 PDFs with application-side DynamoDB lookup or structured retrieval in the flow",
      "Email CSV exports daily by disabling Guardrails instead of tuning retrieval parameters using only client-side JavaScript to hold long-lived credentials",
      "Single prompt without tools using only client-side JavaScript to hold long-lived credentials and relying on a single synchronous InvokeModel call for all traffic"
    ],
    "correct": 1,
    "explain": "Hybrid designs use KB for unstructured docs and app/flow logic for structured stores."
  },
  {
    "id": "genai-ramp-039",
    "mode": "exam",
    "topic": "Compliance",
    "obj": "1",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/data-protection.html",
    "q": "Case genai-ramp-039: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. Contracts require customer content is not used to improve base FMs. Which Bedrock default applies? Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "AWS does not train base models on customer content by default for Bedrock service",
      "All prompts are shared publicly without updating IAM roles or model access in the target Region",
      "Disable encryption to prove isolation by disabling Guardrails instead of tuning retrieval parameters",
      "Use root account using only client-side JavaScript to hold long-lived credentials and relying on a single synchronous InvokeModel call for all traffic"
    ],
    "correct": 0,
    "explain": "Bedrock data protection policies address customer content separation from base model training (see current service terms/docs)."
  },
  {
    "id": "genai-ramp-040",
    "mode": "exam",
    "topic": "Embeddings",
    "obj": "1",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/titan-embedding-models.html",
    "q": "Case genai-ramp-040: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. You need semantic search over support tickets in English only. FIRST model choice? Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Largest text generation model while leaving retrieval and chunking unchanged",
      "Bedrock embedding model suited to semantic search (e.g., Titan Embeddings)",
      "Speech-to-text model by disabling Guardrails instead of tuning retrieval parameters",
      "Image generation model using only client-side JavaScript to hold long-lived credentials"
    ],
    "correct": 1,
    "explain": "Embeddings map text to vectors for retrieval; generation models are not used for indexing."
  },
  {
    "id": "genai-ramp-041",
    "mode": "exam",
    "topic": "Prompt Management",
    "obj": "2",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-management.html",
    "q": "Case genai-ramp-041: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. Engineers want to A/B test two prompt versions in staging without redeploying Lambda. Use: Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Prompt Management versions/aliases referenced by the app",
      "Hard-code v1 only without updating IAM roles or model access in the target Region",
      "Delete production alias by disabling Guardrails instead of tuning retrieval parameters",
      "Store prompts in git without access control using only client-side JavaScript to hold long-lived credentials"
    ],
    "correct": 0,
    "explain": "Versioned prompts and aliases enable controlled rollout and testing."
  },
  {
    "id": "genai-ramp-042",
    "mode": "exam",
    "topic": "Flows",
    "obj": "2",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/flows.html",
    "q": "Case genai-ramp-042: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. A Flow must call Lambda for enrichment, then KB retrieve, then model. Where is Lambda invoked? Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "As a Flow node integrated in the Bedrock Flow definition",
      "Only from the user browser without updating IAM roles or model access in the target Region",
      "Via S3 event alone without Flow by disabling Guardrails instead of tuning retrieval parameters",
      "CloudFront function only using only client-side JavaScript to hold long-lived credentials"
    ],
    "correct": 0,
    "explain": "Flows support multiple node types including Lambda and KB retrieval in one workflow."
  },
  {
    "id": "genai-ramp-043",
    "mode": "exam",
    "topic": "Agents",
    "type": "multi",
    "obj": "2",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/agents.html",
    "q": "Case genai-ramp-043: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. Production agent with tools needs reliable releases. Which TWO practices apply? (Pick 2) Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Use agent aliases with versioned agent definitions",
      "Prepare agent after instruction/tool changes",
      "Embed IAM user keys in instructions",
      "Skip testing in lower environments",
      "Disable execution role"
    ],
    "correct": [
      0,
      1
    ],
    "explain": "Aliases/versions and Prepare after config changes are standard agent lifecycle steps."
  },
  {
    "id": "genai-ramp-044",
    "mode": "exam",
    "topic": "Integration",
    "obj": "2",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base-api.html",
    "q": "Case genai-ramp-044: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. Mobile app should not hold Bedrock credentials. Recommended pattern? Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Backend API (Lambda/API Gateway) assumes role to call Bedrock",
      "Long-lived keys in the app without updating IAM roles or model access in the target Region",
      "Public InvokeModel from browser by disabling Guardrails instead of tuning retrieval parameters",
      "Shared password using only client-side JavaScript to hold long-lived credentials"
    ],
    "correct": 0,
    "explain": "Server-side proxy with IAM roles keeps credentials off client devices."
  },
  {
    "id": "genai-ramp-045",
    "mode": "exam",
    "topic": "Guardrails",
    "obj": "3",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-create.html",
    "q": "Case genai-ramp-045: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. Different apps need different safety policies on the same account. How do you scope Guardrails? Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "One global Guardrail only forever while leaving retrieval and chunking unchanged without updating IAM roles or model access in the target Region",
      "Create Guardrail versions and associate the appropriate ID per application/API call",
      "Disable Guardrails on production by disabling Guardrails instead of tuning retrieval parameters",
      "Use S3 bucket names as policy using only client-side JavaScript to hold long-lived credentials"
    ],
    "correct": 1,
    "explain": "Guardrails are resources you attach per request or application configuration."
  },
  {
    "id": "genai-ramp-046",
    "mode": "exam",
    "topic": "Security",
    "type": "multi",
    "obj": "3",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/security.html",
    "q": "Case genai-ramp-046: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. Reduce prompt injection risk for a RAG assistant. Which TWO help MOST? (Pick 2) Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Ground responses with retrieved context and grounding checks",
      "Separate untrusted user content from system instructions in the prompt structure",
      "Publish system prompt publicly",
      "Disable authentication",
      "Log full secrets to CloudWatch unencrypted"
    ],
    "correct": [
      0,
      1
    ],
    "explain": "Prompt structure and grounding mitigate injection; logging secrets and open prompts increase risk."
  },
  {
    "id": "genai-ramp-047",
    "mode": "exam",
    "topic": "Governance",
    "obj": "3",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/logging.html",
    "q": "Case genai-ramp-047: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. Security team needs who invoked which model and when. Enable: Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "AWS CloudTrail management events for Bedrock control plane and invocation logging as configured",
      "Only S3 access logs without updating IAM roles or model access in the target Region by disabling Guardrails instead of tuning retrieval parameters",
      "Disable all audit by disabling Guardrails instead of tuning retrieval parameters using only client-side JavaScript to hold long-lived credentials",
      "Twitter alerts using only client-side JavaScript to hold long-lived credentials and relying on a single synchronous InvokeModel call for all traffic"
    ],
    "correct": 0,
    "explain": "CloudTrail and optional model invocation logging support governance and forensics."
  },
  {
    "id": "genai-ramp-048",
    "mode": "exam",
    "topic": "Cost",
    "obj": "4",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/on-demand-throughput.html",
    "q": "Case genai-ramp-048: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. Spiky chat traffic with long idle periods overnight. DEFAULT capacity model? Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "On-demand inference with autoscaling app tier",
      "Maximum provisioned throughput 24/7 always without updating IAM roles or model access in the target Region",
      "Buy EC2 GPU fleet manually by disabling Guardrails instead of tuning retrieval parameters",
      "Disable autoscaling using only client-side JavaScript to hold long-lived credentials"
    ],
    "correct": 0,
    "explain": "On-demand fits variable traffic; provisioned suits steady high volume."
  },
  {
    "id": "genai-ramp-049",
    "mode": "exam",
    "topic": "Optimization",
    "obj": "4",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base-retrieval.html",
    "q": "Case genai-ramp-049: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. Context window fills with low-relevance chunks, increasing cost. FIRST fix? Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Raise temperature while leaving retrieval and chunking unchanged without updating IAM roles or model access in the target Region",
      "Reduce numberOfResults, add reranking/metadata filters, tighten score thresholds",
      "Remove Guardrails by disabling Guardrails instead of tuning retrieval parameters using only client-side JavaScript to hold long-lived credentials",
      "Duplicate KB using only client-side JavaScript to hold long-lived credentials and relying on a single synchronous InvokeModel call for all traffic"
    ],
    "correct": 1,
    "explain": "Smaller, relevant context cuts input tokens without sacrificing answer quality."
  },
  {
    "id": "genai-ramp-050",
    "mode": "exam",
    "topic": "Caching",
    "obj": "4",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-caching.html",
    "q": "Case genai-ramp-050: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. Repeated tool definitions and system policies dominate input tokens. Enable: Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Prompt caching for stable prefixes where supported",
      "max_tokens = 1 without updating IAM roles or model access in the target Region",
      "Delete system prompt by disabling Guardrails instead of tuning retrieval parameters",
      "Disable streaming using only client-side JavaScript to hold long-lived credentials"
    ],
    "correct": 0,
    "explain": "Caching bills fewer tokens for repeated static prompt segments."
  },
  {
    "id": "genai-ramp-051",
    "mode": "exam",
    "topic": "Evaluation",
    "obj": "5",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation.html",
    "q": "Case genai-ramp-051: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. Leadership wants regression gates in CI before prompt promotion. Implement: Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Automated evaluation job against golden dataset with pass/fail thresholds",
      "Manual hope without updating IAM roles or model access in the target Region",
      "Chaos in prod only by disabling Guardrails instead of tuning retrieval parameters",
      "Disable tests using only client-side JavaScript to hold long-lived credentials"
    ],
    "correct": 0,
    "explain": "Model evaluation jobs integrate with release pipelines for measurable quality gates."
  },
  {
    "id": "genai-ramp-052",
    "mode": "exam",
    "topic": "Troubleshooting",
    "obj": "2",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/troubleshooting.html",
    "q": "Case genai-ramp-052: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. InvokeModel returns AccessDeniedException though IAM policy looks broad. NEXT check? Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Model access enabled in Region, SCPs, and resource ARN in policy matches model/KB",
      "Increase temperature without updating IAM roles or model access in the target Region",
      "Delete VPC by disabling Guardrails instead of tuning retrieval parameters using only client-side JavaScript to hold long-lived credentials",
      "Disable CloudWatch using only client-side JavaScript to hold long-lived credentials"
    ],
    "correct": 0,
    "explain": "AccessDenied often comes from model access, Region mismatch, SCP, or resource scope—not generation params."
  },
  {
    "id": "genai-ramp-053",
    "mode": "exam",
    "topic": "Testing",
    "obj": "4",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base-evaluation.html",
    "q": "Case genai-ramp-053: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. After changing chunk size, what should you re-run BEFORE launch? Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "KB retrieval evaluation on labeled Q&A pairs",
      "Only EC2 CPU stress test without updating IAM roles or model access in the target Region",
      "Delete indexes by disabling Guardrails instead of tuning retrieval parameters",
      "Turn off hybrid search always using only client-side JavaScript to hold long-lived credentials"
    ],
    "correct": 0,
    "explain": "Retrieval metrics validate chunking changes independently from generation."
  },
  {
    "id": "genai-ramp-054",
    "mode": "exam",
    "topic": "Observability",
    "obj": "4",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/monitoring.html",
    "q": "Case genai-ramp-054: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. P95 latency SLO breaches during peak. Which metrics pinpoint Bedrock vs app issues? Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "CloudWatch Bedrock invocation latency/throttle metrics plus app trace spans",
      "S3 Glacier inventory without updating IAM roles or model access in the target Region",
      "Route 53 only by disabling Guardrails instead of tuning retrieval parameters",
      "IAM credential report only using only client-side JavaScript to hold long-lived credentials"
    ],
    "correct": 0,
    "explain": "Split metrics between Bedrock service and application orchestration layers."
  },
  {
    "id": "genai-ramp-055",
    "mode": "exam",
    "topic": "Troubleshooting",
    "obj": "5",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/agents.html",
    "q": "Case genai-ramp-055: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. Agent returns hallucinated API parameters though OpenAPI schema is attached. FIRST fix? Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Validate action group schema, Prepare agent, and tighten instructions to use schema fields only",
      "Remove Guardrails without updating IAM roles or model access in the target Region by disabling Guardrails instead of tuning retrieval parameters",
      "Delete KB by disabling Guardrails instead of tuning retrieval parameters using only client-side JavaScript to hold long-lived credentials",
      "Switch Region randomly using only client-side JavaScript to hold long-lived credentials and relying on a single synchronous InvokeModel call for all traffic"
    ],
    "correct": 0,
    "explain": "Schema mismatches and stale agent state often cause bad tool arguments; Prepare refreshes compiled config."
  },
  {
    "id": "genai-ramp-056",
    "mode": "exam",
    "topic": "RAG",
    "obj": "1",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-datasource-sync.html",
    "q": "Case genai-ramp-056: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. Ingestion jobs fail on encrypted PDFs in S3. MOST likely missing piece? Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "KB service role granted kms:Decrypt on the CMK and s3:GetObject on prefixes",
      "Higher temperature without updating IAM roles or model access in the target Region",
      "Public bucket ACL by disabling Guardrails instead of tuning retrieval parameters",
      "Disable versioning using only client-side JavaScript to hold long-lived credentials"
    ],
    "correct": 0,
    "explain": "Ingestion roles need S3 and KMS permissions for encrypted sources."
  },
  {
    "id": "genai-ramp-057",
    "mode": "exam",
    "topic": "Implementation",
    "type": "multi",
    "obj": "2",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/inference-profiles.html",
    "q": "Case genai-ramp-057: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. Multi-Region active-active chat with one codebase model identifier. Use which TWO? (Pick 2) Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Inference profile configured for cross-Region routing",
      "Identical Guardrail and KB Region strategy aligned to data residency",
      "Hard-coded laptop IP",
      "Single Region ignore failover",
      "Root access keys in env"
    ],
    "correct": [
      0,
      1
    ],
    "explain": "Inference profiles simplify multi-Region routing; data/guardrail placement must still respect residency."
  },
  {
    "id": "genai-ramp-058",
    "mode": "exam",
    "topic": "Safety",
    "obj": "3",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-components.html",
    "q": "Case genai-ramp-058: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. Users attempt jailbreaks via encoded instructions. Add: Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Guardrails with prompt attack filters and monitor blocked invocations",
      "Higher temperature without updating IAM roles or model access in the target Region",
      "Remove logging by disabling Guardrails instead of tuning retrieval parameters",
      "Public admin panel using only client-side JavaScript to hold long-lived credentials"
    ],
    "correct": 0,
    "explain": "Guardrails include filters aimed at prompt attacks; monitor blocks for abuse patterns."
  },
  {
    "id": "genai-ramp-059",
    "mode": "exam",
    "topic": "Fine-Tuning",
    "obj": "1",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/custom-models-training.html",
    "q": "Case genai-ramp-059: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. Training data for customization must be stored where for Bedrock fine-tuning jobs? Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Amazon S3 in the same Region as the training job",
      "Local USB drives without updating IAM roles or model access in the target Region",
      "Public HTTP without TLS by disabling Guardrails instead of tuning retrieval parameters",
      "DynamoDB streams only using only client-side JavaScript to hold long-lived credentials"
    ],
    "correct": 0,
    "explain": "Custom model jobs read labeled datasets from S3 with appropriate IAM/KMS."
  },
  {
    "id": "genai-ramp-060",
    "mode": "exam",
    "topic": "Flows",
    "obj": "2",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/flows.html",
    "q": "Case genai-ramp-060: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. Non-technical reviewers need to adjust branching logic without redeploying Java. Prefer: Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Bedrock Flows managed in console with versioned deployments",
      "Recompile monolith weekly without updating IAM roles or model access in the target Region",
      "Edit minified JS in prod by disabling Guardrails instead of tuning retrieval parameters",
      "Disable change control using only client-side JavaScript to hold long-lived credentials"
    ],
    "correct": 0,
    "explain": "Flows expose visual orchestration with lifecycle management separate from app binaries."
  },
  {
    "id": "genai-ramp-061",
    "mode": "exam",
    "topic": "Cost",
    "type": "multi",
    "obj": "4",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/batch-inference.html",
    "q": "Case genai-ramp-061: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. Reduce spend on offline summarization AND interactive chat. Which TWO pairings fit? (Pick 2) Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Batch inference for bulk archive summarization",
      "On-demand or provisioned for interactive chat per traffic shape",
      "Batch for real-time chat UI",
      "Max tokens on every call",
      "Disable monitoring"
    ],
    "correct": [
      0,
      1
    ],
    "explain": "Batch for offline bulk; on-demand/provisioned for latency-sensitive interactive paths."
  },
  {
    "id": "genai-ramp-062",
    "mode": "exam",
    "topic": "Evaluation",
    "type": "multi",
    "obj": "3",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation.html",
    "q": "Case genai-ramp-062: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. Holistic release checklist for a RAG app includes which TWO automated tests? (Pick 2) Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Retrieval quality evaluation on labeled sets",
      "Generation quality/safety metrics on golden prompts",
      "Delete production KB",
      "Disable IAM",
      "Turn off encryption"
    ],
    "correct": [
      0,
      1
    ],
    "explain": "Retrieval and generation/safety evals cover the two-stage RAG failure modes."
  },
  {
    "id": "genai-ramp-063",
    "mode": "exam",
    "topic": "Vectors",
    "obj": "1",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base-setup.html",
    "q": "Case genai-ramp-063: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. OpenSearch Serverless backs your KB. Index capacity errors appear at peak ingest. FIRST step? Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Adjust OpenSearch Serverless capacity/OCU settings and stagger sync jobs",
      "Disable encryption without updating IAM roles or model access in the target Region",
      "Remove all metadata by disabling Guardrails instead of tuning retrieval parameters",
      "Switch to plaintext HTTP using only client-side JavaScript to hold long-lived credentials"
    ],
    "correct": 0,
    "explain": "Vector store capacity and ingestion scheduling affect KB sync success."
  },
  {
    "id": "genai-ramp-064",
    "mode": "exam",
    "topic": "Integration",
    "obj": "2",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/agents-action-group.html",
    "q": "Case genai-ramp-064: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. Tool calls must hit a private API in your VPC. Recommended network path? Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Lambda in VPC integrated with API Gateway private endpoint or internal ALB via action group",
      "Public internet without auth without updating IAM roles or model access in the target Region",
      "Store JWT in prompt by disabling Guardrails instead of tuning retrieval parameters using only client-side JavaScript to hold long-lived credentials",
      "Disable TLS using only client-side JavaScript to hold long-lived credentials and relying on a single synchronous InvokeModel call for all traffic"
    ],
    "correct": 0,
    "explain": "Agents invoke Lambda; Lambda reaches private APIs inside VPC securely."
  },
  {
    "id": "genai-ramp-065",
    "mode": "exam",
    "topic": "Troubleshooting",
    "obj": "4",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/service-quotas.html",
    "q": "Case genai-ramp-065: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. Streaming responses stall mid-generation with no error in app logs. Check: Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Client/proxy idle timeouts vs InvokeModelWithResponseStream duration and network path",
      "S3 lifecycle only without updating IAM roles or model access in the target Region by disabling Guardrails instead of tuning retrieval parameters",
      "Delete Guardrails first by disabling Guardrails instead of tuning retrieval parameters",
      "Change embedding model using only client-side JavaScript to hold long-lived credentials"
    ],
    "correct": 0,
    "explain": "Streaming can be cut by intermediary timeouts while the model continues generating."
  },
  {
    "id": "genai-ramp-066",
    "mode": "exam",
    "topic": "Compliance",
    "obj": "1",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/data-protection.html",
    "q": "Case genai-ramp-066: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. A healthcare team must keep patient prompts and model outputs in a specific AWS Region and block cross-Region inference for regulated workloads. Which combination addresses data residency for Bedrock use? Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Enable cross-Region inference profiles so each request auto-routes to the lowest-latency Region available",
      "Keep Bedrock and KB in the approved Region; IAM limits InvokeModel to that Region",
      "Mirror prompts nightly to every Region for disaster recovery without encryption or access logging",
      "Log full prompts to a shared analytics account in another Region to centralize compliance reporting"
    ],
    "correct": 1,
    "explain": "Bedrock and KB resources are Regional; IAM can restrict InvokeModel to approved Regions/models. Cross-Region profiles and uncontrolled replication move data outside residency boundaries."
  },
  {
    "id": "genai-ramp-067",
    "mode": "exam",
    "topic": "Foundation Models",
    "type": "multi",
    "obj": "1",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-access.html",
    "q": "Case genai-ramp-067: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. You are onboarding a new account for Bedrock: developers need Claude and Titan in us-east-1, finance wants visibility into who enabled models, and security wants no model use until approved. Which TWO controls apply first? (Pick 2) Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Enable model access per foundation model in the Bedrock console for the account/Region",
      "Attach IAM policies granting bedrock:InvokeModel only to approved roles after access is on",
      "Grant bedrock:* on * to the developers group to avoid access delays during the pilot",
      "Rely on default VPC security groups alone without Bedrock model access requests",
      "Use the AWS account root user for daily InvokeModel calls to skip role setup"
    ],
    "correct": [
      0,
      1
    ],
    "explain": "Model access must be enabled per model/Region; IAM then gates InvokeModel to authorized principals. Wildcard bedrock:*, VPC-only controls, and daily root use bypass least privilege."
  },
  {
    "id": "genai-ramp-068",
    "mode": "exam",
    "topic": "Guardrails",
    "obj": "3",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html",
    "q": "Case genai-ramp-068: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. A customer-facing chatbot occasionally returns toxic content when users jailbreak with role-play prompts. Leadership wants filtering without retraining the base model. What should you implement? Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Shorten max_tokens so harmful replies truncate before users read them in the chat UI",
      "Switch to a smaller foundation model because smaller models inherently refuse more jailbreak attempts",
      "Use a Bedrock Guardrail with denied topics and toxicity filters on InvokeModel",
      "Remove the system prompt so user messages are the only instructions the model receives"
    ],
    "correct": 2,
    "explain": "Guardrails apply input/output policy filters without changing model weights. Token limits and model size do not reliably block jailbreaks; dropping the system prompt often weakens safety instructions."
  },
  {
    "id": "genai-ramp-069",
    "mode": "exam",
    "topic": "Evaluation",
    "obj": "1",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base-evaluation.html",
    "q": "Case genai-ramp-069: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. After a KB sync, stakeholders report correct answers dropped 15 points on a golden Q&A set while retrieval logs show fewer chunks returned for SKU-heavy queries. What is the BEST next diagnostic step? Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Raise top_k to the service maximum on every query so more chunks always return regardless of relevance",
      "Run KB evaluation on the golden Q&A set; compare retrieval scores to the pre-sync baseline",
      "Rollback the embedding model to an older version without reviewing sync job logs or chunk statistics",
      "Turn off chunking so each source document becomes one giant vector passed to the generator using synchronous InvokeModel only without exponential backoff on throttling"
    ],
    "correct": 1,
    "explain": "KB evaluation measures retrieval and answer quality on labeled data, isolating sync regressions. Arbitrary top_k changes, blind rollbacks, or disabling chunking mask ingestion issues."
  },
  {
    "id": "genai-ramp-070",
    "mode": "exam",
    "topic": "Converse API",
    "obj": "2",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/conversation-inference.html",
    "q": "Case genai-ramp-070: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. Your microservices call different Bedrock models but need one SDK pattern for multi-turn chat, tool use, and Guardrails on the same thread. What reduces integration sprawl? Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Implement separate InvokeModel, InvokeModelWithResponseStream, and Agent runtime clients per feature team",
      "Standardize on the Converse and ConverseStream APIs with shared message history and toolConfig blocks",
      "Proxy all models through a single EC2 instance running custom HTTP wrappers for workloads that skip Guardrails on production traffic to save tokens",
      "Store conversation state only in browser localStorage without server-side session binding using synchronous InvokeModel only without exponential backoff on throttling"
    ],
    "correct": 1,
    "explain": "Converse/ConverseStream unify multi-turn messages, tools, and guardrail config across models. Per-model bespoke clients and ad hoc proxies increase maintenance; client-only state breaks server-side control."
  },
  {
    "id": "genai-ramp-071",
    "mode": "exam",
    "topic": "Data ingestion",
    "type": "multi",
    "obj": "1",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-data-source-sync.html",
    "q": "Case genai-ramp-071: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. A knowledge base ingests from S3 documents and Confluence via connectors. Compliance requires PII redaction before embedding and an audit trail of sync jobs. Which TWO practices fit? (Pick 2) Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Redact or tag PII in upstream ETL before connector sync; retain sync job history plus CloudTrail for Bedrock/KB APIs",
      "Scope the KB service role to required S3 prefixes and store connector credentials in Secrets Manager",
      "Grant the connector broad admin on Confluence so sync never fails on permissions",
      "Skip incremental sync and full re-embed all documents hourly to simplify auditing",
      "Use one shared IAM user access key checked into the connector config repository"
    ],
    "correct": [
      0,
      1
    ],
    "explain": "Redaction upstream plus audit logs supports compliance; least-privilege IAM and secrets for connectors is standard. Over-broad connector admin, wasteful full re-embeds, and keys in repos violate security baselines."
  },
  {
    "id": "genai-ramp-072",
    "mode": "exam",
    "topic": "Embeddings",
    "obj": "1",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base-setup.html",
    "q": "Case genai-ramp-072: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. A multilingual support KB must retrieve equally well in English and Spanish product docs. Current English-only embedding model hurts Spanish recall. FIRST change? Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Raise generation temperature so answers sound more confident in every language regardless of retrieval quality",
      "Select a multilingual embedding model (or per-locale indexes) aligned to document languages",
      "Delete Spanish documents to keep a single-language index size smaller and simplify chunking rules",
      "Disable vector search and rely on full-document prompts only without changing the embedding model"
    ],
    "correct": 1,
    "explain": "Retrieval quality depends on embedding-language alignment. Temperature and deleting locales do not fix recall; skipping vectors removes RAG benefits."
  },
  {
    "id": "genai-ramp-073",
    "mode": "exam",
    "topic": "Security",
    "type": "multi",
    "obj": "1",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/data-protection.html",
    "q": "Case genai-ramp-073: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. Security reviews a new Bedrock workload storing prompts in S3 and invoking models from Lambda. Which TWO controls address encryption and access? (Pick 2) Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Enable SSE-KMS on prompt/log buckets with keys restricted to the workload account",
      "Use IAM roles for Lambda with least-privilege bedrock:InvokeModel and s3:GetObject scoped to prefixes",
      "Publish bucket policies with Principal \"*\" for easier cross-team testing",
      "Disable TLS between Lambda and Bedrock to reduce CPU overhead in the VPC",
      "Store model IDs in plaintext GitHub gists for developer convenience"
    ],
    "correct": [
      0,
      1
    ],
    "explain": "KMS-backed encryption and role-based least privilege are baseline for Bedrock data paths. Public principals, plaintext transport, and leaked config widen blast radius."
  },
  {
    "id": "genai-ramp-074",
    "mode": "exam",
    "topic": "Agents",
    "obj": "2",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/agents.html",
    "q": "Case genai-ramp-074: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. An agent must book appointments by calling your REST API with OAuth client credentials rotated monthly. How should credentials reach the action group Lambda? Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Hard-code client secrets in the agent instruction prompt for faster cold starts on every invocation",
      "Store secrets in Secrets Manager; Lambda retrieves them at runtime with a scoped execution role",
      "Email the refresh token to agents as a system message on every user turn for operators to read for workloads that skip Guardrails on production traffic to save tokens",
      "Embed secrets in OpenAPI schema descriptions visible to the foundation model during planning using synchronous InvokeModel only without exponential backoff on throttling"
    ],
    "correct": 1,
    "explain": "Secrets Manager plus IAM-scoped Lambda retrieval keeps credentials out of prompts and model-visible artifacts."
  },
  {
    "id": "genai-ramp-075",
    "mode": "exam",
    "topic": "Prompt Management",
    "type": "multi",
    "obj": "2",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-management.html",
    "q": "Case genai-ramp-075: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. Product wants reusable prompt templates, A/B tests between versions, and a visual path from prompt to KB to model. Which TWO Bedrock features combine? (Pick 2) Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Prompt Management versions/aliases for template lifecycle",
      "Flows to wire prompt, retrieval, and model nodes with conditions",
      "S3 lifecycle rules on model weights for prompt storage",
      "EC2 user-data scripts as the only prompt store",
      "CloudFront cache behaviors to store system prompts at edge"
    ],
    "correct": [
      0,
      1
    ],
    "explain": "Prompt Management governs template versions; Flows orchestrates multi-step generative paths including prompts and KB retrieval."
  },
  {
    "id": "genai-ramp-076",
    "mode": "exam",
    "topic": "Governance",
    "obj": "3",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/security_iam_id-based-policy-examples.html",
    "q": "Case genai-ramp-076: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. A shared AWS account hosts Bedrock for multiple product lines. Auditors require developers cannot invoke unapproved models even if they guess model IDs. BEST IAM pattern? Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Allow bedrock:InvokeModel on * for the Developers group to avoid ticket delays during the pilot phase",
      "Deny InvokeModel unless Region and model ARN match an allow-list on approved models",
      "Remove all Deny statements because Deny breaks CI pipelines automatically in every account layout",
      "Use the root user access keys in CI because they bypass service quotas and model access gates"
    ],
    "correct": 1,
    "explain": "Condition keys and explicit allow-lists block invocation of unapproved foundation models while permitting approved ARNs."
  },
  {
    "id": "genai-ramp-077",
    "mode": "exam",
    "topic": "Guardrails",
    "type": "multi",
    "obj": "3",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-sensitive-filters.html",
    "q": "Case genai-ramp-077: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. A healthcare assistant must block PII in user uploads and model replies while still allowing clinical FAQ answers. Which TWO Guardrail capabilities apply? (Pick 2) Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Sensitive information filters on input and output",
      "Denied topic policies for non-clinical advice categories",
      "Word filters that delete every medical term from all responses",
      "Contextual grounding checks only, with no input filters",
      "Disable logging so PII never appears in CloudWatch"
    ],
    "correct": [
      0,
      1
    ],
    "explain": "Sensitive filters redact PII; denied topics steer away from disallowed categories without stripping all medical vocabulary."
  },
  {
    "id": "genai-ramp-078",
    "mode": "exam",
    "topic": "Cost",
    "obj": "4",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/provisioned-throughput.html",
    "q": "Case genai-ramp-078: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. Traffic is flat at 25 RPS for one Claude model 24×7. On-demand bills are spiking. Finance wants predictable cost without sacrificing latency. FIRST lever? Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Purchase Provisioned Throughput sized to the steady baseline for that model in the Region",
      "Move all traffic to batch inference jobs polled every hour for synchronous chat responses if incremental sync completed without labeled evaluation on golden prompts",
      "Delete Guardrails to reduce billed tokens per request without changing the inference mode for workloads that skip Guardrails on production traffic to save tokens",
      "Switch to the smallest embedding model for chat generation to cut generation pricing using synchronous InvokeModel only without exponential backoff on throttling"
    ],
    "correct": 0,
    "explain": "Provisioned Throughput fits steady high-volume inference. Batch is asynchronous; Guardrails and embedding models do not replace generation pricing models."
  },
  {
    "id": "genai-ramp-079",
    "mode": "exam",
    "topic": "Optimization",
    "type": "multi",
    "obj": "4",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-caching.html",
    "q": "Case genai-ramp-079: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. An internal copilot reuses a 4k-token policy preamble and tool JSON on every request. Latency and input-token cost are high. Which TWO optimizations help? (Pick 2) Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Enable prompt caching for the static prefix on supported models",
      "Right-size max_tokens to expected answer length instead of always using model maximum",
      "Duplicate the preamble in every user message to improve recall",
      "Disable streaming to eliminate time-to-first-token metrics",
      "Turn off CloudWatch metrics to save cost"
    ],
    "correct": [
      0,
      1
    ],
    "explain": "Prompt caching bills and processes repeated prefixes once; tighter max_tokens caps generation spend."
  },
  {
    "id": "genai-ramp-080",
    "mode": "exam",
    "topic": "Chunking",
    "obj": "1",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-chunking.html",
    "q": "Case genai-ramp-080: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. PDF manuals mix long prose with tables of SKU specifications. Retrieval returns prose chunks but misses table rows for part numbers. BEST ingestion tweak? Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Use hierarchical or custom chunking that preserves table rows and headings where supported",
      "Set chunk size to 10 tokens so every table splits into random fragments during every sync job",
      "Remove all tables at ingest because embeddings cannot represent numbers in any AWS Region for workloads that skip Guardrails on production traffic to save tokens",
      "Answer part-number questions from the generation model without retrieval or grounding checks"
    ],
    "correct": 0,
    "explain": "Chunking strategies that respect structure improve lexical and semantic recall for tabular SKUs."
  },
  {
    "id": "genai-ramp-081",
    "mode": "exam",
    "topic": "Integration",
    "obj": "2",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/cross-account-access.html",
    "q": "Case genai-ramp-081: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. Account A hosts the app; Account B owns the Bedrock custom model and KMS keys. How should Account A invoke the custom model? Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Share root credentials across accounts for simplicity when rotating keys each quarter when model access is already enabled in another Region for pilot workloads",
      "Use a resource policy on the custom model plus KMS grants so Account A's role can InvokeModel",
      "Copy model artifacts to a public S3 bucket in Account A for faster cross-account downloads for workloads that skip Guardrails on production traffic to save tokens",
      "Disable encryption on the custom model endpoint in Account B to reduce KMS API calls using synchronous InvokeModel only without exponential backoff on throttling"
    ],
    "correct": 1,
    "explain": "Cross-account invocation relies on resource policies and KMS permissions on the model account, not shared root keys or public artifacts."
  },
  {
    "id": "genai-ramp-082",
    "mode": "exam",
    "topic": "Troubleshooting",
    "obj": "2",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/troubleshooting-api-error-codes.html",
    "q": "Case genai-ramp-082: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. Production sees intermittent ThrottlingException on InvokeModel during marketing spikes. Application logs show retries without backoff. BEST mitigation? Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Implement exponential backoff with jitter and request a service quota increase if sustained",
      "Remove all retries so failures surface immediately to users without recovery or alerting if incremental sync completed without labeled evaluation on golden prompts",
      "Switch to a different AWS Region mid-request without client changes or endpoint configuration",
      "Hard-code sleep(0) in a tight loop to maximize throughput during quota enforcement windows using synchronous InvokeModel only without exponential backoff on throttling"
    ],
    "correct": 0,
    "explain": "Backoff reduces thundering herds; quota increases address sustained overages. Blind region hops or zero-delay loops worsen throttling."
  },
  {
    "id": "genai-ramp-083",
    "mode": "exam",
    "topic": "Evaluation",
    "type": "multi",
    "obj": "1",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation-jobs.html",
    "q": "Case genai-ramp-083: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. Before promoting a new RAG prompt version, which TWO validation steps match Bedrock evaluation practices? (Pick 2) Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Run automated model evaluation jobs on golden prompts with human review where required",
      "Compare retrieval metrics on a labeled Q&A set after KB or prompt changes",
      "Ship to 100% traffic first, then measure social media sentiment",
      "Disable Guardrails during eval so scores look higher",
      "Skip labeled data because production traffic is enough"
    ],
    "correct": [
      0,
      1
    ],
    "explain": "Managed evaluation jobs plus retrieval checks on labeled sets catch regressions before full rollout."
  },
  {
    "id": "genai-ramp-084",
    "mode": "exam",
    "topic": "Observability",
    "obj": "4",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/monitoring.html",
    "q": "Case genai-ramp-084: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. SREs need token counts, latency, and throttling per model for a multi-tenant Bedrock API. FIRST observability step? Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Enable Amazon CloudWatch metrics and logs for Bedrock with dashboards on Invocations and OutputTokenCount",
      "Disable logging to reduce overhead during peak marketing events across all Regions and accounts if incremental sync completed without labeled evaluation on golden prompts",
      "Sample one request per day manually from browser devtools without storing timestamps centrally for workloads that skip Guardrails on production traffic to save tokens",
      "Store metrics only in the user session cookie on the client device without server-side aggregation using synchronous InvokeModel only without exponential backoff on throttling"
    ],
    "correct": 0,
    "explain": "Bedrock publishes CloudWatch metrics for invocation, tokens, and errors; dashboards support capacity planning."
  },
  {
    "id": "genai-ramp-085",
    "mode": "exam",
    "topic": "RAG",
    "type": "multi",
    "obj": "1",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html",
    "q": "Case genai-ramp-085: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. A RAG app hallucinates when retrieved chunks are stale after nightly catalog updates. Which TWO changes reduce stale answers? (Pick 2) Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Schedule incremental knowledge base sync after catalog ETL completes",
      "Add metadata filters so retrieval prefers current catalog version fields",
      "Disable retrieval and rely on model parametric memory only",
      "Set temperature to zero and remove the system prompt entirely",
      "Delete the vector index weekly without re-sync"
    ],
    "correct": [
      0,
      1
    ],
    "explain": "Fresh sync plus version metadata keeps retrieval aligned with current catalog rows."
  },
  {
    "id": "genai-ramp-086",
    "mode": "exam",
    "topic": "Agents",
    "type": "multi",
    "obj": "2",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/agents-trace.html",
    "q": "Case genai-ramp-086: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. Debug an agent that loops on the same tool call. Which TWO tools help? (Pick 2) Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Enable agent trace to inspect rationale and tool invocation sequence",
      "Review action group OpenAPI schema for ambiguous required parameters",
      "Disable all tools so the model answers from memory only",
      "Increase max_tokens to maximum on every turn",
      "Remove IAM from the Lambda backing the action group"
    ],
    "correct": [
      0,
      1
    ],
    "explain": "Trace shows planning loops; schema clarity reduces malformed tool inputs."
  },
  {
    "id": "genai-ramp-087",
    "mode": "exam",
    "topic": "Safety",
    "obj": "3",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-contextual-grounding.html",
    "q": "Case genai-ramp-087: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. Answers must cite retrieved passages and refuse when grounding score is low. Which Guardrail feature applies? Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Contextual grounding check comparing model output to retrieved sources",
      "Word filter that blocks every verb longer than eight characters in all languages supported",
      "Denied topic list that removes all healthcare terms globally from every user utterance",
      "Sensitive information filter that deletes all numbers from output including dates and dosages"
    ],
    "correct": 0,
    "explain": "Contextual grounding evaluates whether responses stay faithful to provided context."
  },
  {
    "id": "genai-ramp-088",
    "mode": "exam",
    "topic": "Latency",
    "obj": "4",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/inference.html",
    "q": "Case genai-ramp-088: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. Users report high time-to-first-token on streaming chat. Retrieval is fast; generation model is large. FIRST tuning knob? Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Profile model latency per FM and consider a smaller model or region colocation for interactive paths",
      "Disable streaming so users wait for the full response silently without partial token delivery if incremental sync completed without labeled evaluation on golden prompts",
      "Remove Guardrails entirely to skip policy evaluation latency on every production InvokeModel call for workloads that skip Guardrails on production traffic to save tokens",
      "Double the number of retrieved chunks on every request regardless of prompt length or cost using synchronous InvokeModel only without exponential backoff on throttling"
    ],
    "correct": 0,
    "explain": "Model size and network path dominate TTFT; streaming still benefits from right-sized models."
  },
  {
    "id": "genai-ramp-089",
    "mode": "exam",
    "topic": "Fine-Tuning",
    "obj": "1",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/custom-model-job.html",
    "q": "Case genai-ramp-089: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. A custom model job failed with insufficient training data format errors. What should you verify FIRST in S3? Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "JSONL or specified format matches Bedrock customization requirements for the chosen base model",
      "The S3 bucket is in a different Region than the training job for cost savings without replication",
      "Training files are gzip-compressed with random file extensions and no manifest metadata for workloads that skip Guardrails on production traffic to save tokens",
      "Labels are stored only in CloudWatch log streams instead of structured training objects in S3 using synchronous InvokeModel only without exponential backoff on throttling"
    ],
    "correct": 0,
    "explain": "Customization jobs validate schema and record layout before training starts."
  },
  {
    "id": "genai-ramp-090",
    "mode": "exam",
    "topic": "Cost",
    "type": "multi",
    "obj": "4",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/on-demand.html",
    "q": "Case genai-ramp-090: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. Finance asks which TWO levers reduce on-demand spend without removing Guardrails from production chat? (Pick 2) Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Right-size models for each use case instead of using the largest FM everywhere",
      "Cache static prompt prefixes where supported on the chosen models",
      "Disable all CloudWatch alarms to avoid notification costs",
      "Send duplicate identical requests to two models and pick the longer answer",
      "Store embeddings on every request even when the user message is empty"
    ],
    "correct": [
      0,
      1
    ],
    "explain": "Model selection and prompt caching directly reduce billed tokens; duplicate invocations increase cost."
  },
  {
    "id": "genai-ramp-091",
    "mode": "exam",
    "topic": "Integration",
    "obj": "2",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-api.html",
    "q": "Case genai-ramp-091: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. A mobile app must query a knowledge base without exposing database credentials. Recommended pattern? Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Call a backend API that uses IAM role credentials to RetrieveAndGenerate on Bedrock",
      "Embed long-lived IAM user keys in the mobile app binary for direct Bedrock access in production",
      "Expose the knowledge base data source connection string in the app config file signed by the store",
      "Disable TLS between the app and API to reduce CPU usage on phones during peak commute hours"
    ],
    "correct": 0,
    "explain": "Bedrock calls belong on the server with IAM roles; clients never hold data-plane secrets."
  },
  {
    "id": "genai-ramp-092",
    "mode": "exam",
    "topic": "Troubleshooting",
    "obj": "2",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/troubleshooting-api-error-codes.html",
    "q": "Case genai-ramp-092: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. InvokeModel returns AccessDeniedException after a model rename in the console. Most likely cause? Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "IAM policy still references the previous foundation model ID or ARN after access was re-requested",
      "Temperature was set below zero in the request body JSON payload according to the API schema if incremental sync completed without labeled evaluation on golden prompts",
      "The user switched browsers without clearing cookies on the marketing site landing page for workloads that skip Guardrails on production traffic to save tokens",
      "CloudWatch log group retention was reduced from 30 to 7 days for unrelated Lambda functions using synchronous InvokeModel only without exponential backoff on throttling"
    ],
    "correct": 0,
    "explain": "Model identifiers and access flags change; IAM must match currently enabled model resources."
  },
  {
    "id": "genai-ramp-093",
    "mode": "exam",
    "topic": "Evaluation",
    "type": "multi",
    "obj": "4",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation.html",
    "q": "Case genai-ramp-093: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. Which TWO metrics belong in a Bedrock RAG release scorecard? (Pick 2) Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Retrieval precision/recall on labeled questions",
      "Helpfulness or correctness scores from model evaluation jobs",
      "Number of S3 buckets in the account regardless of KB use",
      "EC2 CPU utilization for unrelated web servers",
      "Social media follower count for the product brand"
    ],
    "correct": [
      0,
      1
    ],
    "explain": "RAG quality combines retrieval metrics and generation evaluation on curated prompts."
  },
  {
    "id": "genai-ramp-094",
    "mode": "exam",
    "topic": "Integration",
    "type": "multi",
    "obj": "2",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/agents.html",
    "q": "Case genai-ramp-094: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. You are wiring a Bedrock Agent to Salesforce and an internal Postgres via separate action groups. Security wants least privilege and auditable tool calls. Which TWO designs fit? (Pick 2) Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "One Lambda per action group with IAM roles scoped to each backend API",
      "OpenAPI schemas with explicit parameters; secrets in Secrets Manager",
      "Single Lambda with admin IAM role shared by all CRM and database tools",
      "Long-lived access keys embedded in agent instructions for OAuth refresh",
      "Public API Gateway endpoints without authorizers for faster agent loops"
    ],
    "correct": [
      0,
      1
    ],
    "explain": "Scoped Lambdas and schema-driven tools limit blast radius; secrets stay out of prompts."
  },
  {
    "id": "genai-ramp-095",
    "mode": "exam",
    "topic": "Data sources",
    "obj": "1",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-ds-create.html",
    "q": "Case genai-ramp-095: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. Legal requires deletion of a customer's files from the knowledge base within 24 hours of an erasure request. The KB ingests from a shared S3 prefix. BEST operational approach? Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Tag objects with customer IDs; delete or exclude tagged keys and run targeted sync jobs",
      "Disable the entire knowledge base for all tenants until manual review completes each quarter",
      "Wait for the next full re-embed of all buckets regardless of tenant scope or legal deadline",
      "Remove Guardrails so the model refuses fewer deletion-related questions from end users using synchronous InvokeModel only without exponential backoff on throttling"
    ],
    "correct": 0,
    "explain": "Per-customer tagging plus targeted sync/removal supports erasure without wiping unrelated data."
  },
  {
    "id": "genai-ramp-096",
    "mode": "exam",
    "topic": "Knowledge Bases",
    "type": "multi",
    "obj": "1",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base-setup.html",
    "q": "Case genai-ramp-096: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. A global retailer adds PDFs, HTML help, and CSV price feeds to one knowledge base. Search quality varies by format. Which TWO ingestion choices improve retrieval? (Pick 2) Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Use format-aware chunking and metadata (product ID, locale) on each source type",
      "Enable hybrid search when SKUs and prose appear in the same questions",
      "Store all sources as one plaintext file without structure to simplify parsing",
      "Use one fixed 32-token chunk size for every document type and language",
      "Skip embeddings and pass entire S3 buckets into the prompt each time"
    ],
    "correct": [
      0,
      1
    ],
    "explain": "Structure-aware chunking plus hybrid recall helps mixed catalog and narrative content."
  },
  {
    "id": "genai-ramp-097",
    "mode": "exam",
    "topic": "Model access",
    "obj": "2",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-access.html",
    "q": "Case genai-ramp-097: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. CI pipelines in a shared services account must invoke only approved Claude and Titan models in us-west-2. Developers use assumed roles. What prevents accidental use of other FMs? Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "IAM policy Allow on bedrock:InvokeModel with Resource ARNs listing approved models only",
      "Attach AdministratorAccess to the CI role so deployments never fail on permissions during releases",
      "Disable CloudTrail for Bedrock in the account to reduce log storage charges across all Regions",
      "Hard-code model IDs in public GitHub workflows without IAM conditions or approval gates using synchronous InvokeModel only without exponential backoff on throttling"
    ],
    "correct": 0,
    "explain": "Resource-scoped Allow lists enforce which foundation models CI may invoke."
  },
  {
    "id": "genai-ramp-098",
    "mode": "exam",
    "topic": "Responsible AI",
    "type": "multi",
    "obj": "3",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html",
    "q": "Case genai-ramp-098: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. An internal HR assistant must block requests for individual salary data and toxic language while allowing policy FAQs. Which TWO Guardrail controls combine? (Pick 2) Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Sensitive information filters for PII patterns on input and output",
      "Denied topics or phrases for individual compensation inquiries",
      "Word filter that removes every noun longer than six characters",
      "Disable all logging so HR chats never appear in audit systems",
      "Set temperature to 2.0 on all InvokeModel calls company-wide"
    ],
    "correct": [
      0,
      1
    ],
    "explain": "PII filters plus topic denial target HR-specific risks without breaking legitimate policy answers."
  },
  {
    "id": "genai-ramp-099",
    "mode": "exam",
    "topic": "Throughput",
    "obj": "4",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/provisioned-throughput.html",
    "q": "Case genai-ramp-099: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. Burst traffic hits 3× baseline for two hours daily; otherwise load is flat. On-demand costs are acceptable off-peak but throttling occurs at peak. BEST blend? Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Provisioned Throughput for baseline plus on-demand for burst with backoff and quotas",
      "Provisioned Throughput sized only to peak with zero on-demand fallback ever for chat traffic",
      "Batch inference for all interactive chat during the two-hour peak window without polling",
      "Disable Guardrails during peak solely to reduce billed output tokens on every request"
    ],
    "correct": 0,
    "explain": "Baseline provisioned capacity plus on-demand overflow matches mixed steady/burst patterns."
  },
  {
    "id": "genai-ramp-100",
    "mode": "exam",
    "topic": "Optimization",
    "type": "multi",
    "obj": "4",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/inference-request-response.html",
    "q": "Case genai-ramp-100: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. Latency SLO is 800 ms to first token; answers average 120 tokens. Which TWO request settings help? (Pick 2) Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Set max_tokens near expected answer length instead of model maximum",
      "Use streaming InvokeModelWithResponseStream for progressive UI rendering",
      "Always request 8k max_tokens so the model never stops early on long answers",
      "Attach five Guardrails sequentially on every call for defense in depth",
      "Send the entire 200k-token policy PDF inline on each user message"
    ],
    "correct": [
      0,
      1
    ],
    "explain": "Right-sized generation limits and streaming improve perceived latency without extra work per token."
  },
  {
    "id": "genai-ramp-101",
    "mode": "exam",
    "topic": "Compliance",
    "obj": "1",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/logging-using-cloudtrail.html",
    "q": "Case genai-ramp-101: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. Auditors need who invoked which model and when for a regulated workload. Which logging approach satisfies traceability? Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Enable AWS CloudTrail data events or management events for Bedrock API calls with retention",
      "Turn off all account logging to minimize storage cost in the compliance OU for all services if incremental sync completed without labeled evaluation on golden prompts",
      "Log only failed requests in application stdout on developer laptops without central aggregation",
      "Rely on users to self-report model usage in a shared spreadsheet weekly for auditor review using synchronous InvokeModel only without exponential backoff on throttling"
    ],
    "correct": 0,
    "explain": "CloudTrail captures API identity, time, and model resource for Bedrock invocations."
  },
  {
    "id": "genai-ramp-102",
    "mode": "exam",
    "topic": "Flows",
    "type": "multi",
    "obj": "2",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/flows.html",
    "q": "Case genai-ramp-102: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. Product wants a visual workflow: classify intent → retrieve from KB → invoke model → branch on confidence score. Which TWO components are native? (Pick 2) Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Bedrock Flows nodes for prompt, knowledge base retrieval, and conditions",
      "Prompt Management templates referenced from flow nodes",
      "AWS Step Functions Standard workflows as the only supported orchestrator",
      "Manual cron on EC2 to chain shell scripts calling curl to InvokeModel",
      "S3 event notifications alone without any generative orchestration layer"
    ],
    "correct": [
      0,
      1
    ],
    "explain": "Flows orchestrates generative steps; Prompt Management supplies versioned templates inside flows."
  },
  {
    "id": "genai-ramp-103",
    "mode": "exam",
    "topic": "Governance",
    "obj": "3",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/security.html",
    "q": "Case genai-ramp-103: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. A vendor model processes customer prompts. Legal requires encryption in transit and at rest for prompts stored briefly in your account. Which combination applies? Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "TLS for Bedrock API calls plus SSE-KMS on any S3 prompt archives you control",
      "HTTP InvokeModel for lower latency inside the corporate network only without certificate pinning",
      "Store prompts unencrypted in ElastiCache for faster replay during debugging in shared environments",
      "Disable KMS so Bedrock can read prompts without key policy updates in the data account"
    ],
    "correct": 0,
    "explain": "Bedrock APIs use TLS; customer-managed storage should use KMS-backed encryption."
  },
  {
    "id": "genai-ramp-104",
    "mode": "exam",
    "topic": "Vectors",
    "type": "multi",
    "obj": "1",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base-setup.html",
    "q": "Case genai-ramp-104: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. You must support 10 million vectors with managed scaling and IAM integration for a new knowledge base. Which TWO vector store choices fit Bedrock KB? (Pick 2) Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Amazon OpenSearch Serverless collection configured as the KB vector store",
      "Amazon Aurora PostgreSQL with pgvector when configured as supported storage",
      "A spreadsheet on a developer laptop synced over email attachments",
      "Unencrypted local SQLite file mounted on a single t2.micro instance",
      "Public Redis cluster with no AUTH token for faster prototyping"
    ],
    "correct": [
      0,
      1
    ],
    "explain": "Bedrock integrates with supported managed vector backends such as OpenSearch Serverless and Aurora pgvector."
  },
  {
    "id": "genai-ramp-105",
    "mode": "exam",
    "topic": "Implementation",
    "obj": "2",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-api-retrieve.html",
    "q": "Case genai-ramp-105: A multi-account AWS organization deploys Amazon Bedrock with Knowledge Bases, Agents, and Guardrails under enterprise IAM and Regional residency rules. An existing search UI already ranks internal documents. You want Bedrock only for generation while keeping your retriever. Recommended API pattern? Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases. Document the decision in the change record, validate in non-production, and confirm retrieval quality on labeled examples before promoting to production aliases.",
    "options": [
      "Retrieve API for your custom search results, then InvokeModel or Converse with retrieved passages",
      "RetrieveAndGenerate only, replacing your search tier entirely on day one without A/B testing if incremental sync completed without labeled evaluation on golden prompts",
      "Batch inference on the whole corpus nightly instead of online retrieval for interactive chat for workloads that skip Guardrails on production traffic to save tokens",
      "Disable retrieval and increase temperature so answers sound more creative for factual queries using synchronous InvokeModel only without exponential backoff on throttling"
    ],
    "correct": 0,
    "explain": "Retrieve decouples search from generation when you already own ranking logic."
  },
  {
    "id": "genai-ramp-106",
    "mode": "exam",
    "topic": "Knowledge Bases",
    "type": "multi",
    "obj": "1",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html",
    "q": "Case genai-ramp-106: In a energy AWS organization (initiative GENAI-106), leadership requires Professional-grade Bedrock controls for cost, safety, and auditability. Catalog assistants miss SKU tokens in hybrid catalogs until retrieval is tuned. What is the BEST next step? (Track 106). Which TWO actions should the team take? (Pick 2) Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases.",
    "options": [
      "Apply least-privilege IAM and Secrets Manager for integration credentials",
      "Enable hybrid search and metadata filters where SKU recall matters",
      "Disable TLS between services to reduce CPU utilization",
      "Publish connector credentials in Confluence pages for speed",
      "Grant bedrock:* on * to the developer sandbox account"
    ],
    "correct": [
      0,
      1
    ],
    "explain": "Least privilege plus retrieval tuning address the common Professional exam pairing for this scenario."
  },
  {
    "id": "genai-ramp-107",
    "mode": "exam",
    "topic": "Knowledge Bases",
    "type": "multi",
    "obj": "1",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html",
    "q": "Case genai-ramp-107: In a logistics AWS organization (initiative GENAI-107), leadership requires Professional-grade Bedrock controls for cost, safety, and auditability. Agents loop on tool calls against a private CRM API. What should engineers inspect FIRST? (Track 107). Which TWO actions should the team take? (Pick 2) Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases.",
    "options": [
      "Apply least-privilege IAM and Secrets Manager for integration credentials",
      "Enable hybrid search and metadata filters where SKU recall matters",
      "Disable TLS between services to reduce CPU utilization",
      "Publish connector credentials in Confluence pages for speed",
      "Grant bedrock:* on * to the developer sandbox account"
    ],
    "correct": [
      0,
      1
    ],
    "explain": "Least privilege plus retrieval tuning address the common Professional exam pairing for this scenario."
  },
  {
    "id": "genai-ramp-108",
    "mode": "exam",
    "topic": "Knowledge Bases",
    "type": "multi",
    "obj": "1",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html",
    "q": "Case genai-ramp-108: In a hospitality AWS organization (initiative GENAI-108), leadership requires Professional-grade Bedrock controls for cost, safety, and auditability. Guardrails must block PII and investment advice on a public chatbot without retraining the FM. (Track 108). Which TWO actions should the team take? (Pick 2) Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases.",
    "options": [
      "Apply least-privilege IAM and Secrets Manager for integration credentials",
      "Enable hybrid search and metadata filters where SKU recall matters",
      "Disable TLS between services to reduce CPU utilization",
      "Publish connector credentials in Confluence pages for speed",
      "Grant bedrock:* on * to the developer sandbox account"
    ],
    "correct": [
      0,
      1
    ],
    "explain": "Least privilege plus retrieval tuning address the common Professional exam pairing for this scenario."
  },
  {
    "id": "genai-ramp-109",
    "mode": "exam",
    "topic": "Knowledge Bases",
    "type": "multi",
    "obj": "1",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html",
    "q": "Case genai-ramp-109: In a education AWS organization (initiative GENAI-109), leadership requires Professional-grade Bedrock controls for cost, safety, and auditability. Steady forty RPS chat traffic spikes on-demand cost after adding a six-thousand-token system prefix. (Track 109). Which TWO actions should the team take? (Pick 2) Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases.",
    "options": [
      "Apply least-privilege IAM and Secrets Manager for integration credentials",
      "Enable hybrid search and metadata filters where SKU recall matters",
      "Disable TLS between services to reduce CPU utilization",
      "Publish connector credentials in Confluence pages for speed",
      "Grant bedrock:* on * to the developer sandbox account"
    ],
    "correct": [
      0,
      1
    ],
    "explain": "Least privilege plus retrieval tuning address the common Professional exam pairing for this scenario."
  },
  {
    "id": "genai-ramp-110",
    "mode": "exam",
    "topic": "Knowledge Bases",
    "type": "multi",
    "obj": "1",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html",
    "q": "Case genai-ramp-110: In a insurance AWS organization (initiative GENAI-110), leadership requires Professional-grade Bedrock controls for cost, safety, and auditability. Cross-account custom model invocation fails with AccessDenied despite enabled model access. (Track 110). Which TWO actions should the team take? (Pick 2) Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases.",
    "options": [
      "Apply least-privilege IAM and Secrets Manager for integration credentials",
      "Enable hybrid search and metadata filters where SKU recall matters",
      "Disable TLS between services to reduce CPU utilization",
      "Publish connector credentials in Confluence pages for speed",
      "Grant bedrock:* on * to the developer sandbox account"
    ],
    "correct": [
      0,
      1
    ],
    "explain": "Least privilege plus retrieval tuning address the common Professional exam pairing for this scenario."
  },
  {
    "id": "genai-ramp-111",
    "mode": "exam",
    "topic": "Knowledge Bases",
    "type": "multi",
    "obj": "1",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html",
    "q": "Case genai-ramp-111: In a automotive AWS organization (initiative GENAI-111), leadership requires Professional-grade Bedrock controls for cost, safety, and auditability. Streaming chat stalls mid-answer behind corporate proxies while CloudWatch shows model activity. (Track 111). Which TWO actions should the team take? (Pick 2) Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases.",
    "options": [
      "Apply least-privilege IAM and Secrets Manager for integration credentials",
      "Enable hybrid search and metadata filters where SKU recall matters",
      "Disable TLS between services to reduce CPU utilization",
      "Publish connector credentials in Confluence pages for speed",
      "Grant bedrock:* on * to the developer sandbox account"
    ],
    "correct": [
      0,
      1
    ],
    "explain": "Least privilege plus retrieval tuning address the common Professional exam pairing for this scenario."
  },
  {
    "id": "genai-ramp-112",
    "mode": "exam",
    "topic": "Knowledge Bases",
    "type": "multi",
    "obj": "1",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html",
    "q": "Case genai-ramp-112: In a pharma AWS organization (initiative GENAI-112), leadership requires Professional-grade Bedrock controls for cost, safety, and auditability. KB sync jobs fail on OpenSearch Serverless capacity during nightly ingest of policy PDFs. (Track 112). Which TWO actions should the team take? (Pick 2) Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases.",
    "options": [
      "Apply least-privilege IAM and Secrets Manager for integration credentials",
      "Enable hybrid search and metadata filters where SKU recall matters",
      "Disable TLS between services to reduce CPU utilization",
      "Publish connector credentials in Confluence pages for speed",
      "Grant bedrock:* on * to the developer sandbox account"
    ],
    "correct": [
      0,
      1
    ],
    "explain": "Least privilege plus retrieval tuning address the common Professional exam pairing for this scenario."
  },
  {
    "id": "genai-ramp-113",
    "mode": "exam",
    "topic": "Knowledge Bases",
    "type": "multi",
    "obj": "1",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html",
    "q": "Case genai-ramp-113: In a gaming AWS organization (initiative GENAI-113), leadership requires Professional-grade Bedrock controls for cost, safety, and auditability. Prompt Management aliases must move from DRAFT to production with IAM approval workflows. (Track 113). Which TWO actions should the team take? (Pick 2) Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases.",
    "options": [
      "Apply least-privilege IAM and Secrets Manager for integration credentials",
      "Enable hybrid search and metadata filters where SKU recall matters",
      "Disable TLS between services to reduce CPU utilization",
      "Publish connector credentials in Confluence pages for speed",
      "Grant bedrock:* on * to the developer sandbox account"
    ],
    "correct": [
      0,
      1
    ],
    "explain": "Least privilege plus retrieval tuning address the common Professional exam pairing for this scenario."
  },
  {
    "id": "genai-ramp-114",
    "mode": "exam",
    "topic": "Knowledge Bases",
    "type": "multi",
    "obj": "1",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html",
    "q": "Case genai-ramp-114: In a nonprofit AWS organization (initiative GENAI-114), leadership requires Professional-grade Bedrock controls for cost, safety, and auditability. Flows must branch on retrieval confidence before calling the largest generation model. (Track 114). Which TWO actions should the team take? (Pick 2) Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases.",
    "options": [
      "Apply least-privilege IAM and Secrets Manager for integration credentials",
      "Enable hybrid search and metadata filters where SKU recall matters",
      "Disable TLS between services to reduce CPU utilization",
      "Publish connector credentials in Confluence pages for speed",
      "Grant bedrock:* on * to the developer sandbox account"
    ],
    "correct": [
      0,
      1
    ],
    "explain": "Least privilege plus retrieval tuning address the common Professional exam pairing for this scenario."
  },
  {
    "id": "genai-ramp-115",
    "mode": "exam",
    "topic": "Knowledge Bases",
    "type": "multi",
    "obj": "1",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html",
    "q": "Case genai-ramp-115: In a airline AWS organization (initiative GENAI-115), leadership requires Professional-grade Bedrock controls for cost, safety, and auditability. Batch summarization and interactive chat share one account; finance wants clear cost separation. (Track 115). Which TWO actions should the team take? (Pick 2) Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases.",
    "options": [
      "Apply least-privilege IAM and Secrets Manager for integration credentials",
      "Enable hybrid search and metadata filters where SKU recall matters",
      "Disable TLS between services to reduce CPU utilization",
      "Publish connector credentials in Confluence pages for speed",
      "Grant bedrock:* on * to the developer sandbox account"
    ],
    "correct": [
      0,
      1
    ],
    "explain": "Least privilege plus retrieval tuning address the common Professional exam pairing for this scenario."
  },
  {
    "id": "genai-ramp-116",
    "mode": "exam",
    "topic": "Knowledge Bases",
    "type": "multi",
    "obj": "1",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html",
    "q": "Case genai-ramp-116: In a healthcare AWS organization (initiative GENAI-116), leadership requires Professional-grade Bedrock controls for cost, safety, and auditability. Multilingual KB recall drops for Spanish PDFs after English-only embeddings were selected. (Track 116). Which TWO actions should the team take? (Pick 2) Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases.",
    "options": [
      "Apply least-privilege IAM and Secrets Manager for integration credentials",
      "Enable hybrid search and metadata filters where SKU recall matters",
      "Disable TLS between services to reduce CPU utilization",
      "Publish connector credentials in Confluence pages for speed",
      "Grant bedrock:* on * to the developer sandbox account"
    ],
    "correct": [
      0,
      1
    ],
    "explain": "Least privilege plus retrieval tuning address the common Professional exam pairing for this scenario."
  },
  {
    "id": "genai-ramp-117",
    "mode": "exam",
    "topic": "Knowledge Bases",
    "type": "multi",
    "obj": "1",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html",
    "q": "Case genai-ramp-117: In a retail AWS organization (initiative GENAI-117), leadership requires Professional-grade Bedrock controls for cost, safety, and auditability. Technicians need grounded repair steps with citations; hallucinations appear when grounding checks are off. (Track 117). Which TWO actions should the team take? (Pick 2) Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases.",
    "options": [
      "Apply least-privilege IAM and Secrets Manager for integration credentials",
      "Enable hybrid search and metadata filters where SKU recall matters",
      "Disable TLS between services to reduce CPU utilization",
      "Publish connector credentials in Confluence pages for speed",
      "Grant bedrock:* on * to the developer sandbox account"
    ],
    "correct": [
      0,
      1
    ],
    "explain": "Least privilege plus retrieval tuning address the common Professional exam pairing for this scenario."
  },
  {
    "id": "genai-ramp-118",
    "mode": "exam",
    "topic": "Knowledge Bases",
    "type": "multi",
    "obj": "1",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html",
    "q": "Case genai-ramp-118: In a financial services AWS organization (initiative GENAI-118), leadership requires Professional-grade Bedrock controls for cost, safety, and auditability. Model evaluation jobs must gate release of a new RAG prompt version tied to campaign GENAI-106. (Track 118). Which TWO actions should the team take? (Pick 2) Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases.",
    "options": [
      "Apply least-privilege IAM and Secrets Manager for integration credentials",
      "Enable hybrid search and metadata filters where SKU recall matters",
      "Disable TLS between services to reduce CPU utilization",
      "Publish connector credentials in Confluence pages for speed",
      "Grant bedrock:* on * to the developer sandbox account"
    ],
    "correct": [
      0,
      1
    ],
    "explain": "Least privilege plus retrieval tuning address the common Professional exam pairing for this scenario."
  },
  {
    "id": "genai-ramp-119",
    "mode": "exam",
    "topic": "Knowledge Bases",
    "type": "multi",
    "obj": "1",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html",
    "q": "Case genai-ramp-119: In a manufacturing AWS organization (initiative GENAI-119), leadership requires Professional-grade Bedrock controls for cost, safety, and auditability. ThrottlingException spikes during marketing events; clients retry without jitter. (Track 119). Which TWO actions should the team take? (Pick 2) Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases.",
    "options": [
      "Apply least-privilege IAM and Secrets Manager for integration credentials",
      "Enable hybrid search and metadata filters where SKU recall matters",
      "Disable TLS between services to reduce CPU utilization",
      "Publish connector credentials in Confluence pages for speed",
      "Grant bedrock:* on * to the developer sandbox account"
    ],
    "correct": [
      0,
      1
    ],
    "explain": "Least privilege plus retrieval tuning address the common Professional exam pairing for this scenario."
  },
  {
    "id": "genai-ramp-120",
    "mode": "exam",
    "topic": "Knowledge Bases",
    "type": "multi",
    "obj": "1",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html",
    "q": "Case genai-ramp-120: In a media AWS organization (initiative GENAI-120), leadership requires Professional-grade Bedrock controls for cost, safety, and auditability. Sensitive information filters must apply to uploads and model outputs for HR policy chat. (Track 120). Which TWO actions should the team take? (Pick 2) Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases.",
    "options": [
      "Apply least-privilege IAM and Secrets Manager for integration credentials",
      "Enable hybrid search and metadata filters where SKU recall matters",
      "Disable TLS between services to reduce CPU utilization",
      "Publish connector credentials in Confluence pages for speed",
      "Grant bedrock:* on * to the developer sandbox account"
    ],
    "correct": [
      0,
      1
    ],
    "explain": "Least privilege plus retrieval tuning address the common Professional exam pairing for this scenario."
  },
  {
    "id": "genai-ramp-121",
    "mode": "exam",
    "topic": "Knowledge Bases",
    "type": "multi",
    "obj": "1",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html",
    "q": "Case genai-ramp-121: In a public sector AWS organization (initiative GENAI-121), leadership requires Professional-grade Bedrock controls for cost, safety, and auditability. Provisioned Throughput versus on-demand must match flat baseline with two-hour daily peaks. (Track 121). Which TWO actions should the team take? (Pick 2) Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases.",
    "options": [
      "Apply least-privilege IAM and Secrets Manager for integration credentials",
      "Enable hybrid search and metadata filters where SKU recall matters",
      "Disable TLS between services to reduce CPU utilization",
      "Publish connector credentials in Confluence pages for speed",
      "Grant bedrock:* on * to the developer sandbox account"
    ],
    "correct": [
      0,
      1
    ],
    "explain": "Least privilege plus retrieval tuning address the common Professional exam pairing for this scenario."
  },
  {
    "id": "genai-ramp-122",
    "mode": "exam",
    "topic": "Knowledge Bases",
    "type": "multi",
    "obj": "1",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html",
    "q": "Case genai-ramp-122: In a telecom AWS organization (initiative GENAI-122), leadership requires Professional-grade Bedrock controls for cost, safety, and auditability. Converse API adoption should unify tools, Guardrails, and multi-turn history across microservices. (Track 122). Which TWO actions should the team take? (Pick 2) Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases.",
    "options": [
      "Apply least-privilege IAM and Secrets Manager for integration credentials",
      "Enable hybrid search and metadata filters where SKU recall matters",
      "Disable TLS between services to reduce CPU utilization",
      "Publish connector credentials in Confluence pages for speed",
      "Grant bedrock:* on * to the developer sandbox account"
    ],
    "correct": [
      0,
      1
    ],
    "explain": "Least privilege plus retrieval tuning address the common Professional exam pairing for this scenario."
  },
  {
    "id": "genai-ramp-123",
    "mode": "exam",
    "topic": "Knowledge Bases",
    "type": "multi",
    "obj": "1",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html",
    "q": "Case genai-ramp-123: In a energy AWS organization (initiative GENAI-123), leadership requires Professional-grade Bedrock controls for cost, safety, and auditability. Data erasure requests require customer-tagged S3 objects to leave the vector index within twenty-four hours. (Track 123). Which TWO actions should the team take? (Pick 2) Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases.",
    "options": [
      "Apply least-privilege IAM and Secrets Manager for integration credentials",
      "Enable hybrid search and metadata filters where SKU recall matters",
      "Disable TLS between services to reduce CPU utilization",
      "Publish connector credentials in Confluence pages for speed",
      "Grant bedrock:* on * to the developer sandbox account"
    ],
    "correct": [
      0,
      1
    ],
    "explain": "Least privilege plus retrieval tuning address the common Professional exam pairing for this scenario."
  },
  {
    "id": "genai-ramp-124",
    "mode": "exam",
    "topic": "Knowledge Bases",
    "type": "multi",
    "obj": "1",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html",
    "q": "Case genai-ramp-124: In a logistics AWS organization (initiative GENAI-124), leadership requires Professional-grade Bedrock controls for cost, safety, and auditability. Catalog assistants miss SKU tokens in hybrid catalogs until retrieval is tuned. What is the BEST next step? (Track 124). Which TWO actions should the team take? (Pick 2) Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases.",
    "options": [
      "Apply least-privilege IAM and Secrets Manager for integration credentials",
      "Enable hybrid search and metadata filters where SKU recall matters",
      "Disable TLS between services to reduce CPU utilization",
      "Publish connector credentials in Confluence pages for speed",
      "Grant bedrock:* on * to the developer sandbox account"
    ],
    "correct": [
      0,
      1
    ],
    "explain": "Least privilege plus retrieval tuning address the common Professional exam pairing for this scenario."
  },
  {
    "id": "genai-ramp-125",
    "mode": "exam",
    "topic": "Knowledge Bases",
    "type": "multi",
    "obj": "1",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html",
    "q": "Case genai-ramp-125: In a hospitality AWS organization (initiative GENAI-125), leadership requires Professional-grade Bedrock controls for cost, safety, and auditability. Agents loop on tool calls against a private CRM API. What should engineers inspect FIRST? (Track 125). Which TWO actions should the team take? (Pick 2) Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases.",
    "options": [
      "Apply least-privilege IAM and Secrets Manager for integration credentials",
      "Enable hybrid search and metadata filters where SKU recall matters",
      "Disable TLS between services to reduce CPU utilization",
      "Publish connector credentials in Confluence pages for speed",
      "Grant bedrock:* on * to the developer sandbox account"
    ],
    "correct": [
      0,
      1
    ],
    "explain": "Least privilege plus retrieval tuning address the common Professional exam pairing for this scenario."
  },
  {
    "id": "genai-ramp-126",
    "mode": "exam",
    "topic": "Knowledge Bases",
    "type": "multi",
    "obj": "1",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html",
    "q": "Case genai-ramp-126: In a education AWS organization (initiative GENAI-126), leadership requires Professional-grade Bedrock controls for cost, safety, and auditability. Guardrails must block PII and investment advice on a public chatbot without retraining the FM. (Track 126). Which TWO actions should the team take? (Pick 2) Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases.",
    "options": [
      "Apply least-privilege IAM and Secrets Manager for integration credentials",
      "Enable hybrid search and metadata filters where SKU recall matters",
      "Disable TLS between services to reduce CPU utilization",
      "Publish connector credentials in Confluence pages for speed",
      "Grant bedrock:* on * to the developer sandbox account"
    ],
    "correct": [
      0,
      1
    ],
    "explain": "Least privilege plus retrieval tuning address the common Professional exam pairing for this scenario."
  },
  {
    "id": "genai-ramp-127",
    "mode": "exam",
    "topic": "Knowledge Bases",
    "type": "multi",
    "obj": "1",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html",
    "q": "Case genai-ramp-127: In a insurance AWS organization (initiative GENAI-127), leadership requires Professional-grade Bedrock controls for cost, safety, and auditability. Steady forty RPS chat traffic spikes on-demand cost after adding a six-thousand-token system prefix. (Track 127). Which TWO actions should the team take? (Pick 2) Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases.",
    "options": [
      "Apply least-privilege IAM and Secrets Manager for integration credentials",
      "Enable hybrid search and metadata filters where SKU recall matters",
      "Disable TLS between services to reduce CPU utilization",
      "Publish connector credentials in Confluence pages for speed",
      "Grant bedrock:* on * to the developer sandbox account"
    ],
    "correct": [
      0,
      1
    ],
    "explain": "Least privilege plus retrieval tuning address the common Professional exam pairing for this scenario."
  },
  {
    "id": "genai-ramp-128",
    "mode": "exam",
    "topic": "Knowledge Bases",
    "type": "multi",
    "obj": "1",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html",
    "q": "Case genai-ramp-128: In a automotive AWS organization (initiative GENAI-128), leadership requires Professional-grade Bedrock controls for cost, safety, and auditability. Cross-account custom model invocation fails with AccessDenied despite enabled model access. (Track 128). Which TWO actions should the team take? (Pick 2) Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases.",
    "options": [
      "Apply least-privilege IAM and Secrets Manager for integration credentials",
      "Enable hybrid search and metadata filters where SKU recall matters",
      "Disable TLS between services to reduce CPU utilization",
      "Publish connector credentials in Confluence pages for speed",
      "Grant bedrock:* on * to the developer sandbox account"
    ],
    "correct": [
      0,
      1
    ],
    "explain": "Least privilege plus retrieval tuning address the common Professional exam pairing for this scenario."
  },
  {
    "id": "genai-ramp-129",
    "mode": "exam",
    "topic": "Integration",
    "type": "multi",
    "obj": "2",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/agents.html",
    "q": "Case genai-ramp-129: In a pharma AWS organization (initiative GENAI-129), leadership requires Professional-grade Bedrock controls for cost, safety, and auditability. Streaming chat stalls mid-answer behind corporate proxies while CloudWatch shows model activity. (Track 129). Which TWO actions should the team take? (Pick 2) Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases.",
    "options": [
      "Apply least-privilege IAM and Secrets Manager for integration credentials",
      "Enable hybrid search and metadata filters where SKU recall matters",
      "Disable TLS between services to reduce CPU utilization",
      "Publish connector credentials in Confluence pages for speed",
      "Grant bedrock:* on * to the developer sandbox account"
    ],
    "correct": [
      0,
      1
    ],
    "explain": "Least privilege plus retrieval tuning address the common Professional exam pairing for this scenario."
  },
  {
    "id": "genai-ramp-130",
    "mode": "exam",
    "topic": "Integration",
    "type": "multi",
    "obj": "2",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/agents.html",
    "q": "Case genai-ramp-130: In a gaming AWS organization (initiative GENAI-130), leadership requires Professional-grade Bedrock controls for cost, safety, and auditability. KB sync jobs fail on OpenSearch Serverless capacity during nightly ingest of policy PDFs. (Track 130). Which TWO actions should the team take? (Pick 2) Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases.",
    "options": [
      "Apply least-privilege IAM and Secrets Manager for integration credentials",
      "Enable hybrid search and metadata filters where SKU recall matters",
      "Disable TLS between services to reduce CPU utilization",
      "Publish connector credentials in Confluence pages for speed",
      "Grant bedrock:* on * to the developer sandbox account"
    ],
    "correct": [
      0,
      1
    ],
    "explain": "Least privilege plus retrieval tuning address the common Professional exam pairing for this scenario."
  },
  {
    "id": "genai-ramp-131",
    "mode": "exam",
    "topic": "Integration",
    "type": "multi",
    "obj": "2",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/agents.html",
    "q": "Case genai-ramp-131: In a nonprofit AWS organization (initiative GENAI-131), leadership requires Professional-grade Bedrock controls for cost, safety, and auditability. Prompt Management aliases must move from DRAFT to production with IAM approval workflows. (Track 131). Which TWO actions should the team take? (Pick 2) Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases.",
    "options": [
      "Apply least-privilege IAM and Secrets Manager for integration credentials",
      "Enable hybrid search and metadata filters where SKU recall matters",
      "Disable TLS between services to reduce CPU utilization",
      "Publish connector credentials in Confluence pages for speed",
      "Grant bedrock:* on * to the developer sandbox account"
    ],
    "correct": [
      0,
      1
    ],
    "explain": "Least privilege plus retrieval tuning address the common Professional exam pairing for this scenario."
  },
  {
    "id": "genai-ramp-132",
    "mode": "exam",
    "topic": "Integration",
    "type": "multi",
    "obj": "2",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/agents.html",
    "q": "Case genai-ramp-132: In a airline AWS organization (initiative GENAI-132), leadership requires Professional-grade Bedrock controls for cost, safety, and auditability. Flows must branch on retrieval confidence before calling the largest generation model. (Track 132). Which TWO actions should the team take? (Pick 2) Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases.",
    "options": [
      "Apply least-privilege IAM and Secrets Manager for integration credentials",
      "Enable hybrid search and metadata filters where SKU recall matters",
      "Disable TLS between services to reduce CPU utilization",
      "Publish connector credentials in Confluence pages for speed",
      "Grant bedrock:* on * to the developer sandbox account"
    ],
    "correct": [
      0,
      1
    ],
    "explain": "Least privilege plus retrieval tuning address the common Professional exam pairing for this scenario."
  },
  {
    "id": "genai-ramp-133",
    "mode": "exam",
    "topic": "Integration",
    "type": "multi",
    "obj": "2",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/agents.html",
    "q": "Case genai-ramp-133: In a healthcare AWS organization (initiative GENAI-133), leadership requires Professional-grade Bedrock controls for cost, safety, and auditability. Batch summarization and interactive chat share one account; finance wants clear cost separation. (Track 133). Which TWO actions should the team take? (Pick 2) Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases.",
    "options": [
      "Apply least-privilege IAM and Secrets Manager for integration credentials",
      "Enable hybrid search and metadata filters where SKU recall matters",
      "Disable TLS between services to reduce CPU utilization",
      "Publish connector credentials in Confluence pages for speed",
      "Grant bedrock:* on * to the developer sandbox account"
    ],
    "correct": [
      0,
      1
    ],
    "explain": "Least privilege plus retrieval tuning address the common Professional exam pairing for this scenario."
  },
  {
    "id": "genai-ramp-134",
    "mode": "exam",
    "topic": "Integration",
    "type": "multi",
    "obj": "2",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/agents.html",
    "q": "Case genai-ramp-134: In a retail AWS organization (initiative GENAI-134), leadership requires Professional-grade Bedrock controls for cost, safety, and auditability. Multilingual KB recall drops for Spanish PDFs after English-only embeddings were selected. (Track 134). Which TWO actions should the team take? (Pick 2) Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases.",
    "options": [
      "Apply least-privilege IAM and Secrets Manager for integration credentials",
      "Enable hybrid search and metadata filters where SKU recall matters",
      "Disable TLS between services to reduce CPU utilization",
      "Publish connector credentials in Confluence pages for speed",
      "Grant bedrock:* on * to the developer sandbox account"
    ],
    "correct": [
      0,
      1
    ],
    "explain": "Least privilege plus retrieval tuning address the common Professional exam pairing for this scenario."
  },
  {
    "id": "genai-ramp-135",
    "mode": "exam",
    "topic": "Integration",
    "type": "multi",
    "obj": "2",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/agents.html",
    "q": "Case genai-ramp-135: In a financial services AWS organization (initiative GENAI-135), leadership requires Professional-grade Bedrock controls for cost, safety, and auditability. Technicians need grounded repair steps with citations; hallucinations appear when grounding checks are off. (Track 135). Which TWO actions should the team take? (Pick 2) Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases.",
    "options": [
      "Apply least-privilege IAM and Secrets Manager for integration credentials",
      "Enable hybrid search and metadata filters where SKU recall matters",
      "Disable TLS between services to reduce CPU utilization",
      "Publish connector credentials in Confluence pages for speed",
      "Grant bedrock:* on * to the developer sandbox account"
    ],
    "correct": [
      0,
      1
    ],
    "explain": "Least privilege plus retrieval tuning address the common Professional exam pairing for this scenario."
  },
  {
    "id": "genai-ramp-136",
    "mode": "exam",
    "topic": "Integration",
    "type": "multi",
    "obj": "2",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/agents.html",
    "q": "Case genai-ramp-136: In a manufacturing AWS organization (initiative GENAI-136), leadership requires Professional-grade Bedrock controls for cost, safety, and auditability. Model evaluation jobs must gate release of a new RAG prompt version tied to campaign GENAI-106. (Track 136). Which TWO actions should the team take? (Pick 2) Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases.",
    "options": [
      "Apply least-privilege IAM and Secrets Manager for integration credentials",
      "Enable hybrid search and metadata filters where SKU recall matters",
      "Disable TLS between services to reduce CPU utilization",
      "Publish connector credentials in Confluence pages for speed",
      "Grant bedrock:* on * to the developer sandbox account"
    ],
    "correct": [
      0,
      1
    ],
    "explain": "Least privilege plus retrieval tuning address the common Professional exam pairing for this scenario."
  },
  {
    "id": "genai-ramp-137",
    "mode": "exam",
    "topic": "Integration",
    "type": "multi",
    "obj": "2",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/agents.html",
    "q": "Case genai-ramp-137: In a media AWS organization (initiative GENAI-137), leadership requires Professional-grade Bedrock controls for cost, safety, and auditability. ThrottlingException spikes during marketing events; clients retry without jitter. (Track 137). Which TWO actions should the team take? (Pick 2) Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases.",
    "options": [
      "Apply least-privilege IAM and Secrets Manager for integration credentials",
      "Enable hybrid search and metadata filters where SKU recall matters",
      "Disable TLS between services to reduce CPU utilization",
      "Publish connector credentials in Confluence pages for speed",
      "Grant bedrock:* on * to the developer sandbox account"
    ],
    "correct": [
      0,
      1
    ],
    "explain": "Least privilege plus retrieval tuning address the common Professional exam pairing for this scenario."
  },
  {
    "id": "genai-ramp-138",
    "mode": "exam",
    "topic": "Integration",
    "type": "multi",
    "obj": "2",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/agents.html",
    "q": "Case genai-ramp-138: In a public sector AWS organization (initiative GENAI-138), leadership requires Professional-grade Bedrock controls for cost, safety, and auditability. Sensitive information filters must apply to uploads and model outputs for HR policy chat. (Track 138). Which TWO actions should the team take? (Pick 2) Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases.",
    "options": [
      "Apply least-privilege IAM and Secrets Manager for integration credentials",
      "Enable hybrid search and metadata filters where SKU recall matters",
      "Disable TLS between services to reduce CPU utilization",
      "Publish connector credentials in Confluence pages for speed",
      "Grant bedrock:* on * to the developer sandbox account"
    ],
    "correct": [
      0,
      1
    ],
    "explain": "Least privilege plus retrieval tuning address the common Professional exam pairing for this scenario."
  },
  {
    "id": "genai-ramp-139",
    "mode": "exam",
    "topic": "Integration",
    "type": "multi",
    "obj": "2",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/agents.html",
    "q": "Case genai-ramp-139: In a telecom AWS organization (initiative GENAI-139), leadership requires Professional-grade Bedrock controls for cost, safety, and auditability. Provisioned Throughput versus on-demand must match flat baseline with two-hour daily peaks. (Track 139). Which TWO actions should the team take? (Pick 2) Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases.",
    "options": [
      "Apply least-privilege IAM and Secrets Manager for integration credentials",
      "Enable hybrid search and metadata filters where SKU recall matters",
      "Disable TLS between services to reduce CPU utilization",
      "Publish connector credentials in Confluence pages for speed",
      "Grant bedrock:* on * to the developer sandbox account"
    ],
    "correct": [
      0,
      1
    ],
    "explain": "Least privilege plus retrieval tuning address the common Professional exam pairing for this scenario."
  },
  {
    "id": "genai-ramp-140",
    "mode": "exam",
    "topic": "Integration",
    "obj": "2",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/agents.html",
    "q": "Case genai-ramp-140: In a media AWS organization (initiative GENAI-140), platform engineers support Bedrock with Knowledge Bases, Agents, and Guardrails under IAM and Regional residency rules. Converse API adoption should unify tools, Guardrails, and multi-turn history across microservices. (Track 140). Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases.",
    "options": [
      "Implement the recommended Bedrock pattern for this scenario with Regional model access enabled",
      "Skip model access requests and rely on default quotas only for workloads that skip model access review in the Bedrock console",
      "Disable Guardrails in production to reduce token usage for workloads that skip model access review in the Bedrock console",
      "Store long-lived IAM user keys in front-end applications for workloads that skip model access review in the Bedrock console"
    ],
    "correct": 0,
    "explain": "The first option reflects AWS documented best practice; the others weaken security or retrieval quality."
  },
  {
    "id": "genai-ramp-141",
    "mode": "exam",
    "topic": "Integration",
    "obj": "2",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/agents.html",
    "q": "Case genai-ramp-141: In a public sector AWS organization (initiative GENAI-141), platform engineers support Bedrock with Knowledge Bases, Agents, and Guardrails under IAM and Regional residency rules. Data erasure requests require customer-tagged S3 objects to leave the vector index within twenty-four hours. (Track 141). Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases.",
    "options": [
      "Implement the recommended Bedrock pattern for this scenario with Regional model access enabled",
      "Skip model access requests and rely on default quotas only for workloads that skip model access review in the Bedrock console",
      "Disable Guardrails in production to reduce token usage for workloads that skip model access review in the Bedrock console",
      "Store long-lived IAM user keys in front-end applications for workloads that skip model access review in the Bedrock console"
    ],
    "correct": 0,
    "explain": "The first option reflects AWS documented best practice; the others weaken security or retrieval quality."
  },
  {
    "id": "genai-ramp-142",
    "mode": "exam",
    "topic": "Integration",
    "obj": "2",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/agents.html",
    "q": "Case genai-ramp-142: In a telecom AWS organization (initiative GENAI-142), platform engineers support Bedrock with Knowledge Bases, Agents, and Guardrails under IAM and Regional residency rules. Catalog assistants miss SKU tokens in hybrid catalogs until retrieval is tuned. What is the BEST next step? (Track 142). Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases.",
    "options": [
      "Implement the recommended Bedrock pattern for this scenario with Regional model access enabled",
      "Skip model access requests and rely on default quotas only for workloads that skip model access review in the Bedrock console",
      "Disable Guardrails in production to reduce token usage for workloads that skip model access review in the Bedrock console",
      "Store long-lived IAM user keys in front-end applications for workloads that skip model access review in the Bedrock console"
    ],
    "correct": 0,
    "explain": "The first option reflects AWS documented best practice; the others weaken security or retrieval quality."
  },
  {
    "id": "genai-ramp-143",
    "mode": "exam",
    "topic": "Integration",
    "obj": "2",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/agents.html",
    "q": "Case genai-ramp-143: In a energy AWS organization (initiative GENAI-143), platform engineers support Bedrock with Knowledge Bases, Agents, and Guardrails under IAM and Regional residency rules. Agents loop on tool calls against a private CRM API. What should engineers inspect FIRST? (Track 143). Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases.",
    "options": [
      "Implement the recommended Bedrock pattern for this scenario with Regional model access enabled",
      "Skip model access requests and rely on default quotas only for workloads that skip model access review in the Bedrock console",
      "Disable Guardrails in production to reduce token usage for workloads that skip model access review in the Bedrock console",
      "Store long-lived IAM user keys in front-end applications for workloads that skip model access review in the Bedrock console"
    ],
    "correct": 0,
    "explain": "The first option reflects AWS documented best practice; the others weaken security or retrieval quality."
  },
  {
    "id": "genai-ramp-144",
    "mode": "exam",
    "topic": "Integration",
    "obj": "2",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/agents.html",
    "q": "Case genai-ramp-144: In a logistics AWS organization (initiative GENAI-144), platform engineers support Bedrock with Knowledge Bases, Agents, and Guardrails under IAM and Regional residency rules. Guardrails must block PII and investment advice on a public chatbot without retraining the FM. (Track 144). Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases.",
    "options": [
      "Implement the recommended Bedrock pattern for this scenario with Regional model access enabled",
      "Skip model access requests and rely on default quotas only for workloads that skip model access review in the Bedrock console",
      "Disable Guardrails in production to reduce token usage for workloads that skip model access review in the Bedrock console",
      "Store long-lived IAM user keys in front-end applications for workloads that skip model access review in the Bedrock console"
    ],
    "correct": 0,
    "explain": "The first option reflects AWS documented best practice; the others weaken security or retrieval quality."
  },
  {
    "id": "genai-ramp-145",
    "mode": "exam",
    "topic": "Integration",
    "obj": "2",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/agents.html",
    "q": "Case genai-ramp-145: In a hospitality AWS organization (initiative GENAI-145), platform engineers support Bedrock with Knowledge Bases, Agents, and Guardrails under IAM and Regional residency rules. Steady forty RPS chat traffic spikes on-demand cost after adding a six-thousand-token system prefix. (Track 145). Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases.",
    "options": [
      "Implement the recommended Bedrock pattern for this scenario with Regional model access enabled",
      "Skip model access requests and rely on default quotas only for workloads that skip model access review in the Bedrock console",
      "Disable Guardrails in production to reduce token usage for workloads that skip model access review in the Bedrock console",
      "Store long-lived IAM user keys in front-end applications for workloads that skip model access review in the Bedrock console"
    ],
    "correct": 0,
    "explain": "The first option reflects AWS documented best practice; the others weaken security or retrieval quality."
  },
  {
    "id": "genai-ramp-146",
    "mode": "exam",
    "topic": "Integration",
    "obj": "2",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/agents.html",
    "q": "Case genai-ramp-146: In a education AWS organization (initiative GENAI-146), platform engineers support Bedrock with Knowledge Bases, Agents, and Guardrails under IAM and Regional residency rules. Cross-account custom model invocation fails with AccessDenied despite enabled model access. (Track 146). Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases.",
    "options": [
      "Implement the recommended Bedrock pattern for this scenario with Regional model access enabled",
      "Skip model access requests and rely on default quotas only for workloads that skip model access review in the Bedrock console",
      "Disable Guardrails in production to reduce token usage for workloads that skip model access review in the Bedrock console",
      "Store long-lived IAM user keys in front-end applications for workloads that skip model access review in the Bedrock console"
    ],
    "correct": 0,
    "explain": "The first option reflects AWS documented best practice; the others weaken security or retrieval quality."
  },
  {
    "id": "genai-ramp-147",
    "mode": "exam",
    "topic": "Integration",
    "obj": "2",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/agents.html",
    "q": "Case genai-ramp-147: In a insurance AWS organization (initiative GENAI-147), platform engineers support Bedrock with Knowledge Bases, Agents, and Guardrails under IAM and Regional residency rules. Streaming chat stalls mid-answer behind corporate proxies while CloudWatch shows model activity. (Track 147). Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases.",
    "options": [
      "Implement the recommended Bedrock pattern for this scenario with Regional model access enabled",
      "Skip model access requests and rely on default quotas only for workloads that skip model access review in the Bedrock console",
      "Disable Guardrails in production to reduce token usage for workloads that skip model access review in the Bedrock console",
      "Store long-lived IAM user keys in front-end applications for workloads that skip model access review in the Bedrock console"
    ],
    "correct": 0,
    "explain": "The first option reflects AWS documented best practice; the others weaken security or retrieval quality."
  },
  {
    "id": "genai-ramp-148",
    "mode": "exam",
    "topic": "Integration",
    "obj": "2",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/agents.html",
    "q": "Case genai-ramp-148: In a automotive AWS organization (initiative GENAI-148), platform engineers support Bedrock with Knowledge Bases, Agents, and Guardrails under IAM and Regional residency rules. KB sync jobs fail on OpenSearch Serverless capacity during nightly ingest of policy PDFs. (Track 148). Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases.",
    "options": [
      "Implement the recommended Bedrock pattern for this scenario with Regional model access enabled",
      "Skip model access requests and rely on default quotas only for workloads that skip model access review in the Bedrock console",
      "Disable Guardrails in production to reduce token usage for workloads that skip model access review in the Bedrock console",
      "Store long-lived IAM user keys in front-end applications for workloads that skip model access review in the Bedrock console"
    ],
    "correct": 0,
    "explain": "The first option reflects AWS documented best practice; the others weaken security or retrieval quality."
  },
  {
    "id": "genai-ramp-149",
    "mode": "exam",
    "topic": "Integration",
    "obj": "2",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/agents.html",
    "q": "Case genai-ramp-149: In a pharma AWS organization (initiative GENAI-149), platform engineers support Bedrock with Knowledge Bases, Agents, and Guardrails under IAM and Regional residency rules. Prompt Management aliases must move from DRAFT to production with IAM approval workflows. (Track 149). Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases.",
    "options": [
      "Implement the recommended Bedrock pattern for this scenario with Regional model access enabled",
      "Skip model access requests and rely on default quotas only for workloads that skip model access review in the Bedrock console",
      "Disable Guardrails in production to reduce token usage for workloads that skip model access review in the Bedrock console",
      "Store long-lived IAM user keys in front-end applications for workloads that skip model access review in the Bedrock console"
    ],
    "correct": 0,
    "explain": "The first option reflects AWS documented best practice; the others weaken security or retrieval quality."
  },
  {
    "id": "genai-ramp-150",
    "mode": "exam",
    "topic": "Integration",
    "obj": "2",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/agents.html",
    "q": "Case genai-ramp-150: In a gaming AWS organization (initiative GENAI-150), platform engineers support Bedrock with Knowledge Bases, Agents, and Guardrails under IAM and Regional residency rules. Flows must branch on retrieval confidence before calling the largest generation model. (Track 150). Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases.",
    "options": [
      "Implement the recommended Bedrock pattern for this scenario with Regional model access enabled",
      "Skip model access requests and rely on default quotas only for workloads that skip model access review in the Bedrock console",
      "Disable Guardrails in production to reduce token usage for workloads that skip model access review in the Bedrock console",
      "Store long-lived IAM user keys in front-end applications for workloads that skip model access review in the Bedrock console"
    ],
    "correct": 0,
    "explain": "The first option reflects AWS documented best practice; the others weaken security or retrieval quality."
  },
  {
    "id": "genai-ramp-151",
    "mode": "exam",
    "topic": "Integration",
    "obj": "2",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/agents.html",
    "q": "Case genai-ramp-151: In a nonprofit AWS organization (initiative GENAI-151), platform engineers support Bedrock with Knowledge Bases, Agents, and Guardrails under IAM and Regional residency rules. Batch summarization and interactive chat share one account; finance wants clear cost separation. (Track 151). Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases.",
    "options": [
      "Implement the recommended Bedrock pattern for this scenario with Regional model access enabled",
      "Skip model access requests and rely on default quotas only for workloads that skip model access review in the Bedrock console",
      "Disable Guardrails in production to reduce token usage for workloads that skip model access review in the Bedrock console",
      "Store long-lived IAM user keys in front-end applications for workloads that skip model access review in the Bedrock console"
    ],
    "correct": 0,
    "explain": "The first option reflects AWS documented best practice; the others weaken security or retrieval quality."
  },
  {
    "id": "genai-ramp-152",
    "mode": "exam",
    "topic": "Integration",
    "obj": "2",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/agents.html",
    "q": "Case genai-ramp-152: In a airline AWS organization (initiative GENAI-152), platform engineers support Bedrock with Knowledge Bases, Agents, and Guardrails under IAM and Regional residency rules. Multilingual KB recall drops for Spanish PDFs after English-only embeddings were selected. (Track 152). Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases.",
    "options": [
      "Implement the recommended Bedrock pattern for this scenario with Regional model access enabled",
      "Skip model access requests and rely on default quotas only for workloads that skip model access review in the Bedrock console",
      "Disable Guardrails in production to reduce token usage for workloads that skip model access review in the Bedrock console",
      "Store long-lived IAM user keys in front-end applications for workloads that skip model access review in the Bedrock console"
    ],
    "correct": 0,
    "explain": "The first option reflects AWS documented best practice; the others weaken security or retrieval quality."
  },
  {
    "id": "genai-ramp-153",
    "mode": "exam",
    "topic": "Integration",
    "obj": "2",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/agents.html",
    "q": "Case genai-ramp-153: In a healthcare AWS organization (initiative GENAI-153), platform engineers support Bedrock with Knowledge Bases, Agents, and Guardrails under IAM and Regional residency rules. Technicians need grounded repair steps with citations; hallucinations appear when grounding checks are off. (Track 153). Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases.",
    "options": [
      "Implement the recommended Bedrock pattern for this scenario with Regional model access enabled",
      "Skip model access requests and rely on default quotas only for workloads that skip model access review in the Bedrock console",
      "Disable Guardrails in production to reduce token usage for workloads that skip model access review in the Bedrock console",
      "Store long-lived IAM user keys in front-end applications for workloads that skip model access review in the Bedrock console"
    ],
    "correct": 0,
    "explain": "The first option reflects AWS documented best practice; the others weaken security or retrieval quality."
  },
  {
    "id": "genai-ramp-154",
    "mode": "exam",
    "topic": "Guardrails",
    "obj": "3",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html",
    "q": "Case genai-ramp-154: In a retail AWS organization (initiative GENAI-154), platform engineers support Bedrock with Knowledge Bases, Agents, and Guardrails under IAM and Regional residency rules. Model evaluation jobs must gate release of a new RAG prompt version tied to campaign GENAI-106. (Track 154). Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases.",
    "options": [
      "Implement the recommended Bedrock pattern for this scenario with Regional model access enabled",
      "Skip model access requests and rely on default quotas only for workloads that skip model access review in the Bedrock console",
      "Disable Guardrails in production to reduce token usage for workloads that skip model access review in the Bedrock console",
      "Store long-lived IAM user keys in front-end applications for workloads that skip model access review in the Bedrock console"
    ],
    "correct": 0,
    "explain": "The first option reflects AWS documented best practice; the others weaken security or retrieval quality."
  },
  {
    "id": "genai-ramp-155",
    "mode": "exam",
    "topic": "Guardrails",
    "obj": "3",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html",
    "q": "Case genai-ramp-155: In a financial services AWS organization (initiative GENAI-155), platform engineers support Bedrock with Knowledge Bases, Agents, and Guardrails under IAM and Regional residency rules. ThrottlingException spikes during marketing events; clients retry without jitter. (Track 155). Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases.",
    "options": [
      "Implement the recommended Bedrock pattern for this scenario with Regional model access enabled",
      "Skip model access requests and rely on default quotas only for workloads that skip model access review in the Bedrock console",
      "Disable Guardrails in production to reduce token usage for workloads that skip model access review in the Bedrock console",
      "Store long-lived IAM user keys in front-end applications for workloads that skip model access review in the Bedrock console"
    ],
    "correct": 0,
    "explain": "The first option reflects AWS documented best practice; the others weaken security or retrieval quality."
  },
  {
    "id": "genai-ramp-156",
    "mode": "exam",
    "topic": "Guardrails",
    "obj": "3",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html",
    "q": "Case genai-ramp-156: In a manufacturing AWS organization (initiative GENAI-156), platform engineers support Bedrock with Knowledge Bases, Agents, and Guardrails under IAM and Regional residency rules. Sensitive information filters must apply to uploads and model outputs for HR policy chat. (Track 156). Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases.",
    "options": [
      "Implement the recommended Bedrock pattern for this scenario with Regional model access enabled",
      "Skip model access requests and rely on default quotas only for workloads that skip model access review in the Bedrock console",
      "Disable Guardrails in production to reduce token usage for workloads that skip model access review in the Bedrock console",
      "Store long-lived IAM user keys in front-end applications for workloads that skip model access review in the Bedrock console"
    ],
    "correct": 0,
    "explain": "The first option reflects AWS documented best practice; the others weaken security or retrieval quality."
  },
  {
    "id": "genai-ramp-157",
    "mode": "exam",
    "topic": "Guardrails",
    "obj": "3",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html",
    "q": "Case genai-ramp-157: In a media AWS organization (initiative GENAI-157), platform engineers support Bedrock with Knowledge Bases, Agents, and Guardrails under IAM and Regional residency rules. Provisioned Throughput versus on-demand must match flat baseline with two-hour daily peaks. (Track 157). Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases.",
    "options": [
      "Implement the recommended Bedrock pattern for this scenario with Regional model access enabled",
      "Skip model access requests and rely on default quotas only for workloads that skip model access review in the Bedrock console",
      "Disable Guardrails in production to reduce token usage for workloads that skip model access review in the Bedrock console",
      "Store long-lived IAM user keys in front-end applications for workloads that skip model access review in the Bedrock console"
    ],
    "correct": 0,
    "explain": "The first option reflects AWS documented best practice; the others weaken security or retrieval quality."
  },
  {
    "id": "genai-ramp-158",
    "mode": "exam",
    "topic": "Guardrails",
    "obj": "3",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html",
    "q": "Case genai-ramp-158: In a public sector AWS organization (initiative GENAI-158), platform engineers support Bedrock with Knowledge Bases, Agents, and Guardrails under IAM and Regional residency rules. Converse API adoption should unify tools, Guardrails, and multi-turn history across microservices. (Track 158). Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases.",
    "options": [
      "Implement the recommended Bedrock pattern for this scenario with Regional model access enabled",
      "Skip model access requests and rely on default quotas only for workloads that skip model access review in the Bedrock console",
      "Disable Guardrails in production to reduce token usage for workloads that skip model access review in the Bedrock console",
      "Store long-lived IAM user keys in front-end applications for workloads that skip model access review in the Bedrock console"
    ],
    "correct": 0,
    "explain": "The first option reflects AWS documented best practice; the others weaken security or retrieval quality."
  },
  {
    "id": "genai-ramp-159",
    "mode": "exam",
    "topic": "Guardrails",
    "obj": "3",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html",
    "q": "Case genai-ramp-159: In a telecom AWS organization (initiative GENAI-159), platform engineers support Bedrock with Knowledge Bases, Agents, and Guardrails under IAM and Regional residency rules. Data erasure requests require customer-tagged S3 objects to leave the vector index within twenty-four hours. (Track 159). Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases. Document decisions in change records, validate in non-production, and confirm retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases.",
    "options": [
      "Implement the recommended Bedrock pattern for this scenario with Regional model access enabled",
      "Skip model access requests and rely on default quotas only for workloads that skip model access review in the Bedrock console",
      "Disable Guardrails in production to reduce token usage for workloads that skip model access review in the Bedrock console",
      "Store long-lived IAM user keys in front-end applications for workloads that skip model access review in the Bedrock console"
    ],
    "correct": 0,
    "explain": "The first option reflects AWS documented best practice; the others weaken security or retrieval quality."
  }
];
