# AZ-900 Azure Fundamentals Quick-Reference Pattern Guide

**Exam:** Microsoft Certified: Azure Fundamentals (AZ-900)  
**Format:** ~40–60 questions, 60 min, **700+ to pass**, **$99 USD** (no cooldown for retakes)  
**Purpose:** Fast pattern recognition for AZ-900 questions. When you see these signals, trust your gut.

**AWS Overlap:** ~50–60% with CCP/SAA—Azure VM ≈ EC2, Blob ≈ S3, Azure AD ≈ IAM, VNet ≈ VPC. Use your AWS brain, swap the names.

## Certification path (different exams)

| Goal | Microsoft exam | In this repo |
|------|----------------|--------------|
| Fundamentals (you are here) | **AZ-900** | `az900_azure_fundamentals_quiz.html` |
| Next step after fundamentals (admin/ops) | **AZ-104** Administrator Associate | `az104_azure_administrator_quiz.html` |
| Closest to **AWS SAA** (solution design) | **AZ-305** Solutions Architect Expert | `az305_azure_solutions_architect_quiz.html` |

**AZ-104** and **AZ-305** are not the same: AZ-104 is hands-on administration; AZ-305 is architecture (requires AZ-104 or AZ-204 first). Typical SAA holders: AZ-900 → AZ-104 → AZ-305.

---

## 🎯 Pre-Session Affirmation (Read Before Every Study Burst)

> *"Certs = runway for the drone. Multi-cloud = not locked in. Freedom first."*

---

## 📋 AWS-to-Azure Quick Reference (Memorize These)

| **AWS** | **Azure** | **Memory Hook** |
|---------|-----------|-----------------|
| EC2 | Azure Virtual Machines (VMs) | VM = EC2 |
| S3 | Azure Blob Storage | Blob = object storage |
| IAM (users, roles, policies) | Microsoft Entra ID (Azure AD) + RBAC | Entra ID = identity; RBAC = permissions |
| VPC | Azure Virtual Network (VNet) | VNet = VPC |
| Security Groups / NACLs | Network Security Groups (NSGs) | NSG = firewall rules |
| EBS | Azure Managed Disks | Managed Disks = block storage |
| RDS | Azure SQL Database / Azure Database for PostgreSQL/MySQL | Managed relational |
| Lambda | Azure Functions | Serverless functions |
| ECS/EKS | Azure Container Apps / AKS | Containers / Kubernetes |
| CloudWatch | Azure Monitor | Metrics, logs, alerts |
| CloudTrail | Azure Activity Log / Microsoft Entra ID sign-in logs | API/action auditing |
| AWS Config | Azure Policy + Microsoft Purview | Compliance, governance |
| GuardDuty | Microsoft Defender for Cloud | Threat detection, security posture |
| KMS | Azure Key Vault | Keys + secrets |
| Route 53 | Azure DNS | DNS |
| Direct Connect | ExpressRoute | Dedicated private connection |
| VPN | Azure VPN Gateway | Site-to-site / client VPN |
| Cost Explorer | Cost Management + Billing | Cost analysis |
| Organizations | Management Groups + Subscriptions | Hierarchy |
| Reserved Instances | Azure Reservations | Reserved capacity |

---

## ☁️ Describe Cloud Concepts (25–30%)

### **Cloud Computing Definition**
**Signal:** "Define cloud computing", "on-demand", "shared resources", "internet"
**Answer:** **Cloud computing** = delivery of compute, storage, networking, and other services over the internet on demand; shared resources, rapid elasticity, pay-as-you-go
**Why:** Foundational definition; know it for "what is the cloud" questions
**Gut Check:** On-demand + shared + pay-as-you-go → cloud computing

### **Shared Responsibility Model**
**Signal:** "Shared responsibility", "who is responsible", "customer vs cloud provider", "security responsibility"
**Answer:** **Shared responsibility** — provider secures *infrastructure* (physical, network, host); customer secures *data, apps, identity, access, OS/config* (depending on IaaS/PaaS/SaaS)
**Why:** Same idea as AWS; more customer responsibility in IaaS, less in SaaS
**Gut Check:** "Who patches the OS?" IaaS = you. PaaS/SaaS = provider. "Who secures the building?" = provider

