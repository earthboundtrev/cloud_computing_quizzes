window.QUESTION_BANK_CISSP = [
  {
    "mode": "comparison",
    "topic": "Security and Risk Management",
    "q": "Which of the CIA triad components ensures that information is accessible only to authorized users?",
    "options": [
      "Integrity",
      "Confidentiality",
      "Availability",
      "Non-repudiation"
    ],
    "correct": 1,
    "explain": "Confidentiality = restrict access; access controls, encryption. Integrity = no unauthorized changes. Availability = authorized access when needed.",
    "obj": "1",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0001"
  },
  {
    "mode": "comparison",
    "topic": "Security and Risk Management",
    "q": "Risk is typically calculated as:",
    "options": [
      "Threat only",
      "Threat × Vulnerability",
      "Vulnerability only",
      "Asset × Control"
    ],
    "correct": 1,
    "explain": "Risk = Threat × Vulnerability. Asset value and likelihood also factor into risk assessment.",
    "obj": "1",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0002"
  },
  {
    "mode": "exam",
    "topic": "Security and Risk Management",
    "q": "Who is typically responsible for determining data classification levels?",
    "options": [
      "CISO only",
      "Business owners/data owners",
      "IT staff",
      "Auditors"
    ],
    "correct": 1,
    "explain": "Data/business owners classify data based on business impact. CISO advises; IT implements controls.",
    "obj": "1",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0003"
  },
  {
    "mode": "exam",
    "topic": "Security and Risk Management",
    "q": "Which document provides mandatory, specific requirements for achieving a standard?",
    "options": [
      "Guideline",
      "Procedure",
      "Baseline",
      "Policy"
    ],
    "correct": 1,
    "explain": "Procedure = step-by-step how to meet requirements. Policy = high-level; Standard = mandatory requirements; Guideline = recommended; Baseline = minimum config.",
    "obj": "1",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0004"
  },
  {
    "mode": "comparison",
    "topic": "Security and Risk Management",
    "q": "Defense in depth refers to:",
    "options": [
      "Single strong control",
      "Multiple layers of security controls",
      "Perimeter-only security",
      "Physical security only"
    ],
    "correct": 1,
    "explain": "Defense in depth = multiple controls at different layers; if one fails, others provide protection.",
    "obj": "1",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0005"
  },
  {
    "mode": "comparison",
    "topic": "Asset Security",
    "q": "Which phase of the asset lifecycle involves ensuring proper disposal of data?",
    "options": [
      "Acquisition",
      "Handling",
      "Destruction",
      "Classification only"
    ],
    "correct": 2,
    "explain": "Destruction phase = secure disposal (shredding, degaussing, wiping) to prevent data recovery.",
    "obj": "2",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0006"
  },
  {
    "mode": "exam",
    "topic": "Asset Security",
    "q": "Data remanence refers to:",
    "options": [
      "Data in transit",
      "Residual data left on storage after deletion",
      "Data classification",
      "Data encryption"
    ],
    "correct": 1,
    "explain": "Data remanence = residual data after delete; mitigated by overwriting, degaussing, or physical destruction.",
    "obj": "2",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0007"
  },
  {
    "mode": "comparison",
    "topic": "Security Architecture",
    "q": "The Bell-LaPadula model enforces which security property?",
    "options": [
      "Availability",
      "Integrity (Biba)",
      "Confidentiality (no read up, no write down)",
      "All of the above"
    ],
    "correct": 2,
    "explain": "Bell-LaPadula = confidentiality; no read up (simple), no write down (confinement). Biba = integrity.",
    "obj": "3",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0008"
  },
  {
    "mode": "exam",
    "topic": "Security Architecture",
    "q": "A security kernel must be:",
    "options": [
      "Large and complex",
      "Small, tamperproof, and verifiable",
      "User-space only",
      "Network-facing"
    ],
    "correct": 1,
    "explain": "Security kernel = small, tamperproof, verifiable; implements reference monitor; mediates all access.",
    "obj": "3",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0009"
  },
  {
    "mode": "comparison",
    "topic": "Security Architecture",
    "q": "Which encryption algorithm is asymmetric?",
    "options": [
      "AES",
      "RSA",
      "3DES",
      "RC4"
    ],
    "correct": 1,
    "explain": "RSA = asymmetric (public/private key). AES, 3DES, RC4 = symmetric.",
    "obj": "3",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0010"
  },
  {
    "mode": "comparison",
    "topic": "Network Security",
    "q": "Which layer of the OSI model does IP operate at?",
    "options": [
      "Layer 2",
      "Layer 3 (Network)",
      "Layer 4",
      "Layer 7"
    ],
    "correct": 1,
    "explain": "IP = Layer 3 (Network). TCP/UDP = Layer 4. Ethernet = Layer 2. HTTP = Layer 7.",
    "obj": "4",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0011"
  },
  {
    "mode": "exam",
    "topic": "Network Security",
    "q": "A DMZ is typically used to:",
    "options": [
      "Store backups",
      "Host public-facing services with controlled access",
      "Encrypt data",
      "Run antivirus"
    ],
    "correct": 1,
    "explain": "DMZ = screened subnet; hosts public services (web, mail); isolated from internal network; bastion hosts.",
    "obj": "4",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0012"
  },
  {
    "mode": "comparison",
    "topic": "Network Security",
    "q": "Which protocol provides secure remote login?",
    "options": [
      "Telnet",
      "FTP",
      "SSH",
      "HTTP"
    ],
    "correct": 2,
    "explain": "SSH = encrypted remote login, file transfer. Telnet/FTP = cleartext, insecure.",
    "obj": "4",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0013"
  },
  {
    "mode": "comparison",
    "topic": "IAM",
    "q": "Authentication verifies:",
    "options": [
      "What you can do",
      "Who you are",
      "Where you are",
      "When you access"
    ],
    "correct": 1,
    "explain": "Authentication = identity (who). Authorization = permissions (what). Accounting = audit (what was done).",
    "obj": "5",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0014"
  },
  {
    "mode": "exam",
    "topic": "IAM",
    "q": "Role-Based Access Control (RBAC) assigns permissions based on:",
    "options": [
      "User identity only",
      "Job function/role",
      "Resource sensitivity only",
      "Time of day only"
    ],
    "correct": 1,
    "explain": "RBAC = permissions by role (job function). ABAC = attributes. DAC = owner. MAC = labels.",
    "obj": "5",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0015"
  },
  {
    "mode": "comparison",
    "topic": "IAM",
    "q": "Multi-factor authentication requires:",
    "options": [
      "Two passwords",
      "Something you know + something you have or are",
      "Only biometrics",
      "Only smart cards"
    ],
    "correct": 1,
    "explain": "MFA = two or more factors: knowledge (password), possession (token), inherence (biometric).",
    "obj": "5",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0016"
  },
  {
    "mode": "comparison",
    "topic": "Security Assessment",
    "q": "A penetration test differs from a vulnerability scan in that:",
    "options": [
      "Pen test is automated only",
      "Pen test exploits vulnerabilities to demonstrate impact",
      "Vuln scan exploits systems",
      "They are identical"
    ],
    "correct": 1,
    "explain": "Pen test = exploit vulns, simulate attacker. Vuln scan = identify vulns, typically non-invasive.",
    "obj": "6",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0017"
  },
  {
    "mode": "exam",
    "topic": "Security Assessment",
    "q": "Which assessment type is performed by insiders with full knowledge?",
    "options": [
      "Black box",
      "White box",
      "Gray box only",
      "External only"
    ],
    "correct": 1,
    "explain": "White box = full knowledge (insider). Black box = no knowledge. Gray box = partial.",
    "obj": "6",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0018"
  },
  {
    "mode": "comparison",
    "topic": "Security Assessment",
    "q": "Code review is an example of:",
    "options": [
      "Dynamic testing",
      "Static testing",
      "Penetration testing",
      "Vulnerability scanning"
    ],
    "correct": 1,
    "explain": "Static testing = analyze code without executing (SAST, code review). Dynamic = run code (DAST).",
    "obj": "6",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0019"
  },
  {
    "mode": "comparison",
    "topic": "Security Operations",
    "q": "The first phase of incident response is typically:",
    "options": [
      "Containment",
      "Preparation",
      "Eradication",
      "Recovery"
    ],
    "correct": 1,
    "explain": "NIST IR: Preparation, Detection & Analysis, Containment, Eradication, Recovery, Post-Incident.",
    "obj": "7",
    "level": 4,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0020"
  },
  {
    "mode": "exam",
    "topic": "Security Operations",
    "q": "Separation of duties helps prevent:",
    "options": [
      "Natural disasters",
      "Fraud (single person cannot complete critical task alone)",
      "Network outages",
      "Hardware failure"
    ],
    "correct": 1,
    "explain": "SoD = split critical tasks; no single person can commit fraud. Also: job rotation, least privilege.",
    "obj": "7",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0021"
  },
  {
    "mode": "comparison",
    "topic": "Security Operations",
    "q": "A BCP addresses:",
    "options": [
      "Only technical recovery",
      "Business continuity during disruption",
      "Penetration testing only",
      "Code review only"
    ],
    "correct": 1,
    "explain": "BCP = maintain business during disruption. DRP = restore IT. BIA = impact analysis.",
    "obj": "7",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0022"
  },
  {
    "mode": "comparison",
    "topic": "Software Development Security",
    "q": "Integrating security early in the SDLC is known as:",
    "options": [
      "Security by obscurity",
      "Secure by design / Shift left",
      "Penetration testing only",
      "Post-release patching"
    ],
    "correct": 1,
    "explain": "Shift left = security early in SDLC; cheaper than fixing later. Secure by design.",
    "obj": "8",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0023"
  },
  {
    "mode": "exam",
    "topic": "Software Development Security",
    "q": "SQL injection is an example of:",
    "options": [
      "Physical attack",
      "Injection attack (improper input validation)",
      "DoS only",
      "Social engineering only"
    ],
    "correct": 1,
    "explain": "SQL injection = inject malicious SQL via input; improper validation. OWASP Top 10.",
    "obj": "8",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0024"
  },
  {
    "mode": "comparison",
    "topic": "Software Development Security",
    "q": "Which SDLC model involves iterative development with short cycles?",
    "options": [
      "Waterfall only",
      "Agile",
      "Big Bang",
      "Spiral only"
    ],
    "correct": 1,
    "explain": "Agile = iterative, short sprints. Waterfall = sequential. Spiral = risk-driven iterations.",
    "obj": "8",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0025"
  },
  {
    "mode": "exam",
    "topic": "Security and Risk Management",
    "q": "Quantitative risk assessment uses:",
    "options": [
      "Only subjective judgment",
      "Numerical values (ALE, SLE, ARO)",
      "No formulas",
      "Qualitative only"
    ],
    "correct": 1,
    "explain": "Quantitative = SLE × ARO = ALE; dollar values. Qualitative = High/Med/Low.",
    "obj": "1",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0026"
  },
  {
    "mode": "exam",
    "topic": "Security and Risk Management",
    "q": "Residual risk is:",
    "options": [
      "Total risk before controls",
      "Risk remaining after controls",
      "Inherent risk only",
      "Threat only"
    ],
    "correct": 1,
    "explain": "Residual risk = risk left after controls. Accept, transfer, mitigate, or avoid.",
    "obj": "1",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0027"
  },
  {
    "mode": "exam",
    "topic": "Security and Risk Management",
    "q": "Due diligence is BEST described as:",
    "options": [
      "Establishing the plans, policies and processes (knowing what should be done)",
      "Performing the day-to-day security activities",
      "Verifying compliance after an incident",
      "Transferring risk to an insurer"
    ],
    "correct": 0,
    "explain": "Due diligence = establishing a plan, policy, and process to protect the organization (knowing what should be done and planning for it). Due care = practicing the individual activities that maintain the due diligence effort (doing the right action at the right time). (ISC)² CISSP Official Study Guide, 10th ed., Ch. 1, Ch. 1.",
    "obj": "1",
    "level": 4,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0028"
  },
  {
    "mode": "exam",
    "topic": "Asset Security",
    "q": "Chain of custody is important for:",
    "options": [
      "Backup only",
      "Evidence integrity in forensics",
      "Encryption only",
      "Access control only"
    ],
    "correct": 1,
    "explain": "Chain of custody = document handling of evidence; admissibility in court; who, when, where.",
    "obj": "2",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0029"
  },
  {
    "mode": "exam",
    "topic": "Security Architecture",
    "q": "Fail secure means:",
    "options": [
      "System fails open",
      "System defaults to secure state on failure",
      "No failure possible",
      "Manual override only"
    ],
    "correct": 1,
    "explain": "Fail secure = on failure, deny access (secure default). Fail open = allow on failure (availability).",
    "obj": "3",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0030"
  },
  {
    "mode": "exam",
    "topic": "Network Security",
    "q": "802.1X provides:",
    "options": [
      "Only encryption",
      "Port-based network access control (NAC)",
      "Antivirus",
      "IDS only"
    ],
    "correct": 1,
    "explain": "802.1X = NAC; authenticate before granting network access; EAP, RADIUS.",
    "obj": "4",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0031"
  },
  {
    "mode": "exam",
    "topic": "IAM",
    "q": "Kerberos uses which of the following?",
    "options": [
      "Only passwords in cleartext",
      "Tickets and TGS for SSO",
      "Only symmetric crypto",
      "No encryption"
    ],
    "correct": 1,
    "explain": "Kerberos = ticket-based SSO; KDC, TGT, TGS; timestamps prevent replay.",
    "obj": "5",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0032"
  },
  {
    "mode": "exam",
    "topic": "Security Assessment",
    "q": "A false positive in a vulnerability scan means:",
    "options": [
      "Real vulnerability missed",
      "Vulnerability reported but does not exist",
      "No scan performed",
      "Scan failed"
    ],
    "correct": 1,
    "explain": "False positive = reported but not real. False negative = real vuln missed.",
    "obj": "6",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0033"
  },
  {
    "mode": "exam",
    "topic": "Security Operations",
    "q": "Tabletop exercises are used for:",
    "options": [
      "Physical drills only",
      "Discussing response procedures (no live systems)",
      "Penetration testing",
      "Code deployment"
    ],
    "correct": 1,
    "explain": "Tabletop = walk through scenarios; discuss roles, procedures; no live systems.",
    "obj": "7",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0034"
  },
  {
    "mode": "exam",
    "topic": "Software Development Security",
    "q": "OWASP Top 10 focuses on:",
    "options": [
      "Hardware only",
      "Web application security risks",
      "Physical security",
      "Encryption algorithms"
    ],
    "correct": 1,
    "explain": "OWASP Top 10 = web app risks; injection, XSS, broken auth, etc.",
    "obj": "8",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0035"
  },
  {
    "mode": "comparison",
    "topic": "Security and Risk Management",
    "q": "A policy is:",
    "options": [
      "Step-by-step procedure",
      "High-level management directive",
      "Technical baseline",
      "Guideline only"
    ],
    "correct": 1,
    "explain": "Policy = high-level, mandatory. Standard = specific requirements. Procedure = how-to. Guideline = recommended.",
    "obj": "1",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0036"
  },
  {
    "mode": "comparison",
    "topic": "Security Architecture",
    "q": "Symmetric encryption uses:",
    "options": [
      "Two different keys",
      "Same key for encrypt and decrypt",
      "Public key only",
      "No key"
    ],
    "correct": 1,
    "explain": "Symmetric = one shared key (AES). Asymmetric = public + private (RSA).",
    "obj": "3",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0037"
  },
  {
    "mode": "comparison",
    "topic": "Network Security",
    "q": "A honeypot is used to:",
    "options": [
      "Store production data",
      "Decoy to attract and study attackers",
      "Encrypt traffic",
      "Load balance"
    ],
    "correct": 1,
    "explain": "Honeypot = decoy system; detect, study attackers; not production.",
    "obj": "4",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0038"
  },
  {
    "mode": "exam",
    "topic": "IAM",
    "q": "Least privilege means:",
    "options": [
      "Maximum access for all",
      "Minimum access necessary to perform job",
      "No access control",
      "Admin for everyone"
    ],
    "correct": 1,
    "explain": "Least privilege = grant only needed permissions; reduces blast radius.",
    "obj": "5",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0039"
  },
  {
    "mode": "exam",
    "topic": "Security Operations",
    "q": "MTTR stands for:",
    "options": [
      "Maximum Time To Recover",
      "Mean Time To Repair/Recover",
      "Minimum Time To Respond",
      "Mean Time To Reboot"
    ],
    "correct": 1,
    "explain": "MTTR = Mean Time To Repair/Recover. MTTF = fail. MTBF = between failures.",
    "obj": "7",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0040"
  },
  {
    "mode": "comparison",
    "topic": "Software Development Security",
    "q": "Input validation helps prevent:",
    "options": [
      "Hardware failure",
      "Injection attacks (XSS, SQLi)",
      "Power outage",
      "Physical theft"
    ],
    "correct": 1,
    "explain": "Input validation = sanitize/validate input; prevent injection, XSS.",
    "obj": "8",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0041"
  },
  {
    "mode": "exam",
    "topic": "Security and Risk Management",
    "q": "A BIA identifies:",
    "options": [
      "Only technical systems",
      "Critical business functions and impact of disruption",
      "Threat actors only",
      "Encryption keys only"
    ],
    "correct": 1,
    "explain": "BIA = Business Impact Analysis; critical functions, RTO, RPO, impact.",
    "obj": "1",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0042"
  },
  {
    "mode": "exam",
    "topic": "Asset Security",
    "q": "Data masking is used to:",
    "options": [
      "Encrypt all data",
      "Protect sensitive data in non-prod (e.g., PII)",
      "Delete data",
      "Backup only"
    ],
    "correct": 1,
    "explain": "Data masking = obscure PII/sensitive in dev/test; retain format, not real values.",
    "obj": "2",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0043"
  },
  {
    "mode": "exam",
    "topic": "Security Architecture",
    "q": "Defense in depth and diversity means:",
    "options": [
      "Single vendor for all",
      "Layered controls from different types/vendors",
      "No redundancy",
      "Physical only"
    ],
    "correct": 1,
    "explain": "Diversity = avoid single point of failure; different control types/vendors.",
    "obj": "3",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0044"
  },
  {
    "mode": "exam",
    "topic": "Network Security",
    "q": "DNSSEC provides:",
    "options": [
      "Encryption of DNS traffic",
      "Authentication and integrity of DNS responses",
      "Faster DNS only",
      "No security"
    ],
    "correct": 1,
    "explain": "DNSSEC = signed responses; authentication, integrity. Does not encrypt (DNS over TLS/HTTPS does).",
    "obj": "4",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0045"
  },
  {
    "mode": "exam",
    "topic": "Security Assessment",
    "q": "Regression testing ensures:",
    "options": [
      "Only new features",
      "Changes do not break existing functionality",
      "No testing",
      "Pen test only"
    ],
    "correct": 1,
    "explain": "Regression testing = verify changes don't break existing; retest previous functionality.",
    "obj": "6",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0046"
  },
  {
    "mode": "exam",
    "topic": "Security Operations",
    "q": "Recovery Time Objective (RTO) is:",
    "options": [
      "Maximum acceptable downtime (time to restore)",
      "Maximum data loss",
      "Backup frequency",
      "Encryption strength"
    ],
    "correct": 0,
    "explain": "RTO = max acceptable downtime. RPO = max acceptable data loss. MTD = max tolerable downtime (similar).",
    "obj": "7",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0047"
  },
  {
    "mode": "exam",
    "topic": "Software Development Security",
    "q": "A software escrow agreement:",
    "options": [
      "Encrypts source code",
      "Stores source code with third party for contingency",
      "Deletes code",
      "Publishes code"
    ],
    "correct": 1,
    "explain": "Escrow = vendor deposits source with neutral party; released if vendor fails; continuity.",
    "obj": "8",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0048"
  },
  {
    "mode": "comparison",
    "topic": "Security and Risk Management",
    "q": "Certification vs Accreditation: Accreditation is:",
    "options": [
      "Technical evaluation only",
      "Management approval to operate (authorization)",
      "Pen test only",
      "Audit only"
    ],
    "correct": 1,
    "explain": "Certification = technical eval (security posture). Accreditation = management authorization to operate.",
    "obj": "1",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0049"
  },
  {
    "mode": "exam",
    "topic": "IAM",
    "q": "Federation allows:",
    "options": [
      "Single org only",
      "Cross-domain SSO (trust between orgs)",
      "No SSO",
      "Only local auth"
    ],
    "correct": 1,
    "explain": "Federation = trust between orgs; SSO across domains; SAML, OAuth, OpenID Connect.",
    "obj": "5",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0050"
  },
  {
    "mode": "exam",
    "topic": "Security Operations",
    "q": "A security baseline is:",
    "options": [
      "Maximum configuration",
      "Minimum secure configuration standard",
      "Optional guideline",
      "Policy only"
    ],
    "correct": 1,
    "explain": "Baseline = minimum secure config; hardening standard; compliance starting point.",
    "obj": "7",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0051"
  },
  {
    "mode": "comparison",
    "topic": "Security and Risk Management",
    "q": "CAAIN (what a cryptosystem delivers) includes Non-Repudiation. Digital signatures provide:",
    "options": [
      "Only confidentiality",
      "Integrity + Authentication + Non-Repudiation",
      "Only availability",
      "Only authorization"
    ],
    "correct": 1,
    "explain": "Digital Signature = integrity + authentication + non-repudiation. Encrypt hash with private key.",
    "obj": "1",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0052"
  },
  {
    "mode": "comparison",
    "topic": "Security and Risk Management",
    "q": "AAA stands for:",
    "options": [
      "Access, Audit, Asset",
      "Authentication, Authorization, Accountability",
      "Availability, Accuracy, Assurance",
      "Assessment, Approval, Audit"
    ],
    "correct": 1,
    "explain": "Authentication = who you are. Authorization = what you can do. Accountability = proving what you did.",
    "obj": "1",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0053"
  },
  {
    "mode": "exam",
    "topic": "Security and Risk Management",
    "q": "In quantitative risk: ALE = ?",
    "options": [
      "EF × AV only",
      "SLE × ARO (or ARO × EF × AV)",
      "AV only",
      "ARO only"
    ],
    "correct": 1,
    "explain": "ALE = Annual Loss Expectancy = SLE × ARO. SLE = EF × AV. ARO = Annual Rate of Occurrence.",
    "obj": "1",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0054"
  },
  {
    "mode": "exam",
    "topic": "Security and Risk Management",
    "q": "Single Loss Expectancy (SLE) is calculated as:",
    "options": [
      "ARO × EF",
      "EF × AV (Exposure Factor × Asset Value)",
      "ALE / ARO",
      "AV only"
    ],
    "correct": 1,
    "explain": "SLE = EF × AV. How much one hit costs. ALE = SLE × ARO.",
    "obj": "1",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0055"
  },
  {
    "mode": "exam",
    "topic": "Security and Risk Management",
    "q": "The four approaches to managing risk (in order) are:",
    "options": [
      "Accept, Transfer, Mitigate, Avoid",
      "Mitigate, Transfer, Accept, Avoid",
      "Avoid only",
      "Ignore (risk rejection)"
    ],
    "correct": 1,
    "explain": "1) Mitigate (controls), 2) Transfer (insurance), 3) Accept (residual risk), 4) Avoid (don't engage). Ignore is unacceptable.",
    "obj": "1",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0056"
  },
  {
    "mode": "exam",
    "topic": "IAM",
    "q": "FRR (False Reject Rate) in biometrics is also known as:",
    "options": [
      "Type 2 error",
      "Type 1 error - system fails to accept authorized user",
      "CER",
      "FAR"
    ],
    "correct": 1,
    "explain": "FRR = Type 1 = reject authorized user. FAR = Type 2 = accept unauthorized (more dangerous). CER = Crossover Error Rate.",
    "obj": "5",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0057"
  },
  {
    "mode": "exam",
    "topic": "IAM",
    "q": "OAuth does NOT authenticate the user. OAuth is used for:",
    "options": [
      "Authentication only",
      "Delegated authorization (authorize app to access resources on your behalf)",
      "Encryption only",
      "Hashing only"
    ],
    "correct": 1,
    "explain": "OAuth = delegated authorization. IdP (e.g., Google) authenticates you; OAuth lets app access your resources. OpenID Connect adds authentication.",
    "obj": "5",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0058"
  },
  {
    "mode": "comparison",
    "topic": "Security Architecture",
    "q": "Which block cipher mode is the worst (same plaintext → same ciphertext, reveals patterns)?",
    "options": [
      "CBC",
      "CTR",
      "ECB - Electronic Codebook",
      "GCM"
    ],
    "correct": 2,
    "explain": "ECB = worst; no IV, patterns visible. CBC, CTR, GCM use IV/nonce. GCM adds authentication.",
    "obj": "3",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0059"
  },
  {
    "mode": "comparison",
    "topic": "Security Architecture",
    "q": "HMAC provides:",
    "options": [
      "Only confidentiality",
      "Authentication and integrity (hash over message + shared secret)",
      "Only encryption",
      "Non-repudiation only"
    ],
    "correct": 1,
    "explain": "HMAC = Hash(message + shared secret). Authentication + integrity. No confidentiality by itself.",
    "obj": "3",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0060"
  },
  {
    "mode": "exam",
    "topic": "Security Architecture",
    "q": "OCSP responders return which status results?",
    "options": [
      "Only Revoked",
      "Good, Revoked, or Unknown",
      "Only Good",
      "Only Unknown"
    ],
    "correct": 1,
    "explain": "OCSP = Online Certificate Status Protocol. Responder returns: Good, Revoked, or Unknown.",
    "obj": "3",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0061"
  },
  {
    "mode": "exam",
    "topic": "Security and Risk Management",
    "q": "In NIST RMF: Scoping allows a control to be marked N/A when:",
    "options": [
      "It does not enhance your security posture",
      "You don't like it",
      "It costs too much",
      "It's optional"
    ],
    "correct": 1,
    "explain": "Scoping = limit controls to those applicable. Tailoring = customize controls. Overlay = specialty system controls (e.g., SCADA).",
    "obj": "1",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0062"
  },
  {
    "mode": "exam",
    "topic": "Security Operations",
    "q": "Per ITIL: A Problem is:",
    "options": [
      "The same as an Incident",
      "The underlying root cause of an incident or potential incident",
      "Only a minor issue",
      "Always resolved immediately"
    ],
    "correct": 1,
    "explain": "ITIL: Problem = root cause. Incident = unplanned loss or unacceptable degradation of service.",
    "obj": "7",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0063"
  },
  {
    "mode": "exam",
    "topic": "Asset Security",
    "q": "eHold (vs Legal Hold): eHold can be placed:",
    "options": [
      "Only after court order",
      "Before a case is filed—to preserve potential evidence",
      "Only by judge",
      "Only by attorney"
    ],
    "correct": 1,
    "explain": "eHold = proactive preservation when litigation may be forthcoming. Legal Hold = court-ordered retention.",
    "obj": "2",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0064"
  },
  {
    "mode": "exam",
    "topic": "Asset Security",
    "q": "Order of Volatility (for evidence collection) means:",
    "options": [
      "Collect everything at once",
      "Gather evidence that will degrade first (e.g., RAM before disk)",
      "Ignore volatility",
      "Collect disk first"
    ],
    "correct": 1,
    "explain": "Order of Volatility = collect most volatile first: RAM, cache, swap, disk, backup. Also consider probative value and ease of collection.",
    "obj": "2",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0065"
  },
  {
    "mode": "exam",
    "topic": "Asset Security",
    "q": "Purging vs Clearing: Purging means:",
    "options": [
      "Data cannot be recovered by any known technique",
      "Data cleared but may be recovered by forensic equipment",
      "Same as deletion",
      "Same as overwrite"
    ],
    "correct": 1,
    "explain": "Clearing = common techniques can't recover. Purging = no known technique can recover. Destruction = physical destruction.",
    "obj": "2",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0066"
  },
  {
    "mode": "exam",
    "topic": "Security Architecture",
    "q": "Biba model (integrity): Simple Integrity Axiom states:",
    "options": [
      "Read up allowed",
      "No read down (subject must not read lower integrity data)",
      "Write down allowed",
      "Same as Bell-LaPadula"
    ],
    "correct": 1,
    "explain": "Biba: No read down (don't trust lower integrity). *-property: No write up. Bell-LaPadula = confidentiality.",
    "obj": "3",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0067"
  },
  {
    "mode": "exam",
    "topic": "Security Operations",
    "q": "BCP vs DRP: DRP addresses:",
    "options": [
      "Continuing service during outage",
      "How we restore operations back to normal after disaster",
      "Same as BCP",
      "Only backups"
    ],
    "correct": 1,
    "explain": "BCP = continue operations during disruption. DRP = restore after disaster. COOP = limited period (12hr–30 days).",
    "obj": "7",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0068"
  },
  {
    "mode": "exam",
    "topic": "Security Operations",
    "q": "RPO (Recovery Point Objective) is:",
    "options": [
      "Max time to restore",
      "Maximum acceptable data loss",
      "Max downtime",
      "Backup frequency only"
    ],
    "correct": 1,
    "explain": "RPO = max acceptable data loss (how far back to recover). RTO = max acceptable downtime.",
    "obj": "7",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0069"
  },
  {
    "mode": "exam",
    "topic": "Security Operations",
    "q": "A Hot Site provides:",
    "options": [
      "Empty space to rebuild",
      "Everything synced live; ready for immediate failover",
      "Scheduled sync only",
      "Cold start only"
    ],
    "correct": 1,
    "explain": "Hot = live sync, immediate. Warm = scheduled sync. Cold = rebuild from backup.",
    "obj": "7",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0070"
  },
  {
    "mode": "exam",
    "topic": "Security Architecture",
    "q": "RAID 5 provides:",
    "options": [
      "Only striping",
      "Striping with parity; single disk failure tolerated",
      "Mirroring only",
      "No redundancy"
    ],
    "correct": 1,
    "explain": "RAID 5 = striping + parity. One disk failure OK; degraded until rebuilt. Min 3 disks.",
    "obj": "3",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0071"
  },
  {
    "mode": "exam",
    "topic": "Physical Security",
    "q": "Fire extinguisher Type C is for:",
    "options": [
      "Ordinary combustibles",
      "Flammable liquids",
      "Electrical fires",
      "Combustible metals"
    ],
    "correct": 2,
    "explain": "CLEM-K: C=Electrical, L=Liquid, E=Electrical, M=Metal, K=Kitchen. Type A=Ordinary, B=Liquid, C=Electrical, D=Metal, K=Kitchen.",
    "obj": "1",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0072"
  },
  {
    "mode": "exam",
    "topic": "Security and Risk Management",
    "q": "CMMI Level 1 (Initial) is also called:",
    "options": [
      "Optimizing",
      "Defined",
      "Ad-hoc",
      "Quantitatively Managed"
    ],
    "correct": 2,
    "explain": "CMMI: 1=Initial (Ad-hoc), 2=Repeatable, 3=Defined, 4=Managed (Quantitatively), 5=Optimizing.",
    "obj": "1",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0073"
  },
  {
    "mode": "exam",
    "topic": "Asset Security",
    "q": "Data Classification vs Data Categorization: Classification is:",
    "options": [
      "The process",
      "The system we use to label data by impact of CIA loss",
      "Same as categorization",
      "Only for DoD"
    ],
    "correct": 1,
    "explain": "Classification = system/labels (Top Secret, Confidential, etc.). Categorization = process of sorting data.",
    "obj": "2",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0074"
  },
  {
    "mode": "exam",
    "topic": "IAM",
    "q": "MAC (Mandatory Access Control) uses:",
    "options": [
      "Owner-defined permissions only",
      "Classification, clearance, labels, need-to-know",
      "Roles only",
      "Attributes only"
    ],
    "correct": 1,
    "explain": "MAC = labels, clearance, need-to-know. DAC = owner sets permissions. RBAC = roles. ABAC = attributes.",
    "obj": "5",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0075"
  },
  {
    "mode": "exam",
    "topic": "Security Architecture",
    "q": "Salt (in password hashing) helps defeat:",
    "options": [
      "Encryption",
      "Rainbow tables by exponentially increasing work factor",
      "Brute force only",
      "Dictionary attacks only"
    ],
    "correct": 1,
    "explain": "Salt = random bits added before hashing. Defeats rainbow tables; each password needs unique table.",
    "obj": "3",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0076"
  },
  {
    "mode": "exam",
    "topic": "Network Security",
    "q": "In an 802.1X deployment, which device acts as the authenticator?",
    "options": [
      "The client workstation (supplicant)",
      "The network switch or wireless access point",
      "The RADIUS server",
      "The domain controller"
    ],
    "correct": 1,
    "explain": "802.1X roles: supplicant (client), authenticator (switch/AP that enforces port access), authentication server (RADIUS). The authenticator relays EAP between supplicant and RADIUS.",
    "obj": "4",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0077"
  },
  {
    "mode": "exam",
    "topic": "Security Operations",
    "q": "Pre-action sprinkler systems:",
    "options": [
      "Always discharge on heat",
      "Delay discharge until verification of true positive (e.g., two detectors)",
      "Same as deluge",
      "No verification"
    ],
    "correct": 1,
    "explain": "Pre-action = delay until verification (e.g., smoke + heat). Used in data centers, museums.",
    "obj": "7",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0078"
  },
  {
    "mode": "exam",
    "topic": "Software Development Security",
    "q": "Prepared statements (parameterized queries) are the #1 defense against:",
    "options": [
      "XSS only",
      "SQL injection",
      "Buffer overflow",
      "DoS"
    ],
    "correct": 1,
    "explain": "Prepared statements = bind parameters; SQL can't be injected. Better than input sanitization alone.",
    "obj": "8",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0079"
  },
  {
    "mode": "exam",
    "topic": "Security Operations",
    "q": "Mandatory vacation helps detect:",
    "options": [
      "Hardware failures",
      "Fraud (investigate while person is away)",
      "Network issues",
      "Encryption problems"
    ],
    "correct": 1,
    "explain": "Mandatory vacation = suspend to investigate fraud/tampering; person can't cover tracks.",
    "obj": "7",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0080"
  },
  {
    "mode": "exam",
    "topic": "Security and Risk Management",
    "q": "Your organization's security policy requires monthly vulnerability patching. Each month, the system administrator applies the patches. This is an example of:",
    "options": [
      "Due diligence",
      "Due care",
      "Risk avoidance",
      "Risk transfer"
    ],
    "correct": 1,
    "explain": "Due care = practicing the individual activities that maintain the due diligence effort (doing the right action at the right time). The policy (due diligence) established what should be done; the administrator's patching (due care) executes it. (ISC)² CISSP Official Study Guide, 10th ed., Ch. 1, Ch. 1.",
    "obj": "1",
    "level": 3,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0081"
  },
  {
    "mode": "exam",
    "topic": "IAM",
    "q": "Kerberos: A TGT (Ticket Granting Ticket) is issued by:",
    "options": [
      "The service",
      "The Authentication Service (AS) / KDC",
      "The client",
      "LDAP"
    ],
    "correct": 1,
    "explain": "TGT = issued by AS (part of KDC) after user authenticates. Used to request Session Tickets from TGS.",
    "obj": "5",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0082"
  },
  {
    "mode": "exam",
    "topic": "Security Architecture",
    "q": "IPSec ESP (Encapsulating Security Payload) provides:",
    "options": [
      "Only integrity",
      "Confidentiality, integrity, replay protection, authentication",
      "Only authentication",
      "No encryption"
    ],
    "correct": 1,
    "explain": "ESP = encryption + HMAC (auth/integrity) + replay (nonce). AH = integrity only, no encryption.",
    "obj": "3",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0083"
  },
  {
    "mode": "exam",
    "topic": "Asset Security",
    "q": "GDPR breach notification must occur within:",
    "options": [
      "30 days",
      "72 hours",
      "1 year",
      "No requirement"
    ],
    "correct": 1,
    "explain": "GDPR: breaches must be reported within 72 hours. Fines up to €20M or 4% global revenue.",
    "obj": "2",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0084"
  },
  {
    "mode": "exam",
    "topic": "Security Architecture",
    "q": "DHE (Diffie-Hellman Exchange) is susceptible to:",
    "options": [
      "Only brute force",
      "Man-in-the-Middle (MitM) - needs authentication",
      "Nothing",
      "Replay only"
    ],
    "correct": 1,
    "explain": "DHE = key exchange; no auth by itself. MitM possible. Use with certs/PSK for authentication.",
    "obj": "3",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0085"
  },
  {
    "mode": "exam",
    "topic": "IAM",
    "q": "IAL3 (Identity Assurance Level 3) requires:",
    "options": [
      "Self-attestation only",
      "In-person registration AND identification verified by 3rd party CSP",
      "Optional in-person",
      "Form only"
    ],
    "correct": 1,
    "explain": "IAL1 = self-attestation. IAL2 = ID verification. IAL3 = in-person + 3rd party CSP verification.",
    "obj": "5",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0086"
  },
  {
    "mode": "exam",
    "topic": "Security and Risk Management",
    "q": "Administrative controls are:",
    "options": [
      "Firewalls and IDS",
      "Directives (policy, training, SOPs, banners)",
      "Guards and locks",
      "Encryption"
    ],
    "correct": 1,
    "explain": "Administrative = policy, training, procedures. Logical = firewall, IDS. Physical = guards, locks.",
    "obj": "1",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0087"
  },
  {
    "mode": "exam",
    "topic": "Security Architecture",
    "q": "FIPS 140 Level 3 adds (vs Level 2):",
    "options": [
      "Basic security only",
      "Tamper evident + role-based auth",
      "Tamper resistant + identity-based auth (attempting break destroys data)",
      "Environmental protections"
    ],
    "correct": 2,
    "explain": "Level 1 = basic. Level 2 = tamper evident, role-based. Level 3 = tamper resistant, identity-based. Level 4 = environmental.",
    "obj": "3",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0088"
  },
  {
    "mode": "exam",
    "topic": "Security and Risk Management",
    "q": "Inherent risk is:",
    "options": [
      "Risk after controls",
      "Risk before any controls",
      "Residual risk",
      "Transferred risk"
    ],
    "correct": 1,
    "explain": "Inherent risk = risk before controls. Residual = after controls.",
    "obj": "1",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0089"
  },
  {
    "mode": "exam",
    "topic": "Security and Risk Management",
    "q": "A standard is:",
    "options": [
      "Optional guideline",
      "Mandatory requirement (specific)",
      "High-level policy",
      "Step-by-step procedure"
    ],
    "correct": 1,
    "explain": "Standard = mandatory, specific. Policy = high-level. Procedure = how-to. Guideline = recommended.",
    "obj": "1",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0090"
  },
  {
    "mode": "exam",
    "topic": "Asset Security",
    "q": "Data in use refers to:",
    "options": [
      "Data at rest",
      "Data being processed in memory",
      "Data in transit",
      "Data in backup"
    ],
    "correct": 1,
    "explain": "Data in use = in memory/CPU. At rest = storage. In transit = over network.",
    "obj": "2",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0091"
  },
  {
    "mode": "exam",
    "topic": "Security Architecture",
    "q": "Reference monitor must be:",
    "options": [
      "Large",
      "Tamperproof, always invoked, small enough to verify",
      "User-mode",
      "Optional"
    ],
    "correct": 1,
    "explain": "Reference monitor = tamperproof, always invoked, verifiable (small).",
    "obj": "3",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0092"
  },
  {
    "mode": "exam",
    "topic": "Network Security",
    "q": "TCP provides:",
    "options": [
      "Only best-effort",
      "Reliable, ordered delivery",
      "Only encryption",
      "Only authentication"
    ],
    "correct": 1,
    "explain": "TCP = reliable, ordered. UDP = best-effort. Neither provides encryption (use TLS).",
    "obj": "4",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0093"
  },
  {
    "mode": "exam",
    "topic": "IAM",
    "q": "Authorization determines:",
    "options": [
      "Who you are",
      "What you can access",
      "When you logged in",
      "Where you are"
    ],
    "correct": 1,
    "explain": "Authorization = permissions (what). Authentication = identity (who).",
    "obj": "5",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0094"
  },
  {
    "mode": "exam",
    "topic": "Security Assessment",
    "q": "SAST stands for:",
    "options": [
      "Security At Runtime",
      "Static Application Security Testing",
      "System Access Security Test",
      "Secure Authentication Standard"
    ],
    "correct": 1,
    "explain": "SAST = static; analyze code without running. DAST = dynamic; run application.",
    "obj": "6",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0095"
  },
  {
    "mode": "exam",
    "topic": "Security Operations",
    "q": "First responder in incident response should:",
    "options": [
      "Ignore the incident",
      "Contain and preserve evidence",
      "Delete logs",
      "Restart all systems"
    ],
    "correct": 1,
    "explain": "Contain impact, preserve evidence, document. Eradicate and recover after.",
    "obj": "7",
    "level": 4,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0096"
  },
  {
    "mode": "exam",
    "topic": "Software Development Security",
    "q": "XSS (Cross-Site Scripting) is:",
    "options": [
      "SQL injection",
      "Injecting malicious script into web page viewed by others",
      "Buffer overflow",
      "DoS"
    ],
    "correct": 1,
    "explain": "XSS = inject script; runs in victim browser. Input validation, output encoding.",
    "obj": "8",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0097"
  },
  {
    "mode": "exam",
    "topic": "Security and Risk Management",
    "q": "Risk acceptance means:",
    "options": [
      "Eliminating risk",
      "Formally accepting residual risk",
      "Transferring risk",
      "Ignoring risk without approval"
    ],
    "correct": 1,
    "explain": "Accept = acknowledge residual risk (documented). Avoid = don't do activity. Transfer = insurance. Mitigate = controls.",
    "obj": "1",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0098"
  },
  {
    "mode": "exam",
    "topic": "Security Architecture",
    "q": "AES key length can be:",
    "options": [
      "Only 128",
      "128, 192, or 256 bits",
      "Only 256",
      "Only 56"
    ],
    "correct": 1,
    "explain": "AES = 128, 192, 256 bits. 3DES = 168 effective. DES = 56 (deprecated).",
    "obj": "3",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0099"
  },
  {
    "mode": "exam",
    "topic": "Network Security",
    "q": "VPN typically provides:",
    "options": [
      "Only authentication",
      "Encryption and integrity for tunneled traffic",
      "Only integrity",
      "Only availability"
    ],
    "correct": 1,
    "explain": "VPN = tunnel; encrypt (confidentiality), often HMAC (integrity).",
    "obj": "4",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0100"
  },
  {
    "mode": "exam",
    "topic": "IAM",
    "q": "FAR (False Accept Rate) in biometrics:",
    "options": [
      "Reject authorized user",
      "Accept unauthorized user (Type 2)",
      "Same as FRR",
      "Crossover rate"
    ],
    "correct": 1,
    "explain": "FAR = accept impostor (worse). FRR = reject legitimate. CER = where they meet.",
    "obj": "5",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0101"
  },
  {
    "mode": "exam",
    "topic": "Security Operations",
    "q": "Warm site has:",
    "options": [
      "No equipment",
      "Equipment but not fully synced; some recovery time",
      "Live sync",
      "Empty space"
    ],
    "correct": 1,
    "explain": "Warm = equipment, periodic sync. Hot = live. Cold = rebuild.",
    "obj": "7",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0102"
  },
  {
    "mode": "exam",
    "topic": "Software Development Security",
    "q": "Buffer overflow can be mitigated by:",
    "options": [
      "Only encryption",
      "Bounds checking, ASLR, DEP",
      "Only input validation",
      "Only firewall"
    ],
    "correct": 1,
    "explain": "Bounds check, safe functions, ASLR, DEP (no execute on stack).",
    "obj": "8",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0103"
  },
  {
    "mode": "exam",
    "topic": "Security and Risk Management",
    "q": "Qualitative risk uses:",
    "options": [
      "Dollar values only",
      "Categories (e.g., High, Medium, Low)",
      "ALE only",
      "SLE only"
    ],
    "correct": 1,
    "explain": "Qualitative = High/Med/Low. Quantitative = ALE, SLE, ARO.",
    "obj": "1",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0104"
  },
  {
    "mode": "exam",
    "topic": "Asset Security",
    "q": "Clearing (data):",
    "options": [
      "Physical destruction",
      "Overwrite so normal methods cannot recover",
      "Same as purging",
      "Encryption only"
    ],
    "correct": 1,
    "explain": "Clearing = overwrite. Purging = no known method can recover. Destruction = physical.",
    "obj": "2",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0105"
  },
  {
    "mode": "exam",
    "topic": "Security Architecture",
    "q": "Digital signature provides:",
    "options": [
      "Only confidentiality",
      "Integrity, authentication, non-repudiation",
      "Only encryption",
      "Only availability"
    ],
    "correct": 1,
    "explain": "Sign = hash + encrypt with private key. Integrity, auth, non-repudiation. No confidentiality by itself.",
    "obj": "3",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0106"
  },
  {
    "mode": "exam",
    "topic": "Network Security",
    "q": "IDS vs IPS:",
    "options": [
      "Same thing",
      "IDS = detect; IPS = detect and block",
      "IPS only detects",
      "IDS blocks"
    ],
    "correct": 1,
    "explain": "IDS = monitor, alert. IPS = inline, can block. Both can use signature or anomaly.",
    "obj": "4",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0107"
  },
  {
    "mode": "exam",
    "topic": "IAM",
    "q": "SAML is used for:",
    "options": [
      "Encryption only",
      "SSO / federated authentication (assertions)",
      "Only authorization",
      "Only hashing"
    ],
    "correct": 1,
    "explain": "SAML = XML assertions; SSO between IdP and SP. OAuth = authorization. OpenID Connect = identity on OAuth.",
    "obj": "5",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0108"
  },
  {
    "mode": "exam",
    "topic": "Security Assessment",
    "q": "DAST is:",
    "options": [
      "Static testing",
      "Dynamic; tests running application",
      "Only code review",
      "Only design"
    ],
    "correct": 1,
    "explain": "DAST = dynamic; probe running app (e.g., web). SAST = static code.",
    "obj": "6",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0109"
  },
  {
    "mode": "exam",
    "topic": "Security Operations",
    "q": "RTO is typically determined by:",
    "options": [
      "Technical team only",
      "Business impact analysis (BIA)",
      "Only IT",
      "Only audit"
    ],
    "correct": 1,
    "explain": "BIA = critical functions, impact; RTO/RPO from business requirements.",
    "obj": "7",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0110"
  },
  {
    "mode": "exam",
    "topic": "Software Development Security",
    "q": "Threat modeling helps:",
    "options": [
      "Only after release",
      "Identify threats and mitigations early in SDLC",
      "Only network",
      "Only physical"
    ],
    "correct": 1,
    "explain": "Threat modeling = identify assets, threats, controls; STRIDE, etc.; early in design.",
    "obj": "8",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0111"
  },
  {
    "mode": "exam",
    "topic": "Security and Risk Management",
    "q": "Risk register typically contains:",
    "options": [
      "Only assets",
      "Risks, owners, mitigation, status",
      "Only threats",
      "Only controls"
    ],
    "correct": 1,
    "explain": "Risk register = list risks, owner, treatment, status; living document.",
    "obj": "1",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0112"
  },
  {
    "mode": "exam",
    "topic": "Security Architecture",
    "q": "Hashing (e.g., SHA-256) provides:",
    "options": [
      "Confidentiality",
      "Integrity (one-way; cannot derive input)",
      "Encryption",
      "Authentication only"
    ],
    "correct": 1,
    "explain": "Hash = one-way; integrity. Not confidentiality (reversible). Add salt for passwords.",
    "obj": "3",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0113"
  },
  {
    "mode": "exam",
    "topic": "Network Security",
    "q": "TLS operates at:",
    "options": [
      "Layer 2",
      "Layer 4",
      "Layer 5 (session) / between app and transport",
      "Layer 1"
    ],
    "correct": 2,
    "explain": "TLS = above TCP; often said session/presentation. Encrypts application data.",
    "obj": "4",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0114"
  },
  {
    "mode": "exam",
    "topic": "IAM",
    "q": "DAC (Discretionary Access Control):",
    "options": [
      "Labels only",
      "Owner controls permissions",
      "Only admin",
      "Only roles"
    ],
    "correct": 1,
    "explain": "DAC = owner decides who has access. MAC = labels. RBAC = roles.",
    "obj": "5",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0115"
  },
  {
    "mode": "exam",
    "topic": "Security Assessment",
    "q": "Red team:",
    "options": [
      "Defends only",
      "Simulates adversary (attack)",
      "Only scans",
      "Only policy"
    ],
    "correct": 1,
    "explain": "Red team = attack simulation. Blue = defend. Purple = both.",
    "obj": "6",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0116"
  },
  {
    "mode": "exam",
    "topic": "Security Operations",
    "q": "Backup strategy 3-2-1 means:",
    "options": [
      "3 backups, 2 types, 1 location",
      "3 copies, 2 different media, 1 offsite",
      "3 days, 2 weeks, 1 month",
      "Only 3 copies"
    ],
    "correct": 1,
    "explain": "3-2-1 = 3 copies, 2 media types, 1 offsite. Best practice.",
    "obj": "7",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0117"
  },
  {
    "mode": "exam",
    "topic": "Software Development Security",
    "q": "CI/CD security includes:",
    "options": [
      "Only build",
      "Secure pipeline: signed code, vuln scan, secrets management",
      "Only deploy",
      "Only test"
    ],
    "correct": 1,
    "explain": "Secure pipeline = scan dependencies, SAST/DAST, secrets in vault, signed artifacts.",
    "obj": "8",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0118"
  },
  {
    "mode": "exam",
    "topic": "Security and Risk Management",
    "q": "Vendor risk management includes:",
    "options": [
      "Only contract",
      "Assessment, contract, ongoing monitoring",
      "Only assessment",
      "Only SLA"
    ],
    "correct": 1,
    "explain": "Vendor risk = assess, contract (rights, liability), monitor (audits, performance).",
    "obj": "1",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0119"
  },
  {
    "mode": "exam",
    "topic": "Asset Security",
    "q": "Data retention policy defines:",
    "options": [
      "Only backup",
      "How long to keep data; legal and business",
      "Only delete",
      "Only archive"
    ],
    "correct": 1,
    "explain": "Retention = how long to keep; legal, compliance, business. Disposal after.",
    "obj": "2",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0120"
  },
  {
    "mode": "exam",
    "topic": "Security Architecture",
    "q": "RAID 1 is:",
    "options": [
      "Striping only",
      "Mirroring (duplicate)",
      "Striping + parity",
      "No redundancy"
    ],
    "correct": 1,
    "explain": "RAID 1 = mirror. RAID 0 = stripe. RAID 5 = stripe + parity.",
    "obj": "3",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0121"
  },
  {
    "mode": "exam",
    "topic": "Network Security",
    "q": "VLAN provides:",
    "options": [
      "Encryption",
      "Logical segmentation (broadcast domain)",
      "Only wireless",
      "Only routing"
    ],
    "correct": 1,
    "explain": "VLAN = logical LAN segmentation; separate broadcast domains.",
    "obj": "4",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0122"
  },
  {
    "mode": "exam",
    "topic": "IAM",
    "q": "Session management should:",
    "options": [
      "Never timeout",
      "Timeout, invalidate on logout, secure token",
      "Only logout",
      "Only password"
    ],
    "correct": 1,
    "explain": "Session = timeout, logout invalidate, secure cookie/token, binding.",
    "obj": "5",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0123"
  },
  {
    "mode": "exam",
    "topic": "Security Assessment",
    "q": "Compliance audit checks:",
    "options": [
      "Only technical",
      "Conformance to policy, standards, regulations",
      "Only penetration",
      "Only vulnerability"
    ],
    "correct": 1,
    "explain": "Audit = verify compliance to policy/regs. Pen test = attack. Vuln scan = find vulns.",
    "obj": "6",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0124"
  },
  {
    "mode": "exam",
    "topic": "Security Operations",
    "q": "Forensics order of volatility:",
    "options": [
      "Disk first",
      "Most volatile first: RAM, cache, disk",
      "Only RAM",
      "Only disk"
    ],
    "correct": 1,
    "explain": "Collect RAM, swap, disk in that order; volatile data lost first.",
    "obj": "7",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0125"
  },
  {
    "mode": "exam",
    "topic": "Software Development Security",
    "q": "Secure coding includes:",
    "options": [
      "Only performance",
      "Input validation, output encoding, parameterized queries",
      "Only comments",
      "Only design"
    ],
    "correct": 1,
    "explain": "Secure coding = validate input, encode output, parameterized queries, avoid hardcoded secrets.",
    "obj": "8",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0126"
  },
  {
    "mode": "exam",
    "topic": "Security and Risk Management",
    "q": "Security awareness training should be:",
    "options": [
      "One-time only",
      "Ongoing; role-based; measured",
      "Only for IT",
      "Only for new hires"
    ],
    "correct": 1,
    "explain": "Awareness = ongoing, role-based, phishing sim, measure effectiveness.",
    "obj": "1",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0127"
  },
  {
    "mode": "exam",
    "topic": "Security Architecture",
    "q": "Non-repudiation is best achieved with:",
    "options": [
      "Only encryption",
      "Digital signatures (or trusted logs)",
      "Only hashing",
      "Only password"
    ],
    "correct": 1,
    "explain": "Non-repudiation = proof of origin; digital signature, audit logs (integrity protected).",
    "obj": "3",
    "level": 4,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0128"
  },
  {
    "mode": "exam",
    "topic": "Network Security",
    "q": "Firewall stateful inspection:",
    "options": [
      "Only packet header",
      "Tracks connection state; allow return traffic",
      "Only stateless",
      "Only Layer 2"
    ],
    "correct": 1,
    "explain": "Stateful = track connection; allow established return. Stateless = per packet.",
    "obj": "4",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0129"
  },
  {
    "mode": "exam",
    "topic": "IAM",
    "q": "Privileged access management (PAM):",
    "options": [
      "Same as IAM",
      "Control and monitor privileged (admin) access",
      "Only MFA",
      "Only password"
    ],
    "correct": 1,
    "explain": "PAM = vault, session recording, just-in-time access for admins.",
    "obj": "5",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0130"
  },
  {
    "mode": "exam",
    "topic": "Security Assessment",
    "q": "Scope of penetration test should be:",
    "options": [
      "Unlimited",
      "Defined in writing (systems, methods, timing)",
      "Only technical",
      "Only external"
    ],
    "correct": 1,
    "explain": "Scope = what, how, when; rules of engagement; get approval.",
    "obj": "6",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0131"
  },
  {
    "mode": "exam",
    "topic": "Security Operations",
    "q": "CSIRT is:",
    "options": [
      "Only tool",
      "Computer Security Incident Response Team",
      "Only software",
      "Only policy"
    ],
    "correct": 1,
    "explain": "CSIRT = team that handles incidents; prepare, detect, respond, recover.",
    "obj": "7",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0132"
  },
  {
    "mode": "exam",
    "topic": "Software Development Security",
    "q": "Code signing verifies:",
    "options": [
      "Only performance",
      "Integrity and origin of code",
      "Only license",
      "Only version"
    ],
    "correct": 1,
    "explain": "Code signing = sign with private key; verify integrity and publisher.",
    "obj": "8",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0133"
  },
  {
    "mode": "exam",
    "topic": "Security and Risk Management",
    "q": "Risk appetite is:",
    "options": [
      "Same as tolerance",
      "Amount of risk organization will accept",
      "Only technical",
      "Only financial"
    ],
    "correct": 1,
    "explain": "Risk appetite = level of risk accepted. Tolerance = acceptable deviation.",
    "obj": "1",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0134"
  },
  {
    "mode": "exam",
    "topic": "Asset Security",
    "q": "Data loss prevention (DLP) focuses on:",
    "options": [
      "Only backup",
      "Detect/prevent sensitive data exfiltration",
      "Only encryption",
      "Only access control"
    ],
    "correct": 1,
    "explain": "DLP = detect (content) and block/alert on sensitive data (e.g., PII) in motion/at rest.",
    "obj": "2",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0135"
  },
  {
    "mode": "exam",
    "topic": "Security Architecture",
    "q": "Key escrow:",
    "options": [
      "Only encryption",
      "Third party holds key (recovery, legal)",
      "Only backup",
      "Only key rotation"
    ],
    "correct": 1,
    "explain": "Escrow = key held by third party; recovery or legal access. Controversial for privacy.",
    "obj": "3",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0136"
  },
  {
    "mode": "exam",
    "topic": "Network Security",
    "q": "NAC (Network Access Control):",
    "options": [
      "Only firewall",
      "Control device access to network (compliant, authenticated)",
      "Only VPN",
      "Only IDS"
    ],
    "correct": 1,
    "explain": "NAC = device must meet policy (patch, AV) and authenticate before network access.",
    "obj": "4",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0137"
  },
  {
    "mode": "exam",
    "topic": "IAM",
    "q": "Federation trust:",
    "options": [
      "Only within org",
      "Between identity providers (e.g., org and cloud)",
      "Only SAML",
      "Only OAuth"
    ],
    "correct": 1,
    "explain": "Federation = trust between IdPs; SSO across orgs. SAML/OIDC common.",
    "obj": "5",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0138"
  },
  {
    "mode": "exam",
    "topic": "Security Assessment",
    "q": "Compliance scanning:",
    "options": [
      "Only vuln scan",
      "Check config against baseline (CIS, custom)",
      "Only pen test",
      "Only code review"
    ],
    "correct": 1,
    "explain": "Compliance scan = compare config to baseline (CIS benchmarks, etc.).",
    "obj": "6",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0139"
  },
  {
    "mode": "exam",
    "topic": "Security Operations",
    "q": "SIEM aggregates:",
    "options": [
      "Only network",
      "Logs and events; correlation, alerting",
      "Only endpoints",
      "Only firewall"
    ],
    "correct": 1,
    "explain": "SIEM = collect logs; correlate; alert on patterns; support investigation.",
    "obj": "7",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0140"
  },
  {
    "mode": "exam",
    "topic": "Software Development Security",
    "q": "Dependency checking:",
    "options": [
      "Only performance",
      "Scan libraries for known vulnerabilities",
      "Only license",
      "Only version"
    ],
    "correct": 1,
    "explain": "Dependency scan = known vulns in libraries (e.g., CVE); update or replace.",
    "obj": "8",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0141"
  },
  {
    "mode": "exam",
    "topic": "Security and Risk Management",
    "q": "Third-party risk can be:",
    "options": [
      "Ignored",
      "Mitigated by contract, assessment, monitoring",
      "Only contract",
      "Only insurance"
    ],
    "correct": 1,
    "explain": "Third-party = assess, contract (SLA, liability), monitor; diversify if critical.",
    "obj": "1",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0142"
  },
  {
    "mode": "exam",
    "topic": "Security Architecture",
    "q": "Side-channel attack:",
    "options": [
      "Only network",
      "Extract info via timing, power, etc. (not direct)",
      "Only malware",
      "Only phishing"
    ],
    "correct": 1,
    "explain": "Side-channel = infer secret from timing, power, EM; countermeasures in crypto modules.",
    "obj": "3",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0143"
  },
  {
    "mode": "exam",
    "topic": "Network Security",
    "q": "Zero Trust principle:",
    "options": [
      "Trust internal network",
      "Never trust, always verify; least privilege",
      "Only VPN",
      "Only perimeter"
    ],
    "correct": 1,
    "explain": "Zero Trust = verify every request; assume breach; micro-segmentation, identity.",
    "obj": "4",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0144"
  },
  {
    "mode": "exam",
    "topic": "IAM",
    "q": "JIT (Just-In-Time) access:",
    "options": [
      "Permanent access",
      "Temporary, when needed; reduces standing privilege",
      "Only for users",
      "Only for admins"
    ],
    "correct": 1,
    "explain": "JIT = grant access for short window when needed; then revoke.",
    "obj": "5",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0145"
  },
  {
    "mode": "exam",
    "topic": "Security Operations",
    "q": "Chain of custody in forensics:",
    "options": [
      "Optional",
      "Document who had evidence, when; admissibility",
      "Only technical",
      "Only legal"
    ],
    "correct": 1,
    "explain": "Chain of custody = log every handoff; preserve admissibility in court.",
    "obj": "7",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0146"
  },
  {
    "mode": "exam",
    "topic": "Software Development Security",
    "q": "Secure SDLC:",
    "options": [
      "Security only at end",
      "Security in every phase (requirements to deployment)",
      "Only testing",
      "Only design"
    ],
    "correct": 1,
    "explain": "Secure SDLC = security requirements, threat model, secure code, test, deploy, operate.",
    "obj": "8",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0147"
  },
  {
    "mode": "exam",
    "topic": "Security and Risk Management",
    "q": "Data classification labels help:",
    "options": [
      "Only backup",
      "Determine handling and controls (confidential, public, etc.)",
      "Only retention",
      "Only deletion"
    ],
    "correct": 1,
    "explain": "Classification = label by sensitivity; drives encryption, access, retention.",
    "obj": "1",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0148"
  },
  {
    "mode": "exam",
    "topic": "Asset Security",
    "q": "Secure disposal of media:",
    "options": [
      "Only delete",
      "Degauss, wipe, or destroy per policy",
      "Only recycle",
      "Only donate"
    ],
    "correct": 1,
    "explain": "Disposal = clear/purge/destroy per classification; certificate of destruction.",
    "obj": "2",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0149"
  },
  {
    "mode": "exam",
    "topic": "Security Architecture",
    "q": "TLS certificate validates:",
    "options": [
      "Only encryption",
      "Server (or client) identity; PKI",
      "Only key exchange",
      "Only algorithm"
    ],
    "correct": 1,
    "explain": "Certificate = binds identity to public key; CA signs. Validates who you're talking to.",
    "obj": "3",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0150"
  },
  {
    "mode": "exam",
    "topic": "Network Security",
    "q": "DDoS mitigation:",
    "options": [
      "Only firewall",
      "Absorb/scrub traffic; scale, CDN, rate limit",
      "Only IDS",
      "Only block all"
    ],
    "correct": 1,
    "explain": "DDoS = absorb (scale), scrub (filter), CDN, rate limit; often use provider.",
    "obj": "4",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0151"
  },
  {
    "mode": "exam",
    "topic": "IAM",
    "q": "Attribute-Based Access Control (ABAC):",
    "options": [
      "Only roles",
      "Access based on attributes (user, resource, environment)",
      "Only DAC",
      "Only MAC"
    ],
    "correct": 1,
    "explain": "ABAC = policy on attributes (e.g., department, resource tag); flexible.",
    "obj": "5",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0152"
  },
  {
    "mode": "exam",
    "topic": "Security Assessment",
    "q": "Vulnerability management lifecycle:",
    "options": [
      "Only scan",
      "Discover, prioritize, remediate, verify",
      "Only patch",
      "Only report"
    ],
    "correct": 1,
    "explain": "Vuln management = scan, prioritize (risk), fix, rescan to verify.",
    "obj": "6",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0153"
  },
  {
    "mode": "exam",
    "topic": "Security Operations",
    "q": "Recovery Point Objective (RPO) drives:",
    "options": [
      "Only RTO",
      "Backup frequency (how much data loss acceptable)",
      "Only backup type",
      "Only restore time"
    ],
    "correct": 1,
    "explain": "RPO = max acceptable data loss; backup frequency must support it.",
    "obj": "7",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0154"
  },
  {
    "mode": "exam",
    "topic": "Software Development Security",
    "q": "Fuzzing is:",
    "options": [
      "Only static",
      "Send malformed/random input to find bugs",
      "Only manual",
      "Only design"
    ],
    "correct": 1,
    "explain": "Fuzzing = automated malformed input; find crashes, vulns. Dynamic testing.",
    "obj": "8",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0155"
  },
  {
    "mode": "exam",
    "topic": "Security and Risk Management",
    "q": "Risk mitigation:",
    "options": [
      "Accept risk",
      "Implement controls to reduce risk",
      "Transfer only",
      "Avoid only"
    ],
    "correct": 1,
    "explain": "Mitigate = reduce via controls. Transfer = insurance. Accept = take. Avoid = don't do.",
    "obj": "1",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0156"
  },
  {
    "mode": "exam",
    "topic": "Security Architecture",
    "q": "Confidentiality impact (FIPS 199):",
    "options": [
      "Only low",
      "Low, moderate, or high (unauthorized disclosure)",
      "Only high",
      "Only moderate"
    ],
    "correct": 1,
    "explain": "FIPS 199 = rate CIA impact low/moderate/high. Drives control selection.",
    "obj": "3",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0157"
  },
  {
    "mode": "exam",
    "topic": "Network Security",
    "q": "WPA3 improves over WPA2 with:",
    "options": [
      "Only speed",
      "Stronger key exchange (SAE), forward secrecy",
      "Only encryption",
      "Only password"
    ],
    "correct": 1,
    "explain": "WPA3 = SAE (dragonfly); forward secrecy; better against KRACK.",
    "obj": "4",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0158"
  },
  {
    "mode": "exam",
    "topic": "IAM",
    "q": "OpenID Connect (OIDC):",
    "options": [
      "Only authorization",
      "Identity layer on OAuth 2.0 (ID token)",
      "Only SAML",
      "Only LDAP"
    ],
    "correct": 1,
    "explain": "OIDC = OAuth 2.0 + ID token (JWT); authentication. OAuth = authorization.",
    "obj": "5",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0159"
  },
  {
    "mode": "exam",
    "topic": "Security Operations",
    "q": "Tabletop exercise:",
    "options": [
      "Live systems",
      "Discussion-based; walk through scenario",
      "Only technical",
      "Only external"
    ],
    "correct": 1,
    "explain": "Tabletop = discuss scenario, roles, decisions; no live systems.",
    "obj": "7",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0160"
  },
  {
    "mode": "exam",
    "topic": "Software Development Security",
    "q": "Sandbox for testing:",
    "options": [
      "Production only",
      "Isolated environment; safe to run untrusted",
      "Only dev",
      "Only staging"
    ],
    "correct": 1,
    "explain": "Sandbox = isolated; test malware or untrusted code safely.",
    "obj": "8",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0161"
  },
  {
    "mode": "exam",
    "topic": "Asset Security",
    "q": "Data owner is responsible for:",
    "options": [
      "Only backup",
      "Classification, access decisions, retention",
      "Only technical",
      "Only storage"
    ],
    "correct": 1,
    "explain": "Data owner = business; classify, who accesses, retention. Custodian = implement.",
    "obj": "2",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0162"
  },
  {
    "mode": "exam",
    "topic": "Security Architecture",
    "q": "TPM (Trusted Platform Module):",
    "options": [
      "Only software",
      "Hardware root of trust; keys, attestation",
      "Only encryption",
      "Only password"
    ],
    "correct": 1,
    "explain": "TPM = hardware chip; store keys, attestation, integrity (e.g., BitLocker).",
    "obj": "3",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0163"
  },
  {
    "mode": "exam",
    "topic": "Network Security",
    "q": "BPDU guard (spanning tree):",
    "options": [
      "Only routing",
      "Disable port if BPDU received; prevent loops",
      "Only VLAN",
      "Only STP"
    ],
    "correct": 1,
    "explain": "BPDU guard = errdisable port if BPDU; prevent rogue switch on access port.",
    "obj": "4",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0164"
  },
  {
    "mode": "exam",
    "topic": "Security Assessment",
    "q": "False negative in vuln scan:",
    "options": [
      "Vuln reported, not real",
      "Real vuln not reported",
      "No scan",
      "Scan failed"
    ],
    "correct": 1,
    "explain": "False negative = miss real vuln. False positive = report non-existent.",
    "obj": "6",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0165"
  },
  {
    "mode": "exam",
    "topic": "Security Operations",
    "q": "Incident severity is based on:",
    "options": [
      "Only technical",
      "Business impact (CIA, scope)",
      "Only count",
      "Only type"
    ],
    "correct": 1,
    "explain": "Severity = impact (downtime, data loss, scope); drive response priority.",
    "obj": "7",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0166"
  },
  {
    "mode": "exam",
    "topic": "Software Development Security",
    "q": "Compiler flags for security:",
    "options": [
      "Only optimization",
      "Stack protection, DEP, etc. (-fstack-protector)",
      "Only debug",
      "Only release"
    ],
    "correct": 1,
    "explain": "Secure flags = stack canary, ASLR, DEP; reduce overflow impact.",
    "obj": "8",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0167"
  },
  {
    "mode": "exam",
    "topic": "Security and Risk Management",
    "q": "Security governance:",
    "options": [
      "Only technical",
      "Framework for direction, control, accountability",
      "Only policy",
      "Only audit"
    ],
    "correct": 1,
    "explain": "Governance = direction, control, accountability; board/exec level.",
    "obj": "1",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0168"
  },
  {
    "mode": "exam",
    "topic": "Asset Security",
    "q": "Encryption key lifecycle:",
    "options": [
      "Only create",
      "Generate, use, rotate, archive, destroy",
      "Only use",
      "Only destroy"
    ],
    "correct": 1,
    "explain": "Key lifecycle = generate, distribute, use, rotate, archive, destroy.",
    "obj": "2",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0169"
  },
  {
    "mode": "exam",
    "topic": "Security Architecture",
    "q": "Waterfall (crypto) attack:",
    "options": [
      "Only network",
      "Compromise chain of trust (e.g., supply chain)",
      "Only password",
      "Only malware"
    ],
    "correct": 1,
    "explain": "Supply chain = compromise upstream; trust chain. Mitigate: verify, diversify.",
    "obj": "3",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0170"
  },
  {
    "mode": "exam",
    "topic": "Network Security",
    "q": "Port security (switch):",
    "options": [
      "Only VLAN",
      "Limit MACs per port; prevent unauthorized device",
      "Only ACL",
      "Only STP"
    ],
    "correct": 1,
    "explain": "Port security = allow only certain MACs; violation = disable or alert.",
    "obj": "4",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0171"
  },
  {
    "mode": "exam",
    "topic": "IAM",
    "q": "Password policy should require:",
    "options": [
      "Only length",
      "Length, complexity, history, expiry (balance usability)",
      "Only complexity",
      "No expiry"
    ],
    "correct": 1,
    "explain": "Policy = length, complexity, history, expiry; NIST suggests long passphrase, no arbitrary expiry.",
    "obj": "5",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0172"
  },
  {
    "mode": "exam",
    "topic": "Security Assessment",
    "q": "Scope creep in pen test:",
    "options": [
      "Good",
      "Bad; stick to agreed scope",
      "Only internal",
      "Only external"
    ],
    "correct": 1,
    "explain": "Scope creep = test beyond agreement; unprofessional, legal risk. Document scope.",
    "obj": "6",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0173"
  },
  {
    "mode": "exam",
    "topic": "Security Operations",
    "q": "Cold site:",
    "options": [
      "Fully equipped",
      "Space and power; restore from backup",
      "Live sync",
      "Warm only"
    ],
    "correct": 1,
    "explain": "Cold = facility only; restore from backup. Longest RTO.",
    "obj": "7",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0174"
  },
  {
    "mode": "exam",
    "topic": "Software Development Security",
    "q": "Peer code review:",
    "options": [
      "Only automated",
      "Human review; find bugs, improve quality",
      "Only SAST",
      "Only DAST"
    ],
    "correct": 1,
    "explain": "Peer review = human; logic, style, security. Complements SAST/DAST.",
    "obj": "8",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0175"
  },
  {
    "mode": "exam",
    "topic": "Security and Risk Management",
    "q": "SLE calculation uses:",
    "options": [
      "ARO only",
      "EF (Exposure Factor) and AV (Asset Value)",
      "Only AV",
      "Only EF"
    ],
    "correct": 1,
    "explain": "SLE = EF × AV. ALE = SLE × ARO.",
    "obj": "1",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0176"
  },
  {
    "mode": "exam",
    "topic": "Security Architecture",
    "q": "RAID 6:",
    "options": [
      "Only mirror",
      "Dual parity; two disk failure tolerance",
      "Only stripe",
      "Only RAID 5"
    ],
    "correct": 1,
    "explain": "RAID 6 = two parity; two disk failure. RAID 5 = one parity.",
    "obj": "3",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0177"
  },
  {
    "mode": "exam",
    "topic": "Network Security",
    "q": "DNS over HTTPS (DoH):",
    "options": [
      "No encryption",
      "Encrypts DNS queries (privacy)",
      "Only DNSSEC",
      "Only cache"
    ],
    "correct": 1,
    "explain": "DoH = DNS over HTTPS; privacy. DNSSEC = integrity, not confidentiality.",
    "obj": "4",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0178"
  },
  {
    "mode": "exam",
    "topic": "IAM",
    "q": "Account lockout prevents:",
    "options": [
      "Only weak passwords",
      "Brute force (lock after N failures)",
      "Only phishing",
      "Only replay"
    ],
    "correct": 1,
    "explain": "Lockout = disable after N failed logins; slow brute force. Balance with DoS (lockout abuse).",
    "obj": "5",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0179"
  },
  {
    "mode": "exam",
    "topic": "Security Operations",
    "q": "Post-incident review:",
    "options": [
      "Optional",
      "Lessons learned; improve process",
      "Only technical",
      "Only management"
    ],
    "correct": 1,
    "explain": "Post-incident = what happened, what worked, what to improve; blameless culture.",
    "obj": "7",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0180"
  },
  {
    "mode": "exam",
    "topic": "Software Development Security",
    "q": "Runtime application self-protection (RASP):",
    "options": [
      "Only design",
      "Protection inside app at runtime",
      "Only WAF",
      "Only firewall"
    ],
    "correct": 1,
    "explain": "RASP = instrumentation in app; detect/block at runtime. WAF = outside.",
    "obj": "8",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0181"
  },
  {
    "mode": "exam",
    "topic": "Asset Security",
    "q": "Data custodian:",
    "options": [
      "Classifies data",
      "Implements controls (storage, backup, access)",
      "Only owner",
      "Only user"
    ],
    "correct": 1,
    "explain": "Custodian = implement; storage, backup, access per policy. Owner = decides.",
    "obj": "2",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0182"
  },
  {
    "mode": "exam",
    "topic": "Security Architecture",
    "q": "Secure boot:",
    "options": [
      "Only BIOS",
      "Verify signature of each stage; prevent rootkit",
      "Only OS",
      "Only driver"
    ],
    "correct": 1,
    "explain": "Secure boot = signed firmware/OS; prevent unauthorized code at boot.",
    "obj": "3",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0183"
  },
  {
    "mode": "exam",
    "topic": "Network Security",
    "q": "MAC filtering (wireless):",
    "options": [
      "Strong security",
      "Weak; MAC spoofable; defense in depth only",
      "Only encryption",
      "Only WPA"
    ],
    "correct": 1,
    "explain": "MAC filter = easily spoofed; not sufficient alone. Use WPA3, 802.1X.",
    "obj": "4",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0184"
  },
  {
    "mode": "exam",
    "topic": "Security Assessment",
    "q": "Risk-based vulnerability management:",
    "options": [
      "Fix all equally",
      "Prioritize by exploitability, asset value, impact",
      "Only critical",
      "Only high"
    ],
    "correct": 1,
    "explain": "Prioritize = CVSS + context (exposed?, critical asset?); fix highest risk first.",
    "obj": "6",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0185"
  },
  {
    "mode": "exam",
    "topic": "Security Operations",
    "q": "Backup types: full, incremental, differential:",
    "options": [
      "Same thing",
      "Full = all; incremental = since last (any); differential = since last full",
      "Only full",
      "Only incremental"
    ],
    "correct": 1,
    "explain": "Full = everything. Incremental = since last backup. Differential = since last full.",
    "obj": "7",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0186"
  },
  {
    "mode": "exam",
    "topic": "Software Development Security",
    "q": "Container security includes:",
    "options": [
      "Only image",
      "Image scan, minimal image, non-root, network policy",
      "Only runtime",
      "Only host"
    ],
    "correct": 1,
    "explain": "Container = scan image, minimal base, non-root, limit capabilities, network policy.",
    "obj": "8",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0187"
  },
  {
    "mode": "exam",
    "topic": "Security and Risk Management",
    "q": "Compliance vs security:",
    "options": [
      "Same thing",
      "Compliance = meet regs; security = protect; can differ",
      "Only compliance",
      "Only security"
    ],
    "correct": 1,
    "explain": "Compliance = legal/regulatory. Security = risk-based. Compliant ≠ secure.",
    "obj": "1",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0188"
  },
  {
    "mode": "exam",
    "topic": "Security Architecture",
    "q": "Side-channel countermeasure:",
    "options": [
      "Only key size",
      "Constant-time crypto, blinding",
      "Only algorithm",
      "Only key rotation"
    ],
    "correct": 1,
    "explain": "Constant-time, blinding = reduce timing/power leakage. HSM helps.",
    "obj": "3",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0189"
  },
  {
    "mode": "exam",
    "topic": "Network Security",
    "q": "Network segmentation:",
    "options": [
      "Only physical",
      "Logical or physical; limit blast radius",
      "Only VLAN",
      "Only firewall"
    ],
    "correct": 1,
    "explain": "Segment = separate zones; breach in one doesn't mean all. VLAN, firewall, zero trust.",
    "obj": "4",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0190"
  },
  {
    "mode": "exam",
    "topic": "IAM",
    "q": "Session fixation:",
    "options": [
      "Only XSS",
      "Attacker sets session ID; victim uses it",
      "Only CSRF",
      "Only injection"
    ],
    "correct": 1,
    "explain": "Fixation = attacker gets victim to use attacker's session ID. Regenerate ID at login.",
    "obj": "5",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0191"
  },
  {
    "mode": "exam",
    "topic": "Security Operations",
    "q": "Disaster recovery plan (DRP):",
    "options": [
      "Same as BCP",
      "Restore IT/system after disaster",
      "Only backup",
      "Only RTO"
    ],
    "correct": 1,
    "explain": "DRP = restore systems. BCP = keep business running. Related but different.",
    "obj": "7",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0192"
  },
  {
    "mode": "exam",
    "topic": "Software Development Security",
    "q": "API security:",
    "options": [
      "Only HTTPS",
      "Auth (OAuth, API key), rate limit, input validation",
      "Only key",
      "Only encryption"
    ],
    "correct": 1,
    "explain": "API = authenticate, authorize, rate limit, validate input, audit.",
    "obj": "8",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0193"
  },
  {
    "mode": "exam",
    "topic": "Asset Security",
    "q": "Data masking types:",
    "options": [
      "Only encrypt",
      "Substitute, shuffle, redact, tokenize",
      "Only delete",
      "Only hash"
    ],
    "correct": 1,
    "explain": "Masking = substitute, shuffle, redact, tokenize; preserve format, not real value.",
    "obj": "2",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0194"
  },
  {
    "mode": "exam",
    "topic": "Security Architecture",
    "q": "HSM (Hardware Security Module):",
    "options": [
      "Only software",
      "Hardware; key generation, storage, crypto ops",
      "Only key storage",
      "Only backup"
    ],
    "correct": 1,
    "explain": "HSM = hardware; keys never leave; FIPS 140-2 Level 2+; high assurance.",
    "obj": "3",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0195"
  },
  {
    "mode": "exam",
    "topic": "Network Security",
    "q": "WAF (Web Application Firewall):",
    "options": [
      "Only network firewall",
      "Filters HTTP; SQLi, XSS, OWASP",
      "Only DDoS",
      "Only IDS"
    ],
    "correct": 1,
    "explain": "WAF = Layer 7; rules/signatures for web attacks; block or alert.",
    "obj": "4",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0196"
  },
  {
    "mode": "exam",
    "topic": "Security Assessment",
    "q": "Security testing in CI/CD:",
    "options": [
      "Only at end",
      "SAST, dependency scan, secrets scan in pipeline",
      "Only manual",
      "Only production"
    ],
    "correct": 1,
    "explain": "Shift left = SAST, dependency check, secret scan in pipeline; fail build if critical.",
    "obj": "6",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0197"
  },
  {
    "mode": "exam",
    "topic": "Security Operations",
    "q": "Retention of logs:",
    "options": [
      "Forever",
      "Per policy/regulation; then secure disposal",
      "Only 30 days",
      "Only 1 year"
    ],
    "correct": 1,
    "explain": "Retention = legal, compliance, incident need; then delete per policy.",
    "obj": "7",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0198"
  },
  {
    "mode": "exam",
    "topic": "Software Development Security",
    "q": "Least privilege in development:",
    "options": [
      "Only production",
      "Dev/test have minimal access; no prod from dev",
      "Only test",
      "Only admin"
    ],
    "correct": 1,
    "explain": "Dev = minimal access; separate accounts; no prod access from dev.",
    "obj": "8",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0199"
  },
  {
    "mode": "exam",
    "topic": "Security and Risk Management",
    "q": "Insurance as risk transfer:",
    "options": [
      "Eliminates risk",
      "Transfers financial impact to insurer",
      "Only technical",
      "Only physical"
    ],
    "correct": 1,
    "explain": "Transfer = insurance, contract; insurer bears financial loss. Risk still exists.",
    "obj": "1",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0200"
  },
  {
    "mode": "exam",
    "topic": "Security Architecture",
    "q": "Full disk encryption (FDE):",
    "options": [
      "Only files",
      "Encrypt entire volume; key in TPM or password",
      "Only OS",
      "Only backup"
    ],
    "correct": 1,
    "explain": "FDE = encrypt whole disk; key from TPM, password, or token. Protects at rest.",
    "obj": "3",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0201"
  },
  {
    "mode": "exam",
    "topic": "Network Security",
    "q": "SSL stripping attack:",
    "options": [
      "Only client",
      "Downgrade HTTPS to HTTP; MITM",
      "Only server",
      "Only DNS"
    ],
    "correct": 1,
    "explain": "SSL stripping = intercept, serve HTTP; user thinks no HTTPS. HSTS helps.",
    "obj": "4",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0202"
  },
  {
    "mode": "exam",
    "topic": "IAM",
    "q": "Time-based One-Time Password (TOTP):",
    "options": [
      "Only static",
      "Changes every N seconds; algo + time + secret",
      "Only HMAC",
      "Only SMS"
    ],
    "correct": 1,
    "explain": "TOTP = time-based; same secret, time step; both sides compute same code.",
    "obj": "5",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0203"
  },
  {
    "mode": "exam",
    "topic": "Security Operations",
    "q": "Evidence integrity:",
    "options": [
      "Optional",
      "Hash (e.g., SHA); document; chain of custody",
      "Only photograph",
      "Only copy"
    ],
    "correct": 1,
    "explain": "Hash at collection; document; chain of custody; preserve for court.",
    "obj": "7",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0204"
  },
  {
    "mode": "exam",
    "topic": "Software Development Security",
    "q": "Secure disposal of code/data in project:",
    "options": [
      "Only delete",
      "Secure delete; remove from repos, backups",
      "Only archive",
      "Only transfer"
    ],
    "correct": 1,
    "explain": "Dispose = secure delete; purge from repo, backups; retention may apply.",
    "obj": "8",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0205"
  },
  {
    "mode": "exam",
    "topic": "Asset Security",
    "q": "Data minimization:",
    "options": [
      "Collect everything",
      "Collect only what is necessary",
      "Only retention",
      "Only encryption"
    ],
    "correct": 1,
    "explain": "Minimization = collect/retain only necessary; privacy and risk reduction.",
    "obj": "2",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0206"
  },
  {
    "mode": "exam",
    "topic": "Security Architecture",
    "q": "Secure enclave (e.g., Intel SGX):",
    "options": [
      "Only VM",
      "CPU-protected memory; code/data isolated",
      "Only container",
      "Only TPM"
    ],
    "correct": 1,
    "explain": "Enclave = hardware-isolated region; attestation; protect keys/code.",
    "obj": "3",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0207"
  },
  {
    "mode": "exam",
    "topic": "Network Security",
    "q": "BGP hijacking:",
    "options": [
      "Only local",
      "Announce false routes; traffic diversion",
      "Only DNS",
      "Only DDoS"
    ],
    "correct": 1,
    "explain": "BGP hijack = announce prefixes you don't own; traffic to you. RPKI helps.",
    "obj": "4",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0208"
  },
  {
    "mode": "exam",
    "topic": "Security Assessment",
    "q": "Bug bounty:",
    "options": [
      "Only internal",
      "Reward researchers for valid vulns",
      "Only pen test",
      "Only scan"
    ],
    "correct": 1,
    "explain": "Bug bounty = reward for vulns; scope, rules; complement internal testing.",
    "obj": "6",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0209"
  },
  {
    "mode": "exam",
    "topic": "Security Operations",
    "q": "Runbook:",
    "options": [
      "Only policy",
      "Step-by-step procedures for operations/incidents",
      "Only design",
      "Only audit"
    ],
    "correct": 1,
    "explain": "Runbook = procedures; how to respond, restore; keep updated.",
    "obj": "7",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0210"
  },
  {
    "mode": "exam",
    "topic": "Software Development Security",
    "q": "Security requirements:",
    "options": [
      "Only after release",
      "Define in requirements phase (functional and security)",
      "Only functional",
      "Only design"
    ],
    "correct": 1,
    "explain": "Security requirements = define early; authentication, encryption, logging, etc.",
    "obj": "8",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0211"
  },
  {
    "mode": "exam",
    "topic": "Security and Risk Management",
    "q": "Audit committee role:",
    "options": [
      "Only technical",
      "Oversight; ensure audit independence",
      "Only audit execution",
      "Only compliance"
    ],
    "correct": 1,
    "explain": "Audit committee = board; oversee internal/external audit; independence.",
    "obj": "1",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0212"
  },
  {
    "mode": "exam",
    "topic": "Security Architecture",
    "q": "Data Execution Prevention (DEP):",
    "options": [
      "Only encrypt",
      "Mark memory no-execute; prevent code in data areas",
      "Only ASLR",
      "Only stack"
    ],
    "correct": 1,
    "explain": "DEP = NX bit; data regions not executable; stops some overflow exploits.",
    "obj": "3",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0213"
  },
  {
    "mode": "exam",
    "topic": "Network Security",
    "q": "Network tap:",
    "options": [
      "Only active",
      "Passive copy of traffic for monitoring",
      "Only IDS",
      "Only firewall"
    ],
    "correct": 1,
    "explain": "Tap = passive; copy traffic to monitor/IDS. Doesn't block.",
    "obj": "4",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0214"
  },
  {
    "mode": "exam",
    "topic": "IAM",
    "q": "Privilege creep:",
    "options": [
      "Good",
      "Accumulated access over time; periodic review",
      "Only new users",
      "Only admins"
    ],
    "correct": 1,
    "explain": "Privilege creep = users gain access over time; never lose. Mitigate: review, JIT.",
    "obj": "5",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0215"
  },
  {
    "mode": "exam",
    "topic": "Security Operations",
    "q": "Failover testing:",
    "options": [
      "Only once",
      "Regular test of DR/HA; validate RTO",
      "Only document",
      "Only backup"
    ],
    "correct": 1,
    "explain": "Test failover = ensure DR works; measure RTO; fix gaps.",
    "obj": "7",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0216"
  },
  {
    "mode": "exam",
    "topic": "Software Development Security",
    "q": "Secure coding standard (e.g., CERT, CWE):",
    "options": [
      "Only style",
      "Rules to avoid common vulns",
      "Only performance",
      "Only design"
    ],
    "correct": 1,
    "explain": "CERT, CWE, OWASP = guidelines; avoid buffer overflow, injection, etc.",
    "obj": "8",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0217"
  },
  {
    "mode": "exam",
    "topic": "Asset Security",
    "q": "Data sovereignty:",
    "options": [
      "Only technical",
      "Data subject to laws of where it resides",
      "Only backup",
      "Only cloud"
    ],
    "correct": 1,
    "explain": "Sovereignty = data in country X subject to X's laws; residency requirements.",
    "obj": "2",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0218"
  },
  {
    "mode": "exam",
    "topic": "Security Architecture",
    "q": "ASLR (Address Space Layout Randomization):",
    "options": [
      "Only encrypt",
      "Randomize memory layout; harder to exploit",
      "Only DEP",
      "Only stack"
    ],
    "correct": 1,
    "explain": "ASLR = randomize addresses; exploit can't assume location. With DEP, strong.",
    "obj": "3",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0219"
  },
  {
    "mode": "exam",
    "topic": "Network Security",
    "q": "Egress filtering:",
    "options": [
      "Only ingress",
      "Control outbound traffic; limit C2, data exfil",
      "Only allow all",
      "Only block all"
    ],
    "correct": 1,
    "explain": "Egress = restrict outbound; prevent C2, exfil. Ingress = restrict inbound.",
    "obj": "4",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0220"
  },
  {
    "mode": "exam",
    "topic": "Security Assessment",
    "q": "Compliance certification (e.g., SOC 2):",
    "options": [
      "Only internal",
      "Third-party attests to controls",
      "Only technical",
      "Only policy"
    ],
    "correct": 1,
    "explain": "SOC 2, ISO = auditor attests; report for customers/partners.",
    "obj": "6",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0221"
  },
  {
    "mode": "exam",
    "topic": "Security Operations",
    "q": "Security monitoring:",
    "options": [
      "Only logs",
      "Logs, metrics, alerts; detect anomalies",
      "Only IDS",
      "Only firewall"
    ],
    "correct": 1,
    "explain": "Monitoring = collect logs, metrics; correlate; alert on anomalies; SIEM, EDR.",
    "obj": "7",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0222"
  },
  {
    "mode": "exam",
    "topic": "Software Development Security",
    "q": "Environment separation:",
    "options": [
      "Dev = prod",
      "Dev, test, staging, prod; separate credentials, data",
      "Only dev and prod",
      "Only test"
    ],
    "correct": 1,
    "explain": "Separate envs = different credentials, data; prod isolated; no dev in prod.",
    "obj": "8",
    "level": 2,
    "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "id": "cissp-legacy-0223"
  }
];
