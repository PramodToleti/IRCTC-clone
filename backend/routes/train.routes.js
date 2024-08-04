const router = require("express").Router();

const { addTrain, getTrains } = require("../controllers/trainController");

router.post("/add", checkAdmin, addTrain);
router.get("/availability", getTrains);
