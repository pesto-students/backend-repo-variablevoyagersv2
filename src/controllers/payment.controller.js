import { config } from '@/config';
import { BookingService, PaymentService } from '@/services';
import * as Razorpay from 'razorpay';
import crypto from 'crypto';
import { BOOKING_STATUS, PAYMENT_STATUS } from '@/constants/status.constant';
const razorpay = new Razorpay({
	key_id: config.RAZORPAY.KEY_ID,
	key_secret: config.RAZORPAY.KEY_SECRET,
});
export const createBookingOrder = async (req, res) => {
	// const { amount } = req.body;

	try {
		const { startDate, endDate, userId, propertyId, amount } = req.body;

		const result = await BookingService.createBooking(startDate, endDate, userId, propertyId);
		console.log(result);

		if (result.error) {
			return res.status(400).json({ error: result.error });
		}

		// Create order request payload
		const options = {
			amount: amount * 100, // Razorpay expects amount in paisa
			currency: 'INR',
			receipt: `receipt_${Date.now()}`,
			payment_capture: 1, // Auto-capture payment after order creation
		};

		// Send order creation request to Razorpay
		razorpay.orders.create(options, (err, order) => {
			if (err) {
				console.error('Error creating Razorpay order:', err);
				return res.status(500).json({ error: 'Could not create payment order' });
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
	console.log(req.body);
	const { bookingId, orderId, paymentId, signature, status = PAYMENT_STATUS.SUCCESS } = req.body;

	try {
		const booking = await BookingService.getBookingById(bookingId);

		if (!booking || booking.bookingStatus !== BOOKING_STATUS.PENDING) {
			return res.status(400).json({ error: 'Invalid booking' });
		}
		let result;
		if (status === PAYMENT_STATUS.SUCCESS) {
			const generatedSignature = crypto.createHmac('sha256', config.RAZORPAY.KEY_SECRET).update(`${orderId}|${paymentId}`).digest('hex');

			if (generatedSignature !== signature) {
				return res.status(400).json({ error: 'Invalid payment signature' });
			}

			result = await PaymentService.createPayment({ bookingId, paymentId, booking, status });
		} else {
			result = await PaymentService.createFailedPayment({ bookingId, paymentId, booking, status });
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
