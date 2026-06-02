"use client";
import { useState } from "react";
import { SceneWrapper } from "./SceneComponents";
import { MousePosition, SceneData } from "./types";
import { PROCESS } from "./data";
import { useIsMobile } from "./hooks";

const ICONS = ["◈", "⬡", "◎", "⊡", "◇"];

export function MemoryScene({ scene, mouse, data }: { scene: number; mouse: MousePosition; data: SceneData }) {
  const isMobile = useIsMobile();
  const [active, setActive] = useState(0);

  const step = PROCESS[active];

  return (
    <SceneWrapper opacity={scene}>
      <div style={{
        width: "100%", height: "100%",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: isMobile ? "80px 20px 20px" : "0 60px",
        position: "relative",
      }}>

        {/* ── Header ── */}
        <div style={{ textAlign: "center", marginBottom: isMobile ? 28 : 40 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "6px 18px",
            background: "rgba(0,212,255,0.07)",
            border: "1px solid rgba(0,212,255,0.2)",
            borderRadius: 100, marginBottom: isMobile ? 12 : 16,
            backdropFilter: "blur(12px)",
          }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00D4FF", boxShadow: "0 0 8px #00D4FF" }} />
            <span style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: "#00D4FF", letterSpacing: "0.3em", textTransform: "uppercase", fontWeight: 700 }}>
              The Brigade Process
            </span>
          </div>
          <h2 style={{
            fontSize: isMobile ? "clamp(1.4rem,6vw,1.8rem)" : "clamp(1.8rem,3.5vw,2.8rem)",
            fontFamily: "'Playfair Display', Georgia, serif",
            color: "#fff", fontWeight: 700, lineHeight: 1.1, margin: 0,
          }}>
            From discovery sprint to{" "}
            <span style={{
              background: "linear-gradient(135deg,#00D4FF,#9B4DFF)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>continuous optimisation</span>
          </h2>
        </div>

        {/* ── Step pills (desktop horizontal / mobile scrollable) ── */}
        <div style={{
          display: "flex", gap: isMobile ? 8 : 12,
          marginBottom: isMobile ? 24 : 36,
          overflowX: isMobile ? "auto" : "visible",
          width: "100%", justifyContent: isMobile ? "flex-start" : "center",
          paddingBottom: isMobile ? 4 : 0,
        }}>
          {PROCESS.map((p, i) => {
            const isActive = i === active;
            return (
              <button
                key={p.num}
                onClick={() => setActive(i)}
                style={{
                  flexShrink: 0,
                  display: "flex", alignItems: "center", gap: 8,
                  padding: isMobile ? "7px 14px" : "9px 20px",
                  borderRadius: 100, border: "none", cursor: "pointer",
                  background: isActive ? "rgba(0,212,255,0.15)" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${isActive ? "rgba(0,212,255,0.5)" : "rgba(255,255,255,0.08)"}`,
                  backdropFilter: "blur(12px)",
                  transition: "all 0.3s ease",
                  boxShadow: isActive ? "0 0 20px rgba(0,212,255,0.2)" : "none",
                }}>
                <span style={{
                  fontSize: 9, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700,
                  color: isActive ? "#00D4FF" : "rgba(255,255,255,0.35)",
                  letterSpacing: "0.1em",
                }}>
                  {p.num}
                </span>
                <span style={{
                  fontSize: isMobile ? 10 : 11, fontWeight: 600,
                  color: isActive ? "#fff" : "rgba(255,255,255,0.45)",
                  whiteSpace: "nowrap",
                  fontFamily: "'Inter', sans-serif",
                }}>
                  {p.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Active step detail card ── */}
        <div style={{
          width: "100%", maxWidth: isMobile ? "100%" : 860,
          borderRadius: 20,
          background: "rgba(13,18,40,0.85)",
          border: "1px solid rgba(0,212,255,0.2)",
          backdropFilter: "blur(24px)",
          boxShadow: "0 24px 64px rgba(0,0,0,0.45), 0 0 0 1px rgba(0,212,255,0.05) inset",
          overflow: "hidden",
        }}>
          {/* Card top bar */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: isMobile ? "14px 18px" : "16px 28px",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            background: "linear-gradient(90deg,rgba(0,212,255,0.06),transparent)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
                background: "rgba(0,212,255,0.12)", border: "1px solid rgba(0,212,255,0.35)",
              }}>
                <span style={{ fontSize: 14, color: "#00D4FF" }}>{ICONS[active]}</span>
              </div>
              <div>
                <div style={{ fontSize: 9, fontFamily: "'JetBrains Mono', monospace", color: "rgba(0,212,255,0.7)", letterSpacing: "0.25em", textTransform: "uppercase" }}>
                  Phase {step.num}
                </div>
                <div style={{ fontSize: isMobile ? 14 : 16, fontWeight: 700, color: "#fff", fontFamily: "'Inter', sans-serif" }}>
                  {step.title}
                </div>
              </div>
            </div>
            {/* Progress indicator */}
            <div style={{ display: "flex", gap: 4 }}>
              {PROCESS.map((_, i) => (
                <div key={i} style={{
                  width: i === active ? 20 : 4, height: 4, borderRadius: 2,
                  background: i === active ? "#00D4FF" : "rgba(255,255,255,0.12)",
                  transition: "all 0.4s ease",
                  boxShadow: i === active ? "0 0 8px rgba(0,212,255,0.6)" : "none",
                }} />
              ))}
            </div>
          </div>

          {/* Card body — description + metrics */}
          <div style={{ padding: isMobile ? "20px 18px" : "28px 28px", display: "flex", flexDirection: isMobile ? "column" : "row", gap: isMobile ? 20 : 40, alignItems: "flex-start" }}>
            <div style={{ flex: 1 }}>
              <p style={{
                fontSize: isMobile ? 13 : 15, color: "rgba(232,243,255,0.85)",
                lineHeight: 1.7, margin: 0,
                fontFamily: "'Inter', sans-serif",
              }}>
                {step.desc}
              </p>

              {/* Deliverables */}
              <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 8 }}>
                {deliverables[active].map((d) => (
                  <div key={d} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#00D4FF", flexShrink: 0, boxShadow: "0 0 6px #00D4FF" }} />
                    <span style={{ fontSize: isMobile ? 11 : 12, color: "rgba(232,243,255,0.72)", fontFamily: "'Inter', sans-serif" }}>{d}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Duration badge */}
            <div style={{
              flexShrink: 0, padding: isMobile ? "14px 18px" : "18px 24px",
              borderRadius: 14, textAlign: "center",
              background: "rgba(0,212,255,0.06)",
              border: "1px solid rgba(0,212,255,0.15)",
            }}>
              <div style={{ fontSize: isMobile ? 22 : 28, fontWeight: 800, color: "#00D4FF", fontFamily: "'Inter', sans-serif", lineHeight: 1, textShadow: "0 0 24px rgba(0,212,255,0.5)" }}>
                {durations[active]}
              </div>
              <div style={{ fontSize: 9, fontFamily: "'JetBrains Mono', monospace", color: "rgba(255,255,255,0.4)", letterSpacing: "0.2em", textTransform: "uppercase", marginTop: 4 }}>
                Duration
              </div>
            </div>
          </div>

          {/* Navigation buttons */}
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: isMobile ? "12px 18px" : "14px 28px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}>
            <button onClick={() => setActive((a) => Math.max(0, a - 1))} style={{
              display: "flex", alignItems: "center", gap: 6,
              background: "none", border: "none", cursor: active === 0 ? "not-allowed" : "pointer",
              color: active === 0 ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.6)",
              fontSize: 11, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.1em",
              transition: "color 0.2s",
            }}>
              ← PREV
            </button>
            <span style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: "rgba(255,255,255,0.25)", letterSpacing: "0.2em" }}>
              {active + 1} / {PROCESS.length}
            </span>
            <button onClick={() => setActive((a) => Math.min(PROCESS.length - 1, a + 1))} style={{
              display: "flex", alignItems: "center", gap: 6,
              background: "none", border: "none", cursor: active === PROCESS.length - 1 ? "not-allowed" : "pointer",
              color: active === PROCESS.length - 1 ? "rgba(255,255,255,0.2)" : "rgba(0,212,255,0.8)",
              fontSize: 11, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.1em",
              transition: "color 0.2s",
            }}>
              NEXT →
            </button>
          </div>
        </div>
      </div>
    </SceneWrapper>
  );
}

const deliverables: string[][] = [
  ["AI opportunity map & business case", "Workflow gap analysis", "Technical feasibility report", "Prioritised use-case backlog"],
  ["Model selection & architecture blueprint", "Data pipeline design", "Evaluation & testing framework", "Infrastructure spec"],
  ["Working prototype after sprint 1", "Continuous integration & automated tests", "Stakeholder demo at each sprint review", "Live performance dashboard"],
  ["Zero-downtime production rollout", "Observability stack & alerting", "Staff onboarding & runbooks", "SLA & uptime guarantees"],
  ["Monthly model performance reviews", "A/B evaluation framework", "Drift detection & retraining pipeline", "Compounding ROI reporting"],
];

const durations = ["2 weeks", "1 week", "4–8 weeks", "1–2 weeks", "Ongoing"];
