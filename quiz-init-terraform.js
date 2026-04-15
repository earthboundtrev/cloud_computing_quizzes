(function () {
  // Topic sampling boosts (additive to quiz-engine miss-rate weight). After a real exam miss while
  // the in-app bank felt easier, weights bias all eight Associate domains (not only CLI) so a
  // full exam-length session still surfaces workflow, HCP, fundamentals, and maintenance items.
  var TERRAFORM_TOPIC_BOOTSTRAP = {
    'HCP Terraform': 0.62,
    'Maintain infrastructure': 0.62,
    'Terraform fundamentals': 0.58,
    'IaC Concepts': 0.52,
    'Terraform Workflow': 0.52,
    'Terraform CLI': 0.5,
    'Configuration': 0.5,
    'Modules': 0.5,
    'State': 0.5,
    'Backend': 0.46,
    'Workspaces': 0.46,
    'Security & Best Practices': 0.46,
    'Providers': 0.44
  };

  QuizEngine.run({
    quizId: 'terraform',
    questionBank: window.QUESTION_BANK_TERRAFORM,
    questionsPerQuiz: 40,
    examModeQuestions: 65,
    passingPercent: 70,
    resultsTitle: 'Terraform Associate (004) Quiz Results',
    downloadFilenamePrefix: 'terraform_associate_quiz_results',
    topicBootstrapWeights: TERRAFORM_TOPIC_BOOTSTRAP
  });
})();
