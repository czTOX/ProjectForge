import { Prisma } from '@prisma/client';
import { Result } from '@badrap/result';
import { Taskwork, TaskworkCreate } from '../models';
import prisma from '../client';

export const createSingle = async (
  data: TaskworkCreate
): Promise<Result<Taskwork | null, Error>> => {
  try {
    const taskWork = await prisma.taskWork.create({
      data: data,
    });
    return Result.ok(taskWork);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return Result.err(error);
    }
    return Result.err(new Error(`Unknown error: ${error}`));
  }
};