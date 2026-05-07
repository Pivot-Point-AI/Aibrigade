"use client";
import { motion } from "framer-motion";
import { SceneState } from "./hooks";
import { METRICS } from "./data";

function Counter({ m, delay }: { m: typeof METRICS[0]; delay: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 + delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      style={{ textAlign: "center", cursor: "default" }}
    >
      <p className="exp-display" style={{ fontSize: "clamp(32px,4vw,52px)", background: "linear-gradient(135deg,#0F172A,#3B82F6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontWeight: 800 }}>
        {m.prefix || ""}{m.value}{m.suffix}
      </p>
      <p className="exp-mono" style={{ marginTop: 8, fontSize: 11, color: "var(--text-muted)", fontWeight: 600 }}>{m.label}</p>
    </motion.div>
  );
}

export default function GenesisScene({ scene }: { scene: SceneState }) {
  if (!scene.active && scene.progress === 1) return null;
  const p = scene.progress;
  const exitP = Math.max(0, (p - 0.75) / 0.25);
  const exitScale = 1 + exitP * 0.15;
  const exitBlur = exitP * 20;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <motion.div 
      className="exp-scene" 
      style={{
        opacity: scene.opacity,
        filter: `blur(${exitBlur}px)`,
        transform: `scale(${exitScale})`,
        color: "var(--text-primary)",
        zIndex: 10
      }}
    >
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "0 24px", maxWidth: 1000 }}
      >
        {/* Tag */}
        <motion.div variants={item} style={{
          display: "inline-flex", alignItems: "center", gap: 10, padding: "8px 20px",
          background: "rgba(59,130,246,0.05)", border: "1px solid rgba(59,130,246,0.12)",
          borderRadius: 100, marginBottom: 32, boxShadow: "0 4px 20px rgba(59,130,246,0.04)"
        }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)", boxShadow: "0 0 12px rgba(59,130,246,0.5)" }} />
          <span className="exp-mono" style={{ color: "var(--accent)", fontSize: 11, fontWeight: 700 }}>AI Strategy + Engineering + Deployment</span>
        </motion.div>

        {/* Title */}
        <motion.h1 variants={item} className="exp-display" style={{
          fontSize: "clamp(42px,8.5vw,104px)",
          letterSpacing: "-0.05em",
          marginBottom: 24
        }}>
          Transforming business through{" "}
          <span className="text-gradient-main" style={{ display: "block" }}>
            autonomous AI.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p variants={item} className="exp-body" style={{
          fontSize: "clamp(18px,2vw,22px)", maxWidth: 700,
          color: "var(--text-secondary)", fontWeight: 400,
          lineHeight: 1.5, marginBottom: 64
        }}>
          AIBrigade is an elite engineering studio building the next generation of enterprise autonomy. We turn complex workflows into high-performance AI systems.
        </motion.p>

        {/* Metrics */}
        <motion.div variants={item} style={{
          display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "clamp(24px,5vw,60px)",
          width: "100%", padding: "40px", borderRadius: 32,
          background: "rgba(255,255,255,0.4)", backdropFilter: "blur(10px)",
          border: "1px solid rgba(15,23,42,0.04)",
          boxShadow: "0 20px 50px rgba(15,23,42,0.03)"
        }}>
          {METRICS.map((m, i) => <Counter key={m.label} m={m} delay={i * 0.1} />)}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
