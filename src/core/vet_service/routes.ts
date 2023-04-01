import { Router } from 'express';
import AuthMiddleware from '../../infrastructure/middleware/auth_middleware';
import VetServiceController from './controller';

const router: Router = Router();

router.post(
  '/',
  AuthMiddleware.VeterinaryAllAccess,
  VetServiceController.create
);
router.get('/', VetServiceController.getAll);
router.get('/vet/:vet_id', VetServiceController.getVetServicesByVetId);
router.patch('/', VetServiceController.update);
router.delete('/:vet_service_id', VetServiceController.delete);

export default router;
