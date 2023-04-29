import { Router } from 'express';
import AuthMiddleware from '../../infrastructure/middleware/auth_middleware';
import CreditCardController from './controller';

const router: Router = Router();

router.post('/', AuthMiddleware.PetOwnerAccess, CreditCardController.create);
router.get('/:user_id', AuthMiddleware.PetOwnerAccess, CreditCardController.getCCBasicInfo);
router.delete('/', AuthMiddleware.PetOwnerAccess, CreditCardController.delete);

export default router;