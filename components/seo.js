import {
  SITE_URL,
  SITE_NAME,
  SITE_ALT_NAME,
  SITE_DESCRIPTION,
  SOCIAL_PROFILES,
  TWITTER_HANDLE,
  absoluteUrl,
} from "@/components/site.data";
import { OFFICES, HEADQUARTERS } from "@/components/offices.data";
import { CONTACT_EMAIL, CONTACT_PHONE } from "@/components/legal.data";
import { services } from "@/components/data";
import { SERVICE_DETAIL } from "@/components/services.data";
import { projects } from "@/components/projects.data";
import { FAQ, plainAnswer } from "@/components/faq.data";

/**
 * Page metadata and structured data (JSON-LD), built from the same data
 * modules the pages render — so what search and answer engines are told
 * is what a visitor reads, and changes with it.
 *
 * The JSON-LD is one linked graph per page. Nodes point at each other by
 * `@id` (`https://aibrigade.ai/#organization`, `<page>#webpage`, ...):
 * the Organization and WebSite are emitted once on every page by
 * app/layout.jsx, and each page adds its own nodes that refer to them.
 * components/JsonLd.jsx renders a graph.
 *
 * What is deliberately NOT marked up:
 *   - the client reviews — Google shows no review snippets for reviews a
 *     business publishes about itself, and treats that markup as a
 *     spam signal when it looks self-serving;
 *   - ratings or prices — the site states none;
 *   - the products as Product or SoftwareApplication — both require a
 *     price and ratings, so every page would report as an invalid item.
 *     They are Services the company provides, which is what they are.
 */

export const HOME_TITLE = `${SITE_NAME} | Enterprise AI That Does the Work`;

/* ---------------------------------------------------------------- */
/* Metadata                                                          */
/* ---------------------------------------------------------------- */

/**
 * Metadata for a page other than the home page. `title` is the page's
 * own part; the root layout's template appends " | AI Brigade".
 *
 * A page that sets `openGraph` replaces the layout's whole object rather
 * than merging into it, so the shared fields are restated here — and so
 * is the card: a route with its own `opengraph-image.jsx` gets that one
 * from the file convention, but a route without one does NOT inherit the
 * site's (app/opengraph-image.jsx) once it sets `openGraph`, and would
 * share with no image. `siteCard: true` names the site's card for it.
 */
const SITE_CARD = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${SITE_NAME} — AI that does the work.`,
};

export function pageMetadata({ title, description, path, robots, siteCard = false }) {
  const images = siteCard ? { images: [SITE_CARD] } : null;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "en_US",
      url: path,
      title,
      description,
      ...images,
    },
    twitter: {
      card: "summary_large_image",
      site: TWITTER_HANDLE,
      title,
      description,
      ...images,
    },
    ...(robots ? { robots } : null),
  };
}

/* ---------------------------------------------------------------- */
/* JSON-LD                                                           */
/* ---------------------------------------------------------------- */

export const ID = {
  org: `${SITE_URL}/#organization`,
  site: `${SITE_URL}/#website`,
  logo: `${SITE_URL}/#logo`,
  services: `${SITE_URL}/#services`,
  products: `${SITE_URL}/#products`,
  faq: `${SITE_URL}/#faq`,
};

const ref = (id) => ({ "@id": id });
const pageUrl = (path) => absoluteUrl(path);

/* "+1 (845) 300-2429" -> "+18453002429" */
const TELEPHONE = CONTACT_PHONE.replace(/[^\d+]/g, "");

const postalAddress = ({ postal }) => ({
  "@type": "PostalAddress",
  streetAddress: postal.street,
  addressLocality: postal.locality,
  ...(postal.region ? { addressRegion: postal.region } : null),
  ...(postal.code ? { postalCode: postal.code } : null),
  addressCountry: postal.country,
});

/* Topics the site demonstrates, not ones it merely names: each is a
   capability card (components/data.js), a product's stated stack
   (components/usecases.data.js) or an AI Lab module. */
const KNOWS_ABOUT = [
  "Agentic AI",
  "Enterprise AI",
  "AI agents",
  "Conversational AI",
  "Voice AI",
  "Multilingual speech recognition and synthesis",
  "Retrieval-augmented generation",
  "Private LLM deployment",
  "Real-time fraud detection",
  "Explainable AI",
  "Document intelligence",
  "Intent classification",
  "Human-in-the-loop AI",
  "Workflow automation",
];

export function organizationNode() {
  const logoUrl = absoluteUrl("/brand-mark.png");
  return {
    "@type": "Organization",
    "@id": ID.org,
    name: SITE_NAME,
    alternateName: SITE_ALT_NAME,
    url: `${SITE_URL}/`,
    logo: {
      "@type": "ImageObject",
      "@id": ID.logo,
      url: logoUrl,
      contentUrl: logoUrl,
      width: 256,
      height: 256,
      caption: SITE_NAME,
    },
    image: ref(ID.logo),
    description: SITE_DESCRIPTION,
    slogan: "AI that does the work.",
    email: CONTACT_EMAIL,
    telephone: TELEPHONE,
    address: postalAddress(HEADQUARTERS),
    location: OFFICES.map((o) => ({
      "@type": "Place",
      name: `${SITE_NAME} — ${o.city} (${o.role})`,
      address: postalAddress(o),
    })),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: CONTACT_EMAIL,
      telephone: TELEPHONE,
      url: absoluteUrl("/contact"),
      availableLanguage: "English",
    },
    sameAs: Object.values(SOCIAL_PROFILES),
    knowsAbout: KNOWS_ABOUT,
  };
}

