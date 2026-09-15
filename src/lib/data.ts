import type { IconName } from "@/lib/iconMap";

export type Metric = { label: string; value: string };

export type ProjectStatus = "LIVE_DEMO" | "LINKEDIN" | "SHOWCASE";

export const STATUS_LABEL: Record<ProjectStatus, string> = {
  LIVE_DEMO: "LIVE DEMO",
  LINKEDIN: "LINKEDIN",
  SHOWCASE: "SHOWCASE",
};

export type Project = {
  slug: string;
  name: string;
  category: string;
  status: ProjectStatus;
  tagline: string;
  description: string;
  /** Public, deployed demonstration build. Never the confidential client system itself. */
  publicUrl?: string;
  /** LinkedIn post used as proof for projects with no public deployment. */
  linkedinUrl?: string;
  /** Shown next to any public demo link: makes explicit that the client implementation is private. */
  confidentialityNote?: string;
  metrics: Metric[];
  stack: string[];
  assets: string[];
  assetDir: string;
  details: string[];
  /** Surfaced in the homepage "selected systems" teaser. */
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "clouddesk",
    name: "CloudDesk",
    category: "Support Intelligence Platform",
    status: "LIVE_DEMO",
    tagline: "AI support ticket classifier. Routes, tags, and drafts responses automatically.",
    description:
      "CloudDesk sorts and routes support tickets in under 2 seconds at 91% accuracy, using a fine-tuned NLP model rather than keyword rules. Built for high-volume support operations where manual triage is the actual bottleneck.",
    publicUrl: "https://novus-labs-cloud-desk-frontend.vercel.app",
    confidentialityNote: "Public demonstration; confidential client implementation omitted.",
    featured: true,
    metrics: [
      { label: "classification/routing accuracy", value: "91%" },
      { label: "avg response time", value: "<2s" },
      { label: "intent categories", value: "7" },
      { label: "response templates", value: "42" },
    ],
    stack: ["DistilBERT", "FastAPI", "Next.js", "Gemini AI"],
    assetDir: "/assets/clouddesk",
    assets: [
      "login.png",
      "queue-list.png",
      "queue-kanban.png",
      "ticket-detail.png",
      "agents.png",
      "process-page1.png",
      "process-page2.png",
      "templates.png",
      "metrics.png",
      "history.png",
    ],
    details: [
      "Fine-tuned DistilBERT classifies each ticket into an intent category; a FastAPI service routes it to the right queue and drafts a first-pass reply for the agent to approve or edit.",
      "Agents work from a kanban or list queue with per-ticket history and template-backed replies instead of blank-slate composition every time.",
      "91% accuracy is measured against a labeled holdout set, not a best-case demo run.",
    ],
  },
  {
    slug: "swiftdocs",
    name: "SwiftDocs",
    category: "AI Document Intelligence",
    status: "LIVE_DEMO",
    tagline: "Extracts structured data from invoices, PDFs, and contracts.",
    description:
      "AI-powered document intelligence system for classification, extraction, review, and structured processing. Built for finance and ops teams where manual re-keying is the real cost center.",
    publicUrl: "https://swiftdocs-frontend.vercel.app",
    confidentialityNote: "Public demonstration; confidential client information omitted.",
    featured: true,
    metrics: [
      { label: "field-level accuracy", value: "98%" },
      { label: "saves", value: "~30hrs / week manual work" },
    ],
    stack: ["Next.js", "OCR pipeline", "LLM extraction", "structured export"],
    assetDir: "/assets/swiftdocs",
    assets: ["login.png", "upload.png", "dashboard.png", "history.png"],
    details: [
      "Documents are parsed through an OCR + LLM pipeline and normalized into structured fields (vendor, line items, totals, dates) with a review step before export.",
      "A history view keeps every processed document queryable, so a team can audit what was extracted and when.",
      "98% field-level accuracy is measured against manually verified documents, not the easiest cases.",
    ],
  },
  {
    slug: "sales-intelligence",
    name: "Sales Intelligence",
    category: "Revenue Analytics Platform",
    status: "LINKEDIN",
    tagline: "End-to-end analytics platform. Ask questions in plain English, get SQL-backed answers.",
    description:
      "Sales Intelligence forecasts revenue and segments customers into AI-driven behavioral personas across 1M+ rows of transactional data, built for teams moving from gut-feel targeting to data-driven prioritization.",
    linkedinUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7485029644459479040/",
    metrics: [
      { label: "processes", value: "1M+ rows" },
      { label: "total revenue tracked", value: "PKR 1.60bn" },
      { label: "orders analyzed", value: "395,806" },
      { label: "query", value: "natural language to SQL" },
    ],
    stack: ["Next.js", "SQL warehouse", "forecasting models", "LLM query layer"],
    assetDir: "/assets/salesintel",
    assets: [
      "Homepage.png",
      "dashboard.png",
      "Forecast.png",
      "CustomerPersonas.png",
      "AskYourData.png",
      "dataset1.png",
      "dataset2.png",
    ],
    details: [
      "An executive dashboard surfaces revenue trend, order status, and category performance at a glance, backed by a real transactional dataset, not seeded demo data.",
      "A forecasting module projects revenue forward from trend; a segmentation model clusters customers into behavioral personas the sales team can act on directly.",
      "The 'Ask Your Data' layer translates plain-English questions into SQL, so a non-technical teammate can query the warehouse an analyst would.",
    ],
  },
  {
    slug: "daraz-intelligence",
    name: "Daraz Intelligence",
    category: "Market Intelligence Platform",
    status: "LINKEDIN",
    tagline: "Tracks real-time pricing across e-commerce listings. Flags fake discounts.",
    description:
      "Daraz Intelligence is a real-time market analysis tool for e-commerce decision-making. It tracks pricing and listing behavior continuously and flags sellers manufacturing fake discounts.",
    linkedinUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7485600716301094912/",
    metrics: [
      { label: "tracking", value: "600 products/day" },
      { label: "caught", value: "47 sellers faking discounts" },
    ],
    stack: ["scraping pipeline", "price-history engine", "anomaly detection", "Next.js dashboard"],
    assetDir: "/assets/daraz",
    assets: ["home.png", "price_tracker.png", "deals_drops.png", "fake_detector.png", "ai_insights.png"],
    details: [
      "A continuous pipeline tracks listing prices per product over time, building a real price history instead of a single snapshot.",
      "The fake-discount detector compares a listing's 'was' price against its tracked history, flagging discounts that were never real to begin with.",
      "An AI insights layer surfaces drop patterns and anomalies across the catalog for a pricing team to act on.",
    ],
  },
  {
    slug: "hos-trip-planner",
    name: "HOS Trip Planner",
    category: "Compliance & Route Planning",
    status: "LIVE_DEMO",
    tagline: "DOT Hours-of-Service compliance and trip planning, simulated hour-by-hour.",
    description:
      "A full-stack compliance and route-planning system that simulates driver duty schedules hour-by-hour against DOT Hours-of-Service rules and generates FMCSA-format driver logs. The core engine advances only as far as the nearest of five independent regulatory thresholds, never applying rules after the fact.",
    publicUrl: "https://hos-trip-planner-frontend.vercel.app",
    confidentialityNote: "Public demonstration implementation; confidential client information omitted.",
    featured: true,
    metrics: [
      { label: "regulatory thresholds simulated", value: "5" },
      { label: "rolling compliance window", value: "8-day / 70-hour" },
      { label: "log format", value: "FMCSA-compliant SVG" },
      { label: "export", value: "multi-page PDF" },
    ],
    stack: ["Django REST Framework", "React + Vite", "Geoapify API", "Render + Vercel"],
    assetDir: "/assets/hos",
    assets: ["landingPage.png", "routeMap.png", "dailyLogs.png", "tripSummary.png"],
    details: [
      "generate_hos_schedule() advances to whichever of five thresholds is nearest: the 11-hour driving limit, 14-hour duty window, 30-minute break trigger, a mileage-based fuel stop, and the 70-hour/8-day cycle limit.",
      "The 70-hour rule runs on a rolling 8-day sum seeded with real prior-day values, so hours age out of the window exactly as the regulation intends.",
      "Every event carries real coordinates sampled along the route via the Geoapify API (server-side only), so the map renders a distinct icon per stop type instead of generic pins.",
      "The frontend renders an actual FMCSA-format daily log as an SVG grid (duty rows, quarter-hour ticks, plotted status line, per-category totals summing to 24), exportable as a multi-page PDF, alongside a 7-day cycle-hours form with proportional redistribution.",
      "Backend is deliberately stateless (a fresh schedule per request), deployed separately from the frontend (Render/Vercel) and connected via an environment-driven API URL, not a hardcoded host.",
    ],
  },
  {
    slug: "solevault",
    name: "SoleVault",
    category: "E-commerce Platform",
    status: "LIVE_DEMO",
    tagline: "Premium footwear marketplace experience with interactive catalog presentation and checkout flow.",
    description:
      "Premium footwear marketplace experience with interactive catalog presentation and checkout flow. Built in Next.js 16 with Tailwind CSS v4: every interaction below is real code, no third-party animation platforms, no pre-baked video pretending to be interactive.",
    publicUrl: "https://sole-vault-marketplace.vercel.app/",
    confidentialityNote: "Public demonstration; confidential client implementation omitted.",
    metrics: [
      { label: "hero sequence", value: "175 frames, scrubbed live" },
      { label: "products individually anchored", value: "10" },
      { label: "checkout flow", value: "3 steps, self-drawing progress" },
      { label: "reduced-motion coverage", value: "100% of custom animation" },
    ],
    stack: ["Next.js 16", "Tailwind CSS v4", "Framer Motion", "anime.js", "raw requestAnimationFrame", "CSS 3D transforms"],
    assetDir: "/assets/solevault",
    assets: [
      "solevault-01.png",
      "solevault-02.png",
      "solevault-03.png",
      "solevault-04.png",
      "solevault-05.png",
      "solevault-06.png",
      "solevault-07.png",
      "solevault-08.png",
      "solevault-09.png",
      "solevault-10.png",
      "solevault-11.png",
      "solevault-12.png",
      "solevault-13.png",
      "solevault-14.png",
      "solevault-15.png",
      "solevault-16.png",
    ],
    details: [
      "A scroll-scrubbed product disassembly hero: a 175-frame sequence scrubbed live via video.currentTime against a hand-built smooth-scroll layer with a noise deadzone and a throttle that measures each visitor's actual display refresh rate.",
      "A drag-to-rotate 360° turntable with real momentum on release, idle auto-rotation resuming from the exact position you left it (solved via a raised-cosine curve), a cursor-tracked glare, and a counter-drifting shadow for depth.",
      "A pinned scroll-driven product story with tethered callouts individually anchored to pixel positions across ten products' actual photography, nothing generic.",
      "FLIP-style grid reflow when filtering products, so surviving cards glide to their new position instead of hard-refreshing.",
      "Cart and checkout with real physicality: the product photo flies into the cart icon with a comet-tail, a genuine three-step checkout with self-drawing progress, and a fully custom CSS-3D packaging animation on confirmation.",
      "Framer Motion for anything tied to React's render cycle, anime.js for explicit timeline sequencing and SVG stroke-drawing, and hand-rolled requestAnimationFrame loops for scroll/drag physics, kept outside both libraries. Every custom animation ships a genuine prefers-reduced-motion fallback.",
    ],
  },
  {
    slug: "crown-craft",
    name: "Crown & Craft",
    category: "Barbershop Booking",
    status: "SHOWCASE",
    tagline: "Premium barbershop concept: services, pricing, booking flow, and team presentation.",
    description:
      "Premium barbershop website concept featuring services, pricing, booking flow, and team presentation. A prototype/demo build exploring booking UX for personal-service businesses, not a verified public client engagement.",
    publicUrl: "https://crowncraft.vercel.app",
    confidentialityNote: "Prototype / demo concept.",
    metrics: [],
    stack: ["Next.js", "Tailwind CSS", "Framer Motion"],
    assetDir: "/assets/crowncraft",
    assets: [],
    details: [
      "A full booking flow (services → barber → time slot → confirmation) built to explore how a personal-services business can move phone-call scheduling online.",
      "Pricing and service menus are presented as first-class content, not an afterthought footnote, so a visitor can decide before they ever have to call.",
    ],
  },
];

