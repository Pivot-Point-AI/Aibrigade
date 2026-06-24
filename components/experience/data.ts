"use client";

import { services } from "@/data/services";
import { testimonials as testimonialsData } from "@/data/testimonials";
import projectsData from "@/data/projects.json";

const PILL_ICONS: Record<string, string> = {
  "AI in Fintech": "Landmark",
  "AI in Healthcare": "HeartPulse",
  "Custom AI Development": "Code2",
  "Automation & Integrations": "Bot",
  "AI in Retail": "ShoppingCart",
};

export const SERVICES = services.map(s => ({
  icon: s.icon,
  iconKey: PILL_ICONS[s.title] || "Bot",
  title: s.title,
  desc: s.shortDescription,
  tags: s.features.slice(0, 2)
}));

export const CASES = projectsData.slice(0, 3).map(p => ({
  client: p.client,
  headline: p.title,
  stat: p.outcomes[0].value,
  statLabel: p.outcomes[0].metric,
  detail: p.problem,
  tags: p.tags.slice(0, 2),
  color: p.industry === "fintech" ? "#3B82F6" : "#8B5CF6"
}));

export const PROCESS = [
  { num: "01", title: "Discovery Sprint", desc: "Two weeks embedded in your team—mapping workflows, quantifying AI opportunity." },
  { num: "02", title: "Architecture Design", desc: "Full system design—model selection, retrieval strategy, evaluation framework." },
  { num: "03", title: "Agile Build Cycles", desc: "Two-week sprints. Working prototypes from day one. Continuous evaluation." },
  { num: "04", title: "Production Deploy", desc: "Infrastructure, monitoring, rollout, staff training. Live with SLAs." },
  { num: "05", title: "Continuous Optimisation", desc: "Post-launch monitoring, A/B evaluations, compounding value." },
];

export const TESTIMONIALS = testimonialsData.slice(0, 4).map(t => ({
  quote: t.quote,
  name: t.name,
  title: t.role,
  company: t.company,
  initials: t.name.split(" ").map(n => n[0]).join("")
}));

export const METRICS = [
  { value: 47, suffix: "+", label: "AI Systems Deployed" },
  { value: 340, prefix: "$", suffix: "M", label: "Client Value Generated" },
  { value: 3.2, suffix: "×", label: "Avg. Productivity Lift" },
  { value: "", suffix: "Global", label: "Reach" },
];

export const SCENE_LABELS = ["Genesis", "Cognition", "Memory", "Resonance", "Signal"];
