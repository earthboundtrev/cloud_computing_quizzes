(function () {
  function escapeHtml(s) {
    var div = document.createElement('div');
    div.textContent = s;
    return div.innerHTML;
  }

  var getOrdered = window.getQuizOrderedConfig;
  var config = getOrdered ? getOrdered() : window.QUIZ_CONFIG;
  var container = document.getElementById('quiz-list-container');
  if (config && container) {
    var html = '<nav class="quiz-list" id="quiz-sortable-list">';
    for (var i = 0; i < config.length; i++) {
      var q = config[i];
      var cardClass = 'quiz-card ' + q.cardClass + (q.closed ? ' completed' : '');
      html += '<div class="quiz-card-item" data-id="' + escapeHtml(q.id) + '">' +
        '<span class="drag-handle" aria-label="Drag to reorder" title="Drag to reorder">⋮⋮</span>' +
        '<a href="' + q.href + '" class="' + cardClass + '">' +
        '<span class="name">' + escapeHtml(q.name) + '</span>' +
        '<span class="desc">' + q.desc + '</span>' +
        (q.closed ? '<span class="completed-badge">Completed</span>' : '') +
        '</a></div>';
    }
    html += '</nav>';
    container.innerHTML = html;

    var listEl = document.getElementById('quiz-sortable-list');
    if (listEl && window.Sortable) {
      window.Sortable.create(listEl, {
        animation: 150,
        handle: '.drag-handle',
        ghostClass: 'quiz-card-item-ghost',
        dragClass: 'quiz-card-item-drag',
        onEnd: function () {
          var ids = [];
          var items = listEl.querySelectorAll('.quiz-card-item');
          for (var j = 0; j < items.length; j++) ids.push(items[j].getAttribute('data-id'));
          try {
            localStorage.setItem('quizOrder', JSON.stringify(ids));
          } catch (e) {}
          if (window.refreshQuizNav) window.refreshQuizNav();
        }
      });
    }
  }

  var btn = document.getElementById('review-dumps-btn');
  if (btn && window.BrainDump) {
    btn.addEventListener('click', function () {
      window.BrainDump.init({}).then(function () { window.BrainDump.openReview(); });
    });
  }
})();
