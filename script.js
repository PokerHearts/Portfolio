/* ==========================================================================
   THREE.JS STRATEGIC SPATIAL UNIVERSE BACKGROUND
   ========================================================================== */
let scene, camera, renderer, dirLight;
let particleGroup, nodeGroup, landscapeMesh;
let nodes = [];
const nodeCount = 45;
const maxDistance = 9;
let nodeMaterial; // Declared globally for dynamic theme interpolation
let spiritualTextGroup; // Group container for dynamic spiritual floating text sprites
let isSanatanTheme = false;
const themes = ['corporate', 'sanatan', 'plain'];
let currentThemeIndex = 0;

// Memorable Identity Quotes (Rotating on Refresh)
const corporateQuotes = [
  { text: "I build systems, write stories, and explore the space where logic meets memory.", author: "Pratap Jindal" },
  { text: "We do not build systems to eliminate work; we build them to free the mind for what matters.", author: "Pratap Jindal" },
  { text: "Between the raw database and the final narrative lies the fragile space of human memory.", author: "Poker Hearts" },
  { text: "True efficiency is not speed; it is the absolute elimination of unnecessary cycles.", author: "Pratap Jindal" },
  { text: "We repair our broken workflows with code, much like kintsugi, highlighting the cracks in gold.", author: "Poker Hearts" },
  { text: "Systems function in loops; human lives function in stories.", author: "Poker Hearts" }
];

// Parallax tracking mouse
let mouseX = 0, mouseY = 0;
let targetMouseX = 0, targetMouseY = 0;
const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

function initThree() {
  const canvas = document.getElementById('webgl-canvas');
  if (!canvas) return;

  // Scene Graph & Perspective Camera Setup
  scene = new THREE.Scene();
  
  // Bright spatial fog for atmospheric depth
  scene.background = new THREE.Color(0xf6f8fc);
  scene.fog = new THREE.FogExp2(0xf6f8fc, 0.025);

  camera = new THREE.Camera();
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 5, 25);

  // High-performance WebGL Renderer
  renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: false,
    antialias: true,
    powerPreference: "high-performance"
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Ambient & Directional Lighting setup (Premium strategy studio light)
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);

  dirLight = new THREE.DirectionalLight(0xeef2ff, 1.2);
  dirLight.position.set(10, 20, 15);
  scene.add(dirLight);

  // Group container instances
  particleGroup = new THREE.Group();
  nodeGroup = new THREE.Group();
  spiritualTextGroup = new THREE.Group();
  scene.add(particleGroup);
  scene.add(nodeGroup);
  scene.add(spiritualTextGroup);

  // 1. FLUID PARTICLE MOTION CLOUD
  const particleGeo = new THREE.BufferGeometry();
  const particleCount = 120;
  const posArray = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 55;
  }
  
  particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  
  // Custom glowing round canvas particle textures
  const pMaterial = new THREE.PointsMaterial({
    size: 0.28,
    color: 0x8b5cf6, // Royal Lavender
    transparent: true,
    opacity: 0.45,
    blending: THREE.NormalBlending
  });

  const ambientParticles = new THREE.Points(particleGeo, pMaterial);
  particleGroup.add(ambientParticles);

  // 2. INTERCONNECTED STRATEGIC NODES
  const nodeGeometry = new THREE.SphereGeometry(0.12, 8, 8);
  nodeMaterial = new THREE.MeshBasicMaterial({
    color: 0x3b82f6, // Executive Blue
    transparent: true,
    opacity: 0.8
  });

  for (let i = 0; i < nodeCount; i++) {
    const mesh = new THREE.Mesh(nodeGeometry, nodeMaterial);
    mesh.position.set(
      (Math.random() - 0.5) * 28,
      (Math.random() - 0.5) * 16,
      (Math.random() - 0.5) * 20
    );
    
    // Custom velocity parameters for floating drift animation
    mesh.userData = {
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.015,
        (Math.random() - 0.5) * 0.015,
        (Math.random() - 0.5) * 0.015
      )
    };
    
    nodeGroup.add(mesh);
    nodes.push(mesh);
  }

  // 3. UNDULATING GRID DATA LANDSCAPE (Parametric Math Mesh)
  // Low-poly analytical wireframe grid
  const landscapeGeo = new THREE.PlaneGeometry(70, 70, 30, 30);
  const landscapeMat = new THREE.MeshBasicMaterial({
    color: 0x94a3b8, // Silver/Cool Slate
    wireframe: true,
    transparent: true,
    opacity: 0.12
  });

  landscapeMesh = new THREE.Mesh(landscapeGeo, landscapeMat);
  landscapeMesh.rotation.x = -Math.PI / 2;
  landscapeMesh.position.y = -10;
  scene.add(landscapeMesh);

  // Register Event Handlers
  window.addEventListener('resize', onWindowResize);
  document.addEventListener('mousemove', onMouseMove);

  // Create spiritual texts drifting sprites in Three.js scene
  createSpiritualSprites();

  // Initialize Scroll Choreo
  setupCameraScrollChoreography();

  // Kickoff Core Animation Loop
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

  // Core ScrollTimeline glides linking Three.js spatial viewports to DOM coordinates
  
  // Section #hero (Station 1) -> Section #projects (Station 2)
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

  // Section #projects (Station 2) -> Section #experience (Station 3)
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

  // Section #experience (Station 3) -> Section #research (Station 4)
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

  // Section #research (Station 4) -> Section #skills (Station 5)
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

  // Section #skills (Station 5) -> Section #connect (Station 6)
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

