/* ═══════════════════════════════════════════════════════════════
   THE SYSTEMS ATELIER — PRATAP JINDAL
   Executive Portfolio Controller (2026 Awwwards Standard)
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  // Global Data Injection
  const allModules = (typeof projectData !== 'undefined') ? projectData : (window.projectData || []);
  const profile = (typeof masterProfile !== 'undefined') ? masterProfile : (window.masterProfile || (typeof resumeData !== 'undefined' ? (resumeData.master || resumeData.default) : (window.resumeData ? window.resumeData.master : {})));

  // ═══════════════════════════════════════
  // 01 · TACTILE WEB AUDIO SYNTHESIZER
  // ═══════════════════════════════════════
  class SoundEngine {
    constructor() {
      this.ctx = null;
      this.enabled = localStorage.getItem('pj_sound_enabled') === 'true';
      this.initBtn();
    }

    initContext() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    initBtn() {
      const btn = document.getElementById('soundToggleBtn');
      if (!btn) return;
      this.updateBtnUI(btn);
      btn.addEventListener('click', () => {
        this.initContext();
        this.enabled = !this.enabled;
        localStorage.setItem('pj_sound_enabled', this.enabled);
        this.updateBtnUI(btn);
        if (this.enabled) this.playTone(520, 0.08, 'triangle');
      });
    }

    updateBtnUI(btn) {
      if (this.enabled) {
        btn.classList.add('active');
        btn.setAttribute('title', 'Tactile Sound: ON (Click to Mute)');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('title', 'Tactile Sound: OFF (Click to Enable)');
      }
    }

    playTone(freq = 440, duration = 0.05, type = 'sine') {
      if (!this.enabled) return;
      this.initContext();
      if (!this.ctx) return;

      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + duration);
      } catch (e) {
        // Fallback silently if audio blocked
      }
    }

    playClick() { this.playTone(800, 0.04, 'sine'); }
    playTab() { this.playTone(480, 0.06, 'triangle'); }
    playSuccess() { this.playTone(650, 0.12, 'sine'); }
  }

  const sound = new SoundEngine();

  // ═══════════════════════════════════════
  // 01.5 · THEME CONTROLLER (DEFAULT: ARCHITECTURAL DAYLIGHT)
  // ═══════════════════════════════════════
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  // Default to light theme for CD personality (Conscientious & Dominant)
  const savedTheme = localStorage.getItem('pj_theme') || 'light';

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
      if (themeToggleBtn) {
        themeToggleBtn.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
        themeToggleBtn.setAttribute('title', 'Switch to Daylight Theme');
      }
    } else {
      document.body.classList.remove('dark-theme');
      if (themeToggleBtn) {
        themeToggleBtn.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
        themeToggleBtn.setAttribute('title', 'Switch to Dark Theme');
      }
    }
    localStorage.setItem('pj_theme', theme);
  }

  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      sound.playClick();
      const current = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  // ═══════════════════════════════════════
  // 02 · LIVE CHANDIGARH IST CLOCK
  // ═══════════════════════════════════════
  function updateClock() {
    const clockEl = document.getElementById('clockDigits');
    if (!clockEl) return;
    const now = new Date();
    // Format to Asia/Kolkata (IST)
    const options = {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };
    try {
      const timeStr = new Intl.DateTimeFormat('en-GB', options).format(now);
      clockEl.textContent = `IST ${timeStr}`;
    } catch (e) {
      clockEl.textContent = `IST ${now.toTimeString().substring(0, 8)}`;
    }
  }
  updateClock();
  setInterval(updateClock, 1000);

  // ═══════════════════════════════════════
  // 03 · 3-LENS EXECUTIVE DOSSIER CONTROLLER
  // ═══════════════════════════════════════
  const lensNav = document.getElementById('lensNav');
  const lensTitle = document.getElementById('lensTitle');
  const lensHeadline = document.getElementById('lensHeadline');
  const lensSummary = document.getElementById('lensSummary');
  const lensMetricsStrip = document.getElementById('lensMetricsStrip');
  const lensDeliverablesList = document.getElementById('lensDeliverablesList');

  if (lensNav && profile.lenses) {
    const tabs = lensNav.querySelectorAll('.lens-tab-btn');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        sound.playTab();
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const key = tab.getAttribute('data-lens');
        renderLens(key);
      });
    });
  }

  function renderLens(key) {
    const data = profile.lenses && profile.lenses[key];
    if (!data) return;

    if (lensTitle) lensTitle.textContent = data.title;
    if (lensHeadline) lensHeadline.textContent = data.headline;
    if (lensSummary) lensSummary.textContent = data.summary;

    if (lensMetricsStrip && data.metrics) {
      lensMetricsStrip.innerHTML = data.metrics.map(m => `
        <div class="lens-metric-box">
          <div class="lmb-val">${m.val}</div>
          <div class="lmb-lbl">${m.lbl}</div>
        </div>
      `).join('');
    }

    if (lensDeliverablesList && data.deliverables) {
      lensDeliverablesList.innerHTML = data.deliverables.map(d => `
        <li class="lens-deliverable-item">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          <span>${d}</span>
        </li>
      `).join('');
    }
  }
  window.renderLens = renderLens;

  // ═══════════════════════════════════════
  // 04 · 24-SYSTEM INTERACTIVE LABORATORY
  // ═══════════════════════════════════════
  const systemsGrid = document.getElementById('systemsGrid') || document.getElementById('projectsGrid');
  const categoryFilterPills = document.getElementById('categoryFilterPills') || document.querySelector('.projects-category-pills');
  const systemsSearchInput = document.getElementById('systemsSearchInput') || document.getElementById('registrySearch');

  // Category mapping for the 24 modules
  function getModuleCategoryKey(mod) {
    const id = mod.id;
    if (['MOD_01', 'MOD_02', 'MOD_16'].includes(id)) return 'ai';
    if (['MOD_04', 'MOD_10', 'MOD_14', 'MOD_15', 'MOD_17', 'MOD_20'].includes(id)) return 'supply';
    if (['MOD_03', 'MOD_07', 'MOD_09', 'MOD_11', 'MOD_19', 'MOD_22'].includes(id)) return 'sales';
    if (['MOD_06', 'MOD_23'].includes(id)) return 'creative';
    return 'operations';
  }

  let activeCategory = 'all';
  let activeSearch = '';

  function renderSystems() {
    if (!systemsGrid) return;
    const filtered = allModules.filter(mod => {
      const catKey = getModuleCategoryKey(mod);
      const matchesCat = (activeCategory === 'all') || (catKey === activeCategory);
      if (!matchesCat) return false;

      if (!activeSearch) return true;
      const query = activeSearch.toLowerCase();
      const title = (mod.strategy?.title || mod.product?.badge || '').toLowerCase();
      const desc = (mod.strategy?.problem || mod.product?.overview || '').toLowerCase();
      const stack = (mod.engineering?.stack || []).join(' ').toLowerCase();
      const id = (mod.id || '').toLowerCase();
      return title.includes(query) || desc.includes(query) || stack.includes(query) || id.includes(query);
    });

    if (filtered.length === 0) {
      systemsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
          <p style="font-family: var(--font-display); font-size: 1.25rem;">No matching systems found.</p>
          <p style="font-size: 0.88rem; margin-top: 0.5rem;">Try adjusting your search query or switching categories.</p>
        </div>
      `;
      return;
    }

    systemsGrid.innerHTML = filtered.map(mod => {
      const title = mod.strategy?.title || 'System Module';
      const desc = mod.strategy?.problem || mod.product?.overview || 'Production operations system designed for enterprise efficiency.';
      const stack = (mod.engineering?.stack || ['Looker', 'Apps Script']).slice(0, 3);
      const catKey = getModuleCategoryKey(mod).toUpperCase();

      return `
        <article class="system-card" data-modid="${mod.id}" tabindex="0" role="button" aria-label="View case study for ${title}">
          <div>
            <div class="sys-header">
              <span class="sys-id-tag">${mod.id}</span>
              <span class="sys-cat-tag">${catKey}</span>
            </div>
            <h3 class="sys-title">${title}</h3>
            <p class="sys-desc">${desc}</p>
            <div class="sys-stack-row">
              ${stack.map(s => `<span class="sys-tag">${s}</span>`).join('')}
            </div>
          </div>
          <div class="sys-footer">
            <span>Inspect Spec</span>
            <span>&rarr;</span>
          </div>
        </article>
      `;
    }).join('');

    // Attach click listeners to cards
    systemsGrid.querySelectorAll('.system-card').forEach(card => {
      card.addEventListener('click', () => {
        sound.playClick();
        const id = card.getAttribute('data-modid');
        const mod = allModules.find(m => m.id === id);
        if (mod) openDrawer(mod);
      });
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          card.click();
        }
      });
    });
  }

  if (categoryFilterPills) {
    const pills = categoryFilterPills.querySelectorAll('.cat-pill, .filter-pill');
    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        sound.playTab();
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        activeCategory = pill.getAttribute('data-cat') || pill.getAttribute('data-filter') || 'all';
        renderSystems();
      });
    });
  }

  if (systemsSearchInput) {
    systemsSearchInput.addEventListener('input', (e) => {
      activeSearch = e.target.value.trim();
      renderSystems();
    });
  }

  // Initial Systems Render
  renderSystems();

  // Also wire flagship card buttons
  document.querySelectorAll('.open-module-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      sound.playClick();
      const id = btn.getAttribute('data-modid');
      const mod = allModules.find(m => m.id === id);
      if (mod) openDrawer(mod);
    });
  });

  // ═══════════════════════════════════════
  // 05 · CASE STUDY DRAWER MODAL
  // ═══════════════════════════════════════
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const moduleDrawer = document.getElementById('moduleDrawer');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const drawerBadge = document.getElementById('drawerBadge');
  const drawerCategory = document.getElementById('drawerCategory');
  const drawerTitle = document.getElementById('drawerTitle');
  const drawerBody = document.getElementById('drawerBody');

  let activeDrawerModule = null;
  let activeDrawerTab = 'overview';

  function openDrawer(mod) {
    if (!mod || !moduleDrawer) return;
    activeDrawerModule = mod;
    activeDrawerTab = 'overview';
    window.location.hash = `mod=${mod.id}`;

    if (drawerBadge) drawerBadge.textContent = mod.id;
    if (drawerCategory) drawerCategory.textContent = getModuleCategoryKey(mod).toUpperCase();
    if (drawerTitle) drawerTitle.textContent = mod.strategy?.title || 'System Specification';

    document.querySelectorAll('.drawer-tab').forEach(t => {
      t.classList.toggle('active', t.getAttribute('data-dtab') === 'overview');
    });

    renderDrawerTab();

    drawerBackdrop.classList.add('open');
    moduleDrawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (!moduleDrawer) return;
    drawerBackdrop.classList.remove('open');
    moduleDrawer.classList.remove('open');
    document.body.style.overflow = '';
    history.replaceState(null, null, ' ');
  }
  window.openDrawer = openDrawer;
  window.closeDrawer = closeDrawer;

  if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && moduleDrawer && moduleDrawer.classList.contains('open')) {
      closeDrawer();
    }
  });

  document.querySelectorAll('.drawer-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      sound.playTab();
      document.querySelectorAll('.drawer-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeDrawerTab = tab.getAttribute('data-dtab');
      renderDrawerTab();
    });
  });

  function renderDrawerTab() {
    if (!drawerBody || !activeDrawerModule) return;
    const mod = activeDrawerModule;

    if (activeDrawerTab === 'overview') {
      drawerBody.innerHTML = `
        <div class="drawer-section">
          <h4 class="drawer-section-h4">Problem Statement &amp; Bottleneck</h4>
          <p class="drawer-text">${mod.strategy?.problem || 'Lack of real-time operational visibility and manual clerical drag.'}</p>
        </div>
        <div class="drawer-section">
          <h4 class="drawer-section-h4">Engineered Solution</h4>
          <p class="drawer-text">${mod.product?.overview || mod.strategy?.solution || 'Automated decision infrastructure and custom software workflows.'}</p>
        </div>
        <div class="drawer-section">
          <h4 class="drawer-section-h4">Key Target Users</h4>
          <p class="drawer-text">${mod.product?.targetUsers || 'Executive leadership, operations managers, and field staff.'}</p>
        </div>
      `;
    } else if (activeDrawerTab === 'architecture') {
      drawerBody.innerHTML = `
        <div class="drawer-section">
          <h4 class="drawer-section-h4">Data Flow &amp; System Architecture</h4>
          <p class="drawer-text">${mod.engineering?.architecture || 'Automated ingestion pipelines connecting Google Apps Script, REST APIs, and executive Looker Studio dashboards.'}</p>
        </div>
        <div class="drawer-section">
          <h4 class="drawer-section-h4">Data Ingestion &amp; Schema</h4>
          <p class="drawer-text">${mod.engineering?.dataFlow || 'Real-time webhook ingestion with automated timestamping, field deduplication, and zero cache latency.'}</p>
        </div>
      `;
    } else if (activeDrawerTab === 'stack') {
      const stack = mod.engineering?.stack || ['Google Apps Script', 'Looker Studio'];
      drawerBody.innerHTML = `
        <div class="drawer-section">
          <h4 class="drawer-section-h4">Production Technologies Used</h4>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.75rem;">
            ${stack.map(s => `<span class="sys-tag" style="font-size: 0.8rem; padding: 0.35rem 0.75rem;">${s}</span>`).join('')}
          </div>
        </div>
        <div class="drawer-section">
          <h4 class="drawer-section-h4">Engineering Standards</h4>
          <p class="drawer-text">Strict client-side optimization, zero unnecessary dependencies, automated error-catching, and robust audit logging.</p>
        </div>
      `;
    } else if (activeDrawerTab === 'impact') {
      drawerBody.innerHTML = `
        <div class="drawer-section">
          <h4 class="drawer-section-h4">Verified Business Outcomes</h4>
          <p class="drawer-text">${mod.strategy?.impact || 'Eliminated recurring manual compilation effort, improved decision accuracy, and enabled instant executive visibility.'}</p>
        </div>
        <div class="drawer-section">
          <h4 class="drawer-section-h4">Operational Governance</h4>
          <p class="drawer-text">Accompanied by full SOP documentation, training modules for non-technical employees, and zero key-person dependency risk.</p>
        </div>
      `;
    }
  }

  // Check URL hash for direct deep links (e.g. #mod=MOD_01)
  if (window.location.hash.startsWith('#mod=')) {
    const targetId = window.location.hash.replace('#mod=', '');
    const found = allModules.find(m => m.id === targetId);
    if (found) {
      setTimeout(() => openDrawer(found), 300);
    }
  }

  // ═══════════════════════════════════════
  // 06 · CALIBRATED ROI SIMULATOR
  // ═══════════════════════════════════════
  const sliderTeamSize = document.getElementById('sliderTeamSize');
  const sliderHoursPerFte = document.getElementById('sliderHoursPerFte');
  const sliderSkuCount = document.getElementById('sliderSkuCount');

  const valTeamSize = document.getElementById('valTeamSize');
  const valHoursPerFte = document.getElementById('valHoursPerFte');
  const valSkuCount = document.getElementById('valSkuCount');

  const outHoursSaved = document.getElementById('outHoursSaved');
  const outFteCapacity = document.getElementById('outFteCapacity');
  const outItrBoost = document.getElementById('outItrBoost');

  function calculateROI() {
    if (!sliderTeamSize || !sliderHoursPerFte) return;
    const team = parseInt(sliderTeamSize.value, 10);
    const hours = parseInt(sliderHoursPerFte.value, 10);
    const skus = sliderSkuCount ? parseInt(sliderSkuCount.value, 10) : 500;

    if (valTeamSize) valTeamSize.textContent = `${team} Members`;
    if (valHoursPerFte) valHoursPerFte.textContent = `${hours} Hours / Member`;
    if (valSkuCount) valSkuCount.textContent = `${skus} Active SKUs`;

    // 80% manual reporting reduction proven benchmark
    const totalWeeklyHours = team * hours;
    const weeklyHoursSaved = Math.round(totalWeeklyHours * 0.8);
    const annualHoursSaved = weeklyHoursSaved * 52;
    const fteEquiv = (annualHoursSaved / 2080).toFixed(1);

    if (outHoursSaved) outHoursSaved.textContent = `${annualHoursSaved.toLocaleString()} hrs`;
    if (outFteCapacity) outFteCapacity.textContent = `${fteEquiv} FTEs`;
    if (outItrBoost) outItrBoost.textContent = `+20%`;
  }

  if (sliderTeamSize) sliderTeamSize.addEventListener('input', calculateROI);
  if (sliderHoursPerFte) sliderHoursPerFte.addEventListener('input', calculateROI);
  if (sliderSkuCount) sliderSkuCount.addEventListener('input', calculateROI);
  calculateROI();

  // ═══════════════════════════════════════
  // 07 · 1-CLICK CLIPBOARD CONTROLLER
  // ═══════════════════════════════════════
  const toast = document.getElementById('portfolioToast');
  const toastMsg = document.getElementById('toastMsg');
  let toastTimer = null;

  function showToast(msg = 'Email copied to clipboard!') {
    if (!toast) return;
    if (toastMsg) toastMsg.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  document.querySelectorAll('.contact-copy-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      sound.playSuccess();
      const email = btn.getAttribute('data-email') || 'pratapjindal812@gmail.com';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(() => {
          showToast(`Copied: ${email}`);
        }).catch(() => {
          fallbackCopy(email);
        });
      } else {
        fallbackCopy(email);
      }
    });
  });

  function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      showToast(`Copied: ${text}`);
    } catch (err) {
      prompt('Copy email address:', text);
    }
    document.body.removeChild(textArea);
  }

  // ═══════════════════════════════════════
  // 08 · UNIVERSAL RESUME ROUTING
  // ═══════════════════════════════════════
  const resumeFileName = profile.resumeFile || 'resume.pdf';
  const downloadFileName = profile.downloadFileName || 'Pratap_Jindal_Resume.pdf';

  document.querySelectorAll('a[href*="resume"], a[href*="Resume"], #navResumeBtn, #heroResumeBtn').forEach(link => {
    link.setAttribute('href', resumeFileName);
    link.setAttribute('download', downloadFileName);
    link.setAttribute('target', '_blank');
  });
});
