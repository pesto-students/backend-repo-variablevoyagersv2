import { Router } from 'express';
import { BookingController } from '@/controllers';
import { AuthMiddleware } from '@/middlewares';

const bookingRouter = Router();

bookingRouter.get('/user-bookings/:id', AuthMiddleware.verifyToken, BookingController.getUserBookings);
bookingRouter.post('/', AuthMiddleware.verifyToken, BookingController.createBooking);
bookingRouter.get('/:id', AuthMiddleware.verifyToken, BookingController.getBookingById);

export default bookingRouter;
