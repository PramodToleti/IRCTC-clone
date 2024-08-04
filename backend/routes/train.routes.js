const router = require("express").Router();

const { addTrain, getTrains } = require("../controllers/trainController");
const checkAdmin = require("../middlewares/checkAdmin");

router.post("/create", checkAdmin, addTrain);
router.get("/availability", getTrains);
