const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

//middlewares
app.use(express.json());
app.use(cors());

// schema design

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide a name for this product "],
    trim: true,
    unique: [true, "Name should be unique"],
    minLength: [3, "Name must be at least 3 characters"],
    maxLength: [100, "Name is too large"],
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: [0, "price cant be negative"],
  },
  unit: {
    type: String,
    required: true,
    enum: {
      value: ["Kg", "litre", "pcs"],
      message: "unit value cant be {VALUE}",
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "quantity cant be negative"],
      validate: {
        validator: (value) => {
          const isInteger = Number.isInteger(value);
          if (isInteger) {
            return true;
          } else {
            return false;
          }
        },
      },
    },
  },
});

app.get("/", (req, res) => {
  console.log("Server is running");
});

module.exports = app;
