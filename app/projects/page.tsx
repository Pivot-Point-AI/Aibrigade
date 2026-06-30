import type { Metadata } from "next";
import { Reveal, StaggerContainer, StaggerItem, GlowOrbs } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import projectsData from "@/data/projects.json";
import { SITE_STATS, GLOBAL_PROOF_LINE, GLOBAL_REACH_LINE } from "@/data/siteStats";
import type { Project } from "@/types";
import Link from "next/link";
import { ArrowRight, TrendingUp, Activity, Cpu, CreditCard, Tag, Landmark, ParkingSquare } from "lucide-react";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "AI Case Studies | Real Fintech & HealthTech Deployments",
  description:
    "Real AI deployments, measurable outcomes. Explore how AIBrigade has built production AI systems across Fintech and HealthTech for U.S. enterprises.",
  path: "/projects",
  keywords: ["AI case studies", "fintech AI case study", "healthtech AI case study", "AI deployment results", "AI ROI examples"],
});

const projects = projectsData as Project[];

const industryConfig: Record<string, { color: "cyan" | "violet" | "gold"; icon: React.ElementType<{ className?: string }>; label: string }> = {
  fintech: { color: "cyan", icon: TrendingUp, label: "Fintech" },
  healthtech: { color: "violet", icon: Activity, label: "HealthTech" },
  "ai-platform": { color: "gold", icon: Cpu, label: "AI Platform" },
};

