"use client";

import { useState, useEffect } from "react";
import { TextField, Button, Stack, Typography, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";

interface Habit {
  id: string;
  name: string;
  description: string;
  tag: string;
}

interface EditHabitPageProps {
  habitId: string;
}
   
export default function EditHabitPage({ habitId }: EditHabitPageProps) {
  const [habit, setHabit] = useState<Habit | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (habitId) {
      const habits = JSON.parse(localStorage.getItem("habits") || "[]");
      const selectedHabit = habits.find((habit: Habit) => habit.id === habitId);
      if (selectedHabit) {
        setHabit(selectedHabit);
        setName(selectedHabit.name);
        setDescription(selectedHabit.description);
        setTag(selectedHabit.tag);
      } else {
        setError("Habit not found.");
      }
    }
  }, [habitId]);

  const handleSave = () => {
    if (!name.trim()) {
      setError("Habit name is required.");
      return;
    }

    setIsSaving(true);

    const habits = JSON.parse(localStorage.getItem("habits") || "[]");
    const updatedHabits = habits.map((habit: Habit) =>
      habit.id === habitId ? { ...habit, name, description, tag } : habit
    );

    localStorage.setItem("habits", JSON.stringify(updatedHabits));

    setTimeout(() => {
      setIsSaving(false);
      router.push("/dashboard"); 
    }, 500);
  };

  if (error) {
    return (
      <div className="text-center text-red-500">
        <Typography variant="h6">{error}</Typography>
      </div>
    );
  }

  return (
    <div className="flex ">
      <div className="py-7 w-full max-w-md">
      {habit ? (
        <Stack spacing={3}>
          <TextField
            label="Habit Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            minRows={3}
            fullWidth
          />
          <TextField
            label="Tag"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            select
            fullWidth
          >
            {["Health", "Productivity", "Mindfulness", "Fitness", "Learning"].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </TextField>
          <Button
            onClick={handleSave}
            variant="contained"
            color="primary"
            disabled={isSaving}
            fullWidth
          >
            {isSaving ? (
              <>
                <CircularProgress size={24} color="inherit" className="mr-2" />
                Saving...
              </>
            ) : (
              "Save Habit"
            )}
          </Button>
        </Stack>
      ) : (
        <CircularProgress />
      )}
    </div>
    </div>
  );
}
