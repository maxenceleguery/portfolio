/// <reference types="bun" />
import { expect, test } from "bun:test";
import { autoYaw, damp, fade, flicker, lampOn, loopPhase, measure, sample, tripPhase, type Vec3 } from "./path";

const L: Vec3[] = [
  [0, 0, 0],
  [2, 0, 0],
  [2, 0, 2],
];

const near = (a: number[], b: number[]) => a.forEach((v, i) => expect(v).toBeCloseTo(b[i], 6));

test("measures a polyline by arc length", () => {
  const m = measure(L);
  expect(m.total).toBeCloseTo(4, 9);
  expect(m.cum).toEqual([0, 2, 4]);
});

test("samples by arc length across an elbow", () => {
  const m = measure(L);
  near(sample(m, 0), [0, 0, 0]);
  near(sample(m, 0.25), [1, 0, 0]);
  near(sample(m, 0.5), [2, 0, 0]);
  near(sample(m, 0.75), [2, 0, 1]);
  near(sample(m, 1), [2, 0, 2]);
});

test("clamps t outside [0, 1] and writes into the out tuple", () => {
  const m = measure(L);
  const out: [number, number, number] = [9, 9, 9];
  expect(sample(m, -3, out)).toBe(out);
  near(out, [0, 0, 0]);
  near(sample(m, 7), [2, 0, 2]);
});

test("skips zero-length segments and survives degenerate paths", () => {
  const m = measure([[0, 0, 0], [0, 0, 0], [0, 3, 0], [0, 3, 0]]);
  expect(m.total).toBeCloseTo(3, 9);
  near(sample(m, 0.5), [0, 1.5, 0]);
  near(sample(m, 1), [0, 3, 0]);
  near(sample(measure([[1, 2, 3]]), 0.5), [1, 2, 3]);
  near(sample(measure([[1, 2, 3], [1, 2, 3]]), 0.5), [1, 2, 3]);
});

test("loops a packet with a start offset, never negative", () => {
  expect(loopPhase(0, 3, 0)).toBeCloseTo(0, 9);
  expect(loopPhase(1.5, 3, 0)).toBeCloseTo(0.5, 9);
  expect(loopPhase(4.5, 3, 0)).toBeCloseTo(0.5, 9);
  expect(loopPhase(1, 3, 1)).toBeCloseTo(0, 9);
  const p = loopPhase(0, 3, 1); // before its begin it is already in flight
  expect(p).toBeGreaterThanOrEqual(0);
  expect(p).toBeCloseTo(2 / 3, 9);
});

test("a trip can be shorter than its loop period, then it idles past 1", () => {
  expect(tripPhase(0, 3, 0)).toBeCloseTo(0, 9);
  expect(tripPhase(1.5, 3, 0)).toBeCloseTo(0.5, 9);
  expect(tripPhase(1, 2, 0, 8)).toBeCloseTo(0.5, 9);
  expect(tripPhase(3, 2, 0, 8)).toBeCloseTo(1.5, 9);
  expect(fade(tripPhase(3, 2, 0, 8))).toBe(0);
  expect(tripPhase(9, 2, 0, 8)).toBeCloseTo(0.5, 9);
  expect(tripPhase(6, 2, 5, 8)).toBeCloseTo(0.5, 9);
});

test("fades packets in and out at the ends of their path", () => {
  expect(fade(0)).toBe(0);
  expect(fade(1)).toBe(0);
  expect(fade(0.03)).toBeCloseTo(0.5, 6);
  expect(fade(0.5)).toBe(1);
  expect(fade(0.95)).toBeCloseTo(0.5, 6);
  expect(fade(-0.1)).toBe(0);
  expect(fade(1.2)).toBe(0);
});

test("the blinking lamp is mostly on with a short double blink per period", () => {
  const P = 4.2;
  let on = 0;
  const N = 4200;
  for (let i = 0; i < N; i++) if (lampOn((i / N) * P, P)) on++;
  expect(on / N).toBeGreaterThan(0.85);
  expect(on / N).toBeLessThan(0.97);
  expect(lampOn(0.05, P)).toBe(false);
  expect(lampOn(0.18, P)).toBe(true);
  expect(lampOn(0.3, P)).toBe(false);
  expect(lampOn(2, P)).toBe(true);
  expect(lampOn(P + 0.05, P)).toBe(false);
});

test("auto yaw oscillates around the front view instead of spinning", () => {
  const A = (25 * Math.PI) / 180;
  expect(autoYaw(0, A, 20)).toBeCloseTo(0, 9);
  expect(autoYaw(5, A, 20)).toBeCloseTo(A, 9);
  expect(autoYaw(15, A, 20)).toBeCloseTo(-A, 9);
  for (let t = 0; t < 60; t += 0.37) expect(Math.abs(autoYaw(t, A, 20))).toBeLessThanOrEqual(A + 1e-12);
});

test("damp eases toward a target, frame-rate independent", () => {
  expect(damp(0, 10, 2, 0)).toBe(0);
  const once = damp(0, 10, 2, 0.5);
  const twice = damp(damp(0, 10, 2, 0.25), 10, 2, 0.25);
  expect(once).toBeCloseTo(twice, 9);
  expect(once).toBeGreaterThan(0);
  expect(once).toBeLessThan(10);
  expect(damp(0, 10, 2, 100)).toBeCloseTo(10, 6);
});

test("flicker is a subtle, bounded opacity jitter", () => {
  let lo = 1;
  let hi = 0;
  for (let t = 0; t < 120; t += 0.013) {
    const f = flicker(t);
    lo = Math.min(lo, f);
    hi = Math.max(hi, f);
  }
  expect(hi).toBeLessThanOrEqual(1);
  expect(lo).toBeGreaterThanOrEqual(0.8);
  expect(hi - lo).toBeGreaterThan(0.02);
});
