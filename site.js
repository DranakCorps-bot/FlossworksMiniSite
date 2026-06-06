// Lightweight, dependency-free carousel(s). Progressive enhancement:
// without JS the first slide shows and arrows are inert.
(function () {
  document.querySelectorAll('[data-carousel]').forEach(function (c) {
    var track = c.querySelector('.carousel-track');
    var slides = Array.prototype.slice.call(c.querySelectorAll('.slide'));
    var dotsWrap = c.querySelector('.carousel-dots');
    var prev = c.querySelector('.prev');
    var next = c.querySelector('.next');
    if (!track || slides.length === 0) return;
    var i = 0;

    slides.forEach(function (_, n) {
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', 'Go to screenshot ' + (n + 1));
      b.addEventListener('click', function () { go(n); });
      dotsWrap.appendChild(b);
    });
    var dots = Array.prototype.slice.call(dotsWrap.children);

    function go(n) {
      i = (n + slides.length) % slides.length;
      track.style.transform = 'translateX(' + (-i * 100) + '%)';
      dots.forEach(function (d, k) { d.setAttribute('aria-current', k === i ? 'true' : 'false'); });
    }

    if (next) next.addEventListener('click', function () { go(i + 1); });
    if (prev) prev.addEventListener('click', function () { go(i - 1); });

    c.tabIndex = 0;
    c.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { go(i + 1); }
      else if (e.key === 'ArrowLeft') { go(i - 1); }
    });

    // Touch swipe
    var x0 = null;
    c.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    c.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 40) { go(dx < 0 ? i + 1 : i - 1); }
      x0 = null;
    });

    go(0);
  });
})();
