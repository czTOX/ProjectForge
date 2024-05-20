import { Prisma } from '@prisma/client';
import { Result } from '@badrap/result';
import { NewRole, PermissionLevel, Team, TeamCreate, TeamEdit, TeamJoinCreate, TeamMembers, WorksAt } from '../models';
import prisma from '../client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export const createSingle = async (
  data: TeamCreate
): Promise<Result<Team | null, Error>> => {
  try {
    const team = await prisma.team.create({
      data: {
        name: data.name,
        users: {
          create: {
            role: 'Admin',
            permissionLevel: 3,
            user: {
              connect: {
                id: data.userId,
              },
            }
          },
        },
      },
      include: {
        users: true,
        projects: true,
      },
    });

    return Result.ok(team);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return Result.err(error);
    }
    return Result.err(new Error(`Unknown error: ${error}`));
  }
};

export const getUserRoleLevel = async (
  teamId: string,
  userId: string,
): Promise<Result<PermissionLevel | null, Error>> => {
  try {
    const permissionLevel = await prisma.worksAt.findFirst({
      where: {
        userId: userId,
        teamId: teamId,
      },
      select: {
        permissionLevel: true,
      },
    });

    return Result.ok(permissionLevel);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return Result.err(error);
    }
    return Result.err(new Error(`Unknown error: ${error}`));
  }
};

export const getSingleById = async (
  id: string,
): Promise<Result<Team | null, Error>> => {
  try {

    const team = await prisma.team.findUnique({
      where: { id: id },
      select: {
        id: true,
        name: true,
        inviteCode: true,
        projects: {
          orderBy: { active: 'desc' },
          include: {
            tasks: true,
          }
        },
        users: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                profilePic: true,
              }
            }
          },
        },
      },
    });

    return Result.ok(team);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return Result.err(error);
    }
    return Result.err(new Error(`Unknown error: ${error}`));
  }
};

export const getMembers = async (
  id: string,
): Promise<Result<TeamMembers | null, Error>> => {
  try {

    const team = await prisma.team.findUnique({
      where: { id: id },
      select: {
        id: true,
        users: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                profilePic: true,
              }
            }
          },
        },
      },
    });

    return Result.ok(team);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return Result.err(error);
    }
    return Result.err(new Error(`Unknown error: ${error}`));
  }
};

export const joinTeam = async (
  data: TeamJoinCreate
): Promise<Result<WorksAt | null, Error>> => {
  try {
    const team = await prisma.team.findFirst({
      where: {inviteCode: data.inviteCode},
      select: {
        id: true,
      }
    });

    if (!team) {
      return Result.err(new Error('Team with this invite code does not exist'));
    }

    const res = await prisma.worksAt.create({
      data: {
        userId: data.userId,
        teamId: team?.id,
      },
      include: {
        team: {
          include: {
            users: true,
            projects: true,
          }
        },
      },
    });

    return Result.ok(res);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return Result.err(error);
    }
    return Result.err(new Error(`Unknown error: ${error}`));
  }
};

export const editSingle = async (
  data: TeamEdit
): Promise<Result<Team | null, Error>> => {
  try {
    const team = await prisma.team.update({
      where: {
        id: data.id
      },
      data: {
        name: data.name
      },
      include: {
        users: true,
        projects: true,
      }
    });

    return Result.ok(team);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return Result.err(error);
    }
    return Result.err(new Error(`Unknown error: ${error}`));
  }
};

export const editRole = async (
  data: NewRole
): Promise<Result<WorksAt | null, Error>> => {
  try {
    const work = await prisma.worksAt.update({
      where: { id: data.workId },
      data: {
        role: data.role,
        permissionLevel: Number(data.permissionLevel),
      },
      include: {
        user: true,
      }
    });

    return Result.ok(work);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return Result.err(error);
    }
    return Result.err(new Error(`Unknown error: ${error}`));
  }
};