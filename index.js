/*
  txtpod — marketing site interactions
  Reveal-on-scroll, nav slide-in, QR flip card, sample players, footer year.
*/

(function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Footer year ---------- */

  var yearEl = document.getElementById('copyright-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Reveal on scroll ---------- */

  var revealEls = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------- Nav slide-in + mobile floater ---------- */

  var nav = document.querySelector('.top-nav:not(.legal-nav)');
  var floater = document.getElementById('hero-floater');
  var hero = document.querySelector('.hero');

  if (nav || floater) {
    var ticking = false;
    var onScroll = function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        var y = window.scrollY || window.pageYOffset;
        if (nav) nav.classList.toggle('is-visible', y > 80);
        if (floater && hero) {
          // Hide the floating button once the hero (which has its own CTA) is passed.
          var heroBottom = hero.offsetTop + hero.offsetHeight;
          floater.classList.toggle('is-hidden', y > heroBottom);
        }
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- QR flip card ---------- */

  document.querySelectorAll('.qr-flip').forEach(function (card) {
    var timer = null;
    var flip = function () {
      card.classList.add('is-flipped');
      clearTimeout(timer);
      timer = setTimeout(function () { card.classList.remove('is-flipped'); }, 3000);
    };
    card.addEventListener('click', flip);
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        flip();
      }
    });
  });

  // Keep the QR a square matching the download button's rendered width.
  var syncQrSize = function () {
    document.querySelectorAll('.hero-download-group, .download-group').forEach(function (group) {
      var btn = group.querySelector('.dl-btn');
      var qr = group.querySelector('.qr-flip');
      if (!btn || !qr) return;
      var w = btn.getBoundingClientRect().width;
      if (w > 0) {
        qr.style.setProperty('width', w + 'px', 'important');
        qr.style.setProperty('height', w + 'px', 'important');
      }
    });
  };
  syncQrSize();
  window.addEventListener('resize', syncQrSize);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(syncQrSize);

  /* ---------- Sample players ---------- */

  var formatTime = function (seconds) {
    if (!isFinite(seconds)) return '0:00';
    var m = Math.floor(seconds / 60);
    var s = Math.floor(seconds % 60);
    return m + ':' + (s < 10 ? '0' : '') + s;
  };

  var players = [];

  document.querySelectorAll('.sample-card').forEach(function (card) {
    var audio = card.querySelector('audio');
    var button = card.querySelector('.sample-play');
    var progress = card.querySelector('.sample-progress');
    var fill = card.querySelector('.sample-fill');
    var time = card.querySelector('.sample-time');
    if (!audio || !button || !progress || !fill || !time) return;

    players.push(audio);

    // The static markup carries the known duration; keep it until metadata loads.
    var duration = 0;
    var totalLabel = (time.textContent.split('/')[1] || '').trim();

    var render = function () {
      var pct = duration ? (audio.currentTime / duration) * 100 : 0;
      fill.style.width = pct + '%';
      progress.setAttribute('aria-valuenow', Math.round(pct));
      time.textContent = formatTime(audio.currentTime) + ' / ' + totalLabel;
    };

    audio.addEventListener('loadedmetadata', function () {
      duration = audio.duration;
      totalLabel = formatTime(duration);
      render();
    });

    audio.addEventListener('timeupdate', render);

    audio.addEventListener('ended', function () {
      button.classList.remove('is-playing');
      audio.currentTime = 0;
      render();
    });

    audio.addEventListener('play', function () {
      button.classList.add('is-playing');
      // Only one sample plays at a time.
      players.forEach(function (other) { if (other !== audio) other.pause(); });
    });

    audio.addEventListener('pause', function () {
      button.classList.remove('is-playing');
    });

    button.addEventListener('click', function () {
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    });

    var seekTo = function (clientX) {
      var rect = progress.getBoundingClientRect();
      var ratio = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
      if (duration) {
        audio.currentTime = ratio * duration;
        render();
      }
    };

    progress.addEventListener('click', function (e) { seekTo(e.clientX); });

    progress.addEventListener('keydown', function (e) {
      if (!duration) return;
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        audio.currentTime = Math.min(audio.currentTime + 10, duration);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        audio.currentTime = Math.max(audio.currentTime - 10, 0);
      }
    });
  });
})();
