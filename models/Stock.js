const mongoose = require("mongoose");

const StockSchema = new mongoose.Schema({
  orgId: { type: String, require: [true, "orgId is required!"], trim: true },
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
