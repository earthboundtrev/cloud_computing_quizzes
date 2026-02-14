# OCI Foundations Associate Practice Question Bank

**Exam:** 1Z0-1085-25  
**Source:** Concepts from `oci_foundations_pattern_guide.md`  
**Use:** Self-study, reMarkable export, flashcard-style review

---

## How to Use

1. **Interactive quiz:** Open `oci_foundations_quiz.html` in a browser for a timed, scored quiz.
2. **Self-test:** Cover the answers and try each question before revealing.
3. **Review mode:** Read question → think answer → check → read explanation.
4. **Weak areas:** Note questions you miss and revisit those sections in the pattern guide.

---

## Questions

### Architecture (Getting Started ~15%)

**Q1.** What is the OCI equivalent of an AWS Availability Zone?  
<details><summary>Answer</summary>**Availability Domain (AD)** — Each region has 1-3 ADs; they're physically separate, fault-isolated data centers.</details>

**Q2.** A company needs to subdivide hardware within a single Availability Domain to improve high availability. What OCI concept should they use?  
<details><summary>Answer</summary>**Fault Domains** — Subdivide an AD into groupings of hardware (racks, power) for HA. OCI-only concept.</details>

**Q3.** Which OCI construct is used for both resource organization AND access control?  
<details><summary>Answer</summary>**Compartments** — Logical groupings for organizing resources and controlling IAM. AWS: Organizations + resource groups.</details>

**Q4.** What is the top-level container for all OCI resources?  
<details><summary>Answer</summary>**Tenancy** (or root compartment) — Your Oracle Cloud account.</details>

**Q5.** What does OCI Distributed Cloud include?  
<details><summary>Answer</summary>**Public regions, dedicated regions (customer data centers), and hybrid** — OCI beyond public cloud.</details>

**Q6.** What is the correct hierarchy order in OCI?  
<details><summary>Answer</summary>**Tenancy → Region → Availability Domain → Fault Domain** — Compartments are separate (logical grouping).</details>

---

### Storage

**Q7.** Which service automatically moves Object Storage objects between Standard and Infrequent Access based on usage patterns?  
<details><summary>Answer</summary>**Object Storage Auto-Tiering** — Free; moves objects automatically based on access patterns.</details>

**Q8.** For data that is rarely accessed and must be retained for compliance, which Object Storage tier is best?  
<details><summary>Answer</summary>**Archive** — Coldest tier; 90-day minimum; offline (must restore before access); lowest cost.</details>

**Q9.** Which Object Storage tier has a 31-day minimum retention and retrieval fees?  
<details><summary>Answer</summary>**Infrequent Access** — Cool tier; cheaper storage but retrieval fees apply.</details>

**Q10.** Which OCI storage service provides NFS-compatible shared file storage?  
<details><summary>Answer</summary>**File Storage Service** — Like AWS EFS.</details>

**Q11.** Block Volume in OCI is equivalent to which AWS service?  
<details><summary>Answer</summary>**EBS** — Persistent block storage for compute instances.</details>

**Q12.** Which is true about OCI Object Storage Archive tier?  
<details><summary>Answer</summary>**Data is offline—must restore first (up to 1 hour)** — 90-day minimum retention.</details>

---

### Networking

**Q13.** What is the OCI equivalent of AWS VPC?  
<details><summary>Answer</summary>**VCN (Virtual Cloud Network)** — Logically isolated network with subnets, route tables, gateways.</details>

**Q14.** Oracle recommends which firewall option for new OCI deployments?  
<details><summary>Answer</summary>**NSGs** — More granular than Security Lists; apply to specific VNICs.</details>

**Q15.** A company needs a dedicated private connection from on-premises to OCI. Which service?  
<details><summary>Answer</summary>**FastConnect** — Like AWS Direct Connect.</details>

**Q16.** Private subnet instances need outbound internet access for software updates. Which component?  
<details><summary>Answer</summary>**NAT Gateway** — Allows private resources to initiate outbound connections without inbound exposure.</details>

**Q17.** Security Lists in OCI are applied at which level?  
<details><summary>Answer</summary>**Subnet level** — All VNICs in the subnet share the same security list rules.</details>

**Q18.** OCI subnets are __________ by default, unlike AWS where subnets are AZ-specific.  
<details><summary>Answer</summary>**Regional** — OCI subnets span all ADs in a region by default.</details>

---

### Compute

**Q19.** What type of Compute Instance provides direct access to physical hardware with no hypervisor?  
<details><summary>Answer</summary>**Bare Metal** — OCI differentiator; no virtualization.</details>

