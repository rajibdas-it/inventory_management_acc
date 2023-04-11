const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      required: [true, "please provide a email address"],
      unique: [true, "Email already exist"],
      lowercase: true,
      validate: [validator.isEmail, "Provide a valid email"],
    },
    password: {
      type: String,
      trim: true,
      required: [true, "please provide password"],
      validate: {
        validator: (value) => {
          validator.isStrongPassword(value, {
            minLength: 6,
            minLowercase: 3,
            minNumbers: 1,
            minUppercase: 1,
            minSymbols: 1,
          });
        },
        message: "Password {VALUES} is not strong enough",
      },
    },
    confirmPassword: {
      type: String,
      required: [true, "Please confirm your password"],
      validate: {
        validator: function (value) {
          return value === this.password;
        },
        message: "password didn't match",
      },
    },
    role: {
      type: String,
      enum: ["user", "store-manager", "admin"],
      default: "user",
    },
    firstName: {
      type: String,
      trim: true,
      required: true,
      minLength: [3, "Name must be at least 3 Character"],
      maxLength: [100, "Name is to large"],
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
      minLength: [3, "Name should be atleast 3 character"],
      maxLength: [100, "name is to large"],
    },
    contactNumber: {
      type: String,
      validate: [
        validator.isMobilePhone,
        "please provide a vaild phone number",
      ],
    },
    shippingAddress: String,
    imageURL: {
      type: String,
      validate: [validator.isURL, "please provide a valid image url"],
    },
    status: {
      type: String,
      default: "active",
      enum: ["active", "inactive", "blocked"],
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  const user = this;
  bcrypt.genSalt(saltRounds, function (err, salt) {
    // if (err) return next(err);
    if (err) throw err;
    bcrypt.hash(user.password, salt, function (err, hash) {
      // if (err) return next(err);
      if (err) throw err;
      user.password = hash;
      user.confirmPassword = undefined;
      next();
    });
  });
});

const User = mongoose.model("User", userSchema);

module.exports = User;
