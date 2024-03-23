import { Router } from 'express';
import { UserController } from '@/controllers';
import { MulterMiddleware, AuthMiddleware } from '@/middlewares';

const userRouter = Router();

// userRouter.get('/:id', AuthMiddleware.verifyToken, UserController.findUserById);
userRouter.get('/current-user', AuthMiddleware.verifyToken, UserController.getCurrentUser);
userRouter.put('/:id', MulterMiddleware.upload.single('avatar'), UserController.updateUser);
userRouter.delete('/:id', UserController.deleteUser);

export default userRouter;
