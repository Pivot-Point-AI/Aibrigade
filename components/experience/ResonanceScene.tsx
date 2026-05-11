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
          <div style={{ marginTop: isMobile ? 16 : 48, position: "relative", minHeight: isMobile ? 150 : 160, height: isMobile ? "auto" : 160, width: "100%", maxWidth: 540 }}>
            {TESTIMONIALS.map((t, i) => {
              const active = Math.floor(tick / 100) % TESTIMONIALS.length === i;
              return (
                <div key={i} style={{
                  position: "absolute", inset: 0,
                  opacity: active ? 1 : 0,
                  transform: `translateY(${active ? 0 : 20}px)`,
                  transition: "all 0.8s ease",
                  display: "flex", flexDirection: "column", alignItems: "center"
                }}>
                  <div style={{
                    fontSize: isMobile ? 14 : 18, color: "rgba(248,250,252,0.85)", fontStyle: "italic",
                    marginBottom: isMobile ? 12 : 16, lineHeight: 1.5, fontFamily: "var(--font-serif), serif",
                    textAlign: "center"
                  }}>
                    "{t.quote}"
                  </div>
                  <div style={{ fontSize: isMobile ? 9 : 11, fontFamily: "monospace", color: "#A855F7", letterSpacing: "0.15em", fontWeight: 600 }}>
                    {t.name.toUpperCase()} — {t.company.toUpperCase()}
                  </div>
                </div>
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
