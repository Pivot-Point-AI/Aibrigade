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
  { num: "01", title: "Discover", desc: "Understand your business goals and identify high-value AI opportunities." },
  { num: "02", title: "Design", desc: "Architect the right AI solution for your business." },
  { num: "03", title: "Build", desc: "Develop and test using Agile methodologies and rapid iterations." },
  { num: "04", title: "Deploy", desc: "Launch securely into production with ongoing monitoring and optimization." },
  { num: "05", title: "Scale", desc: "Continuously improve and expand your AI capabilities as your business grows." },
];

const TESTIMONIAL_TAGS: Record<string, string[]> = {
  "t-001": ["Credit Risk System", "Regulatory Compliance", "Model Interpretability"],
  "t-002": ["SDOH Integration", "Care Coordination", "Quality Scores"],
  "t-003": ["Fraud Detection", "Graph Neural Network", "Real-time Scoring"],
  "t-004": ["Ambient Documentation", "Speech AI", "Clinical Workflow"],
};

export const TESTIMONIALS = testimonialsData.slice(0, 4).map(t => ({
  quote: t.quote,
  name: t.name,
  title: t.role,
  company: t.company,
  industry: t.industry === "Fintech" ? "Fintech / Banking" : "HealthTech / Clinical",
  industryIcon: t.industry === "Fintech" ? "Landmark" : "HeartPulse",
  tags: TESTIMONIAL_TAGS[t.id] ?? [],
  initials: t.name.split(" ").map(n => n[0]).join("")
}));

export const TRUSTED_LOGOS = [
  "JPMorgan Chase & Co.", "Citi", "HSBC", "US Bank", "Wells Fargo", "American Express",
];

export const METRICS = [
  { value: 47, suffix: "+", label: "AI Systems Deployed" },
  { value: 340, prefix: "$", suffix: "M", label: "Client Value Generated" },
  { value: 3.2, suffix: "×", label: "Avg. Productivity Lift" },
  { value: "", suffix: "Global", label: "Reach" },
];

export const SCENE_LABELS = ["Genesis", "Cognition", "Memory", "Resonance", "Signal"];
