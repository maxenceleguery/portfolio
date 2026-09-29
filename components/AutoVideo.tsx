"use client";

import { useEffect, useRef } from "react";

// Muted loop that only plays while on screen, and never for reduced-motion users
// (they get the poster).
export default function AutoVideo({ src, poster, label }: { src: string; poster: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()));
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return <video ref={ref} src={src} poster={poster} muted loop playsInline preload="metadata" aria-label={label} />;
}
