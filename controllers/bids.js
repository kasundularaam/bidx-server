const Bid = require("../models/Bid");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");

const getAllBids = asyncWrapper(async (req, res) => {
  const bids = await Bid.find({});
  res.status(200).json(bids);
});
const createBid = asyncWrapper(async (req, res, next) => {
  const { stockId: stockId, bidPrice: bidPrice } = req.body;

  const stock = await Stock.findOne({ _id: stockId });

  if (!stock) {
    return next(createCustomError("Wrong stockId", 500));
  }

  if (!stock.bidPrice < bidPrice) {
    return next(createCustomError("Amount not sufficient", 500));
  }
  const bid = await Bid.create(req.body);
  res.status(201).json(bid);
});

const loginUser = asyncWrapper(async (req, res, next) => {
  const { email: email, password: password } = req.body;
  const user = await Bid.findOne({ email: email });
  if (!user) {
    return next(createCustomError("User does not have an account", 404));
  }
  if (user.password != password) {
    return next(createCustomError("Wrong password", 404));
  }
  res.status(200).json({ user: user });
});

const getUser = asyncWrapper(async (req, res, next) => {
  const { id: id } = req.params;
  const user = await Bid.findOne({ _id: id });
  console.log(user);
  if (!user) {
    return next(createCustomError(`No user with id : ${id}`, 404));
  }
  res.status(200).json({ user });
});

module.exports = { getAllBids, registerUser: createBid, loginUser, getUser };
