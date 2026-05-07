"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SceneState } from "./hooks";
import { SERVICES } from "./data";

export default function SignalScene({ scene }: { scene: SceneState }) {
  const [form, setForm] = useState({ name: "", email: "", company: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  if (!scene.active) return null;

  const handleSubmit = () => {
    if (!form.name || !form.email) return;
    setSubmitted(true);
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div className="exp-scene" style={{ opacity: scene.opacity }}>
      <div style={{ position: "absolute", top: 120, left: "50%", transform: "translateX(-50%)" }}>
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="exp-mono" 
          style={{ color: "var(--text-muted)", fontWeight: 700, letterSpacing: "0.2em" }}
        >
          Get in Touch
        </motion.span>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: 600 }}
      >
        <h2 className="exp-display" style={{ fontSize: "clamp(32px, 4vw, 56px)", textAlign: "center", marginBottom: 12, letterSpacing: "-0.04em" }}>
          Let&apos;s build the{" "}
          <span className="text-gradient-main">future.</span>
        </h2>
        <p className="exp-body" style={{ textAlign: "center", maxWidth: 460, marginBottom: 48, fontSize: 16, color: "var(--text-secondary)" }}>
          Brief us on your project. Our engineering team will review and respond within 24 hours.
        </p>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="signal-form glass-panel" 
              style={{ textAlign: "center", padding: "60px 40px" }}
            >
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.2 }}
                style={{ fontSize: 64, marginBottom: 24 }}
              >
                ✦
              </motion.div>
              <h3 className="exp-display" style={{ fontSize: 28, marginBottom: 16 }}>Transmission Received</h3>
              <p className="exp-body" style={{ fontSize: 16, color: "var(--text-secondary)" }}>Your brief is being routed to our lead engineers. We&apos;ll be in touch shortly.</p>
              <button 
                className="signal-btn" 
                style={{ marginTop: 40, width: "auto", padding: "14px 32px", background: "rgba(15,23,42,0.05)", color: "var(--text-primary)", border: "1px solid rgba(15,23,42,0.1)" }} 
                onClick={() => setSubmitted(false)}
              >
                Send Another Brief
              </button>
            </motion.div>
          ) : (
            <motion.div 
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="signal-form glass-panel"
              style={{ padding: 48 }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                  <motion.div variants={item}>
                    <label style={{ display: "block", fontSize: 10, fontWeight: 800, marginBottom: 8, color: "var(--text-muted)", fontFamily: "var(--font-mono)", letterSpacing: "0.1em" }}>NAME</label>
                    <input className="signal-input" placeholder="Jane Smith" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                  </motion.div>
                  <motion.div variants={item}>
                    <label style={{ display: "block", fontSize: 10, fontWeight: 800, marginBottom: 8, color: "var(--text-muted)", fontFamily: "var(--font-mono)", letterSpacing: "0.1em" }}>EMAIL</label>
                    <input className="signal-input" type="email" placeholder="jane@company.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                  </motion.div>
                </div>
                <motion.div variants={item}>
                  <label style={{ display: "block", fontSize: 10, fontWeight: 800, marginBottom: 8, color: "var(--text-muted)", fontFamily: "var(--font-mono)", letterSpacing: "0.1em" }}>COMPANY</label>
                  <input className="signal-input" placeholder="Acme Corp" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} />
                </motion.div>
                <motion.div variants={item}>
                  <label style={{ display: "block", fontSize: 10, fontWeight: 800, marginBottom: 8, color: "var(--text-muted)", fontFamily: "var(--font-mono)", letterSpacing: "0.1em" }}>SERVICE</label>
                  <select className="signal-input" value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}>
                    <option value="">Select a service…</option>
                    {SERVICES.map(s => <option key={s.title} value={s.title}>{s.title}</option>)}
                    <option value="Not sure">Not sure yet</option>
                  </select>
                </motion.div>
                <motion.div variants={item}>
                  <label style={{ display: "block", fontSize: 10, fontWeight: 800, marginBottom: 8, color: "var(--text-muted)", fontFamily: "var(--font-mono)", letterSpacing: "0.1em" }}>PROJECT DETAILS</label>
                  <textarea className="signal-input" style={{ height: 120, resize: 'none' }} placeholder="Tell us about your technical challenge…" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
                </motion.div>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="signal-btn" 
                  onClick={handleSubmit}
                  style={{ marginTop: 12 }}
                >
                  Submit Project Brief →
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          style={{ display: "flex", gap: 48, marginTop: 48 }}
        >
          {[{ l: "Direct Email", v: "hello@aibrigade.ai" }, { l: "Global Hubs", v: "London · NY · Singapore" }].map(c => (
            <div key={c.l} style={{ textAlign: "center" }}>
              <p className="exp-mono" style={{ fontSize: 10, marginBottom: 6, fontWeight: 700 }}>{c.l}</p>
              <p style={{ fontSize: 14, color: "var(--text-primary)", fontWeight: 600 }}>{c.v}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
