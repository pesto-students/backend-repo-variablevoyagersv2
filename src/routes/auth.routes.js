import { Router } from 'express';
import { AuthController } from '@/controllers';
import { UserMiddleware } from '@/middlewares';

const authRouter = Router();

authRouter.post('/', UserMiddleware.validateCreateUser, AuthController.createUser);
authRouter.post('/login', UserMiddleware.validateLogin, AuthController.loginUser);
authRouter.post('/refreshToken', AuthController.refreshToken);

export default authRouter;
