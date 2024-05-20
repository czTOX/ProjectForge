import { Project } from './projectTypes';
import { TaskWorkWithUser } from './taskWorkTypes';
import { User } from './userTypes';

/**
 * Interface for Task
 *
 * @export
 * @interface Task
 * @typedef {Task}
 */
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

/**
 * Interface for creating new Task
 *
 * @export
 * @interface NewTask
 * @typedef {NewTask}
 */
export interface NewTask {
  projectId: string;
  name: string;
  description: string;
  deadline: Date | null;
}

/**
 * Interface for editing new Task
 *
 * @export
 * @interface EditTask
 * @typedef {EditTask}
 */
export interface EditTask {
  name: string;
  description: string;
  deadline: Date | null;
  userId: string | null;
  active: boolean;
}

/**
 * Interface for sending EditTask to the server
 *
 * @export
 * @interface EditTask
 * @typedef {EditTask}
 */
export interface EditTaskContent {
  id: string;
  name: string;
  description: string;
  deadline: Date | null;
  userId: string | null;
  active: boolean;
}

/**
 * Interface for TaskMin
 *
 * @export
 * @interface TaskMin
 * @typedef {TaskMin}
 */
export interface TaskMin {
  id: string;
  name: string;
  active: boolean;
  deadline: Date;
  user: User;
  workHistory: [TaskWorkWithUser]
}

/**
 * Interface for assigning user to the task
 *
 * @export
 * @interface TaskAssign
 * @typedef {TaskAssign}
 */
export interface TaskAssign {
  taskId: string;
  userId: string;
}