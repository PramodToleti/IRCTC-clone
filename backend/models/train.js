const pool = require("../config/db");

const createTrain = async (
  train_name,
  source,
  destination,
  seat_capacity,
  arrival_time_at_source,
  arrival_time_at_destination
) => {
  const result = await pool.query(
    "INSERT INTO Trains(train_name, source, destination, seat_capacity, available_seats, arrival_time_at_source, arrival_time_at_destination) VALUES($1, $2, $3, $4, $4, $5, $6) RETURNING *",
    [
      train_name,
      source,
      destination,
      seat_capacity,
      arrival_time_at_source,
      arrival_time_at_destination,
    ]
  );
  console.log(result.rows[0]);
  return result.rows[0];
};

const getTrainsFromSourceToDestination = async (source, destination) => {
  const result = await pool.query(
    "SELECT id AS train_id, train_name, available_seats FROM Trains WHERE source = $1 AND destination = $2",
    [source, destination]
  );
  console.log(result.rows);
  return result.rows;
};

const getPlaces = async () => {
  const result = await pool.query(`
    SELECT DISTINCT source AS place FROM Trains
    UNION
    SELECT DISTINCT destination AS place FROM Trains;
  `);
  console.log(result.rows);
  return result.rows;
};

module.exports = {
  createTrain,
  getTrainsFromSourceToDestination,
  getPlaces,
};
