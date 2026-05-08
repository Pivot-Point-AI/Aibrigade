"use client";
import Link from "next/link";
import { SceneWrapper, SceneText } from "./SceneComponents";
import { MousePosition, SceneData } from "./types";
import { SERVICES } from "./data";
import { useIsMobile } from "./hooks";

export function PlatformScene({ scene, mouse, data, setIsHovering }: { 
  scene: number; 
  mouse: MousePosition; 
  data: SceneData;
  setIsHovering?: (hover: boolean) => void;
}) {
  const isMobile = useIsMobile();
  const activeSub = Math.min(3, Math.floor(scene * 4));
  const subProgress = (scene * 4) % 1;

  return (
    <SceneWrapper opacity={scene < 0.05 ? scene / 0.05 : scene > 0.95 ? 1 - (scene - 0.95) / 0.05 : 1}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", width: "100%", padding: "0 40px" }}>

        {/* Unified Header */}
        <div style={{ marginBottom: isMobile ? 20 : 40, transform: `translateY(${(1 - scene) * 20}px)`, transition: "transform 0.8s ease-out" }}>
          <SceneText scene={scene} data={data} />
        </div>

        {/* Module Progress Indicator */}
        <div style={{ display: "flex", gap: isMobile ? 4 : 8, marginBottom: isMobile ? 30 : 50 }}>
          {SERVICES.map((_, i) => (
            <div key={i} style={{
              width: isMobile ? 30 : 50, height: 2,
              background: i === activeSub ? "#2596be" : i < activeSub ? "rgba(37, 150, 190, 0.4)" : "rgba(255,255,255,0.1)",
              transition: "all 0.4s ease",
              boxShadow: i === activeSub ? "0 0 10px #2596be" : "none"
            }} />
          ))}
        </div>

        <div style={{ position: "relative", width: "100%", maxWidth: 1000, height: isMobile ? 600 : 440, marginTop: isMobile ? 0 : 40 }}>
          {SERVICES.map((s, i) => {
            const active = i === activeSub;
            const opacity = active ? (subProgress < 0.1 ? subProgress / 0.1 : subProgress > 0.9 ? (1 - subProgress) / 0.1 : 1) : 0;
            const translateY = active ? 0 : i < activeSub ? -30 : 30;

            return (
              <div key={i} style={{
                position: "absolute", inset: 0,
                opacity, transform: `translateY(${translateY}px)`,
                transition: "opacity 0.6s cubic-bezier(0.2, 0, 0.2, 1), transform 0.6s cubic-bezier(0.2, 0, 0.2, 1)",
                display: "flex", 
                flexDirection: isMobile ? "column" : "row",
                alignItems: "center", justifyContent: "center",
                gap: isMobile ? 40 : 80,
                pointerEvents: active ? "auto" : "none",
              }}>
                {/* Visual Side */}
                <div style={{
                  flex: 1, height: "100%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  perspective: 1500,
                }}>
                  <div style={{
                    width: isMobile ? 240 : 380, height: isMobile ? 240 : 380, borderRadius: 4,
                    background: "rgba(37, 150, 190, 0.02)",
                    border: "1px solid rgba(37, 150, 190, 0.2)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: isMobile ? 60 : 100,
                    transform: `rotateY(${mouse.nx * 20}deg) rotateX(${-mouse.ny * 20}deg)`,
                    boxShadow: "0 40px 100px rgba(0,0,0,0.4), inset 0 0 60px rgba(37, 150, 190, 0.05)",
                    position: "relative",
                    overflow: "hidden"
                  }}>
                    {/* Technical Grid inside box */}
                    <div style={{
                      position: "absolute", inset: 0, opacity: 0.15,
                      backgroundImage: "linear-gradient(rgba(37, 150, 190, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(37, 150, 190, 0.1) 1px, transparent 1px)",
                      backgroundSize: "30px 30px"
                    }} />

                    {/* Floating corner markers */}
                    <div style={{ position: "absolute", top: 15, left: 15, fontSize: 8, fontFamily: "monospace", color: "#2596be", opacity: 0.5 }}>CORE_SYS: 0x{i}F4</div>
                    <div style={{ position: "absolute", top: 15, right: 15, fontSize: 8, fontFamily: "monospace", color: "#2596be", opacity: 0.5 }}>RT_INF_{i + 1}</div>
                    <div style={{ position: "absolute", bottom: 15, left: 15, fontSize: 8, fontFamily: "monospace", color: "#2596be", opacity: 0.5 }}>AIBRIGADE_PLATFORM</div>

                    <svg viewBox="0 0 260 220" width={260} height={220} style={{ opacity: 0.9 }}>
                      {/* Grid lines */}
                      {[0, 1, 2, 3, 4].map(row => (
                        <line key={row} x1={20} y1={20 + row * 40} x2={240} y2={20 + row * 40}
                          stroke="rgba(37,150,190,0.08)" strokeWidth={1} />
                      ))}
                      {[0, 1, 2, 3, 4, 5].map(col => (
                        <line key={col} x1={20 + col * 44} y1={20} x2={20 + col * 44} y2={180}
                          stroke="rgba(37,150,190,0.08)" strokeWidth={1} />
                      ))}
                      {/* Animated area path */}
                      <defs>
                        <linearGradient id={`areaGrad-${i}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#2596be" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#2596be" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M20,140 C60,120 80,90 110,80 C140,70 160,100 180,75 C200,50 220,60 240,45 L240,180 L20,180 Z"
                        fill={`url(#areaGrad-${i})`}
                      />
                      <path
                        d="M20,140 C60,120 80,90 110,80 C140,70 160,100 180,75 C200,50 220,60 240,45"
                        fill="none" stroke="#2596be" strokeWidth={2}
                        style={{ filter: "drop-shadow(0 0 6px rgba(37,150,190,0.8))" }}
                      />
                      {/* Data points */}
                      {[[20, 140], [110, 80], [180, 75], [240, 45]].map(([cx, cy], di) => (
                        <circle key={di} cx={cx} cy={cy} r={4} fill="#2596be"
                          style={{ filter: "drop-shadow(0 0 4px rgba(37,150,190,1))" }} />
                      ))}
                      {/* Bar chart at bottom */}
                      {[0, 1, 2, 3, 4].map((b) => {
                        const heights = [30, 55, 40, 70, 45];
                        return (
                          <rect key={b} x={30 + b * 44} y={180 - heights[b]} width={22} height={heights[b]}
                            rx={2}
                            fill={b === activeSub ? "rgba(37,150,190,0.6)" : "rgba(37,150,190,0.15)"}
                            stroke="rgba(37,150,190,0.3)" strokeWidth={0.5}
                          />
                        );
                      })}
                      {/* Axis labels */}
                      <text x={20} y={196} fill="rgba(37,150,190,0.4)" fontSize={8} fontFamily="monospace">T-4</text>
                      <text x={64} y={196} fill="rgba(37,150,190,0.4)" fontSize={8} fontFamily="monospace">T-3</text>
                      <text x={108} y={196} fill="rgba(37,150,190,0.4)" fontSize={8} fontFamily="monospace">T-2</text>
                      <text x={152} y={196} fill="rgba(37,150,190,0.4)" fontSize={8} fontFamily="monospace">T-1</text>
                      <text x={196} y={196} fill="rgba(37,150,190,0.4)" fontSize={8} fontFamily="monospace">NOW</text>
                      {/* Live indicator */}
                      <circle cx={228} cy={30} r={4} fill="#2596be" opacity={0.9}
                        style={{ animation: "pulse-core 1.5s ease-in-out infinite" }} />
                      <text x={236} y={34} fill="#2596be" fontSize={8} fontFamily="monospace" opacity={0.7}>LIVE</text>
                    </svg>

                    {/* Scanning Line */}
                    <div style={{
                      position: "absolute", top: 0, left: 0, right: 0, height: 2,
                      background: "linear-gradient(90deg, transparent, #2596be, transparent)",
                      animation: "scan-y 5s linear infinite",
                      opacity: 0.4
                    }} />
                  </div>
                </div>

                {/* Content Side */}
                <div style={{ flex: 1, textAlign: isMobile ? "center" : "left" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: isMobile ? "center" : "flex-start", gap: 12, marginBottom: isMobile ? 12 : 20 }}>
                    <div style={{ width: 14, height: 14, border: "1px solid #2596be", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <div style={{ width: 6, height: 6, background: "#2596be", boxShadow: "0 0 8px #2596be" }} />
                    </div>
                    <div style={{ fontSize: 11, fontFamily: "monospace", color: "#2596be", letterSpacing: "0.5em" }}>
                      PLATFORM MODULE {String(i + 1).padStart(2, "0")}
                    </div>
                  </div>

                  <h2 style={{
                    fontSize: isMobile ? "1.8rem" : "clamp(2rem, 4vw, 3rem)", fontFamily: "var(--font-serif), serif",
                    color: "#fff", marginBottom: isMobile ? 16 : 28, fontWeight: 700,
                    lineHeight: 1.05, textShadow: "0 0 40px rgba(255,255,255,0.1)"
                  }}>
                    {s.title}
                  </h2>
                  <p style={{ 
                    fontSize: isMobile ? 14 : 18, color: "rgba(248,250,252,0.7)", 
                    lineHeight: 1.6, marginBottom: isMobile ? 24 : 48, 
                    maxWidth: 500, fontFamily: "var(--font-serif), serif" 
                  }}>
                    {s.desc}
                  </p>

                  <Link 
                    href={`/services/${s.title.toLowerCase().replace(/ /g, "-")}`} 
                    style={{ textDecoration: "none" }}
                    onMouseEnter={() => setIsHovering?.(true)}
                    onMouseLeave={() => setIsHovering?.(false)}
                  >
                    <div style={{
                      display: "inline-flex", alignItems: "center", gap: 16,
                      padding: isMobile ? "12px 28px" : "16px 42px", borderRadius: 4,
                      border: "1px solid rgba(37, 150, 190, 0.4)",
                      color: "#2596be", fontFamily: "monospace", fontSize: isMobile ? 9 : 11,
                      letterSpacing: "0.25em", cursor: "pointer",
                      transition: "all 0.4s var(--ease-out-expo)",
                      background: "rgba(37, 150, 190, 0.05)",
                      boxShadow: "0 0 20px rgba(37, 150, 190, 0.1)",
                    }}>
                      EXPLORE PLATFORM →
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SceneWrapper>
  );
}
