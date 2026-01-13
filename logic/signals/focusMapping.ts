// Person A
// Phase 1: Exercise to focus-area mapping loader and validation.
// Source: data/exercises.json

import exercisesRaw from "../../data/exercises.json";
import type { FocusArea } from "../schemas/focusAreas";

type FocusWeights = Partial<Record<FocusArea, number>>;
type ExerciseDef = { focus_weights: Record<string, number> };
type ExerciseMap = Record<string, ExerciseDef>;

const EPSILON = 0.05;

function getAllowedFocusAreas(): Set<string> {
  // If FocusArea is a union type, we cannot enumerate it at runtime.
  // So we do a runtime list here. Keep this in sync with logic/schemas/focusAreas.ts.
  // Person B can expose an exported array later if you want.
  return new Set<string>([
    "chest",
    "upper_back",
    "lats",
    "shoulders",
    "biceps",
    "triceps",
    "quads",
    "hamstrings",
    "glutes",
    "calves",
    "core"
  ]);
}

const ALLOWED = getAllowedFocusAreas();

const exerciseMap = exercisesRaw as ExerciseMap;

function validateExerciseMap(map: ExerciseMap) {
  for (const [exerciseName, def] of Object.entries(map)) {
    if (!exerciseName || typeof exerciseName !== "string") {
      throw new Error("Invalid exercise name in mapping");
    }
    if (!def || typeof def !== "object" || !def.focus_weights) {
      throw new Error(`Missing focus_weights for ${exerciseName}`);
    }

    const weights = def.focus_weights;
    let sum = 0;

    for (const [area, value] of Object.entries(weights)) {
      if (!ALLOWED.has(area)) {
        throw new Error(`Unknown focus area "${area}" in ${exerciseName}`);
      }
      if (typeof value !== "number" || !Number.isFinite(value) || value < 0) {
        throw new Error(`Invalid weight for "${area}" in ${exerciseName}`);
      }
      sum += value;
    }

    if (Math.abs(sum - 1) > EPSILON) {
      throw new Error(`Weights for ${exerciseName} sum to ${sum}`);
    }
  }
}

// Validate once on import so you fail fast during dev.
validateExerciseMap(exerciseMap);

export function listExercises(): string[] {
  return Object.keys(exerciseMap).sort();
}

export function getFocusWeights(exerciseName: string): FocusWeights | null {
  const def = exerciseMap[exerciseName];
  if (!def) return null;

  const out: FocusWeights = {};
  for (const [area, value] of Object.entries(def.focus_weights)) {
    out[area as FocusArea] = value;
  }
  return out;
}
