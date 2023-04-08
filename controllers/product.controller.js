const Product = require("../models/Products");

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
    const products = await Product.find({});
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
    const result = await Product.create(req.body);
    result.logger();

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
