// ===== NAVIGATION & SCROLL =====
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

// ===== THEME TOGGLE LOGIC =====
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

themeToggle.addEventListener('click', () => {
  currentThemeIndex = (currentThemeIndex + 1) % themes.length;
  const newTheme = themes[currentThemeIndex];
  applyTheme(newTheme);
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

  if (theme === 'velvet') { startParticles(); } 
  else { stopParticles(); }
}

// ===== PARTICLE SYSTEM (VELVET ONLY) =====
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
let isRunning = false;
let animationId = null;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.speedY = (Math.random() - 0.5) * 0.4;
    this.opacity = Math.random() * 0.5 + 0.1;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(192, 57, 43, ${this.opacity})`;
    ctx.fill();
  }
}

function animateParticles() {
  if (!isRunning) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  animationId = requestAnimationFrame(animateParticles);
}

function startParticles() {
  if (isRunning) return;
  isRunning = true;
  resizeCanvas();
  particles = Array.from({ length: 50 }, () => new Particle());
  animateParticles();
}

function stopParticles() {
  isRunning = false;
  cancelAnimationFrame(animationId);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

window.addEventListener('resize', resizeCanvas);
