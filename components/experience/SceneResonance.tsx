"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { SceneState } from "./hooks";
import { TESTIMONIALS } from "./data";
import { useEffect } from "react";

const VOICE_POS = [
  { x: 15, y: 25 }, { x: 58, y: 20 },
  { x: 22, y: 62 }, { x: 65, y: 65 },
];

function TestimonialCard({ t, pos, index, mouse }: { t: typeof TESTIMONIALS[0]; pos: typeof VOICE_POS[0]; index: number; mouse: { x: number; y: number } }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 120 };
  const sx = useSpring(mx, springConfig);
  const sy = useSpring(my, springConfig);

  useEffect(() => {
    const factor = (index % 2 === 0 ? 1 : -1) * (10 + index * 3);
    mx.set((mouse.x / (typeof window !== 'undefined' ? window.innerWidth : 1000) - 0.5) * factor);
    my.set((mouse.y / (typeof window !== 'undefined' ? window.innerHeight : 1000) - 0.5) * factor);
  }, [mouse, index, mx, my]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 30, filter: "blur(15px)" }}
      whileInView={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 * index, duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="voice-entity glass-panel"
      style={{
        left: `${pos.x}%`,
        top: `${pos.y}%`,
        x: sx,
        y: sy,
        zIndex: 20,
        padding: 32,
        cursor: "default"
      }}
    >
      <div style={{ fontSize: 40, color: "var(--accent)", opacity: 0.15, fontWeight: 800, lineHeight: 1, marginBottom: -10 }}>&ldquo;</div>
      <p className="voice-entity-quote" style={{ fontSize: 15, lineHeight: 1.6, color: "var(--text-primary)", position: "relative", zIndex: 1 }}>{t.quote}</p>
      
      <div className="voice-entity-author" style={{ marginTop: 24 }}>
        <div className="voice-entity-avatar" style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))" }}>
          {t.initials}
        </div>
        <div>
          <p style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)" }}>{t.name}</p>
          <p style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600, marginTop: 2 }}>{t.title}, {t.company}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function ResonanceScene({ scene, mouse }: { scene: SceneState; mouse: { x: number; y: number } }) {
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
          Voices of Impact
        </motion.span>
      </div>

      {TESTIMONIALS.map((t, i) => (
        <TestimonialCard key={t.name} t={t} pos={VOICE_POS[i]} index={i} mouse={mouse} />
      ))}
    </motion.div>
  );
}
