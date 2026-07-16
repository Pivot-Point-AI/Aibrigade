import { Plus, FileText, CheckCircle2, PenLine } from "lucide-react";
import { getAllPosts } from "@/lib/blog";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { PostList } from "@/components/admin/PostList";
import { Button } from "@/components/ui/Button";
import { GlowOrbs } from "@/components/ui/Reveal";

export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  const posts = await getAllPosts();
  const published = posts.filter((p) => p.status === "published").length;
  const drafts = posts.length - published;

  const stats = [
    { label: "Total Articles", value: posts.length, icon: FileText, accent: "#00D4FF" },
    { label: "Published", value: published, icon: CheckCircle2, accent: "#10B981" },
    { label: "Drafts", value: drafts, icon: PenLine, accent: "#C084FC" },
  ];

  return (
    <section className="relative pt-28 pb-20 min-h-screen overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(0,212,255,0.08),transparent)]" />
        <div className="absolute inset-0 bg-grid opacity-20" />
        <GlowOrbs />
      </div>

      <div className="container-custom relative max-w-5xl">
        <AdminHeader title="Blog Management" subtitle="Create, edit, and publish articles" />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {stats.map(({ label, value, icon: Icon, accent }) => (
            <div key={label} className="bg-surface border border-border rounded-2xl p-5 flex items-center gap-4 shadow-card">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                style={{ border: `1px solid ${accent}40`, background: `${accent}14`, color: accent }}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <div className="font-display font-800 text-white text-2xl leading-none">{value}</div>
                <div className="text-text-muted text-xs font-mono tracking-wider uppercase mt-1">{label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display font-600 text-white text-lg">All Articles</h2>
          <Button variant="primary" size="md" href="/admin/blog/new" iconLeft={<Plus className="w-4 h-4" />}>
            New Post
          </Button>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20 bg-surface border border-border rounded-2xl">
            <p className="text-text-secondary mb-1">No posts yet.</p>
            <p className="text-text-muted text-sm">Create your first article to populate the blog.</p>
          </div>
        ) : (
          <PostList posts={posts} />
        )}
      </div>
    </section>
  );
}
