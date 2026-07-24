# Web2Go responsive specification

## Principles

Responsive behavior preserves meaning and order; it does not compress the
desktop composition indiscriminately. Typography, depth, scroll distance, and
motion complexity all reduce as the viewport narrows. The DOM order is always:
label, heading, explanation, visual, action.

## 1920px

- 12 columns, 48px outer gutters, 24px gaps, content max-width 1920px.
- Hero title uses the top of its clamp range and spans columns 2–8. Supporting
  copy occupies columns 9–11.
- Navigation shows all links; primary action occupies columns 10–12.
- Information landscape uses four grayscale depth planes plus cobalt signal.
- Both 220vh and 320vh stories pin a 100svh visual stage.
- Service sections alternate controlled left/right composition while retaining
  the same DOM order.
- Demonstrations use wide ruled bands rather than a card grid.

## 1440px

- 12 columns, 32px gutters, 20px gaps.
- Hero title spans columns 2–8; supporting copy spans 9–12.
- Display sizes remain fluid; prevent any hero line from exceeding 90vw.
- Landscape retains four planes with reduced horizontal travel.
- Pinned durations remain 220vh and 320vh.
- Body measures remain at or below 68ch; service capability lists may use two columns.

## 1024px

- 8 columns, 24px gutters, 16px gaps.
- Replace desktop navigation with a 72px compact header and full-screen menu.
- Hero title spans columns 1–7; supporting copy sits below on columns 4–8.
- Landscape reduces to three planes and a 170vh transition. Pinning is allowed
  only when the device reports a fine pointer and no reduced-motion preference.
- Citation journey shortens to 220vh under the same capability condition.
- Otherwise use the unpinned 768px flow.
- Methodology becomes two columns; service capability lists become one column.
- Avoid background blur and use lower-resolution AVIF crops.

## 768px

- 6 columns, 20px gutters, 16px gaps.
- Compact header remains fixed; menu actions are at least 52px high.
- Remove all pinning and scrubbed timelines. Every narrative state becomes a
  semantic document section in reading order.
- Hero words keep intentional line breaks but use a minimum 76px size when space allows.
- Landscape uses two static grayscale planes with one short entry transition;
  source labels appear below rather than over the visual.
- Methodology, services, demonstrations, and process use one content column.
- Visuals follow their headings and descriptions; no source-order reversal.
- Hide decorative connector lines that would intersect text or require horizontal scrolling.

## 390px

- 4 columns, 16px gutters, 12px gaps; minimum supported width is 320px.
- Hero fills `100svh` with a 640px minimum. Title uses
  `clamp(4.75rem, 22vw, 6.25rem)` when implemented; supporting copy remains at
  least 18px with 1.4 line-height.
- Use a single precomposed landscape crop or CSS-only final diagram. No blur,
  parallax, masks, or animated connector paths.
- All six information and citation states appear as numbered text below the visual.
- Buttons become full-width only when their label would otherwise wrap; minimum
  height remains 52px.
- Long technical labels wrap normally; do not reduce body text below 16px.
- Footer links stack with 16px gaps and preserve visible focus outlines.

## Navigation behavior

At 1024px and below:

- Trigger exposes `aria-expanded`, `aria-controls`, and the current open state.
- Menu opens as a full-viewport paper surface below the header.
- Focus moves to the first link, remains trapped while open, and returns to the trigger.
- Escape and the close control dismiss the menu.
- Body scrolling is locked without shifting layout.
- Anchor navigation closes the menu and restores the target heading focus when appropriate.

## Landscape reductions

| Width | Depth planes | Motion | Asset target |
| --- | ---: | --- | --- |
| 1920 | 4 + signal | Full 220vh scrub | 1920px AVIF/WebP crop |
| 1440 | 4 + signal | Full 220vh scrub | 1440px crop |
| 1024 | 3 + signal | 170vh or unpinned | 1024px crop |
| 768 | 2 + signal | Short entry only | 768px static crop |
| 390 | 1 composite | None | 390px static crop |

## Content order

CSS grid may create asymmetry but must not alter semantic order. On smaller
screens, each service follows: index, H2, body, capability list, action, visual.
The citation explanation is always an ordered list from question to citation.

## Performance reductions

- Serve responsive AVIF/WebP sources and never download desktop artwork on mobile.
- Disable large filters, blend modes, and fixed backgrounds below 1024px.
- Import GSAP only for pages and breakpoints that use motion.
- At 768px and below, do not instantiate ScrollTrigger.
- Pause nonessential motion outside the viewport and when the page is hidden.

## Verification matrix

At each required width, verify navigation, intentional heading breaks, no
horizontal overflow, minimum control size, correct content order, image crop,
reduced-motion state, keyboard focus, and absence of obscured text. Test at
200% zoom and with dynamic mobile browser chrome where possible.
