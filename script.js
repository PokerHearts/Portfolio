/**
 * Pratap Jindal — High-Converting Editorial Portfolio Logic
 * Includes:
 * - Interactive Diagnostic Triage (Behavioral Psychology)
 * - Strategic Focus Tracks
 * - 24-System Interactive Directory
 * - Detail Modal Window
 * - Direct-to-Email AJAX Contact Form Submission (pratapjindal812@gmail.com)
 * - Toast Notifications
 */

// Problem-to-Solution Triage Data Matrix
const triageData = {
  spreadsheets: {
    pain: '"Teams spend 40+ hours weekly manually reconciling data across Google Sheets, losing real-time visibility and introducing transcription errors."',
    painDetail: 'When sales, logistics, and finance rely on detached manual registers, Managing Directors lose the ability to steer midday closings. Caching latency and manual entry backlogs delay critical strategic decisions by days.',
    solution: '18-Module Internal Decision Platform & Zero-Latency Pipelines',
    solutionDetail: 'Architected a company-wide decision infrastructure with custom Google Apps Script ingestion engines, Manifest V3 Chrome extensions bypassing Looker latency, and automated reconciliation scripts—cutting 80% of clerical drag with 100% staff adoption.'
  },
  field: {
    pain: '"Frontline field sales teams suffer from mid-cycle inertia, backloading 60% of monthly quotas into the stressful final 72 hours."',
    painDetail: 'Disorganized review cadences, unclear territory milestones, and passive oversight create severe revenue volatility and burn out frontline officers.',
    solution: 'Turnaround Operating Rhythm & 48-Hour Sprint Mobilization',
    solutionDetail: 'Applied behavioral psychology (Maslow-inspired empowerment huddles) and structured gamified milestones across 72 frontline officers, mobilizing the division to clear 40% of the total ₹75 Cr monthly quota in the first 48 hours.'
  },
  supply: {
    pain: '"Working capital is suffocated by chronic shortages on fast-movers alongside bloated dead stock on sluggish lines."',
    painDetail: 'Without dynamic lead-time variance analysis, inventory buffers are set on arbitrary static rules, leading to concurrent shortages, stockouts, and dissatisfied key accounts.',
    solution: 'Multi-SKU Catalog Rationalization & Predictive Reorder Engines',
    solutionDetail: 'Pruned overextended catalog from 500+ down to ~400 focused SKUs, slashing chronic shortage escalations from 17 down to 2, increasing inventory turnover by 20%, and unlocking working capital.'
  }
};

// Strategic Focus Tracks Content
const focusTracks = {
  strategy: {
    lead: "3+ years directing cross-functional operational divisions of up to 80 members. Proven track record turning sluggish field operations around with Maslow-inspired motivation, authoring master SOP repositories, and enforcing zero cash-transit risk governance.",
    deliverables: [
      "Led 72-member field operations division across 10 regions managing 7,500+ microfinance borrower accounts.",
      "Overhauled frontline operational cadences with empowerment huddles and gamified milestone structures.",
      "Mobilized high-velocity divisional sprint achieving 40% of the monthly target within the first 48 hours.",
      "Authored master SOP repository and digital training curriculum achieving 100% adoption across non-technical staff."
    ]
  },
  systems: {
    lead: "Autonomous full-stack and internal software systems developer bridging executive strategy with rapid technical deployment. Personally engineered 18 production modules, coded a Chrome Extension bypassing Looker latency, and deployed real-time WebSockets with zero external consulting overhead.",
    deliverables: [
      "Architected 18-module internal decision platform covering sales tracking, party health, inventory, and payroll.",
      "Engineered Manifest V3 Chrome Extension bypassing Looker Studio's 15-minute query caching constraint.",
      "Automated cross-departmental data ingestion and sales reconciliation pipelines via Google Apps Script & REST webhooks.",
      "Engineered real-time warehouse dispatch Kanban with Google Apps Script, Firestore WebSockets, and OAuth 2.0."
    ]
  },
  analytics: {
    lead: "Quantitative decision analyst combining top-tier MBA academic standing (CGPA 8.83/10) with UGC NET Assistant Professor qualification in management. Mastered multi-SKU catalog rationalization, predictive purchase patterns, and speech AI QA telemetry.",
    deliverables: [
      "Commissioned 13 role-based Looker Studio dashboards utilized daily by Managing Directors for real-time sales closing.",
      "Pruned catalog from 500+ to ~400 focused SKUs, slashing chronic shortage escalations from 17 down to 2.",
      "Directed speech AI audio QA pipeline transforming telecalling recordings into structured performance rubrics.",
      "Architected Sales & Distribution Analytics Platform with a unified 67-column schema on PostgreSQL and Supabase."
    ]
  }
};

