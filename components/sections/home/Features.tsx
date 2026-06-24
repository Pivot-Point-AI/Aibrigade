"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { TrendingUp, Activity, Cpu, Workflow, ShoppingBag, ArrowUpRight, LucideIcon } from "lucide-react";
import { TiltCard } from "@/components/ui/TiltCard";
import { services } from "@/data/services";

const ICONS: Record<string, LucideIcon> = {
  TrendingUp,
  Activity,
  Cpu,
  Workflow,
  ShoppingBag,
};

const ACCENTS: Record<string, { glow: string; text: string; ring: string }> = {
  cyan: { glow: "rgba(0,212,255,0.25)", text: "text-cyan", ring: "border-cyan/25" },
  violet: { glow: "rgba(155,77,255,0.25)", text: "text-violet-light", ring: "border-violet/25" },
  gold: { glow: "rgba(0,212,255,0.25)", text: "text-cyan", ring: "border-cyan/25" },
};

export function Features() {
  return (
    <section className="section-padding relative">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <span className="tag-violet mb-4 inline-flex">What We Do</span>
          <h2 className="font-display font-800 text-display-lg text-text-primary mb-4">
            AI Solutions Built for{" "}
            <span className="text-gradient-main">High-Stakes Industries</span>
          </h2>
          <p className="text-text-secondary">
            We specialize in production-grade AI for the industries where accuracy,
            compliance, and reliability matter most.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = ICONS[service.icon] ?? Cpu;
            const accent = ACCENTS[service.color] ?? ACCENTS.cyan;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.1, ease: [0.19, 1, 0.22, 1] }}
                className="group"
              >
                <Link href={`/services/${service.slug}`} className="block h-full">
                  <TiltCard glowColor={accent.glow} className="h-full p-7 flex flex-col">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 border ${accent.ring} bg-white/5`}
                    >
                      <Icon size={22} className={accent.text} />
                    </div>
                    <h3 className="font-display font-700 text-lg text-text-primary mb-2.5">
                      {service.title}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed mb-6 flex-1">
                      {service.shortDescription}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {service.features.slice(0, 2).map((f) => (
                        <span key={f} className="tag-neutral !text-[10px]">
                          {f}
                        </span>
                      ))}
                    </div>
                    <div className={`flex items-center gap-1.5 text-sm font-display font-600 ${accent.text}`}>
                      Explore service
                      <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </TiltCard>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
