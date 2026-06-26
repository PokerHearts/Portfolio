/* ==========================================================================
   THREE.JS STRATEGIC SPATIAL UNIVERSE BACKGROUND — SUBTLE AMBIENT CANVAS
   ========================================================================== */
let scene, camera, renderer, dirLight;
const cameraBasePos = { x: 0, y: 5, z: 25 };

// Parallax tracking mouse
let mouseX = 0, mouseY = 0;
let targetMouseX = 0, targetMouseY = 0;
const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

function initThree() {
  const canvas = document.getElementById('webgl-canvas');
  if (!canvas) return;

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf1f5f9);
  scene.fog = new THREE.FogExp2(0xf1f5f9, 0.025);

  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(cameraBasePos.x, cameraBasePos.y, cameraBasePos.z);

  renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: false,
    antialias: true,
    powerPreference: "high-performance"
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
  scene.add(ambientLight);

  dirLight = new THREE.DirectionalLight(0xeef2ff, 1.2);
  dirLight.position.set(10, 20, 15);
  scene.add(dirLight);

  // Register Event Handlers
  window.addEventListener('resize', onWindowResize);
  document.addEventListener('mousemove', onMouseMove);

  // Initialize Scroll Choreo
  setupCameraScrollChoreography();

  // Kickoff Animation Loop
  animate();
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onMouseMove(event) {
  targetMouseX = (event.clientX - windowHalfX) * 0.01;
  targetMouseY = (event.clientY - windowHalfY) * 0.01;
}

// GSAP ScrollTrigger 3D Camera Flight Pathways
function setupCameraScrollChoreography() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  // Hero -> Projects Grid
  gsap.timeline({
    scrollTrigger: {
      trigger: "#projects",
      start: "top bottom",
      end: "top top",
      scrub: 1.2
    }
  })
  .to(cameraBasePos, { x: 8, y: -2, z: 18 })
  .to(camera.rotation, { x: 0.1, y: -0.3, z: 0 }, "<");

  // Projects Grid -> Experience
  gsap.timeline({
    scrollTrigger: {
      trigger: "#experience",
      start: "top bottom",
      end: "top top",
      scrub: 1.2
    }
  })
  .to(cameraBasePos, { x: -6, y: -8, z: 15 })
  .to(camera.rotation, { x: -0.15, y: 0.25, z: 0 }, "<");

  // Experience -> Research
  gsap.timeline({
    scrollTrigger: {
      trigger: "#research",
      start: "top bottom",
      end: "top top",
      scrub: 1.2
    }
  })
  .to(cameraBasePos, { x: 5, y: -14, z: 20 })
  .to(camera.rotation, { x: 0.05, y: -0.15, z: 0 }, "<");

  // Research -> Writing
  gsap.timeline({
    scrollTrigger: {
      trigger: "#writing",
      start: "top bottom",
      end: "top top",
      scrub: 1.2
    }
  })
  .to(cameraBasePos, { x: -3, y: -20, z: 16 })
  .to(camera.rotation, { x: -0.1, y: 0.1, z: 0 }, "<");

  // Writing -> Contact (Corrected to target #connect instead of #contact)
  gsap.timeline({
    scrollTrigger: {
      trigger: "#connect",
      start: "top bottom",
      end: "top top",
      scrub: 1.2
    }
  })
  .to(cameraBasePos, { x: 0, y: -26, z: 22 })
  .to(camera.rotation, { x: 0, y: 0, z: 0 }, "<");
}

let animationFrameId = null;
let isTabActive = true;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function handleVisibilityChange() {
  isTabActive = !document.hidden;
  if (isTabActive) {
    if (!animationFrameId) {
      animate();
    }
  } else {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
  }
}

document.addEventListener('visibilitychange', handleVisibilityChange);

function animate() {
  if (!isTabActive) return;
  animationFrameId = requestAnimationFrame(animate);
  
  const isReduced = prefersReducedMotion.matches;
  
  // Camera mouse parallax drift applied on top of the GSAP base position
  if (camera) {
    if (!isReduced) {
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;
      
      camera.position.x = cameraBasePos.x + mouseX;
      camera.position.y = cameraBasePos.y - mouseY;
      camera.position.z = cameraBasePos.z;
    } else {
      camera.position.x = cameraBasePos.x;
      camera.position.y = cameraBasePos.y;
      camera.position.z = cameraBasePos.z;
    }
  }

  if (renderer && scene && camera) {
    renderer.render(scene, camera);
  }
}



/* ==========================================================================
   DYNAMIC PROJECT DATABASE (18 Modules Structured as PRDs / PoCs)
   ========================================================================== */
