import { Router } from 'express';
import AuthMiddleware from '../../infrastructure/middleware/auth_middleware';
import FavoritePetController from './controller';

const router: Router = Router();

router.post('/:user_id', AuthMiddleware.PetOwnerAccess, FavoritePetController.create);
router.get('/:user_id', AuthMiddleware.PetOwnerAccess, FavoritePetController.getFavoriteVetsByUserId);
router.get('/:vet_id', AuthMiddleware.VeterinaryAllAccess, FavoritePetController.countFavoritesByVetId);
router.delete('/:user_id', AuthMiddleware.PetOwnerAccess, FavoritePetController.delete);

export default router;