"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/Card";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/types";

export function PostList({ posts }: { posts: BlogPost[] }) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDeletingId(id);
    await fetch(`/api/blog/${id}`, { method: "DELETE" });
    setDeletingId(null);
    router.refresh();
  };

  return (
    <div className="bg-surface border border-border rounded-2xl overflow-hidden divide-y divide-border">
      {posts.map((post) => (
        <div key={post.id} className="flex flex-wrap items-center justify-between gap-4 p-5">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <Badge variant={post.status === "published" ? "cyan" : "neutral"} dot>
                {post.status === "published" ? "Published" : "Draft"}
              </Badge>
              <Badge variant="neutral">{post.category}</Badge>
            </div>
            <h3 className="font-display font-600 text-white truncate">{post.title}</h3>
            <p className="text-text-muted text-xs mt-1">
              {post.author} · Updated {formatDate(post.updatedAt)}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {post.status === "published" && (
              <Link
                href={`/blog/${post.slug}`}
                target="_blank"
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-border-light text-text-secondary hover:text-cyan hover:border-cyan/40 transition-colors"
                title="View live"
              >
                <ExternalLink className="w-4 h-4" />
              </Link>
            )}
            <Link
              href={`/admin/blog/${post.id}/edit`}
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-border-light text-text-secondary hover:text-cyan hover:border-cyan/40 transition-colors"
              title="Edit"
            >
              <Pencil className="w-4 h-4" />
            </Link>
            <button
              onClick={() => handleDelete(post.id, post.title)}
              disabled={deletingId === post.id}
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-border-light text-text-secondary hover:text-red-400 hover:border-red-400/40 transition-colors disabled:opacity-50"
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
