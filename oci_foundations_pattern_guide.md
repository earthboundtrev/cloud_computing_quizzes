# OCI Foundations Associate Quick-Reference Pattern Guide

**Exam:** Oracle Cloud Infrastructure 2025 Foundations Associate (1Z0-1085-25)  
**Format:** 40 questions, 60 min, ~65% pass, **Free** (OnVUE at-home)  
**Purpose:** Fast pattern recognition for OCI Foundations questions. When you see these signals, trust your gut.

**AWS SAA Overlap:** ~60%—VCN=VPC, AD=AZ, Security Lists≈SGs. Use your AWS brain, swap the names.

---

## 🎯 Pre-Session Affirmation (Read Before Every Study Burst)

> *"Certs = runway for the drone. Legacy grind ends soon. Freedom first."*

---

## 📋 AWS-to-OCI Quick Reference (Memorize These)

| **AWS** | **OCI** | **Memory Hook** |
|---------|---------|-----------------|
| VPC | VCN (Virtual Cloud Network) | VCN = VPC |
| Availability Zone | Availability Domain (AD) | AD = AZ |
| Security Group / NACL | Security List / NSG | NSG = newer, more granular |
| EC2 | Compute Instance | Same concept |
| EBS | Block Volume | Same concept |
| S3 | Object Storage | Same concept |
| RDS / Aurora | Database Service / Autonomous Database | Autonomous = self-managing |
| DynamoDB | NoSQL Database Cloud Service | Same concept |
| ELB | Load Balancer | Same concept |
| Direct Connect | FastConnect | Same concept |
| CloudTrail | Audit | API call tracking |
| KMS | Vault | Key management |
| GuardDuty / Security Hub | Cloud Guard | Threat detection, posture |
| CloudWatch | Monitoring | Metrics, logs, alarms |
| Cost Explorer | Cost Analysis | Cost tracking |
| Organizations | Compartments | Resource organization + access control |
| *N/A* | **Fault Domain** | OCI-only: HA within an AD |

---

## 🏗️ OCI Architecture Patterns (Getting Started ~15%)

### **Regions & Availability Domains**
**Signal:** "High availability", "data center failure", "fault isolation", "region", "availability"
**Answer:** **Regions** (geographic) → **Availability Domains (ADs)** (independent data centers within region) = like AWS Regions + AZs
**Why:** Each region has 1–3 ADs; ADs are physically separate, fault-isolated
**Gut Check:** Region = geographic. AD = data center within region. AD = AZ.

### **Fault Domains**
**Signal:** "Fault domain", "hardware grouping", "within availability domain", "rack failure"
**Answer:** **Fault Domains** (FDs)
**Why:** Subdivision of an AD—groupings of hardware (racks, power, network) for HA within a single AD
**Gut Check:** AD has multiple FDs; distribute instances across FDs for HA within one AD
**Key Memory:** Fault Domain = OCI-only concept. Think: AD → multiple FDs (like racks). Spread workloads across FDs.

### **Compartments**
**Signal:** "Organize resources", "access control", "billing", "multi-tenant", "department", "project isolation"
**Answer:** **Compartments**
**Why:** Logical groupings for organizing resources and controlling access; hierarchical (root → child compartments)
**Gut Check:** Need to organize/isolate by department/project → Compartments
**Key Memory:** Compartments = AWS Organizations + resource groups. Used for both access control AND organization.

### **Tenancy**
**Signal:** "Root", "top-level", "account", "Oracle Cloud account"
**Answer:** **Tenancy** (root compartment)
**Why:** The top-level container for all OCI resources; your Oracle Cloud account
**Gut Check:** "Your OCI account" = Tenancy

### **OCI Distributed Cloud**
**Signal:** "Distributed cloud", "hybrid", "dedicated", "public cloud", "customer data centers"
**Answer:** **OCI Distributed Cloud**
**Why:** OCI can run in public regions, dedicated regions (customer data centers), or hybrid (on-prem + cloud)
**Gut Check:** OCI beyond public cloud → Distributed Cloud (public, dedicated, hybrid)

