(function () {
  QuizEngine.run({
    quizId: 'gcp_pca',
    questionBank: window.QUESTION_BANK_GCP_PCA,
    questionsPerQuiz: 40,
    examModeQuestions: 50,
    passingPercent: 70,
    resultsTitle: 'GCP Professional Cloud Architect Quiz Results',
    downloadFilenamePrefix: 'gcp_professional_cloud_architect_quiz_results'
  });
})();
