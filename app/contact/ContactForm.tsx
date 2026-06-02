"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal, GlowOrbs } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { SITE_STATS, GLOBAL_PROOF_LINE } from "@/data/siteStats";
import {
  Mail, Phone, MapPin, Clock, Send, CheckCircle2,
  Calendar, MessageSquare, Sparkles, Linkedin, Twitter, ArrowRight,
} from "lucide-react";

const industries = [
  "Fintech / Banking", "Healthcare / Clinical", "Insurance",
  "Pharmaceuticals / Life Sciences", "Investment Management",
  "Digital Health", "Other",
];

const budgetRanges = [
  "< $50K", "$50K – $150K", "$150K – $500K",
  "$500K – $1M", "$1M+", "Not sure yet",
];

const BASE_INPUT = `
  w-full rounded-xl px-4 py-3 text-sm text-white
  placeholder:text-[rgba(232,243,255,0.32)]
  border bg-[rgba(255,255,255,0.05)]
  focus:outline-none focus:ring-2 transition-all
`;
const OK_INPUT   = `${BASE_INPUT} border-[rgba(255,255,255,0.1)] hover:border-[rgba(0,212,255,0.35)] focus:border-[rgba(0,212,255,0.55)] focus:ring-[rgba(0,212,255,0.15)]`;
const ERR_INPUT  = `${BASE_INPUT} border-red-500/60 bg-[rgba(255,80,80,0.05)] focus:ring-red-500/20`;

