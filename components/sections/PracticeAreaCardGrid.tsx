"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { TrendingUp, Activity, Cpu, Workflow } from "lucide-react";
import { services } from "@/data/services";
import type { Service } from "@/types";
import { IndustrySpotlightInset } from "@/components/ui/IndustrySpotlightInset";

const iconMap: Record<string, React.ElementType> = {
  TrendingUp,
  Activity,
  Cpu,
  Workflow,
};

export function cardShellClass(color: Service["color"]) {
  switch (color) {
    case "cyan":
      return "border-border/80 bg-surface/95 shadow-[0_10px_28px_rgba(2,8,23,0.24)] hover:border-cyan/35 hover:shadow-[0_18px_42px_rgba(8,47,73,0.35)]";
    case "violet":
      return "border-border/80 bg-surface/95 shadow-[0_10px_28px_rgba(2,8,23,0.24)] hover:border-violet/35 hover:shadow-[0_18px_42px_rgba(30,27,75,0.35)]";
    case "gold":
      return "border-border/80 bg-surface/95 shadow-[0_10px_28px_rgba(2,8,23,0.24)] hover:border-gold/35 hover:shadow-[0_18px_42px_rgba(95,45,0,0.3)]";
  }
}

export function iconTileClass(color: Service["color"]) {
  switch (color) {
    case "cyan":
      return "border-cyan/35 bg-cyan/12 text-cyan shadow-[inset_0_0_0_1px_rgba(56,189,248,0.08)]";
    case "violet":
      return "border-violet/35 bg-violet/12 text-violet-light shadow-[inset_0_0_0_1px_rgba(167,139,250,0.08)]";
    case "gold":
      return "border-gold/35 bg-gold/12 text-gold shadow-[inset_0_0_0_1px_rgba(251,191,36,0.08)]";
  }
}

export function accentClass(color: Service["color"]) {
  switch (color) {
    case "cyan":
      return "bg-cyan/50";
    case "violet":
      return "bg-violet-light/50";
    case "gold":
      return "bg-gold/50";
  }
}

export type PracticeAreaCardGridProps = {
  headingText: string;
  headingId: string;
};

/** Same glass card treatment as the home Hero “What we deliver” grid */
export function PracticeAreaCardGrid({
  headingText,
  headingId,
}: PracticeAreaCardGridProps) {
  return (
    <section aria-labelledby={headingId} className="text-left">
      <h2
        id={headingId}
        className="text-center font-mono text-[0.7rem] sm:text-xs font-600 uppercase tracking-[0.2em] text-text-muted mb-6"
      >
        {headingText}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:grid-cols-5 lg:gap-3 xl:gap-4">
        {services.map((service, i) => {
          const Icon = iconMap[service.icon] ?? Cpu;
          const href = `#${service.slug}`;
          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
            >
              <Link
                href={href}
                className={`group relative flex h-full flex-col rounded-2xl border p-4 sm:p-[18px] transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background ${cardShellClass(service.color)}`}
              >
                <div
                  className={`mb-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${iconTileClass(service.color)}`}
                >
                  <Icon className="h-4 w-4" aria-hidden />
                </div>
                <h3 className="font-display font-700 text-text-primary text-[0.94rem] sm:text-[0.98rem] leading-snug mb-1.5 tracking-normal">
                  {service.title}
                </h3>
                <p
                  className="text-text-secondary text-[0.78rem] sm:text-[0.82rem] leading-relaxed font-body font-400 flex-1"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {service.shortDescription}
                </p>
                <IndustrySpotlightInset
                  variant="hero"
                  color={service.color}
                  industry={service.industrySpotlight.industry}
                  focus={service.industrySpotlight.focus}
                  metric={service.industrySpotlight.metric}
                  className="mt-2.5 shrink-0"
                />
                <div
                  className={`mt-2.5 h-px w-8 rounded-full transition-all duration-300 group-hover:w-12 ${accentClass(service.color)}`}
                  aria-hidden
                />
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
