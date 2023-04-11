const {
  userSignupServices,
  findUserByEmailServices,
} = require("../services/user.services");

const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/token");

module.exports.signup = async (req, res) => {
  try {
    const result = await userSignupServices(req.body);
    res.status(200).json({
      status: "success",
      message: "User created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "failed to signup new user",
      error: error.message,
    });
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    //step 1: check your input was they given their user email and password
    if (!email || !password) {
      return res.status(401).json({
        status: "fail",
        error: "please provide your credentials",
      });
    }
    //step 2: find user from user table by their given email
    const user = await findUserByEmailServices(email);
    //step 3: check user
    if (!user) {
      return res.status(401).json({
        status: "fail",
        error: "no user found with is email",
      });
    }

    //check password valid
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(403).json({
        status: "fail",
        error: "invalid email or password",
      });
    }
    //check user status active or not
    if (user.status !== "active") {
      return res.status(403).json({
        status: "fail",
        error: "Inactive account. please check your email and active it.",
      });
    }

    //create token for user
    const token = generateToken(user);
    const { password: pwd, ...others } = user.toObject();
    const newData = {
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      contactNumber: user.contactNumber,
      shippingAddress: user.shippingAddress,
      imageURL: user.imageURL,
      status: user.status,
    };

    res.status(200).json({
      status: "success",
      message: "successfully login",
      data: {
        newData,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "failed to login",
      error: error.message,
    });
  }
};
