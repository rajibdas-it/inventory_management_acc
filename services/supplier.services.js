const Supplier = require("../models/Supplier");

module.exports.getSupplierServices = async () => {
  const suppliers = await Supplier.find({});
  return suppliers;
};

module.exports.addSupplierServices = async (data) => {
  const result = await Supplier.create(data);
  return result;
};
