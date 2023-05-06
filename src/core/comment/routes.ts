import { Router } from 'express';
import AuthMiddleware from '../../infrastructure/middleware/auth_middleware';
import CommentController from './controller';

const router: Router = Router();

router.post('/', AuthMiddleware.PetOwnerAccess, CommentController.create);
router.get('/get-user-comment', AuthMiddleware.PetOwnerAccess, CommentController.getUserComments);
router.get('/get-vet-comment', AuthMiddleware.VeterinaryAllAccess, CommentController.getCommentsForVet);

export default router;