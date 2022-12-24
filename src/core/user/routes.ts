import { Router } from 'express';
import UserController from './controller';

const router: Router = Router();

router.post('/', UserController.create);

export default router;
