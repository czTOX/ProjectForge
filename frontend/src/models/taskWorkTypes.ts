import { User } from './userTypes';

export interface TaskWork {
  id: string;
  secondsSpent: number;
  userId: string;
  taskId: string;
}

export interface NewTaskWork {
  taskId: string;
  secondsSpent: number;
}

export interface NewTaskWorkData {
  hours: number;
  minutes: number;
}

export interface TaskWorkWithUser {
  id: string;
  secondsSpent: number;
  createdAt: Date;
  taskId: string;
  user: User;
}