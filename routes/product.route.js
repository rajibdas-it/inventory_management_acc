const express = require("express");
const productController = require("../controllers/product.controller");
const router = express.Router();

router
  .route("/")
  .get(productController.getProducts)
  .post(productController.addProduct);
router.route("/bulk-update").patch(productController.bulkUpdateProduct);
router
  .route("/:id")
  .get(productController.getSingleProduct)
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);

module.exports = router;
