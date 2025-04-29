"use client";

import { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";

interface DeleteHabitDialogProps {
  open: boolean;
  onClose?: () => void;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  habitName: string;
  habitId: string;
}

export function DeleteHabitDialog({
  open,
  onOpenChange,
  onConfirm,
  onClose,
  habitName,
  habitId,
}: DeleteHabitDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = () => {
    setIsDeleting(true);
    const habits = JSON.parse(localStorage.getItem("habits") || "[]");
    const updatedHabits = habits.filter((habit: any) => habit.id !== habitId);
    localStorage.setItem("habits", JSON.stringify(updatedHabits));


    // Simulate API call
    setTimeout(() => {
      onConfirm();
      setIsDeleting(false);
      onOpenChange(false);
    }, 500);
  };

  return (
    <Dialog open={open} onClose={() => onOpenChange(false)}>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="textSecondary">
          This will permanently delete the habit "{habitName}" and all its tracking history.
          This action cannot be undone.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => onOpenChange(false)}
          color="secondary"
          disabled={isDeleting}
        >
          Cancel
        </Button>
        <Button
          onClick={(e) => {
            e.preventDefault();
            handleConfirm();
          }}
          color="error"
          disabled={isDeleting}
          startIcon={isDeleting ? <CircularProgress size={24} /> : null}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
