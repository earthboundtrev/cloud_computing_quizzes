window.QUESTION_BANK_AWS_GENAI = [
  {
    "mode": "comparison",
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
    "id": "genai-main-0001"
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
    "id": "genai-main-0002"
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
    "id": "genai-main-0003"
  },
  {
    "mode": "comparison",
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
    "id": "genai-main-0004"
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
    "id": "genai-main-0005"
  },
  {
    "mode": "comparison",
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
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html",
    "id": "genai-main-0006"
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
    "id": "genai-main-0007"
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
    "id": "genai-main-0008"
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
    "id": "genai-main-0009"
  },
  {
    "mode": "comparison",
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
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html",
    "id": "genai-main-0010"
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
    "id": "genai-main-0011"
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
    "id": "genai-main-0012"
  },
  {
    "mode": "comparison",
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
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html",
    "id": "genai-main-0013"
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
    "id": "genai-main-0014"
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
    "id": "genai-main-0015"
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
    "id": "genai-main-0016"
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
    "id": "genai-main-0017"
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
    "id": "genai-main-0018"
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
    "id": "genai-main-0019"
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
    "id": "genai-main-0020"
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
    "id": "genai-main-0021"
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
    "id": "genai-main-0022"
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
    "id": "genai-main-0023"
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
    "id": "genai-main-0024"
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
    "id": "genai-main-0025"
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
    "id": "genai-main-0026"
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
    "id": "genai-main-0027"
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
    "id": "genai-main-0028"
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
    "id": "genai-main-0029"
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
    "id": "genai-main-0030"
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
    "id": "genai-main-0031"
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
    "id": "genai-main-0032"
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
    "id": "genai-main-0033"
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
    "id": "genai-main-0034"
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
    "id": "genai-main-0035"
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
    "id": "genai-main-0036"
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
    "id": "genai-main-0037"
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
    "id": "genai-main-0038"
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
    "id": "genai-main-0039"
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
    "id": "genai-main-0040"
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
    "id": "genai-main-0041"
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
    "id": "genai-main-0042"
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
    "id": "genai-main-0043"
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
    "id": "genai-main-0044"
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
    "id": "genai-main-0045"
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
    "id": "genai-main-0046"
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
    "id": "genai-main-0047"
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
    "id": "genai-main-0048"
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
    "id": "genai-main-0049"
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
    "id": "genai-main-0050"
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
    "id": "genai-main-0051"
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
    "id": "genai-main-0052"
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
    "id": "genai-main-0053"
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
    "id": "genai-main-0054"
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
    "id": "genai-main-0055"
  },
  {
    "mode": "comparison",
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
    "level": 3,
    "ref": "https://docs.aws.amazon.com/aws-certification/latest/examguides/gen-ai-developer-professional-01.html",
    "id": "genai-main-0056"
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
    "id": "genai-main-0057"
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
    "id": "genai-main-0058"
  },
  {
    "mode": "comparison",
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
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/provisioned-throughput.html",
    "id": "genai-main-0059"
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
    "id": "genai-main-0060"
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
    "id": "genai-main-0061"
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
    "id": "genai-main-0062"
  },
  {
    "mode": "exam",
    "topic": "Bedrock",
    "q": "Bedrock asynchronous inference is best for:",
    "options": [
      "Single quick requests — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Large or long-running jobs (e.g., summarization of long docs) without blocking",
      "Only streaming — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Only embeddings — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload"
    ],
    "correct": 1,
    "explain": "Async = submit job, get result later; good for large inputs or batch-style workloads.",
    "obj": "1",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/aws-certification/latest/examguides/gen-ai-developer-professional-01.html",
    "id": "genai-main-0063"
  },
  {
    "mode": "comparison",
    "topic": "Bedrock",
    "q": "Amazon Titan Multimodal Embeddings can embed:",
    "options": [
      "Only text — not the recommended Bedrock approach here",
      "Text and images (multimodal)",
      "Only images — not the recommended Bedrock approach here",
      "Only audio — not the recommended Bedrock approach here"
    ],
    "correct": 1,
    "explain": "Titan Multimodal Embeddings = embed both text and images for multimodal RAG or search.",
    "obj": "1",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/aws-certification/latest/examguides/gen-ai-developer-professional-01.html",
    "id": "genai-main-0064"
  },
  {
    "mode": "exam",
    "topic": "Bedrock",
    "q": "To reduce latency for repeated prompts, you can use:",
    "options": [
      "Only larger models — not the recommended Bedrock approach here",
      "Prompt caching (cache common prefix) where supported",
      "Only batch — not the recommended Bedrock approach here",
      "Only async — not the recommended Bedrock approach here"
    ],
    "correct": 1,
    "explain": "Prompt caching stores a repeated prefix; subsequent requests reuse it for lower latency and cost.",
    "obj": "5",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation.html",
    "id": "genai-main-0065"
  },
  {
    "mode": "exam",
    "topic": "RAG",
    "q": "A Knowledge Base data source can be:",
    "options": [
      "Only DynamoDB — not the recommended Bedrock approach here",
      "S3, or other supported connectors (e.g., web crawler)",
      "Only RDS — not the recommended Bedrock approach here",
      "Only Lambda — not the recommended Bedrock approach here"
    ],
    "correct": 1,
    "explain": "Knowledge Bases support S3 and other data sources; sync and chunk during ingestion.",
    "obj": "1",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/aws-certification/latest/examguides/gen-ai-developer-professional-01.html",
    "id": "genai-main-0066"
  },
  {
    "mode": "exam",
    "topic": "RAG",
    "q": "Number of documents retrieved (top-k) in RAG affects:",
    "options": [
      "Only cost — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Relevance and context size (too few = missing context; too many = noise)",
      "Only latency — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Only embedding model — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload"
    ],
    "correct": 1,
    "explain": "Top-k = how many chunks to pass to the model; tune for relevance vs. context window and noise.",
    "obj": "1",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/aws-certification/latest/examguides/gen-ai-developer-professional-01.html",
    "id": "genai-main-0067"
  },
  {
    "mode": "comparison",
    "topic": "RAG",
    "q": "Semantic chunking vs. fixed-size chunking:",
    "options": [
      "Only fixed-size is supported — not the recommended Bedrock approach here",
      "Semantic respects boundaries (e.g., paragraphs); fixed-size is simpler",
      "Only semantic — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "They are the same — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload"
    ],
    "correct": 1,
    "explain": "Semantic = split by meaning/paragraphs; fixed-size = by character/token count; both have tradeoffs.",
    "obj": "4",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/provisioned-throughput.html",
    "id": "genai-main-0068"
  },
  {
    "mode": "exam",
    "topic": "RAG",
    "q": "To improve RAG answer quality when retrieval returns irrelevant chunks, you should:",
    "options": [
      "Only use a larger model — not the recommended Bedrock approach here",
      "Improve chunking, embeddings, or add re-ranking/metadata filters",
      "Only increase top-k — not the recommended Bedrock approach here",
      "Only use one chunk — not the recommended Bedrock approach here"
    ],
    "correct": 1,
    "explain": "Better chunking, better embeddings, re-ranking, and metadata filters improve retrieval quality.",
    "obj": "1",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/aws-certification/latest/examguides/gen-ai-developer-professional-01.html",
    "id": "genai-main-0069"
  },
  {
    "mode": "exam",
    "topic": "RAG",
    "q": "Knowledge Base sync (ingestion) can be triggered:",
    "options": [
      "Only manually once — not the recommended Bedrock approach here",
      "On a schedule or on-demand (e.g., when S3 data changes)",
      "Only at deploy time — not the recommended Bedrock approach here",
      "Only by Lambda — not the recommended Bedrock approach here"
    ],
    "correct": 1,
    "explain": "Ingestion can run on schedule or on-demand; some connectors support event-driven sync.",
    "obj": "1",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/aws-certification/latest/examguides/gen-ai-developer-professional-01.html",
    "id": "genai-main-0070"
  },
  {
    "mode": "exam",
    "topic": "RAG",
    "q": "Vector similarity search returns chunks that:",
    "options": [
      "Match keywords only — not the recommended Bedrock approach here",
      "Are closest in embedding space to the query embedding",
      "Are random — not the recommended Bedrock approach here",
      "Are largest — not the recommended Bedrock approach here"
    ],
    "correct": 1,
    "explain": "Similarity search = compare query embedding to stored vectors; return nearest neighbors.",
    "obj": "1",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/aws-certification/latest/examguides/gen-ai-developer-professional-01.html",
    "id": "genai-main-0071"
  },
  {
    "mode": "exam",
    "topic": "RAG",
    "q": "Using the same embedding model at ingest and query time is important because:",
    "options": [
      "It reduces cost only — not the recommended Bedrock approach here",
      "Embeddings must be in the same space for meaningful similarity",
      "Only for speed — not the recommended Bedrock approach here",
      "Only for Guardrails — not the recommended Bedrock approach here"
    ],
    "correct": 1,
    "explain": "Query and document embeddings must come from the same (or compatible) model for correct similarity.",
    "obj": "1",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/aws-certification/latest/examguides/gen-ai-developer-professional-01.html",
    "id": "genai-main-0072"
  },
  {
    "mode": "exam",
    "topic": "RAG",
    "q": "RAG hallucination can be reduced by:",
    "options": [
      "Only using a larger model — not the recommended Bedrock approach here",
      "Retrieving relevant context and asking the model to cite sources",
      "Only increasing temperature — not the recommended Bedrock approach here",
      "Only using one document — not the recommended Bedrock approach here"
    ],
    "correct": 1,
    "explain": "Strong retrieval + source attribution and “answer only from context” prompts reduce hallucination.",
    "obj": "2",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html",
    "id": "genai-main-0073"
  },
  {
    "mode": "comparison",
    "topic": "RAG",
    "q": "OpenSearch Serverless as a vector store for Knowledge Bases provides:",
    "options": [
      "Only keyword search — not the recommended Bedrock approach here",
      "Vector search and optionally hybrid (keyword + vector)",
      "Only logging — not the recommended Bedrock approach here",
      "Only caching — not the recommended Bedrock approach here"
    ],
    "correct": 1,
    "explain": "OpenSearch Serverless supports vector and hybrid search for RAG.",
    "obj": "1",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/aws-certification/latest/examguides/gen-ai-developer-professional-01.html",
    "id": "genai-main-0074"
  },
  {
    "mode": "exam",
    "topic": "RAG",
    "q": "A RAG pipeline typically sends to the FM:",
    "options": [
      "Only the user question — not the recommended Bedrock approach here",
      "User question plus retrieved context (e.g., in system or user message)",
      "Only embeddings — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Only metadata — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload"
    ],
    "correct": 1,
    "explain": "Prompt = user question + retrieved text as context so the model can ground its answer.",
    "obj": "2",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html",
    "id": "genai-main-0075"
  },
  {
    "mode": "exam",
    "topic": "Agents",
    "q": "An agent's action group is linked to:",
    "options": [
      "Only the Knowledge Base — not the recommended Bedrock approach here",
      "An OpenAPI schema and a Lambda or API endpoint",
      "Only streaming — not the recommended Bedrock approach here",
      "Only one model — not the recommended Bedrock approach here"
    ],
    "correct": 1,
    "explain": "Action group = OpenAPI schema (parameters, paths) + Lambda or API backend for the agent to call.",
    "obj": "2",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html",
    "id": "genai-main-0076"
  },
  {
    "mode": "exam",
    "topic": "Agents",
    "q": "When the agent decides to call a tool, it:",
    "options": [
      "Ignores the result — not the recommended Bedrock approach here",
      "Sends the tool result back to the model for the next reasoning step",
      "Only logs it — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Only streams it — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload"
    ],
    "correct": 1,
    "explain": "Tool output is fed back into the model so it can reason and optionally call more tools or respond.",
    "obj": "2",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html",
    "id": "genai-main-0077"
  },
  {
    "mode": "comparison",
    "topic": "Agents",
    "q": "Bedrock Agent vs. single InvokeModel call:",
    "options": [
      "No difference — not the recommended Bedrock approach here",
      "Agent can do multi-step reasoning, retrieval, and tool use",
      "Only Agent streams — not the recommended Bedrock approach here",
      "Only InvokeModel supports tools — not the recommended Bedrock approach here"
    ],
    "correct": 1,
    "explain": "Agents orchestrate multiple steps (reason, retrieve, call tools); single invoke is one call.",
    "obj": "2",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html",
    "id": "genai-main-0078"
  },
  {
    "mode": "exam",
    "topic": "Agents",
    "q": "Agent versioning and aliases help with:",
    "options": [
      "Only cost — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Promoting a tested agent version (e.g., DRAFT to LIVE) without code change",
      "Only logging — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Only streaming — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload"
    ],
    "correct": 1,
    "explain": "Version and alias let you test in DRAFT then point LIVE to the new version for safe rollout.",
    "obj": "5",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation.html",
    "id": "genai-main-0079"
  },
  {
    "mode": "exam",
    "topic": "Agents",
    "q": "If an action group Lambda throws an error, the agent typically:",
    "options": [
      "Ignores it — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Receives the error and can reason or retry or inform the user",
      "Only stops — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Only logs — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload"
    ],
    "correct": 1,
    "explain": "Tool errors are returned to the model; it can adapt the response or try another action.",
    "obj": "2",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html",
    "id": "genai-main-0080"
  },
  {
    "mode": "exam",
    "topic": "Agents",
    "q": "Agent instructions (system prompt) should include:",
    "options": [
      "Only the model name — not the recommended Bedrock approach here",
      "Role, constraints, and how to use tools and knowledge",
      "Only action group names — not the recommended Bedrock approach here",
      "Only region — not the recommended Bedrock approach here"
    ],
    "correct": 1,
    "explain": "Instructions define the agent's role, rules, and how to use tools/KB for consistent behavior.",
    "obj": "2",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html",
    "id": "genai-main-0081"
  },
  {
    "mode": "exam",
    "topic": "Agents",
    "q": "Prepared data sources for an agent refer to:",
    "options": [
      "Only Lambda — not the recommended Bedrock approach here",
      "Knowledge Bases (or other data sources) the agent can query",
      "Only S3 — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Only APIs — not the recommended Bedrock approach here"
    ],
    "correct": 1,
    "explain": "Prepared data sources = Knowledge Bases (or similar) attached to the agent for retrieval.",
    "obj": "2",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html",
    "id": "genai-main-0082"
  },
  {
    "mode": "exam",
    "topic": "Agents",
    "q": "To limit what an agent can do, you should:",
    "options": [
      "Only use one model — not the recommended Bedrock approach here",
      "Restrict action groups and use Guardrails + instructions",
      "Only use streaming — not the recommended Bedrock approach here",
      "Only use one Knowledge Base — not the recommended Bedrock approach here"
    ],
    "correct": 1,
    "explain": "Limit tools (action groups), scope instructions, and apply Guardrails to keep agent in bounds.",
    "obj": "3",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html",
    "id": "genai-main-0083"
  },
  {
    "mode": "comparison",
    "topic": "Agents",
    "q": "Agentic workflow means:",
    "options": [
      "Only one API call — not the recommended Bedrock approach here",
      "The agent autonomously plans and uses tools/KB over multiple steps",
      "Only batch — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Only streaming — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload"
    ],
    "correct": 1,
    "explain": "Agentic = agent decides when to retrieve, call tools, and respond over multiple turns.",
    "obj": "2",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html",
    "id": "genai-main-0084"
  },
  {
    "mode": "exam",
    "topic": "Guardrails",
    "q": "Applying a guardrail at both input and output:",
    "options": [
      "Only at output is allowed — not the recommended Bedrock approach here",
      "Filters prompt and response (e.g., block harmful input and output)",
      "Only at input — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Only for PII — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload"
    ],
    "correct": 1,
    "explain": "You can apply guardrails to input only, output only, or both for full coverage.",
    "obj": "3",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html",
    "id": "genai-main-0085"
  },
  {
    "mode": "exam",
    "topic": "Guardrails",
    "q": "Guardrail content filter thresholds (e.g., for violence) let you:",
    "options": [
      "Only block everything — not the recommended Bedrock approach here",
      "Set none/low/medium/high to tune sensitivity",
      "Only allow everything — not the recommended Bedrock approach here",
      "Only for topics — not the recommended Bedrock approach here"
    ],
    "correct": 1,
    "explain": "Thresholds control how sensitive the filter is; higher = more strict.",
    "obj": "3",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html",
    "id": "genai-main-0086"
  },
  {
    "mode": "comparison",
    "topic": "Guardrails",
    "q": "Denied topics in a guardrail:",
    "options": [
      "Only log — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Cause the guardrail to block or filter content about those topics",
      "Only at input — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Only for PII — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload"
    ],
    "correct": 1,
    "explain": "Denied topics = content matching those topics can be blocked or filtered.",
    "obj": "3",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html",
    "id": "genai-main-0087"
  },
  {
    "mode": "exam",
    "topic": "Guardrails",
    "q": "To redact PII in model output before showing the user, you use:",
    "options": [
      "Only encryption — not the recommended Bedrock approach here",
      "Guardrails PII filter with redact action",
      "Only IAM — not the recommended Bedrock approach here",
      "Only VPC — not the recommended Bedrock approach here"
    ],
    "correct": 1,
    "explain": "Guardrails PII filter can detect and redact (e.g., mask) PII in input/output.",
    "obj": "3",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html",
    "id": "genai-main-0088"
  },
  {
    "mode": "exam",
    "topic": "Guardrails",
    "q": "Guardrails can be attached to:",
    "options": [
      "Only one model — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Bedrock model invocations and/or agents (configurable per use case)",
      "Only agents — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Only Knowledge Base — not the recommended Bedrock approach here"
    ],
    "correct": 1,
    "explain": "Guardrails are applied when invoking models or when using agents; attach per flow.",
    "obj": "3",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html",
    "id": "genai-main-0089"
  },
  {
    "mode": "exam",
    "topic": "Guardrails",
    "q": "Blocked word lists in Guardrails:",
    "options": [
      "Only log — not the recommended Bedrock approach here",
      "Block input or output containing those phrases",
      "Only for topics — not the recommended Bedrock approach here",
      "Only at ingest — not the recommended Bedrock approach here"
    ],
    "correct": 1,
    "explain": "Word filters = block (or replace) specific words/phrases in content.",
    "obj": "3",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html",
    "id": "genai-main-0090"
  },
  {
    "mode": "exam",
    "topic": "Guardrails",
    "q": "Allowed topics in a guardrail:",
    "options": [
      "Only log — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Restrict conversation to only those topics; other content can be blocked",
      "Only for PII — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Only at output — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload"
    ],
    "correct": 1,
    "explain": "Allowed topics = allowlist; content outside can be blocked to keep the model on-topic.",
    "obj": "3",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html",
    "id": "genai-main-0091"
  },
  {
    "mode": "comparison",
    "topic": "Guardrails",
    "q": "Using multiple guardrails (e.g., one for PII, one for content):",
    "options": [
      "Not supported — not the recommended Bedrock approach here",
      "Supported; you can chain or apply multiple guardrails",
      "Only one guardrail per account — not the recommended Bedrock approach here",
      "Only for agents — not the recommended Bedrock approach here"
    ],
    "correct": 1,
    "explain": "You can use multiple guardrails for different concerns (PII, content, topics).",
    "obj": "3",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html",
    "id": "genai-main-0092"
  },
  {
    "mode": "exam",
    "topic": "Guardrails",
    "q": "Guardrail versioning allows:",
    "options": [
      "Only one version — not the recommended Bedrock approach here",
      "Test changes (e.g., new version) before promoting to production",
      "Only for word filters — not the recommended Bedrock approach here",
      "Only for topics — not the recommended Bedrock approach here"
    ],
    "correct": 1,
    "explain": "Create new versions of a guardrail, test, then point invocations to the new version.",
    "obj": "5",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation.html",
    "id": "genai-main-0093"
  },
  {
    "mode": "exam",
    "topic": "Security",
    "q": "To ensure Bedrock traffic does not go over the public internet, use:",
    "options": [
      "Only IAM — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "VPC endpoint for Bedrock (private DNS) so traffic stays in AWS",
      "Only Guardrails — not the recommended Bedrock approach here",
      "Only KMS — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload"
    ],
    "correct": 1,
    "explain": "VPC endpoint + private DNS = Bedrock calls stay on the AWS network, not internet.",
    "obj": "1",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html",
    "id": "genai-main-0094"
  },
  {
    "mode": "exam",
    "topic": "Security",
    "q": "Customer-managed keys (CMK) for Bedrock encryption:",
    "options": [
      "Not supported — not the recommended Bedrock approach here",
      "Allow you to control key lifecycle and access in KMS",
      "Only for S3 — not the recommended Bedrock approach here",
      "Only for agents — not the recommended Bedrock approach here"
    ],
    "correct": 1,
    "explain": "You can use a CMK in KMS for Bedrock encryption at rest; you manage key policy.",
    "obj": "3",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html",
    "id": "genai-main-0095"
  },
  {
    "mode": "exam",
    "topic": "Security",
    "q": "Least privilege for Bedrock usually means:",
    "options": [
      "Grant bedrock:* to all — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "IAM policies that allow only needed actions (e.g., InvokeModel for specific models)",
      "Only VPC — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Only Guardrails — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload"
    ],
    "correct": 1,
    "explain": "Limit IAM to specific models and actions (e.g., invoke only required model IDs).",
    "obj": "1",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html",
    "id": "genai-main-0096"
  },
  {
    "mode": "comparison",
    "topic": "Security",
    "q": "PrivateLink for Bedrock enables:",
    "options": [
      "Only public access — not the recommended Bedrock approach here",
      "Private connectivity from your VPC to Bedrock without internet",
      "Only cross-account — not the recommended Bedrock approach here",
      "Only logging — not the recommended Bedrock approach here"
    ],
    "correct": 1,
    "explain": "PrivateLink = private endpoint in your VPC; traffic stays within AWS network.",
    "obj": "1",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html",
    "id": "genai-main-0097"
  },
  {
    "mode": "exam",
    "topic": "Security",
    "q": "To audit who invoked which Bedrock model, use:",
    "options": [
      "Only Guardrails — not the recommended Bedrock approach here",
      "CloudTrail (Bedrock API calls are logged)",
      "Only X-Ray — not the recommended Bedrock approach here",
      "Only CloudWatch — not the recommended Bedrock approach here"
    ],
    "correct": 1,
    "explain": "CloudTrail logs API calls (who, what, when) for audit and compliance.",
    "obj": "3",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html",
    "id": "genai-main-0098"
  },
  {
    "mode": "exam",
    "topic": "Security",
    "q": "Data residency for Bedrock inference:",
    "options": [
      "Data always leaves the region — not the recommended Bedrock approach here",
      "Data stays in the region where you invoke (by design)",
      "Only in us-east-1 — not the recommended Bedrock approach here",
      "Only with CMK — not the recommended Bedrock approach here"
    ],
    "correct": 1,
    "explain": "Invoke in the region where you need residency; data is processed in that region.",
    "obj": "1",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html",
    "id": "genai-main-0099"
  },
  {
    "mode": "exam",
    "topic": "Security",
    "q": "Service control policies (SCPs) can restrict Bedrock:",
    "options": [
      "Only in one account — not the recommended Bedrock approach here",
      "Across an OU (e.g., deny Bedrock in certain accounts)",
      "Only for IAM — not the recommended Bedrock approach here",
      "Only for VPC — not the recommended Bedrock approach here"
    ],
    "correct": 1,
    "explain": "SCPs in Organizations can allow/deny Bedrock (or regions) for member accounts.",
    "obj": "1",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html",
    "id": "genai-main-0100"
  },
  {
    "mode": "exam",
    "topic": "Security",
    "q": "To allow a Lambda in account A to invoke Bedrock in account B:",
    "options": [
      "Only IAM in A — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Resource policy on Bedrock in B allowing A + IAM in A allowing invoke",
      "Only VPC peering — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Only Guardrails — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload"
    ],
    "correct": 1,
    "explain": "Cross-account: resource policy on Bedrock (B) allows A; IAM in A allows Lambda to call Bedrock.",
    "obj": "1",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html",
    "id": "genai-main-0101"
  },
  {
    "mode": "comparison",
    "topic": "Security",
    "q": "Bedrock and PCI-DSS:",
    "options": [
      "Bedrock is never used for PCI — not the recommended Bedrock approach here",
      "Use encryption, VPC, IAM, Guardrails; validate with AWS compliance docs",
      "Only encryption — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Only Guardrails — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload"
    ],
    "correct": 1,
    "explain": "Use security controls and refer to AWS compliance documentation for PCI scope.",
    "obj": "3",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html",
    "id": "genai-main-0102"
  },
  {
    "mode": "exam",
    "topic": "Deployment",
    "q": "API Gateway in front of Lambda that calls Bedrock helps with:",
    "options": [
      "Only cost — not the recommended Bedrock approach here",
      "Throttling, auth, and a stable API for clients",
      "Only streaming — not the recommended Bedrock approach here",
      "Only batch — not the recommended Bedrock approach here"
    ],
    "correct": 1,
    "explain": "API Gateway = rate limiting, API keys/auth, and a single endpoint for your GenAI API.",
    "obj": "3",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html",
    "id": "genai-main-0103"
  },
  {
    "mode": "exam",
    "topic": "Deployment",
    "q": "For inference that exceeds Lambda timeout, use:",
    "options": [
      "Only Lambda — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Step Functions + Lambda (or ECS/Fargate) to orchestrate long runs",
      "Only API Gateway — not the recommended Bedrock approach here",
      "Only on-demand — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload"
    ],
    "correct": 1,
    "explain": "Step Functions can orchestrate multi-step or long-running inference beyond Lambda limits.",
    "obj": "2",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html",
    "id": "genai-main-0104"
  },
  {
    "mode": "comparison",
    "topic": "Deployment",
    "q": "SageMaker vs. Bedrock for GenAI:",
    "options": [
      "No difference — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Bedrock = managed FMs; SageMaker = bring your own model, fine-tune, full control",
      "Only SageMaker has streaming — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Only Bedrock has embeddings — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload"
    ],
    "correct": 1,
    "explain": "Bedrock = managed multi-tenant FMs; SageMaker = your infrastructure, your model, more control.",
    "obj": "2",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html",
    "id": "genai-main-0105"
  },
  {
    "mode": "exam",
    "topic": "Deployment",
    "q": "To A/B test two models in production, you can:",
    "options": [
      "Only deploy one — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Route a percentage of traffic to each model (e.g., Lambda or API Gateway)",
      "Only use batch — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Only use Provisioned Throughput — not the recommended Bedrock approach here"
    ],
    "correct": 1,
    "explain": "Route by % traffic (e.g., 90% model A, 10% model B) to compare quality or latency.",
    "obj": "5",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation.html",
    "id": "genai-main-0106"
  },
  {
    "mode": "exam",
    "topic": "Deployment",
    "q": "Infrastructure as Code for a Bedrock-based app might include:",
    "options": [
      "Only Bedrock console — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Terraform or CloudFormation for Lambda, API Gateway, IAM, Bedrock access",
      "Only IAM — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Only CloudWatch — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload"
    ],
    "correct": 1,
    "explain": "Define API Gateway, Lambda, IAM roles, and Bedrock permissions in IaC for reproducibility.",
    "obj": "2",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html",
    "id": "genai-main-0107"
  },
  {
    "mode": "exam",
    "topic": "Deployment",
    "q": "Cold start for Lambda calling Bedrock is reduced by:",
    "options": [
      "Only increasing memory — not the recommended Bedrock approach here",
      "Provisioned concurrency or keeping Lambda warm (e.g., periodic pings)",
      "Only streaming — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Only batch — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload"
    ],
    "correct": 1,
    "explain": "Provisioned concurrency or warm-up keeps runtimes ready; reduces cold start latency.",
    "obj": "5",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation.html",
    "id": "genai-main-0108"
  },
  {
    "mode": "exam",
    "topic": "Deployment",
    "q": "To run your own fine-tuned model (e.g., from SageMaker) in production, you would typically:",
    "options": [
      "Only use Bedrock — not the recommended Bedrock approach here",
      "Deploy on SageMaker real-time endpoint or in a container (ECS/EKS)",
      "Only Lambda — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Only Knowledge Base — not the recommended Bedrock approach here"
    ],
    "correct": 1,
    "explain": "Custom/fine-tuned models run on SageMaker endpoints or in your own containers.",
    "obj": "2",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html",
    "id": "genai-main-0109"
  },
  {
    "mode": "exam",
    "topic": "Deployment",
    "q": "Canary deployment for a GenAI API means:",
    "options": [
      "Only one version — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Route a small % of traffic to new version, then increase if healthy",
      "Only batch — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Only async — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload"
    ],
    "correct": 1,
    "explain": "Canary = send a fraction of traffic to new version; monitor; then roll out fully.",
    "obj": "5",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation.html",
    "id": "genai-main-0110"
  },
  {
    "mode": "comparison",
    "topic": "Deployment",
    "q": "When to use ECS/Fargate vs. Lambda for Bedrock invocation:",
    "options": [
      "Always Lambda — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Lambda for event-driven, short runs; ECS for long-running or stateful workers",
      "Always ECS — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Only for batch — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload"
    ],
    "correct": 1,
    "explain": "Lambda = event-driven, < 15 min; ECS = long-running, more control, stateful.",
    "obj": "2",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html",
    "id": "genai-main-0111"
  },
  {
    "mode": "exam",
    "topic": "Cost",
    "q": "Input tokens are typically cheaper than output tokens for many Bedrock models because:",
    "options": [
      "They are the same — not the recommended Bedrock approach here",
      "Generation (output) is more compute-intensive",
      "Only output is billed — not the recommended Bedrock approach here",
      "Only for streaming — not the recommended Bedrock approach here"
    ],
    "correct": 1,
    "explain": "Output token pricing is often higher than input; check the model's pricing page.",
    "obj": "4",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/provisioned-throughput.html",
    "id": "genai-main-0112"
  },
  {
    "mode": "exam",
    "topic": "Cost",
    "q": "To minimize cost for a high-volume, steady workload, consider:",
    "options": [
      "Only on-demand — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Provisioned Throughput if committed use is cheaper than on-demand",
      "Only serverless — not the recommended Bedrock approach here",
      "Only batch — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload"
    ],
    "correct": 1,
    "explain": "At high, steady volume, Provisioned Throughput can be more cost-effective than on-demand.",
    "obj": "4",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/provisioned-throughput.html",
    "id": "genai-main-0113"
  },
  {
    "mode": "comparison",
    "topic": "Cost",
    "q": "Token counting before calling Bedrock helps with:",
    "options": [
      "Only latency — not the recommended Bedrock approach here",
      "Cost estimation and staying under context limits",
      "Only streaming — not the recommended Bedrock approach here",
      "Only batch — not the recommended Bedrock approach here"
    ],
    "correct": 1,
    "explain": "Count tokens to estimate cost and avoid exceeding model context window.",
    "obj": "4",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/provisioned-throughput.html",
    "id": "genai-main-0114"
  },
  {
    "mode": "exam",
    "topic": "Cost",
    "q": "Using a smaller context window when possible:",
    "options": [
      "Only increases cost — not the recommended Bedrock approach here",
      "Reduces cost (fewer input tokens) and can reduce latency",
      "Only for batch — not the recommended Bedrock approach here",
      "Only for streaming — not the recommended Bedrock approach here"
    ],
    "correct": 1,
    "explain": "Send only needed context to reduce input tokens and cost.",
    "obj": "4",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/provisioned-throughput.html",
    "id": "genai-main-0115"
  },
  {
    "mode": "exam",
    "topic": "Cost",
    "q": "Reserved capacity or committed use for Bedrock:",
    "options": [
      "Not available — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Provisioned Throughput provides committed capacity (model units) with pricing terms",
      "Only for Lambda — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Only for SageMaker — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload"
    ],
    "correct": 1,
    "explain": "Provisioned Throughput = commit to model units; can have discount vs. on-demand at scale.",
    "obj": "4",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/provisioned-throughput.html",
    "id": "genai-main-0116"
  },
  {
    "mode": "exam",
    "topic": "Cost",
    "q": "Cost allocation for Bedrock by project is easier with:",
    "options": [
      "Only one IAM user — not the recommended Bedrock approach here",
      "Tags on resources and IAM roles (and Cost Allocation Tags)",
      "Only Guardrails — not the recommended Bedrock approach here",
      "Only VPC — not the recommended Bedrock approach here"
    ],
    "correct": 1,
    "explain": "Tag roles/resources and enable cost allocation tags to attribute Bedrock cost by project.",
    "obj": "4",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/provisioned-throughput.html",
    "id": "genai-main-0117"
  },
  {
    "mode": "exam",
    "topic": "Cost",
    "q": "Stopping unnecessary inference (e.g., duplicate or invalid requests) helps:",
    "options": [
      "Only latency — not the recommended Bedrock approach here",
      "Cost and latency (fewer tokens billed)",
      "Only accuracy — not the recommended Bedrock approach here",
      "Only security — not the recommended Bedrock approach here"
    ],
    "correct": 1,
    "explain": "Validate and deduplicate before calling Bedrock to avoid wasting tokens.",
    "obj": "5",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation.html",
    "id": "genai-main-0118"
  },
  {
    "mode": "exam",
    "topic": "Cost",
    "q": "Bedrock model pricing varies by:",
    "options": [
      "Only region — not the recommended Bedrock approach here",
      "Model (provider and size) and often input vs. output tokens",
      "Only account — not the recommended Bedrock approach here",
      "Only invocation type — not the recommended Bedrock approach here"
    ],
    "correct": 1,
    "explain": "Each model has its own price per token (input/output); compare models for cost.",
    "obj": "4",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/provisioned-throughput.html",
    "id": "genai-main-0119"
  },
  {
    "mode": "comparison",
    "topic": "Cost",
    "q": "For a proof-of-concept with low traffic, the most cost-effective option is usually:",
    "options": [
      "Provisioned Throughput — not the recommended Bedrock approach here",
      "On-Demand or Serverless (pay per use, no commitment)",
      "Only batch — not the recommended Bedrock approach here",
      "Only custom model — not the recommended Bedrock approach here"
    ],
    "correct": 1,
    "explain": "POC = low volume; on-demand/serverless avoids upfront commitment.",
    "obj": "4",
    "level": 4,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/provisioned-throughput.html",
    "id": "genai-main-0120"
  },
  {
    "mode": "exam",
    "topic": "Monitoring",
    "q": "Key metrics to monitor for a Bedrock-based API include:",
    "options": [
      "Only cost — not the recommended Bedrock approach here",
      "Latency, error rate, token usage, and throttling",
      "Only tokens — not the recommended Bedrock approach here",
      "Only Guardrails — not the recommended Bedrock approach here"
    ],
    "correct": 1,
    "explain": "Monitor InvocationLatency, errors, token counts, and throttles for health and cost.",
    "obj": "5",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation.html",
    "id": "genai-main-0121"
  },
  {
    "mode": "exam",
    "topic": "Monitoring",
    "q": "To detect when a model response is off-topic or low quality, you can:",
    "options": [
      "Only use more tokens — not the recommended Bedrock approach here",
      "Log inputs/outputs (redacted) and use evaluation or Guardrails metrics",
      "Only use one model — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Only use batch — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload"
    ],
    "correct": 1,
    "explain": "Evaluate outputs (relevance, safety) and use Guardrails; log for analysis (with PII redaction).",
    "obj": "5",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation.html",
    "id": "genai-main-0122"
  },
  {
    "mode": "comparison",
    "topic": "Monitoring",
    "q": "X-Ray tracing for a GenAI request can show:",
    "options": [
      "Only Bedrock — not the recommended Bedrock approach here",
      "API Gateway → Lambda → Bedrock and latency per segment",
      "Only Lambda — not the recommended Bedrock approach here",
      "Only errors — not the recommended Bedrock approach here"
    ],
    "correct": 1,
    "explain": "X-Ray traces the full request path and segment latency across services.",
    "obj": "5",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation.html",
    "id": "genai-main-0123"
  },
  {
    "mode": "exam",
    "topic": "Monitoring",
    "q": "CloudWatch Logs for Bedrock invocations:",
    "options": [
      "Always log full prompts by default — not the recommended Bedrock approach here",
      "Can be enabled; ensure PII/sensitive data is not logged or is redacted",
      "Only for batch — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Only for agents — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload"
    ],
    "correct": 1,
    "explain": "Logging can include request/response; redact or restrict for compliance.",
    "obj": "5",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation.html",
    "id": "genai-main-0124"
  },
  {
    "mode": "exam",
    "topic": "Monitoring",
    "q": "To set an alarm when Bedrock error rate exceeds a threshold, use:",
    "options": [
      "Only X-Ray — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "CloudWatch alarm on Bedrock metrics (e.g., InvocationClientError)",
      "Only Guardrails — not the recommended Bedrock approach here",
      "Only CloudTrail — not the recommended Bedrock approach here"
    ],
    "correct": 1,
    "explain": "Create a CloudWatch alarm on the appropriate Bedrock metric (e.g., client errors).",
    "obj": "5",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation.html",
    "id": "genai-main-0125"
  },
  {
    "mode": "exam",
    "topic": "Monitoring",
    "q": "Evaluating RAG quality might include:",
    "options": [
      "Only latency — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Relevance of retrieved chunks and faithfulness of the answer to context",
      "Only token count — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Only cost — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload"
    ],
    "correct": 1,
    "explain": "Measure retrieval relevance and whether the answer is grounded in the retrieved context.",
    "obj": "5",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation.html",
    "id": "genai-main-0126"
  },
  {
    "mode": "exam",
    "topic": "Monitoring",
    "q": "A/B test results for two models should compare:",
    "options": [
      "Only cost — not the recommended Bedrock approach here",
      "Quality (e.g., relevance), latency, and cost",
      "Only latency — not the recommended Bedrock approach here",
      "Only tokens — not the recommended Bedrock approach here"
    ],
    "correct": 1,
    "explain": "Compare quality metrics, latency, and cost to choose the best model or prompt.",
    "obj": "5",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation.html",
    "id": "genai-main-0127"
  },
  {
    "mode": "exam",
    "topic": "Monitoring",
    "q": "Dashboard for a production GenAI app should include:",
    "options": [
      "Only score — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Request count, latency (p50/p99), error rate, token usage, cost",
      "Only Guardrails — not the recommended Bedrock approach here",
      "Only model ID — not the recommended Bedrock approach here"
    ],
    "correct": 1,
    "explain": "Operational dashboard = traffic, latency, errors, tokens, and cost for capacity and health.",
    "obj": "5",
    "level": 2,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation.html",
    "id": "genai-main-0128"
  },
  {
    "mode": "comparison",
    "topic": "Monitoring",
    "q": "Bedrock throttling (rate limits) means:",
    "options": [
      "Only cost — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Requests may be limited per second; use exponential backoff or Provisioned Throughput",
      "Only for batch — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload",
      "Only for streaming — not the recommended Bedrock approach here — increases risk or cost for this GenAI workload"
    ],
    "correct": 1,
    "explain": "Bedrock has TPS limits; handle throttling with backoff or reserve capacity with Provisioned Throughput.",
    "obj": "5",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation.html",
    "id": "genai-main-0129"
  }
];
