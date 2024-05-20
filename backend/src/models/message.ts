import z from 'zod';
import { UserSchema } from './user';

export const MessageCreateSchema = z.object({
  content: z.string({ required_error: 'Missing `content` parameter' }).nonempty(),
  projectId: z.string({ required_error: 'Missing `projectId` parameter' }),
});

export const MessageSchema = z.object({
  id: z.string({ required_error: 'Missing `id` parameter' }),
  content: z.string({ required_error: 'Missing `content` parameter' }).nonempty(),
  createdAt: z.coerce.date({ required_error: 'Missing `createdAt` parameter' }),
  author: UserSchema,
});

export type MessageCreate = z.infer<typeof MessageCreateSchema>;
export type Message = z.infer<typeof MessageSchema>;