// Core WebGL Frame Animation Render Loop
function animate() {
  requestAnimationFrame(animate);
  if (themes[currentThemeIndex] === 'plain') return; // Skip updating and rendering when in Plain Reading Mode!

  const time = Date.now() * 0.0008;

  // Slowly drift ambient particle clouds
  particleGroup.rotation.y = time * 0.04;
  particleGroup.rotation.x = time * 0.02;

  // Drift the spiritual text sprites if visible in the scene
  if (spiritualTextGroup && spiritualTextGroup.visible) {
    spiritualTextGroup.rotation.y = time * 0.015;
    for (let i = 0; i < spiritualTextGroup.children.length; i++) {
      const sprite = spiritualTextGroup.children[i];
      sprite.position.add(sprite.userData.velocity);
      
      // Boundaries bounce
      if (Math.abs(sprite.position.x) > 28) sprite.userData.velocity.x *= -1;
      if (Math.abs(sprite.position.y) > 16) sprite.userData.velocity.y *= -1;
      if (Math.abs(sprite.position.z) > 20) sprite.userData.velocity.z *= -1;
    }
  }

  // Update dynamic strategic nodes and drift coordinates
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    node.position.add(node.userData.velocity);

    // Bounce drift coordinates off imaginary boundary coordinates
    if (Math.abs(node.position.x) > 16) node.userData.velocity.x *= -1;
    if (Math.abs(node.position.y) > 10) node.userData.velocity.y *= -1;
    if (Math.abs(node.position.z) > 12) node.userData.velocity.z *= -1;
  }

  // Draw node connection wires on-the-fly dynamically (avoiding memory leakage)
  // Remove previous frame wireframe meshes
  while (nodeGroup.children.length > nodes.length) {
    nodeGroup.remove(nodeGroup.children[nodeGroup.children.length - 1]);
  }

  const linePositions = [];
  const lineColors = [];
  
  const colorNear = new THREE.Color(0xc7d2fe); // Soft Blue-Violet
  const colorFar = new THREE.Color(0xeef2ff);

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dist = nodes[i].position.distanceTo(nodes[j].position);
      if (dist < maxDistance) {
        // Calculate wire segments
        const geoPoints = [nodes[i].position.clone(), nodes[j].position.clone()];
        const lineGeo = new THREE.BufferGeometry().setFromPoints(geoPoints);
        
        // Stagger opacity according to distances
        const opacity = (1 - dist / maxDistance) * 0.22;
        
        // Line color adapts dynamically based on theme preset
        const lineColor = isSanatanTheme ? 0xea580c : 0x8b5cf6;
        const lineMat = new THREE.LineBasicMaterial({
          color: lineColor,
          transparent: true,
          opacity: opacity,
          linewidth: 1
        });
        
        const line = new THREE.Line(lineGeo, lineMat);
        nodeGroup.add(line);
      }
    }
  }

  // Undulate the grid math plane mesh (Dynamic math data surface waves)
  const posAttribute = landscapeMesh.geometry.attributes.position;
  const v = new THREE.Vector3();
  
  for (let i = 0; i < posAttribute.count; i++) {
    v.fromBufferAttribute(posAttribute, i);
    // Sine equations modeling business trends undulations
    const zOffset = Math.sin(v.x * 0.15 + time) * Math.cos(v.y * 0.15 + time) * 1.6;
    posAttribute.setZ(i, zOffset);
  }
  posAttribute.needsUpdate = true;

  // Tactile camera mouse-drift parallax interpolation
  mouseX += (targetMouseX - mouseX) * 0.05;
  mouseY += (targetMouseY - mouseY) * 0.05;
  
  camera.position.x += (mouseX - camera.position.x) * 0.05;
  camera.position.y += (-mouseY - camera.position.y) * 0.05;

  renderer.render(scene, camera);
}


