"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const PROCESS = [
  { num: "01", title: "Discovery Sprint", desc: "Two weeks embedded in your team, mapping workflows and quantifying AI opportunity." },
  { num: "02", title: "Architecture Design", desc: "Full system design, including model selection, retrieval strategy, and evaluation framework." },
  { num: "03", title: "Agile Build Cycles", desc: "Two-week sprints. Working prototypes from day one. Continuous evaluation." },
  { num: "04", title: "Production Deploy", desc: "Infrastructure, monitoring, rollout, staff training. Live with SLAs." },
  { num: "05", title: "Continuous Optimization", desc: "Post-launch monitoring, A/B evaluations, compounding value." },
];

const HIGHLIGHTS = [
  "Senior AI engineers, no junior bench",
  "HIPAA & SOC2-aligned delivery practices",
  "Embedded teams, not black-box vendors",
  "Production SLAs from day one",
];

export function About() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-[-10%] -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-violet/10 blur-[160px]" />
      </div>

      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
          >
            <span className="tag-cyan mb-4 inline-flex">Why AIBrigade</span>
            <h2 className="font-display font-800 text-display-lg text-text-primary mb-5">
              We&apos;re the AI partner that{" "}
              <span className="text-gradient-main">ships, not just talks</span>
            </h2>
            <p className="text-text-secondary leading-relaxed mb-6">
              Most AI initiatives stall in pilot purgatory. We&apos;re different:
              a focused team of senior engineers and applied researchers who
              specialize in taking AI from prototype to production for fintech
              and healthtech companies that can&apos;t afford to get it wrong.
            </p>
            <ul className="space-y-3">
              {HIGHLIGHTS.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-text-secondary">
                  <CheckCircle2 size={18} className="text-cyan flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Floating glass stat panel with subtle 3D depth */}
          <motion.div
            initial={{ opacity: 0, x: 32, rotateY: -8 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            style={{ transformStyle: "preserve-3d", transformPerspective: 1200 }}
            className="relative"
          >
            <div className="glass-panel p-8 relative">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { value: "80+", label: "Projects Delivered" },
                  { value: "$340M", label: "Client Value Generated" },
                  { value: "3.2×", label: "Avg. Productivity Lift" },
                  { value: "100%", label: "Production Deployment" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="font-display font-800 text-3xl text-gradient-cyan mb-1">
                      {s.value}
                    </div>
                    <div className="text-xs text-text-muted">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Floating accent card */}
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 glass rounded-2xl px-5 py-4 border border-violet/25 hidden sm:block"
              style={{ transform: "translateZ(60px)" }}
            >
              <div className="text-xs text-text-muted mb-1">Industries Served</div>
              <div className="font-display font-700 text-text-primary">Fintech · HealthTech · Retail</div>
            </motion.div>
          </motion.div>
        </div>

        {/* Process timeline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h3 className="font-display font-700 text-display-sm text-text-primary">
            The Brigade Process
          </h3>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {PROCESS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.19, 1, 0.22, 1] }}
              whileHover={{ y: -6 }}
              className="glass rounded-2xl p-6 border border-border-light hover:border-cyan/30 transition-colors"
            >
              <div className="font-mono text-cyan/60 text-sm mb-3">{step.num}</div>
              <h4 className="font-display font-700 text-text-primary mb-2">{step.title}</h4>
              <p className="text-sm text-text-muted leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
