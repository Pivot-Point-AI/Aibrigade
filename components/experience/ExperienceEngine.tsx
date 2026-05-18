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
import { Scene3D } from "./Scene3D";
import { SERVICES } from "./data";
import { SceneData } from "./types";

const SCENE_LABELS = ["Strategy", "Outcomes", "Process", "Platform", "Resonance", "Signal"];

const SCENE_DATA: SceneData[] = [
  {
    id: "genesis",
    headline: "AI Brigade",
    sub: "An elite AI execution force for enterprises — From Discovery Sprint to Successful Deployment.",
    accent: "#00D4FF",
    glyph: "◈",
  },
  {
    id: "cognition",
    headline: "Proven Outcomes",
    sub: "Real-world impact delivered across regulated industries.",
    accent: "#9B4DFF",
    glyph: "⬡",
  },
  {
    id: "memory",
    headline: "The Brigade Process",
    sub: "A battle-tested methodology from discovery sprint to continuous optimisation.",
    accent: "#00D4FF",
    glyph: "◎",
  },
  {
    id: "platform",
    headline: "Technical Core",
    sub: "Production-grade modules purpose-built for the modern AI stack.",
    accent: "#00D4FF",
    glyph: "⊡",
  },
  {
    id: "resonance",
    headline: "Client Resonance",
    sub: "Voices from the enterprises we've transformed through strategic AI.",
    accent: "#9B4DFF",
    glyph: "◇",
  },
  {
    id: "signal",
    headline: "Ready to Deploy AI?",
    sub: "Join 47+ enterprises running production AI systems built by AI Brigade.",
    accent: "#00D4FF",
    glyph: "△",
  },
];

// Cursor trail point type
interface TrailPoint { x: number; y: number; age: number; }

export default function ExperienceEngine() {
  const isMobile = useIsMobile();
  const mouse = useMousePosition();
  const smoothMouse = useFollowMouse(mouse, 0.18);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const { velocity } = useScrollProgress();
  // Localized progress calculation
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollSegments = isMobile ? 2.5 : 4;
      const engineMaxScroll = window.innerHeight * scrollSegments;
      const p = Math.min(1, Math.max(0, window.scrollY / engineMaxScroll));
      setProgress(p);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

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
      const scrollSegments = isMobile ? 2.5 : 4;
      const engineMaxScroll = window.innerHeight * scrollSegments;
      if (idle && window.scrollY < engineMaxScroll - 2) {
        window.scrollBy(0, AUTO_SPEED);
      }
      autoScrollRaf.current = requestAnimationFrame(autoScroll);
    };
    autoScrollRaf.current = requestAnimationFrame(autoScroll);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchmove", onTouch);
      cancelAnimationFrame(autoScrollRaf.current);
    };
  }, [isMobile]);

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
    const scrollSegments = isMobile ? 2.5 : 4;
    const engineMaxScroll = window.innerHeight * scrollSegments;
    window.scrollTo({ top: (idx / 5) * engineMaxScroll, behavior: "smooth" });
  }, [isMobile]);

  const onSelectModule = useCallback((_idx: number) => {
    userScrolledAt.current = Date.now();
    const scrollSegments = isMobile ? 2.5 : 4;
    const engineMaxScroll = window.innerHeight * scrollSegments;
    // Jump to Platform section (Index 3). 
    // We target 3.05 to ensure we are clearly within the scene's active range.
    const targetProgress = 3.05 / 5;
    window.scrollTo({ 
      top: targetProgress * engineMaxScroll, 
      behavior: "smooth" 
    });
  }, [isMobile]);

  const s = [0, 1, 2, 3, 4, 5].map((i) => getScene(progress, i));
  const accent = SCENE_DATA[activeScene].accent;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          background: linear-gradient(135deg, #0E1B3D 0%, #0D1535 35%, #190D3A 65%, #0E1B3D 100%) fixed !important;
          min-height: 100vh;
        }
        :root {
          --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
          --brand: #00D4FF;
        }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(0,212,255,0.25); border-radius: 2px; }

        @keyframes pulse-core {
          0%, 100% { transform: scale(1); box-shadow: 0 0 20px rgba(0,212,255,0.7), 0 0 6px #00D4FF inset; }
          50% { transform: scale(1.25); box-shadow: 0 0 50px rgba(0,212,255,1), 0 0 10px #7EEEFF inset; }
        }
        @keyframes gradient-shift {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        @keyframes signal-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(0,212,255,0.1); }
          50% { box-shadow: 0 0 40px rgba(0,212,255,0.35), inset 0 0 20px rgba(0,212,255,0.05); border-color: rgba(0,212,255,0.65); }
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
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ring-breathe {
          0%, 100% { box-shadow: 0 0 0 0 rgba(0,212,255,0); }
          50%       { box-shadow: 0 0 0 8px rgba(0,212,255,0.06); }
        }
        @keyframes orbit-cw  { to { transform: translate(-50%,-50%) rotate(360deg);  } }
        @keyframes orbit-ccw { to { transform: translate(-50%,-50%) rotate(-360deg); } }
      `}</style>

      <div suppressHydrationWarning style={{ height: isMobile ? "350vh" : "500vh", position: "relative", willChange: "scroll-position" }}>
        <div suppressHydrationWarning style={{
          position: "sticky", top: 0, height: "100vh",
          background: "transparent",
          overflow: "hidden",
          cursor: isMobile ? "auto" : "none",
        }}>
          {/* ── Background: Cyan orb — top left ── */}
          <div style={{
            position: "absolute", top: "-10%", left: "-10%",
            width: "60%", height: "70%", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,212,255,0.45) 0%, rgba(0,212,255,0.18) 35%, transparent 65%)",
            filter: "blur(70px)",
            pointerEvents: "none", zIndex: 0,
          }} />

          {/* ── Background: Violet orb — bottom right ── */}
          <div style={{
            position: "absolute", bottom: "-10%", right: "-10%",
            width: "60%", height: "70%", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(155,77,255,0.50) 0%, rgba(155,77,255,0.18) 35%, transparent 65%)",
            filter: "blur(70px)",
            pointerEvents: "none", zIndex: 0,
          }} />

          {/* ── Background: Violet accent — top right ── */}
          <div style={{
            position: "absolute", top: "-5%", right: "0%",
            width: "30%", height: "45%", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(155,77,255,0.28) 0%, transparent 70%)",
            filter: "blur(50px)",
            pointerEvents: "none", zIndex: 0,
          }} />

          {/* ── Background: Scene accent glow — center ── */}
          <div style={{
            position: "absolute", inset: 0,
            background: `radial-gradient(ellipse 55% 60% at 50% 55%, ${accent}22, transparent 65%)`,
            pointerEvents: "none", zIndex: 1,
            transition: "background 1.5s ease",
          }} />

          {/* ── Background: Technical Grid ── */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: `linear-gradient(rgba(0,212,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.06) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
            maskImage: "radial-gradient(ellipse 85% 85% at 50% 50%, black 20%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 85% 85% at 50% 50%, black 20%, transparent 100%)",
            pointerEvents: "none", zIndex: 2,
            transform: `translateY(${progress * -20}px)`,
          }} />

          {/* ── Background: Grain Overlay ── */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            opacity: 0.025, pointerEvents: "none", zIndex: 3, mixBlendMode: "overlay",
          }} />

          {/* ── Ambient Scanning Beam ── */}
          <div style={{
            position: "absolute", left: 0, right: 0, height: 1,
            background: `linear-gradient(90deg, transparent 10%, ${accent}30 40%, ${accent}60 50%, ${accent}30 60%, transparent 90%)`,
            boxShadow: `0 0 30px ${accent}40`,
            animation: "global-scan 14s linear infinite",
            pointerEvents: "none", zIndex: 5,
          }} />

