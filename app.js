const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

//middlewares
app.use(express.json());
app.use(cors());

const productSchema = mongoose.Schema(
  {
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
      enum: ["kg", "litre", "pcs"],
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
      message: "Quantity must be an Integer",
    },
    status: {
      type: String,
      required: true,
      enum: ["in-stock", "out-of-stock", "discontinued"],
    },
    // createdAt: {
    //   type: Date,
    //   default: Date.now,
    // },
    // updatedAt: {
    //   type: Date,
    //   default: Date.now,
    // },
    // supplier: {
    //   type: mongoose.Schema.Types.ObjectId, //create ref of supplier.
    //   ref: "Supplier", //from supplier collection or supplier model.
    // },
    // categories: [
    //   {
    //     name: {
    //       type: String,
    //       required: true,
    //     },
    //     _id: mongoose.Schema.Types.ObjectId,
    //   },
    // ],
  },
  {
    timestamps: true,
  }
);

// Schema -> Model -> Query

//mongoose middleware for saving data:pre/post
productSchema.pre("save", function (next) {
  console.log("before saving data");
  if (this.quantity === 0) {
    this.status = "out-of-stock";
  }
  next();
});

productSchema.post("save", function (doc, next) {
  console.log("after saving data");
  next();
});

//create instance
productSchema.methods.logger = function () {
  console.log(`data saved for ${this.name}`);
};
//create model of product schema
const Product = mongoose.model("Product", productSchema);

app.get("/", (req, res) => {
  console.log("Server is running");
});

//posting to database

app.post("/api/v1/product", async (req, res, next) => {
  try {
    // save method
    // const product = new Product(req.body);
    // const result = await product.save();

    //create method
    const result = await Product.create(req.body);
    result.logger();

    res.status(200).json({
      status: "success",
      message: "Data inserted successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Data cannot inserted",
      error: error.message,
    });
  }
});

app.get("/api/v1/product", async (req, res, next) => {
  try {
    // const filter = { _id: "6430f83e5bc7d02f8515a2e6", name: "Coconut Oil" };
    const filter = { name: { $in: ["Rice", "Soyabin Oil"] } };
    // .sort({ quantity: -1, name: -1 });
    // .select({ name: 1 }); --> projection with select method
    let message = "";
    // const products = await Product.find({}).select({ name: 1 });
    // const products = await Product.where("name")
    //   .equals(/\w/)
    //   .where("quantity")
    //   .gte(100)
    //   .limit(2);
    const products = await Product.findById("6430f83e5bc7d02f8515a2e6");
    if (products.length > 0) {
      message = "Products Found";
    } else {
      message = "No Product found";
    }
    res.status(200).json({
      status: "Success",
      message: message,
      data: products,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "something went wrong",
      error: error.message,
    });
  }
});

module.exports = app;

// res.send(400).json({
//   status: "fail",
//   message: "Data is not inserted",
//   error: error.message,
// });

// const product = new Product(req.body); //this product is model name
// const result = await product.save();
// res.status(200).json({
//   status: "Success",
//   message: "Data inserted Successfully",
//   data: result,
// });
