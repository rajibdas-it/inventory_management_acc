const express = require("express");
const brandControllers = require("../controllers/brand.controller");
const router = express.Router();

router
  .route("/")
  .get(brandControllers.getBrands)
  .post(brandControllers.addBrand);

router.route("/:id").get().patch().delete();

module.exports = router;
