import { PrismaClient } from '@prisma/client';
import { BOOKING_STATUS, PAYMENT_STATUS } from '@/constants/status.constant';
const prisma = new PrismaClient();
export const createPayment = async (data) => {
	const { bookingId, paymentId, booking, status } = data;
	const response = await prisma.$transaction(async (prisma) => {
		const payment = await prisma.payment.create({
			data: {
				amount: booking.property.price,
				paymentMethod: 'UPI',
				status: status,
				transactionId: paymentId,
				bookingId,
				userId: booking.userId,
			},
		});

		await prisma.booking.update({
			where: { id: bookingId },
			data: { bookingStatus: BOOKING_STATUS.AWAITING_OWNER_APPROVAL },
		});
		return payment;
	});
	return response;
};

export const createFailedPayment = async (data) => {
	const { bookingId, paymentId, booking, status } = data;
	const statusResponse = await prisma.$transaction(async (prisma) => {
		const payment = await prisma.payment.create({
			data: {
				amount: booking.property.price,
				paymentMethod: 'UPI',
				status: status,
				transactionId: paymentId,
				bookingId,
				userId: booking.userId,
			},
		});

		// await prisma.booking.update({
		// 	where: { id: bookingId },
		// 	data: { bookingStatus: BOOKING_STATUS.FAILED },
		// });

		return payment;
	});

	return statusResponse;
};

export const initiateRefund = async (bookingId) => {
	try {
		const payment = await prisma.payment.findUnique({
			where: { bookingId, status: PAYMENT_STATUS.SUCCESS },
		});
		console.log(payment);

		if (payment) {
			await prisma.payment.update({
				where: { id: payment.id },
				data: { status: PAYMENT_STATUS.REFUNDED },
			});

			return refund;
		}
	} catch (error) {
		throw new Error('Error initiating refund');
	}
};
