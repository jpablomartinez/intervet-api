import { Router } from 'express';
import AuthMiddleware from '../../infrastructure/middleware/auth_middleware';
import SpecialityController from './controller';

const router: Router = Router();

router.post('/', AuthMiddleware.AdminAccess, SpecialityController.create);
router.get(
  '/',
  AuthMiddleware.VeterinaryAllAccess,
  SpecialityController.getAll
);
router.patch(
  '/',
  AuthMiddleware.VeterinaryAllAccess,
  SpecialityController.update
);
router.delete('/:speciality_id', SpecialityController.delete);

export default router;
