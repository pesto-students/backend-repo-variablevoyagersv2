import { BookingService } from '@/services';

export const createBooking = async (req, res) => {
	try {
		const { startDate, endDate, userId, propertyId } = req.body;
		const booking = await BookingService.createBooking(startDate, endDate, userId, propertyId);
		res.status(201).json(booking);
	} catch (error) {
		console.error('Error creating booking:', error);
		res.status(500).json({ error: error.message });
	}
};

export const getAllCustomerBookings = async (req, res) => {
	try {
		const id = req.params.id;
		const result = await BookingService.getAllBookingsById(id);
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
		res.json(bookings);
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
		const { bookingStatus } = req.body;
		const booking = await BookingService.updateBookingStatus(id, bookingStatus);
		res.json(booking);
	} catch (error) {
		console.error('Error updating booking status:', error);
		res.status(500).json({ error: error.message });
	}
};
