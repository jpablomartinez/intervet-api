import { Router } from 'express';
import AuthMiddleware from '../../infrastructure/middleware/auth_middleware';
import SpecialityController from './controller';

const router: Router = Router();

router.post('/', AuthMiddleware.AdminAccess, SpecialityController.create);
router.get(
  '/',
  AuthMiddleware.AllAccess,
  SpecialityController.getAll
);
router.patch(
  '/',
  AuthMiddleware.AdminAccess,
  SpecialityController.update
);
router.delete('/:speciality_id', AuthMiddleware.AdminAccess, SpecialityController.delete);

export default router;
