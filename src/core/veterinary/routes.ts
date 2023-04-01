import { Router } from 'express';
import AuthMiddleware from '../../infrastructure/middleware/auth_middleware';
import VetController from './controller';

const router: Router = Router();

router.post('/', VetController.create);
router.get('/vets', AuthMiddleware.PetOwnerAccess, VetController.getVets);
export default router;
