"use client";
import { useState, useEffect, useMemo } from "react";
import { SceneWrapper } from "./SceneComponents";
import { MousePosition, SceneData } from "./types";
import { CASES } from "./data";
import { useIsMobile } from "./hooks";
import { Badge } from "@/components/ui/Card";

interface Edge { from: number; to: number; id: number; }

export function CognitionScene({ scene, mouse, data }: { scene: number; mouse: MousePosition; data: SceneData }) {
  const isMobile = useIsMobile();
  const [activeEdges, setActiveEdges] = useState<Edge[]>([]);

  const nodes = useMemo(() => Array.from({ length: 16 }, (_, i) => ({
    id: i,
    x: 18 + (i % 4) * 28,
    y: 18 + Math.floor(i / 4) * 28,
  })), []);

  const edges = useMemo(() => {
    const result: [number, number][] = [];
    for (let i = 0; i < nodes.length; i++)
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        if (Math.sqrt(dx * dx + dy * dy) < 36) result.push([i, j]);
      }
    return result;
  }, [nodes]);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveEdges(Array.from({ length: 8 }, () => ({
        from: Math.floor(Math.random() * 16),
        to: Math.floor(Math.random() * 16),
        id: Math.random(),
      })));
    }, 500);
    return () => clearInterval(id);
  }, []);

  const fadeIn = scene;

  return (
    <SceneWrapper opacity={fadeIn}>
      <div style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        padding: isMobile ? "70px 20px 0" : "0 60px",
        gap: isMobile ? 32 : 70,
      }}>
        <div style={{
          flexShrink: 0,
          transform: `perspective(900px) rotateY(${mouse.nx * 6}deg) rotateX(${-mouse.ny * 6}deg)`,
          transition: "transform 0.12s ease",
          filter: "drop-shadow(0 0 20px rgba(155,77,255,0.25))",
        }}>
          <svg viewBox="0 0 118 118" width={isMobile ? 220 : 420} height={isMobile ? 220 : 420} style={{ overflow: "visible" }}>
            <defs>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="b" />
                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              <filter id="glow2" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="5" result="b" />
                <feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>
            {edges.map(([a, b], i) => {
              const isActive = activeEdges.some(e => (e.from === a && e.to === b) || (e.from === b && e.to === a));
              return (
                <line key={i}
                  x1={nodes[a].x} y1={nodes[a].y}
                  x2={nodes[b].x} y2={nodes[b].y}
                  stroke={isActive ? "#C084FC" : "rgba(155,77,255,0.3)"}
                  strokeWidth={isActive ? 2 : 1}
                  style={{ transition: "stroke 0.3s, stroke-width 0.3s" }}
                />
              );
            })}
            {nodes.map((n, i) => {
              const isActive = activeEdges.some(e => e.from === i || e.to === i);
              return (
                <circle key={n.id}
                  cx={n.x} cy={n.y}
                  r={isActive ? 7 : 4.5}
                  fill={isActive ? "#C084FC" : "rgba(155,77,255,0.65)"}
                  filter={isActive ? "url(#glow2)" : "url(#glow)"}
                  style={{ transition: "r 0.25s, fill 0.25s" }}
                />
              );
            })}
          </svg>
        </div>

        <div style={{
          flex: 1, maxWidth: isMobile ? "100%" : 500,
          display: "flex", flexDirection: "column",
          alignItems: isMobile ? "center" : "flex-start",
          order: isMobile ? -1 : 0,
        }}>
          <div style={{ marginBottom: 18 }}>
            <Badge variant="violet" size="md" dot>Proven Outcomes</Badge>
          </div>

          <h2 style={{
            fontSize: isMobile ? "clamp(1.9rem,7.5vw,2.3rem)" : "clamp(2.6rem,4.2vw,3.7rem)",
            fontFamily: "'Inter', sans-serif", fontWeight: 800,
            lineHeight: 1.06, margin: 0, marginBottom: 12,
            letterSpacing: "-0.025em", color: "#F8FAFC",
          }}>
            Real impact,{" "}
            <span style={{
              background: "linear-gradient(135deg,#9B4DFF,#C084FC)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>measurable results</span>
          </h2>

          <p style={{
            fontSize: isMobile ? 14.5 : 16.5, color: "rgba(203,213,225,0.82)",
            fontFamily: "sans-serif", fontWeight: 300, lineHeight: 1.7,
            margin: 0, marginBottom: isMobile ? 22 : 32,
          }}>
            Not pilots. Production AI delivering measurable ROI across regulated industries.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 12 : 14, width: "100%" }}>
            {CASES.map((c, i) => (
              <div key={i} style={{
                opacity: 1,
                transform: "translateX(0px)",
                transition: "opacity 0.5s, transform 0.5s",
                background: "linear-gradient(135deg, rgba(155,77,255,0.12), rgba(155,77,255,0.06))",
                border: "1px solid rgba(155,77,255,0.38)",
                borderRadius: 16,
                padding: isMobile ? "16px 18px" : "18px 22px",
                backdropFilter: "blur(20px)",
                display: "flex", alignItems: "center", gap: isMobile ? 16 : 20,
                boxShadow: "0 10px 30px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.04)",
              }}>
                <div style={{
                  flexShrink: 0, minWidth: isMobile ? 68 : 80,
                  background: "rgba(155,77,255,0.2)",
                  border: "1.5px solid rgba(155,77,255,0.5)",
                  borderRadius: 12, padding: isMobile ? "10px 12px" : "12px 14px", textAlign: "center",
                  boxShadow: "0 0 18px rgba(155,77,255,0.12)",
                }}>
                  <div style={{
                    fontSize: isMobile ? 20 : 26, fontWeight: 700,
                    color: "#C084FC", fontFamily: "monospace", lineHeight: 1,
                    textShadow: "0 0 10px rgba(192,132,252,0.5)",
                  }}>{c.stat}</div>
                  <div style={{
                    fontSize: 8, color: "rgba(192,132,252,0.7)",
                    fontFamily: "monospace", letterSpacing: "0.1em", marginTop: 5, textTransform: "uppercase",
                  }}>{c.statLabel ?? "IMPACT"}</div>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: isMobile ? 10 : 11, fontFamily: "monospace",
                    color: "rgba(192,132,252,0.7)", letterSpacing: "0.15em",
                    marginBottom: 6, textTransform: "uppercase", fontWeight: 600,
                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                  }}>{c.client}</div>
                  <div style={{
                    fontSize: isMobile ? 13 : 15, color: "#F0F4FF",
                    fontFamily: "'Inter', sans-serif", fontWeight: 500, lineHeight: 1.5,
                    wordWrap: "break-word", overflowWrap: "break-word",
                  }}>{c.headline}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SceneWrapper>
  );
}
