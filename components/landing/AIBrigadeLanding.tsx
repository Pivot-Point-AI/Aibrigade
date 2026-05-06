"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  BrainCircuit,
  Cpu,
  GitBranch,
  MessageSquare,
  Sparkles,
  Workflow,
} from "lucide-react";

type SectionProps = {
  eyebrow: string;
  title: string;
  description?: string;
  children: React.ReactNode;
};

const SECTION_TRANSITION = { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const };

function Section({ eyebrow, title, description, children }: SectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={SECTION_TRANSITION}
      className="relative mx-auto w-full max-w-6xl px-6 py-16 md:py-24"
    >
      <div className="mb-10 md:mb-12">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)]">{eyebrow}</p>
        <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-[var(--text-primary)] md:text-5xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-4 max-w-2xl text-sm text-[var(--text-secondary)] md:text-base">{description}</p>
        ) : null}
      </div>
      {children}
    </motion.section>
  );
}

function GlassCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`ai-card ${className}`}>{children}</div>;
}

function HeroVisual() {
  return (
    <GlassCard className="relative h-[360px] overflow-hidden p-6 md:h-[420px]">
      <div className="ai-grid-overlay absolute inset-0 opacity-35" />
      <motion.div
        className="absolute left-10 top-12 h-3 w-3 rounded-full bg-[var(--accent)]"
        animate={{ opacity: [0.35, 1, 0.35], scale: [1, 1.25, 1] }}
        transition={{ duration: 2.8, repeat: Infinity }}
      />
      <motion.div
        className="absolute right-16 top-24 h-3 w-3 rounded-full bg-[var(--accent-2)]"
        animate={{ opacity: [1, 0.35, 1], scale: [1, 1.15, 1] }}
        transition={{ duration: 2.4, repeat: Infinity, delay: 0.3 }}
      />
      <motion.div
        className="absolute bottom-16 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-white/70"
        animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.2, 1] }}
        transition={{ duration: 3, repeat: Infinity, delay: 0.8 }}
      />

      <motion.div
        className="absolute left-[52px] top-[55px] h-px origin-left bg-gradient-to-r from-[var(--accent)] to-transparent"
        animate={{ scaleX: [0.5, 1, 0.5], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2.6, repeat: Infinity }}
      />
      <motion.div
        className="absolute right-[68px] top-[95px] h-px w-28 origin-right bg-gradient-to-l from-[var(--accent-2)] to-transparent"
        animate={{ scaleX: [0.5, 1, 0.5], opacity: [0.45, 1, 0.45] }}
        transition={{ duration: 2.6, repeat: Infinity, delay: 0.5 }}
      />

      <div className="absolute inset-x-6 bottom-6 rounded-2xl border border-[var(--border)] bg-black/35 p-4 backdrop-blur">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--text-secondary)]">runtime log</p>
        <div className="mt-3 space-y-2 font-mono text-xs text-[var(--text-primary)]">
          <p>&gt; ingest.support_tickets(stream)</p>
          <p>&gt; route.intent_classifier(v3)</p>
          <p className="text-[var(--accent)]">&gt; deploy.agent_cluster(status=healthy)</p>
        </div>
      </div>
    </GlassCard>
  );
}

function SystemFlow() {
  const nodes = [
    { title: "Signal Ingestion", text: "Tickets, chats, docs, and live system events.", icon: MessageSquare },
    { title: "Intelligence Layer", text: "Context retrieval, orchestration, and policy-constrained reasoning.", icon: Cpu },
    { title: "Autonomous Execution", text: "Decisions, responses, and workflow actions with full traceability.", icon: Sparkles },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {nodes.map((node, index) => (
        <div key={node.title} className="relative">
          <GlassCard className="h-full p-6">
            <node.icon className="h-5 w-5 text-[var(--accent)]" />
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.15em] text-[var(--text-secondary)]">{node.title}</p>
            <p className="mt-2 text-sm text-[var(--text-primary)]">{node.text}</p>
          </GlassCard>
          {index < nodes.length - 1 ? (
            <motion.div
              className="absolute -right-3 top-1/2 hidden h-[2px] w-6 -translate-y-1/2 bg-gradient-to-r from-[var(--accent)] to-transparent md:block"
              animate={{ opacity: [0.45, 1, 0.45], scaleX: [0.85, 1.1, 0.85] }}
              transition={{ duration: 2.2, repeat: Infinity, delay: index * 0.3 }}
            />
          ) : null}
        </div>
      ))}
    </div>
  );
}

const capabilities = [
  { title: "AI Copilots", text: "Domain copilots for teams and customers.", icon: Bot },
  { title: "Workflow Automation", text: "Event-driven agents across your stack.", icon: Workflow },
  { title: "Internal GPT Systems", text: "Secure, grounded knowledge assistants.", icon: BrainCircuit },
  { title: "Decision Intelligence", text: "Reasoning systems for faster decisions.", icon: GitBranch },
];

