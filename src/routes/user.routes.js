import { Router } from 'express';
import { UserController } from '@/controllers';

const userRouter = Router();

userRouter.get('/:id', UserController.findUserById);
userRouter.post('/', UserController.createUser);
userRouter.post('/login', UserController.loginUser);


export default userRouter;
