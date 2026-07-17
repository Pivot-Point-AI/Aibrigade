"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone, ChevronRight, Users, Box, Scale } from "lucide-react";

const footerColumns = [
  {
    label: "Company",
    Icon: Users,
    links: [
      { label: "About AI Brigade", href: "/about" },
      { label: "Our Team",         href: "/about#team" },
      { label: "Contact Us",       href: "/contact" },
    ],
  },
  {
    label: "Services",
    Icon: Box,
    links: [
      { label: "AI in Fintech",             href: "/services#ai-fintech" },
      { label: "AI in Healthcare",          href: "/services#ai-healthcare" },
      { label: "Custom AI Development",     href: "/services#custom-ai-development" },
      { label: "Automation & Integrations", href: "/services#automation-integrations" },
      { label: "AI in Retail",              href: "/services#ai-in-retail" },
    ],
  },
  {
    label: "Legal",
    Icon: Scale,
    links: [
      { label: "Case Studies",     href: "/projects" },
      { label: "Privacy Policy",   href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

const contactInfo = {
  label: "Contact",
  email: "contact@aibrigade.ai",
  phone: "+1 (845) 300-2429",
  whatsapp: "https://wa.me/18453002429",
  locations: [
    { label: "United States · HQ", address: "370 Federal Court, Perth Amboy, NJ 08861, USA" },
    { label: "United Arab Emirates", address: "912, 9th Floor, YES Business Tower, Al Barsha Road, Al Barsha 1, Dubai" },
    { label: "Pakistan", address: "Corporate and Business Square, 1st/2nd Floor, Wazir Arcade, Park Ave, Block C, Gulberg Greens, Islamabad 44000" },
  ],
};

const LinkedinSvg = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" />
  </svg>
);
const XSvg = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
  </svg>
);
const InstagramSvg = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const socialLinks = [
  { Icon: LinkedinSvg,   href: "https://linkedin.com",  label: "LinkedIn" },
  { Icon: XSvg,          href: "https://twitter.com",  label: "X / Twitter" },
  { Icon: InstagramSvg,  href: "https://instagram.com", label: "Instagram" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#060c1e] pt-8">

      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan/40 to-transparent" />

      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-[400px] h-[250px] bg-violet/[0.08] blur-[100px] rounded-full -translate-x-1/4" />
      </div>

      <div className="container-custom relative">

        {/* ── Main content ── */}
        <div className="py-4 grid grid-cols-1 md:grid-cols-5 gap-6 items-start">

          {/* Brand column — spans 2 cols */}
          <div className="md:col-span-2 flex flex-col gap-3 max-w-xs">

            {/* Logo + name */}
            <div className="flex items-center gap-3">
              <Link href="/" className="group">
                <Image
                  src="/image.png"
                  alt="AI Brigade"
                  width={40}
                  height={37}
                  className="object-contain transition-transform duration-300 group-hover:scale-105"
                  quality={100}
                  style={{
                    filter: "drop-shadow(0 0 10px rgba(0,212,255,0.6)) drop-shadow(0 0 4px rgba(155,77,255,0.5))",
                  }}
                />
              </Link>
              <div>
                <span
                  className="text-base font-display font-700 tracking-wide block"
                  style={{ background: "linear-gradient(90deg, #a855f7, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                >
                  aibrigade.ai
                </span>
                <div className="w-6 h-[2px] rounded-full bg-cyan mt-0.5" />
              </div>
            </div>

            <p className="text-sm text-gray-300 leading-[1.6]">
              Your AI Product Development Brigade — building intelligent products, AI agents, and enterprise automation from idea to production.
            </p>

            <div className="flex items-center gap-2.5">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg border border-white/[0.12] flex items-center justify-center text-white/45 hover:text-cyan hover:border-cyan/30 hover:bg-cyan/[0.07] transition-all duration-200"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Nav link columns — COMPANY, SERVICES, LEGAL each take 1 col */}
          {footerColumns.map(({ label, Icon, links }) => (
            <div key={label} className="flex flex-col gap-2">

              {/* Column header */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg border border-violet/40 bg-violet/[0.12] flex items-center justify-center shrink-0">
                    <Icon className="w-3.5 h-3.5 text-violet-300" />
                  </div>
                  <span className="text-sm font-semibold uppercase tracking-wider text-white">
                    {label}
                  </span>
                </div>
                <div className="w-8 h-[2px] rounded-full bg-gradient-to-r from-violet-500 to-cyan/50" />
              </div>

              {/* Links */}
              <ul className="flex flex-col gap-0">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="flex items-center justify-between py-2 text-sm text-gray-300 hover:text-white border-b border-white/[0.06] hover:border-white/[0.12] transition-all duration-150 group/link"
                    >
                      {link.label}
                      <ChevronRight className="w-4 h-4 text-cyan/60 group-hover/link:text-cyan shrink-0 transition-colors duration-150" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Offices strip — contact + 3 offices, all in one row ── */}
        <div className="pb-4 border-t border-white/[0.08] pt-5">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-3.5 h-3.5 text-cyan/60" />
            <span className="text-xs font-semibold uppercase tracking-wider text-white/70">Our Offices</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3.5">
              <div className="text-[10px] font-mono font-semibold tracking-wider text-cyan/80 uppercase mb-1.5">Contact</div>
              <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-2 text-sm text-gray-300 hover:text-cyan py-0.5">
                <Mail className="w-3.5 h-3.5 text-cyan/60 shrink-0" />
                {contactInfo.email}
              </a>
              <a href={contactInfo.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-300 hover:text-cyan py-0.5">
                <Phone className="w-3.5 h-3.5 text-cyan/60 shrink-0" />
                {contactInfo.phone}
              </a>
            </div>
            {contactInfo.locations.map((loc) => (
              <div
                key={loc.label}
                className="rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3.5 hover:border-cyan/25 hover:bg-cyan/[0.03] transition-colors duration-150"
              >
                <div className="text-[10px] font-mono font-semibold tracking-wider text-cyan/80 uppercase mb-1.5">{loc.label}</div>
                <p className="text-sm text-gray-300 leading-relaxed">{loc.address}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-white/[0.08]">

          <div className="py-3 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-300 font-mono tracking-wide">
              © {new Date().getFullYear()} AI Brigade, Inc. All rights reserved.
            </p>
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-emerald-500/25 bg-emerald-500/[0.08]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse" />
                <span className="text-sm text-emerald-300/90 font-mono tracking-wide">All systems operational</span>
              </div>
              <div className="w-px h-5 bg-white/[0.12]" />
              <Link
                href="/contact"
                className="flex items-center gap-1.5 px-5 py-2 rounded-lg border border-cyan-400/50 text-sm text-gray-300 hover:text-white hover:border-cyan/70 hover:bg-cyan/[0.06] transition-all duration-200 font-mono"
              >
                Deploy AI →
              </Link>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
