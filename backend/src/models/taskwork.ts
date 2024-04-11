import z from 'zod';

export const TaskworkCreateSchema = z.object({
  startedAt: z.coerce.date({ required_error: 'Missing `startedAt` parameter' }),
  endedAt: z.coerce.date({ required_error: 'Missing `endedAt` parameter' }),
  taskId: z.number({ required_error: 'Missing `taskId` parameter' }),
  userId: z.number({ required_error: 'Missing `userId` parameter' }),
});

export const TaskworkSchema = z.object({
  id: z.number({ required_error: 'Missing `id` parameter' }),
}).merge(TaskworkCreateSchema);

export type TaskworkCreate = z.infer<typeof TaskworkCreateSchema>;
export type Taskwork = z.infer<typeof TaskworkSchema>;