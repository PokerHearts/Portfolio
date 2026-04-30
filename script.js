// ===== NAVIGATION =====
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObserver.unobserve(e.target); } });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { threshold: 0.3 });
sections.forEach(s => sectionObserver.observe(s));

// ===== ANIMATED STATS COUNTER =====
function animateCounters() {
  document.querySelectorAll('.stat-value[data-target]').forEach(el => {
    const target = parseInt(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const duration = 1500;
    const start = performance.now();
    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(target * eased) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  });
}
const statsBar = document.querySelector('.stats-bar');
if (statsBar) {
  const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) { animateCounters(); statsObserver.unobserve(statsBar); }
  }, { threshold: 0.5 });
  statsObserver.observe(statsBar);
}

// ===== STORY MODAL =====
const fragments = [
  { title: 'From "Sessions" — Chapter 1', excerpt: 'She wasn\'t a person anymore. She was a pattern — a loop of warmth stitched into every corner of his memory. Every coffee shop smelled like her hair. Every song played the chorus she hummed. He wasn\'t remembering her. He was constructing her, brick by careful brick, from the rubble of what actually happened.', note: 'Sessions explores memory distortion through therapy — 10 backstory chapters, 10 sessions.' },
  { title: 'From "Light Enough"', excerpt: 'There\'s a kind of silence that lives between two people who have said everything and nothing at the same time. It\'s not the silence of peace. It\'s the silence of a door left open — where neither person walks through, and neither person closes it.', note: 'Light Enough — a work of introspective fiction, available on Amazon.' },
  { title: 'From "Sessions" — Session 3', excerpt: '"Do you think about what she actually said, or what you wish she said?" The therapist leaned forward. He stared at the ceiling. "Is there a difference?" "That," she said, clicking her pen, "is exactly the problem."', note: 'Each session in Sessions is tied to a psychological concept — nostalgic rumination, avoidance, confabulation.' },
  { title: 'From the Blog', excerpt: 'I write because it\'s the only place where I can be honest without being asked to explain myself. The page doesn\'t interrupt. It doesn\'t say "but why?" It just holds whatever I give it and lets me walk away lighter.', note: '197+ stories on pokerdeeds.blogspot.com — 3,000 monthly visits.' }
];
let currentFragment = 0;

function openModal() {
  const overlay = document.getElementById('storyModal');
  const f = fragments[currentFragment];
  overlay.querySelector('.modal-tag').textContent = 'Fragment ' + (currentFragment + 1) + ' of ' + fragments.length;
  overlay.querySelector('h3').textContent = f.title;
  overlay.querySelector('blockquote').textContent = f.excerpt;
  overlay.querySelector('.excerpt-note').textContent = f.note;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  currentFragment = (currentFragment + 1) % fragments.length;
}
function closeModal() {
  document.getElementById('storyModal').classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) closeModal();
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

// ===== PROJECT EXPAND =====
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.project-expand-btn');
  if (btn) {
    const card = btn.closest('.project-card');
    card.classList.toggle('expanded');
    const span = btn.querySelector('.btn-text');
    if (span) span.textContent = card.classList.contains('expanded') ? 'Close' : 'Case Study';
  }
});

// ===== CHATBOT =====
const botKB = {
  'team': 'Pratap currently manages a 108-member team at Group Biopolis. At BFIL, he directed a 72-member division across 10 regions. His leadership approach combines structured accountability with motivational psychology — notably using Maslow\'s framework to diagnose team bottlenecks.',
  'bottleneck': 'At BFIL, Pratap diagnosed low field throughput by applying Maslow\'s hierarchy. He found the team was stuck at safety/belonging needs. He restructured the engagement model, replacing punitive incentives with a Challenge-and-Reward system, achieving 40% of the monthly target in a single weekend.',
  'dashboard': 'Pratap has built 18+ live analytics modules at Biopolis including Executive Briefing, Sales Tracking, Party Health, MR Performance, FMS Pipeline, Outstanding Ageing, Stock Info, SCOT Analysis, and more. He also built 13 Looker Studio dashboards from scratch.',
  'ai': 'Pratap built an AI-powered call analysis system that processes 1,200 calls/day (800 minutes of audio). It generates structured feedback on tone, intent, gaps, and action points for a 12-member telecalling team. He uses ChatGPT, Claude, Gemini, Grok, DeepSeek, and NotebookLM.',
  'writing': 'Pratap writes under the pen name "Poker Hearts." He has 2 published books (Light Enough, Hi Heart I Read), a blog with 197+ posts and 3,000 monthly visits, and is developing "Sessions" — a psychological thriller about memory distortion and therapy.',
  'sessions': '"Sessions" is a psychological thriller about a man in therapy for an obsessive fixation on a girl named Radha — who turns out to be a construct of distorted autobiographical memory. It has 10 backstory chapters and 10 therapy sessions, each tied to concepts like nostalgic rumination and memory loops.',
  'education': 'MBA in Financial Markets from Mittal School of Business & NSE Academy (8.83 CGPA), BBA (Hons) from LPU (8.36 CGPA), UGC NET Qualified in Management (June 2024), and 9+ NCFM certifications including Financial Modelling, Technical Analysis, and Equity Derivatives.',
  'kintsugi': 'The Kintsugi Principle is Pratap\'s LinkedIn article applying the Japanese art of repairing broken pottery with gold to organizational resilience. The idea: imperfections and failures, when embraced transparently, create stronger systems than those that pretend to be perfect.',
  'automation': 'Pratap has deployed Google Apps Script automation for data refresh, Gmail-to-Sheets ingestion, and workflow logging — cutting manual reporting effort by 80%. He also built a custom Chrome extension to force Looker Studio data refreshes.',
  'inventory': 'Pratap led inventory rationalisation across 500+ SKUs at Biopolis, reducing shortage complaints from 17 to 2 and driving a 20% sales increase on rationalised lines.',
  'contact': 'You can reach Pratap via LinkedIn (linkedin.com/in/pratap-jindal), Instagram (@poker_hearts), phone (+91 70090 19719), or email (pratapjindal812@gmail.com).',
  'hello': 'Hello! I\'m Pratap\'s portfolio assistant. Ask me about his management approach, analytics work, writing, or anything else you see on this site.',
  'hi': 'Hey there! I know quite a bit about Pratap\'s work and writing. What would you like to know?',
  'who': 'Pratap Jindal is a Management Analyst at Group Biopolis, a published author (pen name: Poker Hearts), and a NET-qualified MBA. He builds data systems, leads teams, and writes psychological fiction.'
};

