"use client";

import { useEffect, useState } from "react";

// Real round trips from the visitor's browser to hosts I run. Small static paths on
// purpose: page URLs send Link preload headers the browser would follow. no-cors
// gives an opaque response, which is enough: it resolves if the host answered.
// (Buddy isn't here: its host sends CORP same-origin, so no browser can probe it.)
const TARGETS = [
  { name: "This site", url: "/robots.txt" },
  { name: "Relevé API", url: "https://api.releve.maxenceleguery.net/health" },
  { name: "Adenor", url: "https://adenor.app/robots.txt" },
  { name: "Cutforge", url: "https://cutforge.dev/robots.txt" },
  { name: "Black hole", url: "https://blackhole.maxenceleguery.net/robots.txt" },
];

type Result = { ms: number; ok: boolean } | undefined;

async function ping(url: string, retry = true): Promise<{ ms: number; ok: boolean }> {
  const t = performance.now();
  try {
    await fetch(url, { method: "HEAD", mode: "no-cors", cache: "no-store", signal: AbortSignal.timeout(5000) });
    return { ms: Math.round(performance.now() - t), ok: true };
  } catch {
    // one retry before calling a host down: the first probe can lose a race with page load
    if (retry) return new Promise((r) => setTimeout(() => r(ping(url, false)), 1500));
    return { ms: Math.round(performance.now() - t), ok: false };
  }
}

export default function Pings() {
  const [res, setRes] = useState<Result[]>(() => TARGETS.map(() => undefined));

  useEffect(() => {
    let alive = true;
    const run = () => {
      if (document.hidden) return;
      TARGETS.forEach((t, i) =>
        ping(t.url).then((r) => alive && setRes((prev) => prev.map((p, j) => (j === i ? r : p)))),
      );
    };
    run();
    const id = setInterval(run, 30_000);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);

  return (
    <ul className="pings" aria-label="Live links, measured from your browser">
      {TARGETS.map((t, i) => {
        const r = res[i];
        const state = !r ? "wait" : !r.ok ? "down" : r.ms > 1200 ? "slow" : "ok";
        return (
          <li key={t.name}>
            <i className="led" data-state={state} aria-hidden="true" />
            <a href={new URL(t.url, "https://maxenceleguery.net").origin}>{t.name}</a>
            <span className="ms">{!r ? "···" : r.ok ? `${r.ms} ms` : "no reply"}</span>
          </li>
        );
      })}
    </ul>
  );
}
