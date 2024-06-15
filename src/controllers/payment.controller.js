import { config } from '@/config';
import { BookingService, PaymentService } from '@/services';
import * as Razorpay from 'razorpay';
import crypto from 'crypto';

import { BookingStatus, PaymentStatus } from '@prisma/client';
const razorpay = new Razorpay({
  key_id: config.RAZORPAY.KEY_ID,
  key_secret: config.RAZORPAY.KEY_SECRET,
});
export const createBookingOrder = async (req, res) => {
  try {
    const { startDate, endDate, userId, propertyId, amount } = req.body;

    const result = await BookingService.createBooking(
      startDate,
      endDate,
      userId,
      propertyId
    );
    console.log(result);

    if (result.error) {
      return res.status(409).json({ error: result.error });
    }

    const options = {
      amount: amount * 100,
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1,
    };

    razorpay.orders.create(options, (err, order) => {
      if (err) {
        console.error('Error creating Razorpay order:', err);
        return res.status(500).json({
          success: false,
          status: 500,
          error: 'Could not create payment order',
        });
      }

      return res.status(200).json({
        message: 'success',
        data: { bookingId: result.id, order },
        status: 200,
        success: true,
      });
    });
  } catch (error) {
    console.error('Error creating payment order:', error);
    return res.status(400).json({ error: error.message });
  }
};

export const confirmPayment = async (req, res) => {
  // console.log(req.body);
  const {
    bookingId,
    orderId,
    paymentId,
    signature,
    amount,
    status = PaymentStatus.SUCCESS,
  } = req.body;

  try {
    const booking = await BookingService.getBookingById(bookingId);
    console.log(booking);

    if (
      !booking ||
      (booking.bookingStatus !== BookingStatus.PENDING &&
        booking.bookingStatus !== BookingStatus.FAILED)
    ) {
      return res.status(400).json({ error: 'Invalid booking' });
    }
    let result;
    if (status === PaymentStatus.SUCCESS) {
      const generatedSignature = crypto
        .createHmac('sha256', config.RAZORPAY.KEY_SECRET)
        .update(`${orderId}|${paymentId}`)
        .digest('hex');

      if (generatedSignature !== signature) {
        return res.status(400).json({ error: 'Invalid payment signature' });
      }

      result = await PaymentService.createPayment({
        bookingId,
        paymentId,
        booking,
        status,
        amount,
      });
    } else {
      result = await PaymentService.createFailedPayment({
        bookingId,
        paymentId,
        booking,
        status,
        amount,
      });
    }

    return res.status(200).json({
      message: 'success',
      data: result,
      status: 200,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
