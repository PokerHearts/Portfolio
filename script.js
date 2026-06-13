/* ==========================================================================
   THREE.JS STRATEGIC SPATIAL UNIVERSE BACKGROUND — SUBTLE AMBIENT CANVAS
   ========================================================================== */
let scene, camera, renderer, dirLight;

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
  camera.position.set(0, 5, 25);

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
  .to(camera.position, { x: 8, y: -2, z: 18 })
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
  .to(camera.position, { x: -6, y: -8, z: 15 })
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
  .to(camera.position, { x: 5, y: -14, z: 20 })
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
  .to(camera.position, { x: -3, y: -20, z: 16 })
  .to(camera.rotation, { x: -0.1, y: 0.1, z: 0 }, "<");

  // Writing -> Contact
  gsap.timeline({
    scrollTrigger: {
      trigger: "#contact",
      start: "top bottom",
      end: "top top",
      scrub: 1.2
    }
  })
  .to(camera.position, { x: 0, y: -26, z: 22 })
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
  
  // Camera mouse parallax drift (only float if motion is not reduced)
  if (!isReduced && camera) {
    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;
    
    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += (-mouseY - camera.position.y) * 0.05;
  }

  if (renderer && scene && camera) {
    renderer.render(scene, camera);
  }
}


/* ==========================================================================
   DYNAMIC PROJECT DATABASE (22 Modules x 4 Modes)
   ========================================================================== */
