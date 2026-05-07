"use client";
import { useEffect, useRef, useCallback, useState, useMemo } from "react";
import Link from "next/link";

interface MousePosition {
  x: number;
  y: number;
  nx: number;
  ny: number;
}

interface SceneData {
  id: string;
  headline: string;
  sub: string;
  accent: string;
  glyph: string;
}

import { SERVICES, CASES, PROCESS, TESTIMONIALS } from "./data";

// ─── DATA ────────────────────────────────────────────────────────────────────
const SCENE_LABELS = ["Strategy", "Outcomes", "Process", "Resonance", "Signal"];

const SCENE_DATA: SceneData[] = [
  {
    id: "genesis",
    headline: "Strategic Engineering",
    sub: "We bridge the gap between model research and production reality.",
    accent: "#00D4FF",
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

// ─── HOOKS ───────────────────────────────────────────────────────────────────
function useScrollProgress() {
  const [state, setState] = useState({ progress: 0, velocity: 0 });
  const lastProgress = useRef(0);
  const lastTime = useRef(Date.now());

  useEffect(() => {
    const onScroll = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const p = docH > 0 ? Math.min(1, window.scrollY / docH) : 0;
      const now = Date.now();
      const dt = Math.max(1, now - lastTime.current);
      const v = Math.abs(p - lastProgress.current) / dt;
      lastProgress.current = p;
      lastTime.current = now;
      setState({ progress: p, velocity: Math.min(v * 1000, 1) });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return state;
}

function useMousePosition() {
  const [pos, setPos] = useState({ x: 0, y: 0, nx: 0, ny: 0 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPos({
        x: e.clientX,
        y: e.clientY,
        nx: (e.clientX / window.innerWidth) * 2 - 1,
        ny: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return pos;
}

function useIsMobile() {
  const [m, setM] = useState(false);
  useEffect(() => {
    const check = () => setM(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return m;
}

function getActiveSceneIndex(progress: number) {
  return Math.min(4, Math.floor(progress * 5));
}

function getScene(progress: number, idx: number) {
  const start = idx / 5;
  const end = (idx + 1) / 5;
  const raw = (progress - start) / (end - start);
  return Math.max(0, Math.min(1, raw));
}

// ─── PARTICLE SYSTEM ─────────────────────────────────────────────────────────
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  life: number;
  speed: number;
  hue: number;
}

class ParticleSystem {
  particles: Particle[] = [];
  w: number = 0;
  h: number = 0;

  constructor() {
    this.particles = [];
    this.w = 0;
    this.h = 0;
  }

  init(canvas: HTMLCanvasElement, count: number) {
    this.resize(canvas);
    this.particles = Array.from({ length: count }, () => this.makeParticle());
  }

  makeParticle() {
    return {
      x: Math.random() * this.w,
      y: Math.random() * this.h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.5,
      life: Math.random(),
      speed: Math.random() * 0.5 + 0.5,
      hue: Math.random() * 60 + 190,
    };
  }

  resize(canvas: HTMLCanvasElement) {
    this.w = canvas.width = canvas.offsetWidth;
    this.h = canvas.height = canvas.offsetHeight;
  }

  render(ctx: CanvasRenderingContext2D, mx: number, my: number, progress: number, velocity: number) {
    ctx.clearRect(0, 0, this.w, this.h);
    const scene = getActiveSceneIndex(progress);
    const hueBase = [200, 260, 190, 280, 210][scene];

    this.particles.forEach((p) => {
      // Mouse attraction
      const dx = mx - p.x;
      const dy = my - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 200 && dist > 0) {
        const f = (1 - dist / 200) * 0.02;
        p.vx += (dx / dist) * f;
        p.vy += (dy / dist) * f;
      }

      // Velocity cap
      const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      if (speed > 1.5) { p.vx *= 1.5 / speed; p.vy *= 1.5 / speed; }

      p.x += p.vx * p.speed;
      p.y += p.vy * p.speed;
      p.life += 0.003;

      if (p.x < 0 || p.x > this.w) p.vx *= -1;
      if (p.y < 0 || p.y > this.h) p.vy *= -1;

      const alpha = 0.3 + Math.sin(p.life) * 0.2 + velocity * 0.3;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r + velocity * 1.5, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${hueBase + p.hue * 0.3}, 80%, 65%, ${alpha})`;
      ctx.fill();
    });

    // Draw connections
    const maxDist = 120;
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const a = this.particles[i];
        const b = this.particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < maxDist) {
          const alpha = (1 - d / maxDist) * 0.15;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `hsla(${hueBase}, 70%, 65%, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }
}

// ─── SCENE: GENESIS ──────────────────────────────────────────────────────────
function GenesisScene({ scene }: { scene: number }) {
  const rings = [280, 200, 130, 70];
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 50);
    return () => clearInterval(id);
  }, []);

  // Genesis is the first scene, it should be visible from progress 0
  const opacity = scene > 0.85 ? 1 - (scene - 0.85) / 0.15 : 1;

  return (
    <SceneWrapper opacity={opacity}>
      <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", height: "100%" }}>
        {/* Pulsing rings */}
        <div style={{ position: "absolute", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {rings.map((size, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: size + scene * 40,
                height: size + scene * 40,
                borderRadius: "50%",
                border: `1px solid rgba(0,212,255,${0.08 + (3 - i) * 0.06 - scene * 0.02})`,
                boxShadow: `0 0 ${20 + i * 10}px rgba(0,212,255,${0.05 + scene * 0.1})`,
                animation: `spin-${i % 2 === 0 ? "cw" : "ccw"} ${8 + i * 4}s linear infinite`,
                transform: `rotate(${tick * (i % 2 === 0 ? 1 : -1) * 0.5}deg)`,
              }}
            >
              {/* Ring tick marks */}
              {Array.from({ length: 8 }).map((_, j) => (
                <div key={j} style={{
                  position: "absolute",
                  width: 4, height: 4,
                  borderRadius: "50%",
                  background: "rgba(0,212,255,0.6)",
                  top: "50%",
                  left: "50%",
                  transform: `rotate(${j * 45}deg) translateX(${(size + scene * 40) / 2 - 2}px) translateY(-50%)`,
                }} />
              ))}
            </div>
          ))}

          {/* Core */}
          <div style={{
            width: 48, height: 48, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,212,255,0.9), rgba(0,212,255,0.1) 70%)",
            boxShadow: "0 0 40px rgba(0,212,255,0.6), 0 0 80px rgba(0,212,255,0.2)",
            animation: "pulse-core 2s ease-in-out infinite",
          }} />

          {/* Floating Services Labels */}
          {SERVICES.map((s, i) => (
            <div key={i} style={{
              position: "absolute",
              fontSize: 10, fontFamily: "monospace", color: "rgba(0,212,255,0.5)",
              letterSpacing: "0.1em", whiteSpace: "nowrap",
              transform: `rotate(${i * 60 + tick * 0.2}deg) translateX(${160 + scene * 20}px) rotate(${-(i * 60 + tick * 0.2)}deg)`,
              opacity: Math.max(0, scene * 2 - 0.5),
            }}>
              {s.title.toUpperCase()}
            </div>
          ))}
        </div>

        {/* Text */}
        <div style={{ position: "relative", zIndex: 10, textAlign: "center", marginTop: 320 }}>
          <SceneText scene={scene} data={SCENE_DATA[0]} />
        </div>
      </div>
    </SceneWrapper>
  );
}

// ─── SCENE: COGNITION ────────────────────────────────────────────────────────
interface Edge {
  from: number;
  to: number;
  id: number;
}

function CognitionScene({ scene, mouse }: { scene: number; mouse: MousePosition }) {
  const nodes = useMemo(() => Array.from({ length: 16 }, (_, i) => ({
    id: i,
    x: 20 + (i % 4) * 22,
    y: 20 + Math.floor(i / 4) * 22,
    delay: i * 0.1,
  })), []);

  const [activeEdges, setActiveEdges] = useState<Edge[]>([]);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setTick((t) => t + 1);
      setActiveEdges(
        Array.from({ length: 6 }, () => ({
          from: Math.floor(Math.random() * 16),
          to: Math.floor(Math.random() * 16),
          id: Math.random(),
        }))
      );
    }, 600);
    return () => clearInterval(id);
  }, []);

  const edges = useMemo(() => {
    const result: [number, number][] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        if (Math.sqrt(dx * dx + dy * dy) < 30) result.push([i, j]);
      }
    }
    return result;
  }, [nodes]);

  return (
    <SceneWrapper opacity={scene < 0.05 ? scene / 0.05 : scene > 0.85 ? 1 - (scene - 0.85) / 0.15 : 1}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around", height: "100%", padding: "0 60px", flexWrap: "wrap", gap: 40 }}>
        {/* Neural net SVG */}
        <div style={{
          transform: `perspective(800px) rotateY(${mouse.nx * 8}deg) rotateX(${-mouse.ny * 8}deg)`,
          transition: "transform 0.1s ease",
        }}>
          <svg viewBox="0 0 110 110" width={window.innerWidth > 768 ? 360 : 260} height={window.innerWidth > 768 ? 360 : 260}>
            {edges.map(([a, b], i) => {
              const isActive = activeEdges.some(e => (e.from === a && e.to === b) || (e.from === b && e.to === a));
              return (
                <line
                  key={i}
                  x1={nodes[a].x} y1={nodes[a].y}
                  x2={nodes[b].x} y2={nodes[b].y}
                  stroke={isActive ? "#8B5CF6" : "rgba(139,92,246,0.15)"}
                  strokeWidth={isActive ? 1.2 : 0.5}
                  style={{ transition: "stroke 0.3s, stroke-width 0.3s" }}
                />
              );
            })}
            {nodes.map((n, i) => {
              const isActive = activeEdges.some(e => e.from === i || e.to === i);
              return (
                <circle
                  key={n.id}
                  cx={n.x} cy={n.y}
                  r={isActive ? 3.5 : 2}
                  fill={isActive ? "#8B5CF6" : "rgba(139,92,246,0.4)"}
                  style={{ transition: "r 0.2s, fill 0.2s" }}
                />
              );
            })}
          </svg>
        </div>

        {/* Text */}
        <div style={{ maxWidth: 440, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <SceneText scene={scene} data={SCENE_DATA[1]} />
          {/* Case Stats */}
          <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 16 }}>
            {CASES.map((c, i) => (
              <div key={i} style={{
                opacity: Math.max(0, scene * 3 - i * 0.5),
                transform: `translateX(${(1 - scene) * 20}px)`,
                transition: "opacity 0.5s, transform 0.5s"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                  <span style={{ fontSize: 10, fontFamily: "monospace", color: "rgba(255,255,255,0.4)" }}>{c.client.toUpperCase()}</span>
                  <span style={{ fontSize: 10, fontWeight: 700, color: "#8B5CF6" }}>{c.stat}</span>
                </div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", fontFamily: "serif", fontStyle: "italic" }}>
                  {c.headline}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SceneWrapper>
  );
}

// ─── SCENE: MEMORY ───────────────────────────────────────────────────────────
function MemoryScene({ scene, mouse }: { scene: number; mouse: MousePosition }) {
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
          <SceneText scene={scene} data={SCENE_DATA[2]} />
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

// ─── SCENE: RESONANCE ────────────────────────────────────────────────────────
function ResonanceScene({ scene, mouse }: { scene: number; mouse: MousePosition }) {
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
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 0 }}>
        {/* Wave visualizer */}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none"
          style={{ width: "100%", maxWidth: 700, height: 200 }}>
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

        <div style={{ textAlign: "center", maxWidth: 640, padding: "0 32px", display: "flex", flexDirection: "column", alignItems: "center", marginTop: -20 }}>
          <SceneText scene={scene} data={SCENE_DATA[3]} />

          {/* Testimonial slider */}
          <div style={{ marginTop: 48, position: "relative", height: 160, width: "100%", maxWidth: 540 }}>
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
                    fontSize: 18, color: "rgba(248,250,252,0.85)", fontStyle: "italic", 
                    marginBottom: 16, lineHeight: 1.6, fontFamily: "var(--font-serif), serif",
                    textAlign: "center"
                  }}>
                    "{t.quote}"
                  </div>
                  <div style={{ fontSize: 11, fontFamily: "monospace", color: "#A855F7", letterSpacing: "0.15em", fontWeight: 600 }}>
                    {t.name.toUpperCase()} — {t.company.toUpperCase()}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Frequency bars */}
        <div style={{ display: "flex", gap: 4, alignItems: "flex-end", height: 60, marginTop: 64 }}>
          {Array.from({ length: 32 }).map((_, i) => {
            const h = 10 + Math.abs(Math.sin(tick * 0.08 + i * 0.4)) * 50;
            return (
              <div key={i} style={{
                width: 6, height: h,
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

// ─── SCENE: SIGNAL ───────────────────────────────────────────────────────────
function SignalScene({ scene, mouse }: { scene: number; mouse: MousePosition }) {
  const [typed, setTyped] = useState("");
  const [cursor, setCursor] = useState(true);
  const [tick, setTick] = useState(0);

  const fullText = "Intelligence rendered — ready.";

  useEffect(() => {
    if (scene < 0.1) { setTyped(""); return; }
    const speed = Math.max(30, 80 - scene * 60);
    const id = setInterval(() => {
      setTyped((prev) => {
        if (prev.length >= fullText.length) { clearInterval(id); return prev; }
        return fullText.slice(0, prev.length + 1);
      });
    }, speed);
    return () => clearInterval(id);
  }, [scene]);

  useEffect(() => {
    const id = setInterval(() => setCursor((c) => !c), 500);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 60);
    return () => clearInterval(id);
  }, []);

  // Data stream lines
  const streamLines = useMemo(() => Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    speed: 1 + Math.random() * 2,
    len: 40 + Math.random() * 60,
    delay: Math.random() * 3,
  })), []);

  return (
    <SceneWrapper opacity={scene < 0.05 ? scene / 0.05 : 1}>
      {/* Vertical data streams */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.15 }} viewBox="0 0 100 100" preserveAspectRatio="none">
        {streamLines.map((s) => {
          const y = ((tick * s.speed * 0.5 + s.delay * 20) % 120) - 10;
          return (
            <line key={s.id} x1={s.x} y1={y} x2={s.x} y2={y + s.len * 0.3}
              stroke="#38BDF8" strokeWidth={0.3}
              strokeLinecap="round"
            />
          );
        })}
      </svg>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 40, padding: "0 40px", textAlign: "center" }}>
        {/* Terminal window */}
        <div style={{
          background: "rgba(2, 8, 23, 0.7)", border: "1px solid rgba(56,189,248,0.25)",
          borderRadius: 16, padding: "32px", width: "100%", maxWidth: 540,
          backdropFilter: "blur(40px)",
          boxShadow: "0 0 60px rgba(56,189,248,0.1), inset 0 1px 0 rgba(255,255,255,0.05)",
          transform: `perspective(1000px) rotateX(${mouse.ny * -2}deg) rotateY(${mouse.nx * 2}deg)`,
          transition: "transform 0.2s ease-out",
        }}>
          {/* Terminal header */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20, paddingBottom: 12, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            {["#FF5F57", "#FFBD2E", "#28C840"].map((c, i) => (
              <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c, opacity: 0.8 }} />
            ))}
            <span style={{ marginLeft: "auto", fontSize: 10, fontFamily: "monospace", color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em" }}>AIBRIGADE — OUTPUT</span>
          </div>

          <div style={{ fontFamily: "monospace", fontSize: 14, color: "#38BDF8", textAlign: "left", lineHeight: 1.8 }}>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>$ </span>
            <span style={{ color: "#A855F7" }}>run</span>
            <span style={{ color: "rgba(255,255,255,0.5)" }}> inference.signal </span>
            <br />
            <span style={{ color: "rgba(255,255,255,0.3)" }}>› </span>
            {typed}
            <span style={{ opacity: cursor ? 1 : 0, color: "#38BDF8" }}>▌</span>
          </div>
        </div>

        <SceneText scene={scene} data={SCENE_DATA[4]} />

        {/* Glowing CTA */}
        <div style={{ marginTop: 8, position: "relative", zIndex: 100 }}>
          <Link href="/contact" style={{ textDecoration: "none", position: "relative", zIndex: 100 }}>
            <div style={{
              display: "inline-block", padding: "12px 32px",
              border: "1px solid rgba(56,189,248,0.4)", borderRadius: 24,
              fontFamily: "monospace", fontSize: 11, letterSpacing: "0.15em",
              color: "#38BDF8", cursor: "pointer",
              background: "rgba(56,189,248,0.05)",
              boxShadow: "0 0 20px rgba(56,189,248,0.1)",
              transition: "all 0.3s ease",
              animation: "signal-pulse 2s ease-in-out infinite",
              pointerEvents: "auto",
            }}>
              INITIALISE → AIBRIGADE
            </div>
          </Link>
        </div>
      </div>
    </SceneWrapper>
  );
}

// ─── SHARED COMPONENTS ───────────────────────────────────────────────────────
function SceneWrapper({ opacity, children }: { opacity: number; children: React.ReactNode }) {
  return (
    <div style={{
      position: "absolute", inset: 0,
      opacity, transition: "opacity 0.5s ease",
      display: "flex", alignItems: "center", justifyContent: "center",
      pointerEvents: opacity > 0.1 ? "auto" : "none",
    }}>
      {children}
    </div>
  );
}

function SceneText({ scene, data }: { scene: number; data: SceneData }) {
  return (
    <div style={{
      opacity: scene > 0.1 ? 1 : scene / 0.1,
      transition: "opacity 0.4s",
      display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center"
    }}>
      <div style={{
        fontSize: 11, fontFamily: "monospace", letterSpacing: "0.25em",
        color: data.accent, marginBottom: 12, opacity: 0.8,
        textTransform: "uppercase",
      }}>
        {data.glyph} {data.id.toUpperCase()}
      </div>
      <h2 style={{
        fontSize: "clamp(2rem, 5vw, 4rem)", fontFamily: "var(--font-serif), Georgia, serif",
        fontWeight: 700, color: "#F8FAFC",
        lineHeight: 1.1, margin: "0 0 20px",
        textShadow: `0 0 60px ${data.accent}44`,
      }}>
        {data.headline}
      </h2>
      <p style={{
        fontSize: 16, color: "rgba(248,250,252,0.7)",
        lineHeight: 1.7, maxWidth: 420, margin: 0,
        fontFamily: "var(--font-serif), serif",
        letterSpacing: "0.01em",
      }}>
        {data.sub}
      </p>
    </div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function ExperienceEngine() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const { progress, velocity } = useScrollProgress();
  const mouse = useMousePosition();
  const isMobile = useIsMobile();
  const activeScene = getActiveSceneIndex(progress);
  const [hoveredDot, setHoveredDot] = useState<number | null>(null);

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
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: (idx / 4) * docH, behavior: "smooth" });
  }, []);

  const s = [0, 1, 2, 3, 4].map((i) => getScene(progress, i));
  const accent = SCENE_DATA[activeScene].accent;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=JetBrains+Mono:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #020817; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(0,212,255,0.3); border-radius: 2px; }
        @keyframes pulse-core {
          0%, 100% { transform: scale(1); box-shadow: 0 0 40px rgba(0,212,255,0.6); }
          50% { transform: scale(1.3); box-shadow: 0 0 80px rgba(0,212,255,0.9); }
        }
        @keyframes signal-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(56,189,248,0.1); }
          50% { box-shadow: 0 0 40px rgba(56,189,248,0.3); border-color: rgba(56,189,248,0.7); }
        }
        @keyframes float-glyph {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
      `}</style>

      <div style={{ height: "500vh", position: "relative" }}>
        <div style={{
          position: "sticky", top: 0, height: "100vh",
          background: "#020817", overflow: "hidden",
        }}>
          {/* Technical grid */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: `linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
            maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)",
            pointerEvents: "none",
            transform: `translateY(${progress * -30}px)`,
            transition: "background-size 1s",
          }} />

          {/* Particle canvas */}
          <canvas
            ref={canvasRef}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.55 }}
          />

          {/* Ambient orb */}
          <div style={{
            position: "absolute",
            width: 800, height: 800,
            left: "50%", top: "50%",
            transform: "translate(-50%, -50%)",
            background: `radial-gradient(circle, ${accent}11, transparent 65%)`,
            borderRadius: "50%",
            transition: "background 1.2s ease",
            pointerEvents: "none",
          }} />

          {/* Cursor glow */}
          {!isMobile && (
            <div style={{
              position: "absolute",
              left: mouse.x, top: mouse.y,
              width: 400, height: 400,
              transform: "translate(-50%, -50%)",
              background: `radial-gradient(circle, ${accent}10, transparent 70%)`,
              borderRadius: "50%",
              pointerEvents: "none",
              transition: "background 1s",
            }} />
          )}

          {/* Scene dots nav */}
          <div style={{
            position: "absolute", right: 24, top: "50%", transform: "translateY(-50%)",
            display: "flex", flexDirection: "column", gap: 16, zIndex: 100,
          }}>
            {SCENE_LABELS.map((label, i) => (
              <div key={label} style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 10 }}>
                {hoveredDot === i && (
                  <span style={{
                    fontSize: 9, fontFamily: "monospace", letterSpacing: "0.1em",
                    color: accent, textTransform: "uppercase", whiteSpace: "nowrap",
                    background: "rgba(2,8,23,0.9)",
                    padding: "3px 8px", borderRadius: 4,
                    border: `1px solid ${accent}44`,
                    transition: "all 0.2s",
                  }}>
                    {label}
                  </span>
                )}
                <button
                  onClick={() => scrollToScene(i)}
                  onMouseEnter={() => setHoveredDot(i)}
                  onMouseLeave={() => setHoveredDot(null)}
                  style={{
                    width: activeScene === i ? 8 : 5,
                    height: activeScene === i ? 8 : 5,
                    borderRadius: "50%",
                    border: "none",
                    background: activeScene === i ? accent : "rgba(255,255,255,0.15)",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    boxShadow: activeScene === i ? `0 0 12px ${accent}` : "none",
                    padding: 0,
                  }}
                />
              </div>
            ))}
          </div>

          {/* Scene index readout */}
          <div style={{
            position: "absolute", left: 24, bottom: 28,
            fontFamily: "monospace", fontSize: 10, letterSpacing: "0.15em",
            color: "rgba(255,255,255,0.15)", zIndex: 50,
          }}>
            {String(activeScene + 1).padStart(2, "0")} / 05 — {SCENE_LABELS[activeScene].toUpperCase()}
          </div>

          {/* Scenes */}
          <GenesisScene scene={s[0]} />
          <CognitionScene scene={s[1]} mouse={mouse} />
          <MemoryScene scene={s[2]} mouse={mouse} />
          <ResonanceScene scene={s[3]} mouse={mouse} />
          <SignalScene scene={s[4]} mouse={mouse} />

          {/* Progress bar */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, height: 2,
            width: `${progress * 100}%`,
            background: `linear-gradient(90deg, ${accent}, #8B5CF6)`,
            boxShadow: `0 0 12px ${accent}88`,
            transition: "width 0.1s linear, background 1s",
            zIndex: 200,
          }} />

          {/* Copyright */}
          <div style={{
            position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)",
            fontSize: 9, color: "rgba(255,255,255,0.12)", fontFamily: "monospace",
            letterSpacing: "0.15em", zIndex: 50, whiteSpace: "nowrap",
          }}>
            © 2026 AIBRIGADE
          </div>

          {/* Scroll hint */}
          {progress < 0.03 && (
            <div style={{
              position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
              animation: "float-glyph 2s ease-in-out infinite",
              zIndex: 50,
            }}>
              <span style={{ fontSize: 9, fontFamily: "monospace", letterSpacing: "0.2em", color: "rgba(255,255,255,0.2)" }}>SCROLL</span>
              <div style={{ width: 1, height: 30, background: `linear-gradient(to bottom, ${accent}80, transparent)` }} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}