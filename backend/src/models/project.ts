import z from 'zod';
import { TaskCreateSchema } from './task';
import { MessageCreateSchema } from './message';


export const ProjectCreateSchema = z.object({
  name: z.string({ required_error: 'Missing `name` parameter' }).nonempty(),
  description: z.string({ required_error: 'Missing `description` parameter' }).nonempty(),
  teamId: z.number({ required_error: 'Missing `teamId` parameter' }),
});

export const ProjectSchema = z.object({
  id: z.number(),
  tasks: z.array(TaskCreateSchema),
  messages: z.array(MessageCreateSchema),
})
.merge(ProjectCreateSchema);

export type ProjectCreate = z.infer<typeof ProjectCreateSchema>;
export type Project = z.infer<typeof ProjectSchema>;