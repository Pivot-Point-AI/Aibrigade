"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { formatDate } from "../../lib/format";

const TABS = [
  { key: "all", label: "All" },
  { key: "published", label: "Published" },
  { key: "draft", label: "Drafts" },
];

export default function PostsManager({ initialPosts }) {
  const [posts, setPosts] = useState(initialPosts);
  const [tab, setTab] = useState("all");
  const [query, setQuery] = useState("");
  const [confirmId, setConfirmId] = useState(null);
  const [busyId, setBusyId] = useState(null);
  const [error, setError] = useState("");

  const counts = useMemo(() => ({
    all: posts.length,
    published: posts.filter((p) => p.status === "published").length,
    draft: posts.filter((p) => p.status === "draft").length,
  }), [posts]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) =>
      (tab === "all" || p.status === tab) &&
      (!q || p.title.toLowerCase().includes(q) || p.tags.some((t) => t.toLowerCase().includes(q)))
    );
  }, [posts, tab, query]);

  async function call(id, init) {
    setBusyId(id);
    setError("");
    try {
      const res = await fetch(`/api/admin/posts/${id}`, {
        headers: { "Content-Type": "application/json" },
        ...init,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      return data;
    } catch (e) {
      setError(e.message);
      return null;
    } finally {
      setBusyId(null);
    }
  }

  async function togglePublish(p) {
    const next = p.status === "published" ? "draft" : "published";
    const data = await call(p.id, { method: "PUT", body: JSON.stringify({ status: next }) });
    if (data) setPosts((list) => list.map((x) => (x.id === p.id ? { ...x, ...data.post, content: "" } : x)));
  }

  async function remove(p) {
    if (confirmId !== p.id) { setConfirmId(p.id); return; }
    const data = await call(p.id, { method: "DELETE" });
    setConfirmId(null);
    if (data) setPosts((list) => list.filter((x) => x.id !== p.id));
  }

  return (
    <section>
      <dl className="adm-stats">
        <div className="adm-stat"><dt>Total posts</dt><dd>{counts.all}</dd></div>
        <div className="adm-stat adm-stat--ok"><dt>Published</dt><dd>{counts.published}</dd></div>
        <div className="adm-stat adm-stat--warn"><dt>Drafts</dt><dd>{counts.draft}</dd></div>
      </dl>

      <div className="adm-toolbar">
        <div className="adm-tabs" role="tablist" aria-label="Filter posts">
          {TABS.map((t) => (
            <button
              key={t.key} role="tab" aria-selected={tab === t.key}
              className={`adm-tab${tab === t.key ? " is-on" : ""}`}
              onClick={() => setTab(t.key)}
            >
              {t.label} <span className="adm-tab__n">{counts[t.key]}</span>
            </button>
          ))}
        </div>
        <input
          className="adm-input adm-search" type="search" placeholder="Search title or tag"
          aria-label="Search posts" value={query} onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {error && <div className="adm-alert adm-alert--error" role="alert">{error}</div>}

      {visible.length === 0 ? (
        <div className="adm-empty">
          {posts.length === 0 ? (
            <>
              <h2>No posts yet</h2>
              <p>Your first article is one click away.</p>
              <Link href="/admin/posts/new" className="adm-btn adm-btn--primary">Write the first post</Link>
            </>
          ) : (
            <>
              <h2>Nothing matches</h2>
              <p>Try a different search or switch the filter.</p>
            </>
          )}
        </div>
      ) : (
        <ul className="adm-table" aria-label="Posts">
          {visible.map((p) => (
            <li key={p.id} className={`adm-row${busyId === p.id ? " is-busy" : ""}`}>
              <Link href={`/admin/posts/${p.id}`} className="adm-thumb" aria-hidden="true" tabIndex={-1}>
                {p.coverImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.coverImage} alt="" loading="lazy" />
                ) : (
                  <span>{(p.title || "?").charAt(0).toUpperCase()}</span>
                )}
              </Link>
              <div className="adm-row__main">
                <Link href={`/admin/posts/${p.id}`} className="adm-row__title">{p.title}</Link>
                <span className="adm-row__meta">
                  /blog/{p.slug}
                  {p.tags.length > 0 && <> &nbsp;&middot;&nbsp; {p.tags.join(", ")}</>}
                </span>
              </div>
              <span className={`adm-pill adm-pill--${p.status}`}>
                {p.status === "published" ? "Published" : "Draft"}
              </span>
              <span className="adm-row__date">
                {p.status === "published" ? formatDate(p.publishedAt) : `Edited ${formatDate(p.updatedAt)}`}
              </span>
              <div className="adm-row__actions">
                <Link href={`/admin/posts/${p.id}`} className="adm-btn adm-btn--ghost adm-btn--sm">Edit</Link>
                {p.status === "published" && (
                  <a href={`/blog/${p.slug}`} target="_blank" rel="noopener noreferrer" className="adm-btn adm-btn--ghost adm-btn--sm">View</a>
                )}
                <button className="adm-btn adm-btn--ghost adm-btn--sm" onClick={() => togglePublish(p)} disabled={busyId === p.id}>
                  {p.status === "published" ? "Unpublish" : "Publish"}
                </button>
                <button
                  className={`adm-btn adm-btn--sm ${confirmId === p.id ? "adm-btn--danger" : "adm-btn--ghost adm-btn--quiet"}`}
                  onClick={() => remove(p)} onBlur={() => setConfirmId(null)} disabled={busyId === p.id}
                >
                  {confirmId === p.id ? "Confirm delete" : "Delete"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
