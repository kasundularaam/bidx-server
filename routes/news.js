const express = require("express");
const router = express.Router();

const {
  getAllNews,
  createNews,
  getNews,
  getOrgNews,
  getForSub,
} = require("../controllers/news");

router.route("/").get(getAllNews).post(createNews);
router.route("/:id").get(getNews);
router.route("/org/:id").get(getOrgNews);
router.route("/sub/:id").get(getForSub);

module.exports = router;
