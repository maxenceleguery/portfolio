"use client";

import type { CSSProperties } from "react";
import { useDeck } from "@/components/deck/DeckContext";
import { MISSIONS } from "@/lib/data";

const R0 = 70; // innermost orbit, px
const DR = 38;
const T0 = 16; // innermost period, s

// Holographic chart: each mission is a body orbiting the black hole. Periods follow
// Kepler's third law (T ∝ r^1.5), so the outer ones drift slower.
export default function OrbitChart() {
  const { go, setMission, bleep } = useDeck();

  return (
    <div className="holo" aria-label="Holographic chart of missions">
      <div className="holo-base" aria-hidden="true" />
      <div className="holo-beam" aria-hidden="true" />
      <div className="orbits">
        <div className="core" aria-hidden="true" />
        {MISSIONS.map((m, i) => {
          const r = R0 + i * DR;
          const t = T0 * (r / R0) ** 1.5;
          const style = { "--r": `${r}px`, "--t": `${t.toFixed(2)}s`, "--d": `${(-t * ((i * 0.37) % 1)).toFixed(2)}s` } as CSSProperties;
          return (
            <div className="orbit" key={m.id} style={style}>
              <div className="body">
                <div className="billboard">
                  <button
                    type="button"
                    className="body-btn"
                    data-state={m.status}
                    onClick={() => {
                      setMission(i);
                      bleep(990);
                      go("missions");
                    }}
                  >
                    <span className="body-dot" aria-hidden="true" />
                    <span className="body-label">{m.short ?? m.name}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <p className="holo-caption">Select a body to open its mission</p>
    </div>
  );
}
