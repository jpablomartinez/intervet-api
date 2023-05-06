import { Router } from 'express';
import AuthMiddleware from '../../infrastructure/middleware/auth_middleware';
import AdminController from './controller';

const router: Router = Router();

router.post('/', AuthMiddleware.PetOwnerAccess, AdminController.create);
router.get('/pet-owner', AuthMiddleware.AdminAccess, AdminController.getPetOwner);
router.get('/vet', AuthMiddleware.AdminAccess, AdminController.getVets);
router.patch('update-state', AuthMiddleware.AdminAccess, AdminController.changeUserStatus);

export default router;