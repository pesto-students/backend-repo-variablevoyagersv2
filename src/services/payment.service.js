import { BookingStatus, PaymentStatus, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export const createPayment = async (data) => {
  const { bookingId, paymentId, booking, status } = data;
  const response = await prisma.$transaction(async (prisma) => {
    const payment = await prisma.payment.create({
      data: {
        amount: booking.property.price,
        paymentMethod: 'UPI',
        status: PaymentStatus.SUCCESS,
        transactionId: paymentId,
        bookingId,
        userId: booking.userId,
      },
    });

    await prisma.booking.update({
      where: { id: bookingId },
      data: { bookingStatus: BookingStatus.AWAITING_OWNER_APPROVAL },
    });
    return payment;
  });
  return response;
};

export const createFailedPayment = async (data) => {
  console.log(data);
  const { bookingId, paymentId, booking, status } = data;
  const statusResponse = await prisma.$transaction(async (prisma) => {
    const payment = await prisma.payment.create({
      data: {
        amount: booking.property.price,
        paymentMethod: 'UPI',
        status: PaymentStatus.FAILED,
        transactionId: paymentId,
        bookingId,
        userId: booking.userId,
      },
    });

    await prisma.booking.update({
      where: { id: bookingId },
      data: { bookingStatus: BookingStatus.FAILED },
    });

    return payment;
  });

  return statusResponse;
};
