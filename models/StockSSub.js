const mongoose = require("mongoose");

const StockSubSchema = new mongoose.Schema({
  userId: { type: String, require: [true, "userId is required!"], trim: true },
  stockId: { type: String, require: [true, "stockId is required!"] },
});

module.exports = mongoose.model("StockSub", StockSubSchema);
