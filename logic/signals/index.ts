// Person A
// Public export surface for the signals pipeline.
// Other code should import from here.
export type { Workout, ExerciseEntry, ExerciseName, FocusVector } from "./schemas";
export { WorkoutSchema, ExerciseEntrySchema, DateISOSchema, parseWorkout } from "./schemas";

export { getFocusWeights, listExercises } from "./focusMapping";
export { extractFocusVector } from "./featureExtract";
