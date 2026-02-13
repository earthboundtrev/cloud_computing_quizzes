(function () {
  QuizEngine.run({
    quizId: 'az900',
    questionBank: window.QUESTION_BANK_AZ900,
    questionsPerQuiz: 40,
    resultsTitle: 'AZ-900 Azure Fundamentals Quiz Results',
    downloadFilenamePrefix: 'az900_quiz_results'
  });
})();
