import type { Metadata } from "next";
import { Reveal, GlowOrbs } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { SITE_STATS } from "@/data/siteStats";
import { PRICING_FAQS } from "@/data/faq";
import {
  Compass, Hammer, Rocket, Check, ArrowRight, Shield, Clock, Users, Sparkles,
  FileText, Layers, Target, CalendarCheck, Search,
} from "lucide-react";
import { buildMetadata, buildBreadcrumbSchema } from "@/lib/seo";
import { generateFAQSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Pricing | AI Development Engagements | AIBrigade",
  description:
    "AIBrigade scopes every AI engagement to your data, compliance, and integration needs — from a fixed-fee Discovery sprint to a full production Build and ongoing Scale retainer.",
  path: "/pricing",
  keywords: ["AI development pricing", "AI consulting cost", "custom AI project pricing", "AI engagement pricing USA"],
});

const tiers = [
  {
    id: "discovery",
    icon: Compass,
    name: "Discovery",
    tagline: "Scope it before you fund it",
    price: "Starting at $15K",
    period: "fixed-fee, 2–4 weeks",
    color: "cyan" as const,
    featured: false,
    description:
      "A structured technical assessment that turns a vague AI idea into a scoped, de-risked roadmap.",
    features: [
      "Data & infrastructure readiness audit",
      "Use-case prioritization & ROI modeling",
      "Compliance & regulatory scoping (HIPAA / SOC 2 / AML-KYC)",
      "Architecture & technology recommendation",
      "Fixed-price Build proposal at the end",
    ],
    cta: "Start with Discovery",
  },
  {
    id: "build",
    icon: Hammer,
    name: "Build",
    tagline: "Most engagements start here",
    price: "Custom quote",
    period: "fixed-fee or milestone-based",
    color: "violet" as const,
    featured: true,
    description:
      "End-to-end design, development, and deployment of a production-grade AI system, scoped after Discovery.",
    features: [
      "Dedicated ML & full-stack engineering team",
      "Model development, evaluation & MLOps pipeline",
      "System integration with your existing stack",
      "Security, compliance & audit-trail built in",
      "Production deployment with monitoring",
      "Weekly milestone reviews with your team",
    ],
    cta: "Get a Build Quote",
  },
  {
    id: "scale",
    icon: Rocket,
    name: "Scale",
    tagline: "For systems already in production",
    price: "Monthly retainer",
    period: "sized to usage & change rate",
    color: "cyan" as const,
    featured: false,
    description:
      "Ongoing monitoring, retraining, and iteration to keep a live AI system accurate, compliant, and performant.",
    features: [
      "Model monitoring & drift detection",
      "Scheduled retraining & evaluation",
      "Incident response & on-call SLA",
      "Quarterly roadmap & feature iteration",
      "Compliance re-certification support",
    ],
    cta: "Discuss a Retainer",
  },
];

const palette = {
  cyan: {
    pill: "border-[rgba(0,212,255,0.35)] bg-[rgba(0,212,255,0.08)] text-[#00D4FF]",
    icon: "border-[rgba(0,212,255,0.4)] bg-[rgba(0,212,255,0.12)] text-[#00D4FF]",
    check: "text-[#00D4FF]",
    cardBorder: "rgba(0,212,255,0.22)",
    glow: "rgba(0,212,255,0.18)",
    glowStr: "#00D4FF",
  },
  violet: {
    pill: "border-[rgba(155,77,255,0.35)] bg-[rgba(155,77,255,0.08)] text-[#C084FC]",
    icon: "border-[rgba(155,77,255,0.4)] bg-[rgba(155,77,255,0.12)] text-[#C084FC]",
    check: "text-[#C084FC]",
    cardBorder: "rgba(155,77,255,0.4)",
    glow: "rgba(155,77,255,0.22)",
    glowStr: "#9B4DFF",
  },
};

const includedAll = [
  { icon: Shield, label: "Enterprise-grade security & compliance posture" },
  { icon: Users, label: "Dedicated engineering & delivery lead" },
  { icon: Clock, label: "Transparent milestone-based timelines" },
  { icon: Sparkles, label: "No open-ended hourly billing" },
];

