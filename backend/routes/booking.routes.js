const router = require("express").Router();

const {
  bookTicket,
  getBooking,
  getAllBookings,
} = require("../controllers/bookingController");
const authMiddleWare = require("../middlewares/authMiddleWare");

router.get("/user/:user_id", authMiddleWare, getAllBookings);

router.post("/book/:train_id", authMiddleWare, bookTicket);

router.get("/:bookingId", authMiddleWare, getBooking);

module.exports = router;
