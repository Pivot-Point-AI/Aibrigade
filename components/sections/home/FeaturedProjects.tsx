"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import projectsData from "@/data/projects.json";
import type { Project } from "@/types";
import Link from "next/link";

const projects = (projectsData as Project[]).filter((p) => p.featured);

const industryStyles: Record<string, { badge: string; dot: string; label: string }> = {
  fintech: {
    badge: "bg-cyan/10 text-cyan border-cyan/25",
    dot: "bg-cyan",
    label: "Fintech",
  },
  healthtech: {
    badge: "bg-violet/10 text-violet-light border-violet/25",
    dot: "bg-violet-light",
    label: "HealthTech",
  },
  "ai-platform": {
    badge: "bg-gold/10 text-gold border-gold/25",
    dot: "bg-gold",
    label: "AI Platform",
  },
};

export function FeaturedProjects() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const go = (dir: 1 | -1) => {
    setDirection(dir);
    setActive((a) => {
      const n = a + dir;
      if (n < 0) return projects.length - 1;
      if (n >= projects.length) return 0;
      return n;
    });
  };

  const project = projects[active];
  const style = industryStyles[project.industry] ?? industryStyles.fintech;

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-surface" />
        <div className="absolute inset-0 bg-grid opacity-35" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute top-1/4 left-[-6%] w-[500px] h-[500px] bg-cyan/[0.07] blur-[110px] rounded-full" />
        <div className="absolute bottom-1/4 right-[-6%] w-[450px] h-[450px] bg-violet/[0.08] blur-[110px] rounded-full" />
      </div>

      <div className="container-custom relative">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <Reveal className="max-w-xl">
            <span className="tag-violet mb-5 inline-flex">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-light" />
              Case Studies
            </span>
            <h2 className="heading-lg text-display-md text-text-primary mb-3 mt-1">
              AI that moved the{" "}
              <span className="text-gradient-violet">needle</span>
            </h2>
            <p className="text-text-secondary text-base leading-relaxed">
              Real deployments. Real outcomes. From fraud detection to clinical AI —
              see what&apos;s possible when AI meets domain expertise.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="flex items-center gap-3 flex-shrink-0">
            {/* Counter */}
            <span className="font-mono text-sm text-text-muted mr-2">
              {String(active + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </span>
            <button
              onClick={() => go(-1)}
              className="w-10 h-10 rounded-xl bg-surface-2 border border-border hover:border-cyan/35 hover:bg-cyan/6 text-text-secondary hover:text-cyan flex items-center justify-center transition-all duration-200"
              aria-label="Previous project"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => go(1)}
              className="w-10 h-10 rounded-xl bg-surface-2 border border-border hover:border-cyan/35 hover:bg-cyan/6 text-text-secondary hover:text-cyan flex items-center justify-center transition-all duration-200"
              aria-label="Next project"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </Reveal>
        </div>

        {/* Project layout */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={active}
            custom={direction}
            initial={{ opacity: 0, x: direction * 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -30 }}
            transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="grid grid-cols-1 lg:grid-cols-5 gap-5"
          >
            {/* Main card */}
            <div className="lg:col-span-3 bg-surface border border-border rounded-2xl p-7 lg:p-8 shadow-card relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.025] to-transparent pointer-events-none rounded-2xl" />

              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className={`inline-flex items-center gap-1.5 text-[0.65rem] font-mono font-600 tracking-widest uppercase border rounded-full px-3 py-1 ${style.badge}`}>
                  <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${style.dot}`} />
                  {style.label}
                </span>
                <span className="inline-flex items-center text-[0.65rem] font-mono tracking-widest uppercase border rounded-full px-3 py-1 bg-white/5 border-white/10 text-text-muted">
                  {project.category}
                </span>
                <span className="inline-flex items-center text-[0.65rem] font-mono tracking-widest uppercase border rounded-full px-3 py-1 bg-white/5 border-white/10 text-text-muted">
                  {project.year}
                </span>
              </div>

              <h3 className="font-display font-600 text-2xl lg:text-[1.7rem] text-text-primary mb-5 leading-snug">
                {project.title}
              </h3>

              {/* Challenge / Solution */}
              <div className="space-y-5 mb-7">
                {[
                  { key: "Challenge", text: project.problem },
                  { key: "Solution", text: project.solution },
                ].map(({ key, text }) => (
                  <div key={key}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-px w-4 bg-cyan/40" />
                      <span className="text-[0.6rem] font-mono font-600 text-text-muted uppercase tracking-[0.18em]">
                        {key}
                      </span>
                    </div>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {text.slice(0, 210)}…
                    </p>
                  </div>
                ))}
              </div>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-1.5 mb-7">
                {project.techStack.slice(0, 7).map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-mono px-2.5 py-1 bg-surface-2 border border-border rounded-lg text-text-muted"
                  >
                    {tech}
                  </span>
                ))}
                {project.techStack.length > 7 && (
                  <span className="text-xs font-mono px-2.5 py-1 bg-surface-2 border border-border rounded-lg text-text-muted">
                    +{project.techStack.length - 7}
                  </span>
                )}
              </div>

              <Link
                href={`/projects/${project.slug}`}
                className="inline-flex items-center gap-2 text-sm font-display font-600 text-cyan hover:text-cyan-light transition-colors group/link"
              >
                View Full Case Study
                <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
              </Link>
            </div>

            {/* Right panel */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {/* Outcomes */}
              <div className="flex-1 bg-surface border border-border rounded-2xl p-6 shadow-card relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.025] to-transparent pointer-events-none rounded-2xl" />
                <div className="flex items-center gap-2 mb-6">
                  <div className="h-px w-4 bg-cyan/40" />
                  <span className="text-[0.6rem] font-mono font-600 text-text-muted uppercase tracking-[0.18em]">
                    Key Outcomes
                  </span>
                </div>
                <div className="space-y-5 relative">
                  {project.outcomes.map((outcome, i) => (
                    <div key={i}>
                      <div
                        className={`font-display font-700 text-[1.8rem] mb-0.5 ${
                          i % 2 === 0 ? "text-gradient-cyan" : "text-gradient-violet"
                        }`}
                      >
                        {outcome.value}
                      </div>
                      <div className="text-text-primary text-sm font-700 font-display">
                        {outcome.metric}
                      </div>
                      <div className="text-text-muted text-xs leading-relaxed mt-0.5">
                        {outcome.description}
                      </div>
                      {i < project.outcomes.length - 1 && (
                        <div className="mt-4 h-px bg-gradient-to-r from-border to-transparent" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Testimonial snippet */}
              {project.testimonial && (
                <div className="bg-gradient-to-br from-violet/8 to-cyan/4 border border-border/80 rounded-2xl p-5 relative overflow-hidden">
                  <div className="absolute top-4 right-4 text-border/40 text-5xl font-display leading-none select-none">
                    &ldquo;
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed mb-4 italic relative z-10">
                    &ldquo;{project.testimonial.quote.slice(0, 150)}…&rdquo;
                  </p>
                  <div className="relative z-10">
                    <div className="text-text-primary text-sm font-700 font-display">
                      {project.testimonial.name}
                    </div>
                    <div className="text-text-muted text-xs">
                      {project.testimonial.role}, {project.testimonial.company}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i > active ? 1 : -1); setActive(i); }}
              className={`transition-all duration-300 rounded-full ${
                i === active
                  ? "w-8 h-2 bg-cyan"
                  : "w-2 h-2 bg-border hover:bg-text-muted"
              }`}
              aria-label={`Project ${i + 1}`}
            />
          ))}
        </div>

        {/* CTA */}
        <Reveal className="text-center mt-12">
          <Button variant="secondary" size="lg" href="/projects" iconRight={<ArrowRight className="w-4 h-4" />}>
            View All Case Studies
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
