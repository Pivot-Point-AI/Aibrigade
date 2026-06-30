import type { Metadata } from "next";
import { Reveal, StaggerContainer, StaggerItem, GlowOrbs } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { team } from "@/data/team";
import { SITE_STATS, GLOBAL_PROOF_LINE, GLOBAL_REACH_LINE } from "@/data/siteStats";
import {
  Target, Eye, Shield, Zap, Brain, Globe, ArrowRight,
  Linkedin, Twitter, CheckCircle2, Lock,
} from "lucide-react";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About AIBrigade | AI Engineering Team for U.S. Enterprises",
  description:
    "AIBrigade is an elite AI execution force for U.S. enterprises — from discovery sprint to production deployment. Meet the team behind our Fintech and HealthTech AI systems.",
  path: "/about",
  keywords: ["about AIBrigade", "AI engineering team", "AI consulting company USA", "fintech AI experts", "healthtech AI experts"],
});

const values = [
  { icon: Brain,  title: "Research-Grade Engineering",   desc: "We bring frontier AI methods to production — not yesterday's approaches wrapped in new names.", color: "#00D4FF" },
  { icon: Shield, title: "Interpretability by Default",  desc: "Especially in regulated industries, explainable AI isn't optional. Every system we build can be audited.", color: "#C084FC" },
  { icon: Target, title: "Outcome Obsession",            desc: "We measure success in business metrics, not model metrics. ROI is our north star.", color: "#00D4FF" },
  { icon: Globe,  title: "Domain Depth",                 desc: "Our practitioners have worked inside the industries we serve — not just consulted on them.", color: "#C084FC" },
  { icon: Zap,    title: "Speed Without Corners",        desc: "We ship fast by being prepared, not by being careless. Rigorous process enables rapid delivery.", color: "#00D4FF" },
  { icon: Lock,   title: "Security First",               desc: "HIPAA, SOC 2, and regulatory compliance aren't afterthoughts — they're baked in from day one.", color: "#C084FC" },
];

const milestones = [
  { year: "2021", event: "Founded", desc: "Two former ML researchers partner to bridge AI research and enterprise impact." },
  { year: "2022", event: "First Production System", desc: "Deployed a fraud detection model processing $200M+ in monthly transactions." },
  { year: "2023", event: "HealthTech Practice Launch", desc: "Expanded into clinical AI with HIPAA-compliant infrastructure expertise." },
  { year: "2024", event: "18 AI Systems Live", desc: "Serving clients from regional lenders to national hospital networks." },
];

