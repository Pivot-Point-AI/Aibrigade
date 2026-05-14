export interface MousePosition {
  x: number;
  y: number;
  nx: number;
  ny: number;
  velocity: number;
  isMoving: boolean;
}

export interface SceneData {
  id: string;
  headline: string;
  sub: string;
  accent: string;
  glyph: string;
}
