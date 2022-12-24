import { Router } from 'express';
import UserRoutes from '../core/user/routes';

const router: Router = Router();

router.get('/', (req, res, next) => {
  res.json({
    api: 'Intervet API',
    version: 'v1'
  });
});

router.use('/user', UserRoutes);

export default router;
