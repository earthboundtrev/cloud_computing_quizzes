(function () {
  QuizEngine.run({
    quizId: 'rhcsa9',
    questionBank: window.QUESTION_BANK_RHCSA9,
    questionsPerQuiz: 40,
    examModeQuestions: 40,
    passingPercent: 70,
    resultsTitle: 'RHCSA 9 Quiz Results',
    downloadFilenamePrefix: 'rhcsa9_quiz_results'
  });
})();
