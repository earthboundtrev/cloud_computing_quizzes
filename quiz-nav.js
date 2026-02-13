/**
 * Injects quiz nav links in display order (from getQuizOrderedConfig).
 * Call window.refreshQuizNav() after reorder on index to sync nav.
 */
(function () {
  function renderNav() {
    var config = window.getQuizOrderedConfig ? window.getQuizOrderedConfig() : window.QUIZ_CONFIG;
    var container = document.getElementById('quiz-nav-links');
    if (!config || !container) return;
    var currentHref = window.location.pathname.split('/').pop() || window.location.href;
    var html = '';
    for (var i = 0; i < config.length; i++) {
      var q = config[i];
      var isCurrent = currentHref === q.href || (currentHref === '' && q.href === 'index.html');
      var linkClass = isCurrent ? 'nav-link current' : 'nav-link';
      html += '<a href="' + q.href + '" class="' + linkClass + '">' + escapeHtml(q.navLabel) + '</a>';
    }
    container.innerHTML = html;
  }
  function escapeHtml(s) {
    var div = document.createElement('div');
    div.textContent = s;
    return div.innerHTML;
  }
  window.refreshQuizNav = renderNav;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderNav);
  } else {
    renderNav();
  }
})();
