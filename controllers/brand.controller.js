const {
  getBrandsServices,
  addBrandServices,
} = require("../services/brand.services");

module.exports.getBrands = async (req, res, next) => {
  try {
    const brands = await getBrandsServices();
    res.status(200).json({
      status: "Success",
      message: "Brand found",
      data: brands,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Something went wrong",
      error: error.message,
    });
  }
};

module.exports.addBrand = async (req, res, next) => {
  try {
    const result = await addBrandServices(req.body);
    res.status(200).json({
      status: "Success",
      message: "Brand Added Successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Something went wrong",
      error: error?.message,
    });
  }
};
