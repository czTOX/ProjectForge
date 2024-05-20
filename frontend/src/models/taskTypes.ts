import { Project } from './projectTypes';
import { TaskWorkWithUser } from './taskWorkTypes';
import { User } from './userTypes';

export interface Task {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  editedAt: string;
  active: boolean;
  deadline: Date;
  creatorId: string;
  project: Project;
  user: User;
  workHistory: [TaskWorkWithUser]
}

export interface NewTask {
  projectId: string;
  name: string;
  description: string;
  deadline: Date | null;
}


export interface EditTask {
  name: string;
  description: string;
  deadline: Date | null;
  userId: string | null;
  active: boolean;
}

export interface EditTaskContent {
  id: string;
  name: string;
  description: string;
  deadline: Date | null;
  userId: string | null;
  active: boolean;
}

export interface TaskMin {
  id: string;
  name: string;
  active: boolean;
  deadline: Date;
  user: User;
  workHistory: [TaskWorkWithUser]
}

export interface TaskAssign {
  taskId: string;
  userId: string;
}