// 24 Production Modules Catalog
const systemsCatalog = [
  {
    id: "MOD_01",
    category: "ai",
    badge: "AI & SPEECH",
    title: "AI Voice Mock Interview Simulator & Portal",
    problem: "Candidates and corporate trainees lack realistic, low-latency, voice-adaptive sandboxes to rehearse high-pressure verbal delivery.",
    solution: "Interactive, voice-first mock interview training portal using Web Audio and generative AI with client-side PDF resume parsing.",
    architecture: "Browser-side PDF.js parsing keeps user data private, combined with Speech API Voice Activity Detection (VAD) calibration.",
    outcome: "Lowered practice costs to ~$0.05 per session, logging comprehensive performance feedback and scoring metrics to a central database.",
    users: "108+ team members and corporate candidates."
  },
  {
    id: "MOD_02",
    category: "ai",
    badge: "AI & SPEECH",
    title: "AI-Powered Call QA Analysis Engine",
    problem: "Manual QA audits covered less than 2% of daily recordings across 12 telecalling units, leaving critical agent execution errors undetected.",
    solution: "Speech-to-text transcript processing engine analyzing agent objection handling, script alignment, and customer purchase intent.",
    architecture: "Engineered rate-limited task queuing matrix to handle API thresholds for 800 daily audio minutes across 1,200 recordings.",
    outcome: "Achieved 100% evaluation coverage across all decentralized units, saving 360 hours of manual evaluation every month.",
    users: "12 decentralized telecalling units auditing 1,200 daily records."
  },
  {
    id: "MOD_03",
    category: "sales",
    badge: "SALES & COMMERCE",
    title: "B2B Field Order Book & Dispatch Pad",
    problem: "Scattered order collections via text and phone calls caused transcription errors and slow booking times (8 mins per order).",
    solution: "Responsive single-page digital order pad with dynamic stock filters, local storage draft protection, and instant client-side receipt generation.",
    architecture: "Google Apps Script backend with dynamic chunked CacheService pipeline fitting inventory matrices within strict 100KB limits.",
    outcome: "Reduced order booking turnaround from 8 minutes to 45 seconds while maintaining 100% order logging accuracy at zero hosting cost.",
    users: "Field sales agents, distributors, and operational order desks."
  },
  {
    id: "MOD_04",
    category: "supply",
    badge: "SUPPLY CHAIN",
    title: "Predictive Inventory & Purchase Order Optimizer",
    problem: "Chronic shortages and overstocked dead capital restricted fulfillment velocity and tied up working capital.",
    solution: "Strategic inventory governance dashboard tracking batch histories, safety margins, and predictive reorder advisories.",
    architecture: "Safety stock formulations dynamically calculated from supplier lead-time variance rather than static threshold caps.",
    outcome: "Slashed chronic shortage escalations from 17 down to 2, accelerating stock rotation and enabling a 20% sales expansion.",
    users: "Supply chain managers and procurement directors."
  },
  {
    id: "MOD_05",
    category: "operations",
    badge: "ENGINEERING",
    title: "Looker Studio Real-Time Data Refresher",
    problem: "Native 15-minute caching limits in Google Looker Studio prevented executive monitoring of live midday sales operations.",
    solution: "Custom Manifest V3 Chrome extension injecting background event runners to trigger real-time, non-invasive dashboard refreshes.",
    architecture: "Engineered seamless DOM-state preservation that maintains user-selected filters, pivots, and screen scroll coordinates.",
    outcome: "Enabled real-time, live operational telemetry monitoring for senior executives during crucial monthend closing cadences.",
    users: "Managing Directors and senior operational leadership."
  },
  {
    id: "MOD_06",
    category: "operations",
    badge: "MARKETING OPS",
    title: "Automated Visual Asset & Banner Engine",
    problem: "Marketing operations faced turnaround bottlenecks waiting for design adjustments for daily catalog updates.",
    solution: "Template-driven banner generator compiling promotional graphics with programmatic typography and dynamic product injections.",
    architecture: "Browser-based canvas layout renderer exporting print- and web-ready assets instantaneously.",
    outcome: "Eliminated graphic production backlogs, enabling same-day campaign rollouts across multiple distribution channels.",
    users: "Growth marketing and digital distribution teams."
  },
  {
    id: "MOD_07",
    category: "sales",
    badge: "SALES & COMMERCE",
    title: "Field Sales Activity & Route Tracking Terminal",
    problem: "Lack of field visibility into daily route completion and client visitation patterns across field officers.",
    solution: "Mobile-responsive check-in terminal logging geolocation timestamps, visitation notes, and next-action pipelines.",
    architecture: "Lightweight offline-first web application syncing queued visits automatically upon network restoration.",
    outcome: "Delivered transparent field accountability and boosted active daily client coverage across 10 regional territories.",
    users: "Frontline field officers and regional territory managers."
  },
  {
    id: "MOD_08",
    category: "operations",
    badge: "FINANCE & HR",
    title: "Cross-Entity Attendance & Payroll Reconciler",
    problem: "Discrepancies between biometric logs, shift overrides, and manual timesheets delayed monthend payroll finalization.",
    solution: "Automated reconciliation pipeline harmonizing biometric inputs with approval matrices and leave ledgers.",
    architecture: "Google Apps Script pipeline with automated audit validations and PDF payslip compilation.",
    outcome: "Cut monthend payroll processing time by 75% and eliminated payroll dispute escalations.",
    users: "HR operations and finance administration."
  },
  {
    id: "MOD_09",
    category: "sales",
    badge: "SALES & COMMERCE",
    title: "Customer Credit Governance & Ledger Health",
    problem: "Uncoordinated credit extensions resulted in overdue receivables and high credit default risk.",
    solution: "Credit health cockpit providing real-time aging analysis, payment velocity ratings, and automated hold triggers.",
    architecture: "PostgreSQL analytical views calculating rolling Days Sales Outstanding (DSO) and automated warning thresholds.",
    outcome: "Reduced overdue receivables by 35% and standardized credit approval cadences across all commercial accounts.",
    users: "Commercial finance teams and credit controllers."
  },
  {
    id: "MOD_10",
    category: "supply",
    badge: "SUPPLY CHAIN",
    title: "Warehouse Dispatch & Logistics Kanban",
    problem: "Warehouse packing queues suffered from communication gaps between order desks and loading bay supervisors.",
    solution: "Real-time dispatch Kanban board displaying order fulfillment stages, packing slips, and carrier assignments.",
    architecture: "Real-time event subscriptions via Firestore WebSockets providing instant stage transitions across devices.",
    outcome: "Accelerated order turnaround by 40% and eliminated misrouted dispatches across warehouse operations.",
    users: "Warehouse supervisors and logistics coordinators."
  },
  {
    id: "MOD_11",
    category: "sales",
    badge: "SALES & COMMERCE",
    title: "Distributor Portal & Secondary Sales Tracker",
    problem: "Secondary sales visibility was delayed by weeks due to reliance on monthly distributor self-reporting.",
    solution: "Self-service distributor portal allowing real-time secondary stock reporting, warranty registrations, and claim filings.",
    architecture: "Secure scoped authentication granting distributors access strictly to their contractual product catalogs and claims.",
    outcome: "Gained real-time secondary sales visibility and reduced distributor claim processing cycles from 2 weeks to 24 hours.",
    users: "Authorized distribution partners and regional sales leads."
  },
  {
    id: "MOD_12",
    category: "operations",
    badge: "GOVERNANCE",
    title: "Centralized Enterprise SOP & Policy Repository",
    problem: "Operational standards and process documentation were scattered across fragmented emails, drives, and local files.",
    solution: "Searchable, version-controlled central operational knowledge base with role-scoped access and onboarding tracks.",
    architecture: "Clean static site generation indexed by workflow taxonomy, ensuring zero latency and high readability.",
    outcome: "Accelerated new hire operational ramp-up by 50% and standardized standard operating procedures across 80+ employees.",
    users: "All organization members and departmental leads."
  },
  {
    id: "MOD_13",
    category: "operations",
    badge: "GOVERNANCE",
    title: "Regulatory Compliance & Audit Trail Tracker",
    problem: "Managing statutory filing deadlines and drug license renewals across multiple legal entities created compliance vulnerability.",
    solution: "Central compliance monitor with automated countdown triggers, documentation vaults, and escalation cadences.",
    architecture: "Automated cron schedules running periodic audit checks and alerting designated compliance officers before critical windows.",
    outcome: "Maintained a 100% on-time statutory compliance record across all operational entities with zero lapsed licenses.",
    users: "Legal counsel, regulatory officers, and Managing Directors."
  },
  {
    id: "MOD_14",
    category: "supply",
    badge: "SUPPLY CHAIN",
    title: "Vendor SLA Governance & Procurement Scorecard",
    problem: "Lack of quantified vendor performance data hampered supplier negotiations and SLA enforcement.",
    solution: "Automated vendor scorecard measuring delivery punctuality, quality pass rates, and invoice pricing consistency.",
    architecture: "Aggregated purchase order fulfillment data into composite supplier health indices.",
    outcome: "Equipped procurement leadership with objective leverage during contract negotiations, improving vendor SLA compliance by 25%.",
    users: "Procurement managers and executive leadership."
  },
  {
    id: "MOD_15",
    category: "supply",
    badge: "SUPPLY CHAIN",
    title: "Batch Expiry & Cold-Chain Telemetry Monitor",
    problem: "Near-expiry pharmaceutical batches risked inventory write-offs without early proactive reallocation.",
    solution: "Proactive batch aging monitor flagging lots approaching critical shelf-life thresholds with reallocation playbooks.",
    architecture: "Automated SQL alerts generating priority dispatch suggestions for early-expiring batches.",
    outcome: "Near-zero expired stock write-offs across distribution centers, protecting operating margins.",
    users: "Quality assurance managers and warehouse heads."
  },
  {
    id: "MOD_16",
    category: "ai",
    badge: "AI & SPEECH",
    title: "Conversational FAQ & Knowledge Retrieval Bot",
    problem: "Internal support desks were overwhelmed with repetitive questions regarding company policies and operational guidelines.",
    solution: "Retrieval-augmented conversational agent answering internal queries grounded in company SOPs and HR handbooks.",
    architecture: "Client-side document embedding retrieval with structured markdown synthesis and citation links.",
    outcome: "Deflected 60% of routine internal inquiries, allowing support personnel to focus on complex operational issues.",
    users: "Cross-functional internal staff."
  },
  {
    id: "MOD_17",
    category: "supply",
    badge: "SUPPLY CHAIN",
    title: "Inter-Depot Stock Transfer Optimization Engine",
    problem: "Regional inventory imbalances resulted in excess stock in one warehouse while another experienced stockouts.",
    solution: "Optimization algorithm calculating optimal balancing stock transfers between regional depots based on regional demand velocities.",
    architecture: "Algorithmic route balancing balancing transport freight costs against urgent fulfillment priority.",
    outcome: "Reduced regional stockout incidence by 30% without increasing total system inventory holdings.",
    users: "Logistics planners and regional depot managers."
  },
  {
    id: "MOD_18",
    category: "operations",
    badge: "GOVERNANCE",
    title: "Customer Escalation & Root Cause Registry",
    problem: "Customer complaints were treated as isolated incidents rather than systemic operational feedback.",
    solution: "Structured Root Cause Analysis (RCA) portal enforcing 5-Whys methodology and preventive corrective action plans.",
    architecture: "Ticket workflow lifecycle enforcing verified CAPA (Corrective and Preventive Action) closure.",
    outcome: "Decreased recurring customer complaint categories by 45% within two operational quarters.",
    users: "Customer support leads and operations managers."
  },
  {
    id: "MOD_19",
    category: "sales",
    badge: "SALES & COMMERCE",
    title: "Commission & Sales Incentive Calculator",
    problem: "Manual monthly incentive calculations caused delays, disputes, and reduced sales team motivation.",
    solution: "Transparent commission engine calculating individual and tiered team payouts based on verified closed revenue.",
    architecture: "Automated data linkage to reconciled invoice ledgers, preventing unverified commission disbursements.",
    outcome: "Eliminated commission disputes and disbursed monthly incentive statements on Day 1 of the new cycle.",
    users: "Field sales teams and payroll accountants."
  },
  {
    id: "MOD_20",
    category: "supply",
    badge: "SUPPLY CHAIN",
    title: "Packaging Material Consumption & Wastage Tracker",
    problem: "Unmonitored usage of cartons, foils, and packaging inputs led to hidden production cost leakages.",
    solution: "Batch-wise packaging reconciliation ledger comparing theoretical recipe consumption against actual material usage.",
    architecture: "Variance detection models flagging statistical wastage anomalies exceeding standard tolerances.",
    outcome: "Reduced packaging material waste by 18% and tightened batch cost controls.",
    users: "Plant supervisors and production cost controllers."
  },
  {
    id: "MOD_21",
    category: "operations",
    badge: "GOVERNANCE",
    title: "Fleet Maintenance & Operational Logbook",
    problem: "Unscheduled vehicle breakdowns disrupted critical delivery routes and incurred emergency repair costs.",
    solution: "Preventive maintenance scheduling system tracking mileage, routine service intervals, and fuel efficiency metrics.",
    architecture: "Predictive service alert triggers based on odometer milestones and service log history.",
    outcome: "Reduced transit delivery breakdowns by 65% and extended company delivery fleet lifespan.",
    users: "Fleet coordinators and logistics supervisors."
  },
  {
    id: "MOD_22",
    category: "sales",
    badge: "SALES & COMMERCE",
    title: "Competitor Market Intelligence Registry",
    problem: "Valuable frontline market intelligence regarding competitor pricing and promotional schemes was lost in verbal conversations.",
    solution: "Standardized market intelligence repository for field agents to submit competitor price points, discounts, and sample photos.",
    architecture: "Structured mobile submission forms with automated category tagging and regional price heatmaps.",
    outcome: "Allowed commercial strategy leadership to counter competitor tactical pricing moves within 24 hours.",
    users: "Commercial strategy analysts and sales directors."
  },
  {
    id: "MOD_23",
    category: "operations",
    badge: "MARKETING OPS",
    title: "Product Knowledge Card & Visual Playbook Generator",
    problem: "Medical representatives struggled with rapid product knowledge assimilation for newly introduced formulations.",
    solution: "Visual digital flashcard generator summarizing indications, contraindications, dosage, and USP talking points.",
    architecture: "Automated layout generator compiling medical data into mobile-friendly digital cards.",
    outcome: "Shortened sales team product briefing cycles from weeks to 2 days with 100% syllabus mastery.",
    users: "Medical representatives and product training managers."
  },
  {
    id: "MOD_24",
    category: "operations",
    badge: "GOVERNANCE",
    title: "Enterprise Document Vault & Access Matrix",
    problem: "Confidential corporate contracts, lease agreements, and board resolutions lacked rigorous role-based governance.",
    solution: "Encrypted internal digital vault categorizing corporate assets with strict access auditing and link expiration.",
    architecture: "Role-scoped access control matrix with immutable access audit trails.",
    outcome: "Eliminated unauthorized document access and streamlined external compliance and due diligence audits.",
    users: "Corporate officers, legal counsel, and Managing Directors."
  }
];

