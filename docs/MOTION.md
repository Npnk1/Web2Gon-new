# Web2Go motion specification

## Motion principles

Motion explains a change in information state. It must never decorate every
element, delay access to content, or become a prerequisite for comprehension.
The homepage is limited to two pinned desktop sequences: the information
landscape and the discovery-to-citation journey.

Use GSAP and ScrollTrigger through `src/lib/gsap.ts`. Scope every timeline with
`gsap.context()`, use `gsap.matchMedia()` for responsive variants, and revert
the context and media registrations on unmount. Do not add smooth scrolling.

## Shared rules

- Scrubbed timelines use `ease: "none"`; scroll position is the easing.
- Discrete entries use `power3.out`, 0.6–0.9 seconds.
- Animate `transform`, `opacity`, and approved `clip-path` masks only.
- Never animate layout dimensions, top/left, large blur filters, or box shadows.
- Set start states only after JavaScript loads; content remains readable without JS.
- Call `ScrollTrigger.refresh()` after fonts and critical imagery settle.
- Use `will-change` only while a timeline is active and remove it afterwards.
- No autoplay loops except a small, nonessential cobalt status pulse; disable it
  for reduced motion and when the document is hidden.

## Section-by-section behavior

| Section | Trigger and scroll duration | Pin | Entering state | Active state | Leaving state | Easing / transforms | Layering and fallback | Mobile simplification |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Navigation | Page load; scroll direction after 80px | No | Warm-paper bar at `y: 0` | Bottom rule gains opacity; background reaches 96% opaque | Never fully hides; compact state may reduce label contrast | `power3.out`, opacity only | Stays above all page layers; static sticky header without JS | Fixed compact header; no direction-based hiding |
| Hero | First viewport, 0–100vh | No | Words visible in final semantic order; landscape fragments at varied `y` and scale | Headline remains dominant while cobalt marker finds first fragment | Headline moves `y: -8vh` and fades to 0.12 as transition takes over | Scroll scrub, translate/scale/opacity | H1 is real text above visual layers; static composition without JS | No scrub. One short 12px entry, then static |
| Information landscape | Section entry; 220vh desktop, 170vh tablet | Yes at ≥1024 | Fragments separated; relationships incomplete; marker labeled `Question` | Six overlapping phases: question, fragments, structure, verification, citation, answer | Final system resolves to `[W2G] Answer-ready`; stage unpins in final state | `ease: none`; planes translate 2–8%, marker follows a deterministic path, opacity/clip reveal connectors | Visual stage below live text; DOM labels mirror visual states. CSS-only final-state fallback | At ≤768 remove pin and scrub. Render a static final composite followed by the six labels in document flow |
| Positioning | Heading top reaches 78% viewport | No | Label and sentence at `y: 32px`, opacity 0 | Two phrase groups resolve in sequence; body follows 120ms later | Remains visible; no exit animation | `power3.out`, translateY/opacity | Text is never split into inaccessible individual letters | One grouped entry; no phrase sequencing |
| Methodology | Each dimension reaches 75% viewport | No | Rule at scaleX 0; label/body at `y: 20px` | Rule expands from left, then copy enters | Remains in document flow | `power3.out`; transform origin left | Four semantic articles, not visual-only tiles | Use intersection entry once; reduced motion shows final state |
| AI Visibility Audit | 70% viewport | No | Cobalt index line at scaleY 0; copy at `y: 24px` | Index line grows and selected-capability list enters as one group | No exit | `power3.out` | Optional image stays lazy and nonessential | Copy before image; single entry |
| AI-ready Websites | 70% viewport | No | Same motion grammar, mirrored visual alignment only | Heading/copy enter; no internal scrub | No exit | `power3.out` | Preserve DOM order despite visual asymmetry | Single column; no mirroring |
| Semantic Optimization | 70% viewport | No | Connector rule collapsed; source labels visible | Rule connects labeled endpoints, then copy enters | Holds final relationship | `power3.out`, scaleX/opacity | Connector is decorative; text states relationship | Hide connector animation; show static rule |
| Authority Systems | 70% viewport | No | Evidence labels at 0.35 opacity | Approved labels reach full opacity in order: owner, date, method, source | Holds final state | `power3.out`, opacity/translateY | No rotating tags or marquee | Show all labels statically |
| Citation journey | Section entry; 320vh desktop, 220vh tablet | Yes at ≥1024 | Question and fragmented source nodes are present | Six equal scroll phases update active label, source graph, and a single cobalt path | Final answer and `[W2G] Cited` remain for last 15% before unpin | `ease: none`; node opacity, 8–24px translations, deterministic line progress | Semantic ordered list remains in DOM beside/under visual. No canvas required | At ≤768 remove pin. Display six numbered articles, each with a static mini-diagram |
| Demonstrations | Each article reaches 75% | No | 1px rule scaleX 0; status label visible | Rule opens, then title and description enter | No exit | `power3.out` | Status labels remain explicit and adjacent | No stagger between text lines |
| Process | Section reaches 70%; step enters 78% | No | Progress rule unfilled | Cobalt segment advances per step; active step uses ink, others muted | Completed steps remain marked | `power3.out`, scaleX/color | Ordered list is complete without motion | Static numbered list; optional simple active-on-view state |
| Contact CTA | Section reaches 70% | No | Marker and label at 0.4 opacity; headline at `y: 32px` | Marker resolves to `[W2G] Cited`; headline/action enter | Holds; footer follows normally | `power3.out` | No background video; CTA works immediately | Single entry; no marker movement |
| Footer | Natural document flow | No | Fully visible | Link underlines respond to focus/hover | N/A | 160ms color/scaleX | No scroll-triggered motion | Same behavior |

## Information-landscape timeline

The 220vh scroll range is divided as follows:

1. **0–12% — Question:** cobalt marker appears beside one buyer question.
2. **12–32% — Fragmented information:** four content-specific fragments separate
   across depth planes; no random positions are generated during render.
3. **32–52% — Structured context:** entity and service relationships connect.
4. **52–70% — Verification:** owner, source, date, and method signals become legible.
5. **70–86% — Citation:** one verified path turns cobalt and receives `[W2G]`.
6. **86–100% — Answer:** fragments align into a stable answer-ready source system.

Use fixed coordinates derived from the responsive layout, not pointer-driven or
random motion. Keep total foreground travel below 10% of viewport height to
avoid nausea and maintain the restrained character.

## Citation-journey timeline

Split 320vh into six equal semantic phases. The ordered text changes active
state while the graph preserves spatial memory. Only the active relationship is
cobalt; inactive nodes remain visible at 30–55% opacity. Never imply that
Web2Go guarantees a citation. The final visual says `[W2G] Cited` as an
explanation of the process, not a client result.

## Reduced motion

For `prefers-reduced-motion: reduce`:

- Do not create ScrollTriggers with `pin`, `scrub`, or long transforms.
- Render every section in its final, readable state.
- Replace both visual timelines with a static final composite plus ordered text.
- Disable parallax, marker travel, pulsing, split-phrase reveals, and smooth scrolling.
- Keep focus, hover, and menu state changes under 100ms or instantaneous.

## Failure and cleanup behavior

- If GSAP fails to load, content and final visual states remain visible through CSS.
- If the landscape asset fails, show the semantic DOM fragments on paper without imagery.
- If viewport height changes, debounce a refresh and preserve the active semantic step.
- On route change or unmount, call `context.revert()`, kill owned triggers, remove
  inline `will-change`, and restore any scroll-lock styles.
