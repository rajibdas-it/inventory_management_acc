const mongoose = require("mongoose");
//Schema Design
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

module.exports = Product;
