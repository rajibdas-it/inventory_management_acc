const express = require("express");
const productController = require("../controllers/product.controller");
const router = express.Router();
const multer = require("multer");
const uploader = require("../middleware/uploader");

//kothay picture upload hobe. dest ta bulit in function

router.post(
  "/file-upload",
  // uploader.single("image"), //for single upload
  uploader.array("image"), //for multiple upload
  productController.fileUpload
);
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
