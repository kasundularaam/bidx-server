const News = require("../models/News");
const Organization = require("../models/Organization");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");

const getAllNews = asyncWrapper(async (req, res) => {
  const news = await News.find({});
  res.status(200).json(news);
});

const createNews = asyncWrapper(async (req, res, next) => {
  const { orgId: orgId } = req.body;
  const org = await Organization.findOne({ _id: orgId });
  if (!org) {
    return next(createCustomError("Wrong oegId", 404));
  }
  const news = await News.create(req.body);
  res.status(201).json({ news });
});

const getNews = asyncWrapper(async (req, res, next) => {
  const { id: id } = req.params;
  const news = await News.findOne({ _id: id });
  if (!news) {
    return next(createCustomError(`No news with id : ${id}`, 404));
  }
  res.status(200).json({ news });
});

const getOrgNews = asyncWrapper(async (req, res, next) => {
  const { id: id } = req.params;
  const news = await News.find({ orgId: id });
  if (!news) {
    return next(createCustomError(`No news found : ${id}`, 404));
  }
  res.status(200).json(news);
});

module.exports = {
  getAllNews,
  createNews,
  getNews,
};
