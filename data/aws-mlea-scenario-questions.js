window.QUESTION_BANK_AWS_MLEA_SCENARIOS = [
  { mode: 'scenario', caseStudyId: 'sagemaker-enterprise', topic: 'Model deployment',
    q: 'What is the most operationally efficient way to version and manage models centrally while ensuring scalability?',
    options: ['Copy model.tar.gz files across S3 buckets manually', 'Use SageMaker Model Registry with model groups', 'Store only in local notebooks', 'Use AWS Backup for model artifacts'],
    correct: 1,
    explain: 'Model Registry + model groups is the managed catalog for versions and approvals.'
  },
  { mode: 'scenario', caseStudyId: 'sagemaker-enterprise', topic: 'Monitoring',
    q: 'On-demand bias drift monitoring for real-time endpoints should use:',
    options: ['Disable all monitoring', 'Invoke a Lambda function that runs a SageMaker Clarify job', 'Only CloudWatch CPU metrics', 'Public S3 ACLs on training data'],
    correct: 1,
    explain: 'Clarify bias jobs (often triggered via Lambda) analyze drift beyond default model monitor stats.'
  },
  { mode: 'scenario', caseStudyId: 'sagemaker-enterprise', topic: 'Security',
    q: 'Training jobs must access S3 without exposing buckets to the internet. Which pattern applies?',
    options: ['Make buckets public-read', 'VPC interface endpoints / private connectivity and IAM roles for training jobs', 'Embed access keys in Docker images', 'Disable encryption'],
    correct: 1,
    explain: 'Private VPC access + IAM roles keeps S3 traffic off the public internet.'
  },
  { mode: 'scenario', caseStudyId: 'sagemaker-enterprise', topic: 'CI/CD',
    q: 'Frequent sequential training jobs need faster startup. What reduces startup time while keeping security?',
    options: ['Run training on laptops', 'Managed warm pools / pre-built images and cached dependencies in SageMaker', 'Delete all datasets', 'Use root account keys in code'],
    correct: 1,
    explain: 'Warm pools and optimized images cut provisioning time for repeated jobs.'
  },
  { mode: 'scenario', caseStudyId: 'sagemaker-enterprise', topic: 'Governance',
    q: 'Before promoting a model to production endpoints, what governance step is BEST?',
    options: ['Skip approval', 'Model Registry approval status + optional human approval workflow', 'Email tarball to all users', 'Deploy latest commit automatically'],
    correct: 1,
    explain: 'Registry approvals document which model version is production-eligible.'
  },
  { mode: 'scenario', caseStudyId: 'sagemaker-enterprise', topic: 'Monitoring',
    q: 'Data quality drift on the endpoint input features should be monitored with:',
    options: ['SageMaker Model Monitor (including built-in analyzers / Clarify integration)', 'Route 53 health checks only', 'S3 lifecycle only', 'IAM password rotation'],
    correct: 0,
    explain: 'Model Monitor tracks feature/statistics drift on production endpoints.'
  },

  { mode: 'scenario', caseStudyId: 'fraud-detection-pipeline', topic: 'Data',
    q: 'Which service can aggregate data from S3 and on-premises MySQL for the fraud dataset?',
    options: ['Amazon EMR only without catalog', 'AWS Lake Formation', 'Amazon SNS', 'AWS WAF'],
    correct: 1,
    explain: 'Lake Formation helps register and govern data from multiple sources into a data lake.'
  },
  { mode: 'scenario', caseStudyId: 'fraud-detection-pipeline', topic: 'Model training',
    q: 'Class imbalance is hurting model learning. Which technique is MOST appropriate in SageMaker?',
    options: ['Ignore minority class', 'Use class weights, resampling, or anomaly-detection algorithms suited to imbalance', 'Delete majority class rows', 'Train without labels'],
    correct: 1,
    explain: 'Address imbalance via algorithm choice, weights, or sampling—not blind deletion.'
  },
  { mode: 'scenario', caseStudyId: 'fraud-detection-pipeline', topic: 'Feature engineering',
    q: 'Correlated features obscure patterns. What helps before training?',
    options: ['Add more duplicate columns', 'Feature selection / dimensionality reduction and SageMaker Processing for EDA', 'Turn off logging', 'Use only one global IAM user'],
    correct: 1,
    explain: 'Processing jobs support EDA, correlation analysis, and feature pipelines.'
  },
  { mode: 'scenario', caseStudyId: 'fraud-detection-pipeline', topic: 'Security',
    q: 'Sensitive financial data in S3 should be protected with:',
    options: ['Public buckets', 'SSE-KMS, least-privilege IAM, and Lake Formation permissions', 'Hard-coded keys in notebooks', 'Disable CloudTrail'],
    correct: 1,
    explain: 'Encryption + LF/IAM enforce least privilege for regulated data.'
  },
  { mode: 'scenario', caseStudyId: 'fraud-detection-pipeline', topic: 'Deployment',
    q: 'After training, deploy the model for low-latency scoring with autoscaling:',
    options: ['SageMaker real-time endpoint with auto scaling policy', 'Static EC2 with no health checks', 'Glacier retrieval', 'Manual CSV scoring only'],
    correct: 0,
    explain: 'Real-time endpoints + autoscaling handle interactive fraud scoring.'
  },
  { mode: 'scenario', caseStudyId: 'fraud-detection-pipeline', topic: 'Explainability',
    q: 'Compliance asks why a transaction was flagged. Which capability helps?',
    options: ['SageMaker Clarify explainability on batch or endpoint predictions', 'Delete audit logs', 'Disable model version tracking', 'Use only black-box with no logs'],
    correct: 0,
    explain: 'Clarify provides feature attributions for model decisions.'
  }
];
