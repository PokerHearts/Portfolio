/* ═══════════════════════════════════════════════════════════════
   HELIX PORTFOLIO — PRATAP JINDAL (2026 AWWWARDS STANDARD)
   Interactive Ambient Mesh, Custom Cursor, Systems Matrix & PRD Engine
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  // Global State
  const modulesData = (typeof projectData !== 'undefined') ? projectData : [];
  const resumes = (typeof resumeData !== 'undefined') ? resumeData : {};
  const master = (typeof masterProfile !== 'undefined') ? masterProfile : (resumes.master || {});

  let currentCategory = 'all';
  let currentLens = 'strategy';
  let currentView = 'grid'; // 'grid' | 'graph' | 'table'
  let searchQuery = '';
  let activeModuleForDrawer = null;

  // DOM Elements
  const container = document.getElementById('modulesContainer') || document.getElementById('projectsGrid');
  const searchInput = document.getElementById('searchInput') || document.getElementById('registrySearch');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  const moduleCounterText = document.getElementById('moduleCounterText');
  const activeLensText = document.getElementById('activeLensText');
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  const soundToggleBtn = document.getElementById('soundToggleBtn');
  const soundIcon = document.getElementById('soundIcon');
  const progressBar = document.getElementById('progressBar');
  
  // Drawer Elements
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const moduleDrawer = document.getElementById('moduleDrawer');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const drawerPrevBtn = document.getElementById('drawerPrevBtn');
  const drawerNextBtn = document.getElementById('drawerNextBtn');
  const drawerShareBtn = document.getElementById('drawerShareBtn');

  // ═══════════════════════════════════════
  // 00 · SYNTHETIC AUDIO ENGINE (Web Audio API)
  // ═══════════════════════════════════════
  class SoundEngine {
    constructor() {
      this.ctx = null;
      this.enabled = localStorage.getItem('sound_enabled') === 'true';
      this.updateUI();
    }

    init() {
      if (!this.ctx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) {
          this.ctx = new AudioContextClass();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    toggle() {
      this.init();
      this.enabled = !this.enabled;
      localStorage.setItem('sound_enabled', this.enabled ? 'true' : 'false');
      this.updateUI();
      if (this.enabled) {
        this.playJoy();
      }
    }

    updateUI() {
      const soundOnSvg = document.querySelector('.sound-on-svg');
      const soundOffSvg = document.querySelector('.sound-off-svg');
      if (soundOnSvg && soundOffSvg) {
        if (this.enabled) {
          soundOnSvg.classList.remove('hidden');
          soundOffSvg.classList.add('hidden');
        } else {
          soundOnSvg.classList.add('hidden');
          soundOffSvg.classList.remove('hidden');
        }
      }
      if (soundToggleBtn) {
        soundToggleBtn.title = this.enabled ? 'Mute Sound Effects' : 'Enable Interactive Sound Effects';
      }
    }

    playClick() {
      if (!this.enabled || !this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(440, this.ctx.currentTime + 0.035);
        gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.035);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.035);
      } catch (e) {}
    }

    playTab() {
      if (!this.enabled || !this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(660, this.ctx.currentTime + 0.05);
        gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.05);
      } catch (e) {}
    }

    playJoy() {
      if (!this.ctx) return;
      try {
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, index) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          const startTime = this.ctx.currentTime + (index * 0.06);
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, startTime);
          gain.gain.setValueAtTime(0.04, startTime);
          gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.12);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(startTime);
          osc.stop(startTime + 0.12);
        });
      } catch (e) {}
    }
  }

  const sfx = new SoundEngine();

  // ═══════════════════════════════════════
  // 01 · INITIALIZATION & THEME SETUP
  // ═══════════════════════════════════════
  function init() {
    initTheme();
    renderExecutiveProfile();
    setupDecisionEngine();
    setupRoiSimulator();
    renderModules();
    setupEventListeners();
    setupClickToCopyEmail();
    initCustomCursor();
    setupNavigationScrollSpy();
    setupNumberCounters();
    checkUrlHashForDeepLink();
  }

  function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
  }

  function setTheme(theme) {
    const sunSvg = document.querySelector('.theme-sun-svg');
    const moonSvg = document.querySelector('.theme-moon-svg');
    if (theme === 'dark') {
      document.body.classList.remove('light-theme');
      document.body.classList.add('dark-theme');
      if (sunSvg) sunSvg.classList.remove('hidden');
      if (moonSvg) moonSvg.classList.add('hidden');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
      if (sunSvg) sunSvg.classList.add('hidden');
      if (moonSvg) moonSvg.classList.remove('hidden');
      localStorage.setItem('theme', 'light');
    }
  }

  // ═══════════════════════════════════════
  // 02 · MODULE MATRIX RENDER ENGINE
  // ═══════════════════════════════════════
  function getFilteredModules() {
    return modulesData.filter(mod => {
      // Category Filter
      if (currentCategory !== 'all' && mod.category !== currentCategory) {
        return false;
      }
      // Search Filter
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const titleMatch = (mod.strategy?.title || '').toLowerCase().includes(q);
        const descMatch = (mod.strategy?.desc || '').toLowerCase().includes(q);
        const techMatch = (mod.strategy?.tech || []).some(t => t.toLowerCase().includes(q));
        const problemMatch = (mod.product?.problem || '').toLowerCase().includes(q);
        const kpiMatch = (mod.product?.kpi || '').toLowerCase().includes(q);

        return titleMatch || descMatch || techMatch || problemMatch || kpiMatch;
      }
      return true;
    });
  }

  function renderModules() {
    const filtered = getFilteredModules();

    // Update Counter Header
    if (moduleCounterText) {
      moduleCounterText.textContent = `Showing ${filtered.length} of ${modulesData.length} modules`;
    }

    if (!container) return;

    if (filtered.length === 0) {
      container.className = 'modules-grid-view';
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1.5rem; background: var(--bg-card); border: 1px dashed var(--border-color); border-radius: var(--radius-md);">
          <div style="display: inline-flex; align-items: center; justify-content: center; width: 52px; height: 52px; border-radius: 50%; background: rgba(79, 70, 229, 0.08); color: var(--accent-indigo); margin-bottom: 0.85rem;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </div>
          <h3 style="font-family: var(--font-display); font-size: 1.3rem; margin-bottom: 0.35rem;">No operational modules match your filter</h3>
          <p style="color: var(--text-muted); font-size: 0.9rem;">Try adjusting your keyword or switching categories.</p>
          <button class="btn btn-outline btn-sm" id="resetFiltersBtn" style="margin-top: 1.25rem;">Reset All Filters</button>
        </div>
      `;
      document.getElementById('resetFiltersBtn')?.addEventListener('click', () => {
        searchInput.value = '';
        searchQuery = '';
        currentCategory = 'all';
        updateCategoryPillsUI();
        renderModules();
        sfx.playClick();
      });
      return;
    }

    if (currentView === 'grid') {
      renderGridView(filtered);
    } else if (currentView === 'graph') {
      renderGraphView(filtered);
    } else {
      renderTableView(filtered);
    }
  }

  function renderGridView(modules) {
    container.className = 'modules-grid-view';
    
    container.innerHTML = modules.map(mod => {
      const lensData = getLensContent(mod, currentLens);

      return `
        <article class="module-card" data-id="${mod.id}">
          <div class="card-top-bar">
            <span class="mod-id-tag">${mod.id}</span>
            <span class="mod-badge">${mod.product?.badge || 'Module'}</span>
          </div>

          <h3 class="mod-title">${mod.strategy?.title || 'Module Title'}</h3>

          <div class="mod-lens-content">
            ${lensData.html}
          </div>

          ${lensData.kpi ? `
            <div class="mod-kpi-box">
              <div class="kpi-label">${lensData.kpiLabel}</div>
              <div class="kpi-val">${lensData.kpi}</div>
            </div>
          ` : ''}

          <div class="mod-tech-stack">
            ${(mod.strategy?.tech || []).slice(0, 4).map(t => `<span class="tech-pill">${t}</span>`).join('')}
          </div>

          <div class="mod-card-footer">
            <span class="mod-cta-link">Deep-Dive Case Study &rarr;</span>
          </div>
        </article>
      `;
    }).join('');

    container.querySelectorAll('.module-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        const mod = modulesData.find(m => m.id === id);
        if (mod) {
          sfx.playTab();
          openDrawer(mod);
        }
      });
    });
  }

  function renderGraphView(modules) {
    container.className = 'architecture-graph-container';

    container.innerHTML = `
      <div style="margin-bottom: 1.5rem;">
        <h3 style="font-family: var(--font-display); font-size: 1.25rem; font-weight: 800; margin-bottom: 0.25rem;">System Architecture Flow Map</h3>
        <p style="font-size: 0.88rem; color: var(--text-muted);">Visualizing operational telemetry flowing from Voice Screening &amp; Core ERP to Executive MIS Dashboards.</p>
      </div>

      <div class="graph-flow-grid">
        ${modules.map((mod, idx) => `
          <div class="graph-node-card" data-id="${mod.id}">
            <span class="node-flow-num">NODE ${String(idx + 1).padStart(2, '0')}</span>
            <div style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--accent-cyan); font-weight: 700; margin-bottom: 0.25rem;">${mod.id} · ${mod.category.toUpperCase()}</div>
            <h4 style="font-family: var(--font-display); font-size: 1.05rem; font-weight: 800; margin-bottom: 0.4rem; color: var(--text-main);">${mod.strategy?.title || ''}</h4>
            <p style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.45;">${mod.product?.solution || mod.strategy?.desc || ''}</p>
            <div style="margin-top: 0.85rem; font-size: 0.76rem; font-weight: 700; color: var(--accent-gold); display: flex; align-items: center; gap: 0.35rem;">
              <span>Inspect Node</span>
              <span>&rarr;</span>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    container.querySelectorAll('.graph-node-card').forEach(node => {
      node.addEventListener('click', () => {
        const id = node.getAttribute('data-id');
        const mod = modulesData.find(m => m.id === id);
        if (mod) {
          sfx.playTab();
          openDrawer(mod);
        }
      });
    });
  }

  function renderTableView(modules) {
    container.className = 'modules-table-container';

    container.innerHTML = `
      <table class="matrix-table">
        <colgroup>
          <col style="width: 85px;">
          <col style="width: 230px;">
          <col style="width: 125px;">
          <col style="width: auto;">
          <col style="width: 210px;">
          <col style="width: 100px;">
        </colgroup>
        <thead>
          <tr>
            <th>ID</th>
            <th>Module Name</th>
            <th>Category</th>
            <th>${getLensHeaderName(currentLens)} Context</th>
            <th>Key Metric &amp; Tech</th>
            <th style="text-align: right;">Action</th>
          </tr>
        </thead>
        <tbody>
          ${modules.map(mod => {
            const lensData = getLensContent(mod, currentLens);
            return `
              <tr data-id="${mod.id}" class="table-row">
                <td><span class="mod-id-tag">${mod.id}</span></td>
                <td>
                  <div class="table-title">${mod.strategy?.title || ''}</div>
                  <div class="table-badge-mobile">${mod.product?.badge || ''}</div>
                </td>
                <td><span class="mod-cat-badge ${mod.category}">${mod.category}</span></td>
                <td>
                  <div class="table-context-clamp" title="${lensData.shortText}">${lensData.shortText}</div>
                </td>
                <td>
                  <div class="table-kpi-val">${lensData.kpi || ''}</div>
                  <div class="table-tech-tags">${(mod.strategy?.tech || []).slice(0, 3).map(t => `<span class="table-tech-tag">${t}</span>`).join('')}</div>
                </td>
                <td style="text-align: right;">
                  <button class="btn btn-outline btn-xs" aria-label="Inspect ${mod.id}">Inspect &rarr;</button>
                </td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    `;

    container.querySelectorAll('.table-row').forEach(row => {
      row.addEventListener('click', () => {
        const id = row.getAttribute('data-id');
        const mod = modulesData.find(m => m.id === id);
        if (mod) {
          sfx.playTab();
          openDrawer(mod);
        }
      });
    });
  }

  // Helper: Lens Content Formatter
  function getLensContent(mod, lens) {
    switch (lens) {
      case 'product':
        return {
          html: `<p><strong>Problem:</strong> ${mod.product?.problem || 'N/A'}</p><p style="margin-top:0.35rem;"><strong>Solution:</strong> ${mod.product?.solution || 'N/A'}</p>`,
          shortText: mod.product?.solution || mod.product?.problem || 'N/A',
          kpiLabel: 'Core Product Metric',
          kpi: mod.product?.outcome || mod.product?.kpi || 'N/A'
        };

      case 'research':
        return {
          html: `<p><strong>Question:</strong> ${mod.research?.question || 'N/A'}</p><p style="margin-top:0.35rem;"><strong>Finding:</strong> ${mod.research?.contribution || 'N/A'}</p>`,
          shortText: mod.research?.question || 'N/A',
          kpiLabel: 'Research Theme',
          kpi: mod.research?.theme || 'N/A'
        };

      case 'transformation':
        return {
          html: `<p><span style="color:#ef4444; font-weight:600;">Before:</span> ${mod.transformation?.before || 'N/A'}</p><p style="margin-top:0.35rem;"><span style="color:#10b981; font-weight:600;">After:</span> ${mod.transformation?.after || 'N/A'}</p>`,
          shortText: `${mod.transformation?.before || ''} → ${mod.transformation?.after || ''}`,
          kpiLabel: 'Transformation Value',
          kpi: mod.transformation?.value || 'N/A'
        };

      case 'strategy':
      default:
        return {
          html: `<p>${mod.strategy?.desc || 'N/A'}</p>`,
          shortText: mod.strategy?.desc || 'N/A',
          kpiLabel: mod.strategy?.outcomeLabel || 'Operational Outcome',
          kpi: mod.strategy?.outcomeText || 'N/A'
        };
    }
  }

  function getLensHeaderName(lens) {
    switch (lens) {
      case 'product': return 'Product & User';
      case 'research': return 'Research Question';
      case 'transformation': return 'Workflow Impact';
      case 'strategy': default: return 'Strategic Purpose';
    }
  }

  // ═══════════════════════════════════════
  // 03 · EXECUTIVE PROFILE & RESUME CONTROLLER
  // ═══════════════════════════════════════
  function renderExecutiveProfile() {
    const data = (typeof masterProfile !== 'undefined') ? masterProfile : (resumes.master || {});
    const resumeFile = data.resumeFile || 'Pratap_Jindal_Resume.pdf';

    // Ensure all CV / Resume links on the page point strictly to the official PDF
    const resumeLinks = document.querySelectorAll('a[href*="Resume"], a[href*="resume"], #navResumeBtn, #heroResumeBtn');
    resumeLinks.forEach(link => {
      link.href = resumeFile;
      if (link.getAttribute('download') !== null) {
        link.setAttribute('download', resumeFile);
      }
    });
  }

  // ═══════════════════════════════════════
  // 04 · CASE STUDY DRAWER MODAL
  // ═══════════════════════════════════════
  function openDrawer(mod) {
    if (!mod) return;
    activeModuleForDrawer = mod;
    window.location.hash = 'mod=' + mod.id;

    document.getElementById('drawerBadge').textContent = mod.product?.badge || 'Module';
    document.getElementById('drawerTitle').textContent = mod.strategy?.title || 'Module Title';
    document.getElementById('drawerCategory').textContent = `${mod.id} · ${mod.category.toUpperCase()}`;

    renderDrawerTabContent('overview');

    document.querySelectorAll('.drawer-tab').forEach(t => t.classList.remove('active'));
    document.querySelector('.drawer-tab[data-dtab="overview"]')?.classList.add('active');

    drawerBackdrop.classList.remove('hidden');
    moduleDrawer.classList.remove('hidden');
    requestAnimationFrame(() => {
      drawerBackdrop.classList.add('open');
      moduleDrawer.classList.add('open');
    });
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawerBackdrop.classList.remove('open');
    moduleDrawer.classList.remove('open');
    setTimeout(() => {
      drawerBackdrop.classList.add('hidden');
      moduleDrawer.classList.add('hidden');
    }, 280);
    document.body.style.overflow = '';
    if (window.location.hash.startsWith('#mod=')) {
      history.replaceState(null, null, window.location.pathname);
    }
  }

  function navigateDrawer(direction) {
    if (!activeModuleForDrawer) return;
    const currentIndex = modulesData.findIndex(m => m.id === activeModuleForDrawer.id);
    if (currentIndex === -1) return;

    let nextIndex = currentIndex + direction;
    if (nextIndex < 0) nextIndex = modulesData.length - 1;
    if (nextIndex >= modulesData.length) nextIndex = 0;

    sfx.playTab();
    openDrawer(modulesData[nextIndex]);
  }

  function shareCurrentModule() {
    if (!activeModuleForDrawer) return;
    const url = window.location.origin + window.location.pathname + '#mod=' + activeModuleForDrawer.id;
    navigator.clipboard.writeText(url).then(() => {
      showToast('Link copied to clipboard!');
      sfx.playClick();
    }).catch(() => {
      showToast('URL: ' + url);
    });
  }

  function showToast(msg) {
    let toast = document.querySelector('.toast-notice');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast-notice';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2500);
  }

  function checkUrlHashForDeepLink() {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#mod=')) {
      const modId = hash.replace('#mod=', '');
      const targetMod = modulesData.find(m => m.id === modId);
      if (targetMod) {
        setTimeout(() => openDrawer(targetMod), 300);
      }
    }
  }

  function renderDrawerTabContent(tabKey) {
    const drawerBody = document.getElementById('drawerBody');
    if (!drawerBody || !activeModuleForDrawer) return;

    const mod = activeModuleForDrawer;

    switch (tabKey) {
      case 'product':
        drawerBody.innerHTML = `
          <div class="drawer-section">
            <h4 class="drawer-section-h4">Target Users</h4>
            <p class="drawer-text">${mod.product?.users || 'N/A'}</p>
          </div>
          <div class="drawer-section">
            <h4 class="drawer-section-h4">Problem Statement</h4>
            <p class="drawer-text">${mod.product?.problem || 'N/A'}</p>
          </div>
          <div class="drawer-section">
            <h4 class="drawer-section-h4">Product Solution</h4>
            <p class="drawer-text">${mod.product?.solution || 'N/A'}</p>
          </div>
          <div class="drawer-section">
            <h4 class="drawer-section-h4">Architecture &amp; Key Decisions</h4>
            <p class="drawer-text">${mod.product?.decisions || 'N/A'}</p>
          </div>
          <div class="drawer-section">
            <h4 class="drawer-section-h4">Primary KPI &amp; Outcome</h4>
            <p class="drawer-text"><strong>${mod.product?.kpi || 'KPI'}:</strong> ${mod.product?.outcome || 'N/A'}</p>
          </div>
        `;
        break;

      case 'research':
        drawerBody.innerHTML = `
          <div class="drawer-section">
            <h4 class="drawer-section-h4">Research Investigation</h4>
            <p class="drawer-text"><strong>${mod.research?.title || 'N/A'}</strong></p>
          </div>
          <div class="drawer-section">
            <h4 class="drawer-section-h4">Research Theme</h4>
            <p class="drawer-text">${mod.research?.theme || 'N/A'}</p>
          </div>
          <div class="drawer-section">
            <h4 class="drawer-section-h4">Empirical Research Question</h4>
            <p class="drawer-text">${mod.research?.question || 'N/A'}</p>
          </div>
          <div class="drawer-section">
            <h4 class="drawer-section-h4">Methodology &amp; Architecture</h4>
            <p class="drawer-text">${mod.research?.methodology || 'N/A'}</p>
          </div>
          <div class="drawer-section">
            <h4 class="drawer-section-h4">Contribution to Knowledge</h4>
            <p class="drawer-text">${mod.research?.contribution || 'N/A'}</p>
          </div>
        `;
        break;

      case 'transformation':
        drawerBody.innerHTML = `
          <div class="drawer-section">
            <h4 class="drawer-section-h4">Transformation Scope</h4>
            <p class="drawer-text"><strong>${mod.transformation?.title || 'N/A'}</strong></p>
          </div>
          <div class="drawer-section">
            <h4 class="drawer-section-h4" style="color:#ef4444;">Before State (Legacy Workflow)</h4>
            <p class="drawer-text">${mod.transformation?.before || 'N/A'}</p>
          </div>
          <div class="drawer-section">
            <h4 class="drawer-section-h4" style="color:#10b981;">After State (Transformed Workflow)</h4>
            <p class="drawer-text">${mod.transformation?.after || 'N/A'}</p>
          </div>
          <div class="drawer-section">
            <h4 class="drawer-section-h4">Change Management &amp; Adoption</h4>
            <p class="drawer-text">${mod.transformation?.change || 'N/A'}</p>
          </div>
          <div class="drawer-section">
            <h4 class="drawer-section-h4">Business Value Delivered</h4>
            <p class="drawer-text">${mod.transformation?.value || 'N/A'}</p>
          </div>
        `;
        break;

      case 'overview':
      default:
        drawerBody.innerHTML = `
          <div class="drawer-section">
            <h4 class="drawer-section-h4">Executive Strategy Overview</h4>
            <p class="drawer-text">${mod.strategy?.desc || 'N/A'}</p>
          </div>

          <div class="drawer-section">
            <h4 class="drawer-section-h4">Operational Purpose &amp; Impact</h4>
            <p class="drawer-text"><strong>${mod.strategy?.outcomeLabel || 'Outcome'}:</strong> ${mod.strategy?.outcomeText || 'N/A'}</p>
          </div>

          <div class="drawer-section">
            <h4 class="drawer-section-h4">Technology Stack</h4>
            <div class="mod-tech-stack" style="margin-top:0.5rem;">
              ${(mod.strategy?.tech || []).map(t => `<span class="tech-pill">${t}</span>`).join('')}
            </div>
          </div>
        `;
        break;
    }
  }

  // ═══════════════════════════════════════
  // 04.5 · INSTANT DECISION ENGINE & ROI SIMULATOR
  // ═══════════════════════════════════════
  const decisionEngineData = {
    automation: {
      roleTitle: "Head of Business Systems & Automation / Solutions Architect",
      fitScore: "100% Verified Fit",
      fitBadge: "Systems Architecture · Zero Agency Spend",
      phases: [
        {
          phase: "Days 1–30",
          heading: "Deep Workflow Audit & Choke-Point Mapping",
          desc: "Audit existing cross-departmental operations across Google Sheets, ERPs, and email to isolate the top 5 time-wasting manual bottlenecks."
        },
        {
          phase: "Days 31–60",
          heading: "Automated Data Ingestion & Script Pipelines",
          desc: "Engineer end-to-end Google Apps Script and webhook ingestion workflows that automatically parse data, validate schemas, and log real-time events."
        },
        {
          phase: "Days 61–90",
          heading: "Executive Decision Layer & Full Team Adoption",
          desc: "Deploy live Looker Studio dashboards, build custom Chrome extensions to bypass latency, and train frontline staff to sustain 80% manual effort elimination."
        }
      ],
      metrics: [
        {
          value: "80%",
          pill: "Effort Saved",
          label: "Manual Reporting Reduction",
          detail: "Automated daily logging, email ingestion, and reconciliations across an 80-member org."
        },
        {
          value: "18+",
          pill: "Platform",
          label: "Internal Modules Built",
          detail: "Co-designed and deployed complete decision-support infrastructure for Group Biopolis."
        },
        {
          value: "$0",
          pill: "Capital Saved",
          label: "External Consultant Cost",
          detail: "Built entirely in-house using serverless web tools, Apps Script, and vanilla architectures."
        }
      ],
      recommendedModules: [
        { id: "MOD_05", label: "18-Module MIS Platform" },
        { id: "MOD_03", label: "B2B Order Book Portal" }
      ]
    },
    operations: {
      roleTitle: "Director / Lead — Operations & MIS",
      fitScore: "99% Verified Fit",
      fitBadge: "Scale Operations · ₹75 Cr Monthly Target",
      phases: [
        {
          phase: "Days 1–30",
          heading: "SKU Velocity & Stock Health Diagnostics",
          desc: "Run comprehensive turnover analyses across active inventory catalogues, identifying stock-out vulnerabilities and dead-weight SKUs."
        },
        {
          phase: "Days 31–60",
          heading: "Catalogue Rationalization & Incentive Restructuring",
          desc: "Prune bloated inventories (500 down to ~400 SKUs) and redesign field incentive structures using behavioral psychology to lift conversions."
        },
        {
          phase: "Days 61–90",
          heading: "High-Cadence Revenue Delivery & Cross-Company Sync",
          desc: "Orchestrate multi-region divisions to consistently achieve revenue targets within 48 hours while maintaining 98%+ stock reconciliation accuracy."
        }
      ],
      metrics: [
        {
          value: "₹75 Cr",
          pill: "Scale Target",
          label: "Monthly Revenue Directed",
          detail: "Led 72-member field division across 10 operational regions at BFIL (IndusInd subsidiary)."
        },
        {
          value: "98%",
          pill: "Precision",
          label: "Sustained Stock Accuracy",
          detail: "Maintained cross-company stock reconciliation across multi-warehouse distribution."
        },
        {
          value: "88%",
          pill: "Friction Cut",
          label: "Shortage Complaints Dropped",
          detail: "Reduced concurrent shortages from 17 down to 2 while unlocking a 20% sales uplift."
        }
      ],
      recommendedModules: [
        { id: "MOD_09", label: "500 SKU Rationalisation" },
        { id: "MOD_04", label: "Workforce Dispatch Hub" }
      ]
    },
    engineering: {
      roleTitle: "Full-Stack Systems Engineer / AI Product Specialist",
      fitScore: "98% Verified Fit",
      fitBadge: "24 Systems Shipped · Voice AI & Web",
      phases: [
        {
          phase: "Days 1–30",
          heading: "Rapid Prototyping & Architecture Foundation",
          desc: "Scaffold ultra-fast single-page web applications utilizing Web Audio API, Gemini LLM endpoints, and serverless IndexedDB/Firestore layers."
        },
        {
          phase: "Days 31–60",
          heading: "Zero-Latency Performance & Real-Time Sync",
          desc: "Optimize data dispatch engines down to sub-second response times, cutting operational booking cycles from 8 minutes to 45 seconds."
        },
        {
          phase: "Days 61–90",
          heading: "Production Tooling & Custom Browser Integrations",
          desc: "Deploy client-side reader workspaces and custom Manifest V3 extensions, delivering immediate utility with zero hosting or server maintenance overhead."
        }
      ],
      metrics: [
        {
          value: "24",
          pill: "Production",
          label: "Operational Systems Shipped",
          detail: "Built across Voice AI simulators, B2B order books, dispatch hubs, and document engines."
        },
        {
          value: "~$0.05",
          pill: "Efficiency",
          label: "Cost per AI Voice Session",
          detail: "Built real-time mock interview simulator with Web Audio API and Gemini LLM."
        },
        {
          value: "45s",
          pill: "Speed",
          label: "Order Booking Velocity",
          detail: "Reduced B2B ordering cycle from 8 minutes down to 45 seconds with 0 server fees."
        }
      ],
      recommendedModules: [
        { id: "MOD_01", label: "Voice Mock Interviewer" },
        { id: "MOD_03", label: "B2B Order Book Portal" }
      ]
    },
    strategy: {
      roleTitle: "Senior Management Analyst / Executive Strategy Partner",
      fitScore: "100% Verified Fit",
      fitBadge: "UGC NET Qualified · MBA Honors 8.83/10",
      phases: [
        {
          phase: "Days 1–30",
          heading: "Empirical Baseline & Financial Modeling",
          desc: "Perform rigorous financial, variance, and operational root-cause analysis to uncover hidden margin leaks and capacity bottlenecks."
        },
        {
          phase: "Days 31–60",
          heading: "Executive MIS Cockpit Deployment",
          desc: "Build and deploy 13+ customized Looker Studio dashboards giving C-level executives instant visibility into daily operational health."
        },
        {
          phase: "Days 61–90",
          heading: "Standard Operating Procedures & Knowledge Transfer",
          desc: "Draft clear SOPs, training manuals, and change-management frameworks, upskilling 30+ team members for self-sustaining governance."
        }
      ],
      metrics: [
        {
          value: "UGC NET",
          pill: "Academic Rank",
          label: "National Professorship Qualified",
          detail: "Top national credential in Management; deep foundation in organizational governance."
        },
        {
          value: "8.83",
          pill: "Honors",
          label: "MBA CGPA / 10",
          detail: "Mittal School of Business & NSE Academy with executive certifications from Duke, ISB & Geneva."
        },
        {
          value: "13",
          pill: "Governance",
          label: "Looker Studio Dashboards",
          detail: "Designed and maintained as the core daily operational command center for executive leadership."
        }
      ],
      recommendedModules: [
        { id: "MOD_05", label: "18-Module MIS Platform" },
        { id: "MOD_09", label: "500 SKU Rationalisation" }
      ]
    }
  };

  const roiSimulatorData = {
    startup: [
      { val: "550+ Hrs", lbl: "Annual Hours Saved", sub: "Manual reporting & reconciliation eliminated" },
      { val: "₹12L+", lbl: "Agency & SaaS Saved", sub: "$15K+ in custom software build costs avoided" },
      { val: "< 1 Sec", lbl: "Decision Latency", sub: "Real-time Looker visibility vs weekly spreadsheets" },
      { val: "99.5%", lbl: "Data Precision", sub: "Automated validation & zero manual typo errors" }
    ],
    mid: [
      { val: "1,600+ Hrs", lbl: "Annual Hours Saved", sub: "Equivalent to 1 full-time analyst FTE recovered" },
      { val: "₹35L+", lbl: "Agency & SaaS Saved", sub: "$42K+ in external dev & license fees avoided" },
      { val: "Instant", lbl: "Decision Latency", sub: "Live Apps Script & webhook data sync" },
      { val: "98–99.8%", lbl: "Stock & Order Accuracy", sub: "Reconciled multi-warehouse & SKU flows" }
    ],
    enterprise: [
      { val: "3,200+ Hrs", lbl: "Annual Hours Saved", sub: "Cross-divisional operational efficiency unlocked" },
      { val: "₹65L+", lbl: "Agency & SaaS Saved", sub: "$78K+ eliminated in multi-consultant spend" },
      { val: "Automated", lbl: "Operational Flow", sub: "Continuous background ETL & audit pipelines" },
      { val: "99.8%", lbl: "Institutional Precision", sub: "Governance-grade reporting for executive leadership" }
    ]
  };

  function setupDecisionEngine() {
    const selectorContainer = document.getElementById('personaSelector');
    const displayCard = document.getElementById('decisionDisplayCard');
    if (!selectorContainer || !displayCard) return;

    let activePersona = 'automation';

    function renderDisplay(personaKey) {
      const data = decisionEngineData[personaKey];
      if (!data) return;

      displayCard.innerHTML = `
        <div class="d-card-header">
          <div class="d-role-meta">
            <h3 class="d-role-title">${data.roleTitle}</h3>
            <span class="d-fit-pill">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
              ${data.fitScore}
            </span>
          </div>
          <span class="telemetry-badge">${data.fitBadge}</span>
        </div>

        <div class="d-grid">
          <div class="d-roadmap-column">
            <h4 class="d-block-title">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              First 90-Day High-Impact Execution Plan
            </h4>
            <div class="roadmap-timeline">
              ${data.phases.map(p => `
                <div class="roadmap-step">
                  <span class="step-phase">${p.phase}</span>
                  <strong class="step-heading">${p.heading}</strong>
                  <p class="step-desc">${p.desc}</p>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="d-proof-column">
            <h4 class="d-block-title">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              Verified Historical Business Proof
            </h4>
            ${data.metrics.map(m => `
              <div class="proof-metric-box">
                <div class="proof-val-row">
                  <span class="proof-val">${m.value}</span>
                  <span class="proof-pill">${m.pill}</span>
                </div>
                <strong class="proof-lbl">${m.label}</strong>
                <p class="proof-detail">${m.detail}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="d-action-bar">
          <div class="d-action-left">
            <span class="d-systems-tag">
              <strong>Matching Systems:</strong>
              ${data.recommendedModules.map(rm => `
                <button type="button" class="d-quick-inspect-btn" data-mod-id="${rm.id}">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                  ${rm.label}
                </button>
              `).join('')}
            </span>
          </div>

          <div class="d-action-right">
            <button type="button" class="btn btn-outline btn-sm contact-copy-btn" data-email="pratapjindal812@gmail.com" title="Copy Pratap's Direct Email">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              Copy Email
            </button>
            <a href="Pratap_Jindal_Resume.pdf" target="_blank" download="Pratap_Jindal_Resume.pdf" class="btn btn-primary btn-sm" title="Download Official Resume PDF">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Hire Pratap (PDF)
            </a>
          </div>
        </div>
      `;

      // Attach quick inspect buttons to open the module drawer
      displayCard.querySelectorAll('.d-quick-inspect-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const modId = btn.getAttribute('data-mod-id');
          const mod = modulesData.find(m => m.id === modId);
          if (mod) {
            sfx.playClick();
            openDrawer(mod);
          }
        });
      });

      // Re-bind click to copy email on newly created button
      setupClickToCopyEmail();
    }

    // Attach persona selector clicks
    selectorContainer.querySelectorAll('.persona-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        sfx.playTab();
        selectorContainer.querySelectorAll('.persona-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activePersona = btn.getAttribute('data-persona');
        renderDisplay(activePersona);
      });
    });

    // Initial render
    renderDisplay(activePersona);
  }

  function setupRoiSimulator() {
    const scaleToggle = document.getElementById('simScaleToggle');
    const metricsGrid = document.getElementById('simMetricsGrid');
    if (!scaleToggle || !metricsGrid) return;

    let activeScale = 'mid';

    function renderScale(scaleKey) {
      const metrics = roiSimulatorData[scaleKey] || roiSimulatorData.mid;
      metricsGrid.innerHTML = metrics.map(m => `
        <div class="sim-metric-card">
          <span class="sim-metric-val">${m.val}</span>
          <strong class="sim-metric-lbl">${m.lbl}</strong>
          <span class="sim-metric-sub">${m.sub}</span>
        </div>
      `).join('');
    }

    scaleToggle.querySelectorAll('.sim-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        sfx.playTab();
        scaleToggle.querySelectorAll('.sim-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeScale = btn.getAttribute('data-scale');
        renderScale(activeScale);
      });
    });

    // Initial render
    renderScale(activeScale);
  }

  // ═══════════════════════════════════════
  // 05 · NAVIGATION SCROLL SPY
  // ═══════════════════════════════════════
  function setupNavigationScrollSpy() {
    const navItems = [
      { id: 'hero', link: document.querySelector('.nav-links a[href="#hero"]') },
      { id: 'decision-engine', link: document.querySelector('.nav-links a[href="#decision-engine"]') },
      { id: 'profile', link: document.querySelector('.nav-links a[href="#profile"]') },
      { id: 'bento', link: document.querySelector('.nav-links a[href="#bento"]') },
      { id: 'modules', link: document.querySelector('.nav-links a[href="#modules"]') },
      { id: 'experience', link: document.querySelector('.nav-links a[href="#experience"]') },
      { id: 'contact', link: document.querySelector('.nav-links a[href="#contact"]') }
    ].filter(item => item.link);

    function updateActiveNav() {
      const scrollPos = window.scrollY + 140;
      let activeItem = navItems[0];

      navItems.forEach(item => {
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= scrollPos) {
          activeItem = item;
        }
      });

      document.querySelectorAll('.nav-links a').forEach(a => {
        if (!a.classList.contains('nav-external-pill')) {
          a.classList.remove('active');
        }
      });

      if (activeItem && activeItem.link) {
        activeItem.link.classList.add('active');
      }
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();
  }

  // ═══════════════════════════════════════
  // 06 · CUSTOM MAGNETIC CURSOR
  // ═══════════════════════════════════════
  function initCustomCursor() {
    const cursorDot = document.getElementById('cursorDot');
    const cursorRing = document.getElementById('cursorRing');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let isMouseActive = false;

    // Smooth cursor follower loop
    function animateCursorRing() {
      if (isMouseActive) {
        ringX += (mouseX - ringX) * 0.18;
        ringY += (mouseY - ringY) * 0.18;

        if (cursorRing) {
          cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
        }
      }
      requestAnimationFrame(animateCursorRing);
    }
    animateCursorRing();

    // Mouse Movement
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isMouseActive) {
        isMouseActive = true;
        if (cursorDot) cursorDot.style.opacity = '1';
        if (cursorRing) cursorRing.style.opacity = '1';
      }

      if (cursorDot) {
        cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
    });

    // Window Leave / Enter
    document.addEventListener('mouseleave', () => {
      if (cursorDot) cursorDot.style.opacity = '0';
      if (cursorRing) cursorRing.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
      if (cursorDot) cursorDot.style.opacity = '1';
      if (cursorRing) cursorRing.style.opacity = '1';
    });

    // Hover Scaling for Clickables
    document.addEventListener('mouseover', (e) => {
      const target = e.target.closest('a, button, .module-card, .bento-card, .graph-node-card, .competency-pillar-card, .table-row, .cat-pill, .lens-btn, .single-resume-card, .hero-telemetry-card');
      if (target) {
        cursorRing?.classList.add('active-hover');
      } else {
        cursorRing?.classList.remove('active-hover');
      }
    });
  }

  // ═══════════════════════════════════════
  // 07 · EVENT LISTENERS
  // ═══════════════════════════════════════
  function setupEventListeners() {
    // Theme Toggle Listener
    themeToggleBtn?.addEventListener('click', () => {
      sfx.playClick();
      const isDark = document.body.classList.contains('dark-theme');
      setTheme(isDark ? 'light' : 'dark');
    });

    // Sound Toggle Listener
    soundToggleBtn?.addEventListener('click', () => {
      sfx.toggle();
    });

    // Scroll Reading Progress Bar
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / (docHeight || 1)) * 100;
      if (progressBar) progressBar.style.width = `${progress}%`;
    }, { passive: true });

    // Bento Card Clicks
    document.querySelectorAll('.bento-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        const mod = modulesData.find(m => m.id === id);
        if (mod) {
          sfx.playTab();
          openDrawer(mod);
        }
      });
    });

    // Search Input
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        if (clearSearchBtn) {
          clearSearchBtn.classList.toggle('hidden', searchQuery.length === 0);
        }
        renderModules();
      });
    }

    if (clearSearchBtn) {
      clearSearchBtn.addEventListener('click', () => {
        searchInput.value = '';
        searchQuery = '';
        clearSearchBtn.classList.add('hidden');
        renderModules();
        sfx.playClick();
      });
    }

    // Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
      // '/' to focus search
      if (e.key === '/' && document.activeElement !== searchInput) {
        e.preventDefault();
        searchInput.focus();
        sfx.playClick();
      }
      // Escape to close drawer
      if (e.key === 'Escape') {
        closeDrawer();
      }
      // Arrow keys to navigate drawer
      if (moduleDrawer && !moduleDrawer.classList.contains('hidden')) {
        if (e.key === 'ArrowLeft') {
          navigateDrawer(-1);
        } else if (e.key === 'ArrowRight') {
          navigateDrawer(1);
        }
      }
    });

    // Category Pills
    document.querySelectorAll('.cat-pill, .filter-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        sfx.playTab();
        currentCategory = pill.getAttribute('data-cat') || pill.getAttribute('data-filter') || 'all';
        document.querySelectorAll('.cat-pill, .filter-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        renderModules();
      });
    });

    // Lens Buttons
    document.querySelectorAll('.lens-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        sfx.playTab();
        currentLens = btn.getAttribute('data-lens');
        document.querySelectorAll('.lens-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        if (activeLensText) {
          activeLensText.innerHTML = `Current Lens: <strong>${getLensHeaderName(currentLens)}</strong>`;
        }
        renderModules();
      });
    });

    // View Switcher (Grid vs Graph vs Table)
    const btnGridView = document.getElementById('btnGridView');
    const btnGraphView = document.getElementById('btnGraphView');
    const btnTableView = document.getElementById('btnTableView');

    if (btnGridView && btnTableView && btnGraphView) {
      btnGridView.addEventListener('click', () => {
        sfx.playTab();
        currentView = 'grid';
        btnGridView.classList.add('active');
        btnGraphView.classList.remove('active');
        btnTableView.classList.remove('active');
        renderModules();
      });

      btnGraphView.addEventListener('click', () => {
        sfx.playTab();
        currentView = 'graph';
        btnGraphView.classList.add('active');
        btnGridView.classList.remove('active');
        btnTableView.classList.remove('active');
        renderModules();
      });

      btnTableView.addEventListener('click', () => {
        sfx.playTab();
        currentView = 'table';
        btnTableView.classList.add('active');
        btnGridView.classList.remove('active');
        btnGraphView.classList.remove('active');
        renderModules();
      });
    }

    // Interactive sound effects for Competency Pillars
    document.querySelectorAll('.competency-pillar-card, .p-metric-item').forEach(card => {
      card.addEventListener('mouseenter', () => {
        sfx.playTab();
      });
    });

    // Drawer Listeners
    closeDrawerBtn?.addEventListener('click', () => {
      sfx.playClick();
      closeDrawer();
    });
    drawerBackdrop?.addEventListener('click', () => {
      closeDrawer();
    });
    drawerPrevBtn?.addEventListener('click', () => {
      navigateDrawer(-1);
    });
    drawerNextBtn?.addEventListener('click', () => {
      navigateDrawer(1);
    });
    drawerShareBtn?.addEventListener('click', () => {
      shareCurrentModule();
    });

    document.querySelectorAll('.drawer-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        sfx.playTab();
        document.querySelectorAll('.drawer-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const key = tab.getAttribute('data-dtab');
        renderDrawerTabContent(key);
      });
    });
  }

  function updateCategoryPillsUI() {
    document.querySelectorAll('.cat-pill').forEach(pill => {
      pill.classList.toggle('active', pill.getAttribute('data-cat') === currentCategory);
    });
  }

  // ═══════════════════════════════════════
  // 08 · NUMBER COUNTERS ANIMATION
  // ═══════════════════════════════════════
  function setupNumberCounters() {
    const counters = document.querySelectorAll('.counter-value');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = +entry.target.getAttribute('data-target');
          let count = 0;
          const increment = Math.ceil(target / 30);

          const updateCount = () => {
            count += increment;
            if (count >= target) {
              entry.target.textContent = target;
            } else {
              entry.target.textContent = count;
              setTimeout(updateCount, 40);
            }
          };
          updateCount();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
  }

  // ═══════════════════════════════════════
  // 09 · CLICK-TO-COPY EMAIL CONTROLLER
  // ═══════════════════════════════════════
  async function copyTextToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (err) {
        console.warn('navigator.clipboard failed, attempting execCommand fallback:', err);
      }
    }
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.top = '-9999px';
      textArea.style.left = '-9999px';
      textArea.setAttribute('readonly', '');
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return successful;
    } catch (err) {
      console.error('execCommand copy failed:', err);
      return false;
    }
  }

  function setupClickToCopyEmail() {
    const copyButtons = document.querySelectorAll('.contact-copy-btn, .copy-email-btn, [data-copy-email], [data-email]');

    copyButtons.forEach(btn => {
      let resetTimeout = null;

      btn.addEventListener('click', async (e) => {
        e.preventDefault();
        const email = btn.getAttribute('data-email') || 'pratapjindal812@gmail.com';

        const copied = await copyTextToClipboard(email);

        if (typeof sfx !== 'undefined' && sfx) {
          try {
            sfx.init();
            if (sfx.enabled) sfx.playJoy();
          } catch (e) {}
        }

        // Visual feedback on card
        btn.classList.add('copied-state');
        const badge = btn.querySelector('.copy-badge');
        if (badge) badge.classList.add('copied');

        const statusText = btn.querySelector('.copy-status-text');
        if (statusText) statusText.textContent = 'Copied!';

        const hintText = btn.querySelector('.copy-hint-text');
        if (hintText) hintText.textContent = 'Copied to clipboard! ✓';

        const heroText = btn.querySelector('.hero-copy-text');
        if (heroText) heroText.textContent = 'Copied!';

        showCopyToast(copied ? `Email ${email} copied to clipboard!` : `Email: ${email}`);

        if (resetTimeout) clearTimeout(resetTimeout);
        resetTimeout = setTimeout(() => {
          btn.classList.remove('copied-state');
          if (badge) badge.classList.remove('copied');
          if (statusText) statusText.textContent = 'Copy';
          if (hintText) hintText.textContent = 'Click to copy';
          if (heroText) heroText.textContent = 'Copy Email';
        }, 2400);
      });
    });
  }

  function showCopyToast(message) {
    let toast = document.getElementById('portfolioToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'portfolioToast';
      toast.className = 'portfolio-toast';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> <span>${message}</span>`;
    toast.classList.add('show');
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 2400);
  }

  // Run App
  init();
});
