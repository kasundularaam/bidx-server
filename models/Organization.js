const mongoose = require("mongoose");

const OrganizationSchema = new mongoose.Schema({
  name: { type: String, require: [true, "name is required!"], trim: true },
  email: { type: String, require: [true, "email is required!"] },
  password: { type: String, require: [true, "password is required!"] },
});

module.exports = mongoose.model("Organization", OrganizationSchema);
