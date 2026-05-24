(function () {
  var bank = (window.QUESTION_BANK_AWS_GENAI || []).concat(window.QUESTION_BANK_AWS_GENAI_SCENARIOS || []);
  QuizEngine.run({
    quizId: 'aws_genai',
    questionBank: bank,
    caseStudies: window.CASE_STUDIES_AWS_GENAI || {},
    caseStudyExamQuestions: 6,
    questionsPerQuiz: 40,
    examModeQuestions: 85,
    passingPercent: 75,
    resultsTitle: 'AWS Certified Generative AI Developer - Professional Quiz Results',
    downloadFilenamePrefix: 'aws_genai_quiz_results'
  });
})();
