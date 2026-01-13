// Person A
// Phase 1: Workout data contracts and runtime validation.

import { z } from "zod";
import type { FocusArea } from "../schemas/focusAreas";

export type ExerciseName = string;

export interface ExerciseEntry {
  name: ExerciseName;
  sets: number; // integer >= 1
}

export interface Workout {
  id: string;
  dateISO: string; // YYYY-MM-DD
  exercises: ExerciseEntry[];
}

// Keep the date strict but simple for Phase 1
export const DateISOSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);

export const ExerciseEntrySchema = z.object({
  name: z.string().min(1),
  sets: z.number().int().min(1),
});

export const WorkoutSchema = z.object({
  id: z.string().min(1),
  dateISO: DateISOSchema,
  exercises: z.array(ExerciseEntrySchema).min(1),
});

export function parseWorkout(input: unknown): Workout {
  return WorkoutSchema.parse(input);
}

// Optional: a typed helper for focus vectors
export type FocusVector = Partial<Record<FocusArea, number>>;