function getBotReply(input) {
  const q = input.toLowerCase().replace(/[?!.,]/g, '');
  for (const [key, answer] of Object.entries(botKB)) {
    if (q.includes(key)) return answer;
  }
  if (q.includes('skill') || q.includes('tool')) return botKB['dashboard'] + ' His tech stack includes Google Apps Script, Looker Studio, Python, Tableau, and various AI tools.';
  if (q.includes('book') || q.includes('publish')) return botKB['writing'];
  if (q.includes('experience') || q.includes('work') || q.includes('job')) return 'Pratap has held 3 key roles: Management Analyst at Biopolis (Sep 2023–Present), Divisional Manager at BFIL (Sep 2022–Feb 2023), and Customer Delight Intern at Zolostays (Feb–May 2021).';
  if (q.includes('project')) return 'Pratap has built 12+ operational projects including an Android Call Recording Sync App, End-to-End Sales Lifecycle Tracker, SCOT Purchase Pattern Dashboard, and an AI-powered Call Analysis System.';
  if (q.includes('cert') || q.includes('ncfm')) return botKB['education'];
  return 'That\'s a great question! I\'d recommend connecting with Pratap directly — reach out via LinkedIn or email (pratapjindal812@gmail.com) for a deeper conversation.';
}

const chatFab = document.getElementById('chatFab');
const chatPanel = document.getElementById('chatPanel');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');

if (chatFab && chatPanel) {
  chatFab.addEventListener('click', () => {
    chatPanel.classList.toggle('open');
    if (chatPanel.classList.contains('open')) chatInput.focus();
  });
  document.getElementById('chatClose').addEventListener('click', () => chatPanel.classList.remove('open'));
}

function addChatMsg(text, type) {
  const div = document.createElement('div');
  div.className = 'chat-msg ' + type;
  div.textContent = text;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTypingThenReply(text) {
  const typing = document.createElement('div');
  typing.className = 'chat-msg bot';
  typing.innerHTML = '<span class="typing-dots"><span></span><span></span><span></span></span>';
  chatMessages.appendChild(typing);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  setTimeout(() => { typing.remove(); addChatMsg(text, 'bot'); }, 600 + Math.random() * 400);
}

function sendChat(text) {
  if (!text.trim()) return;
  addChatMsg(text, 'user');
  chatInput.value = '';
  const reply = getBotReply(text);
  showTypingThenReply(reply);
  // Hide suggestions after first interaction
  const sug = document.querySelector('.chatbot-suggestions');
  if (sug) sug.style.display = 'none';
}

if (chatInput) {
  chatInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') sendChat(chatInput.value); });
  document.getElementById('chatSend').addEventListener('click', () => sendChat(chatInput.value));
}
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('chat-suggestion')) sendChat(e.target.textContent);
});

// ===== CREDENTIALS MAP =====
function initCredsMap() {
  const canvas = document.querySelector('.creds-map-canvas');
  if (!canvas) return;
  const nodes = [
    { label: 'Pratap Jindal', x: 50, y: 50, core: true },
    { label: 'Finance', x: 20, y: 20 }, { label: 'Analytics', x: 80, y: 20 },
    { label: 'Management', x: 20, y: 80 }, { label: 'Technology', x: 80, y: 80 },
    { label: 'NCFM (9+)', x: 8, y: 38 }, { label: 'MBA', x: 35, y: 15 },
    { label: 'NET Qualified', x: 38, y: 82 }, { label: 'Apps Script', x: 68, y: 78 },
    { label: 'Looker Studio', x: 88, y: 45 }, { label: 'Tableau', x: 75, y: 10 },
    { label: 'AI Tools', x: 90, y: 70 }, { label: 'Writer', x: 12, y: 60 },
  ];
  const svg = canvas.querySelector('.creds-lines');
  if (svg) {
    const coreNode = nodes[0];
    nodes.slice(1).forEach(n => {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', coreNode.x + '%'); line.setAttribute('y1', coreNode.y + '%');
      line.setAttribute('x2', n.x + '%'); line.setAttribute('y2', n.y + '%');
      svg.appendChild(line);
    });
  }
  nodes.forEach(n => {
    const div = document.createElement('div');
    div.className = 'creds-node' + (n.core ? ' core' : '');
    div.textContent = n.label;
    div.style.left = n.x + '%'; div.style.top = n.y + '%';
    div.style.transform = 'translate(-50%, -50%)';
    canvas.appendChild(div);
  });
}
initCredsMap();