### **Cloud Models - Public, Private, Hybrid**
**Signal:** "Public cloud", "private cloud", "hybrid cloud", "use case", "appropriate model"
**Answer:**
- **Public:** Resources shared, multi-tenant, over internet (e.g., Azure, AWS) — general workloads, scale, cost-effective
- **Private:** Dedicated to one org, on-prem or hosted — strict compliance, legacy, control
- **Hybrid:** Mix of public + private (often with connectivity) — gradual migration, burst, regulatory
**Why:** Exam asks which model fits a scenario
**Gut Check:** "Need strict compliance + control" → Private. "Need scale + low cost" → Public. "Both" → Hybrid

### **Consumption-Based Model**
**Signal:** "Consumption-based", "pay as you go", "no upfront", "operational expense"
**Answer:** **Consumption-based** = pay only for what you use; no upfront CapEx; OpEx model
**Why:** Core cloud benefit; contrasts with traditional buy-and-maintain
**Gut Check:** Pay for usage only → consumption-based

### **Cloud Pricing Models**
**Signal:** "Reserved", "spot", "free tier", "compare pricing"
**Answer:** **Pay-as-you-go**, **Reservations** (commit for 1–3 years, discount), **Spot** (interruptible, cheaper), **Free tier** (limited free services)
**Why:** Aligns with cost optimization; know when to use each
**Gut Check:** Predictable long-term → Reservations. Fault-tolerant/interruptible → Spot

### **Serverless**
**Signal:** "Serverless", "no infrastructure", "event-driven", "scale to zero"
**Answer:** **Serverless** = run code/functions without managing servers; automatic scale, pay per execution (e.g., Azure Functions)
**Why:** PaaS subset; no servers to manage
**Gut Check:** No servers + event-driven → serverless (e.g., Azure Functions)

### **Benefits of Cloud - High Availability & Scalability**
**Signal:** "High availability", "scalability", "elastic", "scale out", "scale up"
**Answer:** **HA** = multiple copies/zones; **Scalability** = vertical (bigger VM) or horizontal (more instances); **Elasticity** = auto scale with demand
**Why:** Benefits section; know vertical vs horizontal
**Gut Check:** "More machines" → horizontal. "Bigger machine" → vertical.

### **Benefits - Reliability, Predictability, Security, Manageability**
**Signal:** "Reliability", "predictability", "security", "manageability", "benefits"
**Answer:** **Reliability** = SLA, redundancy; **Predictability** = predictable performance/cost; **Security** = provider + tools; **Manageability** = portals, automation, templates
**Why:** Conceptual; often in "describe benefits" questions
**Gut Check:** Match keyword to benefit

### **Cloud Service Types - IaaS, PaaS, SaaS**
**Signal:** "IaaS", "PaaS", "SaaS", "use case", "who manages what"
**Answer:**
- **IaaS:** You manage OS, apps, data; provider = compute, network, storage (e.g., Azure VMs)
- **PaaS:** You manage apps + data; provider = runtime, OS, infrastructure (e.g., Azure App Service)
- **SaaS:** You use the app; provider manages everything (e.g., Microsoft 365)
**Why:** Most-tested concept; know the stack each side manages
**Gut Check:** "Manage the OS?" → IaaS. "Just deploy code?" → PaaS. "Use an app in browser?" → SaaS

### **IaaS vs PaaS vs SaaS - Key Distinction**
**⚠️ Critical Distinction:**
- **IaaS** = VM, you patch OS, install software (max control, max management)
- **PaaS** = App Service, Functions, you deploy code only (less ops)
- **SaaS** = Email, CRM, no infrastructure (just use it)
- **Exam Trap:** "Migrate with minimal management" → PaaS. "Full control over OS" → IaaS.

---

## 🏗️ Describe Azure Architecture and Services (35–40%)

### **Core Architectural Components - Regions, Region Pairs, Sovereign**
**Signal:** "Region", "region pair", "sovereign", "geography", "data residency"
**Answer:** **Regions** = geographic locations (datacenters); **Region pairs** = same geography, for DR/replication (e.g., West US ↔ East US); **Sovereign regions** = special compliance (e.g., US Gov, China)
**Why:** Where resources live; region pairs for DR
**Gut Check:** DR in same geography → region pair. Government/compliance → sovereign

