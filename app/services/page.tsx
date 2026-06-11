import type { Metadata } from "next";
import Link from "next/link";
import { Reveal, GradientText, GlowOrbs } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { services } from "@/data/services";
import { SITE_STATS } from "@/data/siteStats";
import {
  TrendingUp, Activity, Cpu, Zap, Workflow, CheckCircle2, ArrowRight, ArrowUpRight,
} from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { generateServiceSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "AI Development Services | Fintech & HealthTech AI",
  description:
    "Explore AIBrigade's AI development services for U.S. enterprises — fraud detection, clinical intelligence, automation agents, and custom machine learning for regulated industries.",
  path: "/services",
  keywords: ["AI development services", "fintech AI services", "healthcare AI services", "AI automation USA", "machine learning consulting"],
});

const iconMap: Record<string, React.ElementType<{ className?: string }>> = {
  TrendingUp, Activity, Cpu, Zap, Workflow,
};

const palette = {
  cyan: {
    pill:    "border-[rgba(0,212,255,0.35)] bg-[rgba(0,212,255,0.08)] text-[#00D4FF]",
    icon:    "border-[rgba(0,212,255,0.4)]  bg-[rgba(0,212,255,0.12)] text-[#00D4FF]",
    check:   "text-[#00D4FF]",
    cardBorder: "rgba(0,212,255,0.22)",
    cardHoverBorder: "rgba(0,212,255,0.5)",
    bar:     "bg-[#00D4FF]",
    glow:    "rgba(0,212,255,0.18)",
    glowStr: "#00D4FF",
    num:     "text-[#00D4FF]",
  },
  violet: {
    pill:    "border-[rgba(155,77,255,0.35)] bg-[rgba(155,77,255,0.08)] text-[#C084FC]",
    icon:    "border-[rgba(155,77,255,0.4)]  bg-[rgba(155,77,255,0.12)] text-[#C084FC]",
    check:   "text-[#C084FC]",
    cardBorder: "rgba(155,77,255,0.22)",
    cardHoverBorder: "rgba(155,77,255,0.5)",
    bar:     "bg-[#C084FC]",
    glow:    "rgba(155,77,255,0.18)",
    glowStr: "#C084FC",
    num:     "text-[#C084FC]",
  },
  gold: {
    pill:    "border-[rgba(245,158,11,0.35)] bg-[rgba(245,158,11,0.08)] text-[#F59E0B]",
    icon:    "border-[rgba(245,158,11,0.4)]  bg-[rgba(245,158,11,0.12)] text-[#F59E0B]",
    check:   "text-[#F59E0B]",
    cardBorder: "rgba(245,158,11,0.22)",
    cardHoverBorder: "rgba(245,158,11,0.5)",
    bar:     "bg-[#F59E0B]",
    glow:    "rgba(245,158,11,0.18)",
    glowStr: "#F59E0B",
    num:     "text-[#F59E0B]",
  },
};

const stats = [
  { value: SITE_STATS.enterpriseClients, label: "Production Systems" },
  { value: SITE_STATS.valueDelivered,    label: "Value Delivered" },
  { value: "Global",                     label: "Reach" },
  { value: SITE_STATS.avgRoiLift,        label: "Avg ROI Lift" },
];

