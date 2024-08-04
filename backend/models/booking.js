const pool = require("../config/db");

const bookSeat = async (user_id, train_id, no_of_seats) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const trainResult = await client.query(
      "SELECT * FROM Trains WHERE train_id = $1",
      [train_id]
    );

    const train = trainResult.rows[0];
    if (!train) {
      throw new Error("Train not found");
    }

    if (train.availabe_seats < no_of_seats) {
      throw new Error("Seats not available");
    }

    const startSeatNumber = train.seat_capacity - train.availabe_seats + 1;
    const endSeatNumber = startSeatNumber + no_of_seats - 1;
    const seatNumbers = Array.from({ length: no_of_seats }, (_, i) =>
      (startSeatNumber + i).toString()
    );

    await client.query(
      "UPDATE Trains SET availabe_seats = availabe_seats - $1 WHERE train_id = $2",
      [no_of_seats, train_id]
    );

    const bookingResult = await client.query(
      "INSERT INTO Bookings(user_id, train_id, seat_numbers) VALUES($1, $2, $3) RETURNING *",
      [user_id, train_id, seatNumbers]
    );

    await client.query("COMMIT");

    console.log(bookingResult.rows[0]);
    return bookingResult.rows[0];
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
};

module.exports = {
  bookSeat,
};
