const { getStockServices } = require("../services/stock.services");

exports.getStock = async (req, res, next) => {
  try {
    const stocks = await getStockServices();
    res.status(200).json({
      status: "success",
      message: "stock item found",
      data: stocks,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "something went wrong",
      error: error.message,
    });
  }
};
