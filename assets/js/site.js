// Embed this inline in <head> BEFORE theme.css to avoid flash:
// <script>(function(){var t=localStorage.getItem('theme');if(!t)t=matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light';document.documentElement.dataset.theme=t;})()</script>

(function () {
  // Elevate header + reading progress on scroll
  var header = document.querySelector('.site-header');
  var bar = document.querySelector('.read-progress span');
  function onScroll() {
    var y = window.scrollY || 0;
    if (header) header.dataset.elevate = y > 8 ? 'true' : 'false';
    if (bar) {
      var h = document.documentElement.scrollHeight - innerHeight;
      bar.style.transform = 'scaleX(' + (h > 0 ? Math.min(y / h, 1) : 0) + ')';
    }
  }
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Theme toggle
  var btn = document.querySelector('[data-theme-toggle]');
  if (btn) btn.addEventListener('click', function () {
    var next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    localStorage.setItem('theme', next);
  });
})();