const projectData = [
  {
    id: "MOD_01",
    category: "ai-systems",
    strategy: {
      title: "AI Voice Mock Interview Simulator & Portal",
      desc: "An interactive, serverless AI voice simulator developed for intensive mock interview training. Candidate resumes are parsed directly in the browser via PDF.js, triggering a real-time voice activity Hindi/English conversation loop (Web Audio/Speech APIs) featuring noise calibration and interruption-handling to model real-world high-pressure interviews.",
      outcomeLabel: "Operational Purpose & Cost",
      outcomeText: "Operates as a high-fidelity training sandbox; scales at ~$0.05 API cost per interview simulation, logging comprehensive performance feedback and scoring metrics to a central Sheets database.",
      tech: ["Gemini API", "Web Audio API", "PDF.js", "Apps Script"],
      cta: { text: "Deep-Dive Case Study", key: "hrVoice" }
    },
    product: {
      title: "AI Voice Mock Interview Simulator",
      badge: "AI Product",
      problem: "Candidates lack realistic, adaptive, real-time sandboxes to practice verbal delivery under pressure.",
      users: "108+ team members and corporate candidates.",
      solution: "Interactive, voice-first mock interview training portal using Web Audio and generative AI.",
      decisions: "Used browser-side PDF.js parsing to keep user data private and minimize server compute costs, combined with Speech API VAD calibration.",
      kpi: "API Cost per Interview",
      outcome: "Lowered costs to ~$0.05 per interview, capturing 100% of feedback markers."
    },
    research: {
      title: "Investigating LLM-Assisted Quality Evaluation in Decentralized Telecalling Environments",
      badge: "Research Investigation",
      theme: "AI-Augmented Decision Making",
      question: "How can decentralized telecalling environments leverage LLMs to democratize quality assurance without high computational overhead?",
      methodology: "Designed a Web Audio capture pipeline synced with LLM event parsing to grade voice transcripts against script parameters.",
      contribution: "Provides an empirical model for local speech-to-text inference and scoring, eliminating centralized sample audits."
    },
    transformation: {
      title: "Enterprise Voice Screening Digitization",
      badge: "AI Transformation",
      stream: "AI Transformation",
      before: "Manual screening by recruiters, causing long hiring lags and high coordination friction.",
      after: "AI-driven automated voice screening sandbox.",
      change: "Conducted interactive workshops for recruiting staff, showing how AI filters low-fit profiles and frees their time for high-value interviews.",
      value: "Reduced manual screening hours by 70%, with 100% database capture of candidate profiles."
    }
  },
  {
    id: "MOD_02",
    category: "ai-systems",
    strategy: {
      title: "AI-Powered Call QA Analysis System",
      desc: "An automated evaluation engine processing over 1,200 recordings daily (800 minutes of voice data) from 12 decentralized telecalling units. Analyzes audio transcripts to provide highly structured feedback on customer tone, script alignment, purchase intent, and next-action pipelines.",
      outcomeLabel: "Operational Outcome",
      outcomeText: "Eliminated manual QA sampling, driving 100% evaluation coverage and automated feedback loops for team leads.",
      tech: ["LLM Analytics", "Audio Pipelines", "Apps Script", "Drive API"],
      cta: { text: "Deep-Dive Case Study", key: "callQA" }
    },
    product: {
      title: "AI Call QA Analyst",
      badge: "Speech AI Product",
      problem: "Manual QA audits covered <2% of daily recordings, leaving agent execution errors undetected.",
      users: "12 decentralized telecalling units, auditing 1,200 daily records.",
      solution: "Speech-to-text transcript processing engine analyzing objections, script alignment, and tone.",
      decisions: "Restructured pipeline with a rate-limited task queuing matrix to handle API thresholds for 800 daily audio minutes.",
      kpi: "QA Coverage Rate",
      outcome: "Achieved 100% evaluation coverage, saving 360 hours of manual evaluation monthly."
    },
    research: {
      title: "Automating Organizational Auditing in Speech Channels Using Large Language Models",
      badge: "Research Investigation",
      theme: "AI-Augmented Decision Making",
      question: "What metrics optimize the consistency of LLM-based evaluations on customer intent and agent script adherence?",
      methodology: "Evaluated 1,200 records daily using semantic prompt templates, calculating Spearman correlation against human QA graders.",
      contribution: "Shows high correlation (r > 0.85) between prompt-engineered evaluators and professional auditors in localized language dialects."
    },
    transformation: {
      title: "QA Auditing Automation Initiative",
      badge: "AI Transformation",
      stream: "AI Transformation",
      before: "Manual checking of a 2% random sample of daily calls, leaving compliance issues hidden.",
      after: "Automated batch speech processing covering 100% of call recordings.",
      change: "Trained QA supervisors to interpret live Looker dashboards, shifting their role from call listening to targeted agent coaching.",
      value: "100% audit coverage, saving 360 hours/month and triggering real-time compliance alerts."
    }
  },
  {
    id: "MOD_03",
    category: "fullstack",
    strategy: {
      title: "B2B Order Booking Workspace",
      desc: "A serverless, mobile-optimized B2B order portal designed to replace scattered communication channels. Features client-side state caching, custom token authentication, catalog search engines, and real-time client-side PDF invoicing.",
      outcomeLabel: "Operational Outcome",
      outcomeText: "Slashed recurring booking loops by >60% while running at absolute zero operating cost via serverless hosting.",
      tech: ["Vanilla JS", "jsPDF", "Edge Cache", "Token Auth"],
      cta: { text: "Deep-Dive Case Study", key: "b2bOrder" }
    },
    product: {
      title: "B2B Sales Portal",
      badge: "Core Workspace",
      problem: "Scattered order collections via text/emails caused invoice errors and delayed booking (avg. 8 mins/order).",
      users: "Field sales agents and distributor reps.",
      solution: "Serverless web workspace with Edge caching, custom SKU filtering, and instant PDF invoice compilation.",
      decisions: "Bypassed heavy database costs by building secure client-side caching linked to serverless Apps Script endpoints.",
      kpi: "Average Booking Time",
      outcome: "Reduced booking time from 8 minutes to 45 seconds, with 100% ordering accuracy."
    },
    research: {
      title: "Low-Cost Mobile Workspaces: Caching and Authentication in Serverless B2B Frameworks",
      badge: "Research Investigation",
      theme: "Information Systems",
      question: "How can enterprise field-sales platforms establish transactional integrity at zero infrastructure cost?",
      methodology: "Built and evaluated a client-side Edge cached token-auth model over stateless HTTP endpoints.",
      contribution: "Establishes a zero-cost infrastructure framework for field agents, maintaining data consistency without database sessions."
    },
    transformation: {
      title: "B2B Sales Digitization Project",
      badge: "Operational Digitization",
      stream: "Operational Digitization",
      before: "Field agents wrote orders on paper or sent messages, leading to manual transcription errors.",
      after: "Integrated mobile order portal with instant invoice generation.",
      change: "Equipped agents with the mobile workspace and created real-time sync with dispatch.",
      value: "Slashed transaction booking loop by 60% with zero hardware/operating server costs."
    }
  },
  {
    id: "MOD_04",
    category: "supply-ops",
    strategy: {
      title: "Predictive Inventory & PO Optimizer",
      desc: "A strategic stock governance dashboard tracking absolute inventories, batch histories, safety margins, and active backlogs. Integrates a predictive reordering engine driven by safety thresholds and rolling averages, combined with complete vendor PO lifecycle tracking.",
      outcomeLabel: "Operational Outcome",
      outcomeText: "Reduced chronic shortages from 17 to 2, optimizing stock rotation and driving 20% sales expansion.",
      tech: ["Predictive Math", "Lifecycle Tracking", "Data Modeling"]
    },
    product: {
      title: "Inventory & PO Optimizer",
      badge: "Supply Product",
      problem: "Frequent stockouts and overstocking tied up capital and limited regional sales velocity.",
      users: "Supply chain managers and procurement officers.",
      solution: "Analytics dashboard tracking batch history and calculating reorder recommendations.",
      decisions: "Implemented safety stock formulations based on supplier lead-time variance rather than simple static caps.",
      kpi: "Chronic Shortages",
      outcome: "Reduced shortages from 17 to 2, accelerating stock rotation and enabling a 20% sales expansion."
    },
    research: {
      title: "Exploring Forecasting-Driven Inventory Governance in SME Distribution Systems",
      badge: "Research Investigation",
      theme: "Operations Research",
      question: "How do rolling-average demand models perform compared to fixed-reorder boundary systems in volatile supply chains?",
      methodology: "Analyzed historical distribution records to simulate stock levels under varying safety stock models.",
      contribution: "Provides a mathematical framework for reducing capital locks in distributor networks under lead-time variance."
    },
    transformation: {
      title: "Predictive Stock Optimizer Initiative",
      badge: "Decision Intelligence",
      stream: "Decision Intelligence",
      before: "Ad-hoc stock checks and manual PO creation, causing regular stockouts of key SKUs.",
      after: "Dashboard tracking batches, backlogs, and recommending reorder schedules.",
      change: "Conducted weekly supply reviews, training managers to act on recommended reorders.",
      value: "Chronic stock shortages fell by 88%, boosting stock rotation and sales velocity."
    }
  },
  {
    id: "MOD_05",
    category: "extensions",
    strategy: {
      title: "Looker Studio Real-Time Refresher",
      desc: "A custom Chrome extension engineered to bypass the native 15-minute Looker Studio data caching limits. Injects background event runners to trigger real-time, non-invasive dashboard database queries while completely preserving user-selected filters, pivots, and screen scroll coordinates.",
      outcomeLabel: "Operational Outcome",
      outcomeText: "Enabled real-time, live operational telemetry monitoring for senior executives during key cycles.",
      tech: ["Chrome Extension API", "DOM Injection", "Session Sync"]
    },
    product: {
      title: "Looker Real-Time Refresher",
      badge: "Chrome Extension",
      problem: "Native 15-minute caching limits prevented executive monitoring of live sales operations.",
      users: "Senior executives and operations controllers.",
      solution: "Chrome extension injecting background scripts to force data refreshes without losing filter states.",
      decisions: "Chose DOM event injection over full page reloading to prevent disruption to user viewports and active scroll ranges.",
      kpi: "Telemetry Query Lag",
      outcome: "Reduced telemetry lag from 15 minutes to instantaneous, real-time live monitoring."
    },
    research: {
      title: "Client-Side Caching Overrides in Visual Telemetry Dashboards",
      badge: "Research Investigation",
      theme: "Information Systems",
      question: "Can DOM manipulation bypass visual caching boundaries without causing server-side rate limits?",
      methodology: "Injected event loops into Looker's rendering frame, measuring network traffic and query success rates.",
      contribution: "Demonstrates a client-side override method for dashboard queries, enabling low-latency data rendering without UI disruptions."
    },
    transformation: {
      title: "Live Telemetry Enablement",
      badge: "Process Automation",
      stream: "Process Automation",
      before: "Dashboard limits forced managers to wait 15 minutes for operations updates.",
      after: "Chrome extension providing non-disruptive, live telemetry refresh.",
      change: "Deployed the extension to the executive team, creating a dashboard monitoring terminal in the operations room.",
      value: "Enabled real-time operational response during peak sales and transit hours."
    }
  },
  {
    id: "MOD_06",
    category: "fullstack",
    strategy: {
      title: "OmniReader — Spatial Reader Workspace",
      desc: "A premium, ultra-fast client-side document reading environment processing EPUB, PDF, and DOCX extensions. Built with local storage state management, dynamic semantic outlines, text-to-speech rendering, full-text instant index indexing, and adaptive layout themes.",
      outcomeLabel: "Operational Outcome",
      outcomeText: "Zero server-load cost architecture keeping reading sessions fully private and localized inside client sandboxes.",
      tech: ["EPUB.js", "Scale-Free", "Local Indexing"],
      cta: { text: "Deploy Reader Portal", url: "https://reader.pokerhearts.in" }
    },
    product: {
      title: "OmniReader Document Workspace",
      badge: "Scale-Free Product",
      problem: "Standard document readers require heavy servers for parsing, creating privacy concerns and server overhead.",
      users: "Readers processing EPUB, PDF, and DOCX files.",
      solution: "Fully client-side reader with full-text search, outline indexing, and TTS rendering.",
      decisions: "Opted for client-side file reading, storing reading configurations in IndexedDB to protect data privacy.",
      kpi: "Server Infrastructure Cost",
      outcome: "Reduced server operating costs to $0.00 while maintaining private, localized reading sandboxes."
    },
    research: {
      title: "Cognitive Outline Navigation in Browser-Based E-Readers",
      badge: "Research Investigation",
      theme: "Information Systems",
      question: "How does client-side outline generation affect visual search performance and user text retention?",
      methodology: "Measured document scanning speeds on client-parsed outlines versus linear reading panes.",
      contribution: "Validates the effectiveness of local semantic indexing in enhancing navigation speed in browser environments."
    },
    transformation: {
      title: "OmniReader Platform",
      badge: "Operational Digitization",
      stream: "Operational Digitization",
      before: "Corporate document reviewing relied on scattered PDF readers, leaking text coordinates.",
      after: "Central, client-side, privacy-focused e-reading platform.",
      change: "Migrated review processes to the local sandbox workspace, ensuring documents stay on user systems.",
      value: "Achieved 100% data privacy compliance at zero server hosting overhead."
    }
  },
  {
    id: "MOD_07",
    category: "supply-ops",
    strategy: {
      title: "End-to-End Sales Control System",
      desc: "An operations tracking system managing order pipelines from entry to transit, delivery verification, and exception logging. Includes trigger alerts and structured task assignments for dispatch supervisors.",
      outcomeLabel: "Operational Outcome",
      outcomeText: "Decreased order-to-dispatch transit lag by 30% and enhanced final delivery success metrics by 15%.",
      tech: ["Workflow Design", "Lead Time Optimization", "Exception Handlers"]
    },
    product: {
      title: "Sales Dispatch & Control Hub",
      badge: "Operations Product",
      problem: "Poor tracking of order dispatch pipelines led to delivery delays and high transit exception rates.",
      users: "Dispatch supervisors and delivery controllers.",
      solution: "Transit tracking workspace with exception logs, SLA timers, and automated team assignments.",
      decisions: "Designed the system with color-coded transit status blocks to prioritize resolving critical exception delays.",
      kpi: "Order-to-Dispatch Lag",
      outcome: "Decreased dispatch lag by 30% and improved delivery success rates by 15%."
    },
    research: {
      title: "Modeling Transit Anomalies in Decentralized Logistics Systems",
      badge: "Research Investigation",
      theme: "Organizational Systems",
      question: "What exceptions cause the highest dispatch delays in local distributor hubs?",
      methodology: "Logged and categorized 10,000 order transit paths, running ANOVA on exception categories and delay outcomes.",
      contribution: "Categorizes operational transit bottlenecks, validating automated escalation alerts as a solution."
    },
    transformation: {
      title: "Sales Dispatch Digitization",
      badge: "Operational Digitization",
      stream: "Operational Digitization",
      before: "Manual entry of dispatch states and verbal supervisor handoffs, causing log delays.",
      after: "Central tracking portal with automated exception and escalation logging.",
      change: "Redesigned warehouse dispatch routines, establishing digital check-ins for all outgoing vehicles.",
      value: "Slashed order transit lags by 30% while raising final delivery metrics by 15%."
    }
  },
  {
    id: "MOD_08",
    category: "supply-ops",
    strategy: {
      title: "Task Matrix & Performance Scoring",
      desc: "An enterprise execution matrix linking periodic staff tasks to individual performance logs, structuring a feedback loop from assignment to final scoring evaluation.",
      outcomeLabel: "Operational Outcome",
      outcomeText: "Lifted general SLA compliance and task completion indices by 40% across administrative departments.",
      tech: ["Performance Systems", "Scoring Math"]
    },
    product: {
      title: "Staff Performance Matrix",
      badge: "Internal Tool",
      problem: "Lack of structured task tracking caused missed deadlines and subjective performance reviews.",
      users: "Administrative managers and department staff.",
      solution: "Task accountability matrix linking regular deliverables to objective performance logs.",
      decisions: "Used a relative score distribution model rather than absolute marks to prevent grading inflation across teams.",
      kpi: "SLA Compliance Rate",
      outcome: "Increased administrative SLA compliance by 40% using automated performance logging."
    },
    research: {
      title: "Evaluating Objective Feedback Loops in Administrative Operations",
      badge: "Research Investigation",
      theme: "Organizational Systems",
      question: "How does periodic performance logging affect task completion times in non-sales departments?",
      methodology: "Conducted a pre-post study of task compliance rates before and after implementing structured matrix scoring.",
      contribution: "Shows that transparent performance evaluation models significantly reduce task completion latency (p < 0.05)."
    },
    transformation: {
      title: "Task Execution Restructuring",
      badge: "Process Automation",
      stream: "Governance & Control",
      before: "Verbal delegation and retrospective reviews, causing delayed reports and disputes.",
      after: "Structured performance matrix matching roles to weekly tasks.",
      change: "Introduced gamified monthly reviews based on matrix outcomes, rewarding high-performance metrics.",
      value: "Boosted department SLA compliance by 40%, inverting task neglect rates."
    }
  },
  {
    id: "MOD_09",
    category: "supply-ops",
    strategy: {
      title: "District Monopoly & Control System",
      desc: "A dynamic territory mapping and management database tracking monopoly allocations, local sales performance, warning triggers, and automated contract termination logs.",
      outcomeLabel: "Operational Outcome",
      outcomeText: "Streamlined regional governance and automated warnings for underperforming territory allocations.",
      tech: ["Territory Mapping", "Data Automation", "SLA Warnings"]
    },
    product: {
      title: "Territory Governance System",
      badge: "Governance Tool",
      problem: "Overlapping territory allocations caused dealer disputes, diluting brand pricing margins.",
      users: "Territory sales managers and legal compliance teams.",
      solution: "Dealer mapping database monitoring monopoly boundaries and sales performance thresholds.",
      decisions: "Implemented automated warnings that fire as soon as regional dealer volumes drop below local targets.",
      kpi: "Dealer Disputes Resolved",
      outcome: "Resolved overlapping distribution disputes, automating contract compliance checks."
    },
    research: {
      title: "Territory Governance Models in SME Franchise Distribution",
      badge: "Research Investigation",
      theme: "Organizational Systems",
      question: "What territory parameters minimize dealer channel conflict and pricing erosion?",
      methodology: "Analyzed spatial distribution patterns of dealer networks, mapping pricing compliance against distance and volume.",
      contribution: "Formulates a spatial control method for franchise operations, demonstrating the benefits of hard boundary rules."
    },
    transformation: {
      title: "Dealer Control Digitization",
      badge: "Governance & Control",
      stream: "Governance & Control",
      before: "Scribbled lists and verbal agreements of dealership allocations, causing boundary disputes.",
      after: "Database linking dealer locations, contract terms, and warning thresholds.",
      change: "Created a formal geographic database of allocations, training managers to verify overlaps before new contracts.",
      value: "Streamlined regional dealer governance, resolving channel overlaps and price erosion."
    }
  },
  {
    id: "MOD_10",
    category: "supply-ops",
    strategy: {
      title: "Short Product & Restock Trigger",
      desc: "A real-time database capturing unfulfilled client demand during order placement and linking it with active inventory updates to auto-alert sales agents as soon as items return to stock.",
      outcomeLabel: "Operational Outcome",
      outcomeText: "Recovered previously lost repeat orders by instantly pushing availability notifications to regional reps.",
      tech: ["Inventory Triggers", "Lead Recovery", "Event Hooks"]
    },
    product: {
      title: "Restock Notification Engine",
      badge: "Sales Product",
      problem: "When items went out of stock, client orders were cancelled and salesmen forgot to re-pitch when items returned.",
      users: "Sales agents and inventory controllers.",
      solution: "Demand capture database linking unfulfilled sales orders to inventory arrival hooks for automated alerts.",
      decisions: "Created direct WhatsApp/Email alert triggers for regional reps rather than passive dashboard markers.",
      kpi: "Recovered Sales Orders",
      outcome: "Bypassed order losses by notifying agents the moment items hit the shelves."
    },
    research: {
      title: "Demand Backlogging and Recovery in SME Distribution Channels",
      badge: "Research Investigation",
      theme: "Operations Research",
      question: "Can localized alert loops recover backlogged order demand during stockouts?",
      methodology: "Measured conversion success of backlogged orders notified within 24 hours of restock against standard lists.",
      contribution: "Shows that prompt recovery notification models significantly increase buyer retention (p < 0.01) after stockouts."
    },
    transformation: {
      title: "Lost Demand Capture Project",
      badge: "Operational Digitization",
      stream: "Operational Digitization",
      before: "Out-of-stock items were deleted from orders, with zero tracking of missed revenue.",
      after: "Database capturing short product requests, linked to incoming stock alerts.",
      change: "Instructed order bookers to log every short item, aligning the workflow with stock arrivals.",
      value: "Recovered previously lost sales, creating a reliable ledger of unfilled demand."
    }
  },
  {
    id: "MOD_11",
    category: "supply-ops",
    strategy: {
      title: "Lead Quality & De-duplication Engine",
      desc: "A validation pipeline utilizing regular expression validation and dynamic cross-referencing algorithms to clean and de-duplicate contact database sheets before CRM entry.",
      outcomeLabel: "Operational Outcome",
      outcomeText: "Eliminated ~25% database clutter and duplicate lead allocations, preserving CRM record hygiene.",
      tech: ["Regex Parsers", "Data Cleaning", "CRM Validation"]
    },
    product: {
      title: "Lead Cleaning Engine",
      badge: "Data Product",
      problem: "Duplicate client data uploads caused salesmen to pitch to the same contacts, creating friction.",
      users: "CRM administrators and lead generation leads.",
      solution: "Lead cleaning pipeline with regex validation and dynamic cross-reference matching.",
      decisions: "Implemented fuzzy phone number normalization to catch duplicates using different formats.",
      kpi: "CRM Clutter Reduced",
      outcome: "Cleaned contact files before database import, removing 25% duplicate and invalid entries."
    },
    research: {
      title: "Heuristic Data Cleaning in Low-Resource CRM Integrations",
      badge: "Research Investigation",
      theme: "Information Systems",
      question: "What matching thresholds balance de-duplication accuracy with computation cost in SME databases?",
      methodology: "Tested regex and levenshtein distance parameters on 50,000 sales records to identify duplicates.",
      contribution: "Provides a practical cleaning protocol for resource-constrained companies lacking dedicated data tools."
    },
    transformation: {
      title: "CRM Lead Sanitation Initiative",
      badge: "Process Automation",
      stream: "Process Automation",
      before: "Manual upload of lists, causing duplicate records and split customer logs.",
      after: "Pipeline using regular expressions and cross-matching to clean leads before entry.",
      change: "Set a strict upload workflow: all lists must pass through the de-duplication script before import.",
      value: "Preserved CRM integrity, preventing duplicate calls and saving agent time."
    }
  },
  {
    id: "MOD_12",
    category: "supply-ops",
    strategy: {
      title: "Vendor Payables Ledger Dashboard",
      desc: "A secure cash outflow dashboard organizing payments, credit timelines, and validation logs, featuring automated alerts on upcoming invoice maturities.",
      outcomeLabel: "Operational Outcome",
      outcomeText: "Optimized working capital visibility and avoided delay penalties across 40+ corporate supply vendors.",
      tech: ["Finance Tracking", "Maturity Alerts", "Cash Flow Ops"]
    },
    product: {
      title: "Vendor Payables Hub",
      badge: "Finance Product",
      problem: "Delayed invoices led to late penalties and interrupted manufacturer supply channels.",
      users: "Accounts payable teams and finance heads.",
      solution: "Outflow dashboard tracking credit periods, validation files, and maturity timers.",
      decisions: "Built a calendar view showing daily cash requirements to prevent sudden working capital locks.",
      kpi: "Supplier Late Penalties",
      outcome: "Avoided late penalties across 40+ vendors, keeping credit channels open."
    },
    research: {
      title: "Optimizing Working Capital in Supply Networks through Cash Outflow Modeling",
      badge: "Research Investigation",
      theme: "Operations Research",
      question: "How do credit maturity alerts affect distributor cash reserves and credit ratings?",
      methodology: "Analyzed cash flows and payment cycles before and after implementing maturity dashboards.",
      contribution: "Shows the impact of credit maturity visibility on improving supplier relationship metrics."
    },
    transformation: {
      title: "Accounts Payable Digitization",
      badge: "Governance & Control",
      stream: "Governance & Control",
      before: "Physical invoice filing and calendar notes, leading to missed vendor payment deadlines.",
      after: "Secure outflow dashboard tracking credit periods, maturities, and payment statuses.",
      change: "Digitized vendor records and set up weekly reviews based on automated invoice warnings.",
      value: "Optimized capital visibility, avoiding penalties across 40+ supply vendors."
    }
  },
  {
    id: "MOD_13",
    category: "supply-ops",
    strategy: {
      title: "Complaint Management & Escalation Engine",
      desc: "A multi-level trouble ticketing system routing client and operational complaints to corresponding team leads with built-in escalation timers.",
      outcomeLabel: "Operational Outcome",
      outcomeText: "Slashed average complaint resolution cycle times by 48 hours via structured department escalation triggers.",
      tech: ["Escalation Logic", "SLA Tracking", "Ticketing Pipelines"]
    },
    product: {
      title: "Complaint Escalation Hub",
      badge: "SLA Product",
      problem: "Client complaints got stuck in employee email boxes, causing long resolution times.",
      users: "Customer support agents and operations heads.",
      solution: "Ticketing dashboard routing logs to departments with built-in escalation warnings.",
      decisions: "Set up warning escalations that alert division heads if a ticket stays open past 24 hours.",
      kpi: "Avg. Resolution Time",
      outcome: "Slashed average complaint resolution time by 48 hours via automated escalations."
    },
    research: {
      title: "Escalation Dynamics in Multi-Tier Service Operations",
      badge: "Research Investigation",
      theme: "Organizational Systems",
      question: "How do warning loops impact ticket resolution times in decentralized operations?",
      methodology: "Tracked ticket lifecycles across teams, measuring the impact of escalation warnings on completion speed.",
      contribution: "Demonstrates the benefits of automated warning loops in resolving administrative delays."
    },
    transformation: {
      title: "Complaint Resolution Redesign",
      badge: "Operational Digitization",
      stream: "Operational Digitization",
      before: "Client complaints were sent to different emails, with no central ticket tracking.",
      after: "Central ticketing portal with automated team routing and escalations.",
      change: "Set up a direct complaint channel for clients, routing tickets to team leads.",
      value: "Slashed resolution cycles by 48 hours, improving client trust metrics."
    }
  },
  {
    id: "MOD_14",
    category: "supply-ops",
    strategy: {
      title: "Unified Inventory, Batch & Collections Ledger",
      desc: "A comprehensive operational dataset model unifying inventory records, production batch lifetimes, and cash collections into a consolidated corporate reporting layer.",
      outcomeLabel: "Operational Outcome",
      outcomeText: "Consolidated three previously isolated data streams into a single source of truth for boardroom reviews.",
      tech: ["SQL-Like Querying", "Data Blending", "Integrations"]
    },
    product: {
      title: "Unified Operations Ledger",
      badge: "Data Portal",
      problem: "Siloed data in sales, stock, and cash ledgers made it hard to review weekly performance.",
      users: "Boardroom executives and finance controllers.",
      solution: "Integrated ledger blending stock batches, invoices, and payment data.",
      decisions: "Chose to merge data at the report layer rather than altering underlying system databases to prevent sync errors.",
      kpi: "Report Processing Time",
      outcome: "Consolidated three isolated systems into a single dashboard for executive meetings."
    },
    research: {
      title: "Data Blending in Fragmented Legacy Enterprise Architectures",
      badge: "Research Investigation",
      theme: "Information Systems",
      question: "How can legacy records be merged to support real-time executive decision-making?",
      methodology: "Compared data loading speeds of live database queries against batch blended dashboards.",
      contribution: "Validates a lightweight blending approach for legacy systems, avoiding database migrations."
    },
    transformation: {
      title: "Operational Data Integration",
      badge: "Operational Digitization",
      stream: "Operational Digitization",
      before: "Excel files from different departments had to be manually merged for weekly meetings.",
      after: "Automated database blending compiling stock, batches, and cash into one screen.",
      change: "Standardized data schemas across sales, warehouse, and finance teams.",
      value: "Replaced manual consolidation, saving hours of weekly Excel work."
    }
  },
  {
    id: "MOD_15",
    category: "ai-systems",
    strategy: {
      title: "SCOT Predictive Purchase Pattern Dashboard",
      desc: "A behavior-driven predictive dashboard analyzing historical B2B purchase frequencies to calculate and forecast future reorder timelines per client.",
      outcomeLabel: "Operational Outcome",
      outcomeText: "Enabled predictive sales calling across 500+ SKUs by anticipating client restocking cycles.",
      tech: ["Data Modeling", "Looker Studio", "Predictive Demand"]
    },
    product: {
      title: "SCOT Purchase Predictor",
      badge: "Analytics Product",
      problem: "Sales calls were reactive, missing dealer inventory exhaustion moments.",
      users: "Sales reps and regional managers.",
      solution: "Predictive dashboard tracking customer purchasing histories to estimate future restocking dates.",
      decisions: "Utilized client-specific demand waves rather than national averages to customize sales calling triggers.",
      kpi: "Predictive Pitch Accuracy",
      outcome: "Enabled predictive sales calling across 500+ SKUs, increasing client repeat buys."
    },
    research: {
      title: "Modeling Customer Purchasing Behavior and Credit Risk in B2B SME Systems",
      badge: "Research Investigation",
      theme: "Predictive Analytics",
      question: "Can transaction anomalies predict dealer credit defaults before they occur?",
      methodology: "Analyzed credit periods and payment lags on 2,000 accounts, running classification trees for risk indicators.",
      contribution: "Develops a credit scoring system for small-scale distributors, lowering payment risks."
    },
    transformation: {
      title: "Predictive Sales Transformation",
      badge: "Decision Intelligence",
      stream: "Decision Intelligence",
      before: "Sales reps waited for dealers to call, losing orders to competitors.",
      after: "Dashboard showing clients whose inventories are likely running low.",
      change: "Trained agents to make proactive sales calls based on dashboard restocking dates.",
      value: "Boosted outbound sales conversions and improved client purchase rates."
    }
  },
  {
    id: "MOD_16",
    category: "extensions",
    strategy: {
      title: "Android Call Recording Synchronizer",
      desc: "A custom background mobile script running localized file system hooks on Android devices to safely ingest and sync call audio recordings straight to secure Drive folders.",
      outcomeLabel: "Operational Outcome",
      outcomeText: "Secured 100% data compliance capture rates for the call quality evaluation pipeline across 12 remote agents.",
      tech: ["Android Automation", "Drive API", "Background Hooks"]
    },
    product: {
      title: "Android Call Sync Agent",
      badge: "Operations Tool",
      problem: "Remote agents forgot to upload recording files, breaking the call QA analysis cycle.",
      users: "12 remote telecalling agents.",
      solution: "Android background script monitoring directory creations and syncing files to Drive.",
      decisions: "Faced with mobile OS sleep cycles, designed a deferred check-in process that restarts upload threads.",
      kpi: "Call Capture Compliance",
      outcome: "Secured 100% call capture compliance, feeding recordings into the AI QA evaluator."
    },
    research: {
      title: "Low-Latency Synchronizations in Mobile Enterprise Environments",
      badge: "Research Investigation",
      theme: "Information Systems",
      question: "How can mobile apps sync media assets under battery restrictions and limited networks?",
      methodology: "Compared upload completion rates of foreground uploads versus background hook scripts.",
      contribution: "Shows how mobile OS directory watchers can be set up to secure media assets without high battery drain."
    },
    transformation: {
      title: "Call Compliance Digitization",
      badge: "Process Automation",
      stream: "Process Automation",
      before: "Manual sharing of audio files over chat, causing lost files and compliance risks.",
      after: "Background mobile script uploading calls automatically to cloud folder.",
      change: "Installed the sync script on agent phones and automated upload validation.",
      value: "Raised QA compliance rate to 100%, feeding the speech analysis pipeline."
    }
  },
  {
    id: "MOD_17",
    category: "supply-ops",
    strategy: {
      title: "Control Sample Lifecycle Monitor",
      desc: "A quality audit logging environment tracing periodic product control samples, cross-referencing batch numbers and expiration schedules.",
      outcomeLabel: "Operational Outcome",
      outcomeText: "Achieved 100% structural alignment with regulatory quarterly pharmaceutical quality audit sheets.",
      tech: ["SOP Logging", "Lifecycle Tracking", "QC Audits"]
    },
    product: {
      title: "Control Sample Tracker",
      badge: "Quality Product",
      problem: "Tracking physical control samples in pharmaceutical batches was manual, risking audit failures.",
      users: "Quality control officers and warehouse managers.",
      solution: "Digital logging environment cross-referencing batch IDs and sample locations.",
      decisions: "Used automated status flags to highlight expiring control samples before quarterly audit cycles.",
      kpi: "Audit Compliance Score",
      outcome: "Secured 100% compliance alignment with regulatory quality audit requirements."
    },
    research: {
      title: "Traceability Models in Regulated Small-Scale Production Batching",
      badge: "Research Investigation",
      theme: "Operations Research",
      question: "How do database batch-tracking models impact audit readiness in chemical distribution?",
      methodology: "Analyzed audit times and retrieval error rates under paper logs versus digital tracking databases.",
      contribution: "Proves that digital batch-referencing models significantly reduce information retrieval times in audits."
    },
    transformation: {
      title: "QC Audit Digitization",
      badge: "Governance & Control",
      stream: "Governance & Control",
      before: "Control samples were catalogued in paper books, causing delays during audits.",
      after: "Digital logging interface linking batch IDs and sample locations.",
      change: "Established check-in routines in the QA room, matching batches to locations in real time.",
      value: "Removed manual audit delays, securing 100% compliance with regulators."
    }
  },
  {
    id: "MOD_18",
    category: "extensions",
    strategy: {
      title: "Dynamic Google Form Prefill System",
      desc: "An automated URL parameter builder that dynamically injects client metadata and context IDs into form links, eliminating duplicate entry needs.",
      outcomeLabel: "Operational Outcome",
      outcomeText: "Eliminated manual entry typos by field operators submitting inventory status sheets.",
      tech: ["URL Parameters", "Google Forms", "Automation"]
    },
    product: {
      title: "Dynamic Form Prefill Engine",
      badge: "Operations Tool",
      problem: "Field agents wasted time re-typing customer IDs and SKU info on mobile inventory sheets.",
      users: "Field operators and warehouse staff.",
      solution: "URL parameter builder injecting metadata into forms based on dealer selection.",
      decisions: "Decided to build prefill links client-side to prevent server-side wait states for agents.",
      kpi: "Operator Typo Rates",
      outcome: "Cut entry times and eliminated manual typos on incoming inventory sheets."
    },
    research: {
      title: "Reducing Entry Friction in Mobile Field Ingestion Services",
      badge: "Research Investigation",
      theme: "Information Systems",
      question: "How does pre-populating fields impact data accuracy and submission speed in mobile contexts?",
      methodology: "Compared submission speed and error rates of empty forms against prefilled URL forms.",
      contribution: "Confirms that parameter pre-population significantly lowers error rates and increases submission rates."
    },
    transformation: {
      title: "Field Form Automation Project",
      badge: "Process Automation",
      stream: "Process Automation",
      before: "Warehouse agents typed name, ID, and dates on every report, leading to entry typos.",
      after: "Dynamic prefill links that inject client metadata automatically.",
      change: "Trained operators to open prefilled links directly from their CRM cards.",
      value: "Reduced form submission times and prevented client ID mismatch errors."
    }
  },
  {
    id: "MOD_19",
    category: "supply-ops",
    strategy: {
      title: "Dynamic Sales Incentive & Commission Calculator",
      desc: "An automated commission engine tracking regional sales tiers, growth metrics, and milestone payout ratios for field forces, replacing fragile excel sheets.",
      outcomeLabel: "Operational Outcome",
      outcomeText: "Standardized commission tracking, providing absolute computational accuracy and cutting processing latency.",
      tech: ["Apps Script", "Commission Math", "Dynamic Ledgers"]
    },
    product: {
      title: "Sales Commission Engine",
      badge: "Internal Tool",
      problem: "Calculating complex commission tiers on Excel sheets took days, leading to payment disputes.",
      users: "HR managers, sales executives, and accounting teams.",
      solution: "Apps Script commission engine calculating tiers and payout ratios from sales logs.",
      decisions: "Used a single source of truth sales table to calculate commissions, resolving mismatches.",
      kpi: "Payroll Disputes",
      outcome: "Reduced commission processing times from 4 days to instant, eliminating payroll disputes."
    },
    research: {
      title: "Designing Incentive Frameworks in Large Decentralized Sales Channels",
      badge: "Research Investigation",
      theme: "Operations Research",
      question: "Can automated incentive transparency change sales behavior and drive channel growth?",
      methodology: "Tracked weekly sales changes after launching the transparent commission ledger.",
      contribution: "Shows that sharing real-time payout estimations increases salesman motivation and volumes."
    },
    transformation: {
      title: "Incentive Calculation Automation",
      badge: "Process Automation",
      stream: "Process Automation",
      before: "Calculations on spreadsheets at month-end, creating payout delays.",
      after: "Automated script that runs weekly sales data to show accrued commissions.",
      change: "Migrated commission calculations to the automated script, publishing results on agents' sheets.",
      value: "Replaced manual Excel work, providing transparency and cutting processing latency."
    }
  },
  {
    id: "MOD_20",
    category: "supply-ops",
    strategy: {
      title: "Dynamic Freight & Logistical Cost Estimator",
      desc: "A shipping cost calculator evaluating volumetric weights, dimensions, geographical transit zones, and fuel surcharges to generate transport quotes.",
      outcomeLabel: "Operational Outcome",
      outcomeText: "Slashed transport quoting lag times and eliminated shipping invoice discrepancies.",
      tech: ["Volumetric Math", "Logistical Costing", "Transit Analysis"]
    },
    product: {
      title: "Freight Cost Estimator",
      badge: "Logistics Product",
      problem: "Manual freight calculations led to delays in client quotes and shipping invoice discrepancies.",
      users: "Logistics coordinators and dispatch planners.",
      solution: "Shipping calculator evaluating sizes, weights, and fuel rates to estimate costs.",
      decisions: "Pre-loaded regional transport tables to speed up offline quotes for field operators.",
      kpi: "Quoting Lag Time",
      outcome: "Slashed quote times and removed shipping invoice errors."
    },
    research: {
      title: "Heuristic Cost Allocation Models in SME Freight Operations",
      badge: "Research Investigation",
      theme: "Operations Research",
      question: "What pricing heuristics balance quoting speed with margin protection in shipping?",
      methodology: "Analyzed transport invoices, comparing actual costs with predicted surcharge models.",
      contribution: "Provides a shipping cost model that projects transport margins without heavy logistics software."
    },
    transformation: {
      title: "Logistical Cost Digitization",
      badge: "Operational Digitization",
      stream: "Governance & Control",
      before: "Verbal quotes from carriers, causing discrepancies in client bills.",
      after: "Calculator evaluating volumes, weight, and fuel surcharges.",
      change: "Set a workflow requiring all shipping invoices to be validated by the calculator before payment.",
      value: "Removed client invoicing discrepancies, ensuring margins are protected."
    }
  },
  {
    id: "MOD_21",
    category: "supply-ops",
    strategy: {
      title: "Promotional Input Allocation & Budget Tracker",
      desc: "An allocation dashboard modeling marketing sample distributions, regional promotional expenses, and material allocations against net sales returns.",
      outcomeLabel: "Operational Outcome",
      outcomeText: "Enforced strict budgetary limits on sales promo allocations and boosted material spending efficiency.",
      tech: ["Allocation Logic", "Marketing ROI", "Budget Ledgers"]
    },
    product: {
      title: "Promo Input Allocator",
      badge: "Marketing Product",
      problem: "Field agents distributed marketing samples without limits, causing budget overruns.",
      users: "Marketing managers and regional sales managers.",
      solution: "Allocation dashboard matching sample distribution against regional sales budgets.",
      decisions: "Set hard allocation limits that adjust dynamically based on regional sales volumes.",
      kpi: "Promotional Budget Overruns",
      outcome: "Enforced limits on promo materials, keeping distribution costs within budget."
    },
    research: {
      title: "Resource Allocation Models in Distributed Field Marketing Campaigns",
      badge: "Research Investigation",
      theme: "Operations Research",
      question: "How does capping promotional allocations impact localized sales growth in dealer channels?",
      methodology: "Tracked sales before and after introducing dynamic allocation limits in dealer regions.",
      contribution: "Demonstrates that dynamic allocation caps save budget without hurting sales momentum."
    },
    transformation: {
      title: "Marketing Budget Governance",
      badge: "Governance & Control",
      stream: "Governance & Control",
      before: "Sales reps requested promotional materials without caps, exceeding annual budgets.",
      after: "Dashboard showing materials distributed, sales returns, and allocation limits.",
      change: "Linked material orders to the allocation system, blocking over-budget requests.",
      value: "Enforced promo budgets, optimizing spending efficiency."
    }
  },
  {
    id: "MOD_22",
    category: "supply-ops",
    strategy: {
      title: "Party Performance & Client Health Analytics",
      desc: "A comprehensive B2B client analysis system tracking historical purchasing logs, rotation speed, aging accounts receivables, and credit risk factors.",
      outcomeLabel: "Operational Outcome",
      outcomeText: "Provides high-value management alerts on top-performing client accounts and early payment delays.",
      tech: ["Looker Studio", "Health Scoring", "AR Analytics"]
    },
    product: {
      title: "Client Health Dashboard",
      badge: "Analytics Product",
      problem: "Late dealer payments caused cash flow squeezes that were detected too late.",
      users: "Credit risk officers and sales directors.",
      solution: "B2B client tracking system monitoring purchase frequencies, credit timelines, and risk factors.",
      decisions: "Built an alert loop that flags clients when their payment lag exceeds credit terms by 7 days.",
      kpi: "Late Payments Flagged",
      outcome: "Optimized payment collection times, giving directors early warning of credit issues."
    },
    research: {
      title: "Modeling Customer Purchasing Behavior and Credit Risk in B2B SME Systems",
      badge: "Research Investigation",
      theme: "Predictive Analytics",
      question: "Can transaction anomalies predict dealer credit defaults before they occur?",
      methodology: "Analyzed credit periods and payment lags on 2,000 accounts, running classification trees for risk indicators.",
      contribution: "Develops a credit scoring system for small-scale distributors, lowering payment risks."
    },
    transformation: {
      title: "Credit Risk Analytics Project",
      badge: "Decision Intelligence",
      stream: "Decision Intelligence",
      before: "Late payments were tracked on spreadsheets, causing collection delays.",
      after: "Live credit risk dashboard tracking payment logs and aging collections.",
      change: "Trained credit controllers to monitor dashboard flags and follow up on early warning alerts.",
      value: "Improved cash flow visibility and reduced credit collections lag."
    }
  }
];


