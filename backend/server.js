const express = require("express");

require("dotenv").config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 8000;

app.get("/", (_, res) => {
  res.send("Server is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
