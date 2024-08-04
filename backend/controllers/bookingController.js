const { bookSeat, getBookingsById } = require("../models/booking");

const bookTicket = async (req, res) => {
  const { user_id, no_of_seats } = req.body;
  const { train_id } = req.params;

  try {
    const booking = await bookSeat(user_id, train_id, no_of_seats);
    res.status(201).json({
      status: "Booking successful",
      status_code: 201,
      booking_id: booking.id,
      seat_numbers: booking.seat_numbers,
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const getBooking = async (req, res) => {
  const { bookingId } = req.params;

  try {
    const booking = await getBookingsById(bookingId);
    res.status(200).json({
      booking,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: e.message });
  }
};

module.exports = {
  bookTicket,
  getBooking,
};
