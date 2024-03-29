const express = require("express");
const stockController = require("../controllers/stock.controller");

const router = express.Router();

router.route("/").get(stockController.getStock).post(stockController.addStock);

module.exports = router;
