import { Prisma } from '@prisma/client';
import { Result } from '@badrap/result';
import { UserRegister, User, UserAuth, UserEdit } from '../models';
import prisma from '../client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import path from 'path';

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

export const editSingle = async (
  id: string,
  data: UserEdit
): Promise<Result<User | null, Error>> => {
  try {
    if (data.profilePicName) {
      const user = await prisma.user.update({
        where: {id: id},
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          profilePic: 'profilePic-' + id + path.extname(data.profilePicName),
        },
      });
      return Result.ok(user);
    } else {
      const user = await prisma.user.update({
        where: {id: id},
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
        },
      });
      return Result.ok(user);
    }
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

export const getUserWithTeams = async (
  id: string
): Promise<Result<User | null, Error>> => {
  try {
    const query = {
      where: { id: id },
      include: {
        worksAt: {
          select: {
            role: true,
            team: {
              select: {
                id: true,
                name: true,
                _count: {
                  select: {
                    users: true,
                  },
                },
              },
            },
          },
        },
      },
    };

    const user = await prisma.user.findFirst(query);

    if (!user) {
      return Result.err(new Error('User does not exist'));
    }
    return Result.ok(user);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return Result.err(error);
    }
    return Result.err(new Error(`Unknown error: ${error}`));
  }
};

export const getUserWithProjects = async (
  id: string
): Promise<Result<User | null, Error>> => {
  try {
    const query = {
      where: { id: id },
      include: {
        worksAt: {
          select: {
            team: {
              select: {
                id: true,
                projects: {
                  where: { active: true },
                  select: {
                    id: true,
                    name: true,
                    tasks: true,
                  },
                },
              },
            },
          },
        },
      },
    };

    const user = await prisma.user.findFirst(query);

    if (!user) {
      return Result.err(new Error('User does not exist'));
    }
    return Result.ok(user);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return Result.err(error);
    }
    return Result.err(new Error(`Unknown error: ${error}`));
  }
};

export const getUserWithAll = async (
  id: string
): Promise<Result<User | null, Error>> => {
  try {
    const query = {
      where: { id: id },
      include: {
        worksAt: {
          select: {
            team: {
              select: {
                id: true,
                name: true,
                projects: {
                  where: { active: true },
                  select: {
                    id: true,
                    name: true,
                    _count: {
                      select: {
                        tasks: {
                          where: { active: true },
                        },
                      }
                    }
                  },
                },
              },
            },
          },
        },
        assignedTo: {
          where: {
            active: true,
          },
          include: {
            user: true,
            workHistory: true,
          }
        },
      },
    };

    const userWithAll = await prisma.user.findFirst(query);

    if (!userWithAll) {
      return Result.err(new Error('User does not exist'));
    }
    return Result.ok(userWithAll);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return Result.err(error);
    }
    return Result.err(new Error(`Unknown error: ${error}`));
  }
};
