(function () {
  console.log('[quiz-init-ai901] starting');
  QuizEngine.run({
    quizId: 'ai901',
    questionBank: window.QUESTION_BANK_AI901,
    questionsPerQuiz: 40,
    examModeQuestions: 50,
    passingPercent: 70,
    resultsTitle: 'AI-901 Microsoft Azure AI Fundamentals Quiz Results',
    downloadFilenamePrefix: 'ai901_quiz_results'
  });
  console.log('[quiz-init-ai901] QuizEngine.run finished, window.selectMode=', typeof window.selectMode);
})();