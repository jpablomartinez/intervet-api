import { Router } from 'express';
import AuthMiddleware from '../../infrastructure/middleware/auth_middleware';
import WorkingHourController from './controller';

const router: Router = Router();

router.post('/', AuthMiddleware.VeterinaryAllAccess, WorkingHourController.create);
router.patch('/:vet_id', AuthMiddleware.VeterinaryAllAccess, WorkingHourController.update);
router.delete('/:vet_id', AuthMiddleware.VeterinaryAllAccess, WorkingHourController.delete);

export default router;
