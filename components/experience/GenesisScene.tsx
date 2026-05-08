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
    [isMobile ? 170 : 220, 0.08, false, 0.18],
    [isMobile ? 130 : 160, -0.12, true, 0.25],
    [isMobile ? 95 : 110, 0.18, false, 0.35],
    [isMobile ? 65 : 70, -0.25, true, 0.45],
  ];

  return (
    <SceneWrapper opacity={opacity}>
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        {/* ── Text Area ── */}
        <div style={{
          position: "absolute", top: isMobile ? 60 : 60, left: 0, right: 0,
          zIndex: 20, textAlign: "center",
          padding: "0 20px"
        }}>
          <SceneText scene={scene} data={data} />
        </div>

        {/* ── Orbital Ring System ── */}
        <div style={{ 
          position: "absolute", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center",
          left: "50%",
          top: isMobile ? "52%" : "50%",
          transform: `translate(-50%, ${isMobile ? "-20px" : "-50%"})`
        }}>
          {orbitals.map(([r, spd, dashed, op], i) => {
            const angle = tick * spd;
            return (
              <div key={i} style={{
                position: "absolute",
                width: r * 2, height: r * 2,
                borderRadius: "50%",
                border: `1px ${dashed ? "dashed" : "solid"} rgba(37,150,190,${op})`,
                transform: `rotate(${angle}deg)`,
                boxShadow: i === 2 ? "0 0 20px rgba(37,150,190,0.06) inset" : "none",
              }}>
                {/* Orbital marker dot */}
                <div style={{
                  position: "absolute",
                  width: i === 1 ? 5 : 3,
                  height: i === 1 ? 5 : 3,
                  borderRadius: "50%",
                  background: "#2596be",
                  top: -2,
                  left: "50%",
                  marginLeft: -(i === 1 ? 2.5 : 1.5),
                  boxShadow: "0 0 8px #2596be",
                }} />
                {/* Secondary marker at 180° */}
                {(i === 0 || i === 2) && (
                  <div style={{
                    position: "absolute",
                    width: 2, height: 2,
                    borderRadius: "50%",
                    background: "rgba(37,150,190,0.5)",
                    bottom: -1,
                    left: "50%",
                    marginLeft: -1,
                  }} />
                )}
              </div>
            );
          })}

          {/* ── Glassmorphic Core ── */}
          <div style={{
            position: "relative", zIndex: 10,
            width: isMobile ? 50 : 80, height: isMobile ? 50 : 80, borderRadius: "50%",
            background: "radial-gradient(circle at 35% 35%, rgba(37,150,190,0.15), rgba(2,8,23,0.9))",
            border: "1px solid rgba(37,150,190,0.5)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 0 60px rgba(37,150,190,0.25), inset 0 0 30px rgba(37,150,190,0.1), 0 0 0 1px rgba(255,255,255,0.04)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            {/* Pulsing inner dot */}
            <div style={{
              width: 14, height: 14, borderRadius: "50%",
              background: "radial-gradient(circle, #4facfe, #2596be)",
              boxShadow: "0 0 25px rgba(37,150,190,0.9), 0 0 10px #2596be",
              animation: "pulse-core 2.5s ease-in-out infinite",
            }} />
            {/* Core label */}
            <div style={{
              position: "absolute", bottom: -28,
              fontSize: 7, fontFamily: "monospace", color: "rgba(37,150,190,0.7)",
              letterSpacing: "0.4em", whiteSpace: "nowrap",
              textTransform: "uppercase",
            }}>
              GENESIS
            </div>
          </div>

          {/* ── Floating Service Labels on orbit ── */}
          {SERVICES.slice(0, 4).map((s, i) => {
            const baseAngle = i * 90;
            const rotAngle = baseAngle + tick * 0.06;
            const isHov = hoveredIdx === i;
            const orbitR = isMobile ? 140 : 175;
            const rad = (rotAngle * Math.PI) / 180;
            const x = Math.cos(rad) * orbitR;
            const y = Math.sin(rad) * orbitR;

            return (
              <div
                key={i}
                onClick={() => onSelectModule(i)}
                onMouseEnter={() => { setHoveredIdx(i); setIsHovering?.(true); }}
                onMouseLeave={() => { setHoveredIdx(null); setIsHovering?.(false); }}
                style={{
                  position: "absolute",
                  left: "50%", top: "50%",
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  cursor: "none",
                  zIndex: 50,
                  transition: "opacity 0.3s",
                }}
              >
                {/* Label card */}
                <div style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "5px 12px 5px 8px",
                  background: isHov ? "rgba(37,150,190,0.15)" : "rgba(2,8,23,0.7)",
                  border: `1px solid rgba(37,150,190,${isHov ? 0.6 : 0.2})`,
                  backdropFilter: "blur(12px)",
                  borderRadius: 3,
                  boxShadow: isHov ? "0 0 20px rgba(37,150,190,0.25), 0 4px 20px rgba(0,0,0,0.4)" : "0 2px 12px rgba(0,0,0,0.3)",
                  transition: "all 0.35s var(--ease-out-expo)",
                  whiteSpace: "nowrap",
                }}>
                  <div style={{
                    width: 4, height: 4, borderRadius: "50%",
                    background: isHov ? "#4facfe" : "#2596be",
                    boxShadow: isHov ? "0 0 10px #4facfe" : "0 0 6px #2596be",
                    flexShrink: 0,
                  }} />
                  <span style={{
                    fontSize: isMobile ? 8 : 11, fontFamily: "monospace", letterSpacing: "0.2em",
                    color: isHov ? "#fff" : "rgba(37,150,190,0.95)",
                    fontWeight: 900, textTransform: "uppercase",
                  }}>
                    {s.title}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Corner technical brackets ── */}
        {[
          { top: 24, left: 24, bw: "2px 0 0 2px", br: "4px 0 0 4px" },
          { top: 24, right: 24, bw: "2px 2px 0 0", br: "0 4px 0 0" },
          { bottom: 24, left: 24, bw: "0 0 2px 2px", br: "0 0 0 4px" },
          { bottom: 24, right: 24, bw: "0 2px 2px 0", br: "0 0 4px 0" },
        ].map((b, i) => (
          <div key={i} style={{
            position: "absolute",
            width: 20, height: 20,
            border: "1px solid rgba(37,150,190,0.3)",
            borderWidth: b.bw,
            borderRadius: b.br,
            ...("top" in b ? { top: b.top } : {}),
            ...("bottom" in b ? { bottom: b.bottom } : {}),
            ...("left" in b ? { left: b.left } : {}),
            ...("right" in b ? { right: b.right } : {}),
          }} />
        ))}

        {/* ── Horizontal guide line ── */}
        <div style={{
          position: "absolute",
          left: "10%", right: "10%", top: "50%",
          height: 1,
          background: "linear-gradient(90deg, transparent, rgba(37,150,190,0.08) 20%, rgba(37,150,190,0.08) 80%, transparent)",
          pointerEvents: "none",
        }} />

        {/* ── Vertical guide line ── */}
        <div style={{
          position: "absolute",
          top: "10%", bottom: "10%", left: "50%",
          width: 1,
          background: "linear-gradient(180deg, transparent, rgba(37,150,190,0.06) 20%, rgba(37,150,190,0.06) 80%, transparent)",
          pointerEvents: "none",
        }} />

        {/* ── Bottom technical readout ── */}
        <div style={{
          position: "absolute", bottom: isMobile ? 40 : 60, left: "50%", transform: "translateX(-50%)",
          display: "flex", gap: isMobile ? 12 : 32, alignItems: "center", zIndex: 20,
          opacity: 0.5, scale: isMobile ? 0.8 : 1,
        }}>
          {["NEURAL_MESH", "INFERENCE_RT", "CONTEXT_AWARE"].map((label) => (
            <div key={label} style={{
              display: "flex", alignItems: "center", gap: 6,
            }}>
              <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#2596be", boxShadow: "0 0 6px #2596be" }} />
              <span style={{ fontSize: 7, fontFamily: "monospace", color: "rgba(37,150,190,0.7)", letterSpacing: "0.2em" }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </SceneWrapper>
  );
}
