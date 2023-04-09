const Product = require("../models/Products");
const {
  getProductService,
  createProductServices,
  updateProductServices,
  getSingleProductServices,
  deleteProductServices,
  bulkUpdateProductServices,
} = require("../services/product.services");

module.exports.getProducts = async (req, res, next) => {
  try {
    // const filter = { _id: "6430f83e5bc7d02f8515a2e6", name: "Coconut Oil" };
    const filter = { name: { $in: ["Rice", "Soyabin Oil"] } };
    // .sort({ quantity: -1, name: -1 });
    // .select({ name: 1 }); --> projection with select method
    let message = "";
    // const products = await Product.find({}).select({ name: 1 });
    // const products = await Product.where("name")
    //   .equals(/\w/)
    //   .where("quantity")
    //   .gte(100)
    //   .limit(2);
    // console.log(req.query);
    const queryObject = { ...req.query };
    //excluding query like sort, page, limit and others.
    const excludeFields = ["sort", "page", "limit"];
    excludeFields.forEach((field) => delete queryObject[field]);

    console.log("query request", req.query);
    console.log("query object", queryObject);

    const products = await getProductService(queryObject);
    if (products.length > 0) {
      message = "Products Found";
    } else {
      message = "No Product found";
    }
    res.status(200).json({
      status: "Success",
      message: message,
      data: products,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "something went wrong",
      error: error.message,
    });
  }
};

module.exports.addProduct = async (req, res, next) => {
  try {
    // save method
    // const product = new Product(req.body);
    // const result = await product.save();

    //create method
    const result = await createProductServices(req.body);
    // result.logg();
    res.status(200).json({
      status: "success",
      message: "Data inserted successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Data cannot inserted",
      error: error.message,
    });
  }
};

module.exports.getSingleProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await getSingleProductServices(id);
    res.status(200).json({
      status: "Succes",
      message: "Product found",
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "No product found",
      error: error.message,
    });
  }
};

module.exports.updateProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const result = await updateProductServices(id, data);
    res.status(200).json({
      status: "Success",
      message: "Product updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Product cannot updated",
      error: error.message,
    });
  }
};

module.exports.deleteProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await deleteProductServices(id);
    res.status(200).json({
      status: "Success",
      message: "Product deleted successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Product can not updated",
      error: error.message,
    });
  }
};

module.exports.bulkUpdateProduct = async (req, res, next) => {
  try {
    // console.log(req.body);
    const result = await bulkUpdateProductServices(req.body);
    res.status(200).json({
      status: "Success",
      message: "Products updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Product cannot updated",
      error: error.message,
    });
  }
};