### **Availability Zones**
**Signal:** "Availability zone", "AZ", "high availability", "datacenter failure", "zone-redundant"
**Answer:** **Availability Zones** = physically separate datacenters within a region; use for HA (e.g., zone-redundant storage, VMs across zones)
**Why:** Like AWS AZs; survive datacenter failure in one region
**Gut Check:** HA within one region → Availability Zones

### **Azure Resources and Resource Groups**
**Signal:** "Resource", "resource group", "organize", "logical container"
**Answer:** **Resource** = manageable item (VM, storage, etc.); **Resource group** = logical container for resources; one resource in one RG (can move); RG = lifecycle + billing boundary
**Why:** Everything in Azure is a resource; RGs organize them
**Gut Check:** "Group resources for billing or deletion" → Resource group

### **Subscriptions**
**Signal:** "Subscription", "billing", "limit", "boundary"
**Answer:** **Subscription** = billing + access boundary; resources belong to a subscription; you can have multiple subscriptions (e.g., dev, prod)
**Why:** Subscription = billing unit; ties to an account
**Gut Check:** Billing/access boundary → Subscription

### **Management Groups**
**Signal:** "Management group", "hierarchy", "policy at scale", "organize subscriptions"
**Answer:** **Management groups** = hierarchy above subscriptions; apply governance (e.g., policy) to many subscriptions at once; up to 6 levels
**Why:** Like AWS Organizations; organize subscriptions
**Gut Check:** "Apply policy to many subscriptions" → Management groups

### **Hierarchy: Management Groups → Subscriptions → Resource Groups → Resources**
**⚠️ Critical Order:**
```
Management Group (governance)
  └── Subscription (billing/access)
        └── Resource Group (logical container)
              └── Resources (VM, storage, etc.)
```

### **Compute Types - VMs, Containers, Functions**
**Signal:** "Compare compute", "VM", "container", "function", "when to use"
**Answer:** **VMs** = full control, IaaS; **Containers** = app + dependencies, portable (Container Apps, AKS); **Functions** = serverless, event-driven, small code
**Why:** Exam compares them; pick by control vs simplicity
**Gut Check:** "No server management" → Functions. "Consistent environment" → Containers. "Full OS control" → VM

### **Virtual Machine Options**
**Signal:** "Azure VM", "scale set", "availability set", "Virtual Desktop"
**Answer:** **Azure VMs** = IaaS compute; **Virtual Machine Scale Sets** = identical VMs, auto scale; **Availability Sets** = spread VMs across fault domains for HA (legacy pattern; prefer zones); **Azure Virtual Desktop** = desktop and app virtualization
**Why:** Know VM, scale set (scale out), availability set (HA)
**Gut Check:** "Scale out identical VMs" → Scale Sets. "HA across hardware" → Availability Sets or Zones

### **Application Hosting - Web Apps, Containers, VMs**
**Signal:** "Host application", "web app", "container", "VM"
**Answer:** **Azure App Service** (web apps, PaaS); **Containers** (Container Apps, AKS); **VMs** (IaaS, full control)
**Why:** Picking the right hosting: PaaS vs container vs VM
**Gut Check:** "Just deploy a web app" → App Service. "Docker/Kubernetes" → Containers. "Legacy or full control" → VM

### **Virtual Networking - VNet, Subnets, Peering**
**Signal:** "Virtual network", "VNet", "subnet", "peering", "isolated network"
**Answer:** **Azure Virtual Network (VNet)** = isolated network (like VPC); **Subnets** = segments inside VNet; **VNet peering** = connect two VNets (same or different regions)
**Why:** Core networking; VNet = VPC
**Gut Check:** Isolated cloud network → VNet. Connect two VNets → Peering

### **Azure DNS, VPN Gateway, ExpressRoute**
**Signal:** "DNS", "VPN", "dedicated connection", "hybrid"
**Answer:** **Azure DNS** = host DNS zones; **Azure VPN Gateway** = site-to-site or point-to-site VPN over internet; **ExpressRoute** = dedicated private connection (no internet)
**Why:** DNS vs connectivity; VPN = internet, ExpressRoute = private
**Gut Check:** "Dedicated private link" → ExpressRoute. "VPN over internet" → VPN Gateway

