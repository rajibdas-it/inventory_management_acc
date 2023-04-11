const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const stockSchema = mongoose.Schema(
  {
    productId: {
      type: ObjectId,
      required: true,
      ref: "Product",
    },
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
    category: String,
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
        lowercase: true,
        maxlength: 100,
        enum: {
          values: [
            "dhaka",
            "khulna",
            "chattogram",
            "barishal",
            "mymenshing",
            "rajshahi",
            "sylhet",
            "rangpur",
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
      },
      id: {
        type: ObjectId,
        ref: "Supplier",
      },
    },
    status: {
      type: String,
      required: true,
      default: "in-stock",
      enum: {
        values: ["in-stock", "out-of-stock"],
        message: "status cannot be {VALUES}",
      },
    },
    imageURL: [
      {
        type: String,
        required: true,
        validate: [validator.isURL, "Please provide a valid url"],
      },
    ],
  },
  { timestamps: true }
);

const Stock = mongoose.model("Stock", stockSchema);
module.exports = Stock;
