"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Inline Cal.com booking widget.
 *
 * cal.com itself refuses to be framed (X-Frame-Options: SAMEORIGIN), so a
 * plain <iframe src="https://cal.com/..."> shows "refused to connect". The
 * supported route is Cal's own embed script from app.cal.com, which builds
 * the iframe against the framing-friendly /embed endpoint.
 *
 * The script is only fetched once the widget scrolls near the viewport, so
 * visitors who only came for the form never pay for it. If the script is
 * blocked (ad blocker, offline) or never renders, `onFail` swaps in the
 * plain link instead of leaving an empty box.
 */

const EMBED_SRC = "https://app.cal.com/embed/embed.js";

function loadCal() {
  if (window.Cal?.loaded) return Promise.resolve(window.Cal);
  if (window.__calLoading) return window.__calLoading;

  window.__calLoading = new Promise((resolve, reject) => {
    // Cal's official bootstrap stub: queues Cal(...) calls until embed.js
    // has loaded, then replays them.
    (function (C, A, L) {
      const p = function (a, ar) {
        a.q.push(ar);
      };
      const d = C.document;
      C.Cal =
        C.Cal ||
        function () {
          const cal = C.Cal;
          const ar = arguments;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            const s = d.createElement("script");
            s.src = A;
            s.async = true;
            s.onload = () => resolve(C.Cal);
            s.onerror = () => reject(new Error("cal embed blocked"));
            d.head.appendChild(s);
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api = function () {
              p(api, arguments);
            };
            const namespace = ar[1];
            api.q = api.q || [];
            if (typeof namespace === "string") {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ["initNamespace", namespace]);
            } else p(cal, ar);
            return;
          }
          p(cal, ar);
        };
    })(window, EMBED_SRC, "init");

    window.Cal("init", { origin: "https://app.cal.com" });
  });

  return window.__calLoading;
}

export default function CalEmbed({ calLink, onFail, className }) {
  const hostRef = useRef(null);
  const [state, setState] = useState("idle"); // idle | loading | ready

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;
    let cancelled = false;
    let timer;

    const start = () => {
      setState("loading");
      loadCal()
        .then((Cal) => {
          if (cancelled) return;
          Cal("inline", {
            elementOrSelector: host,
            calLink,
            layout: "month_view",
            config: { theme: "light" },
          });
          Cal("ui", {
            theme: "light",
            hideEventTypeDetails: false,
            cssVarsPerTheme: {
              light: { "cal-brand": "#3f166e" },
              dark: { "cal-brand": "#9248e4" },
            },
          });
          Cal("on", {
            action: "linkReady",
            callback: () => !cancelled && setState("ready"),
          });
          // No linkReady within 15s means the widget never came up.
          timer = setTimeout(() => {
            if (!cancelled && !host.querySelector("iframe")) onFail?.();
          }, 15000);
        })
        .catch(() => !cancelled && onFail?.());
    };

    if (!("IntersectionObserver" in window)) {
      start();
      return () => {
        cancelled = true;
        clearTimeout(timer);
      };
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          start();
        }
      },
      { rootMargin: "400px 0px" }
    );
    io.observe(host);

    return () => {
      cancelled = true;
      clearTimeout(timer);
      io.disconnect();
    };
  }, [calLink, onFail]);

  return (
    <div className={className} data-state={state}>
      {state !== "ready" && (
        <div className="ax-contact__book-loading" role="status" aria-live="polite">
          <span className="ax-contact__spinner" aria-hidden="true" />
          <span>Loading availability…</span>
        </div>
      )}
      <div ref={hostRef} className="ax-contact__book-host" />
    </div>
  );
}
