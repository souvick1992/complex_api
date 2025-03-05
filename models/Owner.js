const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: Number, required: true },
  block: { type: String, required: true },
  flat_number: { type: String, required: true },
});

module.exports = mongoose.model("Owner", ownerSchema);
