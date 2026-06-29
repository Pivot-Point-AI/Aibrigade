"use client";

import Link from "next/link";
import Image from "next/image";
import { Linkedin, Twitter, Github, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const footerLinks = {
  company: [
    { label: "About AI Brigade", href: "/about" },
    { label: "Our Team",         href: "/about#team" },
    { label: "Contact Us",       href: "/contact" },
  ],
  services: [
    { label: "AI in Fintech",          href: "/services#ai-fintech" },
    { label: "AI in Healthcare",       href: "/services#ai-healthcare" },
    { label: "Custom AI Development",  href: "/services#custom-ai-development" },
    { label: "Automation & Integrations", href: "/services#automation-integrations" },
    { label: "AI in Retail",           href: "/services#ai-in-retail" },
  ],
  legal: [
    { label: "Case Studies",     href: "/projects" },
    { label: "Privacy Policy",   href: "/privacy" },
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

        {/* ── Main grid ── */}
        <div className="py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-start">

          {/* Brand column */}
          <div className="flex flex-col gap-5">
            <Link href="/" className="w-fit group">
              <Image
                src="/image.png"
                alt="AI Brigade"
                width={80}
                height={84}
                className="object-contain transition-transform duration-300 group-hover:scale-105"
                quality={100}
                style={{ filter: "drop-shadow(0 0 12px rgba(0,212,255,0.6)) drop-shadow(0 0 6px rgba(155,77,255,0.4))" }}
              />
            </Link>

            <p className="text-text-secondary text-sm leading-relaxed">
              Your AI Product Development Brigade. Building intelligent products, AI agents, enterprise automation, and custom AI solutions that help businesses innovate faster. From idea to production.
            </p>

            <div className="flex flex-col gap-2">
              <a href="mailto:contact@aibrigade.ai"
                className="flex items-center gap-2 text-xs text-text-secondary hover:text-cyan transition-colors group/link">
                <Mail className="w-3.5 h-3.5 text-cyan/50 group-hover/link:text-cyan flex-shrink-0" />
                contact@aibrigade.ai
              </a>
              <div className="flex items-center gap-2 text-xs text-text-secondary">
                <MapPin className="w-3.5 h-3.5 text-cyan/50 flex-shrink-0" />
                San Francisco · New York
              </div>
            </div>

            <div className="flex items-center gap-2">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="w-8 h-8 rounded-lg bg-surface border border-border flex items-center justify-center text-text-muted hover:text-cyan hover:border-cyan/30 transition-all duration-200">
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {(["company", "services", "legal"] as const).map((col) => (
            <div key={col}>
              <h3 className="font-mono font-600 text-[0.6rem] tracking-[0.2em] uppercase text-text-muted mb-4">
                {col === "legal" ? "Legal" : col.charAt(0).toUpperCase() + col.slice(1)}
              </h3>
              <ul className="space-y-2">
                {footerLinks[col].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}
                      className="text-sm text-text-secondary hover:text-cyan transition-colors duration-150 inline-block hover:translate-x-0.5">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Bottom bar ── */}
        <div className="py-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-text-muted text-xs">
            © {new Date().getFullYear()} AI Brigade, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
              <span className="text-xs text-text-muted">All systems operational</span>
            </div>
            <Link href="/contact"
              className="inline-flex items-center gap-1.5 text-xs font-600 text-cyan hover:underline">
              Deploy AI →
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
