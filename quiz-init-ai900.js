(function () {
  console.log('[quiz-init-ai900] starting');
  QuizEngine.run({
    quizId: 'ai900',
    questionBank: window.QUESTION_BANK_AI900,
    questionsPerQuiz: 40,
    examModeQuestions: 50,
    passingPercent: 70,
    resultsTitle: 'AI-900 Azure AI Fundamentals Quiz Results',
    downloadFilenamePrefix: 'ai900_quiz_results'
  });
  console.log('[quiz-init-ai900] QuizEngine.run finished, window.selectMode=', typeof window.selectMode);
})();
