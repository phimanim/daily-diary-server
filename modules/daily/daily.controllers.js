const Daily = require("./daily.model");
const User = require("../auth/user.model");
const mongoose = require("mongoose");


function isObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

async function getDailys(req, res) {
  try {
    const userId = req.session.user._id;
    const user = await User.findById(userId);
    const dailys = await Daily.find({ "user": {$eq: user._id}})
    .populate("user")
    .populate("week")
    .lean();
    res.status(200).json(dailys).end();
  } catch (err) {
    res.status(400).json(err.message).end();
  }
}

async function getDailyById(req, res) {
  try {
    const { dailyId } = req.params;
    if (!isObjectId(dailyId)) {
      res.status(400).json("Id not valid").end();
    }
    const daily = await Daily.findById(dailyId)
      //.populate("week")
      //.populate("year")
      .lean();
    res.status(200).json(daily).end();
  } catch (err) {
    res.status(400).json(err.message).end();
  }
}

async function createDaily(req, res) {
  try {
    const daily = await Daily.create({
      ...req.body,
      user: req.session.user._id,
    });
    res.status(200).json(daily).end();
  } catch (err) {
    res.status(400).json(err.message).end();
  }
}

async function updateDaily(req, res) {
  try {
    const { dailyId } = req.params;
    if (!isObjectId(dailyId)) {
      res.status(400).json("Id not valid").end();
    }
    const daily = await Daily.findByIdAndUpdate(dailyId, req.body, {
      new: true,
    }).lean();

    res.status(200).json(daily).end();
  } catch (err) {
    res.status(400).json(err.message).end();
  }
}

async function deleteDaily(req, res) {
  try {
    const { dailyId } = req.params;
    if (!isObjectId(dailyId)) {
      res.status(400).json("Id not valid").end();
    }
    const daily = await Daily.findByIdAndDelete(dailyId).lean();
    res.status(200).json(daily).end();
  } catch (err) {
    res.status(400).json(err.message).end();
  }
}

module.exports = {
  getDailyById,
  getDailys,
  updateDaily,
  createDaily,
  deleteDaily,
};
