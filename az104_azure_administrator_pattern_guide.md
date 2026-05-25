# AZ-104 Azure Administrator Associate Quick-Reference

**Exam:** Microsoft Certified: Azure Administrator Associate (AZ-104)  
**Format:** ~40–60 questions, labs/scenarios, **700+ to pass**  
**Role:** Implement, manage, and monitor identity, governance, storage, compute, and virtual networks.

**Path:** Typical **next step after AZ-900** (Fundamentals). Not the same as Solutions Architect—that is **AZ-305**.

**AWS overlap:** Admin tasks map cleanly—VM ≈ EC2, Managed Disks ≈ EBS, VNet/NSG ≈ VPC/SG, Azure Backup ≈ AWS Backup, Bastion ≈ SSM/bastion patterns.

---

## Domain signals (gut check)

| Signal | Answer |
|--------|--------|
| Deploy/resize VM, extensions, scale set | **Compute** – VM, extensions, deallocate vs stop |
| SMB share, AzCopy, SAS, firewall on storage account | **Storage** – Files, Blob, secure transfer |
| Peering, VPN P2S/S2S, NSG priority, UDR to firewall | **Networking** |
| RBAC scope, managed identity, Entra Connect | **Identity** |
| Policy Deny/DeployIfNotExists, locks, tags, budgets | **Governance** |
| RSV, backup policy, ASR, soft delete | **Backup / DR** |
| Log Analytics alert, diagnostic settings, VM insights | **Monitor** |

---

## Admin vs architect (AZ-104 vs AZ-305)

- **AZ-104:** *How* to configure (portal, CLI, PowerShell, policies).
- **AZ-305:** *What* to choose (HA, DR, cost, security trade-offs)—closest Azure track to **AWS SAA** scope.

Prerequisite for AZ-305: **AZ-104** or **AZ-204**.

**Case studies on the real exam:** Multi-section case blocks with several independent questions each (not timed separately). In this app: **Case studies (mixed)** or **Northwind Operations** / **Fabrikam Research** mini-exams (8 Q each, split-view panel).
