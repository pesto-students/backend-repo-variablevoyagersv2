import { Router } from 'express';
import { AuthController } from '@/controllers';
import { AuthMiddleware, UserMiddleware } from '@/middlewares';

const authRouter = Router();

authRouter.post('/', UserMiddleware.validateCreateUser, AuthController.createUser);
authRouter.post('/login', UserMiddleware.validateLogin, AuthController.loginUser);
authRouter.post('/refreshToken', AuthController.refreshToken);
authRouter.post('/change-password', AuthMiddleware.verifyToken, AuthController.changePassword);
authRouter.post('/logout', AuthMiddleware.verifyToken, AuthController.logoutUser);

export default authRouter;
