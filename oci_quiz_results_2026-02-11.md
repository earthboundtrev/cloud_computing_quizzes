# OCI Foundations Quiz Results

**Date:** 2026-02-11
**Score:** 27/41 (66%)
**Pass:** Yes

---

## Instructions for AI Refactoring

Paste this entire block into a Cursor chat and say:
> "Refactor the OCI quiz based on my mistakes. Add more questions on my weak topics and create a focused retake quiz."

## Misses by Topic

- **Architecture:** 3 missed
- **Security:** 3 missed
- **Storage:** 2 missed
- **Other:** 2 missed
- **Governance:** 2 missed
- **Networking:** 1 missed
- **Compute:** 1 missed

## Missed Questions (for AI refactoring)

### 1. [Storage]
**Q:** For data that is rarely accessed and must be retained for compliance, which Object Storage tier is best?
**Your answer:** Infrequent Access
**Correct answer:** Archive
**Explanation:** Archive = coldest tier; 90-day minimum; offline (must restore before access). Lowest cost.

### 2. [Architecture]
**Q:** What is the correct hierarchy order in OCI?
**Your answer:** Region → Tenancy → AD → FD
**Correct answer:** Tenancy → Region → AD → FD
**Explanation:** Tenancy (root) → Region → Availability Domain → Fault Domain. Compartments are separate (logical).

### 3. [General]
**Q:** Security Lists in OCI are applied at which level?
**Your answer:** Instance (VNIC) level
**Correct answer:** Subnet level
**Explanation:** Security Lists = subnet level; all VNICs in the subnet share the same security list rules.

### 4. [Governance]
**Q:** A team wants to visualize costs grouped by compartment and tag. Which tool?
**Your answer:** Budgets
**Correct answer:** Cost Analysis
**Explanation:** Cost Analysis = Cost Explorer. Charts, reports; group by service, tag, compartment.

### 5. [Architecture]
**Q:** A company needs to subdivide hardware within a single Availability Domain to improve high availability. What OCI concept should they use?
**Your answer:** Compartments
**Correct answer:** Fault Domains
**Explanation:** Fault Domains subdivide an AD—groupings of hardware (racks, power) for HA within one AD. OCI-only concept.

### 6. [Networking]
**Q:** OCI subnets are __________ by default, unlike AWS where subnets are AZ-specific.
**Your answer:** compartment-scoped
**Correct answer:** regional
**Explanation:** OCI subnets span all ADs in a region by default. AWS subnets are tied to one AZ.

### 7. [General]
**Q:** OCI Distributed Cloud includes which deployment options?
**Your answer:** Edge only
**Correct answer:** Public, dedicated (customer DC), and hybrid
**Explanation:** OCI Distributed Cloud = public regions, dedicated regions (in customer DCs), and hybrid.

### 8. [Storage]
**Q:** Which is true about OCI Object Storage Archive tier?
**Your answer:** Immediate access like Standard
**Correct answer:** Data is offline—must restore first (up to 1 hour)
**Explanation:** Archive = offline. Must restore before access; can take up to 1 hour. 90-day minimum.

### 9. [Security]
**Q:** IAM policies in OCI use which structure?
**Your answer:** JSON only
**Correct answer:** Allow <subject> to <verb> <resource-type> in <location>
**Explanation:** OCI policy: Allow group X to manage all-resources in compartment Y.

### 10. [Compute]
**Q:** Which service would you use for serverless, event-driven compute in OCI?
**Your answer:** Compute Instance
**Correct answer:** OCI Functions
**Explanation:** OCI Functions = Lambda. Serverless, event-driven compute.

### 11. [Governance]
**Q:** Do OCI Budgets block spending when the limit is reached?
**Your answer:** Yes, spending stops automatically
**Correct answer:** No, they are soft limits with alerts only
**Explanation:** Budgets = soft limits. They send alerts but do NOT block spending.

### 12. [Security]
**Q:** In the OCI Shared Security Model, who is responsible for securing customer data and IAM policies?
**Your answer:** Customer only
**Correct answer:** Shared—customer secures data/apps/IAM
**Explanation:** Customer secures: data, apps, IAM, network config. Oracle secures: infrastructure.

### 13. [Security]
**Q:** A Compute Instance needs to call OCI APIs (e.g., Object Storage) without storing credentials. What should you use?
**Your answer:** IAM User with access keys
**Correct answer:** Dynamic Group
**Explanation:** Dynamic Groups = like EC2 Instance Roles. Allow resources (instances, Functions) to call OCI APIs without credentials.

### 14. [Architecture]
**Q:** What is the top-level container for all OCI resources?
**Your answer:** Root Compartment
**Correct answer:** Both B and C
**Explanation:** Tenancy = your Oracle Cloud account = root compartment. It's the top-level container.

