import z from 'zod';
import { UserSchema } from './user';
import { TaskSchema } from './task';


export const MessageCreateSchema = z.object({
  content: z.string({ required_error: 'Missing `content` parameter' }).nonempty(),
  projectId: z.number({ required_error: 'Missing `projectId` parameter' }),
  userId: z.number({ required_error: 'Missing `userId` parameter' }),
});

export const MessageSchema = z.object({
  id: z.number({ required_error: 'Missing `id` parameter' }),
  postedAt: z.coerce.date({ required_error: 'Missing `postedAt` parameter' }),
})
.merge(MessageCreateSchema);

export type MessageCreate = z.infer<typeof MessageCreateSchema>;
export type Message = z.infer<typeof MessageSchema>;