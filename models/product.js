const mongoose = require("mongoose");
const Category = require("../models/category");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  images: [
    {
      type: String,
    },
  ],
  originalPrice: {
    type: Number,
    required: true,
  },
  discountedPrice: {
    type: Number,
    required: true,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  colours: [
    {
      type: String,
    },
  ],
  category: {
    type: Category,
    required: true,
  },
});

exports.Product = mongoose.model("Product", productSchema);
