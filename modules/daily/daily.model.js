const mongoose = require("mongoose");

// this has to be a canvas with images and text (the message)
const dailySchema = new mongoose.Schema({
  message: {
    type: Object,
    required: true,
  },
  // timestamps: {
  //   createdAt: 'created_at', 
  //   updatedAt: 'updated_at'
  // },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  week: { type: mongoose.Schema.Types.ObjectId, ref: "Week" },
});

dailySchema.set('timestamps', true)
module.exports = mongoose.model("Daily", dailySchema);
