import { Router } from 'express';
import WorkingHourController from './controller';

const router: Router = Router();

router.post('/', WorkingHourController.create);
router.patch('/:vet_id', WorkingHourController.update);
router.delete('/:vet_id', WorkingHourController.delete);

export default router;
