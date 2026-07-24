# Web2Go accessibility specification

## Standard

Target WCAG 2.2 AA. Accessibility is a release requirement, not a later polish
phase. Semantic content and core actions must work without JavaScript, motion,
hover, audio, or precise pointer control.

## Semantic structure

- Use one `<header>` containing the brand and a labeled primary `<nav>`.
- Use one `<main id="main-content">`; the skip link targets it.
- Use one `<section aria-labelledby>` for every major homepage section.
- Use `<article>` for methodology dimensions, service explanations, and
  demonstrations only when they can stand independently.
- Use an ordered list for the answer path and process.
- Use `<footer>` for legal, contact, and utility navigation.
- Do not use a `div` with click handlers where a button or link is correct.
- Decorative landscape layers use empty alt text or `aria-hidden="true"`.
  Equivalent stage meaning must exist as real text in the DOM.

## Heading hierarchy

- H1: `Be / the / answer` only.
- H2: positioning, methodology, each of the four services, answer path,
  demonstrations, process, and contact CTA.
- H3: methodology dimensions, answer-path steps when articles are used,
  demonstration titles, and process steps.
- Do not skip levels for visual sizing. Apply display classes independently of
  the semantic heading level.

## Keyboard navigation

- The first focusable control is “Skip to content.”
- All navigation, actions, demonstrations, and future form controls must be
  reachable in logical source order.
- Compact menu trigger exposes `aria-expanded` and `aria-controls`.
- When the menu opens, move focus to its first action, trap focus within it,
  support Escape, and return focus to the trigger after close.
- Do not make scroll-driven narrative states keyboard focus stops unless the
  state contains a real control.
- Any custom horizontal rail must support arrow keys only in addition to normal
  tab navigation; it must never capture page scrolling unexpectedly.

## Focus states

- Global focus: 2px `#174BFF` outline with 4px offset.
- On cobalt controls, switch to a 2px paper-bright inner/outer treatment so the
  focus indicator remains visible.
- Focus must not be clipped by overflow or covered by the sticky header.
- Use `scroll-margin-top` equal to the active header height on anchor targets.
- Hover may enhance focus styling but may not be the only indication.

## Contrast

Against paper `#F6F3EC`:

- Ink `#151619`: 16.33:1.
- Muted ink `#6B7078`: 4.50:1; use only at normal weight and never reduce opacity.
- Cobalt `#174BFF`: 5.43:1.
- Dark cobalt `#0A2CA8`: 9.78:1.

Text must meet 4.5:1 for normal sizes and 3:1 for large text. UI boundaries and
focus indicators must meet 3:1 against adjacent colors. Fog tones are
decorative and must not carry essential text.

## Alternative text and visual content

- The Web2Go logo alt text is “Web2Go” when it is the only brand text; use empty
  alt text when an adjacent wordmark duplicates it.
- Information-landscape imagery is decorative. Its six stages are presented as
  an accessible heading and ordered textual sequence.
- Demonstration imagery describes the method shown, not visual appearance alone.
- Avoid screenshots containing essential text. If unavoidable, duplicate the
  text and explanation in HTML.
- Future video needs captions, transcript, pause control, and a descriptive poster.

## Motion and reduced motion

- Respect `prefers-reduced-motion` before creating animation timelines.
- Reduced-motion mode removes pinning, scrubbing, parallax, marker travel,
  pulsing, split reveals, and smooth scrolling.
- All sections render in final state with the same content and controls.
- No flashing above three times per second and no large automatic motion.
- Provide a visible “Skip story” link before a long narrative if user testing
  shows that the desktop pinned sequences delay task completion.

## Forms

Forms are out of MVP foundation scope. When added:

- Every field receives a persistent `<label>`; placeholders are examples only.
- Required state is communicated in text and programmatically.
- Instructions precede the relevant control and are linked with `aria-describedby`.
- Errors identify the field, describe how to fix it, and receive focus through
  a summary after failed submission.
- Submission state uses a polite live region; errors use an assertive region sparingly.
- Do not clear user input after a server or network error.
- Consent is explicit, unbundled, and not preselected.

## Language and content

- Root language is `en` for the MVP.
- Expand specialized terms on first use; avoid unexplained acronyms.
- Link labels describe their destination. Do not repeat “Learn more.”
- Do not communicate status by color alone; pair cobalt with labels such as
  `Verified source`, `Active`, or `Cited`.

## Validation

Test with keyboard only, reduced motion, 200% zoom, Windows High Contrast/forced
colors, and a screen reader on at least one desktop and one mobile platform.
Run automated checks, but complete manual landmark, heading, focus, menu, alt
text, reading-order, and contrast reviews before release.
