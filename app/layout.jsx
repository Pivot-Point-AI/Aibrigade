/* system.css first — it defines the design tokens (`--violet-500`,
   `--coral`, `--ease`, `--ink-canvas`, `--line-invert`, `--sp-*`) that
   every stylesheet below references. */
import "./system.css";
import "./globals.css";
import "./motion.css";
import "./projects.css";
/* usecase.css — /use-cases/<id>. Took over from casestudy.css with the
   client case studies. Every selector is new (`.ax-uc*`), and it sits
   after projects.css because the demo band reuses the showcase player. */
import "./usecase.css";
import "./path.css";
import "./sysv.css";
import "./svc.css";
/* contact.css — /contact only. Every selector in it is new (`.ax-contact*`)
   and it restyles nothing, so its position in this sequence is not
   load-bearing; it sits here with the other section stylesheets rather
   than among the three below that deliberately correct the finished
   cascade. */
import "./contact.css";
/* console.css — the stylesheet components/motion/AgentConsole.jsx was
   written against and never got. Not page-scoped; /contact is only where
   it is mounted first. */
import "./console.css";
/* footer.css — one file for the footer, which used to be styled from
   system.css, refine.css and motion.css at once. Those blocks are gone;
   see the header here. */
import "./footer.css";
/* legal.css — /privacy-policy and /terms-of-use. */
import "./legal.css";
/* film.css after the sections it layers into — it positions backdrops
   against rules in hero.css and deployments.css. */
import "./film.css";
/* refine.css corrects layout and interaction problems that only the
   finished cascade produces. */
import "./refine.css";
/* immersive.css after it: the depth, material and micro-interaction layer
   is built on top of that finished cascade rather than being part of it.
   Nothing in it introduces a colour, a typeface or a layout — see its own
   header. */
import "./immersive.css";
/* compose.css last: it is the layout rework — the type scale, the vertical
   rhythm and the Cases sequence — and it deliberately outranks the
   Webflow section padding it replaces. */
import "./compose.css";
/* hero.css last of all: the hero has been rebuilt more than once and
   film.css, refine.css and compose.css each still carry rules for its
   earlier forms under the same class names. This is its final word. */
import "./hero.css";
/* nav.css after hero.css: the navigation sits over every section and
   its own rules must outrank the Webflow navbar rules still carried in
   globals.css and refine.css. */
import "./nav.css";
/* touch.css last of all: the small-screen usability layer. Every rule in
   it is inside a `max-width` media query, so it cannot affect the
   desktop rendering — it corrects tap-target sizes, the sub-16px form
   fields that make iOS zoom on focus, and label sizes, several of which
   are set by compose.css and hero.css above. */
import "./touch.css";
/* featured.css — the Featured chapter: its example-brief panel and the
   sentence of problem-kind chips above it, at every width. It replaced rules for the
   old card in film.css, motion.css, refine.css and touch.css, so it loads
   after all four. Every selector in it is scoped by `#featured`. */
import "./featured.css";
/* faq.css — the home page's questions chapter. Every selector in it is
   scoped by `#faq`, so where it sits is not load-bearing; last, beside
   the other chapter-scoped sheet. */
import "./faq.css";
/* company.css — /company; blog.css — /blog and its posts. Every selector
   in both is new (`.ax-co*`, `.ax-blog*`, `.ax-post*`, `.ax-cover*`,
   `.ax-prose*`, and the shared `.ax-page-eyebrow`), so where they sit is
   not load-bearing. */
import "./company.css";
import "./blog.css";
/* cta.css — the "Bring us one problem" card (components/Cta.jsx), on the
   home page, /company, /blog and every post. Every selector is new
   (`.ax-cta*`); the button is the hero's `.ax-hero__cta`. */
import "./cta.css";
import Script from "next/script";
import { PopupProvider } from "@/components/PopupContext";
import Preloader from "@/components/Preloader";
import PageTransition from "@/components/PageTransition";
import PopupForm from "@/components/PopupForm";
import MotionProvider from "@/components/motion/MotionProvider";
import SmoothScroll from "@/components/motion/SmoothScroll";
import ThreadField from "@/components/motion/ThreadField";
import Cursor from "@/components/motion/Cursor";
import ScrollProgress from "@/components/motion/ScrollProgress";
import JsonLd from "@/components/JsonLd";
import { HOME_TITLE, organizationNode, websiteNode } from "@/components/seo";
import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  SITE_SHARE_DESCRIPTION,
  TWITTER_HANDLE,
} from "@/components/site.data";




/* Byte-for-byte copies of the original Webflow stylesheets, served from
   this site. They used to be linked straight from Webflow's CDN and an S3
   bucket, and both are render-blocking: every first paint — the preloader
   included — waited on two extra cross-origin handshakes, S3's often close
   to a second. Nothing in either file resolves against its own URL (every
   `url()` in them is absolute or `data:`), so moving them changes no rule.
   Sources, if they ever need refetching:
     https://cdn.prod.website-files.com/64147b2316f5ef0922b44617/css/fintech-auxility-ca.webflow.shared.8bf8d5ffb.min.css
     https://s3.amazonaws.com/assets.vvmd.team/Auxility/styles/3hhyvl-6.csb.app_style.css
   Cached as immutable (next.config.mjs): give a changed copy a new name.

   The shared sheet is linked PURGED: scripts/purge-webflow-css.mjs drops
   the ~80% of its rules that style template pages this site never had
   (a rule goes only when no element can ever match it), and points its
   three brand fonts at the WOFF2 copies in public/fonts. 261KB -> 51KB of
   render-blocking CSS, and every style recalculation stops walking the
   rest. Using a Webflow class the site hasn't used before? Re-run that
   script — see its header. The original stays beside it as the script's
   input. The custom sheet is linked as it is: it has literal <style> tags
   pasted into it, and the block a browser discards because of them has to
   stay discarded. */
