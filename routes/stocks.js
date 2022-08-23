const express = require("express");
const router = express.Router();

const {
  getAllStocks,
  getStock,
  updateStock,
} = require("../controllers/stocks");

router.route("/").get(getAllStocks);
router.route("/:id").get(getStock).patch(updateStock);

module.exports = router;