**Q20.** Which Compute option allows custom OCPU and memory sizing?  
<details><summary>Answer</summary>**Flexible Shapes** — Choose OCPU and memory independently.</details>

**Q21.** What is the OCI managed Kubernetes service?  
<details><summary>Answer</summary>**OKE (Container Engine for Kubernetes)** — Like AWS EKS.</details>

**Q22.** Which service would you use for serverless, event-driven compute in OCI?  
<details><summary>Answer</summary>**OCI Functions** — Like AWS Lambda.</details>

---

### Database

**Q23.** Which OCI database service is fully self-managing with automatic patching and tuning?  
<details><summary>Answer</summary>**Autonomous Database** — OCI flagship; fully self-managing.</details>

**Q24.** Which OCI database service is like AWS DynamoDB?  
<details><summary>Answer</summary>**NoSQL Database Cloud Service** — Managed NoSQL; key-value and document.</details>

---

### Security & IAM

**Q25.** A Compute Instance needs to call OCI APIs without storing credentials. What should you use?  
<details><summary>Answer</summary>**Dynamic Group** — Like EC2 Instance Roles; resources call OCI APIs without credentials.</details>

**Q26.** Which service automatically records all API calls made in OCI?  
<details><summary>Answer</summary>**Audit** — Like CloudTrail; who, what, when.</details>

**Q27.** Which service detects misconfigured resources and security threats, with optional auto-remediation?  
<details><summary>Answer</summary>**Cloud Guard** — Like GuardDuty + Security Hub.</details>

**Q28.** Where should Cloud Guard be enabled to monitor all compartments?  
<details><summary>Answer</summary>**Tenancy (root) level** — Monitors from root down across all compartments.</details>

**Q29.** What manages encryption keys in OCI?  
<details><summary>Answer</summary>**Vault** — Like AWS KMS; hardware security modules.</details>

**Q30.** Which service stores and can rotate secrets like passwords and API keys?  
<details><summary>Answer</summary>**Vault** — Holds both keys and secrets.</details>

**Q31.** In the OCI Shared Security Model, who is responsible for securing customer data and IAM policies?  
<details><summary>Answer</summary>**Customer** — Oracle secures infrastructure; customer secures data, apps, IAM, network config.</details>

**Q32.** IAM policies in OCI use which structure?  
<details><summary>Answer</summary>**Allow &lt;subject&gt; to &lt;verb&gt; &lt;resource-type&gt; in &lt;location&gt;** — e.g., Allow group X to manage all-resources in compartment Y.</details>

**Q33.** Which AWS service does OCI Audit correspond to?  
<details><summary>Answer</summary>**CloudTrail** — API call tracking.</details>

---

### Governance & Cost

**Q34.** A team wants to visualize costs grouped by compartment and tag. Which tool?  
<details><summary>Answer</summary>**Cost Analysis** — Like Cost Explorer; charts, reports; group by service, tag, compartment.</details>

**Q35.** A team wants to set a spending limit and receive email alerts when 80% is reached. Which tool?  
<details><summary>Answer</summary>**Budgets** — Soft limits + email alerts at % or amount; targets compartments or tags.</details>

**Q36.** Which is an OCI pricing differentiator compared to AWS?  
<details><summary>Answer</summary>**No data egress charges for same-region traffic** — Plus predictable pricing and universal credits.</details>

**Q37.** Budgets in OCI can target which of the following?  
<details><summary>Answer</summary>**Both compartments and tags** — Flexible targeting.</details>

**Q38.** Cost Analysis can group costs by which of the following?  
<details><summary>Answer</summary>**Service, compartment, tag, and SKU** — Multiple dimensions.</details>

**Q39.** Do OCI Budgets block spending when the limit is reached?  
<details><summary>Answer</summary>**No—they are soft limits with alerts only** — Budgets send alerts but do NOT block spending.</details>

**Q40.** What does OCI Always Free Tier provide?  
<details><summary>Answer</summary>**Perpetual free resources for learning** — Compute, storage, DB for small workloads.</details>

---

### AWS Mapping

**Q41.** Which AWS service does OCI FastConnect correspond to?  
<details><summary>Answer</summary>**Direct Connect** — Dedicated private connection.</details>

---

## Quick Reference: Key Mappings

| AWS       | OCI                |
|----------|--------------------|
| VPC      | VCN                |
| AZ       | Availability Domain|
| EBS      | Block Volume       |
| S3       | Object Storage     |
| CloudTrail| Audit             |
| KMS      | Vault              |
| GuardDuty| Cloud Guard        |
| Direct Connect | FastConnect  |

---

*Use with `oci_foundations_pattern_guide.md` for full concepts and decision trees.*