const WF_SHARED_CSS = "/vendor/webflow/webflow.shared.purged.a1988d386b.css";
const WF_CUSTOM_CSS = "/vendor/webflow/3hhyvl-6.csb.app_style.css";

/* Self-hosted WOFF2 of the three faces the Webflow sheet used to fetch as
   OTF from Webflow's CDN: the same font files, losslessly repackaged
   (279KB -> 134KB), same-origin, and preloaded — all three are on the
   first screen, and otherwise they are only discovered once the
   stylesheets above have been parsed and matched. */
const FONTS = [
  "/fonts/Aeonik-Regular.woff2",
  "/fonts/Aeonik-Medium.woff2",
  "/fonts/PPNeueMachina-InktrapMedium.woff2",
];

/* Site-wide metadata. `metadataBase` is what every relative canonical,
   Open Graph URL and card image below resolves against — it said
   aibrigade.vercel.app until the site moved to aibrigade.ai, so every
   canonical pointed search engines at the old host.

   Pages give their own part of the title and the template adds the
   brand (components/seo.js `pageMetadata`). The template does not apply
   to app/page.jsx — it is in this same segment — so the home page's
   title is `default`.

   The icons are the files app/icon.png, app/apple-icon.png and
   app/favicon.ico, and each route's link-preview card is its nearest
   `opengraph-image.jsx` — Next links all of them from the file
   conventions, so neither is named here. They used to be hot-linked from
   the Webflow CDN, and /favicon.ico was a 404. */
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: HOME_TITLE, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  publisher: SITE_NAME,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    title: { default: HOME_TITLE, template: `%s | ${SITE_NAME}` },
    description: SITE_SHARE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    site: TWITTER_HANDLE,
    title: { default: HOME_TITLE, template: `%s | ${SITE_NAME}` },
    description: SITE_SHARE_DESCRIPTION,
  },
  /* Large image previews and full-length snippets: without these Google
     may show a thumbnail and a clipped description in Search, Discover
     and its AI answers. */
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-US">
      <head>
        {/* Exact visual parity: reuse the original Webflow stylesheets.
            The preconnect is for the images still served from Webflow's
            CDN. No `crossOrigin` now that the fonts (the CORS requests it
            was for) are self-hosted: an image request can't reuse an
            anonymous-mode connection, so the old hint went unused. */}
        {FONTS.map((href) => (
          <link key={href} rel="preload" href={href} as="font" type="font/woff2" crossOrigin="anonymous" />
        ))}
        <link rel="preconnect" href="https://cdn.prod.website-files.com" />
        <link rel="stylesheet" href={WF_SHARED_CSS} />
        <link rel="stylesheet" href={WF_CUSTOM_CSS} />
      </head>
      <body className="bodywhite" data-scroll-time="0">
        {/* Google Tag Manager. `lazyOnload`: fetched once the page has
            loaded and the browser is idle, instead of straight after
            hydration, where its ~130KB and its first long task landed in
            the same seconds as the intro and the hero. The trade: a visit
            that ends within its first couple of seconds may go
            unrecorded. */}
        <Script id="gtm" strategy="lazyOnload">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-KSRF9Q88');`}
        </Script>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KSRF9Q88"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="gtm"
          />
        </noscript>

        {/* The one thing that persists across every section. It has to be a
            direct child of <body> — it paints at `z-index: -1`, which only
            puts it above the page background and below the content if no
            ancestor in between has made a stacking context of its own. See
            the component for why the dark bands covering it is the point
            rather than a problem. */}
        <ThreadField />

        <MotionProvider />
        {/* Interpolated scrolling, mounted above everything that scrubs
            against scroll position. Every scrubbed effect on this page —
            the WhyUs pin, Parallax, ScrubFilm, Pipeline's rail, the hero's
            StageDepth — inherits the easing without changing, because they
            all read the same document offset this smooths. Desktop and
            fine-pointer only; see the component. */}
        <SmoothScroll />
        <Cursor />
        <ScrollProgress />
        {/* StoryRail removed: the fixed-bottom "XX/09 — chapter" pill it
            drew is bottom-anchored to the viewport rather than to any one
            section, so on a page this long it lands over whatever content
            happens to be at the bottom of the screen at that scroll
            position — card copy in WhyUs, the stage list in Deployments,
            the item list in Infrastructure. It was also a second readout
            of information `Kicker` already prints at the top of every
            section ("02 What we build", "03 Inside the system", …), so
            removing it drops a redundant, occasionally content-covering
            element rather than losing any information the page no longer
            states elsewhere. `ScrollProgress`'s hairline bar above stays
            as the one page-position indicator. */}

        {/* Who publishes this site — the Organization and WebSite nodes
            every page's own JSON-LD refers to by `@id`. See
            components/seo.js. */}
        <JsonLd graph={[organizationNode(), websiteNode()]} />

        <PopupProvider>
          <Preloader />
          <PageTransition />
          <div className="page-wrapper">
            {children}
            <PopupForm />
          </div>
        </PopupProvider>
      </body>
    </html>
  );
}
