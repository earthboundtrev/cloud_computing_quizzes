/**
 * Brain-Dump feature for Study Sessions quizzes.
 * Uses IndexedDB when available, falls back to localStorage. Offline-friendly.
 */
(function () {
  'use strict';

  const DB_NAME = 'StudySessionsBrainDumps';
  const STORE_NAME = 'dumps';
  const LS_FALLBACK_KEY = 'study_sessions_brain_dumps';

  let db = null;
  let nextCardFn = null;
  let quizId = '';

  function injectStyles() {
    if (document.getElementById('brain-dump-styles')) return;
    const style = document.createElement('style');
    style.id = 'brain-dump-styles';
    style.textContent = [
      '.brain-dump-wrap { margin: 1rem 0; padding: 0.75rem 0; border-top: 1px solid rgba(148,163,184,0.2); }',
      '.brain-dump-wrap label, .brain-dump-wrap .brain-dump-label { display: block; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.5rem; }',
      '#brain-dump-textarea { width: 100%; min-height: 72px; padding: 0.6rem; background: var(--bg); border: 1px solid var(--accent-dim, #475569); border-radius: 6px; color: var(--text); font-family: inherit; font-size: 0.9rem; resize: vertical; box-sizing: border-box; }',
      '#brain-dump-textarea:focus { outline: none; border-color: var(--accent); }',
      '.brain-dump-actions { display: flex; align-items: center; gap: 0.5rem; margin-top: 0.5rem; flex-wrap: wrap; }',
      '.brain-dump-actions button { padding: 0.5rem 1rem; font-size: 0.9rem; }',
      '.btn-mic { padding: 0.5rem !important; min-width: 2.5rem; background: var(--surface) !important; color: var(--text) !important; border: 1px solid var(--accent-dim, #475569) !important; border-radius: 6px; cursor: pointer; }',
      '.btn-mic:hover { background: rgba(148,163,184,0.15) !important; }',
      '.btn-mic.listening { background: rgba(239,68,68,0.2) !important; border-color: var(--wrong, #ef4444) !important; color: #fca5a5 !important; }',
      '.btn-mic:disabled { opacity: 0.6; cursor: not-allowed; }',
      '.nav-dumps-btn { background: transparent; color: var(--text-muted); border: none; font-family: inherit; font-size: 0.9rem; cursor: pointer; padding: 0.25rem 0.5rem; border-radius: 4px; }',
      '.nav-dumps-btn:hover { color: var(--accent); }',
      '.brain-dump-modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 1rem; box-sizing: border-box; }',
      '.brain-dump-modal { background: var(--surface); border-radius: 12px; max-width: 560px; width: 100%; max-height: 85vh; overflow: hidden; display: flex; flex-direction: column; box-shadow: 0 20px 40px rgba(0,0,0,0.4); }',
      '.brain-dump-modal h3 { padding: 1rem 1.25rem; margin: 0; font-size: 1.1rem; color: var(--accent); border-bottom: 1px solid rgba(148,163,184,0.2); }',
      '.brain-dump-modal-list { padding: 1rem; overflow-y: auto; flex: 1; min-height: 0; }',
      '.brain-dump-modal-item { background: var(--bg); border-radius: 8px; padding: 1rem; margin-bottom: 0.75rem; border-left: 3px solid var(--accent); font-size: 0.9rem; }',
      '.brain-dump-modal-item:last-child { margin-bottom: 0; }',
      '.brain-dump-modal-item .dump-question { font-weight: 600; color: var(--text); margin-bottom: 0.5rem; }',
      '.brain-dump-modal-item .dump-text { color: var(--text-muted); white-space: pre-wrap; word-break: break-word; }',
      '.brain-dump-modal-item .dump-date { font-size: 0.8rem; color: var(--text-muted); margin-top: 0.5rem; opacity: 0.9; }',
      '.brain-dump-modal-empty { color: var(--text-muted); text-align: center; padding: 2rem; }',
      '.brain-dump-modal-close { margin: 0 1.25rem 1rem; padding: 0.6rem 1.2rem; align-self: flex-end; }',
      '.brain-dump-modal-overlay.hidden { display: none !important; }'
    ].join('\n');
    document.head.appendChild(style);
  }

  function openDB() {
    return new Promise(function (resolve, reject) {
      if (typeof indexedDB === 'undefined') {
        resolve(null);
        return;
      }
      const req = indexedDB.open(DB_NAME, 1);
      req.onerror = function () { resolve(null); };
      req.onsuccess = function () {
        db = req.result;
        resolve(db);
      };
      req.onupgradeneeded = function (e) {
        const database = e.target.result;
        if (!database.objectStoreNames.contains(STORE_NAME)) {
          database.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
        }
      };
    });
  }

  function addDump(dump) {
    const record = {
      questionText: dump.questionText,
      dumpText: dump.dumpText,
      timestamp: dump.timestamp || new Date().toISOString(),
      quizId: dump.quizId || quizId
    };
    if (db) {
      return new Promise(function (resolve, reject) {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        const req = store.add(record);
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
      });
    }
    const list = JSON.parse(localStorage.getItem(LS_FALLBACK_KEY) || '[]');
    list.push(record);
    localStorage.setItem(LS_FALLBACK_KEY, JSON.stringify(list));
    return Promise.resolve();
  }

  function getAllDumps() {
    if (db) {
      return new Promise(function (resolve, reject) {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const req = store.getAll();
        req.onsuccess = () => resolve(req.result || []);
        req.onerror = () => reject(req.error);
      });
    }
    const list = JSON.parse(localStorage.getItem(LS_FALLBACK_KEY) || '[]');
    return Promise.resolve(list);
  }

  function getTextarea() {
    return document.getElementById('brain-dump-textarea');
  }

  function getQuestionEl() {
    return document.getElementById('question-text');
  }

  function focusDump() {
    var ta = getTextarea();
    if (ta && document.getElementById('quiz-area') && !document.getElementById('quiz-area').classList.contains('hidden')) {
      ta.focus();
    }
  }

  function saveAndNext() {
    var questionEl = getQuestionEl();
    var ta = getTextarea();
    if (!questionEl || !ta) return;
    var questionText = (questionEl.textContent || '').trim();
    var dumpText = (ta.value || '').trim();
    if (!questionText) return;
    addDump({
      questionText: questionText,
      dumpText: dumpText,
      timestamp: new Date().toISOString(),
      quizId: quizId
    }).then(function () {
      ta.value = '';
      if (typeof nextCardFn === 'function') {
        nextCardFn();
      }
      setTimeout(focusDump, 100);
    });
  }

  function showVoiceToast(message) {
    var wrap = document.getElementById('brain-dump-wrap');
    if (!wrap) return;
    var existing = document.getElementById('brain-dump-voice-toast');
    if (existing) existing.remove();
    var toast = document.createElement('span');
    toast.id = 'brain-dump-voice-toast';
    toast.setAttribute('role', 'alert');
    toast.style.cssText = 'font-size: 0.8rem; color: var(--wrong, #ef4444); margin-left: 0.5rem;';
    toast.textContent = message;
    wrap.querySelector('.brain-dump-actions').appendChild(toast);
    setTimeout(function () {
      if (toast.parentNode) toast.remove();
    }, 4000);
  }

  function setupVoiceInput() {
    var btn = document.getElementById('brain-dump-mic');
    var ta = getTextarea();
    if (!btn || !ta) return;
    var Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) {
      btn.addEventListener('click', function () {
        showVoiceToast('Voice input not supported in this browser. Try Chrome on Android/iOS.');
      });
      return;
    }
    var recognition = new Recognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    recognition.maxAlternatives = 1;
    var lastTranscript = '';
    btn.addEventListener('click', function () {
      if (btn.classList.contains('listening')) {
        recognition.stop();
        return;
      }
      lastTranscript = '';
      btn.classList.add('listening');
      btn.setAttribute('aria-label', 'Stop voice input');
      recognition.onresult = function (e) {
        var result = e.results[0];
        if (result && result[0]) lastTranscript = result[0].transcript || '';
      };
      recognition.onend = function () {
        btn.classList.remove('listening');
        btn.setAttribute('aria-label', 'Voice input');
        if (lastTranscript) {
          ta.value = (ta.value + (ta.value ? ' ' : '') + lastTranscript).trim();
        }
      };
      recognition.onerror = function (e) {
        btn.classList.remove('listening');
        btn.setAttribute('aria-label', 'Voice input');
        var msg = 'Voice input failed.';
        if (e.error === 'not-allowed') msg = 'Microphone access denied.';
        else if (e.error === 'no-speech') msg = 'No speech detected. Try again.';
        else if (e.error === 'network') msg = 'Network error. Check connection.';
        else if (e.error === 'language-not-supported') msg = 'Language not supported.';
        showVoiceToast(msg);
      };
      try {
        recognition.start();
      } catch (err) {
        btn.classList.remove('listening');
        showVoiceToast('Could not start voice input. Try again.');
      }
    });
  }

  function openReviewModal() {
    getAllDumps().then(function (list) {
      var overlay = document.getElementById('brain-dump-modal-overlay');
      var listEl = document.getElementById('brain-dump-modal-list');
      if (!overlay || !listEl) return;
      if (list.length === 0) {
        listEl.innerHTML = '<p class="brain-dump-modal-empty">No brain-dumps saved yet. Use the text area below a question and click Save &amp; Next.</p>';
      } else {
        listEl.innerHTML = list
          .slice()
          .reverse()
          .map(function (d) {
            var dateStr = '';
            try {
              var dt = new Date(d.timestamp);
              dateStr = dt.toLocaleDateString() + ' ' + dt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            } catch (e) {
              dateStr = d.timestamp || '';
            }
            return (
              '<div class="brain-dump-modal-item">' +
              '<div class="dump-question">' + escapeHtml(d.questionText) + '</div>' +
              '<div class="dump-text">' + (d.dumpText ? escapeHtml(d.dumpText) : '<em>No text</em>') + '</div>' +
              '<div class="dump-date">' + escapeHtml(dateStr) + (d.quizId ? ' · ' + escapeHtml(d.quizId) : '') + '</div>' +
              '</div>'
            );
          })
          .join('');
      }
      overlay.classList.remove('hidden');
    });
  }

  function escapeHtml(s) {
    var div = document.createElement('div');
    div.textContent = s;
    return div.innerHTML;
  }

  function closeReviewModal() {
    var overlay = document.getElementById('brain-dump-modal-overlay');
    if (overlay) overlay.classList.add('hidden');
  }

  function ensureDOM() {
    injectStyles();
    var saveBtn = document.getElementById('brain-dump-save-next');
    if (saveBtn && !saveBtn._bound) {
      saveBtn._bound = true;
      saveBtn.addEventListener('click', saveAndNext);
    }
    setupVoiceInput();
    if (!document.getElementById('brain-dump-modal-overlay')) {
      var overlay = document.createElement('div');
      overlay.id = 'brain-dump-modal-overlay';
      overlay.className = 'brain-dump-modal-overlay hidden';
      overlay.innerHTML =
        '<div class="brain-dump-modal">' +
        '<h3>Review Brain-Dumps</h3>' +
        '<div id="brain-dump-modal-list" class="brain-dump-modal-list"></div>' +
        '<button type="button" class="secondary brain-dump-modal-close" id="brain-dump-modal-close">Close</button>' +
        '</div>';
      overlay.addEventListener('click', function (e) {
        if (e.target === overlay) closeReviewModal();
      });
      document.body.appendChild(overlay);
      var closeBtn = document.getElementById('brain-dump-modal-close');
      if (closeBtn) closeBtn.addEventListener('click', closeReviewModal);
    }
    var reviewBtn = document.getElementById('review-dumps-btn');
    if (reviewBtn && !reviewBtn._bound) {
      reviewBtn._bound = true;
      reviewBtn.addEventListener('click', openReviewModal);
    }
  }

  window.BrainDump = {
    init: function (options) {
      options = options || {};
      nextCardFn = options.nextCard || null;
      quizId = options.quizId || (typeof QUIZ_ID !== 'undefined' ? QUIZ_ID : '');
      return openDB().then(function () {
        ensureDOM();
      });
    },
    focusDump: focusDump,
    ensureDOM: ensureDOM,
    openReview: openReviewModal,
    closeReview: closeReviewModal
  };
})();
