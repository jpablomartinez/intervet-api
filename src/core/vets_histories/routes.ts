import { Router } from 'express';
import AuthMiddleware from '../../infrastructure/middleware/auth_middleware';
import VetHistoryController from './controller';

const router: Router = Router();

router.post('/:vet_id', AuthMiddleware.VeterinaryAllAccess, VetHistoryController.create);
router.get('/:vet_history_id', AuthMiddleware.PublicAccessOwnerAdmin, VetHistoryController.getVetHistoryById);
router.patch('/:vet_history_id', AuthMiddleware.VeterinaryAllAccess, VetHistoryController.updateVetHistory);
export default router;