### **OCI Architecture Hierarchy**
**⚠️ Critical Order:**
```
Tenancy (root)
  └── Region
        └── Availability Domain (AD)
              └── Fault Domain (FD)
  └── Compartment (logical grouping)
```

---

## 💻 Compute Patterns (Core Services ~50%)

### **Virtual Machines**
**Signal:** "VM", "virtual machine", "compute instance", "run workload"
**Answer:** **Compute Instance** (like EC2)
**Why:** OCI offers both VM and bare metal instances; Flexible Shapes allow custom CPU/memory
**Gut Check:** Need a VM → Compute Instance

### **Bare Metal Instances**
**Signal:** "Bare metal", "no virtualization", "high performance", "legacy app", "direct hardware"
**Answer:** **Bare Metal Compute Instance**
**Why:** Direct access to physical hardware; no hypervisor; OCI differentiator
**Gut Check:** Need raw hardware / no virtualization → Bare Metal

### **Flexible Shapes**
**Signal:** "Custom CPU", "custom memory", "flexible", "right-size", "custom OCPU/memory"
**Answer:** **Flexible Shapes** (AMD or Intel)
**Why:** Choose OCPU and memory independently; pay for what you need
**Gut Check:** Need custom sizing → Flexible Shape

### **Container / Kubernetes**
**Signal:** "Kubernetes", "containers", "managed K8s"
**Answer:** **Container Engine for Kubernetes (OKE)**
**Why:** OCI's managed Kubernetes service (like EKS)
**Gut Check:** K8s/containers → OKE

### **Serverless Compute**
**Signal:** "Serverless", "event-driven", "no infrastructure", "Functions"
**Answer:** **OCI Functions**
**Why:** Serverless compute (like Lambda); event-driven execution
**Gut Check:** Serverless → Functions

---

## 📦 Storage Patterns (Core Services)

### **Block Storage**
**Signal:** "Block storage", "boot volume", "attach to instance", "persistent disk", "database storage"
**Answer:** **Block Volume** (like EBS)
**Why:** Persistent block storage for compute instances; boot volumes + block volumes
**Gut Check:** Need disk attached to VM → Block Volume

### **Object Storage - Standard Tier**
**Signal:** "Frequently accessed", "hot data", "immediate access", "default"
**Answer:** **Object Storage - Standard Tier**
**Why:** Primary tier for hot data; highest cost, no retrieval fees, no minimum retention
**Gut Check:** Hot/frequently accessed → Standard

### **Object Storage - Infrequent Access**
**Signal:** "Infrequently accessed", "cool data", "cost-effective", "31-day minimum"
**Answer:** **Object Storage - Infrequent Access Tier**
**Why:** Cheaper than Standard; 31-day minimum retention; retrieval fees apply
**Gut Check:** Cool/infrequent → Infrequent Access (like S3 IA)

### **Object Storage - Archive Tier**
**Signal:** "Archive", "cold", "rarely accessed", "90-day minimum", "long-term", "compliance"
**Answer:** **Object Storage - Archive Tier**
**Why:** Lowest cost; 90-day minimum; offline—must restore before access (up to 1 hour)
**Gut Check:** Cold/archive → Archive (like Glacier)

### **Auto-Tiering**
**Signal:** "Automatically move", "usage patterns", "reduce cost", "no manual"
**Answer:** **Object Storage Auto-Tiering**
**Why:** Automatically moves objects between Standard and Infrequent Access based on access patterns; free
**Gut Check:** Automatic cost optimization for Object Storage → Auto-Tiering

### **File Storage**
**Signal:** "NFS", "shared file", "multiple instances", "file share"
**Answer:** **File Storage Service** (like EFS)
**Why:** NFS-compatible shared file storage
**Gut Check:** Shared file system → File Storage Service

---

## 🌐 Networking Patterns (Core Services)

### **Virtual Cloud Network**
**Signal:** "Network", "isolated", "VPC", "private network"
**Answer:** **VCN (Virtual Cloud Network)** = AWS VPC
**Why:** Logically isolated network; contains subnets, route tables, gateways
**Gut Check:** Need a cloud network → VCN

