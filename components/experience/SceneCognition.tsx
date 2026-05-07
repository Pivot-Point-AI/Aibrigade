"use client";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { SceneState } from "./hooks";
import { SERVICES } from "./data";
import { useEffect } from "react";

const ORB_POSITIONS = [
  { x: 15, y: 22 }, { x: 75, y: 18 }, { x: 45, y: 50 },
  { x: 12, y: 75 }, { x: 78, y: 72 }, { x: 52, y: 92 },
];

function ServiceOrb({ s, pos, index, mouse }: { s: typeof SERVICES[0]; pos: typeof ORB_POSITIONS[0]; index: number; mouse: { x: number; y: number } }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 150 };
  const sx = useSpring(mx, springConfig);
  const sy = useSpring(my, springConfig);

  useEffect(() => {
    const factor = (index % 2 === 0 ? 1 : -1) * (15 + index * 5);
    mx.set((mouse.x / (typeof window !== 'undefined' ? window.innerWidth : 1000) - 0.5) * factor);
    my.set((mouse.y / (typeof window !== 'undefined' ? window.innerHeight : 1000) - 0.5) * factor);
  }, [mouse, index, mx, my]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, filter: "blur(20px)" }}
      whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 * index, duration: 1, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "absolute",
        left: `${pos.x}%`,
        top: `${pos.y}%`,
        x: sx,
        y: sy,
        zIndex: 20
      }}
    >
      <motion.div 
        className="glass-orb"
        whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(59,130,246,0.15)" }}
        style={{
          width: "clamp(160px, 15vw, 200px)",
          height: "clamp(160px, 15vw, 200px)",
          padding: 24,
          cursor: "pointer"
        }}
      >
        <div className="service-orb-icon" style={{ fontSize: "2.5rem", marginBottom: 12 }}>{s.icon}</div>
        <div className="service-orb-title" style={{ fontSize: "1rem", fontWeight: 700, marginBottom: 8 }}>{s.title}</div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center" }}>
          {s.tags.map(t => (
            <span key={t} style={{ 
              fontSize: 9, padding: "3px 8px", borderRadius: 20, 
              background: "rgba(59,130,246,0.06)", color: "var(--accent)", 
              fontFamily: "var(--font-mono)", fontWeight: 700,
              border: "1px solid rgba(59,130,246,0.1)"
            }}>{t}</span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function CognitionScene({ scene, mouse }: { scene: SceneState; mouse: { x: number; y: number } }) {
  if (!scene.active) return null;

  return (
    <motion.div className="exp-scene" style={{ opacity: scene.opacity }}>
      <div style={{ position: "absolute", top: 120, left: "50%", transform: "translateX(-50%)", textAlign: "center" }}>
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="exp-mono" 
          style={{ color: "var(--text-muted)", fontWeight: 700, letterSpacing: "0.2em" }}
        >
          Capabilities
        </motion.span>
      </div>

      {SERVICES.map((s, i) => (
        <ServiceOrb key={s.title} s={s} pos={ORB_POSITIONS[i]} index={i} mouse={mouse} />
      ))}
    </motion.div>
  );
}
