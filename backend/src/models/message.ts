import z from 'zod';


export const MessageCreateSchema = z.object({
  content: z.string({ required_error: 'Missing `content` parameter' }).nonempty(),
  projectId: z.number({ required_error: 'Missing `projectId` parameter' }),
  authorId: z.number({ required_error: 'Missing `authorId` parameter' }),
});

export const MessageSchema = z.object({
  id: z.number({ required_error: 'Missing `id` parameter' }),
  postedAt: z.coerce.date({ required_error: 'Missing `postedAt` parameter' }),
})
.merge(MessageCreateSchema);

export type MessageCreate = z.infer<typeof MessageCreateSchema>;
export type Message = z.infer<typeof MessageSchema>;