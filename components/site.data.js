/**
 * Who the site is, in one place — the facts search engines, answer
 * engines and AI crawlers are told about the company.
 *
 * Plain module on purpose: the footer (a client component) and the
 * metadata, JSON-LD and llms.txt builders (server) all read it, and a
 * value exported from a `"use client"` module arrives on the server as a
 * client reference rather than the value.
 *
 * Nothing here is a new claim. The description is the home page's
 * meta description; the social profiles are the footer's links; the
 * addresses, email and phone come from offices.data.js and legal.data.js.
 */

/* The production origin. Every canonical URL, Open Graph URL, sitemap
   entry and JSON-LD `@id` is built on it, so a wrong value here points
   search engines at the wrong site — which is what happened while this
   still said aibrigade.vercel.app after the move to the VPS.
   Overridable for a staging build; never set it to a preview host in
   production. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://aibrigade.ai").replace(/\/$/, "");

/* The legal entity and the logo both say "AI Brigade"; the reviews and
   earlier page titles say "AIBrigade". Both are declared, so an engine
   treats them as one organisation. */
export const SITE_NAME = "AI Brigade";
export const SITE_ALT_NAME = "AIBrigade";

export const SITE_TAGLINE = "AI That Does the Work";

export const SITE_DESCRIPTION =
  "Enterprise AI that listens, understands, reasons, connects to the systems you already run — and executes real business workflows. Agentic AI for fintech, healthtech, retail, customer operations, industrial and energy.";

/* The Open Graph line, from docs/home-page-copy.md §0. */
export const SITE_SHARE_DESCRIPTION =
  "Most enterprise AI stops at the answer. We build the kind that does the work — understands, reasons, and executes inside the systems you already own.";

/* The footer's social row renders from this list (components/Footer.jsx),
   and Organization.sameAs is built from it — one list, so the two cannot
   disagree about which profiles are the company's. */
export const SOCIAL_PROFILES = {
  linkedin: "https://www.linkedin.com/company/aibrigade/",
  twitter: "https://twitter.com/aibrigade",
  instagram: "https://www.instagram.com/aibrigade/",
  facebook: "https://www.facebook.com/aibrigade",
};

export const TWITTER_HANDLE = "@aibrigade";

/** An absolute URL on this site, for places that need one (JSON-LD,
 *  llms.txt). Metadata fields take relative paths and resolve them
 *  against `metadataBase` themselves. */
export const absoluteUrl = (path = "/") =>
  /^https?:\/\//.test(path) ? path : `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
