const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema({
  complex_id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  block: { type: String, required: true },
  flat_number: { type: String, required: true },
});

module.exports = mongoose.model("Owner", ownerSchema);
