import z from 'zod';
import { TaskworkSchema } from './taskwork';
import { UserSchema } from './user';

export const TaskCreateSchema = z.object({
  projectId: z.string({ required_error: 'Missing `projectId` parameter' }),
  name: z.string({ required_error: 'Missing `name` parameter' }).nonempty(),
  description: z.string(),
  deadline: z.coerce.date().nullable(),
});

export const AssignTaskSchema = z.object({
  taskId: z.string().nonempty(),
  userId: z.string().nonempty(),
});

export const TaskSchema = z.object({
  id: z.string({ required_error: 'Missing `id` parameter' }),
  workHistory: z.array(TaskworkSchema),
  userId: z.string().nullable(),
}).merge(TaskCreateSchema);

export const TaskCheckSchema = z.object({
  taskId: z.string({ required_error: 'Missing `id` parameter' }),
  active: z.boolean({ required_error: 'Missing `active` parameter' }),
});

export const TaskEditSchema = z.object({
  id: z.string({ required_error: 'Missing `id` parameter' }),
  userId: z.string().nullable(),
  active: z.boolean(),
}).merge(TaskCreateSchema).omit({ projectId: true });

export type TaskCreate = z.infer<typeof TaskCreateSchema>;
export type Task = z.infer<typeof TaskSchema>;
export type TaskCheck = z.infer<typeof TaskCheckSchema>;
export type TaskEdit = z.infer<typeof TaskEditSchema>;

export type AssignTask = z.infer<typeof AssignTaskSchema>;