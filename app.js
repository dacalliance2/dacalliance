(function () {
  "use strict";

  function safe(fn, name) {
    try { fn(); } catch (e) { console.warn('[' + name + ']', e); }
  }

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initNav() {
    var nav = document.getElementById('nav');
    if (!nav) return;
    function onScroll() {
      if (window.scrollY > 8) nav.classList.add('is-scrolled');
      else nav.classList.remove('is-scrolled');
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function initMobileMenu() {
    var nav = document.getElementById('nav');
    var toggle = document.getElementById('navToggle');
    var links = document.getElementById('navLinks');
    if (!nav || !toggle || !links) return;

    function closeMenu() {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menú');
      document.body.classList.remove('no-scroll');
    }
    function openMenu() {
      nav.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Cerrar menú');
      document.body.classList.add('no-scroll');
    }

    toggle.addEventListener('click', function () {
      if (nav.classList.contains('is-open')) closeMenu();
      else openMenu();
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 1080) closeMenu();
    });
  }

  function initLoadReveal() {
    var revealEls = document.querySelectorAll('[data-reveal]');
    if (!reduce) {
      revealEls.forEach(function (el, i) {
        el.style.transitionDelay = (i * 100) + 'ms';
      });
    }
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        document.body.classList.add('is-loaded');
      });
    });
  }

  function initScrollReveal() {
    var upEls = document.querySelectorAll('.reveal-up');
    if (!upEls.length) return;
    if (reduce || !('IntersectionObserver' in window)) {
      upEls.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: .05, rootMargin: '0px 0px -2% 0px' });
    upEls.forEach(function (el) { io.observe(el); });

    /* safety net: force-reveal anything still hidden above the fold after 6s */
    setTimeout(function () {
      document.querySelectorAll('.reveal-up:not(.is-visible)').forEach(function (el) {
        if (el.getBoundingClientRect().top < window.innerHeight) {
          el.classList.add('is-visible');
        }
      });
    }, 6000);
  }

  function initScrollProgress() {
    var bar = document.querySelector('[data-scroll-progress]');
    if (!bar) return;
    var raf = null;
    function update() {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var pct = max > 0 ? window.scrollY / max : 0;
      bar.style.transform = 'scaleX(' + pct + ')';
      raf = null;
    }
    window.addEventListener('scroll', function () {
      if (!raf) raf = requestAnimationFrame(update);
    }, { passive: true });
    update();
  }

  function initMagnetic() {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    document.querySelectorAll('[data-magnetic]').forEach(function (el) {
      var strength = parseFloat(el.dataset.magneticStrength || '0.25');
      var inner = document.createElement('span');
      inner.className = 'magnetic-inner';
      while (el.firstChild) inner.appendChild(el.firstChild);
      el.appendChild(inner);
      el.classList.add('has-magnetic');
      var tx = 0, ty = 0, cx = 0, cy = 0, raf = null;
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        tx = ((e.clientX - r.left) - r.width / 2) * strength;
        ty = ((e.clientY - r.top) - r.height / 2) * strength;
        if (!raf) raf = requestAnimationFrame(loop);
      });
      el.addEventListener('mouseleave', function () {
        tx = 0; ty = 0;
        if (!raf) raf = requestAnimationFrame(loop);
      });
      function loop() {
        cx += (tx - cx) * 0.2;
        cy += (ty - cy) * 0.2;
        inner.style.transform = 'translate3d(' + cx.toFixed(2) + 'px, ' + cy.toFixed(2) + 'px, 0)';
        raf = (Math.abs(tx - cx) > 0.1 || Math.abs(ty - cy) > 0.1) ? requestAnimationFrame(loop) : null;
      }
    });
  }

  function initTilt() {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    var targets = document.querySelectorAll('.stage-circle, .hotspot, .benefit-icon-circle, .pillar-icon');
    targets.forEach(function (card) {
      var MAX = 6;
      var tx = 0, ty = 0, cx = 0, cy = 0, raf = null;
      card.classList.add('has-tilt');
      card.addEventListener('mousemove', function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        tx = -py * MAX; ty = px * MAX;
        if (!raf) raf = requestAnimationFrame(loop);
      });
      card.addEventListener('mouseleave', function () {
        tx = 0; ty = 0;
        if (!raf) raf = requestAnimationFrame(loop);
      });
      function loop() {
        cx += (tx - cx) * 0.18;
        cy += (ty - cy) * 0.18;
        card.style.setProperty('--rx', cx.toFixed(2) + 'deg');
        card.style.setProperty('--ry', cy.toFixed(2) + 'deg');
        raf = (Math.abs(tx - cx) > 0.05 || Math.abs(ty - cy) > 0.05) ? requestAnimationFrame(loop) : null;
      }
    });
  }

  function initHeroVideoLoop() {
    var video = document.getElementById('heroVideo');
    if (!video) return;

    video.addEventListener('ended', function () {
      setTimeout(function () {
        video.currentTime = 0;
        video.play();
      }, 4000);
    });

    function startWithHold() {
      video.pause();
      video.currentTime = 0;
      setTimeout(function () {
        video.play();
      }, 2000);
    }

    if (video.readyState >= 1) {
      startWithHold();
    } else {
      video.addEventListener('loadedmetadata', startWithHold, { once: true });
    }
  }

  function initHeroCursorGlow() {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    var frame = document.getElementById('heroVisualFrame');
    if (!frame) return;
    frame.addEventListener('mousemove', function (e) {
      var r = frame.getBoundingClientRect();
      var mx = ((e.clientX - r.left) / r.width) * 100;
      var my = ((e.clientY - r.top) / r.height) * 100;
      frame.style.setProperty('--mx', mx + '%');
      frame.style.setProperty('--my', my + '%');
    });
  }

  /* ══════════════ HILOS DEL PUENTE (metodología) ══════════════ */
  function initBridgeWires() {
    var row = document.querySelector('.bridge-row');
    var svg = document.querySelector('.bridge-wires');
    var wireLines = document.querySelector('.wire-lines');
    var methDesktop = document.querySelector('.meth-desktop');
    var methSection = document.getElementById('metodologia');
    var anchorLeft = document.querySelector('.bridge-anchor--left');
    var anchorRight = document.querySelector('.bridge-anchor--right');
    var bridgeImg = document.querySelector('.bridge-img');
    var leftDots = row.querySelectorAll('.eco-left .eco-dot');
    var rightDots = row.querySelectorAll('.eco-right .eco-dot');
    var gradient = document.getElementById('bridgeFlowGradient');
    if (!row || !svg || !wireLines || !methDesktop || !anchorLeft || !anchorRight || !leftDots.length || !rightDots.length) return;

    var revealed = false;
    var allPaths = [];
    var flowPaths = [];

    /* colores resueltos una vez: los stops del gradiente no admiten var() como atributo XML */
    if (gradient) {
      var cs = getComputedStyle(document.documentElement);
      var steelColor = cs.getPropertyValue('--steel').trim();
      var goldColor = cs.getPropertyValue('--gold').trim();
      var stops = gradient.querySelectorAll('stop');
      if (stops[0]) stops[0].setAttribute('stop-color', steelColor || '#3F5A76');
      if (stops[1]) stops[1].setAttribute('stop-color', goldColor || '#B8862E');
    }

    function isActive() {
      return getComputedStyle(methDesktop).display !== 'none';
    }

    function point(el, rowRect) {
      var r = el.getBoundingClientRect();
      return { x: r.left + r.width / 2 - rowRect.left, y: r.top + r.height / 2 - rowRect.top };
    }

    function pathFor(x1, y1, x2, y2) {
      var midX = (x1 + x2) / 2;
      return 'M' + x1 + ',' + y1 + ' C' + midX + ',' + y1 + ' ' + midX + ',' + y2 + ' ' + x2 + ',' + y2;
    }

    function addPath(cls, x1, y1, x2, y2, frag, delay) {
      var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('class', cls);
      path.setAttribute('d', pathFor(x1, y1, x2, y2));
      frag.appendChild(path);
      allPaths.push({ path: path, delay: delay });
      return path;
    }

    /* cometa de luz: mismo trazado que el hilo base, con dash corto + gradiente steel→gold.
       El dasharray depende de getTotalLength(), que solo es válido una vez el path está
       insertado en el documento real: se calcula después de wireLines.appendChild(frag). */
    function addFlowPath(x1, y1, x2, y2, frag, i) {
      var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('class', 'wire-flow');
      path.setAttribute('d', pathFor(x1, y1, x2, y2));
      path.setAttribute('stroke', 'url(#bridgeFlowGradient)');
      path.setAttribute('filter', 'url(#bridgeFlowGlow)');
      frag.appendChild(path);
      flowPaths.push({ path: path, i: i });
    }

    function render() {
      if (!isActive()) { wireLines.textContent = ''; allPaths = []; flowPaths = []; return; }

      var rowRect = row.getBoundingClientRect();
      svg.setAttribute('width', rowRect.width);
      svg.setAttribute('height', rowRect.height);
      if (gradient) {
        gradient.setAttribute('x2', rowRect.width);
      }
      wireLines.textContent = '';
      allPaths = [];
      flowPaths = [];

      var frag = document.createDocumentFragment();
      var aLeft = point(anchorLeft, rowRect);
      var aRight = point(anchorRight, rowRect);

      leftDots.forEach(function (dot, i) {
        var p = point(dot, rowRect);
        addPath('wire-left', p.x, p.y, aLeft.x, aLeft.y, frag, i * 55);
        if (!reduce) addFlowPath(p.x, p.y, aLeft.x, aLeft.y, frag, i);
      });
      rightDots.forEach(function (dot, i) {
        var p = point(dot, rowRect);
        addPath('wire-right', aRight.x, aRight.y, p.x, p.y, frag, i * 55);
        if (!reduce) addFlowPath(aRight.x, aRight.y, p.x, p.y, frag, i);
      });

      wireLines.appendChild(frag);

      allPaths.forEach(function (item) {
        if (reduce) return;
        var len = item.path.getTotalLength();
        if (revealed) {
          item.path.style.strokeDasharray = 'none';
        } else {
          item.path.style.strokeDasharray = len;
          item.path.style.strokeDashoffset = len;
        }
      });

      flowPaths.forEach(function (item) {
        var len = item.path.getTotalLength();
        var comet = Math.min(18, len * 0.22);
        item.path.style.strokeDasharray = comet + 'px ' + Math.max(len - comet, 1) + 'px';
        item.path.style.setProperty('--flow-shift', (-len) + 'px');
        var duration = 2.3 + (item.i % 6) * 0.24;
        item.path.style.animationDuration = duration.toFixed(2) + 's';
        item.path.style.animationDelay = (-((item.i * 0.41) % duration)).toFixed(2) + 's';
      });
    }

    function reveal() {
      if (revealed) return;
      revealed = true;
      row.classList.add('bridge-wires-visible');
      if (reduce) return;
      allPaths.forEach(function (item) {
        item.path.style.transition = 'stroke-dashoffset 1.3s var(--ease) ' + item.delay + 'ms';
        item.path.style.strokeDashoffset = '0';
      });
    }

    render();

    if (reduce || !('IntersectionObserver' in window)) {
      reveal();
      if (!reduce) svg.classList.add('flow-active');
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) { reveal(); io.disconnect(); }
        });
      }, { threshold: .1, rootMargin: '0px 0px -2% 0px' });
      io.observe(row);

      /* el flujo de luz corre solo mientras la sección está en pantalla (ahorra ciclos) */
      if (!reduce && methSection) {
        var flowIO = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            svg.classList.toggle('flow-active', entry.isIntersecting);
          });
        }, { threshold: 0 });
        flowIO.observe(methSection);
      }
    }

    if (bridgeImg && !bridgeImg.complete) {
      bridgeImg.addEventListener('load', render, { once: true });
    }
    window.addEventListener('load', render);

    var resizeTimer = null;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(render, 150);
    });
  }

  function initSmoothAnchors() {
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[href^="#"]');
      if (!a) return;
      var id = a.getAttribute('href');
      if (!id || id === '#') return;
      var el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - 80,
        behavior: reduce ? 'auto' : 'smooth'
      });
    });
  }

  safe(initNav, 'initNav');
  safe(initMobileMenu, 'initMobileMenu');
  safe(initLoadReveal, 'initLoadReveal');
  safe(initScrollReveal, 'initScrollReveal');
  safe(initScrollProgress, 'initScrollProgress');
  safe(initMagnetic, 'initMagnetic');
  safe(initTilt, 'initTilt');
  safe(initHeroCursorGlow, 'initHeroCursorGlow');
  safe(initHeroVideoLoop, 'initHeroVideoLoop');
  safe(initBridgeWires, 'initBridgeWires');
  safe(initSmoothAnchors, 'initSmoothAnchors');
})();
