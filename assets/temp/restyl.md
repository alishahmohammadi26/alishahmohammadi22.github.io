# Site Standardization & Restyle Spec — alishahmohammadi.com

**Purpose:** a precise, executable brief for an AI agent to (1) fix cross-site
inconsistencies, (2) standardize header/head/footer, and (3) apply a grounded
visual restyle. Written to be applied file-by-file across the blog posts and the
homepage.

**Author of site:** Ali Shahmohammadi, Ph.D.
**Canonical domain:** `https://alishahmohammadi.com`

---

## 0. Instructions for the applying agent (read first)

1. **Work on a branch / backup first.** These edits touch every HTML file.
2. **Apply sections in order:** §1 (domain) → §2 (content fixes) → §3–§5
   (templates) → §6 (styles) → §7 (per-file checklist).
3. **Never touch these strings** (they are correct as-is and would break if changed):
   - `github.com/alishahmohammadi22` and any `github.com/alishahmohammadi22/<repo>` URL — these are code repos, not the site host.
   - `https://alishahmohammadi22.github.io/onto-curator-agent` — separate GitHub Pages *project* site.
   - `https://alishahmohammadi22.github.io/fair-data-toolkit` — separate GitHub Pages *project* site.
4. **String-level replacements in §1 are byte-exact.** Structural replacements in
   §3–§6 are described by intent + anchors, because class names in the live HTML
   are not known here; map them to the existing markup, or replace the chrome
   wholesale (recommended, since the goal is one template).
5. After each file, verify: nav links resolve, no `github.io` host remains except
   the two protected project sites, and the page renders in light + dark.

---

## 1. CRITICAL — Domain canonicalization (exact find & replace)

**Problem:** the PINN posts link internally to `alishahmohammadi.com`; the
agentic-AI, data-governance, and FAIR posts link to the old
`alishahmohammadi22.github.io` (nav, bylines, related links, `og:url`, `og:image`,
and an "All Articles" link). This splits SEO signal, breaks social-share previews,
and bounces readers off-domain.

Apply these rules **in this order**. Rule A must run before Rule E.

| # | Find (exact) | Replace with | Notes |
|---|---|---|---|
| A | `https://alishahmohammadi22.github.io/#blog` | `https://alishahmohammadi.com/#writing` | Fixes domain **and** wrong anchor (`#blog` → `#writing`). |
| B | `alishahmohammadi.com/#blog` | `alishahmohammadi.com/#writing` | Safety net for any residual wrong anchors already on `.com`. |
| C | `https://alishahmohammadi22.github.io/blog/` | `https://alishahmohammadi.com/blog/` | All post links + each page's own `og:url`. |
| D | `https://alishahmohammadi22.github.io/assets/` | `https://alishahmohammadi.com/assets/` | `og:image` and any image src. |
| E | `https://alishahmohammadi22.github.io/resume.html` | `https://alishahmohammadi.com/resume.html` | Resume link. |
| F | `https://alishahmohammadi22.github.io"` | `https://alishahmohammadi.com/"` | Bare root link used as brand/home href (note trailing quote — match the attribute boundary so `/onto-curator-agent` etc. are **not** hit). |
| G | `https://alishahmohammadi22.github.io )` and `https://alishahmohammadi22.github.io.` etc. | `https://alishahmohammadi.com` | Any remaining bare-root occurrences **not** followed by `/onto-curator-agent` or `/fair-data-toolkit`. Review each match. |

**Protected — skip (do not replace):**
```
https://alishahmohammadi22.github.io/onto-curator-agent
https://alishahmohammadi22.github.io/fair-data-toolkit
github.com/alishahmohammadi22
```

**After running A–G, grep to confirm only protected hosts remain:**
```
grep -rn "alishahmohammadi22.github.io" .
# every remaining hit MUST be /onto-curator-agent or /fair-data-toolkit
```

