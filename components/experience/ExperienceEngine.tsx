"use client";
import { useEffect, useRef, useCallback, useState } from "react";
import { Target, BarChart3, Settings2, Layers, Users, Activity } from "lucide-react";
import { useScrollProgress, useMousePosition, useIsMobile } from "./hooks";
import { ParticleSystem } from "./utils";
import { GenesisScene } from "./GenesisScene";
import { CognitionScene } from "./CognitionScene";
import { MemoryScene } from "./MemoryScene";
import { PlatformScene } from "./PlatformScene";
import { ResonanceScene } from "./ResonanceScene";
import { SignalScene } from "./SignalScene";
import { Scene3D } from "./Scene3D";
import { SERVICES } from "./data";
import { SceneData } from "./types";
import { SITE_STATS } from "@/data/siteStats";

const SCENE_LABELS = ["Strategy", "Outcomes", "Process", "Platform", "People", "Signal"];
const SCENE_ICONS = [Target, BarChart3, Settings2, Layers, Users, Activity];

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
    sub: `Join ${SITE_STATS.projectsDelivered} enterprises running production AI systems built by AI Brigade.`,
    accent: "#00D4FF",
    glyph: "△",
  },
];

// Cursor trail point type
export default function ExperienceEngine() {
  const isMobile = useIsMobile();
  const mouse = useMousePosition();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const { velocity } = useScrollProgress();
  const SCENE_COUNT = 6;

  // Active scene index drives the experience (0-5)
  const [activeSceneIdx, setActiveSceneIdx] = useState(0);
  const isSnapping = useRef(false);
  const currentSceneRef = useRef(0);

  // Derive a smooth progress value from activeSceneIdx for particle/canvas effects
  const progress = activeSceneIdx / (SCENE_COUNT - 1);

  // ── JS scroll-snap: intercept wheel/touch, snap one scene at a time ──
  useEffect(() => {
    let touchStartY = 0;
    const COOLDOWN = 600; // ms between snaps
    let lastSnap = 0;

    const snapTo = (idx: number) => {
      const now = Date.now();
      if (now - lastSnap < COOLDOWN) return;
      const next = Math.max(0, Math.min(SCENE_COUNT - 1, idx));
      if (next === currentSceneRef.current) return;
      lastSnap = now;
      currentSceneRef.current = next;
      setActiveSceneIdx(next);
      // Instant scroll — no smooth animation that fires intermediate onScroll events
      window.scrollTo({ top: next * window.innerHeight });
    };

    // Jump scrollY to where footer becomes visible (one vh past the experience)
    const goToFooter = () => {
      window.scrollTo({ top: SCENE_COUNT * window.innerHeight });
    };

    const onWheel = (e: WheelEvent) => {
      const scrollingDown = e.deltaY > 0;
      const cur = currentSceneRef.current;

      // Already past experience — native scroll handles footer freely
      if (window.scrollY > (SCENE_COUNT - 1) * window.innerHeight + 10) return;

      // Last scene + scrolling down → jump to footer
      if (cur >= SCENE_COUNT - 1 && scrollingDown) {
        e.preventDefault();
        goToFooter();
        return;
      }

      // First scene + scrolling up → release naturally
      if (cur <= 0 && !scrollingDown) return;

      e.preventDefault();
      snapTo(cur + (scrollingDown ? 1 : -1));
    };

    const onTouchStart = (e: TouchEvent) => { touchStartY = e.touches[0].clientY; };
    const onTouchEnd = (e: TouchEvent) => {
      const dy = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(dy) < 40) return;
      const scrollingDown = dy > 0;
      const cur = currentSceneRef.current;
      if (cur >= SCENE_COUNT - 1 && scrollingDown) { goToFooter(); return; }
      if (cur <= 0 && !scrollingDown) return;
      snapTo(cur + (scrollingDown ? 1 : -1));
    };

    const onKeyDown = (e: KeyboardEvent) => {
      const down = e.key === "ArrowDown" || e.key === "PageDown";
      const up   = e.key === "ArrowUp"   || e.key === "PageUp";
      if (down && currentSceneRef.current < SCENE_COUNT - 1) { e.preventDefault(); snapTo(currentSceneRef.current + 1); }
      if (up   && currentSceneRef.current > 0)               { e.preventDefault(); snapTo(currentSceneRef.current - 1); }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const activeScene = activeSceneIdx;
  const [hoveredDot, setHoveredDot] = useState<number | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [selectedModule, setSelectedModule] = useState<number | null>(null);

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
    if (isSnapping.current) return;
    isSnapping.current = true;
    currentSceneRef.current = idx;
    setActiveSceneIdx(idx);
    window.scrollTo({ top: idx * window.innerHeight, behavior: "smooth" });
    setTimeout(() => { isSnapping.current = false; }, 700);
  }, []);

  const [platformService, setPlatformService] = useState(0);

  const onSelectModule = useCallback((idx: number) => {
    setPlatformService(idx);
    scrollToScene(3); // Platform scene
  }, [scrollToScene]);

  // Each scene value: 1.0 when active, 0.0 when not — SceneWrapper handles the CSS fade
  const s = [0, 1, 2, 3, 4, 5].map((i) => (i === activeSceneIdx ? 1 : 0));
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

      {/* Scroll height gives the scrollbar a range; actual navigation is JS-driven */}
      <div suppressHydrationWarning style={{ height: `${(SCENE_COUNT + 1) * 100}vh`, position: "relative" }}>
        <div suppressHydrationWarning style={{
          position: "sticky", top: 0, height: "100vh",
          background: "transparent",
          overflow: "hidden",
          cursor: "auto",
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
                const Icon = SCENE_ICONS[i];
                return (
                  <button
                    key={label}
                    onClick={() => scrollToScene(i)}
                    onMouseEnter={() => { setHoveredDot(i); setIsHovering(true); }}
                    onMouseLeave={() => { setHoveredDot(null); setIsHovering(false); }}
                    style={{
                      display: "flex", alignItems: "center", gap: 10,
                      padding: "8px 8px",
                      marginLeft: -8, marginRight: -8,
                      background: isActive ? `${accent}14` : "transparent",
                      borderRadius: 6,
                      border: "none",
                      borderLeftWidth: 2,
                      borderLeftStyle: "solid",
                      borderLeftColor: isActive ? accent : "transparent",
                      cursor: "none", textAlign: "left",
                      borderBottom: i < SCENE_LABELS.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                      transition: "all 0.35s var(--ease-out-expo)",
                    }}
                  >
                    {/* Icon */}
                    <Icon
                      size={14}
                      strokeWidth={1.75}
                      color={isActive ? accent : isHov ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.35)"}
                      style={{ flexShrink: 0, transition: "all 0.35s var(--ease-out-expo)" }}
                    />
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
          {activeScene !== 0 && (
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
          )}


          {/* ── Scenes ── */}
          <GenesisScene scene={s[0]} onSelectModule={onSelectModule} data={SCENE_DATA[0]} setIsHovering={setIsHovering} />
          <CognitionScene scene={s[1]} mouse={mouse} data={SCENE_DATA[1]} />
          <MemoryScene scene={s[2]} mouse={mouse} data={SCENE_DATA[2]} />
          <PlatformScene scene={s[3]} mouse={mouse} data={SCENE_DATA[3]} setIsHovering={setIsHovering} initialService={platformService} />
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

