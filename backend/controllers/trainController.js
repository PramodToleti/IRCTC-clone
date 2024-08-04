const {
  createTrain,
  getTrainsFromSourceToDestination,
  getPlaces,
} = require("../models/train");

const addTrain = async (req, res) => {
  const {
    train_name,
    source,
    destination,
    seat_capacity,
    arrival_time_at_source,
    arrival_time_at_destination,
  } = req.body;

  try {
    const train = await createTrain(
      train_name,
      source,
      destination,
      seat_capacity,
      arrival_time_at_source,
      arrival_time_at_destination
    );
    res.status(201).json({
      status: "Train added successfully",
      status_code: 201,
      train_id: train.id,
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const getTrains = async (req, res) => {
  const { source, destination } = req.query;
  console.log(source, destination);

  try {
    const trains = await getTrainsFromSourceToDestination(source, destination);
    res.status(200).json({
      status: "Trains fetched successfully",
      status_code: 200,
      trains,
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const getTrainPlaces = async (req, res) => {
  try {
    const places = await getPlaces();
    res.status(200).json({
      status: "Places fetched successfully",
      status_code: 200,
      places,
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

module.exports = {
  addTrain,
  getTrains,
  getTrainPlaces,
};
