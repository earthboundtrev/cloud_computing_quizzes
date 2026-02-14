# OCI Foundations Quiz Results

**Date:** 2026-02-11
**Score:** 35/41 (85%)
**Pass:** Yes

---

## Instructions for AI Refactoring

Paste this entire block into a Cursor chat and say:
> "Refactor the OCI quiz based on my mistakes. Add more questions on my weak topics and create a focused retake quiz."

## Misses by Topic

- **Architecture:** 2 missed
- **Governance:** 1 missed
- **Other:** 1 missed
- **Storage:** 1 missed
- **Compute:** 1 missed

## Missed Questions (for AI refactoring)

### 1. [Governance]
**Q:** A team wants to visualize costs grouped by compartment and tag. Which tool?
**Your answer:** Budgets
**Correct answer:** Cost Analysis
**Explanation:** Cost Analysis = Cost Explorer. Charts, reports; group by service, tag, compartment.

### 2. [General]
**Q:** Security Lists in OCI are applied at which level?
**Your answer:** Region level
**Correct answer:** Subnet level
**Explanation:** Security Lists = subnet level; all VNICs in the subnet share the same security list rules.

### 3. [Storage]
**Q:** For data that is rarely accessed and must be retained for compliance, which Object Storage tier is best?
**Your answer:** Infrequent Access
**Correct answer:** Archive
**Explanation:** Archive = coldest tier; 90-day minimum; offline (must restore before access). Lowest cost.

### 4. [Architecture]
**Q:** What is the correct hierarchy order in OCI?
**Your answer:** AD → Region → FD → Compartment
**Correct answer:** Tenancy → Region → AD → FD
**Explanation:** Tenancy (root) → Region → Availability Domain → Fault Domain. Compartments are separate (logical).

### 5. [Compute]
**Q:** Which service would you use for serverless, event-driven compute in OCI?
**Your answer:** Compute Instance
**Correct answer:** OCI Functions
**Explanation:** OCI Functions = Lambda. Serverless, event-driven compute.

### 6. [Architecture]
**Q:** What is the top-level container for all OCI resources?
**Your answer:** Root Compartment
**Correct answer:** Both B and C
**Explanation:** Tenancy = your Oracle Cloud account = root compartment. It's the top-level container.

