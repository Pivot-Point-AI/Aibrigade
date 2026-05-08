export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  life: number;
  speed: number;
  hue: number;
}

export function getActiveSceneIndex(progress: number) {
  return Math.min(5, Math.floor(progress * 6));
}

export function getScene(progress: number, idx: number) {
  const start = idx / 6;
  const end = (idx + 1) / 6;
  const raw = (progress - start) / (end - start);
  return Math.max(0, Math.min(1, raw));
}

export class ParticleSystem {
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

  makeParticle(): Particle {
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
    const hueBase = [200, 260, 190, 280, 210, 230][scene];

    const time = Date.now() * 0.001;

    this.particles.forEach((p, i) => {
      // Brownian-like movement + velocity influence
      p.vx += Math.sin(time + i) * 0.01;
      p.vy += Math.cos(time + i) * 0.01;

      // Mouse attraction
      const dx = mx - p.x;
      const dy = my - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 250 && dist > 0) {
        const f = (1 - dist / 250) * 0.03;
        p.vx += (dx / dist) * f;
        p.vy += (dy / dist) * f;
      }

      // Velocity cap
      const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      const maxSpeed = 1.2 + velocity * 2;
      if (speed > maxSpeed) { p.vx *= maxSpeed / speed; p.vy *= maxSpeed / speed; }

      p.x += p.vx * p.speed;
      p.y += p.vy * p.speed;
      p.life += 0.002;

      if (p.x < 0) p.x = this.w;
      if (p.x > this.w) p.x = 0;
      if (p.y < 0) p.y = this.h;
      if (p.y > this.h) p.y = 0;

      const alpha = (0.2 + Math.sin(p.life) * 0.15 + velocity * 0.2) * 0.8;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r + velocity * 1, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${hueBase + p.hue * 0.1}, 80%, 70%, ${alpha})`;
      ctx.fill();
    });

    // Draw connections with energy pulses
    const maxDist = 140;
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const a = this.particles[i];
        const b = this.particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < maxDist) {
          // Energy pulse logic
          const pulse = Math.sin(time * 2 - d * 0.05) * 0.5 + 0.5;
          const alpha = (1 - d / maxDist) * (0.1 + pulse * 0.15);
          
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `hsla(${hueBase}, 70%, 75%, ${alpha})`;
          ctx.lineWidth = 0.4 + pulse * 0.4;
          ctx.stroke();
        }
      }
    }
  }
}
