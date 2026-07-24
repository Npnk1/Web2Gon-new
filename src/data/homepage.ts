import type {
  CitationStep,
  Demonstration,
  LandscapeStage,
  MethodologyDimension,
  NavigationItem,
  ProcessStep,
  Service,
} from "@/types/content";

export const navigation: readonly NavigationItem[] = [
  { label: "What we do", href: "#what-we-do" },
  { label: "Audit", href: "#audit" },
  { label: "Websites", href: "#websites" },
  { label: "Method", href: "#method" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export const landscapeStages: readonly LandscapeStage[] = [
  { index: "01", title: "Question" },
  { index: "02", title: "Fragmented information" },
  { index: "03", title: "Structured context" },
  { index: "04", title: "Verification" },
  { index: "05", title: "Citation" },
  { index: "06", title: "Answer" },
];

export const methodology: readonly MethodologyDimension[] = [
  {
    index: "01",
    title: "Discovery coverage",
    question: "Can important information be reached?",
    measure:
      "Indexable pages, rendering, crawl paths, canonical signals, internal links and machine access.",
    output:
      "An evidenced map of visible, blocked, duplicated and missing sources.",
  },
  {
    index: "02",
    title: "Entity clarity",
    question: "Can systems identify the business and its relationships?",
    measure:
      "Organization, service, expertise, location, author and topic consistency across content, markup and trusted profiles.",
    output:
      "An entity map with ambiguous, conflicting and unsupported relationships.",
  },
  {
    index: "03",
    title: "Evidence density",
    question: "Can important claims be checked?",
    measure:
      "Named sources, dates, authors, first-party facts, supporting pages, method descriptions and provenance.",
    output:
      "A claim-to-source register with evidence gaps and priority actions.",
  },
  {
    index: "04",
    title: "Citation readiness",
    question: "Is there a clear passage worth citing?",
    measure:
      "Answerable language, page specificity, source authority, update signals, semantic structure and traceable context.",
    output:
      "Citation opportunities with the exact source pages that need to be created or improved.",
  },
];

export const services: readonly Service[] = [
  {
    index: "01",
    id: "audit",
    label: "AI Visibility Audit",
    title: "See what AI systems can find, understand and substantiate.",
    body:
      "We review your website as a source system. The audit traces representative questions through discovery, extraction, entity interpretation, evidence and answer formation. It shows where the path is clear, where meaning breaks down, and which changes will create the strongest foundation.",
    capabilities: [
      "Technical and rendering review",
      "Entity and information-architecture mapping",
      "Structured-data and source consistency review",
      "Claim and evidence inventory",
      "Answer and citation sample analysis",
      "Prioritized roadmap by impact, effort and dependency",
    ],
    deliverable:
      "An evidenced baseline, annotated findings and an ordered action plan.",
    action: "Start an audit",
  },
  {
    index: "02",
    id: "websites",
    label: "AI-ready Websites",
    title: "Build a website that explains the business before it asks for attention.",
    body:
      "An AI-ready website is still a human website. It is fast, accessible, persuasive and easy to navigate. Underneath, its pages also form a coherent source: entities are named consistently, services have clear boundaries, expertise is attributable, and useful claims lead to evidence.",
    capabilities: [
      "Website strategy and information architecture",
      "Editorial UX and conversion paths",
      "Semantic HTML and accessible components",
      "Server-rendered, performance-led development",
      "Structured-data foundations",
      "Content models for services, expertise, authors and evidence",
    ],
    action: "Plan an AI-ready website",
  },
  {
    index: "03",
    id: "technical",
    label: "Semantic and Technical Optimization",
    title: "Make the structure explicit—and keep the source reliable.",
    body:
      "We improve the technical and semantic signals that help systems retrieve and interpret your content. The work connects rendering, crawlability, metadata, schema, internal linking and page relationships so they support the same meaning instead of producing competing versions of it.",
    capabilities: [
      "Rendering, indexation and canonical control",
      "Semantic templates and heading systems",
      "Organization, service, article and author schema",
      "Internal-link and entity-relationship design",
      "Metadata, sitemap and robots policy",
      "Validation, monitoring and release checks",
    ],
    action: "Review the technical foundation",
  },
  {
    index: "04",
    id: "authority",
    label: "Authority and Content Systems",
    title: "Publish expertise as evidence, not volume.",
    body:
      "Authority is easier to recognize when expertise has an owner, a date, a method and a supporting source. We design content systems that turn internal knowledge into durable pages and keep those pages accurate as the business changes.",
    capabilities: [
      "Topic, question and source architecture",
      "Expert-author and reviewer models",
      "Service, methodology and evidence pages",
      "Editorial briefs with citation requirements",
      "Provenance, update and governance standards",
      "Landing pages that connect authority to action",
    ],
    action: "Design an authority system",
  },
];

export const citationSteps: readonly CitationStep[] = [
  {
    index: "01",
    title: "Question",
    body: "A buyer asks for an explanation, comparison, provider or recommendation.",
  },
  {
    index: "02",
    title: "Discovery",
    body: "Search and retrieval systems locate pages that appear relevant and accessible.",
  },
  {
    index: "03",
    title: "Extraction",
    body: "The systems identify passages, facts and relationships that may answer the question.",
  },
  {
    index: "04",
    title: "Entity resolution",
    body: "Names, services, people, locations and topics are connected to the right organization.",
  },
  {
    index: "05",
    title: "Verification",
    body: "Claims are compared with supporting pages, sources, dates, authors and other signals.",
  },
  {
    index: "06",
    title: "Citation",
    body: "A clear, relevant and trustworthy source may be selected to support the generated answer.",
  },
];

export const demonstrations: readonly Demonstration[] = [
  {
    index: "01",
    label: "Demonstration",
    title: "From scattered service pages to one answerable entity system",
    description:
      "A demonstration of how navigation, service definitions, internal relationships and structured data can describe the same business without contradiction.",
    status: "Demonstration—not a client case study.",
  },
  {
    index: "02",
    label: "Method example",
    title: "From unsupported claims to traceable evidence paths",
    description:
      "A method example mapping important statements to named sources, expert owners, review dates and supporting pages.",
    status: "Method example—not a reported performance result.",
  },
  {
    index: "03",
    label: "Sample analysis",
    title: "From a buyer question to a citation-ready source page",
    description:
      "A sample analysis showing where discovery, extraction, entity clarity or verification can fail and what a prioritized remediation plan contains.",
    status: "Sample analysis. Case studies coming soon.",
  },
];

export const process: readonly ProcessStep[] = [
  {
    index: "01",
    title: "Audit",
    body: "We establish the questions, audiences, source landscape and technical baseline. Every priority begins with evidence.",
  },
  {
    index: "02",
    title: "Architect",
    body: "We define entities, information hierarchy, page responsibilities, content models and the path from claim to source.",
  },
  {
    index: "03",
    title: "Build",
    body: "We design and develop the human experience, semantic structure, structured data and performance foundations as one system.",
  },
  {
    index: "04",
    title: "Verify",
    body: "We test rendering, access, relationships, evidence, usability and representative answer paths. Findings feed the next improvement cycle.",
  },
];
