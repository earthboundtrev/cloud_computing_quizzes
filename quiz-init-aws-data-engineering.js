(function () {
  var bank = (window.QUESTION_BANK_AWS_DATA_ENGINEERING || []).concat(window.QUESTION_BANK_AWS_DEA_SCENARIOS || []);
  QuizEngine.run({
    quizId: 'aws_dea',
    questionBank: bank,
    caseStudies: window.CASE_STUDIES_AWS_DEA || {},
    caseStudyExamQuestions: 6,
    caseStudyQuestionPrefix: 'Case Study — {name}\n\n',
    questionsPerQuiz: 40,
    examModeQuestions: 65,
    passingPercent: 72,
    resultsTitle: 'AWS Data Engineer Associate (DEA) Quiz Results',
    downloadFilenamePrefix: 'aws_data_engineering_quiz_results'
  });
})();
