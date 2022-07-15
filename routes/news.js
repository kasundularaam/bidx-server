const express = require("express");
const router = express.Router();

const { getAllNews, createNews, getNews } = require("../controllers/news");

router.route("/").get(getAllNews).post(createNews);
router.route("/:id").get(getNews);

module.exports = router;
