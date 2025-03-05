const mongoose = require("mongoose");

const complexSchema = new mongoose.Schema({
  full_name: { type: String, required: true },
  address: { type: String, required: true },
  complex_id: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  image: { type: String },
  status: { type: String, required: true },
});

module.exports = mongoose.model("Complex", complexSchema);
