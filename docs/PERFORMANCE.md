# Web2Go performance specification

## Budgets

Measure on a representative mid-range mobile device and throttled 4G profile.
Budgets apply at the 75th percentile where field data becomes available.

| Metric | Budget |
| --- | ---: |
| Largest Contentful Paint | ≤ 2.5s |
| Interaction to Next Paint | ≤ 200ms |
| Cumulative Layout Shift | ≤ 0.05 |
| First Contentful Paint | ≤ 1.8s |
| Total initial route JavaScript | ≤ 200KB gzip |
| Web2Go-authored initial JavaScript | ≤ 75KB gzip |
| Initial CSS | ≤ 50KB gzip |
| Initial viewport media | ≤ 700KB transferred |
| Individual hero/landscape image | ≤ 350KB at 1440px |
| Initial font transfer | ≤ 120KB total |

If a budget is exceeded, simplify or defer the feature before requesting an
exception. Visual similarity to a reference is not a valid exception.

## Images

- Prefer AVIF with WebP fallback. Use PNG only for small assets that require
  alpha and cannot be represented efficiently otherwise.
- Export landscape crops at 1920, 1440, 1024, 768, and 390 widths. Do not send
  the desktop source to mobile.
- Use `next/image` with correct `sizes`, intrinsic dimensions, and quality tuned
  per asset. Avoid `fill` without a stable aspect-ratio container.
- Preload only the actual LCP image. Lazy-load all below-fold media.
- Decorative images use empty alt text and remain outside the accessibility tree.
- Strip metadata and verify visible banding before launch.

## Video

No initial autoplay video is permitted. If future testing proves that video is
necessary, provide WebM and H.264 MP4, a lightweight poster, captions, a
transcript, pause control, and a static mobile fallback. Load video only after
explicit interaction or near-viewport intent.

## Fonts

- Self-host approved Manrope and IBM Plex Mono WOFF2 subsets.
- Include only used weights: Manrope 400/500/600 and IBM Plex Mono 400/500.
- Preload at most the primary Manrope file; all others use normal priority.
- Use `font-display: swap` and metric-compatible fallbacks to prevent layout shift.
- Keep the total initial font transfer below 120KB. Subset Latin characters for
  English MVP; add language subsets only when multilingual routes exist.

## Loading strategy

- Render all essential content as server components.
- Create client boundaries only for navigation and the two future motion stages.
- Dynamically import GSAP through `registerGsap()` and only on capable desktop/tablet layouts.
- Do not initialize ScrollTrigger at 768px or below or under reduced motion.
- Use route-level code splitting; do not create a global animation provider.
- Defer below-fold imagery and nonessential structured-data enhancement.

## Animation performance

- Animate transforms and opacity. Avoid layout properties and large blur filters.
- Limit simultaneous foreground animated layers to five on desktop and three at 1024px.
- Keep active `will-change` declarations scoped to the animation lifecycle.
- Batch DOM reads before writes and never measure in a scroll callback.
- Use `gsap.context()` cleanup and kill all owned triggers on unmount.
- Pause nonessential animation when the document is hidden.
- Test for dropped frames and long tasks on CPU-throttled hardware.

## Layout stability

- Reserve width and height for every image, media surface, navigation bar, and
  pinned-stage replacement.
- Load the system fallback with compatible metrics before production fonts.
- Do not inject cookie banners, notices, or async content above existing content.
- Sticky and pinned sections need a stable CSS fallback height before JavaScript.
- Anchor targets use scroll margins so the fixed header does not cover headings.

## Mobile fallbacks

- Use a static composite landscape at 390 and 768 rather than desktop layers.
- Remove pinning, parallax, blend filters, and animated connector paths.
- Avoid fixed backgrounds and background-attachment effects.
- Use one-column content and native document scrolling.

## Third-party policy

MVP permits no analytics, advertising, tag manager, chat widget, remote player,
CMS SDK, or consent manager. Every proposed third party must document purpose,
transfer size, privacy impact, loading phase, and a no-script fallback before approval.

## Validation

- Run a production build and inspect route bundle output.
- Measure desktop and mobile with Lighthouse as a diagnostic, then verify with
  browser performance traces under CPU/network throttling.
- Check LCP element, long tasks, layout shifts, unused JavaScript, image sizing,
  font requests, animation cleanup, and cache headers.
- Repeat after adding the landscape master, fonts, navigation, and each pinned sequence.
