/**
 * Fictitious PCA-style case studies for practice (structure mirrors the real exam:
 * company overview, existing environment, requirements). Not copied from Google exam materials.
 */
window.CASE_STUDIES_GCP_PCA = {
  'ehr-healthcare': {
    title: 'EHR Healthcare',
    shortName: 'EHR Healthcare',
    examLabel: 'EHR Healthcare case exam',
    examDesc: 'Hybrid migration, HIPAA, managed SQL, BigQuery, observability',
    sections: [
      {
        heading: 'Company Overview',
        body: 'EHR Healthcare provides electronic health record software to hospitals and clinics. They are migrating from two aging colocation data centers to Google Cloud to improve scalability, availability, and operational cost while keeping hybrid connectivity to legacy clinical systems.'
      },
      {
        heading: 'Existing Technical Environment',
        body: '• 800+ VMs running Linux and Windows application tiers\n• MySQL and Microsoft SQL Server databases on dedicated hosts\n• Batch analytics on a small Hadoop cluster; exports land on NAS\n• VPN to hospitals; no centralized logging across sites\n• PHI regulated under HIPAA; data must stay in US regions'
      },
      {
        heading: 'Business and Technical Requirements',
        body: '• 99.9% availability for clinician-facing web and API tiers\n• Connect on-premises hospital interfaces to cloud with secure, high-throughput paths\n• Migrate relational workloads to managed services where possible\n• Central monitoring, logging, and alerting across cloud and on-prem\n• CI/CD for containerized microservices; images stored in a private registry\n• Analytics on de-identified datasets for population health reporting\n• Least-privilege access; no long-lived keys in application code'
      }
    ]
  },
  'mountkirk-games': {
    title: 'Mountkirk Games',
    shortName: 'Mountkirk Games',
    examLabel: 'Mountkirk Games case exam',
    examDesc: 'Game analytics, GKE scale, testing strategy, multi-region serving',
    sections: [
      {
        heading: 'Company Overview',
        body: 'Mountkirk Games builds mobile and console titles. Traffic spikes during game launches caused outages on self-managed application servers, MySQL databases, and a legacy analytics pipeline. They are replatforming on Google Cloud for elastic scale and a new real-time game analytics platform.'
      },
      {
        heading: 'Existing Technical Environment',
        body: '• Game backends on VMs in two public clouds and one colo rack\n• MySQL for player profiles and purchases; manual failover\n• Analytics: batch ETL into a data warehouse; dashboards lag by hours\n• No unified identity for internal tools; SSH keys on individual servers'
      },
      {
        heading: 'Business and Technical Requirements',
        body: '• Game Analytics Platform: ingest millions of events per minute; scale up/down with player activity\n• Player services: autoscale with load; multi-region active serving for top titles\n• Testing strategy must exceed prior platforms (scale, automation, pre-production validation)\n• Use managed Kubernetes for new services; minimize undifferentiated ops\n• Near-real-time dashboards for live ops; historical analysis in a warehouse\n• Cost controls during idle periods between launches'
      }
    ]
  }
};
