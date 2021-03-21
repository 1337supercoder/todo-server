import { Router } from 'express';
import task from './task';
import user from './user';
import auth from './auth';

const routes = Router();

routes.use('/task', task);
routes.use('/user', user);
routes.use('/auth', auth);

export default routes;
