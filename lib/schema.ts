export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AIBrigade",
  url: "https://ivyleaguesolutions.ai",
  logo: "https://ivyleaguesolutions.ai/logo.png",
  description:
    "AIBrigade builds custom AI products and solutions for Fintech and HealthTech companies across North America.",
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
    addressLocality: "San Francisco",
    addressRegion: "CA",
    addressCountry: "US",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-415-000-0000",
    contactType: "customer service",
    email: "contact@aibrigade.ai",
    availableLanguage: "English",
  },
  sameAs: [
    "https://www.linkedin.com/company/ivyleaguesolutions",
    "https://twitter.com/ivyleagueai",
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
  areaServed: "North America",
  serviceType: [
    "AI Product Development",
    "Custom Machine Learning",
    "AI Consulting",
    "Intelligent Automation",
    "Fintech AI Solutions",
    "HealthTech AI Solutions",
  ],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "AIBrigade",
  url: "https://ivyleaguesolutions.ai",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://ivyleaguesolutions.ai/search?q={search_term_string}",
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
      url: "https://ivyleaguesolutions.ai",
    },
    url: `https://ivyleaguesolutions.ai/services#${service.slug}`,
    areaServed: "North America",
  };
}