/* ==========================================================================
   CORE INTERACTIVE UI INTERACTIONS (Silky Widget Logic)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Initialize WebGL spatial environment
  initThree();

  // 2. Active Section Navigation Indicator & Scroll Reveals
  const navLinks = document.querySelectorAll('.nav-link-item a');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    // Nav bar scrolling blur toggle
    const mainNav = document.getElementById('mainNav');
    if (window.scrollY > 40) {
      mainNav.classList.add('scrolled');
    } else {
      mainNav.classList.remove('scrolled');
    }

    // Nav active tab calculations
    let currentActive = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
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

  // Mobile menu hamburger toggle
  const navToggle = document.getElementById('navToggle');
  const navLinksList = document.getElementById('navLinks');
  if (navToggle && navLinksList) {
    navToggle.addEventListener('click', () => {
      navLinksList.classList.toggle('open');
    });

    // Close when clicking link
    document.querySelectorAll('.nav-link-item a').forEach(link => {
      link.addEventListener('click', () => {
        navLinksList.classList.remove('open');
      });
    });
  }

  // 3. Hero Vision Panel Mode Switcher
  const btnStrategic = document.getElementById('btnStrategicMode');
  const btnAnalytical = document.getElementById('btnAnalyticalMode');
  const paneStrategic = document.getElementById('paneStrategic');
  const paneAnalytical = document.getElementById('paneAnalytical');

  if (btnStrategic && btnAnalytical) {
    btnStrategic.addEventListener('click', () => {
      btnStrategic.classList.add('active');
      btnAnalytical.classList.remove('active');
      paneStrategic.classList.add('active');
      paneAnalytical.classList.remove('active');
    });

    btnAnalytical.addEventListener('click', () => {
      btnAnalytical.classList.add('active');
      btnStrategic.classList.remove('active');
      paneAnalytical.classList.add('active');
      paneStrategic.classList.remove('active');
    });
  }

  // === STRATEGIC ROI & OPERATIONS CALCULATOR DATA ===
  const roiData = {
    hrVoice: {
      title: "AI Voice Mock Interview Simulator & Portal",
      outcome: "High-fidelity mock interview training sandbox",
      align: "Senior Product Manager / Systems Lead",
      metrics: [
        { label: "Hours Saved", val: "Intensive job simulation prep" },
        { label: "Operating Cost", val: "~$0.05 API cost per interview" },
        { label: "Conversion Lift", val: "Adaptive Hindi/English dialogues" }
      ],
      flow: "Resume Upload (PDF.js) ➔ Hindi/English VAD dialogue loop (Web Audio/Speech APIs) ➔ Structured performance metrics ➔ Google Sheets"
    },
    callQA: {
      title: "AI-Powered Call QA Analysis",
      outcome: "100% Quality Assurance evaluation coverage",
      align: "Chief of Staff / Analytics Lead",
      metrics: [
        { label: "Audio Ingested", val: "1,200 Calls / 800 mins daily" },
        { label: "QA Hours Saved", val: "360 Hours / Month" },
        { label: "Feedback Loop", val: "Real-time rep notifications" }
      ],
      flow: "Call recording folder ➔ Android sync script ➔ Drive directory ➔ Batch transcripts analysis (Gemini API) ➔ Structured Sheets"
    },
    b2bOrder: {
      title: "B2B Order Booking Workspace",
      outcome: "60% recurring booking lead-time eliminated",
      align: "Senior PM / Systems Architect",
      metrics: [
        { label: "Transaction Time", val: "Slashed from 8 mins to 45 secs" },
        { label: "Infrastructure Cost", val: "$0.00 (Google Apps Script)" },
        { label: "Order Accuracy", val: "100% (Zero manual typos)" }
      ],
      flow: "Retailers ➔ Mobile B2B catalog interface ➔ Custom token verification ➔ State storage ➔ Real-time jsPDF invoicing ➔ Transit log"
    },
    invPO: {
      title: "Predictive Inventory & PO Optimizer",
      outcome: "Chronic stock shortages cut from 17 to 2",
      align: "Chief of Staff / Supply Operations",
      metrics: [
        { label: "Sales Lift", val: "20% increase on rationalized lines" },
        { label: "Out-of-Stock Delay", val: "Reduced by 85%" },
        { label: "Purchase Loops", val: "Fully automated moving-averages" }
      ],
      flow: "Out-of-stock data capture ➔ Moving averages safety parameters ➔ Auto reorder thresholds ➔ Purchase Order tracking ledgers"
    }
  };

  const roiButtons = document.querySelectorAll('.roi-select-btn');
  const roiDisplayCard = document.getElementById('roiDisplayCard');

  function renderROI(sysKey) {
    const data = roiData[sysKey];
    if (!data || !roiDisplayCard) return;
    
    gsap.to(roiDisplayCard, {
      opacity: 0.3,
      y: 5,
      duration: 0.15,
      onComplete: () => {
        roiDisplayCard.innerHTML = `
          <div style="border-bottom: 1px solid var(--border-light); padding-bottom: 1rem; margin-bottom: 1.25rem;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.5rem;">
              <span class="mono-tag" style="background: rgba(99, 102, 241, 0.05); color: var(--accent-purple); border-color: rgba(99, 102, 241, 0.12); font-size: 0.6rem;">${data.align}</span>
              <span style="font-family: var(--font-mono); font-size: 0.65rem; color: var(--color-muted); font-weight: 600; text-transform: uppercase;">Operational ROI</span>
            </div>
            <h4 style="font-size: 1.2rem; font-weight: 800; color: var(--color-primary); margin-bottom: 0.25rem;">${data.title}</h4>
            <p style="font-size: 0.82rem; color: var(--accent-blue); font-weight: 700;">🎯 Key Value: ${data.outcome}</p>
          </div>
          
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 1.5rem;" class="roi-calculator-container">
            ${data.metrics.map(m => `
              <div class="roi-metric-chip">
                <span style="font-size: 0.65rem; font-weight: 600; color: var(--color-muted); text-transform: uppercase; letter-spacing: 0.05em;">${m.label}</span>
                <span style="font-size: 0.95rem; font-weight: 800; color: var(--color-primary); margin-top: 0.15rem; line-height: 1.2;">${m.val}</span>
              </div>
            `).join('')}
          </div>
          
          <div style="background: rgba(226, 232, 240, 0.4); border: 1px solid var(--border-light); padding: 1rem; border-radius: var(--radius-sm); margin-top: auto;">
            <span style="font-family: var(--font-mono); font-size: 0.55rem; font-weight: 600; color: var(--color-muted); text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 0.5rem;">Systems Architecture Flow</span>
            <p style="font-family: var(--font-mono); font-size: 0.68rem; color: var(--color-secondary); line-height: 1.5; word-break: break-word;">${data.flow}</p>
          </div>
        `;
        
        gsap.to(roiDisplayCard, { opacity: 1, y: 0, duration: 0.35 });
      }
    });
  }

  // Bind click listeners on the buttons
  roiButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      roiButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const sysKey = btn.getAttribute('data-sys');
      renderROI(sysKey);
    });
  });

  // Trigger initial first item
  renderROI('hrVoice');

  // 4. Projects Filter Grid Logic
  const filterPills = document.querySelectorAll('#projectFilters .filter-pill');
  const projectCards = document.querySelectorAll('#projectGrid .analytics-card');
  const activeCountLabel = document.getElementById('projectActiveCount');

  // Initialize display count
  if (activeCountLabel) {
    activeCountLabel.textContent = projectCards.length;
  }

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      // Set active pill class
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filterType = pill.getAttribute('data-filter');
      let visibleCount = 0;

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterType === 'all' || category === filterType) {
          card.style.display = 'flex';
          visibleCount++;
          // Stagger card reveals
          gsap.fromTo(card, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4 });
        } else {
          card.style.display = 'none';
        }
      });

      if (activeCountLabel) activeCountLabel.textContent = visibleCount;
    });
  });

  // 5. Intelligent Timeline Flow - Experiences Systems pipeline dataset
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

    // Transition values elegantly with GSAP
    gsap.to("#pipelineCard", {
      opacity: 0.3,
      y: 5,
      duration: 0.15,
      onComplete: () => {
        if (pipelineSub) pipelineSub.textContent = data.subtitle;
        if (pipelineTitle) pipelineTitle.textContent = data.title;

        // Render bullet list
        if (pipelineBullets) {
          pipelineBullets.innerHTML = "";
          data.bullets.forEach(bullet => {
            const li = document.createElement('li');
            li.className = "pipeline-bullet";
            li.textContent = bullet;
            pipelineBullets.appendChild(li);
          });
        }

        // Render visual pipeline nodes
        if (flowNodesWrapper) {
          flowNodesWrapper.innerHTML = "";
          data.flow.forEach((node, index) => {
            // Append node circular item
            const nodeEl = document.createElement('div');
            nodeEl.className = "flow-node-item";
            nodeEl.innerHTML = `
              <div class="node-icon-circle">${node.icon}</div>
              <span class="node-lbl">${node.label}</span>
            `;
            flowNodesWrapper.appendChild(nodeEl);

            // Add arrow connectors between nodes
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

  // Bind click listeners on timeline items
  timelineItems.forEach(item => {
    item.addEventListener('click', () => {
      timelineItems.forEach(t => t.classList.remove('active'));
      item.classList.add('active');
      const expKey = item.getAttribute('data-exp');
      renderTimelineDetail(expKey);
    });
  });

  // Render initial first item
  renderTimelineDetail('analyst');

  // 6. Real-time Searchable Knowledge Archive Logic
  const archiveSearchInput = document.getElementById('archiveSearch');
  const archiveFilters = document.querySelectorAll('#archiveFilters .archive-filter-btn');
  const archiveCards = document.querySelectorAll('#archiveGrid .archive-card');

  function filterArchiveGrid() {
    const query = archiveSearchInput.value.toLowerCase().trim();
    const activeFilterBtn = document.querySelector('#archiveFilters .archive-filter-btn.active');
    const filterCat = activeFilterBtn ? activeFilterBtn.getAttribute('data-cat') : 'all';

    archiveCards.forEach(card => {
      const title = card.querySelector('h3').textContent.toLowerCase();
      const text = card.querySelector('p').textContent.toLowerCase();
      const tags = Array.from(card.querySelectorAll('.mono-tag')).map(t => t.textContent.toLowerCase()).join(' ');
      const category = card.getAttribute('data-category');

      const matchesSearch = title.includes(query) || text.includes(query) || tags.includes(query);
      const matchesCategory = filterCat === 'all' || category === filterCat;

      if (matchesSearch && matchesCategory) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  if (archiveSearchInput) {
    archiveSearchInput.addEventListener('input', filterArchiveGrid);
  }

  archiveFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      archiveFilters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterArchiveGrid();
    });
  });

  // 7. B2B Brief Form Slider real-time formatting updates
  const briefSlider = document.getElementById('briefRange');
  const sliderOutput = document.getElementById('sliderOutput');

  if (briefSlider && sliderOutput) {
    briefSlider.addEventListener('input', () => {
      const val = parseInt(briefSlider.value);
      // Format number to local string
      sliderOutput.textContent = val.toLocaleString();
    });
  }

  // === PREMIUM HIGH-RELIABILITY TOAST SYSTEM ===
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
    
    // Force layout repaint
    toast.offsetHeight;
    
    // Fade in
    toast.style.transform = 'translateX(-50%) translateY(0)';
    toast.style.opacity = '1';
    
    // Fade out & cleanup
    setTimeout(() => {
      toast.style.transform = 'translateX(-50%) translateY(-20px)';
      toast.style.opacity = '0';
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 400);
    }, 2200);
  }

  // Bind clipboard copies to direct connect cells to bypass native system limits
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

  // 8. Dynamic B2B brief submit handler compiling mail data with overlay backup
  const briefForm = document.getElementById('briefForm');
  const successOverlay = document.getElementById('briefSuccessOverlay');

  if (briefForm && successOverlay) {
    briefForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const company = document.getElementById('briefCompany').value.trim();
      const budget = parseInt(document.getElementById('briefRange').value).toLocaleString();
      const urgency = document.querySelector('input[name="urgency"]:checked').value;
      const jd = document.getElementById('briefJD').value.trim();
      const contact = document.getElementById('briefContact').value.trim();
      
      const emailTo = "pratapjindal812@gmail.com";
      const subject = `Strategic Brief from ${company}`;
      
      const body = `Hi Pratap,\n\nI have generated a B2B project brief through your digital workspace environment. Here are the core specifications:\n\n` +
                   `• Company / Organization: ${company}\n` +
                   `• Contact Information: ${contact}\n` +
                   `• Target Budget Threshold: $${budget}\n` +
                   `• Timeline / Urgency: ${urgency}\n\n` +
                   `• Job Description / Scope Parameters:\n${jd}\n\n` +
                   `Best regards,\n${company}`;
                   
      const mailtoUrl = `mailto:${emailTo}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      // Attempt virtual anchor link click to bypass strict popup blockers
      const virtualLink = document.createElement('a');
      virtualLink.href = mailtoUrl;
      virtualLink.target = '_blank';
      document.body.appendChild(virtualLink);
      virtualLink.click();
      document.body.removeChild(virtualLink);
      
      // Render success overlay fallback UI
      successOverlay.innerHTML = `
        <div style="border-bottom: 1px solid var(--border-light); padding-bottom: 1rem; margin-bottom: 1.25rem;">
          <span class="mono-tag" style="background: rgba(59, 130, 246, 0.05); color: var(--accent-blue); border-color: rgba(59, 130, 246, 0.15); font-size: 0.6rem;">Brief Synthesized</span>
          <h4 style="font-size: 1.25rem; font-weight: 800; color: var(--color-primary); margin-top: 0.5rem; margin-bottom: 0.25rem;">Strategic Proposal Prepared</h4>
          <p style="font-size: 0.78rem; color: var(--color-muted); line-height: 1.4;">
            We have prepared your strategic proposal data and triggered your mail app. If your mail client did not launch automatically, copy the compiled brief block below and email it directly to <strong style="color: var(--color-primary);">pratapjindal812@gmail.com</strong>.
          </p>
        </div>
        
        <div style="flex-grow: 1; margin-bottom: 1.25rem; display: flex; flex-direction: column; gap: 0.5rem;">
          <span style="font-family: var(--font-mono); font-size: 0.55rem; color: var(--color-muted); text-transform: uppercase; letter-spacing: 0.05em; display: block;">Prepared Brief Data</span>
          <textarea id="briefCopyArea" readonly style="width: 100%; flex-grow: 1; min-height: 140px; background: rgba(226, 232, 240, 0.4); border: 1px solid var(--border-light); border-radius: var(--radius-sm); padding: 0.65rem; font-family: var(--font-mono); font-size: 0.68rem; color: var(--color-secondary); resize: none; outline: none;">${body}</textarea>
        </div>
        
        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
          <button id="btnCopyBrief" class="brief-submit-btn" style="margin-top: 0; width: 100%; font-size: 0.8rem; background: var(--grad-primary); border-radius: var(--radius-sm);">
            📋 Copy Brief to Clipboard
          </button>
          <button id="btnCopyEmailOnly" class="roi-select-btn" style="width: 100%; padding: 0.6rem; font-size: 0.78rem; border-radius: var(--radius-sm); border: 1px solid var(--border-light) !important;">
            ✉️ Copy Email Address Only
          </button>
          <button id="btnResetBrief" class="roi-select-btn" style="width: 100%; padding: 0.6rem; font-size: 0.78rem; border-radius: var(--radius-sm); border: 1px dashed var(--border-light) !important; background: transparent !important; color: var(--color-muted) !important;">
            🔄 Submit Another Request
          </button>
        </div>
      `;
      
      // Animate success panel fade-in
      successOverlay.style.display = 'flex';
      gsap.fromTo(successOverlay, { opacity: 0, scale: 0.98 }, { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" });
      
      // Bind helper copy actions
      const btnCopyBrief = document.getElementById('btnCopyBrief');
      if (btnCopyBrief) {
        btnCopyBrief.addEventListener('click', () => {
          const copyText = document.getElementById('briefCopyArea');
          copyText.select();
          document.execCommand('copy');
          btnCopyBrief.textContent = "✓ Brief Copied to Clipboard";
          showToast("Brief data copied to clipboard");
          setTimeout(() => { btnCopyBrief.textContent = "📋 Copy Brief to Clipboard"; }, 2000);
        });
      }
      
      const btnCopyEmailOnly = document.getElementById('btnCopyEmailOnly');
      if (btnCopyEmailOnly) {
        btnCopyEmailOnly.addEventListener('click', () => {
          navigator.clipboard.writeText("pratapjindal812@gmail.com");
          btnCopyEmailOnly.textContent = "✓ Email Address Copied";
          showToast("Corporate email copied to clipboard");
          setTimeout(() => { btnCopyEmailOnly.textContent = "✉️ Copy Email Address Only"; }, 2000);
        });
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
              const val = parseInt(briefSlider.value);
              sliderOutput.textContent = val.toLocaleString();
            }
          });
        });
      }
    });
  }

  // === DYNAMIC ROTATING QUOTE ON REFRESH (OR THEME SWITCH) ===
  const dynamicQuoteText = document.getElementById('dynamicQuoteText');
  const dynamicQuoteAuthor = document.getElementById('dynamicQuoteAuthor');
  
  function rotateIdentityQuote() {
    if (isSanatanTheme) {
      if (dynamicQuoteText) dynamicQuoteText.innerHTML = '"कर्मण्येवाधिकारस्ते मा फलेषु कदाचन |<br>You have a right to perform your prescribed duty, but you are not entitled to the fruits of action."';
      if (dynamicQuoteAuthor) dynamicQuoteAuthor.innerHTML = "— Bhagavad Gita (Karma Yoga) &middot; Hare Krishna 🦚";
    } else {
      // Pick a random quote from our corporate quotes ledger
      const randomIndex = Math.floor(Math.random() * corporateQuotes.length);
      const chosen = corporateQuotes[randomIndex];
      if (dynamicQuoteText) dynamicQuoteText.innerHTML = `"${chosen.text}"`;
      if (dynamicQuoteAuthor) dynamicQuoteAuthor.innerHTML = `— ${chosen.author}`;
    }
  }
  
  // Rotate once on initial page load
  rotateIdentityQuote();

  // === THREE-STATE THEME PRESET SWITCH CONTROLLER ===
  const themeToggleBtn = document.getElementById('themeToggle');
  const heroSpiritualSubtitle = document.getElementById('heroSpiritualSubtitle');
  const heroBadgeText = document.getElementById('heroBadgeText');
  const footerCopyright = document.getElementById('footerCopyright');
  
  function applyTheme(theme) {
    // Remove all classes first
    document.body.classList.remove('sanatan-theme', 'plain-theme');
    
    const iconSpan = themeToggleBtn ? themeToggleBtn.querySelector('.toggle-icon') : null;
    const textSpan = themeToggleBtn ? themeToggleBtn.querySelector('.toggle-text') : null;
    
    if (theme === 'corporate') {
      isSanatanTheme = false;
      
      if (iconSpan) iconSpan.textContent = "🦚";
      if (textSpan) textSpan.textContent = "Sanatan";
      if (themeToggleBtn) themeToggleBtn.style.borderColor = "var(--border-glass)";
      
      // Dynamic texts swap
      if (heroSpiritualSubtitle) heroSpiritualSubtitle.style.display = 'none';
      if (heroBadgeText) heroBadgeText.innerHTML = "Systems Intelligence Matrix v2.8";
      if (footerCopyright) footerCopyright.innerHTML = "&copy; 2026 Pratap Jindal &middot; Built with semantic HTML, CSS Grid &amp; Three.js";
      
      // Swapping Intro Pane text back to corporate identity
      const paneTextStrat = document.getElementById('textStrategic');
      if (paneTextStrat) {
        paneTextStrat.innerHTML = `I build operational systems, write psychological narratives, and explore the precise space where <strong>logic meets memory</strong>. Managing a team of 108 across a multi-company group, I translate senior executive intent into highly-automated digital instruments — transforming scattered workflows into clean, strategic corporate interfaces.`;
      }
      
      // Interpolate Three.js spatial variables
      updateThreeTheme(false);
      
    } else if (theme === 'sanatan') {
      isSanatanTheme = true;
      document.body.classList.add('sanatan-theme');
      
      if (iconSpan) iconSpan.textContent = "📖";
      if (textSpan) textSpan.textContent = "Plain";
      if (themeToggleBtn) themeToggleBtn.style.borderColor = "var(--border-active)";
      
      // Dynamic texts swap
      if (heroSpiritualSubtitle) heroSpiritualSubtitle.style.display = 'block';
      if (heroBadgeText) heroBadgeText.innerHTML = "Systems Intelligence Matrix v2.8 &middot; Hare Krishna 🦚";
      if (footerCopyright) footerCopyright.innerHTML = "&copy; 2026 Pratap Jindal &middot; Dedicated in Loving Devotion to Sri Krishna &middot; Hare Krishna 🦚";
      
      // Swapping Intro Pane text for Krishna devotion
      const paneTextStrat = document.getElementById('textStrategic');
      if (paneTextStrat) {
        paneTextStrat.innerHTML = `I operate at the intersection of systems optimization and deep devotion, performing every action as **Karma Yoga** — an offering to Sri Krishna. Managing a team of 108, I translate executive intent into scalable automated instruments, aligning organizational duty with absolute precision and selfless service.`;
      }
      
      // Interpolate Three.js spatial variables
      updateThreeTheme(true);
      
    } else if (theme === 'plain') {
      isSanatanTheme = false;
      document.body.classList.add('plain-theme');
      
      if (iconSpan) iconSpan.textContent = "💼";
      if (textSpan) textSpan.textContent = "Corporate";
      if (themeToggleBtn) themeToggleBtn.style.borderColor = "var(--border-active)";
      
      // Dynamic texts swap
      if (heroSpiritualSubtitle) heroSpiritualSubtitle.style.display = 'none';
      if (heroBadgeText) heroBadgeText.innerHTML = "Systems Intelligence Matrix v2.8 &middot; Reading Preset 📖";
      if (footerCopyright) footerCopyright.innerHTML = "&copy; 2026 Pratap Jindal &middot; Built with semantic HTML, CSS Grid &amp; Plain Stylesheets &middot; Plain Preset 📖";
      
      // Revert text to standard corporate text
      const paneTextStrat = document.getElementById('textStrategic');
      if (paneTextStrat) {
        paneTextStrat.innerHTML = `I build operational systems, write psychological narratives, and explore the precise space where <strong>logic meets memory</strong>. Managing a team of 108 across a multi-company group, I translate senior executive intent into highly-automated digital instruments — transforming scattered workflows into clean, strategic corporate interfaces.`;
      }
    }
    
    // Rotate the quote dynamically
    rotateIdentityQuote();
  }

  // Restore saved theme
  const savedTheme = localStorage.getItem('pj-helix-theme');
  if (savedTheme && themes.includes(savedTheme)) {
    currentThemeIndex = themes.indexOf(savedTheme);
  }
  
  // Apply initially saved or default theme
  applyTheme(themes[currentThemeIndex]);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      currentThemeIndex = (currentThemeIndex + 1) % themes.length;
      const newTheme = themes[currentThemeIndex];
      applyTheme(newTheme);
      localStorage.setItem('pj-helix-theme', newTheme);
      
      const themeLabel = newTheme === 'corporate' ? 'Corporate Executive' : newTheme === 'sanatan' ? 'Karma Yoga Devotion' : 'Plain Readable';
      showToast(`Theme updated: ${themeLabel}`);
    });
  }

  // === SLIDING CASE-STUDY DRAWER ACTIONS (PROOF OF DEPTH) ===
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

  const caseStudyDrawer = document.getElementById('caseStudyDrawer');
  const drawerProjectTitle = document.getElementById('drawerProjectTitle');
  const drawerBodyContent = document.getElementById('drawerBodyContent');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const caseStudyTriggers = document.querySelectorAll('.case-study-trigger-btn');
  
  if (caseStudyDrawer && drawerProjectTitle && drawerBodyContent) {
    caseStudyTriggers.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const projectKey = btn.getAttribute('data-project');
        const data = caseStudiesData[projectKey];
        if (!data) return;
        
        // Populate content dynamically
        drawerProjectTitle.textContent = data.title;
        drawerBodyContent.innerHTML = `
          <div class="case-study-section">
            <h5>1. Problem Statement</h5>
            <p>${data.problem}</p>
          </div>
          
          <div class="case-study-section">
            <h5>2. Systems Architecture</h5>
            <p>${data.architecture}</p>
          </div>
          
          <div class="case-study-section">
            <h5>3. Technical Challenges Solved</h5>
            <p>${data.challenge}</p>
          </div>
          
          <div class="case-study-section">
            <h5>4. Measurable Strategic Impact</h5>
            <div class="case-study-specs-grid">
              <div class="case-study-spec-card">
                <span>Outcome Metrics</span>
                <strong>${data.impact.split(',')[0]}</strong>
              </div>
              <div class="case-study-spec-card">
                <span>Efficiency Scale</span>
                <strong>${data.impact.split(',')[1] || "Automated Pipelines"}</strong>
              </div>
            </div>
          </div>
        `;
        
        // Slide drawer open
        caseStudyDrawer.classList.add('open');
      });
    });
    
    // Close actions
    if (closeDrawerBtn) {
      closeDrawerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        caseStudyDrawer.classList.remove('open');
      });
    }
    
    // Close when clicking outside of drawer panel
    document.addEventListener('click', (e) => {
      if (caseStudyDrawer.classList.contains('open') && !caseStudyDrawer.contains(e.target)) {
        caseStudyDrawer.classList.remove('open');
      }
    });
  }

  // 9. GSAP Scroll Trigger Entrance revealing animations for glass panels
  const reveals = document.querySelectorAll('.spatial-reveal');
  reveals.forEach(element => {
    gsap.fromTo(element, 
      { opacity: 0, y: 35 }, 
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.85, 
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top bottom-=80px",
          toggleActions: "play none none none"
        }
      }
    );
  });

});

/* ==========================================================================
   THREE.JS CUSTOM UTILITIES & THEMATIC FUNCTIONS
   ========================================================================== */

