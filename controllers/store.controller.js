const {
  getStoreServices,
  addStoreServices,
} = require("../services/store.services");

module.exports.getStore = async (req, res, next) => {
  try {
    const stores = await getStoreServices();
    res.status(200).json({
      status: "success",
      message: "store information found successfully",
      data: stores,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "something went wrong",
      error: error.message,
    });
  }
};

module.exports.addStore = async (req, res, next) => {
  try {
    const result = await addStoreServices(req.body);
    res.status(200).json({
      status: "success",
      message: "store added successfully",
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
