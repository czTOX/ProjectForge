import z from 'zod';
import { Task } from './taskTypes';

/**
 * UserLoginSchema
 *
 * @type {*}
 */
const UserLoginSchema = z.object({
  hashedPassword: z
    .string({ required_error: 'Missing `password` parameter' })
    .nonempty(),
  email: z.string({ required_error: 'Missing `email` parameter' }).nonempty(),
});

/**
 * UserRegistrationSchema
 *
 * @type {*}
 */
const UserRegistrationSchema = z.object({
  firstName: z.string({ required_error: 'Missing `firstName` parameter' }).nonempty(),
  lastName: z.string({ required_error: 'Missing `lastName` parameter' }).nonempty(),
  hashedPassword: z
    .string({ required_error: 'Missing `password` parameter' })
    .nonempty(),
}).merge(UserLoginSchema);

/**
 * UserSchema
 *
 * @type {*}
 */
export const UserSchema = z
  .object({
    id: z.string({ required_error: 'Missing `id` parameter' }).nonempty(),
    profilePic: z.string(),
}).merge(UserRegistrationSchema).omit({ hashedPassword: true });

/**
 * UserSettingsSchema
 *
 * @type {*}
 */
export const UserSettingsSchema = z.object({
  firstName: z.string().nonempty(),
  lastName: z.string().nonempty(),
  profilePic: z.instanceof(File).optional(),
});

/**
 * UserSettingsFormSchema
 *
 * @type {*}
 */
export const UserSettingsFormSchema = z
  .object({
    picture: z.instanceof(FileList).optional(),
}).merge(UserSettingsSchema).omit({ profilePic: true });

/**
 * MyAllResponse
 * user with active task, project and teams
 *
 * @export
 * @interface MyAllResponse
 * @typedef {MyAllResponse}
 */
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

/**
 * UserNameSchema
 *
 * @type {*}
 */
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
