const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const storeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a store name"],
      trim: true,
      unique: true,
      lowercase: true,
      maxlength: 100,
      enum: {
        values: [
          "dhaka",
          "khulna",
          "chottagram",
          "barishal",
          "mymenshing",
          "rajshahi",
          "sylhet",
          "rangpur",
        ],
        message: "{VALUE} is not a valid name",
      },
    },
    description: String,
    status: {
      type: String,
      required: true,
      enum: ["active", "inactive"],
      default: "active",
    },
    manager: {
      name: String,
      contactNumber: String,
      id: {
        type: ObjectId,
        ref: "User",
      },
    },
  },
  {
    timestamps: true,
  }
);

const Store = mongoose.model("Store", storeSchema);
module.exports = Store;
