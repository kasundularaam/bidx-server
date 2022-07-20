const express = require("express");
const router = express.Router();

const {
  getAllSubs,
  createSub,
  getSub,
  deleteSub,
} = require("../controllers/newsSub");

router.route("/").get(getAllSubs).post(createSub);
router.route("/:userId/org/:orgId").get(getSub).delete(deleteSub);

module.exports = router;
