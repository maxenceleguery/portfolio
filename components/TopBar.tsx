"use client";

import { useEffect, useState } from "react";

const NAV = [
  { href: "#missions", label: "Missions" },
  { href: "#systems", label: "Systems" },
  { href: "#workbench", label: "Workbench" },
  { href: "#log", label: "Log" },
  { href: "#contact", label: "Contact" },
];

const fmt = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Paris", hour: "2-digit", minute: "2-digit" });

export default function TopBar() {
  // Rendered empty on the server so the static export never ships a stale time.
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 20_000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="topbar">
      <div className="wrap topbar-inner">
        <a className="brand" href="#top">
          <span className="callsign" aria-hidden="true">ML-01</span>
          <span className="brand-name">Maxence Leguéry</span>
        </a>
        <nav className="nav" aria-label="Sections">
          {NAV.map((n) => (
            <a key={n.href} href={n.href}>{n.label}</a>
          ))}
        </nav>
        <div className="status">
          <span className="lamp" aria-hidden="true" />
          <span className="status-text">Open to new missions</span>
          <span className="clock" aria-label="Local time in Paris">{time && `Paris ${time}`}</span>
        </div>
        <details className="menu">
          <summary>Menu</summary>
          <nav className="menu-list" aria-label="Sections">
            {NAV.map((n) => (
              <a key={n.href} href={n.href}>{n.label}</a>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}
