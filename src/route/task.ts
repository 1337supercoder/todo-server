import { Router } from 'express';
import TaskController from '../controller/Task';
import checkJwt from '../middleware/checkJwt';

const router = Router();

router.post('/', [checkJwt], TaskController.newTask);
router.patch('/:id([0-9]+)', [checkJwt], TaskController.editTask);
router.delete('/:id([0-9]+)', [checkJwt], TaskController.deleteOneById);
router.get('/', [checkJwt], TaskController.getAll);
router.get('/:id([0-9]+)', [checkJwt], TaskController.getOneById);

export default router;
