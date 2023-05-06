import { Router } from 'express';
import UserRoutes from '../core/user/routes';
import VetRoutes from '../core/veterinary/routes';

import WorkingHourRoutes from '../core/working_hours/routes';
import AttentionAreaRoutes from '../core/attention_area/routes';
import ServiceRoutes from '../core/service/routes';
import VetServicesRoutes from '../core/vet_service/routes';
import SpecialityRoutes from '../core/speciality/routes';
import AuthRoutes from '../core/auth/routes';
import CreditCardRoutes from '../core/credit_card/routes';
import BankAccountRoutes from '../core/bank_account/routes';
import PetRoutes from '../core/pet/routes';
import AnimalRoutes from '../core/animal/routes';
import FavoriteVetRoutes from '../core/favorite_vet/routes';
import AnimalVetRoutes from '../core/animal_vet/routes';
import CommentRoutes from '../core/comment/routes';
import AboutVetRoutes from '../core/about_vet/routes';
import AdminRoutes from '../core/admin/routes';

const router: Router = Router();

router.get('/', (req, res, next) => {
  res.json({
    api: 'Intervet API',
    version: 'v1'
  });
});

router.use('/user', UserRoutes);
router.use('/vet', VetRoutes);
router.use('/working_hours', WorkingHourRoutes);
router.use('/attention_area', AttentionAreaRoutes);
router.use('/service', ServiceRoutes);
router.use('/vet_services', VetServicesRoutes);
router.use('/speciality', SpecialityRoutes);
router.use('/auth', AuthRoutes);
router.use('/credit_card', CreditCardRoutes);
router.use('/bank_account', BankAccountRoutes);
router.use('/pet', PetRoutes);
router.use('/animal', AnimalRoutes);
router.use('/favorite_vet', FavoriteVetRoutes);
router.use('/animal_vet', AnimalVetRoutes);
router.use('/comments', CommentRoutes);
router.use('/about_vet', AboutVetRoutes);
router.use('/admin', AdminRoutes);

export default router;
