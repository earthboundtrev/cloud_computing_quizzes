(function () {
  QuizEngine.run({
    quizId: 'aws_dea',
    questionBank: window.QUESTION_BANK_AWS_DATA_ENGINEERING,
    questionsPerQuiz: 40,
    resultsTitle: 'AWS Data Engineer Associate (DEA) Quiz Results',
    downloadFilenamePrefix: 'aws_data_engineering_quiz_results'
  });
})();
