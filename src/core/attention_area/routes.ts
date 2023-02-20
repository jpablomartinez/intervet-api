import { Router } from 'express';
import AttentionAreasController from './controller';

const router: Router = Router();

router.post('/:vet_id', AttentionAreasController.create);
router.get('/', AttentionAreasController.getAttentionAreasByVet);
router.patch(
  '/:vet_id/:attention_area_id',
  AttentionAreasController.updateAttentionArea
);
router.delete(
  '/:vet_id/:attention_area_id',
  AttentionAreasController.deleteAttentionArea
);
export default router;
