(function () {
  QuizEngine.run({
    quizId: 'secai',
    questionBank: window.QUESTION_BANK_SECAI,
    questionsPerQuiz: 40,
    examModeQuestions: 60,
    passingPercent: 70,
    resultsTitle: 'CompTIA SecAI+ Practice Quiz Results',
    downloadFilenamePrefix: 'secai_quiz_results',
    topicBootstrapWeights: {
      'Securing AI Systems': 0.4,
      'AI-Assisted Security': 0.24,
      'AI Governance and GRC': 0.19,
      'Basic AI Concepts': 0.17
    }
  });
})();
