(function () {
  QuizEngine.run({
    quizId: 'gcp_ace',
    questionBank: window.QUESTION_BANK_GCP_ACE,
    questionsPerQuiz: 40,
    examModeQuestions: 50,
    passingPercent: 70,
    resultsTitle: 'GCP Associate Cloud Engineer Quiz Results',
    downloadFilenamePrefix: 'gcp_associate_cloud_engineer_quiz_results'
  });
})();
