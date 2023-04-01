import { Router } from 'express';
import AuthMiddleware from '../../infrastructure/middleware/auth_middleware';
import AttentionAreasController from './controller';

const router: Router = Router();

router.post(
  '/:vet_id',
  AuthMiddleware.VeterinaryAllAccess,
  AttentionAreasController.create
);
router.get(
  '/',
  AuthMiddleware.AdminAccess,
  AttentionAreasController.getAttentionAreasByVet
);
router.patch(
  '/:vet_id/:attention_area_id',
  AuthMiddleware.VeterinaryAllAccess,
  AttentionAreasController.updateAttentionArea
);
router.delete(
  '/:vet_id/:attention_area_id',
  AuthMiddleware.VeterinaryAllAccess,
  AttentionAreasController.deleteAttentionArea
);
export default router;
