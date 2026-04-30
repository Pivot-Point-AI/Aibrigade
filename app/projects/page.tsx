import type { Metadata } from "next";
import { Reveal, StaggerContainer, StaggerItem, GradientText, GlowOrbs } from "@/components/ui/Reveal";
import { Badge, SectionLabel } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import projectsData from "@/data/projects.json";
import type { Project } from "@/types";
import Link from "next/link";
import { ArrowRight, TrendingUp, Activity, Cpu } from "lucide-react";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Real AI deployments. Measurable outcomes. Explore how Ivy League Solutions has built AI systems across Fintech and HealthTech.",
};

const projects = projectsData as Project[];

const industryConfig: Record<string, { color: "cyan" | "violet" | "gold"; icon: React.ElementType; label: string }> = {
  fintech: { color: "cyan", icon: TrendingUp, label: "Fintech" },
  healthtech: { color: "violet", icon: Activity, label: "HealthTech" },
  "ai-platform": { color: "gold", icon: Cpu, label: "AI Platform" },
};

function ProjectCard({ project }: { project: Project }) {
  const config = industryConfig[project.industry];
  const Icon = config?.icon ?? Cpu;

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
                    project.industry === "fintech" ? "text-gradient-cyan" : "text-gradient-violet"
                  }`}
                >
                  {outcome.value}
                </div>
                <div className="text-text-muted text-xs leading-tight">{outcome.metric}</div>
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
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(100,116,139,0.18),transparent)]" />
          <div className="absolute inset-0 bg-grid opacity-40" />
          <GlowOrbs />
        </div>
        <div className="container-custom relative text-center max-w-3xl mx-auto">
          <Reveal>
            <SectionLabel>Case Studies</SectionLabel>
            <h1 className="heading-display text-display-lg text-text-primary mt-6 mb-6">
              AI that moved{" "}
              <GradientText variant="main">the needle</GradientText>
            </h1>
            <p className="text-text-secondary text-lg leading-relaxed">
              Real deployments. Real clients. Real outcomes. Every case study here 
              represents a production system — not a prototype, not a pilot.
            </p>
          </Reveal>

          {/* Summary stats */}
          <Reveal delay={0.15} className="flex flex-wrap justify-center gap-8 mt-10">
            {[
              { label: "Projects Delivered", value: projects.length + "+" },
              { label: "Fintech Systems", value: fintechProjects.length },
              { label: "HealthTech Systems", value: healthProjects.length },
            ].map(({ label, value }) => (
              <div key={label} className="text-center">
                <div className="font-display font-700 text-3xl text-gradient-cyan mb-0.5">{value}</div>
                <div className="text-text-muted text-sm">{label}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Fintech Projects */}
      <section className="section-padding relative overflow-hidden">
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(59,130,246,0.08),transparent)]" />
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
