"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { TrendingUp, Activity, Cpu, Zap, ArrowRight, CheckCircle2 } from "lucide-react";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { services } from "@/data/services";

const iconMap: Record<string, React.ElementType> = {
  TrendingUp, Activity, Cpu, Zap,
};

const colorConfig = {
  cyan: {
    iconBg: "bg-cyan/10 border-cyan/25 text-cyan",
    check: "text-cyan",
    glow: "rgba(59,130,246,0.12)",
    border: "rgba(59,130,246,0.3)",
    dot: "bg-cyan",
    badge: "bg-cyan/10 text-cyan border-cyan/25",
    scanLine: "from-cyan/0 via-cyan/20 to-cyan/0",
  },
  violet: {
    iconBg: "bg-violet/10 border-violet/25 text-violet-light",
    check: "text-violet-light",
    glow: "rgba(100,116,139,0.12)",
    border: "rgba(100,116,139,0.28)",
    dot: "bg-violet-light",
    badge: "bg-violet/10 text-violet-light border-violet/25",
    scanLine: "from-violet/0 via-violet/20 to-violet/0",
  },
  gold: {
    iconBg: "bg-gold/10 border-gold/25 text-gold",
    check: "text-gold",
    glow: "rgba(245,158,11,0.12)",
    border: "rgba(245,158,11,0.28)",
    dot: "bg-gold",
    badge: "bg-gold/10 text-gold border-gold/25",
    scanLine: "from-gold/0 via-gold/20 to-gold/0",
  },
};

function TiltCard({
  children,
  className,
  glowColor,
  borderColor,
}: {
  children: React.ReactNode;
  className?: string;
  glowColor: string;
  borderColor: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-80, 80], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-80, 80], [-8, 8]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{
        boxShadow: `0 20px 60px ${glowColor}, 0 0 0 1px ${borderColor}`,
        scale: 1.015,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ServicesOverview() {
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

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-sm opacity-50" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute top-1/2 right-[-8%] w-[600px] h-[600px] bg-violet/[0.07] blur-[130px] rounded-full" />
        <div className="absolute top-1/4 left-[-8%] w-[400px] h-[400px] bg-cyan/[0.05] blur-[100px] rounded-full" />
      </div>

      <div className="container-custom relative">
        {/* Header */}
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center mb-5">
            <span className="tag-cyan">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
              What We Build
            </span>
          </div>
          <h2 className="heading-lg text-display-md text-text-primary mb-4">
            AI engineered for{" "}
            <span className="text-gradient-cyan">real-world impact</span>
          </h2>
          <p className="text-text-secondary text-base leading-relaxed max-w-xl mx-auto">
            We don&apos;t build demos. We build production systems that generate measurable
            ROI from day one — backed by rigorous engineering and deep domain expertise.
          </p>
        </Reveal>

        <Reveal className="mb-12">
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

        {/* Services grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
          {services.map((service) => {
            const Icon = iconMap[service.icon] || Cpu;
            const colors = colorConfig[service.color as keyof typeof colorConfig] ?? colorConfig.cyan;

            return (
              <StaggerItem key={service.id}>
                <Link href={`/services#${service.slug}`} className="block h-full group">
                  <TiltCard
                    glowColor={colors.glow}
                    borderColor={colors.border}
                    className="h-full relative bg-surface border border-border rounded-2xl p-7 overflow-hidden shadow-card transition-all duration-300"
                  >
                    {/* Interior gradient on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl" />

                    {/* Top row */}
                    <div className="flex items-center justify-between mb-5 relative z-10">
                      <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${colors.iconBg} transition-all duration-300 group-hover:scale-110`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className={`inline-flex items-center gap-1.5 text-[0.65rem] font-mono font-600 tracking-widest uppercase border rounded-full px-3 py-1 ${colors.badge}`}>
                        <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${colors.dot}`} />
                        {service.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display font-600 text-[1.1rem] text-text-primary mb-2.5 relative z-10 leading-snug group-hover:text-cyan transition-colors duration-300">
                      {service.title}
                    </h3>

                    {/* Short desc */}
                    <p className="text-text-secondary text-sm leading-relaxed mb-5 relative z-10">
                      {service.shortDescription}
                    </p>

                    {/* Feature list */}
                    <ul className="space-y-2 mb-6 relative z-10">
                      {service.features.slice(0, 4).map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5 text-sm text-text-secondary">
                          <CheckCircle2 className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${colors.check}`} />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* CTA link */}
                    <div className="flex items-center gap-1.5 text-sm font-display font-600 text-text-muted group-hover:text-cyan transition-colors duration-200 relative z-10">
                      Explore this service
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </TiltCard>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Bottom CTA */}
        <Reveal className="text-center">
          <Button variant="outline" size="lg" href="/services" iconRight={<ArrowRight className="w-4 h-4" />}>
            Explore All Services
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
