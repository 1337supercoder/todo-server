import { Router } from 'express';
import todo from './todo';

const routes = Router();

routes.use('/todo', todo);

export default routes;
