window.QUESTION_BANK_AWS_GENAI = [
  {
    "mode": "comparison",
    "topic": "Bedrock",
    "q": "Case genai-main-0001: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. Amazon Bedrock provides access to foundation models (FMs) through which model delivery option? Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only bring-your-own model for accounts that already enabled model access in the console",
      "API access to FMs from Amazon and third parties (no infrastructure to manage)",
      "Only Amazon Titan if the knowledge base completed an incremental sync recently",
      "Only open-source models for batch jobs that do not require streaming responses"
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
    "q": "Case genai-main-0002: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. To use a foundation model in Bedrock for the first time, you must: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Deploy the model to EC2 for accounts that already enabled model access in the console",
      "Enable model access in the Bedrock console (Model Access in the left menu)",
      "Use only default models if the knowledge base completed an incremental sync recently",
      "Request a custom fine-tune for batch jobs that do not require streaming responses"
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
    "q": "Case genai-main-0003: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. Bedrock Inference supports which invocation patterns? Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Synchronous only for accounts that already enabled model access in the console",
      "Synchronous (InvokeModel) and asynchronous (InvokeModelWithResponseStream)",
      "Batch only if the knowledge base completed an incremental sync recently for batch jobs that do not require streaming responses",
      "Only streaming for batch jobs that do not require streaming responses when IAM roles already include broad Amazon S3 permissions"
    ],
    "correct": 1,
    "explain": "InvokeModel = sync; InvokeModelWithResponseStream = stream tokens; async for long-running inference.",
    "obj": "5",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/provisioned-throughput.html",
    "id": "genai-main-0003"
  },
  {
    "mode": "comparison",
    "topic": "Bedrock",
    "q": "Case genai-main-0004: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. Amazon Bedrock Serverless Inference is best for: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only high-throughput batch for accounts that already enabled model access in the console",
      "Variable or unpredictable traffic; pay per request",
      "Only reserved capacity if the knowledge base completed an incremental sync recently",
      "Only real-time always-on for batch jobs that do not require streaming responses"
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
    "q": "Case genai-main-0005: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. Provisioned Throughput in Bedrock is used when you need: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only serverless for accounts that already enabled model access in the console",
      "Predictable capacity and guaranteed throughput (dedicated model units)",
      "Only on-demand if the knowledge base completed an incremental sync recently",
      "Only batch for batch jobs that do not require streaming responses when IAM roles already include broad Amazon S3 permissions"
    ],
    "correct": 1,
    "explain": "Provisioned Throughput = reserve model units for predictable performance; commit to capacity.",
    "obj": "5",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/provisioned-throughput.html",
    "id": "genai-main-0005"
  },
  {
    "mode": "comparison",
    "topic": "RAG",
    "q": "Case genai-main-0006: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A RAG (Retrieval-Augmented Generation) solution on AWS typically uses Bedrock with: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only the base model for accounts that already enabled model access in the console",
      "Bedrock Knowledge Bases (retrieve from your data, then generate)",
      "Only Lambda if the knowledge base completed an incremental sync recently",
      "Only S3 without retrieval for batch jobs that do not require streaming responses"
    ],
    "correct": 1,
    "explain": "Knowledge Bases = ingest your data (S3, etc.), create embeddings, retrieve relevant chunks for context in prompts.",
    "obj": "3",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html",
    "id": "genai-main-0006"
  },
  {
    "mode": "exam",
    "topic": "RAG",
    "q": "Case genai-main-0007: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. Bedrock Knowledge Bases can use which vector store? Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only OpenSearch for accounts that already enabled model access in the console",
      "Amazon OpenSearch Serverless, Pinecone, or Redis Enterprise Cloud",
      "Only DynamoDB if the knowledge base completed an incremental sync recently",
      "Only RDS for batch jobs that do not require streaming responses when IAM roles already include broad Amazon S3 permissions"
    ],
    "correct": 1,
    "explain": "Knowledge Bases support OpenSearch Serverless, Pinecone, Redis Enterprise as vector stores.",
    "obj": "1",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/aws-certification/latest/examguides/gen-ai-developer-professional-01.html",
    "id": "genai-main-0007"
  },
  {
    "mode": "exam",
    "topic": "RAG",
    "q": "Case genai-main-0008: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. When building RAG, embedding models in Bedrock are used to: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only generate text for accounts that already enabled model access in the console",
      "Convert text to vector embeddings for retrieval",
      "Only summarize if the knowledge base completed an incremental sync recently",
      "Only translate for batch jobs that do not require streaming responses"
    ],
    "correct": 1,
    "explain": "Embedding models (e.g., Titan Embeddings) convert text to vectors for similarity search in the vector store.",
    "obj": "1",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/aws-certification/latest/examguides/gen-ai-developer-professional-01.html",
    "id": "genai-main-0008"
  },
  {
    "mode": "exam",
    "topic": "RAG",
    "q": "Case genai-main-0009: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. Chunking strategy in RAG affects: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only cost for accounts that already enabled model access in the console",
      "Retrieval quality and relevance (size, overlap, semantics)",
      "Only latency if the knowledge base completed an incremental sync recently",
      "Only model choice for batch jobs that do not require streaming responses"
    ],
    "correct": 1,
    "explain": "Chunk size and overlap affect what gets retrieved; too large or too small can hurt answer quality.",
    "obj": "1",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/aws-certification/latest/examguides/gen-ai-developer-professional-01.html",
    "id": "genai-main-0009"
  },
  {
    "mode": "comparison",
    "topic": "Agents",
    "q": "Case genai-main-0010: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. Bedrock Agents are used to: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only run batch jobs for accounts that already enabled model access in the console",
      "Orchestrate multi-step tasks with tools and knowledge bases",
      "Only invoke a single model if the knowledge base completed an incremental sync recently",
      "Only store embeddings for batch jobs that do not require streaming responses"
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
    "q": "Case genai-main-0011: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. An action group in a Bedrock Agent typically: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only returns static text for accounts that already enabled model access in the console",
      "Defines APIs or Lambda functions the agent can call to perform actions",
      "Only retrieves from Knowledge Base if the knowledge base completed an incremental sync recently",
      "Only streams tokens for batch jobs that do not require streaming responses"
    ],
    "correct": 1,
    "explain": "Action groups = define tools (OpenAPI schema + Lambda or API) the agent can invoke.",
    "obj": "2",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html",
    "id": "genai-main-0011"
  },
  {
    "mode": "exam",
    "topic": "Agents",
    "q": "Case genai-main-0012: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. To keep agent behavior consistent and controllable, you should: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only use the default system prompt for accounts that already enabled model access in the console",
      "Configure instructions (system prompt) and guardrails",
      "Only use one action group if the knowledge base completed an incremental sync recently",
      "Only use streaming for batch jobs that do not require streaming responses"
    ],
    "correct": 1,
    "explain": "Instructions and guardrails shape agent behavior; use them for consistency and safety.",
    "obj": "5",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html",
    "id": "genai-main-0012"
  },
  {
    "mode": "comparison",
    "topic": "Guardrails",
    "q": "Case genai-main-0013: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. Bedrock Guardrails help with: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only cost control for accounts that already enabled model access in the console",
      "Content filtering and safety (deny harmful or off-topic content)",
      "Only scaling if the knowledge base completed an incremental sync recently",
      "Only logging for batch jobs that do not require streaming responses"
    ],
    "correct": 1,
    "explain": "Guardrails = apply content filters (hate, violence, PII, etc.) and topic policies on input/output.",
    "obj": "5",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html",
    "id": "genai-main-0013"
  },
  {
    "mode": "exam",
    "topic": "Guardrails",
    "q": "Case genai-main-0014: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. Guardrails can be applied at: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Model level only for accounts that already enabled model access in the console",
      "Input (prompt) and/or output (response) stages",
      "Only output if the knowledge base completed an incremental sync recently",
      "Only in Knowledge Base for batch jobs that do not require streaming responses"
    ],
    "correct": 1,
    "explain": "Guardrails evaluate and block/filter at input and/or output; configurable per stage.",
    "obj": "5",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation.html",
    "id": "genai-main-0014"
  },
  {
    "mode": "exam",
    "topic": "Security",
    "q": "Case genai-main-0015: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. To run Bedrock inference inside your VPC without internet, you would use: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only public Bedrock endpoints for accounts that already enabled model access in the console",
      "VPC endpoints for Bedrock (and optionally PrivateLink)",
      "Only NAT Gateway if the knowledge base completed an incremental sync recently",
      "Only VPN for batch jobs that do not require streaming responses"
    ],
    "correct": 1,
    "explain": "Use VPC endpoints (interface endpoints) for Bedrock so traffic stays on the AWS network; optional PrivateLink for private access.",
    "obj": "1",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html",
    "id": "genai-main-0015"
  },
  {
    "mode": "exam",
    "topic": "Security",
    "q": "Case genai-main-0016: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. Bedrock supports encryption of model data: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only in transit for accounts that already enabled model access in the console",
      "At rest (AWS managed or customer-managed keys in KMS) and in transit",
      "Only at rest if the knowledge base completed an incremental sync recently",
      "No encryption for batch jobs that do not require streaming responses when IAM roles already include broad Amazon S3 permissions"
    ],
    "correct": 1,
    "explain": "Encryption at rest with KMS (default or CMK); TLS in transit.",
    "obj": "5",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html",
    "id": "genai-main-0016"
  },
  {
    "mode": "exam",
    "topic": "Deployment",
    "q": "Case genai-main-0017: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. For a production GenAI app that must scale with traffic, a common pattern is: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Single EC2 instance only for accounts that already enabled model access in the console",
      "API Gateway + Lambda (or container) invoking Bedrock",
      "Only SageMaker real-time if the knowledge base completed an incremental sync recently",
      "Only batch for batch jobs that do not require streaming responses"
    ],
    "correct": 1,
    "explain": "API Gateway + Lambda/container calling Bedrock = serverless, scalable; add caching and throttling as needed.",
    "obj": "5",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation.html",
    "id": "genai-main-0017"
  },
  {
    "mode": "exam",
    "topic": "Deployment",
    "q": "Case genai-main-0018: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. Amazon SageMaker JumpStart can be used for GenAI to: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only Bedrock for accounts that already enabled model access in the console",
      "Deploy and fine-tune open-source FMs (e.g., Llama) on SageMaker",
      "Only Knowledge Bases if the knowledge base completed an incremental sync recently",
      "Only agents for batch jobs that do not require streaming responses"
    ],
    "correct": 1,
    "explain": "JumpStart = deploy pre-built models (including LLMs) and fine-tune; alternative to Bedrock for bring-your-own.",
    "obj": "2",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html",
    "id": "genai-main-0018"
  },
  {
    "mode": "exam",
    "topic": "Cost",
    "q": "Case genai-main-0019: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. To optimize cost when using Bedrock with variable traffic, you should consider: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only Provisioned Throughput for accounts that already enabled model access in the console",
      "On-Demand or Serverless for variable load; Provisioned Throughput for steady high load",
      "Only On-Demand if the knowledge base completed an incremental sync recently for batch jobs that do not require streaming responses",
      "Only custom models for batch jobs that do not require streaming responses when IAM roles already include broad Amazon S3 permissions"
    ],
    "correct": 1,
    "explain": "On-Demand/Serverless = pay per use; Provisioned = commit for predictable, high throughput; match to traffic pattern.",
    "obj": "5",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/provisioned-throughput.html",
    "id": "genai-main-0019"
  },
  {
    "mode": "exam",
    "topic": "Cost",
    "q": "Case genai-main-0020: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. Bedrock pricing is typically based on: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only API calls for accounts that already enabled model access in the console when the workload runs entirely inside a single Availability Zone",
      "Input and output tokens (and optionally model units for Provisioned Throughput)",
      "Only storage if the knowledge base completed an incremental sync recently for batch jobs that do not require streaming responses",
      "Only requests for batch jobs that do not require streaming responses when IAM roles already include broad Amazon S3 permissions"
    ],
    "correct": 1,
    "explain": "Pay per input token and output token (varies by model); Provisioned Throughput adds model unit pricing.",
    "obj": "5",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/provisioned-throughput.html",
    "id": "genai-main-0020"
  },
  {
    "mode": "exam",
    "topic": "Bedrock",
    "q": "Case genai-main-0021: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. Which Bedrock feature allows you to fine-tune a model on your own data? Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only base model invocation for accounts that already enabled model access in the console",
      "Bedrock Custom Model (fine-tune supported models with your dataset)",
      "Only Knowledge Base if the knowledge base completed an incremental sync recently",
      "Only Guardrails for batch jobs that do not require streaming responses"
    ],
    "correct": 1,
    "explain": "Custom Model = fine-tune supported FMs (e.g., Cohere, Amazon Titan) with your data in S3.",
    "obj": "1",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/aws-certification/latest/examguides/gen-ai-developer-professional-01.html",
    "id": "genai-main-0021"
  },
  {
    "mode": "exam",
    "topic": "RAG",
    "q": "Case genai-main-0022: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. In RAG, the purpose of the retrieval step is to: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Replace the model for accounts that already enabled model access in the console",
      "Fetch relevant context from your data to add to the prompt",
      "Only cache responses if the knowledge base completed an incremental sync recently",
      "Only validate output for batch jobs that do not require streaming responses"
    ],
    "correct": 1,
    "explain": "Retrieve relevant documents/chunks; concatenate with user prompt so the FM has context to answer accurately.",
    "obj": "2",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html",
    "id": "genai-main-0022"
  },
  {
    "mode": "exam",
    "topic": "Agents",
    "q": "Case genai-main-0023: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. When a Bedrock Agent uses a Knowledge Base, it: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only calls action groups for accounts that already enabled model access in the console",
      "Can retrieve from the Knowledge Base and optionally call action groups",
      "Only streams if the knowledge base completed an incremental sync recently",
      "Only uses one model for batch jobs that do not require streaming responses"
    ],
    "correct": 1,
    "explain": "Agent can use both Knowledge Base (retrieval) and action groups (tools); configured in the agent.",
    "obj": "2",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html",
    "id": "genai-main-0023"
  },
  {
    "mode": "exam",
    "topic": "Guardrails",
    "q": "Case genai-main-0024: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A guardrail topic policy is used to: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only filter PII for accounts that already enabled model access in the console",
      "Restrict conversation to approved topics or deny prohibited topics",
      "Only filter violence if the knowledge base completed an incremental sync recently",
      "Only log requests for batch jobs that do not require streaming responses"
    ],
    "correct": 1,
    "explain": "Topic policies = allow list or deny list of topics; keep the model on-topic.",
    "obj": "5",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html",
    "id": "genai-main-0024"
  },
  {
    "mode": "exam",
    "topic": "Security",
    "q": "Case genai-main-0025: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. To allow only specific IAM principals to call Bedrock, you should: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only use VPC for accounts that already enabled model access in the console when the workload runs entirely inside a single Availability Zone",
      "Use IAM policies (and optionally resource policies) on the Bedrock resources",
      "Only use Guardrails if the knowledge base completed an incremental sync recently",
      "Only use encryption for batch jobs that do not require streaming responses when IAM roles already include broad Amazon S3 permissions"
    ],
    "correct": 1,
    "explain": "IAM policies control who can invoke models; use least privilege; resource policies for cross-account if needed.",
    "obj": "1",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html",
    "id": "genai-main-0025"
  },
  {
    "mode": "exam",
    "topic": "Deployment",
    "q": "Case genai-main-0026: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. For low-latency inference at high scale, a suitable option is: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only Lambda with no concurrency for accounts that already enabled model access in the console",
      "Provisioned Throughput (dedicated capacity) or SageMaker real-time endpoint",
      "Only on-demand with no cache if the knowledge base completed an incremental sync recently",
      "Only batch for batch jobs that do not require streaming responses when IAM roles already include broad Amazon S3 permissions"
    ],
    "correct": 1,
    "explain": "Provisioned Throughput = dedicated capacity, predictable latency; SageMaker = custom models with dedicated instances.",
    "obj": "5",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation.html",
    "id": "genai-main-0026"
  },
  {
    "mode": "exam",
    "topic": "Monitoring",
    "q": "Case genai-main-0027: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. To trace and debug Bedrock invocations in production, you can use: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only CloudWatch Logs for accounts that already enabled model access in the console",
      "AWS X-Ray (and CloudWatch) for tracing and metrics",
      "Only Guardrails if the knowledge base completed an incremental sync recently",
      "Only Knowledge Base logs for batch jobs that do not require streaming responses"
    ],
    "correct": 1,
    "explain": "X-Ray = trace requests across services; CloudWatch = logs and metrics; use both for observability.",
    "obj": "5",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation.html",
    "id": "genai-main-0027"
  },
  {
    "mode": "exam",
    "topic": "Bedrock",
    "q": "Case genai-main-0028: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. InvokeModelWithResponseStream returns: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only a single block of text for accounts that already enabled model access in the console",
      "A stream of response chunks (e.g., for real-time UX)",
      "Only metadata if the knowledge base completed an incremental sync recently",
      "Only embeddings for batch jobs that do not require streaming responses"
    ],
    "correct": 1,
    "explain": "Streaming API = receive chunks as the model generates; better UX for chat and long responses.",
    "obj": "1",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/aws-certification/latest/examguides/gen-ai-developer-professional-01.html",
    "id": "genai-main-0028"
  },
  {
    "mode": "exam",
    "topic": "RAG",
    "q": "Case genai-main-0029: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. Hybrid search in a RAG context typically combines: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only two embedding models for accounts that already enabled model access in the console",
      "Keyword (e.g., BM25) and semantic (vector) search",
      "Only vector search if the knowledge base completed an incremental sync recently",
      "Only keyword search for batch jobs that do not require streaming responses"
    ],
    "correct": 1,
    "explain": "Hybrid = keyword + vector; improves retrieval when exact terms or semantics matter.",
    "obj": "1",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/aws-certification/latest/examguides/gen-ai-developer-professional-01.html",
    "id": "genai-main-0029"
  },
  {
    "mode": "exam",
    "topic": "Agents",
    "q": "Case genai-main-0030: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. Agent memory (session state) in Bedrock Agents is used to: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only store embeddings for accounts that already enabled model access in the console",
      "Persist conversation context across turns",
      "Only cache model output if the knowledge base completed an incremental sync recently",
      "Only log actions for batch jobs that do not require streaming responses"
    ],
    "correct": 1,
    "explain": "Session state = store conversation history and context so the agent has memory across turns.",
    "obj": "2",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html",
    "id": "genai-main-0030"
  },
  {
    "mode": "exam",
    "topic": "Guardrails",
    "q": "Case genai-main-0031: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. PII filter in Guardrails can: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only log PII for accounts that already enabled model access in the console",
      "Detect and redact or block PII in input/output",
      "Only block all text if the knowledge base completed an incremental sync recently",
      "Only allow PII for batch jobs that do not require streaming responses"
    ],
    "correct": 1,
    "explain": "PII filters = detect and redact or block (e.g., SSN, names) to meet compliance.",
    "obj": "5",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html",
    "id": "genai-main-0031"
  },
  {
    "mode": "exam",
    "topic": "Security",
    "q": "Case genai-main-0032: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. Cross-account access to Bedrock can be granted via: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only same-account IAM for accounts that already enabled model access in the console",
      "Resource-based policies (e.g., on Bedrock) and IAM in the other account",
      "Only VPC peering if the knowledge base completed an incremental sync recently",
      "Only Guardrails for batch jobs that do not require streaming responses when IAM roles already include broad Amazon S3 permissions"
    ],
    "correct": 1,
    "explain": "Use resource policy on the Bedrock resource to allow another account; other account needs IAM to call.",
    "obj": "1",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html",
    "id": "genai-main-0032"
  },
  {
    "mode": "exam",
    "topic": "Cost",
    "q": "Case genai-main-0033: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. Caching Bedrock model responses is useful when: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Traffic is always unique for accounts that already enabled model access in the console",
      "Similar prompts repeat (reduce cost and latency)",
      "Only for batch if the knowledge base completed an incremental sync recently",
      "Only for streaming for batch jobs that do not require streaming responses"
    ],
    "correct": 1,
    "explain": "Cache repeated or similar prompts (e.g., prompt cache in Bedrock or application-level cache) to save tokens and latency.",
    "obj": "5",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation.html",
    "id": "genai-main-0033"
  },
  {
    "mode": "exam",
    "topic": "Deployment",
    "q": "Case genai-main-0034: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. AWS Lambda is a good fit for Bedrock invocation when: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only long-running batch for accounts that already enabled model access in the console",
      "Event-driven, variable load, and invocation fits within Lambda timeout",
      "Only real-time 24/7 if the knowledge base completed an incremental sync recently",
      "Only Provisioned Throughput for batch jobs that do not require streaming responses"
    ],
    "correct": 1,
    "explain": "Lambda = event-driven, scales automatically; ensure inference fits within 15 min timeout and memory limits.",
    "obj": "2",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html",
    "id": "genai-main-0034"
  },
  {
    "mode": "exam",
    "topic": "Bedrock",
    "q": "Case genai-main-0035: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. Model ID in Bedrock (e.g., anthropic.claude-3-sonnet) identifies: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only the region for accounts that already enabled model access in the console",
      "The specific foundation model and variant to invoke",
      "Only the account if the knowledge base completed an incremental sync recently",
      "Only the endpoint for batch jobs that do not require streaming responses"
    ],
    "correct": 1,
    "explain": "Model ID = provider.model-name (e.g., amazon.titan-text-express); required for InvokeModel.",
    "obj": "1",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/aws-certification/latest/examguides/gen-ai-developer-professional-01.html",
    "id": "genai-main-0035"
  },
  {
    "mode": "exam",
    "topic": "RAG",
    "q": "Case genai-main-0036: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. Metadata filtering in a Knowledge Base query allows you to: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only filter by date for accounts that already enabled model access in the console",
      "Restrict retrieval to documents matching metadata (e.g., department, locale)",
      "Only filter by size if the knowledge base completed an incremental sync recently",
      "Only filter by model for batch jobs that do not require streaming responses when IAM roles already include broad Amazon S3 permissions"
    ],
    "correct": 1,
    "explain": "Metadata filters = narrow retrieval to chunks that match key-value filters; improves relevance.",
    "obj": "1",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/aws-certification/latest/examguides/gen-ai-developer-professional-01.html",
    "id": "genai-main-0036"
  },
  {
    "mode": "exam",
    "topic": "Agents",
    "q": "Case genai-main-0037: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. Prepared prompts (prompt templates) in Bedrock Agents help with: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only logging for accounts that already enabled model access in the console",
      "Consistent, reusable prompt structure and variables",
      "Only streaming if the knowledge base completed an incremental sync recently",
      "Only action groups for batch jobs that do not require streaming responses"
    ],
    "correct": 1,
    "explain": "Prepared prompts = templates with placeholders; standardize and reuse prompt structure.",
    "obj": "2",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html",
    "id": "genai-main-0037"
  },
  {
    "mode": "exam",
    "topic": "Guardrails",
    "q": "Case genai-main-0038: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. Word filters in Guardrails can: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only allow all words for accounts that already enabled model access in the console",
      "Block or replace specific words/phrases (e.g., profanity, competitors)",
      "Only log words if the knowledge base completed an incremental sync recently",
      "Only for PII for batch jobs that do not require streaming responses when IAM roles already include broad Amazon S3 permissions"
    ],
    "correct": 1,
    "explain": "Word filters = block list or replace list for specific terms; configurable.",
    "obj": "5",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html",
    "id": "genai-main-0038"
  },
  {
    "mode": "exam",
    "topic": "Monitoring",
    "q": "Case genai-main-0039: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. CloudWatch metrics for Bedrock can include: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only cost for accounts that already enabled model access in the console",
      "Invocation count, latency, errors (by model, account)",
      "Only tokens if the knowledge base completed an incremental sync recently",
      "Only streaming for batch jobs that do not require streaming responses"
    ],
    "correct": 1,
    "explain": "Bedrock emits metrics (Invocations, InvocationLatency, etc.); use for monitoring and alarms.",
    "obj": "5",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation.html",
    "id": "genai-main-0039"
  },
  {
    "mode": "exam",
    "topic": "Bedrock",
    "q": "Case genai-main-0040: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. Bedrock supports which type of models for text generation? Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only Amazon models for accounts that already enabled model access in the console",
      "Amazon (Titan, etc.) and third-party (Anthropic, Cohere, Meta, etc.)",
      "Only open-source if the knowledge base completed an incremental sync recently",
      "Only custom for batch jobs that do not require streaming responses when IAM roles already include broad Amazon S3 permissions"
    ],
    "correct": 1,
    "explain": "Bedrock = multi-provider; Amazon Titan, Anthropic Claude, Cohere, Meta Llama, etc.; enable per model.",
    "obj": "1",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/aws-certification/latest/examguides/gen-ai-developer-professional-01.html",
    "id": "genai-main-0040"
  },
  {
    "mode": "exam",
    "topic": "RAG",
    "q": "Case genai-main-0041: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. When ingestion runs for a Bedrock Knowledge Base, it: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only deletes data for accounts that already enabled model access in the console when the workload runs entirely inside a single Availability Zone",
      "Syncs data source (e.g., S3), chunks, generates embeddings, writes to vector store",
      "Only invokes the model if the knowledge base completed an incremental sync recently",
      "Only updates Guardrails for batch jobs that do not require streaming responses when IAM roles already include broad Amazon S3 permissions"
    ],
    "correct": 1,
    "explain": "Ingestion = read from data source, chunk, embed, store in vector store; run on schedule or on-demand.",
    "obj": "1",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/aws-certification/latest/examguides/gen-ai-developer-professional-01.html",
    "id": "genai-main-0041"
  },
  {
    "mode": "exam",
    "topic": "Agents",
    "q": "Case genai-main-0042: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. Agent validation in Bedrock helps: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only with cost for accounts that already enabled model access in the console",
      "Test the agent (e.g., test cases) before deployment",
      "Only with streaming if the knowledge base completed an incremental sync recently",
      "Only with action groups for batch jobs that do not require streaming responses"
    ],
    "correct": 1,
    "explain": "Validation = run test cases against the agent; ensure it behaves as expected before release.",
    "obj": "5",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation.html",
    "id": "genai-main-0042"
  },
  {
    "mode": "exam",
    "topic": "Security",
    "q": "Case genai-main-0043: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. To meet compliance, you should for Bedrock: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only use default settings for accounts that already enabled model access in the console",
      "Use encryption (KMS), VPC, IAM least privilege, and Guardrails as appropriate",
      "Only use Guardrails if the knowledge base completed an incremental sync recently",
      "Only use public endpoints for batch jobs that do not require streaming responses"
    ],
    "correct": 1,
    "explain": "Encryption, network isolation (VPC), least privilege IAM, and content controls (Guardrails) support compliance.",
    "obj": "5",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html",
    "id": "genai-main-0043"
  },
  {
    "mode": "exam",
    "topic": "Deployment",
    "q": "Case genai-main-0044: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. Blue/green or canary deployment for a GenAI API is useful to: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only reduce cost for accounts that already enabled model access in the console",
      "Roll out model or prompt changes with reduced risk",
      "Only increase latency if the knowledge base completed an incremental sync recently",
      "Only for batch for batch jobs that do not require streaming responses"
    ],
    "correct": 1,
    "explain": "Blue/green or canary = release new version to a subset; validate before full rollout.",
    "obj": "5",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation.html",
    "id": "genai-main-0044"
  },
  {
    "mode": "exam",
    "topic": "Cost",
    "q": "Case genai-main-0045: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. Choosing a smaller or more efficient model in Bedrock can: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only increase latency for accounts that already enabled model access in the console",
      "Reduce cost and often latency for suitable tasks",
      "Only reduce accuracy if the knowledge base completed an incremental sync recently",
      "Only increase tokens for batch jobs that do not require streaming responses"
    ],
    "correct": 1,
    "explain": "Smaller models (e.g., Titan Text Express vs. Claude) can be cheaper and faster for simpler tasks.",
    "obj": "5",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/provisioned-throughput.html",
    "id": "genai-main-0045"
  },
  {
    "mode": "exam",
    "topic": "Bedrock",
    "q": "Case genai-main-0046: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. Converse API in Bedrock provides: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only single-turn invoke for accounts that already enabled model access in the console",
      "Unified chat interface (messages, tool use, streaming) for supported models",
      "Only embeddings if the knowledge base completed an incremental sync recently",
      "Only batch for batch jobs that do not require streaming responses when IAM roles already include broad Amazon S3 permissions"
    ],
    "correct": 1,
    "explain": "Converse API = multi-turn chat; send message history, optional tool config; simpler than raw InvokeModel for chat.",
    "obj": "1",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/aws-certification/latest/examguides/gen-ai-developer-professional-01.html",
    "id": "genai-main-0046"
  },
  {
    "mode": "exam",
    "topic": "RAG",
    "q": "Case genai-main-0047: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. Re-ranking retrieved chunks before adding to the prompt can: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only increase cost for accounts that already enabled model access in the console",
      "Improve relevance by scoring and selecting the best chunks",
      "Only decrease latency if the knowledge base completed an incremental sync recently",
      "Only reduce tokens for batch jobs that do not require streaming responses"
    ],
    "correct": 1,
    "explain": "Re-ranking = score retrieved chunks (e.g., with a cross-encoder) and keep top-k; better context for the FM.",
    "obj": "2",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html",
    "id": "genai-main-0047"
  },
  {
    "mode": "exam",
    "topic": "Agents",
    "q": "Case genai-main-0048: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. Orchestration in a Bedrock Agent refers to: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only streaming for accounts that already enabled model access in the console",
      "Coordinating model calls, retrieval, and tool use in a loop",
      "Only one action if the knowledge base completed an incremental sync recently",
      "Only logging for batch jobs that do not require streaming responses"
    ],
    "correct": 1,
    "explain": "Orchestration = agent loop: reason, retrieve (if KB), call tools, reason again until final response.",
    "obj": "2",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html",
    "id": "genai-main-0048"
  },
  {
    "mode": "exam",
    "topic": "Guardrails",
    "q": "Case genai-main-0049: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. Sensitive content filters in Guardrails typically cover: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only topics for accounts that already enabled model access in the console",
      "Hate, violence, sexual content, insults, etc. (configurable)",
      "Only PII if the knowledge base completed an incremental sync recently",
      "Only words for batch jobs that do not require streaming responses"
    ],
    "correct": 1,
    "explain": "Content filters = hate, violence, sexual, insults, etc.; set threshold (none, low, medium, high) or block.",
    "obj": "5",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html",
    "id": "genai-main-0049"
  },
  {
    "mode": "exam",
    "topic": "Monitoring",
    "q": "Case genai-main-0050: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. Evaluating a GenAI application in production should include: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only latency for accounts that already enabled model access in the console",
      "Relevance, safety, and user feedback (and latency/cost)",
      "Only cost if the knowledge base completed an incremental sync recently",
      "Only token count for batch jobs that do not require streaming responses"
    ],
    "correct": 1,
    "explain": "Evaluate quality (relevance, correctness), safety (guardrails), and operational metrics (latency, cost).",
    "obj": "5",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation.html",
    "id": "genai-main-0050"
  },
  {
    "mode": "exam",
    "topic": "Bedrock",
    "q": "Case genai-main-0051: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. Batch inference in Bedrock is suited for: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only real-time chat for accounts that already enabled model access in the console",
      "Large volumes of non-urgent requests (e.g., overnight processing)",
      "Only streaming if the knowledge base completed an incremental sync recently",
      "Only single request for batch jobs that do not require streaming responses"
    ],
    "correct": 1,
    "explain": "Batch = process many inputs asynchronously; lower priority, cost-effective for bulk workloads.",
    "obj": "5",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/provisioned-throughput.html",
    "id": "genai-main-0051"
  },
  {
    "mode": "exam",
    "topic": "RAG",
    "q": "Case genai-main-0052: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. Source attribution in RAG responses helps with: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only cost for accounts that already enabled model access in the console",
      "Showing which documents supported the answer (trust, compliance)",
      "Only latency if the knowledge base completed an incremental sync recently",
      "Only embedding for batch jobs that do not require streaming responses"
    ],
    "correct": 1,
    "explain": "Source attribution = cite retrieved chunks; improves trust and allows users to verify.",
    "obj": "1",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/aws-certification/latest/examguides/gen-ai-developer-professional-01.html",
    "id": "genai-main-0052"
  },
  {
    "mode": "exam",
    "topic": "Security",
    "q": "Case genai-main-0053: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. Data sent to Bedrock for inference: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Is always stored by AWS for training for accounts that already enabled model access in the console",
      "Is not used to train AWS models (by default; check data governance)",
      "Is only in CloudWatch if the knowledge base completed an incremental sync recently",
      "Is only in Guardrails for batch jobs that do not require streaming responses"
    ],
    "correct": 1,
    "explain": "AWS does not use your inference data to train foundation models; review data governance and compliance docs.",
    "obj": "5",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html",
    "id": "genai-main-0053"
  },
  {
    "mode": "exam",
    "topic": "Deployment",
    "q": "Case genai-main-0054: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. Containerizing a GenAI app that calls Bedrock allows: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only Lambda for accounts that already enabled model access in the console",
      "Consistent runtime and deployment (e.g., ECS, EKS, SageMaker)",
      "Only EC2 if the knowledge base completed an incremental sync recently",
      "Only serverless for batch jobs that do not require streaming responses"
    ],
    "correct": 1,
    "explain": "Containers = portable; run on ECS, EKS, SageMaker, or Lambda (container support) for consistent deployment.",
    "obj": "2",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html",
    "id": "genai-main-0054"
  },
  {
    "mode": "exam",
    "topic": "Cost",
    "q": "Case genai-main-0055: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. Prompt caching (e.g., for repeated system prompts) in Bedrock can reduce: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only latency for accounts that already enabled model access in the console",
      "Input token cost and latency for repeated prefix",
      "Only output tokens if the knowledge base completed an incremental sync recently",
      "Only storage for batch jobs that do not require streaming responses"
    ],
    "correct": 1,
    "explain": "Caching repeated prompt prefix = fewer input tokens billed and faster inference for the cached part.",
    "obj": "5",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/provisioned-throughput.html",
    "id": "genai-main-0055"
  },
  {
    "mode": "comparison",
    "topic": "Bedrock",
    "q": "Case genai-main-0056: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. Which Bedrock API is used for embedding text into vectors? Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "InvokeModel with a text FM for accounts that already enabled model access in the console",
      "InvokeModel with an embedding model (e.g., Titan Embeddings)",
      "Only Converse API if the knowledge base completed an incremental sync recently",
      "Only batch API for batch jobs that do not require streaming responses"
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
    "q": "Case genai-main-0057: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. Region availability for Bedrock models means: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "All models are in all regions for accounts that already enabled model access in the console",
      "You must enable and use models in each region where they are offered",
      "Only us-east-1 has models if the knowledge base completed an incremental sync recently",
      "Region does not matter for batch jobs that do not require streaming responses"
    ],
    "correct": 1,
    "explain": "Model availability varies by region; enable and invoke in the region where the model is available.",
    "obj": "1",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/aws-certification/latest/examguides/gen-ai-developer-professional-01.html",
    "id": "genai-main-0057"
  },
  {
    "mode": "exam",
    "topic": "Bedrock",
    "q": "Case genai-main-0058: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. What is the main benefit of using the Converse API instead of raw InvokeModel for chat? Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Lower cost for accounts that already enabled model access in the console when the workload runs entirely inside a single Availability Zone",
      "Simpler message format and built-in support for multi-turn, tools, and streaming",
      "Faster only if the knowledge base completed an incremental sync recently for batch jobs that do not require streaming responses",
      "Only for batch for batch jobs that do not require streaming responses when IAM roles already include broad Amazon S3 permissions"
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
    "q": "Case genai-main-0059: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. Bedrock On-Demand Inference differs from Provisioned Throughput in that: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "On-Demand requires a contract for accounts that already enabled model access in the console",
      "On-Demand has no capacity to reserve; you pay per token",
      "On-Demand is only for batch if the knowledge base completed an incremental sync recently",
      "There is no difference for batch jobs that do not require streaming responses"
    ],
    "correct": 1,
    "explain": "On-Demand = pay per use, no commitment; Provisioned = reserve capacity for predictable throughput.",
    "obj": "5",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/provisioned-throughput.html",
    "id": "genai-main-0059"
  },
  {
    "mode": "exam",
    "topic": "Bedrock",
    "q": "Case genai-main-0060: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. When invoking a model with streaming, the client should: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Wait for the full response for accounts that already enabled model access in the console",
      "Process response chunks as they arrive for lower perceived latency",
      "Only use for batch if the knowledge base completed an incremental sync recently",
      "Disable Guardrails for batch jobs that do not require streaming responses"
    ],
    "correct": 1,
    "explain": "Streaming = process chunks as they arrive; improves perceived latency and UX for long answers.",
    "obj": "5",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation.html",
    "id": "genai-main-0060"
  },
  {
    "mode": "exam",
    "topic": "Bedrock",
    "q": "Case genai-main-0061: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A model alias in Bedrock allows you to: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only change region for accounts that already enabled model access in the console",
      "Point to a specific model version and swap without changing client code",
      "Only for custom models if the knowledge base completed an incremental sync recently",
      "Only for embeddings for batch jobs that do not require streaming responses"
    ],
    "correct": 1,
    "explain": "Aliases let you pin to a version and update the backing model without changing application code.",
    "obj": "2",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html",
    "id": "genai-main-0061"
  },
  {
    "mode": "exam",
    "topic": "Bedrock",
    "q": "Case genai-main-0062: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. Which parameter typically controls randomness in Bedrock text generation? Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only model ID for accounts that already enabled model access in the console",
      "Temperature (and optionally top_p, top_k) in inference config",
      "Only region if the knowledge base completed an incremental sync recently",
      "Only timeout for batch jobs that do not require streaming responses"
    ],
    "correct": 1,
    "explain": "Temperature (and top_p/top_k) control sampling; higher = more random, lower = more deterministic.",
    "obj": "1",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/aws-certification/latest/examguides/gen-ai-developer-professional-01.html",
    "id": "genai-main-0062"
  },
  {
    "mode": "exam",
    "topic": "Bedrock",
    "q": "Case genai-main-0063: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. Bedrock asynchronous inference is best for: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Single quick requests for accounts that already enabled model access in the console",
      "Large or long-running jobs (e.g., summarization of long docs) without blocking",
      "Only streaming if the knowledge base completed an incremental sync recently for batch jobs that do not require streaming responses",
      "Only embeddings for batch jobs that do not require streaming responses when IAM roles already include broad Amazon S3 permissions"
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
    "q": "Case genai-main-0064: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. Amazon Titan Multimodal Embeddings can embed: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only text for accounts that already enabled model access in the console",
      "Text and images (multimodal)",
      "Only images if the knowledge base completed an incremental sync recently",
      "Only audio for batch jobs that do not require streaming responses"
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
    "q": "Case genai-main-0065: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. To reduce latency for repeated prompts, you can use: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only larger models for accounts that already enabled model access in the console",
      "Prompt caching (cache common prefix) where supported",
      "Only batch if the knowledge base completed an incremental sync recently",
      "Only async for batch jobs that do not require streaming responses"
    ],
    "correct": 1,
    "explain": "Prompt caching stores a repeated prefix; subsequent requests reuse it for lower latency and cost.",
    "obj": "5",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation.html",
    "id": "genai-main-0065"
  },
  {
    "mode": "exam",
    "topic": "RAG",
    "q": "Case genai-main-0066: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A Knowledge Base data source can be: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only DynamoDB for accounts that already enabled model access in the console",
      "S3, or other supported connectors (e.g., web crawler)",
      "Only RDS if the knowledge base completed an incremental sync recently",
      "Only Lambda for batch jobs that do not require streaming responses"
    ],
    "correct": 1,
    "explain": "Knowledge Bases support S3 and other data sources; sync and chunk during ingestion.",
    "obj": "1",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/aws-certification/latest/examguides/gen-ai-developer-professional-01.html",
    "id": "genai-main-0066"
  },
  {
    "mode": "exam",
    "topic": "RAG",
    "q": "Case genai-main-0067: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. Number of documents retrieved (top-k) in RAG affects: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only cost for accounts that already enabled model access in the console when the workload runs entirely inside a single Availability Zone",
      "Relevance and context size (too few = missing context; too many = noise)",
      "Only latency if the knowledge base completed an incremental sync recently",
      "Only embedding model for batch jobs that do not require streaming responses"
    ],
    "correct": 1,
    "explain": "Top-k = how many chunks to pass to the model; tune for relevance vs. context window and noise.",
    "obj": "1",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/aws-certification/latest/examguides/gen-ai-developer-professional-01.html",
    "id": "genai-main-0067"
  },
  {
    "mode": "comparison",
    "topic": "RAG",
    "q": "Case genai-main-0068: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. Semantic chunking vs. fixed-size chunking: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only fixed-size is supported for accounts that already enabled model access in the console",
      "Semantic respects boundaries (e.g., paragraphs); fixed-size is simpler",
      "Only semantic if the knowledge base completed an incremental sync recently",
      "They are the same for batch jobs that do not require streaming responses"
    ],
    "correct": 1,
    "explain": "Semantic = split by meaning/paragraphs; fixed-size = by character/token count; both have tradeoffs.",
    "obj": "5",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/provisioned-throughput.html",
    "id": "genai-main-0068"
  },
  {
    "mode": "exam",
    "topic": "RAG",
    "q": "Case genai-main-0069: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. To improve RAG answer quality when retrieval returns irrelevant chunks, you should: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only use a larger model for accounts that already enabled model access in the console",
      "Improve chunking, embeddings, or add re-ranking/metadata filters",
      "Only increase top-k if the knowledge base completed an incremental sync recently",
      "Only use one chunk for batch jobs that do not require streaming responses"
    ],
    "correct": 1,
    "explain": "Better chunking, better embeddings, re-ranking, and metadata filters improve retrieval quality.",
    "obj": "1",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/aws-certification/latest/examguides/gen-ai-developer-professional-01.html",
    "id": "genai-main-0069"
  },
  {
    "mode": "exam",
    "topic": "RAG",
    "q": "Case genai-main-0070: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. Knowledge Base sync (ingestion) can be triggered: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only manually once for accounts that already enabled model access in the console",
      "On a schedule or on-demand (e.g., when S3 data changes)",
      "Only at deploy time if the knowledge base completed an incremental sync recently",
      "Only by Lambda for batch jobs that do not require streaming responses"
    ],
    "correct": 1,
    "explain": "Ingestion can run on schedule or on-demand; some connectors support event-driven sync.",
    "obj": "1",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/aws-certification/latest/examguides/gen-ai-developer-professional-01.html",
    "id": "genai-main-0070"
  },
  {
    "mode": "exam",
    "topic": "RAG",
    "q": "Case genai-main-0071: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. Vector similarity search returns chunks that: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Match keywords only for accounts that already enabled model access in the console",
      "Are closest in embedding space to the query embedding",
      "Are random if the knowledge base completed an incremental sync recently",
      "Are largest for batch jobs that do not require streaming responses"
    ],
    "correct": 1,
    "explain": "Similarity search = compare query embedding to stored vectors; return nearest neighbors.",
    "obj": "1",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/aws-certification/latest/examguides/gen-ai-developer-professional-01.html",
    "id": "genai-main-0071"
  },
  {
    "mode": "exam",
    "topic": "RAG",
    "q": "Case genai-main-0072: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. Using the same embedding model at ingest and query time is important because: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "It reduces cost only for accounts that already enabled model access in the console",
      "Embeddings must be in the same space for meaningful similarity",
      "Only for speed if the knowledge base completed an incremental sync recently",
      "Only for Guardrails for batch jobs that do not require streaming responses"
    ],
    "correct": 1,
    "explain": "Query and document embeddings must come from the same (or compatible) model for correct similarity.",
    "obj": "1",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/aws-certification/latest/examguides/gen-ai-developer-professional-01.html",
    "id": "genai-main-0072"
  },
  {
    "mode": "exam",
    "topic": "RAG",
    "q": "Case genai-main-0073: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. RAG hallucination can be reduced by: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only using a larger model for accounts that already enabled model access in the console",
      "Retrieving relevant context and asking the model to cite sources",
      "Only increasing temperature if the knowledge base completed an incremental sync recently",
      "Only using one document for batch jobs that do not require streaming responses"
    ],
    "correct": 1,
    "explain": "Strong retrieval + source attribution and “answer only from context” prompts reduce hallucination.",
    "obj": "2",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html",
    "id": "genai-main-0073"
  },
  {
    "mode": "comparison",
    "topic": "RAG",
    "q": "Case genai-main-0074: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. OpenSearch Serverless as a vector store for Knowledge Bases provides: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only keyword search for accounts that already enabled model access in the console",
      "Vector search and optionally hybrid (keyword + vector)",
      "Only logging if the knowledge base completed an incremental sync recently",
      "Only caching for batch jobs that do not require streaming responses"
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
    "q": "Case genai-main-0075: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A RAG pipeline typically sends to the FM: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only the user question for accounts that already enabled model access in the console",
      "User question plus retrieved context (e.g., in system or user message)",
      "Only embeddings if the knowledge base completed an incremental sync recently",
      "Only metadata for batch jobs that do not require streaming responses when IAM roles already include broad Amazon S3 permissions"
    ],
    "correct": 1,
    "explain": "Prompt = user question + retrieved text as context so the model can ground its answer.",
    "obj": "2",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html",
    "id": "genai-main-0075"
  },
  {
    "mode": "exam",
    "topic": "Agents",
    "q": "Case genai-main-0076: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. An agent's action group is linked to: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only the Knowledge Base for accounts that already enabled model access in the console",
      "An OpenAPI schema and a Lambda or API endpoint",
      "Only streaming if the knowledge base completed an incremental sync recently",
      "Only one model for batch jobs that do not require streaming responses"
    ],
    "correct": 1,
    "explain": "Action group = OpenAPI schema (parameters, paths) + Lambda or API backend for the agent to call.",
    "obj": "2",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html",
    "id": "genai-main-0076"
  },
  {
    "mode": "exam",
    "topic": "Agents",
    "q": "Case genai-main-0077: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. When the agent decides to call a tool, it: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Ignores the result for accounts that already enabled model access in the console",
      "Sends the tool result back to the model for the next reasoning step",
      "Only logs it if the knowledge base completed an incremental sync recently",
      "Only streams it for batch jobs that do not require streaming responses"
    ],
    "correct": 1,
    "explain": "Tool output is fed back into the model so it can reason and optionally call more tools or respond.",
    "obj": "2",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html",
    "id": "genai-main-0077"
  },
  {
    "mode": "comparison",
    "topic": "Agents",
    "q": "Case genai-main-0078: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. Bedrock Agent vs. single InvokeModel call: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "No difference for accounts that already enabled model access in the console",
      "Agent can do multi-step reasoning, retrieval, and tool use",
      "Only Agent streams if the knowledge base completed an incremental sync recently",
      "Only InvokeModel supports tools for batch jobs that do not require streaming responses"
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
    "q": "Case genai-main-0079: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. Agent versioning and aliases help with: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only cost for accounts that already enabled model access in the console when the workload runs entirely inside a single Availability Zone",
      "Promoting a tested agent version (e.g., DRAFT to LIVE) without code change",
      "Only logging if the knowledge base completed an incremental sync recently for batch jobs that do not require streaming responses",
      "Only streaming for batch jobs that do not require streaming responses when IAM roles already include broad Amazon S3 permissions"
    ],
    "correct": 1,
    "explain": "Version and alias let you test in DRAFT then point LIVE to the new version for safe rollout.",
    "obj": "3",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation.html",
    "id": "genai-main-0079"
  },
  {
    "mode": "exam",
    "topic": "Agents",
    "q": "Case genai-main-0080: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. If an action group Lambda throws an error, the agent typically: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Ignores it for accounts that already enabled model access in the console",
      "Receives the error and can reason or retry or inform the user",
      "Only stops if the knowledge base completed an incremental sync recently",
      "Only logs for batch jobs that do not require streaming responses"
    ],
    "correct": 1,
    "explain": "Tool errors are returned to the model; it can adapt the response or try another action.",
    "obj": "2",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html",
    "id": "genai-main-0080"
  },
  {
    "mode": "exam",
    "topic": "Agents",
    "q": "Case genai-main-0081: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. Agent instructions (system prompt) should include: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only the model name for accounts that already enabled model access in the console",
      "Role, constraints, and how to use tools and knowledge",
      "Only action group names if the knowledge base completed an incremental sync recently",
      "Only region for batch jobs that do not require streaming responses"
    ],
    "correct": 1,
    "explain": "Instructions define the agent's role, rules, and how to use tools/KB for consistent behavior.",
    "obj": "2",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html",
    "id": "genai-main-0081"
  },
  {
    "mode": "exam",
    "topic": "Agents",
    "q": "Case genai-main-0082: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. Prepared data sources for an agent refer to: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only Lambda for accounts that already enabled model access in the console",
      "Knowledge Bases (or other data sources) the agent can query",
      "Only S3 if the knowledge base completed an incremental sync recently",
      "Only APIs for batch jobs that do not require streaming responses"
    ],
    "correct": 1,
    "explain": "Prepared data sources = Knowledge Bases (or similar) attached to the agent for retrieval.",
    "obj": "2",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html",
    "id": "genai-main-0082"
  },
  {
    "mode": "exam",
    "topic": "Agents",
    "q": "Case genai-main-0083: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. To limit what an agent can do, you should: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only use one model for accounts that already enabled model access in the console",
      "Restrict action groups and use Guardrails + instructions",
      "Only use streaming if the knowledge base completed an incremental sync recently",
      "Only use one Knowledge Base for batch jobs that do not require streaming responses"
    ],
    "correct": 1,
    "explain": "Limit tools (action groups), scope instructions, and apply Guardrails to keep agent in bounds.",
    "obj": "3",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html",
    "id": "genai-main-0083"
  },
  {
    "mode": "comparison",
    "topic": "Agents",
    "q": "Case genai-main-0084: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. Agentic workflow means: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only one API call for accounts that already enabled model access in the console",
      "The agent autonomously plans and uses tools/KB over multiple steps",
      "Only batch if the knowledge base completed an incremental sync recently",
      "Only streaming for batch jobs that do not require streaming responses"
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
    "q": "Case genai-main-0085: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. Applying a guardrail at both input and output: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only at output is allowed for accounts that already enabled model access in the console",
      "Filters prompt and response (e.g., block harmful input and output)",
      "Only at input if the knowledge base completed an incremental sync recently",
      "Only for PII for batch jobs that do not require streaming responses"
    ],
    "correct": 1,
    "explain": "You can apply guardrails to input only, output only, or both for full coverage.",
    "obj": "3",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html",
    "id": "genai-main-0085"
  },
  {
    "mode": "exam",
    "topic": "Guardrails",
    "q": "Case genai-main-0086: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. Guardrail content filter thresholds (e.g., for violence) let you: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only block everything for accounts that already enabled model access in the console",
      "Set none/low/medium/high to tune sensitivity",
      "Only allow everything if the knowledge base completed an incremental sync recently",
      "Only for topics for batch jobs that do not require streaming responses"
    ],
    "correct": 1,
    "explain": "Thresholds control how sensitive the filter is; higher = more strict.",
    "obj": "3",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html",
    "id": "genai-main-0086"
  },
  {
    "mode": "comparison",
    "topic": "Guardrails",
    "q": "Case genai-main-0087: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. Denied topics in a guardrail: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only log for accounts that already enabled model access in the console",
      "Cause the guardrail to block or filter content about those topics",
      "Only at input if the knowledge base completed an incremental sync recently",
      "Only for PII for batch jobs that do not require streaming responses"
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
    "q": "Case genai-main-0088: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. To redact PII in model output before showing the user, you use: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only encryption for accounts that already enabled model access in the console",
      "Guardrails PII filter with redact action",
      "Only IAM if the knowledge base completed an incremental sync recently",
      "Only VPC for batch jobs that do not require streaming responses"
    ],
    "correct": 1,
    "explain": "Guardrails PII filter can detect and redact (e.g., mask) PII in input/output.",
    "obj": "3",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html",
    "id": "genai-main-0088"
  },
  {
    "mode": "exam",
    "topic": "Guardrails",
    "q": "Case genai-main-0089: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. Guardrails can be attached to: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only one model for accounts that already enabled model access in the console",
      "Bedrock model invocations and/or agents (configurable per use case)",
      "Only agents if the knowledge base completed an incremental sync recently",
      "Only Knowledge Base for batch jobs that do not require streaming responses"
    ],
    "correct": 1,
    "explain": "Guardrails are applied when invoking models or when using agents; attach per flow.",
    "obj": "3",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html",
    "id": "genai-main-0089"
  },
  {
    "mode": "exam",
    "topic": "Guardrails",
    "q": "Case genai-main-0090: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. Blocked word lists in Guardrails: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only log for accounts that already enabled model access in the console",
      "Block input or output containing those phrases",
      "Only for topics if the knowledge base completed an incremental sync recently",
      "Only at ingest for batch jobs that do not require streaming responses"
    ],
    "correct": 1,
    "explain": "Word filters = block (or replace) specific words/phrases in content.",
    "obj": "3",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html",
    "id": "genai-main-0090"
  },
  {
    "mode": "exam",
    "topic": "Guardrails",
    "q": "Case genai-main-0091: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. Allowed topics in a guardrail: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only log for accounts that already enabled model access in the console when the workload runs entirely inside a single Availability Zone",
      "Restrict conversation to only those topics; other content can be blocked",
      "Only for PII if the knowledge base completed an incremental sync recently",
      "Only at output for batch jobs that do not require streaming responses when IAM roles already include broad Amazon S3 permissions"
    ],
    "correct": 1,
    "explain": "Allowed topics = allowlist; content outside can be blocked to keep the model on-topic.",
    "obj": "3",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html",
    "id": "genai-main-0091"
  },
  {
    "mode": "comparison",
    "topic": "Guardrails",
    "q": "Case genai-main-0092: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. Using multiple guardrails (e.g., one for PII, one for content): Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Not supported for accounts that already enabled model access in the console",
      "Supported; you can chain or apply multiple guardrails",
      "Only one guardrail per account if the knowledge base completed an incremental sync recently",
      "Only for agents for batch jobs that do not require streaming responses"
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
    "q": "Case genai-main-0093: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. Guardrail versioning allows: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only one version for accounts that already enabled model access in the console",
      "Test changes (e.g., new version) before promoting to production",
      "Only for word filters if the knowledge base completed an incremental sync recently",
      "Only for topics for batch jobs that do not require streaming responses"
    ],
    "correct": 1,
    "explain": "Create new versions of a guardrail, test, then point invocations to the new version.",
    "obj": "3",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation.html",
    "id": "genai-main-0093"
  },
  {
    "mode": "exam",
    "topic": "Security",
    "q": "Case genai-main-0094: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. To ensure Bedrock traffic does not go over the public internet, use: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only IAM for accounts that already enabled model access in the console",
      "VPC endpoint for Bedrock (private DNS) so traffic stays in AWS",
      "Only Guardrails if the knowledge base completed an incremental sync recently",
      "Only KMS for batch jobs that do not require streaming responses"
    ],
    "correct": 1,
    "explain": "VPC endpoint + private DNS = Bedrock calls stay on the AWS network, not internet.",
    "obj": "1",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html",
    "id": "genai-main-0094"
  },
  {
    "mode": "exam",
    "topic": "Security",
    "q": "Case genai-main-0095: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. Customer-managed keys (CMK) for Bedrock encryption: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Not supported for accounts that already enabled model access in the console",
      "Allow you to control key lifecycle and access in KMS",
      "Only for S3 if the knowledge base completed an incremental sync recently",
      "Only for agents for batch jobs that do not require streaming responses"
    ],
    "correct": 1,
    "explain": "You can use a CMK in KMS for Bedrock encryption at rest; you manage key policy.",
    "obj": "3",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html",
    "id": "genai-main-0095"
  },
  {
    "mode": "exam",
    "topic": "Security",
    "q": "Case genai-main-0096: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. Least privilege for Bedrock usually means: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Grant bedrock:* to all for accounts that already enabled model access in the console",
      "IAM policies that allow only needed actions (e.g., InvokeModel for specific models)",
      "Only VPC if the knowledge base completed an incremental sync recently for batch jobs that do not require streaming responses",
      "Only Guardrails for batch jobs that do not require streaming responses when IAM roles already include broad Amazon S3 permissions"
    ],
    "correct": 1,
    "explain": "Limit IAM to specific models and actions (e.g., invoke only required model IDs).",
    "obj": "1",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html",
    "id": "genai-main-0096"
  },
  {
    "mode": "comparison",
    "topic": "Security",
    "q": "Case genai-main-0097: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. PrivateLink for Bedrock enables: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only public access for accounts that already enabled model access in the console",
      "Private connectivity from your VPC to Bedrock without internet",
      "Only cross-account if the knowledge base completed an incremental sync recently",
      "Only logging for batch jobs that do not require streaming responses"
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
    "q": "Case genai-main-0098: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. To audit who invoked which Bedrock model, use: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only Guardrails for accounts that already enabled model access in the console",
      "CloudTrail (Bedrock API calls are logged)",
      "Only X-Ray if the knowledge base completed an incremental sync recently",
      "Only CloudWatch for batch jobs that do not require streaming responses"
    ],
    "correct": 1,
    "explain": "CloudTrail logs API calls (who, what, when) for audit and compliance.",
    "obj": "3",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html",
    "id": "genai-main-0098"
  },
  {
    "mode": "exam",
    "topic": "Security",
    "q": "Case genai-main-0099: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. Data residency for Bedrock inference: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Data always leaves the region for accounts that already enabled model access in the console",
      "Data stays in the region where you invoke (by design)",
      "Only in us-east-1 if the knowledge base completed an incremental sync recently",
      "Only with CMK for batch jobs that do not require streaming responses"
    ],
    "correct": 1,
    "explain": "Invoke in the region where you need residency; data is processed in that region.",
    "obj": "1",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html",
    "id": "genai-main-0099"
  },
  {
    "mode": "exam",
    "topic": "Security",
    "q": "Case genai-main-0100: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. Service control policies (SCPs) can restrict Bedrock: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only in one account for accounts that already enabled model access in the console",
      "Across an OU (e.g., deny Bedrock in certain accounts)",
      "Only for IAM if the knowledge base completed an incremental sync recently",
      "Only for VPC for batch jobs that do not require streaming responses"
    ],
    "correct": 1,
    "explain": "SCPs in Organizations can allow/deny Bedrock (or regions) for member accounts.",
    "obj": "1",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html",
    "id": "genai-main-0100"
  },
  {
    "mode": "exam",
    "topic": "Security",
    "q": "Case genai-main-0101: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. To allow a Lambda in account A to invoke Bedrock in account B: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only IAM in A for accounts that already enabled model access in the console",
      "Resource policy on Bedrock in B allowing A + IAM in A allowing invoke",
      "Only VPC peering if the knowledge base completed an incremental sync recently",
      "Only Guardrails for batch jobs that do not require streaming responses"
    ],
    "correct": 1,
    "explain": "Cross-account: resource policy on Bedrock (B) allows A; IAM in A allows Lambda to call Bedrock.",
    "obj": "1",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html",
    "id": "genai-main-0101"
  },
  {
    "mode": "comparison",
    "topic": "Security",
    "q": "Case genai-main-0102: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. Bedrock and PCI-DSS: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Bedrock is never used for PCI for accounts that already enabled model access in the console",
      "Use encryption, VPC, IAM, Guardrails; validate with AWS compliance docs",
      "Only encryption if the knowledge base completed an incremental sync recently",
      "Only Guardrails for batch jobs that do not require streaming responses when IAM roles already include broad Amazon S3 permissions"
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
    "q": "Case genai-main-0103: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. API Gateway in front of Lambda that calls Bedrock helps with: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only cost for accounts that already enabled model access in the console",
      "Throttling, auth, and a stable API for clients",
      "Only streaming if the knowledge base completed an incremental sync recently",
      "Only batch for batch jobs that do not require streaming responses"
    ],
    "correct": 1,
    "explain": "API Gateway = rate limiting, API keys/auth, and a single endpoint for your GenAI API.",
    "obj": "3",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html",
    "id": "genai-main-0103"
  },
  {
    "mode": "exam",
    "topic": "Deployment",
    "q": "Case genai-main-0104: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. For inference that exceeds Lambda timeout, use: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only Lambda for accounts that already enabled model access in the console",
      "Step Functions + Lambda (or ECS/Fargate) to orchestrate long runs",
      "Only API Gateway if the knowledge base completed an incremental sync recently",
      "Only on-demand for batch jobs that do not require streaming responses"
    ],
    "correct": 1,
    "explain": "Step Functions can orchestrate multi-step or long-running inference beyond Lambda limits.",
    "obj": "2",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html",
    "id": "genai-main-0104"
  },
  {
    "mode": "comparison",
    "topic": "Deployment",
    "q": "Case genai-main-0105: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. SageMaker vs. Bedrock for GenAI: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "No difference for accounts that already enabled model access in the console when the workload runs entirely inside a single Availability Zone",
      "Bedrock = managed FMs; SageMaker = bring your own model, fine-tune, full control",
      "Only SageMaker has streaming if the knowledge base completed an incremental sync recently",
      "Only Bedrock has embeddings for batch jobs that do not require streaming responses"
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
    "q": "Case genai-main-0106: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. To A/B test two models in production, you can: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only deploy one for accounts that already enabled model access in the console",
      "Route a percentage of traffic to each model (e.g., Lambda or API Gateway)",
      "Only use batch if the knowledge base completed an incremental sync recently",
      "Only use Provisioned Throughput for batch jobs that do not require streaming responses"
    ],
    "correct": 1,
    "explain": "Route by % traffic (e.g., 90% model A, 10% model B) to compare quality or latency.",
    "obj": "3",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation.html",
    "id": "genai-main-0106"
  },
  {
    "mode": "exam",
    "topic": "Deployment",
    "q": "Case genai-main-0107: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. Infrastructure as Code for a Bedrock-based app might include: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only Bedrock console for accounts that already enabled model access in the console",
      "Terraform or CloudFormation for Lambda, API Gateway, IAM, Bedrock access",
      "Only IAM if the knowledge base completed an incremental sync recently for batch jobs that do not require streaming responses",
      "Only CloudWatch for batch jobs that do not require streaming responses when IAM roles already include broad Amazon S3 permissions"
    ],
    "correct": 1,
    "explain": "Define API Gateway, Lambda, IAM roles, and Bedrock permissions in IaC for reproducibility.",
    "obj": "2",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html",
    "id": "genai-main-0107"
  },
  {
    "mode": "exam",
    "topic": "Deployment",
    "q": "Case genai-main-0108: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. Cold start for Lambda calling Bedrock is reduced by: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only increasing memory for accounts that already enabled model access in the console",
      "Provisioned concurrency or keeping Lambda warm (e.g., periodic pings)",
      "Only streaming if the knowledge base completed an incremental sync recently",
      "Only batch for batch jobs that do not require streaming responses when IAM roles already include broad Amazon S3 permissions"
    ],
    "correct": 1,
    "explain": "Provisioned concurrency or warm-up keeps runtimes ready; reduces cold start latency.",
    "obj": "3",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation.html",
    "id": "genai-main-0108"
  },
  {
    "mode": "exam",
    "topic": "Deployment",
    "q": "Case genai-main-0109: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. To run your own fine-tuned model (e.g., from SageMaker) in production, you would typically: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only use Bedrock for accounts that already enabled model access in the console",
      "Deploy on SageMaker real-time endpoint or in a container (ECS/EKS)",
      "Only Lambda if the knowledge base completed an incremental sync recently",
      "Only Knowledge Base for batch jobs that do not require streaming responses"
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
    "q": "Case genai-main-0110: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. Canary deployment for a GenAI API means: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only one version for accounts that already enabled model access in the console",
      "Route a small % of traffic to new version, then increase if healthy",
      "Only batch if the knowledge base completed an incremental sync recently",
      "Only async for batch jobs that do not require streaming responses when IAM roles already include broad Amazon S3 permissions"
    ],
    "correct": 1,
    "explain": "Canary = send a fraction of traffic to new version; monitor; then roll out fully.",
    "obj": "3",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation.html",
    "id": "genai-main-0110"
  },
  {
    "mode": "comparison",
    "topic": "Deployment",
    "q": "Case genai-main-0111: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. When to use ECS/Fargate vs. Lambda for Bedrock invocation: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Always Lambda for accounts that already enabled model access in the console when the workload runs entirely inside a single Availability Zone",
      "Lambda for event-driven, short runs; ECS for long-running or stateful workers",
      "Always ECS if the knowledge base completed an incremental sync recently for batch jobs that do not require streaming responses",
      "Only for batch for batch jobs that do not require streaming responses when IAM roles already include broad Amazon S3 permissions"
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
    "q": "Case genai-main-0112: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. Input tokens are typically cheaper than output tokens for many Bedrock models because: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "They are the same for accounts that already enabled model access in the console",
      "Generation (output) is more compute-intensive",
      "Only output is billed if the knowledge base completed an incremental sync recently",
      "Only for streaming for batch jobs that do not require streaming responses"
    ],
    "correct": 1,
    "explain": "Output token pricing is often higher than input; check the model's pricing page.",
    "obj": "4",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/provisioned-throughput.html",
    "id": "genai-main-0112"
  },
  {
    "mode": "exam",
    "topic": "Cost",
    "q": "Case genai-main-0113: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. To minimize cost for a high-volume, steady workload, consider: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only on-demand for accounts that already enabled model access in the console",
      "Provisioned Throughput if committed use is cheaper than on-demand",
      "Only serverless if the knowledge base completed an incremental sync recently",
      "Only batch for batch jobs that do not require streaming responses when IAM roles already include broad Amazon S3 permissions"
    ],
    "correct": 1,
    "explain": "At high, steady volume, Provisioned Throughput can be more cost-effective than on-demand.",
    "obj": "4",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/provisioned-throughput.html",
    "id": "genai-main-0113"
  },
  {
    "mode": "comparison",
    "topic": "Cost",
    "q": "Case genai-main-0114: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. Token counting before calling Bedrock helps with: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only latency for accounts that already enabled model access in the console",
      "Cost estimation and staying under context limits",
      "Only streaming if the knowledge base completed an incremental sync recently",
      "Only batch for batch jobs that do not require streaming responses"
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
    "q": "Case genai-main-0115: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. Using a smaller context window when possible: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only increases cost for accounts that already enabled model access in the console",
      "Reduces cost (fewer input tokens) and can reduce latency",
      "Only for batch if the knowledge base completed an incremental sync recently",
      "Only for streaming for batch jobs that do not require streaming responses"
    ],
    "correct": 1,
    "explain": "Send only needed context to reduce input tokens and cost.",
    "obj": "4",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/provisioned-throughput.html",
    "id": "genai-main-0115"
  },
  {
    "mode": "exam",
    "topic": "Cost",
    "q": "Case genai-main-0116: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. Reserved capacity or committed use for Bedrock: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Not available for accounts that already enabled model access in the console when the workload runs entirely inside a single Availability Zone",
      "Provisioned Throughput provides committed capacity (model units) with pricing terms",
      "Only for Lambda if the knowledge base completed an incremental sync recently for batch jobs that do not require streaming responses",
      "Only for SageMaker for batch jobs that do not require streaming responses when IAM roles already include broad Amazon S3 permissions"
    ],
    "correct": 1,
    "explain": "Provisioned Throughput = commit to model units; can have discount vs. on-demand at scale.",
    "obj": "4",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/provisioned-throughput.html",
    "id": "genai-main-0116"
  },
  {
    "mode": "exam",
    "topic": "Cost",
    "q": "Case genai-main-0117: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. Cost allocation for Bedrock by project is easier with: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only one IAM user for accounts that already enabled model access in the console",
      "Tags on resources and IAM roles (and Cost Allocation Tags)",
      "Only Guardrails if the knowledge base completed an incremental sync recently",
      "Only VPC for batch jobs that do not require streaming responses"
    ],
    "correct": 1,
    "explain": "Tag roles/resources and enable cost allocation tags to attribute Bedrock cost by project.",
    "obj": "4",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/provisioned-throughput.html",
    "id": "genai-main-0117"
  },
  {
    "mode": "exam",
    "topic": "Cost",
    "q": "Case genai-main-0118: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. Stopping unnecessary inference (e.g., duplicate or invalid requests) helps: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only latency for accounts that already enabled model access in the console",
      "Cost and latency (fewer tokens billed)",
      "Only accuracy if the knowledge base completed an incremental sync recently",
      "Only security for batch jobs that do not require streaming responses"
    ],
    "correct": 1,
    "explain": "Validate and deduplicate before calling Bedrock to avoid wasting tokens.",
    "obj": "3",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation.html",
    "id": "genai-main-0118"
  },
  {
    "mode": "exam",
    "topic": "Cost",
    "q": "Case genai-main-0119: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. Bedrock model pricing varies by: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only region for accounts that already enabled model access in the console",
      "Model (provider and size) and often input vs. output tokens",
      "Only account if the knowledge base completed an incremental sync recently",
      "Only invocation type for batch jobs that do not require streaming responses"
    ],
    "correct": 1,
    "explain": "Each model has its own price per token (input/output); compare models for cost.",
    "obj": "4",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/provisioned-throughput.html",
    "id": "genai-main-0119"
  },
  {
    "mode": "comparison",
    "topic": "Cost",
    "q": "Case genai-main-0120: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. For a proof-of-concept with low traffic, the most cost-effective option is usually: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Provisioned Throughput for accounts that already enabled model access in the console",
      "On-Demand or Serverless (pay per use, no commitment)",
      "Only batch if the knowledge base completed an incremental sync recently",
      "Only custom model for batch jobs that do not require streaming responses"
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
    "q": "Case genai-main-0121: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. Key metrics to monitor for a Bedrock-based API include: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only cost for accounts that already enabled model access in the console",
      "Latency, error rate, token usage, and throttling",
      "Only tokens if the knowledge base completed an incremental sync recently",
      "Only Guardrails for batch jobs that do not require streaming responses"
    ],
    "correct": 1,
    "explain": "Monitor InvocationLatency, errors, token counts, and throttles for health and cost.",
    "obj": "3",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation.html",
    "id": "genai-main-0121"
  },
  {
    "mode": "exam",
    "topic": "Monitoring",
    "q": "Case genai-main-0122: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. To detect when a model response is off-topic or low quality, you can: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only use more tokens for accounts that already enabled model access in the console",
      "Log inputs/outputs (redacted) and use evaluation or Guardrails metrics",
      "Only use one model if the knowledge base completed an incremental sync recently",
      "Only use batch for batch jobs that do not require streaming responses when IAM roles already include broad Amazon S3 permissions"
    ],
    "correct": 1,
    "explain": "Evaluate outputs (relevance, safety) and use Guardrails; log for analysis (with PII redaction).",
    "obj": "3",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation.html",
    "id": "genai-main-0122"
  },
  {
    "mode": "comparison",
    "topic": "Monitoring",
    "q": "Case genai-main-0123: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. X-Ray tracing for a GenAI request can show: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only Bedrock for accounts that already enabled model access in the console",
      "API Gateway → Lambda → Bedrock and latency per segment",
      "Only Lambda if the knowledge base completed an incremental sync recently",
      "Only errors for batch jobs that do not require streaming responses"
    ],
    "correct": 1,
    "explain": "X-Ray traces the full request path and segment latency across services.",
    "obj": "3",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation.html",
    "id": "genai-main-0123"
  },
  {
    "mode": "exam",
    "topic": "Monitoring",
    "q": "Case genai-main-0124: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. CloudWatch Logs for Bedrock invocations: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Always log full prompts by default for accounts that already enabled model access in the console",
      "Can be enabled; ensure PII/sensitive data is not logged or is redacted",
      "Only for batch if the knowledge base completed an incremental sync recently",
      "Only for agents for batch jobs that do not require streaming responses when IAM roles already include broad Amazon S3 permissions"
    ],
    "correct": 1,
    "explain": "Logging can include request/response; redact or restrict for compliance.",
    "obj": "3",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation.html",
    "id": "genai-main-0124"
  },
  {
    "mode": "exam",
    "topic": "Monitoring",
    "q": "Case genai-main-0125: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. To set an alarm when Bedrock error rate exceeds a threshold, use: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only X-Ray for accounts that already enabled model access in the console",
      "CloudWatch alarm on Bedrock metrics (e.g., InvocationClientError)",
      "Only Guardrails if the knowledge base completed an incremental sync recently",
      "Only CloudTrail for batch jobs that do not require streaming responses"
    ],
    "correct": 1,
    "explain": "Create a CloudWatch alarm on the appropriate Bedrock metric (e.g., client errors).",
    "obj": "3",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation.html",
    "id": "genai-main-0125"
  },
  {
    "mode": "exam",
    "topic": "Monitoring",
    "q": "Case genai-main-0126: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. Evaluating RAG quality might include: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only latency for accounts that already enabled model access in the console",
      "Relevance of retrieved chunks and faithfulness of the answer to context",
      "Only token count if the knowledge base completed an incremental sync recently",
      "Only cost for batch jobs that do not require streaming responses when IAM roles already include broad Amazon S3 permissions"
    ],
    "correct": 1,
    "explain": "Measure retrieval relevance and whether the answer is grounded in the retrieved context.",
    "obj": "3",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation.html",
    "id": "genai-main-0126"
  },
  {
    "mode": "exam",
    "topic": "Monitoring",
    "q": "Case genai-main-0127: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A/B test results for two models should compare: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only cost for accounts that already enabled model access in the console",
      "Quality (e.g., relevance), latency, and cost",
      "Only latency if the knowledge base completed an incremental sync recently",
      "Only tokens for batch jobs that do not require streaming responses"
    ],
    "correct": 1,
    "explain": "Compare quality metrics, latency, and cost to choose the best model or prompt.",
    "obj": "3",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation.html",
    "id": "genai-main-0127"
  },
  {
    "mode": "exam",
    "topic": "Monitoring",
    "q": "Case genai-main-0128: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. Dashboard for a production GenAI app should include: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only score for accounts that already enabled model access in the console",
      "Request count, latency (p50/p99), error rate, token usage, cost",
      "Only Guardrails if the knowledge base completed an incremental sync recently",
      "Only model ID for batch jobs that do not require streaming responses"
    ],
    "correct": 1,
    "explain": "Operational dashboard = traffic, latency, errors, tokens, and cost for capacity and health.",
    "obj": "3",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation.html",
    "id": "genai-main-0128"
  },
  {
    "mode": "comparison",
    "topic": "Monitoring",
    "q": "Case genai-main-0129: A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. A multi-account AWS organization is rolling out Amazon Bedrock for internal apps with Knowledge Bases, Agents, Guardrails, and enterprise IAM boundaries. Operators must meet security review, cost targets, and Regional residency while keeping production chat latency stable. Bedrock throttling (rate limits) means: Teams must document architecture decisions, validate changes in a lower environment, and prove retrieval quality on labeled sets before promoting prompts or Guardrails to production aliases across Regions.",
    "options": [
      "Only cost for accounts that already enabled model access in the console when the workload runs entirely inside a single Availability Zone",
      "Requests may be limited per second; use exponential backoff or Provisioned Throughput",
      "Only for batch if the knowledge base completed an incremental sync recently for batch jobs that do not require streaming responses",
      "Only for streaming for batch jobs that do not require streaming responses when IAM roles already include broad Amazon S3 permissions"
    ],
    "correct": 1,
    "explain": "Bedrock has TPS limits; handle throttling with backoff or reserve capacity with Provisioned Throughput.",
    "obj": "3",
    "level": 3,
    "ref": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation.html",
    "id": "genai-main-0129"
  }
];
