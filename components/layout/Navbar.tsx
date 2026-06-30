"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";


const navLinks = [
  { label: "Home", href: "/" },
  { label: "Platform", href: "/services" },
  { label: "Use Cases", href: "/projects" },
  { label: "Company", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] }}
        style={{ top: "var(--announcement-offset, 0px)" }}
        className={cn(
          "fixed left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-[rgba(8,14,38,0.97)] backdrop-blur-2xl shadow-[0_1px_0_rgba(255,255,255,0.06),0_16px_48px_rgba(0,0,0,0.6)]"
            : "bg-[rgba(8,14,38,0.75)] backdrop-blur-xl border-b border-white/[0.05]"
        )}
      >
        {/* Thin accent line at top */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan/40 to-transparent" />

        <div className="container-custom">
          <div className="flex items-center justify-between h-[72px] lg:h-[76px]">

            {/* Logo */}
            <Link href="/" className="flex items-center group shrink-0">
              <Image
                src="/image.png"
                alt="AI Brigade"
                width={64}
                height={58}
                className="object-contain transition-transform duration-300 group-hover:scale-105"
                quality={100}
                style={{
                  filter: "drop-shadow(0 0 14px rgba(0,212,255,0.6)) drop-shadow(0 0 6px rgba(155,77,255,0.4))",
                }}
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative px-4 py-2 text-[13.5px] font-display font-500 rounded-lg transition-all duration-200 group/link",
                      isActive
                        ? "text-white"
                        : "text-white/55 hover:text-white/90"
                    )}
                  >
                    {/* Active background */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-white/[0.07] rounded-lg border border-white/[0.1]"
                        transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
                      />
                    )}
                    {/* Hover background */}
                    <span className="absolute inset-0 rounded-lg bg-white/0 group-hover/link:bg-white/[0.04] transition-colors duration-200" />
                    <span className="relative z-10">{link.label}</span>
                    {/* Active dot */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-dot"
                        className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan"
                        transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-2.5">
              <Link
                href="/contact"
                className="px-4 py-2 rounded-lg text-[13px] font-display font-500 text-white/65 border border-white/[0.12] hover:text-white hover:border-white/25 hover:bg-white/[0.04] transition-all duration-200"
              >
                Request AI Consultation
              </Link>
              <Link
                href="/contact"
                className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan text-[#080e26] text-[13px] font-display font-700 hover:bg-cyan/90 transition-all duration-200 shadow-[0_0_20px_rgba(0,212,255,0.25)] hover:shadow-[0_0_28px_rgba(0,212,255,0.4)]"
              >
                Request AI Resources
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              className="lg:hidden p-2 rounded-lg text-white/55 hover:text-white hover:bg-white/[0.06] transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation"
              aria-expanded={mobileOpen}
            >
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu className="w-5 h-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-[#080e26]/90 backdrop-blur-2xl"
              onClick={() => setMobileOpen(false)}
            />

            {/* Side panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute top-0 right-0 h-full w-[280px] bg-[rgba(12,18,45,0.98)] border-l border-white/[0.07] flex flex-col"
            >
              {/* Accent line */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-cyan/30 to-transparent" />

              {/* Panel header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.07]">
                <div className="flex flex-col leading-none">
                  <span className="font-display font-700 text-[14px] text-white">AI Brigade</span>
                  <span className="text-[10px] text-cyan/60 font-mono tracking-[0.12em] uppercase">Intelligence Platform</span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/[0.06] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Links */}
              <nav className="flex flex-col p-4 gap-0.5 flex-1">
                {navLinks.map((link, i) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 + 0.08 }}
                    >
                      <Link
                        href={link.href}
                        className={cn(
                          "flex items-center justify-between px-4 py-2.5 rounded-lg text-[13.5px] font-display font-500 transition-all duration-200",
                          isActive
                            ? "bg-white/[0.07] text-white border border-white/[0.1]"
                            : "text-white/50 hover:text-white/85 hover:bg-white/[0.04]"
                        )}
                      >
                        {link.label}
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan shrink-0" />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Mobile CTAs */}
              <div className="p-4 border-t border-white/[0.07] space-y-2">
                <Link
                  href="/contact"
                  className="flex items-center justify-center w-full py-2.5 rounded-lg border border-white/[0.12] text-white/70 hover:text-white hover:border-white/20 text-[13px] font-display font-500 transition-all duration-200"
                >
                  Request AI Consultation
                </Link>
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-cyan text-[#080e26] text-[13px] font-display font-700 hover:bg-cyan/90 transition-all duration-200 shadow-[0_0_16px_rgba(0,212,255,0.3)]"
                >
                  Request AI Resources
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