const G = "linear-gradient(90deg,rgba(0,212,255,0.5),rgba(155,77,255,0.5),transparent)";

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-36 pb-24">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full blur-[160px]"
            style={{ background: "radial-gradient(ellipse,rgba(155,77,255,0.2) 0%,transparent 70%)" }} />
          <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] rounded-full blur-[130px]"
            style={{ background: "radial-gradient(ellipse,rgba(0,212,255,0.09) 0%,transparent 70%)" }} />
          <div className="absolute inset-0 opacity-35" style={{
            backgroundImage: "linear-gradient(rgba(0,212,255,0.055) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,255,0.055) 1px,transparent 1px)",
            backgroundSize: "64px 64px",
          }} />
          <GlowOrbs />
        </div>

        <div className="container-custom relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left */}
            <Reveal>
              <div className="flex items-center gap-3 mb-8">
                <div className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-[rgba(155,77,255,0.35)] bg-[rgba(155,77,255,0.08)]"
                  style={{ boxShadow: "0 0 20px rgba(155,77,255,0.15)" }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C084FC] animate-pulse" style={{ boxShadow: "0 0 8px #C084FC" }} />
                  <span className="text-[11px] font-mono font-700 tracking-[0.28em] uppercase text-[#C084FC]">About AI Brigade</span>
                </div>
                <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg,rgba(155,77,255,0.5),transparent)" }} />
              </div>

              <h1 className="font-display font-700 text-white leading-[1.05] mb-6 tracking-tight"
                style={{ fontSize: "clamp(2.2rem,4.8vw,4rem)" }}>
                We build AI that{" "}
                <span style={{
                  background: "linear-gradient(135deg,#00D4FF 0%,#9B4DFF 55%,#C084FC 100%)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  animation: "gradient-shift 7s linear infinite",
                }}>
                  earns trust
                </span>
                <br />by delivering results
              </h1>

              <p className="text-[rgba(232,243,255,0.90)] text-lg leading-relaxed mb-10 max-w-lg">
                Founded by ML researchers frustrated watching frontier AI sit on shelves —
                we exist to close the gap between what AI can do and what enterprises
                actually have running in production.
              </p>

              <div className="flex flex-wrap gap-4 mb-12">
                <Button variant="primary" size="md" href="/contact" iconRight={<ArrowRight className="w-4 h-4" />}>
                  Work With Us
                </Button>
                <Button variant="ghost" size="md" href="/projects">
                  View Case Studies
                </Button>
              </div>

              {/* Inline stats */}
              <div className="flex items-center gap-8 flex-wrap">
                {[
                  { value: SITE_STATS.projectsDelivered, label: "Systems delivered" },
                  { value: SITE_STATS.valueDelivered,    label: "Value created" },
                  { value: "Global",                     label: "Reach" },
                ].map(({ value, label }, i) => (
                  <div key={label} className="flex items-center gap-8">
                    {i > 0 && <div className="w-px h-8 bg-[rgba(255,255,255,0.1)]" />}
                    <div>
                      <div className="font-display font-700 text-white text-2xl leading-none mb-1">{value}</div>
                      <div className="text-[11px] font-mono tracking-wider text-[rgba(232,243,255,0.4)] uppercase">{label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Right — mission card */}
            <Reveal delay={0.12}>
              <div className="rounded-2xl overflow-hidden"
                style={{
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(13,18,40,0.82)",
                  backdropFilter: "blur(20px)",
                  boxShadow: "0 32px 80px rgba(0,0,0,0.45)",
                }}>
                {/* Card header */}
                <div className="px-7 py-5 border-b border-[rgba(255,255,255,0.07)] flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(155,77,255,0.15)", border: "1px solid rgba(155,77,255,0.35)" }}>
                    <Eye className="w-4 h-4 text-[#C084FC]" />
                  </div>
                  <span className="font-display font-700 text-white text-lg">Our Vision</span>
                </div>

                <div className="p-7">
                  <p className="text-[rgba(232,243,255,0.90)] text-sm leading-relaxed mb-6">
                    A world where the most important decisions in finance and healthcare are
                    augmented — not replaced — by AI systems that are transparent, reliable,
                    and genuinely aligned with human outcomes.
                  </p>
                  <div className="space-y-3 mb-8">
                    {[
                      "AI that clinicians and patients can trust",
                      "Financial models that regulators can inspect",
                      "Systems that improve the more they're used",
                      "Technology that creates access, not barriers",
                    ].map((point) => (
                      <div key={point} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-[#00D4FF] mt-0.5 flex-shrink-0" />
                        <span className="text-[rgba(232,243,255,0.7)] text-sm leading-snug">{point}</span>
                      </div>
                    ))}
                  </div>

                  {/* Proof line */}
                  <div className="pt-6 border-t border-[rgba(255,255,255,0.07)] flex items-center gap-3">
                    <div className="flex-1 h-px" style={{ background: G }} />
                    <span className="text-[10px] font-mono font-700 tracking-[0.2em] uppercase whitespace-nowrap"
                      style={{
                        background: "linear-gradient(135deg,#00D4FF,#fff,#C084FC)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}>
                      {GLOBAL_PROOF_LINE}
                    </span>
                    <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg,rgba(155,77,255,0.5),transparent)" }} />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg,transparent,rgba(0,212,255,0.3),transparent)" }} />
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: "linear-gradient(rgba(0,212,255,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,255,0.05) 1px,transparent 1px)",
            backgroundSize: "40px 40px",
          }} />
        </div>

        <div className="container-custom relative">
          <Reveal className="text-center mb-16">
            <p className="text-[11px] font-mono font-700 tracking-[0.3em] uppercase text-[rgba(232,243,255,0.75)] mb-4">
              Our Principles
            </p>
            <h2 className="font-display font-700 text-white leading-tight mb-4"
              style={{ fontSize: "clamp(1.6rem,3.5vw,2.6rem)" }}>
              Why the best teams{" "}
              <span style={{
                background: "linear-gradient(135deg,#00D4FF,#9B4DFF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>choose us</span>
            </h2>
            <p className="text-[rgba(232,243,255,0.88)] max-w-xl mx-auto text-base leading-relaxed">
              There are many AI shops. We're built differently — for industries where getting it wrong isn't an option.
            </p>
          </Reveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <StaggerItem key={v.title}>
                  <div className="group relative flex flex-col h-full rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                    style={{
                      border: `1px solid ${v.color === "#00D4FF" ? "rgba(0,212,255,0.18)" : "rgba(155,77,255,0.18)"}`,
                      background: "rgba(13,18,40,0.75)",
                      backdropFilter: "blur(16px)",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                    }}>
                    {/* Hover glow */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                      style={{ background: `radial-gradient(ellipse 70% 50% at 50% 0%,${v.color}15,transparent)` }} />
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 flex-shrink-0"
                      style={{
                        border: `1px solid ${v.color}40`,
                        background: `${v.color}14`,
                        boxShadow: `0 0 20px ${v.color}20`,
                        color: v.color,
                      }}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-700 text-white text-base mb-2 leading-snug">{v.title}</h3>
                    <p className="text-[rgba(232,243,255,0.88)] text-sm leading-relaxed">{v.desc}</p>
                    <div className="mt-5 h-px w-8 rounded-full transition-all duration-500 group-hover:w-full"
                      style={{ background: v.color, opacity: 0.5 }} />
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg,transparent,rgba(155,77,255,0.3),transparent)" }} />
          <div className="absolute inset-0 bg-[rgba(255,255,255,0.015)]" />
        </div>

        <div className="container-custom relative">
          <Reveal className="text-center mb-16">
            <p className="text-[11px] font-mono font-700 tracking-[0.3em] uppercase text-[rgba(232,243,255,0.75)] mb-4">Our Journey</p>
            <h2 className="font-display font-700 text-white leading-tight"
              style={{ fontSize: "clamp(1.6rem,3.5vw,2.6rem)" }}>
              Built for the long game
            </h2>
          </Reveal>

          <div className="relative max-w-2xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-4 sm:left-7 top-0 bottom-0 w-px"
              style={{ background: "linear-gradient(to bottom,transparent,rgba(0,212,255,0.35) 15%,rgba(155,77,255,0.35) 85%,transparent)" }} />

            {milestones.map((m, i) => (
              <Reveal key={m.year} delay={i * 0.1}>
                <div className="relative flex gap-8 mb-8 pl-14 sm:pl-20">
                  {/* Dot */}
                  <div className="absolute left-3 sm:left-5 top-5 w-5 h-5 rounded-full flex items-center justify-center -translate-x-1/2"
                    style={{
                      background: i % 2 === 0 ? "rgba(0,212,255,0.15)" : "rgba(155,77,255,0.15)",
                      border: `1.5px solid ${i % 2 === 0 ? "rgba(0,212,255,0.7)" : "rgba(155,77,255,0.7)"}`,
                      boxShadow: `0 0 16px ${i % 2 === 0 ? "rgba(0,212,255,0.4)" : "rgba(155,77,255,0.4)"}`,
                    }}>
                    <div className="w-2 h-2 rounded-full"
                      style={{ background: i % 2 === 0 ? "#00D4FF" : "#C084FC" }} />
                  </div>

                  {/* Card */}
                  <div className="flex-1 rounded-xl p-5 transition-all duration-300 hover:border-[rgba(255,255,255,0.12)]"
                    style={{
                      border: "1px solid rgba(255,255,255,0.08)",
                      background: "rgba(13,18,40,0.7)",
                      backdropFilter: "blur(12px)",
                    }}>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[10px] font-mono font-700 tracking-[0.2em] px-2.5 py-1 rounded-full"
                        style={{
                          background: i % 2 === 0 ? "rgba(0,212,255,0.1)" : "rgba(155,77,255,0.1)",
                          border: `1px solid ${i % 2 === 0 ? "rgba(0,212,255,0.3)" : "rgba(155,77,255,0.3)"}`,
                          color: i % 2 === 0 ? "#00D4FF" : "#C084FC",
                        }}>
                        {m.year}
                      </span>
                      <span className="font-display font-700 text-white text-base">{m.event}</span>
                    </div>
                    <p className="text-[rgba(232,243,255,0.88)] text-sm leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="relative py-24 overflow-hidden" id="team">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg,transparent,rgba(0,212,255,0.25),transparent)" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full blur-[140px]"
            style={{ background: "radial-gradient(ellipse,rgba(155,77,255,0.1) 0%,transparent 70%)" }} />
          <div className="absolute inset-0 opacity-15" style={{
            backgroundImage: "linear-gradient(rgba(0,212,255,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,255,0.05) 1px,transparent 1px)",
            backgroundSize: "40px 40px",
          }} />
        </div>

        <div className="container-custom relative">
          <Reveal className="text-center max-w-xl mx-auto mb-16">
            <p className="text-[11px] font-mono font-700 tracking-[0.3em] uppercase text-[rgba(232,243,255,0.75)] mb-4">The Team</p>
            <h2 className="font-display font-700 text-white leading-tight mb-4"
              style={{ fontSize: "clamp(1.6rem,3.5vw,2.6rem)" }}>
              An elite force of{" "}
              <span style={{
                background: "linear-gradient(135deg,#00D4FF,#9B4DFF,#C084FC)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>250+ engineers</span>
            </h2>
            <p className="text-[rgba(232,243,255,0.88)] text-base leading-relaxed">
              AI researchers, domain specialists, and battle-tested engineers — united
              by one mandate: ship production AI that creates real-world impact.
            </p>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-6 items-start">

            {/* Founder card */}
            {team.slice(0, 1).map((member) => (
              <Reveal key={member.id}>
                <div className="group relative rounded-2xl p-7 h-full overflow-hidden transition-all duration-300 hover:-translate-y-1"
                  style={{
                    border: "1px solid rgba(0,212,255,0.22)",
                    background: "rgba(13,18,40,0.82)",
                    backdropFilter: "blur(20px)",
                    boxShadow: "0 16px 48px rgba(0,0,0,0.35)",
                  }}>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: "radial-gradient(ellipse 80% 50% at 50% 0%,rgba(0,212,255,0.07),transparent)" }} />
                  <div className="absolute inset-x-0 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: "linear-gradient(90deg,transparent,#00D4FF,transparent)" }} />

                  <div className="flex items-start gap-5 mb-5">
                    <div className="w-16 h-16 rounded-2xl flex-shrink-0 flex items-center justify-center font-display font-700 text-2xl text-white"
                      style={{
                        background: "linear-gradient(135deg,rgba(0,212,255,0.25),rgba(155,77,255,0.2))",
                        border: "1px solid rgba(0,212,255,0.3)",
                        boxShadow: "0 0 24px rgba(0,212,255,0.15)",
                      }}>
                      {member.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-[10px] font-mono font-700 tracking-[0.25em] uppercase text-[#00D4FF] mb-1">Founder</div>
                      <h3 className="font-display font-700 text-white text-xl leading-tight mb-0.5">{member.name}</h3>
                      <div className="text-[11px] font-mono text-[rgba(232,243,255,0.82)] tracking-wider">{member.role}</div>
                    </div>
                  </div>

                  <p className="text-[rgba(232,243,255,0.6)] text-sm leading-relaxed mb-6">{member.bio}</p>

                  <div className="flex gap-2">
                    {member.linkedin && (
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-[11px] font-mono tracking-wider text-[rgba(232,243,255,0.5)] transition-all hover:text-[#00D4FF] hover:-translate-y-0.5"
                        style={{ border: "1px solid rgba(255,255,255,0.09)", background: "rgba(255,255,255,0.03)" }}>
                        <Linkedin className="w-3.5 h-3.5" /> LinkedIn
                      </a>
                    )}
                    {member.twitter && (
                      <a href={member.twitter} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-[11px] font-mono tracking-wider text-[rgba(232,243,255,0.5)] transition-all hover:text-[#00D4FF] hover:-translate-y-0.5"
                        style={{ border: "1px solid rgba(255,255,255,0.09)", background: "rgba(255,255,255,0.03)" }}>
                        <Twitter className="w-3.5 h-3.5" /> Twitter
                      </a>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}

            {/* 250+ Engineers panel */}
            <Reveal delay={0.1}>
              <div className="relative rounded-2xl overflow-hidden"
                style={{
                  border: "1px solid rgba(155,77,255,0.22)",
                  background: "rgba(13,18,40,0.82)",
                  backdropFilter: "blur(20px)",
                  boxShadow: "0 16px 48px rgba(0,0,0,0.35)",
                }}>

                {/* Large number hero */}
                <div className="relative px-8 pt-8 pb-6 text-center overflow-hidden">
                  <div className="absolute inset-0"
                    style={{ background: "radial-gradient(ellipse 80% 80% at 50% 50%,rgba(155,77,255,0.12),transparent)" }} />
                  <div className="relative">
                    <div className="font-display font-800 leading-none mb-2"
                      style={{
                        fontSize: "clamp(4rem,10vw,7rem)",
                        background: "linear-gradient(135deg,#fff 20%,#00D4FF 50%,#C084FC 80%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        textShadow: "none",
                        filter: "drop-shadow(0 0 40px rgba(0,212,255,0.3))",
                      }}>
                      250+
                    </div>
                    <div className="text-[11px] font-mono font-700 tracking-[0.35em] uppercase text-[rgba(232,243,255,0.5)] mb-1">
                      Engineers & Specialists
                    </div>
                  </div>
                </div>

                {/* Discipline breakdown */}
                <div className="grid grid-cols-2 gap-px mx-6 mb-6 rounded-xl overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.05)" }}>
                  {[
                    { label: "ML & AI Research",         value: "80+",  accent: "#00D4FF" },
                    { label: "Domain Specialists",        value: "60+",  accent: "#C084FC" },
                    { label: "Backend & MLOps",           value: "70+",  accent: "#00D4FF" },
                    { label: "Product & QA",              value: "40+",  accent: "#C084FC" },
                  ].map(({ label, value, accent }) => (
                    <div key={label} className="flex flex-col gap-1 px-5 py-4"
                      style={{ background: "rgba(13,18,40,0.9)" }}>
                      <span className="font-display font-700 text-lg leading-none" style={{ color: accent }}>{value}</span>
                      <span className="text-[10px] font-mono tracking-wider text-[rgba(232,243,255,0.75)] uppercase leading-tight">{label}</span>
                    </div>
                  ))}
                </div>

                {/* Proof line */}
                <div className="px-6 py-4 border-t border-[rgba(255,255,255,0.07)] flex items-center gap-3">
                  <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg,rgba(0,212,255,0.4),rgba(155,77,255,0.4),transparent)" }} />
                  <span className="text-[10px] font-mono font-700 tracking-[0.2em] uppercase whitespace-nowrap"
                    style={{
                      background: "linear-gradient(135deg,#00D4FF,#fff,#C084FC)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}>
                    {GLOBAL_REACH_LINE}
                  </span>
                  <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg,transparent,rgba(155,77,255,0.4),rgba(0,212,255,0.4))" }} />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-36 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg,transparent,rgba(0,212,255,0.3),transparent)" }} />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_65%_at_50%_50%,rgba(0,212,255,0.08),transparent)]" />
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: "linear-gradient(rgba(0,212,255,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,255,0.05) 1px,transparent 1px)",
            backgroundSize: "40px 40px",
          }} />
        </div>

        <div className="container-custom relative text-center max-w-2xl mx-auto">
          <Reveal>
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-[rgba(0,212,255,0.3)] bg-[rgba(0,212,255,0.07)] mb-8"
              style={{ boxShadow: "0 0 24px rgba(0,212,255,0.12)" }}>
              <span className="w-2 h-2 rounded-full bg-[#00D4FF] animate-pulse" style={{ boxShadow: "0 0 10px #00D4FF" }} />
              <span className="text-[11px] font-mono font-700 tracking-[0.28em] uppercase text-[#00D4FF]">Let&apos;s build together</span>
            </div>

            <h2 className="font-display font-700 text-white leading-[1.08] mb-6"
              style={{ fontSize: "clamp(1.8rem,4.5vw,3.4rem)" }}>
              Ready to work with us?
            </h2>
            <p className="text-[rgba(232,243,255,0.88)] text-lg leading-relaxed mb-10">
              Start with a free discovery call — we&apos;ll tell you honestly whether AI
              can solve your problem, and how.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="primary" size="lg" href="/contact" iconRight={<ArrowRight className="w-4 h-4" />}>
                Book a Discovery Call
              </Button>
              <Button variant="ghost" size="lg" href="/projects">
                View Our Work
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

