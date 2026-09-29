"use client";

import { useEffect, useState } from "react";

const fmt = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Paris", hour: "2-digit", minute: "2-digit", second: "2-digit" });

const TICKER = [
  "Relevé is live on the App Store; Google Play review in progress",
  "Station 2 runs the real Cutforge editor: power it on",
  "Holding orbit around a Kerr black hole, a = 0.90, r = 70 M",
  "Open to new missions: products, AI features, cloud infrastructure",
];

export default function Overhead() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="overhead">
      <a className="brand" href="#bridge">
        <span className="callsign" aria-hidden="true">ML-01</span>
        <span className="brand-name">Maxence Leguéry</span>
      </a>
      <div className="ticker" aria-label="Ship bulletin">
        <div className="ticker-track">
          {[...TICKER, ...TICKER].map((t, i) => (
            <span key={i} aria-hidden={i >= TICKER.length}>
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="status">
        <span className="lamp" aria-hidden="true" />
        <span className="status-text">Open to new missions</span>
        <span className="clock" aria-label="Local time in Paris">{time && `PAR ${time}`}</span>
      </div>
    </header>
  );
}
