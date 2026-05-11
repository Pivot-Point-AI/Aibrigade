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

  const orbitals: [number, number, boolean, number][] = [
    [isMobile ? 138 : 230, 0.05,  false, 0.18],
    [isMobile ? 108 : 175, -0.04, true,  0.32],
    [isMobile ? 78  : 125, 0.12,  false, 0.44],
    [isMobile ? 50  : 80,  -0.20, true,  0.58],
  ];

  const stats = [
    { value: "47+",   label: "AI Systems" },
    { value: "$340M", label: "Value Delivered" },
    { value: "3.2×",  label: "Avg. Productivity Lift" },
    { value: "18",    label: "Countries" },
  ];

  return (
    <SceneWrapper opacity={opacity}>
      <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>

        {/* ── Text Area ── */}
        <div style={{
          position: "absolute",
          top: isMobile ? 52 : 52,
          left: 0, right: 0,
          zIndex: 20, textAlign: "center",
          padding: "0 20px", pointerEvents: "none",
        }}>
          <SceneText scene={scene} data={data} />
        </div>

        {/* ── Orbital Rings ── */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }}>
          <div style={{
            position: "absolute", left: "50%", top: isMobile ? "58%" : "58%",
            transform: "translate(-50%, -50%)",
          }}>
            {orbitals.map(([r, spd, dashed, op], i) => (
              <div key={i} style={{
                position: "absolute", width: r * 2, height: r * 2,
                borderRadius: "50%",
                border: `1px ${dashed ? "dashed" : "solid"} rgba(37,150,190,${op})`,
                transform: `translate(-50%, -50%) rotate(${tick * spd}deg)`,
                pointerEvents: "none",
              }} />
            ))}

            {/* Subtle radial glow behind core */}
            <div style={{
              position: "absolute",
              width: isMobile ? 200 : 500, height: isMobile ? 200 : 500,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(37,150,190,0.07) 0%, transparent 70%)",
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
            }} />
          </div>
        </div>

        {/* ── Interactive Layer ── */}
        <div style={{ position: "absolute", inset: 0, zIndex: 100 }}>
          {/* Central Core */}
          <div
            onClick={(e) => { e.stopPropagation(); onSelectModule(0); }}
            onMouseEnter={() => setIsHovering?.(true)}
            onMouseLeave={() => setIsHovering?.(false)}
            style={{
              position: "absolute", left: "50%", top: isMobile ? "58%" : "58%",
              transform: "translate(-50%, -50%)",
              width: isMobile ? 44 : 100, height: isMobile ? 44 : 100,
              borderRadius: "50%",
              background: "radial-gradient(circle at 35% 35%, rgba(37,150,190,0.28), rgba(2,8,23,0.95))",
              border: "1.5px solid rgba(37,150,190,0.65)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 0 50px rgba(37,150,190,0.22), 0 0 100px rgba(37,150,190,0.08)",
              cursor: "pointer", pointerEvents: "auto",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.4s ease",
            }}
          >
            <div style={{
              width: isMobile ? 14 : 20, height: isMobile ? 14 : 20, borderRadius: "50%",
              background: "radial-gradient(circle, #bae6fd, #2596be)",
              boxShadow: "0 0 30px rgba(37,150,190,0.9), 0 0 60px rgba(37,150,190,0.4)",
              animation: "pulse-core 2.5s ease-in-out infinite",
            }} />
          </div>

          {/* Service Labels */}
          {SERVICES.map((s, i) => {
            const rotAngle = (i * 72) + tick * 0.06;
            const orbitR = isMobile ? 108 : 175;
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
                  position: "absolute", left: "50%", top: isMobile ? "58%" : "58%",
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) ${isHov ? "scale(1.1)" : "scale(1)"}`,
                  cursor: "pointer", pointerEvents: "auto", zIndex: 200,
                  transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                <div style={{
                  display: "flex", alignItems: "center",
                  gap: isMobile ? 5 : 10,
                  padding: isMobile ? "5px 8px" : "9px 20px 9px 14px",
                  background: isHov ? "rgba(37,150,190,0.28)" : "rgba(3,10,25,0.85)",
                  border: `1px solid rgba(37,150,190,${isHov ? 0.9 : 0.45})`,
                  backdropFilter: "blur(16px)",
                  borderRadius: 5,
                  boxShadow: isHov
                    ? "0 0 32px rgba(37,150,190,0.5), 0 0 12px rgba(37,150,190,0.25), inset 0 1px 0 rgba(255,255,255,0.08)"
                    : "0 0 16px rgba(37,150,190,0.12), 0 2px 10px rgba(0,0,0,0.5)",
                }}>
                  <div style={{
                    width: isMobile ? 5 : 6, height: isMobile ? 5 : 6, borderRadius: "50%",
                    background: isHov ? "#bae6fd" : "#2596be",
                    boxShadow: isHov ? "0 0 10px #bae6fd" : "0 0 8px rgba(37,150,190,0.8)",
                    flexShrink: 0,
                  }} />
                  <span style={{
                    fontSize: isMobile ? 7 : 11,
                    fontFamily: "'JetBrains Mono', monospace",
                    letterSpacing: isMobile ? "0.06em" : "0.18em",
                    color: isHov ? "#e0f2fe" : "rgba(147,210,235,0.9)",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                    textShadow: isHov ? "0 0 16px rgba(125,211,252,0.7)" : "none",
                  }}>{s.title}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Key Stats Bar (desktop only) ── */}
        {!isMobile && (
          <div style={{
            position: "absolute", bottom: 52, left: "50%", transform: "translateX(-50%)",
            pointerEvents: "none", zIndex: 20,
            opacity: scene > 0.3 ? 0.85 : 0,
            transition: "opacity 1s ease",
          }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 0,
              background: "rgba(3,10,25,0.7)",
              border: "1px solid rgba(37,150,190,0.18)",
              borderRadius: 8, overflow: "hidden",
              backdropFilter: "blur(16px)",
            }}>
              {stats.map((stat, i) => (
                <div key={i} style={{
                  display: "flex", flexDirection: "column", alignItems: "center",
                  padding: "12px 28px",
                  borderRight: i < stats.length - 1 ? "1px solid rgba(37,150,190,0.12)" : "none",
                }}>
                  <span style={{
                    fontSize: 22, fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: 700, color: "#7dd3fc",
                    lineHeight: 1,
                    textShadow: "0 0 20px rgba(37,150,190,0.5)",
                  }}>{stat.value}</span>
                  <span style={{
                    fontSize: 9, fontFamily: "'JetBrains Mono', monospace",
                    color: "rgba(148,163,184,0.6)", letterSpacing: "0.18em",
                    textTransform: "uppercase", marginTop: 5,
                  }}>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Technical Readouts ── */}
        <div style={{
          position: "absolute",
          bottom: isMobile ? 20 : 16, left: isMobile ? 12 : 28,
          pointerEvents: "none", opacity: 0.45,
        }}>
          <div style={{ display: "flex", gap: isMobile ? 12 : 20, alignItems: "center" }}>
            {["NEURAL_MESH", "INFERENCE_RT", !isMobile && "CONTEXT_AWARE"].filter(Boolean).map((label) => (
              <div key={label as string} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ width: 3, height: 3, borderRadius: "50%", background: "#2596be" }} />
                <span style={{ fontSize: isMobile ? 6 : 7, fontFamily: "'JetBrains Mono', monospace", color: "rgba(37,150,190,0.6)", letterSpacing: "0.2em" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </SceneWrapper>
  );
}
