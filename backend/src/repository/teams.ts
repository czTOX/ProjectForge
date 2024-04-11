import { Prisma } from '@prisma/client';
import { Result } from '@badrap/result';
import { Team, TeamCreate } from '../models';
import prisma from '../client';

export const createSingle = async (
  data: TeamCreate
): Promise<Result<Team | null, Error>> => {
  try {
    const team = await prisma.team.create({
      data: data,
      select: {
        id: true,
        name: true,
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