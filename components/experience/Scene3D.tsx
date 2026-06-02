"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo, Suspense, useEffect, useState } from "react";
import * as THREE from "three";
import { useIsMobile } from "./hooks";

function Particles({ accent }: { accent: string }) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 180; // reduced from 300

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const color = new THREE.Color(accent);
    for (let i = 0; i < count; i++) {
      const r = 8 + Math.random() * 7;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      const v = 0.1 * (Math.random() - 0.5);
      col[i * 3]     = Math.max(0, color.r + v);
      col[i * 3 + 1] = Math.max(0, color.g + v);
      col[i * 3 + 2] = Math.max(0, color.b + v);
    }
    return [pos, col];
  }, [accent]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.elapsedTime;
    pointsRef.current.rotation.y = t * 0.03;
    pointsRef.current.rotation.x = Math.sin(t * 0.015) * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color"    args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.07} vertexColors transparent opacity={0.65} sizeAttenuation />
    </points>
  );
}

function WireframeCore() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = t * 0.1;
    groupRef.current.rotation.x = Math.sin(t * 0.15) * 0.1;
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <torusGeometry args={[2.5, 0.04, 12, 36]} />
        <meshBasicMaterial color="#00D4FF" transparent opacity={0.4} />
      </mesh>
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[2.2, 0.03, 10, 28]} />
        <meshBasicMaterial color="#00D4FF" transparent opacity={0.28} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 3]}>
        <torusGeometry args={[1.8, 0.02, 8, 20]} />
        <meshBasicMaterial color="#00D4FF" transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

function FloatingShapes() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.children.forEach((child, i) => {
      child.rotation.x = t * (0.1 + i * 0.05);
      child.rotation.y = t * (0.05 + i * 0.03);
      (child as THREE.Mesh).position.y = Math.sin(t * (0.3 + i * 0.2)) * 0.3;
    });
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <icosahedronGeometry args={[0.8, 0]} />
        <meshBasicMaterial color="#00D4FF" wireframe transparent opacity={0.35} />
      </mesh>
      <mesh>
        <octahedronGeometry args={[0.5, 0]} />
        <meshBasicMaterial color="#00D4FF" transparent opacity={0.25} />
      </mesh>
      <mesh position={[3, 2, -4]}>
        <tetrahedronGeometry args={[0.4, 0]} />
        <meshBasicMaterial color="#00D4FF" transparent opacity={0.18} />
      </mesh>
    </group>
  );
}

export function Scene3D({ progress, accent }: { progress: number; accent: string }) {
  const isMobile = useIsMobile();
  // Delay mount until after hydration to avoid SSR/client mismatch
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted || isMobile) return null;

  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none", opacity: 0.55 }}>
      <Canvas
        camera={{ position: [0, 0, 12], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "low-power",
          failIfMajorPerformanceCaveat: false,
        }}
        style={{ background: "transparent" }}
        onCreated={({ gl }) => {
          // Ensure context is properly disposed on unmount
          const canvas = gl.domElement;
          const handleContextLost = (e: Event) => {
            e.preventDefault();
          };
          canvas.addEventListener("webglcontextlost", handleContextLost);
          return () => canvas.removeEventListener("webglcontextlost", handleContextLost);
        }}
      >
        <Suspense fallback={null}>
          <Particles accent={accent} />
          <WireframeCore />
          <FloatingShapes />
        </Suspense>
      </Canvas>
    </div>
  );
}