const projectData = [
  {
    id: "MOD_01",
    category: "ai-systems",
    title: "AI Voice Mock Interview Portal",
    desc: "Product Owner—Architected conversational AI interview portal, optimized Speech-to-Text latency, designed adoption strategy across operations.",
    outcome: "Conducted digital-literacy training for 30+ non-technical staff—achieved 100% tool adoption rate.",
    tech: ["Conversational AI", "Speech-to-Text", "Latency Optimization", "Operations Adoption"],
    prd: {
      bottleneck: "Unoptimized interview routing pipelines caused candidate evaluation latency loops of up to 48 hours, causing candidate drop-offs during high-volume recruiting.",
      userGoal: "Recruiting teams and applicants. The goal is to provide a zero-latency conversational evaluation channel.",
      strategy: "Designed conversational state pipelines using local Web Audio caching and custom interrupt thresholds, reducing transcription wait loops.",
      metrics: "Conducted training sessions for 30+ non-technical staff, resulting in a 100% adoption rate of the portal."
    }
  },
  {
    id: "MOD_02",
    category: "ai-systems",
    title: "AI Call QA Analysis System",
    desc: "Product Owner—Designed speech analytics pipeline for field team QA, managed SOP documentation and team training.",
    outcome: "Created and maintained SOPs, training guides, and systems directory; established weekly structured training cadence.",
    tech: ["Speech Analytics", "NLP Audits", "SOP Automation", "Team Training"],
    prd: {
      bottleneck: "Field sales teams lacked transparent performance evaluation parameters, resulting in subjective audits and compliance gaps.",
      userGoal: "Operations managers and quality controllers. The goal is to establish transparent compliance logging.",
      strategy: "Engineered a transcript validation script cross-referencing call audio with SOP keywords, generating real-time quality alerts.",
      metrics: "Standardized SOP documentation across 18 operational nodes, establishing a weekly training cadence with 100% compliance."
    }
  },
  {
    id: "MOD_03",
    category: "fullstack",
    title: "B2B Order Booking Workspace",
    desc: "Designed serverless B2B order workspace, optimized state caching and edge computing for real-time operations.",
    outcome: "80% manual reporting effort reduction via Google Apps Script automation.",
    tech: ["Serverless Architecture", "State Caching", "Edge Computing", "Real-time sync"],
    prd: {
      bottleneck: "Fragmented dealer ordering formats (WhatsApp/Sheets) caused SKU processing lag and duplicate dispatch inputs.",
      userGoal: "Logistics agents and channel distributors. The goal is to provide a single booking canvas with real-time stock sync.",
      strategy: "Optimized browser-side state caching using IndexedDB and edge synchronization routines to prevent offline data loss.",
      metrics: "Replaced manual invoice compilation loops, achieving an 80% manual reporting effort reduction."
    }
  },
  {
    id: "MOD_04",
    category: "supply-ops",
    title: "Predictive Inventory & PO Optimizer",
    desc: "Led inventory rationalization project: 500 SKUs → 400 SKUs, reduced shortage complaints from 17 to 2 per cycle, achieved 20% sales lift on rationalized lines.",
    outcome: "Maintained 98% stock accuracy while managing inventory visibility across both companies.",
    tech: ["Predictive Analytics", "Safety Buffer Stock", "SKU Rationalization", "Operations Research"],
    prd: {
      bottleneck: "Supplier lead-time volatility caused stock imbalances, where high-velocity lines saw constant out-of-stocks while slow-moving SKUs locked up cash.",
      userGoal: "Warehouse managers and procurement coordinators. The goal is to stabilize inventory levels.",
      strategy: "Calculated empirical safety stock buffers and pruned the catalog (500 SKUs to 400 SKUs) based on sales velocity.",
      metrics: "Shortage complaints dropped from 17 to 2 per cycle; achieved a 20% sales lift on rationalized lines; maintained 98% stock accuracy."
    }
  },
  {
    id: "MOD_05",
    category: "extensions",
    title: "Looker Studio Cache Refresher",
    desc: "Built custom Chrome extension to bypass 15-minute Looker Studio cache delay, enabling real-time dashboard refresh for daily operations.",
    outcome: "13 Looker Studio dashboards built across 4 functions—used daily by 80-member team.",
    tech: ["Chrome Extension API", "DOM Injection", "Cache Refresher", "Telemetry Sync"],
    prd: {
      bottleneck: "Native Looker Studio reports enforce a strict 15-minute caching boundary, preventing managers from viewing live sales and dispatch movements.",
      userGoal: "Field supervisors and management analyst. The goal is to enable real-time telemetry updates.",
      strategy: "Injected background execution threads to force query refreshes, bypassing Looker cache limits without reloading widgets.",
      metrics: "Built 13 dashboards across Sales, Analytics, Inventory, and Finance, utilized daily by an 80-member cross-functional team."
    }
  },
  {
    id: "MOD_06",
    category: "fullstack",
    title: "OmniReader — Spatial Reader Workspace",
    desc: "A premium, ultra-fast client-side document reading environment processing EPUB, PDF, and DOCX files. Runs fully client-side to protect text privacy and avoid server overhead.",
    outcome: "Zero server-load cost architecture keeping reading sessions fully private and localized inside client sandboxes.",
    tech: ["E-Reader Engines", "Client-Side Indexing", "IndexedDB Storage", "Serverless Infrastructure"],
    prd: {
      bottleneck: "Standard document readers require document uploads to cloud servers for text extraction and rendering, creating privacy liability risks and high server infrastructure costs for large volumes.",
      userGoal: "Internal document reviewers and compliance officers. The goal is to build a fast, secure, local e-reader workspace.",
      strategy: "Opted for a serverless, local browser-parsing architecture. Bypassed server-side document parsing containers entirely, ensuring all files remain in the local sandbox (IndexedDB) to guarantee 100% data privacy.",
      metrics: "Zero server compute costs ($0.00 operating budget); 100% document privacy compliance; rendering latency under 150ms for large documents."
    }
  },
  {
    id: "MOD_07",
    category: "supply-ops",
    title: "End-to-End Sales Control System",
    desc: "An operations tracking system managing order pipelines from entry to transit, delivery verification, and exception logging. Automatically routes alerts to supervisors.",
    outcome: "Decreased order-to-dispatch transit lag by 30% and enhanced final delivery success metrics by 15%.",
    tech: ["Workflow Design", "Lead Time Optimization", "Exception Handling", "Escalation Matrix"],
    prd: {
      bottleneck: "Lack of visibility into order dispatch and logistics transit led to delivery delays, high exception rates, and manual supervisor communication loops.",
      userGoal: "Dispatch supervisors and logistical coordinators. The goal is to automate order-to-transit tracking and trigger SLA exception alerts.",
      strategy: "Designed a simple state-tracking dashboard with built-in SLA timers and exception routing. Avoided complex enterprise resource planning (ERP) integrations to prove immediate workflow efficiency.",
      metrics: "Order-to-dispatch lag reduced by 30%; delivery success rate increased by 15%; manual status checks eliminated."
    }
  },
  {
    id: "MOD_08",
    category: "supply-ops",
    title: "Task Matrix & Performance Scoring",
    desc: "An enterprise execution matrix linking periodic staff tasks to individual performance logs, structuring objective feedback loops and relative grading scores.",
    outcome: "Lifted general SLA compliance and task completion indices by 40% across administrative departments.",
    tech: ["Performance Evaluation", "Quantitative Scoring", "SLA Monitoring", "Process Transparency"],
    prd: {
      bottleneck: "Task delegation in administrative departments was verbal and retrospective, leading to delayed reports, missed deadlines, and subjective performance reviews.",
      userGoal: "Department managers and administrative staff. The goal is to link weekly deliverables to objective, quantitative performance logs.",
      strategy: "Used a relative, score-distribution performance matrix instead of absolute scores. This avoided scoring inflation and provided clear operational transparency without complex HR platform overhead.",
      metrics: "Administrative SLA compliance index raised by 40%; report submission delay frequency reduced by 60%; performance disputes eliminated."
    }
  },
  {
    id: "MOD_09",
    category: "supply-ops",
    title: "District Monopoly & Control System",
    desc: "A dynamic territory mapping and management database tracking monopoly boundaries, sales thresholds, and automated dealer SLA warnings.",
    outcome: "Streamlined regional governance and automated warnings for underperforming territory allocations.",
    tech: ["Territory Mapping", "Boundary Enforcement", "SLA Warnings", "Dealer Governance"],
    prd: {
      bottleneck: "Overlapping regional territory boundaries in distributor channels caused channel conflict, pricing erosion, and dealer disputes due to lack of a central geofencing record.",
      userGoal: "Territory sales managers and legal compliance teams. The goal is to map dealership allocations and enforce territorial compliance.",
      strategy: "Implemented a territory mapping database with automated warning triggers for underperforming zones. Bypassed heavy GIS server setups by using basic boundary check rules.",
      metrics: "Channel overlapping disputes reduced to zero; automatic SLA alerts triggered for dealer underperformance; contract audit times reduced by 70."
    }
  },
  {
    id: "MOD_10",
    category: "supply-ops",
    title: "Short Product & Restock Trigger",
    desc: "A real-time database capturing unfulfilled client demand during order placement and linking it with active inventory updates to auto-alert sales agents on restocks.",
    outcome: "Recovered previously lost repeat orders by instantly pushing availability notifications to regional reps.",
    tech: ["Demand Backlogging", "Stock Arrival Hooks", "Automated Notifications", "Sales Recovery"],
    prd: {
      bottleneck: "When items went out of stock, client orders were cancelled, but sales reps forgot to re-pitch when items returned, leading to lost repeat revenue.",
      userGoal: "Sales reps and inventory controllers. The goal is to capture unfulfilled demand and trigger automated restock alerts.",
      strategy: "Configured a demand-capturing database that auto-triggers regional alert channels (e.g. WhatsApp/Email notifications) on stock arrival, choosing push alerts over passive dashboards.",
      metrics: "25% recovery of previously lost out-of-stock orders; average sales rep restock-to-pitch cycle reduced from 5 days to 2 hours."
    }
  },
  {
    id: "MOD_11",
    category: "supply-ops",
    title: "Lead Quality & De-duplication Engine",
    desc: "A lead validation pipeline utilizing dynamic cross-referencing algorithms and regex validation to clean and de-duplicate client contact lists before CRM import.",
    outcome: "Eliminated ~25% database clutter and duplicate lead allocations, preserving CRM record hygiene.",
    tech: ["Data Sanitation", "Regex Validation", "Identity De-duplication", "CRM Hygiene"],
    prd: {
      bottleneck: "CRM files loaded from external networks contained duplicate and formatted contact entries, causing multiple sales reps to pitch to the same client, diluting conversion rates.",
      userGoal: "Lead generation supervisors and CRM controllers. The goal is to clean and de-duplicate contact logs before database import.",
      strategy: "Deployed fuzzy string and phone normalization algorithms rather than heavy neural-network identity mapping models, achieving 98% accuracy at negligible latency.",
      metrics: "25% duplicate CRM records eliminated before database insertion; zero duplicate call assignments; data cleaning lag under 3 seconds per import."
    }
  },
  {
    id: "MOD_12",
    category: "supply-ops",
    title: "Vendor Payables Ledger Dashboard",
    desc: "A secure cash outflow dashboard organizing payments, credit timelines, and validation logs, featuring automated alerts on upcoming invoice maturities.",
    outcome: "Optimized working capital visibility and avoided delay penalties across 40+ corporate supply vendors.",
    tech: ["Cash Outflow Forecasting", "Credit Timeline Tracking", "Vendor Management", "Maturity Alerts"],
    prd: {
      bottleneck: "Manual monitoring of supplier credit periods led to delayed cash outflow planning, late payment penalties, and risk of supply chain disruptions.",
      userGoal: "Accounts payable managers and finance heads. The goal is to automate invoice maturity tracking and forecast capital needs.",
      strategy: "Built a dynamic cash calendar matching invoice dates with credit limits. Pre-loaded payment buffers instead of complex predictive accounting systems.",
      metrics: "Zero late-payment penalties across 40+ supply vendors; working capital lock-ups reduced by 15%; weekly dashboard review time reduced to 10 minutes."
    }
  },
  {
    id: "MOD_13",
    category: "supply-ops",
    title: "Complaint Management & Escalation Engine",
    desc: "A multi-level trouble ticketing system routing client and operational complaints to corresponding team leads with built-in escalation timers.",
    outcome: "Slashed average complaint resolution cycle times by 48 hours via structured department escalation triggers.",
    tech: ["Ticketing Workflow", "Escalation Automation", "SLA Tracking", "Routing Logic"],
    prd: {
      bottleneck: "Client complaints remained stuck in individual support inboxes, leading to long resolution cycles (averaging 72 hours) and poor client satisfaction.",
      userGoal: "Customer support agents and department heads. The goal is to route tickets and auto-escalate delayed complaints.",
      strategy: "Deployed a dynamic ticket routing dashboard with automated 24-hour escalation timers. Prioritized speed-to-market over complex CRM ticketing platforms.",
      metrics: "Average complaint resolution cycle time cut by 48 hours; SLA compliance on escalations increased to 98%; ticket backlog reduced by 40%."
    }
  },
  {
    id: "MOD_14",
    category: "supply-ops",
    title: "Unified Inventory, Batch & Collections Ledger",
    desc: "A consolidated operational reporting layer unifying inventory records, production batch lifetimes, and cash collections into a consolidated ledger.",
    outcome: "Consolidated three previously isolated data streams into a single source of truth for boardroom reviews.",
    tech: ["Data Consolidation", "Ledger Integration", "Reporting Architecture", "Dashboard Design"],
    prd: {
      bottleneck: "Siloed data streams across inventory, production, and accounts ledgers forced directors to spend hours manual-compiling sheets for weekly performance reviews.",
      userGoal: "Boardroom executives and finance controllers. The goal is to unify ledger metrics into a single, clean reporting layer.",
      strategy: "Created a consolidated data aggregation script that unifies records at the presentation layer, avoiding complex database migration or schema overhauls.",
      metrics: "Reporting compile time reduced from 8 hours to instant; 100% data alignment for boardroom audits; zero synchronization conflicts."
    }
  },
  {
    id: "MOD_15",
    category: "ai-systems",
    title: "SCOT Predictive Purchase Pattern Dashboard",
    desc: "A behavior-driven predictive dashboard analyzing historical B2B purchase frequencies to calculate and forecast future client restocking timelines.",
    outcome: "Enabled predictive sales calling across 500+ SKUs by anticipating client restocking cycles.",
    tech: ["Behavior Analytics", "Restocking Forecasting", "Sales Intelligence", "API Dashboards"],
    prd: {
      bottleneck: "Sales calling was reactive, where reps called dealers only after they had already run out of stock or switched to competitors.",
      userGoal: "Field sales reps. The goal is to forecast and display dealer restocking timelines based on purchase frequencies.",
      strategy: "Built a frequency-based predictive model using customer-specific purchase intervals rather than global trend lines to keep the pitch highly relevant.",
      metrics: "15% increase in repeat order volume; predictive sales pitch accuracy raised to 82%; average client retention index boosted."
    }
  },
  {
    id: "MOD_16",
    category: "extensions",
    title: "Android Call Recording Synchronizer",
    desc: "A custom background mobile script running localized file system hooks on Android devices to safely ingest and sync call audio recordings straight to secure Drive folders.",
    outcome: "Secured 100% data compliance capture rates for the call quality evaluation pipeline across 12 remote agents.",
    tech: ["Android File Hooks", "Background Sync", "Storage API", "Network Resilience"],
    prd: {
      bottleneck: "Remote agents failed to manually upload daily audio logs, leaving quality auditors with missing data and breaking compliance chains.",
      userGoal: "Remote telecalling agents. The goal is to automate background file syncing from mobile devices to secure storage.",
      strategy: "Implemented a background script utilizing localized storage hooks that check for file creations and queue uploads. Integrated deferred threads to survive mobile OS sleep cycles.",
      metrics: "100% call recording capture compliance (from 65%); automated audit queues stabilized; zero manual upload tasks for agents."
    }
  },
  {
    id: "MOD_17",
    category: "supply-ops",
    title: "Control Sample Lifecycle Monitor",
    desc: "A quality audit logging environment tracing periodic product control samples, cross-referencing batch numbers and expiration schedules.",
    outcome: "Achieved 100% structural alignment with regulatory quarterly pharmaceutical quality audit sheets.",
    tech: ["Compliance Auditing", "Batch Expiration Tracking", "Regulatory Logging", "Audit Readiness"],
    prd: {
      bottleneck: "Manual tracking of pharmaceutical batch control samples and expiration timelines risked regulatory non-compliance during quarterly audits.",
      userGoal: "Quality control managers. The goal is to automate audit readiness and trace sample lifecycles.",
      strategy: "Created a tracking ledger with automated warning alerts triggered as samples approach expiration thresholds, keeping the audit trail fully compliant.",
      metrics: "100% compliance score in regulatory quarterly quality audits; expired sample count reduced to zero; audit preparation lag reduced by 85%."
    }
  },
  {
    id: "MOD_18",
    category: "extensions",
    title: "Dynamic Google Form Prefill System",
    desc: "An automated URL parameter builder that dynamically injects client metadata and context IDs into form links, eliminating duplicate entry needs.",
    outcome: "Eliminated manual entry typos by field operators submitting inventory status sheets.",
    tech: ["URL Parameter Injection", "Metadata Autofill", "Client-Side Generation", "Process Speedup"],
    prd: {
      bottleneck: "Field operators wasted time manually entering repetitive customer, dealer, and SKU metadata on mobile inventory forms, leading to high entry error rates.",
      userGoal: "Field operators. The goal is to prefill form fields dynamically using context parameters.",
      strategy: "Built a URL parameter prefill generator running client-side, avoiding server-side database wait times and maintaining mobile performance.",
      metrics: "Data entry error rates dropped to zero; form submission time reduced by 75%; operator adoption rate at 100%."
    }
  },
  {
    id: "MOD_19",
    category: "supply-ops",
    title: "Dynamic Sales Incentive & Commission Calculator",
    desc: "An automated commission engine tracking regional sales tiers, growth metrics, and milestone payout ratios for field forces, replacing fragile excel sheets.",
    outcome: "Standardized commission tracking, providing absolute computational accuracy and cutting processing latency.",
    tech: ["Rules-Based Calculation", "Milestone Tracking", "Payout Optimization", "Workflow Automation"],
    prd: {
      bottleneck: "Commission calculations across regional sales tiers and milestones were done on fragile, manual spreadsheets, causing payroll disputes and 4-day delays.",
      userGoal: "Sales controllers and HR managers. The goal is to calculate milestone payouts instantly from sales records.",
      strategy: "Consolidated sales and incentive logs into a clean rules engine, prioritizing absolute calculator transparency and speed over complex payroll ERP modules.",
      metrics: "Commission processing lag cut from 4 days to instant; payout disputes reduced by 95%; payroll operational cost decreased."
    }
  },
  {
    id: "MOD_20",
    category: "supply-ops",
    title: "Dynamic Freight & Logistical Cost Estimator",
    desc: "A shipping cost calculator evaluating volumetric weights, dimensions, geographical transit zones, and fuel surcharges to generate transport quotes.",
    outcome: "Slashed transport quoting lag times and eliminated shipping invoice discrepancies.",
    tech: ["Freight Optimization", "Volumetric Calculations", "Zone Tables", "Invoice Auditing"],
    prd: {
      bottleneck: "Logistics coordinators spent ~15 minutes per shipment manually calculating quotes using volumetric tables and surcharge zones, causing delay in client responses.",
      userGoal: "Dispatch planners and sales reps. The goal is to estimate freight rates instantly based on size and zone.",
      strategy: "Built a lookup-based cost estimator with pre-compiled regional tariff arrays, ensuring the tool runs offline for field sales representatives.",
      metrics: "Quoting latency reduced from 15 minutes to under 5 seconds; shipping invoice cost variances eliminated; planner throughput increased by 35%."
    }
  },
  {
    id: "MOD_21",
    category: "supply-ops",
    title: "Promotional Input Allocation & Budget Tracker",
    desc: "An allocation dashboard modeling marketing sample distributions, regional promotional expenses, and material allocations against net sales returns.",
    outcome: "Enforced strict budgetary limits on sales promo allocations and boosted material spending efficiency.",
    tech: ["Budget Governance", "Resource Allocation", "Promo Tracking", "Cost Control"],
    prd: {
      bottleneck: "Unrestricted allocation of marketing materials and product samples by field agents led to budget overruns and lack of accountability.",
      userGoal: "Marketing managers and sales directors. The goal is to cap promo allocations dynamically based on regional sales performance.",
      strategy: "Designed a dynamic budget control ledger that scales promo limits proportionally with sales volume, avoiding arbitrary fixed caps.",
      metrics: "Promotional budget overruns reduced by 90%; ROI on marketing samples improved by 18%; allocation transparency achieved for all regions."
    }
  },
  {
    id: "MOD_22",
    category: "supply-ops",
    title: "Party Performance & Client Health Analytics",
    desc: "A B2B client analysis system tracking historical purchasing logs, rotation speed, aging accounts receivables, and credit risk factors.",
    outcome: "Provides high-value management alerts on top-performing client accounts and early payment delays.",
    tech: ["Receivables Tracking", "Risk Grading", "Client Health Metrics", "Early Alerting"],
    prd: {
      bottleneck: "Accounts receivables aging and client payment delays were identified retroactively, causing cash flow crunches and bad debt risks.",
      userGoal: "Credit officers and sales managers. The goal is to flag payment delays and evaluate client risk profiles.",
      strategy: "Created a payment-delay alerting system that automatically flags client accounts when payment lags exceed credit limits by 7 days.",
      metrics: "Bad debt write-offs reduced by 45%; average accounts receivable collection cycle shortened by 12 days; automated risk alerting coverage at 100%."
    }
  },
  {
    id: "MOD_23",
    category: "ai-systems",
    title: "PrepMaster AI",
    desc: "Product Owner—Designed client-side PDF processing architecture, multi-LLM integration, and zero-server deployment ensuring 100% candidate data privacy.",
    outcome: "Zero-server document processing architecture keeping sessions fully private and localized inside client sandboxes.",
    tech: ["PDF.js", "Tesseract.js OCR", "Multi-Provider LLM", "Client-Side Privacy"],
    prd: {
      bottleneck: "Candidates had no private, timed mock exam sandbox to practice on-device without uploading personal documents to external servers.",
      userGoal: "Exam candidates and administrators. The goal is to convert paper documents into mock tests without server-side leaks.",
      strategy: "Chose PDF.js and on-device Tesseract.js OCR to process text and answer keys client-side, with API keys saved in session memory.",
      metrics: "100% data privacy compliance verified; zero server compute costs; supported seven AI models."
    }
  }
];

