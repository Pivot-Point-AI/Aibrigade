"use client";
import { useEffect, useRef, useCallback, useState } from "react";
import { useScrollProgress, useMousePosition, useIsMobile, useFollowMouse } from "./hooks";
import { ParticleSystem, getActiveSceneIndex, getScene } from "./utils";
import { GenesisScene } from "./GenesisScene";
import { CognitionScene } from "./CognitionScene";
import { MemoryScene } from "./MemoryScene";
import { PlatformScene } from "./PlatformScene";
import { ResonanceScene } from "./ResonanceScene";
import { SignalScene } from "./SignalScene";
import { SERVICES } from "./data";
import { SceneData } from "./types";

const SCENE_LABELS = ["Strategy", "Outcomes", "Process", "Platform", "Resonance", "Signal"];

const SCENE_DATA: SceneData[] = [
  {
    id: "genesis",
    headline: "AI Brigade — End-to-End AI Modernization for Enterprises",
    sub: "",
    accent: "#2596be",
    glyph: "◈",
  },
  {
    id: "cognition",
    headline: "Proven Outcomes",
    sub: "Real-world impact delivered through high-performance AI systems.",
    accent: "#8B5CF6",
    glyph: "⬡",
  },
  {
    id: "memory",
    headline: "The Brigade Process",
    sub: "A battle-tested methodology for transforming data into intelligence.",
    accent: "#06B6D4",
    glyph: "◎",
  },
  {
    id: "platform",
    headline: "Technical Core",
    sub: "Production-ready modules for the modern AI stack.",
    accent: "#2596be",
    glyph: "⊡",
  },
  {
    id: "resonance",
    headline: "Client Resonance",
    sub: "Voices from the industries we've redefined through strategic AI.",
    accent: "#A855F7",
    glyph: "◇",
  },
  {
    id: "signal",
    headline: "Launch Your Signal",
    sub: "Connect with the Brigade to start your AI transformation journey.",
    accent: "#38BDF8",
    glyph: "△",
  },
];

// Cursor trail point type
interface TrailPoint { x: number; y: number; age: number; }