{/* ── 3D Scene Layer ── */}
           <Scene3D progress={progress} accent={accent} />

           {/* ── Particle Canvas ── */}
           <canvas
            ref={canvasRef}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.45, zIndex: 4 }}
          />

          {/* ── Cursor ── */}
          {!isMobile && mouse.x > 0 && mouse.y > 0 && (
            <>
              {/* Gradient-border follower ring */}
              <div style={{
                position: "absolute",
                left: smoothMouse.x,
                top: smoothMouse.y,
                width: isHovering ? 56 : 40,
                height: isHovering ? 56 : 40,
                borderRadius: "50%",
                transform: "translate(-50%, -50%)",
                pointerEvents: "none",
                zIndex: 999,
                padding: 1.5,
                background: "linear-gradient(135deg, #00D4FF, #9B4DFF)",
                WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 1.5px), white calc(100% - 1.5px))",
                mask: "radial-gradient(farthest-side, transparent calc(100% - 1.5px), white calc(100% - 1.5px))",
                transition: "width 0.45s cubic-bezier(0.16,1,0.3,1), height 0.45s cubic-bezier(0.16,1,0.3,1)",
                boxShadow: isHovering
                  ? "0 0 24px rgba(0,212,255,0.35), 0 0 8px rgba(155,77,255,0.25)"
                  : "0 0 12px rgba(0,212,255,0.15)",
                opacity: 0.9,
              }} />

              {/* Inner dot — exact cursor position */}
              <div style={{
                position: "absolute",
                left: mouse.x,
                top: mouse.y,
                width: isHovering ? 8 : 5,
                height: isHovering ? 8 : 5,
                borderRadius: "50%",
                background: isHovering
                  ? "radial-gradient(circle, #fff 30%, #00D4FF 100%)"
                  : "radial-gradient(circle, #fff 40%, #00D4FF 100%)",
                transform: "translate(-50%, -50%)",
                pointerEvents: "none",
                zIndex: 1000,
                boxShadow: isHovering
                  ? "0 0 16px #00D4FF, 0 0 6px #fff"
                  : "0 0 8px rgba(0,212,255,0.8)",
                transition: "width 0.2s ease, height 0.2s ease",
              }} />
            </>
          )}

          {/* ── Scroll indicator (auto-scroll beacon) ── */}          {/* ── Scroll indicator (auto-scroll beacon) ── */}
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
              display: "flex", flexDirection: "column", gap: 0, zIndex: 100,
              background: "rgba(4,9,22,0.55)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 14,
              backdropFilter: "blur(20px)",
              padding: "10px 14px 10px 18px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)",
            }}>
              {SCENE_LABELS.map((label, i) => {
                const isActive = activeScene === i;
                const isHov = hoveredDot === i;
                return (
                  <button
                    key={label}
                    onClick={() => scrollToScene(i)}
                    onMouseEnter={() => { setHoveredDot(i); setIsHovering(true); }}
                    onMouseLeave={() => { setHoveredDot(null); setIsHovering(false); }}
                    style={{
                      display: "flex", alignItems: "center", gap: 10,
                      padding: "8px 0",
                      background: "transparent", border: "none",
                      cursor: "none", textAlign: "left",
                      borderBottom: i < SCENE_LABELS.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                    }}
                  >
                    {/* Dot */}
                    <div style={{
                      width: isActive ? 10 : 7,
                      height: isActive ? 10 : 7,
                      borderRadius: "50%",
                      flexShrink: 0,
                      background: isActive
                        ? accent
                        : isHov ? `${accent}66` : "rgba(255,255,255,0.15)",
                      boxShadow: isActive
                        ? `0 0 10px ${accent}, 0 0 4px ${accent}88`
                        : "none",
                      border: isActive ? "none" : `1px solid rgba(255,255,255,0.2)`,
                      transition: "all 0.35s var(--ease-out-expo)",
                    }} />
                    {/* Label */}
                    <span style={{
                      fontSize: 9, fontFamily: "'JetBrains Mono', monospace",
                      letterSpacing: "0.22em", textTransform: "uppercase",
                      whiteSpace: "nowrap", fontWeight: isActive ? 700 : 500,
                      color: isActive ? accent : isHov ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.3)",
                      transition: "all 0.35s var(--ease-out-expo)",
                      textShadow: isActive ? `0 0 12px ${accent}88` : "none",
                    }}>
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* ── Bottom HUD ── */}
          <div style={{
            position: "absolute", left: isMobile ? 12 : 28, bottom: isMobile ? 14 : 28,
            display: "flex", alignItems: "flex-end", gap: 8,
            zIndex: 50,
            opacity: 0.6,
          }}>
            <span style={{
              fontSize: isMobile ? 16 : 28, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700,
              color: accent, lineHeight: 0.85,
              transition: "color 1s ease",
            }}>
              {String(activeScene + 1).padStart(2, "0")}
            </span>
            <div style={{ display: "flex", flexDirection: "column", gap: 3, paddingBottom: 2 }}>
              <span style={{ fontSize: 6, fontFamily: "'JetBrains Mono', monospace", color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em" }}>
                MODULE
              </span>
              <span style={{ fontSize: isMobile ? 7 : 9, fontFamily: "'JetBrains Mono', monospace", color: "rgba(255,255,255,0.18)", letterSpacing: "0.18em" }}>
                {SCENE_LABELS[activeScene].toUpperCase()}
              </span>
            </div>
          </div>


          {/* ── Scenes ── */}
          <GenesisScene scene={s[0]} onSelectModule={onSelectModule} data={SCENE_DATA[0]} setIsHovering={setIsHovering} />
          <CognitionScene scene={s[1]} mouse={mouse} data={SCENE_DATA[1]} />
          <MemoryScene scene={s[2]} mouse={mouse} data={SCENE_DATA[2]} />
          <PlatformScene scene={s[3]} mouse={mouse} data={SCENE_DATA[3]} setIsHovering={setIsHovering} />
          <ResonanceScene scene={s[4]} mouse={mouse} data={SCENE_DATA[4]} />
          <SignalScene scene={s[5]} mouse={mouse} data={SCENE_DATA[5]} setIsHovering={setIsHovering} />

          {/* ── Progress Bar ── */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, height: 2,
            width: `${progress * 100}%`,
            background: `linear-gradient(90deg, ${accent}55, ${accent}cc, ${accent})`,
            boxShadow: `0 0 12px ${accent}88, 0 0 4px ${accent}`,
            transition: "width 0.08s linear, background 1.2s ease",
            zIndex: 200,
          }}>
            {/* Glowing tip */}
            <div style={{
              position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)",
              width: 6, height: 6, borderRadius: "50%",
              background: "#fff",
              boxShadow: `0 0 10px ${accent}, 0 0 4px #fff`,
            }} />
          </div>

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
                    <div style={{ fontSize: 10, fontFamily: "monospace", color: "#00D4FF", letterSpacing: "0.2em" }}>SELECTED MODULE</div>
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
                    <span key={tag} style={{ fontSize: 9, fontFamily: "monospace", color: "rgba(0,212,255,0.6)", border: "1px solid rgba(0,212,255,0.2)", padding: "4px 10px", borderRadius: 4 }}>
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

