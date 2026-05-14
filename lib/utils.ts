import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "…";
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
  }).format(new Date(date));
}

export const industryColors: Record<string, string> = {
  fintech: "cyan",
  healthtech: "violet",
  "ai-platform": "gold",
};

export const industryLabels: Record<string, string> = {
  fintech: "Fintech",
  healthtech: "HealthTech",
  "ai-platform": "AI Platform",
};
