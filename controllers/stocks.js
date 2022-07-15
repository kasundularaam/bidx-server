const Stock = require("../models/Stock");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");

const getAllStocks = asyncWrapper(async (req, res) => {
  const stock = await Stock.find({});
  res.status(200).json(stock);
});
const registerUser = asyncWrapper(async (req, res, next) => {
  const { email: email } = req.body;
  const user = await User.findOne({ email: email });
  if (user) {
    return next(createCustomError("Already have account", 500));
  }
  const newUser = await User.create(req.body);
  res.status(201).json({ newUser });
});

const loginUser = asyncWrapper(async (req, res, next) => {
  const { email: email, password: password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    return next(createCustomError("User does not have an account", 404));
  }
  if (user.password != password) {
    return next(createCustomError("Wrong password", 404));
  }
  res.status(200).json({ user: user });
});

const getUser = asyncWrapper(async (req, res, next) => {
  const { id: userId } = req.params;
  const user = await User.findOne({ _id: userId });
  console.log(user);
  if (!user) {
    return next(createCustomError(`No user with id : ${userId}`, 404));
  }
  res.status(200).json({ user: user });
});

module.exports = { getAllUsers, registerUser, loginUser, getUser };