### **Public vs Private Endpoints**
**Signal:** "Public endpoint", "private endpoint", "private link", "no public internet"
**Answer:** **Public endpoint** = service reachable over internet; **Private endpoint** = private IP in your VNet, traffic stays on Microsoft network (Azure Private Link)
**Why:** Security; private endpoint = no public exposure
**Gut Check:** "Access PaaS without public internet" → Private endpoint (Private Link)

### **Azure Storage Services - Compare**
**Signal:** "Compare storage", "Blob", "File", "Queue", "Table", "when to use"
**Answer:** **Blob** = object storage (files, backup, data lake); **Azure Files** = SMB/NFS file shares; **Queue** = message queue (async); **Table** = NoSQL key-value (now often Cosmos DB Table API)
**Why:** Pick storage by data type and access pattern
**Gut Check:** "Object/files at scale" → Blob. "Shared file share" → Azure Files. "Message queue" → Queue

### **Storage Tiers (Blob)**
**Signal:** "Hot", "cool", "archive", "tier", "cost", "access frequency"
**Answer:** **Hot** = frequently accessed, higher cost; **Cool** = 30+ days infrequent, lower cost; **Archive** = rarely accessed, lowest cost, retrieval delay
**Why:** Like S3 Standard / IA / Glacier
**Gut Check:** "Rarely access" → Cool or Archive. "Frequent" → Hot

### **Redundancy Options**
**Signal:** "Redundancy", "LRS", "GRS", "ZRS", "replication", "durability"
**Answer:** **LRS** = locally redundant (one datacenter); **ZRS** = zone-redundant (across AZs); **GRS** = geo-redundant (secondary region); **GZRS** = geo + zone
**Why:** Durability vs cost; DR = GRS/GZRS
**Gut Check:** "Survive region failure" → GRS or GZRS. "Survive AZ failure" → ZRS

### **Storage Account Options**
**Signal:** "Storage account", "general-purpose v2", "Blob storage account", "type"
**Answer:** **General-purpose v2** = Blob, File, Queue, Table; **Blob storage account** = Blob only (legacy tiers); **Premium** = high-performance (e.g., Page Blobs for VMs)
**Why:** Account type determines which services and performance
**Gut Check:** "All storage types" → General-purpose v2. "Blob only" → Blob storage account

### **Moving Files - AzCopy, Storage Explorer, Azure File Sync**
**Signal:** "Move files", "copy data", "AzCopy", "Storage Explorer", "sync file share"
**Answer:** **AzCopy** = command-line copy (high perf); **Azure Storage Explorer** = GUI; **Azure File Sync** = sync on-prem file server to Azure Files
**Why:** Migration/sync tools
**Gut Check:** "CLI bulk copy" → AzCopy. "Sync on-prem to cloud" → Azure File Sync

### **Migration - Azure Migrate, Azure Data Box**
**Signal:** "Migrate", "assessment", "server migration", "large data transfer", "offline"
**Answer:** **Azure Migrate** = discover, assess, migrate (servers, DBs, apps); **Azure Data Box** = physical device for large offline data transfer (like Snowball)
**Why:** Migrate = Azure Migrate; TB-scale offline = Data Box
**Gut Check:** "Assess and migrate servers" → Azure Migrate. "Ship terabytes" → Data Box

---

## 🔐 Describe Azure Identity, Access, and Security

### **Directory Services - Microsoft Entra ID (Azure AD)**
**Signal:** "Directory", "identity", "Azure AD", "Entra ID", "users and groups"
**Answer:** **Microsoft Entra ID** (Azure AD) = cloud identity and access; users, groups, SSO, MFA, application access
**Why:** Central identity for Azure and Microsoft 365
**Gut Check:** "Cloud identity" or "SSO" → Entra ID (Azure AD)

### **Microsoft Entra Domain Services**
**Signal:** "Domain services", "domain-join", "Kerberos", "legacy on-prem"
**Answer:** **Microsoft Entra Domain Services** = managed AD Domain Services in Azure (domain-join VMs, legacy app support)
**Why:** Lift-and-shift apps that need traditional AD
**Gut Check:** "Domain-join VMs in Azure" → Entra Domain Services

