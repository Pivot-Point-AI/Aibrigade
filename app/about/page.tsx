import type { Metadata } from "next";
import { Reveal, StaggerContainer, StaggerItem, GradientText, GlowOrbs, Divider } from "@/components/ui/Reveal";
import { Card, Badge, SectionLabel, StatCard } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { team } from "@/data/team";
import {
  Target, Eye, Shield, Zap, Brain, Globe, Users, Award, ArrowRight,
  Linkedin, Twitter, CheckCircle2, TrendingUp, Activity, Lock,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Ivy League Solutions is a team of AI engineers, domain specialists, and operators building custom AI for Fintech and HealthTech.",
};

const values = [
  {
    icon: Brain,
    title: "Research-Grade Engineering",
    desc: "We bring frontier AI methods to production — not yesterday's approaches wrapped in new names.",
    color: "cyan",
  },
  {
    icon: Shield,
    title: "Interpretability by Default",
    desc: "Especially in regulated industries, explainable AI isn't optional. Every system we build can be audited.",
    color: "violet",
  },
  {
    icon: Target,
    title: "Outcome Obsession",
    desc: "We measure success in business metrics, not model metrics. ROI is our north star.",
    color: "cyan",
  },
  {
    icon: Globe,
    title: "Domain Depth",
    desc: "Our practitioners have worked inside the industries we serve — not just consulted on them.",
    color: "violet",
  },
  {
    icon: Zap,
    title: "Speed Without Corners",
    desc: "We ship fast by being prepared, not by being careless. Rigorous process enables rapid delivery.",
    color: "cyan",
  },
  {
    icon: Lock,
    title: "Security First",
    desc: "HIPAA, SOC 2, and regulatory compliance aren't afterthoughts — they're baked in from day one.",
    color: "violet",
  },
];

