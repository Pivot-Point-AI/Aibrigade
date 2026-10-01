"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { slugify } from "../../lib/slug";
import RichEditor from "./RichEditor";
import { readingTime } from "../../lib/format";

const MAX_IMAGE = 5 * 1024 * 1024;
const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

async function uploadImage(file) {
  if (!IMAGE_TYPES.includes(file.type)) throw new Error("Use a JPG, PNG, WebP or GIF image.");
  if (file.size > MAX_IMAGE) throw new Error("Image is larger than 5 MB.");
  const body = new FormData();
  body.append("file", file);
  const res = await fetch("/api/admin/upload", { method: "POST", body });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Upload failed.");
  return data.url;
}

export default function PostEditor({ post }) {
  const router = useRouter();
  const isNew = !post;
  const coverInput = useRef(null);

  const [id, setId] = useState(post?.id ?? null);
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(!isNew);
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [coverImage, setCoverImage] = useState(post?.coverImage ?? "");
  const [tagList, setTagList] = useState(post?.tags ?? []);
  const [tagDraft, setTagDraft] = useState("");
  const [author, setAuthor] = useState(post?.author ?? "AIBrigade Team");
  const [content, setContent] = useState(post?.content ?? "");
  const [status, setStatus] = useState(post?.status ?? "draft");
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [msg, setMsg] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const words = content.trim() ? content.trim().split(/\s+/).length : 0;
  const isLive = status === "published";

  const snapshot = JSON.stringify([title, slug, excerpt, coverImage, tagList, author, content]);
  const savedSnap = useRef(snapshot);
  const dirty = snapshot !== savedSnap.current;

  const checks = [
    { ok: title.trim().length > 0, label: "Add a title" },
    { ok: content.trim().length >= 20, label: "Write the article" },
    { ok: excerpt.trim().length > 0, label: "Add an excerpt" },
    { ok: Boolean(coverImage), label: "Upload a cover image" },
    { ok: tagList.length > 0, label: "Add at least one tag" },
  ];
  const done = checks.filter((c) => c.ok).length;
  const canPublish = checks[0].ok && checks[1].ok;

  useEffect(() => {
    if (!slugTouched) setSlug(slugify(title));
  }, [title, slugTouched]);

  useEffect(() => {
    if (!dirty) return;
    const warn = (e) => { e.preventDefault(); e.returnValue = ""; };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  function addTag(raw) {
    const t = raw.trim().replace(/,$/, "").trim();
    setTagDraft("");
    if (!t || tagList.includes(t) || tagList.length >= 8) return;
    setTagList([...tagList, t]);
  }

  function onTagKey(e) {
    if (e.key === "Enter" || e.key === ",") { e.preventDefault(); addTag(tagDraft); }
    else if (e.key === "Backspace" && !tagDraft && tagList.length) setTagList(tagList.slice(0, -1));
  }

  function suggestExcerpt() {
    const plain = content
      .replace(/```[\s\S]*?```/g, " ").replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
      .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1").replace(/[#>*_`~-]+/g, " ").replace(/\s+/g, " ").trim();
    if (!plain) return;
    let out = plain.slice(0, 200);
    if (plain.length > 200) out = out.slice(0, out.lastIndexOf(" ")) + "...";
    setExcerpt(out);
  }

  useEffect(() => {
    if (msg?.type !== "ok") return;
    const t = setTimeout(() => setMsg(null), 4000);
    return () => clearTimeout(t);
  }, [msg]);

  async function save(nextStatus = status) {
    setBusy(true);
    setMsg(null);
    try {
      const res = await fetch(id ? `/api/admin/posts/${id}` : "/api/admin/posts", {
        method: id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, slug, excerpt, coverImage, tags: tagList, author, content, status: nextStatus }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Could not save the post.");

      setStatus(data.post.status);
      setSlug(data.post.slug);
      savedSnap.current = JSON.stringify([title, data.post.slug, excerpt, coverImage, tagList, author, content]);
      setMsg({
        type: "ok",
        text: nextStatus === "published" ? "Published. The post is live on the blog." : "Saved.",
      });
      if (!id) {
        setId(data.post.id);
        router.replace(`/admin/posts/${data.post.id}`);
      }
      router.refresh();
    } catch (e) {
      setMsg({ type: "error", text: e.message });
    } finally {
      setBusy(false);
    }
  }

  async function remove() {
    if (!confirmDelete) { setConfirmDelete(true); return; }
    setBusy(true);
    const res = await fetch(`/api/admin/posts/${id}`, { method: "DELETE" });
    if (res.ok) { router.replace("/admin"); router.refresh(); return; }
    const data = await res.json().catch(() => ({}));
    setMsg({ type: "error", text: data.error || "Could not delete the post." });
    setBusy(false);
    setConfirmDelete(false);
  }

  async function onCover(file) {
    if (!file) return;
    setUploading(true);
    setMsg(null);
    try {
      setCoverImage(await uploadImage(file));
    } catch (e) {
      setMsg({ type: "error", text: e.message });
    } finally {
      setUploading(false);
      if (coverInput.current) coverInput.current.value = "";
    }
  }

  async function uploadInline(file) {
    setUploading(true);
    setMsg(null);
    try {
      return await uploadImage(file);
    } catch (e) {
      setMsg({ type: "error", text: e.message });
      return null;
    } finally {
      setUploading(false);
    }
  }

  function onKeyDown(e) {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") {
      e.preventDefault();
      if (!busy) save();
    }
  }

  return (
    <div className="adm-editor" onKeyDown={onKeyDown}>
      <header className="adm-bar">
        <div className="adm-bar__left">
          <Link href="/admin" className="adm-crumb">&larr; Posts</Link>
          <span className="adm-bar__sep" aria-hidden="true" />
          <span className="adm-bar__title">{isNew && !id ? "New post" : "Edit post"}</span>
          <span className={`adm-pill adm-pill--${status}`}>{isLive ? "Published" : "Draft"}</span>
          {dirty && <span className="adm-dirty">Unsaved changes</span>}
        </div>
        <div className="adm-bar__right">
          {msg && (
            <span className={`adm-toast adm-toast--${msg.type}`} role={msg.type === "error" ? "alert" : "status"}>
              {msg.text}
            </span>
          )}
          {isLive && slug && (
            <a className="adm-btn adm-btn--ghost" href={`/blog/${slug}`} target="_blank" rel="noopener noreferrer">View live</a>
          )}
          {isLive ? (
            <button className="adm-btn adm-btn--ghost" onClick={() => save("draft")} disabled={busy}>Unpublish</button>
          ) : (
            <button className="adm-btn adm-btn--ghost" onClick={() => save("draft")} disabled={busy}>Save draft</button>
          )}
          <button className="adm-btn adm-btn--primary" onClick={() => save("published")} disabled={busy || uploading || !canPublish}
            title={canPublish ? undefined : "Add a title and some content to publish"}>
            {busy ? "Saving..." : isLive ? "Update" : "Publish"}
          </button>
        </div>
      </header>

      <div className="adm-editor__grid">
        <div className="adm-editor__main">
          <label className="adm-sr" htmlFor="post-title">Title</label>
          <input
            id="post-title" className="adm-title-input" placeholder="Post title"
            value={title} maxLength={160} onChange={(e) => setTitle(e.target.value)}
          />
          <p className="adm-urlline">
            <span>aibrigade.ai/blog/</span><strong>{slug || "your-post"}</strong>
            <span className="adm-urlline__count">{title.length}/160</span>
          </p>

          <div className="adm-compose">
            <RichEditor value={content} onChange={setContent} onUploadImage={uploadInline} uploading={uploading} />
            <div className="adm-compose__foot">
              <span>{words} {words === 1 ? "word" : "words"}</span>
              <span>{words ? `${readingTime(content)} min read` : "No content yet"}</span>
              <span className="adm-compose__hint">Ctrl/Cmd + S to save</span>
            </div>
          </div>
        </div>

        <aside className="adm-editor__side">
          <section className="adm-panel">
            <div className="adm-panel__head">
              <h2 className="adm-panel__title">Ready to publish</h2>
              <span className="adm-panel__meta">{done}/{checks.length}</span>
            </div>
            <div className="adm-meter" role="progressbar" aria-valuemin={0} aria-valuemax={checks.length} aria-valuenow={done}>
              <span style={{ width: `${(done / checks.length) * 100}%` }} />
            </div>
            <ul className="adm-checks">
              {checks.map((c) => (
                <li key={c.label} className={c.ok ? "is-ok" : ""}>
                  <span className="adm-checks__dot" aria-hidden="true">{c.ok ? "✓" : ""}</span>
                  {c.label}
                </li>
              ))}
            </ul>
          </section>

          <section className="adm-panel">
            <h2 className="adm-panel__title">Cover image</h2>
            {coverImage ? (
              <div className="adm-cover">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={coverImage} alt="Cover preview" />
                <div className="adm-cover__actions">
                  <button type="button" className="adm-btn adm-btn--light adm-btn--sm" onClick={() => coverInput.current?.click()} disabled={uploading}>
                    {uploading ? "Uploading..." : "Replace"}
                  </button>
                  <button type="button" className="adm-btn adm-btn--light adm-btn--sm" onClick={() => setCoverImage("")} disabled={uploading}>
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                className={`adm-drop${dragging ? " is-drag" : ""}`}
                onClick={() => coverInput.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => { e.preventDefault(); setDragging(false); onCover(e.dataTransfer.files?.[0]); }}
                disabled={uploading}
              >
                <span className="adm-drop__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 16V5M7 10l5-5 5 5M5 19h14" />
                  </svg>
                </span>
                <span className="adm-drop__main">{uploading ? "Uploading..." : "Upload cover image"}</span>
                <span className="adm-drop__sub">Drag a file here or click to browse. JPG, PNG, WebP or GIF, up to 5 MB. 16:9 works best.</span>
              </button>
            )}
            <input ref={coverInput} type="file" accept={IMAGE_TYPES.join(",")} hidden
              onChange={(e) => onCover(e.target.files?.[0])} />
          </section>

          <section className="adm-panel">
            <h2 className="adm-panel__title">Post details</h2>

            <label className="adm-field">
              <span className="adm-label">URL slug</span>
              <input className="adm-input" value={slug}
                onChange={(e) => { setSlugTouched(true); setSlug(slugify(e.target.value)); }} />
              <span className="adm-hint">/blog/{slug || "your-post"}</span>
            </label>

            <label className="adm-field">
              <span className="adm-label adm-label--row">
                Excerpt
                <button type="button" className="adm-link" onClick={suggestExcerpt} disabled={!content.trim()}>
                  Suggest from article
                </button>
              </span>
              <textarea className="adm-input adm-input--area" rows={3} maxLength={320} value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)} />
              <span className="adm-hint">{excerpt.length}/320. Shown on cards and in search results.</span>
            </label>

            <div className="adm-field">
              <label className="adm-label" htmlFor="post-tags">Tags</label>
              <div className="adm-chips">
                {tagList.map((t) => (
                  <span key={t} className="adm-chip">
                    {t}
                    <button type="button" aria-label={`Remove tag ${t}`} onClick={() => setTagList(tagList.filter((x) => x !== t))}>&times;</button>
                  </span>
                ))}
                <input id="post-tags" className="adm-chips__input" value={tagDraft}
                  placeholder={tagList.length ? "" : "Type a tag, press Enter"}
                  disabled={tagList.length >= 8}
                  onChange={(e) => setTagDraft(e.target.value)} onKeyDown={onTagKey} onBlur={() => addTag(tagDraft)} />
              </div>
              <span className="adm-hint">Press Enter or comma to add. Up to 8.</span>
            </div>

            <label className="adm-field">
              <span className="adm-label">Author</span>
              <input className="adm-input" value={author} onChange={(e) => setAuthor(e.target.value)} />
            </label>
          </section>

          <section className="adm-panel">
            <h2 className="adm-panel__title">Search preview</h2>
            <div className="adm-serp">
              <span className="adm-serp__url">aibrigade.ai &rsaquo; blog &rsaquo; {slug || "your-post"}</span>
              <span className="adm-serp__title">{title || "Your post title"}</span>
              <span className="adm-serp__desc">{excerpt || "Your excerpt appears here. Write one to control how the post looks in search results and on cards."}</span>
            </div>
          </section>

          {id && (
            <button className={`adm-btn adm-btn--block ${confirmDelete ? "adm-btn--danger" : "adm-btn--ghost adm-btn--quiet"}`}
              onClick={remove} onBlur={() => setConfirmDelete(false)} disabled={busy}>
              {confirmDelete ? "Click again to delete permanently" : "Delete post"}
            </button>
          )}
        </aside>
      </div>
    </div>
  );
}
