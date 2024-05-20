import z from 'zod';
import { TaskCreateSchema } from './task';
import { MessageCreateSchema } from './message';


export const ProjectCreateSchema = z.object({
  name: z.string({ required_error: 'Missing `name` parameter' }).nonempty(),
  teamId: z.string({ required_error: 'Missing `teamId` parameter' }),
});

export const ProjectSchema = z.object({
  id: z.string().nonempty(),
  active: z.boolean(),
  tasks: z.array(TaskCreateSchema),
  messages: z.array(MessageCreateSchema),
})
.merge(ProjectCreateSchema);

export const ProjectCreateNewSchema = z.object({
  name: z.string({ required_error: 'Missing `name` parameter' }).nonempty(),
  teamId: z.string({ required_error: 'Missing `teamId` parameter' }).nonempty(),
  description: z.string(),
  budget: z.coerce.number(),
  deadline: z.coerce.date().nullable(),
})

export const ProjectEditSchema = z.object({
  id: z.string().nonempty(),
  active: z.boolean(),
}).merge(ProjectCreateNewSchema).omit({ teamId: true })

export const ProjectCreateFileSchema = z.object({
  fileName: z.string().nonempty(),
  originalName: z.string().nonempty(),
  type: z.string().nonempty(),
  size: z.number(),
})

export const ProjectFileSchema = z.object({
  id: z.string().nonempty(),
  fileName: z.string().nonempty(),
  originalName: z.string().nonempty(),
  type: z.string().nonempty(),
  size: z.number(),
})

export type ProjectCreate = z.infer<typeof ProjectCreateSchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type ProjectEdit = z.infer<typeof ProjectEditSchema>;
export type ProjectCreateNew = z.infer<typeof ProjectCreateNewSchema>;
export type ProjectFile = z.infer<typeof ProjectFileSchema>;
export type ProjectCreateFile = z.infer<typeof ProjectCreateFileSchema>;