export default function ServicesPage() {
  const servicesSchema = services.map((service) =>
    generateServiceSchema({
      title: service.title,
      shortDescription: service.shortDescription,
      slug: service.slug,
    })
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
      {/* ── Hero ── */}
      <section className="relative pt-36 pb-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_-10%,rgba(0,212,255,0.16),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_90%_80%,rgba(155,77,255,0.12),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_10%_70%,rgba(0,212,255,0.07),transparent)]" />
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,212,255,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,255,0.06) 1px,transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
          <GlowOrbs />
        </div>

        <div className="container-custom relative text-center max-w-4xl mx-auto">
          <Reveal>
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-[rgba(0,212,255,0.3)] bg-[rgba(0,212,255,0.07)] mb-8 shadow-[0_0_24px_rgba(0,212,255,0.12)]">
              <span className="w-2 h-2 rounded-full bg-[#00D4FF] shadow-[0_0_10px_#00D4FF] animate-pulse" />
              <span className="text-[11px] font-mono font-700 tracking-[0.3em] uppercase text-[#00D4FF]">
                AI Services
              </span>
            </div>

            {/* Headline */}
            <h1
              className="font-display font-700 text-white leading-[1.06] mb-7"
              style={{ fontSize: "clamp(2.6rem,6vw,4.8rem)" }}
            >
              AI built for industries where{" "}
              <span
                style={{
                  background: "linear-gradient(135deg,#00D4FF 0%,#9B4DFF 55%,#00D4FF 100%)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  animation: "gradient-shift 6s linear infinite",
                }}
              >
                precision is non-negotiable
              </span>
            </h1>

            <p className="text-[rgba(232,243,255,0.92)] text-xl leading-relaxed mb-12 max-w-2xl mx-auto">
              Five practice areas. Hundreds of technical capabilities. One standard —
              production AI that creates measurable value from day one.
            </p>

            {/* CTA row */}
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <Button variant="primary" size="lg" href="/contact" iconRight={<ArrowRight className="w-4 h-4" />}>
                Start a Project
              </Button>
              <Button variant="ghost" size="lg" href="#ai-fintech">
                Explore Services
              </Button>
            </div>

            {/* Stats bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.08)]"
              style={{ background: "rgba(255,255,255,0.04)" }}>
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="px-6 py-5 flex flex-col items-center gap-1"
                  style={{ background: "rgba(13,22,53,0.7)", backdropFilter: "blur(12px)" }}
                >
                  <span
                    className="font-display font-800 leading-none"
                    style={{
                      fontSize: "clamp(1.5rem,3vw,2rem)",
                      background: "linear-gradient(135deg,#fff 20%,#00D4FF 80%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {s.value}
                  </span>
                  <span className="text-[11px] font-mono tracking-wider text-[rgba(232,243,255,0.80)] uppercase">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Service cards grid ── */}
      <section className="pb-28 relative">
        <div className="container-custom">
          <Reveal>
            <div className="text-center mb-12">
              <p className="text-[11px] font-mono font-600 tracking-[0.3em] uppercase text-[rgba(232,243,255,0.75)] mb-3">
                What we deliver
              </p>
              <h2
                className="font-display font-700 text-white leading-tight"
                style={{ fontSize: "clamp(1.6rem,3.5vw,2.4rem)" }}
              >
                Five practice areas, one standard
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => {
              const Icon = iconMap[s.icon] ?? Cpu;
              const p = palette[s.color];
              return (
                <Reveal key={s.id} delay={i * 0.07}>
                  <Link
                    href={`#${s.slug}`}
                    className="group relative flex flex-col h-full rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1.5 overflow-hidden"
                    style={{
                      border: `1px solid ${p.cardBorder}`,
                      background: "rgba(13,18,40,0.85)",
                      boxShadow: `0 8px 32px rgba(0,0,0,0.35), 0 0 0 1px ${p.cardBorder}`,
                      backdropFilter: "blur(16px)",
                    }}
                  >
                    {/* Hover glow top edge */}
                    <div
                      className="absolute inset-x-0 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                      style={{ background: `linear-gradient(90deg, transparent, ${p.glowStr}, transparent)` }}
                    />
                    {/* Inner glow */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ background: `radial-gradient(ellipse 70% 50% at 50% 0%, ${p.glow}, transparent)` }}
                    />

                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-5 flex-shrink-0 transition-all duration-300 group-hover:scale-110 ${p.icon}`}
                      style={{ boxShadow: `0 0 20px ${p.glow}` }}>
                      <Icon className="w-5 h-5" />
                    </div>

                    {/* Category pill */}
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-mono font-600 tracking-[0.18em] uppercase mb-3 self-start ${p.pill}`}>
                      {s.category}
                    </div>

                    <h3 className="font-display font-700 text-white text-xl leading-tight mb-3 group-hover:text-[rgba(255,255,255,0.95)] transition-colors">
                      {s.title}
                    </h3>

                    <p className="text-[rgba(232,243,255,0.88)] text-sm leading-relaxed flex-1 mb-6">
                      {s.shortDescription}
                    </p>

                    {/* Arrow link */}
                    <div className="flex items-center gap-2 mt-auto">
                      <span className={`text-xs font-mono font-600 tracking-wider uppercase ${p.num}`}>
                        Explore
                      </span>
                      <ArrowUpRight className={`w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${p.num}`} />
                    </div>

                    {/* Bottom accent bar */}
                    <div className={`mt-4 h-[2px] w-10 rounded-full transition-all duration-500 group-hover:w-full ${p.bar} opacity-60 group-hover:opacity-100`} />
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Service detail sections ── */}
      {services.map((service, idx) => {
        const Icon = iconMap[service.icon] ?? Cpu;
        const p = palette[service.color];

        return (
          <section
            key={service.id}
            id={service.slug}
            className="relative py-28 overflow-hidden"
          >
            {/* Section background */}
            <div className="absolute inset-0 pointer-events-none">
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: `linear-gradient(90deg,transparent,${p.glowStr}44,transparent)` }}
              />
              <div
                className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full blur-[140px]"
                style={{ background: `radial-gradient(circle, ${p.glow} 0%, transparent 65%)` }}
              />
              <div
                className="absolute inset-0 opacity-15"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(0,212,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,255,0.04) 1px,transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />
            </div>

            <div className="container-custom relative">
              <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">

                {/* ── Left sticky ── */}
                <Reveal className="lg:w-5/12 lg:sticky top-28 self-start">
                  <div className="text-[11px] font-mono tracking-[0.32em] uppercase text-[rgba(232,243,255,0.72)] mb-7 flex items-center gap-3">
                    <span
                      className="inline-block w-8 h-px"
                      style={{ background: p.glowStr }}
                    />
                    {String(idx + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
                  </div>

                  <div
                    className={`w-16 h-16 rounded-2xl border flex items-center justify-center mb-7 ${p.icon}`}
                    style={{ boxShadow: `0 0 32px ${p.glow}` }}
                  >
                    <Icon className="w-8 h-8" />
                  </div>

                  <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-[10px] font-mono font-700 tracking-[0.2em] uppercase mb-6 ${p.pill}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${p.bar}`} />
                    {service.category}
                  </div>

                  <h2
                    className="font-display font-700 text-white leading-[1.08] mb-6"
                    style={{ fontSize: "clamp(1.9rem,3.5vw,2.9rem)" }}
                  >
                    {service.title}
                  </h2>

                  <p className="text-[rgba(232,243,255,0.88)] text-base leading-relaxed mb-9">
                    {service.longDescription}
                  </p>

                  <Button
                    variant={service.color === "violet" ? "glow" : "primary"}
                    size="md"
                    href="/contact"
                    iconRight={<ArrowRight className="w-4 h-4" />}
                  >
                    Discuss a Project
                  </Button>
                </Reveal>

                {/* ── Right detail cards ── */}
                <div className="lg:w-7/12 space-y-5">

                  {/* Capabilities */}
                  <Reveal delay={0.08}>
                    <div
                      className="rounded-2xl p-7 transition-all duration-300"
                      style={{
                        border: `1px solid rgba(255,255,255,0.09)`,
                        background: "rgba(13,18,40,0.75)",
                        backdropFilter: "blur(16px)",
                        boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
                      }}
                    >
                      <div className="flex items-center gap-3 mb-6">
                        <span
                          className="w-6 h-px"
                          style={{ background: p.glowStr }}
                        />
                        <h3 className="text-[11px] font-mono font-700 tracking-[0.25em] uppercase text-[rgba(232,243,255,0.82)]">
                          Capabilities
                        </h3>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {service.features.map((feature) => (
                          <div key={feature} className="flex items-start gap-3 group/item">
                            <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${p.check}`} />
                            <span className="text-[rgba(232,243,255,0.7)] text-sm leading-snug group-hover/item:text-[rgba(232,243,255,0.9)] transition-colors">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Reveal>

                  {/* Use cases */}
                  <Reveal delay={0.14}>
                    <div
                      className="rounded-2xl p-7"
                      style={{
                        border: `1px solid rgba(255,255,255,0.09)`,
                        background: "rgba(13,18,40,0.75)",
                        backdropFilter: "blur(16px)",
                        boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
                      }}
                    >
                      <div className="flex items-center gap-3 mb-6">
                        <span className="w-6 h-px" style={{ background: p.glowStr }} />
                        <h3 className="text-[11px] font-mono font-700 tracking-[0.25em] uppercase text-[rgba(232,243,255,0.82)]">
                          Who We Build For
                        </h3>
                      </div>
                      <div className="space-y-3">
                        {service.useCases.map((useCase, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-4 px-5 py-4 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.025)] hover:border-[rgba(255,255,255,0.12)] hover:bg-[rgba(255,255,255,0.04)] transition-all duration-200"
                          >
                            <span className={`text-xs font-mono font-700 flex-shrink-0 mt-0.5 ${p.num}`}>
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span className="text-[rgba(232,243,255,0.92)] text-sm leading-relaxed">
                              {useCase}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Reveal>

                  {/* Tech stack */}
                  <Reveal delay={0.2}>
                    <div
                      className="rounded-2xl p-7"
                      style={{
                        border: `1px solid rgba(255,255,255,0.09)`,
                        background: "rgba(13,18,40,0.75)",
                        backdropFilter: "blur(16px)",
                        boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
                      }}
                    >
                      <div className="flex items-center gap-3 mb-6">
                        <span className="w-6 h-px" style={{ background: p.glowStr }} />
                        <h3 className="text-[11px] font-mono font-700 tracking-[0.25em] uppercase text-[rgba(232,243,255,0.82)]">
                          Technology Stack
                        </h3>
                      </div>
                      <div className="flex flex-wrap gap-2.5">
                        {service.techHighlights.map((tech) => (
                          <span
                            key={tech}
                            className="px-4 py-2 rounded-lg border border-[rgba(255,255,255,0.09)] bg-[rgba(255,255,255,0.04)] text-[rgba(232,243,255,0.92)] text-xs font-mono hover:border-[rgba(255,255,255,0.18)] hover:text-[rgba(232,243,255,0.9)] hover:bg-[rgba(255,255,255,0.07)] transition-all duration-200 cursor-default"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* ── Bottom CTA ── */}
      <section className="relative py-36 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 border-t border-[rgba(255,255,255,0.07)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_65%_at_50%_50%,rgba(155,77,255,0.1),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_30%_30%_at_20%_30%,rgba(0,212,255,0.06),transparent)]" />
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,212,255,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,255,0.05) 1px,transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="container-custom relative text-center max-w-2xl mx-auto">
          <Reveal>
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-[rgba(155,77,255,0.3)] bg-[rgba(155,77,255,0.07)] mb-8 shadow-[0_0_24px_rgba(155,77,255,0.12)]">
              <span className="w-2 h-2 rounded-full bg-[#C084FC] shadow-[0_0_10px_#C084FC]" />
              <span className="text-[11px] font-mono font-700 tracking-[0.28em] uppercase text-[#C084FC]">
                Let&apos;s build together
              </span>
            </div>

            <h2
              className="font-display font-700 text-white leading-[1.08] mb-6"
              style={{ fontSize: "clamp(2rem,4.5vw,3.4rem)" }}
            >
              Don&apos;t see your exact use case?
            </h2>

            <p className="text-[rgba(232,243,255,0.88)] text-lg leading-relaxed mb-10">
              If your problem involves data, predictions, or automation in any regulated industry,
              we likely have the expertise. Tell us about your challenge.
            </p>

            <Button variant="primary" size="xl" href="/contact" iconRight={<ArrowRight className="w-5 h-5" />}>
              Tell Us About Your Challenge
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