const milestones = [
  { year: "2021", event: "Founded in San Francisco", desc: "Two former ML researchers partner to bridge AI research and enterprise impact." },
  { year: "2022", event: "First Fintech Production System", desc: "Deployed a fraud detection model processing $200M+ in monthly transactions." },
  { year: "2023", event: "HealthTech Practice Launch", desc: "Expanded into clinical AI with HIPAA-compliant infrastructure expertise." },
  { year: "2024", event: "18 AI Systems in Production", desc: "Serving clients from regional lenders to national hospital networks." },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(100,116,139,0.2),transparent)]" />
          <div className="absolute inset-0 bg-grid opacity-40" />
          <GlowOrbs />
        </div>
        <div className="container-custom relative text-center max-w-4xl mx-auto">
          <Reveal>
            <div className="flex justify-center mb-6">
              <SectionLabel>About Ivy League Solutions</SectionLabel>
            </div>
            <h1 className="heading-display text-display-lg text-text-primary mb-6">
              We build AI that{" "}
              <span className="text-gradient-main">earns trust</span>
              <br />
              by delivering results
            </h1>
            <p className="text-text-secondary text-lg leading-relaxed max-w-2xl mx-auto">
              Founded by ML researchers who grew frustrated watching frontier AI sit on shelves,
              we exist to close the gap between what AI can do and what enterprises actually have 
              running in production.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-border bg-surface relative">
        <div className="absolute inset-0 bg-grid-sm opacity-30" />
        <div className="container-custom relative">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { value: "18+", label: "AI Systems in Production", color: "cyan" as const },
              { value: "$50M+", label: "Client Value Delivered", color: "violet" as const },
              { value: "6", label: "Active Industry Verticals", color: "cyan" as const },
              { value: "100%", label: "On-Time Delivery Rate", color: "violet" as const },
            ].map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.1}>
                <StatCard {...stat} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-sm opacity-20" />
        <div className="container-custom relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <div className="mb-5">
                <SectionLabel>Our Mission</SectionLabel>
              </div>
              <h2 className="heading-lg text-display-sm text-text-primary mb-6">
                Making frontier AI accessible to every enterprise
              </h2>
              <p className="text-text-secondary leading-relaxed mb-5">
                The best AI isn't at a handful of Silicon Valley giants. It belongs in 
                every hospital that can reduce patient harm, every lender that can make 
                fairer credit decisions, every financial institution that can protect 
                its customers better.
              </p>
              <p className="text-text-secondary leading-relaxed">
                Our mission is to make that possible — by building production-grade AI 
                systems that are engineered with the same rigor as the problems they solve, 
                and deployed with the care that high-stakes industries demand.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="bg-surface border border-border rounded-2xl p-8 shadow-card">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-violet/15 border border-violet/25 flex items-center justify-center">
                    <Eye className="w-5 h-5 text-violet-light" />
                  </div>
                  <h3 className="font-display font-700 text-xl text-text-primary">Our Vision</h3>
                </div>
                <p className="text-text-secondary leading-relaxed mb-6">
                  A world where the most important decisions in finance and healthcare are 
                  augmented — not replaced — by AI systems that are transparent, reliable, 
                  and genuinely aligned with human outcomes.
                </p>
                <div className="space-y-3">
                  {[
                    "AI that clinicians and patients can trust",
                    "Financial models that regulators can inspect",
                    "Systems that improve the more they're used",
                    "Technology that creates access, not barriers",
                  ].map((point) => (
                    <div key={point} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-cyan mt-0.5 flex-shrink-0" />
                      <span className="text-text-secondary text-sm">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Divider className="container-custom" />

      {/* Why Choose Us */}
      <section className="section-padding relative overflow-hidden" id="why-us">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan/6 blur-[120px] rounded-full" />
        <div className="container-custom relative">
          <Reveal className="text-center max-w-2xl mx-auto mb-14">
            <div className="flex justify-center mb-5">
              <SectionLabel>Our Differentiation</SectionLabel>
            </div>
            <h2 className="heading-lg text-display-md text-text-primary mb-4">
              Why the best teams{" "}
              <span className="text-gradient-cyan">choose us</span>
            </h2>
            <p className="text-text-secondary text-base leading-relaxed">
              There are many AI shops. We're built differently — for the industries 
              where getting it wrong isn't an option.
            </p>
          </Reveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <StaggerItem key={value.title}>
                  <div className={`h-full bg-surface border border-border rounded-2xl p-6 shadow-card hover:border-${value.color}/25 hover:shadow-card-hover transition-all duration-300 group`}>
                    <div className={`w-11 h-11 rounded-xl mb-5 flex items-center justify-center border transition-colors ${
                      value.color === "cyan"
                        ? "bg-cyan/10 border-cyan/20 text-cyan group-hover:bg-cyan/15"
                        : "bg-violet/10 border-violet/20 text-violet-light group-hover:bg-violet/15"
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-700 text-text-primary text-lg mb-2">{value.title}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed">{value.desc}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-surface relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-sm opacity-30" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="container-custom relative">
          <Reveal className="text-center mb-14">
            <div className="flex justify-center mb-5">
              <SectionLabel>Our Journey</SectionLabel>
            </div>
            <h2 className="heading-lg text-display-sm text-text-primary">
              Built for the long game
            </h2>
          </Reveal>

          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent lg:left-1/2" />

            {milestones.map((m, i) => (
              <Reveal key={m.year} delay={i * 0.12} className={`relative flex gap-8 mb-10 ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}>
                <div className={`flex-1 ${i % 2 === 0 ? "lg:text-right" : "lg:text-left"}`}>
                  <div className="bg-surface border border-border rounded-xl p-5 shadow-card inline-block w-full hover:border-cyan/25 transition-colors">
                    <div className="tag-cyan w-fit mb-3 ml-auto">{m.year}</div>
                    <h3 className="font-display font-700 text-text-primary mb-1">{m.event}</h3>
                    <p className="text-text-secondary text-sm">{m.desc}</p>
                  </div>
                </div>
                {/* Dot */}
                <div className="absolute left-6 lg:left-1/2 top-6 w-3 h-3 rounded-full bg-cyan border-2 border-background -translate-x-1/2 glow-cyan" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding relative overflow-hidden" id="team">
        <div className="absolute inset-0 bg-grid-sm opacity-20" />
        <div className="container-custom relative">
          <Reveal className="text-center max-w-xl mx-auto mb-14">
            <div className="flex justify-center mb-5">
              <SectionLabel variant="violet">The Team</SectionLabel>
            </div>
            <h2 className="heading-lg text-display-md text-text-primary mb-4">
              Researchers, engineers,{" "}
              <span className="text-gradient-violet">and operators</span>
            </h2>
            <p className="text-text-secondary text-base">
              We hire practitioners who've worked inside the industries we serve — 
              not just studied them.
            </p>
          </Reveal>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member) => (
              <StaggerItem key={member.id}>
                <div className="bg-surface border border-border rounded-2xl p-6 shadow-card hover:border-cyan/25 hover:shadow-card-hover transition-all duration-300 group h-full">
                  {/* Avatar */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan/25 to-violet/25 border border-border flex items-center justify-center mb-5 group-hover:from-cyan/35 group-hover:to-violet/35 transition-all">
                    <span className="font-display font-700 text-2xl text-text-primary">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className="font-display font-700 text-text-primary text-lg mb-0.5">
                    {member.name}
                  </h3>
                  <div className="text-cyan text-sm font-600 mb-3">{member.role}</div>
                  <p className="text-text-secondary text-sm leading-relaxed mb-5">{member.bio}</p>
                  <div className="flex items-center gap-2">
                    {member.linkedin && (
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer"
                        className="w-8 h-8 rounded-lg bg-surface-2 border border-border hover:border-cyan/30 hover:text-cyan flex items-center justify-center text-text-muted transition-all">
                        <Linkedin className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {member.twitter && (
                      <a href={member.twitter} target="_blank" rel="noopener noreferrer"
                        className="w-8 h-8 rounded-lg bg-surface-2 border border-border hover:border-cyan/30 hover:text-cyan flex items-center justify-center text-text-muted transition-all">
                        <Twitter className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(59,130,246,0.1),transparent)]" />
        <div className="container-custom relative text-center max-w-3xl mx-auto">
          <Reveal>
            <h2 className="heading-lg text-display-md text-text-primary mb-5">
              Ready to work with us?
            </h2>
            <p className="text-text-secondary text-base mb-8 max-w-xl mx-auto">
              Start with a free discovery call — we'll tell you honestly whether AI 
              can solve your problem, and how.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="primary" size="lg" href="/contact" iconRight={<ArrowRight className="w-4 h-4" />}>
                Book a Discovery Call
              </Button>
              <Button variant="secondary" size="lg" href="/projects">
                View Our Work
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
