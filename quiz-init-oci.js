(function () {
  QuizEngine.run({
    quizId: 'oci',
    questionBank: window.QUESTION_BANK_OCI,
    questionsPerQuiz: 41,
    examModeQuestions: 55,
    passingPercent: 68,
    resultsTitle: 'OCI Foundations Quiz Results',
    downloadFilenamePrefix: 'oci_quiz_results'
  });
})();
