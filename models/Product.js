const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;
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
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      required: true,
      enum: ["kg", "litre", "pcs", "bag"],
    },
    imageUrl: [
      {
        type: String,
        required: true,
        validate: {
          validator: (value) => {
            if (Array.isArray(value)) {
              return false;
            }
            let isValid = true;
            value.forEach((url) => {
              if (!validator.isURL(url)) {
                isValid = false;
              }
            });
            return isValid;
          },
          message: "Please provide valid image urls",
        },
      },
    ],
    category: {
      type: String,
      required: true,
    },
    brand: {
      name: {
        type: String,
        required: true,
      },
      id: {
        type: ObjectId,
        ref: "Brand",
        required: true,
      },
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
// productSchema.pre("save", function (next) {
//   console.log("before saving data");
//   if (this.quantity === 0) {
//     this.status = "out-of-stock";
//   }
//   next();
// });

// productSchema.post("save", function (doc, next) {
//   console.log("after saving data");
//   next();
// });

// //create instance
// productSchema.methods.logger = function () {
//   console.log(`data saved for ${this.name}`);
// };
//create model of product schema
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
