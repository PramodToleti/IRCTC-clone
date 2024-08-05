const pool = require("../config/db");

const createUser = async (username, password, email, role = "user") => {
  const isUsernameExists = await pool.query(
    "SELECT * FROM Users WHERE username = $1",
    [username]
  );

  const isEmailExists = await pool.query(
    "SELECT * FROM Users WHERE email = $1",
    [email]
  );

  if (isUsernameExists.rows.length > 0) {
    throw new Error("Username already taken");
  }

  if (isEmailExists.rows.length > 0) {
    throw new Error("Email already exists");
  }

  const result = await pool.query(
    "INSERT INTO Users(username, password, email, role) VALUES($1, $2, $3, $4) RETURNING *",
    [username, password, email, role]
  );
  console.log(result.rows[0]);
  return result.rows[0];
};

const getUserByUsername = async (username) => {
  const result = await pool.query("SELECT * FROM Users WHERE username = $1", [
    username,
  ]);
  console.log(result.rows[0]);
  return result.rows[0];
};

module.exports = {
  createUser,
  getUserByUsername,
};
