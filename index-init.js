(function () {
  var btn = document.getElementById('review-dumps-btn');
  if (btn && window.BrainDump) {
    btn.addEventListener('click', function () {
      window.BrainDump.init({}).then(function () { window.BrainDump.openReview(); });
    });
  }
})();
