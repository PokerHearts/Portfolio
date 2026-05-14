// ===== SCROLL REVEAL =====
const revealElements = () => {
  const elements = document.querySelectorAll(
    '.hero-badge, .hero-title, .hero-sub, .hero-metrics, ' +
    '.section-label, .section-heading, .two-col, ' +
    '.exp-card, .project-feature, .pg-card, ' +
    '.skill-block, .edu-card, .cta-heading, .cta-sub, .cta-btns, .social-links'
  );
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger the animation
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 60);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });
};

// ===== NAV SCROLL EFFECT =====
const nav = document.getElementById('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  
  if (currentScroll > 100) {
    nav.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)';
  } else {
    nav.style.boxShadow = 'none';
  }
  
  lastScroll = currentScroll;
});

// ===== MOBILE MENU =====
const mobileToggle = document.getElementById('mobileToggle');
if (mobileToggle) {
  mobileToggle.addEventListener('click', () => {
    const navRight = document.querySelector('.nav-right');
    navRight.style.display = navRight.style.display === 'flex' ? 'none' : 'flex';
    navRight.style.position = 'absolute';
    navRight.style.top = '64px';
    navRight.style.right = '24px';
    navRight.style.flexDirection = 'column';
    navRight.style.background = 'rgba(250,251,252,0.95)';
    navRight.style.backdropFilter = 'blur(16px)';
    navRight.style.padding = '16px 24px';
    navRight.style.borderRadius = '12px';
    navRight.style.border = '1px solid #e2e8f0';
    navRight.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.06)';
  });
}

// ===== METRIC COUNTER ANIMATION =====
const animateCounters = () => {
  const counters = document.querySelectorAll('.metric-num');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const text = target.textContent;
        const isPercentage = text.includes('%');
        const num = parseInt(text);
        
        if (!isNaN(num)) {
          let current = 0;
          const step = Math.ceil(num / 40);
          const interval = setInterval(() => {
            current += step;
            if (current >= num) {
              current = num;
              clearInterval(interval);
            }
            target.textContent = current + (isPercentage ? '%' : '');
          }, 30);
        }
        observer.unobserve(target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
};

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  revealElements();
  animateCounters();
});
