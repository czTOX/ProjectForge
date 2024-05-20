import { User } from './userTypes';

/**
 * Interface for Task and User relation
 *
 * @export
 * @interface TaskWork
 * @typedef {TaskWork}
 */
export interface TaskWork {
  id: string;
  secondsSpent: number;
  userId: string;
  taskId: string;
}

/**
 * Interface for creating new TaskWork
 *
 * @export
 * @interface NewTaskWork
 * @typedef {NewTaskWork}
 */
export interface NewTaskWork {
  taskId: string;
  secondsSpent: number;
}

/**
 * Interface for time input
 *
 * @export
 * @interface NewTaskWorkData
 * @typedef {NewTaskWorkData}
 */
export interface NewTaskWorkData {
  hours: number;
  minutes: number;
}

/**
 * Interface for time TaskWork with User
 *
 * @export
 * @interface TaskWorkWithUser
 * @typedef {TaskWorkWithUser}
 */
export interface TaskWorkWithUser {
  id: string;
  secondsSpent: number;
  createdAt: Date;
  taskId: string;
  user: User;
}