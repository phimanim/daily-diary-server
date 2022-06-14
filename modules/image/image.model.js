const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  imageUrl: String,
  coordinatesX: Number,
  coordinatesY: Number,
  orientation: Number,
  daily: { type: mongoose.Schema.Types.ObjectId, ref: "Daily" } ,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});



module.exports = mongoose.model("Image", imageSchema);
