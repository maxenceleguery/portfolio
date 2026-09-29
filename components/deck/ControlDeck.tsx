"use client";

import { useDeck } from "@/components/deck/DeckContext";
import Oscilloscope from "@/components/deck/Oscilloscope";
import Pings from "@/components/deck/Pings";
import { STATIONS } from "@/lib/stations";

type Toggle = { on: boolean; set: (v: boolean) => void };

function Switch({ label, t }: { label: string; t: Toggle }) {
  const { bleep } = useDeck();
  return (
    <button
      type="button"
      role="switch"
      aria-checked={t.on}
      className="sw"
      onClick={() => {
        t.set(!t.on);
        bleep(t.on ? 330 : 660);
      }}
    >
      <i className="led" aria-hidden="true" />
      <span className="sw-body" aria-hidden="true" />
      <span className="sw-label">{label}</span>
    </button>
  );
}

export default function ControlDeck({ toggles }: { toggles: Record<"motion" | "scan" | "sound", Toggle> }) {
  const { active } = useDeck();

  return (
    <nav className="deck" aria-label="Stations">
      <div className="deck-face">
        <div className="deck-group keys">
          <span className="engrave">Stations</span>
          <div className="keys-row">
            {STATIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="dkey"
                aria-current={active === s.id ? "page" : undefined}
                aria-keyshortcuts={s.key}
              >
                <i className="led" aria-hidden="true" />
                <span className="dkey-l">{s.label}</span>
                <kbd>{s.key}</kbd>
              </a>
            ))}
          </div>
          <span className="deck-hint">Keys 1 to 6, arrows to turn, Esc for the bridge</span>
        </div>
        <div className="deck-group scope-group">
          <span className="engrave">Ringdown, Kerr a = 0.90</span>
          <div className="scope-bezel">
            <Oscilloscope />
          </div>
        </div>
        <div className="deck-group links">
          <span className="engrave">Live links</span>
          <Pings />
        </div>
        <div className="deck-group switches">
          <span className="engrave">Switches</span>
          <div className="sw-row">
            <Switch label="Motion" t={toggles.motion} />
            <Switch label="Scan" t={toggles.scan} />
            <Switch label="Sound" t={toggles.sound} />
          </div>
        </div>
      </div>
    </nav>
  );
}