### **Subnets**
**Signal:** "Subnet", "public", "private", "IP range"
**Answer:** **Subnets** (within VCN)
**Why:** OCI subnets are **regional** by default (span all ADs in region)—unlike AWS where subnets are AZ-specific
**Gut Check:** Regional subnets = OCI default. Can optionally create AD-specific subnets.

### **Security Lists**
**Signal:** "Firewall", "traffic control", "subnet-level", "ingress/egress"
**Answer:** **Security Lists**
**Why:** Virtual firewall at subnet level; stateful or stateless rules; applied to all VNICs in subnet
**Gut Check:** Subnet-level firewall → Security Lists (like SGs + NACLs combined)

### **Network Security Groups (NSGs)**
**Signal:** "Granular", "instance-level", "flexible", "recommended", "specific VNICs"
**Answer:** **Network Security Groups (NSGs)** (recommended over Security Lists)
**Why:** Apply to specific VNICs; more flexible; Oracle recommends NSGs for new deployments
**Gut Check:** Need granular/flexible firewall → NSGs

### **Security Lists vs NSGs**
**⚠️ Critical Distinction:**
- **Security Lists** = Subnet-level; all VNICs in subnet share same rules
- **NSGs** = Apply to specific VNICs; more granular; recommended for new workloads
- **Use Both:** Can use both; rules are additive

### **Load Balancer**
**Signal:** "Load balance", "traffic distribution", "Layer 4", "Layer 7", "SSL termination"
**Answer:** **Load Balancer**
**Why:** Supports Layer 4 and Layer 7; flexible shapes (pay for bandwidth); built-in SSL termination
**Gut Check:** Need to distribute traffic → Load Balancer (like ELB)

### **Internet Gateway**
**Signal:** "Public internet", "internet access", "bidirectional"
**Answer:** **Internet Gateway**
**Why:** Allows traffic between VCN and internet
**Gut Check:** Public subnet internet → Internet Gateway

### **NAT Gateway**
**Signal:** "Outbound only", "private subnet internet", "no inbound"
**Answer:** **NAT Gateway**
**Why:** Allows private resources to initiate outbound connections without inbound exposure
**Gut Check:** Private subnet needs outbound internet → NAT Gateway

### **FastConnect**
**Signal:** "Dedicated", "private connection", "on-premises", "hybrid"
**Answer:** **FastConnect** (like Direct Connect)
**Why:** Dedicated private connection from on-premises to OCI
**Gut Check:** Dedicated hybrid connection → FastConnect

### **VPN**
**Signal:** "VPN", "encrypted", "temporary", "cost-effective", "over internet"
**Answer:** **Site-to-Site VPN** or **Remote VCN Peering**
**Why:** Encrypted connection over public internet
**Gut Check:** VPN over internet → Site-to-Site VPN

---

## 🗄️ Database Patterns (Core Services)

### **Fully Managed Relational**
**Signal:** "Fully managed", "self-managing", "automatic patching", "automatic tuning", "Oracle/MySQL/PostgreSQL"
**Answer:** **Autonomous Database**
**Why:** OCI flagship—fully self-managing; automatic tuning, patching, scaling; Transaction Processing or Data Warehouse workloads
**Gut Check:** "Self-managing" or "autonomous" → Autonomous Database (like Aurora but more automated)

### **Managed Relational (Traditional)**
**Signal:** "Oracle", "MySQL", "PostgreSQL", "managed database", "not autonomous"
**Answer:** **Database Service** (Base Database Service)
**Why:** Managed Oracle, MySQL, PostgreSQL; you manage more than Autonomous
**Gut Check:** Traditional managed RDBMS → Database Service (like RDS)

### **NoSQL**
**Signal:** "NoSQL", "key-value", "document", "flexible schema"
**Answer:** **NoSQL Database Cloud Service** (like DynamoDB)
**Why:** Managed NoSQL; key-value and document models
**Gut Check:** NoSQL → NoSQL Database Cloud Service

---

## 🔒 Security & IAM Patterns (Security ~25%)

