import { Router } from 'express';
import { BookingController } from '@/controllers';
import { AuthMiddleware } from '@/middlewares';

const bookingRouter = Router();

bookingRouter.get(
  '/customer-bookings/:id',
  AuthMiddleware.verifyToken,
  BookingController.getAllCustomerBookings
);
bookingRouter.get(
  '/owner-bookings/:id',
  AuthMiddleware.verifyToken,
  BookingController.getAllOwnerBookings
);
bookingRouter.post(
  '/',
  AuthMiddleware.verifyToken,
  BookingController.createBooking
);

bookingRouter.get(
  '/:id',
  AuthMiddleware.verifyToken,
  BookingController.getBookingById
);
bookingRouter.get(
  '/send-mail/:id',
  AuthMiddleware.verifyToken,
  BookingController.confirmBookingEmail
);

bookingRouter.put(
  '/:id',
  AuthMiddleware.verifyToken,
  BookingController.updateBookingStatus
);

bookingRouter.put(
  '/remove-booking/:id',
  AuthMiddleware.verifyToken,
  BookingController.removeBooking
);

export default bookingRouter;
