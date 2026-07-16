"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { marked } from "marked";
import DOMPurify from "isomorphic-dompurify";
import { Save, Send, Eye, Pencil, Bold, Italic, Heading2, Link2, List, ListOrdered, Quote, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { BlogPost } from "@/types";

marked.setOptions({ gfm: true, breaks: true });

const INPUT =
  "w-full rounded-xl px-4 py-3 text-sm text-white placeholder:text-[rgba(232,243,255,0.45)] border bg-[rgba(255,255,255,0.05)] border-[rgba(255,255,255,0.1)] hover:border-[rgba(0,212,255,0.35)] focus:border-[rgba(0,212,255,0.55)] focus:outline-none focus:ring-2 focus:ring-[rgba(0,212,255,0.15)] transition-all";
const LABEL = "block text-[10px] font-mono font-700 tracking-[0.22em] uppercase text-[rgba(232,243,255,0.85)] mb-2";

interface PostEditorProps {
  post?: BlogPost;
}

type Tab = "write" | "preview";

const TOOLBAR: { icon: React.ElementType<{ className?: string }>; label: string; before: string; after: string; block?: boolean }[] = [
  { icon: Bold, label: "Bold", before: "**", after: "**" },
  { icon: Italic, label: "Italic", before: "_", after: "_" },
  { icon: Heading2, label: "Heading", before: "## ", after: "", block: true },
  { icon: Quote, label: "Quote", before: "> ", after: "", block: true },
  { icon: List, label: "Bullet list", before: "- ", after: "", block: true },
  { icon: ListOrdered, label: "Numbered list", before: "1. ", after: "", block: true },
  { icon: Link2, label: "Link", before: "[", after: "](https://)" },
  { icon: ImageIcon, label: "Image", before: "![", after: "](https://)" },
];

export function PostEditor({ post }: PostEditorProps) {
  const router = useRouter();
  const isEdit = Boolean(post);

  const [title, setTitle] = useState(post?.title ?? "");
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [category, setCategory] = useState(post?.category ?? "General");
  const [tags, setTags] = useState(post?.tags.join(", ") ?? "");
  const [author, setAuthor] = useState(post?.author ?? "AIBrigade Team");
  const [coverImage, setCoverImage] = useState(post?.coverImage ?? "");
  const [tab, setTab] = useState<Tab>("write");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const previewHtml = useMemo(() => {
    if (!content.trim()) return "";
    const raw = marked.parse(content, { async: false }) as string;
    return DOMPurify.sanitize(raw, {
      ALLOWED_TAGS: [
        "p", "br", "strong", "em", "del", "code", "pre", "blockquote",
        "h1", "h2", "h3", "h4", "ul", "ol", "li", "a", "img", "hr",
        "table", "thead", "tbody", "tr", "th", "td",
      ],
      ALLOWED_ATTR: ["href", "src", "alt", "title", "target", "rel"],
    });
  }, [content]);

  const applyFormat = (before: string, after: string, block?: boolean) => {
    const textarea = document.getElementById("post-content") as HTMLTextAreaElement | null;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = content.slice(start, end);
    const needsNewline = block && start > 0 && content[start - 1] !== "\n";
    const prefix = needsNewline ? "\n" : "";
    const inserted = `${prefix}${before}${selected}${after}`;
    const next = content.slice(0, start) + inserted + content.slice(end);
    setContent(next);
    requestAnimationFrame(() => {
      textarea.focus();
      const cursor = start + prefix.length + before.length + selected.length + after.length;
      textarea.setSelectionRange(cursor, cursor);
    });
  };

  const submit = async (status: "draft" | "published") => {
    setError("");
    if (!title.trim() || !content.trim()) {
      setError("Title and content are required.");
      return;
    }
    setSaving(true);

    const payload = {
      title,
      excerpt,
      content,
      category,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      author,
      coverImage,
      status,
    };

    const res = await fetch(isEdit ? `/api/blog/${post!.id}` : "/api/blog", {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    setSaving(false);

    if (!data.success) {
      setError(data.error ?? "Something went wrong");
      return;
    }

    router.push("/admin/blog");
    router.refresh();
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      <div>
        <label className={LABEL}>Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`${INPUT} text-base font-display font-600`}
          placeholder="Article title"
        />
      </div>

      <div>
        <label className={LABEL}>Excerpt</label>
        <textarea
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          rows={2}
          className={`${INPUT} resize-none`}
          placeholder="Short summary shown in the article list and search results"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={LABEL}>Category</label>
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={INPUT}
            placeholder="e.g. AI Engineering"
          />
        </div>
        <div>
          <label className={LABEL}>Author</label>
          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className={INPUT}
          />
        </div>
        <div>
          <label className={LABEL}>Tags (comma separated)</label>
          <input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className={INPUT}
            placeholder="ML, Compliance, Fintech"
          />
        </div>
        <div>
          <label className={LABEL}>Cover Image URL (optional)</label>
          <input
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            className={INPUT}
            placeholder="https://..."
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className={`${LABEL} mb-0`}>Content (Markdown)</label>
          <div className="flex items-center gap-1 rounded-lg border border-border-light p-1">
            <button
              type="button"
              onClick={() => setTab("write")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-display font-600 transition-colors ${
                tab === "write" ? "bg-cyan/15 text-cyan" : "text-text-secondary hover:text-text-primary"
              }`}
            >
              <Pencil className="w-3.5 h-3.5" /> Write
            </button>
            <button
              type="button"
              onClick={() => setTab("preview")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-display font-600 transition-colors ${
                tab === "preview" ? "bg-cyan/15 text-cyan" : "text-text-secondary hover:text-text-primary"
              }`}
            >
              <Eye className="w-3.5 h-3.5" /> Preview
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] overflow-hidden">
          {tab === "write" && (
            <div className="flex items-center gap-1 px-2 py-2 border-b border-[rgba(255,255,255,0.08)] flex-wrap">
              {TOOLBAR.map(({ icon: Icon, label, before, after, block }) => (
                <button
                  key={label}
                  type="button"
                  title={label}
                  onClick={() => applyFormat(before, after, block)}
                  className="w-8 h-8 flex items-center justify-center rounded-md text-text-secondary hover:text-cyan hover:bg-cyan/10 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          )}

          {tab === "write" ? (
            <textarea
              id="post-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={18}
              className="w-full bg-transparent px-4 py-4 text-sm text-white placeholder:text-[rgba(232,243,255,0.4)] font-mono leading-relaxed focus:outline-none resize-y"
              placeholder={"Write in Markdown — e.g.\n\n## A section heading\n\nSome **bold** and _italic_ text.\n\n- point one\n- point two"}
            />
          ) : (
            <div className="px-6 py-6 min-h-[420px]">
              {previewHtml ? (
                <div className="prose-blog" dangerouslySetInnerHTML={{ __html: previewHtml }} />
              ) : (
                <p className="text-text-muted text-sm">Nothing to preview yet — start writing in the Write tab.</p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-3 pt-2">
        <Button variant="secondary" size="md" onClick={() => submit("draft")} loading={saving} iconLeft={<Save className="w-4 h-4" />}>
          Save Draft
        </Button>
        <Button variant="primary" size="md" onClick={() => submit("published")} loading={saving} iconLeft={<Send className="w-4 h-4" />}>
          Publish
        </Button>
      </div>
    </div>
  );
}
