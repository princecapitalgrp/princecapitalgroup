# Prince Capital Group — Design Brainstorm

## Design Brief
Dark navy institutional editorial website for a proprietary G10 FX research-to-execution project.
Color palette: #1a2332 (deep navy), #FFFFFF (white), #3a3f47 (charcoal), #5b7c99 (steel blue), #f7f8fa (off-white).

---

<response>
<text>

## Idea A — Editorial Authority (Probability: 0.08)

**Design Movement:** Swiss International Typographic Style meets Bloomberg Terminal Aesthetic

**Core Principles:**
1. Typography-first hierarchy — headlines dominate, text is the primary visual element
2. Structural rigidity with purposeful asymmetry — left-anchored text blocks, right-side data panels
3. Monochromatic depth — navy/charcoal base with steel-blue accents only for interactive elements
4. Institutional restraint — no decorative flourishes, every element earns its place

**Color Philosophy:**
- Background: #1a2332 deep navy as the ground — communicates authority and depth
- Primary text: #FFFFFF pure white for maximum contrast
- Secondary text: #f7f8fa off-white for hierarchy
- Accent: #5b7c99 steel blue for CTAs, borders, highlights — signals precision not excitement
- Card surfaces: #3a3f47 charcoal — slightly elevated from background

**Layout Paradigm:**
- Asymmetric editorial grid: 60/40 splits, left-heavy content columns
- Full-bleed section headers with oversized typography
- Horizontal rule dividers as structural elements
- Numbered section labels (01. 02. 03.) in monospaced font

**Signature Elements:**
1. Oversized section numbers in steel blue, partially clipped at edges
2. Thin horizontal rules with label text on the left (like a financial terminal)
3. PCG monogram mark used as a watermark/texture element

**Interaction Philosophy:**
- Hover states: thin steel-blue underline slides in from left
- Buttons: outlined style, fill on hover with 200ms transition
- Scroll animations: content fades up with slight Y-offset

**Animation:**
- Entry: staggered fade-up (opacity 0→1, translateY 20px→0, 400ms ease-out)
- Hover: color transitions 150ms, no scale transforms
- Page transitions: fade only, no slides

**Typography System:**
- Display: "Playfair Display" — serif authority for headlines
- Body: "IBM Plex Sans" — technical precision for body text
- Mono: "IBM Plex Mono" — for numbers, labels, terminal-style data
- Scale: 72px hero → 48px section → 32px subsection → 18px body → 14px caption

</text>
<probability>0.08</probability>
</response>

<response>
<text>

## Idea B — Quantitative Minimalism (Probability: 0.07)

**Design Movement:** Brutalist Finance + Data Terminal

**Core Principles:**
1. Raw grid exposure — visible structural lines as design elements
2. Data-forward — charts, numbers, and metrics are the visual heroes
3. Monospaced typography throughout — everything feels like a trading terminal
4. High contrast, zero decoration

**Color Philosophy:**
- Pure black background #0a0e14 with white text
- Green terminal accent #00ff88 for active states
- Red for risk indicators
- No gradients, no shadows

**Layout Paradigm:**
- 12-column exposed grid with visible gutters
- Table-like section layouts
- Dense information density

**Signature Elements:**
1. Blinking cursor animations
2. ASCII-style dividers
3. Live-updating number counters

**Interaction Philosophy:**
- Terminal-style interactions
- Typewriter text effects
- Scan-line overlays

**Animation:**
- Typewriter effects on headlines
- Number counting animations
- Glitch effects on hover

**Typography System:**
- All monospaced: "Courier New" or "Space Mono"
- No serif, no humanist sans

</text>
<probability>0.07</probability>
</response>

<response>
<text>

## Idea C — Architectural Precision (Probability>0.06)

**Design Movement:** Bauhaus Institutional + Contemporary Finance

**Core Principles:**
1. Geometric structure — rectangles, lines, and grids as primary design language
2. Restrained color — navy/white/steel blue only, no gradients
3. Editorial whitespace — generous breathing room between sections
4. Precision typography — tight tracking on headlines, generous leading on body

**Color Philosophy:**
- Navy #1a2332 as primary surface
- White #FFFFFF as primary text and accent surface
- Steel blue #5b7c99 as structural accent
- Charcoal #3a3f47 for card backgrounds

**Layout Paradigm:**
- Strict vertical rhythm with 8px grid
- Full-width section breaks with contrasting backgrounds
- Side-by-side two-column layouts for content pairs

**Signature Elements:**
1. Thin border rectangles as card containers
2. Section number labels in small caps
3. Horizontal rule with centered text labels

**Interaction Philosophy:**
- Clean hover states with border color changes
- Smooth scroll with section snapping
- Minimal but purposeful micro-interactions

**Animation:**
- Fade-in on scroll with IntersectionObserver
- Border draw animations on cards
- Smooth color transitions

**Typography System:**
- Headlines: "Cormorant Garamond" — classical authority
- Body: "DM Sans" — modern readability
- Labels: "Space Mono" — precision data

</text>
<probability>0.06</probability>
</response>

---

## Selected Approach: **Idea A — Editorial Authority**

The Swiss/Bloomberg hybrid best serves PCG's brand: institutional authority, typographic dominance, and the editorial precision of a serious financial research operation. The Playfair Display + IBM Plex Sans pairing creates the right tension between classical authority and technical precision.
