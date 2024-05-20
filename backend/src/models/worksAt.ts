import z from 'zod';

export const WorksAtCreateSchema = z.object({
  userId: z.string().nonempty(),
  role: z.string(),
  permissionLevel: z.number(),
});

export const WorksAtSchema = z.object({
  id: z.string().nonempty(),
  teamId: z.string().nonempty(),
}).merge(WorksAtCreateSchema);

export type WorksAt = z.infer<typeof WorksAtSchema>;
export type WorksAtCreate = z.infer<typeof WorksAtCreateSchema>;