import re

with open('index.html', 'r') as f:
    html = f.read()

# FIX 1
html = html.replace('<a href="#about" class="active">About</a>', '<a href="#hero" class="active">About</a>')
html = html.replace('<li class="nav-link-item"><a href="#projects">Projects</a></li>\n        <li class="nav-link-item"><a href="#skills">Skills</a></li>\n        <li class="nav-link-item"><a href="#experience">Experience</a></li>',
                    '<li class="nav-link-item"><a href="#projects">Projects</a></li>\n        <li class="nav-link-item"><a href="#experience">Experience</a></li>\n        <li class="nav-link-item"><a href="#skills">Skills</a></li>')
html = html.replace('<a href="#contact">Contact</a>', '<a href="#connect">Contact</a>')
html = html.replace('<section class="hero-section" id="about">', '<section class="hero-section" id="hero">')
html = html.replace('<section class="contact-section" id="contact"', '<section class="contact-section" id="connect"')

# FIX 2 & 5
html = html.replace('<span class="pulse-indicator"></span><span id="heroBadgeText">Systems Intelligence Matrix v2.8</span>', '<span class="pulse-indicator"></span><span id="heroBadgeText" style="display:none;"></span>')
html = html.replace('<h2 class="hero-role">Management Analyst &middot; Chief of Staff &middot; Operations &amp; Systems</h2>', '<p class="hero-roles">Management Analyst &nbsp;&middot;&nbsp; Chief of Staff &nbsp;&middot;&nbsp; Operations & Systems</p>')

# FIX 4
html = re.sub(r'<div class="counter-context"[^>]*>2020–2026</div>', '<span class="stat-context">across 3 years · Group Biopolis</span>', html)
html = re.sub(r'<div class="counter-context"[^>]*>Annual Turnover</div>', '<span class="stat-context">FY2024–25 sales ops</span>', html)
html = re.sub(r'<div class="counter-context"[^>]*>FY 2024–25</div>', '<span class="stat-context">per month · automated vs manual</span>', html)
html = re.sub(r'<div class="counter-context"[^>]*>In 6 Months</div>', '<span class="stat-context">stock shortages · 2023 → 2024</span>', html)

# FIX 5 & 6
avatar_target = '''          <div class="photo-glass-frame" id="avatarFrame" style="position: relative;">
            <span class="photo-diag-label label-top-left">SYS_REF_01</span>
            <span class="photo-diag-label label-bottom-right">ACTIVE_EXEC</span>
            <div class="avatar-container" style="position: relative; width: 100%; height: 100%; overflow: hidden; border-radius: inherit;">
              <img src="profile.png" alt="Pratap Jindal Profile" style="width: 100%; height: 100%; object-fit: cover; display: block;">
              <!-- Eye tracking SVG overlay -->
              <div class="eye-tracker-overlay" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 5;">
                <svg viewBox="0 0 400 400" style="width: 100%; height: 100%; display: block; position: absolute; top: 0; left: 0;">
                  <!-- Left Eye Pupil Reticle (Coordinates mapped to eyes) -->
                  <circle id="pupil-left" cx="160" cy="155" r="4.5" fill="#6366f1" style="filter: drop-shadow(0 0 3px #6366f1); transform-box: fill-box; transform-origin: center;" />
                  <circle cx="160" cy="155" r="9" stroke="rgba(99, 102, 241, 0.25)" stroke-width="1" fill="none" />
                  
                  <!-- Right Eye Pupil Reticle (Coordinates mapped to eyes) -->
                  <circle id="pupil-right" cx="218" cy="155" r="4.5" fill="#6366f1" style="filter: drop-shadow(0 0 3px #6366f1); transform-box: fill-box; transform-origin: center;" />
                  <circle cx="218" cy="155" r="9" stroke="rgba(99, 102, 241, 0.25)" stroke-width="1" fill="none" />
                </svg>
              </div>
            </div>
          </div>'''
avatar_replacement = '''          <div class="photo-glass-frame" style="position: relative; padding: 2rem; background: transparent; border: none; box-shadow: none;">
            <div class="avatar-wrapper" id="avatarWrapper" style="width: 100%; height: 100%; max-width: 300px; margin: 0 auto;">
              <img src="profile.png" alt="Pratap Jindal Profile" class="avatar-photo" id="avatarPhoto" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">
              <div class="avatar-glow" id="avatarGlow"></div>
            </div>
          </div>'''
