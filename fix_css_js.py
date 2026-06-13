import re

css_additions = """
/* FIX 2 */
.hero-roles {
  font-size: 0.95rem;
  color: var(--color-muted, #888);
  letter-spacing: 0.04em;
  margin-top: 0.5rem;
}

/* FIX 4 */
.stat-context {
  display: block;
  font-size: 0.7rem;
  color: var(--color-muted, #888);
  margin-top: 3px;
  line-height: 1.4;
}

/* FIX 6 */
.avatar-wrapper {
  position: relative;
  display: inline-block;
  border-radius: 50%;
  overflow: visible;
}
.avatar-photo {
  display: block;
  border-radius: 50%;
  transition: transform 0.12s ease-out;
  will-change: transform;
}
.avatar-glow {
  position: absolute;
  inset: -6px;
  border-radius: 50%;
  background: radial-gradient(circle at 50% 50%, rgba(120,180,255,0.18), transparent 70%);
  pointer-events: none;
  transition: background 0.15s ease-out;
  z-index: -1;
}

/* FIX 9 */
.writing-tag {
  display: inline-block;
  font-size: 0.68rem;
  font-weight: 500;
  padding: 2px 8px;
  border-radius: 20px;
  background: rgba(120,120,180,0.12);
  color: #7070bb;
  margin-bottom: 6px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
.writing-bridge {
  font-size: 0.9rem;
  color: var(--color-muted, #888);
  max-width: 640px;
  line-height: 1.7;
  margin-bottom: 1.5rem;
}

/* FIX 10 */
.contact-note {
  font-size: 0.88rem;
  color: var(--color-muted, #888);
  margin-bottom: 1.2rem;
}

/* FIX 12 */
.paper-status {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: #888;
  font-weight: 500;
}
"""

with open('style.css', 'a') as f:
    f.write(css_additions)


# Now fix script.js
with open('script.js', 'r') as f:
    js = f.read()

# Remove the old eye-tracking block
js = re.sub(r'// 8\. Eye-Tracking Avatar \(Hero & Sticky Nav\).*?}\n  }\);\n', '', js, flags=re.DOTALL)

js_addition = """
(function() {
  const wrapper = document.getElementById('avatarWrapper');
  const photo   = document.getElementById('avatarPhoto');
  const glow    = document.getElementById('avatarGlow');
  if (!wrapper || !photo) return;

  const MAX_TILT = 8;   // degrees max tilt
  const MAX_SHIFT = 6;  // px max translate

  function applyTilt(cx, cy) {
    const rect = wrapper.getBoundingClientRect();
    const imgCX = rect.left + rect.width / 2;
    const imgCY = rect.top  + rect.height / 2;
    const dx = cx - imgCX;
    const dy = cy - imgCY;
    const dist = Math.sqrt(dx*dx + dy*dy) || 1;
    const maxDist = Math.max(window.innerWidth, window.innerHeight) / 2;
    const strength = Math.min(dist / maxDist, 1);

    const tiltX =  (dy / dist) * MAX_TILT * strength;
    const tiltY = -(dx / dist) * MAX_TILT * strength;
    const shiftX = (dx / dist) * MAX_SHIFT * strength;
    const shiftY = (dy / dist) * MAX_SHIFT * strength;

    photo.style.transform =
      `perspective(600px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translate(${shiftX}px,${shiftY}px)`;

    const glowX = 50 + (dx / maxDist) * 40;
    const glowY = 50 + (dy / maxDist) * 40;
    glow.style.background =
      `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(120,180,255,0.22), transparent 65%)`;
  }

  // Mouse tracking
  document.addEventListener('mousemove', function(e) {
    applyTilt(e.clientX, e.clientY);
  });

  // Mobile: gyroscope fallback
  if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', function(e) {
      if (e.gamma == null || e.beta == null) return;
      const cx = window.innerWidth  / 2 + (e.gamma / 45) * window.innerWidth  / 2;
      const cy = window.innerHeight / 2 + (e.beta  / 45) * window.innerHeight / 2;
      applyTilt(cx, cy);
    });
  }

  // Reset on mouse leave
  document.addEventListener('mouseleave', function() {
    photo.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) translate(0,0)';
    glow.style.background = 'radial-gradient(circle at 50% 50%, rgba(120,180,255,0.18), transparent 70%)';
  });
})();
"""

# Append JS at the end
js += js_addition

with open('script.js', 'w') as f:
    f.write(js)

print("CSS and JS updated")
