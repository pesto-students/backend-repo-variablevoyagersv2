import { PaymentController } from '@/controllers';
import { AuthMiddleware } from '@/middlewares';
import { Router } from 'express';

const paymentRouter = Router();

paymentRouter.post(
  '/create-payment-order',
  AuthMiddleware.verifyToken,
  PaymentController.createBookingOrder
);
paymentRouter.post(
  '/confirm-payment',
  AuthMiddleware.verifyToken,
  PaymentController.confirmPayment
);

export default paymentRouter;
