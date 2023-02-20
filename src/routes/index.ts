import { Router } from 'express';
import UserRoutes from '../core/user/routes';
import VetRoutes from '../core/veterinary/routes';
import VetHistoryRoutes from '../core/vets_histories/routes';
import WorkingHourRoutes from '../core/working_hours/routes';
import AttentionAreaRoutes from '../core/attention_area/routes';

const router: Router = Router();

router.get('/', (req, res, next) => {
  res.json({
    api: 'Intervet API',
    version: 'v1'
  });
});

router.use('/user', UserRoutes);
router.use('/vet', VetRoutes);
router.use('/vet_history', VetHistoryRoutes);
router.use('/working_hours', WorkingHourRoutes);
router.use('/attention_area', AttentionAreaRoutes);
export default router;
