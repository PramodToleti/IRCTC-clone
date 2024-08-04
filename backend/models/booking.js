const pool = require("../config/db");

const bookSeat = async (user_id, train_id, no_of_seats) => {
  console.log("No of seats", no_of_seats);
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const trainResult = await client.query(
      "SELECT * FROM Trains WHERE id = $1",
      [train_id]
    );

    const train = trainResult.rows[0];
    if (!train) {
      throw new Error("Train not found");
    }

    if (train.available_seats < no_of_seats) {
      throw new Error("Seats not available");
    }

    const startSeatNumber = train.seat_capacity - train.available_seats + 1;
    const endSeatNumber = startSeatNumber + no_of_seats - 1;
    const seatNumbers = Array.from({ length: no_of_seats }, (_, i) =>
      (startSeatNumber + i).toString()
    );

    await client.query(
      "UPDATE Trains SET available_seats = available_seats - $1 WHERE id = $2",
      [no_of_seats, train_id]
    );

    const bookingResult = await client.query(
      "INSERT INTO Bookings(user_id, train_id, no_of_seats, seat_numbers) VALUES($1, $2, $3, $4) RETURNING *",
      [user_id, train_id, no_of_seats, seatNumbers]
    );

    await client.query("COMMIT");

    console.log(bookingResult.rows[0]);
    return bookingResult.rows[0];
  } catch (e) {
    console.log(e);
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
};

const getBookingsById = async (bookingId) => {
  const bookingResult = await pool.query(
    "SELECT id AS booking_id, no_of_seats, train_id, seat_numbers, user_id FROM Bookings WHERE id = $1",
    [bookingId]
  );

  if (bookingResult.rows.length === 0) {
    throw new Error("Booking not found");
  }

  console.log(bookingResult.rows[0]);

  const trainResult = await pool.query(
    "SELECT id AS train_id, train_name, arrival_time_at_source, arrival_time_at_destination FROM Trains WHERE id = $1",
    [bookingResult.rows[0].train_id]
  );

  return {
    ...bookingResult.rows[0],
    ...trainResult.rows[0],
  };
};

module.exports = {
  bookSeat,
  getBookingsById,
};
