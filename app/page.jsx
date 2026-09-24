import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Featured from "@/components/Featured";
import DecisionPath from "@/components/motion/DecisionPath";
import Cases from "@/components/Cases";
import ProjectShowcase from "@/components/projects/ProjectShowcase";
import Environments from "@/components/Environments";
import Services from "@/components/Services";
import Features from "@/components/Features";
import Reviews from "@/components/Reviews";
import Cta from "@/components/Cta";
import Proud from "@/components/Proud";
import CtaDark from "@/components/CtaDark";
import Footer from "@/components/Footer";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import { HOME_TITLE, webPageNode, servicesNode, productsNode, faqNode, ID } from "@/components/seo";
import { SITE_NAME, SITE_DESCRIPTION, SITE_SHARE_DESCRIPTION } from "@/components/site.data";

/* The title is the layout's `default` (the template skips this segment).
   What this adds is the page's own canonical and Open Graph URL, which
   the layout cannot carry without every other page inheriting them. */
export const metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    url: "/",
    title: { absolute: HOME_TITLE },
    description: SITE_SHARE_DESCRIPTION,
  },
};


/* Each section below the hero sits in its own <Suspense>. Nothing here
   suspends, so the server HTML is the same markup (plus comment markers)
   and nothing renders differently. What changes is hydration: without
   boundaries React hydrated the whole page in one task (~600ms on a
   mid-range phone, the page's longest); with them, each section is
   hydrated as its own task after the first screen, and the main thread is
   free in between.

   Hero stays outside, in the first pass. The page has no ScrollTrigger pin
   now that the capability carousel (WhyUs) is gone — if one comes back,
   it has to be created before the triggers below it, so leave that
   section outside a boundary too. */
export default function Home() {
  return (
    <>


    
      <Navbar />
      <div className="main-wrapper">
        {/* Dark and light alternate from the hero to the footer, and the
            order is also the argument: what we build, why it is different,
            how you start, the proof, who vouches, how it fits your estate,
            bring us the problem, the next step, then the questions. Every
            dark band opens against a light chapter, which is what their
            Curtain entrances expect. Keep CHAPTERS
            (components/motion/chapters.js) in this order. */}
        <Hero />
        <Suspense><Services /></Suspense>
        <Suspense><DecisionPath /></Suspense>
        <Suspense><Features /></Suspense>
        {/* <Suspense><Cases /></Suspense> */}
        <Suspense><ProjectShowcase /></Suspense>
        <Suspense><Reviews /></Suspense>
        <Suspense><Environments /></Suspense>
        <Suspense><Featured /></Suspense>
        {/* <Suspense><Cta /></Suspense> */}
        {/* <Proud /> */}
        <Suspense><CtaDark /></Suspense>
        <Suspense><Faq /></Suspense>
        <Suspense><Footer /></Suspense>
      </div>
      {/* This page, what it offers by sector, the products, and the FAQ
          above — see components/seo.js. */}
      <JsonLd
        graph={[
          webPageNode({
            path: "/",
            name: HOME_TITLE,
            description: SITE_DESCRIPTION,
            extra: { about: { "@id": ID.org } },
          }),
          servicesNode(),
          productsNode(),
          faqNode(),
        ]}
      />
    </>
  );
}
