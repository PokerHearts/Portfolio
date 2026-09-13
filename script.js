/**
 * Pratap Jindal — Interactive Executive Resume & Recruiter Cockpit
 * 
 * Features:
 * 1. Direct Contact Triggers (Phone native call, Email clipboard copy with toast, LinkedIn/GitHub external links)
 * 2. Click-to-Expand Granular Details (Education topped subjects, Projects with GitHub repos, Experience milestones)
 * 3. Recruiter Live Notes Engine (sessionStorage backed — vanishes on session refresh as requested)
 * 4. Recruiter Rating & Scorecard (1–5 Stars, Hiring Decision Pills, Exportable Evaluation Dossier)
 * 5. Theme Switcher (Ivory paper, Crisp monochrome, Obsidian slate)
 * 6. Background Telemetry Ledger & Secret Admin Cockpit (Ctrl+Shift+A or ?admin=audit)
 */

(function () {
  'use strict';

  // Session ID for telemetry tracking
  const SESSION_KEY = 'pratap_recruiter_notes';
  const AUDIT_LEDGER_KEY = 'pratap_telemetry_audit_ledger';
  const WEBHOOK_KEY = 'pratap_telemetry_webhook_url';
  
  let currentSessionId = sessionStorage.getItem('pratap_session_id');
  if (!currentSessionId) {
    currentSessionId = 'sess_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
    sessionStorage.setItem('pratap_session_id', currentSessionId);
  }

  // --- 1. DIRECT ACTION CONTACT TRIGGERS ---
  const emailBtn = document.getElementById('contactEmailBtn');
  const toastEl = document.getElementById('toastNotification');
  const toastMsg = document.getElementById('toastMessage');
  let toastTimer = null;

  function showToast(message) {
    if (!toastEl) return;
    if (toastMsg) toastMsg.textContent = message;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.classList.remove('show');
    }, 3200);
  }

  if (emailBtn) {
    emailBtn.addEventListener('click', async () => {
      const email = 'pratapjindal812@gmail.com';
      let copied = false;
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(email);
          copied = true;
        }
      } catch (err) {}

      if (!copied) {
        try {
          const tempInput = document.createElement('textarea');
          tempInput.value = email;
          tempInput.style.position = 'fixed';
          tempInput.style.opacity = '0';
          document.body.appendChild(tempInput);
          tempInput.focus();
          tempInput.select();
          copied = document.execCommand('copy');
          document.body.removeChild(tempInput);
        } catch (e) {}
      }

      showToast('✓ Copied ' + email + ' to clipboard!');
      logTelemetryEvent('action_email_copied', { email });
    });
  }

  const phoneLink = document.getElementById('contactPhone');
  if (phoneLink) {
    phoneLink.addEventListener('click', () => {
      logTelemetryEvent('action_phone_clicked', { phone: '+91 70090 19719' });
    });
  }

  const linkedinLink = document.getElementById('contactLinkedin');
  if (linkedinLink) {
    linkedinLink.addEventListener('click', () => {
      logTelemetryEvent('action_linkedin_clicked', {});
    });
  }

  const githubLink = document.getElementById('contactGithub');
  if (githubLink) {
    githubLink.addEventListener('click', () => {
      logTelemetryEvent('action_github_clicked', {});
    });
  }

  // --- 2. CLICK-TO-EXPAND INLINE DETAILS HANDLERS ---
  const expandButtons = document.querySelectorAll('.inline-expand-btn');

  expandButtons.forEach(btn => {
    const targetId = btn.getAttribute('aria-controls');
    const panel = document.getElementById(targetId);
    if (!panel) return;

    btn.addEventListener('click', () => {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        btn.setAttribute('aria-expanded', 'false');
        panel.hidden = true;
      } else {
        btn.setAttribute('aria-expanded', 'true');
        panel.hidden = false;

        // Log telemetry event for Pratap
        const entry = btn.closest('.flowing-entry');
        const title = entry?.querySelector('.entry-role')?.textContent || targetId;
        logTelemetryEvent('section_expanded', { id: targetId, title: title.trim() });
      }
    });
  });

  // --- 3. THEME SWITCHER ---
  const themeButtons = document.querySelectorAll('.theme-btn');
  const savedTheme = sessionStorage.getItem('pratap_resume_theme') || 'theme-ivory';
  applyTheme(savedTheme);

  function applyTheme(themeName) {
    document.body.classList.remove('theme-ivory', 'theme-white', 'theme-obsidian');
    document.body.classList.add(themeName);
    themeButtons.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-theme') === themeName);
    });
    sessionStorage.setItem('pratap_resume_theme', themeName);
  }

  themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const theme = btn.getAttribute('data-theme');
      if (theme) applyTheme(theme);
    });
  });

  // --- 4. RECRUITER ASSESSMENT MODE TOGGLE ---
  const modeToggle = document.getElementById('recruiterModeToggle');
  if (modeToggle) {
    modeToggle.addEventListener('change', (e) => {
      if (e.target.checked) {
        document.body.classList.remove('clean-resume-mode');
        showToast('Recruiter live note pads enabled');
      } else {
        document.body.classList.add('clean-resume-mode');
        showToast('Clean resume document view enabled');
      }
    });
  }

  // --- 5. RECRUITER LIVE NOTES ENGINE (sessionStorage) ---
  const noteTextareas = document.querySelectorAll('.note-textarea');
  let notesState = {};

  // If the page was refreshed / reloaded, clear on-screen session notes so they disappear
  try {
    const navEntries = performance.getEntriesByType('navigation');
    if (navEntries.length > 0 && navEntries[0].type === 'reload') {
      sessionStorage.removeItem(SESSION_KEY);
    }
  } catch (e) {}

  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (raw) notesState = JSON.parse(raw);
  } catch (e) {
    notesState = {};
  }

  // Populate existing notes if present in this session
  noteTextareas.forEach(textarea => {
    const key = textarea.getAttribute('data-key');
    if (key && notesState[key]) {
      textarea.value = notesState[key];
    }

    let debounceTimer = null;
    textarea.addEventListener('input', () => {
      const section = textarea.closest('.recruiter-note-box')?.getAttribute('data-section') || 'overall';
      const indicator = document.getElementById('saveStatus-' + section);
      if (indicator) {
        indicator.textContent = 'Saving...';
        indicator.classList.add('saving');
      }

      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        notesState[key] = textarea.value;
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(notesState));
        if (indicator) {
          indicator.textContent = 'Autosaved';
          indicator.classList.remove('saving');
        }
        // Telemetry update in background
        syncTelemetryNotes(key, textarea.value);
      }, 400);
    });
  });

  // Scorecard Rating Stars
  const starBtns = document.querySelectorAll('.star-btn');
  let currentRating = notesState.rating || 5;
  setRatingDisplay(currentRating);

  starBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const rating = parseInt(btn.getAttribute('data-rating'), 10) || 5;
      currentRating = rating;
      notesState.rating = rating;
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(notesState));
      setRatingDisplay(rating);
      logTelemetryEvent('rating_updated', { rating });
    });
  });

  function setRatingDisplay(rating) {
    starBtns.forEach(btn => {
      const starVal = parseInt(btn.getAttribute('data-rating'), 10);
      btn.classList.toggle('active', starVal <= rating);
    });
  }

  // Scorecard Decision Pills
  const decisionPills = document.querySelectorAll('.decision-pill');
  if (notesState.decision) {
    decisionPills.forEach(pill => {
      pill.classList.toggle('active', pill.getAttribute('data-decision') === notesState.decision);
    });
  }

  decisionPills.forEach(pill => {
    pill.addEventListener('click', () => {
      decisionPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const decision = pill.getAttribute('data-decision');
      notesState.decision = decision;
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(notesState));
      logTelemetryEvent('decision_updated', { decision });
    });
  });

  // Clear Session Notes Button
  const btnClearNotes = document.getElementById('btnClearNotes');
  if (btnClearNotes) {
    btnClearNotes.addEventListener('click', () => {
      if (confirm('Clear all live recruiter notes for this session?')) {
        notesState = {};
        sessionStorage.removeItem(SESSION_KEY);
        noteTextareas.forEach(t => t.value = '');
        currentRating = 5;
        setRatingDisplay(5);
        decisionPills.forEach((p, idx) => p.classList.toggle('active', idx === 0));
        showToast('Live notes cleared for this session');
        logTelemetryEvent('notes_cleared', {});
      }
    });
  }

  // --- 6. EXPORT / DOWNLOAD RECRUITER DOSSIER ---
  const btnExportTop = document.getElementById('btnExportNotes');
  const btnDownloadDossier = document.getElementById('btnDownloadDossier');

  function exportRecruiterDossier() {
    const dateStr = new Date().toLocaleDateString('en-US', { dateStyle: 'full' });
    const timeStr = new Date().toLocaleTimeString('en-US');
    const rating = notesState.rating || currentRating || 5;
    const decision = notesState.decision || 'Strong Hire (Fast-Track to Final Round)';

    let content = `# CANDIDATE EVALUATION DOSSIER — PRATAP JINDAL
Document: Management Analyst & Operational Systems Architect
Candidate Contact: +91 70090 19719 | pratapjindal812@gmail.com
LinkedIn: https://www.linkedin.com/in/pratap-jindal/
Evaluation Timestamp: ${dateStr} at ${timeStr}
Session ID: ${currentSessionId}

================================================================================
EXECUTIVE HIRING VERDICT
================================================================================
Match Rating: ${'★'.repeat(rating)}${'☆'.repeat(5 - rating)} (${rating} / 5 Stars)
Assessment Recommendation: ${decision}

Overall Recruiter Synthesis & Interview Agenda:
${notesState.note_overall ? notesState.note_overall.trim() : '(No overall notes recorded)'}

================================================================================
SECTION-BY-SECTION RECRUITER NOTES
================================================================================

[1. Initial Impression & Contact]
${notesState.note_contact ? notesState.note_contact.trim() : '(No notes)'}

[2. Executive Summary & Verified Metrics (₹75 Cr Quota, 18 Modules, 13 Dashboards)]
${notesState.note_summary ? notesState.note_summary.trim() : '(No notes)'}

[3. Professional Experience (Group Biopolis, Bharat Financial Inclusion, Zolostays)]
${notesState.note_experience ? notesState.note_experience.trim() : '(No notes)'}

[4. Technical Projects & Open Source Repos (OmniReader, Fuzzy MCDM, GeoJSON, PrepMaster)]
${notesState.note_projects ? notesState.note_projects.trim() : '(No notes)'}

[5. Education & Academic Pedigree (MBA CGPA 8.83/10, UGC NET Assistant Professor)]
${notesState.note_education ? notesState.note_education.trim() : '(No notes)'}

[6. Competency Matrix & Certifications (Operations, Systems Architecture, AI QA)]
${notesState.note_skills ? notesState.note_skills.trim() : '(No notes)'}

================================================================================
KEY VERIFIED CREDENTIALS FOR VERIFICATION
================================================================================
- MBA (CGPA 8.83/10) — Mittal School of Business & NSE Academy (2021-2023)
- UGC NET Qualified — Assistant Professor in Management (Roll Verified)
- Australian Skills Assessment — ANZSCO 224711 Management Consultant (VETASSESS)
- Tableau Credential — Duke University
- 18 Production Modules Architected & 13 Looker Studio Dashboards Deployed
- Led 72-Member Field Operations Division delivering ₹75 Cr Monthly Targets

Generated live via Pratap Jindal Interactive Executive Dossier.
`;

    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Pratap_Jindal_Recruiter_Evaluation_${new Date().toISOString().slice(0, 10)}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast('✓ Evaluation Dossier downloaded!');
    logTelemetryEvent('dossier_downloaded', { rating, decision });
  }

  if (btnExportTop) btnExportTop.addEventListener('click', exportRecruiterDossier);
  if (btnDownloadDossier) btnDownloadDossier.addEventListener('click', exportRecruiterDossier);

  // Print Handlers
  const btnPrintResume = document.getElementById('btnPrintResume');
  if (btnPrintResume) {
    btnPrintResume.addEventListener('click', () => {
      document.body.classList.remove('print-with-notes');
      window.print();
    });
  }

  const btnPrintAnnotated = document.getElementById('btnPrintAnnotated');
  if (btnPrintAnnotated) {
    btnPrintAnnotated.addEventListener('click', () => {
      document.body.classList.add('print-with-notes');
      window.print();
      setTimeout(() => {
        document.body.classList.remove('print-with-notes');
      }, 2000);
    });
  }

  // --- 7. BACKGROUND NOTES TELEMETRY (For Pratap) ---
  function getAuditLedger() {
    try {
      return JSON.parse(localStorage.getItem(AUDIT_LEDGER_KEY) || '[]');
    } catch (e) {
      return [];
    }
  }

  function saveAuditLedger(ledger) {
    try {
      localStorage.setItem(AUDIT_LEDGER_KEY, JSON.stringify(ledger.slice(-60)));
    } catch (e) {}
  }

  let syncDebounce = null;
  function syncTelemetryNotes(changedKey, value) {
    clearTimeout(syncDebounce);
    syncDebounce = setTimeout(() => {
      const entry = {
        type: 'notes_snapshot',
        timestamp: new Date().toISOString(),
        sessionId: currentSessionId,
        rating: notesState.rating || currentRating,
        decision: notesState.decision || 'Strong Hire',
        changedKey: changedKey,
        notes: { ...notesState }
      };

      const ledger = getAuditLedger();
      ledger.push(entry);
      saveAuditLedger(ledger);
      dispatchWebhookPayload(entry);
      renderAuditLedger();
    }, 1500);
  }

  function logTelemetryEvent(eventType, metadata) {
    const entry = {
      type: eventType,
      timestamp: new Date().toISOString(),
      sessionId: currentSessionId,
      metadata: metadata || {}
    };

    const ledger = getAuditLedger();
    ledger.push(entry);
    saveAuditLedger(ledger);
    dispatchWebhookPayload(entry);
    renderAuditLedger();
  }

  function dispatchWebhookPayload(payload) {
    const webhookUrl = localStorage.getItem(WEBHOOK_KEY);
    if (!webhookUrl || !webhookUrl.startsWith('http')) return;

    try {
      fetch(webhookUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(() => {});
    } catch (e) {}
  }

  // --- 8. ADMIN TELEMETRY MODAL (Ctrl+Shift+A or ?admin=audit) ---
  const adminModal = document.getElementById('adminModal');
  const btnCloseAdmin = document.getElementById('btnCloseAdminModal');
  const btnAdminTrigger = document.getElementById('btnAdminTrigger');
  const webhookInput = document.getElementById('webhookUrlInput');
  const btnSaveWebhook = document.getElementById('btnSaveWebhook');
  const btnTestWebhook = document.getElementById('btnTestWebhook');
  const webhookStatus = document.getElementById('webhookStatusText');
  const ledgerContainer = document.getElementById('auditLedgerContainer');
  const btnClearAudit = document.getElementById('btnClearAuditLedger');

  function openAdminModal() {
    if (!adminModal) return;
    if (webhookInput) {
      webhookInput.value = localStorage.getItem(WEBHOOK_KEY) || '';
      updateWebhookStatusDisplay();
    }
    renderAuditLedger();
    if (typeof adminModal.showModal === 'function') {
      adminModal.showModal();
    } else {
      adminModal.setAttribute('open', '');
    }
  }

  function closeAdminModal() {
    if (!adminModal) return;
    if (typeof adminModal.close === 'function') {
      adminModal.close();
    } else {
      adminModal.removeAttribute('open');
    }
  }

  if (btnCloseAdmin) btnCloseAdmin.addEventListener('click', closeAdminModal);
  if (btnAdminTrigger) btnAdminTrigger.addEventListener('click', openAdminModal);

  // Keyboard shortcut Ctrl+Shift+A or Cmd+Shift+A
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
      e.preventDefault();
      openAdminModal();
    }
  });

  // URL query parameter check ?admin=audit or ?admin=true
  try {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('admin') === 'audit' || urlParams.get('admin') === 'true') {
      setTimeout(openAdminModal, 500);
    }
  } catch (e) {}

  function updateWebhookStatusDisplay() {
    const url = localStorage.getItem(WEBHOOK_KEY);
    if (webhookStatus) {
      if (url) {
        webhookStatus.textContent = 'Active Webhook: ' + url.substring(0, 48) + '...';
        webhookStatus.style.color = '#059669';
      } else {
        webhookStatus.textContent = 'No webhook configured (captured notes stored in local ledger).';
        webhookStatus.style.color = 'var(--text-muted)';
      }
    }
  }

  if (btnSaveWebhook && webhookInput) {
    btnSaveWebhook.addEventListener('click', () => {
      const val = webhookInput.value.trim();
      if (val) {
        localStorage.setItem(WEBHOOK_KEY, val);
        showToast('Webhook URL saved!');
      } else {
        localStorage.removeItem(WEBHOOK_KEY);
        showToast('Webhook cleared');
      }
      updateWebhookStatusDisplay();
    });
  }

  if (btnTestWebhook) {
    btnTestWebhook.addEventListener('click', () => {
      const url = localStorage.getItem(WEBHOOK_KEY);
      if (!url) {
        alert('Please enter and save a Webhook URL first (e.g., Discord or Google Apps Script Web App).');
        return;
      }
      dispatchWebhookPayload({
        type: 'test_ping',
        message: 'Pratap Jindal Resume Telemetry Test Ping',
        timestamp: new Date().toISOString()
      });
      alert('Test ping sent to webhook!');
    });
  }

  if (btnClearAudit) {
    btnClearAudit.addEventListener('click', () => {
      if (confirm('Clear all captured telemetry audit history?')) {
        localStorage.removeItem(AUDIT_LEDGER_KEY);
        renderAuditLedger();
        showToast('Audit ledger cleared');
      }
    });
  }

  function renderAuditLedger() {
    if (!ledgerContainer) return;
    const ledger = getAuditLedger().reverse();
    if (!ledger || ledger.length === 0) {
      ledgerContainer.innerHTML = '<div style="color:var(--text-muted); font-style:italic;">No recruiter activity recorded yet. When recruiters enter notes or click sections, logs will appear here.</div>';
      return;
    }

    ledgerContainer.innerHTML = ledger.map(entry => {
      const time = new Date(entry.timestamp).toLocaleString();
      let detail = '';
      if (entry.type === 'notes_snapshot') {
        detail = `Rating: ${entry.rating || 'N/A'}★ | Recommendation: ${entry.decision || 'N/A'}\nNotes: ${JSON.stringify(entry.notes || {})}`;
      } else if (entry.type === 'section_expanded') {
        detail = `Expanded: ${entry.metadata?.title || entry.metadata?.id || ''}`;
      } else if (entry.type === 'action_email_copied') {
        detail = `Recruiter clicked 'Copy Email'`;
      } else if (entry.type === 'action_phone_clicked') {
        detail = `Recruiter clicked Phone Dial`;
      } else if (entry.type === 'dossier_downloaded') {
        detail = `Recruiter exported Evaluation Dossier! Rating: ${entry.metadata?.rating}★, Decision: ${entry.metadata?.decision}`;
      } else {
        detail = `Event: ${entry.type} | ${JSON.stringify(entry.metadata || {})}`;
      }

      return `
        <div class="ledger-entry">
          <div class="ledger-time">[${time}] Session: ${entry.sessionId || 'anonymous'} &bull; <strong>${entry.type}</strong></div>
          <div class="ledger-content">${escapeHtml(detail)}</div>
        </div>
      `;
    }).join('');
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Initial audit event on page load
  logTelemetryEvent('page_view', {
    referrer: document.referrer || 'direct',
    screen: `${window.innerWidth}x${window.innerHeight}`
  });

})();