function createTextSprite(text, colorStr, size = 128) {
  const canvas = document.createElement('canvas');
  canvas.width = size * 4;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  
  // Sanskrit / Georgia aesthetic typography
  ctx.font = 'bold 32px Georgia, "Outfit", "Inter", sans-serif';
  ctx.fillStyle = colorStr;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // Saffron glow effect
  ctx.shadowColor = "#ea580c";
  ctx.shadowBlur = 10;
  
  ctx.fillText(text, size * 2, size / 2);
  
  const texture = new THREE.CanvasTexture(canvas);
  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    opacity: 0.85
  });
  
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(6.5, 1.6, 1);
  return sprite;
}

function createSpiritualSprites() {
  if (!spiritualTextGroup) return;
  spiritualTextGroup.clear();
  
  const spiritualTexts = [
    "Hare Krishna", "Radhe Radhe", "Ram Ram", 
    "Karma Yoga", "Shri Krishna", "Govinda", 
    "Hari Om", "Hare Krishna", "Radhe Radhe", 
    "Ram Ram", "Om", "Karma Yoga", "Shri Krishna",
    "Hare Krishna", "Radhe Radhe", "Ram Ram"
  ];
  
  const spriteColor = "#ea580c"; // Saffron
  
  for (let i = 0; i < spiritualTexts.length; i++) {
    const sprite = createTextSprite(spiritualTexts[i], spriteColor);
    sprite.position.set(
      (Math.random() - 0.5) * 36,
      (Math.random() - 0.5) * 18,
      (Math.random() - 0.5) * 24
    );
    
    // Set random velocities
    sprite.userData = {
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.012,
        (Math.random() - 0.5) * 0.012,
        (Math.random() - 0.5) * 0.012
      )
    };
    
    spiritualTextGroup.add(sprite);
  }
  
  // Sync initial visibility state
  spiritualTextGroup.visible = isSanatanTheme;
}

