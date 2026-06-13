/**
 * Pratap Jindal — Interactive Portfolio Logic
 * Feature: 3D Visor-Style Character Eyes with Emotional Behaviors
 * Content: Complete 22-module System Registry & Creative Archive
 */

document.addEventListener('DOMContentLoaded', () => {
    const head = document.querySelector('.character-head');
    const eyes = document.querySelectorAll('.eye');
    const pupils = document.querySelectorAll('.pupil');
    const stateLabel = document.getElementById('eye-state-label');
    const passwordField = document.getElementById('passwordField');
    const tearStream = document.getElementById('tearStream');

    // --- 1. Eye Tracking & 3D Head Tilt ---
    document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        
        // Track pupils inside eyes
        pupils.forEach(pupil => {
            const eyeRect = pupil.parentElement.getBoundingClientRect();
            const eyeCenterX = eyeRect.left + eyeRect.width / 2;
            const eyeCenterY = eyeRect.top + eyeRect.height / 2;

            const dx = clientX - eyeCenterX;
            const dy = clientY - eyeCenterY;
            const angle = Math.atan2(dy, dx);
            const distance = Math.min(Math.sqrt(dx*dx + dy*dy) / 8, 10);

            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;

            pupil.style.transform = `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px))`;
        });

        // 3D head tilt
        if (head) {
            const headRect = head.getBoundingClientRect();
            const headCenterX = headRect.left + headRect.width / 2;
            const headCenterY = headRect.top + headRect.height / 2;
            const headAngleX = (clientY - headCenterY) / 30;
            const headAngleY = (clientX - headCenterX) / 30;
            head.style.transform = `rotateX(${-headAngleX}deg) rotateY(${headAngleY}deg)`;
        }
    });

    // --- 2. Automatic Blinking ---
    function blink() {
        if (!passwordField.matches(':focus')) {
            eyes.forEach(eye => eye.classList.add('blink'));
            setTimeout(() => {
                eyes.forEach(eye => eye.classList.remove('blink'));
            }, 150);
        }
        setTimeout(blink, 3000 + Math.random() * 3000);
    }
    blink();

    // --- 3. Password Squint ---
    if (passwordField) {
        passwordField.addEventListener('focus', () => {
            eyes.forEach(eye => eye.classList.add('squint'));
            stateLabel.textContent = "SECURE_SQUINT_MODE";
        });

        passwordField.addEventListener('blur', () => {
            eyes.forEach(eye => eye.classList.remove('squint'));
            stateLabel.textContent = "SYSTEM_ACTIVE";
        });
    }

    // --- 4. Tearing when heading for Browser Close ---
    let tearInterval;
    let isDistressed = false;

    document.addEventListener('mousemove', (e) => {
        // Danger zone: top 60px of the viewport
        if (e.clientY < 60) {
            if (!isDistressed) {
                isDistressed = true;
                stateLabel.textContent = "EMOTIONAL_DISTRESS";
                stateLabel.style.color = "#ef4444";
                tearInterval = setInterval(createTear, 400);
            }
        } else if (!passwordField.matches(':focus')) {
            if (isDistressed) {
                isDistressed = false;
                stateLabel.textContent = "SYSTEM_ACTIVE";
                stateLabel.style.color = "var(--accent-blue)";
                clearInterval(tearInterval);
            }
        }
    });

    document.addEventListener('mouseleave', () => {
        if (!isDistressed) {
            isDistressed = true;
            stateLabel.textContent = "DONT_LEAVE_ME";
            stateLabel.style.color = "#ef4444";
            for(let i=0; i<5; i++) setTimeout(createTear, i * 150);
        }
    });

    document.addEventListener('mouseenter', () => {
        isDistressed = false;
        stateLabel.textContent = "SYSTEM_ACTIVE";
        stateLabel.style.color = "var(--accent-blue)";
        clearInterval(tearInterval);
    });

    function createTear() {
        if (!tearStream) return;
        const tear = document.createElement('div');
        tear.className = 'tear-drop';
        const side = Math.random() > 0.5 ? '28%' : '72%';
        tear.style.left = side;
        tear.style.top = '55px';
        tearStream.appendChild(tear);

        gsap.to(tear, {
            y: 120,
            opacity: 0,
            duration: 1.2,
            ease: "power1.in",
            onComplete: () => tear.remove()
        });
    }

    // --- 5. Project Database ---
    const projectData = [
        { id: "MOD_01", category: "ai-systems", title: "AI Voice Mock Interview Simulator", desc: "Interactive, voice-first mock interview training portal using Web Audio and generative AI." },
        { id: "MOD_02", category: "ai-systems", title: "AI Call QA Analyst", desc: "Automated evaluation engine processing 1,200 recordings daily for agent compliance." },
        { id: "MOD_03", category: "fullstack", title: "B2B Sales Portal", desc: "Serverless web workspace with Edge caching, reducing booking from 8 mins to 45 secs." },
        { id: "MOD_04", category: "supply-ops", title: "Inventory & PO Optimizer", desc: "Predictive math reducing shortages from 17 to 2 and driving 20% sales expansion." },
        { id: "MOD_05", category: "extensions", title: "Looker Real-Time Refresher", desc: "Chrome extension bypassing 15-min cache limits for live telemetry monitoring." },
        { id: "MOD_06", category: "fullstack", title: "OmniReader Document Workspace", desc: "Zero-load client-side reader for EPUB, PDF, and DOCX with semantic indexing." },
        { id: "MOD_07", category: "supply-ops", title: "Sales Dispatch & Control Hub", desc: "Transit tracking workspace decreasing dispatch lag by 30% via automated logs." },
        { id: "MOD_08", category: "supply-ops", title: "Staff Performance Matrix", desc: "Task accountability matrix lifting SLA compliance by 40% across departments." },
        { id: "MOD_09", category: "supply-ops", title: "Territory Governance System", desc: "Dealer mapping database monitoring monopoly boundaries and performance triggers." },
        { id: "MOD_10", category: "supply-ops", title: "Restock Notification Engine", desc: "Demand capture database linking unfilled orders to inventory arrival hooks." },
        { id: "MOD_11", category: "supply-ops", title: "Lead Cleaning Engine", desc: "Regex pipeline removing 25% database clutter and duplicate lead allocations." },
        { id: "MOD_12", category: "supply-ops", title: "Vendor Payables Hub", desc: "Cash outflow dashboard tracking credit timelines for 40+ corporate vendors." },
        { id: "MOD_13", category: "supply-ops", title: "Complaint Escalation Hub", desc: "Ticketing dashboard slashing resolution cycle times by 48 hours via alerts." },
        { id: "MOD_14", category: "supply-ops", title: "Unified Operations Ledger", desc: "Consolidated source of truth blending stock, batches, and cash streams." },
        { id: "MOD_15", category: "supply-ops", title: "SCOT Purchase Predictor", desc: "Behavior-driven dashboard anticipating client restocking cycles for 500+ SKUs." },
        { id: "MOD_16", category: "extensions", title: "Android Call Sync Agent", desc: "Mobile script syncing agent recordings to Drive for the AI QA pipeline." },
        { id: "MOD_17", category: "supply-ops", title: "Control Sample Tracker", desc: "Quality audit logging traced to regulatory pharma batch audit requirements." },
        { id: "MOD_18", category: "extensions", title: "Dynamic Form Prefill Engine", desc: "Automated URL parameter builder injecting metadata into mobile status sheets." },
        { id: "MOD_19", category: "supply-ops", title: "Sales Incentive Calculator", desc: "Automated commission engine replacing fragile Excel-based payroll sheets." },
        { id: "MOD_20", category: "supply-ops", title: "Freight Cost Estimator", desc: "Volumetric shipping calculator evaluation transit zones and fuel surcharges." },
        { id: "MOD_21", category: "supply-ops", title: "Promo Input Allocator", desc: "Marketing budget dashboard enforcing limits on regional sample distributions." },
        { id: "MOD_22", category: "supply-ops", title: "Client Health Analytics", desc: "B2B client tracking monitoring purchase frequencies and credit risk factors." }
    ];

    const grid = document.getElementById('projectsGrid');
    if (grid) {
        renderProjects('all');
        const filterPills = document.querySelectorAll('.filter-pill');
        filterPills.forEach(pill => {
            pill.addEventListener('click', () => {
                filterPills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                renderProjects(pill.getAttribute('data-filter'));
            });
        });
    }

    function renderProjects(category) {
        grid.innerHTML = '';
        projectData.filter(p => category === 'all' || p.category === category).forEach(p => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.innerHTML = `
                <div class="card-meta">
                    <span class="card-id">${p.id}</span>
                    <span class="card-cat">${p.category}</span>
                </div>
                <h3>${p.title}</h3>
                <p>${p.desc}</p>
            `;
            grid.appendChild(card);
        });
    }

    // --- 6. Writing Archive ---
    const creativeData = [
        { title: "Light Enough", type: "Book", desc: "Literary fiction exploring quiet emotional landscapes and memory retrieval." },
        { title: "Sessions", type: "Fiction", desc: "Psychological suspense novel mapping therapeutic deconstruction cycles." },
        { title: "Life of Poker Hearts", type: "Blog", desc: "Active digital workspace generating introspective data points since 2019." },
        { title: "The Kintsugi Principle", type: "Essay", desc: "Applying Japanese philosophy to organizational architecture." }
    ];

    const cGrid = document.getElementById('creativeGrid');
    if (cGrid) {
        creativeData.forEach(c => {
            const card = document.createElement('div');
            card.className = 'writing-card';
            card.innerHTML = `
                <div class="card-type">${c.type}</div>
                <h3>${c.title}</h3>
                <p>${c.desc}</p>
            `;
            cGrid.appendChild(card);
        });
    }
});
