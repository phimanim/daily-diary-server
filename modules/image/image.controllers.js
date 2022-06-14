const Image = require("./image.model");
const mongoose = require("mongoose");
const User = require("../auth/user.model");

function isObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

async function getImages(req, res) {
  try {
    const userId = req.session.user._id;
    const user = await User.findById(userId);
    const images = await Image.find({ user: { $eq: user._id } }).lean();
    res.status(200).json(images).end();
  } catch (err) {
    res.status(400).json(err.message).end();
  }
}

async function getImageById(req, res) {
  try {
    const { imageId } = req.params;
    if (!isObjectId(imageId)) {
      res.status(400).json("Id not valid").end();
    }
    const image = await Image.findById(imageId).lean();
    res.status(200).json(image).end();
  } catch (err) {
    res.status(400).json(err.message).end();
  }
}

async function createImage(req, res) {
  try {
    const image = await Image.create({
      ...req.body,
      user: req.session.user._id,
    });
    res.status(200).json(image).end();
  } catch (err) {
    res.status(400).json(err.message).end();
  }
}

async function updateImage(req, res) {
  try {
    const { imageId } = req.params;
    if (!isObjectId(imageId)) {
      res.status(400).json("Id not valid").end();
    }
    const image = await Image.findByIdAndUpdate(imageId, req.body, {
      new: true,
    }).lean();

    res.status(200).json(image).end();
  } catch (err) {
    res.status(400).json(err.message).end();
  }
}

async function deleteImage(req, res) {
  try {
    const { imageId } = req.params;
    if (!isObjectId(imageId)) {
      res.status(400).json("Id not valid").end();
    }
    const image = await Image.findByIdAndDelete(imageId).lean();
    res.status(200).json(image).end();
  } catch (err) {
    res.status(400).json(err.message).end();
  }
}

module.exports = {
  getImageById,
  getImages,
  updateImage,
  createImage,
  deleteImage,
};
