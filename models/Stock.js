const mongoose = require("mongoose");

const StockSchema = new mongoose.Schema({
  winner: { type: String },
  startTimeStamp: {
    type: Number,
    require: [true, "startTimeStamp is required!"],
  },
  endTimeStamp: {
    type: Number,
    require: [true, "endTimeStamp is required!"],
  },
  basePrice: { type: Number, require: [true, "basePrice is required!"] },
  bidPrice: { type: Number },
});

module.exports = mongoose.model("Stock", StockSchema);