// Case Studies Drawer Data
const caseStudiesData = {
  hrVoice: {
    title: "AI Voice Mock Interview Simulator & Portal",
    problem: "Candidates preparing for high-pressure corporate interviews lack authentic, adaptive, real-time sandboxes. Standard online platforms rely on written feedback, failing to capture spoken delivery, noise thresholds, or dynamic conversation flow.",
    architecture: "Resumes are uploaded directly in the browser and parsed using PDF.js to extract key skills and background metrics. An interactive Web Audio API captures audio input, running localized Voice Activity Detection (VAD). Dynamic prompts are synthesized on the fly via the Gemini API, maintaining semantic context and enabling interruption detection. The entire interview grading script logs scored benchmarks and feedback directly to a secure, serverless Google Sheets ledger.",
    challenge: "Handling real-time browser latency during conversational audio loops, maintaining a high-fidelity noise floor threshold to prevent audio feedback echo, and structuring AI prompt context dynamically to model high-pressure executive interviews in both Hindi and English.",
    impact: "Drastically accelerated interview preparedness metrics, lowered API scaling overhead to ~$0.05 per session, and captured structured performance logs for comprehensive self-review cycles."
  },
  callQA: {
    title: "AI-Powered Call QA Analysis System",
    problem: "Manual evaluation of hundreds of daily call center telecalling records was practically impossible, limiting QA audits to less than 2% sample sizes and leaving systematic agent execution errors undetected.",
    architecture: "Remote Android recording scripts capture call files on local devices and sync directly with secure Google Drive folders. A batch event handler triggers script loops that process transcripts via high-performance LLM engines. The transcripts are parsed against executive script alignment rules, customer purchase triggers, and objections vectors, compiling structured QA scores and automated coaching feedback to a live Looker dashboard.",
    challenge: "Processing over 800 minutes of decentralized audio (1,200 recordings) daily without exceeding API rate thresholds. Resolved by developing a task queuing matrix that handles rate-limiting, and managing inconsistent recording codecs from remote Android agents.",
    impact: "Achieved 100% QA coverage, eliminated 360 hours of manual evaluation monthly, and triggered real-time alerts on systematic lead pipeline failures."
  },
  b2bOrder: {
    title: "B2B Order Booking Workspace Portal",
    problem: "Scattered order collections across text messages and emails led to booking inaccuracies, ordering delays, manual invoice typos, and excessive transaction overhead (averaging 8 minutes per order booking).",
    architecture: "A highly optimized, serverless lightweight web portal featuring client-side Edge state storage caching, custom token authentication, live SKU search filters, and automatic, browser-side jsPDF invoice compilations. Connects directly to Google Apps Script endpoints, maintaining database updates and stock backing at absolute zero infrastructure operating cost.",
    challenge: "Establishing highly secure authentication and real-time state integrity for off-grid field sales agents without the complexity and financial overhead of a dedicated cloud container database.",
    impact: "Slashed average transaction booking time from 8 minutes down to 45 seconds, secured 100% ordering accuracy (zero manual typos), and operated at infinite scale with $0.00 infrastructure costs."
  }
};


