// Light/dark theme: follows the system unless the visitor picks one with the toggle.
// The choice is shared by every page: saved in localStorage, with window.name as a per-tab
// fallback where storage is blocked, re-applied when a page returns from the back/forward
// cache, and synced live to other open tabs.
(function () {
  var root = document.documentElement;
  var NAME_KEY = /(?:^|;)dk-theme=(light|dark)/;

  function readSaved() {
    var t = null;
    try { t = localStorage.getItem('theme'); } catch (e) {}
    if (t !== 'light' && t !== 'dark') { var m = NAME_KEY.exec(window.name || ''); t = m ? m[1] : null; }
    return t;
  }
  function writeSaved(t) {
    try { localStorage.setItem('theme', t); } catch (e) {}
    try { window.name = (window.name || '').replace(NAME_KEY, '') + ';dk-theme=' + t; } catch (e) {}
  }
  function apply(t) {
    if (t === 'light' || t === 'dark') root.setAttribute('data-theme', t);
    else root.removeAttribute('data-theme');
    label();
  }
  function label() {
    var btn = document.querySelector('[data-theme-toggle]');
    if (btn) btn.setAttribute('aria-label', current() === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  }

  apply(readSaved());

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

  function fadeTo(t) {
    root.classList.add('theme-fade');
    apply(t);
    setTimeout(function () { root.classList.remove('theme-fade'); }, 500);
  }

  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.querySelector('[data-theme-toggle]');
    if (!btn) return;
    label();
    btn.addEventListener('click', function () {
      var next = current() === 'dark' ? 'light' : 'dark';
      writeSaved(next);
      fadeTo(next);
    });
  });

  // Back/forward: the browser restores the page without re-running this script.
  window.addEventListener('pageshow', function (e) { if (e.persisted) apply(readSaved()); });

  // Another tab changed the theme.
  window.addEventListener('storage', function (e) { if (e.key === 'theme') fadeTo(e.newValue); });
})();
