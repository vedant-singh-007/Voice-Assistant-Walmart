const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: String,
  price: Number,
  thumbnail: String,
  link: String,
  aisle: String
});

module.exports = mongoose.model("Product", productSchema);