/* ==========================================================================
   DYNAMIC INTERACTIVE UI INTERACTIONS
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize WebGL Knowledge Graph (color shifts canvas)
  initThree();

  // 2. Navigation Active Tab Highlighting
  const navLinks = document.querySelectorAll('.nav-link-item a');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    const mainNav = document.getElementById('mainNav');
    if (window.scrollY > 40) {
      mainNav.classList.add('scrolled');
    } else {
      mainNav.classList.remove('scrolled');
    }

    let currentActive = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= sectionTop - 180) {
        currentActive = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentActive}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile Nav Drawer Toggle
  const navToggle = document.getElementById('navToggle');
  const navLinksList = document.getElementById('navLinks');
  if (navToggle && navLinksList) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinksList.classList.toggle('open');
    });
    
    // Close mobile nav when link is clicked
    navLinksList.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinksList.classList.remove('open');
      });
    });
  }

  // 3. Render Projects Grid
  renderProjectGrid();

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
    if (caseStudyDrawer && caseStudyDrawer.classList.contains('open') && !caseStudyDrawer.contains(e.target) && !e.target.classList.contains('case-study-trigger-btn')) {
      caseStudyDrawer.classList.remove('open');
    }
  });

  
  window.addEventListener('deviceorientation', (e) => {
    if (e.gamma !== null && e.beta !== null) {
      const maxMoveHero = 8;
      const moveXHero = Math.max(-maxMoveHero, Math.min(maxMoveHero, e.gamma / 5));
      const moveYHero = Math.max(-maxMoveHero, Math.min(maxMoveHero, (e.beta - 45) / 5));
      
      if (pupilLeft && pupilRight) {
        pupilLeft.style.transform = `translate(${moveXHero}px, ${moveYHero}px)`;
        pupilRight.style.transform = `translate(${moveXHero}px, ${moveYHero}px)`;
      }

      const maxMoveNav = 6;
      const moveXNav = Math.max(-maxMoveNav, Math.min(maxMoveNav, e.gamma / 5));
      const moveYNav = Math.max(-maxMoveNav, Math.min(maxMoveNav, (e.beta - 45) / 5));

      if (navPupilLeft && navPupilRight) {
        navPupilLeft.style.transform = `translate(${moveXNav}px, ${moveYNav}px)`;
        navPupilRight.style.transform = `translate(${moveXNav}px, ${moveYNav}px)`;
      }
    }
  });
});

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
    MOD_22: { project: "MOD_15", theme: "Predictive Analytics", area: "Operational Analytics" }
  };
  return links[id] || { project: "MOD_02", theme: "General Systems", area: "Business Systems" };
}

// Highlight and jump to a specific project module
function highlightProject(id) {
  const targetCard = document.getElementById(`project-card-${id}`);
  
  if (targetCard) {
    // Make sure 'All' is active or the category of the target card is active
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
    card.id = `project-card-${proj.id}`;

    const defaultData = proj.strategy;
    const techStack = defaultData.tech || [];
    const links = getSemanticLinks(proj.id);

    // Check if flagship (MOD_01 to MOD_04)
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
          <img src="${imgUrl}" alt="${defaultData.title} Visual Proof" style="width: 100%; height: auto; display: block; filter: contrast(1.01) saturate(0.95);">
          <div class="project-visual-caption" style="padding: 0.5rem; background: rgba(15, 23, 42, 0.03); border-top: 1px solid var(--border-light); font-size: 0.72rem; color: var(--color-muted); font-family: var(--font-body); font-style: italic; text-align: center;">
            ${caption}
          </div>
        </div>
      `;
    }

    card.innerHTML = `
      <div class="project-card-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
        <span class="mono-tag" style="background: ${isFlagship ? 'rgba(99, 102, 241, 0.08)' : 'rgba(15, 23, 42, 0.05)'}; color: ${isFlagship ? 'var(--accent-purple)' : 'var(--color-secondary)'}; border-color: ${isFlagship ? 'rgba(99,102,241,0.2)' : 'var(--border-light)'};">
          ${isFlagship ? '★ Flagship System' : (proj.category === 'ai-systems' ? 'AI System' : proj.category === 'fullstack' ? 'Web App' : proj.category === 'supply-ops' ? 'Supply & Ops' : 'Chrome Extension')}
        </span>
        <span class="card-num" style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--color-muted); font-weight: 700;">${proj.id}</span>
      </div>
      <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--color-primary); margin-bottom: 0.5rem;">${defaultData.title}</h3>
      
      <p class="project-card-desc" style="font-size: 0.88rem; line-height: 1.55; color: var(--color-secondary); margin-bottom: 1rem;">
        ${defaultData.desc}
      </p>

      ${flagshipVisualHtml}

      <div class="strategic-outcome-widget" style="margin: 1.25rem 0; padding: 0.85rem; border-radius: var(--radius-sm); background: rgba(99, 102, 241, 0.03); border-left: 3px solid var(--accent-blue);">
        <div class="outcome-label" style="font-family: var(--font-mono); font-size: 0.65rem; font-weight: 700; color: var(--accent-blue); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.2rem;">Direct Business Outcome</div>
        <div class="outcome-text" style="font-size: 0.82rem; font-weight: 600; color: var(--color-primary); line-height: 1.4;">${defaultData.outcomeText}</div>
      </div>

      <div class="project-card-footer" style="display: flex; flex-direction: column; gap: 0.75rem; border-top: 1px solid var(--border-light); padding-top: 0.85rem; margin-top: auto;">
        <div class="project-tech-tags" style="display: flex; flex-wrap: wrap; gap: 0.35rem;">
          ${techStack.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.72rem; color: var(--color-muted); font-family: var(--font-mono);">
          <span>Related: <span class="archive-action-link" style="color: var(--accent-blue); text-decoration: underline; cursor: pointer;" onclick="highlightProject('${links.project}')">${links.project}</span></span>
          <span>Theme: <em>${links.theme}</em></span>
        </div>
        ${defaultData.cta ? `
          <button class="case-study-trigger-btn" data-project="${defaultData.cta.key}" style="width: 100%; margin-top: 0.5rem; padding: 0.5rem 1rem; font-size: 0.75rem; border-radius: var(--radius-sm); border: 1px solid var(--border-light); background: transparent; cursor: pointer; transition: all 0.2s ease;">
            🔎 Systems Deep-Dive &rarr;
          </button>
        ` : ''}
      </div>
    `;
    grid.appendChild(card);
  });

  // Re-bind click events on dynamic card deep dives
  const caseStudyTriggers = document.querySelectorAll('.case-study-trigger-btn');
  caseStudyTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const projectKey = btn.getAttribute('data-project');
      const data = caseStudiesData[projectKey];
      if (!data) return;
      
      const drawerProjectTitle = document.getElementById('drawerProjectTitle');
      const drawerBodyContent = document.getElementById('drawerBodyContent');
      const caseStudyDrawer = document.getElementById('caseStudyDrawer');

      if (caseStudyDrawer && drawerProjectTitle && drawerBodyContent) {
        drawerProjectTitle.textContent = data.title;
        drawerBodyContent.innerHTML = `
          <div class="case-study-section" style="margin-bottom: 1.5rem;">
            <h5 style="font-family: var(--font-mono); font-size: 0.7rem; font-weight: 700; text-transform: uppercase; color: var(--accent-blue); margin-bottom: 0.45rem;">1. Problem Statement</h5>
            <p style="font-size: 0.88rem; line-height: 1.6; color: var(--color-secondary);">${data.problem}</p>
          </div>
          <div class="case-study-section" style="margin-bottom: 1.5rem;">
            <h5 style="font-family: var(--font-mono); font-size: 0.7rem; font-weight: 700; text-transform: uppercase; color: var(--accent-blue); margin-bottom: 0.45rem;">2. Systems Architecture</h5>
            <p style="font-size: 0.88rem; line-height: 1.6; color: var(--color-secondary);">${data.architecture}</p>
          </div>
          <div class="case-study-section" style="margin-bottom: 1.5rem;">
            <h5 style="font-family: var(--font-mono); font-size: 0.7rem; font-weight: 700; text-transform: uppercase; color: var(--accent-blue); margin-bottom: 0.45rem;">3. Technical Challenges Solved</h5>
            <p style="font-size: 0.88rem; line-height: 1.6; color: var(--color-secondary);">${data.challenge}</p>
          </div>
          <div class="case-study-section">
            <h5 style="font-family: var(--font-mono); font-size: 0.7rem; font-weight: 700; text-transform: uppercase; color: var(--accent-blue); margin-bottom: 0.45rem;">4. Direct Business Impact</h5>
            <p style="font-size: 0.88rem; line-height: 1.6; color: var(--color-secondary);">${data.impact}</p>
          </div>
        `;
        caseStudyDrawer.classList.add('open');
      }
    });
  });
}


/* ==========================================================================
   INTERACTIVE CHARACTER EYES & BEHAVIOR
   ========================================================================== */
