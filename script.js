// ===== NAVIGATION =====
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
});

// ===== THEME TOGGLE =====
const themes = ['classic', 'dark', 'velvet'];
const themeConfig = {
  classic: { icon: '☀️', label: 'Classic' },
  dark:    { icon: '🌙', label: 'Dark' },
  velvet:  { icon: '❤️', label: 'Velvet' }
};

const themeToggle = document.getElementById('themeToggle');
let currentThemeIndex = 0;

themeToggle.addEventListener('click', () => {
  currentThemeIndex = (currentThemeIndex + 1) % themes.length;
  const newTheme = themes[currentThemeIndex];
  applyTheme(newTheme);
});

function applyTheme(theme) {
  if (theme === 'classic') document.body.removeAttribute('data-theme');
  else document.body.setAttribute('data-theme', theme);

  themeToggle.innerHTML = `<span>${themeConfig[theme].icon}</span> <span>${themeConfig[theme].label}</span>`;
  if (theme === 'velvet') startParticles();
  else stopParticles();
}

// ===== VELVET PARTICLES =====
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
let isRunning = false;
let animationId = null;

function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
  }
  update() {
    this.x += this.vx; this.y += this.vy;
    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
  }
  draw() {
    ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(192, 57, 43, 0.2)'; ctx.fill();
  }
}

function animate() {
  if (!isRunning) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  animationId = requestAnimationFrame(animate);
}

function startParticles() {
  if (isRunning) return;
  isRunning = true; resize();
  particles = Array.from({ length: 60 }, () => new Particle());
  animate();
}

function stopParticles() { isRunning = false; cancelAnimationFrame(animationId); }
window.addEventListener('resize', resize);
