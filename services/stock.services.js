const Stock = require("../models/Stock");

exports.getStockServices = async () => {
  const stocks = await Stock.find({});
  return stocks;
};

exports.addStockServices = async (data) => {
  const result = await Stock.create(data);
  return result;
};
