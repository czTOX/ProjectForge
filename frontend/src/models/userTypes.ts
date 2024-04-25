import z from 'zod';

const UserLoginSchema = z.object({
  hashedPassword: z
    .string({ required_error: 'Missing `password` parameter' })
    .nonempty(),
  email: z.string({ required_error: 'Missing `email` parameter' }).nonempty(),
});

const UserRegistrationSchema = z.object({
  email: z.string({ required_error: 'Missing `email` parameter' }).nonempty(),
  hashedPassword: z
    .string({ required_error: 'Missing `password` parameter' })
    .nonempty(),
}).merge(UserLoginSchema);

export const UserSchema = z
  .object({
    id: z.number(),
  })
  .merge(UserRegistrationSchema);

export type User = z.infer<typeof UserSchema>;
export type UserLogin = z.infer<typeof UserLoginSchema>;
export type UserRegistration = z.infer<typeof UserRegistrationSchema>;