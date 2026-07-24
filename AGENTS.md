# Web2Go implementation rules

## Purpose and source of truth

Build an original, premium European website that makes Web2Go visible,
understandable, verifiable, and citable by AI systems. Read `docs/` before
implementation. Precedence is: `PROJECT_BRIEF.md`; `CONTENT.md` and `DESIGN.md`;
`MOTION.md`, `RESPONSIVE.md`, `ACCESSIBILITY.md`, and `PERFORMANCE.md`; then
`IMPLEMENTATION_PLAN.md`. Resolve conflicts in that order.

## Stack and organization

- Next.js App Router, TypeScript strict mode, Tailwind CSS, pnpm, and ESLint.
- Put shared layout in `src/components/layout`, page sections in `sections`,
  animation wrappers in `motion`, and small primitives in `ui`.
- Keep copy/data outside presentation components when it is reused.
- Use semantic HTML first. Add client components only where interaction or
  motion requires them.

## Implementation rules

- Preserve the documented tokens, content hierarchy, and responsive order.
- Do not invent clients, testimonials, awards, case-study results, statistics,
  certifications, offices, partnerships, or business claims.
- Label unproven examples as Demonstration, Method example, Sample analysis, or
  Case studies coming soon.
- Do not copy Tresmares code, assets, logo, text, typefaces, red palette,
  imagery, shapes, or exact motion. Reference principles, not expression.
- Do not use Three.js, WebGL, Lenis, or another heavy dependency without a
  documented need and explicit approval. Never use `Math.random()` in render.
- Register GSAP through `src/lib/gsap.ts`, scope animations with
  `gsap.context()`, and clean up every ScrollTrigger on unmount.

## Visual, responsive, and accessible quality

- Keep the warm paper, near-black type, grayscale information landscape, and
  cobalt verification accent. Avoid generic cards, purple gradients, glows,
  dashboard styling, and decorative motion.
- Test at 1920, 1440, 1024, 768, and 390 pixels. Remove pinned scroll at 768
  and below; preserve reading order and content parity.
- Maintain one H1, ordered headings, landmarks, a skip link, keyboard access,
  visible focus, WCAG AA contrast, meaningful alternatives, and reduced-motion
  behavior.
- Visually inspect every major section at desktop and mobile after changes.

## Required validation

Run `pnpm lint`, `pnpm typecheck`, and `pnpm build`. Check browser console,
keyboard navigation, reduced motion, responsive overflow, and asset weight.
Do not commit or deploy unless explicitly requested.
