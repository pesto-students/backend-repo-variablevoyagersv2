import { Router } from 'express';
import { UserController } from '@/controllers';
import { UserMiddleware } from '@/middleware';

const userRouter = Router();

userRouter.get('/:id', UserController.findUserById);
userRouter.post('/', UserMiddleware.validateCreateUser ,UserController.createUser);
userRouter.post('/login',UserMiddleware.validateLogin ,  UserController.loginUser);


export default userRouter;
