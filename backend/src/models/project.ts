import z from 'zod';
import { UserSchema } from './user';
import { TaskSchema } from './task';
import { MessageSchema } from './message';


export const ProjectCreateSchema = z.object({
  name: z.string({ required_error: 'Missing `name` parameter' }).nonempty(),
  description: z.string({ required_error: 'Missing `description` parameter' }).nonempty(),
});

export const ProjectSchema = z.object({
  id: z.number(),
  tasks: z.array(TaskSchema),
  messages: z.array(MessageSchema),
})
.merge(ProjectCreateSchema)
.merge(UserSchema);

export type ProjectCreate = z.infer<typeof ProjectCreateSchema>;
export type Project = z.infer<typeof ProjectSchema>;