import type { Service } from "@/types";
import { cn } from "@/lib/utils";

type Color = Service["color"];

const industryTitleClass: Record<Color, string> = {
  cyan: "text-cyan",
  violet: "text-violet-light",
  gold: "text-gold",
};

export function IndustrySpotlightInset({
  industry,
  focus,
  metric,
  color,
  variant = "hero",
  className,
}: {
  industry: string;
  focus: string;
  metric: string;
  color: Color;
  variant?: "hero" | "panel";
  className?: string;
}) {
  const shell =
    variant === "hero"
      ? "border-white/[0.1] bg-black/[0.12]"
      : "border-border bg-surface-2/70";

  return (
    <div className={cn("rounded-xl border px-3.5 py-3 text-left", shell, className)}>
      <p className={cn("font-display font-700 text-sm", industryTitleClass[color])}>{industry}</p>
      <p className="text-text-primary text-xs sm:text-sm mt-1 leading-snug">{focus}</p>
      <p className="text-text-muted text-[0.75rem] sm:text-xs mt-1.5 leading-relaxed">{metric}</p>
    </div>
  );
}
