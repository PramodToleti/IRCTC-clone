const router = require("express").Router();

const {
  addTrain,
  getTrains,
  getTrainPlaces,
} = require("../controllers/trainController");
const checkAdmin = require("../middlewares/checkAdmin");

router.post("/create", checkAdmin, addTrain);
router.get("/availability", getTrains);
router.get("/places", getTrainPlaces);

module.exports = router;
