const NewsSub = require("../models/NewsSub");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");

const getAllSubs = asyncWrapper(async (req, res) => {
  const subs = await NewsSub.find({});
  res.status(200).json(subs);
});

const getSub = asyncWrapper(async (req, res) => {
  const { userId: userId, orgId: orgId } = req.params;
  const sub = await NewsSub.findOne({ userId: userId, orgId: orgId });

  if (!sub) {
    res.status(200).json({ subscribed: false });
  }
  res.status(200).json({ subscribed: true });
});

const createSub = asyncWrapper(async (req, res, next) => {
  const { userId: userId, orgId: orgId } = req.body;
  const sub = await NewsSub.findOne({ userId: userId, orgId: orgId });
  if (sub) {
    return next(createCustomError("Already subscribed", 500));
  }
  await NewsSub.create(req.body);
  res.status(200).json({ subscribed: true });
});

const deleteSub = asyncWrapper(async (req, res, next) => {
  const { userId: userId, orgId: orgId } = req.params;
  const sub = await NewsSub.findOneAndDelete({ userId: userId, orgId: orgId });
  if (!sub) {
    return next(createCustomError("Not subscribed", 404));
  }
  res.status(200).json({ subscribed: false });
});

module.exports = {
  getAllSubs,
  createSub,
  getSub,
  deleteSub,
};
