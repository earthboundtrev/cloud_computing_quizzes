/**
 * Single source of truth for quiz order and closed/completed state.
 * Order in this array = default order. User can reorder on index (saved to localStorage.quizOrder).
 * Set closed: true to show a quiz as completed (badge on index).
 *
 * Deploy: To force clients to load new JS/CSS after a deploy, bump the cache version in all HTML
 * files: change ?v=2 to ?v=3 (or next number) on script and link hrefs.
 */
window.QUIZ_CONFIG = [
  { id: 'oci', navLabel: 'OCI', name: 'OCI Foundations Associate', href: 'oci_foundations_quiz.html', desc: '1Z0-1085-25 • OCI ↔ AWS comparison &amp; exam-style', cardClass: 'oci', closed: false },
  { id: 'gcp', navLabel: 'GCP', name: 'GCP Cloud Digital Leader', href: 'gcp_cloud_digital_leader_quiz.html', desc: 'GCP ↔ AWS comparison &amp; exam-style', cardClass: 'gcp', closed: false },
  { id: 'gcp_pca', navLabel: 'GCP PCA', name: 'GCP Professional Cloud Architect', href: 'gcp_professional_cloud_architect_quiz.html', desc: 'Architect scenarios • case-study mini-exams • GCP ↔ AWS', cardClass: 'gcp', closed: false },
  { id: 'gcp_ace', navLabel: 'GCP ACE', name: 'GCP Associate Cloud Engineer', href: 'gcp_associate_cloud_engineer_quiz.html', desc: '200+ Q • gcloud, GCE, GKE, VPC, IAM, monitoring &amp; security', cardClass: 'gcp', closed: false },
  { id: 'az900', navLabel: 'Azure', name: 'AZ-900 Azure Fundamentals', href: 'az900_azure_fundamentals_quiz.html', desc: 'Microsoft Certified: Azure Fundamentals • Azure ↔ AWS &amp; exam-style', cardClass: 'azure', closed: false },
  { id: 'az104', navLabel: 'AZ-104', name: 'AZ-104 Azure Administrator Associate', href: 'az104_azure_administrator_quiz.html', desc: '210+ Q • case-study mini-exams • admin ops • Azure ↔ AWS', cardClass: 'azure', closed: false },
  { id: 'az305', navLabel: 'AZ-305', name: 'AZ-305 Azure Solutions Architect Expert', href: 'az305_azure_solutions_architect_quiz.html', desc: '255+ Q • case-study blocks • closest to AWS SAA • Azure ↔ AWS', cardClass: 'azure', closed: false },
  { id: 'ai900', navLabel: 'AI-900', name: 'AI-900 Azure AI Fundamentals', href: 'ai900_azure_ai_fundamentals_quiz.html', desc: 'Microsoft Certified: Azure AI Fundamentals • OpenAI, ML, Document Intelligence, Speech, etc.', cardClass: 'azure', closed: false },
  { id: 'aws_mlea', navLabel: 'AWS MLA', name: 'AWS ML Engineer Associate', href: 'aws_mlea_quiz.html', desc: '210+ Q • case-study mini-exams • SageMaker &amp; ML ops', cardClass: 'aws', closed: false },
  { id: 'aws_dea', navLabel: 'AWS DEA', name: 'AWS Data Engineer Associate', href: 'aws_data_engineering_quiz.html', desc: '215+ Q • case-study blocks • Glue, Kinesis, Redshift, Lake Formation', cardClass: 'aws', closed: false },
  { id: 'terraform', navLabel: 'Terraform', name: 'HashiCorp Certified: Terraform Associate (004)', href: 'terraform_associate_quiz.html', desc: '004 • labs in terraform-labs/ • lifecycle, validation, ephemeral, HCP projects', cardClass: 'terraform', closed: false },
  { id: 'aws_genai', navLabel: 'AWS GenAI', name: 'AWS Certified Generative AI Developer – Professional', href: 'aws_genai_quiz.html', desc: '200+ Q • case-study scenarios • Bedrock, RAG, guardrails', cardClass: 'aws', closed: false },
  { id: 'cissp', navLabel: 'CISSP', name: 'CISSP', href: 'cissp_quiz.html', desc: '8 domains • scenario blocks • CAT-style judgment questions', cardClass: 'cissp', closed: false },
  { id: 'secai', navLabel: 'SecAI+', name: 'CompTIA SecAI+', href: 'secai_quiz.html', desc: 'CY0-001 • scenario mini-exams • securing AI &amp; GRC', cardClass: 'secai', closed: false },
  { id: 'rhcsa9', navLabel: 'RHCSA 9', name: 'RHCSA 9', href: 'rhcsa9_quiz.html', desc: 'EX200 • 205+ Q • RHEL 9 vs RHEL 7 &amp; hands-on exam-style', cardClass: 'redhat', closed: false },
  { id: 'rhce', navLabel: 'RHCE', name: 'RHCE', href: 'rhce_quiz.html', desc: 'EX294 • Ansible playbooks for system administration', cardClass: 'redhat', closed: false },
];

var QUIZ_COMPLETED_KEY = 'quizCompleted';

/** Returns set of quiz ids the user has marked complete (from index checkbox). */
window.getQuizCompletedIds = function () {
  try {
    var raw = localStorage.getItem(QUIZ_COMPLETED_KEY);
    var arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch (e) { return []; }
};

/** Set one quiz as complete or not; updates localStorage. */
window.setQuizCompleted = function (id, completed) {
  var ids = window.getQuizCompletedIds();
  var i = ids.indexOf(id);
  if (completed && i === -1) ids.push(id);
  else if (!completed && i !== -1) ids.splice(i, 1);
  try { localStorage.setItem(QUIZ_COMPLETED_KEY, JSON.stringify(ids)); } catch (e) {}
};

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
