# Web2Go design system

## Design intent

The interface must feel like a precise European editorial system: warm paper,
large near-black type, quiet technical rules, controlled asymmetry, and a
single cobalt signal. Visual authority comes from composition and evidence,
not gradients, glow, generic cards, or decorative AI motifs.

## Color tokens

These values are mirrored in `src/styles/tokens.css` and are the source of
truth for implementation.

| Token | Value | Use |
| --- | --- | --- |
| `--color-paper` | `#F6F3EC` | Primary page background |
| `--color-paper-bright` | `#FCFAF5` | Elevated paper and focused controls |
| `--color-ink` | `#151619` | Primary text, rules requiring high contrast |
| `--color-ink-muted` | `#6B7078` | Secondary text and inactive labels |
| `--color-line` | `#D7D8D4` | Dividers and restrained borders |
| `--color-fog` | `#E6E8EB` | Near-background landscape layer |
| `--color-fog-strong` | `#C5CBD2` | Foreground landscape layer |
| `--color-cobalt` | `#174BFF` | Verified, active, linked, and focus states |
| `--color-cobalt-dark` | `#0A2CA8` | Pressed actions and high-contrast cobalt text |

Do not introduce Tresmares red, purple, neon cyan, or multicolor gradients.
Cobalt should occupy less than 8% of a typical viewport. It communicates
meaning; it is not a general decorative fill.

## Typography

### Families

- Display/body: **Manrope**, weights 400, 500, and 600.
- Technical labels: **IBM Plex Mono**, weights 400 and 500.
- Sans fallback: `"Helvetica Neue", Arial, sans-serif`.
- Mono fallback: `"SFMono-Regular", Consolas, monospace`.

Production WOFF2 files are not yet present. Keep system fallbacks active until
the approved, license-compliant files are self-hosted from `public/fonts`.
Never use the reference site's PP Neue Montreal or PP Fragment files.

### Type scale

| Role | Size | Line height | Tracking | Weight |
| --- | --- | --- | --- | --- |
| Hero | `clamp(4.75rem, 12vw, 14rem)` | `0.78` | `-0.065em` | 500 |
| Section display | `clamp(3rem, 6vw, 7.5rem)` | `0.92` | `-0.05em` | 500 |
| Subsection | `clamp(2rem, 3.4vw, 4.5rem)` | `1` | `-0.035em` | 500 |
| Large body | `clamp(1.5rem, 2.4vw, 3rem)` | `1.08` | `-0.025em` | 400 |
| Body | `clamp(1rem, 1.25vw, 1.4rem)` | `1.45` | `-0.012em` | 400 |
| Label | `0.75rem` | `1.2` | `0.08em` | 500 mono |

Keep paragraphs at or below 68 characters per line. Display headings may use
intentional line breaks documented in `CONTENT.md`; do not auto-balance text if
it changes those breaks unpredictably.

## Canvas, widths, and grid

- Maximum content canvas: `1920px`, centered on larger displays.
- Long-form readable measure: `68ch`.
- Full-bleed visuals may extend beyond the content grid but must remain clipped
  within their section.

| Viewport | Columns | Gutter | Gap |
| --- | ---: | ---: | ---: |
| 1920px | 12 | 48px | 24px |
| 1440px | 12 | 32px | 20px |
| 1024px | 8 | 24px | 16px |
| 768px | 6 | 20px | 16px |
| 390px | 4 | 16px | 12px |

Major alignments should use columns 1, 4, 7, 9, and 12 at desktop rather than
arbitrary offsets. At mobile, all content follows the four-column grid.

## Spacing

Use an 8px foundation with the following approved steps:

`8, 12, 16, 24, 32, 48, 64, 96, 144, 192px`

The 12px value is permitted for compact controls and label gaps. Section
spacing uses 96–192px at desktop, 64–120px at tablet, and 48–96px at mobile.
Avoid repeating identical top/bottom spacing across consecutive sections; pace
must follow content density.

## Borders and surfaces

- Default rule: `1px solid #D7D8D4`.
- Active rule: `1px solid #151619`.
- Focus outline: `2px solid #174BFF` with `4px` offset.
- Corners remain square. A maximum `2px` radius is allowed only for browser
  normalization; do not use rounded marketing cards or pills.
- Shadows are prohibited. Depth comes from overlap, tone, scale, and blur in
  the information landscape only.

## Buttons and links

### Primary action

- Square cobalt block or cobalt-bottom-rule treatment.
- Minimum target: `48 × 48px` desktop and `52 × 52px` touch.
- Padding: `16px 20px`; mono label at 12px.
- Default cobalt, hover dark cobalt, pressed near-black, disabled muted line.
- Include a textual label; never rely on an icon alone.

### Secondary action

- Near-black text with a 1px underline offset by 5px.
- Hover changes underline to cobalt without moving layout.
- External links receive an accessible textual cue, not an ambiguous arrow.

## Navigation

- Desktop height: 80px at 1440–1920; 72px at 1024.
- Sticky at the top with warm-paper background becoming 96% opaque after the
  hero begins to leave. Use a 1px bottom rule; no blur is required.
- Brand occupies columns 1–2, primary links 5–9, and the action 10–12.
- At 1024 and below, show a wordmark and 52px menu trigger. The opened menu is
  full-screen, keyboard trapped, scroll locked, and ordered exactly like the DOM.

## Section dimensions

These are planning targets, not fixed pixel heights:

| Section | Desktop | Tablet | Mobile |
| --- | --- | --- | --- |
| Hero | `100svh`, minimum 760px | `100svh` | `100svh`, minimum 640px |
| Information transition | 220vh with 100svh sticky stage | 170vh with shortened pin | Unpinned content, auto height |
| Positioning | 110–130vh | Auto, minimum 760px | Auto |
| Methodology | 140–170vh | Auto | Auto |
| Each service | 90–120vh, unpinned | Auto | Auto |
| Citation journey | 320vh with 100svh sticky stage | 220vh | Six unpinned steps |
| Demonstrations | 120–160vh | Auto | Auto |
| Process | 100–120vh | Auto | Auto |
| Contact CTA | `100svh`, minimum 720px | 80svh | Auto, minimum 620px |

Only the information transition and citation journey may pin on desktop.

## Information-landscape treatment

The visual is an original grayscale system composed of:

1. Background fog plane in `--color-fog` at low contrast.
2. Fragment plane containing cropped, content-specific website surfaces.
3. Semantic plane with thin entity and relationship lines.
4. Evidence plane with source, author, date, and verification signals.
5. Cobalt marker showing the active verified path.
6. Final `[W2G] Cited` or `Answer-ready` state.

Use one original 3840 × 2160 master image with approved 1920, 1024, and 390
crops plus semantic HTML/CSS overlays. Prefer AVIF with WebP fallback. Do not
use a mountain silhouette, natural landscape, botanical image, glowing sphere,
or meaningless numeral. If the master image is unavailable, use a CSS-only
static diagram rather than reference imagery.

## Visual hierarchy

1. One dominant proposition per viewport.
2. Supporting copy no wider than one-third of desktop canvas.
3. Mono labels orient the reader but never compete with headings.
4. Cobalt identifies the current relationship or next action.
5. Technical details sit on ruled baselines and align to the grid.
6. Repetition must express a sequence; do not create collections of identical cards.
