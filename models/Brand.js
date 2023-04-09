const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const brandSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a brand name"],
      trim: true,
      maxLength: 100,
      unique: true,
      lowercase: true,
    },
    description: String,
    email: {
      type: String,
      validate: [validator.isEmail, "Please provide a valid url"],
      lowercase: true,
    },
    website: {
      type: String,
      validate: [validator.isURL, "Please provide a valid url"],
      lowercase: true,
    },
    location: String,
    products: [
      {
        type: ObjectId,
        ref: "Product",
      },
    ],
    suppliers: [
      {
        name: String,
        contactNumber: String,
        id: { type: ObjectId, ref: "Supplier" },
      },
    ],
    staus: {
      tyep: String,
      default: "active",
      enum: ["active", "inactive"],
    },
  },
  {
    timestamps: true,
  }
);

const Brand = mongoose.model("Brand", brandSchema);
module.exports = Brand;
