const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const validator = require("validator");

const supplierSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "please provide a supplier name"],
      lowercase: true,
    },
    email: {
      type: String,
      validate: [validator.isEmail, "provide a valid email"],
    },
    brand: {
      type: ObjectId,
      ref: "Brand",
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
      validate: {
        validator: (value) => {
          return validator.isMobilePhone(value);
        },
        message: "please provide a valid phone number",
      },
    },
    tradeLicenseNumber: {
      type: Number,
      // required: true,
    },
    address: {
      type: String,
      // required: true,
      trim: true,
    },
    division: String,
    imageURL: {
      type: String,
      // validate: [validator.isURL, "please provide a valid image url"],
    },
    status: {
      type: String,
      required: true,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

const Supplier = mongoose.model("Supplier", supplierSchema);

module.exports = Supplier;
