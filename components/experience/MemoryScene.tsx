"use client";
import { useState } from "react";
import {
  Clock, Map, BarChart3, Target, Zap, CheckCircle2, ChevronLeft, ChevronRight,
  Repeat, TrendingUp, Compass,
} from "lucide-react";
import { SceneWrapper } from "./SceneComponents";
import { MousePosition, SceneData } from "./types";
import { PROCESS } from "./data";
import { useIsMobile, useWindowSize } from "./hooks";
import { Badge } from "@/components/ui/Card";

const ACTION_ICONS = [Clock, Map, BarChart3, Target];

const SUMMARY_STATS = [
  { icon: Zap, value: "2 Weeks", label: "Fast Turnaround" },
  { icon: Repeat, value: "100%", label: "Transparency" },
  { icon: TrendingUp, value: "Data-Driven", label: "Decisions" },
  { icon: Compass, value: "Measurable", label: "ROI Impact" },
];

export function MemoryScene({ scene, mouse, data }: { scene: number; mouse: MousePosition; data: SceneData }) {
  const isMobile = useIsMobile();
  const { width } = useWindowSize();
  const sidebarVisible = !isMobile && width >= 1400;
  const [active, setActive] = useState(0);

  const step = PROCESS[active];

  return (
    <SceneWrapper opacity={scene}>
      <div style={{
        width: "100%", height: "100%",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "flex-start",
        paddingTop: `calc(${isMobile ? 80 : 130}px + var(--announcement-offset, 0px))`,
        paddingBottom: isMobile ? 20 : 20,
        paddingLeft: isMobile ? 20 : "clamp(56px, 7vw, 100px)",
        paddingRight: isMobile ? 20 : sidebarVisible ? 284 : "clamp(24px, 4vw, 60px)",
        position: "relative",
        overflowX: "hidden",
        overflowY: isMobile ? "auto" : "hidden",
      }}>

        {/* ── Header ── */}
        <div style={{ textAlign: "center", marginBottom: isMobile ? 16 : 12 }}>
          <div style={{ marginBottom: isMobile ? 12 : 10 }}>
            <Badge variant="cyan" size="md" dot>The Brigade Process</Badge>
          </div>
          <h2 style={{
            fontSize: isMobile ? "clamp(1.5rem,6.5vw,1.9rem)" : "clamp(1.6rem,2.6vw,2.4rem)",
            fontFamily: "'Inter', sans-serif",
            color: "#F8FAFC", fontWeight: 800, lineHeight: 1.1, margin: 0, letterSpacing: "-0.02em",
            maxWidth: "100%", overflowWrap: "break-word",
          }}>
            From discovery sprint to{" "}
            <span style={{
              background: "linear-gradient(135deg,#00D4FF,#9B4DFF)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>continuous optimisation</span>
          </h2>
        </div>

        {/* ── Stepper — numbered circles connected by dotted line ── */}
        <div style={{
          display: "flex", alignItems: "center", gap: isMobile ? 4 : 0,
          marginBottom: isMobile ? 14 : 10,
          overflowX: isMobile ? "auto" : "visible",
          width: "100%", maxWidth: 920, justifyContent: isMobile ? "flex-start" : "center",
          paddingBottom: isMobile ? 4 : 0,
        }}>
          {PROCESS.map((p, i) => {
            const isActive = i === active;
            const isDone = i < active;
            return (
              <div key={p.num} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
                <button
                  onClick={() => setActive(i)}
                  style={{
                    display: "flex", alignItems: "center", gap: 10,
                    background: "none", border: "none", cursor: "pointer",
                    padding: isMobile ? "6px 8px" : "6px 10px",
                  }}>
                  <div style={{
                    width: 34, height: 34, borderRadius: "50%", flexShrink: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    position: "relative",
                    background: isActive ? "rgba(0,212,255,0.18)" : isDone ? "rgba(0,212,255,0.1)" : "rgba(255,255,255,0.04)",
                    border: `1.5px solid ${isActive ? "#00D4FF" : isDone ? "rgba(0,212,255,0.5)" : "rgba(255,255,255,0.15)"}`,
                    boxShadow: isActive ? "0 0 16px rgba(0,212,255,0.5)" : "none",
                  }}>
                    {isActive && (
                      <div style={{
                        position: "absolute", inset: -5, borderRadius: "50%",
                        border: "1px solid rgba(0,212,255,0.35)",
                      }} />
                    )}
                    <span style={{
                      fontSize: 11, fontWeight: 700, fontFamily: "monospace",
                      color: isActive || isDone ? "#fff" : "rgba(255,255,255,0.4)",
                    }}>{p.num}</span>
                  </div>
                  {(!isMobile || isActive) && (
                    <span style={{
                      fontSize: 12.5, fontWeight: isActive ? 700 : 500,
                      color: isActive ? "#fff" : "rgba(226,232,240,0.80)",
                      fontFamily: "'Inter', sans-serif", whiteSpace: "nowrap",
                    }}>
                      {p.title}
                    </span>
                  )}
                </button>
                {i < PROCESS.length - 1 && (
                  <div style={{
                    width: isMobile ? 16 : 36, height: 0, flexShrink: 0,
                    borderTop: `1.5px dotted ${isDone ? "rgba(0,212,255,0.5)" : "rgba(255,255,255,0.15)"}`,
                  }} />
                )}
              </div>
            );
          })}
        </div>

        {/* ── Active step detail card ── */}
        <div style={{
          width: "100%", maxWidth: isMobile ? "100%" : 920,
          borderRadius: 22, overflow: "hidden",
          background: "linear-gradient(165deg, rgba(15,21,44,0.88), rgba(11,16,34,0.85))",
          border: "1px solid rgba(0,212,255,0.22)",
          backdropFilter: "blur(28px)",
          boxShadow: "0 28px 72px rgba(0,0,0,0.48), inset 0 1px 0 rgba(255,255,255,0.05), 0 0 40px rgba(0,212,255,0.05)",
        }}>
          {/* Card body — icon graphic + description/checklist + action cards */}
          <div style={{
            padding: isMobile ? "16px 14px" : "14px 24px",
            display: "flex", flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? 20 : 24, alignItems: isMobile ? "stretch" : "flex-start",
          }}>
            {/* Decorative orbit graphic */}
            {!isMobile && (
              <div style={{
                flexShrink: 0, width: 180, height: 180,
                position: "relative", display: "flex", alignItems: "center", justifyContent: "center",
                transform: `perspective(900px) rotateY(${mouse.nx * 4}deg) rotateX(${-mouse.ny * 4}deg)`,
              }}>
                {[160, 120, 80].map((size, i) => (
                  <div key={size} style={{
                    position: "absolute", width: size, height: size, borderRadius: "50%",
                    border: `1px solid rgba(155,77,255,${0.35 - i * 0.08})`,
                  }} />
                ))}
                {[0, 90, 180, 270].map((angle) => {
                  const rad = (angle * Math.PI) / 180;
                  const r = 78;
                  return (
                    <div key={angle} style={{
                      position: "absolute", left: "50%", top: "50%",
                      width: 8, height: 8, borderRadius: "50%",
                      background: "#00D4FF", boxShadow: "0 0 8px #00D4FF",
                      transform: `translate(calc(-50% + ${Math.cos(rad) * r}px), calc(-50% + ${Math.sin(rad) * r}px))`,
                    }} />
                  );
                })}
                <div style={{
                  width: 64, height: 64, borderRadius: 14, transform: "rotate(45deg)",
                  background: "radial-gradient(circle at 35% 30%, rgba(155,77,255,0.4), rgba(10,14,30,0.96))",
                  border: "1.5px solid rgba(155,77,255,0.65)",
                  boxShadow: "0 0 40px rgba(155,77,255,0.35)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Zap size={24} strokeWidth={1.75} style={{ color: "#C084FC", transform: "rotate(-45deg)", filter: "drop-shadow(0 0 10px rgba(192,132,252,0.7))" }} />
                </div>
              </div>
            )}

            {/* Description + checklist */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: "rgba(0,212,255,0.95)", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 6 }}>
                Phase {step.num}
              </div>
              <div style={{ fontSize: isMobile ? 19 : 24, fontWeight: 800, color: "#fff", fontFamily: "'Inter', sans-serif", marginBottom: 12 }}>
                {step.title}
              </div>
              <p style={{
                fontSize: isMobile ? 13 : 14.5, color: "rgba(232,243,255,0.85)",
                lineHeight: 1.7, margin: 0,
                fontFamily: "'Inter', sans-serif",
              }}>
                {step.desc}
              </p>

              <div style={{ width: 36, height: 2, background: "linear-gradient(90deg,#00D4FF,#9B4DFF)", margin: "16px 0" }} />

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {deliverables[active].map((d) => (
                  <div key={d} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <CheckCircle2 size={15} strokeWidth={1.75} style={{ color: "#00D4FF", flexShrink: 0 }} />
                    <span style={{ fontSize: isMobile ? 12 : 13, color: "rgba(232,243,255,0.78)", fontFamily: "'Inter', sans-serif" }}>{d}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action cards — hidden on mobile to keep scene compact */}
            {!isMobile && <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", gap: 10, width: 270 }}>
              {deliverables[active].map((d, i) => {
                const Icon = ACTION_ICONS[i % ACTION_ICONS.length];
                return (
                  <div key={d} style={{
                    display: "flex", alignItems: "center", gap: 12,
                    padding: "12px 14px",
                    background: "rgba(155,77,255,0.08)",
                    border: "1px solid rgba(155,77,255,0.3)",
                    borderRadius: 14,
                  }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      background: "rgba(155,77,255,0.16)", border: "1px solid rgba(155,77,255,0.45)",
                    }}>
                      <Icon size={16} strokeWidth={1.75} color="#C084FC" />
                    </div>
                    <span style={{ fontSize: 12.5, fontWeight: 600, color: "#F0F4FF", lineHeight: 1.3, flex: 1 }}>
                      {d}
                    </span>
                    <ChevronRight size={15} color="rgba(192,132,252,0.6)" style={{ flexShrink: 0 }} />
                  </div>
                );
              })}
            </div>}
          </div>

          {/* Navigation footer */}
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: isMobile ? "12px 18px" : "14px 28px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}>
            <button onClick={() => setActive((a) => Math.max(0, a - 1))} style={{
              display: "flex", alignItems: "center", gap: 6,
              minHeight: 40, padding: "8px 4px",
              background: "none", border: "none", cursor: active === 0 ? "not-allowed" : "pointer",
              color: active === 0 ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.6)",
              fontSize: 11, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.1em",
              transition: "color 0.2s",
            }}>
              <ChevronLeft size={13} /> PREVIOUS
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ display: "flex", gap: 4 }}>
                {PROCESS.map((_, i) => (
                  <div key={i} style={{
                    width: i === active ? 20 : 6, height: 6, borderRadius: 3,
                    background: i === active ? "#00D4FF" : "rgba(255,255,255,0.15)",
                    transition: "all 0.4s ease",
                    boxShadow: i === active ? "0 0 8px rgba(0,212,255,0.6)" : "none",
                  }} />
                ))}
              </div>
              <span style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: "rgba(255,255,255,0.35)", letterSpacing: "0.2em" }}>
                {active + 1} / {PROCESS.length}
              </span>
            </div>
            <button onClick={() => setActive((a) => Math.min(PROCESS.length - 1, a + 1))} style={{
              display: "flex", alignItems: "center", gap: 6,
              minHeight: 40, padding: "8px 4px",
              background: "none", border: "none", cursor: active === PROCESS.length - 1 ? "not-allowed" : "pointer",
              color: active === PROCESS.length - 1 ? "rgba(255,255,255,0.2)" : "rgba(0,212,255,0.8)",
              fontSize: 11, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.1em",
              transition: "color 0.2s",
            }}>
              NEXT PHASE <ChevronRight size={13} />
            </button>
          </div>
        </div>

        {/* ── Summary stats row ── */}
        {!isMobile && (
          <div style={{
            display: "flex", gap: 14, marginTop: 12, width: "100%", maxWidth: 1040,
          }}>
            {SUMMARY_STATS.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} style={{
                  flex: 1, display: "flex", alignItems: "center", gap: 12,
                  padding: "14px 18px",
                  background: "linear-gradient(165deg, rgba(10,16,34,0.68), rgba(4,9,22,0.62))",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 16,
                  backdropFilter: "blur(20px)",
                }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: 11, flexShrink: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: "rgba(155,77,255,0.16)", border: "1px solid rgba(155,77,255,0.4)",
                  }}>
                    <Icon size={17} strokeWidth={1.75} color="#C084FC" />
                  </div>
                  <div style={{ lineHeight: 1.3 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#F8FAFC" }}>{s.value}</div>
                    <div style={{ fontSize: 10.5, color: "rgba(203,213,225,0.5)" }}>{s.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
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

