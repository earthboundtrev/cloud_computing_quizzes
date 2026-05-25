/**
 * Fictitious AZ-305-style case studies (design scenarios). Not copied from Microsoft exam materials.
 */
window.CASE_STUDIES_AZ305 = {
  'litware-digital': {
    title: 'Litware Digital',
    shortName: 'Litware Digital',
    examLabel: 'Litware Digital case exam',
    examDesc: 'SQL HA, private connectivity, identity, migration trade-offs',
    sections: [
      {
        heading: 'Company Overview',
        body: 'Litware Digital publishes subscription software for healthcare and retail clients. They are migrating datacenter workloads to Azure while maintaining hybrid connectivity to legacy HL7 and payment gateways.'
      },
      {
        heading: 'Existing Environment',
        body: '• App1: multi-tier .NET on Windows VMs, SQL Server DB1/DB2 on dedicated hosts\n• App2: file-heavy Windows workload; SMB shares on NAS\n• Authentication: on-premises AD; users access SaaS via VPN today\n• RPO 15 minutes for transactional DBs; RTO 4 hours for App1\n• No customer-managed keys today; auditors require CMK next fiscal year'
      },
      {
        heading: 'Business and Technical Requirements',
        body: '• Migrate DB1/DB2 to Azure with minimal refactor; need instance features (SQL Agent) and VNet isolation\n• App1 web tier: 99.95% SLA, scale for seasonal traffic\n• App2: SMB-compatible shares in Azure with backup\n• Partners authenticate with their own Entra tenants (B2B)\n• All PaaS data paths must avoid public internet where possible\n• Cost predictability for baseline compute; burst analytics on Spot acceptable\n• Central logging and security posture dashboard for SecOps'
      }
    ]
  },
  'adventure-works-global': {
    title: 'Adventure Works Global',
    shortName: 'Adventure Works',
    examLabel: 'Adventure Works case exam',
    examDesc: 'Multi-region web, Cosmos, Front Door, DR and governance',
    sections: [
      {
        heading: 'Company Overview',
        body: 'Adventure Works Global runs an ecommerce platform and mobile API consumed in North America, Europe, and Asia. Traffic spikes during product launches caused outages on single-region VMs and self-managed Redis.'
      },
      {
        heading: 'Existing Environment',
        body: '• Monolithic API on VMs; session state in local Redis\n• Product catalog in SQL Server; clickstream in files on NAS\n• Manual DR runbooks; last regional outage exceeded RTO targets\n• Multiple dev subscriptions without tag or location policies'
      },
      {
        heading: 'Business and Technical Requirements',
        body: '• Active-active serving for API in at least two regions; state externalized\n• Catalog needs global low-latency reads with strong consistency for inventory writes\n• Clickstream ingestion millions events/minute into analytics lake\n• WAF and bot protection at edge; DDoS standard on VNets\n• Landing zone with management groups, policies for tags and allowed regions\n• DR: survive region loss with automated failover plan\n• Developers use managed identity to Key Vault; no secrets in Git'
      }
    ]
  }
};
