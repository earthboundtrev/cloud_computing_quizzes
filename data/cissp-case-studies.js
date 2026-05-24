/** CISSP-style shared scenarios (CAT exam uses scenario-based judgment questions). */
window.CASE_STUDIES_CISSP = {
  'regional-hospital': {
    title: 'Regional Hospital — Security Incident',
    shortName: 'Regional Hospital scenario',
    examLabel: 'Regional Hospital scenario exam',
    examDesc: 'Ransomware, PHI, incident response priorities (first/next/best)',
    panelNote: 'Scenario reference — read the question for first, next, best, or most likely action.',
    questionLead: 'Using the Regional Hospital scenario in the reference panel:\n\n',
    sections: [
      { heading: 'Organization', body: 'A 400-bed regional hospital in the EU processes electronic health records (EHR) and lab results. Security governance follows HIPAA-aligned policies; the CISO reports to the CIO.' },
      { heading: 'Situation', body: 'Overnight, staff report encrypted files on file servers and a ransom note. Patient portal remains online. Backup jobs completed 18 hours ago. A compromised service account was used to deploy ransomware across VLANs. Media contacted the communications team.' },
      { heading: 'Constraints', body: 'Clinical staff need read access to recent records for emergency care. Legal requires breach notification assessment. IT must preserve evidence, restore critical systems, and avoid paying ransom unless leadership approves after risk review.' }
    ]
  },
  'northwind-acquisition': {
    title: 'Northwind Financial — Acquisition',
    shortName: 'Northwind Financial scenario',
    examLabel: 'Northwind Financial scenario exam',
    examDesc: 'Due diligence, risk treatment, SDLC, third-party SaaS',
    panelNote: 'Scenario reference — CISSP questions test business-aligned security judgment.',
    questionLead: 'Using the Northwind Financial scenario in the reference panel:\n\n',
    sections: [
      { heading: 'Organization', body: 'Northwind Financial is acquiring a fintech startup that offers a mobile payments API. Northwind is PCI DSS compliant; the startup uses cloud SaaS for CI/CD and customer chat support.' },
      { heading: 'Due diligence findings', body: 'Pen test found missing MFA on admin consoles, unclear data retention in the startup’s logging pipeline, and no formal secure SDLC gate before production deploys. Customer PII spans US and Canada.' },
      { heading: 'Leadership ask', body: 'The board wants integration in 90 days with minimal customer disruption. Legal wants documented risk acceptance for gaps that cannot be fixed pre-close. The CISO must recommend controls and governance before go-live.' }
    ]
  }
};
