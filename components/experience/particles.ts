export interface ParticleConfig {
  count: number;
  connectDistance: number;
  mouseRadius: number;
}

class Particle {
  x: number; y: number;
  vx: number; vy: number;
  size: number; opacity: number;
  hue: number; baseX: number; baseY: number;

  constructor(w: number, h: number) {
    this.x = this.baseX = Math.random() * w;
    this.y = this.baseY = Math.random() * h;
    this.vx = (Math.random() - 0.5) * 0.8;
    this.vy = (Math.random() - 0.5) * 0.8;
    this.size = Math.random() * 2 + 0.5;
    this.opacity = Math.random() * 0.4 + 0.1;
    this.hue = Math.random() * 30 + 215; // Blue-Violet
  }

  update(w: number, h: number, mx: number, my: number, scroll: number, velocity: number) {
    const dx = mx - this.x, dy = my - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    if (dist < 250 && dist > 1) {
      const f = (250 - dist) / 250 * 0.04;
      this.vx += (dx / dist) * f;
      this.vy += (dy / dist) * f;
    }

    // Scroll-driven energy
    const speedBoost = 1 + velocity * 15;
    this.vx += Math.sin(scroll * 10 + this.baseY * 0.01) * 0.005 * speedBoost;
    this.vy += Math.cos(scroll * 8 + this.baseX * 0.01) * 0.005 * speedBoost;

    this.x += this.vx * speedBoost;
    this.y += this.vy * speedBoost;
    
    this.vx *= 0.97;
    this.vy *= 0.97;

    // Pulse opacity
    this.opacity = (Math.sin(Date.now() * 0.002 + this.baseX) * 0.15) + 0.25;

    if (this.x < -100) this.x = w + 100;
    if (this.x > w + 100) this.x = -100;
    if (this.y < -100) this.y = h + 100;
    if (this.y > h + 100) this.y = -100;
  }
}

class WaveLine {
  points: { x: number; y: number }[] = [];
  offset: number;
  speed: number;
  amplitude: number;

  constructor(w: number, index: number) {
    this.offset = index * 0.2;
    this.speed = 0.001 + Math.random() * 0.001;
    this.amplitude = 40 + Math.random() * 60;
    for (let x = -100; x < w + 100; x += 50) {
      this.points.push({ x, y: 0 });
    }
  }

  update(h: number, scroll: number, time: number, my: number) {
    const mouseFactor = (my / h - 0.5) * 60;
    const baseLine = h * 0.5 + Math.sin(time * 0.5 + this.offset) * 100 + mouseFactor;
    this.points.forEach((p, i) => {
      const xFactor = p.x * 0.0015;
      const wave = Math.sin(xFactor + time + scroll * 5 + this.offset) * this.amplitude;
      const wave2 = Math.cos(xFactor * 0.5 - time * 0.3) * (this.amplitude * 0.5);
      p.y = baseLine + wave + wave2;
    });
  }
}

export class ParticleSystem {
  private particles: Particle[] = [];
  private waves: WaveLine[] = [];
  private w = 0;
  private h = 0;
  private time = 0;

  init(canvas: HTMLCanvasElement, count = 100) {
    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio : 1;
    this.w = canvas.width = canvas.offsetWidth * dpr;
    this.h = canvas.height = canvas.offsetHeight * dpr;
    this.particles = Array.from({ length: count }, () => new Particle(this.w, this.h));
    this.waves = Array.from({ length: 20 }, (_, i) => new WaveLine(this.w, i));
  }

  resize(canvas: HTMLCanvasElement) {
    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio : 1;
    this.w = canvas.width = canvas.offsetWidth * dpr;
    this.h = canvas.height = canvas.offsetHeight * dpr;
  }

  render(ctx: CanvasRenderingContext2D, mx: number, my: number, scroll: number, velocity: number) {
    this.time += 0.01 + velocity * 0.05;
    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio : 1;
    const smx = mx * dpr, smy = my * dpr;
    ctx.clearRect(0, 0, this.w, this.h);

    // Render Waves First (Background)
    ctx.save();
    for (let i = 0; i < this.waves.length; i++) {
      const w = this.waves[i];
      w.update(this.h, scroll, this.time, smy);
      ctx.beginPath();
      ctx.strokeStyle = `rgba(59, 130, 246, ${0.02 + (i / this.waves.length) * 0.05})`;
      ctx.lineWidth = 0.5 + (i / this.waves.length) * 1.5;
      ctx.moveTo(w.points[0].x, w.points[0].y);
      for (let j = 1; j < w.points.length - 2; j++) {
        const xc = (w.points[j].x + w.points[j + 1].x) / 2;
        const yc = (w.points[j].y + w.points[j + 1].y) / 2;
        ctx.quadraticCurveTo(w.points[j].x, w.points[j].y, xc, yc);
      }
      ctx.stroke();
    }
    ctx.restore();

    for (const p of this.particles) p.update(this.w, this.h, smx, smy, scroll, velocity);

    // Connections
    const ps = this.particles;
    for (let i = 0; i < ps.length; i++) {
      for (let j = i + 1; j < ps.length; j++) {
        const dx = ps[i].x - ps[j].x, dy = ps[i].y - ps[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 180) {
          ctx.beginPath();
          const opacity = (1 - d / 180) * 0.12 * (ps[i].opacity + ps[j].opacity);
          ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
          ctx.lineWidth = 0.8;
          ctx.moveTo(ps[i].x, ps[i].y);
          ctx.lineTo(ps[j].x, ps[j].y);
          ctx.stroke();
        }
      }
    }

    // Particles
    for (const p of ps) {
      // Glow
      ctx.beginPath();
      ctx.fillStyle = `hsla(${p.hue}, 80%, 60%, ${p.opacity * 0.2})`;
      ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
      ctx.fill();
      // Core
      ctx.beginPath();
      ctx.fillStyle = `hsla(${p.hue}, 70%, 40%, ${p.opacity * 1.2})`;
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}
