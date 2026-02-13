(function () {
  function escapeHtml(s) {
    var div = document.createElement('div');
    div.textContent = s;
    return div.innerHTML;
  }

  var getOrdered = window.getQuizOrderedConfig;
  var getCompleted = window.getQuizCompletedIds;
  var config = getOrdered ? getOrdered() : window.QUIZ_CONFIG;
  var completedIds = getCompleted ? getCompleted() : [];
  var container = document.getElementById('quiz-list-container');
  if (config && container) {
    var html = '<nav class="quiz-list" id="quiz-sortable-list">';
    for (var i = 0; i < config.length; i++) {
      var q = config[i];
      var isCompleted = q.closed || completedIds.indexOf(q.id) >= 0;
      var cardClass = 'quiz-card ' + q.cardClass + (isCompleted ? ' completed' : '');
      html += '<div class="quiz-card-item" data-id="' + escapeHtml(q.id) + '">' +
        '<span class="drag-handle" aria-label="Drag to reorder" title="Drag to reorder">⋮⋮</span>' +
        '<a href="' + q.href + '" class="' + cardClass + '">' +
        '<span class="name">' + escapeHtml(q.name) + '</span>' +
        '<span class="desc">' + q.desc + '</span>' +
        (isCompleted ? '<span class="completed-badge">Completed</span>' : '') +
        '</a>' +
        '<label class="quiz-complete-label" title="Mark as complete">' +
        '<input type="checkbox" class="quiz-complete-checkbox" data-quiz-id="' + escapeHtml(q.id) + '"' + (isCompleted ? ' checked' : '') + '>' +
        '<span class="quiz-complete-text">Done</span></label></div>';
    }
    html += '</nav>';
    container.innerHTML = html;

    container.querySelectorAll('.quiz-complete-checkbox').forEach(function (cb) {
      cb.addEventListener('change', function () {
        var id = this.getAttribute('data-quiz-id');
        var completed = this.checked;
        if (window.setQuizCompleted) window.setQuizCompleted(id, completed);
        var item = this.closest('.quiz-card-item');
        var card = item && item.querySelector('.quiz-card');
        var badge = item && item.querySelector('.completed-badge');
        if (card) card.classList.toggle('completed', completed);
        if (completed && card && !badge) {
          var span = document.createElement('span');
          span.className = 'completed-badge';
          span.textContent = 'Completed';
          card.appendChild(span);
        } else if (badge) badge.remove();
      });
    });

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
