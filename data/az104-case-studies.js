/**
 * Fictitious AZ-104-style case studies (admin/ops scenarios). Not copied from Microsoft exam materials.
 */
window.CASE_STUDIES_AZ104 = {
  'northwind-operations': {
    title: 'Northwind Operations',
    shortName: 'Northwind Operations',
    examLabel: 'Northwind Operations case exam',
    examDesc: 'Hybrid VPN, NSGs, Entra device settings, custom RBAC, storage',
    sections: [
      {
        heading: 'Company Overview',
        body: 'Northwind Operations is a logistics company with datacenters in Seattle and Chicago and a new Azure landing subscription for production workloads. Finance and engineering teams share subscriptions under strict governance.'
      },
      {
        heading: 'Existing Environment',
        body: '• Hybrid: site-to-site VPN from Chicago office to Azure VNet (10.20.0.0/16)\n• VMs: VM1–VM4 in subnets with NSGs; VM3 cannot reach required ports\n• Entra ID with on-premises AD synced via Entra Connect\n• Storage accounts: mix of GPv2 and premium file shares\n• No centralized backup for legacy file servers yet'
      },
      {
        heading: 'Technical Requirements',
        body: '• Only members of group Pilot may join devices to Entra ID; MFA required on join (mobile phone)\n• VM1 must communicate with VM4 with minimal administrative effort\n• Verify whether VM3 connectivity issues relate to NSGs before changing architecture\n• Custom role Role1: read monitoring, restart VMs in RG-Ops only\n• Automate finance department VM shutdown tags via policy (not manual scripts)\n• New York office needs redundant VPN/ExpressRoute path per compliance\n• Recovery Services vault in same region as protected VMs'
      }
    ]
  },
  'fabrikam-research': {
    title: 'Fabrikam Research Labs',
    shortName: 'Fabrikam Research',
    examLabel: 'Fabrikam Research case exam',
    examDesc: 'Backup policies, storage accounts, policy initiatives, monitoring alerts',
    sections: [
      {
        heading: 'Company Overview',
        body: 'Fabrikam Research Labs runs instrument clusters and batch analysis pipelines. They are consolidating three subscriptions into a single governed hierarchy with Azure Policy and Backup.'
      },
      {
        heading: 'Existing Environment',
        body: '• RG-Lab: Linux and Windows VMs without backup policies\n• Storage accounts storage1–storage5 with different replication SKUs\n• User1 needs to create policy initiative definitions; User4 assigns initiatives to RG2\n• App1 moving to Azure requires SMB share and daily backup\n• Log Analytics workspace in West Europe; VMs in North Europe'
      },
      {
        heading: 'Technical Requirements',
        body: '• User1: create initiative definitions; User4: assign initiatives to RG2 only (least privilege)\n• container1 and share1 must use appropriate storage account types (blob vs files)\n• storage5 must support planned GRS and large file shares\n• Backup policy: daily with 30-day retention; soft delete enabled on vault\n• Diagnostic settings: send VM metrics and logs to Log Analytics\n• Deny creation of resources in non-approved regions via policy at management group\n• Alert when CPU > 85% for 15 minutes on lab VMs'
      }
    ]
  }
};
