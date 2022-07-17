const mongoose = require("mongoose");

const NewsSubSchema = new mongoose.Schema({
  userId: { type: String, require: [true, "userId is required!"], trim: true },
  orgId: { type: String, require: [true, "orgId is required!"] },
});

module.exports = mongoose.model("NewsSub", NewsSubSchema);
