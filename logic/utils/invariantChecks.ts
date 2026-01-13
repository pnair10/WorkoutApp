// Person A
// Phase 1: Invariant checks and debug helpers for signals.
// Person A
// Phase 1: Invariant checks and debug helpers for signals.

import type { FocusArea } from "../schemas/focusAreas";
import type { FocusVector } from "../signals/schemas";

export function assertValidFocusVector(vector: FocusVector) {
  for (const [area, value] of Object.entries(vector)) {
    if (typeof value !== "number" || !Number.isFinite(value)) {
      throw new Error(`Non-finite value for ${area}`);
    }
    if (value < 0) {
      throw new Error(`Negative value for ${area}`);
    }
  }
}

export function debugPrintVector(vector: FocusVector) {
  const rows = Object.entries(vector)
    .map(([k, v]) => [k, v ?? 0] as const)
    .sort((a, b) => b[1] - a[1]);

  const printable: Record<string, number> = {};
  for (const [k, v] of rows) printable[k] = Number(v.toFixed(3));
  console.log("FocusVector:", printable);
}

export function assertNoUnknownAreas(vector: FocusVector, allowed: FocusArea[]) {
  const allowedSet = new Set<string>(allowed);
  for (const area of Object.keys(vector)) {
    if (!allowedSet.has(area)) {
      throw new Error(`Unknown area in vector: ${area}`);
    }
  }
}
