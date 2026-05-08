"use client";
import { useState, useEffect, useMemo } from "react";
import { SceneWrapper, SceneText } from "./SceneComponents";
import { MousePosition, SceneData } from "./types";
import { PROCESS } from "./data";

export function MemoryScene({ scene, mouse, data }: { scene: number; mouse: MousePosition; data: SceneData }) {
  const cells = useMemo(() => Array.from({ length: 64 }, (_, i) => ({
    id: i,
    val: Math.random(),
    label: Math.random().toString(36).substring(2, 4).toUpperCase(),
  })), []);

  const [hover, setHover] = useState<number | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 80);
    return () => clearInterval(id);
  }, []);

  return (
    <SceneWrapper opacity={scene < 0.05 ? scene / 0.05 : scene > 0.85 ? 1 - (scene - 0.85) / 0.15 : 1}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around", height: "100%", padding: "0 60px", flexWrap: "wrap", gap: 60 }}>
        <div style={{ maxWidth: 440, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <SceneText scene={scene} data={data} />
          {/* Process steps */}
          <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 12 }}>
            {PROCESS.map((p, i) => (
              <div key={p.num} style={{
                display: "flex", gap: 12, alignItems: "flex-start",
                opacity: Math.max(0, scene * 3 - i * 0.4),
                transform: `translateX(${(1 - scene) * 15}px)`,
                transition: "opacity 0.4s, transform 0.4s"
              }}>
                <span style={{ fontSize: 10, fontFamily: "monospace", color: "#06B6D4", marginTop: 4 }}>{p.num}</span>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.8)" }}>{p.title}</div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", lineHeight: 1.4, maxWidth: 220 }}>{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Memory grid */}
        <div
          style={{
            display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: 4,
            transform: `perspective(600px) rotateY(${mouse.nx * -6}deg) rotateX(${mouse.ny * -4}deg)`,
            transition: "transform 0.15s ease",
          }}
        >
          {cells.map((c, i) => {
            const isHot = Math.sin(tick * 0.05 + i * 0.8) > 0.5;
            return (
              <div
                key={c.id}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                style={{
                  width: 34, height: 34,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 8, fontFamily: "monospace",
                  borderRadius: 3,
                  cursor: "crosshair",
                  color: hover === i ? "#fff" : isHot ? "#06B6D4" : "rgba(6,182,212,0.3)",
                  background: hover === i
                    ? "rgba(6,182,212,0.3)"
                    : isHot
                      ? "rgba(6,182,212,0.1)"
                      : "rgba(255,255,255,0.02)",
                  border: `1px solid ${hover === i ? "rgba(6,182,212,0.8)" : isHot ? "rgba(6,182,212,0.2)" : "rgba(255,255,255,0.04)"}`,
                  transition: "all 0.3s ease",
                  boxShadow: hover === i ? "0 0 12px rgba(6,182,212,0.4)" : "none",
                  transform: hover === i ? "scale(1.2)" : "scale(1)",
                }}
              >
                {c.label}
              </div>
            );
          })}
        </div>
      </div>
    </SceneWrapper>
  );
}
