import { Router } from 'express';
import UserController from '../controller/User';
import checkJwt from '../middleware/checkJwt';

const router = Router();

router.get('/', [checkJwt], UserController.getMe);

export default router;
