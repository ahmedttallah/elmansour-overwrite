const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema(
  {
    email: String,
    password: String,
    phone: String,
  },
  { timestamps: true }
);

const Vendor = mongoose.model("Vendor", vendorSchema);

module.exports = Vendor;
