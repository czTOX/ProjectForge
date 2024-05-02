import { Prisma } from '@prisma/client';
import { Result } from '@badrap/result';
import { Message, MessageCreate } from '../models';
import prisma from '../client';

export const createSingle = async (
  data: MessageCreate
): Promise<Result<Message | null, Error>> => {
  try {
    const message = await prisma.message.create({
      data: data,
    });
    return Result.ok(message);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return Result.err(error);
    }
    return Result.err(new Error(`Unknown error: ${error}`));
  }
};