export default function ExperienceEngine() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const { velocity } = useScrollProgress();
  // Localized progress calculation (0 to 1 over the engine's 400vh scrollable range)
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const engineMaxScroll = window.innerHeight * 4; // 500vh - 100vh
      const p = Math.min(1, Math.max(0, window.scrollY / engineMaxScroll));
      setProgress(p);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const mouse = useMousePosition();
  const smoothMouse = useFollowMouse(mouse, 0.12);
  const isMobile = useIsMobile();
  const activeScene = getActiveSceneIndex(progress);
  const [hoveredDot, setHoveredDot] = useState<number | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [selectedModule, setSelectedModule] = useState<number | null>(null);
  const [trail, setTrail] = useState<TrailPoint[]>([]);

  // ── Auto-scroll logic ──────────────────────────────────────────
  const userScrolledAt = useRef(0);
  const autoScrollRaf = useRef(0);
  const AUTO_PAUSE_MS = 3500; // pause after manual scroll
  const AUTO_SPEED = 0.25;    // px per frame

  useEffect(() => {
    const onWheel = () => { userScrolledAt.current = Date.now(); };
    const onTouch = () => { userScrolledAt.current = Date.now(); };
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });

    const autoScroll = () => {
      const idle = Date.now() - userScrolledAt.current > AUTO_PAUSE_MS;
      // Limit auto-scroll to the engine's length (500vh - 100vh = 400vh)
      const engineMaxScroll = window.innerHeight * 4;
      if (idle && window.scrollY < engineMaxScroll - 2) {
        window.scrollBy(0, AUTO_SPEED);
      }
      autoScrollRaf.current = requestAnimationFrame(autoScroll);
    };
    autoScrollRaf.current = requestAnimationFrame(autoScroll);
    return () => {
      cancelAnimationFrame(autoScrollRaf.current);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchmove", onTouch);
    };
  }, []);

  // ── Cursor trail ───────────────────────────────────────────────
  useEffect(() => {
    if (isMobile) return;
    const TRAIL_LEN = 12;
    setTrail(prev => {
      const next = [{ x: mouse.x, y: mouse.y, age: 0 }, ...prev.slice(0, TRAIL_LEN - 1)]
        .map((p, i) => ({ ...p, age: i / TRAIL_LEN }));
      return next;
    });
  }, [mouse.x, mouse.y, isMobile]);

  // ── Particle canvas ────────────────────────────────────────────
  const progressRef = useRef(progress);
  const mouseRef = useRef(mouse);
  const velocityRef = useRef(velocity);
  progressRef.current = progress;
  mouseRef.current = mouse;
  velocityRef.current = velocity;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const ps = new ParticleSystem();
    ps.init(canvas, isMobile ? 40 : 90);

    const onResize = () => ps.resize(canvas);
    window.addEventListener("resize", onResize);

    const loop = () => {
      ps.render(ctx, mouseRef.current.x, mouseRef.current.y, progressRef.current, velocityRef.current);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, [isMobile]);

  const scrollToScene = useCallback((idx: number) => {
    userScrolledAt.current = Date.now(); // treat manual nav as user scroll
    const engineMaxScroll = window.innerHeight * 4;
    window.scrollTo({ top: (idx / 5) * engineMaxScroll, behavior: "smooth" });
  }, []);

  const onSelectModule = useCallback((_idx: number) => {
    userScrolledAt.current = Date.now();
    const engineMaxScroll = window.innerHeight * 4;
    window.scrollTo({ top: (3 / 5) * engineMaxScroll, behavior: "smooth" });
  }, []);

  const s = [0, 1, 2, 3, 4, 5].map((i) => getScene(progress, i));
  const accent = SCENE_DATA[activeScene].accent;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #020817; }
        :root {
          --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
          --brand: #2596be;
        }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(37,150,190,0.25); border-radius: 2px; }

        @keyframes pulse-core {
          0%, 100% { transform: scale(1); box-shadow: 0 0 20px rgba(37,150,190,0.7), 0 0 6px #2596be inset; }
          50% { transform: scale(1.25); box-shadow: 0 0 50px rgba(37,150,190,1), 0 0 10px #4facfe inset; }
        }
        @keyframes gradient-shift {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        @keyframes signal-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(56,189,248,0.1); }
          50% { box-shadow: 0 0 40px rgba(56,189,248,0.35), inset 0 0 20px rgba(56,189,248,0.05); border-color: rgba(56,189,248,0.65); }
        }
        @keyframes float-up {
          0%, 100% { transform: translateY(0px); opacity: 0.7; }
          50% { transform: translateY(-6px); opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translate(-50%, 40px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
        @keyframes scan-y {
          0% { transform: translateY(0); }
          100% { transform: translateY(380px); }
        }
        @keyframes cursor-scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes global-scan {
          0% { transform: translateY(-100vh); opacity: 0; }
          10%, 90% { opacity: 0.08; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        @keyframes subtle-breathe {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.02); }
        }
        @keyframes text-shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
      `}</style>

      <div style={{ height: "500vh", position: "relative" }}>
        <div style={{
          position: "sticky", top: 0, height: "100vh",
          background: "#020817", overflow: "hidden",
          cursor: isMobile ? "auto" : "none",
        }}>
          {/* ── Background: Ambient Radial Glow ── */}
          <div style={{
            position: "absolute", inset: 0,
            background: `radial-gradient(ellipse 70% 70% at 50% 50%, ${accent}09, transparent 70%)`,
            pointerEvents: "none", zIndex: 0,
            transition: "background 1.5s ease",
          }} />

          {/* ── Background: Technical Grid ── */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: `linear-gradient(rgba(37,150,190,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(37,150,190,0.025) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
            maskImage: "radial-gradient(ellipse 75% 75% at 50% 50%, black 40%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 75% 75% at 50% 50%, black 40%, transparent 100%)",
            pointerEvents: "none", zIndex: 1,
            transform: `translateY(${progress * -20}px)`,
          }} />

          {/* ── Background: Grain Overlay ── */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            opacity: 0.03, pointerEvents: "none", zIndex: 2, mixBlendMode: "overlay",
          }} />

          {/* ── Background: Edge Vignette ── */}
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 50%, #020817 100%)",
            pointerEvents: "none", zIndex: 3,
          }} />

          {/* ── Ambient Scanning Beam ── */}
          <div style={{
            position: "absolute", left: 0, right: 0, height: 1,
            background: `linear-gradient(90deg, transparent 10%, ${accent}30 40%, ${accent}60 50%, ${accent}30 60%, transparent 90%)`,
            boxShadow: `0 0 30px ${accent}40`,
            animation: "global-scan 14s linear infinite",
            pointerEvents: "none", zIndex: 5,
          }} />

          {/* ── Particle Canvas ── */}
          <canvas
            ref={canvasRef}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.45, zIndex: 4 }}
          />

          {/* ── AI Targeting Cursor ── */}
          {!isMobile && (
            <>
              {/* ── Trail dots ── */}
              {trail.map((pt, i) => {
                const size = Math.max(1, 4 * (1 - pt.age));
                const op = (1 - pt.age) * 0.35;
                return (
                  <div key={i} style={{
                    position: "absolute",
                    left: pt.x, top: pt.y,
                    width: size, height: size,
                    borderRadius: "50%",
                    background: accent,
                    transform: "translate(-50%, -50%)",
                    pointerEvents: "none",
                    zIndex: 997,
                    opacity: op,
                  }} />
                );
              })}

              {/* ── Outer glow ring (smoothed) ── */}
              <div style={{
                position: "absolute",
                left: smoothMouse.x, top: smoothMouse.y,
                width: isHovering ? 70 : (mouse.isMoving ? 50 : 40),
                height: isHovering ? 70 : (mouse.isMoving ? 50 : 40),
                borderRadius: "50%",
                border: `1px solid ${accent}44`,
                transform: "translate(-50%, -50%)",
                pointerEvents: "none",
                transition: "width 0.6s var(--ease-out-expo), height 0.6s var(--ease-out-expo)",
                zIndex: 998,
              }} />

              {/* ── Bracket Frame (tighter follower) ── */}
              <div style={{
                position: "absolute",
                left: smoothMouse.x, top: smoothMouse.y,
                width: isHovering ? 44 : (mouse.isMoving ? 30 : 24),
                height: isHovering ? 44 : (mouse.isMoving ? 30 : 24),
                transform: "translate(-50%, -50%)",
                pointerEvents: "none",
                transition: "width 0.4s var(--ease-out-expo), height 0.4s var(--ease-out-expo)",
                zIndex: 1000,
              }}>
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} style={{
                    position: "absolute",
                    width: 6, height: 6,
                    top: i < 2 ? 0 : "auto",
                    bottom: i >= 2 ? 0 : "auto",
                    left: i % 2 === 0 ? 0 : "auto",
                    right: i % 2 === 1 ? 0 : "auto",
                    borderColor: accent,
                    borderStyle: "solid",
                    borderWidth: i === 0 ? "1.5px 0 0 1.5px" : i === 1 ? "1.5px 1.5px 0 0" : i === 2 ? "0 0 1.5px 1.5px" : "0 1.5px 1.5px 0",
                    transition: "border-color 0.8s ease",
                  }} />
                ))}
                {/* Scanning sweep inside */}
                <div style={{
                  position: "absolute",
                  left: 0, right: 0, height: 1,
                  top: 0,
                  background: `linear-gradient(90deg, transparent, ${accent}cc, transparent)`,
                  animation: "cursor-scan 1.6s ease-in-out infinite",
                }} />
              </div>

              {/* ── Precision dot (immediate) ── */}
              <div style={{
                position: "absolute",
                left: mouse.x, top: mouse.y,
                width: isHovering ? 5 : 2.5,
                height: isHovering ? 5 : 2.5,
                background: "#fff",
                borderRadius: "50%",
                transform: "translate(-50%, -50%)",
                pointerEvents: "none",
                zIndex: 1001,
                boxShadow: `0 0 12px ${accent}, 0 0 4px #fff`,
                transition: "width 0.3s var(--ease-out-expo), height 0.3s var(--ease-out-expo)",
              }} />

              {/* ── Coordinate readout (slide in on move) ── */}
              <div style={{
                position: "absolute",
                left: smoothMouse.x + 20, top: smoothMouse.y + 16,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 7, lineHeight: 1.7,
                pointerEvents: "none",
                zIndex: 1002,
                opacity: mouse.isMoving ? 0.5 : 0,
                transition: "opacity 0.3s ease",
              }}>
                <div style={{ color: accent, letterSpacing: "0.12em" }}>
                  X <span style={{ color: "rgba(255,255,255,0.4)" }}>:</span> {String(Math.round(mouse.x)).padStart(4, "0")}
                </div>
                <div style={{ color: accent, letterSpacing: "0.12em" }}>
                  Y <span style={{ color: "rgba(255,255,255,0.4)" }}>:</span> {String(Math.round(mouse.y)).padStart(4, "0")}
                </div>
              </div>

              {/* ── Ambient glow ── */}
              <div style={{
                position: "absolute",
                left: smoothMouse.x, top: smoothMouse.y,
                width: 320, height: 320,
                transform: "translate(-50%, -50%)",
                background: `radial-gradient(circle, ${accent}0c 0%, transparent 60%)`,
                borderRadius: "50%",
                pointerEvents: "none",
                zIndex: 6,
                transition: "background 1.2s ease",
              }} />
            </>
          )}

          {/* ── Scroll indicator (auto-scroll beacon) ── */}
          {progress < 0.04 && !isMobile && (
            <div style={{
              position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
              zIndex: 200, pointerEvents: "none",
            }}>
              <div style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                animation: "float-up 2s ease-in-out infinite",
              }}>
                <span style={{
                  fontSize: 10, fontFamily: "'JetBrains Mono', monospace",
                  color: accent, letterSpacing: "0.6em", textTransform: "uppercase",
                  fontWeight: 900,
                  textShadow: `0 0 20px ${accent}88`,
                  marginLeft: "0.6em", // offset for letter-spacing
                  background: `linear-gradient(90deg, ${accent}, #fff, ${accent})`,
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animation: "text-shimmer 3s linear infinite",
                }}>
                  EXPLORE
                </span>

                {/* Chevron Arrow */}
                <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginTop: 4 }}>
                  <path d="M1 1L7 7L13 1" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              <div style={{
                width: 2, height: 50,
                background: `linear-gradient(to bottom, ${accent}, transparent)`,
                boxShadow: `0 0 15px ${accent}44`,
                opacity: 0.6
              }} />
            </div>
          )}


          {/* ── Sidebar Navigation ── */}
          {!isMobile && (
            <div style={{
              position: "absolute", right: 28, top: "50%", transform: "translateY(-50%)",
              display: "flex", flexDirection: "column", gap: 20, zIndex: 100,
            }}>
              {/* Track */}
              <div style={{
                position: "absolute", right: 3, top: 0, bottom: 0,
                width: 1, background: "rgba(255,255,255,0.04)",
              }} />

              {SCENE_LABELS.map((label, i) => (
                <div key={label} style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 14 }}>
                  <span style={{
                    fontSize: 7.5, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.25em",
                    color: accent,
                    textTransform: "uppercase", whiteSpace: "nowrap",
                    fontWeight: 600,
                    opacity: hoveredDot === i || activeScene === i ? 0.9 : 0,
                    transform: `translateX(${hoveredDot === i || activeScene === i ? 0 : 8}px)`,
                    transition: "all 0.5s var(--ease-out-expo)",
                    pointerEvents: "none",
                  }}>
                    {label}
                  </span>
                  <button
                    onClick={() => scrollToScene(i)}
                    onMouseEnter={() => { setHoveredDot(i); setIsHovering(true); }}
                    onMouseLeave={() => { setHoveredDot(null); setIsHovering(false); }}
                    style={{
                      width: 6, height: 6,
                      borderRadius: "50%",
                      border: `1px solid ${activeScene === i ? accent : "rgba(255,255,255,0.18)"}`,
                      background: activeScene === i ? accent : "transparent",
                      cursor: "none",
                      transition: "all 0.5s var(--ease-out-expo)",
                      boxShadow: activeScene === i ? `0 0 12px ${accent}99` : "none",
                      padding: 0, flexShrink: 0,
                    }}
                  />
                </div>
              ))}
            </div>
          )}

          {/* ── Bottom HUD ── */}
          <div style={{
            position: "absolute", left: 28, bottom: 28,
            display: "flex", alignItems: "flex-end", gap: 10,
            zIndex: 50,
            opacity: 0.6,
          }}>
            <span style={{
              fontSize: 28, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700,
              color: accent, lineHeight: 0.85,
              transition: "color 1s ease",
            }}>
              {String(activeScene + 1).padStart(2, "0")}
            </span>
            <div style={{ display: "flex", flexDirection: "column", gap: 3, paddingBottom: 3 }}>
              <span style={{ fontSize: 7, fontFamily: "'JetBrains Mono', monospace", color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em" }}>
                MODULE
              </span>
              <span style={{ fontSize: 9, fontFamily: "'JetBrains Mono', monospace", color: "rgba(255,255,255,0.18)", letterSpacing: "0.22em" }}>
                {SCENE_LABELS[activeScene].toUpperCase()}
              </span>
            </div>
          </div>

          {/* ── Top-right deployment tag ── */}
          <div style={{
            position: "absolute", top: 24, right: 28,
            fontFamily: "'JetBrains Mono', monospace", fontSize: 7.5,
            color: "rgba(37,150,190,0.35)", letterSpacing: "0.2em",
            zIndex: 50, userSelect: "none",
          }}>
            AIBRIGADE ◈ v2.1
          </div>

          {/* ── Scenes ── */}
          <GenesisScene scene={s[0]} onSelectModule={onSelectModule} data={SCENE_DATA[0]} setIsHovering={setIsHovering} />
          <CognitionScene scene={s[1]} mouse={mouse} isMobile={isMobile} data={SCENE_DATA[1]} />
          <MemoryScene scene={s[2]} mouse={mouse} data={SCENE_DATA[2]} />
          <PlatformScene scene={s[3]} mouse={mouse} data={SCENE_DATA[3]} setIsHovering={setIsHovering} />
          <ResonanceScene scene={s[4]} mouse={mouse} data={SCENE_DATA[4]} />
          <SignalScene scene={s[5]} mouse={mouse} data={SCENE_DATA[5]} setIsHovering={setIsHovering} />

          {/* ── Progress Bar ── */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, height: 1,
            width: `${progress * 100}%`,
            background: `linear-gradient(90deg, ${accent}88, ${accent})`,
            boxShadow: `0 0 10px ${accent}66`,
            transition: "width 0.08s linear, background 1.2s ease",
            zIndex: 200,
          }} />

          {/* Module Detail ── (shown on deep scroll) */}
          {selectedModule !== null && progress > 0.8 && (
            <div style={{
              position: "absolute", bottom: 80, left: "50%", transform: "translateX(-50%)",
              width: "100%", maxWidth: 600, padding: "0 32px", zIndex: 150,
              animation: "fadeInUp 0.6s ease-out forwards",
            }}>
              <div style={{
                background: "rgba(2, 8, 23, 0.8)", border: "1px solid rgba(37, 150, 190, 0.3)",
                borderRadius: 16, padding: "32px", backdropFilter: "blur(20px)",
                boxShadow: "0 20px 50px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 8, background: "rgba(37, 150, 190, 0.1)",
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20
                  }}>
                    {SERVICES[selectedModule].icon}
                  </div>
                  <div>
                    <div style={{ fontSize: 10, fontFamily: "monospace", color: "#2596be", letterSpacing: "0.2em" }}>SELECTED MODULE</div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>{SERVICES[selectedModule].title}</div>
                  </div>
                  <div
                    onClick={() => setSelectedModule(null)}
                    style={{ marginLeft: "auto", cursor: "pointer", opacity: 0.5, fontSize: 10, fontFamily: "monospace" }}
                  >
                    [ ESC ]
                  </div>
                </div>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.6, marginBottom: 24 }}>
                  {SERVICES[selectedModule].desc}
                </p>
                <div style={{ marginTop: 24, display: "flex", gap: 8 }}>
                  {SERVICES[selectedModule].tags.map(tag => (
                    <span key={tag} style={{ fontSize: 9, fontFamily: "monospace", color: "rgba(37,150,190,0.6)", border: "1px solid rgba(37,150,190,0.2)", padding: "4px 10px", borderRadius: 4 }}>
                      {tag.toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}