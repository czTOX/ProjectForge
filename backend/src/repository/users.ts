import { Prisma } from '@prisma/client';
import { Result } from '@badrap/result';
import { UserRegister, User, UserAuth } from '../models';
import prisma from '../client';

export const createSingle = async (
  data: UserRegister
): Promise<Result<User | null, Error>> => {
  try {
    const user = await prisma.user.create({
      data: data,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
      },
    });
    return Result.ok(user);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return Result.err(error);
    }
    return Result.err(new Error(`Unknown error: ${error}`));
  }
};

export const getSingleByEmail = async (
  email: string
): Promise<Result<User | null, Error>> => {
  const user = await getSingleByEmailAuth(email);
  if (user.isErr) {
    return user;
  }
  const userData = {
    id: user.value!.id,
    firstName: user.value!.firstName,
    lastName: user.value!.lastName,
    email: user.value!.email,
  };
  return Result.ok(userData);
};

export const getSingleByEmailAuth = async (
  email: string
): Promise<Result<UserAuth | null, Error>> => {
  try {
    const user = await prisma.user.findFirst({ where: { email } });
    if (!user) {
      return Result.err(new Error('User not exist'));
    }
    return Result.ok(user);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return Result.err(error);
    }
    return Result.err(new Error(`Unknown error: ${error}`));
  }
};