**Open question for Ali (human decision, not automatable):** do you want the two
project sites (`onto-curator-agent`, `fair-data-toolkit`) also served under
`alishahmohammadi.com/...`? GitHub Pages *project* sites don't automatically ride
a user custom domain, so leaving them on `github.io` is correct unless you
reconfigure them. If you migrate them later, revisit rules F/G.

### 1.1 Add a canonical tag to every page (SEO — closes the duplicate-domain gap)

In `<head>` of each file, add (see full head template in §3):
```html
<link rel="canonical" href="https://alishahmohammadi.com/blog/THIS-FILE.html">
```
For the homepage: `href="https://alishahmohammadi.com/"`.

### 1.2 301 redirect (host-level, do once)

Point the old GitHub Pages **user** host at the custom domain so old inbound links
and search-index entries consolidate. If DNS/CNAME already maps
`alishahmohammadi.com` → the user Pages repo, ensure `CNAME` file contains exactly:
```
alishahmohammadi.com
```
and that "Enforce HTTPS" is on. No per-file change needed for this step.

---

## 2. Other exact content fixes

### 2.1 Job title — pick one, use everywhere
Two titles are live: homepage career section says **"Associate Director, Applied
AI Engineering & Scientific Data"**; the data-governance post footer says
**"Director, Data Governance & AI Strategy."** In the footer template (§5) this is
a single variable `{{ROLE_TITLE}}` — set it once to match the résumé and apply to
all files. Recommendation: use the homepage/résumé title verbatim.

