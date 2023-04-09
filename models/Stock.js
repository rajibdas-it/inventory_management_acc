const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const stockSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxLength: 100,
      lowercase: true,
    },
    description: String,
    unit: {
      type: String,
      required: true,
      enum: {
        values: ["kg", "pcs", "bag", "litre"],
        message: "{VALUES} cannot added",
      },
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "Product price cannot be negative"],
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Product price cannot be negative"],
    },
    category: {
      name: {
        type: String,
        required: true,
      },
      id: {
        type: ObjectId,
        ref: "Category",
      },
    },
    brand: {
      name: {
        type: String,
        required: true,
      },
      id: {
        type: ObjectId,
        ref: "Brand",
      },
    },
    store: {
      name: {
        type: String,
        required: [true, "Please provide a store name"],
        trim: true,
        unique: true,
        lowercase: true,
        maxlength: 100,
        enum: {
          values: [
            "Dhaka",
            "Khulna",
            "Chottagram",
            "Barishal",
            "Mymenshing",
            "Rajshahi",
            "Sylhet",
            "Rangpur",
          ],
          message: "{VALUE} is not a valid name",
        },
      },
      id: {
        type: ObjectId,
        ref: "Store",
      },
    },
    supplierBy: {
      name: {
        type: String,
        required: true,
      },
      id: {
        type: ObjectId,
        ref: "Supplier",
      },
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["in-stock", "out-of-stock", "discontinued"],
        message: "status cannot be {VALUES}",
      },
    },
  },
  { timestamps: true }
);

const Stock = mongoose.model("Stock", stockSchema);
module.exports = Stock;
