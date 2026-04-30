"use client";

import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "glow" | "bordered";
  glowColor?: "cyan" | "violet" | "none";
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

export function Card({
  variant = "default",
  glowColor = "none",
  hover = true,
  padding = "md",
  className,
  children,
  ...props
}: CardProps) {
  const base =
    "relative rounded-2xl transition-all duration-300 overflow-hidden";

  const variants = {
    default: "bg-surface border border-border shadow-card",
    glass: "glass shadow-card",
    glow: "glass-card border border-border",
    bordered: "bg-transparent border border-border",
  };

  const paddings = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  const glowHover = {
    cyan: hover ? "hover:border-cyan/30 hover:shadow-card-hover hover:shadow-[0_8px_40px_rgba(59,130,246,0.1)]" : "",
    violet: hover ? "hover:border-violet/30 hover:shadow-card-hover hover:shadow-[0_8px_40px_rgba(100,116,139,0.1)]" : "",
    none: hover ? "hover:border-border-light hover:shadow-card-hover" : "",
  };

  return (
    <div
      className={cn(base, variants[variant], paddings[padding], glowHover[glowColor], className)}
      {...props}
    >
      {/* Inner shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// Badge / Tag component
interface BadgeProps {
  children: React.ReactNode;
  variant?: "cyan" | "violet" | "gold" | "neutral";
  size?: "sm" | "md";
  dot?: boolean;
  className?: string;
}

export function Badge({ children, variant = "cyan", size = "sm", dot = false, className }: BadgeProps) {
  const variants = {
    cyan: "bg-cyan/10 border-cyan/25 text-cyan",
    violet: "bg-violet/10 border-violet/25 text-violet-light",
    gold: "bg-gold/10 border-gold/25 text-gold",
    neutral: "bg-white/5 border-white/10 text-text-secondary",
  };

  const sizes = {
    sm: "text-[0.65rem] px-2.5 py-1",
    md: "text-xs px-3.5 py-1.5",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 border rounded-full font-mono font-500 tracking-wider uppercase",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {dot && (
        <span
          className={cn("w-1.5 h-1.5 rounded-full animate-pulse-slow", {
            "bg-cyan": variant === "cyan",
            "bg-violet-light": variant === "violet",
            "bg-gold": variant === "gold",
            "bg-text-secondary": variant === "neutral",
          })}
        />
      )}
      {children}
    </span>
  );
}

// Section label — pill style, matches homepage eyebrows
export function SectionLabel({
  children,
  className,
  variant = "cyan",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "cyan" | "violet" | "neutral";
}) {
  const tagClass = variant === "violet" ? "tag-violet" : variant === "neutral" ? "tag-neutral" : "tag-cyan";
  const dotClass = variant === "violet" ? "bg-violet-light" : variant === "neutral" ? "bg-text-muted" : "bg-cyan";
  return (
    <span className={cn(tagClass, className)}>
      <span className={cn("w-1.5 h-1.5 rounded-full", dotClass)} />
      {children}
    </span>
  );
}

// Stat card
interface StatCardProps {
  value: string;
  label: string;
  description?: string;
  color?: "cyan" | "violet" | "gold";
}

export function StatCard({ value, label, description, color = "cyan" }: StatCardProps) {
  const colors = {
    cyan: "text-gradient-cyan",
    violet: "text-gradient-violet",
    gold: "text-gradient-gold",
  };

  return (
    <div className="flex flex-col gap-1">
      <div className={cn("font-display font-700 text-4xl lg:text-5xl", colors[color])}>
        {value}
      </div>
      <div className="text-text-primary font-600 font-display text-sm">{label}</div>
      {description && <div className="text-text-muted text-xs">{description}</div>}
    </div>
  );
}
