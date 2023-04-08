const Product = require("../models/Products");

module.exports.getProductService = async () => {
  const products = await Product.find({});
  return products;
};

module.exports.createProductServices = async (data) => {
  const result = await Product.create(data);
  return result;
};
