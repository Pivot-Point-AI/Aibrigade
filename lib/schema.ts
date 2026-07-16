import { SITE_URL } from "@/lib/seo";

/** Major US regions AIBrigade actively serves, used for local-relevance signals. */
const US_STATES_SERVED = [
  "New Jersey", "New York", "California", "Texas", "Massachusetts",
  "Illinois", "Florida", "Pennsylvania", "Washington", "Georgia",
];

const GEO = {
  "@type": "GeoCoordinates",
  latitude: 40.5068,
  longitude: -74.2654,
};

/** All AIBrigade office locations. The US HQ is primary; others are satellite offices. */
export const OFFICES = [
  {
    "@type": "Place" as const,
    name: "AIBrigade — U.S. Headquarters",
    address: {
      "@type": "PostalAddress" as const,
      streetAddress: "370 Federal Court",
      addressLocality: "Perth Amboy",
      addressRegion: "NJ",
      postalCode: "08861",
      addressCountry: "US",
    },
    geo: GEO,
  },
  {
    "@type": "Place" as const,
    name: "AIBrigade — UAE Office",
    address: {
      "@type": "PostalAddress" as const,
      streetAddress: "912, 9th Floor, YES Business Tower, Al Barsha Road, Al Barsha 1",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
  },
  {
    "@type": "Place" as const,
    name: "AIBrigade — Pakistan Office",
    address: {
      "@type": "PostalAddress" as const,
      streetAddress: "Corporate and Business Square, 1st/2nd Floor, Wazir Arcade, Park Ave, Block C, Gulberg Greens",
      addressLocality: "Islamabad",
      postalCode: "44000",
      addressCountry: "PK",
    },
  },
];

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "AIBrigade",
  legalName: "AIBrigade",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description:
    "AIBrigade builds custom AI products and solutions for Fintech and HealthTech companies across the United States.",
  foundingDate: "2021",
  founders: [
    {
      "@type": "Person",
      name: "Alexander Voss",
    },
    {
      "@type": "Person",
      name: "Dr. Elena Vasquez",
    },
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "370 Federal Court",
    addressLocality: "Perth Amboy",
    addressRegion: "NJ",
    postalCode: "08861",
    addressCountry: "US",
  },
  geo: GEO,
  location: OFFICES,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-845-300-2429",
    contactType: "customer service",
    email: "contact@aibrigade.ai",
    areaServed: "US",
    availableLanguage: "English",
  },
  sameAs: [
    "https://www.linkedin.com/company/aibrigade",
    "https://twitter.com/aibrigadeai",
  ],
  knowsAbout: [
    "Artificial Intelligence",
    "Machine Learning",
    "Fintech",
    "Healthcare Technology",
    "Natural Language Processing",
    "Computer Vision",
    "MLOps",
    "Data Engineering",
    "HIPAA Compliance",
    "SOC 2 Compliance",
  ],
  areaServed: [
    {
      "@type": "Country",
      name: "United States",
    },
    ...US_STATES_SERVED.map((name) => ({ "@type": "State" as const, name })),
    { "@type": "Country", name: "United Arab Emirates" },
    { "@type": "Country", name: "Pakistan" },
  ],
  serviceType: [
    "AI Product Development",
    "Custom Machine Learning",
    "AI Consulting",
    "Intelligent Automation",
    "Fintech AI Solutions",
    "HealthTech AI Solutions",
  ],
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#localbusiness`,
  name: "AIBrigade",
  image: `${SITE_URL}/logo.png`,
  url: SITE_URL,
  telephone: "+1-845-300-2429",
  email: "contact@aibrigade.ai",
  priceRange: "$$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "370 Federal Court",
    addressLocality: "Perth Amboy",
    addressRegion: "NJ",
    postalCode: "08861",
    addressCountry: "US",
  },
  geo: GEO,
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
  areaServed: [
    {
      "@type": "Country",
      name: "United States",
    },
    ...US_STATES_SERVED.map((name) => ({ "@type": "State" as const, name })),
  ],
};

/** One LocalBusiness entity per office, for local/regional search & map-pack relevance. */
export const officeLocalBusinessSchemas = [
  localBusinessSchema,
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#localbusiness-uae`,
    name: "AIBrigade — UAE Office",
    image: `${SITE_URL}/logo.png`,
    url: SITE_URL,
    email: "contact@aibrigade.ai",
    priceRange: "$$$",
    address: OFFICES[1].address,
    areaServed: { "@type": "Country", name: "United Arab Emirates" },
  },
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#localbusiness-pk`,
    name: "AIBrigade — Pakistan Office",
    image: `${SITE_URL}/logo.png`,
    url: SITE_URL,
    email: "contact@aibrigade.ai",
    priceRange: "$$$",
    address: OFFICES[2].address,
    areaServed: { "@type": "Country", name: "Pakistan" },
  },
];

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "AIBrigade",
  url: SITE_URL,
  inLanguage: "en-US",
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export function generateServiceSchema(service: {
  title: string;
  shortDescription: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.shortDescription,
    provider: {
      "@type": "Organization",
      name: "AIBrigade",
      url: SITE_URL,
    },
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    url: `${SITE_URL}/services#${service.slug}`,
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function generateWebPageSchema(page: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: page.name,
    description: page.description,
    url: `${SITE_URL}${page.path === "/" ? "" : page.path}`,
    inLanguage: "en-US",
    isPartOf: {
      "@type": "WebSite",
      name: "AIBrigade",
      url: SITE_URL,
    },
  };
}