// Highlight and jump to a specific project module
function highlightProject(id) {
  const targetCard = document.getElementById(`project-row-${id}`);
  
  if (targetCard) {
    const activePill = document.querySelector('.projects-filter-bar .filter-pill.active');
    const targetCat = targetCard.getAttribute('data-category');
    
    if (activePill && activePill.getAttribute('data-filter') !== 'all' && activePill.getAttribute('data-filter') !== targetCat) {
      const allPill = document.querySelector('.projects-filter-bar .filter-pill[data-filter="all"]');
      if (allPill) allPill.click();
    }
    
    setTimeout(() => {
      targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      targetCard.style.outline = '2px solid var(--accent-blue)';
      targetCard.style.outlineOffset = '4px';
      targetCard.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.2)';
      
      setTimeout(() => {
        targetCard.style.outline = '';
        targetCard.style.outlineOffset = '';
        targetCard.style.boxShadow = '';
      }, 2500);
      showToast(`Navigated to System Registry Profile: [${id}]`);
    }, 350);
  }
}

// Filter projects in the projectsGrid
function filterProjects(category) {
  const cards = document.querySelectorAll('#projectsGrid .project-card');
  cards.forEach(card => {
    const cardCat = card.getAttribute('data-category');
    if (category === 'all' || cardCat === category) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}

// Render all 22 projects in a single clean grid
function renderProjectGrid() {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;
  
  grid.innerHTML = '';

  projectData.forEach(proj => {
    const card = document.createElement('div');
    card.className = 'glass-card project-card';
    card.setAttribute('data-category', proj.category);
    card.setAttribute('data-id', proj.id);
    card.id = `project-row-${proj.id}`;

    const isFlagship = ["MOD_01", "MOD_02", "MOD_03", "MOD_04"].includes(proj.id);
    
    let flagshipVisualHtml = '';
    if (isFlagship) {
      card.classList.add('flagship-card');
      let imgUrl = '';
      let caption = '';
      if (proj.id === 'MOD_01') {
        imgUrl = 'media__1779962828387.png';
        caption = 'Anonymized AI Mock Interview Interface — Data Redacted for Client Confidentiality';
      } else if (proj.id === 'MOD_02') {
        imgUrl = 'media__1779963258084.png';
        caption = 'AI QA Audit Pipeline Dashboard View — Internal Analytics Data Masked';
      } else if (proj.id === 'MOD_03') {
        imgUrl = 'media__1781341256406.png';
        caption = 'B2B Sales Portal Order Registry — Anonymized Client Transaction View';
      } else if (proj.id === 'MOD_04') {
        imgUrl = 'media__1781341573518.png';
        caption = 'Inventory Safety Buffer Optimization Model — Suppressed Stock Quantities';
      }

      flagshipVisualHtml = `
        <div class="project-visual-wrapper" style="margin: 1rem 0; border-radius: var(--radius-sm); overflow: hidden; border: 1px solid var(--border-light);">
          <img src="${imgUrl}" alt="${proj.title} Visual Proof" style="width: 100%; height: auto; display: block; filter: contrast(1.01) saturate(0.95);">
          <div class="project-visual-caption" style="padding: 0.5rem; background: rgba(15, 23, 42, 0.03); border-top: 1px solid var(--border-light); font-size: 0.72rem; color: var(--color-muted); font-family: var(--font-body); font-style: italic; text-align: center;">
            ${caption}
          </div>
        </div>
      `;
    }

    const links = getSemanticLinks(proj.id);

    card.innerHTML = `
      <div class="project-card-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
        <span class="mono-tag" style="background: ${isFlagship ? 'rgba(99, 102, 241, 0.08)' : 'rgba(15, 23, 42, 0.05)'}; color: ${isFlagship ? 'var(--accent-purple)' : 'var(--color-secondary)'}; border-color: ${isFlagship ? 'rgba(99,102,241,0.2)' : 'var(--border-light)'};">
          ${isFlagship ? '★ Flagship PRD' : (proj.category === 'ai-systems' ? 'AI Product PRD' : proj.category === 'fullstack' ? 'Web App MVP' : proj.category === 'supply-ops' ? 'Operations MVP' : 'Chrome Tool MVP')}
        </span>
        <span class="card-num" style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--color-muted); font-weight: 700;">${proj.id}</span>
      </div>
      <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--color-primary); margin-bottom: 0.5rem;">${proj.title}</h3>
      
      <p class="project-card-desc" style="font-size: 0.88rem; line-height: 1.55; color: var(--color-secondary); margin-bottom: 1rem;">
        ${proj.desc}
      </p>

      ${flagshipVisualHtml}

      <div class="strategic-outcome-widget" style="margin: 1.25rem 0; padding: 0.85rem; border-radius: var(--radius-sm); background: rgba(99, 102, 241, 0.03); border-left: 3px solid var(--accent-blue);">
        <div class="outcome-label" style="font-family: var(--font-mono); font-size: 0.65rem; font-weight: 700; color: var(--accent-blue); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.2rem;">Direct Business Outcome</div>
        <div class="outcome-text" style="font-size: 0.82rem; font-weight: 600; color: var(--color-primary); line-height: 1.4;">${proj.outcome}</div>
      </div>

      <div class="project-card-footer" style="display: flex; flex-direction: column; gap: 0.75rem; border-top: 1px solid var(--border-light); padding-top: 0.85rem; margin-top: auto;">
        <div class="project-tech-tags" style="display: flex; flex-wrap: wrap; gap: 0.35rem;">
          ${proj.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.72rem; color: var(--color-muted); font-family: var(--font-mono);">
          <span>Related: <span class="archive-action-link" style="color: var(--accent-blue); text-decoration: underline; cursor: pointer;" onclick="highlightProject('${links.project}')">${links.project}</span></span>
          <span>Theme: <em>${links.theme}</em></span>
        </div>
        <button class="case-study-trigger-btn" data-project="${proj.id}" style="width: 100%; margin-top: 0.5rem; padding: 0.5rem 1rem; font-size: 0.75rem; border-radius: var(--radius-sm); border: 1px solid var(--border-light); background: transparent; cursor: pointer; transition: all 0.2s ease;">
          🔎 View Product PRD / PoC &rarr;
        </button>
      </div>
    `;
    grid.appendChild(card);
  });

  // Dynamic card PRD deep-dives trigger
  const caseStudyTriggers = document.querySelectorAll('.case-study-trigger-btn');
  caseStudyTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const projectId = btn.getAttribute('data-project');
      const proj = projectData.find(p => p.id === projectId);
      if (!proj) return;
      
      const drawerProjectTitle = document.getElementById('drawerProjectTitle');
      const drawerBodyContent = document.getElementById('drawerBodyContent');
      const caseStudyDrawer = document.getElementById('caseStudyDrawer');

      if (caseStudyDrawer && drawerProjectTitle && drawerBodyContent) {
        drawerProjectTitle.textContent = proj.title + " (PRD)";
        drawerBodyContent.innerHTML = `
          <div class="case-study-section" style="margin-bottom: 1.5rem;">
            <h5 style="font-family: var(--font-mono); font-size: 0.7rem; font-weight: 700; text-transform: uppercase; color: var(--accent-blue); margin-bottom: 0.45rem;">The Business Bottleneck</h5>
            <p style="font-size: 0.88rem; line-height: 1.6; color: var(--color-secondary);">${proj.prd.bottleneck}</p>
          </div>
          <div class="case-study-section" style="margin-bottom: 1.5rem;">
            <h5 style="font-family: var(--font-mono); font-size: 0.7rem; font-weight: 700; text-transform: uppercase; color: var(--accent-blue); margin-bottom: 0.45rem;">The Target User & Goal</h5>
            <p style="font-size: 0.88rem; line-height: 1.6; color: var(--color-secondary);">${proj.prd.userGoal}</p>
          </div>
          <div class="case-study-section" style="margin-bottom: 1.5rem;">
            <h5 style="font-family: var(--font-mono); font-size: 0.7rem; font-weight: 700; text-transform: uppercase; color: var(--accent-blue); margin-bottom: 0.45rem;">AI Strategy & Trade-offs</h5>
            <p style="font-size: 0.88rem; line-height: 1.6; color: var(--color-secondary);">${proj.prd.strategy}</p>
          </div>
          <div class="case-study-section">
            <h5 style="font-family: var(--font-mono); font-size: 0.7rem; font-weight: 700; text-transform: uppercase; color: var(--accent-blue); margin-bottom: 0.45rem;">Success Metrics</h5>
            <p style="font-size: 0.88rem; line-height: 1.6; color: var(--color-secondary);">${proj.prd.metrics}</p>
          </div>
        `;
        caseStudyDrawer.classList.add('open');
      }
    });
  });
}

