const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { createUser, getUserByUsername } = require("../models/user");

require("dotenv").config();

const register = async (req, res) => {
  const { username, password, email } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await createUser(username, hashedPassword, email);
    res.status(201).json({
      status: "Account created successfully",
      status_code: 201,
      user_id: user.id,
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await getUserByUsername(username);
    if (!user) {
      throw new Error("Incorrect username / password provided. Please retry.");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Incorrect username / password provided. Please retry.");
    }

    const token = jwt.sign(
      { user_id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      status: "Login successful",
      status_code: 200,
      user_id: user.id,
      access_token: token,
    });
  } catch (e) {
    res.status(401).json({ error: e.message });
  }
};

module.exports = {
  register,
  login,
};
