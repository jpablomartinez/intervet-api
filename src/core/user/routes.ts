import { Router } from 'express';
import UserController from './controller';

const router: Router = Router();

router.post('/', UserController.create);
router.get('/', UserController.getByParams);
router.get('/:id', UserController.getUserById);
router.patch('/:id', UserController.updateUser);

export default router;