export function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": ID.site,
    url: `${SITE_URL}/`,
    name: SITE_NAME,
    alternateName: SITE_ALT_NAME,
    description: SITE_DESCRIPTION,
    publisher: ref(ID.org),
    inLanguage: "en-US",
  };
}

/** A page's own node. `type` may be a WebPage subtype (ContactPage, ...). */
export function webPageNode({ path, name, description, type = "WebPage", image, extra }) {
  const url = pageUrl(path);
  return {
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    isPartOf: ref(ID.site),
    publisher: ref(ID.org),
    inLanguage: "en-US",
    ...(path === "/" ? null : { breadcrumb: ref(`${url}#breadcrumb`) }),
    ...(image ? { primaryImageOfPage: { "@type": "ImageObject", url: absoluteUrl(image) } } : null),
    ...extra,
  };
}

/** Home › … › this page. `trail` is [{ name, path }], home excluded. */
export function breadcrumbNode(path, trail) {
  const items = [{ name: "Home", path: "/" }, ...trail];
  return {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl(path)}#breadcrumb`,
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: pageUrl(it.path),
    })),
  };
}

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/* "22 September 2026" -> "2026-09-22" — the form legal.data.js prints. */
export const isoDate = (s) => {
  const [d, m, y] = String(s).split(" ");
  const i = MONTHS.indexOf(m);
  return i < 0 || !y ? undefined : `${y}-${String(i + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
};

/** A legal document's page, dated from the document's own "updated". */
export function legalPageGraph(doc, path, description) {
  const modified = isoDate(doc.updated);
  return [
    webPageNode({
      path,
      name: `${doc.title} | ${SITE_NAME}`,
      description,
      extra: modified ? { dateModified: modified } : null,
    }),
    breadcrumbNode(path, [{ name: doc.title, path }]),
  ];
}

/**
 * The four sector offers, each with the agents it is made of — the
 * content of the home page's ServiceExplorer. The explorer renders only
 * the open tab, so this is the one place a crawler sees all four.
 */
export function servicesNode() {
  return {
    "@type": "OfferCatalog",
    "@id": ID.services,
    name: "Enterprise AI by sector",
    itemListElement: services.map((s, i) => {
      const d = SERVICE_DETAIL[i];
      return {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: d.headline,
          serviceType: "Agentic AI",
          category: d.short,
          provider: ref(ID.org),
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: `${d.short} agents`,
            itemListElement: d.builds.map((b) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: b.name, description: b.text },
            })),
          },
        },
      };
    }),
  };
}

/** The products, in showcase order, each pointing at its own page. */
export function productsNode() {
  return {
    "@type": "ItemList",
    "@id": ID.products,
    name: `AI products built by ${SITE_NAME}`,
    numberOfItems: projects.length,
    itemListElement: projects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.name,
      description: p.description || p.tagline,
      url: pageUrl(`/use-cases/${p.id}`),
    })),
  };
}

export function faqNode() {
  return {
    "@type": "FAQPage",
    "@id": ID.faq,
    isPartOf: ref(`${SITE_URL}/#webpage`),
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: plainAnswer(f.a) },
    })),
  };
}

/* When the demo cuts were published at their current URLs: all eighteen
   were committed to public/projecs on this date, when they moved off
   Vercel Blob (git log). schema.org defines uploadDate as the date the
   media was uploaded to this site, which is this. A new cut gets its
   own `published` in projects.data.js, and that wins. */
const VIDEOS_PUBLISHED = "2026-09-24T12:46:54+05:00";

/* 98 -> "PT1M38S" */
const isoDuration = (s) => `PT${Math.floor(s / 60) ? `${Math.floor(s / 60)}M` : ""}${s % 60}S`;

/**
 * A use-case page's product (as a Service the company provides) and its
 * demo (as the VideoObject Google can list in video results — the page
 * plays that file in a <video> element, which is what makes it eligible).
 */
export function useCaseNodes(uc) {
  const url = pageUrl(uc.href);
  const video = Object.entries(uc.videos || {}).find(([, v]) => v.poster === uc.poster);

  const service = {
    "@type": "Service",
    "@id": `${url}#service`,
    name: uc.name,
    ...(uc.tagline ? { alternateName: uc.tagline } : null),
    description: uc.overview.join(" "),
    serviceType: uc.type,
    category: uc.sector,
    provider: ref(ID.org),
    url,
    ...(uc.poster ? { image: absoluteUrl(uc.poster) } : null),
    ...(uc.audience ? { audience: { "@type": "Audience", audienceType: uc.audience } } : null),
  };

  if (!video) return [service];
  const [code, v] = video;
  const language = uc.languages.find((l) => l.code === code)?.english;

  return [
    service,
    {
      "@type": "VideoObject",
      "@id": `${url}#video`,
      name: `${uc.name} demo${language && uc.languages.length > 1 ? ` (${language})` : ""}`,
      description: uc.description || uc.overview[0],
      thumbnailUrl: [absoluteUrl(v.poster)],
      contentUrl: absoluteUrl(v.src),
      uploadDate: v.published || VIDEOS_PUBLISHED,
      ...(v.duration ? { duration: isoDuration(v.duration) } : null),
      ...(v.width ? { width: v.width, height: v.height } : null),
      inLanguage: code,
      publisher: ref(ID.org),
      about: ref(`${url}#service`),
    },
  ];
}