// Toast System
function showToast(message) {
  const toast = document.createElement('div');
  toast.style.position = 'fixed';
  toast.style.bottom = '32px';
  toast.style.left = '50%';
  toast.style.transform = 'translateX(-50%) translateY(20px)';
  toast.style.background = 'rgba(15, 23, 42, 0.9)';
  toast.style.color = '#ffffff';
  toast.style.padding = '0.65rem 1.5rem';
  toast.style.borderRadius = '99px';
  toast.style.fontSize = '0.8rem';
  toast.style.fontFamily = 'var(--font-display)';
  toast.style.fontWeight = '600';
  toast.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
  toast.style.zIndex = '99999';
  toast.style.opacity = '0';
  toast.style.pointerEvents = 'none';
  toast.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
  toast.textContent = message;
  
  document.body.appendChild(toast);
  toast.offsetHeight; // force repaint
  
  toast.style.transform = 'translateX(-50%) translateY(0)';
  toast.style.opacity = '1';
  
  setTimeout(() => {
    toast.style.transform = 'translateX(-50%) translateY(-20px)';
    toast.style.opacity = '0';
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 400);
  }, 2200);
}

// Semantic interlinking mappings
function getSemanticLinks(id) {
  const links = {
    MOD_01: { project: "MOD_02", theme: "AI-Augmented Decision Making", area: "AI Automation" },
    MOD_02: { project: "MOD_01", theme: "AI-Augmented Decision Making", area: "AI Automation" },
    MOD_03: { project: "MOD_07", theme: "Information Systems", area: "Digital Integration" },
    MOD_04: { project: "MOD_10", theme: "Operations Research", area: "Inventory Optimization" },
    MOD_05: { project: "MOD_14", theme: "Information Systems", area: "Business Intelligence" },
    MOD_06: { project: "MOD_03", theme: "Information Systems", area: "Product Operations" },
    MOD_07: { project: "MOD_03", theme: "Organizational Systems", area: "Process Improvement" },
    MOD_08: { project: "MOD_09", theme: "Organizational Systems", area: "Process Improvement" },
    MOD_09: { project: "MOD_08", theme: "Organizational Systems", area: "Process Improvement" },
    MOD_10: { project: "MOD_04", theme: "Operations Research", area: "Inventory Optimization" },
    MOD_11: { project: "MOD_16", theme: "Information Systems", area: "AI Automation" },
    MOD_12: { project: "MOD_19", theme: "Operations Research", area: "Operational Analytics" },
    MOD_13: { project: "MOD_07", theme: "Organizational Systems", area: "Process Improvement" },
    MOD_14: { project: "MOD_05", theme: "Information Systems", area: "Business Intelligence" },
    MOD_15: { project: "MOD_22", theme: "Predictive Analytics", area: "Operational Analytics" },
    MOD_16: { project: "MOD_11", theme: "Information Systems", area: "AI Automation" },
    MOD_17: { project: "MOD_21", theme: "Operations Research", area: "Process Improvement" },
    MOD_18: { project: "MOD_03", theme: "Information Systems", area: "AI Automation" },
    MOD_19: { project: "MOD_12", theme: "Operations Research", area: "Operational Analytics" },
    MOD_20: { project: "MOD_04", theme: "Operations Research", area: "Process Improvement" },
    MOD_21: { project: "MOD_17", theme: "Operations Research", area: "Process Improvement" },
    MOD_22: { project: "MOD_15", theme: "Predictive Analytics", area: "Operational Analytics" },
    MOD_23: { project: "MOD_01", theme: "AI-Augmented Decision Making", area: "AI Automation" }
  };
  return links[id] || { project: "MOD_02", theme: "General Systems", area: "Business Systems" };
}


