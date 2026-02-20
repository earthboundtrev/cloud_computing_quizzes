(function () {
  QuizEngine.run({
    quizId: 'gcp',
    questionBank: window.QUESTION_BANK_GCP,
    questionsPerQuiz: 40,
    examModeQuestions: 55,
    passingPercent: 70,
    resultsTitle: 'GCP Cloud Digital Leader Quiz Results',
    downloadFilenamePrefix: 'gcp_cloud_digital_leader_quiz_results'
  });
})();
