import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "#models/user";

// @desc Register new user
// @route POST /user/register
// @access PUBLIC
const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // check for mandatory fields
  if ((!username, !email, !password)) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  // validate the email
  const validateEmail = new RegExp(
    /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
    "gm"
  );
  if (!validateEmail.test(email)) {
    res.status(400);
    throw new Error("Please enter a valid email");
  }

  // check if user already exists
  const user = await User.findOne({ email });
  if (user) {
    res.status(400);
    throw new Error("User already exists");
  }

  // hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // create new user
  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  if (newUser) {
    res.status(201).json({
      message: "User created successfully",
      _id: newUser.id,
      email: newUser.email,
    });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
});

// @desc Login user
// @route POST /user/login
// @access PUBLIC
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // check for mandatory fields
  if ((!email, !password)) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  // validate the email
  const validateEmail = new RegExp(
    /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
    "gm"
  );
  if (!validateEmail.test(email)) {
    res.status(400);
    throw new Error("Please enter a valid email");
  }

  // check if user already exists
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  // check if password is correct
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    res.status(400);
    throw new Error("Invalid Password");
  }

  // create token data
  const tokenData = {
    id: user._id,
    username: user.username,
    email: user.email,
  };

  // create token
  const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
    expiresIn: "30m",
  });

  res.status(200).json({ token });
});

// @desc Get current user
// @route GET /user/user-profile
// @access PRIVATE
const getCurrentUser = asyncHandler(async (req, res) => {
  const { email } = req.user;
  const user = await User.findOne({ email }).select("-password");
  res.status(200).json(user);
});

// @desc Logout user
// @route GET /user/logout
// @access PRIVATE
const logout = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Logout Successfully" });
});

export default {
  register,
  login,
  getCurrentUser,
  logout,
};
