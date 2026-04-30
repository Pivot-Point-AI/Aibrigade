"use client";

import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Activity, Cpu, Shield, Zap, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

const stats = [
  { value: "97.8%", label: "Fraud Detection", sub: "Recall Rate", color: "cyan" as const },
  { value: "28%",   label: "Readmission",    sub: "Reduction",  color: "violet" as const },
  { value: "$50M+", label: "Client Savings", sub: "Delivered",  color: "cyan" as const },
  { value: "18",    label: "AI Systems",     sub: "In Production", color: "violet" as const },
];

const floatingBadges = [
  { icon: TrendingUp, label: "Fintech AI",   color: "cyan"   as const, top: "22%", left: "4%"  },
  { icon: Activity,   label: "HealthTech AI",color: "violet" as const, top: "62%", right: "5%" },
  { icon: Cpu,        label: "Custom AI",    color: "cyan"   as const, top: "34%", right: "7%" },
];

const pills = [
  { icon: Shield,   label: "SOC 2 Compliant"    },
  { icon: Zap,      label: "Real-time Inference" },
  { icon: Cpu,      label: "MLOps Pipelines"     },
  { icon: Activity, label: "HIPAA Ready"         },
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden">

      {/* ── Background ─────────────────────────────── */}
      <div className="absolute inset-0 bg-background">
        <div className="absolute inset-0 bg-grid opacity-60" />

        {/* color washes — deep navy, electric blue, slate */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_-10%,rgba(26,32,44,0.16),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_85%_65%,rgba(100,116,139,0.08),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_40%_at_15%_80%,rgba(59,130,246,0.09),transparent)]" />

        {/* orbs — teal & gold, reduced opacity for clean premium feel */}
        <div className="absolute top-[6%]  left-[4%]  w-[650px] h-[650px] bg-cyan/[0.12]   rounded-full blur-[140px] animate-orb-1" />
        <div className="absolute top-[40%] right-[2%] w-[500px] h-[500px] bg-violet/[0.07] rounded-full blur-[110px] animate-orb-2" />
        <div className="absolute bottom-[2%] left-[30%] w-[400px] h-[400px] bg-cyan/[0.08] rounded-full blur-[90px]  animate-orb-3" />

        {/* horizontal beams */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan/[0.18] to-transparent animate-beam" />
        <div className="absolute top-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet/[0.08] to-transparent animate-beam" style={{ animationDelay: "2s" }} />
      </div>

      {/* ── Floating badges (xl+) ──────────────────── */}
      {floatingBadges.map(({ icon: Icon, label, color, top, left, right }, i) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, scale: 0.8, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 1.3 + i * 0.18, duration: 0.55 }}
          style={{ top, left, right }}
          className={`absolute hidden xl:flex items-center gap-2.5 glass border px-4 py-2.5 rounded-2xl z-10 ${
            i % 2 === 0 ? "animate-float" : "animate-float-delayed"
          } ${color === "cyan" ? "border-cyan/20" : "border-violet/20"}`}
        >
          <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
            color === "cyan" ? "bg-cyan/10 text-cyan" : "bg-violet/10 text-violet-light"
          }`}>
            <Icon className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-mono font-500 text-text-secondary whitespace-nowrap tracking-wide">
            {label}
          </span>
          <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${
            color === "cyan" ? "bg-cyan" : "bg-violet-light"
          }`} />
        </motion.div>
      ))}

      {/* ── Content ────────────────────────────────── */}
      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center mb-7"
          >
            <span className="tag-cyan">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
              Trusted by leading fintech &amp; healthcare organizations
            </span>
          </motion.div>

          {/* Headline — max 2 clear lines */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14, duration: 0.75, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="heading-display text-[2.6rem] sm:text-5xl lg:text-[4rem] text-text-primary mb-6"
          >
            Enterprise AI for<br />
            <span className="text-gradient-main">Finance &amp; Healthcare</span>
          </motion.h1>

          {/* Subheadline — Inter body, generous line-height */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.6 }}
            className="text-text-secondary text-base sm:text-[1.05rem] leading-[1.8] max-w-xl mx-auto mb-9 font-body font-400"
          >
            We design and deploy production-ready AI systems for the hardest challenges
            in financial services and healthcare — with the precision, interpretability,
            and regulatory rigor enterprise teams require.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-7"
          >
            <Button
              variant="primary"
              size="lg"
              href="/contact"
              iconRight={<ArrowRight className="w-4 h-4" />}
              className="w-full sm:w-auto"
            >
              Schedule a Consultation
            </Button>
            <Button
              variant="secondary"
              size="lg"
              href="/projects"
              className="w-full sm:w-auto"
            >
              View Case Studies
            </Button>
          </motion.div>

          {/* Feature pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.52, duration: 0.55 }}
            className="flex flex-wrap items-center justify-center gap-2 mb-14"
          >
            {pills.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface border border-border text-[0.7rem] font-mono text-text-muted tracking-wide"
              >
                <Icon className="w-3 h-3 text-cyan opacity-70" />
                {label}
              </span>
            ))}
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-border bg-border"
          >
            {stats.map(({ value, label, sub, color }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.66 + i * 0.07 }}
                className="relative bg-surface px-4 py-5 lg:py-6 flex flex-col items-center text-center group hover:bg-surface-2 transition-colors duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-white/[0.03] to-transparent" />
                <div className={`font-display font-700 text-2xl lg:text-[1.75rem] mb-1 ${
                  color === "cyan" ? "text-gradient-cyan" : "text-gradient-violet"
                }`}>
                  {value}
                </div>
                <div className="text-text-primary text-[0.7rem] font-600 font-display tracking-wide">{label}</div>
                <div className="text-text-muted text-[0.65rem] mt-0.5 font-body">{sub}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
