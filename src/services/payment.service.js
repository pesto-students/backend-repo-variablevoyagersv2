import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export const createPayment = async (data) => {
	const { bookingId, paymentId, booking } = data;
	const payment = await prisma.payment.create({
		data: {
			amount: booking.property.price,
			paymentMethod: 'UPI',
			status: 'CONFIRMED',
			transactionId: paymentId,
			bookingId,
			userId: booking.userId,
		},
	});

	await prisma.booking.update({
		where: { id: bookingId },
		data: { bookingStatus: 'CONFIRMED' },
	});
	return payment;
};
