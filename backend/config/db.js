const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.PG_URI,
  idleTimeoutMillis: 30000,
  keepAlive: true,
});

pool.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("connected to database");
});

module.exports = pool;
