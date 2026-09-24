import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhyUs from "@/components/WhyUs";
import Featured from "@/components/Featured";
import DecisionPath from "@/components/motion/DecisionPath";
import Cases from "@/components/Cases";
import ProjectShowcase from "@/components/projects/ProjectShowcase";
import Environments from "@/components/Environments";
import SectionSeam from "@/components/motion/SectionSeam";
import Services from "@/components/Services";
import Features from "@/components/Features";
import Reviews from "@/components/Reviews";
import Cta from "@/components/Cta";
import Proud from "@/components/Proud";
import CtaDark from "@/components/CtaDark";
import Footer from "@/components/Footer";


/* Each section below the first two sits in its own <Suspense>. Nothing
   here suspends, so the server HTML is the same markup (plus comment
   markers) and nothing renders differently. What changes is hydration:
   without boundaries React hydrated the whole page in one task (~600ms on
   a mid-range phone, the page's longest); with them, each section is
   hydrated as its own task after the first screen, and the main thread is
   free in between.

   Hero and WhyUs stay outside, in the first pass. WhyUs owns the page's
   only ScrollTrigger pin, and pins must be created before the triggers
   below them, which is the order their effects run in now. Don't wrap
   those two. */
export default function Home() {
  return (
    <>
      <Navbar />
      <div className="main-wrapper">
        <Hero />
        <WhyUs />
        <Suspense><DecisionPath /></Suspense>
        <Suspense><Cases /></Suspense>
        <Suspense><ProjectShowcase /></Suspense>
        <Suspense><SectionSeam /></Suspense>
        <Suspense><Environments /></Suspense>
        <Suspense><Services /></Suspense>
        <Suspense><Features /></Suspense>
        <Suspense><Reviews /></Suspense>
        <Suspense><Featured /></Suspense>
        <Suspense><Cta /></Suspense>
        {/* <Proud /> */}
        <Suspense><CtaDark /></Suspense>
        <Suspense><Footer /></Suspense>
      </div>
    </>
  );
}
