(function () {
  var bank = (window.QUESTION_BANK_GCP_PCA || []).concat(window.QUESTION_BANK_GCP_PCA_SCENARIOS || []);
  QuizEngine.run({
    quizId: 'gcp_pca',
    questionBank: bank,
    caseStudies: window.CASE_STUDIES_GCP_PCA || {},
    caseStudyExamQuestions: 8,
    questionsPerQuiz: 40,
    examModeQuestions: 50,
    passingPercent: 70,
    resultsTitle: 'GCP Professional Cloud Architect Quiz Results',
    downloadFilenamePrefix: 'gcp_professional_cloud_architect_quiz_results'
  });
})();
