import { Prisma } from '@prisma/client';
import { Result } from '@badrap/result';
import { AssignTask, Task, TaskCheck, TaskCreate, TaskEdit, Taskwork, TaskworkCreate } from '../models';
import prisma from '../client';

export const getSingleById = async (
  id: string,
): Promise<Result<Task | null, Error>> => {
  try {
    const task = await prisma.task.findUnique({
      where: { id: id },
      include: {
        project: {
          include: {
            team: {
              select: {
                id: true,
                users: {
                  select: {
                    user: true,
                  }
                }
              }
            }
          }
        },
        workHistory: {
          orderBy: { createdAt: 'desc' },
          include: {
            user: true,
          }
        },
        user: true,
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

export const createSingle = async (
  data: TaskCreate
): Promise<Result<Task | null, Error>> => {
  try {
    const task = await prisma.task.create({
      data: data,
      include: {
        workHistory: true,
        user: true,
        project: true,
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

export const checkedTask = async (
  data: TaskCheck
): Promise<Result<Task | null, Error>> => {
  try {
    const task = await prisma.task.update({
      where: {
        id: data.taskId,
      },
      data: {
        active: data.active,
      },
      include: {
        workHistory: true,
        user: true,
        project: true
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

export const editSingle = async (
  data: TaskEdit
): Promise<Result<Task | null, Error>> => {
  try {
    const task = await prisma.task.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        description: data.description,
        deadline: data.deadline,
        userId: data.userId,
        active: data.active,
      },
      include: {
        workHistory: true,
        user: true,
        project: true,
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

//TaskWork

export const createTaskWork = async (
  userId: string,
  data: TaskworkCreate
): Promise<Result<Taskwork | null, Error>> => {
  try {
    const taskWork = await prisma.taskWork.create({
      data: {
        secondsSpent: data.secondsSpent,
        user: {
          connect: { id: userId }
        },
        task: {
          connect: { id: data.taskId }
        }
      },
      include: {
        user: true,
      }
    });
    return Result.ok(taskWork);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return Result.err(error);
    }
    return Result.err(new Error(`Unknown error: ${error}`));
  }
};

export const deleteTaskWork = async (
  id: string,
): Promise<Result<Taskwork | null, Error>> => {
  try {
    const taskWork = await prisma.taskWork.delete({
      where: {
        id: id,
      },
      include: {
        task: true,
      }
    });
    return Result.ok(taskWork);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return Result.err(error);
    }
    return Result.err(new Error(`Unknown error: ${error}`));
  }
};

//assign

export const assignTask = async (
  data: AssignTask
): Promise<Result<Task | null, Error>> => {
  try {
    const task = await prisma.task.update({
      where: {
        id: data.taskId,
      },
      data: {
        user: {
          connect: {
            id: data.userId,
          }
        }
      },
      include: {
        workHistory: true,
        user: true,
        project: true,
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