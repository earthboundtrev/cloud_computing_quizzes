(function () {
  QuizEngine.run({
    quizId: 'aws_genai',
    questionBank: window.QUESTION_BANK_AWS_GENAI,
    questionsPerQuiz: 40,
    examModeQuestions: 85,
    passingPercent: 75,
    resultsTitle: 'AWS Certified Generative AI Developer - Professional Quiz Results',
    downloadFilenamePrefix: 'aws_genai_quiz_results'
  });
})();