### **Authentication - SSO, MFA, Passwordless**
**Signal:** "Single sign-on", "MFA", "multifactor", "passwordless", "authenticate"
**Answer:** **SSO** = one login for many apps; **MFA** = extra factor (phone, app); **Passwordless** = FIDO2, Windows Hello, authenticator app
**Why:** Security best practices
**Gut Check:** "One login for many apps" → SSO. "Extra verification" → MFA

### **External Identities**
**Signal:** "External user", "guest", "B2B", "partner", "consumer"
**Answer:** **External identities** = invite guests (B2B) or support consumer sign-in (B2C); collaborate without local accounts
**Why:** Sharing with external users
**Gut Check:** "Partner/guest access" → External identities (B2B)

### **Microsoft Entra Conditional Access**
**Signal:** "Conditional Access", "block", "require MFA", "location", "device state"
**Answer:** **Conditional Access** = policies that allow/block or require (e.g., MFA) based on user, location, device, app
**Why:** Zero Trust; enforce policy at sign-in
**Gut Check:** "Require MFA from untrusted network" → Conditional Access

### **Azure RBAC (Role-Based Access Control)**
**Signal:** "RBAC", "role", "permission", "who can do what", "least privilege"
**Answer:** **Azure RBAC** = assign roles (Owner, Contributor, Reader, or custom) to users/groups at subscription, RG, or resource scope
**Why:** Authorization in Azure; like IAM roles
**Gut Check:** "Grant access to Azure resources" → RBAC (role at scope)

### **Zero Trust**
**Signal:** "Zero Trust", "never trust always verify", "assume breach"
**Answer:** **Zero Trust** = verify explicitly, least privilege, assume breach; never trust by location alone
**Why:** Modern security model; exam may ask definition
**Gut Check:** "Verify every request" / "assume breach" → Zero Trust

### **Defense in Depth**
**Signal:** "Defense in depth", "layers", "multiple controls"
**Answer:** **Defense in depth** = multiple layers (physical, identity, network, compute, app, data) so one failure doesn’t compromise all
**Why:** Layered security strategy
**Gut Check:** "Multiple layers of security" → Defense in depth

### **Microsoft Defender for Cloud**
**Signal:** "Defender for Cloud", "security posture", "threat detection", "recommendations", "CSPM"
**Answer:** **Microsoft Defender for Cloud** = security posture (CSPM) + threat detection (CWP); recommendations, alerts, compliance
**Why:** Like AWS GuardDuty + Security Hub
**Gut Check:** "Security recommendations" or "threat detection in Azure" → Defender for Cloud

---

## 💰 Describe Azure Management and Governance (30–35%)

### **Cost Management - Factors That Affect Cost**
**Signal:** "What affects cost", "resource type", "region", "bandwidth", "support"
**Answer:** **Resource type**, **region**, **bandwidth/egress**, **support plan**, **reservations** (reduce cost), **tags** (track)
**Why:** Know levers for cost
**Gut Check:** "Reduce cost" → right-size, region, reservations, tags

### **Pricing Calculator**
**Signal:** "Estimate cost", "calculator", "before deploying"
**Answer:** **Azure Pricing Calculator** = estimate cost for services before deployment
**Why:** Planning and budgeting
**Gut Check:** "Estimate cost" → Pricing Calculator

### **Cost Management Capabilities**
**Signal:** "Cost management", "budget", "alert", "report", "analyze cost"
**Answer:** **Cost Management + Billing** = budgets, alerts, cost analysis, reports, recommendations
**Why:** Built-in cost visibility and control
**Gut Check:** "Set budget and get alerts" → Cost Management (Budgets)

### **Purpose of Tags**
**Signal:** "Tag", "organize", "cost allocation", "billing by department", "resource organization"
**Answer:** **Tags** = key-value on resources for organization, cost allocation, and governance
**Why:** Like AWS tags; track by project/department
**Gut Check:** "Organize costs by department" → Tags + Cost Management

### **Microsoft Purview**
**Signal:** "Purview", "governance", "data catalog", "compliance", "data discovery"
**Answer:** **Microsoft Purview** = data governance, catalog, lineage, compliance (find and govern data across Azure and on-prem)
**Why:** Data governance and compliance
**Gut Check:** "Data governance" or "data catalog" → Purview

