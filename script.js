/* ═══════════════════════════════════════
   script.js — Portfolio of Pratap Jindal
   GSAP ScrollTrigger, custom cursor, countup, horizontal scroll
   ═══════════════════════════════════════ */

(function () {
  'use strict';

  // ── Bail on reduced motion ──
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ── Register GSAP plugins ──
  gsap.registerPlugin(ScrollTrigger);

  // ─────────────────────────────
  // CUSTOM CURSOR
  // ─────────────────────────────
  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');

  if (dot && ring && window.innerWidth > 768) {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + 'px';
      dot.style.top  = mouseY + 'px';
    });

    function followCursor() {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.left = ringX + 'px';
      ring.style.top  = ringY + 'px';
      requestAnimationFrame(followCursor);
    }
    followCursor();
  }

  // ─────────────────────────────
  // HERO — Text Reveal
  // ─────────────────────────────
  if (!prefersReducedMotion) {
    const heroLines = document.querySelectorAll('.hero .reveal-line');
    const heroSub   = document.querySelector('.hero .reveal-fade');

    const heroTL = gsap.timeline({ delay: 0.3 });

    heroLines.forEach((line, i) => {
      heroTL.to(line, {
        clipPath: 'inset(0 0 0% 0)',
        y: 0,
        duration: 1.1,
        ease: 'power3.out',
      }, i * 0.15);
    });

    if (heroSub) {
      heroTL.to(heroSub, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
      }, '-=0.5');
    }
  }

  // ─────────────────────────────
  // NUMBER COUNTUP
  // ─────────────────────────────
  const numberEls = document.querySelectorAll('.number-value');

  function animateCountUp(el) {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 2000;
    const start = performance.now();

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      // ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      el.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  if (numberEls.length) {
    const numbersObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCountUp(entry.target);
          numbersObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    numberEls.forEach((el) => numbersObserver.observe(el));
  }

  // ─────────────────────────────
  // HORIZONTAL SCROLL — Work Section
  // ─────────────────────────────
  const workSection = document.querySelector('.work-section');
  const workTrack   = document.querySelector('.work-track');

  if (workSection && workTrack && !prefersReducedMotion) {
    // Calculate how far to scroll
    function getScrollAmount() {
      return -(workTrack.scrollWidth - window.innerWidth);
    }

    gsap.to(workTrack, {
      x: getScrollAmount,
      ease: 'none',
      scrollTrigger: {
        trigger: workSection,
        start: 'top top',
        end: () => '+=' + (workTrack.scrollWidth - window.innerWidth),
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      }
    });
  } else if (workSection && workTrack && prefersReducedMotion) {
    // Fallback: stack vertically
    workTrack.style.flexDirection = 'column';
    workTrack.style.width = '100%';
    document.querySelectorAll('.work-panel').forEach((p) => {
      p.style.width = '100%';
      p.style.minHeight = 'auto';
      p.style.padding = '4rem 2rem';
    });
    document.querySelectorAll('.panel-divider').forEach((d) => {
      d.style.width = '100%';
      d.style.height = '1px';
      d.style.alignSelf = 'stretch';
    });
  }

  // ─────────────────────────────
  // SCROLL REVEALS — Everything else
  // ─────────────────────────────
  if (!prefersReducedMotion) {
    const revealFades = document.querySelectorAll(
      '.about .reveal-fade, .projects .reveal-fade, .writing .reveal-fade, .contact .reveal-fade'
    );

    revealFades.forEach((el) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        }
      });
    });
  }

  // ─────────────────────────────
  // MOBILE WORK SECTION FALLBACK
  // ─────────────────────────────
  function handleMobileWork() {
    if (window.innerWidth <= 768 && workTrack) {
      // Kill horizontal scroll on mobile, stack panels
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === workSection) st.kill();
      });
      workTrack.style.flexDirection = 'column';
      workTrack.style.width = '100%';
      gsap.set(workTrack, { x: 0 });
      document.querySelectorAll('.work-panel').forEach((p) => {
        p.style.width = '100%';
        p.style.minHeight = 'auto';
        p.style.padding = '4rem 2rem';
      });
      document.querySelectorAll('.panel-divider').forEach((d) => {
        d.style.width = '80%';
        d.style.height = '1px';
        d.style.alignSelf = 'center';
        d.style.margin = '0 auto';
      });
    }
  }

  handleMobileWork();
  window.addEventListener('resize', () => {
    clearTimeout(window._resizeTimer);
    window._resizeTimer = setTimeout(handleMobileWork, 250);
  });

  // ─────────────────────────────
  // SMOOTH ANCHOR SCROLL
  // ─────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();
