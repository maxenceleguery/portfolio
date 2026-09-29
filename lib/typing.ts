// Scheduler for the workbench terminals: one screen types at a time, in order,
// then the whole bank loops. Pure so it can be tested without a DOM.

type Line = { kind: "cmd" | "out" | "code"; text: string };
export type Pos = { s: number; l: number; c: number }; // screen, line, chars shown

export const START: Pos = { s: 0, l: 0, c: 0 };

const shown = (line: Line) => (line.kind === "out" ? line.text.length : 0);

export function step(terms: { lines: Line[] }[], p: Pos): { next: Pos; delay: number } {
  const lines = terms[p.s].lines;
  const line = lines[p.l];

  if (p.c < line.text.length) {
    let c = p.c + 1;
    while (c < line.text.length && line.text[c - 1] === " ") c++; // spaces cost nothing
    return { next: { ...p, c }, delay: line.kind === "cmd" ? 55 : 24 };
  }
  if (p.l + 1 < lines.length) {
    const nl = lines[p.l + 1];
    return { next: { s: p.s, l: p.l + 1, c: shown(nl) }, delay: nl.kind === "out" ? 320 : 160 };
  }
  if (p.s + 1 < terms.length) {
    return { next: { s: p.s + 1, l: 0, c: shown(terms[p.s + 1].lines[0]) }, delay: 1100 };
  }
  return { next: START, delay: 6000 };
}