(function() {
  const eyes = document.querySelectorAll('.eye');
  const pupils = document.querySelectorAll('.pupil');
  const stateLabel = document.getElementById('eye-state-label');
  const passwordField = document.getElementById('passwordField');
  const tearStream = document.getElementById('tearStream');

  // 1. Eye Tracking (Pupils only)
  document.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    
    pupils.forEach(pupil => {
      const eyeRect = pupil.parentElement.getBoundingClientRect();
      const eyeCenterX = eyeRect.left + eyeRect.width / 2;
      const eyeCenterY = eyeRect.top + eyeRect.height / 2;

      const dx = clientX - eyeCenterX;
      const dy = clientY - eyeCenterY;
      const angle = Math.atan2(dy, dx);
      const distance = Math.min(Math.sqrt(dx*dx + dy*dy) / 10, 6); // Smaller movement for smaller nav eyes

      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;

      pupil.style.transform = `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px))`;
    });
  });

  // 2. Automatic Blinking
  function blink() {
    if (!passwordField || !passwordField.matches(':focus')) {
      eyes.forEach(eye => eye.classList.add('blink'));
      setTimeout(() => {
        eyes.forEach(eye => eye.classList.remove('blink'));
      }, 150);
    }
    setTimeout(blink, 3000 + Math.random() * 3000);
  }
  blink();

  // 3. Password Squint
  if (passwordField) {
    passwordField.addEventListener('focus', () => {
      eyes.forEach(eye => eye.classList.add('squint'));
      if (stateLabel) stateLabel.textContent = "SECURE_SQUINT_MODE";
    });

    passwordField.addEventListener('blur', () => {
      eyes.forEach(eye => eye.classList.remove('squint'));
      if (stateLabel) stateLabel.textContent = "SYSTEM_ACTIVE";
    });
  }

  // 4. Emotional Distress (Page Exit Only)
  let tearInterval;
  let isDistressed = false;

  document.addEventListener('mouseleave', (e) => {
    // Only trigger if mouse actually leaves the top of the viewport (likely closing tab)
    if (e.clientY <= 0) {
      isDistressed = true;
      if (stateLabel) {
        stateLabel.textContent = "DONT_LEAVE_ME";
        stateLabel.style.color = "#ef4444";
      }
      tearInterval = setInterval(createTear, 400);
    }
  });

  document.addEventListener('mouseenter', () => {
    if (isDistressed) {
      isDistressed = false;
      if (stateLabel) {
        stateLabel.textContent = "SYSTEM_ACTIVE";
        stateLabel.style.color = "var(--accent-blue)";
      }
      clearInterval(tearInterval);
    }
  });

  function createTear() {
    if (!tearStream) return;
    const tear = document.createElement('div');
    tear.className = 'tear-drop';
    const side = Math.random() > 0.5 ? '25%' : '75%';
    tear.style.left = side;
    tear.style.top = '20px'; // Adjusted for smaller visor
    tearStream.appendChild(tear);

    if (typeof gsap !== 'undefined') {
      gsap.to(tear, {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power1.in",
        onComplete: () => tear.remove()
      });
    } else {
      setTimeout(() => tear.remove(), 1200);
    }
  }
})();


