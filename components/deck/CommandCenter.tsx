"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { DeckContext, type Deck } from "@/components/deck/DeckContext";
import ControlDeck from "@/components/deck/ControlDeck";
import Overhead from "@/components/deck/Overhead";
import Space from "@/components/deck/Space";
import { STATIONS, stationFromHash, stationIndex, type StationId } from "@/lib/stations";

const clampRel = (r: number) => (r < -2 ? "far-left" : r > 2 ? "far-right" : String(r));

// Keys that belong to whatever has focus, not to the ship.
function ownsKeys(t: EventTarget | null) {
  const el = t as HTMLElement | null;
  return !!el?.closest?.("input, textarea, select, [contenteditable], [role=tablist], [role=slider], .editor-host");
}

function readPref(key: string, fallback: boolean) {
  try {
    const v = localStorage.getItem(key);
    return v === null ? fallback : v === "1";
  } catch {
    return fallback;
  }
}
function writePref(key: string, on: boolean) {
  try {
    localStorage.setItem(key, on ? "1" : "0");
  } catch {}
}

export default function CommandCenter({ panels }: { panels: Record<StationId, ReactNode> }) {
  const [js, setJs] = useState(false);
  const [active, setActive] = useState<StationId>("bridge");
  const [mission, setMission] = useState(0);
  const [motion, setMotion] = useState(true);
  const [scan, setScan] = useState(true);
  const [sound, setSound] = useState(false);
  const [boot, setBoot] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const audio = useRef<AudioContext | null>(null);
  const moved = useRef(false);

  const bleep = useCallback(
    (pitch = 880) => {
      if (!sound) return;
      const ctx = (audio.current ??= new AudioContext());
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.value = pitch;
      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.05, ctx.currentTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.09);
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    },
    [sound],
  );

  const go = useCallback((id: StationId) => {
    if (location.hash !== `#${id}`) history.pushState(null, "", `#${id}`);
    setActive(id);
  }, []);

  // mount: read hash and preferences, then run the power-on sequence once. These are
  // browser-only values, so they can't be initial state without a hydration mismatch.
  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    setJs(true);
    setActive(stationFromHash(location.hash));
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const m = readPref("deck.motion", !reduced);
    setMotion(m);
    setScan(readPref("deck.scan", true));
    setSound(readPref("deck.sound", false));
    /* eslint-enable react-hooks/set-state-in-effect */
    if (m) {
      setBoot(true);
      const t = setTimeout(() => setBoot(false), 2200);
      return () => clearTimeout(t);
    }
  }, []);

  useEffect(() => {
    const sync = () => setActive(stationFromHash(location.hash));
    addEventListener("popstate", sync);
    addEventListener("hashchange", sync);
    return () => {
      removeEventListener("popstate", sync);
      removeEventListener("hashchange", sync);
    };
  }, []);

  // station changed: beep, and hand focus to its heading (not on first load)
  useEffect(() => {
    if (!moved.current) {
      moved.current = true;
      return;
    }
    bleep(520 + stationIndex(active) * 90);
    document.getElementById(`h-${active}`)?.focus({ preventScroll: true });
    // bleep is intentionally not a dependency: toggling sound shouldn't beep
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || ownsKeys(e.target)) return;
      const i = stationIndex(active);
      const byKey = STATIONS.find((s) => s.key === e.key);
      if (byKey) go(byKey.id);
      else if (e.key === "ArrowRight" && i < STATIONS.length - 1) go(STATIONS[i + 1].id);
      else if (e.key === "ArrowLeft" && i > 0) go(STATIONS[i - 1].id);
      else if (e.key === "Escape") go("bridge");
      else return;
      e.preventDefault();
    };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [active, go]);

  // Pointer parallax on the view outside and the ring. Written straight to the
  // `translate` property of two elements: an inherited CSS variable on the root
  // would restyle the whole ship on every mouse move.
  useEffect(() => {
    const view = root.current?.querySelector<HTMLElement>(".space-view");
    const ring = root.current?.querySelector<HTMLElement>(".ring");
    if (!view || !ring || !motion) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const x = (e.clientX / innerWidth) * 2 - 1;
        const y = (e.clientY / innerHeight) * 2 - 1;
        view.style.translate = `${(x * -14).toFixed(1)}px ${(y * -9).toFixed(1)}px`;
        ring.style.translate = `${(x * 5).toFixed(1)}px ${(y * 3).toFixed(1)}px`;
      });
    };
    addEventListener("pointermove", onMove);
    return () => {
      removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
      view.style.translate = ring.style.translate = "";
    };
  }, [motion]);

  const deck: Deck = useMemo(() => ({ active, go, mission, setMission, motion, bleep }), [active, go, mission, motion, bleep]);
  const idx = stationIndex(active);

  const toggles = {
    motion: { on: motion, set: (v: boolean) => (setMotion(v), writePref("deck.motion", v)) },
    scan: { on: scan, set: (v: boolean) => (setScan(v), writePref("deck.scan", v)) },
    sound: { on: sound, set: (v: boolean) => (setSound(v), writePref("deck.sound", v)) },
  };

  return (
    <DeckContext.Provider value={deck}>
      <div
        ref={root}
        className="cc"
        data-js={js ? "on" : "off"}
        data-motion={motion ? "on" : "off"}
        data-scan={scan ? "on" : "off"}
        data-boot={boot ? "on" : "off"}
      >
        <Space active={idx} />
        <Overhead />
        <main className="ring">
          {STATIONS.map((s, i) => {
            const rel = i - idx;
            return (
              <section
                key={s.id}
                id={js ? undefined : s.id}
                className={`station st-${s.id}`}
                data-rel={clampRel(rel)}
                aria-labelledby={`h-${s.id}`}
                style={{ "--i": i } as CSSProperties}
              >
                <div className="station-frame" inert={js && rel !== 0}>
                  <header className="plate-bar">
                    <span className="st-code">ST-0{i + 1}</span>
                    <h2 id={`h-${s.id}`} tabIndex={-1} className="plate">
                      {s.label}
                    </h2>
                    <span className="st-leds" aria-hidden="true">
                      <i />
                      <i />
                      <i />
                      <i />
                    </span>
                  </header>
                  <div className="station-body">{panels[s.id]}</div>
                </div>
                {js && rel !== 0 && (
                  <button type="button" className="station-hit" onClick={() => go(s.id)} aria-label={`Turn to ${s.label}`} tabIndex={-1} />
                )}
              </section>
            );
          })}
        </main>
        <ControlDeck toggles={toggles} />
      </div>
    </DeckContext.Provider>
  );
}