### 2.2 Stale roadmap table in `pinn-introduction.html` (section 07)
The "Eight Articles on PINNs" table lists articles that were never shipped
(notably a phantom **"Wave Equation"** as #6) and titles that don't match the
actual series. Replace the table body with the **shipped** lineup below, or delete
the table and link to the homepage `#writing` index.

Corrected foundations lineup (matches the live sidebar):

| # | Title | Key concepts |
|---|---|---|
| 1 | Introduction to PINNs | First-order ODE, autograd, collocation, zero labeled data |
| 2 | Second-Order ODEs: Damped Oscillator | Nested autograd, two ICs, hard-constraint ansatz, spectral bias |
| 3 | 1D Heat Equation | Parabolic PDE, space-time domain, 2D collocation grid |
| 4 | Burgers & Reaction PDEs | Shock formation, viscous regularization, coupled A→B→C |
| 5 | Inverse Problems | Unknown parameters as trainable variables |
| 6 | Adaptive Sampling & Training Strategies | RAR, loss weighting, causal training, Fourier features |
| 7 | DeepONet: Learning Operators | Branch/trunk architecture, operator learning |
| 8 | Physics-Informed DeepONet | Operator learning without solution data, inverse at scale |

Also update the header eyebrow if it hard-codes counts. The clean framing is **two
series** ("PINN Foundations — 8" and "ODE Problems — 7") plus **2 capstones**; the
badge system in §6.9 encodes this visually so prose counts don't drift again.

### 2.3 Add the capstone to the homepage index
`unified-pinn-ode-benchmark.html` is linked from every article sidebar but is
**absent from the homepage `#writing` list**. Add a card for it in the Scientific
ML group (see order in §2.5), or remove the sidebar link. Prefer adding it.

### 2.4 Verify math rendering in `pinn-introduction.html`
Several subtraction expressions appear to render a minus sign as a comma. Check
these in a browser; if they show commas, fix the source LaTeX:

| Location | Should read |
|---|---|
| Data-loss sum | `L_data = (1/N) Σ (ŷᵢ − yᵢ)²` |
| CSTR energy balance last term | `− (UA/V)(T − T_c)` |
| Diffusion–reaction in pellet | `Dₑ ∇²C + r(C,T) = 0` |
| Finite-difference row | `f(x+h) − f(x)` over `h` |
| BC loss | `L_BC = (ŷ(0) − 1)²` |

If the site uses KaTeX/MathJax, confirm the delimiters are consistent (`$…$` /
`$$…$$`) and that a stray `,` isn't literally in the source.

### 2.5 Homepage "All" ordering + series badges
Reorder the default "All" list into reading-path order and add a series/number
badge to each card (badge styles in §6.9):

```
FOUNDATIONS 01–08  → Intro, Second-Order, Heat, Burgers, Inverse,
                     Adaptive Sampling, DeepONet, PI-DeepONet
ODE PROBLEMS 01–07 → Logistic, Consecutive, Lotka–Volterra, SIR,
                     Van der Pol, Enzyme QSSA, Bioprocess
CAPSTONES          → Unified Benchmark, DeepONet-vs-PINN Analysis
AGENTIC AI         → Ontology Curation, Data Governance,
                     (Trustworthy Data — Coming Soon)
GOVERNANCE / FAIR  → Harmonization, Product Mastering, Ontology→MDM,
                     ISO 23894, 90-Day Maturity, FAIR series, FAIR Principles
```

---

## 3. Canonical `<head>` template

Replace each page's head with this, filling the `{{…}}` placeholders. `{{OG_TYPE}}`
is `website` for the homepage and `article` for posts. `{{OG_IMAGE}}` defaults to
`https://alishahmohammadi.com/assets/images/og-preview.png`.

```html
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{{PAGE_TITLE}} | Ali Shahmohammadi</title>
<meta name="description" content="{{META_DESC}}">
<link rel="canonical" href="{{CANONICAL_URL}}">

<!-- Open Graph -->
<meta property="og:type" content="{{OG_TYPE}}">
<meta property="og:title" content="{{PAGE_TITLE}}">
<meta property="og:description" content="{{META_DESC}}">
<meta property="og:url" content="{{CANONICAL_URL}}">
<meta property="og:image" content="{{OG_IMAGE}}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{{PAGE_TITLE}}">
<meta name="twitter:description" content="{{META_DESC}}">
<meta name="twitter:image" content="{{OG_IMAGE}}">

<!-- Fonts: preconnect + one stylesheet -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=STIX+Two+Text:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">

<!-- Site theme (see §6) -->
<link rel="stylesheet" href="/assets/css/theme.css">

<!-- If posts use math, keep the existing KaTeX/MathJax include here -->

<!-- Set theme before paint to avoid flash -->
<script>
  (function () {
    var t = localStorage.getItem('theme');
    if (!t) t = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    document.documentElement.dataset.theme = t;
  })();
</script>
```

> Self-host the three fonts later for performance; the Google Fonts link above is
> the drop-in version.

---

## 4. Canonical header / nav template

One header for every page. Home links use `#writing` / `#career` / `#contact`
(the real section IDs). Set `aria-current="page"` on the active link. On posts,
the brand and links are absolute (`https://alishahmohammadi.com/…`); on the
homepage they can be relative.

```html
<header class="site-header" data-elevate="false">
  <a class="brand" href="/">Ali Shahmohammadi <span class="brand-deg">Ph.D.</span></a>

  <nav class="site-nav" aria-label="Primary">
    <a href="/#writing">Writing</a>
    <a href="/#career">Career</a>
    <a href="/resume.html">Resume</a>
    <a class="nav-ext" href="https://github.com/alishahmohammadi22" rel="me">GitHub</a>
  </nav>

  <button class="theme-toggle" type="button" aria-label="Toggle dark mode"
          data-theme-toggle>
    <span class="theme-toggle-dot"></span>
  </button>

  <!-- Signature: reading-progress "convergence" bar (articles only) -->
  <div class="read-progress" role="presentation"><span></span></div>
</header>
```

Minimal JS (bundle in `theme.css`'s companion `site.js`):

```js
// Elevate header + advance reading progress on scroll
(function () {
  var header = document.querySelector('.site-header');
  var bar = document.querySelector('.read-progress span');
  function onScroll() {
    var y = window.scrollY || 0;
    if (header) header.dataset.elevate = y > 8 ? 'true' : 'false';
    if (bar) {
      var h = document.documentElement.scrollHeight - innerHeight;
      bar.style.transform = 'scaleX(' + (h > 0 ? Math.min(y / h, 1) : 0) + ')';
    }
  }
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Theme toggle
  var btn = document.querySelector('[data-theme-toggle]');
  if (btn) btn.addEventListener('click', function () {
    var next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    localStorage.setItem('theme', next);
  });
})();
```

---

## 5. Canonical footer template

One footer everywhere. `{{ROLE_TITLE}}` is set once (see §2.1). Social links point
to `github.com` (correct) — never `github.io`.

```html
<footer class="site-footer">
  <div class="foot-lead">
    <p class="foot-name">Ali Shahmohammadi, Ph.D.</p>
    <p class="foot-role">{{ROLE_TITLE}}</p>
  </div>

  <nav class="foot-nav" aria-label="Footer">
    <a href="/#writing">Writing</a>
    <a href="/#career">Career</a>
    <a href="/resume.html">Resume</a>
    <a href="https://github.com/alishahmohammadi22" rel="me">GitHub</a>
    <a href="https://linkedin.com/in/alishahmohammadi" rel="me">LinkedIn</a>
  </nav>

  <div class="foot-base">
    <span>© 2026 Ali Shahmohammadi, Ph.D.</span>
    <a class="to-top" href="#top">Back to top ↑</a>
  </div>
</footer>
```

For **article** pages, place a series prev/next block *above* the footer (see §6.9).

---

## 6. Design system — `theme.css`

Grounded in Ali's own convergence plots (navy / physics-green / BC-red on a light
gridded canvas) and computational-notebook vernacular. Deliberately avoids the
cream+terracotta and black+acid-green AI defaults.

### 6.1 Design rationale (keep in file as a comment)
- **Primary ink = plot-navy.** The color of the "total loss" curve.
- **Single accent = physics-loss green**, muted and scientific — links, active
  states, the progress bar, series ticks.
- **Red = BC-loss red**, emphasis/errors only, never decorative.
- **Signature 1:** top reading-progress bar as a "convergence" indicator.
- **Signature 2:** section dividers rendered as a row of dots — the collocation
  points from the figures.
- **Type:** STIX Two Text (journal serif, pairs with KaTeX) for headings; Inter
  for body; JetBrains Mono for code and structural labels (notebook feel).
- **Numbered section markers stay** — the content genuinely is sequential, so the
  numbers encode real order rather than decoration.

### 6.2 Tokens

```css
:root {
  /* Type */
  --font-display: "STIX Two Text", Georgia, "Times New Roman", serif;
  --font-body:    "Inter", system-ui, -apple-system, "Segoe UI", sans-serif;
  --font-mono:    "JetBrains Mono", ui-monospace, "SFMono-Regular", Menlo, monospace;

  --text-xs:   .78rem;
  --text-sm:   .875rem;
  --text-base: 1.0625rem;                             /* 17px body */
  --text-lg:   1.1875rem;
  --text-xl:   clamp(1.35rem, 1.15rem + .9vw, 1.6rem);
  --text-2xl:  clamp(1.7rem, 1.3rem + 1.7vw, 2.25rem);
  --text-3xl:  clamp(2.2rem, 1.55rem + 2.9vw, 3.4rem);/* hero */

  --lh-tight: 1.14;
  --lh-snug:  1.3;
  --lh-body:  1.72;

  /* Space */
  --sp-1: .25rem;  --sp-2: .5rem;  --sp-3: .75rem;  --sp-4: 1rem;
  --sp-5: 1.5rem;  --sp-6: 2rem;   --sp-8: 3rem;    --sp-10: 4.5rem;

  --measure: 70ch;         /* prose line length */
  --wrap: 76rem;           /* max page width */

  --r-sm: 6px; --r: 10px; --r-lg: 16px;
  --shadow-1: 0 1px 2px rgba(16,24,40,.06), 0 1px 3px rgba(16,24,40,.05);
  --shadow-2: 0 4px 14px rgba(16,24,40,.10);

  /* Color — light (plot-canvas) */
  --paper:       #f8fafb;
  --surface:     #ffffff;
  --surface-2:   #eef2f4;
  --line:        #e2e7ea;
  --line-strong: #cfd6da;

  --navy:  #1c2c4c;        /* headings / primary ink accent */
  --ink:   #141821;        /* body */
  --ink-2: #3f4753;        /* secondary text */
  --muted: #69727d;        /* captions, meta */

  --accent:      #1f7a5c;  /* physics-green */
  --accent-2:    #26986f;
  --accent-wash: #e6f3ed;
  --danger:      #b23a3a;  /* BC-red, emphasis only */

  --code-bg:   #0f1620;    /* dark code block even in light mode */
  --code-fg:   #dbe4ee;
  --code-line: #1e2a38;
  --code-tag:  #7fd6ae;

  --grid: #e7ecef;         /* collocation-dot / gridline color */
}

:root[data-theme="dark"] {
  --paper:       #0d1117;  /* notebook/terminal ground */
  --surface:     #141a22;
  --surface-2:   #1b232d;
  --line:        #232c37;
  --line-strong: #313d4a;

  --navy:  #9db4de;
  --ink:   #e6ebf0;
  --ink-2: #aeb8c4;
  --muted: #7c8794;

  --accent:      #3fb98d;
  --accent-2:    #5fd0a6;
  --accent-wash: #0f2b22;
  --danger:      #e06a6a;

  --code-bg:   #0a0e14;
  --code-fg:   #d5dee8;
  --code-line: #1b2733;
  --code-tag:  #7fd6ae;

  --grid: #212a34;
}
```

### 6.3 Base / reset

```css
*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: smooth; }
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  * { animation: none !important; transition: none !important; }
}
body {
  margin: 0;
  background: var(--paper);
  color: var(--ink);
  font-family: var(--font-body);
  font-size: var(--text-base);
  line-height: var(--lh-body);
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}
a { color: var(--accent); text-decoration: none; }
a:hover { text-decoration: underline; text-underline-offset: 3px; }
:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; border-radius: 3px; }
img { max-width: 100%; height: auto; }
.wrap { max-width: var(--wrap); margin-inline: auto; padding-inline: var(--sp-5); }
```

### 6.4 Header / nav

```css
.site-header {
  position: sticky; top: 0; z-index: 50;
  display: flex; align-items: center; gap: var(--sp-5);
  padding: var(--sp-3) var(--sp-5);
  background: color-mix(in srgb, var(--paper) 82%, transparent);
  backdrop-filter: saturate(140%) blur(10px);
  border-bottom: 1px solid transparent;
  transition: border-color .25s, box-shadow .25s, background .25s;
}
.site-header[data-elevate="true"] {
  border-bottom-color: var(--line);
  box-shadow: var(--shadow-1);
}
.brand {
  font-family: var(--font-display); font-weight: 600;
  color: var(--navy); font-size: var(--text-lg); letter-spacing: -.01em;
}
.brand:hover { text-decoration: none; }
.brand-deg { font-style: italic; color: var(--accent); font-weight: 500; }

.site-nav { display: flex; gap: var(--sp-5); margin-left: auto; align-items: center; }
.site-nav a {
  font-size: var(--text-sm); font-weight: 500; color: var(--ink-2);
  padding-block: var(--sp-1); position: relative;
}
.site-nav a:hover { color: var(--navy); text-decoration: none; }
.site-nav a[aria-current="page"] { color: var(--navy); }
.site-nav a[aria-current="page"]::after {
  content: ""; position: absolute; left: 0; right: 0; bottom: -3px;
  height: 2px; background: var(--accent); border-radius: 2px;
}
.nav-ext::before { content: "↗"; font-size: .8em; margin-right: 2px; color: var(--muted); }

.theme-toggle {
  width: 34px; height: 34px; border-radius: 999px; cursor: pointer;
  border: 1px solid var(--line-strong); background: var(--surface);
  display: grid; place-items: center;
}
.theme-toggle-dot {
  width: 14px; height: 14px; border-radius: 999px;
  background: var(--navy); box-shadow: inset -4px -4px 0 0 var(--surface);
}
:root[data-theme="dark"] .theme-toggle-dot { box-shadow: none; background: var(--accent); }

/* Signature 1 — convergence / reading progress */
.read-progress {
  position: absolute; left: 0; right: 0; bottom: -1px; height: 3px;
  background: transparent; overflow: hidden;
}
.read-progress span {
  display: block; height: 100%; transform: scaleX(0); transform-origin: left;
  background: linear-gradient(90deg, var(--accent), var(--accent-2));
  transition: transform .08s linear;
}
```

### 6.5 Article typography (prose)

```css
.post { padding-block: var(--sp-8) var(--sp-10); }
.post-body { max-width: var(--measure); margin-inline: auto; }

.post h1 {
  font-family: var(--font-display); font-weight: 700;
  font-size: var(--text-3xl); line-height: var(--lh-tight);
  color: var(--navy); letter-spacing: -.02em; margin: 0 0 var(--sp-4);
}
.post h1 em { font-style: italic; color: var(--ink-2); font-weight: 400; display: block;
  font-size: .5em; letter-spacing: 0; margin-top: var(--sp-3); }

.post h2 {
  font-family: var(--font-display); font-weight: 600;
  font-size: var(--text-2xl); line-height: var(--lh-snug);
  color: var(--navy); margin: var(--sp-8) 0 var(--sp-4);
}
.post h3 {
  font-size: var(--text-xl); font-weight: 600; color: var(--ink);
  margin: var(--sp-6) 0 var(--sp-3);
}
.post p, .post li { color: var(--ink); }
.post p { margin: 0 0 var(--sp-4); }
.post strong { color: var(--navy); font-weight: 600; }

/* Section eyebrow + number (content IS sequential → numbers earn their place) */
.section-eyebrow {
  font-family: var(--font-mono); font-size: var(--text-xs);
  letter-spacing: .12em; text-transform: uppercase; color: var(--muted);
  display: flex; align-items: center; gap: var(--sp-2);
  margin-bottom: var(--sp-2);
}
.section-eyebrow .num { color: var(--accent); font-weight: 600; }
.section-eyebrow .num::after {
  content: ""; display: inline-block; width: 18px; height: 1px;
  background: var(--accent); margin-left: var(--sp-2); vertical-align: middle;
}

/* Tables (comparison tables are core to these posts) */
.post table {
  width: 100%; border-collapse: collapse; margin: var(--sp-5) 0;
  font-size: var(--text-sm);
}
.post th, .post td {
  text-align: left; padding: var(--sp-3) var(--sp-4);
  border-bottom: 1px solid var(--line);
}
.post thead th {
  font-family: var(--font-mono); font-size: var(--text-xs);
  text-transform: uppercase; letter-spacing: .06em; color: var(--muted);
  border-bottom: 2px solid var(--line-strong);
}
.post tbody tr:hover { background: var(--surface-2); }
```

### 6.6 Figures & captions

```css
.figure { margin: var(--sp-6) 0; }
.figure img {
  width: 100%; border: 1px solid var(--line); border-radius: var(--r);
  background: var(--surface);
}
.figure figcaption {
  margin-top: var(--sp-3); font-size: var(--text-sm); color: var(--muted);
  line-height: 1.5;
}
.figure figcaption b, .figure figcaption strong { color: var(--ink-2); }
```

### 6.7 Code blocks with language chip

```css
.code {
  position: relative; margin: var(--sp-5) 0;
  border-radius: var(--r); overflow: hidden; box-shadow: var(--shadow-1);
}
.code-head {
  display: flex; align-items: center; justify-content: space-between;
  font-family: var(--font-mono); font-size: var(--text-xs);
  color: var(--code-tag); background: var(--code-line);
  padding: var(--sp-2) var(--sp-4); letter-spacing: .04em;
}
.code pre {
  margin: 0; padding: var(--sp-4) var(--sp-5);
  background: var(--code-bg); color: var(--code-fg);
  font-family: var(--font-mono); font-size: .9rem; line-height: 1.6;
  overflow-x: auto;
}
/* Inline code */
.post :not(pre) > code {
  font-family: var(--font-mono); font-size: .9em;
  background: var(--surface-2); color: var(--navy);
  padding: .1em .35em; border-radius: 4px;
}
```

### 6.8 Callout / aside (formalizes the "The core insight" boxes)

```css
.callout {
  margin: var(--sp-5) 0; padding: var(--sp-4) var(--sp-5);
  background: var(--accent-wash); border-left: 3px solid var(--accent);
  border-radius: 0 var(--r) var(--r) 0;
}
.callout .label {
  font-family: var(--font-mono); font-size: var(--text-xs);
  text-transform: uppercase; letter-spacing: .1em; color: var(--accent);
  display: block; margin-bottom: var(--sp-1);
}
.callout.result { background: var(--accent-wash); border-left-color: var(--accent-2); }
.callout.warn   { background: color-mix(in srgb, var(--danger) 8%, transparent);
                  border-left-color: var(--danger); }
.callout.warn .label { color: var(--danger); }
```

### 6.9 Series badges + prev/next (fixes the "which series / where do I start" problem)

```css
/* Card badge on the homepage index */
.series-badge {
  display: inline-flex; align-items: center; gap: 6px;
  font-family: var(--font-mono); font-size: var(--text-xs);
  letter-spacing: .04em; color: var(--accent);
  border: 1px solid var(--line-strong); border-radius: 999px;
  padding: 2px 10px; background: var(--surface);
}
.series-badge .dot { width: 6px; height: 6px; border-radius: 999px; background: var(--accent); }

/* Prev / next at end of an article */
.series-nav {
  max-width: var(--measure); margin: var(--sp-8) auto 0;
  display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-4);
}
.series-nav a {
  border: 1px solid var(--line); border-radius: var(--r);
  padding: var(--sp-4); background: var(--surface); color: var(--ink);
  display: block; transition: border-color .2s, box-shadow .2s;
}
.series-nav a:hover { border-color: var(--accent); box-shadow: var(--shadow-1); text-decoration: none; }
.series-nav .dir { font-family: var(--font-mono); font-size: var(--text-xs);
  color: var(--muted); text-transform: uppercase; letter-spacing: .08em; }
.series-nav .t { color: var(--navy); font-weight: 600; margin-top: var(--sp-1); }
.series-nav .next { text-align: right; }
@media (max-width: 640px) { .series-nav { grid-template-columns: 1fr; } }
```

Example markup:
```html
<nav class="series-nav" aria-label="Series">
  <a href="/blog/pinn-odes-second-order.html">
    <div class="dir">← Previous · Foundations 02</div>
    <div class="t">Second-Order ODEs: The Damped Harmonic Oscillator</div>
  </a>
  <a class="next" href="/blog/pinn-burgers-reaction-pdes.html">
    <div class="dir">Next · Foundations 04 →</div>
    <div class="t">Nonlinear PDEs: Burgers Equation & Reaction Kinetics</div>
  </a>
</nav>
```

### 6.10 Signature 2 — collocation-dot dividers

```css
.rule-dots {
  border: 0; height: 6px; margin: var(--sp-8) 0;
  background-image: radial-gradient(var(--grid) 1.5px, transparent 1.6px);
  background-size: 14px 6px; background-position: center;
}
```
Use `<hr class="rule-dots">` between major sections instead of a solid line.

### 6.11 Footer

```css
.site-footer {
  margin-top: var(--sp-10); border-top: 1px solid var(--line);
  background: var(--surface);
}
.site-footer > * { max-width: var(--wrap); margin-inline: auto; padding-inline: var(--sp-5); }
.foot-lead { padding-top: var(--sp-8); }
.foot-name { font-family: var(--font-display); font-size: var(--text-lg);
  color: var(--navy); font-weight: 600; margin: 0; }
.foot-role { color: var(--muted); font-size: var(--text-sm); margin: var(--sp-1) 0 0; }
.foot-nav { display: flex; flex-wrap: wrap; gap: var(--sp-5); padding-top: var(--sp-5); }
.foot-nav a { font-size: var(--text-sm); color: var(--ink-2); font-weight: 500; }
.foot-nav a:hover { color: var(--accent); }
.foot-base {
  display: flex; justify-content: space-between; align-items: center;
  padding-block: var(--sp-5) var(--sp-8); margin-top: var(--sp-5);
  border-top: 1px solid var(--line); color: var(--muted); font-size: var(--text-sm);
}
.to-top { color: var(--muted); }
.to-top:hover { color: var(--accent); }
```

### 6.12 Hero (homepage) — keep it grounded
Your current hero (headline + stat cards) is fine, but the stat-card cluster is the
generic move. If you want it stronger, make the hero's signature a **live or static
convergence plot** (your `L(θ)` dropping on a log axis) sitting behind or beside the
headline — the one image that says "this author solves equations with networks"
faster than any stat. Reuse an existing figure (e.g. the intro loss-history plot) at
low opacity as a background motif, headline in `--font-display`, one green accent
line. Keep the three stats but demote them below the fold.

---

## 7. Per-file application checklist

Run for **every** `.html` file:

- [ ] §1 domain rules A–G applied; `grep` shows only the two protected project hosts remain.
- [ ] §1.1 `<link rel="canonical">` present and correct for this URL.
- [ ] `#blog` anchors converted to `#writing`.
- [ ] §3 head template in place; `og:url` = canonical; `og:image` on `.com`.
- [ ] §4 header identical to canonical (brand, nav order, `aria-current` on active).
- [ ] §5 footer identical; `{{ROLE_TITLE}}` set to the one chosen title.
- [ ] Article pages: §6.9 prev/next block added; series badge/eyebrow numbers correct.
- [ ] `theme.css` linked; page renders correctly in **light and dark**.
- [ ] Keyboard focus visible; reduced-motion respected; mobile (≤640px) layout intact.

Post-specific:
- [ ] `pinn-introduction.html`: §2.2 roadmap table corrected (no "Wave Equation"); §2.4 math checked.
- [ ] Homepage: §2.3 capstone card added; §2.5 order + badges applied.
- [ ] `agentic-*`, `*-mdm-*`, `fair-*`, `iso-23894-*`, `90-day-*`, `ai-driven-harmonization-*`: these are the posts most likely still on the old domain/template — prioritize them.

---

## 8. Suggested rollout order

1. Domain fix + canonical tags (§1) — deploy first; biggest SEO/branding win.
2. Head/header/footer standardization (§3–§5) + `theme.css` tokens only.
3. Full restyle (§6) on one post as a pilot (recommend `pinn-introduction.html`),
   screenshot light + dark, then roll across the rest.
4. Content fixes (§2) folded in as each file is touched.
5. Finish the "Trustworthy Data for AI Agents" post — it's the one deliverable that
   directly backs the homepage hero, and currently the only "Coming Soon."
