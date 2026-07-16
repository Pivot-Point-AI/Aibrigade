import type { Metadata } from "next";
import Link from "next/link";
import { Reveal, StaggerContainer, StaggerItem, GlowOrbs } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { getPublishedPosts } from "@/lib/blog";
import { formatDate, truncate } from "@/lib/utils";
import { ArrowRight, Calendar, Clock, Newspaper, FileText, Tags, TrendingUp } from "lucide-react";
import { buildMetadata, buildBreadcrumbSchema } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  title: "Blog | AI Engineering Insights from AIBrigade",
  description:
    "Perspectives on production AI, fintech and healthtech engineering, and lessons from deploying machine learning systems for regulated enterprises.",
  path: "/blog",
  keywords: ["AI blog", "fintech AI insights", "healthtech AI insights", "machine learning engineering blog"],
});

function readingTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

const DOTS = [
  [4, 12], [10, 28], [18, 8], [26, 34], [6, 46], [15, 58], [22, 68], [8, 78],
  [92, 14], [86, 30], [95, 22], [78, 44], [90, 56], [83, 68], [96, 76], [88, 88],
];

function WaveField({ side }: { side: "left" | "right" }) {
  const flip = side === "right";
  return (
    <svg
      className={`absolute top-0 h-full w-[46%] ${flip ? "right-0 scale-x-[-1]" : "left-0"}`}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`wave-grad-${side}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#9B4DFF" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      {[8, 20, 32, 44].map((y, i) => (
        <path
          key={y}
          d={`M -10 ${y + 25} C 20 ${y - 5}, 40 ${y + 40}, 110 ${y - 10}`}
          fill="none"
          stroke={`url(#wave-grad-${side})`}
          strokeWidth={0.25}
          opacity={0.5 - i * 0.08}
        />
      ))}
      {DOTS.slice(0, 8).map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={0.5} fill="#00D4FF" opacity={0.5} />
      ))}
    </svg>
  );
}

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  const categories = Array.from(new Set(posts.map((p) => p.category)));
  const avgReadTime = posts.length
    ? Math.max(1, Math.round(posts.reduce((sum, p) => sum + readingTime(p.content), 0) / posts.length))
    : 0;
  const latestDate = posts[0] ? formatDate(posts[0].publishedAt ?? posts[0].createdAt) : "—";

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-36 pb-20">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full blur-[160px]"
            style={{ background: "radial-gradient(ellipse, rgba(0,212,255,0.2) 0%, transparent 70%)" }}
          />
          <WaveField side="left" />
          <WaveField side="right" />
          <GlowOrbs className="opacity-40" />
        </div>

        <div className="container-custom relative">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div
                className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-[rgba(0,212,255,0.3)] bg-[rgba(0,212,255,0.07)] mb-8"
                style={{ boxShadow: "0 0 28px rgba(0,212,255,0.15)" }}
              >
                <span className="w-2 h-2 rounded-full bg-[#00D4FF] animate-pulse" style={{ boxShadow: "0 0 10px #00D4FF" }} />
                <span className="text-[11px] font-mono font-700 tracking-[0.3em] uppercase text-[#00D4FF]">Insights</span>
              </div>

              <h1
                className="font-display font-700 text-white leading-[1.08] mb-6 tracking-tight"
                style={{ fontSize: "clamp(2.1rem,4.5vw,3.6rem)" }}
              >
                The{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg,#00D4FF 0%,#9B4DFF 55%,#C084FC 100%)",
                    backgroundSize: "200% auto",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    animation: "gradient-shift 7s linear infinite",
                  }}
                >
                  AIBrigade
                </span>{" "}
                Blog
              </h1>

              <p className="text-[rgba(232,243,255,0.6)] text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
                Engineering notes, product updates, and lessons learned from building
                production AI systems for fintech and healthtech.
              </p>
            </div>

            {/* ── Stats panel ── */}
            <div
              className="max-w-5xl mx-auto rounded-2xl overflow-hidden"
              style={{
                border: "1px solid rgba(255,255,255,0.09)",
                background: "rgba(13,18,40,0.8)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 24px 64px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.04) inset",
              }}
            >
              <div className="flex items-center justify-between px-6 py-3.5 border-b border-[rgba(255,255,255,0.07)]">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
                      <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c, opacity: 0.8 }} />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono text-[rgba(232,243,255,0.70)] tracking-wider ml-2">
                    brigade.ai / blog / insights
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] animate-pulse" style={{ boxShadow: "0 0 6px #00D4FF" }} />
                  <span className="text-[10px] font-mono text-[#00D4FF] tracking-[0.2em]">LIVE</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-[rgba(255,255,255,0.06)]">
                {[
                  { icon: FileText, value: String(posts.length), label: "Articles", accent: "#00D4FF" },
                  { icon: Tags, value: String(categories.length), label: "Categories", accent: "#C084FC" },
                  { icon: Clock, value: `${avgReadTime} min`, label: "Avg Read", accent: "#00D4FF" },
                  { icon: TrendingUp, value: latestDate, label: "Latest Update", accent: "#C084FC" },
                ].map(({ icon: StatIcon, value, label, accent }) => (
                  <div key={label} className="flex flex-col items-center justify-center gap-1.5 py-7 px-4">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center mb-1"
                      style={{ border: `1px solid ${accent}40`, color: accent }}
                    >
                      <StatIcon className="w-4 h-4" />
                    </div>
                    <span
                      className="font-display font-800 leading-none text-center"
                      style={{ fontSize: "clamp(1.05rem,2vw,1.5rem)", color: accent, textShadow: `0 0 28px ${accent}55` }}
                    >
                      {value}
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-mono tracking-wider text-[rgba(232,243,255,0.75)] uppercase text-center leading-tight">
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              {categories.length > 0 && (
                <div className="relative px-8 py-5 border-t border-[rgba(255,255,255,0.07)] flex flex-wrap items-center justify-center gap-2 overflow-hidden">
                  <div
                    className="absolute inset-0 opacity-40"
                    style={{ background: "linear-gradient(90deg,rgba(0,212,255,0.06),rgba(155,77,255,0.08),rgba(0,212,255,0.06))" }}
                  />
                  {categories.map((category) => (
                    <Badge key={category} variant="neutral" size="sm" className="relative">
                      {category}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Post grid ── */}
      <section className="pb-24 relative">
        <div className="container-custom">
          {posts.length === 0 ? (
            <div className="text-center max-w-lg mx-auto py-16 bg-surface border border-border rounded-2xl">
              <p className="text-text-secondary">No articles have been published yet. Check back soon.</p>
            </div>
          ) : (
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {posts.map((post, index) => (
                <StaggerItem key={post.id}>
                  <Link href={`/blog/${post.slug}`} className="block h-full group">
                    <div className="h-full flex flex-col bg-surface border border-border rounded-2xl overflow-hidden shadow-card hover:border-cyan/25 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
                      <div className="relative h-44 overflow-hidden shrink-0">
                        {post.coverImage ? (
                          <>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={post.coverImage}
                              alt={post.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-surface/70 via-transparent to-transparent" />
                          </>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cyan/10 via-surface to-violet/10 relative">
                            <div className="absolute inset-0 bg-grid opacity-20" />
                            <Newspaper className="w-8 h-8 text-cyan/40 relative" />
                          </div>
                        )}
                        {index === 0 && (
                          <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[0.65rem] font-mono font-700 tracking-wider uppercase bg-gold/15 border border-gold/30 text-gold backdrop-blur-sm">
                            Latest
                          </span>
                        )}
                      </div>

                      <div className="flex flex-col flex-1 p-6">
                        <div className="flex flex-wrap items-center gap-2 mb-4">
                          <Badge variant="cyan" size="sm">{post.category}</Badge>
                        </div>
                        <h3 className="font-display font-700 text-white text-lg leading-snug mb-3 group-hover:text-cyan transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-text-secondary text-sm leading-relaxed mb-5 flex-1">
                          {truncate(post.excerpt, 120)}
                        </p>
                        <div className="flex items-center justify-between text-xs text-text-muted pt-4 border-t border-border">
                          <span className="inline-flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            {formatDate(post.publishedAt ?? post.createdAt)}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            {readingTime(post.content)} min read
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 relative overflow-hidden border-t border-border">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(0,212,255,0.05) 0%, transparent 70%)" }}
          />
        </div>
        <div className="container-custom relative text-center max-w-2xl mx-auto">
          <Reveal>
            <h2 className="font-display font-700 text-white text-2xl sm:text-3xl mb-4">
              Have a production AI challenge?
            </h2>
            <p className="text-text-secondary mb-8">
              Talk to our team about building a system that ships to production, not just a prototype.
            </p>
            <Button variant="primary" size="lg" href="/contact" iconRight={<ArrowRight className="w-4 h-4" />}>
              Start a Conversation
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
