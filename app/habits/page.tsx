"use client"

import { Box, Button, Card, Grid, CardActions, CardContent, Chip, Typography } from '@mui/material'
import React, { useEffect } from 'react'

export default function AllHibts() {
  const [habits, setHabits] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);


  useEffect(() => {
    const totalHabits = localStorage.getItem('habits');
    if (totalHabits) {
      const parsedHabits = JSON.parse(totalHabits);
      setHabits(parsedHabits);
    }
    setLoading(false);
  }, [])

  return (
    <>
      <Box sx={{ py: 6, px: { xs: 3, md: 6 }, maxWidth: '1400px', mx: 'auto' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Total Habits: {habits?.length}
        </Typography>

        {loading ? (
          <Typography variant="h6" color="text.secondary">
            Loading...
          </Typography>
        ) : (
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={2} mt={2}>
              {habits && habits.map((habit: any) => (
                <Card key={habit.id} sx={{ borderRadius: 2, cursor: 'pointer', '&:hover': { boxShadow: 2 } }} variant="outlined">
                  <CardContent>
                    <Typography variant="h6" component="h3" gutterBottom>
                      {habit.name},{habit.icon}
                    </Typography>
                    <Chip label={habit.tag} size="small" />
                    <Typography variant="body2" color="text.secondary">
                      Progress: {Math.round(habit.completionRate * 100)}%
                    </Typography>
                    <Typography variant="body2" color={habit.completed ? 'success.main' : 'warning.main'}>
                      Status: {habit.completedToday ? 'Completed' : 'Pending'}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Grid>
          </Box>
        )}

      </Box>
    </>
  )
}
