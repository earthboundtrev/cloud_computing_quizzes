/**
 * Single source of truth for quiz order and closed/completed state.
 * Order in this array = default order. User can reorder on index (saved to localStorage.quizOrder).
 * Set closed: true to show a quiz as completed (badge on index).
 */
window.QUIZ_CONFIG = [
  { id: 'oci', navLabel: 'OCI', name: 'OCI Foundations Associate', href: 'oci_foundations_quiz.html', desc: '1Z0-1085-25 • OCI ↔ AWS comparison &amp; exam-style', cardClass: 'oci', closed: false },
  { id: 'gcp', navLabel: 'GCP', name: 'GCP Cloud Digital Leader', href: 'gcp_cloud_digital_leader_quiz.html', desc: 'GCP ↔ AWS comparison &amp; exam-style', cardClass: 'gcp', closed: false },
  { id: 'az900', navLabel: 'Azure', name: 'AZ-900 Azure Fundamentals', href: 'az900_azure_fundamentals_quiz.html', desc: 'Microsoft Certified: Azure Fundamentals • Azure ↔ AWS &amp; exam-style', cardClass: 'azure', closed: false },
  { id: 'aws_mlea', navLabel: 'AWS MLA', name: 'AWS ML Engineer Associate', href: 'aws_mlea_quiz.html', desc: 'MLA-C01 • Data prep, model dev, deployment, monitoring', cardClass: 'aws', closed: false },
  { id: 'aws_dea', navLabel: 'AWS DEA', name: 'AWS Data Engineer Associate', href: 'aws_data_engineering_quiz.html', desc: 'DEA-C01 • Glue, EMR, Kinesis, Redshift, Athena &amp; exam-style', cardClass: 'aws', closed: false },
  { id: 'terraform', navLabel: 'Terraform', name: 'HashiCorp Certified: Terraform Associate', href: 'terraform_associate_quiz.html', desc: 'TA-002-P • IaC, workflow, state, modules, providers', cardClass: 'terraform', closed: false },
  { id: 'aws_genai', navLabel: 'AWS GenAI', name: 'AWS Certified Generative AI Developer – Professional', href: 'aws_genai_quiz.html', desc: 'Bedrock, RAG, agents, guardrails, production GenAI • Beta: 85 q, 205 min', cardClass: 'aws', closed: false },
  { id: 'cissp', navLabel: 'CISSP', name: 'CISSP', href: 'cissp_quiz.html', desc: '8 domains • Security &amp; Risk through Software Development Security', cardClass: 'cissp', closed: false },
  { id: 'rhcsa9', navLabel: 'RHCSA 9', name: 'RHCSA 9', href: 'rhcsa9_quiz.html', desc: 'EX200 • RHEL 9 vs RHEL 7 &amp; exam-style (if you passed RHCSA 7)', cardClass: 'redhat', closed: false },
  { id: 'rhce', navLabel: 'RHCE', name: 'RHCE', href: 'rhce_quiz.html', desc: 'EX294 • Ansible playbooks for system administration', cardClass: 'redhat', closed: false },
];

/** Returns QUIZ_CONFIG in display order (saved order from localStorage, or default). */
window.getQuizOrderedConfig = function () {
  var config = window.QUIZ_CONFIG;
  if (!config || !config.length) return config;
  try {
    var raw = localStorage.getItem('quizOrder');
    var order = raw ? JSON.parse(raw) : null;
    if (!Array.isArray(order) || !order.length) return config.slice();
    var byId = {};
    for (var i = 0; i < config.length; i++) byId[config[i].id] = config[i];
    var out = [];
    for (var j = 0; j < order.length; j++) {
      if (byId[order[j]]) out.push(byId[order[j]]);
    }
    for (var k = 0; k < config.length; k++) {
      if (out.indexOf(config[k]) === -1) out.push(config[k]);
    }
    return out;
  } catch (e) {}
  return config.slice();
};