document.addEventListener('DOMContentLoaded', () => {
  // 1. Diagnostic Triage Selector
  const triageTabs = document.querySelectorAll('.triage-tab-btn');
  const triagePain = document.getElementById('triagePain');
  const triagePainDetail = document.getElementById('triagePainDetail');
  const triageSolution = document.getElementById('triageSolution');
  const triageSolutionDetail = document.getElementById('triageSolutionDetail');

  if (triageTabs.length > 0) {
    triageTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        triageTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const key = tab.getAttribute('data-triage');
        const data = triageData[key];
        if (data) {
          if (triagePain) triagePain.textContent = data.pain;
          if (triagePainDetail) triagePainDetail.textContent = data.painDetail;
          if (triageSolution) triageSolution.textContent = data.solution;
          if (triageSolutionDetail) triageSolutionDetail.textContent = data.solutionDetail;
        }
      });
    });
  }

  // 2. Focus Tracks Selector
  const focusTabs = document.querySelectorAll('.focus-tab-btn');
  const focusLead = document.getElementById('focusLead');
  const focusDeliverables = document.getElementById('focusDeliverables');

  if (focusTabs.length > 0) {
    focusTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        focusTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const trackKey = tab.getAttribute('data-track');
        const data = focusTracks[trackKey];
        if (data) {
          if (focusLead) focusLead.textContent = data.lead;
          if (focusDeliverables) {
            focusDeliverables.innerHTML = data.deliverables.map((item, idx) => `
              <li>
                <span class="deliverable-num">0${idx + 1}</span>
                <span>${item}</span>
              </li>
            `).join('');
          }
        }
      });
    });
  }

  // 3. Directory Table (Minimalist Rows)
  const directoryTable = document.getElementById('directoryTable');
  const filterLinks = document.querySelectorAll('.filter-link');
  const searchInput = document.getElementById('directorySearchInput');

  let currentCategory = 'all';
  let currentSearch = '';

  function renderDirectory() {
    if (!directoryTable) return;

    const filtered = systemsCatalog.filter(item => {
      const matchCat = (currentCategory === 'all') || (item.category === currentCategory);
      if (!matchCat) return false;

      if (!currentSearch) return true;
      const q = currentSearch.toLowerCase();
      return item.title.toLowerCase().includes(q) ||
             item.problem.toLowerCase().includes(q) ||
             item.id.toLowerCase().includes(q) ||
             item.badge.toLowerCase().includes(q);
    });

    if (filtered.length === 0) {
      directoryTable.innerHTML = `
        <div style="padding: 2.5rem 0.5rem; color: var(--text-muted); font-size: 0.92rem;">
          No matching systems found for "${currentSearch}".
        </div>
      `;
      return;
    }

    directoryTable.innerHTML = filtered.map(item => `
      <div class="directory-row" onclick="openSystemDetail('${item.id}')">
        <span class="row-id">${item.id}</span>
        <span class="row-title">${item.title}</span>
        <span class="row-desc">${item.problem}</span>
        <span class="row-action">Details →</span>
      </div>
    `).join('');
  }

  if (filterLinks.length > 0) {
    filterLinks.forEach(link => {
      link.addEventListener('click', () => {
        filterLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        currentCategory = link.getAttribute('data-cat') || 'all';
        renderDirectory();
      });
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value.trim();
      renderDirectory();
    });
  }

  renderDirectory();

  // 4. Modal Window Logic
  const modalOverlay = document.getElementById('systemModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalTitle = document.getElementById('modalTitle');
  const modalBadge = document.getElementById('modalBadge');
  const modalProblem = document.getElementById('modalProblem');
  const modalSolution = document.getElementById('modalSolution');
  const modalArchitecture = document.getElementById('modalArchitecture');
  const modalOutcome = document.getElementById('modalOutcome');
  const modalUsers = document.getElementById('modalUsers');

  window.openSystemDetail = function(id) {
    const item = systemsCatalog.find(s => s.id === id);
    if (!item || !modalOverlay) return;

    modalTitle.textContent = item.title;
    modalBadge.textContent = `${item.id} · ${item.badge}`;
    modalProblem.textContent = item.problem;
    modalSolution.textContent = item.solution;
    modalArchitecture.textContent = item.architecture;
    modalOutcome.textContent = item.outcome;
    modalUsers.textContent = item.users;

    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // 5. Contact Form Direct AJAX Submission to pratapjindal812@gmail.com
  const contactForm = document.getElementById('contactForm');
  const formStatusMsg = document.getElementById('formStatusMsg');
  const submitBtn = document.getElementById('submitBtn');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Transmitting Message...';
      }

      const formData = new FormData(contactForm);

      fetch("https://formsubmit.co/ajax/pratapjindal812@gmail.com", {
        method: "POST",
        headers: { 
          'Accept': 'application/json'
        },
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        if (formStatusMsg) {
          formStatusMsg.className = 'form-status-msg success';
          formStatusMsg.innerHTML = '✓ <strong>Message Transmitted.</strong> Your operational brief has been delivered directly to Pratap\'s personal inbox. Expect a response within 24 hours.';
        }
        contactForm.reset();
      })
      .catch(error => {
        if (formStatusMsg) {
          formStatusMsg.className = 'form-status-msg error';
          formStatusMsg.innerHTML = 'Direct transmission encountered a network issue. Please email directly to <a href="mailto:pratapjindal812@gmail.com" style="text-decoration:underline;">pratapjindal812@gmail.com</a>.';
        }
      })
      .finally(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Transmit Direct Message →';
        }
      });
    });
  }
});

// Toast / Copy Email
function copyEmail() {
  const email = "pratapjindal812@gmail.com";
  navigator.clipboard.writeText(email).then(() => {
    showToast(`✓ Copied ${email} to clipboard!`);
  }).catch(() => {
    showToast(`Contact: ${email}`);
  });
}

function showToast(msg) {
  const toast = document.getElementById('toastBar');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}
