import { resultOk, resultError } from '../middleware/resultHandler';
import { UserRegisterSchema, UserLoginSchema } from '../models';
import { validation } from '../middleware/validation';
import { usersRepository } from '../repository';
import { verify, hash } from 'argon2';
import { Router } from 'express';

const userRouter = Router();

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
    const user = await usersRepository.createSingle({
      ...req.body,
      hashedPassword: passwordHash,
    });
    if (user.isErr) {
      return resultError(500, res, user.error.message);
    }
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

userRouter.post('/logout', async (req, res) => {
  req.session.destroy(() => {});
  return resultOk('', res, `Logged out`);
});

export default userRouter;