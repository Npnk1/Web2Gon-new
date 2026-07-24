# Tresmares reference audit

## Audit basis

Reference: <https://www.tresmarescapital.com/en/>

The audit used the live public page, eight supplied screenshots, and the
supplied 2526 × 1256 screen recording (26.88 seconds). The media covers the
hero-to-statistics transition and four financial-solution states. The live page
was inspected at a 1280 × 720 viewport, including section geometry, sticky
behavior, responsive rules, CTA, and footer.

This document records general principles only. No downloaded reference asset,
stylesheet, source code, copy, logo, typeface, or proprietary visual may enter
`src/` or `public/`.

## High-level composition

The reference moves through a full-viewport hero, a centered positioning
statement, an asymmetrical statistics grid, a four-viewport sticky service
sequence, an expansion/map narrative, a team rail, a centered CTA, and a
compact legal footer. At the inspected desktop size, the service sequence spans
roughly four viewport heights and the wider page uses long intervals of empty
space to regulate pace.

Its main differentiator is not any individual component. It is the coordinated
relationship among scale, negative space, a persistent central image,
progressive text, and scroll distance.

## Pattern audit

| Pattern | Why it is effective | Reusable principle | Must not be copied | Web2Go transformation |
| --- | --- | --- | --- | --- |
| Navigation | A thin sticky bar creates continuity while preserving the cinematic canvas. Language and portal actions are clearly separated. | Keep primary navigation visually quiet, persistent, and divided by thin rules. | Logo, exact menu, portal block, language treatment, dimensions, and dropdown imagery. | Use the Web2Go wordmark, five core anchors, a cobalt “Start an audit” action, and a compact full-screen menu from 1024px down. |
| Hero | Oversized staggered words provide immediate character while the supporting statement stays secondary. | Let one short proposition dominate; place proof-oriented context away from the headline. | “Drive to grow,” its line breaks, mountain, cloud treatment, and exact text positions. | Use “Be / the / answer” over an original information landscape, with a `[W2G]` verification marker and the supplied supporting sentence. |
| Central visual | A fixed WebGL mountain persists across the opening transition, binding multiple sections into one story. | Use one evolving visual system rather than unrelated section illustrations. | Mountain geometry, bump/alpha/cloud textures, WebGL implementation, and depth choreography. | Build layered source fragments, semantic connectors, evidence labels, and fog depth from an original master image plus semantic DOM/CSS layers. |
| Typography | Very large sans-serif display type contrasts with compact labels and serif statistics. Split words animate with controlled rhythm. | Create hierarchy through scale, line-height, and a restrained secondary voice. | PP Neue Montreal, PP Fragment, exact sizes, tracking, animated letter treatment, and red numerals. | Use Manrope with IBM Plex Mono labels; reserve cobalt for verification states rather than numeric spectacle. |
| Grid | A strict underlying grid supports intentionally uneven placement. | Use asymmetry only when alignment remains traceable to a grid. | Exact 20vw columns, metric cell sizes, or source layout code. | Use a 12/8/6/4-column system with content tied to discovery, clarity, evidence, and citation readiness. |
| Whitespace | Empty vertical space delays information and makes each transition feel consequential. | Treat scroll distance and blank space as editorial pacing, not unused area. | Exact section heights or empty-space proportions. | Allocate space to the information-resolution narrative and reduce it on smaller or low-performance devices. |
| Positioning statement | A centered, near-full-width sentence changes weight progressively as it enters. | Introduce the company with one precise sentence after the emotional hero. | Copy, line breaks, letter-level animation, and mountain overlap. | Reveal a plain-language statement about websites becoming connected evidence systems; use phrase-level emphasis rather than identical split letters. |
| Statistics | Two offset columns and tall ruled cells create motion without a carousel. | Present methodology or proof in a disciplined, scannable matrix. | Dates, investment figures, red serif numerals, exact two-track layout, or implied company proof. | Present four audit dimensions with observable outputs and status language; do not show invented scores or performance claims. |
| Service introduction | A large centered statement resets the narrative before a more complex sequence. | Use a typographic bridge before interaction-heavy content. | “Our four strategies…” copy and its reveal timing. | Introduce Web2Go's four connected capabilities as parts of one evidence system. |
| Pinned service sequence | A sticky viewport changes state while the page consumes four viewport heights. Left labels, central art, and right facts update together. | One pinned sequence can compare related offers while preserving spatial memory. | Four financial strategies, red geometric masks, botanical macro photography, side metrics, exact shapes, or exact state timing. | Keep Web2Go services unpinned and editorial. Reserve pinning for the information landscape and the discovery-to-citation explanation so the interaction supports Web2Go's own story. |
| Cards and panels | Thin borders, generous internal space, and few panels maintain sophistication. | Prefer large content-specific panels over repeated marketing cards. | Exact card sizes, borders, metric content, and staggering. | Use evidence fragments, annotated page excerpts, or methodology bands only where they communicate a real relationship. |
| Scroll transitions | Elements fade, translate, and reveal through masks while the persistent visual preserves continuity. | Animate state changes, not every object. Scrub only when scroll position conveys progress. | Exact GSAP timelines, easing values, clipping geometry, and smooth-scroll behavior. | Use two scoped ScrollTrigger narratives; all other sections enter with short, unpinned transforms and remain usable without JavaScript. |
| Map/expansion | A very pale map, small accent points, and ample whitespace avoid a conventional map section. | Use low-contrast context with one high-confidence accent. | Map artwork, locations, Santander partnership, office content, and red points. | Replace geography with a source graph that links company, service, author, evidence, and answer nodes; cobalt marks verified relationships. |
| Team rail | Cropped monochrome portraits form a horizontal visual break. | A consistent image treatment can humanize a technical narrative. | People, portraits, carousel implementation, names, or framing. | Defer team imagery until approved assets exist; use process and capability demonstrations in the MVP. |
| CTA | A large centered line, underlined action, and sparse images create a calm final invitation. | End with a concise statement and one unambiguous action. | CTA wording, office imagery, social icon treatment, or image orbit. | Use “Make your business easier to understand—and harder to overlook” with “Request an AI visibility audit” and a resolved `[W2G] Cited` marker. |
| Footer | Legal links and contact routes are compact and clearly separated. | Keep utility information simple after the emotional CTA. | Legal copy, registration claims, addresses, and image assets. | Show approved legal links, contact destination, social links, and a one-line Web2Go descriptor; omit unavailable details rather than inventing them. |

