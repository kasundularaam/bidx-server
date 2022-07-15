const express = require("express");
const router = express.Router();

const {
  getAllOrganizations,
  loginOrganization,
  getOrganization,
} = require("../controllers/organizations");

router.route("/").get(getAllOrganizations);
router.route("/login").post(loginOrganization);
router.route("/:id").get(getOrganization);

module.exports = router;
