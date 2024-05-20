import z from 'zod';
import { ProjectCreateSchema } from './project';
import { WorksAtSchema } from './worksAt';

export const TeamCreateNewSchema = z.object({
  name: z.string({ required_error: 'Missing `name` parameter' }).nonempty(),
});

export const TeamCreateSchema = z.object({
  userId: z.string().nonempty(),
}).merge(TeamCreateNewSchema);

export const TeamJoinSchema = z.object({
  inviteCode: z.string({ required_error: 'Missing `inviteCode` parameter' }).nonempty(),
});

export const TeamJoinCreateSchema = z.object({
  userId: z.string().nonempty(),
}).merge(TeamJoinSchema);


export const TeamSchema = z.object({
  id: z.string().nonempty(),
  users: z.array(WorksAtSchema),
  projects: z.array(ProjectCreateSchema),
}).merge(TeamCreateSchema).omit({ userId: true });

export const TeamEditSchema = z.object({
  id: z.string().nonempty(),
}).merge(TeamCreateNewSchema);

export const TeamMembersSchema = z.object({
  users: z.array(WorksAtSchema),
});

export const PermissionLevelSchema = z.object({
  permissionLevel: z.number(),
});

export const NewRoleSchema = z.object({
  workId: z.string().nonempty(),
  role: z.string().nonempty(),
  permissionLevel: z.string().nonempty(),
});

export type TeamMembers = z.infer<typeof TeamMembersSchema>;
export type TeamCreateNew = z.infer<typeof TeamCreateNewSchema>;
export type TeamCreate = z.infer<typeof TeamCreateSchema>;
export type Team = z.infer<typeof TeamSchema>;
export type TeamEdit = z.infer<typeof TeamEditSchema>;
export type TeamJoin = z.infer<typeof TeamJoinSchema>;
export type TeamJoinCreate = z.infer<typeof TeamJoinCreateSchema>;

export type PermissionLevel = z.infer<typeof PermissionLevelSchema>;
export type NewRole = z.infer<typeof NewRoleSchema>;