(function () {
  QuizEngine.run({
    quizId: 'aws_mlea',
    questionBank: window.QUESTION_BANK_AWS_MLEA,
    questionsPerQuiz: 40,
    resultsTitle: 'AWS ML Engineer Associate (MLEA) Quiz Results',
    downloadFilenamePrefix: 'aws_mlea_quiz_results'
  });
})();
