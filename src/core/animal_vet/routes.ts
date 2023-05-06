import { Router } from 'express';
import AuthMiddleware from '../../infrastructure/middleware/auth_middleware';
import AnimalVetController from './controller';

const router: Router = Router();

router.post('/:vet_id', AuthMiddleware.VeterinaryAllAccess, AnimalVetController.create);
router.patch('/:vet_id', AuthMiddleware.VeterinaryAllAccess, AnimalVetController.delete);

export default router;