"use client";

import { useEffect, useRef } from "react";
import { useDeck } from "@/components/deck/DeckContext";

// Muted loop that only plays while its station faces the camera and motion is on
// (reduced-motion visitors get the poster).
export default function AutoVideo({ src, poster, label, play = true }: { src: string; poster: string; label: string; play?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const { motion } = useDeck();

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (play && motion) v.play().catch(() => {});
    else v.pause();
  }, [play, motion]);

  return <video ref={ref} src={src} poster={poster} muted loop playsInline preload="metadata" aria-label={label} />;
}
