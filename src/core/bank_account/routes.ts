import { Router } from 'express';
import AuthMiddleware  from '../../infrastructure/middleware/auth_middleware';
import BankAccountController from './controller';

const router: Router = Router();

router.post('/', AuthMiddleware.PetOwnerAccess, BankAccountController.create);
router.get('/:user_id', AuthMiddleware.PetOwnerAccess, BankAccountController.getByUserId);
router.patch('/:bank_account_id', AuthMiddleware.PetOwnerAccess, BankAccountController.modify);
router.delete('/:bank_account_id', AuthMiddleware.PetOwnerAccess, BankAccountController.delete);

export default router;
