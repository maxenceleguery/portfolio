"use client";

import { useEffect, useState } from "react";
import { useDeck } from "@/components/deck/DeckContext";
import { STACK, TERMINALS, type TerminalLine } from "@/lib/data";
import { START, step, type Pos } from "@/lib/typing";

function Line({ line, chars, caret }: { line: TerminalLine; chars: number; caret: boolean }) {
  const text = line.text.slice(0, chars);
  const comment = line.kind === "code" && /^\s*(#|\/\/)/.test(line.text) && !line.text.trimStart().startsWith("#[");
  return (
    <div className={line.kind === "code" ? (comment ? "code-comment" : "") : line.kind}>
      {text}
      {caret && <span className="caret" aria-hidden="true" />}
    </div>
  );
}

export default function Workbench() {
  // null = everything fully typed (server render, no JS, reduced motion)
  const [pos, setPos] = useState<Pos | null>(null);
  const { active, motion } = useDeck();
  // types only while the station faces the camera; motion off shows finished sessions
  const running = motion && active === "workbench";
  if (!motion && pos) setPos(null);

  useEffect(() => {
    if (!running) return;
    const { next, delay } = pos ? step(TERMINALS, pos) : { next: START, delay: 0 };
    const id = setTimeout(() => setPos(next), delay);
    return () => clearTimeout(id);
  }, [running, pos]);

  return (
    <div className="workbench">
      <p className="station-intro">Languages and tools I use every week, caught mid-task.</p>

      <div className="terminals">
        {TERMINALS.map((t, s) => {
          const active = pos?.s === s;
          const idle = !!pos && s > pos.s; // waiting its turn: keeps its last session, dimmed
          return (
            <div className="screen term" key={t.title} data-active={active} data-idle={idle}>
              <div className="screen-bar">
                <span className="lamp" data-state={active ? "launching" : "idle"} aria-hidden="true" />
                <span className="grow">{t.title}</span>
                <span>{t.tool}</span>
              </div>
              <pre className="term-body" aria-label={`${t.tool}: ${t.title}`}>
                {t.lines.map((line, l) => {
                  if (!pos || s !== pos.s) return <Line key={l} line={line} chars={line.text.length} caret={false} />;
                  if (l > pos.l) return null;
                  return <Line key={l} line={line} chars={l < pos.l ? line.text.length : pos.c} caret={l === pos.l} />;
                })}
              </pre>
            </div>
          );
        })}
      </div>

      <dl className="stack-list">
        {STACK.map((g) => (
          <div key={g.group}>
            <dt>{g.group}</dt>
            <dd>{g.items.join(", ")}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
