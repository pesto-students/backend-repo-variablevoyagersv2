const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

export const createBooking = async (startDate, endDate, userId, propertyId) => {
  try {
    // Check if the property exists
    const property = await prisma.property.findUnique({
      where: {
        id: propertyId,
      },
    });
    if (!property) {
      throw new Error('Property not found');
    }

    // Create the booking
    const booking = await prisma.booking.create({
      data: {
        startDate,
        endDate,
        bookingStatus: 'PENDING',
        userId,
        propertyId,
      },
      include: {
        user: true,
        property: true,
      },
    });

    return booking;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw new Error('Failed to create booking');
  }
};

export const getAllBookings = async () => {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        user: true,
        property: true,
      },
    });
    return bookings;
  } catch (error) {
    console.error('Error getting bookings:', error);
    throw new Error('Failed to get bookings');
  }
};

export const getBookingById = async (id) => {
  try {
    const booking = await prisma.booking.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
        property: true,
      },
    });
    if (!booking) {
      throw new Error('Booking not found');
    }
    return booking;
  } catch (error) {
    console.error('Error getting booking:', error);
    throw new Error('Failed to get booking');
  }
};

export const updateBookingStatus = async (id, bookingStatus) => {
  try {
    const booking = await prisma.booking.update({
      where: {
        id,
      },
      data: {
        bookingStatus,
      },
      include: {
        user: true,
        property: true,
      },
    });
    return booking;
  } catch (error) {
    console.error('Error updating booking status:', error);
    throw new Error('Failed to update booking status');
  }
};

