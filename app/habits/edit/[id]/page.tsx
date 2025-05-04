"use client"

import EditHabitPage from '@/components/habits/habit-edit'
import { Header } from '@/components/layout/header'
import { Box, Typography } from '@mui/material'
import { useParams } from 'next/navigation'
import React, { use } from 'react'

export default function EditHabit(props: { params:Promise< { Id: string }> }) {
    const  { Id } = use( props.params )
    return (
        <>
            <Box sx={{ py: 6, px: { xs: 3, md: 6 }, maxWidth: '1400px', mx: 'auto' }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Edit Habit
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    Update your habit details to keep track of your progress and stay motivated.
                </Typography>
                <EditHabitPage habitId={Id as string} />
            </Box>
        </>
    )
}
