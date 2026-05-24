(function () {
  var bank = (window.QUESTION_BANK_AWS_MLEA || []).concat(window.QUESTION_BANK_AWS_MLEA_SCENARIOS || []);
  QuizEngine.run({
    quizId: 'aws_mlea',
    questionBank: bank,
    caseStudies: window.CASE_STUDIES_AWS_MLEA || {},
    caseStudyExamQuestions: 6,
    caseStudyQuestionPrefix: 'Case Study — {name}\n\n',
    questionsPerQuiz: 40,
    examModeQuestions: 85,
    passingPercent: 72,
    resultsTitle: 'AWS ML Engineer Associate (MLEA) Quiz Results',
    downloadFilenamePrefix: 'aws_mlea_quiz_results'
  });
})();
