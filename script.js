/**
 * Pratap Jindal — Interactive Portfolio Logic
 * Feature: Visor-Style Character Eyes with Emotional Behaviors
 */

document.addEventListener('DOMContentLoaded', () => {
    const head = document.querySelector('.character-head');
    const eyes = document.querySelectorAll('.eye');
    const pupils = document.querySelectorAll('.pupil');
    const stateLabel = document.getElementById('eye-state-label');
    const passwordField = document.getElementById('passwordField');
    const closeTabBtn = document.getElementById('closeTabBtn');
    const tearStream = document.getElementById('tearStream');

    // --- 1. Eye Tracking ---
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
            const distance = Math.min(Math.sqrt(dx*dx + dy*dy) / 5, 12);

            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;

            pupil.style.transform = `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px))`;
        });

        // Slight head tilt
        const headRect = head.getBoundingClientRect();
        const headCenterX = headRect.left + headRect.width / 2;
        const headCenterY = headRect.top + headRect.height / 2;
        const headAngleX = (clientY - headCenterY) / 25;
        const headAngleY = (clientX - headCenterX) / 25;
        head.style.transform = `rotateX(${-headAngleX}deg) rotateY(${headAngleY}deg)`;
    });

    // --- 2. Automatic Blinking ---
    function blink() {
        if (!passwordField.matches(':focus')) {
            eyes.forEach(eye => eye.classList.add('blink'));
            setTimeout(() => {
                eyes.forEach(eye => eye.classList.remove('blink'));
            }, 150);
        }
        setTimeout(blink, 3000 + Math.random() * 2000);
    }
    blink();

    // --- 3. Password Squint ---
    passwordField.addEventListener('focus', () => {
        eyes.forEach(eye => eye.classList.add('squint'));
        stateLabel.textContent = "SECURE_SQUINT_MODE";
    });

    passwordField.addEventListener('blur', () => {
        eyes.forEach(eye => eye.classList.remove('squint'));
        stateLabel.textContent = "SYSTEM_ACTIVE";
    });

    // --- 4. Tearing near Close Button ---
    let tearInterval;
    closeTabBtn.addEventListener('mouseenter', () => {
        stateLabel.textContent = "EMOTIONAL_DISTRESS";
        stateLabel.style.color = "#ef4444";
        
        tearInterval = setInterval(() => {
            createTear();
        }, 300);
    });

    closeTabBtn.addEventListener('mouseleave', () => {
        stateLabel.textContent = "SYSTEM_ACTIVE";
        stateLabel.style.color = "var(--accent-blue)";
        clearInterval(tearInterval);
    });

    function createTear() {
        const tear = document.createElement('div');
        tear.className = 'tear-drop';
        // Randomly from left or right eye
        const side = Math.random() > 0.5 ? '25%' : '75%';
        tear.style.left = side;
        tear.style.top = '60px';
        tearStream.appendChild(tear);

        gsap.to(tear, {
            y: 100,
            opacity: 0,
            duration: 1,
            ease: "power1.in",
            onComplete: () => tear.remove()
        });
    }

    // --- 5. Project Injection ---
    const projectData = [
        { title: "AI Voice QA", desc: "Automated analysis of 1,200 recordings daily." },
        { title: "B2B Sales Portal", desc: "Zero-latency serverless order booking." },
        { title: "Inventory Optimizer", desc: "Predictive math reducing shortages by 88%." },
        { title: "Looker Refresher", desc: "Chrome extension for real-time telemetry." }
    ];

    const grid = document.getElementById('projectsGrid');
    projectData.forEach(p => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <h3>${p.title}</h3>
            <p>${p.desc}</p>
        `;
        grid.appendChild(card);
    });
});
