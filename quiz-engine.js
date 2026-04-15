/**
 * Shared quiz engine for Cloud Cram. Call QuizEngine.run(config) with
 * { quizId, questionBank, questionsPerQuiz, resultsTitle?, downloadFilenamePrefix?,
 *   examModeQuestions?, passingPercent?, topicBootstrapWeights? }.
 * topicBootstrapWeights: optional map of topic string -> additive sampling weight (e.g. 0.7)
 * used before local profile stats exist and blended with miss-rate weighting afterward.
 * Exposes startQuiz, nextQuestion, prevQuestion, selectMode, importResults, onImportFile, downloadResults, copyResultsToClipboard on window for onclick handlers.
 *
 * Question shapes:
 * - Default (single choice): { q, options[], correct: number, explain, mode, topic? }
 * - True/false: { type: 'tf', correct: true|false, q, explain, ... } — options are always True / False
 * - Select all: { type: 'multi', options[], correct: number[] (original indices), explain, ... }
 * - Ordering: { type: 'order', options[], correctOrder: number[], ... }
 */
(function () {
  'use strict';

  var QUIZ_ID;
  var PROFILE_KEY;
  var questionBank;
  var QUESTIONS_PER_QUIZ;
  var EXAM_MODE_QUESTIONS;
  var PASSING_PERCENT;
  var resultsTitle;
  var downloadFilenamePrefix;
  var TOPIC_BOOTSTRAP_WEIGHTS;

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
    var boot = (TOPIC_BOOTSTRAP_WEIGHTS && TOPIC_BOOTSTRAP_WEIGHTS[t]) || 0;
    return 1 + Math.min(missRate + importMisses, 2) + boot;
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
    var hasBootstrap = TOPIC_BOOTSTRAP_WEIGHTS && Object.keys(TOPIC_BOOTSTRAP_WEIGHTS).length > 0;
    var hasProfileData = profile && (Object.keys(profile.topicStats).length > 0 || Object.keys(profile.topicMissesFromImports).length > 0);
    if (!hasProfileData && !hasBootstrap) {
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
    var fromProfile = scores.slice(0, topN).filter(function (x) { return x.weakness > 0.1; }).map(function (x) { return x.topic; });
    if (fromProfile.length > 0) return fromProfile;

    if (TOPIC_BOOTSTRAP_WEIGHTS && Object.keys(TOPIC_BOOTSTRAP_WEIGHTS).length > 0) {
      var bootScores = Object.keys(TOPIC_BOOTSTRAP_WEIGHTS).map(function (t) {
        return { topic: t, weakness: TOPIC_BOOTSTRAP_WEIGHTS[t] };
      });
      bootScores.sort(function (a, b) { return b.weakness - a.weakness; });
      return bootScores.slice(0, topN).filter(function (x) { return x.weakness > 0.05; }).map(function (x) { return x.topic; });
    }
    return [];
  }

  function selectMode(mode) {
    console.log('[QuizEngine] selectMode called, mode=', mode);
    selectedMode = mode;
    document.querySelectorAll('.mode-btn').forEach(function (b) { b.classList.remove('selected'); });
    var el = document.querySelector('[data-mode="' + mode + '"]');
    if (el) el.classList.add('selected');
    console.log('[QuizEngine] selectMode done, el=', el);
  }

  function setFeedbackContent(fb, isCorrect, explainText) {
    fb.textContent = '';
    fb.appendChild(document.createTextNode(isCorrect ? '✓ Correct. ' : '✗ Incorrect. '));
    var sp = document.createElement('span');
    sp.className = 'explanation';
    sp.textContent = explainText || '';
    fb.appendChild(sp);
  }

  function startQuiz(topicFilter) {
    console.log('[QuizEngine] startQuiz called', topicFilter ? 'topicFilter=' + topicFilter : '');
    var limitEl = document.getElementById('session-time-limit');
    var customEl = document.getElementById('session-time-custom');
    var minutes = (customEl && customEl.value && parseInt(customEl.value, 10)) || (limitEl ? parseInt(limitEl.value, 10) : 0) || 0;
    if (window.SessionStreak) window.SessionStreak.setTimeLimit(minutes);
    var filtered = questionBank.filter(function (q) {
      if (topicFilter) return (q.topic || '') === topicFilter;
      if (selectedMode === 'comparison') return q.mode === 'comparison';
      if (selectedMode === 'exam') return q.mode === 'exam';
      return true;
    });
    var profile = getProfile();
    var n = (selectedMode === 'exam' && EXAM_MODE_QUESTIONS)
      ? Math.min(EXAM_MODE_QUESTIONS, filtered.length)
      : Math.min(QUESTIONS_PER_QUIZ, filtered.length);
    sessionQuestions = weightedSample(filtered, n, profile);
    sessionQuestions.forEach(prepareQuestionShuffle);
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
    var navRow = document.querySelector('#quiz-area .nav-row');
    var exitBtn = document.getElementById('exit-quiz-btn');
    if (navRow && !exitBtn) {
      exitBtn = document.createElement('button');
      exitBtn.type = 'button';
      exitBtn.id = 'exit-quiz-btn';
      exitBtn.className = 'secondary';
      exitBtn.textContent = 'Exit Quiz';
      exitBtn.addEventListener('click', exitQuiz);
      navRow.insertBefore(exitBtn, navRow.firstChild);
    }
    renderQuestion();
  }

  function orderMatches(a, b) {
    if (!a || !b || a.length !== b.length) return false;
    for (var i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
    return true;
  }

  function sameSortedIndices(a, b) {
    if (a === b) return true;
    if (!a || !b || a.length !== b.length) return false;
    var sa = a.slice().sort(function (x, y) { return x - y; });
    var sb = b.slice().sort(function (x, y) { return x - y; });
    for (var i = 0; i < sa.length; i++) if (sa[i] !== sb[i]) return false;
    return true;
  }

  function prepareQuestionShuffle(q) {
    if (q.type === 'order') {
      var indices = q.options.map(function (_, i) { return i; });
      q._initialOrder = shuffle(indices.slice());
      return;
    }
    if (q.type === 'tf') {
      q._shuffledOptions = ['True', 'False'];
      q._correctDisplayIndex = (q.correct === true || q.correct === 'true') ? 0 : 1;
      delete q._correctDisplayIndices;
      return;
    }
    if (q.type === 'multi') {
      var correctOrig = Array.isArray(q.correct) ? q.correct.slice() : [];
      var pairs = q.options.map(function (text, i) { return { text: text, i: i }; });
      var shuffledPairs = shuffle(pairs);
      q._shuffledOptions = shuffledPairs.map(function (p) { return p.text; });
      q._correctDisplayIndices = [];
      for (var di = 0; di < shuffledPairs.length; di++) {
        if (correctOrig.indexOf(shuffledPairs[di].i) !== -1) q._correctDisplayIndices.push(di);
      }
      q._correctDisplayIndices.sort(function (a, b) { return a - b; });
      delete q._correctDisplayIndex;
      return;
    }
    var shuffled = shuffle(q.options.slice());
    q._shuffledOptions = shuffled;
    q._correctDisplayIndex = shuffled.indexOf(q.options[q.correct]);
    delete q._correctDisplayIndices;
  }

  function renderQuestion() {
    var q = sessionQuestions[currentIndex];
    document.getElementById('q-num').textContent = currentIndex + 1;
    document.getElementById('score-display').textContent = score;
    document.getElementById('question-text').textContent = q.q;
    var opts = document.getElementById('options');
    opts.innerHTML = '';
    opts.classList.remove('order-options');
    var fb = document.getElementById('feedback');
    fb.classList.add('hidden');
    fb.className = 'feedback hidden';

    if (q.type === 'order') {
      var order = answered[currentIndex] !== undefined ? answered[currentIndex] : (q._initialOrder || q.options.map(function (_, i) { return i; }));
      var isOrderCorrect = answered[currentIndex] !== undefined && orderMatches(answered[currentIndex], q.correctOrder);
      opts.classList.add('order-options');
      order.forEach(function (origIdx, pos) {
        var div = document.createElement('div');
        div.className = 'option order-item';
        div.dataset.originalIndex = origIdx;
        var text = document.createTextNode(q.options[origIdx]);
        var upBtn = document.createElement('button');
        upBtn.type = 'button';
        upBtn.className = 'order-btn order-up';
        upBtn.setAttribute('aria-label', 'Move up');
        upBtn.textContent = '\u2191';
        var downBtn = document.createElement('button');
        downBtn.type = 'button';
        downBtn.className = 'order-btn order-down';
        downBtn.setAttribute('aria-label', 'Move down');
        downBtn.textContent = '\u2193';
        if (answered[currentIndex] !== undefined) {
          upBtn.disabled = true;
          downBtn.disabled = true;
          if (isOrderCorrect) div.classList.add('correct');
          else div.classList.add('wrong');
        } else {
          upBtn.addEventListener('click', function () { moveOrderItem(opts, div, -1); });
          downBtn.addEventListener('click', function () { moveOrderItem(opts, div, 1); });
        }
        var label = document.createElement('span');
        label.className = 'order-label';
        label.appendChild(text);
        div.appendChild(upBtn);
        div.appendChild(downBtn);
        div.appendChild(label);
        opts.appendChild(div);
      });
      if (answered[currentIndex] === undefined) {
        var checkWrap = document.createElement('div');
        checkWrap.className = 'order-check-wrap';
        var checkBtn = document.createElement('button');
        checkBtn.type = 'button';
        checkBtn.className = 'order-check-btn';
        checkBtn.textContent = 'Check order';
        checkBtn.addEventListener('click', function () { submitOrder(currentIndex, q); });
        checkWrap.appendChild(checkBtn);
        opts.appendChild(checkWrap);
      }
      if (answered[currentIndex] !== undefined) {
        fb.classList.remove('hidden');
        fb.className = 'feedback ' + (isOrderCorrect ? 'correct-msg' : 'wrong-msg');
        setFeedbackContent(fb, isOrderCorrect, q.explain);
      }
    } else if (q.type === 'multi') {
      var pickN = (Array.isArray(q.correct) ? q.correct.length : 0) || (q._correctDisplayIndices || []).length;
      var hint = document.createElement('div');
      hint.className = 'multi-hint';
      hint.textContent = 'Select all that apply (' + pickN + ' correct).';
      opts.appendChild(hint);
      var mopts = q._shuffledOptions || q.options;
      var corrDisp = q._correctDisplayIndices || [];
      mopts.forEach(function (opt, i) {
        var div = document.createElement('div');
        div.className = 'option multi-opt';
        div.textContent = opt;
        div.dataset.index = i;
        if (answered[currentIndex] !== undefined) {
          var chosen = answered[currentIndex];
          var isSel = chosen.indexOf(i) !== -1;
          var isCorr = corrDisp.indexOf(i) !== -1;
          div.classList.add('disabled');
          if (isCorr && isSel) div.classList.add('correct');
          else if (isCorr && !isSel) div.classList.add('missed-correct');
          else if (!isCorr && isSel) div.classList.add('wrong');
        } else {
          div.addEventListener('click', function () {
            if (answered[currentIndex] !== undefined) return;
            div.classList.toggle('selected');
          });
        }
        opts.appendChild(div);
      });
      if (answered[currentIndex] === undefined) {
        var multiCheckWrap = document.createElement('div');
        multiCheckWrap.className = 'multi-check-wrap';
        var multiCheckBtn = document.createElement('button');
        multiCheckBtn.type = 'button';
        multiCheckBtn.className = 'multi-check-btn';
        multiCheckBtn.textContent = 'Check answer';
        multiCheckBtn.addEventListener('click', function () { submitMulti(currentIndex, q); });
        multiCheckWrap.appendChild(multiCheckBtn);
        opts.appendChild(multiCheckWrap);
      }
      if (answered[currentIndex] !== undefined) {
        var multiCorrect = sameSortedIndices(answered[currentIndex], corrDisp);
        fb.classList.remove('hidden');
        fb.className = 'feedback ' + (multiCorrect ? 'correct-msg' : 'wrong-msg');
        setFeedbackContent(fb, multiCorrect, q.explain);
      }
    } else {
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
    }

    document.getElementById('prev-btn').disabled = currentIndex === 0;
  }

  function moveOrderItem(container, item, delta) {
    var items = [].slice.call(container.querySelectorAll('.order-item'));
    var idx = items.indexOf(item);
    if (idx === -1) return;
    var next = idx + delta;
    if (next < 0 || next >= items.length) return;
    if (delta < 0) container.insertBefore(item, items[next]);
    else container.insertBefore(item, items[next].nextSibling);
  }

  function submitOrder(pos, q) {
    if (answered[pos] !== undefined) return;
    var opts = document.getElementById('options');
    var items = opts.querySelectorAll('.order-item');
    var order = [];
    for (var i = 0; i < items.length; i++) {
      order.push(parseInt(items[i].dataset.originalIndex, 10));
    }
    answered[pos] = order;
    var isCorrect = orderMatches(order, q.correctOrder);
    if (isCorrect) score++;
    [].forEach.call(items, function (el) {
      el.classList.add('disabled', isCorrect ? 'correct' : 'wrong');
      var up = el.querySelector('.order-up');
      var down = el.querySelector('.order-down');
      if (up) up.disabled = true;
      if (down) down.disabled = true;
    });
    var checkWrap = opts.querySelector('.order-check-wrap');
    if (checkWrap) checkWrap.remove();
    var fb = document.getElementById('feedback');
    fb.classList.remove('hidden');
    fb.className = 'feedback ' + (isCorrect ? 'correct-msg' : 'wrong-msg');
    setFeedbackContent(fb, isCorrect, q.explain);
    document.getElementById('score-display').textContent = score;
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

  function submitMulti(pos, q) {
    if (answered[pos] !== undefined) return;
    var optsEl = document.getElementById('options');
    var nodes = optsEl.querySelectorAll('.option.multi-opt');
    var selected = [];
    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i].classList.contains('selected')) selected.push(parseInt(nodes[i].dataset.index, 10));
    }
    selected.sort(function (a, b) { return a - b; });
    answered[pos] = selected;
    var corrDisp = q._correctDisplayIndices || [];
    var isCorrect = sameSortedIndices(selected, corrDisp);
    if (isCorrect) score++;
    var corrSet = {};
    for (var c = 0; c < corrDisp.length; c++) corrSet[corrDisp[c]] = true;
    for (var j = 0; j < nodes.length; j++) {
      var node = nodes[j];
      var di = parseInt(node.dataset.index, 10);
      var isSel = selected.indexOf(di) !== -1;
      var isCorr = !!corrSet[di];
      node.classList.remove('selected');
      node.classList.add('disabled');
      if (isCorr && isSel) node.classList.add('correct');
      else if (isCorr && !isSel) node.classList.add('missed-correct');
      else if (!isCorr && isSel) node.classList.add('wrong');
    }
    var wrap = optsEl.querySelector('.multi-check-wrap');
    if (wrap) wrap.remove();
    var fb = document.getElementById('feedback');
    fb.classList.remove('hidden');
    fb.className = 'feedback ' + (isCorrect ? 'correct-msg' : 'wrong-msg');
    setFeedbackContent(fb, isCorrect, q.explain);
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

  function exitQuiz() {
    document.getElementById('quiz-area').classList.add('hidden');
    document.getElementById('start-screen').classList.remove('hidden');
    document.getElementById('results-screen').classList.add('hidden');
  }

  function saveSessionToProfile() {
    var profile = getProfile();
    sessionQuestions.forEach(function (q, i) {
      var t = q.topic || 'Other';
      var isCorrect = false;
      if (q.type === 'order') {
        isCorrect = answered[i] !== undefined && orderMatches(answered[i], q.correctOrder);
      } else if (q.type === 'multi') {
        isCorrect = answered[i] !== undefined && sameSortedIndices(answered[i], q._correctDisplayIndices || []);
      } else {
        var correctIdx = q._correctDisplayIndex !== undefined ? q._correctDisplayIndex : q.correct;
        isCorrect = answered[i] !== undefined && answered[i] === correctIdx;
      }
      if (!profile.topicStats[t]) profile.topicStats[t] = { correct: 0, total: 0 };
      profile.topicStats[t].total++;
      if (isCorrect) profile.topicStats[t].correct++;
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
    var passed = pct >= PASSING_PERCENT;
    var scoreEl = document.getElementById('final-score');
    scoreEl.textContent = '';
    scoreEl.appendChild(document.createTextNode(score + ' / ' + total + ' (' + pct + '%)'));
    var passFailSpan = document.createElement('span');
    passFailSpan.className = 'result-pass-fail';
    passFailSpan.textContent = ' — ' + (passed ? 'Pass' : 'Fail');
    scoreEl.appendChild(passFailSpan);
    scoreEl.className = 'score ' + (passed ? 'pass' : 'fail');
    document.getElementById('result-msg').textContent = passed
      ? 'Passing is ' + PASSING_PERCENT + '%. You\'re on track!'
      : 'Aim for ' + PASSING_PERCENT + '%+ on the real exam. Review the pattern guide and try again.';
    document.getElementById('copy-toast').classList.add('hidden');
  }

  function getResultsMarkdown() {
    var total = sessionQuestions.length;
    var pct = Math.round((score / total) * 100);
    var missed = sessionQuestions.map(function (q, i) { return { q: q, i: i }; }).filter(function (x) {
      if (answered[x.i] === undefined) return false;
      var qq = x.q;
      if (qq.type === 'order') return !orderMatches(answered[x.i], qq.correctOrder);
      if (qq.type === 'multi') return !sameSortedIndices(answered[x.i], qq._correctDisplayIndices || []);
      var cidx = qq._correctDisplayIndex !== undefined ? qq._correctDisplayIndex : qq.correct;
      return answered[x.i] !== cidx;
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
    md += '**Pass:** ' + (pct >= PASSING_PERCENT ? 'Yes' : 'No') + '\n\n';
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
        var sh = q._shuffledOptions || q.options;
        var typeTag = q.type === 'order' ? ', order' : q.type === 'multi' ? ', multi' : q.type === 'tf' ? ', true/false' : '';
        var yourAns = q.type === 'order'
          ? (answered[x.i] || []).map(function (idx) { return q.options[idx]; }).join(' \u2192 ')
          : q.type === 'multi'
          ? (answered[x.i] || []).map(function (di) { return sh[di]; }).join('; ')
          : sh[answered[x.i]];
        var correctAns = q.type === 'order'
          ? (q.correctOrder || []).map(function (idx) { return q.options[idx]; }).join(' \u2192 ')
          : q.type === 'multi'
          ? (q._correctDisplayIndices || []).map(function (di) { return sh[di]; }).join('; ')
          : sh[q._correctDisplayIndex !== undefined ? q._correctDisplayIndex : q.correct];
        md += '### ' + (i + 1) + '. [' + (q.topic || 'General') + typeTag + ']\n';
        md += '**Q:** ' + q.q + '\n';
        md += '**Your answer:** ' + (yourAns != null ? yourAns : '') + '\n';
        md += '**Correct answer:** ' + (correctAns != null ? correctAns : '') + '\n';
        md += '**Explanation:** ' + q.explain + '\n\n';
      });
    }
    return md;
  }

  function downloadResults() {
    try {
      var md = getResultsMarkdown();
      var blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = downloadFilenamePrefix + '_' + new Date().toISOString().slice(0, 10) + '.md';
      a.rel = 'noopener';
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      /* Revoke after a tick: synchronous revoke breaks downloads in some browsers (e.g. Brave). */
      setTimeout(function () {
        try { URL.revokeObjectURL(url); } catch (e2) {}
      }, 2500);
    } catch (e) {
      console.error('[QuizEngine] downloadResults failed', e);
      try {
        window.alert('Could not download results. Use Copy to Clipboard, or check the browser console.');
      } catch (e3) {}
    }
  }

  function copyResultsToClipboard() {
    var md = getResultsMarkdown();
    if (!navigator.clipboard || !navigator.clipboard.writeText) {
      try {
        window.alert('Clipboard API is not available in this context. Try Download Results or use HTTPS.');
      } catch (e) {}
      return;
    }
    navigator.clipboard.writeText(md).then(function () {
      var el = document.getElementById('copy-toast');
      if (el) {
        el.classList.remove('hidden');
        setTimeout(function () { el.classList.add('hidden'); }, 2500);
      }
    }).catch(function (err) {
      console.error('[QuizEngine] copyResultsToClipboard failed', err);
      try {
        window.alert('Could not copy to clipboard (permission or browser policy). Try Download Results.');
      } catch (e) {}
    });
  }

  function parseImportedResults(mdText) {
    var lines = mdText.split('\n');
    var firstLine = (lines[0] || '').toLowerCase();
    if (QUIZ_ID !== 'oci' && firstLine.indexOf('oci foundations') !== -1) return { ok: false, error: 'This file is for OCI quiz. Open the OCI quiz to import it.' };
    if (QUIZ_ID !== 'gcp' && firstLine.indexOf('gcp cloud digital leader') !== -1) return { ok: false, error: 'This file is for GCP quiz. Open the GCP quiz to import it.' };
    if (QUIZ_ID !== 'ai900' && firstLine.indexOf('ai-900') !== -1) return { ok: false, error: 'This file is for AI-900 quiz. Open the AI-900 quiz to import it.' };
    if (QUIZ_ID !== 'az900' && (firstLine.indexOf('az-900') !== -1 || (firstLine.indexOf('azure') !== -1 && firstLine.indexOf('ai-900') === -1))) return { ok: false, error: 'This file is for AZ-900 quiz. Open the AZ-900 quiz to import it.' };
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
      console.log('[QuizEngine] run called, config.quizId=', config && config.quizId);
      config = config || {};
      QUIZ_ID = config.quizId || 'quiz';
      PROFILE_KEY = 'study_sessions_profile_' + QUIZ_ID;
      questionBank = config.questionBank || [];
      QUESTIONS_PER_QUIZ = config.questionsPerQuiz || 40;
      EXAM_MODE_QUESTIONS = config.examModeQuestions;
      PASSING_PERCENT = config.passingPercent != null ? config.passingPercent : 70;
      resultsTitle = config.resultsTitle || (QUIZ_ID + ' Quiz Results');
      downloadFilenamePrefix = config.downloadFilenamePrefix || (QUIZ_ID + '_quiz_results');
      TOPIC_BOOTSTRAP_WEIGHTS = config.topicBootstrapWeights || null;

      currentIndex = 0;
      score = 0;
      answered = [];
      sessionQuestions = [];
      selectedMode = 'mixed';

      window.startQuiz = startQuiz;
      window.selectMode = selectMode;
      console.log('[QuizEngine] selectMode assigned to window, typeof=', typeof window.selectMode);
      window.nextQuestion = nextQuestion;
      window.prevQuestion = prevQuestion;
      window.exitQuiz = exitQuiz;
      window.importResults = importResults;
      window.onImportFile = onImportFile;
      window.downloadResults = downloadResults;
      window.copyResultsToClipboard = copyResultsToClipboard;

      initFocusHint();
      /* Wire mode buttons and Start Quiz after DOM is ready (scripts run from head before body exists) */
      function wireStartScreenButtons() {
        document.querySelectorAll('.mode-selector .mode-btn').forEach(function (btn) {
          var mode = btn.getAttribute('data-mode');
          if (mode) {
            btn.removeAttribute('onclick');
            btn.addEventListener('click', function () { selectMode(mode); });
          }
        });
        var startBtn = document.getElementById('start-btn');
        if (startBtn) {
          startBtn.removeAttribute('onclick');
          startBtn.addEventListener('click', function () { startQuiz(); });
        }
        var startMLConceptsBtn = document.getElementById('start-ml-concepts-btn');
        if (startMLConceptsBtn) {
          startMLConceptsBtn.removeAttribute('onclick');
          startMLConceptsBtn.addEventListener('click', function () { startQuiz('ML Concepts'); });
        }
        var prevBtn = document.getElementById('prev-btn');
        var nextBtn = document.getElementById('next-btn');
        if (prevBtn) {
          prevBtn.removeAttribute('onclick');
          prevBtn.addEventListener('click', prevQuestion);
        }
        if (nextBtn) {
          nextBtn.removeAttribute('onclick');
          nextBtn.addEventListener('click', nextQuestion);
        }
        /* Results + import: inline onclick is blocked by CSP (script-src 'self' without unsafe-inline in _headers). */
        function wireOptional(id, handler) {
          var el = document.getElementById(id);
          if (!el) return;
          el.removeAttribute('onclick');
          el.addEventListener('click', handler);
        }
        wireOptional('quiz-retry-btn', function () { startQuiz(); });
        wireOptional('quiz-download-results-btn', function () { downloadResults(); });
        wireOptional('quiz-copy-results-btn', function () { copyResultsToClipboard(); });
        wireOptional('import-submit-btn', function () { importResults(); });
        wireOptional('import-choose-file-btn', function () {
          var inp = document.getElementById('import-file');
          if (inp) inp.click();
        });
        var importFileInput = document.getElementById('import-file');
        if (importFileInput) {
          importFileInput.removeAttribute('onchange');
          importFileInput.addEventListener('change', onImportFile);
        }
      }
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', wireStartScreenButtons);
      } else {
        wireStartScreenButtons();
      }
      if (window.BrainDump) window.BrainDump.init({ nextCard: nextQuestion, quizId: QUIZ_ID });
      setTimeout(function () {
        var sel = document.querySelector('.mode-selector');
        var rect = sel ? sel.getBoundingClientRect() : null;
        var centerX = rect ? rect.left + rect.width / 2 : 0;
        var centerY = rect ? rect.top + rect.height / 2 : 0;
        var elementsAtPoint = (rect && centerX > 0 && centerY > 0) ? document.elementsFromPoint(centerX, centerY) : [];
        console.log('[QuizEngine] diagnostic: mode-selector rect=', rect, 'elementsAtPoint=', elementsAtPoint.length, elementsAtPoint.map(function (e) { return e.id || e.className || e.tagName; }));
      }, 500);
    }
  };
})();
