import { PaymentController } from '@/controllers';
import { Router } from 'express';

const paymentRouter = Router();

paymentRouter.post('/create-payment-order', PaymentController.createBookingOrder);
paymentRouter.post('/confirm-payment', PaymentController.confirmPayment);

export default paymentRouter;
