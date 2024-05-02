import z from 'zod';
import { UserSchema } from './user';
import { ProjectCreateSchema } from './project';


export const TeamCreateSchema = z.object({
  name: z.string({ required_error: 'Missing `name` parameter' }).nonempty(),
  profilePic: z.string(),
});

export const TeamSchema = z.object({
  id: z.number(),
  users: z.array(UserSchema),
  projects: z.array(ProjectCreateSchema),
}).merge(TeamCreateSchema);

export type TeamCreate = z.infer<typeof TeamCreateSchema>;
export type Team = z.infer<typeof TeamSchema>;