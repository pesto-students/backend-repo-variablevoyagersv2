import { BookingService } from "@/services";


export const createBookingController = async (req, res) => {
  try {
    const { startDate, endDate, userId, propertyId } = req.body;
    const booking = await BookingService.createBooking(startDate, endDate, userId, propertyId);
    res.status(201).json(booking);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getAllBookingsController = async (req, res) => {
  try {
    const bookings = await BookingService.getAllBookings();
    res.json(bookings);
  } catch (error) {
    console.error('Error getting bookings:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getBookingByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await BookingService.getBookingById(id);
    res.json(booking);
  } catch (error) {
    console.error('Error getting booking:', error);
    res.status(500).json({ error: error.message });
  }
};

export const updateBookingStatusController = async (req, res) => {
  try {
    const { id } = req.params;
    const { bookingStatus } = req.body;
    const booking = await BookingService.updateBookingStatus(id, bookingStatus);
    res.json(booking);
  } catch (error) {
    console.error('Error updating booking status:', error);
    res.status(500).json({ error: error.message });
  }
};


