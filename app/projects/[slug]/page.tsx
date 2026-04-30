import type { Metadata } from "next";
import { notFound } from "next/navigation";
import projectsData from "@/data/projects.json";
import type { Project } from "@/types";
import { Reveal, GradientText, GlowOrbs } from "@/components/ui/Reveal";
import { Badge, SectionLabel } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, ArrowRight, CheckCircle2, TrendingUp, Activity, Star, Clock, User } from "lucide-react";
import Link from "next/link";

const projects = projectsData as Project[];

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: project.title,
    description: `${project.category} — ${project.problem.slice(0, 150)}`,
    openGraph: {
      title: `${project.title} | Ivy League Solutions`,
      description: project.solution.slice(0, 200),
    },
  };
}

const industryConfig: Record<string, { color: "cyan" | "violet"; label: string; icon: React.ElementType }> = {
  fintech: { color: "cyan", label: "Fintech", icon: TrendingUp },
  healthtech: { color: "violet", label: "HealthTech", icon: Activity },
};

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) notFound();

  const config = industryConfig[project.industry] ?? industryConfig.fintech;
  const Icon = config.icon;

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prevProject = projects[currentIndex - 1];
  const nextProject = projects[currentIndex + 1];

  return (
    <>
      {/* Back nav */}
      <div className="pt-24 pb-4">
        <div className="container-custom">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            Back to Case Studies
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="relative pt-8 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className={`absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,${
            project.industry === "fintech" ? "rgba(59,130,246,0.1)" : "rgba(100,116,139,0.12)"
          },transparent)]`} />
          <div className="absolute inset-0 bg-grid opacity-30" />
          <GlowOrbs />
        </div>

        <div className="container-custom relative max-w-4xl mx-auto">
          {/* Badges */}
          <Reveal className="flex flex-wrap gap-2 mb-6">
            <Badge variant={config.color} dot>{config.label}</Badge>
            <Badge variant="neutral">{project.category}</Badge>
            <Badge variant="neutral">{project.year}</Badge>
            <Badge variant="neutral">
              <Clock className="w-3 h-3 inline mr-1" />
              {project.duration}
            </Badge>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="heading-display text-display-md text-text-primary mb-6">
              {project.title}
            </h1>
          </Reveal>

          {/* Outcomes grid at top */}
          <Reveal delay={0.2}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
              {project.outcomes.map((outcome, i) => (
                <div key={i} className="bg-surface border border-border rounded-xl p-4 shadow-card">
                  <div className={`font-display font-700 text-2xl mb-1 ${i % 2 === 0 ? "text-gradient-cyan" : "text-gradient-violet"}`}>
                    {outcome.value}
                  </div>
                  <div className="text-text-primary text-xs font-600 font-display leading-tight">{outcome.metric}</div>
                  <div className="text-text-muted text-xs mt-0.5">{outcome.description}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Main content */}
      <section className="pb-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left: main narrative */}
            <div className="lg:col-span-2 space-y-8">
              {/* Challenge */}
              <Reveal>
                <div className="bg-surface border border-border rounded-2xl p-8 shadow-card">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-2 h-8 bg-gradient-to-b from-cyan to-transparent rounded-full" />
                    <h2 className="font-display font-700 text-xl text-text-primary">The Challenge</h2>
                  </div>
                  <p className="text-text-secondary leading-relaxed">{project.problem}</p>
                </div>
              </Reveal>

              {/* Solution */}
              <Reveal delay={0.1}>
                <div className="bg-surface border border-border rounded-2xl p-8 shadow-card">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-2 h-8 bg-gradient-to-b from-violet-light to-transparent rounded-full" />
                    <h2 className="font-display font-700 text-xl text-text-primary">Our Solution</h2>
                  </div>
                  <p className="text-text-secondary leading-relaxed">{project.solution}</p>
                </div>
              </Reveal>

              {/* Detailed outcomes */}
              <Reveal delay={0.15}>
                <div className="bg-surface border border-border rounded-2xl p-8 shadow-card">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-2 h-8 bg-gradient-to-b from-gold to-transparent rounded-full" />
                    <h2 className="font-display font-700 text-xl text-text-primary">Key Outcomes</h2>
                  </div>
                  <div className="space-y-5">
                    {project.outcomes.map((outcome, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <div className={`font-display font-700 text-2xl w-24 flex-shrink-0 ${i % 2 === 0 ? "text-gradient-cyan" : "text-gradient-violet"}`}>
                          {outcome.value}
                        </div>
                        <div>
                          <div className="font-display font-600 text-text-primary text-sm">{outcome.metric}</div>
                          <div className="text-text-muted text-sm mt-0.5">{outcome.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Testimonial */}
              {project.testimonial && (
                <Reveal delay={0.2}>
                  <div className="bg-gradient-to-br from-violet/12 to-cyan/5 border border-violet/20 rounded-2xl p-8">
                    <div className="flex items-center gap-1 mb-4">
                      {Array.from({ length: project.testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                      ))}
                    </div>
                    <blockquote className="text-text-primary text-lg font-display font-500 italic leading-relaxed mb-6">
                      "{project.testimonial.quote}"
                    </blockquote>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan/30 to-violet/30 flex items-center justify-center">
                        <span className="font-display font-700 text-text-primary">
                          {project.testimonial.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="font-display font-700 text-text-primary text-sm">{project.testimonial.name}</div>
                        <div className="text-text-muted text-xs">{project.testimonial.role} · {project.testimonial.company}</div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              )}
            </div>

            {/* Right sidebar */}
            <div className="space-y-6">
              {/* Project details */}
              <Reveal>
                <div className="bg-surface border border-border rounded-2xl p-6 shadow-card">
                  <h3 className="font-display font-700 text-text-primary mb-5">Project Details</h3>
                  <div className="space-y-4">
                    {[
                      { label: "Client", value: project.client },
                      { label: "Industry", value: config.label },
                      { label: "Duration", value: project.duration },
                      { label: "Year", value: String(project.year) },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex justify-between items-start gap-4">
                        <span className="text-text-muted text-sm">{label}</span>
                        <span className="text-text-secondary text-sm font-600 text-right">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Tech stack */}
              <Reveal delay={0.1}>
                <div className="bg-surface border border-border rounded-2xl p-6 shadow-card">
                  <h3 className="font-display font-700 text-text-primary mb-4">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="px-2.5 py-1 bg-surface-2 border border-border rounded-lg text-xs font-mono text-text-secondary hover:border-border-light transition-colors">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Tags */}
              <Reveal delay={0.15}>
                <div className="bg-surface border border-border rounded-2xl p-6 shadow-card">
                  <h3 className="font-display font-700 text-text-primary mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="neutral">{tag}</Badge>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* CTA */}
              <Reveal delay={0.2}>
                <div className="bg-gradient-to-br from-cyan/10 to-transparent border border-cyan/20 rounded-2xl p-6">
                  <h3 className="font-display font-700 text-text-primary mb-2">
                    Have a similar challenge?
                  </h3>
                  <p className="text-text-secondary text-sm mb-5">
                    Let's talk about how we can build the same outcomes for you.
                  </p>
                  <Button variant="primary" href="/contact" className="w-full" iconRight={<ArrowRight className="w-4 h-4" />}>
                    Start a Conversation
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Prev / Next navigation */}
      {(prevProject || nextProject) && (
        <section className="py-10 border-t border-border">
          <div className="container-custom">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              {prevProject ? (
                <Link
                  href={`/projects/${prevProject.slug}`}
                  className="group flex items-center gap-3 p-4 bg-surface border border-border rounded-xl hover:border-cyan/25 transition-all max-w-sm"
                >
                  <ArrowLeft className="w-4 h-4 text-text-muted group-hover:text-cyan transition-colors flex-shrink-0" />
                  <div>
                    <div className="text-xs text-text-muted mb-0.5">Previous</div>
                    <div className="font-display font-600 text-text-secondary group-hover:text-text-primary text-sm line-clamp-1 transition-colors">
                      {prevProject.title}
                    </div>
                  </div>
                </Link>
              ) : <div />}
              {nextProject && (
                <Link
                  href={`/projects/${nextProject.slug}`}
                  className="group flex items-center gap-3 p-4 bg-surface border border-border rounded-xl hover:border-cyan/25 transition-all max-w-sm ml-auto text-right"
                >
                  <div>
                    <div className="text-xs text-text-muted mb-0.5">Next</div>
                    <div className="font-display font-600 text-text-secondary group-hover:text-text-primary text-sm line-clamp-1 transition-colors">
                      {nextProject.title}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-cyan transition-colors flex-shrink-0" />
                </Link>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
