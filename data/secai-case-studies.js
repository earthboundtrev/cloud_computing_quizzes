window.CASE_STUDIES_SECAI = {
  'customer-chatbot': {
    title: 'Case Study — HelpNow Customer Chatbot',
    shortName: 'HelpNow chatbot case study',
    examLabel: 'HelpNow chatbot case exam',
    examDesc: 'Prompt injection, LLM Top 10, monitoring (PBQ-style scenario)',
    panelNote: 'Scenario reference — mirrors SecAI+ performance-based situational questions (MCQ practice).',
    questionLead: 'Refer to the HelpNow chatbot case study in the reference panel.\n\n',
    sections: [
      { heading: 'Case Study', body: 'HelpNow deployed a customer-facing chatbot using a hosted large language model with RAG over product docs. Security monitoring flagged prompt injection attempts to extract system instructions and training snippets. The bot has access to ticket history and limited internal APIs.' },
      { heading: 'Environment', body: '• No centralized prompt template governance\n• Logs store full prompts/responses without redaction\n• Rate limits exist at the API gateway but not per user session\n• Red-team found jailbreak strings bypassing keyword filters' }
    ]
  },
  'rag-poisoning': {
    title: 'Case Study — InsightRAG Pipeline',
    shortName: 'InsightRAG case study',
    examLabel: 'InsightRAG pipeline case exam',
    examDesc: 'Data poisoning, supply chain, AI GRC controls',
    questionLead: 'Refer to the InsightRAG case study in the reference panel.\n\n',
    sections: [
      { heading: 'Case Study', body: 'InsightRAG ingests third-party PDFs and wiki exports into a vector database for an internal analyst assistant. A vendor-supplied document bundle was found to contain hidden instructions encouraging the model to exfiltrate session context. Embeddings were refreshed hourly without integrity checks.' },
      { heading: 'Requirements', body: '• Detect and block poisoned content before indexing\n• Maintain provenance of training/retrieval corpora\n• Align with AI governance policy and OWASP LLM Top 10 mitigations\n• Preserve availability for approved analysts' }
    ]
  }
};
