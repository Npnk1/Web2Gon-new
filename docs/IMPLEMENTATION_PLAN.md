# Web2Go homepage implementation plan

**Current status (2026-07-23):** the complete static homepage, including the
semantic shell, responsive navigation, content sections, and static visual
fallbacks, is implemented. The final GSAP motion system remains pending.

This plan begins only after the current foundation and documentation receive
approval. It does not authorize deployment or invented proof.

## Phase 0 — Approval and assets

### Work

- Approve content, tokens, responsive rules, and the two motion narratives.
- Obtain a production SVG or transparent PNG logo.
- Obtain license-compliant Manrope and IBM Plex Mono WOFF2 files.
- Confirm contact destination, legal entity/details, privacy/imprint routes,
  approved social links, and whether any real work may be shown.
- Produce one original 3840 × 2160 grayscale information-landscape master plus
  approved responsive crops. If no asset is supplied, generate an original
  Web2Go-specific bitmap from the documented brief.

### Verification

Review assets for originality, licensing, legibility, responsive crops, and
absence of reference-site imagery. Do not start homepage code until the asset
gate is approved or the CSS-only fallback is selected.

### Risks and fallbacks

- Missing logo: use a text wordmark temporarily; do not edit the supplied
  background-filled raster into a production mark without approval.
- Missing landscape: use the documented CSS/HTML source graph with no raster.
- Missing proof: retain Demonstration/Method example/Sample analysis labels.

## Phase 1 — Semantic shell and content model

### Components and files

- `layout/SiteHeader` and `layout/SiteFooter`.
- `ui/LinkAction`, `ui/SectionLabel`, and `ui/Rule` only if reuse is proven.
- `data/homepage.ts` for approved navigation, services, methodology, process,
  and demonstration content.
- Small content types in `types/content.ts`; no generic CMS schema.

### Work

Replace the foundation page with the complete semantic section order. Render
all copy server-side, add stable anchor IDs, one H1, ordered H2/H3 hierarchy,
skip link, metadata, and an initial JSON-LD Organization/WebSite structure only
when verified company data exists.

### Verification

Run lint/typecheck/build; inspect landmarks, heading outline, link purpose,
content completeness, no-JS rendering, and 390px source order.

## Phase 2 — Navigation and static visual system

### Components

- `layout/SiteHeader`
- `layout/MobileMenu` as the first client component
- `ui/VerificationMarker`

### Work

Implement the desktop grid, compact breakpoint at 1024px, keyboard-safe menu,
focus return, body scroll lock, anchor offsets, tokens, typography, rules, and
static landscape final state. Self-host fonts and reserve their metrics.

### Verification

Test keyboard, Escape, focus trap/return, 200% zoom, 1920/1440/1024/768/390,
font swap, contrast, and layout shift. Build must remain within initial budgets.

## Phase 3 — Hero and information landscape

### Components

- `sections/Hero`
- `sections/InformationLandscape`
- `motion/InformationLandscapeMotion`

### Work

Build the 100svh hero and all six semantic transition labels. Implement the
static/mobile form first. Add the 220vh desktop and 170vh capable-tablet GSAP
timeline with deterministic coordinates, four/three depth planes, and the
cobalt verification path. No WebGL or Three.js.

### Verification

Check no-JS, reduced motion, low-power tablet fallback, resize refresh,
animation cleanup, scroll restoration, LCP/CLS, and stable final state.

### Risks and fallbacks

- Raster lacks depth: enhance only with CSS layers and tonal masks.
- Scroll jitter: reduce travel, remove clip animation, or switch 1024px to unpinned.
- LCP exceeds budget: simplify crop, reduce dimensions/quality, and remove a plane.

## Phase 4 — Positioning, methodology, and services

### Components

- `sections/Positioning`
- `sections/Methodology`
- `sections/ServiceSection`
- `sections/Services`

### Work

Implement the four observable methodology dimensions and four unpinned service
sections. Alternate layout through CSS grid without changing DOM order. Use
content-specific rules, relationship labels, and evidence fragments; do not
introduce repeated rounded cards.

### Verification

Review content against `CONTENT.md`, status-label honesty, reading order,
heading structure, responsive single-column flow, and hover/focus parity.

## Phase 5 — Discovery-to-citation journey

### Components

- `sections/CitationJourney`
- `motion/CitationJourneyMotion`
- `ui/SourceNode` only if the graph needs a reusable semantic primitive

### Work

Render the six-step ordered explanation and static diagrams first. Add the
320vh desktop and 220vh capable-tablet pinned sequence. Preserve node positions
while the active relationship changes; keep only one cobalt path active. Make
the non-guarantee language visible before the final `[W2G] Cited` state.

### Verification

Test reduced motion, keyboard reading order, screen-reader output, resize,
cleanup, scroll duration, frame stability, and the claim language.

### Risks and fallbacks

- Pinned sequence delays access: add a visible skip-story link or reduce to 240vh.
- Diagram becomes unclear: show one relationship per phase and keep all labels in HTML.
- Low performance: use the six unpinned mobile articles at the affected breakpoint.

## Phase 6 — Demonstrations, process, CTA, and footer

### Components

- `sections/Demonstrations`
- `sections/Process`
- `sections/ContactCta`
- completed `layout/SiteFooter`

### Work

Build three ruled demonstration bands with honest status labels, the four-step
process, final verification marker, contact CTA, and verified utility/legal
links. Hide unavailable links instead of shipping placeholders.

### Verification

Check status labels remain adjacent to examples, no invented outcomes, CTA
destination, legal data, focus states, and footer behavior at every breakpoint.

## Phase 7 — Accessibility and responsive hardening

### Work

Audit landmarks, headings, keyboard behavior, focus visibility, forced colors,
200% zoom, alt text, reduced motion, touch targets, reading order, and scroll
position. Validate all five required widths and minimum 320px.

### Verification

Complete automated checks plus manual keyboard and screen-reader passes. Record
and fix every issue before performance polish.

## Phase 8 — Performance and metadata

### Work

Optimize image sources, font subsets, dynamic GSAP loading, below-fold media,
cache rules, metadata, sitemap, robots policy, Open Graph image, and only the
structured data supported by verified company information.

### Verification

Run production bundle analysis and throttled traces. Enforce LCP ≤2.5s, INP
≤200ms, CLS ≤0.05, initial JavaScript ≤200KB gzip, initial media ≤700KB, and
fonts ≤120KB.

## Phase 9 — Final browser QA and handoff

### Work

Visually inspect every major section at 1920, 1440, 1024, 768, and 390. Test
current Chrome, Edge, Firefox, and Safari, representative touch behavior,
reduced motion, no-JS content, internal anchors, console errors, and failed
asset fallbacks.

### Completion gate

Run `pnpm lint`, `pnpm typecheck`, and `pnpm build`. Produce an implementation
summary, performance results, accessibility findings, known limitations, and
complete file list. Do not commit or deploy unless explicitly requested.
