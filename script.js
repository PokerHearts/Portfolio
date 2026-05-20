// ===== NAVIGATION =====
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(element => {
  revealObserver.observe(element);
});

// ===== THEME TOGGLE =====
const themes = ['classic', 'dark', 'velvet'];
const themeConfig = {
  classic: { icon: '☀️', label: 'Classic' },
  dark:    { icon: '🌙', label: 'Dark' },
  velvet:  { icon: '❤️', label: 'Velvet' }
};

const themeToggle = document.getElementById('themeToggle');
const toggleIcon = themeToggle.querySelector('.toggle-icon');
const toggleLabel = themeToggle.querySelector('.toggle-label');
let currentThemeIndex = 0;

// Restore saved theme
const savedTheme = localStorage.getItem('pj-theme');
if (savedTheme && themes.includes(savedTheme)) {
  currentThemeIndex = themes.indexOf(savedTheme);
  applyTheme(savedTheme);
}

themeToggle.addEventListener('click', () => {
  currentThemeIndex = (currentThemeIndex + 1) % themes.length;
  const newTheme = themes[currentThemeIndex];
  applyTheme(newTheme);
  localStorage.setItem('pj-theme', newTheme);
});

function applyTheme(theme) {
  if (theme === 'classic') {
    document.body.removeAttribute('data-theme');
  } else {
    document.body.setAttribute('data-theme', theme);
  }

  const config = themeConfig[theme];
  toggleIcon.textContent = config.icon;
  toggleLabel.textContent = config.label;

  // Manage particles — only in velvet mode
  if (theme === 'velvet') {
    startParticles();
  } else {
    stopParticles();
  }
}

// ===== FLOATING PARTICLE SYSTEM (VELVET MODE) =====
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
let animationId = null;
let isRunning = false;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2.5 + 0.8;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.speedY = (Math.random() - 0.5) * 0.4;
    this.opacity = Math.random() * 0.35 + 0.08;
    this.fadeDir = Math.random() > 0.5 ? 1 : -1;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Gentle breathing pulse
    this.opacity += this.fadeDir * 0.002;
    if (this.opacity >= 0.45) this.fadeDir = -1;
    if (this.opacity <= 0.05) this.fadeDir = 1;

    // Wrap edges
    if (this.x < -10) this.x = canvas.width + 10;
    if (this.x > canvas.width + 10) this.x = -10;
    if (this.y < -10) this.y = canvas.height + 10;
    if (this.y > canvas.height + 10) this.y = -10;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(192, 57, 43, ${this.opacity})`;
    ctx.fill();
  }
}

function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 130) {
        const alpha = (1 - dist / 130) * 0.07;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(192, 57, 43, ${alpha})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  if (!isRunning) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  drawConnections();
  animationId = requestAnimationFrame(animateParticles);
}

function startParticles() {
  if (isRunning) return;
  resizeCanvas();
  isRunning = true;
  particles = [];
  const count = Math.min(Math.floor((canvas.width * canvas.height) / 14000), 70);
  for (let i = 0; i < count; i++) particles.push(new Particle());
  animateParticles();
}

function stopParticles() {
  isRunning = false;
  if (animationId) { cancelAnimationFrame(animationId); animationId = null; }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles = [];
}

window.addEventListener('resize', () => {
  resizeCanvas();
  if (isRunning) {
    particles.forEach(p => {
      if (p.x > canvas.width) p.x = Math.random() * canvas.width;
      if (p.y > canvas.height) p.y = Math.random() * canvas.height;
    });
  }
});

resizeCanvas();
