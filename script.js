/* ==========================================================================
   THREE.JS STRATEGIC SPATIAL UNIVERSE BACKGROUND — SUBTLE AMBIENT PARTICLES
   ========================================================================== */
let scene, camera, renderer, dirLight;
let particleGroup;
let ambientParticles;
let particleMaterial;

const themes = ['strategy', 'product', 'academic', 'transformation'];
let currentThemeIndex = 0;

// Parallax tracking mouse
let mouseX = 0, mouseY = 0;
let targetMouseX = 0, targetMouseY = 0;
const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

function initThree() {
  const canvas = document.getElementById('webgl-canvas');
  if (!canvas) return;

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf6f8fc);
  scene.fog = new THREE.FogExp2(0xf6f8fc, 0.025);

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

  particleGroup = new THREE.Group();
  scene.add(particleGroup);

  // Subtle fluid particle motion cloud (dust/star particles)
  const particleGeo = new THREE.BufferGeometry();
  const particleCount = 150;
  const posArray = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 45;
  }

  particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

  particleMaterial = new THREE.PointsMaterial({
    size: 0.2,
    color: 0x3b82f6, // Default Strategy Blue
    transparent: true,
    opacity: 0.35,
    blending: THREE.NormalBlending
  });

  ambientParticles = new THREE.Points(particleGeo, particleMaterial);
  particleGroup.add(ambientParticles);

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

  // Projects Grid -> Timeline
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

  // Timeline -> Knowledge Repository
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

  // Knowledge Repository -> Capability Matrix
  gsap.timeline({
    scrollTrigger: {
      trigger: "#skills",
      start: "top bottom",
      end: "top top",
      scrub: 1.2
    }
  })
  .to(camera.position, { x: -3, y: -20, z: 16 })
  .to(camera.rotation, { x: -0.1, y: 0.1, z: 0 }, "<");

  // Capability Matrix -> Connect Portal
  gsap.timeline({
    scrollTrigger: {
      trigger: "#connect",
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
  
  // Ambient particle drift (only rotate if motion is not reduced)
  if (!isReduced && particleGroup) {
    particleGroup.rotation.y += 0.0001;
    particleGroup.rotation.x += 0.00005;
  }

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
  // 1. Initialize WebGL Knowledge Graph
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



  // 4. Projects Filter Grid Event Wiring
  const filterPills = document.querySelectorAll('#projectFilters .filter-pill');
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      renderProjectGrid();
    });
  });

  // 5. Intelligent Timeline Flow Experiences mapping
  const experienceData = {
    analyst: {
      title: "Management Analyst",
      subtitle: "Group Biopolis (Biopolis + Ultrapolis) · Panchkula",
      bullets: [
        "Designed and engineered a centralized internal operations analytics platform with 18+ live interactive dashboard modules (Sales, Stocks, Pipeline, SCOT) serving the entire 108-member group.",
        "Architected a mobile-first, serverless B2B order booking web application with custom secure session authentication and zero-latency automated PDF generation, reducing client order timelines by over 60%.",
        "Built a scalable call analysis system utilizing AI to digest and score 1,200 voice recordings (800 audio minutes) daily, providing structured feedback metrics on customer intent and agent scripts.",
        "Engineered an automated end-to-end inventory management and PO tracking pipeline featuring custom predictive reorder algorithms; reduced shortage alerts from 17 to 2 and fueled 20% growth.",
        "Developed a custom Looker Studio Chrome Refresher extension to bypass native 15-minute delays, unlocking instantaneous, zero-delay operational database telemetry."
      ],
      flow: [
        { label: "Raw Database", icon: "💾" },
        { label: "AI & Apps Script", icon: "⚙️" },
        { label: "18+ Live MIS Panels", icon: "📊" }
      ]
    },
    manager: {
      title: "Divisional Manager",
      subtitle: "Bharat Financial Inclusion Ltd. (IndusInd Bank Bank Group)",
      bullets: [
        "Directed a 72-member regional division controlling a portfolio of 7,500+ micro-banking clients across 10 distinct districts; consistently cleared target collections within 48 hours of cycle launch.",
        "Diagnosed local field operation bottlenecks utilizing Maslow's organizational framework, restructuring field officer scripts to secure 40% of targets within a single operational weekend.",
        "Replaced traditional punitive metrics with a high-engagement gamified reward framework, accelerating lead generation and conversions by 25% within one fiscal quarter."
      ],
      flow: [
        { label: "7,500 Clients", icon: "👥" },
        { label: "Field Redesign", icon: "🗺️" },
        { label: "+25% Growth", icon: "📈" }
      ]
    },
    intern: {
      title: "Customer Delight Intern",
      subtitle: "Zolostays Property Solutions Ltd. &middot; Operations",
      bullets: [
        "Orchestrated direct customer support operations, processing over 2,000 inquiries with 99.95% verification accuracy, resolving 100+ complex tickets daily at 95% SLA compliance.",
        "Mapped and standardized internal property refund workflows, slashing resolution delay times and related customer complaints by 60% via structured SOP manuals."
      ],
      flow: [
        { label: "Support Input", icon: "📥" },
        { label: "SOP Restructure", icon: "📝" },
        { label: "60% SLA Speedup", icon: "⚡" }
      ]
    }
  };

  const timelineItems = document.querySelectorAll('.timeline-flow-item');
  const pipelineSub = document.getElementById('pipelineSub');
  const pipelineTitle = document.getElementById('pipelineTitle');
  const pipelineBullets = document.getElementById('pipelineBullets');
  const flowNodesWrapper = document.getElementById('flowNodesWrapper');

  function renderTimelineDetail(expKey) {
    const data = experienceData[expKey];
    if (!data) return;

    gsap.to("#pipelineCard", {
      opacity: 0.3,
      y: 5,
      duration: 0.15,
      onComplete: () => {
        if (pipelineSub) pipelineSub.textContent = data.subtitle;
        if (pipelineTitle) pipelineTitle.textContent = data.title;

        if (pipelineBullets) {
          pipelineBullets.innerHTML = "";
          data.bullets.forEach(bullet => {
            const li = document.createElement('li');
            li.className = "pipeline-bullet";
            li.textContent = bullet;
            pipelineBullets.appendChild(li);
          });
        }

        if (flowNodesWrapper) {
          flowNodesWrapper.innerHTML = "";
          data.flow.forEach((node, index) => {
            const nodeEl = document.createElement('div');
            nodeEl.className = "flow-node-item";
            nodeEl.innerHTML = `
              <div class="node-icon-circle">${node.icon}</div>
              <span class="node-lbl">${node.label}</span>
            `;
            flowNodesWrapper.appendChild(nodeEl);

            if (index < data.flow.length - 1) {
              const arrow = document.createElement('span');
              arrow.className = "flow-connector-arrow";
              arrow.textContent = "➔";
              flowNodesWrapper.appendChild(arrow);
            }
          });
        }

        gsap.to("#pipelineCard", { opacity: 1, y: 0, duration: 0.35 });
      }
    });
  }

  timelineItems.forEach(item => {
    item.addEventListener('click', () => {
      timelineItems.forEach(t => t.classList.remove('active'));
      item.classList.add('active');
      const expKey = item.getAttribute('data-exp');
      renderTimelineDetail(expKey);
    });
  });

  // Render initial timeline
  renderTimelineDetail('analyst');

  // 6. Searchable Knowledge Archive Logic
  const creativeSearchInput = document.getElementById('archiveSearch');
  const archiveFilters = document.querySelectorAll('#archiveFilters .archive-filter-btn');
  const archiveCards = document.querySelectorAll('#archiveGrid .archive-card');

  function filterArchiveGrid() {
    const query = creativeSearchInput.value.toLowerCase().trim();
    const activeFilterBtn = document.querySelector('#archiveFilters .archive-filter-btn.active');
    const filterCat = activeFilterBtn ? activeFilterBtn.getAttribute('data-cat') : 'all';

    archiveCards.forEach(card => {
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
    creativeSearchInput.addEventListener('input', filterArchiveGrid);
  }

  archiveFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      archiveFilters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterArchiveGrid();
    });
  });

  // 7. B2B Brief Form Slider
  const briefSlider = document.getElementById('briefRange');
  const sliderOutput = document.getElementById('sliderOutput');
  if (briefSlider && sliderOutput) {
    briefSlider.addEventListener('input', () => {
      const val = parseInt(briefSlider.value);
      sliderOutput.textContent = val.toLocaleString();
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

  // Copy integrations
  const directEmailLink = document.querySelector('a[href^="mailto:"]');
  if (directEmailLink) {
    directEmailLink.addEventListener('click', (e) => {
      navigator.clipboard.writeText("pratapjindal812@gmail.com");
      showToast("Email address copied to clipboard");
    });
  }

  const directPhoneLink = document.querySelector('a[href^="tel:"]');
  if (directPhoneLink) {
    directPhoneLink.addEventListener('click', (e) => {
      navigator.clipboard.writeText("+917009019719");
      showToast("Secure voice number copied to clipboard");
    });
  }

  const directWaLink = document.querySelector('a[href*="wa.me"]');
  if (directWaLink) {
    directWaLink.addEventListener('click', () => {
      showToast("Redirecting to direct secure WhatsApp...");
    });
  }

  // 8. Silent Form Auto-submissions via fetch (No CORS/New Tabs)
  const briefForm = document.getElementById('briefForm');
  const successOverlay = document.getElementById('briefSuccessOverlay');

  if (briefForm && successOverlay) {
    briefForm.addEventListener('submit', (e) => {
      e.preventDefault(); // Intercept default browser submission
      
      const submitBtn = briefForm.querySelector('.brief-submit-btn');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Transmitting request...";
      }

      // Submit Google Form details silently in the background
      fetch(briefForm.action, {
        method: 'POST',
        body: new FormData(briefForm),
        mode: 'no-cors'
      })
      .then(() => {
        successOverlay.innerHTML = `
          <div style="flex-grow: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 2rem;">
            <div style="width: 56px; height: 56px; border-radius: 50%; background: rgba(59, 130, 246, 0.08); display: flex; justify-content: center; align-items: center; margin-bottom: 1.5rem; color: var(--accent-blue); font-size: 1.5rem; font-weight: bold; border: 1px solid rgba(59, 130, 246, 0.15);">
              ✓
            </div>
            <h4 style="font-size: 1.35rem; font-weight: 800; color: var(--color-primary); margin-bottom: 0.75rem; font-family: var(--font-display);">Brief Transmitted Successfully</h4>
            <p style="font-size: 0.9rem; color: var(--color-muted); line-height: 1.5; max-width: 320px; margin-bottom: 2rem;">
              Thanks for the details. Pratap will audit your requirements and respond on the provided coordinates.
            </p>
            <button id="btnResetBrief" class="roi-select-btn" style="width: 100%; max-width: 220px; padding: 0.7rem 1.25rem; font-size: 0.82rem; border-radius: var(--radius-sm); border: 1px dashed var(--border-light) !important; background: transparent !important; color: var(--color-secondary) !important; cursor: pointer; transition: all 0.2s ease;">
              🔄 Submit Another Request
            </button>
          </div>
        `;
        successOverlay.style.display = 'flex';
        gsap.fromTo(successOverlay, { opacity: 0, scale: 0.98 }, { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" });
        
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = "Generate Strategic Request →";
        }

        const btnResetBrief = document.getElementById('btnResetBrief');
        if (btnResetBrief) {
          btnResetBrief.addEventListener('click', () => {
            gsap.to(successOverlay, {
              opacity: 0,
              scale: 0.98,
              duration: 0.25,
              onComplete: () => {
                successOverlay.style.display = 'none';
                briefForm.reset();
                if (briefSlider && sliderOutput) {
                  const val = parseInt(briefSlider.value);
                  sliderOutput.textContent = val.toLocaleString();
                }
              }
            });
          });
        }
      })
      .catch((err) => {
        showToast("Transmission lag detected. Please connect directly.");
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = "Generate Strategic Request →";
        }
      });
    });
  }

  // 9. Brand Toggles and Quotes Logic
  const dynamicQuoteText = document.getElementById('dynamicQuoteText');
  const dynamicQuoteAuthor = document.getElementById('dynamicQuoteAuthor');
  
  const corporateQuotes = [
    { text: "I build systems, write stories, and explore the space where logic meets memory.", author: "Pratap Jindal" },
    { text: "We do not build systems to eliminate work; we build them to free the mind for what matters.", author: "Pratap Jindal" },
    { text: "Between the raw database and the final narrative lies the fragile space of human memory.", author: "Poker Hearts" },
    { text: "True efficiency is not speed; it is the absolute elimination of unnecessary cycles.", author: "Pratap Jindal" },
    { text: "We repair our broken workflows with code, much like kintsugi, highlighting the cracks in gold.", author: "Poker Hearts" },
    { text: "Systems function in loops; human lives function in stories.", author: "Poker Hearts" }
  ];

  const academicQuotes = [
    { text: "Research is to see what everybody else has seen, and to think what nobody else has thought.", author: "Albert Szent-Gyorgyi" },
    { text: "The system is the solution.", author: "W. Edwards Deming" },
    { text: "We do not build systems to eliminate work; we build them to model the truth.", author: "Pratap Jindal" },
    { text: "Information is the resolution of uncertainty.", author: "Claude Shannon" }
  ];

  function rotateIdentityQuote() {
    const mode = themes[currentThemeIndex];
    if (mode === 'academic') {
      const randomIndex = Math.floor(Math.random() * academicQuotes.length);
      const chosen = academicQuotes[randomIndex];
      if (dynamicQuoteText) dynamicQuoteText.innerHTML = `"${chosen.text}"`;
      if (dynamicQuoteAuthor) dynamicQuoteAuthor.innerHTML = `— ${chosen.author}`;
    } else {
      const randomIndex = Math.floor(Math.random() * corporateQuotes.length);
      const chosen = corporateQuotes[randomIndex];
      if (dynamicQuoteText) dynamicQuoteText.innerHTML = `"${chosen.text}"`;
      if (dynamicQuoteAuthor) dynamicQuoteAuthor.innerHTML = `— ${chosen.author}`;
    }
  }

  rotateIdentityQuote();

  // === 4-BUTTON MODE SWITCHING PRESET SWITCH CONTROLLER ===
  const btnSwitchStrategy = document.getElementById('btnSwitchStrategy');
  const btnSwitchProduct = document.getElementById('btnSwitchProduct');
  const btnSwitchAcademic = document.getElementById('btnSwitchAcademic');
  const btnSwitchTransformation = document.getElementById('btnSwitchTransformation');
  
  const heroBadgeText = document.getElementById('heroBadgeText');
  const footerCopyright = document.getElementById('footerCopyright');
  const academicEditorialBoard = document.getElementById('academicEditorialBoard');
  const creativeWritingsWrapper = document.querySelector('.creative-writings-wrapper');

  function applyTheme(theme) {
    document.body.classList.remove('strategy-mode', 'product-mode', 'academic-mode', 'transformation-mode');
    document.body.classList.add(`${theme}-mode`);

    if (btnSwitchStrategy && btnSwitchProduct && btnSwitchAcademic && btnSwitchTransformation) {
      btnSwitchStrategy.classList.toggle('active', theme === 'strategy');
      btnSwitchProduct.classList.toggle('active', theme === 'product');
      btnSwitchAcademic.classList.toggle('active', theme === 'academic');
      btnSwitchTransformation.classList.toggle('active', theme === 'transformation');
    }

    const heroRole = document.querySelector('.hero-role');
    const heroIntroText = document.getElementById('heroIntroText');

    if (theme === 'strategy') {
      if (heroRole) heroRole.innerHTML = "Management Analyst &amp; Business Systems Architect";
      if (heroBadgeText) heroBadgeText.innerHTML = "Systems Intelligence Matrix v2.8";
      if (footerCopyright) footerCopyright.innerHTML = "&copy; 2026 Pratap Jindal &middot; Built with semantic HTML, CSS Grid &amp; Three.js";
      if (heroIntroText) {
        heroIntroText.innerHTML = `I build operational systems, write psychological narratives, and explore the precise space where <strong>logic meets memory</strong>. Managing a team of 108 across a multi-company group, I translate senior executive intent into highly-automated digital instruments — transforming scattered workflows into clean, strategic corporate interfaces.`;
      }
      
      updateCounters("22", "Operational Systems Built", "₹75 Cr+", "Operations Supported", "360 Hrs", "QA Automated Monthly", "17 → 2", "Stock Shortages Resolved");

      if (academicEditorialBoard) academicEditorialBoard.style.display = 'none';
      if (creativeWritingsWrapper) creativeWritingsWrapper.style.display = 'block';
      
      updateThreeVariables(false);

    } else if (theme === 'product') {
      if (heroRole) heroRole.innerHTML = "Product Manager &amp; Operations Architect";
      if (heroBadgeText) heroBadgeText.innerHTML = "Product Management Operations Dashboard v2.8";
      if (footerCopyright) footerCopyright.innerHTML = "&copy; 2026 Pratap Jindal &middot; Built with semantic HTML, CSS Grid &amp; Product Dashboards";
      if (heroIntroText) {
        heroIntroText.innerHTML = `I identify business friction points, design clear product workflows, and launch automated internal toolspaces. Translating complex stakeholder requirements into zero-cost serverless instruments, I focus on optimizing user adoption and quantifying bottom-line operational ROI.`;
      }

      updateCounters("108+", "Active Product Users", "92%", "Product Engagement Rate", "₹75 Cr", "Transaction Volume Scaled", "45s", "Average Booking Time");

      if (academicEditorialBoard) academicEditorialBoard.style.display = 'none';
      if (creativeWritingsWrapper) creativeWritingsWrapper.style.display = 'block';
      
      updateThreeVariables(false);

    } else if (theme === 'academic') {
      if (heroRole) heroRole.innerHTML = "Decision Science &amp; Operations Researcher";
      if (heroBadgeText) heroBadgeText.innerHTML = "Academic Portfolio &amp; Research Archive v2.8";
      if (footerCopyright) footerCopyright.innerHTML = "&copy; 2026 Pratap Jindal &middot; Built with clean typography &amp; Static Network Models &middot; Academic Edition";
      if (heroIntroText) {
        heroIntroText.innerHTML = `Applied researcher investigating organizational design, algorithmic operations research, and human-computer decision workflows. Formulating heuristic inventory models and empirical speech-to-text QA cycles, I explore where system optimization intersects with behavioral execution.`;
      }

      updateCounters("108", "Researchers Coordinated", "99%", "Core Research Accuracy", "750k+", "Research Datasets Ingested", "r > 0.85", "LLM Audit Correlation");

      if (academicEditorialBoard) academicEditorialBoard.style.display = 'flex';
      if (creativeWritingsWrapper) creativeWritingsWrapper.style.display = 'block';
      
      updateThreeVariables(true);

    } else if (theme === 'transformation') {
      if (heroRole) heroRole.innerHTML = "Digital Transformation &amp; Business Systems Lead";
      if (heroBadgeText) heroBadgeText.innerHTML = "Digital Transformation Architecture v2.8";
      if (footerCopyright) footerCopyright.innerHTML = "&copy; 2026 Pratap Jindal &middot; Built with semantic HTML, CSS Grid &amp; Enterprise Integration Blueprints";
      if (heroIntroText) {
        heroIntroText.innerHTML = `I lead digital transformation projects, moving organizations from slow, manual spreadsheets to automated, unified cloud pipelines. Restructuring workflows with custom Chrome integrations and serverless scripts, I systematically secure data integrity and streamline team execution.`;
      }

      updateCounters("108", "Personnel Digitized", "80%", "Manual Processes Digitized", "₹7.5 Cr", "Enterprise Savings Created", "-70%", "Manual Screening Time");

      if (academicEditorialBoard) academicEditorialBoard.style.display = 'none';
      if (creativeWritingsWrapper) creativeWritingsWrapper.style.display = 'block';
      
      updateThreeVariables(false);
    }

    updateSEOMetadata(theme);
    renderProjectGrid();
    rotateIdentityQuote();
  }

  function updateCounters(num1, lbl1, num2, lbl2, num3, lbl3, num4, lbl4) {
    const cNum1 = document.getElementById('statTeam');
    const cLbl1 = cNum1 ? cNum1.nextElementSibling : null;
    const cNum2 = document.getElementById('statEffort');
    const cLbl2 = cNum2 ? cNum2.nextElementSibling : null;
    const cNum3 = document.getElementById('statSales');
    const cLbl3 = cNum3 ? cNum3.nextElementSibling : null;
    const cNum4 = document.getElementById('statShortages');
    const cLbl4 = cNum4 ? cNum4.nextElementSibling : null;

    if (cNum1) cNum1.textContent = num1;
    if (cLbl1) cLbl1.textContent = lbl1;
    if (cNum2) cNum2.textContent = num2;
    if (cLbl2) cLbl2.textContent = lbl2;
    if (cNum3) cNum3.textContent = num3;
    if (cLbl3) cLbl3.textContent = lbl3;
    if (cNum4) cNum4.textContent = num4;
    if (cLbl4) cLbl4.textContent = lbl4;
  }

  // Restore cached switcher state
  const savedTheme = localStorage.getItem('pj-helix-theme-mode');
  if (savedTheme && themes.includes(savedTheme)) {
    currentThemeIndex = themes.indexOf(savedTheme);
  }
  applyTheme(themes[currentThemeIndex]);

  // Bind click events on switcher segmented controls
  if (btnSwitchStrategy) {
    btnSwitchStrategy.addEventListener('click', () => {
      currentThemeIndex = themes.indexOf('strategy');
      applyTheme('strategy');
      localStorage.setItem('pj-helix-theme-mode', 'strategy');
      showToast("Mode Selected: Strategy & Analytics");
    });
  }
  if (btnSwitchProduct) {
    btnSwitchProduct.addEventListener('click', () => {
      currentThemeIndex = themes.indexOf('product');
      applyTheme('product');
      localStorage.setItem('pj-helix-theme-mode', 'product');
      showToast("Mode Selected: Product Management");
    });
  }
  if (btnSwitchAcademic) {
    btnSwitchAcademic.addEventListener('click', () => {
      currentThemeIndex = themes.indexOf('academic');
      applyTheme('academic');
      localStorage.setItem('pj-helix-theme-mode', 'academic');
      showToast("Mode Selected: Research & Academic");
    });
  }
  if (btnSwitchTransformation) {
    btnSwitchTransformation.addEventListener('click', () => {
      currentThemeIndex = themes.indexOf('transformation');
      applyTheme('transformation');
      localStorage.setItem('pj-helix-theme-mode', 'transformation');
      showToast("Mode Selected: Digital Transformation");
    });
  }

  // Collapsible Archive toggler
  const btnToggleArchive = document.getElementById('btnToggleArchive');
  const archiveContainer = document.getElementById('archiveContainer');
  if (btnToggleArchive && archiveContainer) {
    btnToggleArchive.addEventListener('click', () => {
      const isExpanded = btnToggleArchive.getAttribute('aria-expanded') === 'true';
      btnToggleArchive.setAttribute('aria-expanded', !isExpanded);
      
      if (!isExpanded) {
        archiveContainer.style.display = 'block';
        btnToggleArchive.querySelector('.toggle-arrow').textContent = '▲';
        btnToggleArchive.querySelector('.btn-text').textContent = '📦 Hide Full Systems Registry';
        gsap.fromTo(archiveContainer, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" });
      } else {
        gsap.to(archiveContainer, {
          opacity: 0,
          y: 10,
          duration: 0.2,
          onComplete: () => {
            archiveContainer.style.display = 'none';
            btnToggleArchive.querySelector('.toggle-arrow').textContent = '▼';
            btnToggleArchive.querySelector('.btn-text').textContent = '📦 View Full Systems Registry (Show All 22 Modules)';
          }
        });
      }
    });
  }

  // Collapsible Creative Writings toggler
  const btnToggleCreative = document.getElementById('btnToggleCreative');
  const creativeContainer = document.getElementById('creativeContainer');
  if (btnToggleCreative && creativeContainer) {
    btnToggleCreative.addEventListener('click', () => {
      const isExpanded = btnToggleCreative.getAttribute('aria-expanded') === 'true';
      btnToggleCreative.setAttribute('aria-expanded', !isExpanded);
      
      if (!isExpanded) {
        creativeContainer.style.display = 'block';
        btnToggleCreative.querySelector('.toggle-arrow').textContent = '▲';
        gsap.fromTo(creativeContainer, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" });
      } else {
        gsap.to(creativeContainer, {
          opacity: 0,
          y: 10,
          duration: 0.2,
          onComplete: () => {
            creativeContainer.style.display = 'none';
            btnToggleCreative.querySelector('.toggle-arrow').textContent = '▼';
          }
        });
      }
    });
  }

  // Content Hub Click Interaction mapping
  const hubCards = document.querySelectorAll('.hub-card');
  hubCards.forEach(card => {
    card.addEventListener('click', () => {
      const filter = card.getAttribute('data-hub');
      
      let catFilter = 'all';
      if (filter === 'operations') catFilter = 'supply-ops';
      else if (filter === 'ai-automation') catFilter = 'ai-systems';
      else if (filter === 'product-design') catFilter = 'fullstack';
      else if (filter === 'digital-transformation') catFilter = 'extensions';
      else if (filter === 'research-systems') catFilter = 'supply-ops';

      // Open archive if collapsed
      if (archiveContainer && btnToggleArchive && archiveContainer.style.display === 'none') {
        btnToggleArchive.click();
      }

      // Set search input to empty
      const archiveSearchInput = document.getElementById('archiveSearchInput');
      if (archiveSearchInput) archiveSearchInput.value = '';

      // Set active filter pill in archive
      const pills = document.querySelectorAll('.archive-pill');
      pills.forEach(pill => {
        if (pill.getAttribute('data-filter') === catFilter) {
          pill.classList.add('active');
        } else {
          pill.classList.remove('active');
        }
      });

      // Trigger archive filtering
      filterArchiveTable(catFilter, '');

      // Scroll to projects section
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
      }

      showToast(`Showing registry systems matching Content Hub: [${card.querySelector('h3').textContent}]`);
    });
  });

  // Archive Table search & filter events
  const archiveSearchInput = document.getElementById('archiveSearchInput');
  const registryFilters = document.querySelectorAll('.archive-pill');
  
  function filterArchiveTable(category, query) {
    const tbody = document.getElementById('archiveTableBody');
    if (!tbody) return;
    const rows = tbody.querySelectorAll('.archive-row');
    
    rows.forEach(row => {
      const rowCat = row.getAttribute('data-category');
      const text = row.textContent.toLowerCase();
      const matchesCategory = category === 'all' || rowCat === category;
      const matchesSearch = text.includes(query.toLowerCase());
      
      row.style.display = (matchesCategory && matchesSearch) ? '' : 'none';
    });
  }

  if (archiveSearchInput) {
    archiveSearchInput.addEventListener('input', () => {
      const activePill = document.querySelector('.archive-pill.active');
      const cat = activePill ? activePill.getAttribute('data-filter') : 'all';
      filterArchiveTable(cat, archiveSearchInput.value);
    });
  }

  registryFilters.forEach(pill => {
    pill.addEventListener('click', () => {
      registryFilters.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const query = archiveSearchInput ? archiveSearchInput.value : '';
      filterArchiveTable(pill.getAttribute('data-filter'), query);
    });
  });

  // Bind sliding study close drawer
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const caseStudyDrawer = document.getElementById('caseStudyDrawer');
  if (closeDrawerBtn && caseStudyDrawer) {
    closeDrawerBtn.addEventListener('click', () => {
      caseStudyDrawer.classList.remove('open');
    });
  }
  document.addEventListener('click', (e) => {
    if (caseStudyDrawer && caseStudyDrawer.classList.contains('open') && !caseStudyDrawer.contains(e.target)) {
      caseStudyDrawer.classList.remove('open');
    }
  });
});

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
  const targetRow = document.getElementById(`archive-row-${id}`);
  
  // Expand archive registry if collapsed
  const archiveContainer = document.getElementById('archiveContainer');
  const btnToggleArchive = document.getElementById('btnToggleArchive');
  if (archiveContainer && btnToggleArchive && archiveContainer.style.display === 'none') {
    btnToggleArchive.click();
  }
  
  if (targetRow) {
    setTimeout(() => {
      targetRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
      targetRow.style.backgroundColor = 'rgba(99, 102, 241, 0.15)';
      setTimeout(() => {
        targetRow.style.backgroundColor = '';
      }, 2500);
      showToast(`Navigated to System Registry Profile: [${id}]`);
    }, 350);
  }
}

