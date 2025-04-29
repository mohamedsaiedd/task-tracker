export interface Habit {
    id: string;
    name: string;
    description?: string;
    icon: string;
    tag: string;
    tags: string[];
    frequency: 'daily' | 'weekly' | 'monthly';
    createdAt: string;
    color?: string;
    chipColor?: string;
    variant?: string;
    completed?: boolean;
    completionRate: number;
  }
  
  export interface User {
    id: string;
    email: string;
    name: string;
    picture: string;
  }
  
  export type FilterType = 'all' | 'completed' | 'pending' | string;