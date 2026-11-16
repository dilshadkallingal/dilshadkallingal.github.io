// Light/dark theme: follows the system unless the visitor picks one with the toggle.
(function () {
  var root = document.documentElement;
  var saved = null;
  try { saved = localStorage.getItem('theme'); } catch (e) {}
  if (saved === 'light' || saved === 'dark') root.setAttribute('data-theme', saved);

  // Motion is opt-in from here so content is never hidden without JavaScript or for reduced-motion users.
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    root.classList.add('motion');
    // If motion.js never runs (blocked or failed), show everything rather than leave it hidden.
    setTimeout(function () { if (!root.classList.contains('motion-ready')) root.classList.remove('motion'); }, 2500);

    // Logo entrance: on the homepage and on the first page of a visit, play one of six animations
    // (styles in style.css under [data-logo]), never the same one twice in a row for this visitor.
    var isHome = /\/(index\.html)?$/.test(location.pathname);
    var firstPage = false;
    try { firstPage = !sessionStorage.getItem('dk-visit'); sessionStorage.setItem('dk-visit', '1'); } catch (e) {}
    if (isHome || firstPage) {
      var last = null;
      try { last = localStorage.getItem('dk-logo'); } catch (e) {}
      var pool = ['build', 'set', 'course', 'swing', 'reveal', 'focus'].filter(function (v) { return v !== last; });
      var pick = pool[Math.floor(Math.random() * pool.length)];
      root.setAttribute('data-logo', pick);
      try { localStorage.setItem('dk-logo', pick); } catch (e) {}
    }
  }

  function current() {
    var t = root.getAttribute('data-theme');
    if (t) return t;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.querySelector('[data-theme-toggle]');
    if (!btn) return;
    function label() { btn.setAttribute('aria-label', current() === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'); }
    label();
    btn.addEventListener('click', function () {
      var next = current() === 'dark' ? 'light' : 'dark';
      root.classList.add('theme-fade');
      root.setAttribute('data-theme', next);
      setTimeout(function () { root.classList.remove('theme-fade'); }, 500);
      try { localStorage.setItem('theme', next); } catch (e) {}
      label();
    });
  });
})();
