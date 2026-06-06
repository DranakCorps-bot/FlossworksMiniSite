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
