// Person A
// Phase 1: Deterministic signal extraction.
// contribution(area) = sum over exercises of sets * weight

import type { Workout } from "./schemas";
import type { FocusVector } from "./schemas";
import { getFocusWeights } from "./focusMapping";
import { assertValidFocusVector } from "../utils/invariantChecks";

export function extractFocusVector(workout: Workout): FocusVector {
  const vector: FocusVector = {};

  for (const ex of workout.exercises) {
    const weights = getFocusWeights(ex.name);
    if (!weights) {
      throw new Error(`Unmapped exercise: ${ex.name}`);
    }

    for (const [area, weight] of Object.entries(weights)) {
      const w = weight ?? 0;
      const contribution = ex.sets * w;
      vector[area as keyof FocusVector] = (vector[area as keyof FocusVector] ?? 0) + contribution;
    }
  }

  assertValidFocusVector(vector);
  return vector;
}
