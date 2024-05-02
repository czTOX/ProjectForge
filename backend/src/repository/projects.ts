import { Prisma } from '@prisma/client';
import { Result } from '@badrap/result';
import { Project, ProjectCreate } from '../models';
import prisma from '../client';

export const createSingle = async (
  data: ProjectCreate
): Promise<Result<Project | null, Error>> => {
  try {
    const project = await prisma.project.create({
      data: data,
      include: {
        tasks: {},
        messages: {},
      }
    });
    return Result.ok(project);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return Result.err(error);
    }
    return Result.err(new Error(`Unknown error: ${error}`));
  }
};