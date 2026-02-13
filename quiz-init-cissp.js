(function () {
  QuizEngine.run({
    quizId: 'cissp',
    questionBank: window.QUESTION_BANK_CISSP,
    questionsPerQuiz: 40,
    resultsTitle: 'CISSP Quiz Results',
    downloadFilenamePrefix: 'cissp_quiz_results'
  });
})();
