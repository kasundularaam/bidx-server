const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema({
  title: { type: String, require: [true, "title is required!"], trim: true },
  timeStamp: { type: Number, require: [true, "timeStamp is required!"] },
  news: { type: String, require: [true, "news is required!"] },
  orgId: { type: String, require: [true, "orgId is required!"] },
});

module.exports = mongoose.model("News", NewsSchema);
