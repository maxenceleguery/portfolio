/// <reference types="bun" />
import { expect, test } from "bun:test";
import { stationFromHash, stationIndex } from "./stations";

test("hash maps to a station, old anchors and junk fall back sensibly", () => {
  expect(stationFromHash("#systems")).toBe("systems");
  expect(stationFromHash("contact")).toBe("comms");
  expect(stationFromHash("#top")).toBe("bridge");
  expect(stationFromHash("")).toBe("bridge");
  expect(stationFromHash("#nope")).toBe("bridge");
});

test("ring order is stable", () => {
  expect(stationIndex("bridge")).toBe(0);
  expect(stationIndex("comms")).toBe(5);
});
