"use client";
import { useState, useEffect, useRef, useCallback } from "react";

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const lastScroll = useRef(0);
  const lastTime = useRef(Date.now());

  useEffect(() => {
    const onScroll = () => {
      const now = Date.now();
      const dt = Math.max(now - lastTime.current, 1);
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const p = docH > 0 ? window.scrollY / docH : 0;
      const v = Math.abs(p - lastScroll.current) / dt * 1000;
      setProgress(Math.min(1, Math.max(0, p)));
      setVelocity(Math.min(v, 5));
      lastScroll.current = p;
      lastTime.current = now;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return { progress, velocity };
}

export function useMousePosition() {
  const [pos, setPos] = useState({ x: -1000, y: -1000 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return pos;
}

export function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return mobile;
}

export interface SceneState {
  active: boolean;
  progress: number;
  opacity: number;
}

const SCENES = [
  [0, 0.2],
  [0.2, 0.4],
  [0.4, 0.6],
  [0.6, 0.8],
  [0.8, 1.0],
];

export function getScene(scrollPct: number, idx: number): SceneState {
  const [start, end] = SCENES[idx];
  const range = end - start;
  const fadeIn = range * 0.15;
  const fadeOut = range * 0.15;

  if (scrollPct < start - 0.01 || scrollPct > end + 0.01) {
    return { active: false, progress: scrollPct < start ? 0 : 1, opacity: 0 };
  }

  const p = (scrollPct - start) / range;
  let opacity = 1;
  
  // For the very first scene, stay at opacity 1 at the start
  if (idx === 0 && scrollPct <= start) {
    opacity = 1;
  } else {
    if (p < 0.15) opacity = p / 0.15;
    if (p > 0.85) opacity = (1 - p) / 0.15;
  }
  
  opacity = Math.max(0, Math.min(1, opacity));

  return { active: true, progress: Math.max(0, Math.min(1, p)), opacity };
}

export function getActiveSceneIndex(scrollPct: number): number {
  for (let i = SCENES.length - 1; i >= 0; i--) {
    if (scrollPct >= SCENES[i][0] - 0.01) return i;
  }
  return 0;
}

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function easeOutExpo(t: number) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export function useAnimatedCounter(target: number, active: boolean, duration = 1500) {
  const [value, setValue] = useState(0);
  const startTime = useRef<number | null>(null);
  const rafId = useRef(0);

  useEffect(() => {
    if (!active) { setValue(0); startTime.current = null; return; }
    const animate = (time: number) => {
      if (!startTime.current) startTime.current = time;
      const elapsed = time - startTime.current;
      const p = Math.min(elapsed / duration, 1);
      setValue(target * easeOutExpo(p));
      if (p < 1) rafId.current = requestAnimationFrame(animate);
    };
    rafId.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId.current);
  }, [active, target, duration]);

  return value;
}
