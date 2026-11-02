window.QUESTION_BANK_CISSP = [
      {
        "mode": "comparison",
        "topic": "Security and Risk Management",
        "q": "Which of the CIA triad components ensures that information is accessible only to authorized users?",
        "options": [
          "Integrity — less appropriate in this CISSP context",
          "Confidentiality",
          "Availability — less appropriate in this CISSP context",
          "Non-repudiation — less appropriate in this CISSP context"
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
          "Threat only — less appropriate in this CISSP context",
          "Threat × Vulnerability",
          "Vulnerability only — less appropriate in this CISSP context",
          "Asset × Control — less appropriate in this CISSP context"
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
          "CISO only — less appropriate in this CISSP context",
          "Business owners/data owners",
          "IT staff — less appropriate in this CISSP context",
          "Auditors — less appropriate in this CISSP context"
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
          "Single strong control — less appropriate in this CISSP context",
          "Multiple layers of security controls",
          "Perimeter-only security — less appropriate in this CISSP context",
          "Physical security only — less appropriate in this CISSP context"
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
          "Data in transit — less appropriate in this CISSP context",
          "Residual data left on storage after deletion",
          "Data classification — less appropriate in this CISSP context",
          "Data encryption — less appropriate in this CISSP context"
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
          "Availability — less appropriate in this CISSP context",
          "Integrity (Biba) — less appropriate in this CISSP context",
          "Confidentiality (no read up, no write down)",
          "All of the above — less appropriate in this CISSP context"
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
          "Large and complex — less appropriate in this CISSP context",
          "Small, tamperproof, and verifiable",
          "User-space only — less appropriate in this CISSP context",
          "Network-facing — less appropriate in this CISSP context"
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
          "Layer 2 — less appropriate in this CISSP context",
          "Layer 3 (Network)",
          "Layer 4 — less appropriate in this CISSP context",
          "Layer 7 — less appropriate in this CISSP context"
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
          "Store backups — less appropriate in this CISSP context",
          "Host public-facing services with controlled access",
          "Encrypt data — less appropriate in this CISSP context",
          "Run antivirus — less appropriate in this CISSP context"
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
          "Two passwords — less appropriate in this CISSP context",
          "Something you know + something you have or are",
          "Only biometrics — less appropriate in this CISSP context",
          "Only smart cards — less appropriate in this CISSP context"
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
          "Pen test is automated only — less appropriate in this CISSP context",
          "Pen test exploits vulnerabilities to demonstrate impact",
          "Vuln scan exploits systems — less appropriate in this CISSP context",
          "They are identical — less appropriate in this CISSP context"
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
          "Natural disasters — less appropriate in this CISSP context",
          "Fraud (single person cannot complete critical task alone)",
          "Network outages — less appropriate in this CISSP context",
          "Hardware failure — less appropriate in this CISSP context"
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
          "Only technical recovery — less appropriate in this CISSP context",
          "Business continuity during disruption",
          "Penetration testing only — less appropriate in this CISSP context",
          "Code review only — less appropriate in this CISSP context"
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
          "Security by obscurity — less appropriate in this CISSP context",
          "Secure by design / Shift left",
          "Penetration testing only — less appropriate in this CISSP context",
          "Post-release patching — less appropriate in this CISSP context"
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
          "Physical attack — less appropriate in this CISSP context",
          "Injection attack (improper input validation)",
          "DoS only — less appropriate in this CISSP context",
          "Social engineering only — less appropriate in this CISSP context"
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
          "Only subjective judgment — less appropriate in this CISSP context",
          "Numerical values (ALE, SLE, ARO)",
          "No formulas — less appropriate in this CISSP context",
          "Qualitative only — less appropriate in this CISSP context"
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
          "Total risk before controls — less appropriate in this CISSP context",
          "Risk remaining after controls",
          "Inherent risk only — less appropriate in this CISSP context",
          "Threat only — less appropriate in this CISSP context"
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
          "Performing the day-to-day security activities — less appropriate in this CISSP context",
          "Verifying compliance after an incident — less appropriate in this CISSP context",
          "Transferring risk to an insurer — less appropriate in this CISSP context"
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
          "Backup only — less appropriate in this CISSP context",
          "Evidence integrity in forensics",
          "Encryption only — less appropriate in this CISSP context",
          "Access control only — less appropriate in this CISSP context"
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
          "System fails open — less appropriate in this CISSP context",
          "System defaults to secure state on failure",
          "No failure possible — less appropriate in this CISSP context",
          "Manual override only — less appropriate in this CISSP context"
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
          "Only encryption — less appropriate in this CISSP context",
          "Port-based network access control (NAC)",
          "Antivirus — less appropriate in this CISSP context",
          "IDS only — less appropriate in this CISSP context"
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
          "Real vulnerability missed — less appropriate in this CISSP context",
          "Vulnerability reported but does not exist",
          "No scan performed — less appropriate in this CISSP context",
          "Scan failed — less appropriate in this CISSP context"
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
          "Physical drills only — less appropriate in this CISSP context",
          "Discussing response procedures (no live systems)",
          "Penetration testing — less appropriate in this CISSP context",
          "Code deployment — less appropriate in this CISSP context"
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
          "Hardware only — less appropriate in this CISSP context",
          "Web application security risks",
          "Physical security — less appropriate in this CISSP context",
          "Encryption algorithms — less appropriate in this CISSP context"
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
          "Step-by-step procedure — less appropriate in this CISSP context",
          "High-level management directive",
          "Technical baseline — less appropriate in this CISSP context",
          "Guideline only — less appropriate in this CISSP context"
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
          "Two different keys — less appropriate in this CISSP context",
          "Same key for encrypt and decrypt",
          "Public key only — less appropriate in this CISSP context",
          "No key — less appropriate in this CISSP context"
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
          "Store production data — less appropriate in this CISSP context",
          "Decoy to attract and study attackers",
          "Encrypt traffic — less appropriate in this CISSP context",
          "Load balance — less appropriate in this CISSP context"
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
          "Maximum access for all — less appropriate in this CISSP context",
          "Minimum access necessary to perform job",
          "No access control — less appropriate in this CISSP context",
          "Admin for everyone — less appropriate in this CISSP context"
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
          "Maximum Time To Recover — less appropriate in this CISSP context",
          "Mean Time To Repair/Recover",
          "Minimum Time To Respond — less appropriate in this CISSP context",
          "Mean Time To Reboot — less appropriate in this CISSP context"
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
          "Hardware failure — less appropriate in this CISSP context",
          "Injection attacks (XSS, SQLi)",
          "Power outage — less appropriate in this CISSP context",
          "Physical theft — less appropriate in this CISSP context"
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
          "Only technical systems — less appropriate in this CISSP context",
          "Critical business functions and impact of disruption",
          "Threat actors only — less appropriate in this CISSP context",
          "Encryption keys only — less appropriate in this CISSP context"
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
          "Encrypt all data — less appropriate in this CISSP context",
          "Protect sensitive data in non-prod (e.g., PII)",
          "Delete data — less appropriate in this CISSP context",
          "Backup only — less appropriate in this CISSP context"
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
          "Single vendor for all — less appropriate in this CISSP context",
          "Layered controls from different types/vendors",
          "No redundancy — less appropriate in this CISSP context",
          "Physical only — less appropriate in this CISSP context"
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
          "Encryption of DNS traffic — less appropriate in this CISSP context",
          "Authentication and integrity of DNS responses",
          "Faster DNS only — less appropriate in this CISSP context",
          "No security — less appropriate in this CISSP context"
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
          "Only new features — less appropriate in this CISSP context",
          "Changes do not break existing functionality",
          "No testing — less appropriate in this CISSP context",
          "Pen test only — less appropriate in this CISSP context"
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
          "Maximum data loss — less appropriate in this CISSP context",
          "Backup frequency — less appropriate in this CISSP context",
          "Encryption strength — less appropriate in this CISSP context"
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
          "Encrypts source code — less appropriate in this CISSP context",
          "Stores source code with third party for contingency",
          "Deletes code — less appropriate in this CISSP context",
          "Publishes code — less appropriate in this CISSP context"
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
          "Technical evaluation only — less appropriate in this CISSP context",
          "Management approval to operate (authorization)",
          "Pen test only — less appropriate in this CISSP context",
          "Audit only — less appropriate in this CISSP context"
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
          "Single org only — less appropriate in this CISSP context",
          "Cross-domain SSO (trust between orgs)",
          "No SSO — less appropriate in this CISSP context",
          "Only local auth — less appropriate in this CISSP context"
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
          "Maximum configuration — less appropriate in this CISSP context",
          "Minimum secure configuration standard",
          "Optional guideline — less appropriate in this CISSP context",
          "Policy only — less appropriate in this CISSP context"
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
          "Only confidentiality — less appropriate in this CISSP context",
          "Integrity + Authentication + Non-Repudiation",
          "Only availability — less appropriate in this CISSP context",
          "Only authorization — less appropriate in this CISSP context"
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
          "Access, Audit, Asset — less appropriate in this CISSP context",
          "Authentication, Authorization, Accountability",
          "Availability, Accuracy, Assurance — less appropriate in this CISSP context",
          "Assessment, Approval, Audit — less appropriate in this CISSP context"
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
          "EF × AV only — less appropriate in this CISSP context",
          "SLE × ARO (or ARO × EF × AV)",
          "AV only — less appropriate in this CISSP context",
          "ARO only — less appropriate in this CISSP context"
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
          "ARO × EF — less appropriate in this CISSP context",
          "EF × AV (Exposure Factor × Asset Value)",
          "ALE / ARO — less appropriate in this CISSP context",
          "AV only — less appropriate in this CISSP context"
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
          "Type 2 error — less appropriate in this CISSP context",
          "Type 1 error - system fails to accept authorized user",
          "CER — less appropriate in this CISSP context",
          "FAR — less appropriate in this CISSP context"
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
          "Authentication only — less appropriate in this CISSP context",
          "Delegated authorization (authorize app to access resources on your behalf)",
          "Encryption only — less appropriate in this CISSP context",
          "Hashing only — less appropriate in this CISSP context"
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
          "CBC — less appropriate in this CISSP context",
          "CTR — less appropriate in this CISSP context",
          "ECB - Electronic Codebook",
          "GCM — less appropriate in this CISSP context"
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
          "Only confidentiality — less appropriate in this CISSP context",
          "Authentication and integrity (hash over message + shared secret)",
          "Only encryption — less appropriate in this CISSP context",
          "Non-repudiation only — less appropriate in this CISSP context"
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
          "Only Revoked — less appropriate in this CISSP context",
          "Good, Revoked, or Unknown",
          "Only Good — less appropriate in this CISSP context",
          "Only Unknown — less appropriate in this CISSP context"
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
          "The same as an Incident — less appropriate in this CISSP context",
          "The underlying root cause of an incident or potential incident",
          "Only a minor issue — less appropriate in this CISSP context",
          "Always resolved immediately — less appropriate in this CISSP context"
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
          "Only after court order — less appropriate in this CISSP context",
          "Before a case is filed—to preserve potential evidence",
          "Only by judge — less appropriate in this CISSP context",
          "Only by attorney — less appropriate in this CISSP context"
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
          "Collect everything at once — less appropriate in this CISSP context",
          "Gather evidence that will degrade first (e.g., RAM before disk)",
          "Ignore volatility — less appropriate in this CISSP context",
          "Collect disk first — less appropriate in this CISSP context"
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
          "Data cannot be recovered by any known technique — less appropriate in this CISSP context",
          "Data cleared but may be recovered by forensic equipment",
          "Same as deletion — less appropriate in this CISSP context",
          "Same as overwrite — less appropriate in this CISSP context"
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
          "Read up allowed — less appropriate in this CISSP context",
          "No read down (subject must not read lower integrity data)",
          "Write down allowed — less appropriate in this CISSP context",
          "Same as Bell-LaPadula — less appropriate in this CISSP context"
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
          "Continuing service during outage — less appropriate in this CISSP context",
          "How we restore operations back to normal after disaster",
          "Same as BCP — less appropriate in this CISSP context",
          "Only backups — less appropriate in this CISSP context"
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
          "Max time to restore — less appropriate in this CISSP context",
          "Maximum acceptable data loss",
          "Max downtime — less appropriate in this CISSP context",
          "Backup frequency only — less appropriate in this CISSP context"
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
          "Empty space to rebuild — less appropriate in this CISSP context",
          "Everything synced live; ready for immediate failover",
          "Scheduled sync only — less appropriate in this CISSP context",
          "Cold start only — less appropriate in this CISSP context"
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
          "Only striping — less appropriate in this CISSP context",
          "Striping with parity; single disk failure tolerated",
          "Mirroring only — less appropriate in this CISSP context",
          "No redundancy — less appropriate in this CISSP context"
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
          "The process — less appropriate in this CISSP context",
          "The system we use to label data by impact of CIA loss",
          "Same as categorization — less appropriate in this CISSP context",
          "Only for DoD — less appropriate in this CISSP context"
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
          "Owner-defined permissions only — less appropriate in this CISSP context",
          "Classification, clearance, labels, need-to-know",
          "Roles only — less appropriate in this CISSP context",
          "Attributes only — less appropriate in this CISSP context"
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
          "Encryption — less appropriate in this CISSP context",
          "Rainbow tables by exponentially increasing work factor",
          "Brute force only — less appropriate in this CISSP context",
          "Dictionary attacks only — less appropriate in this CISSP context"
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
          "The client workstation (supplicant) — less appropriate in this CISSP context",
          "The network switch or wireless access point",
          "The RADIUS server — less appropriate in this CISSP context",
          "The domain controller — less appropriate in this CISSP context"
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
          "Always discharge on heat — less appropriate in this CISSP context",
          "Delay discharge until verification of true positive (e.g., two detectors)",
          "Same as deluge — less appropriate in this CISSP context",
          "No verification — less appropriate in this CISSP context"
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
          "Hardware failures — less appropriate in this CISSP context",
          "Fraud (investigate while person is away)",
          "Network issues — less appropriate in this CISSP context",
          "Encryption problems — less appropriate in this CISSP context"
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
          "The service — less appropriate in this CISSP context",
          "The Authentication Service (AS) / KDC",
          "The client — less appropriate in this CISSP context",
          "LDAP — less appropriate in this CISSP context"
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
          "Only integrity — less appropriate in this CISSP context",
          "Confidentiality, integrity, replay protection, authentication",
          "Only authentication — less appropriate in this CISSP context",
          "No encryption — less appropriate in this CISSP context"
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
          "Only brute force — less appropriate in this CISSP context",
          "Man-in-the-Middle (MitM) - needs authentication",
          "Nothing — less appropriate in this CISSP context",
          "Replay only — less appropriate in this CISSP context"
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
          "Self-attestation only — less appropriate in this CISSP context",
          "In-person registration AND identification verified by 3rd party CSP",
          "Optional in-person — less appropriate in this CISSP context",
          "Form only — less appropriate in this CISSP context"
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
          "Firewalls and IDS — less appropriate in this CISSP context",
          "Directives (policy, training, SOPs, banners)",
          "Guards and locks — less appropriate in this CISSP context",
          "Encryption — less appropriate in this CISSP context"
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
          "Basic security only — less appropriate in this CISSP context",
          "Tamper evident + role-based auth — less appropriate in this CISSP context",
          "Tamper resistant + identity-based auth (attempting break destroys data)",
          "Environmental protections — less appropriate in this CISSP context"
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
          "Risk after controls — less appropriate in this CISSP context",
          "Risk before any controls",
          "Residual risk — less appropriate in this CISSP context",
          "Transferred risk — less appropriate in this CISSP context"
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
          "Optional guideline — less appropriate in this CISSP context",
          "Mandatory requirement (specific)",
          "High-level policy — less appropriate in this CISSP context",
          "Step-by-step procedure — less appropriate in this CISSP context"
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
          "Data at rest — less appropriate in this CISSP context",
          "Data being processed in memory",
          "Data in transit — less appropriate in this CISSP context",
          "Data in backup — less appropriate in this CISSP context"
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
          "Large — less appropriate in this CISSP context",
          "Tamperproof, always invoked, small enough to verify",
          "User-mode — less appropriate in this CISSP context",
          "Optional — less appropriate in this CISSP context"
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
          "Only best-effort — less appropriate in this CISSP context",
          "Reliable, ordered delivery",
          "Only encryption — less appropriate in this CISSP context",
          "Only authentication — less appropriate in this CISSP context"
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
          "Who you are — less appropriate in this CISSP context",
          "What you can access",
          "When you logged in — less appropriate in this CISSP context",
          "Where you are — less appropriate in this CISSP context"
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
          "Security At Runtime — less appropriate in this CISSP context",
          "Static Application Security Testing",
          "System Access Security Test — less appropriate in this CISSP context",
          "Secure Authentication Standard — less appropriate in this CISSP context"
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
          "Ignore the incident — less appropriate in this CISSP context",
          "Contain and preserve evidence",
          "Delete logs — less appropriate in this CISSP context",
          "Restart all systems — less appropriate in this CISSP context"
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
          "SQL injection — less appropriate in this CISSP context",
          "Injecting malicious script into web page viewed by others",
          "Buffer overflow — less appropriate in this CISSP context",
          "DoS — less appropriate in this CISSP context"
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
          "Eliminating risk — less appropriate in this CISSP context",
          "Formally accepting residual risk",
          "Transferring risk — less appropriate in this CISSP context",
          "Ignoring risk without approval — less appropriate in this CISSP context"
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
          "Only 128 — less appropriate in this CISSP context",
          "128, 192, or 256 bits",
          "Only 256 — less appropriate in this CISSP context",
          "Only 56 — less appropriate in this CISSP context"
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
          "Only authentication — less appropriate in this CISSP context",
          "Encryption and integrity for tunneled traffic",
          "Only integrity — less appropriate in this CISSP context",
          "Only availability — less appropriate in this CISSP context"
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
          "Reject authorized user — less appropriate in this CISSP context",
          "Accept unauthorized user (Type 2)",
          "Same as FRR — less appropriate in this CISSP context",
          "Crossover rate — less appropriate in this CISSP context"
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
          "No equipment — less appropriate in this CISSP context",
          "Equipment but not fully synced; some recovery time",
          "Live sync — less appropriate in this CISSP context",
          "Empty space — less appropriate in this CISSP context"
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
          "Only encryption — less appropriate in this CISSP context",
          "Bounds checking, ASLR, DEP",
          "Only input validation — less appropriate in this CISSP context",
          "Only firewall — less appropriate in this CISSP context"
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
          "Dollar values only — less appropriate in this CISSP context",
          "Categories (e.g., High, Medium, Low)",
          "ALE only — less appropriate in this CISSP context",
          "SLE only — less appropriate in this CISSP context"
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
          "Physical destruction — less appropriate in this CISSP context",
          "Overwrite so normal methods cannot recover",
          "Same as purging — less appropriate in this CISSP context",
          "Encryption only — less appropriate in this CISSP context"
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
          "Only confidentiality — less appropriate in this CISSP context",
          "Integrity, authentication, non-repudiation",
          "Only encryption — less appropriate in this CISSP context",
          "Only availability — less appropriate in this CISSP context"
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
          "Same thing — less appropriate in this CISSP context",
          "IDS = detect; IPS = detect and block",
          "IPS only detects — less appropriate in this CISSP context",
          "IDS blocks — less appropriate in this CISSP context"
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
          "Encryption only — less appropriate in this CISSP context",
          "SSO / federated authentication (assertions)",
          "Only authorization — less appropriate in this CISSP context",
          "Only hashing — less appropriate in this CISSP context"
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
          "Static testing — less appropriate in this CISSP context",
          "Dynamic; tests running application",
          "Only code review — less appropriate in this CISSP context",
          "Only design — less appropriate in this CISSP context"
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
          "Technical team only — less appropriate in this CISSP context",
          "Business impact analysis (BIA)",
          "Only IT — less appropriate in this CISSP context",
          "Only audit — less appropriate in this CISSP context"
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
          "Only after release — less appropriate in this CISSP context",
          "Identify threats and mitigations early in SDLC",
          "Only network — less appropriate in this CISSP context",
          "Only physical — less appropriate in this CISSP context"
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
          "Only assets — less appropriate in this CISSP context",
          "Risks, owners, mitigation, status",
          "Only threats — less appropriate in this CISSP context",
          "Only controls — less appropriate in this CISSP context"
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
          "Confidentiality — less appropriate in this CISSP context",
          "Integrity (one-way; cannot derive input)",
          "Encryption — less appropriate in this CISSP context",
          "Authentication only — less appropriate in this CISSP context"
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
          "Layer 2 — less appropriate in this CISSP context",
          "Layer 4 — less appropriate in this CISSP context",
          "Layer 5 (session) / between app and transport",
          "Layer 1 — less appropriate in this CISSP context"
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
          "Labels only — less appropriate in this CISSP context",
          "Owner controls permissions",
          "Only admin — less appropriate in this CISSP context",
          "Only roles — less appropriate in this CISSP context"
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
          "Defends only — less appropriate in this CISSP context",
          "Simulates adversary (attack)",
          "Only scans — less appropriate in this CISSP context",
          "Only policy — less appropriate in this CISSP context"
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
          "3 backups, 2 types, 1 location — less appropriate in this CISSP context",
          "3 copies, 2 different media, 1 offsite",
          "3 days, 2 weeks, 1 month — less appropriate in this CISSP context",
          "Only 3 copies — less appropriate in this CISSP context"
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
          "Only build — less appropriate in this CISSP context",
          "Secure pipeline: signed code, vuln scan, secrets management",
          "Only deploy — less appropriate in this CISSP context",
          "Only test — less appropriate in this CISSP context"
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
          "Only contract — less appropriate in this CISSP context",
          "Assessment, contract, ongoing monitoring",
          "Only assessment — less appropriate in this CISSP context",
          "Only SLA — less appropriate in this CISSP context"
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
          "Only backup — less appropriate in this CISSP context",
          "How long to keep data; legal and business",
          "Only delete — less appropriate in this CISSP context",
          "Only archive — less appropriate in this CISSP context"
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
          "Striping only — less appropriate in this CISSP context",
          "Mirroring (duplicate)",
          "Striping + parity — less appropriate in this CISSP context",
          "No redundancy — less appropriate in this CISSP context"
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
          "Encryption — less appropriate in this CISSP context",
          "Logical segmentation (broadcast domain)",
          "Only wireless — less appropriate in this CISSP context",
          "Only routing — less appropriate in this CISSP context"
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
          "Never timeout — less appropriate in this CISSP context",
          "Timeout, invalidate on logout, secure token",
          "Only logout — less appropriate in this CISSP context",
          "Only password — less appropriate in this CISSP context"
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
          "Only technical — less appropriate in this CISSP context",
          "Conformance to policy, standards, regulations",
          "Only penetration — less appropriate in this CISSP context",
          "Only vulnerability — less appropriate in this CISSP context"
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
          "Disk first — less appropriate in this CISSP context",
          "Most volatile first: RAM, cache, disk",
          "Only RAM — less appropriate in this CISSP context",
          "Only disk — less appropriate in this CISSP context"
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
          "Only performance — less appropriate in this CISSP context",
          "Input validation, output encoding, parameterized queries",
          "Only comments — less appropriate in this CISSP context",
          "Only design — less appropriate in this CISSP context"
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
          "One-time only — less appropriate in this CISSP context",
          "Ongoing; role-based; measured",
          "Only for IT — less appropriate in this CISSP context",
          "Only for new hires — less appropriate in this CISSP context"
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
          "Only encryption — less appropriate in this CISSP context",
          "Digital signatures (or trusted logs)",
          "Only hashing — less appropriate in this CISSP context",
          "Only password — less appropriate in this CISSP context"
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
          "Only packet header — less appropriate in this CISSP context",
          "Tracks connection state; allow return traffic",
          "Only stateless — less appropriate in this CISSP context",
          "Only Layer 2 — less appropriate in this CISSP context"
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
          "Same as IAM — less appropriate in this CISSP context",
          "Control and monitor privileged (admin) access",
          "Only MFA — less appropriate in this CISSP context",
          "Only password — less appropriate in this CISSP context"
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
          "Unlimited — less appropriate in this CISSP context",
          "Defined in writing (systems, methods, timing)",
          "Only technical — less appropriate in this CISSP context",
          "Only external — less appropriate in this CISSP context"
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
          "Only tool — less appropriate in this CISSP context",
          "Computer Security Incident Response Team",
          "Only software — less appropriate in this CISSP context",
          "Only policy — less appropriate in this CISSP context"
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
          "Only performance — less appropriate in this CISSP context",
          "Integrity and origin of code",
          "Only license — less appropriate in this CISSP context",
          "Only version — less appropriate in this CISSP context"
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
          "Same as tolerance — less appropriate in this CISSP context",
          "Amount of risk organization will accept",
          "Only technical — less appropriate in this CISSP context",
          "Only financial — less appropriate in this CISSP context"
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
          "Only backup — less appropriate in this CISSP context",
          "Detect/prevent sensitive data exfiltration",
          "Only encryption — less appropriate in this CISSP context",
          "Only access control — less appropriate in this CISSP context"
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
          "Only encryption — less appropriate in this CISSP context",
          "Third party holds key (recovery, legal)",
          "Only backup — less appropriate in this CISSP context",
          "Only key rotation — less appropriate in this CISSP context"
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
          "Only firewall — less appropriate in this CISSP context",
          "Control device access to network (compliant, authenticated)",
          "Only VPN — less appropriate in this CISSP context",
          "Only IDS — less appropriate in this CISSP context"
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
          "Only within org — less appropriate in this CISSP context",
          "Between identity providers (e.g., org and cloud)",
          "Only SAML — less appropriate in this CISSP context",
          "Only OAuth — less appropriate in this CISSP context"
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
          "Only vuln scan — less appropriate in this CISSP context",
          "Check config against baseline (CIS, custom)",
          "Only pen test — less appropriate in this CISSP context",
          "Only code review — less appropriate in this CISSP context"
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
          "Only network — less appropriate in this CISSP context",
          "Logs and events; correlation, alerting",
          "Only endpoints — less appropriate in this CISSP context",
          "Only firewall — less appropriate in this CISSP context"
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
          "Only performance — less appropriate in this CISSP context",
          "Scan libraries for known vulnerabilities",
          "Only license — less appropriate in this CISSP context",
          "Only version — less appropriate in this CISSP context"
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
          "Ignored — less appropriate in this CISSP context",
          "Mitigated by contract, assessment, monitoring",
          "Only contract — less appropriate in this CISSP context",
          "Only insurance — less appropriate in this CISSP context"
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
          "Only network — less appropriate in this CISSP context",
          "Extract info via timing, power, etc. (not direct)",
          "Only malware — less appropriate in this CISSP context",
          "Only phishing — less appropriate in this CISSP context"
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
          "Trust internal network — less appropriate in this CISSP context",
          "Never trust, always verify; least privilege",
          "Only VPN — less appropriate in this CISSP context",
          "Only perimeter — less appropriate in this CISSP context"
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
          "Permanent access — less appropriate in this CISSP context",
          "Temporary, when needed; reduces standing privilege",
          "Only for users — less appropriate in this CISSP context",
          "Only for admins — less appropriate in this CISSP context"
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
          "Optional — less appropriate in this CISSP context",
          "Document who had evidence, when; admissibility",
          "Only technical — less appropriate in this CISSP context",
          "Only legal — less appropriate in this CISSP context"
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
          "Security only at end — less appropriate in this CISSP context",
          "Security in every phase (requirements to deployment)",
          "Only testing — less appropriate in this CISSP context",
          "Only design — less appropriate in this CISSP context"
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
          "Only backup — less appropriate in this CISSP context",
          "Determine handling and controls (confidential, public, etc.)",
          "Only retention — less appropriate in this CISSP context",
          "Only deletion — less appropriate in this CISSP context"
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
          "Only delete — less appropriate in this CISSP context",
          "Degauss, wipe, or destroy per policy",
          "Only recycle — less appropriate in this CISSP context",
          "Only donate — less appropriate in this CISSP context"
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
          "Only encryption — less appropriate in this CISSP context",
          "Server (or client) identity; PKI",
          "Only key exchange — less appropriate in this CISSP context",
          "Only algorithm — less appropriate in this CISSP context"
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
          "Only firewall — less appropriate in this CISSP context",
          "Absorb/scrub traffic; scale, CDN, rate limit",
          "Only IDS — less appropriate in this CISSP context",
          "Only block all — less appropriate in this CISSP context"
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
          "Only roles — less appropriate in this CISSP context",
          "Access based on attributes (user, resource, environment)",
          "Only DAC — less appropriate in this CISSP context",
          "Only MAC — less appropriate in this CISSP context"
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
          "Only scan — less appropriate in this CISSP context",
          "Discover, prioritize, remediate, verify",
          "Only patch — less appropriate in this CISSP context",
          "Only report — less appropriate in this CISSP context"
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
          "Only RTO — less appropriate in this CISSP context",
          "Backup frequency (how much data loss acceptable)",
          "Only backup type — less appropriate in this CISSP context",
          "Only restore time — less appropriate in this CISSP context"
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
          "Only static — less appropriate in this CISSP context",
          "Send malformed/random input to find bugs",
          "Only manual — less appropriate in this CISSP context",
          "Only design — less appropriate in this CISSP context"
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
          "Accept risk — less appropriate in this CISSP context",
          "Implement controls to reduce risk",
          "Transfer only — less appropriate in this CISSP context",
          "Avoid only — less appropriate in this CISSP context"
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
          "Only low — less appropriate in this CISSP context",
          "Low, moderate, or high (unauthorized disclosure)",
          "Only high — less appropriate in this CISSP context",
          "Only moderate — less appropriate in this CISSP context"
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
          "Only speed — less appropriate in this CISSP context",
          "Stronger key exchange (SAE), forward secrecy",
          "Only encryption — less appropriate in this CISSP context",
          "Only password — less appropriate in this CISSP context"
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
          "Only authorization — less appropriate in this CISSP context",
          "Identity layer on OAuth 2.0 (ID token)",
          "Only SAML — less appropriate in this CISSP context",
          "Only LDAP — less appropriate in this CISSP context"
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
          "Live systems — less appropriate in this CISSP context",
          "Discussion-based; walk through scenario",
          "Only technical — less appropriate in this CISSP context",
          "Only external — less appropriate in this CISSP context"
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
          "Production only — less appropriate in this CISSP context",
          "Isolated environment; safe to run untrusted",
          "Only dev — less appropriate in this CISSP context",
          "Only staging — less appropriate in this CISSP context"
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
          "Only backup — less appropriate in this CISSP context",
          "Classification, access decisions, retention",
          "Only technical — less appropriate in this CISSP context",
          "Only storage — less appropriate in this CISSP context"
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
          "Only software — less appropriate in this CISSP context",
          "Hardware root of trust; keys, attestation",
          "Only encryption — less appropriate in this CISSP context",
          "Only password — less appropriate in this CISSP context"
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
          "Only routing — less appropriate in this CISSP context",
          "Disable port if BPDU received; prevent loops",
          "Only VLAN — less appropriate in this CISSP context",
          "Only STP — less appropriate in this CISSP context"
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
          "Only technical — less appropriate in this CISSP context",
          "Business impact (CIA, scope)",
          "Only count — less appropriate in this CISSP context",
          "Only type — less appropriate in this CISSP context"
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
          "Only optimization — less appropriate in this CISSP context",
          "Stack protection, DEP, etc. (-fstack-protector)",
          "Only debug — less appropriate in this CISSP context",
          "Only release — less appropriate in this CISSP context"
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
          "Only technical — less appropriate in this CISSP context",
          "Framework for direction, control, accountability",
          "Only policy — less appropriate in this CISSP context",
          "Only audit — less appropriate in this CISSP context"
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
          "Only create — less appropriate in this CISSP context",
          "Generate, use, rotate, archive, destroy",
          "Only use — less appropriate in this CISSP context",
          "Only destroy — less appropriate in this CISSP context"
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
          "Only network — less appropriate in this CISSP context",
          "Compromise chain of trust (e.g., supply chain)",
          "Only password — less appropriate in this CISSP context",
          "Only malware — less appropriate in this CISSP context"
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
          "Only VLAN — less appropriate in this CISSP context",
          "Limit MACs per port; prevent unauthorized device",
          "Only ACL — less appropriate in this CISSP context",
          "Only STP — less appropriate in this CISSP context"
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
          "Only length — less appropriate in this CISSP context",
          "Length, complexity, history, expiry (balance usability)",
          "Only complexity — less appropriate in this CISSP context",
          "No expiry — less appropriate in this CISSP context"
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
          "Good — less appropriate in this CISSP context",
          "Bad; stick to agreed scope",
          "Only internal — less appropriate in this CISSP context",
          "Only external — less appropriate in this CISSP context"
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
          "Fully equipped — less appropriate in this CISSP context",
          "Space and power; restore from backup",
          "Live sync — less appropriate in this CISSP context",
          "Warm only — less appropriate in this CISSP context"
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
          "Only automated — less appropriate in this CISSP context",
          "Human review; find bugs, improve quality",
          "Only SAST — less appropriate in this CISSP context",
          "Only DAST — less appropriate in this CISSP context"
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
          "ARO only — less appropriate in this CISSP context",
          "EF (Exposure Factor) and AV (Asset Value)",
          "Only AV — less appropriate in this CISSP context",
          "Only EF — less appropriate in this CISSP context"
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
          "Only mirror — less appropriate in this CISSP context",
          "Dual parity; two disk failure tolerance",
          "Only stripe — less appropriate in this CISSP context",
          "Only RAID 5 — less appropriate in this CISSP context"
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
          "No encryption — less appropriate in this CISSP context",
          "Encrypts DNS queries (privacy)",
          "Only DNSSEC — less appropriate in this CISSP context",
          "Only cache — less appropriate in this CISSP context"
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
          "Only weak passwords — less appropriate in this CISSP context",
          "Brute force (lock after N failures)",
          "Only phishing — less appropriate in this CISSP context",
          "Only replay — less appropriate in this CISSP context"
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
          "Optional — less appropriate in this CISSP context",
          "Lessons learned; improve process",
          "Only technical — less appropriate in this CISSP context",
          "Only management — less appropriate in this CISSP context"
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
          "Only design — less appropriate in this CISSP context",
          "Protection inside app at runtime",
          "Only WAF — less appropriate in this CISSP context",
          "Only firewall — less appropriate in this CISSP context"
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
          "Classifies data — less appropriate in this CISSP context",
          "Implements controls (storage, backup, access)",
          "Only owner — less appropriate in this CISSP context",
          "Only user — less appropriate in this CISSP context"
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
          "Only BIOS — less appropriate in this CISSP context",
          "Verify signature of each stage; prevent rootkit",
          "Only OS — less appropriate in this CISSP context",
          "Only driver — less appropriate in this CISSP context"
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
          "Strong security — less appropriate in this CISSP context",
          "Weak; MAC spoofable; defense in depth only",
          "Only encryption — less appropriate in this CISSP context",
          "Only WPA — less appropriate in this CISSP context"
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
          "Fix all equally — less appropriate in this CISSP context",
          "Prioritize by exploitability, asset value, impact",
          "Only critical — less appropriate in this CISSP context",
          "Only high — less appropriate in this CISSP context"
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
          "Same thing — less appropriate in this CISSP context",
          "Full = all; incremental = since last (any); differential = since last full",
          "Only full — less appropriate in this CISSP context",
          "Only incremental — less appropriate in this CISSP context"
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
          "Only image — less appropriate in this CISSP context",
          "Image scan, minimal image, non-root, network policy",
          "Only runtime — less appropriate in this CISSP context",
          "Only host — less appropriate in this CISSP context"
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
          "Same thing — less appropriate in this CISSP context",
          "Compliance = meet regs; security = protect; can differ",
          "Only compliance — less appropriate in this CISSP context",
          "Only security — less appropriate in this CISSP context"
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
          "Only key size — less appropriate in this CISSP context",
          "Constant-time crypto, blinding",
          "Only algorithm — less appropriate in this CISSP context",
          "Only key rotation — less appropriate in this CISSP context"
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
          "Only physical — less appropriate in this CISSP context",
          "Logical or physical; limit blast radius",
          "Only VLAN — less appropriate in this CISSP context",
          "Only firewall — less appropriate in this CISSP context"
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
          "Only XSS — less appropriate in this CISSP context",
          "Attacker sets session ID; victim uses it",
          "Only CSRF — less appropriate in this CISSP context",
          "Only injection — less appropriate in this CISSP context"
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
          "Same as BCP — less appropriate in this CISSP context",
          "Restore IT/system after disaster",
          "Only backup — less appropriate in this CISSP context",
          "Only RTO — less appropriate in this CISSP context"
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
          "Only HTTPS — less appropriate in this CISSP context",
          "Auth (OAuth, API key), rate limit, input validation",
          "Only key — less appropriate in this CISSP context",
          "Only encryption — less appropriate in this CISSP context"
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
          "Only encrypt — less appropriate in this CISSP context",
          "Substitute, shuffle, redact, tokenize",
          "Only delete — less appropriate in this CISSP context",
          "Only hash — less appropriate in this CISSP context"
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
          "Only software — less appropriate in this CISSP context",
          "Hardware; key generation, storage, crypto ops",
          "Only key storage — less appropriate in this CISSP context",
          "Only backup — less appropriate in this CISSP context"
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
          "Only network firewall — less appropriate in this CISSP context",
          "Filters HTTP; SQLi, XSS, OWASP",
          "Only DDoS — less appropriate in this CISSP context",
          "Only IDS — less appropriate in this CISSP context"
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
          "Only at end — less appropriate in this CISSP context",
          "SAST, dependency scan, secrets scan in pipeline",
          "Only manual — less appropriate in this CISSP context",
          "Only production — less appropriate in this CISSP context"
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
          "Forever — less appropriate in this CISSP context",
          "Per policy/regulation; then secure disposal",
          "Only 30 days — less appropriate in this CISSP context",
          "Only 1 year — less appropriate in this CISSP context"
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
          "Only production — less appropriate in this CISSP context",
          "Dev/test have minimal access; no prod from dev",
          "Only test — less appropriate in this CISSP context",
          "Only admin — less appropriate in this CISSP context"
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
          "Eliminates risk — less appropriate in this CISSP context",
          "Transfers financial impact to insurer",
          "Only technical — less appropriate in this CISSP context",
          "Only physical — less appropriate in this CISSP context"
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
          "Only files — less appropriate in this CISSP context",
          "Encrypt entire volume; key in TPM or password",
          "Only OS — less appropriate in this CISSP context",
          "Only backup — less appropriate in this CISSP context"
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
          "Only client — less appropriate in this CISSP context",
          "Downgrade HTTPS to HTTP; MITM",
          "Only server — less appropriate in this CISSP context",
          "Only DNS — less appropriate in this CISSP context"
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
          "Only static — less appropriate in this CISSP context",
          "Changes every N seconds; algo + time + secret",
          "Only HMAC — less appropriate in this CISSP context",
          "Only SMS — less appropriate in this CISSP context"
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
          "Optional — less appropriate in this CISSP context",
          "Hash (e.g., SHA); document; chain of custody",
          "Only photograph — less appropriate in this CISSP context",
          "Only copy — less appropriate in this CISSP context"
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
          "Only delete — less appropriate in this CISSP context",
          "Secure delete; remove from repos, backups",
          "Only archive — less appropriate in this CISSP context",
          "Only transfer — less appropriate in this CISSP context"
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
          "Collect everything — less appropriate in this CISSP context",
          "Collect only what is necessary",
          "Only retention — less appropriate in this CISSP context",
          "Only encryption — less appropriate in this CISSP context"
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
          "Only VM — less appropriate in this CISSP context",
          "CPU-protected memory; code/data isolated",
          "Only container — less appropriate in this CISSP context",
          "Only TPM — less appropriate in this CISSP context"
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
          "Only local — less appropriate in this CISSP context",
          "Announce false routes; traffic diversion",
          "Only DNS — less appropriate in this CISSP context",
          "Only DDoS — less appropriate in this CISSP context"
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
          "Only internal — less appropriate in this CISSP context",
          "Reward researchers for valid vulns",
          "Only pen test — less appropriate in this CISSP context",
          "Only scan — less appropriate in this CISSP context"
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
          "Only policy — less appropriate in this CISSP context",
          "Step-by-step procedures for operations/incidents",
          "Only design — less appropriate in this CISSP context",
          "Only audit — less appropriate in this CISSP context"
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
          "Only after release — less appropriate in this CISSP context",
          "Define in requirements phase (functional and security)",
          "Only functional — less appropriate in this CISSP context",
          "Only design — less appropriate in this CISSP context"
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
          "Only technical — less appropriate in this CISSP context",
          "Oversight; ensure audit independence",
          "Only audit execution — less appropriate in this CISSP context",
          "Only compliance — less appropriate in this CISSP context"
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
          "Only encrypt — less appropriate in this CISSP context",
          "Mark memory no-execute; prevent code in data areas",
          "Only ASLR — less appropriate in this CISSP context",
          "Only stack — less appropriate in this CISSP context"
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
          "Only active — less appropriate in this CISSP context",
          "Passive copy of traffic for monitoring",
          "Only IDS — less appropriate in this CISSP context",
          "Only firewall — less appropriate in this CISSP context"
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
          "Good — less appropriate in this CISSP context",
          "Accumulated access over time; periodic review",
          "Only new users — less appropriate in this CISSP context",
          "Only admins — less appropriate in this CISSP context"
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
          "Only once — less appropriate in this CISSP context",
          "Regular test of DR/HA; validate RTO",
          "Only document — less appropriate in this CISSP context",
          "Only backup — less appropriate in this CISSP context"
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
          "Only style — less appropriate in this CISSP context",
          "Rules to avoid common vulns",
          "Only performance — less appropriate in this CISSP context",
          "Only design — less appropriate in this CISSP context"
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
          "Only technical — less appropriate in this CISSP context",
          "Data subject to laws of where it resides",
          "Only backup — less appropriate in this CISSP context",
          "Only cloud — less appropriate in this CISSP context"
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
          "Only encrypt — less appropriate in this CISSP context",
          "Randomize memory layout; harder to exploit",
          "Only DEP — less appropriate in this CISSP context",
          "Only stack — less appropriate in this CISSP context"
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
          "Only ingress — less appropriate in this CISSP context",
          "Control outbound traffic; limit C2, data exfil",
          "Only allow all — less appropriate in this CISSP context",
          "Only block all — less appropriate in this CISSP context"
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
          "Only internal — less appropriate in this CISSP context",
          "Third-party attests to controls",
          "Only technical — less appropriate in this CISSP context",
          "Only policy — less appropriate in this CISSP context"
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
          "Only logs — less appropriate in this CISSP context",
          "Logs, metrics, alerts; detect anomalies",
          "Only IDS — less appropriate in this CISSP context",
          "Only firewall — less appropriate in this CISSP context"
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
          "Dev = prod — less appropriate in this CISSP context",
          "Dev, test, staging, prod; separate credentials, data",
          "Only dev and prod — less appropriate in this CISSP context",
          "Only test — less appropriate in this CISSP context"
        ],
        "correct": 1,
        "explain": "Separate envs = different credentials, data; prod isolated; no dev in prod.",
        "obj": "8",
        "level": 2,
        "ref": "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
        "id": "cissp-legacy-0223"
      }
];
