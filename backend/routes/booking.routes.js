const router = require("express").Router();

const { bookTicket, getBooking } = require("../controllers/bookingController");
const authMiddleWare = require("../middlewares/authMiddleWare");

router.post("/book/:train_id", authMiddleWare, bookTicket);

router.get("/:bookingId", authMiddleWare, getBooking);