function ProjectCard({ project }: { project: Project }) {
  const config = industryConfig[project.industry];
  const Icon: React.ElementType<{ className?: string }> = config?.icon ?? Cpu;

  return (
    <Link href={`/projects/${project.slug}`} className="block h-full group">
      <div className="h-full bg-surface border border-border rounded-2xl overflow-hidden shadow-card hover:border-cyan/25 hover:shadow-card-hover hover:scale-[1.01] transition-all duration-300">
        {/* Top accent bar */}
        <div
          className={`h-1 w-full ${
            project.industry === "fintech"
              ? "bg-gradient-to-r from-cyan to-cyan-dark"
              : project.industry === "healthtech"
              ? "bg-gradient-to-r from-violet to-violet-light"
              : "bg-gradient-to-r from-gold to-gold-light"
          }`}
        />

        <div className="p-7">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <Badge variant={config?.color ?? "neutral"} dot>
              {config?.label ?? project.industry}
            </Badge>
            <Badge variant="neutral">{project.year}</Badge>
            {project.featured && (
              <Badge variant="gold">Featured</Badge>
            )}
          </div>

          {/* Icon + Title */}
          <div className="flex items-start gap-4 mb-4">
            <div
              className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 border ${
                project.industry === "fintech"
                  ? "bg-cyan/10 border-cyan/20 text-cyan"
                  : "bg-violet/10 border-violet/20 text-violet-light"
              }`}
            >
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-700 text-text-primary text-lg leading-tight group-hover:text-gradient-cyan transition-all duration-300">
                {project.title}
              </h3>
              <div className="text-text-muted text-xs mt-1">{project.category}</div>
            </div>
          </div>

          {/* Problem excerpt */}
          <p className="text-text-secondary text-sm leading-relaxed mb-5 line-clamp-3">
            {project.problem}
          </p>

          {/* Key metrics */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {project.outcomes.slice(0, 2).map((outcome) => (
              <div key={outcome.metric} className="bg-surface-2 border border-border rounded-xl p-3">
                <div
                  className={`font-display font-700 text-xl mb-0.5 ${
                    project.industry === "fintech" ? "text-cyan" : "text-violet-light"
                  }`}
                >
                  {outcome.value}
                </div>
                <div className="text-text-secondary text-xs font-500 leading-tight">{outcome.metric}</div>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="text-[0.65rem] font-mono px-2 py-0.5 bg-surface-2 border border-border rounded text-text-muted"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-1.5 text-sm font-display font-600 text-text-muted group-hover:text-cyan transition-colors">
            Read Case Study
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function ProjectsPage() {
  const fintechProjects = projects.filter((p) => p.industry === "fintech");
  const healthProjects = projects.filter((p) => p.industry === "healthtech");

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-32 pb-20">

        {/* ── Background ── */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Primary violet bloom */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full blur-[160px]"
            style={{ background: "radial-gradient(ellipse, rgba(155,77,255,0.22) 0%, transparent 70%)" }} />
          {/* Cyan accent left */}
          <div className="absolute top-1/3 -left-32 w-[500px] h-[500px] rounded-full blur-[120px]"
            style={{ background: "radial-gradient(ellipse, rgba(0,212,255,0.1) 0%, transparent 70%)" }} />
          {/* Cyan accent right */}
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-[120px]"
            style={{ background: "radial-gradient(ellipse, rgba(0,212,255,0.08) 0%, transparent 70%)" }} />
          {/* Grid */}
          <div className="absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage: "linear-gradient(rgba(0,212,255,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,255,0.06) 1px,transparent 1px)",
              backgroundSize: "64px 64px",
            }} />
          {/* Horizontal scan line */}
          <div className="absolute inset-x-0 top-1/2 h-px"
            style={{ background: "linear-gradient(90deg,transparent 0%,rgba(0,212,255,0.12) 30%,rgba(155,77,255,0.15) 50%,rgba(0,212,255,0.12) 70%,transparent 100%)" }} />
        </div>

        <div className="container-custom relative">
          <Reveal>
            {/* ── Top: eyebrow + headline centered ── */}
            <div className="text-center max-w-3xl mx-auto mb-16">

              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-[rgba(155,77,255,0.3)] bg-[rgba(155,77,255,0.07)] mb-8"
                style={{ boxShadow: "0 0 28px rgba(155,77,255,0.15)" }}>
                <span className="w-2 h-2 rounded-full bg-[#C084FC] animate-pulse" style={{ boxShadow: "0 0 10px #C084FC" }} />
                <span className="text-[11px] font-mono font-700 tracking-[0.3em] uppercase text-[#C084FC]">Case Studies</span>
              </div>

              {/* Headline — controlled size, no line breaks on mobile */}
              <h1 className="font-display font-700 text-white leading-[1.08] mb-6 tracking-tight"
                style={{ fontSize: "clamp(2rem,4.5vw,3.8rem)" }}>
                AI that moved{" "}
                <span style={{
                  background: "linear-gradient(135deg,#00D4FF 0%,#9B4DFF 55%,#C084FC 100%)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  animation: "gradient-shift 7s linear infinite",
                }}>
                  the needle
                </span>
              </h1>

              <p className="text-[rgba(232,243,255,0.6)] text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-8">
                Real deployments. Real clients. Measurable outcomes. Every case
                study represents a live production system — not a prototype.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="primary" size="md" href="#fintech-projects" iconRight={<ArrowRight className="w-4 h-4" />}>
                  Explore Case Studies
                </Button>
                <Button variant="ghost" size="md" href="/contact">
                  Start Your Project
                </Button>
              </div>
            </div>

            {/* ── Stats panel ── */}
            <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden"
              style={{
                border: "1px solid rgba(255,255,255,0.09)",
                background: "rgba(13,18,40,0.8)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 24px 64px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.04) inset",
              }}>

              {/* Panel topbar */}
              <div className="flex items-center justify-between px-6 py-3.5 border-b border-[rgba(255,255,255,0.07)]">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    {["#FF5F57","#FEBC2E","#28C840"].map(c => (
                      <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c, opacity: 0.8 }} />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono text-[rgba(232,243,255,0.70)] tracking-wider ml-2">
                    brigade.ai / case-studies / outcomes
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] animate-pulse" style={{ boxShadow: "0 0 6px #00D4FF" }} />
                  <span className="text-[10px] font-mono text-[#00D4FF] tracking-[0.2em]">VERIFIED</span>
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 divide-x divide-y sm:divide-y-0 divide-[rgba(255,255,255,0.06)]">
                {[
                  { value: SITE_STATS.projectsDelivered, label: "Projects Delivered",  accent: "#00D4FF" },
                  { value: SITE_STATS.fintechSystems,    label: "Fintech Systems",      accent: "#00D4FF" },
                  { value: SITE_STATS.healthtechSystems, label: "HealthTech Systems",   accent: "#C084FC" },
                  { value: SITE_STATS.retailSystems,     label: "Retail & E-Commerce",  accent: "#C084FC" },
                  { value: SITE_STATS.valueDelivered,    label: "Value Delivered",       accent: "#00D4FF" },
                ].map(({ value, label, accent }) => (
                  <div key={label} className="flex flex-col items-center justify-center gap-1.5 py-8 px-4">
                    <span className="font-display font-800 leading-none"
                      style={{
                        fontSize: "clamp(1.5rem,2.8vw,2.1rem)",
                        color: accent,
                        textShadow: `0 0 28px ${accent}55`,
                      }}>
                      {value}
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-mono tracking-wider text-[rgba(232,243,255,0.75)] uppercase text-center leading-tight">
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Panel footer — global proof line */}
              <div className="relative px-8 py-5 border-t border-[rgba(255,255,255,0.07)] flex items-center justify-center gap-4 overflow-hidden">
                {/* Background glow */}
                <div className="absolute inset-0 opacity-40"
                  style={{ background: "linear-gradient(90deg,rgba(0,212,255,0.06),rgba(155,77,255,0.08),rgba(0,212,255,0.06))" }} />
                {/* Left line */}
                <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg,transparent,rgba(0,212,255,0.5))" }} />
                {/* Text */}
                <span className="relative font-mono font-700 tracking-[0.22em] uppercase whitespace-nowrap"
                  style={{
                    fontSize: "clamp(0.65rem,1.2vw,0.8rem)",
                    background: "linear-gradient(135deg,#00D4FF 0%,#E8F3FF 50%,#C084FC 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}>
                  {GLOBAL_PROOF_LINE}
                </span>
                {/* Right line */}
                <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg,rgba(155,77,255,0.5),transparent)" }} />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Major Projects ── */}
      <section className="relative py-28 overflow-hidden">
        {/* Background layer */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,212,255,0.055) 0%, transparent 70%)" }} />
          <div className="absolute inset-0 opacity-[0.28]"
            style={{
              backgroundImage: "linear-gradient(rgba(0,212,255,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,255,0.06) 1px,transparent 1px)",
              backgroundSize: "56px 56px",
            }} />
          <div className="absolute inset-x-0 top-0 h-px"
            style={{ background: "linear-gradient(90deg,transparent,rgba(0,212,255,0.35),rgba(155,77,255,0.25),transparent)" }} />
          <div className="absolute inset-x-0 bottom-0 h-px"
            style={{ background: "linear-gradient(90deg,transparent,rgba(155,77,255,0.2),rgba(0,212,255,0.15),transparent)" }} />
        </div>

        <div className="container-custom relative">
          {/* Section header */}
          <Reveal className="text-center mb-16">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-6"
              style={{ border: "1px solid rgba(0,212,255,0.3)", background: "rgba(0,212,255,0.07)", boxShadow: "0 0 24px rgba(0,212,255,0.1)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] animate-pulse" style={{ boxShadow: "0 0 8px #00D4FF" }} />
              <span className="text-[10px] font-mono font-700 tracking-[0.3em] uppercase text-[#00D4FF]">Flagship Work</span>
            </div>
            <h2 className="font-display font-700 text-white leading-tight mb-4"
              style={{ fontSize: "clamp(2rem,4vw,3rem)" }}>
              Major{" "}
              <span style={{
                background: "linear-gradient(135deg,#00D4FF 0%,#9B4DFF 55%,#C084FC 100%)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "gradient-shift 7s linear infinite",
              }}>
                Projects
              </span>
            </h2>
            <p className="text-[rgba(232,243,255,0.55)] text-base max-w-xl mx-auto leading-relaxed">
              Production-grade systems built for Pakistan&apos;s leading financial institutions and public infrastructure.
            </p>
          </Reveal>

          {/* Cards */}
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {([
              {
                icon: CreditCard,
                colorHex: "#00D4FF",
                num: "01",
                title: "Zindigi",
                desc: "Digital Wallet",
                detail: "End-to-end mobile wallet platform serving millions of users across Pakistan with instant transfers, bill payments, and merchant integrations.",
                stat: "5M+", statLabel: "Active Users",
              },
              {
                icon: Tag,
                colorHex: "#9B4DFF",
                num: "02",
                title: "G-Tag",
                desc: "E-Toll Plaza System",
                detail: "RFID-based automated toll collection deployed across national motorway plazas, eliminating cash queues and enabling seamless highway travel.",
                stat: "30+", statLabel: "Plazas Live",
              },
              {
                icon: Landmark,
                colorHex: "#00D4FF",
                num: "03",
                title: "BankIslami",
                desc: "Internet Banking",
                detail: "Full-featured retail internet banking portal with Shariah-compliant product flows, account management, and real-time transaction processing.",
                stat: "99.9%", statLabel: "Uptime SLA",
              },
              {
                icon: ParkingSquare,
                colorHex: "#9B4DFF",
                num: "04",
                title: "E-Parking",
                desc: "Smart Parking Solution",
                detail: "IoT-enabled smart parking system with real-time bay availability, automated ticketing, and mobile-first payment experience.",
                stat: "< 30s", statLabel: "Entry Time",
              },
            ] as const).map(({ icon: Icon, colorHex, num, title, desc, detail, stat, statLabel }) => (
              <StaggerItem key={title}>
                <div
                  className="group relative h-full rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5"
                  style={{
                    background: "rgba(10,13,28,0.92)",
                    border: `1px solid ${colorHex}18`,
                    boxShadow: "0 4px 32px rgba(0,0,0,0.4)",
                  }}
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: `radial-gradient(ellipse 90% 60% at 50% 0%, ${colorHex}0E, transparent)` }} />

                  {/* Top bar */}
                  <div className="h-[3px] w-full"
                    style={{ background: `linear-gradient(90deg, ${colorHex}80, ${colorHex}20)` }} />

                  <div className="p-6 flex flex-col h-full">
                    {/* Number + icon row */}
                    <div className="flex items-start justify-between mb-5">
                      <span className="text-[10px] font-mono font-700 tracking-[0.2em]"
                        style={{ color: `${colorHex}70` }}>{num}</span>
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center"
                        style={{
                          background: `${colorHex}12`,
                          border: `1px solid ${colorHex}28`,
                          color: colorHex,
                          boxShadow: `0 0 16px ${colorHex}20`,
                        }}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Title + category */}
                    <h3 className="font-display font-700 text-white text-xl leading-tight mb-1">{title}</h3>
                    <p className="text-[10px] font-mono font-600 tracking-[0.18em] uppercase mb-4"
                      style={{ color: `${colorHex}CC` }}>{desc}</p>

                    {/* Detail */}
                    <p className="text-[rgba(232,243,255,0.55)] text-sm leading-relaxed flex-1 mb-6">{detail}</p>

                    {/* Stat callout */}
                    <div className="rounded-xl px-4 py-3 flex items-center justify-between mt-auto"
                      style={{ background: `${colorHex}0A`, border: `1px solid ${colorHex}18` }}>
                      <span className="font-display font-700 text-lg" style={{ color: colorHex }}>{stat}</span>
                      <span className="text-[10px] font-mono tracking-wider text-[rgba(232,243,255,0.4)] uppercase">{statLabel}</span>
                    </div>
                  </div>

                  {/* Bottom glow line on hover */}
                  <div className="absolute inset-x-0 bottom-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `linear-gradient(90deg,transparent,${colorHex},transparent)` }} />
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Fintech Projects */}
      <section id="fintech-projects" className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-sm opacity-25" />
        <div className="container-custom relative">
          <Reveal className="mb-10">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-cyan/10 border border-cyan/20 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-cyan" />
                </div>
                <h2 className="font-display font-600 text-2xl text-text-primary leading-snug">Fintech AI</h2>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-cyan/20 to-transparent" />
              <Badge variant="cyan">{fintechProjects.length} projects</Badge>
            </div>
          </Reveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fintechProjects.map((project) => (
              <StaggerItem key={project.id}>
                <ProjectCard project={project} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* HealthTech Projects */}
      <section className="section-padding relative overflow-hidden bg-surface">
        <div className="absolute inset-0 bg-grid-sm opacity-25" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="container-custom relative">
          <Reveal className="mb-10">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-violet/10 border border-violet/20 flex items-center justify-center">
                  <Activity className="w-4 h-4 text-violet-light" />
                </div>
                <h2 className="font-display font-600 text-2xl text-text-primary leading-snug">HealthTech AI</h2>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-violet/20 to-transparent" />
              <Badge variant="violet">{healthProjects.length} projects</Badge>
            </div>
          </Reveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {healthProjects.map((project) => (
              <StaggerItem key={project.id}>
                <ProjectCard project={project} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(0,212,255,0.08),transparent)]" />
        <div className="container-custom relative text-center max-w-2xl mx-auto">
          <Reveal>
            <h2 className="heading-lg text-display-sm text-text-primary mb-4">
              Want to be our next case study?
            </h2>
            <p className="text-text-secondary text-base mb-8">
              Every project starts with a conversation. Tell us your challenge.
            </p>
            <Button variant="primary" size="xl" href="/contact" iconRight={<ArrowRight className="w-4 h-4" />}>
              Start Your Project
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}

