import type { Metadata } from "next";
import { Reveal, StaggerContainer, StaggerItem, GradientText, GlowOrbs } from "@/components/ui/Reveal";
import { Card, Badge, SectionLabel } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { services } from "@/data/services";
import {
  TrendingUp, Activity, Cpu, Zap, CheckCircle2, ArrowRight,
  Code2, Database, Shield, Layers, BarChart3, Microscope,
} from "lucide-react";

export const metadata: Metadata = {
  title: "AI Services",
  description:
    "From fintech AI to clinical intelligence — explore our full range of custom AI development services for regulated industries.",
};

const iconMap: Record<string, React.ElementType> = {
  TrendingUp, Activity, Cpu, Zap,
};

const techStackIcons: Record<string, React.ElementType> = {
  Python: Code2,
  TensorFlow: Layers,
  PyTorch: Layers,
  "AWS SageMaker": Database,
  "HL7 FHIR": Shield,
  MLflow: BarChart3,
  "Hugging Face": Microscope,
};

const colorStyles = {
  cyan: {
    section: "from-cyan/10 via-transparent",
    icon: "bg-cyan/10 border-cyan/20 text-cyan",
    badge: "cyan" as const,
    gradient: "text-gradient-cyan",
    dot: "bg-cyan",
    featureCheck: "text-cyan",
    border: "border-cyan/20",
    hover: "hover:border-cyan/30 hover:shadow-[0_0_30px_rgba(59,130,246,0.08)]",
    tag: "tag-cyan",
    number: "text-gradient-cyan",
    divider: "from-transparent via-cyan/20 to-transparent",
  },
  violet: {
    section: "from-violet/10 via-transparent",
    icon: "bg-violet/10 border-violet/20 text-violet-light",
    badge: "violet" as const,
    gradient: "text-gradient-violet",
    dot: "bg-violet-light",
    featureCheck: "text-violet-light",
    border: "border-violet/20",
    hover: "hover:border-violet/30 hover:shadow-[0_0_30px_rgba(100,116,139,0.08)]",
    tag: "tag-violet",
    number: "text-gradient-violet",
    divider: "from-transparent via-violet/20 to-transparent",
  },
  gold: {
    section: "from-gold/8 via-transparent",
    icon: "bg-gold/10 border-gold/20 text-gold",
    badge: "gold" as const,
    gradient: "text-gradient-gold",
    dot: "bg-gold",
    featureCheck: "text-gold",
    border: "border-gold/20",
    hover: "hover:border-gold/30 hover:shadow-[0_0_30px_rgba(245,158,11,0.08)]",
    tag: "tag-cyan",
    number: "text-gradient-gold",
    divider: "from-transparent via-gold/20 to-transparent",
  },
};

