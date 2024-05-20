import { resultOk, resultError } from '../middleware/resultHandler';
import { UserRegisterSchema, UserLoginSchema, UserEditSchema } from '../models';
import { validation } from '../middleware/validation';
import { usersRepository } from '../repository';
import { verify, hash } from 'argon2';
import { Router } from 'express';
import multer from 'multer';
import path from 'path';

const userRouter = Router();

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, __dirname + '/../../public/profilePics')
  },
  filename: function (req, file, callback) {
    callback(
      null,
      file.fieldname + '-' + req.session.user?.id + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

userRouter.get('/', async (req, res) => {
  if (!req.session.user) {
    return resultError(401, res, 'Unauthorized');
  }
  const user = await usersRepository.getSingleByEmail(req.session.user.email!);
  if (user.isErr) {
    return resultError(500, res, user.error.message);
  }
  return resultOk(user.value, res, `Logged with id: ${user.value?.id}`);
});

userRouter.post(
  '/register',
  validation({ body: UserRegisterSchema }),
  async (req, res) => {
    const passwordHash = await hash(req.body.hashedPassword);

    const existingUser = await usersRepository.getSingleByEmail(req.body.email);

    if (existingUser.isOk) {
      return resultError(409, res, "Email already taken");
    }

    const user = await usersRepository.createSingle({
      ...req.body,
      hashedPassword: passwordHash,
    });
    if (user.isErr) {
      return resultError(500, res, user.error.message);
    }

    const userData = {
      id: user.value!.id,
      firstName: user.value!.firstName,
      lastName: user.value!.lastName,
      email: user.value!.email,
    };

    req.session.user = userData;
    return resultOk(user.value, res, `Created user with id: ${user.value?.id}`);
  }
);

userRouter.post(
  '/login',
  validation({ body: UserLoginSchema }),
  async (req, res) => {
    const user = await usersRepository.getSingleByEmailAuth(req.body.email);
    if (user.isErr) {
      return resultError(500, res, user.error.message);
    }

    const verification = await verify(
      user.value!.hashedPassword,
      req.body.hashedPassword
    );

    if (!verification) {
      return resultError(401, res, 'Wrong password');
    }

    const userData = {
      id: user.value!.id,
      firstName: user.value!.firstName,
      lastName: user.value!.lastName,
      email: user.value!.email,
    };

    req.session.user = userData;
    return resultOk(userData, res, `Logged with id: ${user.value?.id}`);
  }
);

userRouter.post(
  '/edit',
  upload.single('profilePic'),
  async (req, res) => {
    const user = await usersRepository.editSingle(
      req.session.user?.id || '',
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        profilePicName: req.file?.filename,
      }
    );
    if (user.isErr) {
      return resultError(500, res, user.error.message);
    }
    return resultOk(user, res, `Edited user with id: ${user.value?.id}`);
  }
);

userRouter.post('/logout', async (req, res) => {
  req.session.destroy(() => {});
  return resultOk('', res, `Logged out`);
});

userRouter.get('/teams', async (req, res) => {
  const userId = req.session.user?.id;
  if (userId == undefined) {
    return resultError(500, res, 'Server login problem');
  }
  const user = await usersRepository.getUserWithTeams(userId);
  if (user.isErr) {
    return resultError(500, res, user.error.message);
  }

  return resultOk(user.value, res, `Listed teams for user with ID: ${userId}`);
});

userRouter.get('/projects', async (req, res) => {
  const userId = req.session.user?.id;
  if (userId == undefined) {
    return resultError(500, res, 'Server login problem');
  }
  const user = await usersRepository.getUserWithProjects(userId);
  if (user.isErr) {
    return resultError(500, res, user.error.message);
  }

  return resultOk(user.value, res, `Listed active projects for user with ID: ${userId}`);
});

userRouter.get('/all', async (req, res) => {
  const userId = req.session.user?.id;
  if (userId == undefined) {
    return resultError(500, res, 'Server login problem');
  }
  const user = await usersRepository.getUserWithAll(userId);
  if (user.isErr) {
    return resultError(500, res, user.error.message);
  }
  
  return resultOk(user.value, res, `Listed user's info for user with ID: ${userId}`);
});

export default userRouter;