(function () {
  QuizEngine.run({
    quizId: 'rhce',
    questionBank: window.QUESTION_BANK_RHCE,
    questionsPerQuiz: 40,
    examModeQuestions: 40,
    passingPercent: 70,
    resultsTitle: 'RHCE Quiz Results',
    downloadFilenamePrefix: 'rhce_quiz_results'
  });
})();
