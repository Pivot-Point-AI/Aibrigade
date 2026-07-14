import { SITE_URL } from "@/lib/seo";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AIBrigade",
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
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-845-300-2429",
    contactType: "customer service",
    email: "contact@aibrigade.ai",
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
  ],
  areaServed: {
    "@type": "Country",
    name: "United States",
  },
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
  areaServed: {
    "@type": "Country",
    name: "United States",
  },
};

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
