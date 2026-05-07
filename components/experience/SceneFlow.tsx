"use client";
import { motion } from "framer-motion";
import { SceneState } from "./hooks";
import { PROCESS } from "./data";

const NODE_Y = [20, 35, 50, 65, 80];
const NODE_X = [28, 62, 32, 68, 48];

export default function FlowScene({ scene }: { scene: SceneState }) {
  if (!scene.active) return null;
  const p = scene.progress;

  return (
    <motion.div className="exp-scene" style={{ opacity: scene.opacity }}>
      <div style={{ position: "absolute", top: 120, left: "50%", transform: "translateX(-50%)" }}>
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="exp-mono" 
          style={{ color: "var(--text-muted)", fontWeight: 700, letterSpacing: "0.2em" }}
        >
          Our Process
        </motion.span>
      </div>

      {/* Flow path SVG */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 5 }}>
        <defs>
          <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        {PROCESS.map((_, i) => {
          if (i >= PROCESS.length - 1) return null;
          return (
            <motion.line key={i}
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.5 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.2, duration: 1.5, ease: "easeInOut" }}
              x1={`${NODE_X[i]}%`} y1={`${NODE_Y[i]}%`}
              x2={`${NODE_X[i + 1]}%`} y2={`${NODE_Y[i + 1]}%`}
              stroke="url(#flowGrad)" strokeWidth="2" strokeDasharray="8,8"
            />
          );
        })}
      </svg>

      {/* Process nodes */}
      {PROCESS.map((step, i) => {
        const isActive = p > i * 0.15 + 0.1;

        return (
          <motion.div 
            key={step.num} 
            className="flow-node"
            initial={{ opacity: 0, x: -30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              left: `${NODE_X[i]}%`, top: `${NODE_Y[i]}%`,
              transform: "translate(-50%,-50%)",
              zIndex: 10,
            }}
          >
            <motion.div 
              className={`flow-node-num ${isActive ? "active" : ""}`}
              whileHover={{ scale: 1.1, rotate: 5 }}
              style={{
                background: isActive ? 'var(--accent)' : 'white',
                color: isActive ? '#fff' : 'var(--text-primary)',
                boxShadow: isActive ? '0 0 30px rgba(59,130,246,0.25)' : '0 4px 12px rgba(15,23,42,0.04)',
                border: isActive ? 'none' : '1px solid rgba(15,23,42,0.08)',
                width: 52, height: 52, fontSize: "1.1rem"
              }}
            >
              {step.num}
            </motion.div>
            <div style={{ minWidth: 260 }}>
              <h3 className="exp-display" style={{ fontSize: 19, marginBottom: 4, color: "var(--text-primary)", fontWeight: 700 }}>{step.title}</h3>
              <p className="exp-body" style={{ fontSize: 14, lineHeight: 1.5, color: "var(--text-secondary)" }}>{step.desc}</p>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