// Update Dynamic Meta & JSON-LD tags
function updateSEOMetadata(theme) {
  const metaDescriptions = {
    strategy: "Portfolio of Pratap Jindal — Management Analyst at Group Biopolis. Specializing in operations analytics, B2B workflows, and strategic business systems.",
    product: "Product operations portfolio of Pratap Jindal. Focused on identifying operational friction, designing serverless internal tools, and driving business ROI.",
    academic: "Academic portfolio of Pratap Jindal, UGC NET Qualified Management researcher. Focused on heuristic inventory models and human-AI collaborative workflows.",
    transformation: "Enterprise digitization portfolio of Pratap Jindal. Architect of automated workflows, custom integrations, and cloud migrations."
  };

  const titles = {
    strategy: "Pratap Jindal — Strategic Systems & Analytics Leader",
    product: "Pratap Jindal — Product Manager & Operations Architect",
    academic: "Pratap Jindal — Decision Science & Operations Researcher",
    transformation: "Pratap Jindal — Digital Transformation & Business Systems Lead"
  };

  document.title = titles[theme] || "Pratap Jindal — Systems Strategist";

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', metaDescriptions[theme]);
  }

  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', titles[theme]);
  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', metaDescriptions[theme]);

  const twitterTitle = document.querySelector('meta[name="twitter:title"]');
  if (twitterTitle) twitterTitle.setAttribute('content', titles[theme]);
  const twitterDesc = document.querySelector('meta[name="twitter:description"]');
  if (twitterDesc) twitterDesc.setAttribute('content', metaDescriptions[theme]);

  const canonicalLink = document.querySelector('link[rel="canonical"]');
  if (canonicalLink) {
    canonicalLink.setAttribute('href', `https://pokerhearts.in/?mode=${theme}`);
  }

  const schemaScript = document.getElementById('seo-schema');
  if (schemaScript) {
    const baseSchema = {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      "dateModified": new Date().toISOString().split('T')[0],
      "mainEntity": {
        "@type": "Person",
        "name": "Pratap Jindal",
        "url": "https://pokerhearts.in",
        "image": "https://pokerhearts.in/profile.png",
        "worksFor": {
          "@type": "Organization",
          "name": "Group Biopolis"
        },
        "alumniOf": {
          "@type": "EducationalOrganization",
          "name": "Lovely Professional University"
        }
      }
    };

    if (theme === 'strategy') {
      baseSchema.mainEntity.jobTitle = "Management Analyst";
      baseSchema.mainEntity.description = "Management Analyst specializing in operations analytics, Chief of Staff operations, and enterprise systems intelligence.";
      baseSchema.mainEntity.knowsAbout = ["Operations Analytics", "Business Intelligence", "SOP Automation", "Strategic Systems"];
    } else if (theme === 'product') {
      baseSchema.mainEntity.jobTitle = "Product Manager";
      baseSchema.mainEntity.description = "Product operations leader designing zero-overhead serverless internal tools and optimizing user workflows.";
      baseSchema.mainEntity.knowsAbout = ["Product Management", "Product Operations", "UX Design", "Workflow Automation"];
    } else if (theme === 'academic') {
      baseSchema.mainEntity.jobTitle = "Decision Science Researcher";
      baseSchema.mainEntity.description = "UGC NET Qualified Management researcher investigating heuristic inventory models and human-AI collaborative workflows.";
      baseSchema.mainEntity.knowsAbout = ["Operations Research", "Decision Science", "Heuristic Inventory Governance", "Academic Inquiry"];
    } else if (theme === 'transformation') {
      baseSchema.mainEntity.jobTitle = "Digital Transformation Lead";
      baseSchema.mainEntity.description = "Transformation architect migrating legacy operations to automated cloud pipelines and Chrome extensions.";
      baseSchema.mainEntity.knowsAbout = ["Digital Transformation", "Process Automation", "Legacy Migration", "Enterprise Integration"];
    }

    schemaScript.textContent = JSON.stringify(baseSchema, null, 2);
  }
}