const useCases = [
  "Customer Support Automation",
  "Sales AI Agents",
  "Internal Knowledge AI",
  "Operations Automation",
];

const demoOutputFrames = [
  "Analyzing support queue...\nDetected 312 tickets needing policy resolution.",
  "Launching triage agent...\nRouted 87% of tickets to auto-remediation flows.",
  "System update:\nAverage response time reduced by 41%.",
];

function InteractiveDemo() {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % demoOutputFrames.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <GlassCard className="relative overflow-hidden p-6 md:p-8">
      <div className="ai-grid-overlay absolute inset-0 opacity-25" />
      <div className="relative">
        <label className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--text-secondary)]">prompt</label>
        <div className="mt-2 rounded-xl border border-[var(--border)] bg-white/[0.03] px-4 py-3 font-mono text-sm text-[var(--text-primary)]">
          Build an agent that triages customer tickets and executes refunds by policy.
        </div>

        <label className="mt-6 block font-mono text-xs uppercase tracking-[0.18em] text-[var(--text-secondary)]">system output</label>
        <motion.pre
          key={frame}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mt-2 min-h-28 rounded-xl border border-[var(--border)] bg-black/35 p-4 font-mono text-sm leading-relaxed text-[var(--accent)]"
        >
          {demoOutputFrames[frame]}
        </motion.pre>
      </div>
    </GlassCard>
  );
}

export function AIBrigadeLanding() {
  return (
    <div className="relative overflow-hidden bg-[var(--bg)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(0,245,212,0.10),transparent_32%),radial-gradient(circle_at_85%_25%,rgba(34,197,94,0.08),transparent_30%)]" />
      <div className="pointer-events-none absolute inset-0 ai-grid-overlay opacity-30" />

      <section className="relative mx-auto grid w-full max-w-6xl gap-10 px-6 pb-16 pt-28 md:grid-cols-2 md:items-center md:gap-14 md:pb-24 md:pt-36">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={SECTION_TRANSITION}>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--accent)]">AI Brigade // Systems Company</p>
          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] text-[var(--text-primary)] md:text-6xl">
            Build AI Systems,
            <br />
            Not PowerPoints
          </h1>
          <p className="mt-6 max-w-xl text-sm text-[var(--text-secondary)] md:text-base">
            Deploy AI into your operations. Turn workflows into autonomous systems.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button className="ai-button-primary">
              Deploy AI Systems
              <ArrowRight className="h-4 w-4" />
            </button>
            <button className="ai-button-secondary">Request AI Audit</button>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ ...SECTION_TRANSITION, delay: 0.12 }}>
          <HeroVisual />
        </motion.div>
      </section>

      <Section
        eyebrow="System Architecture"
        title="From Signal to Autonomous Action"
        description="Production AI pipeline designed for reliability: capture operational context, reason with controls, execute measurable outcomes."
      >
        <SystemFlow />
      </Section>

      <Section eyebrow="Capabilities" title="AI Infrastructure You Can Ship">
        <div className="grid gap-4 md:grid-cols-2">
          {capabilities.map((item) => (
            <GlassCard key={item.title} className="group p-6 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,245,212,0.15)]">
              <item.icon className="h-5 w-5 text-[var(--accent)]" />
              <h3 className="mt-4 font-display text-xl font-semibold text-[var(--text-primary)]">{item.title}</h3>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">{item.text}</p>
            </GlassCard>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Interactive Demo"
        title="Run a System Prompt, See a System Response"
        description="Prototype UX for runtime behavior, orchestration events, and action execution."
      >
        <InteractiveDemo />
      </Section>

      <Section eyebrow="Use Cases" title="Built for Operational Workloads">
        <div className="grid gap-4 md:grid-cols-2">
          {useCases.map((useCase) => (
            <GlassCard key={useCase} className="p-6">
              <p className="font-display text-xl font-semibold text-[var(--text-primary)]">{useCase}</p>
            </GlassCard>
          ))}
        </div>
      </Section>

      <section className="relative mx-auto w-full max-w-6xl px-6 pb-24">
        <GlassCard className="relative overflow-hidden px-6 py-14 text-center md:px-12">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,245,212,0.13),transparent_58%)]" />
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)]">Deployment Ready</p>
          <h2 className="mt-4 font-display text-3xl font-bold text-[var(--text-primary)] md:text-5xl">
            Deploy Your First AI System
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-[var(--text-secondary)] md:text-base">
            Move from pilot to production with secure orchestration, monitoring, and measurable outcomes.
          </p>
          <button className="ai-button-primary mx-auto mt-8">Start Deployment</button>
        </GlassCard>
      </section>
    </div>
  );
}
