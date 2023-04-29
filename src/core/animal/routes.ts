import { Router } from 'express';
import AuthMiddleware from '../../infrastructure/middleware/auth_middleware';
import AnimalController from './controller';

const router: Router = Router();

router.post('/', AuthMiddleware.AdminAccess, AnimalController.create);
router.get('/', AuthMiddleware.AllAccess, AnimalController.getAll);
router.patch('/animal_id', AuthMiddleware.AdminAccess, AnimalController.modify);
router.delete('/animal_id', AuthMiddleware.AdminAccess, AnimalController.delete);

export default router;