### **Shared Security Model**
**Signal:** "Shared responsibility", "Oracle responsibility", "customer responsibility"
**Answer:** **OCI Shared Security Model**
**Why:** Oracle secures infrastructure; customer secures their data, apps, IAM, network config
**Gut Check:** "Who is responsible for what" → Shared Security Model

### **IAM - Users & Groups**
**Signal:** "User", "group", "identity", "human user"
**Answer:** **IAM Users** and **IAM Groups**
**Why:** Users = identities; Groups = collection of users for policy attachment
**Gut Check:** Human access → IAM User + Group

### **IAM - Policies**
**Signal:** "Policy", "permissions", "allow/deny", "resource access"
**Answer:** **IAM Policies** (written in policy language)
**Why:** Attach to groups, compartments, or tenancy; define who can do what
**Gut Check:** Define permissions → IAM Policy

### **IAM - Dynamic Groups**
**Signal:** "Compute instance", "Functions", "resource accessing OCI", "no credentials"
**Answer:** **Dynamic Groups** (like EC2 Instance Roles)
**Why:** Allow *resources* (instances, Functions) to call OCI APIs without stored credentials
**Gut Check:** Instance/Function needs OCI access → Dynamic Group + policy

### **IAM - Policy Syntax**
**Signal:** "Policy statement", "allow", "inspect", "read", "manage"
**Answer:** Policy structure: `Allow <subject> to <verb> <resource-type> in <location>`
**Why:** OCI uses declarative policy language
**Gut Check:** `Allow group X to manage all-resources in compartment Y`

### **Encryption - Key Management**
**Signal:** "Encryption", "keys", "KMS", "key management", "HSM"
**Answer:** **Vault** (like KMS)
**Why:** Hardware security modules; create/manage encryption keys; integrates with OCI services
**Gut Check:** Need encryption keys → Vault

### **Secrets Management**
**Signal:** "Secrets", "passwords", "API keys", "rotate"
**Answer:** **Vault** (Secrets) or **OCI Secrets**
**Why:** Store and rotate secrets; Vault holds both keys and secrets
**Gut Check:** Store/rotate secrets → Vault Secrets

### **API Call Auditing**
**Signal:** "API calls", "who did what", "when", "audit", "track actions"
**Answer:** **Audit** (like CloudTrail)
**Why:** Automatically records all API calls; time, source, target, action, response
**Gut Check:** Track API activity → Audit

### **Security Posture & Threat Detection**
**Signal:** "Security posture", "misconfigured", "threat detection", "remediation", "compliance monitoring"
**Answer:** **Cloud Guard** (like GuardDuty + Security Hub)
**Why:** Detects misconfigurations and threats; built-in detector recipes; can auto-remediate
**Gut Check:** Security monitoring/remediation → Cloud Guard

### **Cloud Guard - Enable Scope**
**Signal:** "Enable Cloud Guard", "root", "all compartments"
**Answer:** Enable at **tenancy (root) level** to monitor all compartments
**Why:** Cloud Guard monitors from root down; enable once for full visibility
**Gut Check:** Cloud Guard = enable at root for entire tenancy

---

## 💰 Governance & Cost Patterns (Governance ~10%)

### **Track & Analyze Costs**
**Signal:** "Track costs", "cost by service", "cost by compartment", "cost by tag", "visualize spending"
**Answer:** **Cost Analysis** (like Cost Explorer)
**Why:** Charts, reports; group by service, tag, compartment; filter and estimate
**Gut Check:** View/analyze costs → Cost Analysis

### **Set Spending Limits**
**Signal:** "Budget", "spending limit", "alert", "forecast", "overspend"
**Answer:** **Budgets**
**Why:** Soft limits on spending; email alerts at % or amount; by compartment or tag
**Gut Check:** Set budget + alerts → Budgets

### **Budgets - Scope**
**Signal:** "Budget target", "compartment", "tag"
**Answer:** Budgets apply to **compartments** (including child) or **tags**
**Why:** Flexible targeting; track department (compartment) or project (tag)
**Gut Check:** Budget by org unit → Compartment. Budget by project → Tag.

