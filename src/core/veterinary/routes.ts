import { Router } from 'express';
import VetController from './controller';

const router: Router = Router();

router.post('/', VetController.create);
router.get('/vets', VetController.getVets);
export default router;
