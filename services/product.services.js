const Product = require("../models/Products");

module.exports.getProductService = async () => {
  const products = await Product.find({});
  return products;
};

module.exports.createProductServices = async (data) => {
  const result = await Product.create(data);
  return result;
};

module.exports.getSingleProductServices = async (id) => {
  const result = await Product.findById(id);
  return result;
};

module.exports.updateProductServices = async (id, data) => {
  // const updatedItem = await Product.updateOne(
  //   { _id: id },
  //   { $set: data },
  //   { runValidators: true }
  // );
  //another way to update product. first get the product then update product with save method
  const product = await Product.findById(id);
  const updatedItem = await product.set(data).save(); //ei save method use korle mongoose validate kore.
  return updatedItem;
};

module.exports.deleteProductServices = async (id) => {
  const result = await Product.deleteOne({ _id: id });
  return result;
};

module.exports.bulkUpdateProductServices = async (data) => {
  // console.log(data);
  const result = await Product.updateMany({ _id: data.ids }, data.data, {
    runValidators: true,
  });
  // const products = [];
  // data.ids.forEach((product) =>
  //   products.push(Product.updateOne({ _id: product.id }, product.data))
  // );
  // const result = await Promise.all(products);
  return result;
};
