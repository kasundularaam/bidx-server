const Stock = require("../models/Stock");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");

const getAllStocks = asyncWrapper(async (req, res) => {
  const stock = await Stock.find({});
  res.status(200).json(stock);
});

const getStock = asyncWrapper(async (req, res, next) => {
  const { id: id } = req.params;
  const stock = await Stock.findOne({ _id: id });
  if (!stock) {
    return next(createCustomError(`No stock with id : ${id}`, 404));
  }
  res.status(200).json(stock);
});

const createStock = asyncWrapper(async (req, res) => {
  const stock = await Stock.create(req.body);
  res.status(201).json(stock);
});

const updateStock = asyncWrapper(async (req, res, next) => {
  const { id: id } = req.params;

  const stock = await Stock.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!stock) {
    return next(createCustomError(`No task with id : ${id}`, 404));
  }

  res.status(200).json(stock);
});

module.exports = {
  getAllStocks,
  createStock,
  getStock,
  updateStock,
};