/* ==========================================================================
   INITIALIZATION & INTERACTIVE BINDINGS
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize WebGL Knowledge Graph
  initThree();

  // 2. Navigation Active Tab Highlighting & Scroll HUD Counter
  const navLinks = document.querySelectorAll('.nav-link-item a');
  const sections = document.querySelectorAll('section');
  const sectionMeta = {
    'hero': 'HERO // INTRO',
    'projects': 'SELECTED WORK',
    'skills': 'CAPABILITY MATRIX',
    'experience': 'EXPERIENCE TIMELINE',
    'research': 'RESEARCH FOCUS',
    'writing': 'CREATIVE WRITING',
    'connect': 'CONTACT // CONNECT'
  };

  function updateScrollHUD() {
    const mainNav = document.getElementById('mainNav');
    if (mainNav) {
      if (window.scrollY > 40) {
        mainNav.classList.add('scrolled');
      } else {
        mainNav.classList.remove('scrolled');
      }
    }

    let currentActive = "hero";
    let activeIndex = 0;
    sections.forEach((section, idx) => {
      const rect = section.getBoundingClientRect();
      // Use middle of the screen as trigger point
      if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= window.innerHeight * 0.45) {
        currentActive = section.getAttribute('id');
        activeIndex = idx;
      }
    });

    // Update active nav links
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentActive}`) {
        link.classList.add('active');
      }
    });

    // Update HUD counters
    const counterEl = document.getElementById('hud-counter');
    const counterMetaEl = document.getElementById('hud-counter-meta');
    if (counterEl) {
      const displayIndex = String(activeIndex + 1).padStart(2, '0');
      counterEl.textContent = `${displayIndex} / 07`;
    }
    if (counterMetaEl) {
      counterMetaEl.textContent = sectionMeta[currentActive] || '';
    }
  }

  window.addEventListener('scroll', updateScrollHUD);
  updateScrollHUD();

  // 2b. Chandigarh HUD Clock Update Loop
  function updateHudClock() {
    const clockEl = document.getElementById('hud-clock');
    if (!clockEl) return;
    const now = new Date();
    // Convert to Chandigarh (IST / Asia/Kolkata)
    const options = {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };
    try {
      const formatter = new Intl.DateTimeFormat('en-US', options);
      clockEl.textContent = `${formatter.format(now)} — CHANDIGARH`;
    } catch (e) {
      // Fallback
      const hh = String(now.getHours()).padStart(2, '0');
      const mm = String(now.getMinutes()).padStart(2, '0');
      const ss = String(now.getSeconds()).padStart(2, '0');
      clockEl.textContent = `${hh}:${mm}:${ss} — CHANDIGARH`;
    }
  }
  updateHudClock();
  setInterval(updateHudClock, 1000);


  // Mobile Nav Drawer Toggle
  const navToggle = document.getElementById('navToggle');
  const navLinksList = document.getElementById('navLinks');
  if (navToggle && navLinksList) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinksList.classList.toggle('open');
    });
    
    navLinksList.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinksList.classList.remove('open');
      });
    });
  }

  // 3. Render Projects Grid
  renderProjectGrid();

  // Hash link routing for system registry profiles
  if (window.location.hash) {
    const hash = window.location.hash.substring(1);
    if (hash.startsWith('project-row-')) {
      const id = hash.replace('project-row-', '');
      setTimeout(() => {
        highlightProject(id);
      }, 500);
    }
  }

  // 4. Projects Filter Grid Event Wiring
  const filterPills = document.querySelectorAll('.projects-filter-bar .filter-pill');
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const filter = pill.getAttribute('data-filter');
      filterProjects(filter);
    });
  });

  // 5. Searchable Writing Archive Logic
  const creativeSearchInput = document.getElementById('creativeSearch');
  const creativeFilters = document.querySelectorAll('#creativeFilters .archive-filter-btn');
  const creativeCards = document.querySelectorAll('#creativeGrid .archive-card');

  function filterCreativeGrid() {
    const query = creativeSearchInput.value.toLowerCase().trim();
    const activeFilterBtn = document.querySelector('#creativeFilters .archive-filter-btn.active');
    const filterCat = activeFilterBtn ? activeFilterBtn.getAttribute('data-cat') : 'all';

    creativeCards.forEach(card => {
      const title = card.querySelector('h3').textContent.toLowerCase();
      const text = card.querySelector('p').textContent.toLowerCase();
      const tags = Array.from(card.querySelectorAll('.mono-tag')).map(t => t.textContent.toLowerCase()).join(' ');
      const category = card.getAttribute('data-category');

      const matchesSearch = title.includes(query) || text.includes(query) || tags.includes(query);
      const matchesCategory = filterCat === 'all' || category === filterCat;

      card.style.display = (matchesSearch && matchesCategory) ? 'flex' : 'none';
    });
  }

  if (creativeSearchInput) {
    creativeSearchInput.addEventListener('input', filterCreativeGrid);
  }

  creativeFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      creativeFilters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterCreativeGrid();
    });
  });

  // 6. Copy Direct Email/Phone Actions
  const directEmailLink = document.querySelector('a[href^="mailto:"]');
  if (directEmailLink) {
    directEmailLink.addEventListener('click', (e) => {
      e.preventDefault();
      navigator.clipboard.writeText("pratapjindal812@gmail.com");
      showToast("Email address copied to clipboard");
      setTimeout(() => {
        window.location.href = "mailto:pratapjindal812@gmail.com";
      }, 500);
    });
  }

  const directPhoneLink = document.querySelector('a[href^="tel:"]');
  if (directPhoneLink) {
    directPhoneLink.addEventListener('click', (e) => {
      e.preventDefault();
      navigator.clipboard.writeText("+917009019719");
      showToast("Secure voice number copied to clipboard");
      setTimeout(() => {
        window.location.href = "tel:+917009019719";
      }, 500);
    });
  }

  const directWaLink = document.querySelector('a[href*="wa.me"]');
  if (directWaLink) {
    directWaLink.addEventListener('click', () => {
      showToast("Redirecting to direct secure WhatsApp...");
    });
  }

  // 7. Case Study Close Drawer
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const caseStudyDrawer = document.getElementById('caseStudyDrawer');
  if (closeDrawerBtn && caseStudyDrawer) {
    closeDrawerBtn.addEventListener('click', () => {
      caseStudyDrawer.classList.remove('open');
    });
  }
  document.addEventListener('click', (e) => {
    if (caseStudyDrawer && caseStudyDrawer.classList.contains('open') && !caseStudyDrawer.contains(e.target) && !e.target.closest('.case-study-trigger-btn')) {
      caseStudyDrawer.classList.remove('open');
    }
  });

  // ==========================================================================
  // CUSTOM CURSOR MOVEMENT LOGIC
  // ==========================================================================
  let mouseXCursor = 0, mouseYCursor = 0;
  let ringX = 0, ringY = 0;
  const cursorDot = document.getElementById('customCursor');
  const cursorRing = document.getElementById('customCursorRing');

  if (cursorDot && cursorRing) {
    document.addEventListener('mousemove', (e) => {
      mouseXCursor = e.clientX;
      mouseYCursor = e.clientY;
      cursorDot.style.left = `${mouseXCursor}px`;
      cursorDot.style.top = `${mouseYCursor}px`;
    });

    const updateCursorRing = () => {
      ringX += (mouseXCursor - ringX) * 0.15;
      ringY += (mouseYCursor - ringY) * 0.15;
      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;
      requestAnimationFrame(updateCursorRing);
    };
    updateCursorRing();

    // Bind hovers to expand cursor
    const bindCursorHovers = () => {
      const hoverables = document.querySelectorAll('a, button, .filter-pill, .project-card, .direct-connect-cell, .archive-filter-btn');
      hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => {
          cursorDot.classList.add('hovered');
          cursorRing.classList.add('hovered');
        });
        el.addEventListener('mouseleave', () => {
          cursorDot.classList.remove('hovered');
          cursorRing.classList.remove('hovered');
        });
      });
    };
    bindCursorHovers();

    // Re-bind on grid rendering
    const originalRenderGrid = renderProjectGrid;
    renderProjectGrid = function() {
      originalRenderGrid();
      bindCursorHovers();
    };
  }

  // ==========================================================================
  // MASCOT / ROBOT AVATAR INTEGRATION
  // ==========================================================================
  const robotPupils = document.querySelectorAll('.robot-pupil');
  const heroRobotHead = document.getElementById('heroRobotHead');
  const passwordField = document.getElementById('passwordField');
  const eyeStateLabel = document.getElementById('eye-state-label');
  const robotTears = document.querySelectorAll('.robot-tear');
  const closeBtn = document.getElementById('closeDrawerBtn');

  // Eyeball Tracking
  document.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    
    // Eyeballs translation
    robotPupils.forEach(pupil => {
      const rect = pupil.parentElement.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = clientX - cx;
      const dy = clientY - cy;
      const dist = Math.sqrt(dx*dx + dy*dy);
      const angle = Math.atan2(dy, dx);
      
      const maxMove = pupil.classList.contains('hero-pupil') ? 6.5 : 4.5;
      const moveX = Math.cos(angle) * Math.min(dist / 12, maxMove);
      const moveY = Math.sin(angle) * Math.min(dist / 12, maxMove);
      
      if (true) {
        pupil.style.transform = `translate(${moveX}px, ${moveY}px)`;
      }
    });

    // 3D Parallax Head Tilt for Hero
    if (heroRobotHead) {
      const rx = -((clientY - window.innerHeight / 2) / (window.innerHeight / 2)) * 12; // pitch
      const ry = ((clientX - window.innerWidth / 2) / (window.innerWidth / 2)) * 12;   // yaw
      gsap.to(heroRobotHead, {
        rotateX: rx,
        rotateY: ry,
        duration: 0.3,
        ease: "power2.out",
        transformPerspective: 400
      });
    }
  });

  // Blinking loop
  const triggerMascotBlink = () => {
    // Blinking continuous
    gsap.to(robotPupils, {
      scaleY: 0.05,
      duration: 0.08,
      yoyo: true,
      repeat: 1,
      ease: "power1.inOut",
      onComplete: () => {
        setTimeout(triggerMascotBlink, 3000 + Math.random() * 4000);
      }
    });
  };
  setTimeout(triggerMascotBlink, 3000);

  // Password Input Interactions removed - Secure Vault offline

  // Exit Intent / Close Button Crying Proximity
  let isCrying = false;
  
  const startCrying = () => {
    if (isCrying) return;
    isCrying = true;
    if (eyeStateLabel) {
      eyeStateLabel.textContent = "DONT_LEAVE_ME";
      eyeStateLabel.style.color = "#ef4444";
    }
    robotTears.forEach(tear => {
      gsap.killTweensOf(tear);
      gsap.set(tear, { y: 0, scaleY: 0.3, opacity: 0 });
      gsap.to(tear, {
        opacity: 0.9,
        scaleY: 1.2,
        y: 12,
        duration: 0.6,
        ease: "power1.out"
      });
    });
    gsap.to(robotPupils, { y: 3, duration: 0.3 });
  };

  const stopCrying = () => {
    if (!isCrying) return;
    isCrying = false;
    if (eyeStateLabel) {
      eyeStateLabel.textContent = "SYSTEM_ACTIVE";
      eyeStateLabel.style.color = "";
    }
    robotTears.forEach(tear => {
      gsap.to(tear, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        ease: "power1.in",
        onComplete: () => {
          gsap.set(tear, { y: 0, scaleY: 0.3 });
        }
      });
    });
    gsap.to(robotPupils, { y: 0, duration: 0.3 });
  };

  document.addEventListener('mousemove', (e) => {
    if (e.clientY <= 45) {
      startCrying();
    } else {
      if (!e.target.closest('#closeDrawerBtn')) {
        stopCrying();
      }
    }
  });

  document.addEventListener('mouseleave', () => {
    startCrying();
  });

  document.addEventListener('mouseenter', () => {
    stopCrying();
  });

  if (closeBtn) {
    closeBtn.addEventListener('mouseenter', startCrying);
    closeBtn.addEventListener('mouseleave', stopCrying);
  }

  // Theme Toggle Logic
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  if (themeToggleBtn) {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-mode');
      themeToggleBtn.textContent = '☀️';
    } else {
      document.body.classList.remove('dark-mode');
      themeToggleBtn.textContent = '🌙';
    }

    themeToggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      if (isDark) {
        themeToggleBtn.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
        showToast("Switched to Carbon Dark Mode");
      } else {
        themeToggleBtn.textContent = '🌙';
        localStorage.setItem('theme', 'light');
        showToast("Switched to Alabaster Light Mode");
      }
    });
  }

  // ==========================================================================
  // INTERACTIVE MIS MOCK DASHBOARD SIMULATION
  // ==========================================================================
  const triggerScriptBtn = document.getElementById('trigger-script-btn');
  const terminalLog = document.getElementById('script-log-terminal');
  const metricHours = document.getElementById('metric-reporting-hours');
  const statusText = document.getElementById('widget-status-text');
  const chartPath = document.getElementById('chart-path');
  const chartArea = document.getElementById('chart-area');

  if (triggerScriptBtn) {
    let isRunning = false;
    triggerScriptBtn.addEventListener('click', () => {
      if (isRunning) return;
      isRunning = true;
      triggerScriptBtn.style.opacity = '0.6';
      triggerScriptBtn.textContent = 'Running Automation...';
      
      const logs = [
        'Connecting sheets...',
        'Parsing 500+ SKUs...',
        'Validating leadtimes...',
        'Sanitizing duplicates...',
        'Pushed to Looker!',
        'Optimal buffers set.'
      ];
      
      let logIndex = 0;
      terminalLog.style.color = 'var(--accent-purple)';
      
      const interval = setInterval(() => {
        if (logIndex < logs.length) {
          terminalLog.textContent = logs[logIndex];
          logIndex++;
        } else {
          clearInterval(interval);
          terminalLog.textContent = 'Execution Success!';
          terminalLog.style.color = '#10b981';
          triggerScriptBtn.style.opacity = '1';
          triggerScriptBtn.textContent = '⚡ Run Optimizer Again';
          if (statusText) {
            statusText.textContent = 'STATUS: RE-OPTIMIZED';
            statusText.style.color = '#10b981';
          }
          
          // Animate metrics
          if (metricHours && typeof gsap !== 'undefined') {
            gsap.to(metricHours, {
              textContent: 58,
              snap: { textContent: 1 },
              duration: 1,
              ease: 'power2.out',
              onComplete: () => {
                metricHours.textContent = '58h';
              }
            });
          } else if (metricHours) {
            metricHours.textContent = '58h';
          }
          
          // Smoothly animate the SVG chart path to reflect optimization!
          if (chartPath && chartArea && typeof gsap !== 'undefined') {
            gsap.to(chartPath, {
              attr: { d: "M 0,80 Q 50,40 100,20 T 200,10 T 300,2" },
              duration: 1.2,
              ease: "power2.out"
            });
            gsap.to(chartArea, {
              attr: { d: "M 0,100 L 0,80 Q 50,40 100,20 T 200,10 T 300,2 L 300,100 Z" },
              duration: 1.2,
              ease: "power2.out"
            });
          }

          showToast("Google Apps Script Optimization Loop Completed");
          isRunning = false;
        }
      }, 350);
    });
  }
});

