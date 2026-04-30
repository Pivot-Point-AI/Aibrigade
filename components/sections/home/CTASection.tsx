"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, MessageSquare, CheckCircle } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

const steps = [
  {
    step: "01",
    label: "Discovery Call",
    desc: "Free 30-minute session to understand your challenge and data landscape.",
    color: "cyan",
  },
  {
    step: "02",
    label: "AI Blueprint",
    desc: "We deliver a scoped solution architecture with timeline and ROI projections.",
    color: "violet",
  },
  {
    step: "03",
    label: "Build & Deploy",
    desc: "Our team engineers and ships your AI system to production.",
    color: "cyan",
  },
  {
    step: "04",
    label: "Ongoing Partnership",
    desc: "Monitoring, iteration, and growth as your needs evolve.",
    color: "violet",
  },
];

const trustSignals = [
  "No commitment required",
  "Response within 24 hours",
  "NDA available on request",
];

export function CTASection() {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(100,116,139,0.1),transparent)]" />
        <div className="absolute inset-0 bg-grid-sm opacity-30" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        {/* Orbs */}
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-violet/[0.12] blur-[120px] animate-orb-1" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-cyan/[0.09] blur-[100px] animate-orb-2" />
      </div>

      <div className="container-custom relative">

        {/* ── How it works ──────────────────────────── */}
        <Reveal className="mb-20">
          <div className="text-center mb-12">
            <span className="tag-cyan mb-5 inline-flex">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
              How It Works
            </span>
            <h2 className="heading-lg text-display-md text-text-primary mt-1 mb-4">
              From idea to production{" "}
              <span className="text-gradient-cyan">in weeks</span>
            </h2>
            <p className="text-text-secondary text-base max-w-xl mx-auto">
              We&apos;ve refined a process that moves fast without cutting corners —
              delivering enterprise-grade AI with startup-grade speed.
            </p>
          </div>

          <div className="relative">
            {/* Connector line (desktop) */}
            <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-border to-transparent" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map(({ step, label, desc, color }, i) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: i * 0.12, duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className="flex flex-col items-center text-center group"
                >
                  <div
                    className={`relative w-20 h-20 rounded-2xl bg-surface border flex items-center justify-center mb-5 transition-all duration-300 ${
                      color === "cyan"
                        ? "border-border group-hover:border-cyan/35 group-hover:shadow-[0_0_24px_rgba(59,130,246,0.12)]"
                        : "border-border group-hover:border-violet/35 group-hover:shadow-[0_0_24px_rgba(100,116,139,0.12)]"
                    }`}
                  >
                    <span
                      className={`font-mono text-3xl font-700 ${
                        color === "cyan" ? "text-gradient-cyan" : "text-gradient-violet"
                      }`}
                    >
                      {step}
                    </span>
                    <div
                      className={`absolute inset-0 bg-gradient-to-br rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity ${
                        color === "cyan" ? "from-cyan/5 to-transparent" : "from-violet/5 to-transparent"
                      }`}
                    />
                  </div>
                  <h3 className="font-display font-600 text-text-primary text-[1.05rem] mb-2 leading-snug">{label}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ── Main CTA card ─────────────────────────── */}
        <Reveal>
          <div className="relative rounded-3xl overflow-hidden">
            {/* Animated neon border via pseudo-element simulation */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan/25 via-surface-2 to-violet/20" />
            <div className="absolute inset-0 bg-grid opacity-15 rounded-3xl" />

            {/* Animated border */}
            <div className="absolute inset-0 rounded-3xl">
              <div
                className="absolute inset-0 rounded-3xl"
                style={{
                  padding: "1px",
                  background: "linear-gradient(135deg, rgba(59,130,246,0.5), rgba(100,116,139,0.35), rgba(59,130,246,0.5))",
                  backgroundSize: "200% 200%",
                  animation: "gradientShift 5s ease infinite",
                  WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                }}
              />
            </div>

            {/* Inner content */}
            <div className="relative px-8 py-14 lg:px-16 lg:py-20 text-center">
              {/* Availability badge */}
              <div className="inline-flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-full px-5 py-2 mb-8">
                <span className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
                <span className="text-xs font-mono text-text-secondary tracking-widest uppercase">
                  Accepting new projects · Q2 2025
                </span>
              </div>

              <h2 className="heading-display text-display-lg text-text-primary mb-6 max-w-3xl mx-auto">
                Start Your AI Journey
              </h2>

              <p className="text-text-secondary text-base lg:text-lg leading-relaxed max-w-2xl mx-auto mb-10">
                Whether you&apos;re validating an AI idea or scaling an existing system,
                we&apos;re the technical partner that turns ambition into production outcomes.
                No fluff. Just results.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
                <Button
                  variant="primary"
                  size="lg"
                  href="/contact"
                  iconRight={<Calendar className="w-4 h-4" />}
                  className="w-full sm:w-auto"
                >
                  Book a Free Discovery Call
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  href="/contact"
                  iconLeft={<MessageSquare className="w-4 h-4" />}
                  className="w-full sm:w-auto"
                >
                  Send Us a Message
                </Button>
              </div>

              {/* Trust signals */}
              <div className="flex flex-wrap items-center justify-center gap-5">
                {trustSignals.map((text) => (
                  <div key={text} className="flex items-center gap-2 text-text-muted text-sm">
                    <CheckCircle className="w-3.5 h-3.5 text-cyan/50 flex-shrink-0" />
                    {text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