html = html.replace(avatar_target, avatar_replacement)

# Nav Avatar (Wait, the nav avatar has eyes too, let's remove them to avoid breaking script later if needed, but the user didn't mention it. Let's keep it but remove the svg to prevent errors)
html = re.sub(r'<div class="nav-eye-tracker".*?</svg>\s*</div>', '', html, flags=re.DOTALL)

# FIX 9
bridge_target = '''      <div class="dual-identity-callout glass-card spatial-reveal" style="margin-bottom: 2.5rem; padding: 1.5rem 2rem; border-left: 4px solid var(--accent-purple); background: rgba(255, 255, 255, 0.45);">
        <p style="font-size: 0.95rem; line-height: 1.6; color: var(--color-primary); margin: 0; font-family: var(--font-body);">
          I write psychological fiction under the pen name <strong>Poker Hearts</strong> — a separate creative identity that runs alongside the professional work. The blog (<a href="https://pokerdeeds.blogspot.com" target="_blank" style="color: var(--accent-purple); font-weight: 600; text-decoration: underline;">pokerdeeds.blogspot.com</a>) has been active since 2019 with <strong>197+ published stories</strong> and <strong>~3,000 monthly readers</strong>.
        </p>
      </div>'''
bridge_replacement = '''      <p class="writing-bridge">
        I write psychological fiction under the pen name <strong>Poker Hearts</strong> — a separate creative identity running alongside the professional work. Active since 2019, with 197+ published stories and ~3,000 monthly readers on the blog.
      </p>'''
html = html.replace(bridge_target, bridge_replacement)

html = html.replace('<span class="archive-badge">Book</span>', '<span class="writing-tag">Book</span>')
html = html.replace('<span class="archive-badge">Fiction</span>\n            <span class="mono-tag">Psych Thriller</span>', '<span class="writing-tag">Novel — WIP</span>')
html = html.replace('<span class="archive-badge">Blog</span>\n            <span class="mono-tag">197+ Published Stories</span>', '<span class="writing-tag">Blog</span>')
html = html.replace('<span class="archive-badge">Essay</span>', '<span class="writing-tag">Essay</span>')
html = html.replace('<span class="archive-badge">Blog</span>\n            <span class="mono-tag">Completed</span>', '<span class="writing-tag">Collection</span>')
html = html.replace('<span class="archive-badge">Fiction</span>\n            <span class="mono-tag">Alternate History</span>', '<span class="writing-tag">Fiction — WIP</span>')

# FIX 10
contact_target = '''        <div style="font-size: 1.15rem; font-weight: 700; color: var(--accent-blue); margin-bottom: 2rem; font-family: var(--font-display);">
          Prefer direct contact — reach out via any channel below.
        </div>'''
contact_replacement = '''        <p class="contact-note">Prefer direct conversations over forms — reach out on any channel below.</p>'''
html = html.replace(contact_target, contact_replacement)

# FIX 11 (Insert MBA in Experience, remove the floating card which doesn't exist anymore anyway)
mba_entry = '''        <!-- MBA Gap Entry from User Prompt -->
        <div class="timeline-entry">
          <span class="timeline-date">Jul 2021 — Jun 2023</span>
          <h3>MBA — Financial Markets (Full-Time)</h3>
          <p>Mittal School of Business (LPU) · AACSB Accredited · CGPA 8.83</p>
          <p>Concurrent: 9+ NCFM/NISM certifications, NSE Academy coursework, research methodology, financial modelling.</p>
        </div>'''

# The previous MBA entries: Let's remove them or replace them
html = re.sub(r'<!-- MBA Gap Entry -->.*?<!-- Summer Gap Entry -->', '<!-- Summer Gap Entry -->', html, flags=re.DOTALL)
html = html.replace('<!-- Summer Gap Entry -->', mba_entry + '\n\n        <!-- Summer Gap Entry -->')

# FIX 12
html = html.replace('<span class="mono-tag-draft">Working Paper — Under Development</span>', '<span class="paper-status">Working Paper — Under Development</span>')
html = html.replace('<span class="mono-tag-draft">Concept Note — Literature Synthesis</span>', '<span class="paper-status">Concept Note — Literature Synthesis</span>')

# Write back
with open('index.html', 'w') as f:
    f.write(html)

print("HTML replaced")
