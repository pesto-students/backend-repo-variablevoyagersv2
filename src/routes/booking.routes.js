import { Router } from 'express';
import { BookingController } from '@/controllers';

const bookingRouter = Router();

bookingRouter.post("/", BookingController.createBookingController);
bookingRouter.get('/:id', BookingController.getBookingByIdController);


export default bookingRouter