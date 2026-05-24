window.CASE_STUDIES_AWS_DEA = {
  'retail-data-lake': {
    title: 'Case Study — RetailCo Data Lake',
    shortName: 'RetailCo data lake case study',
    examLabel: 'RetailCo data lake case exam',
    examDesc: 'Glue, S3, Lake Formation, batch pipelines',
    sections: [
      { heading: 'Case Study', body: 'RetailCo is migrating analytics from on-premises Hadoop to AWS. Store POS, ecommerce clicks, and inventory feeds land in Amazon S3. Data engineers must build curated zones (raw, refined, trusted), catalog schemas, and nightly batch pipelines with column-level access for finance vs marketing teams.' },
      { heading: 'Requirements', body: '• Ingest CSV/JSON from S3 and JDBC sources on a schedule\n• Transform to Parquet with partitioning for Athena\n• Govern access with Lake Formation\n• Monitor pipeline failures and data freshness SLAs' }
    ]
  },
  'streaming-orders': {
    title: 'Case Study — StreamOrders Analytics',
    shortName: 'StreamOrders case study',
    examLabel: 'StreamOrders case exam',
    examDesc: 'Kinesis, Flink, data quality, Redshift',
    sections: [
      { heading: 'Case Study', body: 'StreamOrders runs an online marketplace. Order events (5k–50k/sec during peaks) must be ingested in near real time, enriched with customer dimension data in Redshift, and written to an S3 data lake for BI. Bad records must quarantine without stalling the stream.' },
      { heading: 'Requirements', body: '• Durable ingestion and replay capability\n• Stream processing with windowed aggregates\n• Data quality checks on schema and null rates\n• Cost-aware scaling between peak and idle hours' }
    ]
  }
};
