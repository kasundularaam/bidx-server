const Organization = require("../models/Organization");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");

const getAllOrganizations = asyncWrapper(async (req, res) => {
  const orgs = await Organization.find({});
  res.status(200).json(orgs);
});

const loginOrganization = asyncWrapper(async (req, res, next) => {
  const { email: email, password: password } = req.body;
  const org = await Organization.findOne({ email: email });
  if (!org) {
    return next(createCustomError("User does not have an account", 404));
  }
  if (org.password != password) {
    return next(createCustomError("Wrong password", 404));
  }
  res.status(200).json(org);
});

const getOrganization = asyncWrapper(async (req, res, next) => {
  const { id: id } = req.params;
  const org = await Organization.findOne({ _id: id });
  if (!org) {
    return next(createCustomError(`No organization with id : ${id}`, 404));
  }
  res.status(200).json(org);
});

module.exports = {
  getAllOrganizations,
  loginOrganization,
  getOrganization,
};
