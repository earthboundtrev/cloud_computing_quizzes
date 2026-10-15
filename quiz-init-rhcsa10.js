(function () {
  QuizEngine.run({
    quizId: 'rhcsa10',
    questionBank: (window.QUESTION_BANK_RHCSA10 || []).concat(window.QUESTION_BANK_RHCSA10_EXTRA || []),
    questionsPerQuiz: 40,
    examModeQuestions: 40,
    passingPercent: 70,
    resultsTitle: 'RHCSA (EX200, RHEL 10) Quiz Results',
    downloadFilenamePrefix: 'rhcsa10_quiz_results'
  });
})();
