// Person A
// Phase 1: Local persistence for raw workouts only (no derived metrics).

import * as SQLite from "expo-sqlite";
import type { Workout } from "../../logic/signals";

const db = SQLite.openDatabase("workouts.db");

function executeSql<T = any>(
  sql: string,
  params: any[] = []
): Promise<T[]> {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        sql,
        params,
        (_, result) => resolve(result.rows._array as T[]),
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
}

export async function initWorkoutDb() {
  await executeSql(`
    CREATE TABLE IF NOT EXISTS workouts (
      id TEXT PRIMARY KEY,
      dateISO TEXT NOT NULL
    );
  `);

  await executeSql(`
    CREATE TABLE IF NOT EXISTS workout_exercises (
      workoutId TEXT NOT NULL,
      name TEXT NOT NULL,
      sets INTEGER NOT NULL
    );
  `);
}

export async function createWorkout(workout: Workout) {
  await executeSql(
    `INSERT INTO workouts (id, dateISO) VALUES (?, ?)`,
    [workout.id, workout.dateISO]
  );

  for (const ex of workout.exercises) {
    await executeSql(
      `INSERT INTO workout_exercises (workoutId, name, sets)
       VALUES (?, ?, ?)`,
      [workout.id, ex.name, ex.sets]
    );
  }
}

export async function listWorkouts(): Promise<Workout[]> {
  const workouts = await executeSql<{ id: string; dateISO: string }>(
    `SELECT * FROM workouts ORDER BY dateISO DESC`
  );

  const result: Workout[] = [];

  for (const w of workouts) {
    const exercises = await executeSql<{ name: string; sets: number }>(
      `SELECT name, sets FROM workout_exercises WHERE workoutId = ?`,
      [w.id]
    );

    result.push({
      id: w.id,
      dateISO: w.dateISO,
      exercises,
    });
  }

  return result;
}

export async function getWorkoutById(id: string): Promise<Workout | null> {
  const rows = await executeSql<{ id: string; dateISO: string }>(
    `SELECT * FROM workouts WHERE id = ?`,
    [id]
  );

  if (rows.length === 0) return null;

  const exercises = await executeSql<{ name: string; sets: number }>(
    `SELECT name, sets FROM workout_exercises WHERE workoutId = ?`,
    [id]
  );

  return {
    id: rows[0].id,
    dateISO: rows[0].dateISO,
    exercises,
  };
}
