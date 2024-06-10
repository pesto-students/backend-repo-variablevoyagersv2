import { BookingService } from '@/services';
import { BookingStatus, PaymentStatus, Roles } from '@prisma/client';

export const createBooking = async (req, res) => {
  try {
    const { startDate, endDate, userId, propertyId } = req.body;
    const booking = await BookingService.createBooking(
      startDate,
      endDate,
      userId,
      propertyId
    );
    res.status(201).json(booking);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getAllCustomerBookings = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await BookingService.getBookingsByCustomerId(id);
    if (result) {
      return res.status(200).json({
        message: 'success',
        data: result,
        status: 200,
        success: true,
      });
    }
    return res.status(409).json({
      message: 'Not found',
      data: null,
      status: 409,
      success: true,
    });
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};
export const getAllOwnerBookings = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await BookingService.getBookingsByOwnerId(id);
    if (result) {
      return res.status(200).json({
        message: 'success',
        data: result,
        status: 200,
        success: true,
      });
    }
    return res.status(409).json({
      message: 'Not found',
      data: null,
      status: 409,
      success: true,
    });
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

export const getUserBookings = async (req, res) => {
  try {
    const { id } = req.params;
    const bookings = await BookingService.getUserBookingsById(id);
    res.status(200).json({
      message: 'success',
      status: 200,
      success: true,
    });
  } catch (error) {
    console.error('Error getting bookings:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await BookingService.getBookingById(id);
    res.json(booking);
  } catch (error) {
    console.error('Error getting booking:', error);
    res.status(500).json({ error: error.message });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { bookingStatus, role } = req.body;

    const currentBooking = await BookingService.getBookingById(id);

    if (currentBooking.bookingStatus === BookingStatus.CANCELLED) {
      return res.status(400).json({
        message: 'Booking is already canceled and cannot be updated',
        status: 400,
        success: false,
      });
    }

    // Owner operations
    if (role === Roles.OWNER) {
      if (
        currentBooking.bookingStatus === BookingStatus.AWAITING_OWNER_APPROVAL
      ) {
        if (bookingStatus === BookingStatus.CONFIRMED) {
          const updatedBooking = await BookingService.updateBookingStatus(
            id,
            bookingStatus,
            PaymentStatus.SUCCESS
          );
          return res.status(200).json({
            message: 'Booking confirmed successfully',
            status: 200,
            success: true,
            booking: updatedBooking,
          });
        } else if (bookingStatus === BookingStatus.CANCELLED) {
          const updatedBooking = await BookingService.updateBookingStatus(
            id,
            bookingStatus,
            PaymentStatus.REFUNDED
          );
          return res.status(200).json({
            message: 'Booking canceled successfully',
            status: 200,
            success: true,
            booking: updatedBooking,
          });
        }
      } else {
        return res.status(400).json({
          message:
            'Owner can only update bookings in AWAITING_OWNER_APPROVAL status',
          status: 400,
          success: false,
        });
      }
    }

    // Customer operations
    if (role === Roles.CUSTOMER) {
      const isCancellable =
        [
          BookingStatus.AWAITING_OWNER_APPROVAL,
          BookingStatus.CONFIRMED,
        ].includes(currentBooking.bookingStatus) &&
        bookingStatus === BookingStatus.CANCELLED;
      if (isCancellable) {
        const updatedBooking = await BookingService.updateBookingStatus(
          id,
          bookingStatus,
          PaymentStatus.REFUNDED
        );
        return res.status(200).json({
          message: 'Booking canceled successfully',
          status: 200,
          success: true,
          booking: updatedBooking,
        });
      } else {
        return res.status(400).json({
          message:
            'Customer can only cancel bookings in AWAITING_OWNER_APPROVAL or CONFIRMED status',
          status: 400,
          success: false,
        });
      }
    }

    res.status(400).json({
      message: 'Invalid operation',
      status: 400,
      success: false,
    });
  } catch (error) {
    console.error('Error updating booking status:', error);
    res.status(500).json({ error: error.message });
  }
};

export const removeBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await BookingService.deleteBooking(id);
    res.status(200).json({
      message: 'success',
      status: 200,
      success: true,
    });
  } catch (error) {
    console.error('Error updating booking status:', error);
    res.status(500).json({ error: error.message });
  }
};
