"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Typography,
  Button,
  Grid,
  Tabs,
  Tab,
  Chip,
} from "@mui/material";
import Link from 'next/link';
import {Header} from "@/components/layout/header";
import { Habit } from "@/lib/types";
import {
  Check as CheckIcon,
  Clock as ClockIcon,
  CalendarCheck as CalendarCheckIcon,
  Activity as ActivityIcon,
  PlusIcon as AddIcon,
  X,
  Pencil,
} from "lucide-react";
import {OverviewCard} from "@/components/dashboard/overview-card";
import {DeleteHabitDialog} from "@/components/habits/delete-habit-dialog";
import { useRouter } from "next/navigation";
import { useUser } from '@auth0/nextjs-auth0';


export default function DashboardPage() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [habitToDelete, setHabitToDelete] = useState<{ id: string; name: string } | null>(null);
  const [currentTab, setCurrentTab] = useState("all");
  const [completed , setCompleted] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    const storedHabits = localStorage.getItem('habits');
    if (storedHabits) {
      setHabits(JSON.parse(storedHabits));
    }
  }, []);

  const handleHabitComplete = (habit: Habit) => {
    const updatedHabits = habits.map(h => 
      h.id === habit.id ? { ...h,...habit, completed:true} : h 
    )
    setCompleted(true)
    setHabits(updatedHabits);
    console.log(updatedHabits,habits)
    localStorage.setItem("habits", JSON.stringify(updatedHabits));
  };


  const totalHabits = habits.length;
  const completedHabits = habits.filter((h) => h.completed).length;
  const pendingToday = totalHabits - completedHabits;
  const totalCompletionRate = completedHabits / habits.length


  const handleDeleteHabit = (id: string) => {
    const habit = habits.find((h) => h.id === id);
    if (habit) {
      setHabitToDelete({ id, name: habit.name });
      setDeleteDialogOpen(true);
    }
  };

  const confirmDeleteHabit = () => {
    if (habitToDelete) {
      setHabits(habits.filter((h) => h.id !== habitToDelete.id));
      setHabitToDelete(null);
      setDeleteDialogOpen(false);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  };
 
  const filteredHabits = React.useMemo(() => {
    if (currentTab === "completed") {
      return habits.filter((h) => h.completed);
    }
    if (currentTab === "pending") {
      return habits.filter((h) => !h.completed);
    }
    return habits;
  }, [habits, currentTab]);
  const { user , isLoading } = useUser()

  return (
    <>
      <Header user={user} /> 
      <Box sx={{ py: 6, px: { xs: 3, md: 6 }, maxWidth: '1400px', mx: 'auto' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 6 }}>
          <Box>
            <Typography variant="h4" component="h1" gutterBottom>
              Dashboard
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Track your progress and stay motivated.
            </Typography>
          </Box>
          <Link href="habits/add">
            <Button variant="contained" startIcon={<AddIcon />} >
              New Habit
            </Button>
          </Link>
        </Box>

        <div className="container flex gap-6 mb-6 justify-between">
            <OverviewCard
              title={`${completedHabits}/${totalHabits}`}
              description="Today's Habits"
              value={completedHabits}
              total={totalHabits}
              percentText={`${Math.round((completedHabits / totalHabits) * 100) || 0}% completed today`}
              icon={<CheckIcon color="text.secondary" />}
            />
            <OverviewCard
              title={pendingToday.toString()}
              description="Pending Today"
              value={pendingToday}
              total={totalHabits}
              percentText={`${Math.round((pendingToday / totalHabits) * 100)}% remaining`}
              icon={<ClockIcon color="text.secondary" />}
            />
          </div>
          <Grid container spacing={2} sx={{ mb: 4 }}>
            <OverviewCard
              title={`${Math.round(totalCompletionRate * 100)}%`}
              description="Completion Rate"
              value={Math.round(totalCompletionRate * 100)}
              total={100}
              percentText="Based on the last 30 days"
              icon={<CalendarCheckIcon color="text.secondary" />}
            />
          </Grid>
        <Card sx={{ borderRadius: 2, cursor: 'pointer', boxShadow: 2 }}>
          <CardHeader
            title="Recent Habits"
            subheader="Your most recent habits and their statuses"
          ></CardHeader>
          <CardContent>
            <Tabs value={currentTab} onChange={handleTabChange} aria-label="recent habits tabs">
              <Tab label="All" value="all" />
              <Tab label="Completed" value="completed" />
              <Tab label="Pending" value="pending" />
            </Tabs>
            <Box sx={{ mt: 2 }}>
              {filteredHabits.length === 0 ? (
                <Typography variant="body1" color="text.secondary" textAlign="center" py={4}>
                  No habits yet. Create your first habit to get started!
                </Typography>
              ) : (
                <Grid container spacing={2}>
                  {filteredHabits.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 7).map((habit) => (
                      <Card key={habit.id}  sx={{ borderRadius: 2, cursor: 'pointer',  '&:hover': { boxShadow: 2 } }} variant="outlined">
                        <CardContent>
                          <Typography variant="h6" component="h3" gutterBottom>
                            {habit.name},{habit.icon}
                          </Typography>
                          <Chip label={habit.tag} size="small"   />
                          <Typography variant="body2" color="text.secondary">
                            Progress: {Math.round(habit.completionRate * 100)}%
                          </Typography>
                          <Typography variant="body2" color={habit.completed ? 'success.main' : 'warning.main'}>
                            Status: {habit.completed ? 'Completed' : 'Pending'}
                          </Typography>
                        </CardContent>
                        <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
                          <div>
                            <Button  onClick={()=>handleHabitComplete(habit)} variant="outlined">
                              complete
                            </Button>
                          </div>
                              <div className="flex gap-2" > 
                                <Link
                                  href={`/habits/edit/${habit.id}`}
                                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-500 rounded-md hover:bg-sky-50 transition"
                                  ><Pencil size={16} />
                                  Edit
                                </Link>
                                <Button
                                  onClick={() => handleDeleteHabit(habit.id)}
                                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-red-200 rounded-md hover:bg-red-300 transition"
                                  ><X size={18}/>
                                  Delete
                                </Button>
                              </div>
                        </CardActions>
                      </Card>
                  ))}
                </Grid>
              )}
            </Box>
          </CardContent>
         
          {habits.length > 0 && (
            <CardActions sx={{ justifyContent: 'center', p: 2 }}>
              <Button variant="outlined" onClick={() => router.push("/habits")}>
                View All Habits
              </Button>
            </CardActions>
          )}
        </Card>
        {habitToDelete && (
          <DeleteHabitDialog
            open={deleteDialogOpen}
            onClose={() => setDeleteDialogOpen(false)}
            onConfirm={confirmDeleteHabit}
            habitName={habitToDelete.name}
            habitId={habitToDelete.id}
            onOpenChange={() => setDeleteDialogOpen(false)}
          />
        )}
      </Box>
    </>
  );
}