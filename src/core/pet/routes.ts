import { Router } from 'express';
import AuthMiddleware from '../../infrastructure/middleware/auth_middleware';
import PetController from './controller';

const router: Router = Router();

router.post('/', AuthMiddleware.PetOwnerAccess, PetController.create);
router.get('/:user_id', AuthMiddleware.PetOwnerAccess, PetController.getAllByUserId);
router.patch('/:pet_id', AuthMiddleware.PetOwnerAccess, PetController.modify);
router.delete('/:pet_id', AuthMiddleware.PetOwnerAccess, PetController.delete);

export default router;