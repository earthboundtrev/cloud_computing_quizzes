window.QUESTION_BANK_AWS_GENAI_EXTRA = [
  {
    "mode": "exam",
    "topic": "Bedrock",
    "q": "Amazon Bedrock provides access to foundation models (FMs) through which model delivery option?",
    "options": [
      "Only bring-your-own model — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "API access to FMs from Amazon and third parties (no infrastructure to manage)",
      "Only Amazon Titan — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Only open-source models — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload"
    ],
    "correct": 1,
    "explain": "Bedrock = fully managed; access FMs from Amazon and third-party providers via API; no servers to manage.",
    "obj": "1",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html",
    "id": "genai-extra-0001"
  },
  {
    "mode": "exam",
    "topic": "Bedrock",
    "q": "To use a foundation model in Bedrock for the first time, you must:",
    "options": [
      "Deploy the model to EC2 — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Enable model access in the Bedrock console (Model Access in the left menu)",
      "Use only default models — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Request a custom fine-tune — not the recommended Bedrock approach here"
    ],
    "correct": 1,
    "explain": "Model access must be enabled per model (and per region) before you can invoke it.",
    "obj": "1",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html",
    "id": "genai-extra-0002"
  },
  {
    "mode": "exam",
    "topic": "Bedrock",
    "q": "Bedrock Inference supports which invocation patterns?",
    "options": [
      "Synchronous only — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Synchronous (InvokeModel) and asynchronous (InvokeModelWithResponseStream)",
      "Batch only — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Only streaming — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload"
    ],
    "correct": 1,
    "explain": "InvokeModel = sync; InvokeModelWithResponseStream = stream tokens; async for long-running inference.",
    "obj": "4",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/provisioned-throughput.html",
    "id": "genai-extra-0003"
  },
  {
    "mode": "exam",
    "topic": "Bedrock",
    "q": "Amazon Bedrock Serverless Inference is best for:",
    "options": [
      "Only high-throughput batch — not the recommended Bedrock approach here",
      "Variable or unpredictable traffic; pay per request",
      "Only reserved capacity — not the recommended Bedrock approach here",
      "Only real-time always-on — not the recommended Bedrock approach here"
    ],
    "correct": 1,
    "explain": "Serverless = no capacity to manage; pay per request; good for variable traffic.",
    "obj": "1",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/aws-certification/latest/examguides/gen-ai-developer-professional-01.html",
    "id": "genai-extra-0004"
  },
  {
    "mode": "exam",
    "topic": "Bedrock",
    "q": "Provisioned Throughput in Bedrock is used when you need:",
    "options": [
      "Only serverless — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Predictable capacity and guaranteed throughput (dedicated model units)",
      "Only on-demand — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Only batch — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload"
    ],
    "correct": 1,
    "explain": "Provisioned Throughput = reserve model units for predictable performance; commit to capacity.",
    "obj": "4",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/provisioned-throughput.html",
    "id": "genai-extra-0005"
  },
  {
    "mode": "exam",
    "topic": "RAG",
    "q": "A RAG (Retrieval-Augmented Generation) solution on AWS typically uses Bedrock with:",
    "options": [
      "Only the base model — not the recommended Bedrock approach here",
      "Bedrock Knowledge Bases (retrieve from your data, then generate)",
      "Only Lambda — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Only S3 without retrieval — not the recommended Bedrock approach here"
    ],
    "correct": 1,
    "explain": "Knowledge Bases = ingest your data (S3, etc.), create embeddings, retrieve relevant chunks for context in prompts.",
    "obj": "2",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html",
    "id": "genai-extra-0006"
  },
  {
    "mode": "exam",
    "topic": "RAG",
    "q": "Bedrock Knowledge Bases can use which vector store?",
    "options": [
      "Only OpenSearch — not the recommended Bedrock approach here",
      "Amazon OpenSearch Serverless, Pinecone, or Redis Enterprise Cloud",
      "Only DynamoDB — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Only RDS — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload"
    ],
    "correct": 1,
    "explain": "Knowledge Bases support OpenSearch Serverless, Pinecone, Redis Enterprise as vector stores.",
    "obj": "1",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/aws-certification/latest/examguides/gen-ai-developer-professional-01.html",
    "id": "genai-extra-0007"
  },
  {
    "mode": "exam",
    "topic": "RAG",
    "q": "When building RAG, embedding models in Bedrock are used to:",
    "options": [
      "Only generate text — not the recommended Bedrock approach here",
      "Convert text to vector embeddings for retrieval",
      "Only summarize — not the recommended Bedrock approach here",
      "Only translate — not the recommended Bedrock approach here"
    ],
    "correct": 1,
    "explain": "Embedding models (e.g., Titan Embeddings) convert text to vectors for similarity search in the vector store.",
    "obj": "1",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/aws-certification/latest/examguides/gen-ai-developer-professional-01.html",
    "id": "genai-extra-0008"
  },
  {
    "mode": "exam",
    "topic": "RAG",
    "q": "Chunking strategy in RAG affects:",
    "options": [
      "Only cost — not the recommended Bedrock approach here",
      "Retrieval quality and relevance (size, overlap, semantics)",
      "Only latency — not the recommended Bedrock approach here",
      "Only model choice — not the recommended Bedrock approach here"
    ],
    "correct": 1,
    "explain": "Chunk size and overlap affect what gets retrieved; too large or too small can hurt answer quality.",
    "obj": "1",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/aws-certification/latest/examguides/gen-ai-developer-professional-01.html",
    "id": "genai-extra-0009"
  },
  {
    "mode": "exam",
    "topic": "Agents",
    "q": "Bedrock Agents are used to:",
    "options": [
      "Only run batch jobs — not the recommended Bedrock approach here",
      "Orchestrate multi-step tasks with tools and knowledge bases",
      "Only invoke a single model — not the recommended Bedrock approach here",
      "Only store embeddings — not the recommended Bedrock approach here"
    ],
    "correct": 1,
    "explain": "Agents = orchestrate FMs with action groups (APIs, Lambda) and optional knowledge bases; multi-step reasoning.",
    "obj": "2",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html",
    "id": "genai-extra-0010"
  },
  {
    "mode": "exam",
    "topic": "Agents",
    "q": "An action group in a Bedrock Agent typically:",
    "options": [
      "Only returns static text — not the recommended Bedrock approach here",
      "Defines APIs or Lambda functions the agent can call to perform actions",
      "Only retrieves from Knowledge Base — not the recommended Bedrock approach here",
      "Only streams tokens — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload"
    ],
    "correct": 1,
    "explain": "Action groups = define tools (OpenAPI schema + Lambda or API) the agent can invoke.",
    "obj": "2",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html",
    "id": "genai-extra-0011"
  },
  {
    "mode": "exam",
    "topic": "Agents",
    "q": "To keep agent behavior consistent and controllable, you should:",
    "options": [
      "Only use the default system prompt — not the recommended Bedrock approach here",
      "Configure instructions (system prompt) and guardrails",
      "Only use one action group — not the recommended Bedrock approach here",
      "Only use streaming — not the recommended Bedrock approach here"
    ],
    "correct": 1,
    "explain": "Instructions and guardrails shape agent behavior; use them for consistency and safety.",
    "obj": "3",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html",
    "id": "genai-extra-0012"
  },
  {
    "mode": "exam",
    "topic": "Guardrails",
    "q": "Bedrock Guardrails help with:",
    "options": [
      "Only cost control — not the recommended Bedrock approach here",
      "Content filtering and safety (deny harmful or off-topic content)",
      "Only scaling — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Only logging — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload"
    ],
    "correct": 1,
    "explain": "Guardrails = apply content filters (hate, violence, PII, etc.) and topic policies on input/output.",
    "obj": "3",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html",
    "id": "genai-extra-0013"
  },
  {
    "mode": "exam",
    "topic": "Guardrails",
    "q": "Guardrails can be applied at:",
    "options": [
      "Model level only — not the recommended Bedrock approach here",
      "Input (prompt) and/or output (response) stages",
      "Only output — not the recommended Bedrock approach here",
      "Only in Knowledge Base — not the recommended Bedrock approach here"
    ],
    "correct": 1,
    "explain": "Guardrails evaluate and block/filter at input and/or output; configurable per stage.",
    "obj": "5",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation.html",
    "id": "genai-extra-0014"
  },
  {
    "mode": "exam",
    "topic": "Security",
    "q": "To run Bedrock inference inside your VPC without internet, you would use:",
    "options": [
      "Only public Bedrock endpoints — not the recommended Bedrock approach here",
      "VPC endpoints for Bedrock (and optionally PrivateLink)",
      "Only NAT Gateway — not the recommended Bedrock approach here",
      "Only VPN — not the recommended Bedrock approach here"
    ],
    "correct": 1,
    "explain": "Use VPC endpoints (interface endpoints) for Bedrock so traffic stays on the AWS network; optional PrivateLink for private access.",
    "obj": "1",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html",
    "id": "genai-extra-0015"
  },
  {
    "mode": "exam",
    "topic": "Security",
    "q": "Bedrock supports encryption of model data:",
    "options": [
      "Only in transit — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "At rest (AWS managed or customer-managed keys in KMS) and in transit",
      "Only at rest — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "No encryption — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload"
    ],
    "correct": 1,
    "explain": "Encryption at rest with KMS (default or CMK); TLS in transit.",
    "obj": "3",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html",
    "id": "genai-extra-0016"
  },
  {
    "mode": "exam",
    "topic": "Deployment",
    "q": "For a production GenAI app that must scale with traffic, a common pattern is:",
    "options": [
      "Single EC2 instance only — not the recommended Bedrock approach here",
      "API Gateway + Lambda (or container) invoking Bedrock",
      "Only SageMaker real-time — not the recommended Bedrock approach here",
      "Only batch — not the recommended Bedrock approach here"
    ],
    "correct": 1,
    "explain": "API Gateway + Lambda/container calling Bedrock = serverless, scalable; add caching and throttling as needed.",
    "obj": "5",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation.html",
    "id": "genai-extra-0017"
  },
  {
    "mode": "exam",
    "topic": "Deployment",
    "q": "Amazon SageMaker JumpStart can be used for GenAI to:",
    "options": [
      "Only Bedrock — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Deploy and fine-tune open-source FMs (e.g., Llama) on SageMaker",
      "Only Knowledge Bases — not the recommended Bedrock approach here",
      "Only agents — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload"
    ],
    "correct": 1,
    "explain": "JumpStart = deploy pre-built models (including LLMs) and fine-tune; alternative to Bedrock for bring-your-own.",
    "obj": "2",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html",
    "id": "genai-extra-0018"
  },
  {
    "mode": "exam",
    "topic": "Cost",
    "q": "To optimize cost when using Bedrock with variable traffic, you should consider:",
    "options": [
      "Only Provisioned Throughput — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "On-Demand or Serverless for variable load; Provisioned Throughput for steady high load",
      "Only On-Demand — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Only custom models — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload"
    ],
    "correct": 1,
    "explain": "On-Demand/Serverless = pay per use; Provisioned = commit for predictable, high throughput; match to traffic pattern.",
    "obj": "4",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/provisioned-throughput.html",
    "id": "genai-extra-0019"
  },
  {
    "mode": "exam",
    "topic": "Cost",
    "q": "Bedrock pricing is typically based on:",
    "options": [
      "Only API calls — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Input and output tokens (and optionally model units for Provisioned Throughput)",
      "Only storage — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Only requests — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload"
    ],
    "correct": 1,
    "explain": "Pay per input token and output token (varies by model); Provisioned Throughput adds model unit pricing.",
    "obj": "4",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/provisioned-throughput.html",
    "id": "genai-extra-0020"
  },
  {
    "mode": "exam",
    "topic": "Bedrock",
    "q": "Which Bedrock feature allows you to fine-tune a model on your own data?",
    "options": [
      "Only base model invocation — not the recommended Bedrock approach here",
      "Bedrock Custom Model (fine-tune supported models with your dataset)",
      "Only Knowledge Base — not the recommended Bedrock approach here",
      "Only Guardrails — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload"
    ],
    "correct": 1,
    "explain": "Custom Model = fine-tune supported FMs (e.g., Cohere, Amazon Titan) with your data in S3.",
    "obj": "1",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/aws-certification/latest/examguides/gen-ai-developer-professional-01.html",
    "id": "genai-extra-0021"
  },
  {
    "mode": "exam",
    "topic": "RAG",
    "q": "In RAG, the purpose of the retrieval step is to:",
    "options": [
      "Replace the model — not the recommended Bedrock approach here",
      "Fetch relevant context from your data to add to the prompt",
      "Only cache responses — not the recommended Bedrock approach here",
      "Only validate output — not the recommended Bedrock approach here"
    ],
    "correct": 1,
    "explain": "Retrieve relevant documents/chunks; concatenate with user prompt so the FM has context to answer accurately.",
    "obj": "2",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html",
    "id": "genai-extra-0022"
  },
  {
    "mode": "exam",
    "topic": "Agents",
    "q": "When a Bedrock Agent uses a Knowledge Base, it:",
    "options": [
      "Only calls action groups — not the recommended Bedrock approach here",
      "Can retrieve from the Knowledge Base and optionally call action groups",
      "Only streams — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Only uses one model — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload"
    ],
    "correct": 1,
    "explain": "Agent can use both Knowledge Base (retrieval) and action groups (tools); configured in the agent.",
    "obj": "2",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html",
    "id": "genai-extra-0023"
  },
  {
    "mode": "exam",
    "topic": "Guardrails",
    "q": "A guardrail topic policy is used to:",
    "options": [
      "Only filter PII — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Restrict conversation to approved topics or deny prohibited topics",
      "Only filter violence — not the recommended Bedrock approach here",
      "Only log requests — not the recommended Bedrock approach here"
    ],
    "correct": 1,
    "explain": "Topic policies = allow list or deny list of topics; keep the model on-topic.",
    "obj": "3",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html",
    "id": "genai-extra-0024"
  },
  {
    "mode": "exam",
    "topic": "Security",
    "q": "To allow only specific IAM principals to call Bedrock, you should:",
    "options": [
      "Only use VPC — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Use IAM policies (and optionally resource policies) on the Bedrock resources",
      "Only use Guardrails — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Only use encryption — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload"
    ],
    "correct": 1,
    "explain": "IAM policies control who can invoke models; use least privilege; resource policies for cross-account if needed.",
    "obj": "1",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html",
    "id": "genai-extra-0025"
  },
  {
    "mode": "exam",
    "topic": "Deployment",
    "q": "For low-latency inference at high scale, a suitable option is:",
    "options": [
      "Only Lambda with no concurrency — not the recommended Bedrock approach here",
      "Provisioned Throughput (dedicated capacity) or SageMaker real-time endpoint",
      "Only on-demand with no cache — not the recommended Bedrock approach here",
      "Only batch — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload"
    ],
    "correct": 1,
    "explain": "Provisioned Throughput = dedicated capacity, predictable latency; SageMaker = custom models with dedicated instances.",
    "obj": "5",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation.html",
    "id": "genai-extra-0026"
  },
  {
    "mode": "exam",
    "topic": "Monitoring",
    "q": "To trace and debug Bedrock invocations in production, you can use:",
    "options": [
      "Only CloudWatch Logs — not the recommended Bedrock approach here",
      "AWS X-Ray (and CloudWatch) for tracing and metrics",
      "Only Guardrails — not the recommended Bedrock approach here",
      "Only Knowledge Base logs — not the recommended Bedrock approach here"
    ],
    "correct": 1,
    "explain": "X-Ray = trace requests across services; CloudWatch = logs and metrics; use both for observability.",
    "obj": "5",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation.html",
    "id": "genai-extra-0027"
  },
  {
    "mode": "exam",
    "topic": "Bedrock",
    "q": "InvokeModelWithResponseStream returns:",
    "options": [
      "Only a single block of text — not the recommended Bedrock approach here",
      "A stream of response chunks (e.g., for real-time UX)",
      "Only metadata — not the recommended Bedrock approach here",
      "Only embeddings — not the recommended Bedrock approach here"
    ],
    "correct": 1,
    "explain": "Streaming API = receive chunks as the model generates; better UX for chat and long responses.",
    "obj": "1",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/aws-certification/latest/examguides/gen-ai-developer-professional-01.html",
    "id": "genai-extra-0028"
  },
  {
    "mode": "exam",
    "topic": "RAG",
    "q": "Hybrid search in a RAG context typically combines:",
    "options": [
      "Only two embedding models — not the recommended Bedrock approach here",
      "Keyword (e.g., BM25) and semantic (vector) search",
      "Only vector search — not the recommended Bedrock approach here",
      "Only keyword search — not the recommended Bedrock approach here"
    ],
    "correct": 1,
    "explain": "Hybrid = keyword + vector; improves retrieval when exact terms or semantics matter.",
    "obj": "1",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/aws-certification/latest/examguides/gen-ai-developer-professional-01.html",
    "id": "genai-extra-0029"
  },
  {
    "mode": "exam",
    "topic": "Agents",
    "q": "Agent memory (session state) in Bedrock Agents is used to:",
    "options": [
      "Only store embeddings — not the recommended Bedrock approach here",
      "Persist conversation context across turns",
      "Only cache model output — not the recommended Bedrock approach here",
      "Only log actions — not the recommended Bedrock approach here"
    ],
    "correct": 1,
    "explain": "Session state = store conversation history and context so the agent has memory across turns.",
    "obj": "2",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html",
    "id": "genai-extra-0030"
  },
  {
    "mode": "exam",
    "topic": "Guardrails",
    "q": "PII filter in Guardrails can:",
    "options": [
      "Only log PII — not the recommended Bedrock approach here",
      "Detect and redact or block PII in input/output",
      "Only block all text — not the recommended Bedrock approach here",
      "Only allow PII — not the recommended Bedrock approach here"
    ],
    "correct": 1,
    "explain": "PII filters = detect and redact or block (e.g., SSN, names) to meet compliance.",
    "obj": "3",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html",
    "id": "genai-extra-0031"
  },
  {
    "mode": "exam",
    "topic": "Security",
    "q": "Cross-account access to Bedrock can be granted via:",
    "options": [
      "Only same-account IAM — not the recommended Bedrock approach here",
      "Resource-based policies (e.g., on Bedrock) and IAM in the other account",
      "Only VPC peering — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Only Guardrails — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload"
    ],
    "correct": 1,
    "explain": "Use resource policy on the Bedrock resource to allow another account; other account needs IAM to call.",
    "obj": "1",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html",
    "id": "genai-extra-0032"
  },
  {
    "mode": "exam",
    "topic": "Cost",
    "q": "Caching Bedrock model responses is useful when:",
    "options": [
      "Traffic is always unique — not the recommended Bedrock approach here",
      "Similar prompts repeat (reduce cost and latency)",
      "Only for batch — not the recommended Bedrock approach here",
      "Only for streaming — not the recommended Bedrock approach here"
    ],
    "correct": 1,
    "explain": "Cache repeated or similar prompts (e.g., prompt cache in Bedrock or application-level cache) to save tokens and latency.",
    "obj": "5",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation.html",
    "id": "genai-extra-0033"
  },
  {
    "mode": "exam",
    "topic": "Deployment",
    "q": "AWS Lambda is a good fit for Bedrock invocation when:",
    "options": [
      "Only long-running batch — not the recommended Bedrock approach here",
      "Event-driven, variable load, and invocation fits within Lambda timeout",
      "Only real-time 24/7 — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Only Provisioned Throughput — not the recommended Bedrock approach here"
    ],
    "correct": 1,
    "explain": "Lambda = event-driven, scales automatically; ensure inference fits within 15 min timeout and memory limits.",
    "obj": "2",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html",
    "id": "genai-extra-0034"
  },
  {
    "mode": "exam",
    "topic": "Bedrock",
    "q": "Model ID in Bedrock (e.g., anthropic.claude-3-sonnet) identifies:",
    "options": [
      "Only the region — not the recommended Bedrock approach here",
      "The specific foundation model and variant to invoke",
      "Only the account — not the recommended Bedrock approach here",
      "Only the endpoint — not the recommended Bedrock approach here"
    ],
    "correct": 1,
    "explain": "Model ID = provider.model-name (e.g., amazon.titan-text-express); required for InvokeModel.",
    "obj": "1",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/aws-certification/latest/examguides/gen-ai-developer-professional-01.html",
    "id": "genai-extra-0035"
  },
  {
    "mode": "exam",
    "topic": "RAG",
    "q": "Metadata filtering in a Knowledge Base query allows you to:",
    "options": [
      "Only filter by date — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Restrict retrieval to documents matching metadata (e.g., department, locale)",
      "Only filter by size — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Only filter by model — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload"
    ],
    "correct": 1,
    "explain": "Metadata filters = narrow retrieval to chunks that match key-value filters; improves relevance.",
    "obj": "1",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/aws-certification/latest/examguides/gen-ai-developer-professional-01.html",
    "id": "genai-extra-0036"
  },
  {
    "mode": "exam",
    "topic": "Agents",
    "q": "Prepared prompts (prompt templates) in Bedrock Agents help with:",
    "options": [
      "Only logging — not the recommended Bedrock approach here",
      "Consistent, reusable prompt structure and variables",
      "Only streaming — not the recommended Bedrock approach here",
      "Only action groups — not the recommended Bedrock approach here"
    ],
    "correct": 1,
    "explain": "Prepared prompts = templates with placeholders; standardize and reuse prompt structure.",
    "obj": "2",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html",
    "id": "genai-extra-0037"
  },
  {
    "mode": "exam",
    "topic": "Guardrails",
    "q": "Word filters in Guardrails can:",
    "options": [
      "Only allow all words — not the recommended Bedrock approach here",
      "Block or replace specific words/phrases (e.g., profanity, competitors)",
      "Only log words — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Only for PII — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload"
    ],
    "correct": 1,
    "explain": "Word filters = block list or replace list for specific terms; configurable.",
    "obj": "3",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html",
    "id": "genai-extra-0038"
  },
  {
    "mode": "exam",
    "topic": "Monitoring",
    "q": "CloudWatch metrics for Bedrock can include:",
    "options": [
      "Only cost — not the recommended Bedrock approach here",
      "Invocation count, latency, errors (by model, account)",
      "Only tokens — not the recommended Bedrock approach here",
      "Only streaming — not the recommended Bedrock approach here"
    ],
    "correct": 1,
    "explain": "Bedrock emits metrics (Invocations, InvocationLatency, etc.); use for monitoring and alarms.",
    "obj": "5",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation.html",
    "id": "genai-extra-0039"
  },
  {
    "mode": "exam",
    "topic": "Bedrock",
    "q": "Bedrock supports which type of models for text generation?",
    "options": [
      "Only Amazon models — not the recommended Bedrock approach here",
      "Amazon (Titan, etc.) and third-party (Anthropic, Cohere, Meta, etc.)",
      "Only open-source — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Only custom — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload"
    ],
    "correct": 1,
    "explain": "Bedrock = multi-provider; Amazon Titan, Anthropic Claude, Cohere, Meta Llama, etc.; enable per model.",
    "obj": "1",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/aws-certification/latest/examguides/gen-ai-developer-professional-01.html",
    "id": "genai-extra-0040"
  },
  {
    "mode": "exam",
    "topic": "RAG",
    "q": "When ingestion runs for a Bedrock Knowledge Base, it:",
    "options": [
      "Only deletes data — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Syncs data source (e.g., S3), chunks, generates embeddings, writes to vector store",
      "Only invokes the model — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Only updates Guardrails — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload"
    ],
    "correct": 1,
    "explain": "Ingestion = read from data source, chunk, embed, store in vector store; run on schedule or on-demand.",
    "obj": "1",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/aws-certification/latest/examguides/gen-ai-developer-professional-01.html",
    "id": "genai-extra-0041"
  },
  {
    "mode": "exam",
    "topic": "Agents",
    "q": "Agent validation in Bedrock helps:",
    "options": [
      "Only with cost — not the recommended Bedrock approach here",
      "Test the agent (e.g., test cases) before deployment",
      "Only with streaming — not the recommended Bedrock approach here",
      "Only with action groups — not the recommended Bedrock approach here"
    ],
    "correct": 1,
    "explain": "Validation = run test cases against the agent; ensure it behaves as expected before release.",
    "obj": "5",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation.html",
    "id": "genai-extra-0042"
  },
  {
    "mode": "exam",
    "topic": "Security",
    "q": "To meet compliance, you should for Bedrock:",
    "options": [
      "Only use default settings — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Use encryption (KMS), VPC, IAM least privilege, and Guardrails as appropriate",
      "Only use Guardrails — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Only use public endpoints — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload"
    ],
    "correct": 1,
    "explain": "Encryption, network isolation (VPC), least privilege IAM, and content controls (Guardrails) support compliance.",
    "obj": "3",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html",
    "id": "genai-extra-0043"
  },
  {
    "mode": "exam",
    "topic": "Deployment",
    "q": "Blue/green or canary deployment for a GenAI API is useful to:",
    "options": [
      "Only reduce cost — not the recommended Bedrock approach here",
      "Roll out model or prompt changes with reduced risk",
      "Only increase latency — not the recommended Bedrock approach here",
      "Only for batch — not the recommended Bedrock approach here"
    ],
    "correct": 1,
    "explain": "Blue/green or canary = release new version to a subset; validate before full rollout.",
    "obj": "5",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation.html",
    "id": "genai-extra-0044"
  },
  {
    "mode": "exam",
    "topic": "Cost",
    "q": "Choosing a smaller or more efficient model in Bedrock can:",
    "options": [
      "Only increase latency — not the recommended Bedrock approach here",
      "Reduce cost and often latency for suitable tasks",
      "Only reduce accuracy — not the recommended Bedrock approach here",
      "Only increase tokens — not the recommended Bedrock approach here"
    ],
    "correct": 1,
    "explain": "Smaller models (e.g., Titan Text Express vs. Claude) can be cheaper and faster for simpler tasks.",
    "obj": "4",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/provisioned-throughput.html",
    "id": "genai-extra-0045"
  },
  {
    "mode": "exam",
    "topic": "Bedrock",
    "q": "Converse API in Bedrock provides:",
    "options": [
      "Only single-turn invoke — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Unified chat interface (messages, tool use, streaming) for supported models",
      "Only embeddings — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Only batch — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload"
    ],
    "correct": 1,
    "explain": "Converse API = multi-turn chat; send message history, optional tool config; simpler than raw InvokeModel for chat.",
    "obj": "1",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/aws-certification/latest/examguides/gen-ai-developer-professional-01.html",
    "id": "genai-extra-0046"
  },
  {
    "mode": "exam",
    "topic": "RAG",
    "q": "Re-ranking retrieved chunks before adding to the prompt can:",
    "options": [
      "Only increase cost — not the recommended Bedrock approach here",
      "Improve relevance by scoring and selecting the best chunks",
      "Only decrease latency — not the recommended Bedrock approach here",
      "Only reduce tokens — not the recommended Bedrock approach here"
    ],
    "correct": 1,
    "explain": "Re-ranking = score retrieved chunks (e.g., with a cross-encoder) and keep top-k; better context for the FM.",
    "obj": "2",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html",
    "id": "genai-extra-0047"
  },
  {
    "mode": "exam",
    "topic": "Agents",
    "q": "Orchestration in a Bedrock Agent refers to:",
    "options": [
      "Only streaming — not the recommended Bedrock approach here",
      "Coordinating model calls, retrieval, and tool use in a loop",
      "Only one action — not the recommended Bedrock approach here",
      "Only logging — not the recommended Bedrock approach here"
    ],
    "correct": 1,
    "explain": "Orchestration = agent loop: reason, retrieve (if KB), call tools, reason again until final response.",
    "obj": "2",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html",
    "id": "genai-extra-0048"
  },
  {
    "mode": "exam",
    "topic": "Guardrails",
    "q": "Sensitive content filters in Guardrails typically cover:",
    "options": [
      "Only topics — not the recommended Bedrock approach here",
      "Hate, violence, sexual content, insults, etc. (configurable)",
      "Only PII — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Only words — not the recommended Bedrock approach here"
    ],
    "correct": 1,
    "explain": "Content filters = hate, violence, sexual, insults, etc.; set threshold (none, low, medium, high) or block.",
    "obj": "3",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html",
    "id": "genai-extra-0049"
  },
  {
    "mode": "exam",
    "topic": "Monitoring",
    "q": "Evaluating a GenAI application in production should include:",
    "options": [
      "Only latency — not the recommended Bedrock approach here",
      "Relevance, safety, and user feedback (and latency/cost)",
      "Only cost — not the recommended Bedrock approach here",
      "Only token count — not the recommended Bedrock approach here"
    ],
    "correct": 1,
    "explain": "Evaluate quality (relevance, correctness), safety (guardrails), and operational metrics (latency, cost).",
    "obj": "5",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation.html",
    "id": "genai-extra-0050"
  },
  {
    "mode": "exam",
    "topic": "Bedrock",
    "q": "Batch inference in Bedrock is suited for:",
    "options": [
      "Only real-time chat — not the recommended Bedrock approach here",
      "Large volumes of non-urgent requests (e.g., overnight processing)",
      "Only streaming — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Only single request — not the recommended Bedrock approach here"
    ],
    "correct": 1,
    "explain": "Batch = process many inputs asynchronously; lower priority, cost-effective for bulk workloads.",
    "obj": "4",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/provisioned-throughput.html",
    "id": "genai-extra-0051"
  },
  {
    "mode": "exam",
    "topic": "RAG",
    "q": "Source attribution in RAG responses helps with:",
    "options": [
      "Only cost — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Showing which documents supported the answer (trust, compliance)",
      "Only latency — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Only embedding — not the recommended Bedrock approach here"
    ],
    "correct": 1,
    "explain": "Source attribution = cite retrieved chunks; improves trust and allows users to verify.",
    "obj": "1",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/aws-certification/latest/examguides/gen-ai-developer-professional-01.html",
    "id": "genai-extra-0052"
  },
  {
    "mode": "exam",
    "topic": "Security",
    "q": "Data sent to Bedrock for inference:",
    "options": [
      "Is always stored by AWS for training — not the recommended Bedrock approach here",
      "Is not used to train AWS models (by default; check data governance)",
      "Is only in CloudWatch — not the recommended Bedrock approach here",
      "Is only in Guardrails — not the recommended Bedrock approach here"
    ],
    "correct": 1,
    "explain": "AWS does not use your inference data to train foundation models; review data governance and compliance docs.",
    "obj": "3",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html",
    "id": "genai-extra-0053"
  },
  {
    "mode": "exam",
    "topic": "Deployment",
    "q": "Containerizing a GenAI app that calls Bedrock allows:",
    "options": [
      "Only Lambda — not the recommended Bedrock approach here",
      "Consistent runtime and deployment (e.g., ECS, EKS, SageMaker)",
      "Only EC2 — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Only serverless — not the recommended Bedrock approach here"
    ],
    "correct": 1,
    "explain": "Containers = portable; run on ECS, EKS, SageMaker, or Lambda (container support) for consistent deployment.",
    "obj": "2",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html",
    "id": "genai-extra-0054"
  },
  {
    "mode": "exam",
    "topic": "Cost",
    "q": "Prompt caching (e.g., for repeated system prompts) in Bedrock can reduce:",
    "options": [
      "Only latency — not the recommended Bedrock approach here",
      "Input token cost and latency for repeated prefix",
      "Only output tokens — not the recommended Bedrock approach here",
      "Only storage — not the recommended Bedrock approach here"
    ],
    "correct": 1,
    "explain": "Caching repeated prompt prefix = fewer input tokens billed and faster inference for the cached part.",
    "obj": "4",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/provisioned-throughput.html",
    "id": "genai-extra-0055"
  },
  {
    "mode": "exam",
    "topic": "Bedrock",
    "q": "Which Bedrock API is used for embedding text into vectors?",
    "options": [
      "InvokeModel with a text FM — not the recommended Bedrock approach here",
      "InvokeModel with an embedding model (e.g., Titan Embeddings)",
      "Only Converse API — not the recommended Bedrock approach here",
      "Only batch API — not the recommended Bedrock approach here"
    ],
    "correct": 1,
    "explain": "Embedding models are invoked via InvokeModel; they take text input and return a vector array.",
    "obj": "1",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/aws-certification/latest/examguides/gen-ai-developer-professional-01.html",
    "id": "genai-extra-0056"
  },
  {
    "mode": "exam",
    "topic": "Bedrock",
    "q": "Region availability for Bedrock models means:",
    "options": [
      "All models are in all regions — not the recommended Bedrock approach here",
      "You must enable and use models in each region where they are offered",
      "Only us-east-1 has models — not the recommended Bedrock approach here",
      "Region does not matter — not the recommended Bedrock approach here"
    ],
    "correct": 1,
    "explain": "Model availability varies by region; enable and invoke in the region where the model is available.",
    "obj": "1",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/aws-certification/latest/examguides/gen-ai-developer-professional-01.html",
    "id": "genai-extra-0057"
  },
  {
    "mode": "exam",
    "topic": "Bedrock",
    "q": "What is the main benefit of using the Converse API instead of raw InvokeModel for chat?",
    "options": [
      "Lower cost — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Simpler message format and built-in support for multi-turn, tools, and streaming",
      "Faster only — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Only for batch — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload"
    ],
    "correct": 1,
    "explain": "Converse API uses a unified message format and handles history, tools, and streaming more easily.",
    "obj": "1",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/aws-certification/latest/examguides/gen-ai-developer-professional-01.html",
    "id": "genai-extra-0058"
  },
  {
    "mode": "exam",
    "topic": "Bedrock",
    "q": "Bedrock On-Demand Inference differs from Provisioned Throughput in that:",
    "options": [
      "On-Demand requires a contract — not the recommended Bedrock approach here",
      "On-Demand has no capacity to reserve; you pay per token",
      "On-Demand is only for batch — not the recommended Bedrock approach here",
      "There is no difference — not the recommended Bedrock approach here"
    ],
    "correct": 1,
    "explain": "On-Demand = pay per use, no commitment; Provisioned = reserve capacity for predictable throughput.",
    "obj": "4",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/provisioned-throughput.html",
    "id": "genai-extra-0059"
  },
  {
    "mode": "exam",
    "topic": "Bedrock",
    "q": "When invoking a model with streaming, the client should:",
    "options": [
      "Wait for the full response — not the recommended Bedrock approach here",
      "Process response chunks as they arrive for lower perceived latency",
      "Only use for batch — not the recommended Bedrock approach here",
      "Disable Guardrails — not the recommended Bedrock approach here"
    ],
    "correct": 1,
    "explain": "Streaming = process chunks as they arrive; improves perceived latency and UX for long answers.",
    "obj": "5",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation.html",
    "id": "genai-extra-0060"
  },
  {
    "mode": "exam",
    "topic": "Bedrock",
    "q": "A model alias in Bedrock allows you to:",
    "options": [
      "Only change region — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Point to a specific model version and swap without changing client code",
      "Only for custom models — not the recommended Bedrock approach here",
      "Only for embeddings — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload"
    ],
    "correct": 1,
    "explain": "Aliases let you pin to a version and update the backing model without changing application code.",
    "obj": "2",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html",
    "id": "genai-extra-0061"
  },
  {
    "mode": "exam",
    "topic": "Bedrock",
    "q": "Which parameter typically controls randomness in Bedrock text generation?",
    "options": [
      "Only model ID — not the recommended Bedrock approach here",
      "Temperature (and optionally top_p, top_k) in inference config",
      "Only region — not the recommended Bedrock approach here",
      "Only timeout — not the recommended Bedrock approach here"
    ],
    "correct": 1,
    "explain": "Temperature (and top_p/top_k) control sampling; higher = more random, lower = more deterministic.",
    "obj": "1",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/aws-certification/latest/examguides/gen-ai-developer-professional-01.html",
    "id": "genai-extra-0062"
  }
];
