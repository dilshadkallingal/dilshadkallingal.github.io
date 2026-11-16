// Reveals content as it scrolls into view. Styles live in style.css under `.motion`.
// Anything at or above the bottom of the screen is revealed, so fast scrolls and jumps
// (End key, "Back to top", nav links) never leave skipped sections hidden.
(function () {
  var root = document.documentElement;
  if (!root.classList.contains('motion')) return;
  root.classList.add('motion-ready');

  var items = Array.prototype.slice.call(document.querySelectorAll('.sec > .label, .sec-body > :not(.index):not(.timeline), .index li, .timeline li, main.wrap > *, .cv section, .site-footer .wrap'));
  var queued = false;

  function sweep() {
    queued = false;
    var limit = window.innerHeight * 0.94, shown = 0;
    items = items.filter(function (el) {
      if (el.getBoundingClientRect().top >= limit) return true;
      // Items revealed together enter one after another, then the delay is cleared so hovers stay instant.
      el.style.transitionDelay = Math.min(shown++, 6) * 70 + 'ms';
      el.classList.add('is-in');
      setTimeout(function () { el.style.transitionDelay = ''; }, 1400);
      return false;
    });
    if (!items.length) {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    }
  }

  function onScroll() {
    if (!queued) { queued = true; requestAnimationFrame(sweep); }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  sweep();
})();
