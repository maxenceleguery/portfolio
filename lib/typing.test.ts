/// <reference types="bun" />
import { expect, test } from "bun:test";
import { step, START, type Pos } from "./typing";

const terms = [
  { lines: [{ kind: "cmd" as const, text: "ls" }, { kind: "out" as const, text: "a b" }] },
  { lines: [{ kind: "code" as const, text: "  x" }] },
];

function run(from: Pos, n: number) {
  let p = from;
  for (let i = 0; i < n; i++) p = step(terms, p).next;
  return p;
}

test("types a command one char at a time", () => {
  expect(step(terms, START).next).toEqual({ s: 0, l: 0, c: 1 });
  expect(run(START, 2)).toEqual({ s: 0, l: 0, c: 2 });
});

test("output lines appear whole, after a pause", () => {
  const r = step(terms, { s: 0, l: 0, c: 2 });
  expect(r.next).toEqual({ s: 0, l: 1, c: 3 });
  expect(r.delay).toBeGreaterThan(100);
});

test("moves to the next screen and skips leading indentation", () => {
  expect(step(terms, { s: 0, l: 1, c: 3 }).next).toEqual({ s: 1, l: 0, c: 0 });
  expect(step(terms, { s: 1, l: 0, c: 0 }).next).toEqual({ s: 1, l: 0, c: 3 });
});

test("loops back to the start after the last screen", () => {
  const r = step(terms, { s: 1, l: 0, c: 3 });
  expect(r.next).toEqual(START);
  expect(r.delay).toBeGreaterThan(1000);
});
