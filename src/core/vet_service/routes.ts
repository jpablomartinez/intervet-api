import { Router } from 'express';
import AuthMiddleware from '../../infrastructure/middleware/auth_middleware';
import VetServiceController from './controller';

const router: Router = Router();

router.post(
  '/',
  AuthMiddleware.VeterinaryAllAccess,
  VetServiceController.create
);
router.get('/', AuthMiddleware.PublicAccessOwnerAdmin, VetServiceController.getAll);
router.get('/vet/:vet_id', AuthMiddleware.PublicAccessOwnerAdmin, VetServiceController.getVetServicesByVetId);
router.patch('/', AuthMiddleware.VeterinaryAllAccess, VetServiceController.update);
router.delete('/:vet_service_id', AuthMiddleware.VeterinaryAllAccess, VetServiceController.delete);

export default router;
