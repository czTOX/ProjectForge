import { Prisma } from '@prisma/client';
import { Result } from '@badrap/result';
import { Task, TaskCreate } from '../models';
import prisma from '../client';

export const createSingle = async (
  data: TaskCreate
): Promise<Result<Task | null, Error>> => {
  try {
    const task = await prisma.task.create({
      data: data,
      include: {
        workHistory: {},
      },
    });
    return Result.ok(task);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return Result.err(error);
    }
    return Result.err(new Error(`Unknown error: ${error}`));
  }
};