### **Cost Tracking Tags**
**Signal:** "Tag", "cost allocation", "track by project", "group costs"
**Answer:** **Tags** (Cost Analysis supports all tags)
**Why:** Tag resources; Cost Analysis groups by tag; Budgets can target tags
**Gut Check:** Organize costs by project/dept → Tags + Cost Analysis

### **OCI Pricing Model**
**Signal:** "Predictable", "no egress", "same region", "universal credits"
**Answer:** **OCI Pricing Model** differentiators
**Why:** No data egress charges for same-region traffic; predictable pricing; universal credits
**Gut Check:** OCI cost advantage = no same-region egress; predictable; universal credits

### **Free Tier**
**Signal:** "Always free", "free tier", "no cost"
**Answer:** **OCI Always Free Tier**
**Why:** Perpetual free resources (compute, storage, DB) for learning and small workloads
**Gut Check:** Free resources → Always Free Tier

---

## 🎯 Quick Decision Trees

### **Architecture Decision Tree**
```
Region/geographic? → Region
Data center within region? → Availability Domain (AD)
Hardware grouping within AD? → Fault Domain
Organize resources/access? → Compartments
```

### **Storage Tier Decision Tree**
```
Hot/frequently accessed? → Object Storage Standard
Cool/infrequently accessed? → Infrequent Access (31-day min)
Cold/archive? → Archive (90-day min, offline)
Automate cost optimization? → Auto-Tiering
```

### **Networking Decision Tree**
```
Need cloud network? → VCN
Subnet-level firewall? → Security Lists
Granular/flexible firewall? → NSGs
Public internet? → Internet Gateway
Private outbound only? → NAT Gateway
Dedicated hybrid? → FastConnect
```

### **Security Decision Tree**
```
Track API calls? → Audit
Security posture/threats? → Cloud Guard
Encryption keys? → Vault
Secrets? → Vault Secrets
Resource needs OCI access? → Dynamic Group
```

### **Governance Decision Tree**
```
View/analyze costs? → Cost Analysis
Set spending limits + alerts? → Budgets
Organize costs? → Tags
```

---

## 🧠 Exam Strategy Reminders

1. **VCN = VPC, AD = AZ** — Your AWS brain works here; swap the names.
2. **Compartments** — OCI-specific; used for both organization AND access control.
3. **Fault Domains** — OCI-only; subdivide AD for HA.
4. **Autonomous Database** — OCI flagship; "self-managing" = Autonomous.
5. **NSGs over Security Lists** — Oracle recommends NSGs for new deployments.
6. **Cloud Guard at root** — Enable at tenancy level to monitor all compartments.
7. **Cost Analysis vs Budgets** — Analysis = view. Budgets = limits + alerts.
8. **No same-region egress** — OCI pricing differentiator.

---

## 📝 Common Red Herrings to Avoid

- **"Security List" vs "NSG"** — Both exist; NSG = more granular, recommended.
- **"Subnet"** — OCI subnets are regional by default (span ADs); AWS subnets are AZ-specific.
- **"Compartments"** — Not just for organization; also for IAM and budgets.
- **"Audit"** = API calls (like CloudTrail). **"Cloud Guard"** = posture + threats (like GuardDuty).
- **"Autonomous"** — Always means Autonomous Database (self-managing).
- **"Budget"** — Soft limit + alerts; does not block spending.
- **"Cost Analysis"** — Read-only; does not set limits.
- **"Fault Domain"** — Within an AD; not the same as AD.
- **"Bare Metal"** — OCI differentiator; no virtualization.

---

## 📚 Resources (From Your Grok Plan)

- **Oracle MyLearn** — Free: "OCI Foundations Associate" (mylearn.oracle.com)
- **OCI Documentation** — docs.oracle.com/en-us/iaas/
- **Practice Tests** — Whizlabs/Udemy OCI Foundations, Oracle free practice exam
- **Your Stack** — reMarkable 2, Cursor/Claude for brain-dump loops

---

*Last Updated: February 2026 | Target Exam: 1Z0-1085-25*
