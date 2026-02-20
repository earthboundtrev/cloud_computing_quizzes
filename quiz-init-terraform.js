(function () {
  QuizEngine.run({
    quizId: 'terraform',
    questionBank: window.QUESTION_BANK_TERRAFORM,
    questionsPerQuiz: 40,
    examModeQuestions: 57,
    passingPercent: 70,
    resultsTitle: 'Terraform Associate (TA-002-P) Quiz Results',
    downloadFilenamePrefix: 'terraform_associate_quiz_results'
  });
})();
