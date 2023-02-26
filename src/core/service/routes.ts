import { Router } from 'express';
import ServiceController from './controller';


const router: Router = Router();

router.post('/', ServiceController.create);
router.get('/', ServiceController.getAll);
router.patch('/', ServiceController.update);
router.delete('/:service_id', ServiceController.delete);

export default router;
