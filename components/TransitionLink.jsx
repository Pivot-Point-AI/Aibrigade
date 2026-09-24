"use client";

import { usePopup } from "@/components/PopupContext";

/**
 * An internal link that leaves through the page-transition overlay, the
 * way every cross-page move on this site does (Navbar `goTo`, UseCase
 * `go`, ProjectCard). A plain anchor underneath, so it is a real link for
 * crawlers, middle-click and "open in new tab" — only an unmodified
 * primary click is taken over.
 *
 * For server components (the company and blog pages) that need that
 * behaviour on a handful of links without becoming client components.
 */
export default function TransitionLink({ href, children, onClick, ...rest }) {
  const { startTransition } = usePopup();

  const handle = (e) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (rest.target && rest.target !== "_self") return;

    /* An anchor on this page scrolls; anywhere else is a navigation. */
    if (href.startsWith("#")) {
      const el = document.getElementById(href.slice(1));
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    e.preventDefault();
    startTransition(href);
  };

  return (
    <a href={href} onClick={handle} {...rest}>
      {children}
    </a>
  );
}
