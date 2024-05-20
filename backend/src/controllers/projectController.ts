import { resultOk, resultError } from '../middleware/resultHandler';
import { validation } from '../middleware/validation';
import { Router } from 'express';
import { MessageCreateSchema, ProjectCreateNewSchema, ProjectEditSchema } from '../models';
import { projectsRepository } from '../repository';
import multer from 'multer';
import path from 'path';
import { unlink } from 'fs/promises';

const projectRouter = Router();

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, __dirname + '/../../public/projectFiles')
  },
  filename: function (req, file, callback) {
    callback(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

projectRouter.get('/:projectId', async (req, res) => {
  const projectId = req.params.projectId;
  const project = await projectsRepository.getSingleById(projectId);

  if (project.isErr) {
    return resultError(500, res, project.error.message);
  }

  if (project.value === null) {
    return resultError(404, res, `Project with ID ${projectId} doesn't exist`);
  }

  return resultOk(project.value, res, `Listed project with id ${projectId}`);
});

projectRouter.post('/new',
  validation({ body: ProjectCreateNewSchema }),
  async (req, res) => {
    if (!req.session.user) {
      return resultError(401, res, 'Unauthorized');
    }
    const project = await projectsRepository.createSingle({
      name: req.body.name,
      teamId: req.body.teamId,
      description: req.body.description,
      budget: req.body.budget,
      deadline: req.body.deadline,
    });
    if (project.isErr) {
      return resultError(500, res, project.error.message);
    }
    return resultOk(project.value, res, `Created team with id: ${project.value?.id}`);
  }
);

projectRouter.post('/:projectId/edit',
  validation({ body: ProjectEditSchema }),
  async (req, res) => {
    if (!req.session.user) {
      return resultError(401, res, 'Unauthorized');
    }

    const project = await projectsRepository.editSingle({
      id: req.body.id,
      name: req.body.name,
      description: req.body.description,
      budget: req.body.budget,
      deadline: req.body.deadline,
      active: req.body.active,
    });

    if (project.isErr) {
      return resultError(500, res, project.error.message);
    }
    
    return resultOk(project.value, res, `Edited project with id: ${project.value?.id}`);
  }
);

projectRouter.post('/files/new',
  upload.array('files'),
  async (req, res) => {
    if (!req.session.user) {
      return resultError(401, res, 'Unauthorized');
    }

    let filesArray: Express.Multer.File[] = [];
    if (req.files) {
      
      if(Array.isArray(req.files)) {
        filesArray = req.files;
      } else {
        filesArray = Object.values(req.files).flat();
      }
    }
    const files = await projectsRepository.createMultipleFiles(req.body.projectId, filesArray);

    
    if (files.isOk) {
      const project = await projectsRepository.getSingleById(req.body.projectId);

      if (project.isErr) {
        return resultError(500, res, project.error.message);
      }
      return resultOk(project.value, res, `Added ${files.value} files to the project.`);
    }

    if (files.isErr) {
      return resultError(500, res, files.error.message);
    }
    
    return resultOk(files, res, `Added files to the project.`);
  }
);

projectRouter.get('/files/delete/:fileId/', async (req, res) => {
  const fileId = req.params.fileId;

  if (!req.session.user) {
    return resultError(401, res, 'Unauthorized');
  }

  const file = await projectsRepository.deleteFile(fileId);

  if(file.isOk && file.value) {
    try {
      await unlink(`${__dirname}/../../public/projectFiles/${file.value.fileName}`);
    } catch (e) {
      console.error('there was an error deleting the file');
    }
  

  }

  if (file.isErr) {
    return resultError(500, res, file.error.message);
  }

  if (file.value === null) {
    return resultError(404, res, `file with ID ${fileId} doesn't exist`);
  }

  return resultOk(file.value, res, `Deleted taskWork with id ${fileId}`);
});

projectRouter.post('/messages/new',
  validation({ body: MessageCreateSchema }),
  async (req, res) => {
    if (!req.session.user) {
      return resultError(401, res, 'Unauthorized');
    }
    const message = await projectsRepository.createMessage(req.session.user.id, {
      projectId: req.body.projectId,
      content: req.body.content,
    });
    if (message.isErr) {
      return resultError(500, res, message.error.message);
    }
    return resultOk(message.value, res, `Created message with id: ${message.value?.id}`);
  }
);

export default projectRouter;