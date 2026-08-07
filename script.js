/* ═══════════════════════════════════════════════════════════════
   HELIX PORTFOLIO — CONTROLLER (2026 REVAMP)
   Bento Grid, Architecture Graph, ROI Simulator & 24-Module Engine
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  // Global State
  let modulesData = (typeof projectData !== 'undefined') ? projectData : [];
  let resumes = (typeof resumeData !== 'undefined') ? resumeData : {};

  let currentCategory = 'all';
  let currentLens = 'strategy';
  let currentView = 'grid'; // 'grid' | 'graph' | 'table'
  let currentPersona = 'leadership';
  let searchQuery = '';
  let activeModuleForDrawer = null;

  // DOM Elements
  const container = document.getElementById('modulesContainer');
  const searchInput = document.getElementById('searchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  const moduleCounterText = document.getElementById('moduleCounterText');
  const activeLensText = document.getElementById('activeLensText');
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  const progressBar = document.getElementById('progressBar');
  
  // Drawer Elements
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const moduleDrawer = document.getElementById('moduleDrawer');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');

  // ═══════════════════════════════════════
  // 01 · INITIALIZATION & THEME SETUP
  // ═══════════════════════════════════════
  function init() {
    initTheme();
    renderPersona(currentPersona);
    renderModules();
    setupEventListeners();
    setupRoiSimulator();
    initMascotAndCursor();
    setupNumberCounters();
  }

  function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
  }

  function setTheme(theme) {
    if (theme === 'dark') {
      document.body.classList.remove('light-theme');
      document.body.classList.add('dark-theme');
      if (themeIcon) themeIcon.textContent = '☀️';
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
      if (themeIcon) themeIcon.textContent = '🌙';
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
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; background: var(--bg-card); border: 1px dashed var(--border-color); border-radius: var(--radius-md);">
          <span style="font-size: 2.5rem;">🔍</span>
          <h3 style="font-family: var(--font-display); font-size: 1.3rem; margin-top: 0.5rem;">No modules found</h3>
          <p style="color: var(--text-muted); font-size: 0.9rem;">Try adjusting your search query or switching categories.</p>
          <button class="btn btn-outline btn-sm" id="resetFiltersBtn" style="margin-top: 1rem;">Reset Search Filters</button>
        </div>
      `;
      document.getElementById('resetFiltersBtn')?.addEventListener('click', () => {
        searchInput.value = '';
        searchQuery = '';
        currentCategory = 'all';
        updateCategoryPillsUI();
        renderModules();
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

    // Attach click listeners to cards
    container.querySelectorAll('.module-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        const mod = modulesData.find(m => m.id === id);
        if (mod) openDrawer(mod);
      });
    });
  }

  function renderGraphView(modules) {
    container.className = 'architecture-graph-container';

    container.innerHTML = `
      <div style="margin-bottom: 1.5rem;">
        <h3 style="font-family: var(--font-display); font-size: 1.2rem; font-weight: 700;">System Architecture Flow Map</h3>
        <p style="font-size: 0.88rem; color: var(--text-muted);">Visualizing how operational data flows across Sales, Inventory, AI Speech QA, and Executive MIS Analytics.</p>
      </div>

      <div class="graph-flow-grid">
        ${modules.map((mod, idx) => `
          <div class="graph-node-card" data-id="${mod.id}">
            <span class="node-flow-num">NODE ${String(idx + 1).padStart(2, '0')}</span>
            <div style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--accent-cyan); font-weight: 700; margin-bottom: 0.25rem;">${mod.id} · ${mod.category.toUpperCase()}</div>
            <h4 style="font-family: var(--font-display); font-size: 1rem; font-weight: 700; margin-bottom: 0.35rem;">${mod.strategy?.title || ''}</h4>
            <p style="font-size: 0.8rem; color: var(--text-muted); line-height: 1.4;">${mod.product?.solution || mod.strategy?.desc || ''}</p>
            <div style="margin-top: 0.75rem; font-size: 0.75rem; font-weight: 700; color: var(--accent-gold);">Click to Inspect Node &rarr;</div>
          </div>
        `).join('')}
      </div>
    `;

    container.querySelectorAll('.graph-node-card').forEach(node => {
      node.addEventListener('click', () => {
        const id = node.getAttribute('data-id');
        const mod = modulesData.find(m => m.id === id);
        if (mod) openDrawer(mod);
      });
    });
  }

  function renderTableView(modules) {
    container.className = 'modules-table-container';

    container.innerHTML = `
      <table class="matrix-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Module Name</th>
            <th>Category</th>
            <th>${getLensHeaderName(currentLens)} Context</th>
            <th>Key Metric / Tech</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          ${modules.map(mod => {
            const lensData = getLensContent(mod, currentLens);
            return `
              <tr data-id="${mod.id}">
                <td><span class="mod-id-tag">${mod.id}</span></td>
                <td><div class="table-title">${mod.strategy?.title || ''}</div></td>
                <td><span class="mod-badge">${mod.category}</span></td>
                <td style="max-width: 320px;">${lensData.shortText}</td>
                <td>
                  <div style="font-weight:600; color:var(--accent-cyan); font-size:0.8rem;">${lensData.kpi || ''}</div>
                  <div style="font-size:0.75rem; color:var(--text-dim);">${(mod.strategy?.tech || []).slice(0,2).join(', ')}</div>
                </td>
                <td>
                  <button class="btn btn-outline btn-sm">Inspect &rarr;</button>
                </td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    `;

    // Attach click listeners to table rows
    container.querySelectorAll('tr[data-id]').forEach(row => {
      row.addEventListener('click', () => {
        const id = row.getAttribute('data-id');
        const mod = modulesData.find(m => m.id === id);
        if (mod) openDrawer(mod);
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
  // 03 · ROI SIMULATOR CONTROLLER
  // ═══════════════════════════════════════
  function setupRoiSimulator() {
    const teamSizeSlider = document.getElementById('teamSizeSlider');
    const revenueSlider = document.getElementById('revenueSlider');
    const skuSlider = document.getElementById('skuSlider');

    if (!teamSizeSlider || !revenueSlider || !skuSlider) return;

    const teamSizeVal = document.getElementById('teamSizeVal');
    const revenueVal = document.getElementById('revenueVal');
    const skuVal = document.getElementById('skuVal');

    const simHoursSaved = document.getElementById('simHoursSaved');
    const simCostSaved = document.getElementById('simCostSaved');
    const simAccuracy = document.getElementById('simAccuracy');

    function updateSimCalculations() {
      if (!teamSizeSlider || !revenueSlider || !skuSlider) return;

      const team = parseInt(teamSizeSlider.value, 10);
      const rev = parseInt(revenueSlider.value, 10);
      const skus = parseInt(skuSlider.value, 10);

      if (teamSizeVal) teamSizeVal.textContent = `${team} Members`;
      if (revenueVal) revenueVal.textContent = `₹${rev} Crore`;
      if (skuVal) skuVal.textContent = `${skus} SKUs`;

      // 80% automation savings formula benchmark
      const hoursSaved = Math.round(team * 4);
      const costSavedLakhs = (team * 0.06).toFixed(1);
      const accuracyPct = Math.min(99.5, 95 + (skus / 200)).toFixed(1);

      if (simHoursSaved) simHoursSaved.textContent = `${hoursSaved} Hours / Mo`;
      if (simCostSaved) simCostSaved.textContent = `₹${costSavedLakhs} Lakhs`;
      if (simAccuracy) simAccuracy.textContent = `${accuracyPct}%`;
    }

    [teamSizeSlider, revenueSlider, skuSlider].forEach(slider => {
      slider?.addEventListener('input', updateSimCalculations);
    });

    updateSimCalculations();
  }

  // ═══════════════════════════════════════
  // 04 · PERSONA RENDER ENGINE
  // ═══════════════════════════════════════
  function renderPersona(personaKey) {
    const data = resumes[personaKey];
    if (!data) return;

    const roleTitle = document.getElementById('personaRoleTitle');
    const roleSubtitle = document.getElementById('personaRoleSubtitle');
    const summaryText = document.getElementById('personaSummaryText');
    const resumeLink = document.getElementById('personaResumeLink');
    const bulletsList = document.getElementById('personaBulletsList');
    const skillsTags = document.getElementById('personaSkillsTags');
    const miniStats = document.getElementById('personaMiniStats');

    if (roleTitle) roleTitle.textContent = data.roleTitle;
    if (roleSubtitle) roleSubtitle.textContent = data.roleSubtitle;
    if (summaryText) summaryText.textContent = data.summary;
    if (resumeLink) resumeLink.href = data.resumeFile;

    // Render Bullets from first experience
    if (bulletsList && data.experience && data.experience[0]) {
      bulletsList.innerHTML = data.experience[0].bullets.slice(0, 5).map(b => `<li>${b}</li>`).join('');
    }

    // Render Skills Tags
    if (skillsTags && data.skills) {
      skillsTags.innerHTML = data.skills.map(s => `<span class="skill-tag">${s}</span>`).join('');
    }

    // Render Mini Stats
    if (miniStats && data.stats) {
      miniStats.innerHTML = data.stats.map(s => `
        <div class="p-stat-item">
          <div class="p-stat-val">${s.value}</div>
          <div class="p-stat-lbl">${s.label}</div>
        </div>
      `).join('');
    }

    // Also update Navbar resume button target
    const navResumeBtn = document.getElementById('navResumeBtn');
    if (navResumeBtn) navResumeBtn.href = data.resumeFile;
  }

  // ═══════════════════════════════════════
  // 05 · CASE STUDY DRAWER MODAL
  // ═══════════════════════════════════════
  function openDrawer(mod) {
    activeModuleForDrawer = mod;

    document.getElementById('drawerBadge').textContent = mod.product?.badge || 'Module';
    document.getElementById('drawerTitle').textContent = mod.strategy?.title || 'Module Title';
    document.getElementById('drawerCategory').textContent = `Category: ${mod.category.toUpperCase()}`;

    renderDrawerTabContent('overview');

    // Reset drawer tabs active state
    document.querySelectorAll('.drawer-tab').forEach(t => t.classList.remove('active'));
    document.querySelector('.drawer-tab[data-dtab="overview"]')?.classList.add('active');

    drawerBackdrop.classList.remove('hidden');
    moduleDrawer.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawerBackdrop.classList.add('hidden');
    moduleDrawer.classList.add('hidden');
    document.body.style.overflow = '';
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
            <h4 class="drawer-section-h4">Research Title</h4>
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
            <h4 class="drawer-section-h4">Methodology</h4>
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
  // 06 · EVENT LISTENERS
  // ═══════════════════════════════════════
  function setupEventListeners() {
    // Theme Toggle Listener
    themeToggleBtn?.addEventListener('click', () => {
      const isDark = document.body.classList.contains('dark-theme');
      setTheme(isDark ? 'light' : 'dark');
    });

    // Scroll Reading Progress Bar
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / (docHeight || 1)) * 100;
      if (progressBar) progressBar.style.width = `${progress}%`;
    });

    // Bento Card Clicks
    document.querySelectorAll('.bento-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        const mod = modulesData.find(m => m.id === id);
        if (mod) openDrawer(mod);
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
      });
    }

    // Shortcut '/' to focus search
    document.addEventListener('keydown', (e) => {
      if (e.key === '/' && document.activeElement !== searchInput) {
        e.preventDefault();
        searchInput.focus();
      }
      if (e.key === 'Escape') {
        closeDrawer();
      }
    });

    // Category Pills
    document.querySelectorAll('.cat-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        currentCategory = pill.getAttribute('data-cat');
        updateCategoryPillsUI();
        renderModules();
      });
    });

    // Lens Buttons
    document.querySelectorAll('.lens-btn').forEach(btn => {
      btn.addEventListener('click', () => {
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
        currentView = 'grid';
        btnGridView.classList.add('active');
        btnGraphView.classList.remove('active');
        btnTableView.classList.remove('active');
        renderModules();
      });

      btnGraphView.addEventListener('click', () => {
        currentView = 'graph';
        btnGraphView.classList.add('active');
        btnGridView.classList.remove('active');
        btnTableView.classList.remove('active');
        renderModules();
      });

      btnTableView.addEventListener('click', () => {
        currentView = 'table';
        btnTableView.classList.add('active');
        btnGridView.classList.remove('active');
        btnGraphView.classList.remove('active');
        renderModules();
      });
    }

    // Persona Selector Buttons
    document.querySelectorAll('.persona-tab-btn, .persona-nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        currentPersona = btn.getAttribute('data-persona');
        
        document.querySelectorAll('.persona-tab-btn').forEach(b => {
          b.classList.toggle('active', b.getAttribute('data-persona') === currentPersona);
        });
        document.querySelectorAll('.persona-nav-btn').forEach(b => {
          b.classList.toggle('active', b.getAttribute('data-persona') === currentPersona);
        });

        renderPersona(currentPersona);
      });
    });

    // Drawer Listeners
    closeDrawerBtn?.addEventListener('click', closeDrawer);
    drawerBackdrop?.addEventListener('click', closeDrawer);

    document.querySelectorAll('.drawer-tab').forEach(tab => {
      tab.addEventListener('click', () => {
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
  // 07 · MASCOT & CURSOR INTERACTION
  // ═══════════════════════════════════════
  function initMascotAndCursor() {
    const leftPupil = document.getElementById('leftPupil');
    const rightPupil = document.getElementById('rightPupil');
    const mascotHeadGroup = document.getElementById('mascotHeadGroup');
    const mascotFrame = document.getElementById('heroMascotFrame');
    const mascotStatusText = document.getElementById('mascotStatusText');

    const cursorDot = document.getElementById('cursorDot');
    const cursorRing = document.getElementById('cursorRing');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (cursorDot) {
        cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      }

      if (mascotFrame && leftPupil && rightPupil) {
        const rect = mascotFrame.getBoundingClientRect();
        const mascotCenterX = rect.left + rect.width / 2;
        const mascotCenterY = rect.top + rect.height / 2;

        const deltaX = mouseX - mascotCenterX;
        const deltaY = mouseY - mascotCenterY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        const maxOffset = 6;
        const offsetX = (deltaX / (distance || 1)) * Math.min(distance / 20, maxOffset);
        const offsetY = (deltaY / (distance || 1)) * Math.min(distance / 20, maxOffset);

        leftPupil.setAttribute('cx', 75 + offsetX);
        leftPupil.setAttribute('cy', 85 + offsetY);
        rightPupil.setAttribute('cx', 125 + offsetX);
        rightPupil.setAttribute('cy', 85 + offsetY);

        if (mascotHeadGroup) {
          const rotX = Math.min(Math.max(-deltaY / 30, -8), 8);
          const rotY = Math.min(Math.max(deltaX / 30, -8), 8);
          mascotHeadGroup.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
          mascotHeadGroup.style.transformOrigin = '100px 90px';
        }
      }

      if (e.clientY <= 30 && mascotStatusText) {
        mascotStatusText.textContent = "Don't leave yet! Explore all 24 Modules below 🚀";
      }
    });

    function animateCursorRing() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;

      if (cursorRing) {
        cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;
      }
      requestAnimationFrame(animateCursorRing);
    }
    animateCursorRing();

    document.addEventListener('mouseover', (e) => {
      if (e.target.closest('a, button, .module-card, .bento-card, .graph-node-card, .persona-tab-btn')) {
        cursorRing?.classList.add('active-hover');
      } else {
        cursorRing?.classList.remove('active-hover');
      }
    });

    function blinkMascot() {
      if (leftPupil && rightPupil) {
        leftPupil.style.transform = 'scaleY(0.1)';
        rightPupil.style.transform = 'scaleY(0.1)';

        setTimeout(() => {
          leftPupil.style.transform = 'scaleY(1)';
          rightPupil.style.transform = 'scaleY(1)';
        }, 150);
      }
      const nextBlink = Math.random() * 4000 + 2000;
      setTimeout(blinkMascot, nextBlink);
    }
    blinkMascot();
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

  // Run App
  init();
});