export type ServiceGroup = "Intelligent Systems" | "Software Products" | "Data & Operations" | "Experience";

export type ServiceCategory = {
  slug: string;
  index: string;
  group: ServiceGroup;
  name: string;
  tag: string;
  pitch: string;
  description: string;
  proof: string[]; // project slugs
};

export const SERVICE_GROUPS: { name: ServiceGroup; description: string }[] = [
  { name: "Intelligent Systems", description: "AI automation, agents, LLM/NLP, and document intelligence." },
  { name: "Software Products", description: "Full-stack applications, internal tools, MVPs, and customer-facing products." },
  { name: "Data & Operations", description: "Intelligence, forecasting, workflow automation, and compliance systems." },
  { name: "Experience", description: "UI/UX, interaction design, and frontend systems." },
];

export const serviceCategories: ServiceCategory[] = [
  {
    slug: "automation-agents",
    index: "01",
    group: "Intelligent Systems",
    name: "AI-Powered Automation & Agents",
    tag: "$ automate",
    pitch: "Agentic pipelines that decide, not just follow fixed rules.",
    description:
      "Ticket triage and routing, workflow automation, agentic pipelines that make real decisions rather than executing a fixed rule tree. Where a business process has enough volume that a human is the bottleneck, we build the system that makes the same call a trained human would: fast, and measurably.",
    proof: ["clouddesk"],
  },
  {
    slug: "data-intelligence",
    index: "02",
    group: "Data & Operations",
    name: "Data Intelligence & Forecasting",
    tag: "$ predict",
    pitch: "Revenue forecasting, segmentation, and demand prediction on your actual data.",
    description:
      "Revenue forecasting, customer and behavioral segmentation, demand prediction, market analysis. We build the layer between raw transactional data and the decision a sales, demand-gen, or merchandising team actually needs to make.",
    proof: ["sales-intelligence", "daraz-intelligence"],
  },
  {
    slug: "document-extraction",
    index: "03",
    group: "Intelligent Systems",
    name: "Document & Data Extraction",
    tag: "$ extract",
    pitch: "Structured data out of invoices, contracts, and forms, at production accuracy.",
    description:
      "Structured data extraction from unstructured documents (invoices, contracts, forms) at accuracy levels that hold up under audit, not just demo conditions.",
    proof: ["swiftdocs"],
  },
  {
    slug: "regulatory-compliance",
    index: "04",
    group: "Data & Operations",
    name: "Regulatory & Compliance Automation",
    tag: "$ comply",
    pitch: "Simulating complex rule systems and generating compliant output automatically.",
    description:
      "Simulating and enforcing complex rule systems (time-based limits, rolling windows, multi-threshold logic) and generating the compliant output documents that regulation requires, automatically and correctly.",
    proof: ["hos-trip-planner"],
  },
  {
    slug: "full-stack-development",
    index: "05",
    group: "Software Products",
    name: "Custom Full-Stack Product Development",
    tag: "$ build",
    pitch: "End-to-end product builds on Django/DRF and Next.js, deployed on AWS and Vercel.",
    description:
      "End-to-end product builds: Django/DRF and Next.js/React stacks, stateless or persistent architectures depending on the problem, deployed on AWS (backend) and Vercel (frontend), connected via environment-driven configuration rather than hardcoded hosts. This is the category that underlies every named product on this site: it's the how behind all of them.",
    proof: ["hos-trip-planner", "swiftdocs"],
  },
  {
    slug: "ui-ux-interaction",
    index: "06",
    group: "Experience",
    name: "UI/UX & Interaction Design",
    tag: "$ animate",
    pitch: "Motion design as a first-class engineering discipline, not a decorative layer.",
    description:
      "Scroll-driven storytelling, physically-real micro-interactions, accessibility-first animation. Every custom animation ships with a genuine prefers-reduced-motion alternative, not just an on/off switch, and performance validated under real-world input conditions, not just demo conditions.",
    proof: ["solevault"],
  },
  {
    slug: "llm-nlp",
    index: "07",
    group: "Intelligent Systems",
    name: "Fine-Tuned LLM & NLP Solutions",
    tag: "$ tune",
    pitch: "Domain-tuned models and RAG pipelines, not generic off-the-shelf prompting.",
    description:
      "Domain-specific model tuning, RAG pipelines, AI-driven chat and concierge experiences, and NLP systems tuned for a specific business vocabulary rather than a generic prompt wrapped around a general-purpose model.",
    proof: ["clouddesk"],
  },
  {
    slug: "database-systems-architecture",
    index: "08",
    group: "Software Products",
    name: "Database & Systems Architecture",
    tag: "$ scale",
    pitch: "Stateless or persistent, decided deliberately, not by default.",
    description:
      "Scalable backend design, deciding deliberately between stateless and persistent architectures based on the actual problem rather than defaulting to a database because that's the reflex, and integration pipelines connecting multiple third-party APIs and data sources cleanly.",
    proof: ["hos-trip-planner", "sales-intelligence"],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export type Problem = {
  slug: string;
  title: string;
  body: string;
};

export const problems: Problem[] = [
  {
    slug: "manual-workflows",
    title: "Manual workflows",
    body: "Replace repetitive operational work with intelligent automation.",
  },
  {
    slug: "unstructured-information",
    title: "Unstructured information",
    body: "Turn documents and messy data into structured information.",
  },
  {
    slug: "fragmented-operations",
    title: "Fragmented operations",
    body: "Connect systems and workflows into coherent applications.",
  },
  {
    slug: "outdated-experiences",
    title: "Outdated digital experiences",
    body: "Build modern customer-facing experiences.",
  },
  {
    slug: "complex-decisions",
    title: "Complex decisions",
    body: "Use rules, data, and AI to support operational decisions.",
  },
  {
    slug: "new-product-ideas",
    title: "New product ideas",
    body: "Turn ideas into polished functional products.",
  },
];

export type EngineeringStep = {
  slug: string;
  icon: IconName;
  label: string;
  title: string;
  body: string;
};

export const engineeringProcess: EngineeringStep[] = [
  {
    slug: "scoped",
    icon: "Compass",
    label: "Scoped",
    title: "Mapped data & requirements",
    body: "We start from the actual data and workflow, not a feature list. If the inputs are messy, that's the first thing we scope.",
  },
  {
    slug: "designed",
    icon: "PuzzlePiece",
    label: "Designed",
    title: "Chose model & architecture",
    body: "Stateless or persistent, fine-tuned model or deterministic rules: decided by the problem, not by default.",
  },
  {
    slug: "built",
    icon: "Code",
    label: "Built",
    title: "Engineered & fine-tuned",
    body: "Full-stack implementation, with any model work fine-tuned against real examples from the domain, not a generic prompt.",
  },
  {
    slug: "tested",
    icon: "TestTube",
    label: "Tested",
    title: "Validated on real data",
    body: "Accuracy and reliability numbers are measured against labeled holdout data, not a best-case demo run.",
  },
  {
    slug: "shipped",
    icon: "RocketLaunch",
    label: "Shipped",
    title: "Deployed to production",
    body: "Live infrastructure, environment-driven configuration, and a deployment a real team can depend on daily.",
  },
  {
    slug: "monitored",
    icon: "ChartLineUp",
    label: "Monitored",
    title: "Tracked drift, iterated",
    body: "Production systems get watched and improved, not shipped once and forgotten.",
  },
];

export type IndustrySolution = {
  slug: string;
  name: string;
  points: string[];
};

export const industrySolutions: IndustrySolution[] = [
  {
    slug: "dental-healthcare",
    name: "Dental & Healthcare",
    points: ["Appointment systems", "Patient intake", "Service presentation", "Automation"],
  },
  {
    slug: "personal-services",
    name: "Barbers & Personal Services",
    points: ["Booking", "Service menus", "Scheduling", "Customer experiences"],
  },
  {
    slug: "restaurants",
    name: "Restaurants",
    points: ["Ordering", "Reservations", "Menus", "Operations"],
  },
  {
    slug: "ecommerce",
    name: "E-commerce",
    points: ["Catalogs", "Storefronts", "Checkout", "Workflow tools"],
  },
  {
    slug: "logistics",
    name: "Logistics",
    points: ["Compliance", "Route planning", "Document processing", "Operational intelligence"],
  },
  {
    slug: "professional-services",
    name: "Professional Services",
    points: ["Portfolio websites", "Lead capture", "Booking", "Workflow automation"],
  },
];
