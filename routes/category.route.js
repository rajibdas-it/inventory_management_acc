const express = require("express");
const categoryController = require("../controllers/category.controller");
const router = express.Router();

router
  .route("/")
  .get(categoryController.getCategory)
  .post(categoryController.addCategory);

router.route("/:id").get().patch().delete();

module.exports = router;
