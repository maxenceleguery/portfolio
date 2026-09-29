"use client";

import { useEffect, useRef, useState } from "react";
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
  const ref = useRef<HTMLDivElement>(null);
  // null = everything fully typed (server render, no JS, reduced motion)
  const [pos, setPos] = useState<Pos | null>(null);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // start just before the bank scrolls into view, pause when it leaves
    const io = new IntersectionObserver(([e]) => setRunning(e.isIntersecting), { rootMargin: "200px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return;
    const { next, delay } = pos ? step(TERMINALS, pos) : { next: START, delay: 0 };
    const id = setTimeout(() => setPos(next), delay);
    return () => clearTimeout(id);
  }, [running, pos]);

  return (
    <section className="wrap bay" id="workbench">
      <header className="bay-head">
        <h2 className="plate">Workbench</h2>
        <p>Languages and tools I use every week, caught mid-task.</p>
      </header>

      <div className="terminals" ref={ref}>
        {TERMINALS.map((t, s) => {
          const active = pos?.s === s;
          return (
            <div className="screen term" key={t.title} data-active={active}>
              <div className="screen-bar">
                <span className="lamp" data-state={active ? "launching" : "idle"} aria-hidden="true" />
                <span className="grow">{t.title}</span>
                <span>{t.tool}</span>
              </div>
              <pre className="term-body" aria-label={`${t.tool}: ${t.title}`}>
                {t.lines.map((line, l) => {
                  if (!pos || s < pos.s) return <Line key={l} line={line} chars={line.text.length} caret={false} />;
                  if (s > pos.s || l > pos.l) return null;
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
    </section>
  );
}
