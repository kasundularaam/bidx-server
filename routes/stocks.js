const express = require("express");
const router = express.Router();

const {
  getAllStocks,
  createStock,
  getStock,
  updateStock,
} = require("../controllers/stocks");

router.route("/").get(getAllStocks).post(createStock);
router.route("/:id").get(getStock).patch(updateStock);

module.exports = router;
