"use client";
import { useState, useEffect } from "react";
import { SceneWrapper, SceneText } from "./SceneComponents";
import { MousePosition, SceneData } from "./types";
import { TESTIMONIALS } from "./data";
import { useIsMobile } from "./hooks";

export function ResonanceScene({ scene, mouse, data }: { scene: number; mouse: MousePosition; data: SceneData }) {
  const isMobile = useIsMobile();
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 30);
    return () => clearInterval(id);
  }, []);

  const waves = 5;
  const pts = 80;

  const makePath = (waveIdx: number) => {
    const points = Array.from({ length: pts }, (_, i) => {
      const x = (i / (pts - 1)) * 100;
      const phase = tick * 0.04 + waveIdx * 1.2;
      const amp = 8 + mouse.ny * 3 + waveIdx * 2;
      const y = 50 + Math.sin(i * 0.25 + phase) * amp * Math.sin(i * 0.05 + phase * 0.3);
      return `${x},${y}`;
    });
    return `M ${points.join(" L ")}`;
  };

  const colors = ["#8B5CF6", "#A855F7", "#06B6D4", "#38BDF8", "#7C3AED"];

  return (
    <SceneWrapper opacity={scene < 0.05 ? scene / 0.05 : scene > 0.85 ? 1 - (scene - 0.85) / 0.15 : 1}>
      <div style={{ 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        justifyContent: isMobile ? "flex-start" : "center", 
        height: "100%", 
        gap: 0,
        paddingTop: isMobile ? 60 : 0
      }}>
        {/* Wave visualizer */}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none"
          style={{ width: "100%", maxWidth: 700, height: isMobile ? 120 : 200 }}>
          {Array.from({ length: waves }).map((_, i) => (
            <path
              key={i}
              d={makePath(i)}
              fill="none"
              stroke={colors[i]}
              strokeWidth={0.4 + i * 0.1}
              strokeOpacity={0.3 + (waves - i) * 0.1}
            />
          ))}
        </svg>

        <div style={{ textAlign: "center", maxWidth: 640, padding: isMobile ? "0 20px" : "0 32px", display: "flex", flexDirection: "column", alignItems: "center", marginTop: isMobile ? -10 : -20 }}>
          <SceneText scene={scene} data={data} />

          {/* Testimonial slider */}
          <div style={{ marginTop: isMobile ? 16 : 40, position: "relative", minHeight: isMobile ? 180 : 220, height: isMobile ? "auto" : 220, width: "100%", maxWidth: 560 }}>
            {TESTIMONIALS.map((t, i) => {
              const active = Math.floor(tick / 100) % TESTIMONIALS.length === i;
              return (
                <div key={i} style={{
                  position: "absolute", inset: 0,
                  opacity: active ? 1 : 0,
                  transform: `translateY(${active ? 0 : 20}px)`,
                  transition: "all 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
                  display: "flex", flexDirection: "column", alignItems: "center",
                }}>
                  {/* Glass card */}
                  <div style={{
                    width: "100%",
                    background: "rgba(168,85,247,0.07)",
                    border: "1px solid rgba(168,85,247,0.22)",
                    borderRadius: 14,
                    padding: isMobile ? "18px 18px 16px" : "24px 28px 20px",
                    backdropFilter: "blur(12px)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
                    textAlign: "center",
                  }}>
                    {/* Quote mark */}
                    <div style={{ fontSize: isMobile ? 28 : 36, color: "rgba(168,85,247,0.35)", fontFamily: "Georgia, serif", lineHeight: 0.8, marginBottom: 10 }}>"</div>
                    <div style={{
                      fontSize: isMobile ? 13 : 16, color: "rgba(248,250,252,0.88)", fontStyle: "italic",
                      lineHeight: 1.65, fontFamily: "'Playfair Display', Georgia, serif",
                      marginBottom: isMobile ? 16 : 20,
                    }}>
                      {t.quote}
                    </div>
                    {/* Attribution */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                      <div style={{
                        width: 30, height: 30, borderRadius: "50%",
                        background: "linear-gradient(135deg, rgba(168,85,247,0.4), rgba(56,189,248,0.4))",
                        border: "1px solid rgba(168,85,247,0.4)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 10, fontFamily: "'JetBrains Mono', monospace",
                        fontWeight: 700, color: "#e9d5ff",
                        flexShrink: 0,
                      }}>
                        {t.initials}
                      </div>
                      <div style={{ textAlign: "left" }}>
                        <div style={{ fontSize: isMobile ? 10 : 11, fontFamily: "'JetBrains Mono', monospace", color: "#c4b5fd", letterSpacing: "0.1em", fontWeight: 600 }}>
                          {t.name}
                        </div>
                        <div style={{ fontSize: isMobile ? 8 : 9, fontFamily: "'JetBrains Mono', monospace", color: "rgba(196,181,253,0.55)", letterSpacing: "0.12em", marginTop: 1 }}>
                          {t.title?.toUpperCase() ?? ""}{t.title && t.company ? " · " : ""}{t.company?.toUpperCase() ?? ""}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dot indicators */}
          <div style={{ display: "flex", gap: 6, marginTop: isMobile ? 200 : 240, pointerEvents: "none" }}>
            {TESTIMONIALS.map((_, i) => {
              const active = Math.floor(tick / 100) % TESTIMONIALS.length === i;
              return (
                <div key={i} style={{
                  width: active ? 20 : 6, height: 4, borderRadius: 2,
                  background: active ? "#A855F7" : "rgba(168,85,247,0.25)",
                  transition: "all 0.5s ease",
                  boxShadow: active ? "0 0 8px rgba(168,85,247,0.6)" : "none",
                }} />
              );
            })}
          </div>
        </div>

        {/* Frequency bars */}
        <div style={{ display: "flex", gap: isMobile ? 3 : 4, alignItems: "flex-end", height: isMobile ? 40 : 60, marginTop: isMobile ? 40 : 64 }}>
          {Array.from({ length: isMobile ? 20 : 32 }).map((_, i) => {
            const h = 10 + Math.abs(Math.sin(tick * 0.08 + i * 0.4)) * 50;
            return (
              <div key={i} style={{
                width: isMobile ? 4 : 6, height: h,
                background: `linear-gradient(to top, #A855F7, #38BDF8)`,
                borderRadius: "2px 2px 0 0",
                opacity: 0.7 + mouse.nx * 0.3,
                transition: "height 0.1s ease",
                boxShadow: "0 0 4px rgba(168,85,247,0.4)",
              }} />
            );
          })}
        </div>
      </div>
    </SceneWrapper>
  );
}
