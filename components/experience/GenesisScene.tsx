"use client";
import { useState, useEffect } from "react";
import { SceneWrapper, SceneText } from "./SceneComponents";
import { SceneData } from "./types";
import { SERVICES } from "./data";
import { useIsMobile } from "./hooks";

export function GenesisScene({ scene, onSelectModule, data, setIsHovering }: {
  scene: number;
  onSelectModule: (idx: number) => void;
  data: SceneData;
  setIsHovering?: (hover: boolean) => void;
}) {
  const [tick, setTick] = useState(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 40);
    return () => clearInterval(id);
  }, []);

  const opacity = scene > 0.85 ? 1 - (scene - 0.85) / 0.15 : 1;

  // Orbital rings: [radius, speed_multiplier, dashed, opacity]
  const orbitals: [number, number, boolean, number][] = [
    [isMobile ? 138 : 270, 0.06, false, 0.22],
    [isMobile ? 108 : 220, -0.05, true, 0.40],
    [isMobile ? 78 : 155, 0.15, false, 0.50],
    [isMobile ? 50 : 95, -0.22, true, 0.60],
  ];

  return (
    <SceneWrapper opacity={opacity}>
      <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
        {/* ── Text Area ── */}
        <div style={{
          position: "absolute", top: isMobile ? 60 : 60, left: 0, right: 0,
          zIndex: 20, textAlign: "center",
          padding: "0 20px", pointerEvents: "none"
        }}>
          <SceneText scene={scene} data={data} />
        </div>

        {/* ── Visual Backdrop (Orbitals, Guides) ── */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }}>
          <div style={{ 
            position: "absolute", left: "50%", top: isMobile ? "52%" : "50%",
            transform: `translate(-50%, ${isMobile ? "-20px" : "-50%"})`,
          }}>
            {orbitals.map(([r, spd, dashed, op], i) => (
              <div key={i} style={{
                position: "absolute", width: r * 2, height: r * 2,
                borderRadius: "50%", border: `1px ${dashed ? "dashed" : "solid"} rgba(37,150,190,${op})`,
                transform: `translate(-50%, -50%) rotate(${tick * spd}deg)`,
                pointerEvents: "none",
              }} />
            ))}
          </div>
        </div>

        {/* ── INTERACTIVE LAYER (Core and Labels) ── */}
        <div style={{ position: "absolute", inset: 0, zIndex: 100 }}>
          {/* Central Core */}
          <div
            onClick={(e) => { e.stopPropagation(); onSelectModule(0); }}
            onMouseEnter={() => setIsHovering?.(true)}
            onMouseLeave={() => setIsHovering?.(false)}
            style={{
              position: "absolute", left: "50%", top: isMobile ? "52%" : "50%",
              transform: `translate(-50%, ${isMobile ? "-70px" : "-50%"})`,
              width: isMobile ? 44 : 110, height: isMobile ? 44 : 110, borderRadius: "50%",
              background: "radial-gradient(circle at 35% 35%, rgba(37,150,190,0.22), rgba(2,8,23,0.92))",
              border: "1.5px solid rgba(37,150,190,0.7)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 0 60px rgba(37,150,190,0.25), 0 0 120px rgba(37,150,190,0.1)",
              cursor: "pointer", pointerEvents: "auto",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <div style={{
              width: 20, height: 20, borderRadius: "50%",
              background: "radial-gradient(circle, #7dd3fc, #2596be)",
              boxShadow: "0 0 40px rgba(37,150,190,1), 0 0 80px rgba(37,150,190,0.5)",
              animation: "pulse-core 2.5s ease-in-out infinite",
            }} />
          </div>

          {/* Service Labels */}
          {SERVICES.map((s, i) => {
            const rotAngle = (i * 72) + tick * 0.06;
            const orbitR = isMobile ? 108 : 220;
            const rad = (rotAngle * Math.PI) / 180;
            const x = Math.cos(rad) * orbitR;
            const y = Math.sin(rad) * orbitR;
            const isHov = hoveredIdx === i;

            return (
              <div
                key={i}
                onClick={(e) => { e.stopPropagation(); onSelectModule(i); }}
                onMouseEnter={() => { setHoveredIdx(i); setIsHovering?.(true); }}
                onMouseLeave={() => { setHoveredIdx(null); setIsHovering?.(false); }}
                style={{
                  position: "absolute", left: "50%", top: isMobile ? "52%" : "50%",
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px + ${isMobile ? -20 : 0}px)) ${isHov ? "scale(1.1)" : "scale(1)"}`,
                  cursor: "pointer", pointerEvents: "auto", zIndex: 200,
                  transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                {/* Connector line from center hint */}
                <div style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: isMobile ? "5px 8px 5px 8px" : "10px 22px 10px 16px",
                  background: isHov
                    ? "rgba(37,150,190,0.35)"
                    : "rgba(4,14,30,0.88)",
                  border: `1.5px solid rgba(37,150,190,${isHov ? 1 : 0.55})`,
                  backdropFilter: "blur(16px)", borderRadius: 6,
                  boxShadow: isHov
                    ? "0 0 40px rgba(37,150,190,0.6), 0 0 15px rgba(37,150,190,0.3), inset 0 1px 0 rgba(255,255,255,0.1)"
                    : "0 0 20px rgba(37,150,190,0.18), 0 2px 8px rgba(0,0,0,0.4)",
                }}>
                  <div style={{
                    width: 7, height: 7, borderRadius: "50%",
                    background: isHov ? "#7dd3fc" : "#2596be",
                    boxShadow: isHov ? "0 0 12px #7dd3fc, 0 0 4px #fff" : "0 0 10px rgba(37,150,190,0.9)",
                    flexShrink: 0,
                  }} />
                  <span style={{
                    fontSize: isMobile ? 7 : 13,
                    fontFamily: "monospace",
                    letterSpacing: isMobile ? "0.08em" : "0.2em",
                    color: isHov ? "#fff" : "rgba(147,210,235,0.95)",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                    textShadow: isHov ? "0 0 20px rgba(125,211,252,0.8)" : "none",
                  }}>{s.title}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Technical Readouts (Static) ── */}
        <div style={{ position: "absolute", bottom: isMobile ? 40 : 60, left: "50%", transform: "translateX(-50%)", pointerEvents: "none", opacity: 0.5 }}>
          <div style={{ display: "flex", gap: isMobile ? 12 : 32, alignItems: "center" }}>
            {["NEURAL_MESH", "INFERENCE_RT", "CONTEXT_AWARE"].map((label) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#2596be" }} />
                <span style={{ fontSize: 7, fontFamily: "monospace", color: "rgba(37,150,190,0.7)", letterSpacing: "0.2em" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SceneWrapper>
  );
}
