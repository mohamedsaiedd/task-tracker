"use client"

import { Habit } from '@/lib/types';
import { Stack, TextField, Button, MenuItem, CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation'; 
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';

export default function AddHabitPage() {
  const [name, setname] = useState('');
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState('');
  const [icon, setIcon] = useState('🔥');
  const [isSaving, setIsSaving] = useState(false);
  const [frequency, setFrequency] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const Frequencies = ['Daily', 'Weekly', 'Monthly'];
  const tags = ['Health', 'Productivity', 'Mindfulness', 'Fitness', 'Learning'];
  const router = useRouter();

  const handleHabitSubmit = async () => {
    if (!name.trim()) {
      toast.error('Please enter a habit name');
      return;
    }
    const newHabit : Habit = {
        id: uuidv4(),
        icon,
        tags: [tag],
        name,
        frequency,
        createdAt : new Date().toISOString(),
        description,
        tag,
        completed: false,
        completionRate: 0,
        };

    setIsSaving(true);
    
    const habitData = JSON.parse(localStorage.getItem('habits') || '[]');
    const updatedHabitData = [...habitData, newHabit];
    localStorage.setItem('habits', JSON.stringify(updatedHabitData));
    setname('');
    setDescription('');
    setTag('');
    toast.success('Habit added successfully!');

    setTimeout(()   => {    
        setIsSaving(false)  
  }, 500)

    router.push('/dashboard');
  };

  const handleClose = () => {
    // your close logic
  };

  return (
    <div className="flex ">
      <div className="py-7 w-full max-w-md">
        <Stack spacing={3}>
          <TextField
            label="Habit name"
            value={name}
            onChange={(e) => setname(e.target.value)}
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
            {tags.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Frequency"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value as any)}
            select
            fullWidth
          >
            {Frequencies.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Stack>

        <div className="flex justify-between mt-6">
          <Button onClick={handleClose} color="secondary" variant="outlined">
            Cancel
          </Button>
          <Button 
            onClick={handleHabitSubmit} 
            color="primary" 
            variant="contained"
            disabled={isSaving}
          >
            {isSaving ? (
                <>
                    <CircularProgress size={24} color="inherit" className="mr-2"/>
                    adding...
                </>
                ) : (
                'add Habit'
                )
            }
          </Button>
        </div>
      </div>
    </div>
  );
}
