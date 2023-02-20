import { Router } from 'express';
import VetHistoryController from './controller';

const router: Router = Router();

router.post('/:vet_id', VetHistoryController.create);
router.get('/:vet_history_id', VetHistoryController.getVetHistoryById);
router.patch('/:vet_history_id', VetHistoryController.updateVetHistory);
export default router;
