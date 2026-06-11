import type { Metadata } from "next";

export const SITE_URL = "https://aibrigade.ai";
export const SITE_NAME = "AIBrigade";

interface BuildMetadataOptions {
  title: string;
  description: string;
  path: string; // e.g. "/about" or "/" for home
  keywords?: string[];
  ogImage?: string;
  noIndex?: boolean;
}

/**
 * Builds page-level Metadata with canonical URL, Open Graph and Twitter
 * cards derived from a single source of truth. `path` must start with "/".
 */
export function buildMetadata({
  title,
  description,
  path,
  keywords,
  ogImage = "/opengraph-image",
  noIndex = false,
}: BuildMetadataOptions): Metadata {
  const url = `${SITE_URL}${path === "/" ? "" : path}`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      siteName: SITE_NAME,
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
      creator: "@aibrigadeai",
    },
  };
}

/** Helper to build a BreadcrumbList JSON-LD schema. */
export function buildBreadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path === "/" ? "" : item.path}`,
    })),
  };
}
