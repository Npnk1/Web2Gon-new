export type NavigationItem = {
  label: string;
  href: `#${string}`;
};

export type LandscapeStage = {
  index: string;
  title: string;
};

export type MethodologyDimension = {
  index: string;
  title: string;
  question: string;
  measure: string;
  output: string;
};

export type Service = {
  index: string;
  id: "audit" | "websites" | "technical" | "authority";
  label: string;
  title: string;
  body: string;
  capabilities: readonly string[];
  deliverable?: string;
  action: string;
};

export type CitationStep = {
  index: string;
  title: string;
  body: string;
};

export type Demonstration = {
  index: string;
  label: string;
  title: string;
  description: string;
  status: string;
};

export type ProcessStep = {
  index: string;
  title: string;
  body: string;
};
