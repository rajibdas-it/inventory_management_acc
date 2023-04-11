const User = require("../models/User");

module.exports.userSignupServices = async (data) => {
  const result = await User.create(data);
  return result;
};

module.exports.findUserByEmailServices = async (email) => {
  return await User.findOne({ email });
};
