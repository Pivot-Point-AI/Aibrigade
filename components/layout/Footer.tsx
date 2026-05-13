"use client";

import Link from "next/link";
import Image from "next/image";
import { Linkedin, Twitter, Github, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const footerLinks = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Team", href: "/about#team" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "/blog" },
    { label: "Press", href: "/press" },
  ],
  services: [
    { label: "AI Copilots", href: "/services#ai-copilots" },
    { label: "Workflow Automation", href: "/services#workflow-automation" },
    { label: "Internal GPT Systems", href: "/services#internal-gpt" },
    { label: "Decision Intelligence", href: "/services#decision-intelligence" },
  ],
  resources: [
    { label: "Use Cases", href: "/projects" },
    { label: "AI Readiness Guide", href: "/resources/ai-readiness" },
    { label: "Tech Stack", href: "/about#tech" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

const socialLinks = [
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Github, href: "https://github.com", label: "GitHub" },
];

export function Footer() {
  return (
    <footer className="relative mt-0 border-t border-border overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-bg-secondary pointer-events-none">
        <div className="absolute inset-0 bg-grid-sm opacity-40" />
        <div className="absolute top-0 left-1/4 w-[500px] h-[350px] bg-violet/[0.08] blur-[110px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[250px] bg-cyan/[0.06] blur-[90px] rounded-full" />
      </div>

      <div className="container-custom relative">

        {/* ── Top CTA strip ───────────────────────── */}
        <div className="py-12 border-b border-border">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <h2 className="heading-lg text-2xl lg:text-3xl text-text-primary mb-1.5">
                Ready to ship AI systems?
              </h2>
              <p className="text-text-secondary text-sm">
                Start with a systems audit and production blueprint.
              </p>
            </div>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-cyan to-cyan-dark text-background font-display font-700 rounded-xl hover:shadow-glow-cyan hover:scale-[1.02] transition-all duration-300 text-sm flex-shrink-0"
            >
              Deploy Your First System
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        {/* ── Main grid ───────────────────────────── */}
        <div className="py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6 group w-fit">
              <Image
                src="/image.png"
                alt="AI Brigade"
                width={100}
                height={104}
                className="object-contain transition-transform duration-300 group-hover:scale-105"
                quality={100}
                style={{
                  filter: "drop-shadow(0 0 16px rgba(0,212,255,0.7)) drop-shadow(0 0 8px rgba(155,77,255,0.5))",
                }}
              />
      
            </Link>

            <p className="text-text-secondary text-sm leading-relaxed max-w-xs mb-6">
              AI Brigade designs and deploys production AI systems for operations, support, and decision workflows.
            </p>

            {/* Contact info */}
            <div className="space-y-2.5 mb-6">
              <a
                href="mailto:contact@aibrigade.ai"
                className="flex items-center gap-2.5 text-sm text-text-secondary hover:text-cyan transition-colors group/link"
              >
                <Mail className="w-4 h-4 text-cyan/50 group-hover/link:text-cyan transition-colors flex-shrink-0" />
                contact@aibrigade.ai
              </a>
              <a
                href="tel:+14150000000"
                className="flex items-center gap-2.5 text-sm text-text-secondary hover:text-cyan transition-colors group/link"
              >
                <Phone className="w-4 h-4 text-cyan/50 group-hover/link:text-cyan transition-colors flex-shrink-0" />
                +1 (415) 000-0000
              </a>
              <div className="flex items-center gap-2.5 text-sm text-text-secondary">
                <MapPin className="w-4 h-4 text-cyan/50 flex-shrink-0" />
                <span>San Francisco, CA · New York, NY</span>
              </div>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-2">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-surface border border-border flex items-center justify-center text-text-muted hover:text-cyan hover:border-cyan/30 hover:bg-cyan/5 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {(["company", "services", "resources"] as const).map((col) => (
            <div key={col}>
              <h3 className="font-mono font-600 text-[0.65rem] tracking-[0.18em] uppercase text-text-muted mb-5">
                {col.charAt(0).toUpperCase() + col.slice(1)}
              </h3>
              <ul className="space-y-2.5">
                {footerLinks[col].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-secondary hover:text-text-primary transition-all duration-150 inline-block hover:translate-x-0.5"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Bottom bar ──────────────────────────── */}
        <div className="py-5 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-text-muted text-xs">
            © {new Date().getFullYear()} AIBrigade, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
            <span className="text-xs text-text-muted">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
