/**
 * Floating "Motivation" button – shows a random reframe in a toast. Mobile-friendly.
 */
(function () {
  'use strict';

  /** General reframes (weight 1 each when picking). */
  var MOTIVATIONS_GENERAL = [
    'This pattern = securing drone data so I can script satire instead of bugs.',
    'Mastering this = more money to direct AI for creative freedom.',
    'Every correct answer = one step closer to escaping legacy-code hell.',
    'Each cert = leverage to build what I want, not just fix what broke.',
    'This grind = buying back hours for side projects and real life.',
    'Learning this = fewer 3 a.m. pages and more "ship it" moments.',
    'One more right answer = one less meeting where I have to guess.',
    'This knowledge = saying "no" to tech debt and "yes" to clean systems.',
    'Every session = stacking skills that compound into better gigs.',
    'Getting this right = confidence to automate the boring stuff away.',
    'This drill = building the mental model before the interview.',
    'Mastery here = less firefighting, more designing the future.',
    'Each question = a brick in the escape route from support-hell.',
    'Studying this = investing in the version of you that ships products.',
    'Right answers now = options later: remote, raise, or your own thing.',
    'This focus = trading short-term comfort for long-term optionality.',
    'Every pass = one step closer to the work that actually excites you.'
  ];

  /** Gauntlet AI path — counted multiple times in the weighted pool so they surface more often. */
  var MOTIVATIONS_GAUNTLET = [
    'This session = reps toward Gauntlet AI — keep the goal in the room.',
    'Gauntlet AI is on the map: every hard question is tuition, not torture.',
    'You are building the baseline Gauntlet AI will expect — stay in it.',
    'One more pass = one more proof you are serious about Gauntlet AI.',
    'Tough stretch? Same energy you will bring on day one at Gauntlet AI.',
    'This grind = stacking signal that you belong in a Gauntlet AI cohort.',
    'Not giving up here = the same discipline that gets you through Gauntlet AI.',
    'Right now you are earning the seat — Gauntlet AI is the finish line, not fantasy.'
  ];

  /** How many copies of each Gauntlet line go into the draw (raise to bump Gauntlet share further). */
  var GAUNTLET_WEIGHT = 2;

  function buildWeightedMotivations() {
    var out = MOTIVATIONS_GENERAL.slice();
    var i;
    var j;
    for (i = 0; i < MOTIVATIONS_GAUNTLET.length; i++) {
      for (j = 0; j < GAUNTLET_WEIGHT; j++) {
        out.push(MOTIVATIONS_GAUNTLET[i]);
      }
    }
    return out;
  }

  var MOTIVATIONS = buildWeightedMotivations();

  var TOAST_DURATION_MS = 5000;
  var FADE_OUT_MS = 400;

  function injectStyles() {
    if (document.getElementById('motivation-styles')) return;
    var style = document.createElement('style');
    style.id = 'motivation-styles';
    style.textContent = [
      '.motivation-btn { position: fixed; bottom: 1rem; right: 1rem; z-index: 9998; width: 2.75rem; height: 2.75rem; min-width: 44px; min-height: 44px; border-radius: 50%; background: var(--surface, #1a2332); color: var(--text-muted, #94a3b8); border: 1px solid rgba(148,163,184,0.3); cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; box-shadow: 0 2px 12px rgba(0,0,0,0.3); transition: transform 0.15s, color 0.15s, border-color 0.15s; }',
      '.motivation-btn:hover, .motivation-btn:focus { color: var(--accent, #64748b); border-color: var(--accent, #64748b); transform: scale(1.05); outline: none; }',
      '.motivation-btn:active { transform: scale(0.98); }',
      '.motivation-toast-wrap { position: fixed; left: 1rem; right: 1rem; bottom: 4rem; z-index: 9999; display: flex; justify-content: center; pointer-events: none; }',
      '.motivation-toast { max-width: min(420px, calc(100vw - 2rem)); padding: 0.9rem 1rem; background: var(--surface, #1a2332); border: 1px solid rgba(148,163,184,0.25); border-radius: 10px; color: var(--text, #e2e8f0); font-size: 0.9rem; line-height: 1.45; box-shadow: 0 8px 24px rgba(0,0,0,0.4); opacity: 0; transition: opacity 0.25s ease; }',
      '.motivation-toast.visible { opacity: 1; }',
      '.motivation-toast.fade-out { opacity: 0; }',
      '@media (min-width: 480px) { .motivation-toast-wrap { left: auto; right: 1rem; bottom: 4rem; justify-content: flex-end; } }'
    ].join('\n');
    document.head.appendChild(style);
  }

  function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function showToast(message) {
    injectStyles();
    var wrap = document.getElementById('motivation-toast-wrap');
    if (!wrap) {
      wrap = document.createElement('div');
      wrap.id = 'motivation-toast-wrap';
      wrap.className = 'motivation-toast-wrap';
      wrap.setAttribute('aria-live', 'polite');
      document.body.appendChild(wrap);
    }
    var toast = document.getElementById('motivation-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'motivation-toast';
      toast.className = 'motivation-toast';
      toast.setAttribute('role', 'status');
      wrap.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.remove('fade-out', 'visible');
    wrap.style.display = 'flex';
    requestAnimationFrame(function () {
      toast.classList.add('visible');
    });
    clearTimeout(toast._hideTimer);
    toast._hideTimer = setTimeout(function () {
      toast.classList.add('fade-out');
      setTimeout(function () {
        wrap.style.display = 'none';
        toast.classList.remove('visible', 'fade-out');
      }, FADE_OUT_MS);
    }, TOAST_DURATION_MS);
  }

  function onButtonClick() {
    showToast(pickRandom(MOTIVATIONS));
  }

  function ensureButton() {
    if (document.getElementById('motivation-floating-btn')) return;
    injectStyles();
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.id = 'motivation-floating-btn';
    btn.className = 'motivation-btn';
    btn.setAttribute('aria-label', 'Why? Motivation');
    btn.innerHTML = '🔥';
    btn.title = 'Why?';
    btn.addEventListener('click', onButtonClick);
    document.body.appendChild(btn);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ensureButton);
  } else {
    ensureButton();
  }
})();
