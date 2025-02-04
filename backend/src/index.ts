import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { userController, projectController, teamController, taskController } from './controllers';
import { User } from './models';
import cookieParser from 'cookie-parser';
import session from './middleware/session';

declare module 'express-session' {
  interface SessionData {
    user: User;
  }
}

dotenv.config();
const api = express();
const port = process.env.BACKEND_PORT ?? 4000;

api.use(express.json());
api.use(session());
api.use(cookieParser());
api.use(cors({ credentials: true, origin: 'http://localhost:4242' }));
api.use(express.static('public'));

api.use('/users', userController);
api.use('/projects', projectController);
api.use('/teams', teamController);
api.use('/tasks', taskController);

api.listen(port, () => console.log(`Listening on port ${port}`));