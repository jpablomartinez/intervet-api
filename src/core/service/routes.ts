import { Router } from 'express';
import AuthMiddleware from '../../infrastructure/middleware/auth_middleware';
import ServiceController from './controller';

const router: Router = Router();

router.post('/', AuthMiddleware.AdminAccess, ServiceController.create);
router.get('/', AuthMiddleware.AllAccess, ServiceController.getAll);
router.patch('/', AuthMiddleware.AdminAccess, ServiceController.update);
router.delete('/:service_id', AuthMiddleware.AdminAccess, ServiceController.delete);

export default router;
