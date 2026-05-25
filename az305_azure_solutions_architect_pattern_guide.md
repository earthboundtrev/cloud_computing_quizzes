# AZ-305 Azure Solutions Architect Expert Quick-Reference

**Exam:** Microsoft Certified: Azure Solutions Architect Expert (AZ-305)  
**Format:** Case-style scenarios, **700+ to pass**  
**Role:** Design solutions across identity, data, BCDR, and infrastructure on Azure.

**AWS equivalent (scope):** Closest Azure track to **AWS Solutions Architect Associate (SAA)**—design and trade-offs. Microsoft has no separate “Solutions Architect Associate”; AZ-305 is **Expert** tier but matches SAA-style questions.

**Prerequisites:** **AZ-104** (Administrator) or **AZ-204** (Developer), plus experience.

**Typical path:** AZ-900 → AZ-104 → **AZ-305** (if coming from AWS SAA/CCP background).

**Case studies on the real exam:** Large design scenarios (business + technical requirements tabs) with multiple questions each—read the question first, then hunt constraints in the case. In this app: **Litware Digital** and **Adventure Works Global** mini-exams (8 Q each, split-view panel) plus **Case studies (mixed)** mode.

**Exam tip:** Read each question before re-reading the case; look for RPO/RTO, cost, compliance, and identity keywords.

---

## Design decision patterns

| Requirement | Lean toward |
|-------------|-------------|
| Serverless events, minimal ops | **Azure Functions** (Premium if VNet) |
| Web app PaaS, slots, CI/CD | **App Service** |
| Kubernetes / microservices | **AKS** (+ ingress, mesh as needed) |
| VMware lift-and-shift | **Azure VMware Solution** |
| Global low-latency NoSQL | **Cosmos DB** |
| Data lake / analytics | **ADLS Gen2** + Synapse/Databricks |
| Private PaaS access | **Private endpoints** + DNS |
| Branch + many spokes | **Virtual WAN** hub |
| Low RPO regional DR | **ASR** + recovery plans |
| Zone failure in region | **Zone-redundant** SKUs across AZs |
| Standing Global Admin | **PIM** + Conditional Access |
| Steady 3-year workload | **Reservations** + right-sizing |
| Interruptible batch | **Spot** VMs / AKS spot node pools |
| Regulated WORM / retention | **Immutable Blob** + backup retention |
| Govern many subscriptions | **Landing zones** + Policy at management group |

---

## Well-Architected pillars (exam mindset)

1. **Reliability** – eliminate SPOF, health probes, multi-instance, DR  
2. **Security** – Zero Trust, private endpoints, MI + Key Vault, WAF  
3. **Cost** – right-size, reservations, automation for dev/test  
4. **Operational excellence** – Monitor, App Insights, IaC (Bicep/ARM)  
5. **Performance efficiency** – right service tier, caching, CDN/Front Door
