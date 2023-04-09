const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      trim: true,
      maxLenght: 100,
      required: [true, "please provide a category name"],
      lowercase: true,
    },
    description: String,
    imageUrl: {
      type: String,
      validate: [validator.isUrl, "please provide a valid url"],
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
