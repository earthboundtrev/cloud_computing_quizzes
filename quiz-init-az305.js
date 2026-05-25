(function () {
  var bank = (window.QUESTION_BANK_AZ305 || [])
    .concat(window.QUESTION_BANK_AZ305_EXTRA || [])
    .concat(window.QUESTION_BANK_AZ305_BOOST || [])
    .concat(window.QUESTION_BANK_AZ305_SCENARIOS || []);
  QuizEngine.run({
    quizId: 'az305',
    questionBank: bank,
    caseStudies: window.CASE_STUDIES_AZ305 || {},
    caseStudyExamQuestions: 8,
    questionsPerQuiz: 40,
    examModeQuestions: 50,
    passingPercent: 70,
    resultsTitle: 'AZ-305 Azure Solutions Architect Quiz Results',
    downloadFilenamePrefix: 'az305_quiz_results'
  });
})();
