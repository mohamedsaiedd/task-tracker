import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  Chip,
} from "@mui/material";
import { Habit } from "@/lib/types";

interface OverviewCardProps {
  title: string;
  className?: string;
  description: string;
  value: number;
  total: number;
  percentText: string;
  icon: React.ReactNode;
  habits?: Habit[];
}
export function OverviewCard({
  title,
  className,
  description,
  value,
  total,
  percentText,
  habits,
}: OverviewCardProps) {
  const percentage = Math.round((value / total) * 100);
  
  return (
      <Card className="w-full lg:w-full"  sx={{ borderRadius: 2, cursor: 'pointer', boxShadow: 2}}>
        <CardContent>
        <div className="flex items-center mb-2 justify-between">
          <Typography  variant="h4" color="" fontWeight="bold">
              {title}
            </Typography>
            <Typography variant="h6" fontWeight="light">
            {description}
            </Typography>
        </div>
          <Typography variant="caption" color="text.secondary" mt={1} mb={2}>
            {percentText}
          </Typography>
          <LinearProgress variant="determinate" value={percentage} className="h-2" />
          {habits && habits.length > 0 && (
            <Box mt={2} display="flex" flexWrap="wrap" gap={1}>
              {habits.map((habit) => (
                <Chip key={habit.id} label={habit.name} size="small"   />
              ))}
            </Box>
          )}
        </CardContent>
    </Card>
  );
}