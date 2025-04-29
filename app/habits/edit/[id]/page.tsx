"use client"

import EditHabitPage from '@/components/habits/habit-edit'
import { Header } from '@/components/layout/header'
import { Box, Typography } from '@mui/material'
import React from 'react'
import { useParams } from 'next/navigation';

export default function EditHabit() {
    const { id } = useParams();
    return (
        <>
            <Box sx={{ py: 6, px: { xs: 3, md: 6 }, maxWidth: '1400px', mx: 'auto' }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Edit Habit
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    Update your habit details to keep track of your progress and stay motivated.
                </Typography>
                <EditHabitPage habitId={id as string} />
            </Box>
        </>
    )
}