const industryImpact = [
  {
    industry: "Healthcare",
    focus: "Diagnostics & Drug Discovery",
    metric: "$150B in annual savings (US)",
  },
  {
    industry: "Finance",
    focus: "Autonomous Audits & Fraud Detection",
    metric: "88% of firms report revenue gain",
  },
  {
    industry: "Retail",
    focus: "Agentic Shopping & Personalization",
    metric: "58% active deployment rate",
  },
  {
    industry: "Manufacturing",
    focus: "Predictive Maintenance",
    metric: "Significant reduction in downtime",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(59,130,246,0.12),transparent)]" />
          <div className="absolute inset-0 bg-grid opacity-40" />
          <GlowOrbs />
        </div>
        <div className="container-custom relative text-center max-w-3xl mx-auto">
          <Reveal>
            <SectionLabel>AI Services</SectionLabel>
            <h1 className="heading-display text-display-lg text-text-primary mt-6 mb-6">
              AI built for industries where{" "}
              <GradientText variant="cyan">precision is non-negotiable</GradientText>
            </h1>
            <p className="text-text-secondary text-lg leading-relaxed">
              Four practice areas. Hundreds of technical capabilities. One standard: 
              production AI that creates measurable value from day one.
            </p>
          </Reveal>

          {/* Quick nav */}
          <Reveal delay={0.15} className="flex flex-wrap justify-center gap-3 mt-10">
            {services.map((s) => (
              <a
                key={s.id}
                href={`#${s.slug}`}
                className="px-4 py-2 bg-surface border border-border rounded-xl text-sm font-display font-500 text-text-secondary hover:border-cyan/30 hover:text-cyan transition-all duration-200"
              >
                {s.title}
              </a>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Industry impact */}
      <section className="pb-8 relative">
        <div className="container-custom">
          <Reveal className="mb-8 text-center">
            <h2 className="heading-lg text-display-sm text-text-primary mb-3">
              Industry impact in focus
            </h2>
            <p className="text-text-secondary text-base max-w-2xl mx-auto">
              Real market outcomes across the sectors where we deploy enterprise AI.
            </p>
          </Reveal>

          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {industryImpact.map((item) => (
                <div
                  key={item.industry}
                  className="rounded-xl border border-border bg-surface p-5 shadow-card"
                >
                  <p className="text-sm text-cyan font-display font-600 mb-1">
                    {item.industry}
                  </p>
                  <p className="text-sm text-text-primary mb-2">{item.focus}</p>
                  <p className="text-sm text-text-secondary">{item.metric}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Service sections */}
      {services.map((service, idx) => {
        const Icon = iconMap[service.icon] || Cpu;
        const styles = colorStyles[service.color];
        const isEven = idx % 2 === 0;

        return (
          <section
            key={service.id}
            id={service.slug}
            className="section-padding relative overflow-hidden"
          >
            {/* Background */}
            <div className="absolute inset-0">
              <div className={`absolute inset-0 bg-gradient-to-r ${styles.section} to-transparent opacity-40`} />
              {!isEven && <div className="absolute inset-0 bg-surface" />}
              <div className="absolute inset-0 bg-grid-sm opacity-25" />
              {idx > 0 && (
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
              )}
            </div>

            <div className="container-custom relative">
              {/* Header */}
              <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
                {/* Left: title block */}
                <Reveal className="lg:w-2/5 lg:sticky top-28 self-start">
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono font-500 tracking-wider uppercase mb-6 ${styles.border} bg-white/3`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${styles.dot}`} />
                    <span className={service.color === "cyan" ? "text-cyan" : service.color === "violet" ? "text-violet-light" : "text-gold"}>
                      {service.category}
                    </span>
                  </div>

                  <div className={`w-16 h-16 rounded-2xl border flex items-center justify-center mb-6 ${styles.icon}`}>
                    <Icon className="w-8 h-8" />
                  </div>

                  <h2 className={`heading-lg text-display-sm text-text-primary mb-4`}>
                    {service.title}
                  </h2>
                  <p className="text-text-secondary leading-relaxed mb-6 text-base">
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

                {/* Right: details */}
                <div className="lg:w-3/5 space-y-6">
                  {/* Capabilities */}
                  <Reveal delay={0.1}>
                    <div className={`bg-surface border border-border rounded-2xl p-7 shadow-card ${styles.hover} transition-all duration-300`}>
                      <h3 className="font-display font-700 text-text-primary text-lg mb-5">
                        Capabilities
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {service.features.map((feature) => (
                          <div key={feature} className="flex items-start gap-2.5">
                            <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${styles.featureCheck}`} />
                            <span className="text-text-secondary text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Reveal>

                  {/* Use Cases */}
                  <Reveal delay={0.15}>
                    <div className="bg-surface border border-border rounded-2xl p-7 shadow-card">
                      <h3 className="font-display font-700 text-text-primary text-lg mb-5">
                        Who We Build For
                      </h3>
                      <div className="space-y-3">
                        {service.useCases.map((useCase, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-3 p-3.5 bg-surface-2 rounded-xl border border-border group hover:border-border-light transition-colors"
                          >
                            <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 font-mono text-xs font-700 ${styles.icon}`}>
                              {String(i + 1).padStart(2, "0")}
                            </div>
                            <span className="text-text-secondary text-sm leading-relaxed">{useCase}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Reveal>

                  {/* Tech Stack */}
                  <Reveal delay={0.2}>
                    <div className="bg-surface border border-border rounded-2xl p-7 shadow-card">
                      <h3 className="font-display font-700 text-text-primary text-lg mb-5">
                        Technology Highlights
                      </h3>
                      <div className="flex flex-wrap gap-2.5">
                        {service.techHighlights.map((tech) => (
                          <span
                            key={tech}
                            className="px-3.5 py-1.5 bg-surface-2 border border-border rounded-xl text-sm font-mono text-text-secondary hover:border-border-light hover:text-text-primary transition-colors"
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

      {/* Bottom CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-surface border-t border-border" />
        <div className="absolute inset-0 bg-grid-sm opacity-25" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-violet/10 blur-[100px] rounded-full" />
        <div className="container-custom relative text-center max-w-3xl mx-auto">
          <Reveal>
            <h2 className="heading-lg text-display-md text-text-primary mb-5">
              Don't see your exact use case?
            </h2>
            <p className="text-text-secondary text-base mb-8 max-w-xl mx-auto leading-relaxed">
              If your problem involves data, predictions, or automation in Fintech or HealthTech, 
              we likely have the expertise — or the research contacts — to help.
            </p>
            <Button variant="primary" size="xl" href="/contact" iconRight={<ArrowRight className="w-4 h-4" />}>
              Tell Us About Your Challenge
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
