"use client";

import { useEffect, useRef } from "react";
import { useDeck } from "@/components/deck/DeckContext";

// Gravitational-wave strain of a merger: a chirp, then the ringdown of the final
// Kerr black hole (a = 0.90). Fundamental l = m = 2 quasinormal mode:
// M*omega ≈ 0.67 - 0.065i (Berti, Cardoso & Will fits). Time in units of M.
const WR = 0.672;
const WI = 0.065;
const T0 = -70;
const T1 = 90;

export function strain(samples: number): number[] {
  const out: number[] = [];
  let phase = 0;
  const dt = (T1 - T0) / (samples - 1);
  for (let k = 0; k < samples; k++) {
    const t = T0 + k * dt;
    if (t < 0) {
      // inspiral: frequency and amplitude rise towards the merger at t = 0
      const x = 1 + -t / 18;
      phase += WR * x ** -0.375 * dt;
      out.push(x ** -0.25 * Math.cos(phase));
    } else {
      phase += WR * dt;
      out.push(Math.exp(-WI * t) * Math.cos(phase));
    }
  }
  return out;
}

export default function Oscilloscope() {
  const ref = useRef<HTMLCanvasElement>(null);
  const { motion } = useDeck();

  useEffect(() => {
    const c = ref.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;
    const dpr = Math.min(2, devicePixelRatio || 1);
    const W = (c.width = Math.round(c.clientWidth * dpr));
    const H = (c.height = Math.round(c.clientHeight * dpr));
    const wave = strain(W);
    const yOf = (v: number) => H / 2 - v * H * 0.4;

    const grid = () => {
      ctx.strokeStyle = "rgba(107, 227, 138, 0.12)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = 1; i < 8; i++) {
        ctx.moveTo((W * i) / 8, 0);
        ctx.lineTo((W * i) / 8, H);
      }
      for (let i = 1; i < 4; i++) {
        ctx.moveTo(0, (H * i) / 4);
        ctx.lineTo(W, (H * i) / 4);
      }
      ctx.stroke();
    };
    const trace = (from: number, to: number) => {
      ctx.strokeStyle = "#6be38a";
      ctx.lineWidth = 1.4 * dpr;
      ctx.shadowColor = "#6be38a";
      ctx.shadowBlur = 6 * dpr;
      ctx.beginPath();
      ctx.moveTo(from, yOf(wave[from]));
      for (let x = from + 1; x <= to; x++) ctx.lineTo(x, yOf(wave[x]));
      ctx.stroke();
      ctx.shadowBlur = 0;
    };

    ctx.fillStyle = "#04100a";
    ctx.fillRect(0, 0, W, H);
    grid();
    if (!motion) return void trace(0, W - 1);

    // sweeping beam with phosphor persistence
    let raf = 0;
    let x = 0;
    const SPEED = W / (2.6 * 60); // one sweep ≈ 2.6 s
    const frame = () => {
      ctx.fillStyle = "rgba(4, 16, 10, 0.09)";
      ctx.fillRect(0, 0, W, H);
      grid();
      const nx = Math.min(W - 1, x + SPEED);
      trace(Math.floor(x), Math.floor(nx));
      x = nx >= W - 1 ? 0 : nx;
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [motion]);

  return <canvas ref={ref} className="scope" role="img" aria-label="Oscilloscope: gravitational-wave chirp and Kerr black hole ringdown" />;
}
