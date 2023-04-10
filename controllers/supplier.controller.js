const {
  getSupplierServices,
  addSupplierServices,
} = require("../services/supplier.services");

module.exports.getSuppliers = async (req, res, next) => {
  try {
    const suppliers = await getSupplierServices();
    res.status(200).json({
      status: "success",
      message: "Supplier found",
      data: suppliers,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Something went wrong",
      error: error.message,
    });
  }
};

module.exports.addSupplier = async (req, res, next) => {
  try {
    const result = await addSupplierServices(req.body);
    res.status(200).json({
      status: "success",
      message: "Supplier create successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Something went wrong",
      error: error.message,
    });
  }
};
