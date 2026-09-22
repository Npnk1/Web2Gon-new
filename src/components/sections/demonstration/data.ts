/**
 * Content for the /04 Demonstration section.
 *
 * Every value here describes a fictional worked example. The disclaimer copy is
 * part of the data, not decoration — it must stay adjacent to the record ID.
 */

export const DISCLAIMER = "Illustrative example — not client work";
export const RECORD_ID = "record nl-ams-0417";

export type Signal = {
  /** Where the conflicting claim was found. */
  source: string;
  /** The claim itself. */
  value: string;
  /** Struck-through prefix, when the source contradicts itself. */
  struck?: string;
  /** Why the claim cannot be relied on. */
  problem: string;
  /** Cobalt marks a problem the canonical record resolves. */
  emphasis: boolean;
  /** Recessed cards alternate with paper-bright ones. */
  tone: "bright" | "recessed";
};

export const signals: readonly Signal[] = [
  {
    source: "Website footer",
    value: "Wed–Sun · 17:00–late",
    problem: "conflicts with booking page",
    emphasis: true,
    tone: "bright",
  },
  {
    source: "Booking page",
    struck: "Tue–Sun",
    value: "· 18:00",
    problem: "two different opening times",
    emphasis: false,
    tone: "recessed",
  },
  {
    source: "menu.pdf / p.2",
    value: "Vegan — ask kitchen",
    problem: "not machine readable",
    emphasis: true,
    tone: "bright",
  },
  {
    source: "Directory profile",
    value: "Modern international",
    problem: "last edited 2019",
    emphasis: false,
    tone: "bright",
  },
  {
    source: "Social bio",
    value: "Three separate links",
    problem: "no official source",
    emphasis: true,
    tone: "recessed",
  },
];

export type RecordEntry = {
  label: string;
  status: string;
};

export const recordEntries: readonly RecordEntry[] = [
  { label: "Canonical opening hours", status: "resolved" },
  { label: "Structured cuisine & menu", status: "parsed" },
  { label: "Vegan options stated", status: "explicit" },
  { label: "Official booking source", status: "single" },
  { label: "Verifiable attribution", status: "signed" },
];

export const phaseCaptions = [
  "01 · Scattered information",
  "02 · Structured source",
  "03 · Attributable answer",
] as const;
