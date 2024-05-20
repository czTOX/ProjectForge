import z from 'zod';
import { WorksAtSchema } from './worksAt';
import { TaskworkSchema } from './taskwork';
import { MessageSchema } from './message';

export const UserLoginSchema = z.object({
  hashedPassword: z
    .string({ required_error: 'Missing `password` parameter' })
    .nonempty(),
  email: z.string({ required_error: 'Missing `email` parameter' }).nonempty(),
});

export const UserRegisterSchema = z
  .object({
    firstName: z
      .string({ required_error: 'Missing `firstName` parameter' })
      .nonempty(),
    lastName: z
      .string({ required_error: 'Missing `lastName` parameter' })
      .nonempty(),
  })
  .merge(UserLoginSchema);

export const UserAuthSchema = z
  .object({
    id: z.string().nonempty(),
  })
  .merge(UserRegisterSchema);

export const UserSchema = z.object({
  profilePic: z.string().optional(),
}).merge(UserAuthSchema).omit({ hashedPassword: true });

export const UserEditSchema = z.object({
  firstName: z.string().nonempty(),
  lastName: z.string().nonempty(),
  profilePicName: z.string().optional(),  
});

export type UserRegister = z.infer<typeof UserRegisterSchema>;
export type User = z.infer<typeof UserSchema>;
export type UserAuth = z.infer<typeof UserAuthSchema>;
export type UserEdit = z.infer<typeof UserEditSchema>;