// Re-render project cards dynamically inside three-tier layout
function renderProjectGrid() {
  const featuredGrid = document.getElementById('featuredProjects');
  const supportingGrid = document.getElementById('supportingProjects');
  const archiveTableBody = document.getElementById('archiveTableBody');
  
  if (!featuredGrid || !supportingGrid || !archiveTableBody) return;
  
  featuredGrid.innerHTML = '';
  supportingGrid.innerHTML = '';
  archiveTableBody.innerHTML = '';

  const mode = themes[currentThemeIndex];

  // Map Featured & Supporting ID lists per theme mode
  const featuredIdsMap = {
    strategy: ["MOD_01", "MOD_02", "MOD_03", "MOD_04"],
    product: ["MOD_02", "MOD_03", "MOD_04", "MOD_06"],
    academic: ["MOD_01", "MOD_02", "MOD_04", "MOD_06"],
    transformation: ["MOD_01", "MOD_02", "MOD_03", "MOD_04"]
  };

  const supportingIdsMap = {
    strategy: ["MOD_05", "MOD_06", "MOD_07", "MOD_14", "MOD_15", "MOD_22"],
    product: ["MOD_07", "MOD_10", "MOD_13", "MOD_15", "MOD_19", "MOD_22"],
    academic: ["MOD_07", "MOD_08", "MOD_13", "MOD_15", "MOD_20", "MOD_22"],
    transformation: ["MOD_07", "MOD_11", "MOD_15", "MOD_16", "MOD_18", "MOD_22"]
  };

  const featuredIds = featuredIdsMap[mode] || [];
  const supportingIds = supportingIdsMap[mode] || [];

  function getModeText(proj, type) {
    const defaultData = proj.strategy;
    const modeData = proj[mode] || defaultData;
    
    if (type === 'title') return modeData.title || defaultData.title;
    
    if (type === 'problem') {
      return proj.product?.problem || proj.transformation?.before || defaultData.desc;
    }
    if (type === 'context') {
      return defaultData.desc || "Operational system design in SME structure.";
    }
    if (type === 'approach') {
      return proj.product?.decisions || proj.transformation?.change || proj.research?.methodology || "Architected custom software automation layers.";
    }
    if (type === 'solution') {
      return proj.product?.solution || proj.transformation?.after || "Interactive dashboard and automated script validation.";
    }
    if (type === 'outcome') {
      return proj.product?.outcome || proj.transformation?.value || proj.research?.contribution || defaultData.outcomeText;
    }
    if (type === 'takeaway') {
      return proj.product?.decisions || proj.transformation?.change || "Validate data schemas and normalize contact indices before script deployment.";
    }
    return "";
  }

  // 1. Render Featured Flagships
  const featuredProjects = projectData.filter(p => featuredIds.includes(p.id));
  featuredProjects.forEach(proj => {
    const card = document.createElement('div');
    card.className = 'glass-card featured-card';
    card.setAttribute('data-category', proj.category);
    
    const links = getSemanticLinks(proj.id);
    const techStack = proj.strategy.tech || [];
    
    card.innerHTML = `
      <div class="featured-card-header">
        <span class="mono-tag" style="background: rgba(59, 130, 246, 0.05); color: var(--accent-blue); border-color: rgba(59,130,246,0.15);">Flagship Project</span>
        <span class="card-num">${proj.id}</span>
      </div>
      <h3>${getModeText(proj, 'title')}</h3>
      
      <div class="featured-scannable-grid">
        <div class="scannable-block">
          <h4>Problem Statement</h4>
          <p>${getModeText(proj, 'problem')}</p>
        </div>
        <div class="scannable-block">
          <h4>Context &amp; Operational Need</h4>
          <p>${getModeText(proj, 'context')}</p>
        </div>
        <div class="scannable-block">
          <h4>Approach &amp; Method</h4>
          <p>${getModeText(proj, 'approach')}</p>
        </div>
        <div class="scannable-block">
          <h4>Solution &amp; Ingested Tools</h4>
          <p>${getModeText(proj, 'solution')}</p>
        </div>
      </div>

      <div class="strategic-outcome-widget" style="margin-bottom: 1.5rem;">
        <div class="outcome-label">Direct Business Outcome &amp; Impact</div>
        <div class="outcome-text">${getModeText(proj, 'outcome')}</div>
      </div>

      <div style="font-size: 0.82rem; color: var(--color-secondary); line-height: 1.55; margin-bottom: 1.25rem; padding: 0.85rem; border-radius: var(--radius-sm); border: 1px dashed var(--border-light); background: rgba(255, 255, 255, 0.55);">
        <strong>LEO Lessons Learned:</strong> ${getModeText(proj, 'takeaway')}
      </div>

      <div class="analytics-card-tech" style="border-top: 1px solid var(--border-light); padding-top: 1rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
        <div style="display: flex; flex-wrap: wrap; gap: 0.4rem;">
          ${techStack.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>
        <div style="font-family: var(--font-mono); font-size: 0.65rem; color: var(--color-muted);">
          🔗 Links: <span class="archive-action-link" onclick="highlightProject('${links.project}')">${links.project}</span> | Theme: <em>${links.theme}</em>
        </div>
      </div>
      
      ${proj.strategy.cta ? `<button class="case-study-trigger-btn" data-project="${proj.strategy.cta.key}" style="margin-top: 1.25rem; width: fit-content; padding: 0.55rem 1.15rem; font-size: 0.78rem; border-radius: var(--radius-sm); border: 1px solid var(--border-light); background: transparent; cursor: pointer; transition: all 0.2s ease;">🔎 Systems Deep-Dive &rarr;</button>` : ''}
    `;
    featuredGrid.appendChild(card);
  });

  // 2. Render Supporting Projects
  const supportingProjects = projectData.filter(p => supportingIds.includes(p.id));
  supportingProjects.forEach(proj => {
    const card = document.createElement('div');
    card.className = 'glass-card analytics-card';
    card.setAttribute('data-category', proj.category);
    
    const links = getSemanticLinks(proj.id);
    const techStack = proj.strategy.tech || [];
    
    card.innerHTML = `
      <div class="analytics-card-header">
        <span class="mono-tag">${proj.category === 'ai-systems' ? 'AI Systems' : proj.category === 'fullstack' ? 'Web App' : proj.category === 'supply-ops' ? 'Supply & Ops' : 'Extension'}</span>
        <span class="card-num">${proj.id}</span>
      </div>
      <h3>${getModeText(proj, 'title')}</h3>
      <p class="analytics-card-desc" style="font-size: 0.85rem; line-height: 1.5; margin-bottom: 1rem;">${proj.strategy.desc}</p>
      
      <div class="strategic-outcome-widget">
        <div class="outcome-label">Direct Business Outcome</div>
        <div class="outcome-text">${getModeText(proj, 'outcome')}</div>
      </div>

      <div class="analytics-card-tech" style="display: flex; justify-content: space-between; align-items: center; padding-top: 0.85rem; margin-top: auto; border-top: 1px solid var(--border-light);">
        <div style="display: flex; flex-wrap: wrap; gap: 0.3rem;">
          ${techStack.slice(0, 3).map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>
        <div style="font-family: var(--font-mono); font-size: 0.62rem; color: var(--color-muted);">
          🔗 Links: <span class="archive-action-link" onclick="highlightProject('${links.project}')">${links.project}</span>
        </div>
      </div>
      
      ${proj.strategy.cta ? `<button class="case-study-trigger-btn" data-project="${proj.strategy.cta.key}" style="margin-top: 1rem; width: fit-content; padding: 0.45rem 0.9rem; font-size: 0.72rem; border-radius: var(--radius-sm); border: 1px solid var(--border-light); background: transparent; cursor: pointer; transition: all 0.2s ease;">🔎 Systems Deep-Dive</button>` : ''}
    `;
    supportingGrid.appendChild(card);
  });

  // 3. Populate Full Table Registry
  projectData.forEach(proj => {
    const row = document.createElement('tr');
    row.className = 'archive-row';
    row.id = `archive-row-${proj.id}`;
    row.setAttribute('data-category', proj.category);
    
    const techStack = proj.strategy.tech || [];
    
    row.innerHTML = `
      <td style="font-family: var(--font-mono); font-weight: 700; color: var(--color-primary);">${proj.id}</td>
      <td>
        <strong style="color: var(--color-primary); font-size: 0.9rem;">${getModeText(proj, 'title')}</strong>
        <div style="font-size: 0.75rem; color: var(--color-muted); margin-top: 0.25rem;">Type: ${proj.category === 'ai-systems' ? 'AI Systems' : proj.category === 'fullstack' ? 'Web App' : proj.category === 'supply-ops' ? 'Supply & Ops' : 'Extension'}</div>
      </td>
      <td><span style="font-size: 0.8rem; line-height: 1.4; display: block;">${proj.strategy.desc}</span></td>
      <td>
        <div style="display: flex; flex-wrap: wrap; gap: 0.2rem;">
          ${techStack.map(t => `<span class="archive-tech-tag">${t}</span>`).join('')}
        </div>
      </td>
      <td>
        <div style="font-size: 0.8rem; font-weight: 500; color: var(--color-secondary);">${getModeText(proj, 'outcome')}</div>
      </td>
    `;
    archiveTableBody.appendChild(row);
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

  const activeCountLabel = document.getElementById('projectActiveCount');
  if (activeCountLabel) {
    const visibleCards = featuredProjects.length + supportingProjects.length;
    activeCountLabel.textContent = visibleCards;
  }
}

// Update Three.js background colors
function updateThreeVariables(isAcademic) {
  if (!scene) return;
  const duration = 0.8;

  const mode = themes[currentThemeIndex];
  let bgColorHex = 0xf6f8fc;
  let lightColorHex = 0xeef2ff;
  let partColorHex = 0x8b5cf6;

  if (mode === 'strategy') {
    bgColorHex = 0xf1f5f9;
    lightColorHex = 0x3b82f6;
    partColorHex = 0x3b82f6;
  } else if (mode === 'product') {
    bgColorHex = 0xf3f4f6;
    lightColorHex = 0xe5e7eb;
    partColorHex = 0x4f46e5;
  } else if (mode === 'academic') {
    bgColorHex = 0xfbf9f4;
    lightColorHex = 0xe4dfd6;
    partColorHex = 0xb45309;
  } else if (mode === 'transformation') {
    bgColorHex = 0xf8fafc;
    lightColorHex = 0x0ea5e9;
    partColorHex = 0x0ea5e9;
  }

  const targetBgColor = new THREE.Color(bgColorHex);
  const targetLightColor = new THREE.Color(lightColorHex);
  const targetPartColor = new THREE.Color(partColorHex);

  gsap.to(scene.background, {
    r: targetBgColor.r, g: targetBgColor.g, b: targetBgColor.b,
    duration: duration
  });
  if (scene.fog) {
    gsap.to(scene.fog.color, {
      r: targetBgColor.r, g: targetBgColor.g, b: targetBgColor.b,
      duration: duration
    });
  }
  if (dirLight) {
    gsap.to(dirLight.color, {
      r: targetLightColor.r, g: targetLightColor.g, b: targetLightColor.b,
      duration: duration
    });
  }
  if (particleMaterial) {
    gsap.to(particleMaterial.color, {
      r: targetPartColor.r, g: targetPartColor.g, b: targetPartColor.b,
      duration: duration
    });
  }
}

