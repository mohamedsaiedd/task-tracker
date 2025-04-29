"use client"

import  AddHabitPage  from '@/components/habits/habit-form'
import { Header } from '@/components/layout/header'
import { Box, Typography } from '@mui/material'
import React from 'react'

export default function CreateHabit() {
  return (
    <>
        <Header /> 
        <Box sx={{ py: 6, px: { xs: 3, md: 6 }, maxWidth: '1400px', mx: 'auto' }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Add a New Habit
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
                Create a new habit to track your progress and stay motivated.
            </Typography>
            <AddHabitPage />
        </Box>
  </>
  )
}
