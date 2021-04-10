const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});

blogSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
blogSchema.set("toJSON", {
  virtuals: true,
});

exports.Blog = mongoose.model("Blog", blogSchema);
