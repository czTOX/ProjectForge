import { Prisma } from '@prisma/client';
import { Result } from '@badrap/result';
import { Project, ProjectCreateNew, ProjectEdit, ProjectFile } from '../models';
import prisma from '../client';
import { Message, MessageCreate } from '../models/message';

export const createSingle = async (
  data: ProjectCreateNew
): Promise<Result<Project | null, Error>> => {
  try {
    const project = await prisma.project.create({
      data: {
        name: data.name,
        description: data.description,
        budget: data.budget,
        deadline: data.deadline,
        team: {
          connect: {
            id: data.teamId,
          }
        }
      },
      include: {
        tasks: {},
        messages: {},
        files: {},
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

export const getSingleById = async (
  id: string,
): Promise<Result<Project | null, Error>> => {
  try {

    const project = await prisma.project.findUnique({
      where: { id: id },
      include: {
        team: {
          select: {
            id: true,
            name: true,
          },
        },
        tasks: {
          orderBy: [{ active: 'desc' }, { updatedAt: 'desc' }],
          include: {
            workHistory: true,
            user: true,
          }
        },
        messages: {
          include: {
            author: true,
          }
        },
        files: true,
      },
    });

    return Result.ok(project);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return Result.err(error);
    }
    return Result.err(new Error(`Unknown error: ${error}`));
  }
};

export const editSingle = async (
  data: ProjectEdit
): Promise<Result<Project | null, Error>> => {
  try {
    const project = await prisma.project.update({
      where: {
        id: data.id,
      },
      data: data,
      include: {
        tasks: true,
        messages: true,
        files: true,
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

export const createMultipleFiles = async (
  projectId: string,
  data: Express.Multer.File[]
): Promise<Result<Number | null, Error>> => {
  try {
    const files = await prisma.file.createMany({
      data: data.map((file) => ({
        originalName: file.originalname,
        fileName: file.filename,
        size: file.size,
        type: file.mimetype,
        projectId: projectId,
      }))
    });

    return Result.ok(files.count);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return Result.err(error);
    }
    return Result.err(new Error(`Unknown error: ${error}`));
  }
};

export const deleteFile = async (
  id: string,
): Promise<Result<ProjectFile | null, Error>> => {
  try {
    const file = await prisma.file.delete({
      where: { id: id}
    });
    return Result.ok(file);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return Result.err(error);
    }
    return Result.err(new Error(`Unknown error: ${error}`));
  }
};

export const createMessage = async (
  authorId: string,
  data: MessageCreate
): Promise<Result<Message | null, Error>> => {
  try {
    const message = await prisma.message.create({
      data: {
        content: data.content,
        author: {
          connect: { id: authorId }
        },
        project: {
          connect: { id: data.projectId }
        }
      },
      include: {
        author: true,
      }
    });
    return Result.ok(message);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return Result.err(error);
    }
    return Result.err(new Error(`Unknown error: ${error}`));
  }
};