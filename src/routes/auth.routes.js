import { Router } from 'express';
import { AuthController } from '@/controllers';
import { AuthMiddleware, UserMiddleware } from '@/middlewares';

const authRouter = Router();

authRouter.post('/otp', AuthController.loginOtp);
authRouter.post('/verify-otp', AuthController.verifyOtp);
authRouter.post('/', AuthController.createUser);
authRouter.post('/google', AuthController.googleLogin);
authRouter.post('/refreshToken', AuthController.refreshToken);
authRouter.post('/change-password', AuthMiddleware.verifyToken, AuthController.changePassword);
authRouter.post('/logout', AuthMiddleware.verifyToken, AuthController.logoutUser);

export default authRouter;
