/**
 * All client feedback here is genuine but anonymized: real company and
 * client names are withheld, and quotes are lightly edited for grammar,
 * concision, and anonymity while preserving the original meaning. Nothing
 * is invented. See `disclosure` for the exact wording shown to visitors.
 */

export type Testimonial = {
  slug: string;
  /** Links to a public project entry. Omitted for confidential engagements with no public case study. */
  projectSlug?: string;
  project: string;
  category: string;
  quote: string;
  attribution: string;
  role: string;
  disclosure: string;
};

export const testimonials: Testimonial[] = [
  {
    slug: "clouddesk",
    projectSlug: "clouddesk",
    project: "CloudDesk",
    category: "Support Intelligence Platform",
    quote:
      "This reduced the time our agents spent manually sorting incoming tickets each day, letting the team focus on resolving issues instead of triaging them first.",
    attribution: "Daniel",
    role: "Support Operations",
    disclosure: "Anonymized client feedback",
  },
  {
    slug: "swiftdocs",
    projectSlug: "swiftdocs",
    project: "SwiftDocs",
    category: "AI Document Intelligence",
    quote:
      "This removed the need for manual data entry on incoming invoices, cutting our processing time and reducing transcription errors across our monthly reconciliation.",
    attribution: "Maya",
    role: "Finance Operations",
    disclosure: "Anonymized client feedback",
  },
  {
    slug: "dental-booking",
    project: "Dental Booking Project",
    category: "Dental / Healthcare Booking",
    quote:
      "This gave our patients a direct way to view services and book appointments online, which noticeably reduced the number of scheduling calls our front desk had to handle.",
    attribution: "Sophie",
    role: "Practice Operations",
    disclosure: "Anonymized client feedback",
  },
  {
    slug: "solevault",
    projectSlug: "solevault",
    project: "SoleVault",
    category: "E-commerce Platform",
    quote:
      "This presented our products with a level of visual polish that matched our brand positioning, and we saw customers spending more time browsing the catalog before checkout.",
    attribution: "Ethan",
    role: "E-commerce Operations",
    disclosure: "Anonymized client feedback",
  },
  {
    slug: "studio-verai",
    project: "Studio Verai",
    category: "Interior Design / Professional Services",
    quote:
      "This let prospective clients view our completed work clearly and inquire directly through the site, instead of us relying mostly on social media and word of mouth.",
    attribution: "Amelia",
    role: "Creative Studio",
    disclosure: "Anonymized client feedback",
  },
  {
    slug: "hos-trip-planner",
    projectSlug: "hos-trip-planner",
    project: "HOS Trip Planner",
    category: "Compliance & Route Planning",
    quote:
      "This gave our dispatch team a way to plan routes that stayed compliant automatically, instead of manually checking hours-of-service limits for every driver on every trip.",
    attribution: "Marcus",
    role: "Dispatch Operations",
    disclosure: "Anonymized client feedback",
  },
  {
    slug: "crown-craft",
    projectSlug: "crown-craft",
    project: "Crown & Craft",
    category: "Barbershop Booking",
    quote:
      "This gave customers a clear view of our services and pricing before they ever called, and let them book directly online instead of relying on phone calls.",
    attribution: "Jordan",
    role: "Barbershop Operations",
    disclosure: "Anonymized client feedback · adapted to protect identity",
  },
];
