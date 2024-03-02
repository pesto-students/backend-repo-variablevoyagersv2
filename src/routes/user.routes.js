import { Router } from 'express';
import { UserController } from '@/controllers';
import { MulterMiddleware } from '@/middlewares';

const userRouter = Router();

userRouter.get('/:id', UserController.findUserById);
userRouter.put('/:id', MulterMiddleware.upload.single('avatar'), UserController.updateUser);
userRouter.delete('/:id', UserController.deleteUser);

export default userRouter;