### **Azure Policy**
**Signal:** "Policy", "compliance", "enforce", "allowed regions", "governance"
**Answer:** **Azure Policy** = enforce rules on resources (e.g., allowed regions, allowed SKUs, require tags); evaluate and remediate
**Why:** Like AWS Config rules / Org policies
**Gut Check:** "Enforce rules on resources" → Azure Policy

### **Resource Locks**
**Signal:** "Lock", "prevent delete", "prevent change", "critical resource"
**Answer:** **Resource locks** = **CanNotDelete** or **ReadOnly** to prevent accidental delete or changes
**Why:** Protect critical resources
**Gut Check:** "Prevent deletion" → Resource lock (CanNotDelete)

### **Azure Portal**
**Signal:** "Portal", "web interface", "manage Azure"
**Answer:** **Azure Portal** = web UI for managing Azure resources
**Why:** Primary GUI
**Gut Check:** "Web UI for Azure" → Azure Portal

### **Azure Cloud Shell (CLI, PowerShell)**
**Signal:** "Cloud Shell", "CLI", "PowerShell", "browser-based", "no install"
**Answer:** **Azure Cloud Shell** = browser-based Azure CLI and PowerShell; no local install
**Why:** Scripting and automation from browser
**Gut Check:** "Run Azure commands in browser" → Cloud Shell

### **Azure Arc**
**Signal:** "Arc", "hybrid", "on-premises", "multi-cloud", "manage non-Azure"
**Answer:** **Azure Arc** = extend Azure management and services to on-prem, multi-cloud, edge (govern, secure, manage)
**Why:** Manage non-Azure resources from Azure
**Gut Check:** "Manage servers outside Azure" → Azure Arc

### **Infrastructure as Code (IaC)**
**Signal:** "Infrastructure as code", "template", "repeatable", "version control"
**Answer:** **IaC** = define infrastructure in code (templates); **ARM templates** (Azure), **Bicep**, **Terraform**
**Why:** Repeatable, versioned deployments
**Gut Check:** "Deploy from template" → IaC (ARM/Bicep)

### **Azure Resource Manager (ARM) and ARM Templates**
**Signal:** "ARM", "Resource Manager", "template", "JSON", "deployment"
**Answer:** **Azure Resource Manager (ARM)** = deployment and management layer; **ARM templates** = JSON (or Bicep) that define resources
**Why:** All resources go through ARM; templates = declarative deployment
**Gut Check:** "Deploy via template" → ARM template (or Bicep)

### **Azure Advisor**
**Signal:** "Advisor", "recommendations", "cost", "security", "reliability", "performance"
**Answer:** **Azure Advisor** = personalized recommendations for cost, security, reliability, performance, operational excellence
**Why:** Free recommendations across the five pillars
**Gut Check:** "Best practice recommendations" → Azure Advisor

### **Azure Service Health**
**Signal:** "Service Health", "outage", "planned maintenance", "service issue", "status"
**Answer:** **Azure Service Health** = view outages, planned maintenance, and health of Azure services affecting your resources
**Why:** Know when Azure has issues
**Gut Check:** "Is Azure down?" or "planned maintenance" → Service Health

### **Azure Monitor - Log Analytics, Alerts, Application Insights**
**Signal:** "Monitor", "logs", "metrics", "alerts", "Application Insights", "APM"
**Answer:** **Azure Monitor** = metrics, logs, alerts; **Log Analytics** = query logs; **Alerts** = notify on conditions; **Application Insights** = APM for apps
**Why:** Observability; like CloudWatch + X-Ray
**Gut Check:** "Metrics and alerts" → Azure Monitor. "App performance and traces" → Application Insights

### **Advisor vs Service Health vs Monitor - Key Distinction**
**⚠️ Critical Distinction:**
- **Advisor** = recommendations (cost, security, reliability, etc.)
- **Service Health** = Azure service status (outages, maintenance)
- **Monitor** = your metrics, logs, alerts, Application Insights
- **Exam Trap:** "Azure is down" → Service Health. "Optimize my resources" → Advisor. "Alert on CPU" → Monitor.

---

## 🎯 Quick Decision Trees

