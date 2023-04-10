const Category = require("../models/Category");

module.exports.getCategoryServices = async () => {
  const categories = await Category.find({});
  return categories;
};

module.exports.addCategoryServices = async (data) => {
  const result = await Category.create(data);
  return result;
};
