const Stock = require("../models/Stock");

exports.getStockServices = async () => {
  const stocks = await Stock.find({});
  return stocks;
};
