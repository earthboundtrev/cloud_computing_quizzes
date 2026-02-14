/**
 * Shared quiz engine for Cloud Cram. Call QuizEngine.run(config) with
 * { quizId, questionBank, questionsPerQuiz, resultsTitle?, downloadFilenamePrefix? }.
 * Exposes startQuiz, nextQuestion, prevQuestion, selectMode, importResults, onImportFile, downloadResults, copyResultsToClipboard on window for onclick handlers.
 */
(function () {
  'use strict';

  var QUIZ_ID;
  var PROFILE_KEY;
  var questionBank;
  var QUESTIONS_PER_QUIZ;
  var resultsTitle;
  var downloadFilenamePrefix;

  var currentIndex = 0;
  var score = 0;
  var answered = [];
  var sessionQuestions = [];
  var selectedMode = 'mixed';

  function getProfile() {
    try {
      var raw = localStorage.getItem(PROFILE_KEY);
      if (!raw) return { quizId: QUIZ_ID, topicStats: {}, topicMissesFromImports: {} };
      var p = JSON.parse(raw);
      return {
        quizId: p.quizId || QUIZ_ID,
        topicStats: p.topicStats || {},
        topicMissesFromImports: p.topicMissesFromImports || {}
      };
    } catch (e) {
      return { quizId: QUIZ_ID, topicStats: {}, topicMissesFromImports: {} };
    }
  }

  function saveProfile(profile) {
    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    } catch (e) {}
  }

  function getTopicWeight(profile, topic) {
    var t = topic || 'Other';
    var missRate = 0;
    if (profile.topicStats[t] && profile.topicStats[t].total > 0) {
      missRate = 1 - (profile.topicStats[t].correct / profile.topicStats[t].total);
    }
    var importMisses = (profile.topicMissesFromImports[t] || 0) * 0.2;
    return 1 + Math.min(missRate + importMisses, 2);
  }

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i];
      a[i] = a[j];
      a[j] = tmp;
    }
    return a;
  }

  function weightedSample(arr, n, profile) {
    var hasData = profile && (Object.keys(profile.topicStats).length > 0 || Object.keys(profile.topicMissesFromImports).length > 0);
    if (!hasData) {
      var shuffled = shuffle(arr);
      return shuffled.slice(0, Math.min(n, shuffled.length));
    }
    var withKeys = arr.map(function (q) {
      var w = getTopicWeight(profile, q.topic);
      return { q: q, key: Math.pow(Math.random(), 1 / w) };
    });
    withKeys.sort(function (a, b) { return b.key - a.key; });
    return withKeys.slice(0, Math.min(n, withKeys.length)).map(function (x) { return x.q; });
  }

  function getWeakTopics(profile, topN) {
    var scores = [];
    var topics = new Set(
      Object.keys(profile.topicStats || {}).concat(Object.keys(profile.topicMissesFromImports || {}))
    );
    topics.forEach(function (t) {
      var weakness = 0;
      if (profile.topicStats[t] && profile.topicStats[t].total > 0) {
        weakness = 1 - (profile.topicStats[t].correct / profile.topicStats[t].total);
      }
      weakness += (profile.topicMissesFromImports[t] || 0) * 0.15;
      scores.push({ topic: t, weakness: weakness });
    });
    scores.sort(function (a, b) { return b.weakness - a.weakness; });
    return scores.slice(0, topN).filter(function (x) { return x.weakness > 0.1; }).map(function (x) { return x.topic; });
  }

  function selectMode(mode) {
    selectedMode = mode;
    document.querySelectorAll('.mode-btn').forEach(function (b) { b.classList.remove('selected'); });
    var el = document.querySelector('[data-mode="' + mode + '"]');
    if (el) el.classList.add('selected');
  }

  function setFeedbackContent(fb, isCorrect, explainText) {
    fb.textContent = '';
    fb.appendChild(document.createTextNode(isCorrect ? '✓ Correct. ' : '✗ Incorrect. '));
    var sp = document.createElement('span');
    sp.className = 'explanation';
    sp.textContent = explainText || '';
    fb.appendChild(sp);
  }

  function startQuiz() {
    var limitEl = document.getElementById('session-time-limit');
    var customEl = document.getElementById('session-time-custom');
    var minutes = (customEl && customEl.value && parseInt(customEl.value, 10)) || (limitEl ? parseInt(limitEl.value, 10) : 0) || 0;
    if (window.SessionStreak) window.SessionStreak.setTimeLimit(minutes);
    var filtered = questionBank.filter(function (q) {
      if (selectedMode === 'comparison') return q.mode === 'comparison';
      if (selectedMode === 'exam') return q.mode === 'exam';
      return true;
    });
    var profile = getProfile();
    sessionQuestions = weightedSample(filtered, QUESTIONS_PER_QUIZ, profile);
    sessionQuestions.forEach(function (q) {
      var shuffled = shuffle(q.options.slice());
      q._shuffledOptions = shuffled;
      q._correctDisplayIndex = shuffled.indexOf(q.options[q.correct]);
    });
    currentIndex = 0;
    score = 0;
    answered = [];
    var hintEl = document.getElementById('focus-hint');
    var weak = getWeakTopics(profile, 3);
    if (hintEl) {
      if (weak.length > 0) {
        hintEl.textContent = "We'll focus more on: " + weak.join(', ') + '.';
        hintEl.classList.remove('hidden');
      } else {
        hintEl.classList.add('hidden');
      }
    }
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('results-screen').classList.add('hidden');
    document.getElementById('quiz-area').classList.remove('hidden');
    document.getElementById('q-total').textContent = sessionQuestions.length;
    renderQuestion();
  }

  function renderQuestion() {
    var q = sessionQuestions[currentIndex];
    document.getElementById('q-num').textContent = currentIndex + 1;
    document.getElementById('score-display').textContent = score;
    document.getElementById('question-text').textContent = q.q;
    var opts = document.getElementById('options');
    opts.innerHTML = '';
    var fb = document.getElementById('feedback');
    fb.classList.add('hidden');
    fb.className = 'feedback hidden';

    var optsList = q._shuffledOptions || q.options;
    var correctIdx = q._correctDisplayIndex !== undefined ? q._correctDisplayIndex : q.correct;
    optsList.forEach(function (opt, i) {
      var div = document.createElement('div');
      div.className = 'option';
      div.textContent = opt;
      div.dataset.index = i;
      if (answered[currentIndex] !== undefined) {
        div.classList.add('disabled');
        if (i === correctIdx) div.classList.add('correct');
        else if (i === answered[currentIndex]) div.classList.add('wrong');
      } else {
        div.onclick = function () { selectOption(currentIndex, i, q); };
      }
      opts.appendChild(div);
    });

    if (answered[currentIndex] !== undefined) {
      fb.classList.remove('hidden');
      fb.className = 'feedback ' + (answered[currentIndex] === correctIdx ? 'correct-msg' : 'wrong-msg');
      setFeedbackContent(fb, answered[currentIndex] === correctIdx, q.explain);
    }

    document.getElementById('prev-btn').disabled = currentIndex === 0;
    /* Brain dump is optional: do not auto-focus the textarea so users can take the quiz without it. */
  }

  function selectOption(pos, optIdx, q) {
    if (answered[pos] !== undefined) return;
    var correctIdx = q._correctDisplayIndex !== undefined ? q._correctDisplayIndex : q.correct;
    answered[pos] = optIdx;
    if (optIdx === correctIdx) score++;

    document.querySelectorAll('#options .option').forEach(function (o) {
      o.classList.add('disabled');
      o.onclick = null;
      if (parseInt(o.dataset.index, 10) === correctIdx) o.classList.add('correct');
      else if (parseInt(o.dataset.index, 10) === optIdx) o.classList.add('wrong');
    });

    var fb = document.getElementById('feedback');
    fb.classList.remove('hidden');
    fb.className = 'feedback ' + (optIdx === correctIdx ? 'correct-msg' : 'wrong-msg');
    setFeedbackContent(fb, optIdx === correctIdx, q.explain);
    document.getElementById('score-display').textContent = score;
  }

  function nextQuestion() {
    if (currentIndex < sessionQuestions.length - 1) {
      currentIndex++;
      renderQuestion();
    } else {
      showResults();
    }
  }

  function prevQuestion() {
    if (currentIndex > 0) {
      currentIndex--;
      renderQuestion();
    }
  }

  function saveSessionToProfile() {
    var profile = getProfile();
    sessionQuestions.forEach(function (q, i) {
      var t = q.topic || 'Other';
      var correctIdx = q._correctDisplayIndex !== undefined ? q._correctDisplayIndex : q.correct;
      if (!profile.topicStats[t]) profile.topicStats[t] = { correct: 0, total: 0 };
      profile.topicStats[t].total++;
      if (answered[i] !== undefined && answered[i] === correctIdx) {
        profile.topicStats[t].correct++;
      }
    });
    saveProfile(profile);
  }

  function showResults() {
    saveSessionToProfile();
    document.getElementById('quiz-area').classList.add('hidden');
    var r = document.getElementById('results-screen');
    r.classList.remove('hidden');
    var total = sessionQuestions.length;
    var pct = Math.round((score / total) * 100);
    document.getElementById('final-score').textContent = score + ' / ' + total + ' (' + pct + '%)';
    document.getElementById('final-score').className = 'score ' + (pct >= 65 ? 'pass' : 'fail');
    document.getElementById('result-msg').textContent = pct >= 65
      ? 'Passing is ~65%. You\'re on track!'
      : 'Aim for 65%+ on the real exam. Review the pattern guide and try again.';
    document.getElementById('copy-toast').classList.add('hidden');
  }

  function getResultsMarkdown() {
    var total = sessionQuestions.length;
    var pct = Math.round((score / total) * 100);
    var missed = sessionQuestions.map(function (q, i) { return { q: q, i: i }; }).filter(function (x) {
      return answered[x.i] !== undefined && answered[x.i] !== x.q.correct;
    });
    var topicCounts = {};
    missed.forEach(function (x) {
      var t = x.q.topic || 'Other';
      topicCounts[t] = (topicCounts[t] || 0) + 1;
    });
    var md = '# ' + resultsTitle + '\n\n';
    md += '**Date:** ' + new Date().toISOString().slice(0, 10) + '\n';
    md += '**Mode:** ' + (selectedMode === 'comparison' ? 'Comparison' : selectedMode === 'exam' ? 'Exam' : 'Mixed') + '\n';
    md += '**Score:** ' + score + '/' + total + ' (' + pct + '%)\n';
    md += '**Pass:** ' + (pct >= 65 ? 'Yes' : 'No') + '\n\n';
    md += '---\n\n';
    md += '## Instructions for AI Refactoring\n\n';
    md += 'Paste this entire block into a Cursor chat and say:\n';
    md += '> "Refactor the quiz based on my mistakes. Add more questions on my weak topics and create a focused retake quiz."\n\n';
    if (Object.keys(topicCounts).length > 0) {
      md += '## Misses by Topic\n\n';
      Object.keys(topicCounts).sort(function (a, b) { return topicCounts[b] - topicCounts[a]; }).forEach(function (t) {
        md += '- **' + t + ':** ' + topicCounts[t] + ' missed\n';
      });
      md += '\n';
    }
    if (missed.length > 0) {
      md += '## Missed Questions (for AI refactoring)\n\n';
      missed.forEach(function (x, i) {
        var q = x.q;
        var yourAns = q.options[answered[x.i]];
        var correctAns = q.options[q.correct];
        md += '### ' + (i + 1) + '. [' + (q.topic || 'General') + ']\n';
        md += '**Q:** ' + q.q + '\n';
        md += '**Your answer:** ' + yourAns + '\n';
        md += '**Correct answer:** ' + correctAns + '\n';
        md += '**Explanation:** ' + q.explain + '\n\n';
      });
    }
    return md;
  }

  function downloadResults() {
    var blob = new Blob([getResultsMarkdown()], { type: 'text/markdown' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = downloadFilenamePrefix + '_' + new Date().toISOString().slice(0, 10) + '.md';
    a.click();
    URL.revokeObjectURL(a.href);
  }

  function copyResultsToClipboard() {
    navigator.clipboard.writeText(getResultsMarkdown()).then(function () {
      var el = document.getElementById('copy-toast');
      if (el) {
        el.classList.remove('hidden');
        setTimeout(function () { el.classList.add('hidden'); }, 2500);
      }
    });
  }

  function parseImportedResults(mdText) {
    var lines = mdText.split('\n');
    var firstLine = (lines[0] || '').toLowerCase();
    if (QUIZ_ID !== 'oci' && firstLine.indexOf('oci foundations') !== -1) return { ok: false, error: 'This file is for OCI quiz. Open the OCI quiz to import it.' };
    if (QUIZ_ID !== 'gcp' && firstLine.indexOf('gcp cloud digital leader') !== -1) return { ok: false, error: 'This file is for GCP quiz. Open the GCP quiz to import it.' };
    if (QUIZ_ID !== 'az900' && (firstLine.indexOf('az-900') !== -1 || firstLine.indexOf('azure') !== -1)) return { ok: false, error: 'This file is for AZ-900 quiz. Open the AZ-900 quiz to import it.' };
    if (QUIZ_ID !== 'terraform' && firstLine.indexOf('terraform') !== -1) return { ok: false, error: 'This file is for Terraform quiz. Open the Terraform quiz to import it.' };
    if (QUIZ_ID === 'oci' && firstLine.indexOf('oci') === -1) return { ok: false, error: 'Not an OCI results file.' };
    if (QUIZ_ID === 'terraform' && firstLine.indexOf('terraform') === -1) return { ok: false, error: 'Not a Terraform Associate results file.' };
    var inSection = false;
    var topicMisses = {};
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];
      if (line.indexOf('## Misses by Topic') !== -1) {
        inSection = true;
        continue;
      }
      if (inSection && line.indexOf('## ') === 0) break;
      var match = line.match(/^\s*-\s*\*\*(.+?)\*\*:\s*(\d+)\s+missed/);
      if (inSection && match) {
        var topic = match[1].trim();
        var n = parseInt(match[2], 10);
        topicMisses[topic] = (topicMisses[topic] || 0) + n;
      }
    }
    if (Object.keys(topicMisses).length === 0) return { ok: false, error: 'No "Misses by Topic" section found.' };
    return { ok: true, topicMisses: topicMisses };
  }

  function importResults() {
    var ta = document.getElementById('import-results');
    var mdText = (ta && ta.value || '').trim();
    if (!mdText) {
      showImportToast('Paste results markdown first, or choose a file.', true);
      return;
    }
    var result = parseImportedResults(mdText);
    if (!result.ok) {
      showImportToast(result.error || 'Could not parse results.', true);
      return;
    }
    var profile = getProfile();
    if (!profile.topicMissesFromImports) profile.topicMissesFromImports = {};
    Object.keys(result.topicMisses).forEach(function (topic) {
      var n = result.topicMisses[topic];
      profile.topicMissesFromImports[topic] = (profile.topicMissesFromImports[topic] || 0) + n;
    });
    saveProfile(profile);
    var top = Object.keys(result.topicMisses).sort(function (a, b) { return result.topicMisses[b] - result.topicMisses[a]; }).slice(0, 3);
    showImportToast('Imported. We\'ll focus more on: ' + top.join(', ') + '.', false);
    if (ta) ta.value = '';
  }

  function onImportFile(ev) {
    var f = ev.target.files && ev.target.files[0];
    if (!f) return;
    var r = new FileReader();
    r.onload = function () {
      var ta = document.getElementById('import-results');
      if (ta) ta.value = r.result || '';
      importResults();
    };
    r.readAsText(f);
    ev.target.value = '';
  }

  function showImportToast(msg, isError) {
    var el = document.getElementById('import-toast');
    if (!el) return;
    el.textContent = msg;
    el.className = 'import-toast ' + (isError ? 'err' : 'success');
    el.classList.remove('hidden');
    setTimeout(function () { el.classList.add('hidden'); }, 4000);
  }

  function initFocusHint() {
    var profile = getProfile();
    var weak = getWeakTopics(profile, 3);
    var hintEl = document.getElementById('focus-hint');
    if (hintEl && weak.length > 0) {
      hintEl.textContent = "We'll focus more on: " + weak.join(', ') + '.';
      hintEl.classList.remove('hidden');
    }
  }

  window.QuizEngine = {
    run: function (config) {
      config = config || {};
      QUIZ_ID = config.quizId || 'quiz';
      PROFILE_KEY = 'study_sessions_profile_' + QUIZ_ID;
      questionBank = config.questionBank || [];
      QUESTIONS_PER_QUIZ = config.questionsPerQuiz || 40;
      resultsTitle = config.resultsTitle || (QUIZ_ID + ' Quiz Results');
      downloadFilenamePrefix = config.downloadFilenamePrefix || (QUIZ_ID + '_quiz_results');

      currentIndex = 0;
      score = 0;
      answered = [];
      sessionQuestions = [];
      selectedMode = 'mixed';

      window.startQuiz = startQuiz;
      window.nextQuestion = nextQuestion;
      window.prevQuestion = prevQuestion;
      window.selectMode = selectMode;
      window.importResults = importResults;
      window.onImportFile = onImportFile;
      window.downloadResults = downloadResults;
      window.copyResultsToClipboard = copyResultsToClipboard;

      initFocusHint();
      if (window.BrainDump) window.BrainDump.init({ nextCard: nextQuestion, quizId: QUIZ_ID });
    }
  };
})();
