"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "fade";
  duration?: number;
  once?: boolean;
  amount?: number;
}

export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 0.6,
  once = true,
  amount = 0.15,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount });

  const directionMap = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { y: 0, x: 60 },
    right: { y: 0, x: -60 },
    fade: { y: 0, x: 0 },
  };

  const initial = {
    opacity: 0,
    ...directionMap[direction],
  };

  const animate = isInView
    ? { opacity: 1, y: 0, x: 0 }
    : initial;

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Stagger container
interface StaggerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
}

export function StaggerContainer({ children, className, staggerDelay = 0.08, once = true }: StaggerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "left" | "right" | "fade";
}) {
  const directionMap = {
    up: { y: 30, x: 0 },
    left: { y: 0, x: 40 },
    right: { y: 0, x: -40 },
    fade: { y: 0, x: 0 },
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, ...directionMap[direction] },
        visible: {
          opacity: 1,
          y: 0,
          x: 0,
          transition: {
            duration: 0.55,
            ease: [0.21, 0.47, 0.32, 0.98],
          },
        },
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

// Glow orb background
export function GlowOrbs({ className }: { className?: string }) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[120px] animate-orb-1" style={{ background: "rgba(155,77,255,0.22)" }} />
      <div className="absolute top-[40%] right-[-15%] w-[500px] h-[500px] rounded-full blur-[100px] animate-orb-2" style={{ background: "rgba(0,212,255,0.18)" }} />
      <div className="absolute bottom-[-10%] left-[30%] w-[400px] h-[400px] rounded-full blur-[80px] animate-orb-3" style={{ background: "rgba(155,77,255,0.16)" }} />
    </div>
  );
}

// Gradient text
export function GradientText({
  children,
  variant = "main",
  className,
}: {
  children: React.ReactNode;
  variant?: "main" | "cyan" | "violet" | "gold";
  className?: string;
}) {
  const variants = {
    main: "text-gradient-main",
    cyan: "text-gradient-cyan",
    violet: "text-gradient-violet",
    gold: "text-gradient-gold",
  };

  return (
    <span className={cn(variants[variant], className)}>
      {children}
    </span>
  );
}

// Divider
export function Divider({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-4 my-8", className)}>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="w-1.5 h-1.5 rounded-full bg-cyan/40" />
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </div>
  );
}
