import { Router } from 'express';
import AuthMiddleware from '../../infrastructure/middleware/auth_middleware';
import AboutVetController from './controller';

const router:Router = Router();

router.patch('/', AuthMiddleware.VeterinaryAllAccess, AboutVetController.modify);

export default router;