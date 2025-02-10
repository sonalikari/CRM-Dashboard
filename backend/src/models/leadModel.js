const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  documents: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model("Lead", leadSchema);
