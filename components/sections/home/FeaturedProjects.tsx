"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import projectsData from "@/data/projects.json";
import type { Project } from "@/types";
import Link from "next/link";

const projects = (projectsData as Project[]).filter((p) => p.featured);
const AUTOPLAY_INTERVAL = 6000;

const industryStyles: Record<string, { badge: string; dot: string; label: string; accent: string }> = {
  fintech: {
    badge: "bg-cyan/10 text-cyan border-cyan/25",
    dot: "bg-cyan",
    label: "Fintech",
    accent: "from-cyan/20 to-cyan/5",
  },
  healthtech: {
    badge: "bg-violet/10 text-violet-light border-violet/25",
    dot: "bg-violet-light",
    label: "HealthTech",
    accent: "from-violet/20 to-violet/5",
  },
  "ai-platform": {
    badge: "bg-gold/10 text-gold border-gold/25",
    dot: "bg-gold",
    label: "AI Platform",
    accent: "from-gold/15 to-gold/5",
  },
};

const slideVariants = {
  enter: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? 48 : -48,
    scale: 0.98,
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.32, 0.72, 0, 1] },
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? -48 : 48,
    scale: 0.98,
    transition: { duration: 0.35, ease: [0.32, 0.72, 0, 1] },
  }),
};

export function FeaturedProjects() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const go = useCallback((dir: 1 | -1) => {
    setDirection(dir);
    setActive((a) => {
      const n = a + dir;
      if (n < 0) return projects.length - 1;
      if (n >= projects.length) return 0;
      return n;
    });
    setProgress(0);
  }, []);

  const goTo = useCallback((index: number) => {
    setDirection(index > active ? 1 : -1);
    setActive(index);
    setProgress(0);
  }, [active]);

  const startAutoplay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (progressRef.current) clearInterval(progressRef.current);

    setProgress(0);

    progressRef.current = setInterval(() => {
      setProgress((p) => Math.min(p + 100 / (AUTOPLAY_INTERVAL / 50), 100));
    }, 50);

    intervalRef.current = setInterval(() => {
      setDirection(1);
      setActive((a) => (a + 1) % projects.length);
      setProgress(0);
    }, AUTOPLAY_INTERVAL);
  }, []);

  const stopAutoplay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (progressRef.current) clearInterval(progressRef.current);
  }, []);

  useEffect(() => {
    if (isPlaying) {
      startAutoplay();
    } else {
      stopAutoplay();
    }
    return stopAutoplay;
  }, [isPlaying, active, startAutoplay, stopAutoplay]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === " ") setIsPlaying((p) => !p);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  // Touch/swipe
  const touchStartX = useRef(0);
  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) go(delta > 0 ? 1 : -1);
  };

  const project = projects[active];
  const style = industryStyles[project.industry] ?? industryStyles.fintech;

  return (
    <section
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-surface" />
        <div className="absolute inset-0 bg-grid opacity-35" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute top-1/4 left-[-6%] w-[500px] h-[500px] bg-cyan/[0.07] blur-[110px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 right-[-6%] w-[450px] h-[450px] bg-violet/[0.08] blur-[110px] rounded-full pointer-events-none" />
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

          {/* Controls */}
          <Reveal delay={0.1} className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={() => setIsPlaying((p) => !p)}
              className="w-9 h-9 rounded-xl bg-surface-2 border border-border hover:border-border-light text-text-muted hover:text-text-secondary flex items-center justify-center transition-all duration-200"
              aria-label={isPlaying ? "Pause autoplay" : "Resume autoplay"}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>

            <div className="w-px h-5 bg-border" />

            <span className="font-mono text-xs text-text-muted tabular-nums min-w-[3rem]">
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

        {/* Slide */}
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={active}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="grid grid-cols-1 lg:grid-cols-5 gap-5"
            >
              {/* Main card */}
              <div className="lg:col-span-3 bg-surface border border-border rounded-2xl p-7 lg:p-8 shadow-card relative overflow-hidden group">
                <div className={`absolute inset-0 bg-gradient-to-br ${style.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none`} />

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
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
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
        </div>

        {/* Navigation tabs + progress */}
        <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Slide tabs */}
          <div className="flex items-center gap-2 flex-1">
            {projects.map((p, i) => {
              const s = industryStyles[p.industry] ?? industryStyles.fintech;
              const isActive = i === active;
              return (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`relative flex-1 sm:flex-none h-11 px-4 rounded-xl border text-left transition-all duration-300 overflow-hidden ${
                    isActive
                      ? "bg-surface border-border-light shadow-card"
                      : "bg-transparent border-border hover:border-border-light hover:bg-surface/50"
                  }`}
                  aria-label={`Go to project: ${p.title}`}
                >
                  {/* Progress bar (active only) */}
                  {isActive && isPlaying && (
                    <motion.div
                      className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-cyan to-violet"
                      style={{ width: `${progress}%` }}
                    />
                  )}
                  {isActive && !isPlaying && (
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan to-violet opacity-40" />
                  )}

                  <div className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${isActive ? s.dot : "bg-border"}`} />
                    <span className={`text-[0.7rem] font-mono font-600 tracking-wider uppercase truncate ${isActive ? "text-text-primary" : "text-text-muted"}`}>
                      {p.title.split(" ").slice(0, 3).join(" ")}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
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
