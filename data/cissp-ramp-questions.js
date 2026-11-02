/**
 * CISSP ramp pack — manager-judgment items with obj/level/ref (#15).
 * Exam outline effective April 15, 2024 (8 domains).
 */
window.QUESTION_BANK_CISSP_RAMP = [
  {
    "id": "cissp-ramp-001",
    "mode": "exam",
    "topic": "Security Operations",
    "obj": "7",
    "level": 4,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "q": "As CISO, a developer laptop with cached production DB credentials was stolen while in sleep mode. FDE is enabled. What should you do FIRST?",
    "options": [
      "Notify regulators immediately — not the best managerial choice here",
      "Revoke and rotate the cached credentials and related access",
      "Begin imaging the laptop at the employee's home — not the best managerial choice here",
      "Publish an updated acceptable-use policy — not the best managerial choice here"
    ],
    "correct": 1,
    "explain": "Containment first: credentials may still be reachable if the device was sleeping. Notification depends on confirmed impact; policy updates are later. NIST SP 800-61 emphasizes containment before external comms."
  },
  {
    "id": "cissp-ramp-002",
    "mode": "exam",
    "topic": "Security Architecture",
    "obj": "3",
    "level": 4,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "q": "A contractor cleared for SECRET must read UNCLASSIFIED data but must not write SECRET into lower levels. Which model property applies?",
    "options": [
      "Biba *-property (no write up) — not the best managerial choice here",
      "Bell-LaPadula *-property (no write down)",
      "Clark-Wilson well-formed transactions — not the best managerial choice here",
      "Brewer-Nash conflict rules only — not the best managerial choice here"
    ],
    "correct": 1,
    "explain": "Bell-LaPadula *-property prevents writing high data to lower levels. Biba addresses integrity in the opposite direction. Clark-Wilson and Brewer-Nash cover integrity and dynamic separation of duty."
  },
  {
    "id": "cissp-ramp-003",
    "mode": "exam",
    "topic": "Security Architecture",
    "obj": "3",
    "level": 4,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "q": "Which property prevents a user from reading data classified above their clearance?",
    "options": [
      "Simple security property (no read up)",
      "Star property (no write down)",
      "Simple integrity property (no read down)",
      "Discretionary access control only"
    ],
    "correct": 0,
    "explain": "Bell-LaPadula simple security = no read up. *-property = no write down. Biba simple integrity = no read down (integrity)."
  },
  {
    "id": "cissp-ramp-004",
    "mode": "exam",
    "topic": "Security Architecture",
    "obj": "3",
    "level": 3,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "q": "Biba model primarily protects:",
    "options": [
      "Confidentiality of classified data — not the best managerial choice here",
      "Integrity of data at various levels",
      "Availability during DDoS — not the best managerial choice here",
      "Non-repudiation of transactions — not the best managerial choice here"
    ],
    "correct": 1,
    "explain": "Biba focuses on integrity (no read down / no write up). Bell-LaPadula focuses on confidentiality."
  },
  {
    "id": "cissp-ramp-005",
    "mode": "exam",
    "topic": "IAM",
    "obj": "5",
    "level": 4,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "q": "Your SaaS app must let customers log in with their corporate IdP and receive OAuth tokens for API access. What is the BEST federation pattern?",
    "options": [
      "SAML for web SSO plus OAuth 2.0 / OIDC for delegated API authorization",
      "Kerberos tickets for browser SaaS only — not the best managerial choice here",
      "Shared local accounts per customer — not the best managerial choice here",
      "LDAP bind with cleartext password reuse — not the best managerial choice here"
    ],
    "correct": 0,
    "explain": "SAML/OIDC commonly federate identity; OAuth 2.0 delegates authorization to APIs. Kerberos is rarely end-user SaaS in browsers; shared accounts violate least privilege."
  },
  {
    "id": "cissp-ramp-006",
    "mode": "exam",
    "topic": "IAM",
    "obj": "5",
    "level": 3,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "q": "In OAuth 2.0, which role requests access on behalf of the resource owner?",
    "options": [
      "Authorization server",
      "Resource server",
      "Client application",
      "Relying party only"
    ],
    "correct": 2,
    "explain": "Client requests tokens; authorization server issues them; resource server hosts APIs. Relying party often describes SAML SP."
  },
  {
    "id": "cissp-ramp-007",
    "mode": "exam",
    "topic": "Security and Risk Management",
    "obj": "1",
    "level": 4,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "q": "Due diligence is BEST described as:",
    "options": [
      "Establishing plans, policies, and processes to protect the organization",
      "Performing daily patching activities — not the best managerial choice here",
      "Investigating fraud during mandatory vacation — not the best managerial choice here",
      "Buying cyber insurance — not the best managerial choice here"
    ],
    "correct": 0,
    "explain": "Due diligence = planning and governance. Due care = executing those activities. OSG 10th ed. Ch. 1 definitions."
  },
  {
    "id": "cissp-ramp-008",
    "mode": "exam",
    "topic": "Security and Risk Management",
    "obj": "1",
    "level": 4,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "q": "Monthly patching per security policy is an example of:",
    "options": [
      "Due diligence",
      "Due care",
      "Risk transference",
      "Quantitative risk only"
    ],
    "correct": 1,
    "explain": "Policy sets expectation (diligence); applying patches is ongoing practice (care)."
  },
  {
    "id": "cissp-ramp-009",
    "mode": "exam",
    "topic": "Security and Risk Management",
    "obj": "1",
    "level": 4,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "q": "A EU subsidiary processes personal data of EU residents. Which framework is MOST relevant for lawful processing requirements?",
    "options": [
      "GDPR",
      "HIPAA only",
      "PCI DSS only",
      "FedRAMP only"
    ],
    "correct": 0,
    "explain": "GDPR governs EU personal data. HIPAA is US health; PCI is payment cards; FedRAMP is US cloud authorization."
  },
  {
    "id": "cissp-ramp-010",
    "mode": "exam",
    "topic": "Asset Security",
    "obj": "2",
    "level": 4,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "q": "As data owner, you must label a dataset with customer PII used for marketing. Who is MOST responsible for classification?",
    "options": [
      "Network team — not the best managerial choice here",
      "Business/data owner with legal input",
      "Pen tester — not the best managerial choice here",
      "Facilities — not the best managerial choice here"
    ],
    "correct": 1,
    "explain": "Owners classify based on business impact; security advises; IT implements controls."
  },
  {
    "id": "cissp-ramp-011",
    "mode": "exam",
    "topic": "Network Security",
    "obj": "4",
    "level": 3,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "q": "802.1X authenticator role is performed by:",
    "options": [
      "Supplicant on the laptop — not the best managerial choice here",
      "Switch or AP enforcing port access",
      "RADIUS server only — not the best managerial choice here",
      "DNS resolver — not the best managerial choice here"
    ],
    "correct": 1,
    "explain": "Authenticator controls port; supplicant is client; authentication server validates credentials."
  },
  {
    "id": "cissp-ramp-012",
    "mode": "exam",
    "topic": "Security Assessment",
    "obj": "6",
    "level": 4,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "q": "After a major release, leadership wants assurance controls work as designed. What assessment is MOST appropriate?",
    "options": [
      "Vulnerability scan only — not the best managerial choice here",
      "Control validation / audit against requirements",
      "Social engineering only — not the best managerial choice here",
      "Delete logs to save space — not the best managerial choice here"
    ],
    "correct": 1,
    "explain": "Assessment validates control effectiveness; vuln scans find flaws but do not alone prove control design."
  },
  {
    "id": "cissp-ramp-013",
    "mode": "exam",
    "topic": "Software Development",
    "obj": "8",
    "level": 4,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "q": "Developers push code daily. What is the BEST security control in the pipeline?",
    "options": [
      "Annual manual review only — not the best managerial choice here",
      "Automated SAST/DAST gates before production deploy",
      "Disable code signing — not the best managerial choice here",
      "Shared production DB credentials in repo — not the best managerial choice here"
    ],
    "correct": 1,
    "explain": "DevSecOps integrates automated testing in CI/CD; annual-only review is too slow."
  },
  {
    "id": "cissp-ramp-014",
    "mode": "exam",
    "topic": "Security Operations",
    "obj": "7",
    "level": 4,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "q": "Ransomware is spreading laterally. What is the BEST immediate action?",
    "options": [
      "Pay ransom to stop encryption — not the best managerial choice here",
      "Isolate affected network segments and preserve evidence",
      "Reimage all assets without logging — not the best managerial choice here",
      "Disable all backups — not the best managerial choice here"
    ],
    "correct": 1,
    "explain": "Containment limits spread; evidence supports investigation; payment is last resort."
  },
  {
    "id": "cissp-ramp-015",
    "mode": "exam",
    "topic": "Security and Risk Management",
    "obj": "1",
    "level": 4,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "q": "Quantitative risk analysis MOST directly produces:",
    "options": [
      "ALE and financial impact estimates",
      "Heat map colors only — not the best managerial choice here",
      "Policy statements — not the best managerial choice here",
      "Org chart changes — not the best managerial choice here"
    ],
    "correct": 0,
    "explain": "Quantitative uses SLE, ARO, ALE. Qualitative uses scales and matrices."
  },
  {
    "id": "cissp-ramp-016",
    "mode": "exam",
    "topic": "Security Architecture",
    "obj": "3",
    "level": 3,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "q": "Clark-Wilson model emphasizes:",
    "options": [
      "Well-formed transactions and separation of duties",
      "No read up in MAC — not the best managerial choice here",
      "Ticket-based SSO — not the best managerial choice here",
      "Port-based NAC — not the best managerial choice here"
    ],
    "correct": 0,
    "explain": "Clark-Wilson protects integrity via constrained interfaces and separation of duties."
  },
  {
    "id": "cissp-ramp-017",
    "mode": "exam",
    "topic": "IAM",
    "obj": "5",
    "level": 3,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "q": "Kerberos TGT is issued by:",
    "options": [
      "Ticket Granting Service only — not the best managerial choice here",
      "Authentication Service (part of KDC)",
      "End workstation — not the best managerial choice here",
      "Database admin — not the best managerial choice here"
    ],
    "correct": 1,
    "explain": "AS validates user; TGS issues service tickets using TGT."
  },
  {
    "id": "cissp-ramp-018",
    "mode": "exam",
    "topic": "Network Security",
    "obj": "4",
    "level": 4,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "q": "Remote workers need encrypted tunnel to HQ with mutual authentication. BEST choice?",
    "options": [
      "IPsec VPN or TLS VPN with MFA",
      "Telnet with MAC filtering — not the best managerial choice here",
      "FTP over port 80 — not the best managerial choice here",
      "Open guest Wi‑Fi — not the best managerial choice here"
    ],
    "correct": 0,
    "explain": "VPNs protect confidentiality/integrity in transit; MFA strengthens authentication."
  },
  {
    "id": "cissp-ramp-019",
    "mode": "exam",
    "topic": "Security Operations",
    "obj": "7",
    "level": 4,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "q": "During IR, legal asks for log retention proof. Which artifact BEST supports chain of custody?",
    "options": [
      "Unsigned copy on USB — not the best managerial choice here",
      "Timestamped hash-verified evidence log with handler identity",
      "Verbal confirmation — not the best managerial choice here",
      "Deleted originals to save space — not the best managerial choice here"
    ],
    "correct": 1,
    "explain": "Chain of custody documents who handled evidence when; hashes prove integrity."
  },
  {
    "id": "cissp-ramp-020",
    "mode": "exam",
    "topic": "Software Development",
    "obj": "8",
    "level": 4,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "q": "A library has a critical CVE but no patch exists. BEST short-term mitigation?",
    "options": [
      "Ignore because production is busy — not the best managerial choice here",
      "Compensating controls: WAF rules, disable feature, network segmentation",
      "Remove all logging — not the best managerial choice here",
      "Share admin passwords for speed — not the best managerial choice here"
    ],
    "correct": 1,
    "explain": "Compensating controls reduce exposure until vendor fix; ignoring increases risk."
  },
  {
    "id": "cissp-ramp-021",
    "mode": "exam",
    "topic": "Security and Risk Management",
    "obj": "1",
    "level": 3,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "q": "Transferring risk to an insurer is an example of:",
    "options": [
      "Risk mitigation",
      "Risk transference",
      "Risk avoidance",
      "Risk acceptance only"
    ],
    "correct": 1,
    "explain": "Insurance transfers financial impact; mitigation reduces likelihood/impact; avoidance eliminates activity."
  },
  {
    "id": "cissp-ramp-022",
    "mode": "exam",
    "topic": "Asset Security",
    "obj": "2",
    "level": 3,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "q": "Data retention policy should be driven PRIMARILY by:",
    "options": [
      "Backup software defaults — not the best managerial choice here",
      "Legal/regulatory and business requirements",
      "Disk vendor marketing — not the best managerial choice here",
      "Random audit sampling only — not the best managerial choice here"
    ],
    "correct": 1,
    "explain": "Retention aligns to legal holds, regulations, and business need; custodians implement."
  },
  {
    "id": "cissp-ramp-023",
    "mode": "exam",
    "topic": "Security Assessment",
    "obj": "6",
    "level": 3,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "q": "Penetration test scope disagreements arise. Who should approve scope and rules of engagement FIRST?",
    "options": [
      "Junior analyst — not the best managerial choice here",
      "Management / system owners with legal",
      "External media — not the best managerial choice here",
      "Help desk — not the best managerial choice here"
    ],
    "correct": 1,
    "explain": "ROE needs owner approval to avoid outage and legal issues; management accepts risk."
  },
  {
    "id": "cissp-ramp-024",
    "mode": "exam",
    "topic": "Security Architecture",
    "obj": "3",
    "level": 4,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "q": "A system fails closed on authentication errors. This supports:",
    "options": [
      "Availability over confidentiality — not the best managerial choice here",
      "Confidentiality/secure default on failure",
      "Non-repudiation only — not the best managerial choice here",
      "Eliminating MFA — not the best managerial choice here"
    ],
    "correct": 1,
    "explain": "Fail secure denies access when controls fail; fail open favors availability."
  },
  {
    "id": "cissp-ramp-025",
    "mode": "exam",
    "topic": "IAM",
    "obj": "5",
    "level": 4,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "q": "Privileged admins must access prod rarely with session recording. BEST approach?",
    "options": [
      "Shared break-glass password posted in chat",
      "PAM with just-in-time elevation and MFA",
      "Disable auditing for speed",
      "Local admin on every server permanently"
    ],
    "correct": 1,
    "explain": "PAM enforces least privilege, session monitoring, and approval workflows."
  },
  {
    "id": "cissp-ramp-026",
    "mode": "exam",
    "topic": "Network Security",
    "obj": "4",
    "level": 3,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "q": "Zero trust MOST emphasizes:",
    "options": [
      "Implicit trust inside the corporate LAN — not the best managerial choice here",
      "Verify explicitly for every access decision",
      "Single perimeter firewall only — not the best managerial choice here",
      "Disabling encryption for latency — not the best managerial choice here"
    ],
    "correct": 1,
    "explain": "Zero trust assumes breach; continuous verification, micro-segmentation, least privilege."
  },
  {
    "id": "cissp-ramp-027",
    "mode": "exam",
    "topic": "Security Operations",
    "obj": "7",
    "level": 4,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "q": "BCP activation criteria should be defined by:",
    "options": [
      "Individual analyst preference — not the best managerial choice here",
      "Predefined metrics and leadership decision per BCP",
      "Social media trends — not the best managerial choice here",
      "Vendor sales rep — not the best managerial choice here"
    ],
    "correct": 1,
    "explain": "BCP triggers and roles are pre-documented; leadership declares activation."
  },
  {
    "id": "cissp-ramp-028",
    "mode": "exam",
    "topic": "Software Development",
    "obj": "8",
    "level": 3,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "q": "Threat modeling in SDLC is BEST performed:",
    "options": [
      "After production breach only — not the best managerial choice here",
      "Early design phase and updated on major changes",
      "Never for agile teams — not the best managerial choice here",
      "Only by legal — not the best managerial choice here"
    ],
    "correct": 1,
    "explain": "Shift-left threat modeling informs architecture; update when features change."
  },
  {
    "id": "cissp-ramp-029",
    "mode": "exam",
    "topic": "Security and Risk Management",
    "obj": "1",
    "level": 4,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "q": "As risk manager, a vendor lacks SOC 2 but is critical. BEST due diligence step before contract?",
    "options": [
      "Skip review to meet deadline — not the best managerial choice here",
      "Third-party risk assessment and contractual security requirements",
      "Share all customer data for testing — not the best managerial choice here",
      "Verbal assurance only — not the best managerial choice here"
    ],
    "correct": 1,
    "explain": "Vendor due diligence evaluates controls; contracts define SLAs, breach notification, audit rights."
  },
  {
    "id": "cissp-ramp-030",
    "mode": "exam",
    "topic": "Asset Security",
    "obj": "2",
    "level": 4,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "q": "Sanitization before disposing of leased storage arrays requires:",
    "options": [
      "Quick format only — not the best managerial choice here",
      "Media sanitization per NIST SP 800-88 appropriate to classification",
      "Removing labels — not the best managerial choice here",
      "Shipping to recycler without wiping — not the best managerial choice here"
    ],
    "correct": 1,
    "explain": "800-88 defines clear/purge/destroy based on data sensitivity and media type."
  },
  {
    "id": "cissp-ramp-031",
    "mode": "exam",
    "topic": "Security Assessment",
    "obj": "6",
    "level": 3,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "q": "What is the PRIMARY difference between vulnerability scan and penetration test?",
    "options": [
      "Scan actively exploits all paths; pen test only lists versions — not the best managerial choice here",
      "Scan identifies potential weaknesses; pen test attempts exploitation within ROE",
      "They are identical — not the best managerial choice here",
      "Pen test requires no authorization — not the best managerial choice here"
    ],
    "correct": 1,
    "explain": "Scans automate discovery; pen tests validate exploitability with explicit permission."
  },
  {
    "id": "cissp-ramp-032",
    "mode": "exam",
    "topic": "Security Architecture",
    "obj": "3",
    "level": 3,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "q": "AES-256 is BEST categorized as:",
    "options": [
      "Asymmetric encryption — not the best managerial choice here",
      "Symmetric block cipher",
      "Hash function — not the best managerial choice here",
      "Physical control — not the best managerial choice here"
    ],
    "correct": 1,
    "explain": "AES is symmetric; RSA/ECC are asymmetric; SHA is hashing."
  },
  {
    "id": "cissp-ramp-033",
    "mode": "exam",
    "topic": "IAM",
    "obj": "5",
    "level": 4,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "q": "SAML assertion consumed by a service provider proves:",
    "options": [
      "OAuth refresh token storage — not the best managerial choice here",
      "Identity attributes / authentication statement from IdP",
      "Physical badge scan — not the best managerial choice here",
      "Disk encryption key — not the best managerial choice here"
    ],
    "correct": 1,
    "explain": "SAML assertions carry authentication/attribute statements; SP trusts signed assertion from IdP."
  },
  {
    "id": "cissp-ramp-034",
    "mode": "exam",
    "topic": "Security Operations",
    "obj": "7",
    "level": 3,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "q": "SOC analyst sees impossible travel login. FIRST step?",
    "options": [
      "Ignore as false positive always — not the best managerial choice here",
      "Validate alert, disable or step-up auth for account, begin investigation",
      "Email passwords to user — not the best managerial choice here",
      "Delete SIEM to reduce noise — not the best managerial choice here"
    ],
    "correct": 1,
    "explain": "Treat as potential account compromise: verify, contain (disable/MFA), investigate."
  },
  {
    "id": "cissp-ramp-035",
    "mode": "exam",
    "topic": "Network Security",
    "obj": "4",
    "level": 4,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "q": "Micro-segmentation in data centers PRIMARILY reduces:",
    "options": [
      "Lateral movement after initial compromise",
      "Need for any authentication — not the best managerial choice here",
      "Backup requirements — not the best managerial choice here",
      "Software licensing costs — not the best managerial choice here"
    ],
    "correct": 0,
    "explain": "Segmentation limits east-west spread; still need identity and monitoring."
  },
  {
    "id": "cissp-ramp-036",
    "mode": "exam",
    "topic": "Software Development",
    "obj": "8",
    "level": 4,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "q": "Developers want to store API keys in git for convenience. As security manager, BEST response?",
    "options": [
      "Allow private repos only — not the best managerial choice here",
      "Prohibit secrets in VCS; use vault/CI secret store and scanning",
      "Rotate keys once per decade — not the best managerial choice here",
      "Use ECB mode for keys — not the best managerial choice here"
    ],
    "correct": 1,
    "explain": "Secrets in VCS leak via history; use secret management and pre-commit/CI scanning."
  },
  {
    "id": "cissp-ramp-037",
    "mode": "exam",
    "topic": "Security and Risk Management",
    "obj": "1",
    "level": 3,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "q": "Which document states management intent and high-level requirements?",
    "options": [
      "Policy",
      "Procedure",
      "Baseline config export",
      "Packet capture"
    ],
    "correct": 0,
    "explain": "Policy = management direction; standards/procedures implement details."
  },
  {
    "id": "cissp-ramp-038",
    "mode": "exam",
    "topic": "Asset Security",
    "obj": "2",
    "level": 4,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "q": "Data minimization under privacy principles means:",
    "options": [
      "Collect all possible fields for future analytics",
      "Collect only data necessary for stated purpose",
      "Never delete data",
      "Share with all partners"
    ],
    "correct": 1,
    "explain": "Minimization limits collection/processing to purpose; supports GDPR privacy by design."
  },
  {
    "id": "cissp-ramp-039",
    "mode": "exam",
    "topic": "Security Assessment",
    "obj": "6",
    "level": 4,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "q": "After pen test, critical finding remains unpatched for 90 days. BEST governance action?",
    "options": [
      "Hide report — not the best managerial choice here",
      "Track risk exception with owner, compensating controls, and expiry",
      "Turn off firewalls — not the best managerial choice here",
      "Publicly post credentials — not the best managerial choice here"
    ],
    "correct": 1,
    "explain": "Documented exceptions with approval, mitigation, and review date align with GRC."
  },
  {
    "id": "cissp-ramp-040",
    "mode": "exam",
    "topic": "Security Operations",
    "obj": "7",
    "level": 4,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "q": "Tabletop exercise for ransomware should PRIMARILY validate:",
    "options": [
      "Color of SOC walls — not the best managerial choice here",
      "Roles, communications, and decision points in IR/BCP playbooks",
      "CPU clock speed — not the best managerial choice here",
      "Office seating chart — not the best managerial choice here"
    ],
    "correct": 1,
    "explain": "Tabletops test process and coordination without full technical simulation."
  }
];
