"use client";

import { useEffect, useRef, useState } from "react";
import { useDeck } from "@/components/deck/DeckContext";
import type { TopologyHandle } from "@/lib/holo/topology";

// The 3D hologram of the topology. three.js (~150 KB gz) is fetched the first time
// the Systems station faces the camera, and only renders while it does. The 2D SVG
// underneath stays as the accessible description and the no-WebGL / phone fallback.
export default function HoloTopology() {
  const ref = useRef<HTMLDivElement>(null);
  const handle = useRef<TopologyHandle | null>(null);
  const { active, motion } = useDeck();
  const on = active === "systems";
  const onRef = useRef(on);
  const [seen, setSeen] = useState(false);
  const [mounted, setMounted] = useState(false);

  if (on && !seen) setSeen(true);

  // Warm it up while the visitor reads the bridge: parsing three.js and compiling
  // shaders costs ~1 s of main thread, which would otherwise land mid-turn.
  useEffect(() => {
    if (seen) return;
    let idle = 0;
    const t = setTimeout(() => {
      idle = requestIdleCallback(() => setSeen(true), { timeout: 4000 });
    }, 3000);
    return () => {
      clearTimeout(t);
      cancelIdleCallback(idle);
    };
  }, [seen]);

  useEffect(() => {
    onRef.current = on;
    handle.current?.setRunning(on && motion);
  }, [on, motion, mounted]);

  useEffect(() => {
    const el = ref.current;
    if (!seen || !el || !matchMedia("(min-width: 901px) and (min-height: 561px)").matches) return;
    let dead = false;
    let h: TopologyHandle | undefined;
    import("@/lib/holo/topology").then(({ mountTopology }) => {
      if (dead) return;
      try {
        h = mountTopology(el, { reducedMotion: !motion });
      } catch {
        return; // no WebGL: the SVG stays visible
      }
      handle.current = h;
      h.setRunning(onRef.current && motion);
      setMounted(true);
    });
    return () => {
      dead = true;
      h?.dispose();
      handle.current = null;
      setMounted(false);
    };
  }, [seen, motion]);

  return <div ref={ref} className="holo-topology" data-mounted={mounted} aria-hidden="true" />;
}
