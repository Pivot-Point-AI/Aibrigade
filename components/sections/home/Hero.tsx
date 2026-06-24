"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SITE_STATS } from "@/data/siteStats";

const HeroScene = dynamic(() => import("@/components/3d/HeroScene"), {
  ssr: false,
  loading: () => null,
});

const TRUST_STATS = [
  { value: SITE_STATS.enterpriseClients, label: "AI Systems Deployed" },
  { value: SITE_STATS.valueDelivered, label: "Client Value Generated" },
  { value: SITE_STATS.avgRoiLift, label: "Avg. Productivity Lift" },
  { value: SITE_STATS.deploymentRate, label: "Production Deployment" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.19, 1, 0.22, 1] as const },
  }),
};

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-20">
      {/* Gradient glow backdrop */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-cyan/15 blur-[160px]" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[700px] h-[700px] rounded-full bg-violet/15 blur-[160px]" />
      </div>

      {/* 3D background */}
      <div className="absolute inset-0 -z-[5] opacity-70 hidden md:block">
        <HeroScene />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="inline-flex items-center gap-2 mb-6 tag-cyan"
          >
            <Sparkles size={12} />
            Production-Grade AI for Fintech &amp; HealthTech
          </motion.div>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="font-display font-800 text-display-2xl text-text-primary mb-6"
          >
            We Build <span className="text-gradient-main">AI Systems</span> That
            Move Your Business Forward
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-lg text-text-secondary max-w-2xl mx-auto mb-10"
          >
            From autonomous agents to predictive intelligence — AIBrigade designs,
            builds, and ships custom AI products that deliver measurable ROI for
            regulated, high-stakes industries.
          </motion.p>

          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <motion.div whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button variant="primary" size="lg" href="/contact" iconRight={<ArrowRight size={16} />}>
                Start Your AI Project
              </Button>
            </motion.div>
            <motion.div whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button variant="outline" size="lg" href="/projects">
                View Case Studies
              </Button>
            </motion.div>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            custom={4}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto"
          >
            {TRUST_STATS.map((stat) => (
              <div
                key={stat.label}
                className="glass rounded-2xl px-4 py-5 border border-border-light"
              >
                <div className="font-display font-800 text-2xl text-gradient-cyan mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-text-muted leading-tight">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
