import { Router } from 'express';
import VetServiceController from './controller';

const router: Router = Router();

router.post('/', VetServiceController.create);
router.get('/', VetServiceController.getAll);
router.get('/vet/:vet_id', VetServiceController.getVetServicesByVetId);
router.patch('/', VetServiceController.update);
router.delete('/:vet_service_id', VetServiceController.delete);

export default router;