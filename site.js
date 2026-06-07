// Lightweight, dependency-free gallery lightbox.
// Progressive enhancement: without JS, thumbnails simply do nothing harmful.
(function () {
  var thumbs = Array.prototype.slice.call(document.querySelectorAll('.gthumb'));
  var lb = document.getElementById('lightbox');
  if (!thumbs.length || !lb) return;

  var img = lb.querySelector('.lb-img');
  var cap = lb.querySelector('.lb-cap');
  var idx = 0;

  function show(n) {
    idx = (n + thumbs.length) % thumbs.length;
    var t = thumbs[idx];
    img.src = t.getAttribute('data-full');
    img.alt = (t.querySelector('img') || {}).alt || '';
    cap.textContent = t.getAttribute('data-cap') || '';
  }
  function open(n) {
    show(n);
    lb.hidden = false;
    document.body.style.overflow = 'hidden';
  }
  function close() {
    lb.hidden = true;
    document.body.style.overflow = '';
  }

  thumbs.forEach(function (t, n) {
    t.addEventListener('click', function () { open(n); });
  });
  lb.querySelector('.lb-close').addEventListener('click', close);
  lb.querySelector('.lb-next').addEventListener('click', function () { show(idx + 1); });
  lb.querySelector('.lb-prev').addEventListener('click', function () { show(idx - 1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
  document.addEventListener('keydown', function (e) {
    if (lb.hidden) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowRight') show(idx + 1);
    else if (e.key === 'ArrowLeft') show(idx - 1);
  });
})();

// Featured auto-rotating strip — pauses on hover/focus/hidden-tab, respects reduced motion.
(function () {
  var f = document.querySelector('[data-featured]');
  if (!f) return;
  var track = f.querySelector('.featured-track');
  var slides = Array.prototype.slice.call(f.querySelectorAll('.fslide'));
  var dotsWrap = f.querySelector('.featured-dots');
  if (!track || slides.length < 2) return;
  var i = 0, timer = null;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  slides.forEach(function (_, n) {
    var b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('aria-label', 'Featured image ' + (n + 1));
    b.addEventListener('click', function () { go(n); restart(); });
    dotsWrap.appendChild(b);
  });
  var dots = Array.prototype.slice.call(dotsWrap.children);

  function go(n) {
    i = (n + slides.length) % slides.length;
    track.style.transform = 'translateX(' + (-i * 100) + '%)';
    dots.forEach(function (d, k) { d.setAttribute('aria-current', k === i ? 'true' : 'false'); });
  }
  function start() { if (reduce) return; stop(); timer = setInterval(function () { go(i + 1); }, 4000); }
  function stop() { if (timer) { clearInterval(timer); timer = null; } }
  function restart() { stop(); start(); }

  f.querySelector('.next').addEventListener('click', function () { go(i + 1); restart(); });
  f.querySelector('.prev').addEventListener('click', function () { go(i - 1); restart(); });
  f.addEventListener('mouseenter', stop);
  f.addEventListener('mouseleave', start);
  f.addEventListener('focusin', stop);
  f.addEventListener('focusout', start);
  document.addEventListener('visibilitychange', function () { if (document.hidden) stop(); else start(); });

  go(0);
  start();
})();
