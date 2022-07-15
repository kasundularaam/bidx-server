const mongoose = require("mongoose");

const StockSchema = new mongoose.Schema({
  orgId: { type: String, require: [true, "orgId is required!"], trim: true },
  winner: { type: String },
  startedTime: { type: String, require: [true, "startedTime is required!"] },
  endedTime: { type: String, require: [true, "endedTime is required!"] },
  ended: { type: Boolean },
  basePrice: { type: double, require: [true, "basePrice is required!"] },
  bidPrice: { type: double },
});

module.exports = mongoose.model("Stock", StockSchema);
