"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, ArrowRight } from "lucide-react";

const STORAGE_KEY = "ab_announcement_last_seen";
const BAR_HEIGHT = 40;

function todayKey() {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD, local-enough for a once-a-day gate
}

export function AnnouncementBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let lastSeen: string | null = null;
    try {
      lastSeen = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      // localStorage unavailable (e.g. privacy mode) — show every time rather than crash
    }
    if (lastSeen !== todayKey()) setVisible(true);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty("--announcement-offset", visible ? `${BAR_HEIGHT}px` : "0px");
    return () => { document.documentElement.style.setProperty("--announcement-offset", "0px"); };
  }, [visible]);

  const dismiss = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, todayKey());
    } catch {
      // ignore write failures — bar simply reappears next load
    }
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -BAR_HEIGHT, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -BAR_HEIGHT, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
          role="region"
          aria-label="Site announcement"
          style={{ height: BAR_HEIGHT }}
          className="fixed top-0 left-0 right-0 z-[60] flex items-center bg-[rgba(10,16,38,0.97)] border-b border-white/[0.07] backdrop-blur-xl"
        >
          {/* Accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan/50 to-transparent" />

          <div className="container-custom flex items-center justify-center gap-2.5 w-full px-4">
            {/* Icon badge */}
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-cyan/12 border border-cyan/25 flex-shrink-0">
              <Sparkles className="w-3 h-3 text-cyan" />
            </span>

            <p className="min-w-0 truncate text-[12.5px] sm:text-[13px] text-text-secondary font-display font-500 tracking-tight">
              <span className="text-text-primary font-600">Dedicated AI Engineers</span>
              <span className="text-text-muted"> from just </span>
              <span className="text-cyan font-700">$89/hour</span>
              <span className="hidden md:inline text-text-muted">
                {"  ·  "}AI Teams{"  ·  "}Fixed-Price Projects{"  ·  "}Start in as little as 72 Hours
              </span>
            </p>

            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center gap-1 flex-shrink-0 text-[12px] font-600 text-cyan hover:text-white transition-colors duration-200 group"
            >
              Get Started
              <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <button
            onClick={dismiss}
            aria-label="Dismiss announcement"
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-md text-text-muted hover:text-text-primary hover:bg-white/[0.06] transition-colors duration-200"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
