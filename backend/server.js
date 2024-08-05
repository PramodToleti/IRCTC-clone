const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const authRoutes = require("./routes/auth.routes");
const trainRoutes = require("./routes/train.routes");
const bookingRoutes = require("./routes/booking.routes");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/trains", trainRoutes);
app.use("/api/bookings", bookingRoutes);

const PORT = process.env.PORT || 8000;

app.get("/health", (_, res) => {
  res.send("200 OK");
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
