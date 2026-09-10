/* ═══════════════════════════════════════════════════════════════
   PRATAP JINDAL — AI ENGINEER & OPERATIONS ARCHITECT
   Client-Side Controller (Pristine Daylight Aesthetic)
   Zero-Gimmick, Pure Vanilla JS, High Reliability
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  // Global Data Injection
  const allModules = (typeof projectData !== 'undefined') ? projectData : (window.projectData || []);
  const profile = (typeof masterProfile !== 'undefined') ? masterProfile : (window.masterProfile || (typeof resumeData !== 'undefined' ? (resumeData.master || resumeData.default) : (window.resumeData ? window.resumeData.master : {})));

  // ═══════════════════════════════════════
  // 01 · 24-SYSTEM ENTERPRISE LABORATORY
  // ═══════════════════════════════════════
  const systemsGrid = document.getElementById('systemsGrid');
  const categoryFilterPills = document.getElementById('categoryFilterPills');
  const systemsSearchInput = document.getElementById('systemsSearchInput');

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
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--text-dim);">
          <p style="font-size: 1.1rem; font-weight: 600; color: var(--text-primary);">No matching systems found.</p>
          <p style="font-size: 0.88rem; margin-top: 0.4rem;">Try adjusting your search query or choosing another category.</p>
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
        <article class="system-card" data-modid="${mod.id}" tabindex="0" role="button" aria-label="Inspect spec for ${title}">
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
            <span>Inspect Specification</span>
            <span>&rarr;</span>
          </div>
        </article>
      `;
    }).join('');

    // Attach click listeners to cards
    systemsGrid.querySelectorAll('.system-card').forEach(card => {
      card.addEventListener('click', () => {
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
    const pills = categoryFilterPills.querySelectorAll('.cat-pill');
    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        activeCategory = pill.getAttribute('data-cat') || 'all';
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

  // Wire flagship card buttons
  document.querySelectorAll('.open-module-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-modid');
      const mod = allModules.find(m => m.id === id);
      if (mod) openDrawer(mod);
    });
  });

  // ═══════════════════════════════════════
  // 02 · CASE STUDY DRAWER MODAL
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
          <p class="drawer-text">${mod.product?.targetUsers || 'Executive leadership, operations managers, and frontline staff.'}</p>
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
          <div style="display: flex; flex-wrap: wrap; gap: 0.45rem; margin-top: 0.75rem;">
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
  // 03 · CALIBRATED ROI SIMULATOR
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
  // 04 · 1-CLICK CLIPBOARD CONTROLLER
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
    }, 3000);
  }

  document.querySelectorAll('.contact-copy-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
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
  // 05 · UNIVERSAL RESUME ROUTING
  // ═══════════════════════════════════════
  const resumeFileName = profile.resumeFile || 'resume.pdf';
  const downloadFileName = profile.downloadFileName || 'Pratap_Jindal_Resume.pdf';

  document.querySelectorAll('a[href*="resume"], a[href*="Resume"], #navResumeBtn, #heroResumeBtn').forEach(link => {
    link.setAttribute('href', resumeFileName);
    link.setAttribute('download', downloadFileName);
    link.setAttribute('target', '_blank');
  });
});
