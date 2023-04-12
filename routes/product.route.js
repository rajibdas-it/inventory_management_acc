const express = require("express");
const productController = require("../controllers/product.controller");
const router = express.Router();
const multer = require("multer");
const uploader = require("../middleware/uploader");
const verifyToken = require("../middleware/verifyToken");

//kothay picture upload hobe. dest ta bulit in function
router.use(verifyToken); //all route check verify token
router.post(
  "/file-upload",
  // uploader.single("image"), //for single upload
  uploader.array("image"), //for multiple upload
  productController.fileUpload
);
router
  .route("/")
  .get(productController.getProducts)
  .post(verifyToken, productController.addProduct);
router.route("/bulk-update").patch(productController.bulkUpdateProduct);
router
  .route("/:id")
  .get(productController.getSingleProduct)
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);

module.exports = router;
