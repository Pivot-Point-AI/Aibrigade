"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/Card";
import { testimonials } from "@/data/testimonials";
import type { Testimonial } from "@/types";

const clients = [
  "MidWest Capital Partners",
  "Summit Health Network",
  "Veritas Payment Tech",
  "PrimeCare Medical Group",
  "Pinnacle Wealth Mgmt",
  "Helix BioTherapeutics",
  "NexGen Insurance",
  "ClearPath Analytics",
];

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="flex-shrink-0 w-[360px] bg-surface border border-border rounded-2xl p-7 shadow-card relative overflow-hidden group hover:border-border-light hover:shadow-card-md transition-all duration-300">
      {/* Subtle top highlight */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none rounded-2xl" />

      {/* Quote icon */}
      <Quote className="absolute top-5 right-6 w-10 h-10 text-border/50" />

      {/* Stars */}
      <div className="flex items-center gap-1 mb-4">
        {Array.from({ length: t.rating }).map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />
        ))}
        <span className="ml-2 text-[0.6rem] font-mono text-text-muted uppercase tracking-widest border border-border rounded-full px-2 py-0.5">
          {t.industry}
        </span>
      </div>

      {/* Quote */}
      <blockquote className="text-text-primary text-sm leading-relaxed mb-6 font-body italic">
        &ldquo;{t.quote.length > 160 ? t.quote.slice(0, 160) + "…" : t.quote}&rdquo;
      </blockquote>

      {/* Person */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan/25 to-violet/25 border border-border flex items-center justify-center flex-shrink-0">
          <span className="font-display font-600 text-sm text-text-primary">
            {t.name.charAt(0)}
          </span>
        </div>
        <div>
          <div className="font-display font-600 text-text-primary text-sm">{t.name}</div>
          <div className="text-text-muted text-xs">{t.role} · {t.company}</div>
        </div>
      </div>
    </div>
  );
}

function InfiniteRow({ items, reverse = false }: { items: Testimonial[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden marquee-mask">
      <motion.div
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="flex gap-4 w-max"
        style={{ willChange: "transform" }}
      >
        {doubled.map((t, i) => (
          <TestimonialCard key={`${t.id}-${i}`} t={t} />
        ))}
      </motion.div>
    </div>
  );
}

export function Testimonials() {
  const half = Math.ceil(testimonials.length / 2);
  const row1 = testimonials.slice(0, half);
  const row2 = testimonials.slice(half).concat(testimonials.slice(0, 2));

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-sm opacity-35" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-violet/[0.07] blur-[130px] rounded-full" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <div className="relative">
        {/* Section header */}
        <div className="container-custom">
          <Reveal className="text-center max-w-2xl mx-auto mb-14">
            <span className="tag-violet mb-5 inline-flex">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-light" />
              Client Voices
            </span>
            <h2 className="heading-lg text-display-md text-text-primary mb-4 mt-1">
              Trusted by teams who{" "}
              <span className="text-gradient-violet">ship what matters</span>
            </h2>
            <p className="text-text-secondary text-base leading-relaxed max-w-lg mx-auto">
              The best measure of our work is the outcomes it creates for the people
              who build with us.
            </p>
          </Reveal>
        </div>

        {/* Marquee rows */}
        <div className="space-y-4">
          <InfiniteRow items={row1} reverse={false} />
          {row2.length >= 2 && <InfiniteRow items={row2} reverse={true} />}
        </div>

        {/* Client logos strip */}
        <div className="container-custom mt-16">
          <Reveal delay={0.1}>
            <p className="text-center text-text-muted text-[0.65rem] font-mono tracking-[0.22em] uppercase mb-7">
              Clients across leading institutions
            </p>
            <div className="overflow-hidden marquee-mask">
              <motion.div
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="flex gap-3 w-max"
                style={{ willChange: "transform" }}
              >
                {[...clients, ...clients].map((name, i) => (
                  <div
                    key={`${name}-${i}`}
                    className="flex-shrink-0 px-5 py-2.5 bg-surface border border-border rounded-xl text-text-muted text-xs font-display font-600 hover:border-border-light hover:text-text-secondary transition-all duration-200 whitespace-nowrap"
                  >
                    {name}
                  </div>
                ))}
              </motion.div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
