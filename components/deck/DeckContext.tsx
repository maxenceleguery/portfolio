"use client";

import { createContext, useContext } from "react";
import type { StationId } from "@/lib/stations";

export interface Deck {
  active: StationId;
  go: (id: StationId) => void;
  mission: number;
  setMission: (i: number) => void;
  motion: boolean; // false = reduced motion (OS setting or the deck toggle)
  bleep: (pitch?: number) => void;
}

export const DeckContext = createContext<Deck>({
  active: "bridge",
  go: () => {},
  mission: 0,
  setMission: () => {},
  motion: true,
  bleep: () => {},
});

export const useDeck = () => useContext(DeckContext);
export const useIsActive = (id: StationId) => useContext(DeckContext).active === id;
