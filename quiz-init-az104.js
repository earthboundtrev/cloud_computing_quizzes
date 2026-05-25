(function () {
  var bank = (window.QUESTION_BANK_AZ104 || [])
    .concat(window.QUESTION_BANK_AZ104_EXTRA || [])
    .concat(window.QUESTION_BANK_AZ104_BOOST || [])
    .concat(window.QUESTION_BANK_AZ104_SCENARIOS || []);
  QuizEngine.run({
    quizId: 'az104',
    questionBank: bank,
    caseStudies: window.CASE_STUDIES_AZ104 || {},
    caseStudyExamQuestions: 8,
    questionsPerQuiz: 40,
    examModeQuestions: 50,
    passingPercent: 70,
    resultsTitle: 'AZ-104 Azure Administrator Quiz Results',
    downloadFilenamePrefix: 'az104_quiz_results'
  });
})();
