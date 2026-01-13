import React, { useState } from "react";
import { createWorkout } from "../store/workoutStore";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
} from "react-native";
import { Theme } from "../theme";

import {
  listExercises,
  parseWorkout,
  extractFocusVector,
} from "../../logic/signals";
import { debugPrintVector } from "../../logic/utils/invariantChecks";
import { v4 as uuidv4 } from "uuid";

type DraftExercise = {
  name: string;
  sets: string; // keep as string for TextInput
};

const WorkoutLogScreen = () => {
  const [exercises, setExercises] = useState<DraftExercise[]>([
    { name: "", sets: "" },
  ]);

  const exerciseOptions = listExercises(); // available exercises from mapping

  function updateExercise(
    index: number,
    field: "name" | "sets",
    value: string
  ) {
    setExercises((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  }

  function addExerciseRow() {
    setExercises((prev) => [...prev, { name: "", sets: "" }]);
  }

  function validateDraft() {
    if (exercises.length === 0) {
      throw new Error("Workout must contain at least one exercise");
    }

    for (const ex of exercises) {
      if (!ex.name) {
        throw new Error("All exercises must be selected");
      }
      if (!exerciseOptions.includes(ex.name)) {
        throw new Error(`Unknown exercise: ${ex.name}`);
      }
      const sets = Number(ex.sets);
      if (!Number.isInteger(sets) || sets < 1) {
        throw new Error("Sets must be a positive integer");
      }
    }
  }

  async function handleSave() {
    try {
      validateDraft();

      const workoutDraft = {
        id: uuidv4(),
        dateISO: new Date().toISOString().slice(0, 10),
        exercises: exercises.map((ex) => ({
          name: ex.name,
          sets: Number(ex.sets),
        })),
      };

      const workout = parseWorkout(workoutDraft);

      // Phase 1: compute signals immediately for verification
      await createWorkout(workout);
      const vector = extractFocusVector(workout);
      debugPrintVector(vector);

      Alert.alert("Workout saved", "Check console for focus vector output");

      // reset form
      setExercises([{ name: "", sets: "" }]);
    } catch (err: any) {
      Alert.alert("Invalid workout", err.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workout Log</Text>
      <Text style={styles.subtitle}>Enter exercises and sets</Text>

      {exercises.map((ex, idx) => (
        <View key={idx} style={styles.row}>
          <TextInput
            style={styles.input}
            placeholder="Exercise name"
            value={ex.name}
            onChangeText={(text) => updateExercise(idx, "name", text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Sets"
            keyboardType="numeric"
            value={ex.sets}
            onChangeText={(text) => updateExercise(idx, "sets", text)}
          />
        </View>
      ))}

      <Button title="Add Exercise" onPress={addExerciseRow} />
      <View style={{ height: Theme.spacing.sm }} />
      <Button title="Save Workout" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Theme.spacing.md,
    backgroundColor: Theme.colors.background,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: Theme.colors.text,
    marginBottom: Theme.spacing.xs,
  },
  subtitle: {
    fontSize: 14,
    color: Theme.colors.textSecondary,
    marginBottom: Theme.spacing.md,
  },
  row: {
    marginBottom: Theme.spacing.sm,
  },
  input: {
    backgroundColor: "#fff",
    padding: Theme.spacing.sm,
    borderRadius: 6,
    marginBottom: Theme.spacing.xs,
  },
});

export default WorkoutLogScreen;
