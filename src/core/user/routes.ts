import { Router } from 'express';
import AuthMiddleware from '../../infrastructure/middleware/auth_middleware';
import UserController from './controller';

const router: Router = Router();

router.post('/', UserController.create);
router.get('/', UserController.getByParams);
router.get('/:id', AuthMiddleware.AdminAccess, UserController.getUserById);
router.patch('/:id', AuthMiddleware.PetOwnerAccess, UserController.updateUser);

export default router;
