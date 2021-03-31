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
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

productSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

productSchema.set("toJSON", {
  virtuals: true,
});

exports.Product = mongoose.model("Product", productSchema);

//product example
// {
//   "name": "bat",
//   "image": "url",
//   "description": "req.body.description",
//   "images": "req.body.images",
//   "originalPrice": 10,
//   "discountedPrice": 5,
//   "isFeatured":true,
//   "colours": "req.body.colours",
//   "category": "6058f35e9e4d6f4970521433"
// }