function updateThreeTheme(activeSpiritual) {
  if (!scene) return;
  
  const duration = 0.85;
  const targetBg = activeSpiritual ? new THREE.Color(0xfffbf4) : new THREE.Color(0xf6f8fc);
  const targetLight = activeSpiritual ? new THREE.Color(0xffedd5) : new THREE.Color(0xeef2ff);
  
  // Interpolate Scene background and fog
  gsap.to(scene.background, {
    r: targetBg.r, g: targetBg.g, b: targetBg.b,
    duration: duration
  });
  if (scene.fog) {
    gsap.to(scene.fog.color, {
      r: targetBg.r, g: targetBg.g, b: targetBg.b,
      duration: duration
    });
  }
  
  // Interpolate Directional Light
  if (dirLight) {
    gsap.to(dirLight.color, {
      r: targetLight.r, g: targetLight.g, b: targetLight.b,
      duration: duration
    });
  }
  
  // Fade in/out the spiritual text group
  if (spiritualTextGroup) {
    if (activeSpiritual) {
      spiritualTextGroup.visible = true;
      spiritualTextGroup.children.forEach(sprite => {
        gsap.fromTo(sprite.material, { opacity: 0 }, { opacity: 0.85, duration: duration });
      });
    } else {
      let completedCount = 0;
      spiritualTextGroup.children.forEach(sprite => {
        gsap.to(sprite.material, {
          opacity: 0,
          duration: duration,
          onComplete: () => {
            completedCount++;
            if (completedCount === spiritualTextGroup.children.length) {
              spiritualTextGroup.visible = false;
            }
          }
        });
      });
    }
  }
  
  // Transition standard particle colors
  if (particleGroup && particleGroup.children.length > 0) {
    const ptsMat = particleGroup.children[0].material;
    const targetColor = activeSpiritual ? new THREE.Color(0xf97316) : new THREE.Color(0x8b5cf6);
    gsap.to(ptsMat.color, {
      r: targetColor.r, g: targetColor.g, b: targetColor.b,
      duration: duration
    });
  }
  
  // Transition nodes and landscape colors
  if (nodeMaterial) {
    const targetNodeColor = activeSpiritual ? new THREE.Color(0xea580c) : new THREE.Color(0x3b82f6);
    gsap.to(nodeMaterial.color, {
      r: targetNodeColor.r, g: targetNodeColor.g, b: targetNodeColor.b,
      duration: duration
    });
  }
  
  if (landscapeMesh && landscapeMesh.material) {
    const targetLandColor = activeSpiritual ? new THREE.Color(0xd97706) : new THREE.Color(0x94a3b8);
    gsap.to(landscapeMesh.material.color, {
      r: targetLandColor.r, g: targetLandColor.g, b: targetLandColor.b,
      duration: duration
    });
    gsap.to(landscapeMesh.material, {
      opacity: activeSpiritual ? 0.08 : 0.12,
      duration: duration
    });
  }
}
