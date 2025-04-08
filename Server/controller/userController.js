const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

require("dotenv").config();

const signup = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ msg: "Please fill in all fields" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      password: hashedPassword,
    });

    const { password: _, ...userWithoutPassword } = newUser.toObject();

    const token = jwt.sign(userWithoutPassword, process.env.JWT_SECRET, {
      expiresIn: "12h",
    });

    return res.status(201).json({ msg: "Signup Successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server Error" });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ msg: "Please fill in all fields" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    const { password: _, ...userWithoutPassword } = user.toObject();

    const token = jwt.sign(userWithoutPassword, process.env.JWT_SECRET, {
      expiresIn: "12h",
    });

    return res.status(200).json({ msg: "Login Successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server Error" });
  }
};

module.exports = { signup, signin };
