window.QUESTION_BANK_AWS_DEA_SCENARIOS = [
  { mode: 'scenario', caseStudyId: 'retail-data-lake', topic: 'Ingestion',
    q: 'Scheduled ingestion from S3 and on-prem JDBC into the raw zone should use:',
    options: ['Manual USB drives only', 'AWS Glue crawlers and Glue ETL / Spark jobs', 'EC2 without IAM', 'CloudFront'],
    correct: 1,
    explain: 'Glue crawlers catalog data; Glue jobs transform and load zones.'
  },
  { mode: 'scenario', caseStudyId: 'retail-data-lake', topic: 'Storage',
    q: 'Refined sales data for Athena should be stored as:',
    options: ['Uncompressed text logs', 'Partitioned Parquet in S3 by date/region', 'Single 2 TB JSON file', 'EBS on one instance'],
    correct: 1,
    explain: 'Partitioned columnar formats optimize Athena cost and performance.'
  },
  { mode: 'scenario', caseStudyId: 'retail-data-lake', topic: 'Governance',
    q: 'Finance should see revenue columns but not raw PII. Which service enforces this?',
    options: ['Public S3 ACL', 'AWS Lake Formation column-level permissions', 'Disable IAM', 'NAT Gateway'],
    correct: 1,
    explain: 'Lake Formation provides fine-grained table/column access control.'
  },
  { mode: 'scenario', caseStudyId: 'retail-data-lake', topic: 'Orchestration',
    q: 'Nightly dependencies (crawl → ETL → quality check → notify) are BEST orchestrated with:',
    options: ['Cron on a laptop', 'AWS Step Functions coordinating Glue jobs', 'Email attachments', 'Single SSH script only'],
    correct: 1,
    explain: 'Step Functions manages pipeline DAGs and retries across Glue tasks.'
  },
  { mode: 'scenario', caseStudyId: 'retail-data-lake', topic: 'Operations',
    q: 'Pipeline SLA misses must alert on-call. What should you configure?',
    options: ['No monitoring', 'Glue job CloudWatch metrics/alarms and Step Functions failure notifications', 'Delete CloudTrail', 'Disable partitions'],
    correct: 1,
    explain: 'CloudWatch + Step Functions error handling surface operational failures.'
  },
  { mode: 'scenario', caseStudyId: 'retail-data-lake', topic: 'Catalog',
    q: 'Analysts need searchable table metadata across zones:',
    options: ['Spreadsheet only', 'AWS Glue Data Catalog (integrated with Athena and Lake Formation)', 'Route 53', 'WAF'],
    correct: 1,
    explain: 'Glue Data Catalog is the central metastore for the lake.'
  },

  { mode: 'scenario', caseStudyId: 'streaming-orders', topic: 'Ingestion',
    q: 'Durable ingestion with replay for order events uses:',
    options: ['Amazon Kinesis Data Streams or MSK with retention', 'Single EC2 log file', 'Email polling', 'Glacier only'],
    correct: 0,
    explain: 'Kinesis/MSK retain streams for replay and multiple consumers.'
  },
  { mode: 'scenario', caseStudyId: 'streaming-orders', topic: 'Processing',
    q: 'Windowed aggregates and joins on the stream are implemented with:',
    options: ['Amazon Managed Service for Apache Flink or Kinesis Data Analytics', 'S3 lifecycle only', 'Manual cron', 'IAM policies'],
    correct: 0,
    explain: 'Flink/KDA handle stateful stream processing at scale.'
  },
  { mode: 'scenario', caseStudyId: 'streaming-orders', topic: 'Data quality',
    q: 'Malformed records must not block the pipeline. What pattern applies?',
    options: ['Fail entire stream', 'Dead-letter stream / S3 quarantine plus Glue Data Quality rules', 'Drop all metrics', 'Disable encryption'],
    correct: 1,
    explain: 'DLQ/quarantine isolates bad records; Data Quality validates schema.'
  },
  { mode: 'scenario', caseStudyId: 'streaming-orders', topic: 'Warehouse',
    q: 'Enriched aggregates for BI should land in:',
    options: ['Amazon Redshift (or Redshift Serverless) fed by stream sinks', 'Unencrypted public FTP', 'Local laptop CSV', 'Cloud DNS'],
    correct: 0,
    explain: 'Redshift is the warehouse for structured analytics workloads.'
  },
  { mode: 'scenario', caseStudyId: 'streaming-orders', topic: 'Cost',
    q: 'To reduce cost during idle periods between peaks:',
    options: ['Keep max Kinesis shards 24/7', 'Autoscale stream/processing capacity and use S3 for long-term cheap storage', 'Delete all data nightly', 'Disable monitoring'],
    correct: 1,
    explain: 'Right-size streaming capacity; archive to S3 for historical queries.'
  },
  { mode: 'scenario', caseStudyId: 'streaming-orders', topic: 'Lake',
    q: 'Historical order archives for Athena should be written via:',
    options: ['Kinesis Data Firehose to partitioned S3', 'SMTP', 'Single RDS table only', 'VPN client'],
    correct: 0,
    explain: 'Firehose batches stream records into S3 for the data lake.'
  }
];
