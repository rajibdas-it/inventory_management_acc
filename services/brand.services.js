const Brand = require("../models/Brand");

module.exports.getBrandsServices = async () => {
  const brands = await Brand.find({});
  return brands;
};

module.exports.addBrandServices = async (data) => {
  const result = await Brand.create(data);
  return result;
};
