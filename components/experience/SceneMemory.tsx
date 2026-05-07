"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { SceneState } from "./hooks";
import { CASES } from "./data";
import { useEffect } from "react";

const FRAME_LAYOUT = [
  { x: "12%", y: "15%", z: 0 },
  { x: "55%", y: "25%", z: 1 },
  { x: "30%", y: "55%", z: 2 },
];

function CaseCard({ c, layout, index, mouse }: { c: typeof CASES[0]; layout: typeof FRAME_LAYOUT[0]; index: number; mouse: { x: number; y: number } }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springConfig = { damping: 30, stiffness: 100 };
  const sx = useSpring(mx, springConfig);
  const sy = useSpring(my, springConfig);

  useEffect(() => {
    const depth = (2 - layout.z) * 0.4 + 0.6;
    const factor = 12 * depth;
    mx.set((mouse.x / (typeof window !== 'undefined' ? window.innerWidth : 1000) - 0.5) * factor);
    my.set((mouse.y / (typeof window !== 'undefined' ? window.innerHeight : 1000) - 0.5) * factor);
  }, [mouse, layout.z, mx, my]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9, filter: "blur(20px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 + index * 0.15, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="memory-frame glass-panel"
      style={{
        left: layout.x,
        top: layout.y,
        width: "clamp(300px, 32vw, 440px)",
        x: sx,
        y: sy,
        zIndex: 10 + layout.z,
        padding: 40,
        cursor: "pointer"
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: c.color, boxShadow: `0 0 15px ${c.color}60` }} />
        <span className="exp-mono" style={{ color: c.color, fontWeight: 800, fontSize: 11 }}>{c.client}</span>
      </div>

      <motion.span 
        className="memory-frame-stat" 
        style={{ color: c.color, fontSize: "clamp(32px, 4.5vw, 56px)", letterSpacing: "-0.04em" }}
      >
        {c.stat}
      </motion.span>
      
      <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 8, fontFamily: "var(--font-mono)", fontWeight: 700, letterSpacing: "0.05em" }}>
        {c.statLabel.toUpperCase()}
      </p>

      <p className="exp-display" style={{ fontSize: "clamp(20px, 1.8vw, 26px)", marginTop: 24, lineHeight: 1.2, color: "var(--text-primary)" }}>
        {c.headline}
      </p>

      <p className="exp-body" style={{ fontSize: 15, marginTop: 16, lineHeight: 1.6, color: "var(--text-secondary)" }}>
        {c.detail}
      </p>

      <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
        {c.tags.map(t => (
          <span key={t} style={{ 
            fontSize: 10, padding: "4px 12px", borderRadius: 20, 
            background: `${c.color}08`, color: c.color, border: `1px solid ${c.color}15`,
            fontFamily: "var(--font-mono)", fontWeight: 700 
          }}>{t}</span>
        ))}
      </div>
    </motion.div>
  );
}

export default function MemoryScene({ scene, mouse }: { scene: SceneState; mouse: { x: number; y: number } }) {
  if (!scene.active) return null;

  return (
    <motion.div className="exp-scene" style={{ opacity: scene.opacity }}>
      <div style={{ position: "absolute", top: 120, left: "50%", transform: "translateX(-50%)" }}>
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="exp-mono" 
          style={{ color: "var(--text-muted)", fontWeight: 700, letterSpacing: "0.2em" }}
        >
          Case Studies
        </motion.span>
      </div>

      {CASES.map((c, i) => (
        <CaseCard key={c.client} c={c} layout={FRAME_LAYOUT[i]} index={i} mouse={mouse} />
      ))}
    </motion.div>
  );
}
