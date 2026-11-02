/**
 * AWS GenAI Developer (AIP-C01) ramp — scenarios, multi-response, thin concepts (#13).
 */
window.QUESTION_BANK_AWS_GENAI_RAMP = [
  {
    "id": "genai-ramp-001",
    "mode": "exam",
    "topic": "Troubleshooting",
    "obj": "5",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html",
    "q": "A Bedrock Knowledge Base chatbot answers policy FAQs well, but queries with internal part numbers (PN-44817-B) return irrelevant passages. Embeddings use a general model. What is the MOST effective fix?",
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
    "q": "An app sends the same 6,000-token system prompt and tool schema on every Bedrock request at ~40 RPS steady. Leadership wants lower cost and latency without changing answer quality. Which TWO help MOST? (Pick 2)",
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
    "q": "Teams need versioned prompts shared across dev/stage/prod with IAM-controlled updates. What should you use?",
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
    "topic": "Flows",
    "obj": "2",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/flows.html",
    "q": "You must orchestrate prompt → knowledge base retrieval → model invocation with branching on confidence. Which Bedrock feature fits?",
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
    "obj": "5",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation.html",
    "q": "Before promoting a new RAG prompt to production, you need automated quality scores against a golden Q&A set. What should you use?",
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
    "q": "A legal team needs consistent tone and domain terminology on a supported FM; few-shot prompts are insufficient. BEST approach?",
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
    "topic": "Agents",
    "obj": "2",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/agents.html",
    "q": "An agent must call an internal REST API to create tickets, then summarize results to the user. Which component defines the OpenAPI tool schema?",
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
    "obj": "5",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_InvokeModelWithResponseStream.html",
    "q": "Users report timeouts on long answers though the model keeps generating. Client uses synchronous InvokeModel. FIRST change to try?",
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
    "q": "Compliance requires blocking SSN patterns and denying off-topic medical advice in a HR chatbot. What should you configure?",
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
    "q": "New PDFs land in S3 hourly for a Knowledge Base. How do you keep vectors fresh with minimal ops?",
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
    "q": "A regulated workload must keep Bedrock traffic off the public internet and restrict who can invoke models. Which TWO controls apply? (Pick 2)",
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
    "q": "Retrieved chunks are too large and answers miss details buried mid-document. FIRST tuning step?",
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
    "q": "Traffic is steady 24/7 at high TPS and throttling occurs on on-demand inference. BEST cost/latency tradeoff?",
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
    "obj": "5",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/troubleshooting.html",
    "q": "Agent action calls fail with 403 from API Gateway though the agent plan looks correct. MOST likely cause?",
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
    "q": "Customer contracts require encryption of prompts/responses at rest in your logging pipeline. What should you implement?",
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
    "obj": "5",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base-evaluation.html",
    "q": "You need to measure retrieval precision/recall for a new KB configuration before launch. What should you run?",
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
    "topic": "Integration",
    "obj": "2",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/agents-alias.html",
    "q": "Blue/green deployment for a Bedrock Agent serving production traffic requires:",
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
    "q": "You must invoke a model in us-east-1 but it is only enabled in us-west-2. FIRST step?",
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
    "q": "Nightly job generates summaries for 2M archived tickets; latency can be hours. MOST cost-effective pattern?",
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
    "q": "Reduce hallucinated financial advice in outputs while keeping helpful answers. Which TWO Guardrails features help? (Pick 2)",
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
    "obj": "5",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/monitoring.html",
    "q": "Ops needs dashboards for model latency, token usage, and throttling. PRIMARY service?",
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
    "q": "Multi-tenant SaaS must filter KB retrieval per customer_id metadata. How should you implement?",
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
    "obj": "5",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/service-quotas.html",
    "q": "Sudden ThrottlingException spikes during marketing launch. FIRST mitigation while keeping quality?",
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
    "q": "You need cross-Region resilience for Claude model invocation with a single model ID in code. Use:",
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
    "q": "Product policy bans generating instructions for weapons. Besides Guardrails, what governance practice is REQUIRED?",
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
    "q": "Model returns JSON but often adds markdown fences. MOST reliable fix?",
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
    "obj": "5",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation.html",
    "q": "Regression testing before prompt change should include which TWO? (Pick 2)",
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
    "q": "You change embedding model for an existing Knowledge Base. Required action?",
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
    "topic": "Agents",
    "obj": "2",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/agents-prepare.html",
    "q": "After updating agent instructions and action schemas, what must you do before testing in console?",
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
    "q": "Answers cite too many irrelevant passages increasing cost. FIRST knob to turn?",
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
    "q": "Audit requires retaining model invocation logs with sensitive fields redacted. BEST pattern?",
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
    "obj": "5",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base-troubleshooting.html",
    "q": "KB answers 'I don't know' despite document containing answer. Retrieval shows low scores. NEXT step?",
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
    "q": "Agent should answer from private docs AND call tools. Combine:",
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
    "q": "Creative marketing copy needs variety; compliance summaries need determinism. How should you configure?",
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
    "q": "Lambda calls Bedrock and retrieves from KB in VPC. Credentials should come from:",
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
    "q": "EU customer data must stay in eu-central-1 for Bedrock and KB storage. What must you verify FIRST?",
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
    "q": "After custom model training completes, how do you invoke it in applications?",
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
    "q": "Structured product specs live in DynamoDB; manuals are PDFs in S3. BEST retrieval design?",
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
    "q": "Contracts require customer content is not used to improve base FMs. Which Bedrock default applies?",
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
    "q": "You need semantic search over support tickets in English only. FIRST model choice?",
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
    "q": "Engineers want to A/B test two prompt versions in staging without redeploying Lambda. Use:",
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
    "q": "A Flow must call Lambda for enrichment, then KB retrieve, then model. Where is Lambda invoked?",
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
    "q": "Production agent with tools needs reliable releases. Which TWO practices apply? (Pick 2)",
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
    "q": "Mobile app should not hold Bedrock credentials. Recommended pattern?",
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
    "q": "Different apps need different safety policies on the same account. How do you scope Guardrails?",
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
    "q": "Reduce prompt injection risk for a RAG assistant. Which TWO help MOST? (Pick 2)",
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
    "q": "Security team needs who invoked which model and when. Enable:",
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
    "q": "Spiky chat traffic with long idle periods overnight. DEFAULT capacity model?",
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
    "q": "Context window fills with low-relevance chunks, increasing cost. FIRST fix?",
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
    "q": "Repeated tool definitions and system policies dominate input tokens. Enable:",
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
    "q": "Leadership wants regression gates in CI before prompt promotion. Implement:",
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
    "obj": "5",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/troubleshooting.html",
    "q": "InvokeModel returns AccessDeniedException though IAM policy looks broad. NEXT check?",
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
    "obj": "5",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base-evaluation.html",
    "q": "After changing chunk size, what should you re-run BEFORE launch?",
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
    "obj": "5",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/monitoring.html",
    "q": "P95 latency SLO breaches during peak. Which metrics pinpoint Bedrock vs app issues?",
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
    "q": "Agent returns hallucinated API parameters though OpenAPI schema is attached. FIRST fix?",
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
    "q": "Ingestion jobs fail on encrypted PDFs in S3. MOST likely missing piece?",
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
    "q": "Multi-Region active-active chat with one codebase model identifier. Use which TWO? (Pick 2)",
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
    "q": "Users attempt jailbreaks via encoded instructions. Add:",
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
    "q": "Training data for customization must be stored where for Bedrock fine-tuning jobs?",
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
    "q": "Non-technical reviewers need to adjust branching logic without redeploying Java. Prefer:",
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
    "q": "Reduce spend on offline summarization AND interactive chat. Which TWO pairings fit? (Pick 2)",
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
    "obj": "5",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation.html",
    "q": "Holistic release checklist for a RAG app includes which TWO automated tests? (Pick 2)",
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
    "q": "OpenSearch Serverless backs your KB. Index capacity errors appear at peak ingest. FIRST step?",
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
    "q": "Tool calls must hit a private API in your VPC. Recommended network path?",
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
    "obj": "5",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/service-quotas.html",
    "q": "Streaming responses stall mid-generation with no error in app logs. Check:",
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
    "q": "A healthcare team must keep patient prompts and model outputs in a specific AWS Region and block cross-Region inference for regulated workloads. Which combination addresses data residency for Bedrock use?",
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
    "q": "You are onboarding a new account for Bedrock: developers need Claude and Titan in us-east-1, finance wants visibility into who enabled models, and security wants no model use until approved. Which TWO controls apply first? (Pick 2)",
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
    "q": "A customer-facing chatbot occasionally returns toxic content when users jailbreak with role-play prompts. Leadership wants filtering without retraining the base model. What should you implement?",
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
    "obj": "5",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base-evaluation.html",
    "q": "After a KB sync, stakeholders report correct answers dropped 15 points on a golden Q&A set while retrieval logs show fewer chunks returned for SKU-heavy queries. What is the BEST next diagnostic step?",
    "options": [
      "Raise top_k to the service maximum on every query so more chunks always return regardless of relevance",
      "Run KB evaluation on the golden Q&A set; compare retrieval scores to the pre-sync baseline",
      "Rollback the embedding model to an older version without reviewing sync job logs or chunk statistics",
      "Turn off chunking so each source document becomes one giant vector passed to the generator"
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
    "q": "Your microservices call different Bedrock models but need one SDK pattern for multi-turn chat, tool use, and Guardrails on the same thread. What reduces integration sprawl?",
    "options": [
      "Implement separate InvokeModel, InvokeModelWithResponseStream, and Agent runtime clients per feature team",
      "Standardize on the Converse and ConverseStream APIs with shared message history and toolConfig blocks",
      "Proxy all models through a single EC2 instance running custom HTTP wrappers",
      "Store conversation state only in browser localStorage without server-side session binding"
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
    "q": "A knowledge base ingests from S3 documents and Confluence via connectors. Compliance requires PII redaction before embedding and an audit trail of sync jobs. Which TWO practices fit? (Pick 2)",
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
    "q": "A multilingual support KB must retrieve equally well in English and Spanish product docs. Current English-only embedding model hurts Spanish recall. FIRST change?",
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
    "q": "Security reviews a new Bedrock workload storing prompts in S3 and invoking models from Lambda. Which TWO controls address encryption and access? (Pick 2)",
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
    "q": "An agent must book appointments by calling your REST API with OAuth client credentials rotated monthly. How should credentials reach the action group Lambda?",
    "options": [
      "Hard-code client secrets in the agent instruction prompt for faster cold starts on every invocation",
      "Store secrets in Secrets Manager; Lambda retrieves them at runtime with a scoped execution role",
      "Email the refresh token to agents as a system message on every user turn for operators to read",
      "Embed secrets in OpenAPI schema descriptions visible to the foundation model during planning"
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
    "q": "Product wants reusable prompt templates, A/B tests between versions, and a visual path from prompt to KB to model. Which TWO Bedrock features combine? (Pick 2)",
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
    "q": "A shared AWS account hosts Bedrock for multiple product lines. Auditors require developers cannot invoke unapproved models even if they guess model IDs. BEST IAM pattern?",
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
    "q": "A healthcare assistant must block PII in user uploads and model replies while still allowing clinical FAQ answers. Which TWO Guardrail capabilities apply? (Pick 2)",
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
    "q": "Traffic is flat at 25 RPS for one Claude model 24×7. On-demand bills are spiking. Finance wants predictable cost without sacrificing latency. FIRST lever?",
    "options": [
      "Purchase Provisioned Throughput sized to the steady baseline for that model in the Region",
      "Move all traffic to batch inference jobs polled every hour for synchronous chat responses",
      "Delete Guardrails to reduce billed tokens per request without changing the inference mode",
      "Switch to the smallest embedding model for chat generation to cut generation pricing"
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
    "q": "An internal copilot reuses a 4k-token policy preamble and tool JSON on every request. Latency and input-token cost are high. Which TWO optimizations help? (Pick 2)",
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
    "q": "PDF manuals mix long prose with tables of SKU specifications. Retrieval returns prose chunks but misses table rows for part numbers. BEST ingestion tweak?",
    "options": [
      "Use hierarchical or custom chunking that preserves table rows and headings where supported",
      "Set chunk size to 10 tokens so every table splits into random fragments during every sync job",
      "Remove all tables at ingest because embeddings cannot represent numbers in any AWS Region",
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
    "q": "Account A hosts the app; Account B owns the Bedrock custom model and KMS keys. How should Account A invoke the custom model?",
    "options": [
      "Share root credentials across accounts for simplicity when rotating keys each quarter",
      "Use a resource policy on the custom model plus KMS grants so Account A's role can InvokeModel",
      "Copy model artifacts to a public S3 bucket in Account A for faster cross-account downloads",
      "Disable encryption on the custom model endpoint in Account B to reduce KMS API calls"
    ],
    "correct": 1,
    "explain": "Cross-account invocation relies on resource policies and KMS permissions on the model account, not shared root keys or public artifacts."
  },
  {
    "id": "genai-ramp-082",
    "mode": "exam",
    "topic": "Troubleshooting",
    "obj": "5",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/troubleshooting-api-error-codes.html",
    "q": "Production sees intermittent ThrottlingException on InvokeModel during marketing spikes. Application logs show retries without backoff. BEST mitigation?",
    "options": [
      "Implement exponential backoff with jitter and request a service quota increase if sustained",
      "Remove all retries so failures surface immediately to users without recovery or alerting",
      "Switch to a different AWS Region mid-request without client changes or endpoint configuration",
      "Hard-code sleep(0) in a tight loop to maximize throughput during quota enforcement windows"
    ],
    "correct": 0,
    "explain": "Backoff reduces thundering herds; quota increases address sustained overages. Blind region hops or zero-delay loops worsen throttling."
  },
  {
    "id": "genai-ramp-083",
    "mode": "exam",
    "topic": "Evaluation",
    "type": "multi",
    "obj": "5",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation-jobs.html",
    "q": "Before promoting a new RAG prompt version, which TWO validation steps match Bedrock evaluation practices? (Pick 2)",
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
    "q": "SREs need token counts, latency, and throttling per model for a multi-tenant Bedrock API. FIRST observability step?",
    "options": [
      "Enable Amazon CloudWatch metrics and logs for Bedrock with dashboards on Invocations and OutputTokenCount",
      "Disable logging to reduce overhead during peak marketing events across all Regions and accounts",
      "Sample one request per day manually from browser devtools without storing timestamps centrally",
      "Store metrics only in the user session cookie on the client device without server-side aggregation"
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
    "q": "A RAG app hallucinates when retrieved chunks are stale after nightly catalog updates. Which TWO changes reduce stale answers? (Pick 2)",
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
    "q": "Debug an agent that loops on the same tool call. Which TWO tools help? (Pick 2)",
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
    "q": "Answers must cite retrieved passages and refuse when grounding score is low. Which Guardrail feature applies?",
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
    "obj": "5",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/inference.html",
    "q": "Users report high time-to-first-token on streaming chat. Retrieval is fast; generation model is large. FIRST tuning knob?",
    "options": [
      "Profile model latency per FM and consider a smaller model or region colocation for interactive paths",
      "Disable streaming so users wait for the full response silently without partial token delivery",
      "Remove Guardrails entirely to skip policy evaluation latency on every production InvokeModel call",
      "Double the number of retrieved chunks on every request regardless of prompt length or cost"
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
    "q": "A custom model job failed with insufficient training data format errors. What should you verify FIRST in S3?",
    "options": [
      "JSONL or specified format matches Bedrock customization requirements for the chosen base model",
      "The S3 bucket is in a different Region than the training job for cost savings without replication",
      "Training files are gzip-compressed with random file extensions and no manifest metadata",
      "Labels are stored only in CloudWatch log streams instead of structured training objects in S3"
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
    "q": "Finance asks which TWO levers reduce on-demand spend without removing Guardrails from production chat? (Pick 2)",
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
    "q": "A mobile app must query a knowledge base without exposing database credentials. Recommended pattern?",
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
    "obj": "5",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/troubleshooting-api-error-codes.html",
    "q": "InvokeModel returns AccessDeniedException after a model rename in the console. Most likely cause?",
    "options": [
      "IAM policy still references the previous foundation model ID or ARN after access was re-requested",
      "Temperature was set below zero in the request body JSON payload according to the API schema",
      "The user switched browsers without clearing cookies on the marketing site landing page",
      "CloudWatch log group retention was reduced from 30 to 7 days for unrelated Lambda functions"
    ],
    "correct": 0,
    "explain": "Model identifiers and access flags change; IAM must match currently enabled model resources."
  },
  {
    "id": "genai-ramp-093",
    "mode": "exam",
    "topic": "Evaluation",
    "type": "multi",
    "obj": "5",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation.html",
    "q": "Which TWO metrics belong in a Bedrock RAG release scorecard? (Pick 2)",
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
  }
];
