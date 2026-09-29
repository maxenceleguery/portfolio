"use client";

import { useEffect, useRef, useState } from "react";
import { useDeck } from "@/components/deck/DeckContext";

// What's outside the forward window: the ship holds orbit around the Kerr black
// hole from my simulator. The view pans as the camera turns between stations.
export default function Space({ active }: { active: number }) {
  const { motion } = useDeck();
  const video = useRef<HTMLVideoElement>(null);
  // the poster is the server render; the 1.6 MB loop only on desktop without Save-Data
  const [live, setLive] = useState(false);

  useEffect(() => {
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLive(matchMedia("(min-width: 901px) and (min-height: 561px)").matches && !saveData);
  }, []);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    // only the Bridge really looks outside; elsewhere the frame holds (and frees a decoder)
    if (!motion || active !== 0) return void v.pause();
    const play = () => (document.hidden ? v.pause() : v.play().catch(() => {}));
    play();
    document.addEventListener("visibilitychange", play);
    return () => document.removeEventListener("visibilitychange", play);
  }, [motion, live, active]);

  return (
    <div className="space" aria-hidden="true">
      <div className="space-view" style={{ transform: `translateX(${((active - 2.5) * -2.4).toFixed(1)}%)` }}>
        {live ? (
          <video ref={video} src="/media/blackhole-loop.mp4" poster="/media/blackhole-poster.jpg" muted loop playsInline preload="auto" />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src="/media/blackhole-poster.jpg" alt="" fetchPriority="high" />
        )}
      </div>
      <svg className="window-frame" viewBox="0 0 1600 1000" preserveAspectRatio="none">
        <defs>
          <linearGradient id="strut" x1="0" x2="1">
            <stop offset="0" stopColor="#050b12" />
            <stop offset="0.8" stopColor="#0c1826" />
            <stop offset="1" stopColor="#1a3048" />
          </linearGradient>
          <linearGradient id="strutR" x1="1" x2="0">
            <stop offset="0" stopColor="#050b12" />
            <stop offset="0.8" stopColor="#0c1826" />
            <stop offset="1" stopColor="#1a3048" />
          </linearGradient>
        </defs>
        <path d="M0 0 H1600 V70 L1480 96 H120 L0 70 Z" fill="#060d16" />
        <path d="M120 96 H1480" stroke="#3d6485" strokeOpacity="0.5" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
        <path d="M0 70 L120 96 L60 1000 H0 Z" fill="url(#strut)" />
        <path d="M1600 70 L1480 96 L1540 1000 H1600 Z" fill="url(#strutR)" />
        <path d="M120 96 L60 1000 M1480 96 L1540 1000" stroke="#3d6485" strokeOpacity="0.55" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="strut-lights left">
        <i /><i /><i /><i /><i /><i />
      </div>
      <div className="strut-lights right">
        <i /><i /><i /><i /><i /><i />
      </div>
    </div>
  );
}
