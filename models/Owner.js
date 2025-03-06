const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema({
  complex_id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String},
  block: { type: String },
  flat_number: { type: String },
});

module.exports = mongoose.model("Owner", ownerSchema);
