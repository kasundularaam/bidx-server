const mongoose = require("mongoose");

const BidSchema = new mongoose.Schema({
  stockId: {
    type: String,
    require: [true, "stockId is required!"],
  },
  userId: { type: String, require: [true, "userId is required!"], trim: true },
  bidPrice: {
    type: Number,
    require: [true, "bidPrice is required!"],
  },
  timeStamp: {
    type: Number,
    require: [true, "timeStamp is required!"],
  },
});

module.exports = mongoose.model("Bid", BidSchema);
