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
      return "border-cyan/20 bg-cyan/[0.04] hover:border-cyan/35";
    case "violet":
      return "border-violet/20 bg-violet/[0.04] hover:border-violet/35";
    case "gold":
      return "border-gold/20 bg-gold/[0.04] hover:border-gold/35";
  }
}

export function iconTileClass(color: Service["color"]) {
  switch (color) {
    case "cyan":
      return "border-cyan/25 bg-cyan/10 text-cyan";
    case "violet":
      return "border-violet/25 bg-violet/10 text-violet-light";
    case "gold":
      return "border-gold/25 bg-gold/10 text-gold";
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
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
                className={`group relative flex h-full flex-col rounded-2xl border p-5 sm:p-6 glass transition-shadow duration-300 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background ${cardShellClass(service.color)}`}
              >
                <div
                  className={`mb-4 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${iconTileClass(service.color)}`}
                >
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="font-display font-700 text-text-primary text-base sm:text-[1.05rem] tracking-wide leading-snug mb-2">
                  {service.title}
                </h3>
                <p className="text-text-muted text-[0.8rem] sm:text-sm leading-relaxed font-body font-400 flex-1">
                  {service.shortDescription}
                </p>
                <IndustrySpotlightInset
                  variant="hero"
                  color={service.color}
                  industry={service.industrySpotlight.industry}
                  focus={service.industrySpotlight.focus}
                  metric={service.industrySpotlight.metric}
                  className="mt-4 shrink-0"
                />
                <div
                  className={`mt-4 h-px w-10 rounded-full transition-all duration-300 group-hover:w-14 ${accentClass(service.color)}`}
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
