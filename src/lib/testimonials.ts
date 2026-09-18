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
      "Cloudesk took a lot of the manual work out of ticket triage, so our agents could spend more of their time actually helping customers.",
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
      "It eliminated the manual data entry we used to deal with on incoming invoices, speeding up our processing and reducing errors during monthly reconciliation.",
    attribution: "Maya",
    role: "Finance Operations",
    disclosure: "Anonymized client feedback",
  },
  {
    slug: "dental-booking",
    project: "Dental Booking Project",
    category: "Dental / Healthcare Booking",
    quote:
      "This gave our patients an easy way to explore our services and book appointments online, which noticeably reduced the number of scheduling calls coming into the front desk.",
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
      "Through this our products got the level of visual polish our brand needed, and we noticed customers spending more time exploring the catalog before making a purchase.",
    attribution: "Ethan",
    role: "E-commerce Operations",
    disclosure: "Anonymized client feedback",
  },
  {
    slug: "studio-verai",
    project: "Studio Verai",
    category: "Interior Design / Professional Services",
    quote:
      "The website made it much easier for prospective clients to see our completed work and reach out directly, rather than relying mainly on social media and word of mouth.",
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
      "The tool gave our dispatch team a much easier way to plan compliant routes without manually checking hours-of-service limits for every driver and trip.",
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
      "It gave customers a clear view of our services and pricing before they called, while making it possible for them to book directly online instead of picking up the phone.",
    attribution: "Jordan",
    role: "Barbershop Operations",
    disclosure: "Anonymized client feedback · adapted to protect identity",
  },
  {
    slug: "sales-intelligence",
    projectSlug: "sales-intelligence",
    project: "Sales Intelligence",
    category: "Revenue Analytics Platform",
    quote:
      "The tool became a key benefit for our sales team in getting a much clearer view of what was driving revenue, with interactive dashboards, product-level insights, and forecasting that helped us spot trends and plan ahead with more confidence.",
    attribution: "Grace",
    role: "Revenue Operations",
    disclosure: "Anonymized client feedback",
  },
];
