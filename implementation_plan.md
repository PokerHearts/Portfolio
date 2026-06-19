# Implementation Plan — Premium Interactive Portfolio & Bug Fixes

Our goal is to elevate Pratap Jindal's portfolio website ([pokerhearts.in](https://pokerhearts.in)) to an Awwwards-level premium visual standard (inspired by `wibify.agency` and `yutaabe.com`), featuring a highly-interactive cartoon-style robot mascot, a custom magnetic cursor, and resolving active navigation scroll highlights.

---

## User Review Required

> [!IMPORTANT]
> - **Interactive Robot Mascot**: We will replace the static `profile.png` in the hero section and the static "two blue dots" in the sticky navigation bar with a matching SVG-based interactive robot avatar. The mascot will follow the cursor, blink, cover/squint its eyes when typing passwords, and cry tears when the mouse is about to close the page (exit the viewport) or hovers near the case study close button.
> - **Custom Cursor**: We will implement an elegant custom cursor (a glowing dot with a delayed trailing ring) that expands and morphs on interactive elements (links, cards, buttons) to create a premium, smooth interactive experience.
> - **Scroll Highlight Fix**: We will correct the scrolling listener to use bounding rect viewport intersections, fixing the active tab highlight mismatch (e.g. Projects tab highlighting Writing).

---

## Proposed Changes

### 1. Interactive Robot Mascot (SVG & JS)

#### [NEW] In [index.html](file:///Users/Poker/Downloads/Antigravity/Helix%20Portfolio/index.html) & [style.css](file:///Users/Poker/Downloads/Antigravity/Helix%20Portfolio/style.css)
- Define a beautiful vector SVG robot head for both:
  - The sticky navigation brand avatar (`#navAvatarFrame`): a mini 32px version.
  - The hero section portrait (`#heroRobotAvatar`): a large 240px version in the glass frame.
- The SVG will feature:
  - A clean white sphere head with soft lighting.
  - A glossy black visor (glass capsule).
  - Glowing circular eyes/pupils.
  - Secret tear ducts and tears that drop down on demand.
- Add transition states in CSS for blink and squint animations:
  - `.eye-squint` / `.eye-blink` will shrink vertically using `transform: scaleY(0.05)`.
  - `.tear-drop` will animate opacity and flow downwards.

#### [MODIFY] In [script.js](file:///Users/Poker/Downloads/Antigravity/Helix%20Portfolio/script.js)
- Implement a cursor tracking script using linear interpolation (lerp) for smooth eyeball movement.
- Add 3D parallax head rotation to the large hero robot face based on mouse position.
- Add an asynchronous random blinking loop (blinks for 150ms every 3–6 seconds).
- Add event listeners for `#passwordField` (`focus`, `blur`, `input`):
  - When active, the robot squints/shuts its eyes to avoid "seeing" the password.
- Add exit intent and close proximity tracking:
  - If Y coordinate `clientY <= 40` (mouse near tab bar/exit area), or `mouseleave` triggers on the document, or the cursor hovers close to `#closeDrawerBtn`:
    - Shift eyes downwards in distress.
    - Flow tears (`.robot-tear`) down using GSAP.
    - Set the nav state label to `"DONT_LEAVE_ME"` with red alert colors.
  - When the mouse returns or moves away, restore the normal state.

### 2. Awwwards-Style Custom Cursor

#### [NEW] In [index.html](file:///Users/Poker/Downloads/Antigravity/Helix%20Portfolio/index.html) & [style.css](file:///Users/Poker/Downloads/Antigravity/Helix%20Portfolio/style.css)
- Insert a custom cursor markup at the body level:
  - `.custom-cursor`: a small solid blue center dot.
  - `.custom-cursor-ring`: a larger, delayed ring outline.
- Style the custom cursor to be hidden on mobile/touch viewports, but active on desktop.
- Set pointer events to `none` and use `mix-blend-mode: difference` or fine borders for high elegance.

#### [NEW] In [script.js](file:///Users/Poker/Downloads/Antigravity/Helix%20Portfolio/script.js)
- Track cursor movements and update the position of the custom cursor ring with a smooth damping delay (`gsap.to` or manual requestAnimationFrame).
- Add hover listeners to links (`a`), buttons, filter pills, and project cards to scale up the cursor and add a magnetic pull.

### 3. Navigation Active Highlight Fix & Refinements

#### [MODIFY] In [script.js](file:///Users/Poker/Downloads/Antigravity/Helix%20Portfolio/script.js)
- Replace the current `window.scrollY >= section.offsetTop - 180` logic with a robust `getBoundingClientRect()` intersection check. A section will be considered active if its top is near or above the viewport midline and its bottom is below it. This will prevent short or hidden sections from misaligning the highlighting.
- Rename the ScrollTrigger trigger for the contact section to target `#connect` instead of the non-existent `#contact` selector to clean up console logs.

---

## Verification Plan

### Automated Tests
- Syntax verification: Run `node -c script.js` to ensure the Javascript edits contain no syntax errors.

### Manual Verification
1. Verify the navigation bar active highlighting updates accurately as sections scroll.
2. Focus the password field in the hero and observe the mascot's eyes squinting shut.
3. Move the mouse to the very top edge of the window or hover near the drawer close button to trigger tears and verify the `"DONT_LEAVE_ME"` state.
4. Verify the custom cursor tracks smoothly and scales up elegantly when hovering over project cards, pills, and links.
