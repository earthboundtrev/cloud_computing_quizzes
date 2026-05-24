(function () {
  var bank = (window.QUESTION_BANK_CISSP || []).concat(window.QUESTION_BANK_CISSP_SCENARIOS || []);
  QuizEngine.run({
    quizId: 'cissp',
    questionBank: bank,
    caseStudies: window.CASE_STUDIES_CISSP || {},
    caseStudyExamQuestions: 6,
    questionsPerQuiz: 40,
    examModeQuestions: 100,
    passingPercent: 70,
    resultsTitle: 'CISSP Quiz Results',
    downloadFilenamePrefix: 'cissp_quiz_results'
  });
})();
