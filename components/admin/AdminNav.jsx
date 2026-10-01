"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Icon = ({ d }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={d} />
  </svg>
);

const ICONS = {
  posts: "M5 4h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zM8 9h8M8 13h8M8 17h5",
  plus: "M12 5v14M5 12h14",
  external: "M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5",
};

export default function AdminNav() {
  const path = usePathname();
  const onNew = path === "/admin/posts/new";
  const onPosts = path === "/admin" || (path.startsWith("/admin/posts/") && !onNew);

  return (
    <nav className="adm-nav" aria-label="Admin">
      <span className="adm-nav__label">Content</span>
      <Link href="/admin" className={`adm-nav__link${onPosts ? " is-on" : ""}`} aria-current={onPosts ? "page" : undefined}>
        <Icon d={ICONS.posts} /> All posts
      </Link>
      <Link href="/admin/posts/new" className={`adm-nav__link${onNew ? " is-on" : ""}`} aria-current={onNew ? "page" : undefined}>
        <Icon d={ICONS.plus} /> New post
      </Link>
      <span className="adm-nav__label">Site</span>
      <a href="/blog" target="_blank" rel="noopener noreferrer" className="adm-nav__link">
        <Icon d={ICONS.external} /> View blog
      </a>
    </nav>
  );
}
