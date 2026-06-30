"use client";

import { cn } from "@/lib/utils";
import { HTMLAttributes, useRef, useState } from "react";

interface TiltCardProps extends HTMLAttributes<HTMLDivElement> {
  glowColor?: string;
  maxTilt?: number;
}

export function TiltCard({
  glowColor = "rgba(0,212,255,0.25)",
  maxTilt = 8,
  className,
  children,
  style,
  ...props
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glow, setGlow] = useState({ x: 50, y: 50, active: false });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({
      x: (py - 0.5) * -2 * maxTilt,
      y: (px - 0.5) * 2 * maxTilt,
    });
    setGlow({ x: px * 100, y: py * 100, active: true });
  }

  function handleMouseLeave() {
    setTilt({ x: 0, y: 0 });
    setGlow((g) => ({ ...g, active: false }));
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative rounded-2xl bg-surface border border-border shadow-card transition-shadow duration-300 [transform-style:preserve-3d] will-change-transform",
        className
      )}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 150ms ease-out",
        ...style,
      }}
      {...props}
    >
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
        style={{
          opacity: glow.active ? 1 : 0,
          background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, ${glowColor}, transparent 60%)`,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