### **Cloud Model Decision Tree**
```
Need strict compliance/control? → Private
Need scale + low cost? → Public
Need both / gradual migration? → Hybrid
```

### **Service Type Decision Tree**
```
Manage OS and everything? → IaaS (VM)
Deploy code only? → PaaS (App Service, Functions)
Use app in browser? → SaaS
```

### **Compute Decision Tree**
```
Serverless / event-driven? → Azure Functions
Containers / Kubernetes? → Container Apps / AKS
Full control / legacy? → Azure VM
Scale set of identical VMs? → VM Scale Sets
```

### **Storage Decision Tree**
```
Object/files at scale? → Blob (Hot/Cool/Archive)
Shared file share? → Azure Files
Message queue? → Queue
Frequent access? → Hot. Infrequent? → Cool/Archive
```

### **Redundancy Decision Tree**
```
Survive region failure? → GRS / GZRS
Survive AZ failure? → ZRS
Single datacenter OK? → LRS
```

### **Identity & Security Decision Tree**
```
Cloud identity / SSO? → Microsoft Entra ID
Permissions on Azure resources? → RBAC
Require MFA from certain locations? → Conditional Access
Security posture / threats? → Microsoft Defender for Cloud
```

### **Governance Decision Tree**
```
Enforce rules (e.g., allowed regions)? → Azure Policy
Prevent delete? → Resource lock
Data governance / catalog? → Microsoft Purview
Organize / track cost? → Tags + Cost Management
```

### **Monitoring & Health Decision Tree**
```
Recommendations (cost, security)? → Azure Advisor
Azure outage/maintenance? → Service Health
Metrics, logs, app performance? → Azure Monitor / Application Insights
```

---

## 🧠 Exam Strategy Reminders

1. **Azure = AWS with different names** — VNet=VPC, Blob=S3, Entra ID≈IAM, RBAC=roles.
2. **Hierarchy** — Management group → Subscription → Resource group → Resource.
3. **IaaS vs PaaS vs SaaS** — Who manages OS/runtime? Drives 80% of "which service" questions.
4. **Private endpoint** — Access PaaS from VNet without public internet.
5. **Reservations** — Predictable workload → save with Reservations.
6. **Tags** — Cost allocation and organization; use with Cost Management.
7. **Defender for Cloud** — Security posture + threat detection; Advisor = recommendations.
8. **No retake cooldown** — Can retake AZ-900 immediately; $99 each attempt.

---

## 📝 Common Red Herrings to Avoid

- **"Azure AD"** is now **Microsoft Entra ID** — same product, name change.
- **"Availability Set"** vs **Availability Zone** — Zones = preferred for new HA; Sets = legacy fault domains.
- **"Advisor"** = recommendations; **"Service Health"** = Azure status; **"Monitor"** = your metrics/logs.
- **"Policy"** = Azure Policy (governance). **"Purview"** = data governance/catalog.
- **"Private endpoint"** = private connectivity to a specific PaaS resource; not "private subnet."
- **"Resource group"** = one resource in one RG (can move); not "one RG per resource type."
- **"Subscription"** = billing boundary; **"Management group"** = hierarchy above subscriptions.
- **LRS vs ZRS vs GRS** — Match scenario: region failure → GRS; AZ failure → ZRS.

---

## 📚 Resources (From Your Grok Plan)

| Resource | Cost | Notes |
|----------|------|--------|
| **Microsoft Learn – Azure Fundamentals** | Free | 6–10 hrs, all exam topics, quizzes |
| **Azure Docs** | Free | docs.microsoft.com/azure – skim for AWS comparisons |
| **Practice assessment (Microsoft)** | Free | learn.microsoft.com – AZ-900 practice |
| **Udemy AZ-900** (e.g., Scott Duffy, Andrew Brown) | ~$10–20 | Videos + practice tests |
| **Whizlabs AZ-900** | ~$19 | 200+ questions + labs |
| **Exam** | **$99** | No cooldown for retakes |

**Your style:** Microsoft Learn + Cursor/reMarkable 2 loop on weak areas (e.g., "Explain Azure AD like IAM"). Target 1–2 weeks with your AWS background.

---

*Last Updated: February 2026 | Skills measured: January 14, 2026*