## Desktop behavior

- Header is sticky and approximately 5vw high on wide screens.
- Hero occupies one viewport; the central WebGL canvas persists behind the
  hero and positioning transition.
- The statistics story uses offset ruled columns next to sticky explanatory copy.
- The financial-solution component uses a sticky 100vh viewport inside a
  four-viewport container. Each state swaps central artwork, title, description,
  and metrics while anchors preserve orientation.
- Later sections return to document flow, with a pale map, horizontal team rail,
  spacious CTA, and image-led footer.

Web2Go may reuse full-viewport pacing and spatial continuity. It must not mirror
the same section heights, left/center/right service layout, or state sequence.

## Mobile behavior

The reference switches at approximately 1100px. Navigation becomes a fixed
header and off-canvas full-height menu. The hero uses `100svh`, hides the scroll
label, and repositions headline/supporting text. Statistics become a single
column. The financial-solution sequence uses full-height stacked/sticky states,
horizontal anchors, and reduced image dimensions; map filters and some visual
effects are removed.

For Web2Go, the compact menu begins at 1024px. At 768px and below, pinned
sequences are removed entirely: states become semantic document sections in
reading order, the landscape becomes a static composite, and transforms are
limited to short opacity/translate entries.

## Originality decision

The Web2Go visual metaphor is an information landscape, not a natural
landscape. It evolves through six meaningful states: question, fragmented
information, structured context, verification, citation, and answer. Cobalt is
used only for active or verified signals. Citation language must be intentional:
`[W2G]`, `Verified source`, `Cited`, or `Answer-ready`; a meaningless dominant
number is prohibited.
