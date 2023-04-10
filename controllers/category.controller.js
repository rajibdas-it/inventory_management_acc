const {
  getCategoryServices,
  addCategoryServices,
} = require("../services/category.services");

module.exports.getCategory = async (req, res, next) => {
  try {
    const categories = await getCategoryServices();
    res.status(200).json({
      status: "success",
      message: "Categories found",
      data: categories,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "something went wrong",
      error: error.message,
    });
  }
};

module.exports.addCategory = async (req, res, next) => {
  try {
    const result = await addCategoryServices(req.body);
    res.status(200).json({
      status: "success",
      message: "category added successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "something went wrong",
      error: error.message,
    });
  }
};
