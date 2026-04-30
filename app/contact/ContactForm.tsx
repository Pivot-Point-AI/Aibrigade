"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal, GradientText, GlowOrbs } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  Mail, Phone, MapPin, Clock, Send, CheckCircle2, Calendar,
  Linkedin, Twitter, ArrowRight, MessageSquare, Sparkles,
} from "lucide-react";

const industries = [
  "Fintech / Banking",
  "Healthcare / Clinical",
  "Insurance",
  "Pharmaceuticals / Life Sciences",
  "Investment Management",
  "Digital Health",
  "Other",
];

const budgetRanges = [
  "< $50K",
  "$50K – $150K",
  "$150K – $500K",
  "$500K – $1M",
  "$1M+",
  "Not sure yet",
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    industry: "",
    budget: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!formData.name.trim()) e.name = "Name is required";
    if (!formData.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = "Enter a valid email";
    if (!formData.company.trim()) e.company = "Company is required";
    if (!formData.message.trim()) e.message = "Tell us about your project";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);

    // Simulate API call — replace with actual API endpoint
    await new Promise((resolve) => setTimeout(resolve, 1800));
    setLoading(false);
    setSubmitted(true);
  };

  const update = (field: string, value: string) => {
    setFormData((d) => ({ ...d, [field]: value }));
    if (errors[field]) setErrors((e) => { const n = { ...e }; delete n[field]; return n; });
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(59,130,246,0.1),transparent)]" />
          <div className="absolute inset-0 bg-grid opacity-40" />
          <GlowOrbs />
        </div>
        <div className="container-custom relative text-center max-w-3xl mx-auto">
          <Reveal>
            <div className="flex justify-center mb-6">
              <SectionLabel>Get In Touch</SectionLabel>
            </div>
            <h1 className="heading-display text-display-lg text-text-primary mb-5">
              Start Your{" "}
              <span className="text-gradient-cyan">AI Journey</span>
            </h1>
            <p className="text-text-secondary text-lg leading-relaxed">
              No sales pitch. No commitment. Just an honest conversation about 
              your challenge and whether AI can help.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Main content */}
      <section className="pb-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Left info panel */}
            <Reveal className="lg:col-span-2 space-y-6">
              {/* Contact info card */}
              <div className="bg-surface border border-border rounded-2xl p-7 shadow-card">
                <h2 className="font-display font-700 text-xl text-text-primary mb-6">
                  Contact Information
                </h2>
                <div className="space-y-5">
                  <a
                    href="mailto:hello@ivyleaguesolutions.ai"
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-cyan/10 border border-cyan/20 flex items-center justify-center flex-shrink-0 group-hover:bg-cyan/15 transition-colors">
                      <Mail className="w-4 h-4 text-cyan" />
                    </div>
                    <div>
                      <div className="text-text-muted text-xs mb-0.5">Email</div>
                      <div className="text-text-secondary text-sm group-hover:text-text-primary transition-colors">
                        hello@ivyleaguesolutions.ai
                      </div>
                    </div>
                  </a>

                  <a
                    href="tel:+14150000000"
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-cyan/10 border border-cyan/20 flex items-center justify-center flex-shrink-0 group-hover:bg-cyan/15 transition-colors">
                      <Phone className="w-4 h-4 text-cyan" />
                    </div>
                    <div>
                      <div className="text-text-muted text-xs mb-0.5">Phone</div>
                      <div className="text-text-secondary text-sm group-hover:text-text-primary transition-colors">
                        +1 (415) 000-0000
                      </div>
                    </div>
                  </a>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-cyan/10 border border-cyan/20 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-4 h-4 text-cyan" />
                    </div>
                    <div>
                      <div className="text-text-muted text-xs mb-0.5">Office</div>
                      <div className="text-text-secondary text-sm">
                        San Francisco, CA
                        <br />
                        New York, NY
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-cyan/10 border border-cyan/20 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-4 h-4 text-cyan" />
                    </div>
                    <div>
                      <div className="text-text-muted text-xs mb-0.5">Response Time</div>
                      <div className="text-text-secondary text-sm">
                        Within 24 hours
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* What to expect */}
              <div className="bg-surface border border-border rounded-2xl p-7 shadow-card">
                <h3 className="font-display font-700 text-text-primary mb-4">What Happens Next</h3>
                <div className="space-y-4">
                  {[
                    { icon: MessageSquare, step: "1", title: "We respond within 24 hours", desc: "A real person — not an auto-responder." },
                    { icon: Calendar, step: "2", title: "30-min discovery call", desc: "We ask questions. We listen. No slides." },
                    { icon: Sparkles, step: "3", title: "AI Blueprint delivered", desc: "A scoped proposal with timeline & ROI estimate." },
                  ].map(({ icon: Icon, step, title, desc }) => (
                    <div key={step} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-surface-2 border border-border flex items-center justify-center flex-shrink-0">
                        <span className="font-mono text-xs font-700 text-gradient-cyan">{step}</span>
                      </div>
                      <div>
                        <div className="font-display font-600 text-text-primary text-sm">{title}</div>
                        <div className="text-text-muted text-xs mt-0.5">{desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social */}
              <div className="bg-surface border border-border rounded-2xl p-7 shadow-card">
                <h3 className="font-display font-700 text-text-primary mb-4">Follow Our Work</h3>
                <div className="flex gap-2">
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 p-3 bg-surface-2 border border-border rounded-xl text-text-secondary hover:text-cyan hover:border-cyan/30 transition-all text-sm font-display font-500"
                  >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 p-3 bg-surface-2 border border-border rounded-xl text-text-secondary hover:text-cyan hover:border-cyan/30 transition-all text-sm font-display font-500"
                  >
                    <Twitter className="w-4 h-4" />
                    Twitter
                  </a>
                </div>
              </div>
            </Reveal>

            {/* Right: form */}
            <Reveal delay={0.15} className="lg:col-span-3">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-surface border border-border rounded-2xl p-10 shadow-card text-center"
                  >
                    <div className="w-20 h-20 rounded-full bg-success/12 border border-success/30 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-10 h-10 text-success" />
                    </div>
                    <h2 className="font-display font-600 text-2xl text-text-primary mb-3 leading-snug">
                      Message received!
                    </h2>
                    <p className="text-text-secondary leading-relaxed mb-8 max-w-sm mx-auto">
                      We'll be in touch within 24 hours. In the meantime, feel free to 
                      explore our case studies.
                    </p>
                    <Button variant="secondary" href="/projects" iconRight={<ArrowRight className="w-4 h-4" />}>
                      View Case Studies
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-surface border border-border rounded-2xl shadow-card overflow-hidden"
                  >
                    {/* Form header */}
                    <div className="px-8 pt-8 pb-6 border-b border-border bg-gradient-to-r from-cyan/5 to-transparent">
                      <h2 className="font-display font-700 text-xl text-text-primary mb-1">
                        Tell us about your project
                      </h2>
                      <p className="text-text-secondary text-sm">
                        All fields marked * are required.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 space-y-5" noValidate>
                      {/* Name + Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-display font-600 text-text-secondary mb-2 tracking-wide uppercase">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => update("name", e.target.value)}
                            placeholder="Jane Smith"
                            className={`w-full bg-surface-2 border rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-cyan/40 focus:border-cyan/40 transition-all ${errors.name ? "border-red-500/50" : "border-border hover:border-border-light"}`}
                          />
                          {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
                        </div>
                        <div>
                          <label className="block text-xs font-display font-600 text-text-secondary mb-2 tracking-wide uppercase">
                            Work Email *
                          </label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => update("email", e.target.value)}
                            placeholder="jane@company.com"
                            className={`w-full bg-surface-2 border rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-cyan/40 focus:border-cyan/40 transition-all ${errors.email ? "border-red-500/50" : "border-border hover:border-border-light"}`}
                          />
                          {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                        </div>
                      </div>

                      {/* Company + Phone */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-display font-600 text-text-secondary mb-2 tracking-wide uppercase">
                            Company *
                          </label>
                          <input
                            type="text"
                            value={formData.company}
                            onChange={(e) => update("company", e.target.value)}
                            placeholder="Acme Financial"
                            className={`w-full bg-surface-2 border rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-cyan/40 focus:border-cyan/40 transition-all ${errors.company ? "border-red-500/50" : "border-border hover:border-border-light"}`}
                          />
                          {errors.company && <p className="mt-1 text-xs text-red-400">{errors.company}</p>}
                        </div>
                        <div>
                          <label className="block text-xs font-display font-600 text-text-secondary mb-2 tracking-wide uppercase">
                            Phone (optional)
                          </label>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => update("phone", e.target.value)}
                            placeholder="+1 (415) 000-0000"
                            className="w-full bg-surface-2 border border-border hover:border-border-light rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-cyan/40 focus:border-cyan/40 transition-all"
                          />
                        </div>
                      </div>

                      {/* Industry + Budget */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-display font-600 text-text-secondary mb-2 tracking-wide uppercase">
                            Industry
                          </label>
                          <select
                            value={formData.industry}
                            onChange={(e) => update("industry", e.target.value)}
                            className="w-full bg-surface-2 border border-border hover:border-border-light rounded-xl px-4 py-3 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-cyan/40 focus:border-cyan/40 transition-all appearance-none cursor-pointer"
                          >
                            <option value="" className="bg-surface-2">Select industry</option>
                            {industries.map((i) => <option key={i} value={i} className="bg-surface-2">{i}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-display font-600 text-text-secondary mb-2 tracking-wide uppercase">
                            Budget Range
                          </label>
                          <select
                            value={formData.budget}
                            onChange={(e) => update("budget", e.target.value)}
                            className="w-full bg-surface-2 border border-border hover:border-border-light rounded-xl px-4 py-3 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-cyan/40 focus:border-cyan/40 transition-all appearance-none cursor-pointer"
                          >
                            <option value="" className="bg-surface-2">Select budget</option>
                            {budgetRanges.map((b) => <option key={b} value={b} className="bg-surface-2">{b}</option>)}
                          </select>
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block text-xs font-display font-600 text-text-secondary mb-2 tracking-wide uppercase">
                          Project Description *
                        </label>
                        <textarea
                          value={formData.message}
                          onChange={(e) => update("message", e.target.value)}
                          rows={5}
                          placeholder="Describe your challenge, what you've tried, and what success looks like..."
                          className={`w-full bg-surface-2 border rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-cyan/40 focus:border-cyan/40 transition-all resize-none ${errors.message ? "border-red-500/50" : "border-border hover:border-border-light"}`}
                        />
                        {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
                      </div>

                      {/* Privacy note */}
                      <p className="text-text-muted text-xs">
                        By submitting this form, you agree to our{" "}
                        <a href="/privacy" className="text-cyan hover:underline">Privacy Policy</a>. 
                        We never share your information. NDAs available on request.
                      </p>

                      {/* Submit */}
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        loading={loading}
                        iconRight={<Send className="w-4 h-4" />}
                        className="w-full"
                      >
                        Send Message
                      </Button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
