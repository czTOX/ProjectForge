import z from 'zod';
import { TaskworkSchema } from './taskwork';

export const TaskCreateSchema = z.object({
  name: z.string({ required_error: 'Missing `name` parameter' }).nonempty(),
  creatorId: z.number({ required_error: 'Missing `creatorId` parameter' }),
  projectId: z.number({ required_error: 'Missing `projectId` parameter' }),
});

export const TaskSchema = z.object({
  id: z.number({ required_error: 'Missing `id` parameter' }),
  workHistory: z.array(TaskworkSchema),
}).merge(TaskCreateSchema);

export type TaskCreate = z.infer<typeof TaskCreateSchema>;
export type Task = z.infer<typeof TaskSchema>;