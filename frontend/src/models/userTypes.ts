import z from 'zod';
import { Task } from './taskTypes';

const UserLoginSchema = z.object({
  hashedPassword: z
    .string({ required_error: 'Missing `password` parameter' })
    .nonempty(),
  email: z.string({ required_error: 'Missing `email` parameter' }).nonempty(),
});

const UserRegistrationSchema = z.object({
  firstName: z.string({ required_error: 'Missing `firstName` parameter' }).nonempty(),
  lastName: z.string({ required_error: 'Missing `lastName` parameter' }).nonempty(),
  hashedPassword: z
    .string({ required_error: 'Missing `password` parameter' })
    .nonempty(),
}).merge(UserLoginSchema);

export const UserSchema = z
  .object({
    id: z.string({ required_error: 'Missing `id` parameter' }).nonempty(),
    profilePic: z.string(),
}).merge(UserRegistrationSchema).omit({ hashedPassword: true });

export const UserSettingsSchema = z.object({
  firstName: z.string().nonempty(),
  lastName: z.string().nonempty(),
  profilePic: z.instanceof(File).optional(),
});

export const UserSettingsFormSchema = z
  .object({
    picture: z.instanceof(FileList).optional(),
}).merge(UserSettingsSchema).omit({ profilePic: true });

export interface MyAllResponse {
  id: string,
  worksAt: [{
    team: {
      id: string,
      name: string,
      projects: [{
        id: string;
        name: string,
        _count: {
          tasks: number;
        }
      }]
    }
  }];
  assignedTo: [Task],
}

const UserNameSchema = z.object({
  firstName: z.string({ required_error: 'Missing `firstName` parameter' }).nonempty(),
  lastName: z.string({ required_error: 'Missing `lastName` parameter' }).nonempty(),
});

export type User = z.infer<typeof UserSchema>;
export type UserLogin = z.infer<typeof UserLoginSchema>;
export type UserRegistration = z.infer<typeof UserRegistrationSchema>;
export type UserSettings = z.infer<typeof UserSettingsSchema>
export type UserSettingsForm = z.infer<typeof UserSettingsFormSchema>
export type UserName = z.infer<typeof UserNameSchema>
