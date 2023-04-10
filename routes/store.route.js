const express = require("express");
const storeController = require("../controllers/store.controller");
const router = express.Router();

router.route("/").get(storeController.getStore).post(storeController.addStore);
router.route("/:id").get().patch().delete();

module.exports = router;
