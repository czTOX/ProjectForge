import { resultOk, resultError } from '../middleware/resultHandler';
import { validation } from '../middleware/validation';
import { Router } from 'express';
import { AssignTaskSchema, TaskCheckSchema, TaskCreateSchema, TaskEditSchema, TaskworkCreateSchema, TaskworkDeleteSchema } from '../models';
import { tasksRepository } from '../repository';

const taskRouter = Router();

taskRouter.get('/:taskId', async (req, res) => {
  const taskId = req.params.taskId;
  const task = await tasksRepository.getSingleById(taskId);

  if (task.isErr) {
    return resultError(500, res, task.error.message);
  }

  if (task.value === null) {
    return resultError(404, res, `Task with ID ${taskId} doesn't exist`);
  }

  return resultOk(task.value, res, `Listed task with id ${taskId}`);
});

taskRouter.post('/new',
  validation({ body: TaskCreateSchema }),
  async (req, res) => {
    if (!req.session.user) {
      return resultError(401, res, 'Unauthorized');
    }

    const task = await tasksRepository.createSingle({
      projectId: req.body.projectId,
      name: req.body.name,
      description: req.body.description,
      deadline: req.body.deadline,
    });
    if (task.isErr) {
      return resultError(500, res, task.error.message);
    }
    return resultOk(task.value, res, `Created task with id: ${task.value?.id}`);
  }
);

taskRouter.post('/done',
  validation({ body: TaskCheckSchema }),
  async (req, res) => {
    if (!req.session.user) {
      return resultError(401, res, 'Unauthorized');
    }

    const task = await tasksRepository.checkedTask(req.body);
    
    if (task.isErr) {
      return resultError(500, res, task.error.message);
    }
    return resultOk(task.value, res, `Created task with id: ${task.value?.id}`);
  }
);

taskRouter.post('/edit',
  validation({ body: TaskEditSchema }),
  async (req, res) => {
    if (!req.session.user) {
      return resultError(401, res, 'Unauthorized');
    }

    const task = await tasksRepository.editSingle(req.body);
    
    if (task.isErr) {
      return resultError(500, res, task.error.message);
    }
    return resultOk(task.value, res, `Edited task with id: ${task.value?.id}`);
  }
);

// TaskWork

taskRouter.post('/newTaskWork',
  validation({ body: TaskworkCreateSchema }),
  async (req, res) => {
    if (!req.session.user) {
      return resultError(401, res, 'Unauthorized');
    }

    const taskWork = await tasksRepository.createTaskWork(req.session.user.id, req.body);
    
    if (taskWork.isErr) {
      return resultError(500, res, taskWork.error.message);
    }
    return resultOk(taskWork.value, res, `Edited task with id: ${taskWork.value?.id}`);
  }
);

taskRouter.get('/:taskWorkId/deleteTaskWork', async (req, res) => {
  const taskWorkId = req.params.taskWorkId;

  if (!req.session.user) {
    return resultError(401, res, 'Unauthorized');
  }

  const taskWork = await tasksRepository.deleteTaskWork(taskWorkId);

  if (taskWork.isErr) {
    return resultError(500, res, taskWork.error.message);
  }

  if (taskWork.value === null) {
    return resultError(404, res, `taskWork with ID ${taskWorkId} doesn't exist`);
  }

  return resultOk(taskWork.value, res, `Deleted taskWork with id ${taskWorkId}`);
});

//Assign

taskRouter.post('/assign',
  validation({ body: AssignTaskSchema }),
  async (req, res) => {
    if (!req.session.user) {
      return resultError(401, res, 'Unauthorized');
    }

    const task = await tasksRepository.assignTask(req.body);
    
    if (task.isErr) {
      return resultError(500, res, task.error.message);
    }
    return resultOk(task.value, res, `Edited task with id: ${task.value?.id}`);
  }
);

export default taskRouter;