export default function PricingPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Pricing", path: "/pricing" },
  ]);

  const faqSchema = generateFAQSchema(
    PRICING_FAQS.map((faq) => ({ question: faq.question, answer: faq.answer }))
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── Hero ── */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_-15%,rgba(0,212,255,0.13),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_55%_at_85%_85%,rgba(155,77,255,0.1),transparent)]" />
          <GlowOrbs />
          <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#050c1a] to-transparent" />
        </div>

        <div className="container-custom relative">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-10">
            {/* Left */}
            <div className="lg:w-1/2 max-w-xl">
              <Reveal>
                <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-[rgba(0,212,255,0.22)] bg-[rgba(0,212,255,0.05)] mb-10 backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] shadow-[0_0_8px_#00D4FF] animate-pulse" />
                  <span className="text-[10px] font-mono font-700 tracking-[0.38em] uppercase text-[#00D4FF]">
                    Pricing
                  </span>
                </div>

                <h1
                  className="font-display font-700 text-white mb-6 max-w-[13ch] sm:max-w-none"
                  style={{ fontSize: "clamp(2.1rem,4.6vw,3.6rem)", lineHeight: "1.14", letterSpacing: "-0.02em" }}
                >
                  Engagements scoped to{" "}
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
                    your risk, not a price list
                  </span>
                </h1>

                <p className="text-[rgba(232,243,255,0.68)] text-base sm:text-lg leading-[1.7] mb-10 max-w-[46ch]">
                  Fintech and healthcare AI systems carry too much regulatory and
                  integration variance for fixed SKUs. Every engagement is quoted
                  as a fixed fee after a scoped discovery — no open-ended hourly billing.
                </p>

                <div className="flex flex-wrap gap-4 mb-12">
                  <Button variant="primary" size="lg" href="/contact" iconLeft={<FileText className="w-4 h-4" />}>
                    Get a Quote
                  </Button>
                  <Button variant="outline" size="lg" href="#tiers" iconLeft={<Layers className="w-4 h-4" />}>
                    See Engagement Tiers
                  </Button>
                </div>

                <div className="flex flex-nowrap items-start gap-4 overflow-x-auto">
                  {[
                    { icon: Shield, title: "Risk-Aligned Scope", desc: "We assess risk, complexity, and integrations upfront." },
                    { icon: Target, title: "Fixed-Fee Certainty", desc: "Pay a clear, agreed fee after scoped discovery." },
                    { icon: CalendarCheck, title: "No Hourly Surprises", desc: "No open-ended billing. No budget drift." },
                  ].map(({ icon: Icon, title, desc }) => (
                    <div key={title} className="flex-1 min-w-[150px]">
                      <div className="w-8 h-8 rounded-full border border-[rgba(0,212,255,0.4)] bg-[rgba(0,212,255,0.1)] flex items-center justify-center mb-2.5">
                        <Icon className="w-3.5 h-3.5 text-[#00D4FF]" />
                      </div>
                      <div className="text-white text-sm font-display font-600 leading-tight mb-1">{title}</div>
                      <div className="text-[rgba(232,243,255,0.6)] text-xs leading-snug">{desc}</div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Right visual — sample engagement card */}
            <div className="lg:w-1/2 w-full hidden lg:block">
              <Reveal delay={0.12} direction="fade">
                <div
                  className="relative mx-auto max-w-md rounded-2xl p-8"
                  style={{
                    border: "1px solid rgba(0,212,255,0.22)",
                    background: "rgba(13,18,40,0.85)",
                    backdropFilter: "blur(20px)",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.45), 0 0 0 1px rgba(0,212,255,0.1), 0 0 60px rgba(0,212,255,0.08)",
                  }}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-7">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(0,212,255,0.35)] bg-[rgba(0,212,255,0.08)] text-[10px] font-mono font-700 tracking-[0.2em] uppercase text-[#00D4FF]">
                      Sample Engagement
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wide text-[rgba(232,243,255,0.45)]">
                      Build Tier
                    </span>
                  </div>

                  <div className="flex items-end justify-between mb-8">
                    <div>
                      <div className="font-display font-800 text-white text-4xl leading-none mb-1.5">$85K</div>
                      <div className="text-[rgba(232,243,255,0.55)] text-xs font-mono uppercase tracking-wide">
                        fixed-fee &middot; 12-week delivery
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-xl border border-[rgba(0,212,255,0.4)] bg-[rgba(0,212,255,0.1)] flex items-center justify-center flex-shrink-0"
                      style={{ boxShadow: "0 0 20px rgba(0,212,255,0.18)" }}>
                      <Hammer className="w-5 h-5 text-[#00D4FF]" />
                    </div>
                  </div>

                  <div className="h-px bg-[rgba(255,255,255,0.08)] mb-7" />

                  <div className="space-y-4 mb-8">
                    {[
                      { icon: Search, label: "Discovery & architecture sign-off", week: "Wk 1–2" },
                      { icon: Hammer, label: "Model build & system integration", week: "Wk 3–9" },
                      { icon: Rocket, label: "Production deployment & handoff", week: "Wk 10–12" },
                    ].map(({ icon: Icon, label, week }) => (
                      <div key={label} className="flex items-center gap-3.5">
                        <div className="w-8 h-8 rounded-lg border border-[rgba(0,212,255,0.3)] bg-[rgba(0,212,255,0.06)] flex items-center justify-center flex-shrink-0">
                          <Icon className="w-3.5 h-3.5 text-[#00D4FF]" />
                        </div>
                        <span className="text-[rgba(232,243,255,0.85)] text-sm flex-1">{label}</span>
                        <span className="text-[rgba(232,243,255,0.45)] text-xs font-mono flex-shrink-0">{week}</span>
                      </div>
                    ))}
                  </div>

                  <div className="h-px bg-[rgba(255,255,255,0.08)] mb-6" />

                  <div className="flex items-center gap-2.5 text-xs text-[rgba(232,243,255,0.6)]">
                    <Shield className="w-3.5 h-3.5 text-[#00D4FF] flex-shrink-0" />
                    Illustrative — every quote is scoped to your project after Discovery.
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── Tiers ── */}
      <section id="tiers" className="pb-24 relative">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {tiers.map((tier, i) => {
              const Icon = tier.icon;
              const p = palette[tier.color];
              return (
                <Reveal key={tier.id} delay={i * 0.08} className="h-full">
                  <div
                    className={`relative flex flex-col h-full rounded-2xl p-8 transition-all duration-300 ${
                      tier.featured ? "lg:-translate-y-3" : ""
                    }`}
                    style={{
                      border: `1px solid ${p.cardBorder}`,
                      background: tier.featured
                        ? "rgba(19,18,48,0.9)"
                        : "rgba(13,18,40,0.85)",
                      boxShadow: tier.featured
                        ? `0 20px 60px rgba(0,0,0,0.45), 0 0 0 1px ${p.cardBorder}, 0 0 60px ${p.glow}`
                        : `0 8px 32px rgba(0,0,0,0.35), 0 0 0 1px ${p.cardBorder}`,
                      backdropFilter: "blur(16px)",
                    }}
                  >
                    {tier.featured && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-[10px] font-mono font-700 tracking-[0.2em] uppercase text-white"
                        style={{ background: "linear-gradient(135deg,#9B4DFF,#00D4FF)", boxShadow: "0 4px 16px rgba(155,77,255,0.4)" }}>
                        Most Common
                      </div>
                    )}

                    <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-6 ${p.icon}`}
                      style={{ boxShadow: `0 0 20px ${p.glow}` }}>
                      <Icon className="w-5 h-5" />
                    </div>

                    <p className={`text-[10px] font-mono font-700 tracking-[0.22em] uppercase mb-2 ${p.check}`}>
                      {tier.tagline}
                    </p>
                    <h3 className="font-display font-700 text-white text-2xl mb-3">{tier.name}</h3>
                    <p className="text-[rgba(232,243,255,0.78)] text-sm leading-relaxed mb-6">
                      {tier.description}
                    </p>

                    <div className="mb-7">
                      <div className="font-display font-800 text-white text-3xl leading-none mb-1.5">
                        {tier.price}
                      </div>
                      <div className="text-[rgba(232,243,255,0.55)] text-xs font-mono uppercase tracking-wide">
                        {tier.period}
                      </div>
                    </div>

                    <div className="flex-1 space-y-3 mb-8">
                      {tier.features.map((f) => (
                        <div key={f} className="flex items-start gap-3">
                          <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${p.check}`} />
                          <span className="text-[rgba(232,243,255,0.85)] text-sm leading-snug">{f}</span>
                        </div>
                      ))}
                    </div>

                    <Button
                      variant={tier.featured ? "glow" : "outline"}
                      size="md"
                      href="/contact"
                      className="w-full justify-center"
                      iconRight={<ArrowRight className="w-4 h-4" />}
                    >
                      {tier.cta}
                    </Button>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── What's always included ── */}
      <section className="pb-24 relative">
        <div className="container-custom">
          <Reveal>
            <div
              className="rounded-2xl p-8 lg:p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
              style={{
                border: "1px solid rgba(255,255,255,0.09)",
                background: "rgba(13,18,40,0.75)",
                backdropFilter: "blur(16px)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
              }}
            >
              {includedAll.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-lg border border-[rgba(0,212,255,0.35)] bg-[rgba(0,212,255,0.08)] flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4.5 h-4.5 text-[#00D4FF]" />
                  </div>
                  <span className="text-[rgba(232,243,255,0.88)] text-sm leading-snug pt-1.5">{label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Trust stats ── */}
      <section className="pb-24 relative">
        <div className="container-custom">
          <Reveal>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { value: SITE_STATS.enterpriseClients, label: "Production Systems" },
                { value: SITE_STATS.valueDelivered, label: "Value Delivered" },
                { value: SITE_STATS.avgRoiLift, label: "Avg ROI Lift" },
                { value: SITE_STATS.deploymentRate, label: "Deployment Rate" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-white/10 bg-white/[0.02] px-5 py-6 text-center backdrop-blur-sm"
                >
                  <div className="font-display font-800 text-3xl text-[#00D4FF] mb-1.5">{s.value}</div>
                  <div className="text-[rgba(232,243,255,0.65)] text-xs font-mono uppercase tracking-wide">{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_0%,rgba(0,212,255,0.06),transparent)]" />
        </div>
        <div className="container-custom relative max-w-3xl mx-auto">
          <Reveal>
            <div className="text-center mb-14">
              <p className="text-[11px] font-mono font-600 tracking-[0.3em] uppercase text-[rgba(232,243,255,0.6)] mb-3">
                Common questions
              </p>
              <h2
                className="font-display font-700 text-white leading-[1.08]"
                style={{ fontSize: "clamp(1.8rem,3.6vw,2.6rem)" }}
              >
                Pricing, answered
              </h2>
            </div>
          </Reveal>
          <FAQAccordion items={PRICING_FAQS} />
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="relative py-36 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 border-t border-[rgba(255,255,255,0.07)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_65%_at_50%_50%,rgba(155,77,255,0.1),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_30%_30%_at_20%_30%,rgba(0,212,255,0.06),transparent)]" />
        </div>

        <div className="container-custom relative text-center max-w-2xl mx-auto">
          <Reveal>
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-[rgba(155,77,255,0.3)] bg-[rgba(155,77,255,0.07)] mb-8 shadow-[0_0_24px_rgba(155,77,255,0.12)]">
              <span className="w-2 h-2 rounded-full bg-[#C084FC] shadow-[0_0_10px_#C084FC]" />
              <span className="text-[11px] font-mono font-700 tracking-[0.28em] uppercase text-[#C084FC]">
                Let&apos;s scope your project
              </span>
            </div>

            <h2
              className="font-display font-700 text-white leading-[1.08] mb-6"
              style={{ fontSize: "clamp(2rem,4.5vw,3.4rem)" }}
            >
              Get a fixed-fee quote in one call
            </h2>

            <p className="text-[rgba(232,243,255,0.88)] text-lg leading-relaxed mb-10">
              Tell us about your Fintech or HealthTech AI challenge and our
              U.S.-based team will scope a proposal within 24 hours.
            </p>

            <Button variant="primary" size="xl" href="/contact" iconRight={<ArrowRight className="w-5 h-5" />}>
              Book a Discovery Call
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
