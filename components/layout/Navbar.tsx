"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

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
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        style={{ top: "var(--announcement-offset, 0px)" }}
        className={cn(
          "fixed left-0 right-0 z-50 transition-[box-shadow,top] duration-300",
          "border-b border-white/[0.08] bg-[rgba(13,21,53,0.92)] backdrop-blur-xl",
          scrolled && "shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_0_1px_rgba(0,212,255,0.08)]"
        )}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-[72px] lg:h-[80px]">

            {/* Logo */}
              <Link href="/" className="flex items-center gap-3  group w-fit">
              <Image
                src="/image.png"
                alt="AI Brigade"
                width={70}
                height={64}
                className="object-contain transition-transform duration-300 group-hover:scale-105"
                quality={100}
                style={{
                  filter: "drop-shadow(0 0 16px rgba(0,212,255,0.7)) drop-shadow(0 0 8px rgba(155,77,255,0.5))",
                }}
              />
      
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative px-4 py-2 text-sm font-display font-500 rounded-xl transition-all duration-200",
                      isActive
                        ? "text-cyan"
                        : "text-text-secondary hover:text-text-primary"
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-cyan/8 rounded-xl border border-cyan/18"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.45 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-2.5">
              <Button variant="outline" size="sm" href="/contact">
                Request AI Consultation
              </Button>
              <Button variant="primary" size="sm" href="/contact">
                Request AI Resources
              </Button>
            </div>

            {/* Mobile toggle */}
            <button
              className="lg:hidden p-2 rounded-xl text-text-secondary hover:text-text-primary hover:bg-surface-2 transition-colors"
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
              className="absolute inset-0 bg-background/85 backdrop-blur-xl"
              onClick={() => setMobileOpen(false)}
            />

            {/* Side panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="absolute top-0 right-0 h-full w-[300px] glass-strong border-l border-border flex flex-col"
            >
              {/* Panel header */}
              <div className="flex items-center justify-between p-5 border-b border-border">
                <span className="font-display font-700 text-text-primary">Navigation</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-xl text-text-secondary hover:text-text-primary hover:bg-surface-2 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Links */}
              <nav className="flex flex-col p-5 gap-1 flex-1">
                {navLinks.map((link, i) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 + 0.1 }}
                    >
                      <Link
                        href={link.href}
                        className={cn(
                          "flex items-center px-4 py-3 rounded-xl font-display font-500 text-sm transition-all duration-200",
                          isActive
                            ? "bg-cyan/8 text-cyan border border-cyan/20"
                            : "text-text-secondary hover:text-text-primary hover:bg-surface-2"
                        )}
                      >
                        {link.label}
                        {isActive && (
                          <span className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan" />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Mobile CTAs */}
              <div className="p-5 border-t border-border space-y-2.5">
                <Button variant="outline" className="w-full" href="/contact">
                  Request AI Consultation
                </Button>
                <Button variant="primary" className="w-full" href="/contact">
                  Request AI Resources
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
