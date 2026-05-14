"use client";

import { cn } from "@/lib/utils";
import { forwardRef, ButtonHTMLAttributes } from "react";
import Link from "next/link";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "glow";
  size?: "sm" | "md" | "lg" | "xl";
  href?: string;
  external?: boolean;
  loading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      href,
      external = false,
      loading = false,
      iconLeft,
      iconRight,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const base =
      "relative inline-flex items-center justify-center gap-2 font-display font-600 rounded-xl transition-all duration-300 cursor-pointer select-none overflow-hidden group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/55 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary:
        "bg-gradient-to-r from-cyan to-cyan-dark text-background hover:shadow-glow-cyan hover:scale-[1.02] active:scale-[0.98] before:absolute before:inset-0 before:bg-white/10 before:opacity-0 hover:before:opacity-100 before:transition-opacity",
      secondary:
        "bg-surface-2 text-text-primary border border-border-light hover:border-cyan/40 hover:bg-surface hover:shadow-card-hover hover:scale-[1.02] active:scale-[0.98]",
      ghost:
        "bg-transparent text-text-secondary hover:text-text-primary hover:bg-surface-2 active:bg-surface",
      outline:
        "bg-transparent border border-cyan/30 text-cyan hover:bg-cyan/6 hover:border-cyan hover:shadow-glow-sm active:scale-[0.98]",
      glow:
        "bg-gradient-to-r from-violet to-violet-light text-white hover:shadow-glow-violet hover:scale-[1.02] active:scale-[0.98]",
    };

    const sizes = {
      sm: "h-9 px-4 text-sm gap-1.5",
      md: "h-11 px-6 text-sm",
      lg: "h-12 px-8 text-base",
      xl: "h-14 px-10 text-lg",
    };

    const classes = cn(base, variants[variant], sizes[size], className);

    const content = (
      <>
        {loading && (
          <svg
            className="animate-spin h-4 w-4 absolute"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        <span className={cn("flex items-center gap-2 transition-transform", loading && "opacity-0")}>
          {iconLeft && <span className="flex-shrink-0">{iconLeft}</span>}
          {children}
          {iconRight && (
            <span className="flex-shrink-0 transition-transform duration-200 group-hover:translate-x-0.5">
              {iconRight}
            </span>
          )}
        </span>
      </>
    );

    if (href) {
      return (
        <Link
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className={classes}
        >
          {content}
        </Link>
      );
    }

    return (
      <button ref={ref} disabled={disabled || loading} className={classes} {...props}>
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";
export { Button };
