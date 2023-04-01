import { Router } from 'express';
import SpecialityController from './controller';

const router: Router = Router();

router.post('/', SpecialityController.create);
router.get('/', SpecialityController.getAll);
router.patch('/', SpecialityController.update);
router.delete('/:speciality_id', SpecialityController.delete);

export default router;
