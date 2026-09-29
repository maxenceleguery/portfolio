// Pure motion helpers for the topology hologram: arc-length sampling of
// polylines, packet loop timing, the blinking status lamp, camera easing and the
// flicker curve. No three.js here so it stays unit-testable.

export type Vec3 = readonly [number, number, number];
export type Out3 = [number, number, number];

export type Measured = { pts: readonly Vec3[]; cum: number[]; total: number };

export function measure(pts: readonly Vec3[]): Measured {
  const cum = [0];
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1];
    const b = pts[i];
    cum.push(cum[i - 1] + Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]));
  }
  return { pts, cum, total: cum[cum.length - 1] };
}

/** Point at normalized arc length t (clamped to [0, 1]). */
export function sample(m: Measured, t: number, out: Out3 = [0, 0, 0]): Out3 {
  const { pts, cum, total } = m;
  const last = pts[pts.length - 1];
  if (pts.length < 2 || total === 0 || t >= 1) return set(out, last);
  if (t <= 0) return set(out, pts[0]);
  const d = t * total;
  let i = 1;
  while (i < cum.length - 1 && cum[i] < d) i++;
  const seg = cum[i] - cum[i - 1];
  const k = seg > 0 ? (d - cum[i - 1]) / seg : 0;
  const a = pts[i - 1];
  const b = pts[i];
  out[0] = a[0] + (b[0] - a[0]) * k;
  out[1] = a[1] + (b[1] - a[1]) * k;
  out[2] = a[2] + (b[2] - a[2]) * k;
  return out;
}

function set(out: Out3, p: Vec3): Out3 {
  out[0] = p[0];
  out[1] = p[1];
  out[2] = p[2];
  return out;
}

/** Phase in [0, 1) of a packet looping every `dur` seconds, offset by `begin`. */
export function loopPhase(time: number, dur: number, begin: number): number {
  const p = ((time - begin) / dur) % 1;
  return p < 0 ? p + 1 : p;
}

/**
 * Progress of a trip lasting `dur` seconds that repeats every `period` seconds
 * (default: back to back). Values >= 1 mean the packet is idle until its next run.
 */
export function tripPhase(time: number, dur: number, begin: number, period = dur): number {
  return (loopPhase(time, period, begin) * period) / dur;
}

/** Opacity envelope over a packet's trip: ramps in, holds, ramps out. */
export function fade(phase: number, fadeIn = 0.06, fadeOut = 0.1): number {
  if (phase <= 0 || phase >= 1) return 0;
  if (phase < fadeIn) return phase / fadeIn;
  if (phase > 1 - fadeOut) return (1 - phase) / fadeOut;
  return 1;
}

/** Status lamp with a quick double blink at the start of every period. */
export function lampOn(time: number, period: number): boolean {
  const t = ((time % period) + period) % period;
  return !(t < 0.12 || (t >= 0.24 && t < 0.36));
}

/** Camera yaw offset: a slow sine sweep around the front view, never a full spin. */
export function autoYaw(time: number, amplitude: number, period: number): number {
  return amplitude * Math.sin((2 * Math.PI * time) / period);
}

/** Exponential ease toward target; splitting dt gives the same result. */
export function damp(current: number, target: number, lambda: number, dt: number): number {
  return target + (current - target) * Math.exp(-lambda * dt);
}

const hash = (n: number) => {
  const s = Math.sin(n * 12.9898 + 78.233) * 43758.5453;
  return s - Math.floor(s);
};

/** Global opacity multiplier: a faint 12 Hz jitter plus a rare short dip. */
export function flicker(time: number): number {
  const step = Math.floor(time * 12);
  const jitter = 0.035 * hash(step);
  const dip = hash(step * 3.7 + 11) > 0.985 ? 0.1 : 0;
  return 1 - jitter - dip;
}
