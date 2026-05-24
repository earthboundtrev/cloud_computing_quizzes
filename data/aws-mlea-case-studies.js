window.CASE_STUDIES_AWS_MLEA = {
  'sagemaker-enterprise': {
    title: 'Case Study — SageMaker Enterprise Application',
    shortName: 'SageMaker enterprise application case study',
    examLabel: 'SageMaker enterprise case exam',
    examDesc: 'Model Registry, secure training data, bias monitoring on endpoints',
    sections: [
      { heading: 'Case Study', body: 'A company is building a web-based AI application using Amazon SageMaker. The application provides ML experimentation, training, a central model registry, model deployment, and model monitoring. Training data is in Amazon S3. The company must ensure secure, isolated use of training data across the ML lifecycle and run on-demand workflows to monitor bias drift for models deployed to real-time endpoints.' },
      { heading: 'Requirements', body: '• Central versioning of production models with minimal operational overhead\n• Secure S3 access for training jobs without public exposure\n• On-demand bias drift monitoring for real-time endpoints\n• Compliance-friendly audit trail of model promotions' }
    ]
  },
  'fraud-detection-pipeline': {
    title: 'Case Study — Fraud Detection on AWS',
    shortName: 'Fraud detection case study',
    examLabel: 'Fraud detection case exam',
    examDesc: 'Lake Formation, class imbalance, SageMaker training',
    sections: [
      { heading: 'Case Study', body: 'An ML engineer is developing a fraud detection model on AWS. The training dataset includes transaction logs and customer profiles in Amazon S3 plus tables from an on-premises MySQL database. The dataset has class imbalance affecting algorithm learning; many features have interdependencies; the current algorithm is not capturing desired patterns.' },
      { heading: 'Requirements', body: '• Aggregate data from S3 and on-prem relational sources with governance\n• Improve model performance under imbalance and correlated features\n• Maintain secure, auditable access to sensitive financial data\n• Deploy to a managed endpoint with monitoring hooks' }
    ]
  }
};
