import { Router } from 'express';
import TaskController from '../controller/Task';

const router = Router();

router.post('/', [], TaskController.newTask);
router.patch('/:id([0-9]+)', [], TaskController.editTask);
router.delete('/:id([0-9]+)', [], TaskController.deleteOneById);
router.get('/', [], TaskController.getAll);
router.get('/:id([0-9]+)', [], TaskController.getOneById);

export default router;