const LABEL = "block text-[10px] font-mono font-700 tracking-[0.22em] uppercase text-[rgba(232,243,255,0.6)] mb-2";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", company: "", phone: "", industry: "", budget: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [errors, setErrors]       = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!formData.name.trim())    e.name    = "Required";
    if (!formData.email.trim())   e.email   = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = "Invalid email";
    if (!formData.company.trim()) e.company = "Required";
    if (!formData.message.trim()) e.message = "Tell us about your project";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    await new Promise(r => setTimeout(r, 1800));
    setLoading(false);
    setSubmitted(true);
  };

  const update = (field: string, value: string) => {
    setFormData(d => ({ ...d, [field]: value }));
    if (errors[field]) setErrors(e => { const n = { ...e }; delete n[field]; return n; });
  };

  const selectStyle = { background: "#0A1128", color: "#FFFFFF" };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* ── Global background ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[700px] rounded-full blur-[180px]"
          style={{ background: "radial-gradient(ellipse,rgba(0,212,255,0.18) 0%,transparent 70%)" }} />
        <div className="absolute top-1/4 -right-40 w-[600px] h-[600px] rounded-full blur-[140px]"
          style={{ background: "radial-gradient(ellipse,rgba(155,77,255,0.14) 0%,transparent 70%)" }} />
        <div className="absolute bottom-0 -left-40 w-[500px] h-[500px] rounded-full blur-[140px]"
          style={{ background: "radial-gradient(ellipse,rgba(0,212,255,0.08) 0%,transparent 70%)" }} />
        <div className="absolute inset-0 opacity-35" style={{
          backgroundImage: "linear-gradient(rgba(0,212,255,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,255,0.06) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
        }} />
        <GlowOrbs />
      </div>

      <div className="container-custom relative pt-36 pb-28">
        {/* ── Page headline ── */}
        <Reveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-[rgba(0,212,255,0.3)] bg-[rgba(0,212,255,0.07)] mb-7"
              style={{ boxShadow: "0 0 24px rgba(0,212,255,0.14)" }}>
              <span className="w-2 h-2 rounded-full bg-[#00D4FF] animate-pulse" style={{ boxShadow: "0 0 10px #00D4FF" }} />
              <span className="text-[11px] font-mono font-700 tracking-[0.3em] uppercase text-[#00D4FF]">Get In Touch</span>
            </div>
            <h1 className="font-display font-700 text-white leading-[1.04] mb-6"
              style={{ fontSize: "clamp(2.6rem,5.5vw,4.8rem)" }}>
              Start your{" "}
              <span style={{
                background: "linear-gradient(135deg,#00D4FF 0%,#9B4DFF 55%,#C084FC 100%)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                animation: "gradient-shift 7s linear infinite",
              }}>AI journey</span>
            </h1>
            <p className="text-[rgba(232,243,255,0.85)] text-xl leading-relaxed max-w-2xl mx-auto mb-4">
              No sales pitch. No commitment. Just an honest conversation about your challenge — and whether AI can solve it.
            </p>
            {/* Proof strip */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-2">
              {[
                { value: SITE_STATS.projectsDelivered, label: "Systems shipped" },
                { value: SITE_STATS.valueDelivered,    label: "Value created" },
                { value: "Global",                     label: "Reach" },
              ].map(({ value, label }, i) => (
                <div key={label} className="flex items-center gap-6">
                  {i > 0 && <div className="w-px h-6 bg-[rgba(255,255,255,0.12)]" />}
                  <div className="text-center">
                    <div className="font-display font-700 text-white text-xl leading-none mb-0.5">{value}</div>
                    <div className="text-[10px] font-mono tracking-wider text-[rgba(232,243,255,0.5)] uppercase">{label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ── Two-column layout ── */}
        <div className="grid lg:grid-cols-5 gap-8 items-start">

          {/* ── Left sidebar ── */}
          <Reveal className="lg:col-span-2 flex flex-col gap-5">

            {/* Contact info */}
            <div className="rounded-2xl overflow-hidden" style={{
              border: "1px solid rgba(255,255,255,0.09)",
              background: "rgba(13,18,40,0.82)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 16px 48px rgba(0,0,0,0.35)",
            }}>
              <div className="px-6 py-4 border-b border-[rgba(255,255,255,0.07)] flex items-center gap-3"
                style={{ background: "linear-gradient(90deg,rgba(0,212,255,0.06),transparent)" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF]" style={{ boxShadow: "0 0 8px #00D4FF" }} />
                <span className="text-[11px] font-mono font-700 tracking-[0.25em] uppercase text-[rgba(232,243,255,0.55)]">Contact</span>
              </div>
              <div className="p-6 flex flex-col gap-5">
                {[
                  { icon: Mail,   label: "Email",    value: "contact@aibrigade.ai", href: "mailto:contact@aibrigade.ai" },
                  { icon: Phone,  label: "Phone",    value: "+1 (415) 000-0000",     href: "tel:+14150000000" },
                  { icon: MapPin, label: "Offices",  value: "San Francisco · New York" },
                  { icon: Clock,  label: "Response", value: "Within 24 hours" },
                ].map(({ icon: Icon, label, value, href }) => {
                  const row = (
                    <div className="flex items-center gap-4 group">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-105"
                        style={{ border: "1px solid rgba(0,212,255,0.3)", background: "rgba(0,212,255,0.08)" }}>
                        <Icon className="w-4 h-4 text-[#00D4FF]" />
                      </div>
                      <div>
                        <div className="text-[10px] font-mono tracking-wider text-[rgba(232,243,255,0.42)] uppercase mb-0.5">{label}</div>
                        <div className="text-sm text-[rgba(232,243,255,0.88)] group-hover:text-white transition-colors">{value}</div>
                      </div>
                    </div>
                  );
                  return href
                    ? <a key={label} href={href}>{row}</a>
                    : <div key={label}>{row}</div>;
                })}
              </div>
            </div>

            {/* What happens next */}
            <div className="rounded-2xl overflow-hidden" style={{
              border: "1px solid rgba(255,255,255,0.09)",
              background: "rgba(13,18,40,0.82)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 16px 48px rgba(0,0,0,0.35)",
            }}>
              <div className="px-6 py-4 border-b border-[rgba(255,255,255,0.07)] flex items-center gap-3"
                style={{ background: "linear-gradient(90deg,rgba(155,77,255,0.06),transparent)" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#C084FC]" style={{ boxShadow: "0 0 8px #C084FC" }} />
                <span className="text-[11px] font-mono font-700 tracking-[0.25em] uppercase text-[rgba(232,243,255,0.55)]">What Happens Next</span>
              </div>
              <div className="p-6 flex flex-col gap-5">
                {[
                  { icon: MessageSquare, num: "01", title: "We respond in 24h",         desc: "A real person — not an auto-responder.",               accent: "#00D4FF" },
                  { icon: Calendar,      num: "02", title: "30-min discovery call",      desc: "We ask questions. We listen. No slides.",              accent: "#C084FC" },
                  { icon: Sparkles,      num: "03", title: "AI Blueprint delivered",     desc: "Scoped proposal with timeline & ROI estimate.",        accent: "#00D4FF" },
                ].map(({ icon: Icon, num, title, desc, accent }) => (
                  <div key={num} className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-mono font-700 text-xs"
                      style={{ border: `1px solid ${accent}44`, background: `${accent}10`, color: accent }}>
                      {num}
                    </div>
                    <div>
                      <div className="text-sm font-600 text-white mb-0.5">{title}</div>
                      <div className="text-xs text-[rgba(232,243,255,0.55)] leading-relaxed">{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust stats + social */}
            <div className="rounded-2xl overflow-hidden" style={{
              border: "1px solid rgba(255,255,255,0.09)",
              background: "rgba(13,18,40,0.82)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 16px 48px rgba(0,0,0,0.35)",
            }}>
              {/* Stats row */}
              <div className="grid grid-cols-3 divide-x divide-[rgba(255,255,255,0.07)]">
                {[
                  { value: SITE_STATS.projectsDelivered, label: "Projects" },
                  { value: SITE_STATS.valueDelivered,    label: "Delivered" },
                  { value: "Global",                     label: "Reach" },
                ].map(({ value, label }) => (
                  <div key={label} className="flex flex-col items-center gap-0.5 py-5">
                    <span className="font-display font-800 text-white leading-none" style={{ fontSize: "1.4rem" }}>{value}</span>
                    <span className="text-[9px] font-mono tracking-widest text-[rgba(232,243,255,0.42)] uppercase">{label}</span>
                  </div>
                ))}
              </div>
              {/* Social + proof */}
              <div className="px-5 pb-5 pt-1 border-t border-[rgba(255,255,255,0.06)]">
                <div className="flex gap-3 mb-4 pt-4">
                  {[
                    { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
                    { href: "https://twitter.com",  icon: Twitter,  label: "Twitter" },
                  ].map(({ href, icon: Icon, label }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-600 text-[rgba(232,243,255,0.55)] transition-all duration-200 hover:text-[#00D4FF] hover:-translate-y-0.5"
                      style={{ border: "1px solid rgba(255,255,255,0.09)", background: "rgba(255,255,255,0.03)" }}>
                      <Icon className="w-3.5 h-3.5" /> {label}
                    </a>
                  ))}
                </div>
                {/* Proof line */}
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg,rgba(0,212,255,0.4),rgba(155,77,255,0.3),transparent)" }} />
                  <span className="text-[10px] font-mono font-700 tracking-[0.18em] uppercase whitespace-nowrap" style={{
                    background: "linear-gradient(135deg,#00D4FF,#fff,#C084FC)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                  }}>
                    {GLOBAL_PROOF_LINE}
                  </span>
                  <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg,transparent,rgba(155,77,255,0.3),rgba(0,212,255,0.4))" }} />
                </div>
              </div>
            </div>
          </Reveal>

          {/* ── Right: form ── */}
          <Reveal delay={0.12} className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div key="success"
                  initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
                  className="rounded-2xl p-14 text-center" style={{
                    border: "1px solid rgba(0,212,255,0.25)",
                    background: "rgba(13,18,40,0.88)",
                    backdropFilter: "blur(20px)",
                    boxShadow: "0 24px 64px rgba(0,0,0,0.45)",
                  }}>
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-7"
                    style={{ border: "1px solid rgba(0,212,255,0.35)", background: "rgba(0,212,255,0.1)", boxShadow: "0 0 40px rgba(0,212,255,0.2)" }}>
                    <CheckCircle2 className="w-10 h-10 text-[#00D4FF]" />
                  </div>
                  <h2 className="font-display font-700 text-white text-2xl mb-3">Message received!</h2>
                  <p className="text-[rgba(232,243,255,0.7)] leading-relaxed mb-8 max-w-sm mx-auto">
                    We&apos;ll be in touch within 24 hours. In the meantime, explore our case studies.
                  </p>
                  <Button variant="primary" href="/projects" iconRight={<ArrowRight className="w-4 h-4" />}>
                    View Case Studies
                  </Button>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="rounded-2xl overflow-hidden" style={{
                    border: "1px solid rgba(255,255,255,0.09)",
                    background: "rgba(13,18,40,0.88)",
                    backdropFilter: "blur(20px)",
                    boxShadow: "0 24px 64px rgba(0,0,0,0.45)",
                  }}>
                    {/* Form header */}
                    <div className="relative px-8 py-6 border-b border-[rgba(255,255,255,0.07)] overflow-hidden">
                      <div className="absolute inset-0" style={{ background: "linear-gradient(90deg,rgba(0,212,255,0.06),transparent)" }} />
                      <div className="absolute inset-x-0 bottom-0 h-px" style={{ background: "linear-gradient(90deg,rgba(0,212,255,0.5),rgba(155,77,255,0.3),transparent)" }} />
                      <div className="relative flex items-center gap-3 mb-3">
                        <div className="flex gap-1.5">
                          {["#FF5F57","#FEBC2E","#28C840"].map(c => (
                            <div key={c} className="w-3 h-3 rounded-full" style={{ background: c, opacity: 0.85 }} />
                          ))}
                        </div>
                        <span className="text-[11px] font-mono text-[rgba(232,243,255,0.3)] tracking-wider">brigade.ai / new-project</span>
                      </div>
                      <h2 className="relative font-display font-700 text-white text-xl mb-1">Tell us about your project</h2>
                      <p className="relative text-[rgba(232,243,255,0.55)] text-sm">
                        Fields marked <span className="text-[#00D4FF]">*</span> are required.
                      </p>
                    </div>

                    {/* Form body */}
                    <form onSubmit={handleSubmit} className="p-8 space-y-6" noValidate>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className={LABEL}>Full Name *</label>
                          <input type="text" value={formData.name} onChange={e => update("name", e.target.value)}
                            placeholder="Jane Smith" className={errors.name ? ERR_INPUT : OK_INPUT} />
                          {errors.name && <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>}
                        </div>
                        <div>
                          <label className={LABEL}>Work Email *</label>
                          <input type="email" value={formData.email} onChange={e => update("email", e.target.value)}
                            placeholder="jane@company.com" className={errors.email ? ERR_INPUT : OK_INPUT} />
                          {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className={LABEL}>Company *</label>
                          <input type="text" value={formData.company} onChange={e => update("company", e.target.value)}
                            placeholder="Acme Financial" className={errors.company ? ERR_INPUT : OK_INPUT} />
                          {errors.company && <p className="mt-1.5 text-xs text-red-400">{errors.company}</p>}
                        </div>
                        <div>
                          <label className={LABEL}>Phone (optional)</label>
                          <input type="tel" value={formData.phone} onChange={e => update("phone", e.target.value)}
                            placeholder="+1 (415) 000-0000" className={OK_INPUT} />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className={LABEL}>Industry</label>
                          <select value={formData.industry} onChange={e => update("industry", e.target.value)}
                            style={selectStyle} className={OK_INPUT + " appearance-none cursor-pointer"}>
                            <option value="" style={selectStyle}>Select industry</option>
                            {industries.map(i => <option key={i} value={i} style={selectStyle}>{i}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className={LABEL}>Budget Range</label>
                          <select value={formData.budget} onChange={e => update("budget", e.target.value)}
                            style={selectStyle} className={OK_INPUT + " appearance-none cursor-pointer"}>
                            <option value="" style={selectStyle}>Select budget</option>
                            {budgetRanges.map(b => <option key={b} value={b} style={selectStyle}>{b}</option>)}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className={LABEL}>Project Description *</label>
                        <textarea value={formData.message} onChange={e => update("message", e.target.value)}
                          rows={5} placeholder="Describe your challenge, what you've tried, and what success looks like..."
                          className={(errors.message ? ERR_INPUT : OK_INPUT) + " resize-none"} />
                        {errors.message && <p className="mt-1.5 text-xs text-red-400">{errors.message}</p>}
                      </div>

                      {/* Privacy */}
                      <p className="text-[rgba(232,243,255,0.42)] text-xs">
                        By submitting you agree to our{" "}
                        <a href="/privacy" className="text-[#00D4FF] hover:underline">Privacy Policy</a>.
                        {" "}We never share your data. NDAs available on request.
                      </p>

                      {/* Submit */}
                      <Button type="submit" variant="primary" size="lg"
                        loading={loading} iconRight={<Send className="w-4 h-4" />}
                        className="w-full">
                        Send Message
                      </Button>
                    </form>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
