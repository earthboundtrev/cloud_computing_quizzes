window.CASE_STUDIES_AWS_GENAI = {
  'multi-tenant-rag': {
    title: 'Case Study — OmniDocs SaaS (Multi-Tenant RAG)',
    shortName: 'OmniDocs multi-tenant RAG case study',
    examLabel: 'OmniDocs RAG case exam',
    examDesc: 'Bedrock KB, tenant isolation, guardrails, vector store',
    sections: [
      { heading: 'Case Study', body: 'OmniDocs is a SaaS documentation assistant. Enterprise customers upload manuals and policies; the app performs semantic search with embeddings in a vector store. Requirements: strict tenant isolation, encryption at rest, secure access controls, and predictable performance as customers grow into the thousands.' },
      { heading: 'Requirements', body: '• Per-tenant knowledge bases and IAM boundaries\n• Amazon Bedrock for generation with guardrails\n• Incremental ingestion when documents change\n• Monitor cost, latency, and unsafe outputs' }
    ]
  },
  'apex-financial-rag': {
    title: 'Case Study — Apex Financial RAG',
    shortName: 'Apex Financial RAG case study',
    examLabel: 'Apex Financial RAG case exam',
    examDesc: 'Knowledge Bases, sensitive data, prompt quality, audit',
    sections: [
      { heading: 'Case Study', body: 'Apex Financial Group built a RAG app to summarize 10-K filings stored in Amazon S3. Retrieved chunks are relevant but Claude on Bedrock summaries are too generic and miss nuance. Security requires blocking PII in prompts/responses and logging all queries for audit.' },
      { heading: 'Requirements', body: '• Improve retrieval and prompting for financial nuance\n• Sensitive data protection (Amazon Macie / Comprehend PII + guardrails)\n• Resilient ingestion for complex PDFs\n• Least-privilege access to S3 and Bedrock' }
    ]
  }
};
