// The bridge's stations, left to right around the ring. `key` is the keyboard shortcut.
export const STATIONS = [
  { id: "bridge", label: "Bridge", key: "1" },
  { id: "missions", label: "Missions", key: "2" },
  { id: "systems", label: "Systems", key: "3" },
  { id: "workbench", label: "Workbench", key: "4" },
  { id: "log", label: "Log", key: "5" },
  { id: "comms", label: "Comms", key: "6" },
] as const;

export type StationId = (typeof STATIONS)[number]["id"];

// Old section anchors from the scrolling version keep working.
const ALIASES: Record<string, StationId> = { top: "bridge", contact: "comms" };

export function stationFromHash(hash: string): StationId {
  const h = hash.replace(/^#/, "");
  const hit = STATIONS.find((s) => s.id === h);
  return hit ? hit.id : ALIASES[h] ?? "bridge";
}

export const stationIndex = (id: StationId) => STATIONS.findIndex((s) => s.id === id);
