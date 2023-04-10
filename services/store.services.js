const Store = require("../models/Store");
module.exports.getStoreServices = async () => {
  const stores = await Store.find({});
  return stores;
};

module.exports.addStoreServices = async (data) => {
  const result = await Store.create(data);
  return result;
};
