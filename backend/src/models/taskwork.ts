import z from 'zod';

export const TaskworkCreateSchema = z.object({
  secondsSpent: z.coerce.number({ required_error: 'Missing `secondsSpent` parameter' }),
  taskId: z.string({ required_error: 'Missing `taskId` parameter' }),
});

export const TaskworkSchema = z.object({
  id: z.string().nonempty(),
  createdAt: z.coerce.date({ required_error: 'Missing `createdAt` parameter' }),
  userId: z.string({ required_error: 'Missing `userId` parameter' }),
}).merge(TaskworkCreateSchema);

export const TaskworkDeleteSchema = z.object({
  id: z.string({ required_error: 'Missing `id` parameter' }).nonempty(),
});

export type Taskwork = z.infer<typeof TaskworkSchema>;
export type TaskworkCreate = z.infer<typeof TaskworkCreateSchema>;
export type TaskworkDelete = z.infer<typeof TaskworkDeleteSchema>;